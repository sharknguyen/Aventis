import 'devextreme-intl';

import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridComponent } from '@node_modules/devextreme-angular';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { FallfuhrungTreeConstant } from '@shared/common/fallfuhrung-tree.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { UtilService } from '@shared/utilites/utility.service';
import { copyElement } from '@shared/utilites/utilityHelpers';
import { DxValidationGroupComponent, DxValidatorComponent } from 'devextreme-angular';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';

import { AhvBeitrageSandbox } from '../../ahv-beitrage.sandbox';
import {
  AHVBeitragPosition,
  BgSilAHVBeitrag,
  IDropDownAnpassung,
  LookUps,
  PersonenUnterstuetzt,
  SqlQueryShPositionTyp,
} from '../../models';
import { TabModuleFallbearbeitungSandbox } from '@app/kiss4-main/tab-module-fallbearbeitung/tab-module-fallbearbeitung.sandbox';

@Component({
  selector: 'kiss-ctl-ahv-beitrage',
  templateUrl: './ahv-beitrag.component.html',
  styleUrls: ['./ahv-beitrag.component.scss']
})
@SetClassRight('CtlAhvBeitrage')
export class AhvBeitrageComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {
  @ViewChild('formList') formList: any;
  @ViewChild('formDetail') formDetail: any;
  @ViewChild('printer') printer: PrinterComponent;
  @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;

  @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
  @ViewChild('gridAhvBeitrage') gridAhvBeitrage: DxDataGridComponent;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
  @ViewChild('expandGrid') expandGrid: any;
  @ViewChild('validatorLA') validatorLA: DxValidatorComponent;
  @ViewChild('validatorBis') validatorBis: DxValidatorComponent;
  @ViewChild('validatorBetrag') validatorBetrag: DxValidatorComponent;
  private subscriptions: Subscription = new Subscription();
  selectedNodeID: any;
  bgBudgetID: number;
  baPersonID: number;
  bAnpassen = false;
  anpassenVon: string;
  BgSilAHVBeitrag: BgSilAHVBeitrag;
  dategSilAHVBeitrag: string;
  msgValidateDateErr: string;
  msgValidateDateBisErr: string;
  listPersonenUnterstuetzt: PersonenUnterstuetzt[] = [];
  baPersonIDLookup: PersonenUnterstuetzt[] = [];
  listSqlQueryShPositionTyp: SqlQueryShPositionTyp[] = [];
  listAHVBeitragPosition: AHVBeitragPosition[] = [];
  listLookUps: LookUps[] = [];
  listDropDownAnpassungs: IDropDownAnpassung[] = [];
  StatusContainer = {
    isAddNew: false,
    isReadOnly: true,
    isEdited: false,
    isBetrageAnpassen: false,
    isBtnBAnpassen: false,
    iscConcurrency: false,
    isDelete: false,
    isDeleteError: false,
    dataSize: 0,
    iscBtnConcurrency: false,
    isVisibleDateVon: false,
    isErteilt: false
  };
  disabledGrid = false;
  isError = false;
  messageErr: string;
  PermissionContainer = {
    isPermissionNew: true,
    isPermissionEdit: true,
    isPermissionRemove: true
  };
  titleHeader: string;
  titleHeaderTree: string;
  infoPerson: string;
  bgGruppeCode: number;
  datumVon: string;
  datumBis: string;
  isEditPopup: false;
  autoWidth = true;
  concatKontoNrName: boolean;
  isDeleteError = false;
  minDate: any;
  maxDate: any;
  isLoading = false;
  isShiftKeyDown = false;
  rightClickColumnHeaderIndex = 0;
  clickColumnFilterIndex = 0;
  accessKeyItemFocused = 0;
  isgridInstitution: false;
  nameTree: string;
  ahvBeitragPositionDetail = new AHVBeitragPosition();
  numberFormat = '#,###.00';
  ahvBeitragPositionDetailTemplate = new AHVBeitragPosition();
  ahvBeitragPositionEmpty = new AHVBeitragPosition();
  ahvBeitragPositionRequestData: any;
  selectedRowKey: any;
  newbgPositionID: number;
  indexItemDelete: number;
  detailAhvBeitragePositionID: number;
  gridFunctionKey = 'gridSetting';
  isSxMode = false;
  isChangeNode = false;
  listBtn = [CommonConstant.ToolbarButtons, CommonConstant.AdditionalButtons];
  BgBewilligungStatus = {
    InVorbereitung: 1,
    Abgelehnt: 2,
    Angefragt: 3,
    Erteilt: 5,
    Gesperrt: 9
  };
  ButtonToolbarDetail = {
    Speichern: 'speichern',
    Abbrechen: 'abbrechen',
    SpeichernBA: 'speichernBA',
    AbbrechenBA: 'abbrechenBA',
    Bearbeiten: 'bearbeiten',
    Loschen: 'loschen',
    Neuer: 'neuer',
    Concurrency: 'concurrency',
    BewilligteBetrageAnpassen: 'bewilligteBetrageAnpassen',
    Bewilligung: 'bewilligung'
  };
  modulTreeID = {
    BgSilAHVBeitrag: 30007,
    BgSilWiedereingliederung: 30008,
    BgSilTherapieEntzug: 30009,
    BgSilKrankheitBehinderungLeistung: 30010,
    BgSilSituationsbedingteLeistungen: 30011,
  };
  GruppeCodeModule = {
    BgSilAHVBeitrag: 3905,
    BgSilWiedereingliederung: 3904,
    BgSilTherapieEntzug: 3903,
    BgSilKrankheitBehinderungLeistung: 3902,
    BgSilSituationsbedingteLeistungen: 3901,
  };
  ExeclName = {
    AHVBeitrag: 'AHV Beiträge',
    BgSilWiedereingliederung: 'Wiedereingliederung',
    BgSilTherapieEntzug: 'Kosten von Therapie und Entzugsmassnahmen',
    BgSilKrankheitBehinderungLeistung: 'Krankheits- und behinderungsbedingte Leistungen',
    BgSilSituationsbedingteLeistungen: 'Situationsbedingte Leistung',
  };
  execlName: string;
  btnNewName: string;
  isBgSilTherapieEntzug = false;
  isKrankheits = false;
  visiblePopUpDate = false;
  isClickPopUpDate = false;
  nameFocus: string;
  popUpModel: PopUpModel;
  isFillter = false;
  headerClicked$ = new BehaviorSubject(null);
  private navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();

