import { Component, HostListener, Injector, ViewChild } from '@angular/core';
import {
  TabModuleFallbearbeitungSandbox,
} from '@app/kiss4-main/tab-module-fallbearbeitung/tab-module-fallbearbeitung.sandbox';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { OnDestroy, OnInit } from '@node_modules/@angular/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { FallfuhrungTreeConstant } from '@shared/common/fallfuhrung-tree.common';
import { BaseComponent } from '@shared/components/base.component';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { cloneDeep, uniqBy } from 'lodash-es';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { KontoauszugListComponent } from '../components/kontoauszug-list/kontoauszug-list.component';
import { KontoauszugSearchComponent } from '../components/kontoauszug-search/kontoauszug-search.component';
import { KontoauszugSandbox } from '../kontoauszug.sandbox';
import { Kontoauszug, KontoauszugQueryModel, Kostenart } from '../models';

@Component({
  selector: 'app-kontoauszug',
  templateUrl: './kontoauszug.component.html',
  styleUrls: ['./kontoauszug.component.scss']
})
@SetClassRight('CtlWhKontoauszug')
export class KontoauszugComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;
  @ViewChild('kontoauszugSearch') kontoauszugSearch: KontoauszugSearchComponent;
  @ViewChild('kontoauszugList') kontoauszugList: KontoauszugListComponent;

  // Common vars
  private subscription = new Subscription();
  pageTitle = '';
  titleText = '';
  isShiftKeyDown = false;
  listBtn = [CommonConstant.ToolbarButtons, UtilityHelper.getConditionListBtn(CommonConstant.AdditionalButtons, [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
  customizeBtn = [
    {
      name: 'kontoauszugDruckenBtn',
      text: 'CtlWhKontoauszug.Container.KontoauszugDrucken',
      icon: '/assets/icon/base64-decode/drucken.ico',
      visible: true,
      class: 'i020-res-drucken-button'
    }
  ];
  baPersonID: any;
  kontoauszugQueryModel: KontoauszugQueryModel;
  lovLookupsPayload = [
    {
      LovName: 'KbBuchungsStatus',
      Filter: null,
      IsLovFilterWhereAppend: false,
      IsAllownull: false,
      OrderByColumn: 6
    },
    {
      LovName: 'BgSplittingArt',
      Filter: null,
      IsLovFilterWhereAppend: false,
      IsAllownull: false,
      OrderByColumn: 6
    },
    {
      LovName: 'KbKontoZeitraum',
      Filter: null,
      IsLovFilterWhereAppend: false,
      IsAllownull: false,
      OrderByColumn: 6
    }
  ];
  lovLookups: any;
  KbBuchungsStatus: any;
  BgSplittingArt: any;
  // Search form vars
  personnenData = [];
  zeitraumData = [];
  kostenartData: Kostenart[] = [];
  verfuegbarData: Kostenart[] = [];
  verfuegbarRowKey: number;
  countID: number;
  kontoauszugSearchFormData = {
    ganze: true,
    klient: [],
    zeitraum: null,
    datumVon: null,
    datumBis: null,
    betrageVer: false,
    verdichtet: true,
    salAusKiss: true,
    salAusFremdsystem: true,
    zugeteiltData: []
  };
  // List form vars
  buchungKostenart: Kontoauszug[] = [];
  selectedRowKey: number;
  selectedKontoauszugRow: any;
  statusCodeHeaderFilter: any[] = [];

  constructor(
    injector: Injector,
    public translateService: TranslateService,
    private tabModuleFallbearbeitungSandbox: TabModuleFallbearbeitungSandbox,
    private sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
    private kontoauszugSandbox: KontoauszugSandbox
  ) {
    super(injector);
  }

  ngOnInit() {
    this.setTitle(FallfuhrungTreeConstant.titlePage);
    this.resetToolbarBtnState();
    this.registerEvents();
  }

  ngOnDestroy() {
    this.kontoauszugSandbox.resetKontoauszugState();
    this.subscription.unsubscribe();
  }

  registerEvents() {
    this.subscription.add(
      this.tabModuleFallbearbeitungSandbox.getPersonInfoTitel$.subscribe(data => {
        if (isNullOrUndefined(data)) {
          return;
        }
        if (data.status === AppEnums.StatusCode.FORBIDDEN) {
          this.remainingMessage.showMessage(this.translateService.instant('HttpStatusMessage.Forbidden'), 'HttpStatusMessage.Forbidden');
          return;
        }
        if (data.status) {
          this.remainingMessage.showMessage(JSON.parse(data._body).message);
          return;
        }
        this.titleText = data.titleText;
        this.pageTitle = `${this.titleText} > ${this.translateService.instant('CtlWhKontoauszug.Container.PageTitle')}`;
      })
    );

    this.subscription.add(
      this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
        this.pageTitle = `${this.titleText} > ${this.translateService.instant('CtlWhKontoauszug.Container.PageTitle')}`;
      })
    );

    this.subscription.add(
      this.sozialhilfeTreeSandbox.selectedNode$.subscribe(data => {
        if (isNullOrUndefined(data)) {
          return;
        }
        this.resetKontoauszugSearchState();
        this.baPersonID = data.baPersonID;
        this.initKontoauszugSearchData(this.baPersonID);
        this.kontoauszugSandbox.getLovLookups(this.lovLookupsPayload);
      })
    );

    this.subscription.add(
      this.kontoauszugSandbox.getPersonnen$.subscribe(data => {
        if (isNullOrUndefined(data)) {
          return;
        }
        if (data.status === AppEnums.StatusCode.FORBIDDEN) {
          this.remainingMessage.showMessage(this.translateService.instant('HttpStatusMessage.Forbidden'), 'HttpStatusMessage.Forbidden');
          return;
        }
        if (data.status) {
          this.remainingMessage.showMessage(JSON.parse(data._body).message);
          return;
        }
        this.personnenData = data;
      })
    );

    this.subscription.add(
      this.kontoauszugSandbox.getZeitraum$.subscribe(data => {
        if (isNullOrUndefined(data)) {
          return;
        }
        if (data.status === AppEnums.StatusCode.FORBIDDEN) {
          this.remainingMessage.showMessage(this.translateService.instant('HttpStatusMessage.Forbidden'), 'HttpStatusMessage.Forbidden');
          return;
        }
        if (data.status) {
          this.remainingMessage.showMessage(JSON.parse(data._body).message);
          return;
        }
        this.zeitraumData = data;
        this.kontoauszugSearchFormData.zeitraum = data[0].code;
      })
    );

    this.subscription.add(
      this.kontoauszugSandbox.getKostenart$.subscribe(data => {
        if (isNullOrUndefined(data)) {
          return;
        }
        if (data.status === AppEnums.StatusCode.FORBIDDEN) {
          this.remainingMessage.showMessage(this.translateService.instant('HttpStatusMessage.Forbidden'), 'HttpStatusMessage.Forbidden');
          return;
        }
        if (data.status) {
          this.remainingMessage.showMessage(JSON.parse(data._body).message);
          return;
        }
        this.kostenartData = cloneDeep(data);
        this.verfuegbarData = cloneDeep(data);
        this.countID = data.length + 1;
        this.verfuegbarRowKey = data[0].ID;
      })
    );

    this.subscription.add(
      this.kontoauszugSandbox.searchKontoauszug$.subscribe(data => {
        if (isNullOrUndefined(data) || data.length === 0) {
          this.buchungKostenart = [];
          return;
        }
        if (data.status === AppEnums.StatusCode.FORBIDDEN) {
          this.remainingMessage.showMessage(this.translateService.instant('HttpStatusMessage.Forbidden'), 'HttpStatusMessage.Forbidden');
          return;
        }
        if (data.status) {
          this.remainingMessage.showMessage(JSON.parse(data._body).message);
          return;
        }
        this.buchungKostenart = this.afterGetKontoauszug(data);
        this.statusCodeHeaderFilter = this.getStatusCodeHeaderFilter(data);
        this.selectedRowKey = data[0].ID;
      })
    );

    this.subscription.add(
      this.kontoauszugSandbox.getLovLookups$.subscribe(data => {
        if (isNullOrUndefined(data)) {
          return;
        }
        if (data.status === AppEnums.StatusCode.FORBIDDEN) {
          this.remainingMessage.showMessage(this.translateService.instant('HttpStatusMessage.Forbidden'), 'HttpStatusMessage.Forbidden');
          return;
        }
        if (data.status) {
          this.remainingMessage.showMessage(JSON.parse(data._body).message);
          return;
        }
        this.KbBuchungsStatus = data.p0_KbBuchungsStatus;
        this.BgSplittingArt = data.p1_BgSplittingArt;
        this.searchNew(this.baPersonID);
      })
    );

    this.subscription.add(this.kontoauszugList.emitOnFocusedRowChanged.pipe(
      distinctUntilChanged()).subscribe(e => {
        if (e) {
          this.selectedKontoauszugRow = this.afterGetKontoauszugDetail(e);
        } else {
          this.selectedKontoauszugRow = null;
        }
      })
    );
  }

  resetToolbarBtnState() {
    this.listBtn[0] = this.listBtn[0].map(btn => {
      return {...btn, visible: true, disabled: false};
    });
    this.listBtn[1] = this.listBtn[1].map(btn => {
      return {...btn, visible: true, disabled: false};
    });
  }

  resetKontoauszugSearchState() {
    this.kontoauszugSandbox.resetKontoauszugState();
    this.kontoauszugSearchFormData = {
      ganze: true,
      klient: [],
      zeitraum: null,
      datumVon: null,
      datumBis: null,
      betrageVer: false,
      verdichtet: true,
      salAusKiss: true,
      salAusFremdsystem: true,
      zugeteiltData: []
    };
    this.verfuegbarRowKey = null;
    this.kontoauszugSearch.zugeteiltData = [];
    this.kontoauszugSearch.selectedGrid = null;
    this.kontoauszugSearch.verfuegbarFilter = [];
    if (this.kontoauszugSearch.verfuegbarGrid && this.kontoauszugSearch.verfuegbarGrid.instance) {
      this.kontoauszugSearch.verfuegbarGrid.instance.state({});
    }
    this.kontoauszugSearch.zugeteiltFilter = [];
    if (this.kontoauszugSearch.zugeteiltGrid && this.kontoauszugSearch.zugeteiltGrid.instance) {
      this.kontoauszugSearch.zugeteiltGrid.instance.state({});
    }
    this.kontoauszugList.filter = [];
    if (this.kontoauszugList.buchungKostenartGrid && this.kontoauszugList.buchungKostenartGrid.instance) {
      this.kontoauszugList.buchungKostenartGrid.instance.state({});
    }
  }

  initKontoauszugSearchData(baPersonID) {
    this.kontoauszugSandbox.getPersonnen(baPersonID);
    this.kontoauszugSandbox.getZeitraum();
    this.kontoauszugSandbox.getKostenart();
  }

  searchNew(baPersonID) {
    this.kontoauszugQueryModel = new KontoauszugQueryModel();
    this.kontoauszugQueryModel.Bapersonid = baPersonID;
    this.kontoauszugQueryModel.PersonnenIds = [];
    this.kontoauszugQueryModel.ZetraumCode = 1;
    this.kontoauszugQueryModel.Datumvon = null;
    this.kontoauszugQueryModel.Datumbis = null;
    this.kontoauszugQueryModel.LaListCodes = [];
    this.kontoauszugQueryModel.Verdichtet = true;
    this.kontoauszugQueryModel.BetraegeAnpassen = false;
    this.kontoauszugQueryModel.SaldovortragKiss = true;
    this.kontoauszugQueryModel.SaldovortragFremdsystem = true;
    this.kontoauszugSandbox.searchKontoauszug(this.kontoauszugQueryModel);
  }

  @HostListener('document:keyup', ['$event'])
  public keyUpEvent(event: KeyboardEvent) {
    if ((event.keyCode === AppEnums.KeyCode.KeyShift || event.metaKey)) {
      event.preventDefault();
      this.isShiftKeyDown = false;
    }
  }
  @HostListener('document:keydown', ['$event'])
  public hotKey(event: KeyboardEvent) {
    if ((event.shiftKey || event.metaKey)) {
      this.isShiftKeyDown = true;
    }
  }

  onCopyTitle() {
    if (this.isShiftKeyDown) {
      UtilityHelper.copyElement(this.baPersonID.toString());
    } else {
      UtilityHelper.copyElement(this.titleText);
    }
  }

  onToolbarItemClick(e) {
    this.kontoauszugList.onToolbarItemClick(e);
  }

  onKeyDownGrid(e) {
    this.kontoauszugSearch.searchKontoauszug();
  }

  onSearchBtnClick(e) {
    if (e.validationMessage) {
      this.remainingMessage.showMessage(e.validationMessage);
      return;
    }
    this.remainingMessage.hideMessage();
    const kontoauszugSearchFormData = e.kontoauszugSearchFormData;
    this.kontoauszugQueryModel = new KontoauszugQueryModel();
    this.kontoauszugQueryModel.Bapersonid = this.baPersonID;
    this.kontoauszugQueryModel.PersonnenIds = kontoauszugSearchFormData.klient;
    this.kontoauszugQueryModel.ZetraumCode = kontoauszugSearchFormData.zeitraum ? kontoauszugSearchFormData.zeitraum : 1;
    this.kontoauszugQueryModel.Datumvon = kontoauszugSearchFormData.datumVon ? moment(kontoauszugSearchFormData.datumVon).format(CommonConstant.FORMAT_DATE_MM_DD_YYYY) : null;
    this.kontoauszugQueryModel.Datumbis = kontoauszugSearchFormData.datumBis ? moment(kontoauszugSearchFormData.datumBis).format(CommonConstant.FORMAT_DATE_MM_DD_YYYY) : null;
    this.kontoauszugQueryModel.LaListCodes = kontoauszugSearchFormData.zugeteiltData;
    this.kontoauszugQueryModel.Verdichtet = kontoauszugSearchFormData.verdichtet;
    this.kontoauszugQueryModel.BetraegeAnpassen = kontoauszugSearchFormData.betrageVer;
    this.kontoauszugQueryModel.SaldovortragKiss = kontoauszugSearchFormData.salAusKiss;
    this.kontoauszugQueryModel.SaldovortragFremdsystem = kontoauszugSearchFormData.salAusFremdsystem;
    this.kontoauszugSandbox.searchKontoauszug(this.kontoauszugQueryModel);
  }

  afterGetKontoauszug(data) {
    let saldo = 0;
    let rowSaldo = 0;
    data.forEach(ele => {
      rowSaldo = ele.Saldo || 0;
      saldo += rowSaldo;
      saldo += ele.Ausgabe - ele.Einnahme;
      if (rowSaldo === 0) {
        ele.Saldo = saldo;
      }
    });
    return data;
  }

  afterGetKontoauszugDetail(selectedKontoauszugRow) {
    if (selectedKontoauszugRow.Betrag100 && !isNaN(selectedKontoauszugRow.Betrag100)) {
      selectedKontoauszugRow.FormatedBetrag100 = UtilityHelper.formatNumberByCulture(selectedKontoauszugRow.Betrag100);
    }
    const lookupItem = this.BgSplittingArt.find(item => item.Code === selectedKontoauszugRow.BgSplittingArtCode);
    if (lookupItem) {
      selectedKontoauszugRow.BgSplittingArtCode = lookupItem.Text;
    }
    return selectedKontoauszugRow;
  }

  getStatusCodeHeaderFilter(data) {
    if (data && data.length > 0) {
      const uniqueData = <any>uniqBy(cloneDeep(data), 'KbBuchungStatusCode');
      const statusCodeHeaderFilter = [];
      uniqueData.forEach(ele => {
        statusCodeHeaderFilter.push({
          text: this.getStatusName(ele.KbBuchungStatusCode),
          value: ele.KbBuchungStatusCode
        });
      });
      return statusCodeHeaderFilter;
    }
    return [];
  }

  getStatusName(code) {
    if (code) {
      return this.KbBuchungsStatus.find(item => item.Code === code).Text;
    }
    return this.translateService.instant('DataGrid.FilterHeader.Blanks');
  }
}