  constructor(injector: Injector, public translateService: TranslateService,
    public ahvBeitragesSandbox: AhvBeitrageSandbox, public utilService: UtilService,
    public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox, private datePipe: DatePipe, public router: Router,
    public tabModuleFallbearbeitungSandbox: TabModuleFallbearbeitungSandbox
  ) {
    super(injector);
  }

  ngOnInit() {
    this.registerEvents();
    this.setTitle(FallfuhrungTreeConstant.titlePage);
    this.visibleListBtnNavigator(this.StatusContainer.isReadOnly);
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.remainingMessage.hideMessage();
    this.subscriptions.unsubscribe();
    this.ahvBeitragesSandbox.resetState();
  }

  initFunction(bgGruppeCode) {
    this.ahvBeitragesSandbox.getBgSilAHVBeitrag(this.bgBudgetID);
    this.ahvBeitragesSandbox.getPersonenUnterstuetzt(this.bgBudgetID);
    this.ahvBeitragesSandbox.getInstitutionSuchenWh();
    this.ahvBeitragesSandbox.getLookUps();
    this.bgGruppeCode = bgGruppeCode;
    this.concatKontoNrName = true;
    this.resetStatusContainer();
  }

  registerEvents() {
    this.isClickPopUpDate = false;
    combineLatest(this.ahvBeitragesSandbox.ahvBeitragPosition$, this.ahvBeitragesSandbox.sqlQueryShPositionTyp$,
      this.ahvBeitragesSandbox.getLookUps$).subscribe(([a, b, c]) => {
        if (!isNullOrUndefined(a) && !isNullOrUndefined(b) && !isNullOrUndefined(c)) {
          this.handlingListAhvBeitrage(a, c);
          this.listSqlQueryShPositionTyp = b;
          this.listLookUps = c;
        }
      });
    this.subscriptions.add(this.translateService.onLangChange.subscribe(() => {
      this.checkTreeNodeSelected(this.selectedNodeID);
    }));
    this.subscriptions.add(
      this.tabModuleFallbearbeitungSandbox.getPersonInfoTitel$.subscribe(data => {
        if (isNullOrUndefined(data) || data.status) {
          return;
        }
        this.titleHeaderTree = '';
        this.titleHeaderTree = data.titleText;
      })
    );
    this.subscriptions.add(
      this.sozialhilfeTreeSandbox.selectedNode$.subscribe(selectedNode => {
        if (!isNullOrUndefined(selectedNode)) {
          this.setEditMask(selectedNode);
          this.selectedNodeID = selectedNode.modulTreeID;
          const bgGruppeCode = this.checkTreeNodeSelected(this.selectedNodeID);
          this.isChangeNode = true;
          this.bgBudgetID = selectedNode.bgBudgetID;
          this.baPersonID = selectedNode.baPersonID;
          this.nameTree = selectedNode.name;
          this.initFunction(bgGruppeCode);
        }
      })
    );
    this.subscriptions.add(this.ahvBeitragesSandbox.bgSilAHVBeitragData$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.remainingMessage.hideMessage();
        this.StatusContainer.isBetrageAnpassen = false;
        this.StatusContainer.isDeleteError = false;
        this.BgSilAHVBeitrag = data;
        this.isError = false;
        this.formDetail.isClickPopUpDate = false;
        setTimeout(() => {
          if (this.isFillter) {
            this.clearFilter();
          }
          this.formList.gridFunction.model.isFilterBuilder = false;
          this.formList.gridFunction.model.isGrouping = false;
          this.formList.gridAhvBeitrage.instance.clearGrouping();
        }, CommonConstant.SetTimeOut300);
        const dateFinanzplanVonFormatDot = this.datePipe.transform(this.BgSilAHVBeitrag.finanzplanVon, 'dd.MM.yyyy');
        const dateFinanzplanBisFormatDot = this.datePipe.transform(this.BgSilAHVBeitrag.finanzplanBis, 'dd.MM.yyyy');
        this.dategSilAHVBeitrag = ' (' + dateFinanzplanVonFormatDot + ' - ' + dateFinanzplanBisFormatDot + ')';
        this.msgValidateDateErr = this.translateService.instant('AhvBeitrage.MessageError.ValidateDateFinanzplan') + this.dategSilAHVBeitrag;
        this.datumVon = this.datePipe.transform(this.BgSilAHVBeitrag.finanzplanVon, 'yyyy-MM-dd');
        this.datumBis = this.datePipe.transform(this.BgSilAHVBeitrag.finanzplanBis, 'yyyy-MM-dd');
        this.minDate = this.BgSilAHVBeitrag.finanzplanVon;
        this.maxDate = this.BgSilAHVBeitrag.finanzplanBis;
        this.ahvBeitragesSandbox.getSqlQueryShPositionTyp({
          bgGruppeCode: this.bgGruppeCode ? this.bgGruppeCode : '',
          datumVon: this.datumVon ? this.datumVon : '',
          datumBis: this.datumBis ? this.datumBis : '',
          concatKontoNrName: this.concatKontoNrName ? this.concatKontoNrName : '',
        });
        this.requestListDataGrid();
        if (data.bgBewilligungStatusCode === this.BgBewilligungStatus.Erteilt) {
          this.StatusContainer.isBtnBAnpassen = true;
          this.PermissionContainer.isPermissionEdit = false;
          this.PermissionContainer.isPermissionNew = true;
          this.PermissionContainer.isPermissionRemove = true;
          this.StatusContainer.isVisibleDateVon = false;
          this.StatusContainer.isErteilt = true;
        }
        if (data.bgBewilligungStatusCode === this.BgBewilligungStatus.Gesperrt) {
          this.PermissionContainer.isPermissionEdit = false;
          this.PermissionContainer.isPermissionNew = true;
          this.PermissionContainer.isPermissionRemove = true;
          this.StatusContainer.isBtnBAnpassen = false;
          this.StatusContainer.isVisibleDateVon = true;
          this.StatusContainer.isErteilt = false;
        }
        if (data.bgBewilligungStatusCode === this.BgBewilligungStatus.InVorbereitung ||
          data.bgBewilligungStatusCode === this.BgBewilligungStatus.Abgelehnt ||
          data.bgBewilligungStatusCode === this.BgBewilligungStatus.Angefragt) {
          this.PermissionContainer.isPermissionEdit = true;
          this.PermissionContainer.isPermissionNew = true;
          this.PermissionContainer.isPermissionRemove = true;
          this.StatusContainer.isBtnBAnpassen = false;
          this.StatusContainer.isVisibleDateVon = true;
          this.StatusContainer.isErteilt = false;
        }
        this.titleHeader = '';
        this.titleHeader = this.titleHeaderTree + ' > ' +
          this.nameTree + ' vom ' + dateFinanzplanVonFormatDot + ' bis ' + dateFinanzplanBisFormatDot;
      }
    }));
    this.subscriptions.add(this.ahvBeitragesSandbox.personenUnterstuetzt$.subscribe(dataExport => {
      if (!isNullOrUndefined(dataExport)) {
        this.listPersonenUnterstuetzt = dataExport;
        this.baPersonIDLookup = dataExport.filter(d => d.baPersonID);
      }
    }));
    this.subscriptions.add(this.ahvBeitragesSandbox.deleteAhvBeitragePosition$.subscribe(data => {
      if (isNullOrUndefined(data)) {
        return;
      }

      if (!isNullOrUndefined(data.bgPositionID)) {
        this.ahvBeitragesSandbox.getAHVBeitragPosition(this.ahvBeitragPositionRequestData);
        this.remainingMessage.hideMessage();
      } else {
        this.deleteHandleError(data);
      }
    }));
    this.subscriptions.add(this.ahvBeitragesSandbox.createAhvBeitragePosition$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        if (data.bgPositionID) {
          this.remainingMessage.hideMessage();
          this.isError = false;
          this.messageErr = '';
          this.newbgPositionID = data.bgPositionID;
          this.requestListDataGrid();
        } else {
          this.updateHandleError(data);
        }
      }
    }));
  }

  setEditMask(selectedNode) {
    if (selectedNode.editMask === 'R') {
      this.isSxMode = true;
      return;
    }
    this.isSxMode = false;
  }

  filterDataByDate() {
    this.formList.gridAhvBeitrage.instance.filter([
      ['datumVon', '<=', new Date(this.formDetail.datePopupSelect)],
    ]);
    setTimeout(() => {
      const listAfterFilter = this.formList.gridAhvBeitrage.instance.getVisibleRows();
      if (listAfterFilter.length === 0 || this.listAHVBeitragPosition.length === 0) {
        this.createNewWhenGridEmpty();
      } else if (!this.StatusContainer.isAddNew) {
        this.focusItemFristWithDateSelect(listAfterFilter);
      }
      this.formDetail.isClickPopUpDate = true;
      this.formDetail.visiblePopUpDate = false;
      if (this.formDetail.typeCreateNew !== 1) {
        this.StatusContainer.isBetrageAnpassen = true;
      }
      this.updateStatus(this.StatusContainer);
    }, CommonConstant.SetTimeOut300);
    this.isFillter = true;
  }

  handlingListAhvBeitrage(data, lookUps) {
    this.isError = false;
    this.listAHVBeitragPosition = this.convertDataGrid(data, lookUps);
    this.StatusContainer.dataSize = this.listAHVBeitragPosition.length;
    if (this.listAHVBeitragPosition.length > 0) {
      if ((this.StatusContainer.isAddNew || this.StatusContainer.isEdited || this.StatusContainer.isBetrageAnpassen) && !this.StatusContainer.isDelete) {
        const newAhvBeitragePosition = this.filterItemById(this.newbgPositionID);
        this.formDetail.isFormEditedData = true;
        if (!isNullOrUndefined(newAhvBeitragePosition)) {
          this.ahvBeitragPositionDetail = newAhvBeitragePosition;
          this.detailAhvBeitragePositionID = newAhvBeitragePosition.bgPositionID;
          this.selectedRowKey = [newAhvBeitragePosition.bgPositionID];
          this.formList.scrollToIndex(this.selectedRowKey);
        } else {
          this.createAhvDetailPosition(0);
        }
      } else if (this.StatusContainer.isDelete) {
        this.selectRowWhenDelete();
      } else {
        this.createAhvDetailPosition(0);
      }
    } else {
      setTimeout(() => {
        const listAfterFilter = this.formList.gridAhvBeitrage.instance.getVisibleRows();
        if (listAfterFilter.length === 0 || this.listAHVBeitragPosition.length === 0) {
          this.ahvBeitragPositionDetail = new AHVBeitragPosition();
        }
      }, CommonConstant.SetTimeOut300);
    }
    this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
    this.sozialhilfeTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
    if (this.StatusContainer.isAddNew || this.StatusContainer.isEdited && !this.StatusContainer.iscConcurrency) {
      this.StatusContainer.isAddNew = false;
      this.StatusContainer.isEdited = false;
      this.StatusContainer.isReadOnly = true;
      this.visibleListBtnNavigator(true);
    }
    if (this.StatusContainer.iscConcurrency) {
      this.StatusContainer.iscConcurrency = false;
    }
    if (this.StatusContainer.isBetrageAnpassen) {
      this.StatusContainer.isBetrageAnpassen = false;
    }
    if (this.StatusContainer.isErteilt) {
      this.clearFilter();
    }
    this.isLoading = false;
    this.updateStatus(this.StatusContainer);
  }

  convertDataGrid(data, lookUps) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < lookUps.length; j++) {
        if (data[i].bgBewilligungStatusCode === lookUps[j].code) {
          data[i].textStatus = lookUps[j].text;
        }
      }
    }
    return data;
  }

  checkTreeNodeSelected(id) {
    this.isBgSilTherapieEntzug = false;
    this.isKrankheits = false;
    switch (id) {
      case this.modulTreeID.BgSilAHVBeitrag:
        this.execlName = this.ExeclName.AHVBeitrag;
        this.btnNewName = this.translateService.instant('AhvBeitrage.Button.NeueAHVBeitrage');
        return this.GruppeCodeModule.BgSilAHVBeitrag;
      case this.modulTreeID.BgSilWiedereingliederung:
        this.execlName = this.ExeclName.BgSilWiedereingliederung;
        this.btnNewName = this.translateService.instant('AhvBeitrage.Button.NeueAHVBeitrageSituations');
        return this.GruppeCodeModule.BgSilWiedereingliederung;
      case this.modulTreeID.BgSilTherapieEntzug:
        this.execlName = this.ExeclName.BgSilTherapieEntzug;
        this.btnNewName = this.translateService.instant('AhvBeitrage.Button.NeueAHVBeitrageTherapie');
        this.isBgSilTherapieEntzug = true;
        return this.GruppeCodeModule.BgSilTherapieEntzug;
      case this.modulTreeID.BgSilKrankheitBehinderungLeistung:
        this.execlName = this.ExeclName.BgSilKrankheitBehinderungLeistung;
        this.btnNewName = this.translateService.instant('AhvBeitrage.Button.NeueAHVBeitrageKran');
        this.isKrankheits = true;
        return this.GruppeCodeModule.BgSilKrankheitBehinderungLeistung;
      case this.modulTreeID.BgSilSituationsbedingteLeistungen:
        this.execlName = this.ExeclName.BgSilSituationsbedingteLeistungen;
        this.btnNewName = this.translateService.instant('AhvBeitrage.Button.NeueAHVBeitrageLeistung');
        return this.GruppeCodeModule.BgSilSituationsbedingteLeistungen;
    }
  }

  focusItemFristWithDateSelect(listAfterFilter) {
    const currentItemId = this.ahvBeitragPositionDetail.bgPositionID;
    const itemWhenFilter = listAfterFilter.find(x => x.data.bgPositionID === currentItemId);
    if (isNullOrUndefined(itemWhenFilter)) {
      this.ahvBeitragPositionDetail = { ...listAfterFilter[listAfterFilter.length - 1].data };
    } else {
      this.ahvBeitragPositionDetail = { ...itemWhenFilter.data };
    }
    this.detailAhvBeitragePositionID = this.ahvBeitragPositionDetail.bgPositionID;
    this.ahvBeitragPositionDetail.datumVon = this.formDetail.datePopupSelect;
    this.selectedRowKey = [this.ahvBeitragPositionDetail.bgPositionID];
    this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
  }

  createNewWhenGridEmpty() {
    this.ahvBeitragPositionDetail = this.formDetail.createAHVBeitragPositionEmpty();
    this.ahvBeitragPositionDetail.betrag = 0;
    this.numberFormat = '#,##0.00';
    this.ahvBeitragPositionDetail.bgBudgetID = this.bgBudgetID;
    this.ahvBeitragPositionDetail.datumVon = this.formDetail.datePopupSelect;
    this.listAHVBeitragPosition.push(this.ahvBeitragPositionDetail);
    this.ahvBeitragPositionDetailTemplate = { ...this.ahvBeitragPositionDetail };
    this.StatusContainer.isAddNew = true;
    this.StatusContainer.isReadOnly = false;
    this.sozialhilfeTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: true,
      }
    );
    this.selectedRowKey = [this.ahvBeitragPositionDetail.bgPositionID];
    this.formDetail.isFormEditedData = false;
    this.updateStatus(this.StatusContainer);
  }

  selectRowWhenDelete() {
    let index = 0;
    if (this.indexItemDelete >= this.listAHVBeitragPosition.length) {
      index = this.indexItemDelete - 1;
    } else {
      index = this.indexItemDelete;
    }
    this.createAhvDetailPosition(index);
  }

  createAhvDetailPosition(index) {
    if (this.listAHVBeitragPosition.length === 0) {
      return;
    }
    if (index === -1) {
      this.ahvBeitragPositionDetail = { ... this.listAHVBeitragPosition[0] };
    } else {
      this.ahvBeitragPositionDetail = { ... this.listAHVBeitragPosition[index] };
    }
    this.detailAhvBeitragePositionID = this.ahvBeitragPositionDetail.bgPositionID;
    this.selectedRowKey = [this.ahvBeitragPositionDetail.bgPositionID];
    this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
  }

  deleteHandleError(data) {
    let message = '';
    if (data.status === 404) {
      message = this.translateService.instant('AhvBeitrage.MessageError.DeleteError');
    } else {
      message = data._body ? JSON.parse(data._body).message : this.translateService.instant('AhvBeitrage.MessageError.DeleteError');
    }
    this.StatusContainer.isDeleteError = true;
    this.remainingMessage.showMessage(message);
  }

  findItemByPostionId($e) {
    if (this.detailAhvBeitragePositionID) {
      this.ahvBeitragPositionDetail = { ...this.filterItemById(this.detailAhvBeitragePositionID) };
      this.selectedRowKey = [this.ahvBeitragPositionDetail.bgPositionID];
      this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
    }
  }

  requestListDataGrid() {
    this.isLoading = true;
    this.ahvBeitragPositionRequestData = {
      bgGruppeCode: this.bgGruppeCode ? this.bgGruppeCode : '',
      bgBudgetID: this.bgBudgetID ? this.bgBudgetID : '',
      datumVon: this.datumVon ? this.datumVon : '',
      datumBis: this.datumBis ? this.datumBis : '',
      concatKontoNrName: this.concatKontoNrName ? this.concatKontoNrName : ''
    };

    this.ahvBeitragesSandbox.getAHVBeitragPosition(this.ahvBeitragPositionRequestData);
  }

  updateHandleError(data) {
    switch (data.status) {
      case AppEnums.StatusCode.NOT_FOUND:
        this.remainingMessage.showMessage(this.translateService.instant('ExterneBerater.Messgage.MessageDelError'));
        this.StatusContainer.iscConcurrency = true;
        this.StatusContainer.iscBtnConcurrency = true;
        break;
      case AppEnums.StatusCode.INTERNAL_SERVER_ERROR:
        this.formDetail.showPopup(JSON.parse(data._body).message, 2);
        break;

      case AppEnums.StatusCode.CONCURRENCY:
        this.StatusContainer.iscConcurrency = true;
        this.StatusContainer.iscBtnConcurrency = true;
        this.newbgPositionID = this.ahvBeitragPositionDetail.bgPositionID;
        this.formDetail.showPopupConcurrency(JSON.parse(data._body).message);
        this.updateStatus(this.StatusContainer);
        break;

      default:
        break;
    }
  }

  updateStatus(event) {
    this.StatusContainer = { ...event };
    this.disabledGrid = !this.StatusContainer.isReadOnly || this.StatusContainer.isAddNew || this.StatusContainer.isBetrageAnpassen;
    this.visibleListBtnNavigator(this.StatusContainer.isReadOnly && !this.StatusContainer.isBetrageAnpassen);
  }

  createNew(event) {
    this.listAHVBeitragPosition.push(event);
    this.ahvBeitragPositionDetail = event;
    this.selectedRowKey = [this.ahvBeitragPositionDetail.bgPositionID];
    this.formList.gridAhvBeitrage.instance.selectRows(this.selectedRowKey, true);
  }

  clearFilter() {
    this.formList.gridAhvBeitrage.instance.clearFilter();
    this.isFillter = false;
    this.isError = false;
    this.StatusContainer.isBetrageAnpassen = false;
    this.updateStatus(this.StatusContainer);
  }

  onClickRowGrid(e) {
    this.StatusContainer.isDeleteError = false;
    this.ahvBeitragPositionDetail = { ...e };
    this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
    this.detailAhvBeitragePositionID = this.ahvBeitragPositionDetail.bgPositionID;
  }

  toolBarOnItemClick(event) {
    this.formList.toolBarTopOnItemClick(event);
  }
  isMatchObject(object: any, objectCompare: any): boolean {
    return JSON.stringify(object) === JSON.stringify(objectCompare);
  }

  remainingMessageEmit(event) {
    if (event.isError) {
      this.remainingMessage.showMessage(event.message);
    } else {
      this.remainingMessage.hideMessage();
    }
  }

  onCopyTitle() {
    let text;
    if (this.isShiftKeyDown) {
      text = this.baPersonID + ' ';
    } else {
      text = this.titleHeaderTree;
    }
    copyElement(text);
  }

  onCloseError() {
    this.isError = false;
    this.messageErr = '';
  }
  doCancel(isAddNew) {
    if (this.StatusContainer.iscConcurrency) {
      this.requestListDataGrid();
      this.StatusContainer.isAddNew = false;
      this.StatusContainer.isEdited = false;
      this.StatusContainer.isReadOnly = true;
    } else if (this.StatusContainer.isAddNew) {
      this.StatusContainer.isAddNew = false;
      this.StatusContainer.isReadOnly = true;
      this.listAHVBeitragPosition.splice(this.listAHVBeitragPosition.length - 1, 1);
      if (this.listAHVBeitragPosition.length > 0) {
        this.ahvBeitragPositionDetail = this.listAHVBeitragPosition[this.listAHVBeitragPosition.length - 1];
        this.selectedRowKey = [this.ahvBeitragPositionDetail.bgPositionID];
      } else {
        this.ahvBeitragPositionDetail = this.formDetail.createAHVBeitragPositionEmpty();
      }
      this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
    } else if (this.StatusContainer.isBetrageAnpassen) {
      this.StatusContainer.isAddNew = false;
      this.StatusContainer.isReadOnly = true;
      this.StatusContainer.isBetrageAnpassen = false;
      this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
    } else if (this.detailAhvBeitragePositionID) {
      this.ahvBeitragPositionDetail = this.filterItemById(this.detailAhvBeitragePositionID);
      this.selectedRowKey = [this.ahvBeitragPositionDetail.bgPositionID];
      this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
      this.visibleListBtnNavigator(true);
    }
    this.sozialhilfeTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
    this.messageErr = '';
    this.clearFilter();
  }

  deleteItemEmit($e) {
    this.indexItemDelete = this.formList.gridAhvBeitrage.instance.getRowIndexByKey(this.ahvBeitragPositionDetail.bgPositionID);
    this.ahvBeitragesSandbox.deleteAhvBeitragePosition({
      bgPositionID: this.ahvBeitragPositionDetail.bgPositionID,
      bgPositionTS: this.ahvBeitragPositionDetail.bgPositionTS,
      bgBewilligungStatusCode: this.ahvBeitragPositionDetail.bgBewilligungStatusCode,
      bgBudgetID: this.bgBudgetID,
      bgPositionID_CopyOf: this.ahvBeitragPositionDetail.bgPositionID_CopyOf,
    });
  }

  confirmYesBetrageAnpassen($e) {
    if (this.listAHVBeitragPosition.length > 0) {
      this.listAHVBeitragPosition.splice(this.listAHVBeitragPosition.length - 1, 1);
    }
    this.ahvBeitragPositionDetail = this.formDetail.createAHVBeitragPositionEmpty();
    this.selectedRowKey = [this.ahvBeitragPositionDetail.bgPositionID];
    this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
  }

  cancelBetrageAnpassen($e) {
    if (this.StatusContainer.isAddNew) {
      this.listAHVBeitragPosition.splice(this.listAHVBeitragPosition.length - 1, 1);
      this.ahvBeitragPositionDetail = this.listAHVBeitragPosition[this.listAHVBeitragPosition.length - 1];
    } else {
      const listAfterFilter = this.formList.gridAhvBeitrage.instance.getVisibleRows();
      if (listAfterFilter.length === 0) {
        if (this.listAHVBeitragPosition.length === 0) {
          this.ahvBeitragPositionDetail = this.formDetail.createAHVBeitragPositionEmpty();
        } else {
          this.ahvBeitragPositionDetail = this.listAHVBeitragPosition[0];
        }
      } else {
        const currentItemId = this.ahvBeitragPositionDetail.bgPositionID;
        const itemWhenFilter = listAfterFilter.find(x => x.data.bgPositionID === currentItemId);
        if (isNullOrUndefined(itemWhenFilter)) {
          this.ahvBeitragPositionDetail = { ...listAfterFilter[listAfterFilter.length - 1].data };
        } else {
          this.ahvBeitragPositionDetail = { ...itemWhenFilter.data };
        }
      }
      this.selectedRowKey = [this.ahvBeitragPositionDetail.bgPositionID];
      this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
    }
    this.selectedRowKey = [this.ahvBeitragPositionDetail.bgPositionID];
    this.ahvBeitragPositionDetailTemplate = { ... this.ahvBeitragPositionDetail };
    this.StatusContainer.isAddNew = false;
    this.StatusContainer.isReadOnly = true;
    this.visibleListBtnNavigator(true);
    this.clearFilter();
  }

  canDeactivate() {
    if (!this.StatusContainer.isReadOnly && this.isFormEdited()) {
      const message = this.translateService.instant('AhvBeitrage.Message.MessageExit');
      this.formDetail.showPopup(message, 3);
      return this.navigateAwaySelection$;
    }
    this.sozialhilfeTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
    return true;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.StatusContainer.isReadOnly && this.isFormEdited()) {
      return false;
    }
    return true;
  }

  canDeactivateEmit(value) {
    this.navigateAwaySelection$.next(value);
  }

  private isFormEdited() {
    return !this.isMatchObject(this.formDetail.ahvBeitragPositionDetail, this.formDetail.ahvBeitragPositionDetailTemplate);
  }

  filterItemById(id) {
    return this.listAHVBeitragPosition.find(x => x.bgPositionID === id);
  }

  // Shortcuts key
  @HostListener('window:keyup', ['$event'])
  public keyUpEvent(event: KeyboardEvent) {
    if ((event.keyCode === 16 || event.metaKey)) {
      event.preventDefault();
      this.isShiftKeyDown = false;
    }
  }
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: any) {
    // Ctrl + S
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 83) {
      event.preventDefault();
      if (this.formDetail.confirmDialogData.isVisible || this.isSxMode) {
        return;
      }
      this.formDetail.updateDataFormToSave();
      setTimeout(() => {
        if (this.StatusContainer.isAddNew || this.StatusContainer.isEdited || this.StatusContainer.isBetrageAnpassen) {
          if (this.isMatchObject(this.formDetail.ahvBeitragPositionDetail, this.formDetail.ahvBeitragPositionDetailTemplate)) {
            this.formDetail.doCancel();
            return;
          }
          if (!this.formDetail.checkValidationGrid()) {
            return;
          }
          this.formDetail.doSaveOrUpdateData();
          return;
        }
      }, CommonConstant.SetTimeOut300);
      return;
    }
    if ((event.shiftKey || event.metaKey)) {
      this.isShiftKeyDown = true;
      return;
    }
    // Ctrl + z
    if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyZ) {
      event.preventDefault();
      if (this.formDetail.confirmDialogData.isVisible || this.isSxMode) {
        return;
      }
      this.formDetail.updateDataFormToSave();
      setTimeout(() => {
        if (this.StatusContainer.isAddNew || this.StatusContainer.isEdited || this.StatusContainer.isBetrageAnpassen) {
          this.formDetail.doCancel();
        }
      }, CommonConstant.SetTimeOut300);
      return;
    }
    // Ctrl + I
    if ((event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyI) || event.key === 'I') {
      event.preventDefault();
      if (this.formDetail.confirmDialogData.isVisible || this.isSxMode) {
        return;
      }
      if (this.PermissionContainer.isPermissionNew) {
        if (this.BgSilAHVBeitrag.bgBewilligungStatusCode === this.BgBewilligungStatus.Gesperrt) {
          const error = {
            isError: true,
            message: this.translateService.instant('AhvBeitrage.MessageError.AllowEdit')
          };
          this.remainingMessageEmit(error);
          return;
        }
        if (this.StatusContainer.isEdited || this.StatusContainer.isAddNew) {
          return;
        }
        if (!this.StatusContainer.isBtnBAnpassen || this.StatusContainer.isBetrageAnpassen) {
          this.formDetail.createNew();
        } else {
          this.formDetail.typeCreateNew = 1;
          this.formDetail.showPopUpSelectDate();
        }
      }
      return;
    }

    // Ctrl + M
    if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyM && !this.StatusContainer.isDeleteError) {
      event.preventDefault();
      if (this.formDetail.confirmDialogData.isVisible || this.isSxMode) {
        return;
      }
      if (this.PermissionContainer.isPermissionRemove) {
        if (!this.ahvBeitragPositionDetail.bgPositionID) {
          return;
        }
        if (this.BgSilAHVBeitrag.bgBewilligungStatusCode === this.BgBewilligungStatus.Gesperrt) {
          const error = {
            isError: true,
            message: this.translateService.instant('AhvBeitrage.MessageError.AllowRemove')
          };
          this.remainingMessageEmit(error);
          return;
        }
        this.formDetail.remove();
      }
      return;
    }
  }

  moveFocus(isNext: boolean) {
    const tagNames = ['input', 'textarea'];
    for (const tagName of tagNames) {
      const elems = document.getElementsByTagName(tagName);
      for (const el of Array.from(elems)) {
        if (isNext) {
          if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused + 1) {
            (el as HTMLElement).focus();
            return;
          }
        } else {
          if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused - 1) {
            (el as HTMLElement).focus();
            return;
          }
        }
      }
    }
  }

  visibleListBtnNavigator(status: boolean) {
    if (status) {
      this.listBtn[0][0]['visible'] = true;
      this.listBtn[0][1]['visible'] = true;
      this.listBtn[0][2]['visible'] = true;
      this.listBtn[1][0]['visible'] = true;
      this.listBtn[1][1]['visible'] = true;
      this.listBtn[1][2]['visible'] = true;
      this.listBtn[1][3]['visible'] = true;
      this.listBtn[1][4]['visible'] = true;
      this.listBtn[1][5]['visible'] = true;
      this.listBtn[1][6]['visible'] = true;
      this.listBtn[1][7]['visible'] = false;
      this.listBtn[1][8]['visible'] = false;
    } else {
      this.listBtn[0][0]['visible'] = false;
      this.listBtn[0][1]['visible'] = false;
      this.listBtn[0][2]['visible'] = false;
      this.listBtn[1][0]['visible'] = false;
      this.listBtn[1][1]['visible'] = false;
      this.listBtn[1][2]['visible'] = false;
      this.listBtn[1][3]['visible'] = false;
      this.listBtn[1][4]['visible'] = false;
      this.listBtn[1][5]['visible'] = false;
      this.listBtn[1][6]['visible'] = false;
      this.listBtn[1][8]['visible'] = false;
    }
    this.listBtn = [...this.listBtn];
  }

  resetStatusContainer() {
    this.StatusContainer = {
      isAddNew: false,
      isReadOnly: true,
      isEdited: false,
      isBetrageAnpassen: false,
      isBtnBAnpassen: false,
      iscConcurrency: false,
      isDelete: false,
      isDeleteError: false,
      dataSize: 0,
      iscBtnConcurrency: false,
      isVisibleDateVon: false,
      isErteilt: false
    };
    this.updateStatus(this.StatusContainer);
  }

}


