import { BaseComponent } from '@shared/components/base.component';
import { Component, Injector, OnDestroy, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular/ui/form';
import { FaAktennotizSandbox } from '../../fa-aktennotiz.sandbox';
import {
  FaAktennotiz,
  FaAktennotizQueryModel,
  FaAktennotizDetailModel,
  FaAktennotizInsertUpdateModel,
  ModelQueryGetConfig
} from '../../models';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined, isArray } from 'util';
import { AppEnums } from '@shared/AppEnum';
import { copyElement } from '@shared/utilites/utilityHelpers';
import { CommonConstant } from '@shared/common/constant.common';
import { UtilService } from '@shared/utilites';
import { Router } from '@angular/router';
import { DxButtonComponent, DxSelectBoxComponent } from 'devextreme-angular';
import { FA_AKTENNOTIZ } from '@shared/common/fa-aktennotiz.common';
import { locale } from 'devextreme/localization';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { FaAktennotizGridComponent } from '../../components/fa-aktennotiz-grid/fa-aktennotiz-grid.component';
import { FaAktennotizCreateEditComponent } from '../../components/fa-aktennotiz-detail-edit/fa-aktennotiz-create-edit.component';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import * as moment from 'moment';
import { FaAktennotizSearchComponent } from '../../components/fa-aktennotiz-search/fa-aktennotiz-search.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { Subject } from 'rxjs';
import { FaAktennotizDetailViewComponent } from '../../components/fa-aktennotiz-detail-view/fa-aktennotiz-view.component';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { TabModuleFallbearbeitungSandbox } from '@app/kiss4-main/tab-module-fallbearbeitung/tab-module-fallbearbeitung.sandbox';
import { FaModulTreeSandbox } from '@app/kiss4-fallfuhrung/fa-modul-tree/fa-modul-tree.sandbox';
@Component({
  host: { '(document:keydown)': 'hotkeys($event)' },
  selector: 'app-fa-aktennotiz',
  templateUrl: './fa-aktennotiz.component.html',
  styleUrls: ['./fa-aktennotiz.component.scss']
})
@SetClassRight('CtlFaAktennotiz')
export class FaAktennotizComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {
  @ViewChild('faAktennotizCreateEditForm') faAktennotizCreateEditForm: DxFormComponent;
  @ViewChild('gridFaAktennotiz') gridFaAktennotiz: FaAktennotizGridComponent;
  @ViewChild('faAktennotizSearchForm') faAktennotizSearchForm: DxFormComponent;
  @ViewChild('buttonYes') buttonYes: DxButtonComponent;
  @ViewChild('kontaktart') kontaktart: DxSelectBoxComponent;
  @ViewChild('createEditComponent') createEditComponent: FaAktennotizCreateEditComponent;
  @ViewChild('searchComponent') searchComponent: FaAktennotizSearchComponent;
  @ViewChild('viewComponent') viewComponent: FaAktennotizDetailViewComponent;
  @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;
  messageCanDeactive?: any;
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
  listBtn = [[CommonConstant.ToolbarButtons[0], CommonConstant.ToolbarButtons[1]]];
  pageTitle = 'Besprechung';
  //#region "Declare variables for Search"
  isLogischesLoeschenActive = true;
  keyLoadEnum = {
    init: 'init',
    search: 'search',
    create: 'create',
    edit: 'edit',
    delete: 'delete',
    logischesLoeschen: 'logischesLoeschen',
    geloschter: 'geloschter',
    concurrencyReLoad: 'concurrencyReLoad'
  };
  keyLoad = this.keyLoadEnum.init;
  baPersonID: number;
  faAktennotizData: FaAktennotiz[];
  gridMitarbeiterDataSource: any = [];
  querySearch: FaAktennotizQueryModel;
  //#region Need fix after merge to develop
  userFa = '';
  //#endregion

  //#endregion

  //#region "Declare variables for grdiview"
  optionNameExport = 'export.fileName';
  optionFaAktennotizValue = 'FaAktennotiz';
  //#endregion

  //#region "Declare variables for detail view"
  faAktennotizDetail: FaAktennotizDetailModel = new FaAktennotizDetailModel();
  tagBoxDetailTheMenValue: number[];
  dauerData: any[] = [];
  //#endregion

  //#region "Declare variables for add, update, delete"
  isViewMode = true;
  faAktennotizUpdateModel: FaAktennotizInsertUpdateModel = new FaAktennotizInsertUpdateModel();
  faAktennotizInsertModel: FaAktennotizInsertUpdateModel = new FaAktennotizInsertUpdateModel();
  dataCreated: any;
  //#endregion

  //#region "Declare variables for another bussiness"

  private subscriptions: Subscription = new Subscription();
  messageErr = null;
  modelQueryConfig: ModelQueryGetConfig = new ModelQueryGetConfig();
  isVisibleDauer = false;
  rightClickColumnHeaderIndex = 0;
  clickColumnFilterIndex = 0;
  isShiftKeyDown = false;
  popUpConfirmModel: PopUpModel;
  popUpConcurrencyModel: PopUpModel;
  personCopyTitle: string;
  isClickDaten = false;
  isDisabledSpeichern = false;
  dateBoxDatumVonValue: Date;
  dateBoxDatumBisValue: Date;
  kontaktartData: any[];
  minDate = CommonConstant.MIN_DATE;
  maxDate = CommonConstant.MAX_DATE;
  theMenData: any;
  //#endregion
  constructor(
    injector: Injector,
    private ref: ChangeDetectorRef,
    public faAktennotizSandbox: FaAktennotizSandbox,
    public faModulTreeSandbox: FaModulTreeSandbox,
    public translateService: TranslateService,
    public utilService: UtilService,
    public router: Router,
    public tabModuleFallbearbeitungSandbox: TabModuleFallbearbeitungSandbox) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    this.popUpConfirmModel = this.initPopUpModel();
    this.popUpConcurrencyModel = this.initPopUpModel();
    this.faAktennotizSandbox.registerEvents();
  }
  setVisibleExportExcelAndPrint(isVisible) {
    this.listBtn[0][0].visible = isVisible;
    this.listBtn[0][1].visible = isVisible;
    this.listBtn = [...this.listBtn];
  }
  initData() {
    this.setTitle(this.translateService.instant(FA_AKTENNOTIZ.PAGETITLE));
    this.titlePage = '';
    this.modelQueryConfig.keyPath = 'System\\Fallfuehrung\\KorrespondenzDauer';
    this.modelQueryConfig.defaultValue = false;
    this.faAktennotizSandbox.loadKontaktartData();
    this.faAktennotizSandbox.loadTheMenData();
    this.faAktennotizSandbox.loadMitarbeiterData();
    this.faAktennotizSandbox.loadConfigData(this.modelQueryConfig);
  }
  initPopUpModel(): PopUpModel {
    return new PopUpModel(
      {
        title: '',
        isVisibleTitle: true,
        isVisible: false,
        message: '',
        textYes: '',
        isVisibleYes: true,
        textNo: '',
        isVisibleNo: true,
        funcYes: null,
        funcNo: null,
      }
    );
  }
  ngAfterViewInit(): void {
    this.registerEvents();
    this.faAktennotizSandbox.loadlogischesLoeschenConfig();
  }
  //#region "registerEvents function"
  private registerEvents() {
    this.subscriptions.add(this.translateService.onLangChange.subscribe(event => {
      this.setTitle(this.translateService.instant(FA_AKTENNOTIZ.PAGETITLE));
    }));
    // Register subscribe for selected person
    this.subscriptions.add(
      this.tabModuleFallbearbeitungSandbox.getPersonInfoTitel$.subscribe(data => {
        if (isNullOrUndefined(data) || data.status) {
          return;
        }
        this.personCopyTitle = data.titleText;
        this.pageTitle = this.personCopyTitle + ' > ' + this.translateService.instant('FaAktennotiz.EndTitleHeader');
      })
    );
    // Register subscribe for selected node from sidebar
    this.subscriptions.add(
      this.faModulTreeSandbox.selectedNode$.subscribe(selectedNode => {
        if (!isNullOrUndefined(selectedNode) && this.baPersonID !== selectedNode.baPersonID) {
          this.baPersonID = selectedNode.baPersonID;
          this.faAktennotizSandbox.loadDefaultKontartPartner(this.baPersonID);
          this.searchComponent.setFaleitungId(selectedNode.faLeistungID);
          this.defaultUIState();
          this.initData();
        }
      })
    );
    this.subscriptions.add(this.faAktennotizSandbox.faAktennotizsData$.subscribe(data => {
      if (!data || !isArray(data)) {
        return;
      }
      this.faAktennotizData = data;
      if (this.faAktennotizData.length > 0 && this.dataCreated) {
        const row = this.faAktennotizData.filter(x => x.FaAktennotizID === this.dataCreated.faAktennotizId)[0];
        this.gridFaAktennotiz.selectedRowKey = row ? row.index : -1;
        this.dataCreated = null;
      }
    }));
    this.subscriptions.add(this.faAktennotizSandbox.kontaktartData$.subscribe(data => {
      if (data && data.length > 0) {
        this.kontaktartData = data;
        this.kontaktartData.splice(0, 0, { code: 0, text: '' });
      }
    }));
    this.subscriptions.add(this.faAktennotizSandbox.mitarbeiterData$.subscribe(data => {
      this.gridMitarbeiterDataSource = data;
    }));
    this.subscriptions.add(this.faAktennotizSandbox.theMenData$.subscribe(data => {
      if (data && data.length > 0) {
        this.theMenData = data;
      }
    }));
    this.subscriptions.add(this.faAktennotizSandbox.addFaAktennotizenData$.subscribe(data => {
      if (data) {
        if (data.faAktennotizId > 0) {
          this.dataCreated = data;
          this.reLoadDataWithCurrentQuery();
          this.changeViewState(true);
        }
        if (data.status) {
          const body = JSON.parse(data._body);
          const message = body.message.toString();
          this.remainingMessage.showMessage(message);
        }
      }
    }));
    this.subscriptions.add(this.faAktennotizSandbox.deleteFaAktennotizenData$.subscribe(data => {
      if (data) {
        if (data.status) {
          this.concurrencyDeleteHandler(data);
          return;
        }
        if (data.faAktennotizId) {
          this.reLoadDataWithCurrentQuery();
          this.changeViewState(true);
          return;
        }
      }
    }));
    this.subscriptions.add(this.faAktennotizSandbox.updateFaAktennotizenData$.subscribe(data => {
      if (data) {
        if (data.status) {
          this.concurrencyUpdateHandler(data);
          return;
        }
        if (data.faAktennotizId > 0) {
          this.reLoadDataWithCurrentQuery();
          this.changeViewState(true);
        }
      }
    }));
    this.subscriptions.add(this.faAktennotizSandbox.dauerData$.subscribe(data => {
      this.dauerData = data;
      if (data) {
        this.dauerData.splice(0, 0, { code: 0, text: '' });
      }
    }));
    this.subscriptions.add(this.faAktennotizSandbox.configData$.subscribe(data => {
      if (!isNullOrUndefined(data) && !isNullOrUndefined(data.value)) {
        this.isVisibleDauer = data.value;
        this.faAktennotizSandbox.loadDauerData();
      }
    }));
    this.subscriptions.add(this.faAktennotizSandbox.dokumentAktennotizenData$.subscribe(data => {
      if (data && data.length === 0) {
        this.remainingMessage.showMessage(this.translateService.instant('FaAktennotizDetails.MessageDokumentNoTemplate'));
      }
    }));
    this.subscriptions.add(this.faAktennotizSandbox.defaultKontartPartnerData$.subscribe(data => {
      if (data) {
        this.userFa = data.name + ', ' + data.vorname;
      }
    }));
    this.subscriptions.add(this.faAktennotizSandbox.logischesLoeschenData$.subscribe(data => {
      if (data) {
        if (data.status) {
          return;
        }
        this.isLogischesLoeschenActive = data.value;
      }
    }));
    this.subscriptions.add(
      this.translateService.onLangChange.subscribe(event => {
        this.pageTitle = this.personCopyTitle + ' > ' + this.translateService.instant('FaAktennotiz.EndTitleHeader');
      })
    );
  }
  //#endregion

  //#region "Search region"
  setDisableBtn(isDisable) {
    if (this.createEditComponent) {
      this.createEditComponent.setDisableBtnLoschen(isDisable);
      this.createEditComponent.setDisableBtnSave(isDisable);
    }
    if (this.viewComponent) {
      this.viewComponent.setDisableBtnLoschen(isDisable);
      this.viewComponent.setDisableBtnGeloschterDatensatz(isDisable);
    }
  }
  mappingQuery(data: FaAktennotizQueryModel) {
    const newData = new FaAktennotizQueryModel();
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key] != null) {
        newData[key] = data[key];
      }
    }
    return newData;
  }
  onSearchEvent(event) {
    this.keyLoad = this.keyLoadEnum.search;
    this.faAktennotizSandbox.loadFaAktennotizInitData(this.searchComponent.getQuerySearch());
  }
  onRowPrepared(e) {
    if (e.data && e.data.IsDeleted) {
      e.rowElement.style.backgroundColor = '#FFA07A';
    }
  }
  //#endregion

  gridOnCellClick(e) {
    if (e.columnIndex !== 14) {
      return;
    }
    e.component.clearSelection();
  }
  toolBarOnItemClickTopGrd(event) {
    if (event === 'exportExcel') {
      this.gridFaAktennotiz.exportExcel();
      return;
    }
    if (event === 'printPdf') {
      this.gridFaAktennotiz.printPdf();
    }
  }
  FaAktennotizDetailMapField(data: FaAktennotiz): FaAktennotizDetailModel {
    if (!data) {
      return;
    }
    const dataMapping: FaAktennotizDetailModel = new FaAktennotizDetailModel();
    dataMapping.FaLeistungId = data.FaLeistungID;
    dataMapping.Created = data.Created;
    dataMapping.Creator = data.Creator;
    dataMapping.Datum = data.Datum;
    dataMapping.FaKontaktartCode = data.FaKontaktartCode;
    const listKontaktartFillter = this.kontaktartData ? this.kontaktartData.filter(x => x.code === data.FaKontaktartCode) : null;
    dataMapping.FaKontaktartText = (listKontaktartFillter && listKontaktartFillter.length > 0) ? listKontaktartFillter[0].text : '';
    dataMapping.FaThemaCodes = data.FaThemaCodes;
    this.tagBoxDetailTheMenValue = data.FaThemaCodes ? data.FaThemaCodes.split(',').map(item => +item) : [];
    dataMapping.FaThemaCodesText = data.FaThemaCodesText;
    dataMapping.InhaltRtf = data.InhaltRTF;
    dataMapping.IsDeleted = data.IsDeleted;
    dataMapping.Kontaktpartner = data.Kontaktpartner;
    dataMapping.Modified = data.Modified;
    dataMapping.Modifier = data.Modifier;
    dataMapping.Stichwort = data.Stichwort;
    dataMapping.UserId = data.UserID;
    const listAutorFillter = this.gridMitarbeiterDataSource ? this.gridMitarbeiterDataSource.filter(x => x.userID === data.UserID) : null;
    dataMapping.AutorText = (listAutorFillter && listAutorFillter.length > 0) ? listAutorFillter[0].name : '';
    dataMapping.FaAktennotizId = data.FaAktennotizID;
    dataMapping.FaAktennotizTs = data.FaAktennotizTS;
    dataMapping.FaDauerCode = data.FaDauerCode;
    return dataMapping;
  }
  onValueTagBoxThemenChanged(event) {
    this.faAktennotizDetail.FaThemaCodes = event.value.join(',');
  }
  //#endregion

  //#region "CRUD funtion"
  actionNew_OnClick(): any {
    this.innitCreateData();
    this.checkPencilTree(true);
    this.keyLoad = this.keyLoadEnum.create;
    this.changeViewState(false);
  }
  innitCreateData() {
    this.faAktennotizDetail.FaLeistungId = this.querySearch.faLeistungID;
    this.faAktennotizDetail.Datum = new Date();
    this.faAktennotizDetail.Kontaktpartner = this.userFa;
    this.faAktennotizDetail.UserId = +localStorage.getItem('user:userId');
    this.faAktennotizDetail.Created = new Date();
    this.faAktennotizDetail.Creator = localStorage.getItem('user:lastName') + ', ' + localStorage.getItem('user:firstName') + ' (' + localStorage.getItem('user:userId') + ')';
    this.faAktennotizDetail.Modified = this.faAktennotizDetail.Created;
    this.faAktennotizDetail.Modifier = null;
    this.faAktennotizDetail.FaKontaktartCode = null;
    this.faAktennotizDetail.InhaltRtf = null;
    this.faAktennotizDetail.FaDauerCode = null;
    this.faAktennotizDetail.FaThemaCodes = null;
    this.faAktennotizDetail.Stichwort = null;
    this.faAktennotizDetail.IsDeleted = false;
    this.tagBoxDetailTheMenValue = [];
  }
  mappingDataToInsert() {
    this.faAktennotizInsertModel.FaLeistungId = this.faAktennotizDetail.FaLeistungId;
    this.faAktennotizInsertModel.Datum = this.faAktennotizDetail.Datum ? moment(this.faAktennotizDetail.Datum).format('MM.DD.YYYY') : null;
    this.faAktennotizInsertModel.FaDauerCode = this.faAktennotizDetail.FaDauerCode;
    this.faAktennotizInsertModel.FaThemaCodes = this.faAktennotizDetail.FaThemaCodes;
    this.faAktennotizInsertModel.Kontaktpartner = this.faAktennotizDetail.Kontaktpartner;
    this.faAktennotizInsertModel.Stichwort = this.faAktennotizDetail.Stichwort;
    this.faAktennotizInsertModel.InhaltRtf = this.faAktennotizDetail.InhaltRtf;
    this.faAktennotizInsertModel.FaKontaktartCode = this.faAktennotizDetail.FaKontaktartCode;
    this.faAktennotizInsertModel.IsDeleted = this.faAktennotizDetail.IsDeleted;
    this.faAktennotizInsertModel.UserId = this.faAktennotizDetail.UserId;
  }
  mappingDataToUpdate() {
    this.faAktennotizUpdateModel.FaLeistungId = this.faAktennotizDetail.FaLeistungId;
    this.faAktennotizUpdateModel.FaAktennotizId = this.faAktennotizDetail.FaAktennotizId;
    this.faAktennotizUpdateModel.FaAktennotizTs = this.faAktennotizDetail.FaAktennotizTs;
    this.faAktennotizUpdateModel.Datum = this.faAktennotizDetail.Datum ? moment(this.faAktennotizDetail.Datum).format('MM.DD.YYYY') : null;
    this.faAktennotizUpdateModel.FaThemaCodes = this.faAktennotizDetail.FaThemaCodes;
    this.faAktennotizUpdateModel.Kontaktpartner = this.faAktennotizDetail.Kontaktpartner;
    this.faAktennotizUpdateModel.FaDauerCode = this.faAktennotizDetail.FaDauerCode;
    this.faAktennotizUpdateModel.Stichwort = this.faAktennotizDetail.Stichwort;
    this.faAktennotizUpdateModel.InhaltRtf = this.faAktennotizDetail.InhaltRtf;
    this.faAktennotizUpdateModel.FaKontaktartCode = this.faAktennotizDetail.FaKontaktartCode;
    this.faAktennotizUpdateModel.IsDeleted = this.faAktennotizDetail.IsDeleted;
    this.faAktennotizUpdateModel.UserId = this.faAktennotizDetail.UserId;
  }
  actionEdit_OnClick() {
    this.keyLoad = this.keyLoadEnum.edit;
    this.changeViewState(false);
    this.checkPencilTree(true);
  }

  actionSave_OnClick() {
    setTimeout(() => {
      if (!this.createEditComponent.validateForm()) {
        this.remainingMessage.showMessage(this.translateService.instant('FaAktennotiz.Message.RemainingValidate'));
        return;
      }
      this.cleanRemainingMessage();
      if (this.keyLoad === this.keyLoadEnum.create) {
        if (!this.createEditComponent.isFormDirty()) {
          this.changeViewState(true);
          return;
        }
        this.mappingDataToInsert();
        this.keyLoad = this.keyLoadEnum.create;
        this.faAktennotizInsertModel.Stichwort = this.faAktennotizInsertModel.Stichwort ? this.faAktennotizInsertModel.Stichwort.trim() : null;
        this.faAktennotizInsertModel.Kontaktpartner = this.faAktennotizInsertModel.Kontaktpartner ? this.faAktennotizInsertModel.Kontaktpartner.trim() : null;
        this.faAktennotizSandbox.addFaAktennotizen(this.faAktennotizInsertModel);
      } else if (this.keyLoad === this.keyLoadEnum.edit || this.keyLoad === this.keyLoadEnum.concurrencyReLoad) {
        this.mappingDataToUpdate();
        this.keyLoad = this.keyLoadEnum.edit;
        this.faAktennotizUpdateModel.Stichwort = this.faAktennotizUpdateModel.Stichwort ? this.faAktennotizUpdateModel.Stichwort.trim() : null;
        this.faAktennotizUpdateModel.Kontaktpartner = this.faAktennotizUpdateModel.Kontaktpartner ? this.faAktennotizUpdateModel.Kontaktpartner.trim() : null;
        this.faAktennotizSandbox.updateFaAktennotizen(this.faAktennotizUpdateModel);
      }
    }, 200);
  }
  actionGeloschterDatensatz_OnClick() {
    this.mappingDataToUpdate();
    this.faAktennotizUpdateModel.IsDeleted = false;
    this.keyLoad = this.keyLoadEnum.geloschter;
    this.faAktennotizSandbox.updateFaAktennotizen(this.faAktennotizUpdateModel);
  }
  reLoadDataWithCurrentQuery() {
    this.querySearch = this.searchComponent.getQuerySearch();
    this.faAktennotizSandbox.loadFaAktennotizInitData(this.mappingQuery(this.querySearch));
    if (this.keyLoad !== this.keyLoadEnum.edit) {
      this.faAktennotizDetail = new FaAktennotizDetailModel();
      this.faAktennotizDetail.Datum = null;
    }
  }
  defaultUIState() {
    this.changeViewState(true);
    this.querySearch = this.searchComponent.getQuerySearchInitAndResetQuerySearch();
    this.keyLoad = this.keyLoadEnum.init;
    this.faAktennotizSandbox.loadFaAktennotizInitData(this.mappingQuery(this.querySearch));
  }

  actionCancel_OnClick() {
    setTimeout(() => {
      if (this.keyLoad === this.keyLoadEnum.create) {
        if (this.createEditComponent.isFormDirty() || !this.createEditComponent.validateForm()) {
          this.showPopupConfirm(this.translateService.instant('FaAktennotiz.Message.MessageConfirmCancelCreate'),
            () => this.cancelConfirmYes(),
            () => this.popUpConfirmModel.isVisible = false);
          return;
        }
      }
      if ((this.keyLoad === this.keyLoadEnum.edit && this.createEditComponent.isFormDirty()) || !this.createEditComponent.validateForm()) {
        this.showPopupConfirm(this.translateService.instant('FaAktennotiz.Message.MessageConfirmCancelEdit'),
          () => this.cancelConfirmYes(),
          () => this.popUpConfirmModel.isVisible = false);
        return;
      }
      this.gridFaAktennotiz.selectRow();
      this.afterCancelled();
      this.changeViewState(true);
      this.ref.detectChanges();
    }, 200);
  }
  cancelConfirmYes() {
    this.popUpConfirmModel.isVisible = false;
    this.gridFaAktennotiz.selectRow();
    this.afterCancelled();
    this.changeViewState(true);
  }
  actionDokument_OnClick() {
    // TODO
  }
  onItemClickPopupToolBar(event) {
    switch (event.itemData.name) {
      case 'geloschter':
        this.onDelete();
        break;
      default:
        break;
    }
  }
  onDelete() {
    if (this.keyLoad === this.keyLoadEnum.create) {
      this.keyLoad = this.keyLoadEnum.delete;
      if (this.createEditComponent.isFormDirty()) {
        this.showPopupConfirm(this.translateService.instant('FaAktennotiz.Message.MessageConfirmDelete'),
          () => {
            this.popUpConfirmModel.isVisible = false;
            this.gridFaAktennotiz.selectRow();
            this.changeViewState(true);
          });
        return;
      }
      this.gridFaAktennotiz.selectRow();
      this.changeViewState(true);
      return;
    }
    if (!this.isLogischesLoeschenActive) {
      // message delete in db
      this.keyLoad = this.keyLoadEnum.delete;
      this.showPopupConfirm(this.translateService.instant('FaAktennotiz.Message.MessageConfirmDelete'),
        () => {
          this.faAktennotizSandbox.deleteFaAktennotizen({
            FaAktennotizID: this.faAktennotizDetail.FaAktennotizId,
            FaAktennotizTS: this.faAktennotizDetail.FaAktennotizTs
          });
          this.popUpConfirmModel.isVisible = false;
        });
      return;
    }
    if (this.faAktennotizDetail.IsDeleted) {
      this.remainingMessage.showMessage(this.translateService.instant('FaAktennotiz.Message.RemainingMessageCantDelete'));
      return;
    }
    this.showPopupConfirm(this.translateService.instant('FaAktennotiz.Message.MessageConfirmDeleteLogic'),
      () => this.deleteFaAktennotiz(),
      () => this.popUpConfirmModel.isVisible = false);
  }
  showPopupConfirm(message, funcYes?, funcNo?,
    textYes = this.translateService.instant('FaAktennotiz.Button.BtnYes'),
    textNo = this.translateService.instant('FaAktennotiz.Button.BtnNo'),
    title = this.translateService.instant('FaAktennotiz.Message.TitleConfirm')) {
    this.popUpConfirmModel.title = title;
    this.popUpConfirmModel.isVisible = true;
    this.popUpConfirmModel.textYes = textYes;
    this.popUpConfirmModel.textNo = textNo;
    this.popUpConfirmModel.message = message;
    this.popUpConfirmModel.funcYes = funcYes;
    this.popUpConfirmModel.funcNo = funcNo;
  }
  showPopupConcurrency(message, funcYes?, funcNo?, funcHidden?,
    textYes = this.translateService.instant('FaAktennotiz.Button.BtnAbbrechenConcurrency'),
    textNo = this.translateService.instant('FaAktennotiz.Button.BtnDatenAktualisieren'),
    title = this.translateService.instant('FaAktennotiz.Message.TitleConfirm')) {
    this.popUpConcurrencyModel.title = title;
    this.popUpConcurrencyModel.isVisible = true;
    this.popUpConcurrencyModel.textYes = textYes;
    this.popUpConcurrencyModel.textNo = textNo;
    this.popUpConcurrencyModel.message = message;
    this.popUpConcurrencyModel.funcYes = funcYes;
    this.popUpConcurrencyModel.funcNo = funcNo;
    this.popUpConcurrencyModel.funcHidden = funcHidden;
  }

  //#endregion

  //#region "Businness, load data for combox..."
  ngOnDestroy() {
    this.faAktennotizSandbox.resetState();
    this.unregisterEvents();
    this.faAktennotizSandbox.unregisterEvents();
  }

  public unregisterEvents() {
    this.subscriptions.unsubscribe();
  }
  @HostListener('window:beforeunload', ['$event'])
  public beforeunloadHandler($event) {
    if (this.isViewMode || this.createEditComponent.isFormDirty()) {
      return;
    }
    $event.returnValue = 'Are you sure?';

  }

  // Shortcuts key
  hotkeys(event) {
    if ((event.shiftKey || event.metaKey)) {
      this.isShiftKeyDown = true;
      return;
    }
  }
  deleteFaAktennotiz() {
    this.faAktennotizDetail = (this.faAktennotizData.filter(x => x.FaAktennotizID === this.faAktennotizDetail.FaAktennotizId).length > 0)
      ? this.FaAktennotizDetailMapField(this.faAktennotizData.filter(x => x.FaAktennotizID === this.faAktennotizDetail.FaAktennotizId)[0]) : null;
    this.mappingDataToUpdate();
    this.faAktennotizUpdateModel.IsDeleted = true;
    this.keyLoad = this.keyLoadEnum.logischesLoeschen;
    this.faAktennotizSandbox.updateFaAktennotizen(this.faAktennotizUpdateModel);
    this.popUpConfirmModel.isVisible = false;
  }
  onCopyTitle() {
    let text;
    if (this.isShiftKeyDown) {
      text = this.baPersonID.toString();
      this.remainingMessage.showMessage(this.translateService.instant('Fallfuhrung.Message.ShiftClickMessage') + ' (' + 'ID=' + this.baPersonID + ')');
    } else {
      text = this.personCopyTitle;
      this.remainingMessage.showMessage(this.translateService.instant('Fallfuhrung.Message.DoubleClickMessage'));
    }
    copyElement(text);
  }
  // Shortcuts key
  @HostListener('document:keyup', ['$event'])
  public keyUpEvent(event: KeyboardEvent) {
    if ((event.keyCode === 16 || event.metaKey)) {
      event.preventDefault();
      this.isShiftKeyDown = false;
    }
  }
  @HostListener('document:keydown', ['$event'])
  public hotKey(event: KeyboardEvent) {
    if ((event.shiftKey || event.metaKey)) {
      this.isShiftKeyDown = true;
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ && !this.isViewMode) {
      const result = this.createEditComponent.getCurrentValueDatum();
      this.faAktennotizDetail.Kontaktpartner = !isNullOrUndefined(this.faAktennotizDetail.Kontaktpartner) ? this.createEditComponent.getCurrentTextKontaktpartner() : null;
      this.faAktennotizDetail.Stichwort = !isNullOrUndefined(this.faAktennotizDetail.Stichwort) ? this.createEditComponent.getCurrentTextStichwort() : null;
      setTimeout(() => {
        this.actionCancel_OnClick();
        result.datebox.valueChangeEvent = 'focusout';
      }, 200);
      event.preventDefault();
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyM && (!this.popUpConcurrencyModel.isVisible && !this.popUpConfirmModel.isVisible)) {
      this.onDelete();
      event.preventDefault();
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS && (!this.popUpConcurrencyModel.isVisible && !this.popUpConfirmModel.isVisible)) {
      this.actionSave_OnClick();
      event.preventDefault();
      return;
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyI && this.isViewMode && (!this.popUpConcurrencyModel.isVisible && !this.popUpConfirmModel.isVisible)) {
      this.actionNew_OnClick();
      event.preventDefault();
      return;
    }
    if (event.altKey && event.keyCode === AppEnums.KeyCode.KeyEnter && this.isViewMode && (!this.popUpConcurrencyModel.isVisible && !this.popUpConfirmModel.isVisible)) {
      this.searchComponent.onSearchByButton();
      return;
    }
  }
  checkPencilTree(isShow: boolean) {
    this.faModulTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: isShow,
      }
    );
  }
  onShownConfirm() {
    this.buttonYes.instance.focus();
  }
  cleanRemainingMessage() {
    this.remainingMessage.hideMessage();
  }
  concurrencyCancel() {
    // disable button save
    this.setDisableBtn(true);
    this.popUpConcurrencyModel.isVisible = false;
  }
  concurrencyReloadData() {
    this.keyLoad = this.keyLoadEnum.concurrencyReLoad;
    this.reLoadDataWithCurrentQuery();
    this.popUpConcurrencyModel.isVisible = false;
  }
  concurrencyUpdateHandler(data) {
    switch (data.status) {
      case AppEnums.StatusCode.NOT_FOUND:
        // concurrency case update - deleted (1)
        this.remainingMessage.showMessage(this.translateService.instant('FaAktennotiz.Message.ConcurrencyMessUpdateRecordDeleted'));
        this.setDisableBtn(true);
        break;
      case AppEnums.StatusCode.CONCURRENCY:
        this.showPopupConcurrency(this.translateService.instant('FaAktennotiz.Message.ConcurrencyMessUpdateRecordUpdated'),
          () => this.concurrencyCancel(),
          () => this.concurrencyReloadData(),
          () => this.concurrencyCancel());
        // concurrency case update - updated (3)
        break;
      default:
        break;
    }
  }
  concurrencyDeleteHandler(data) {
    switch (data.status) {
      case AppEnums.StatusCode.NOT_FOUND:
        // concurrency case delete - deleted (2)
        this.remainingMessage.showMessage(this.translateService.instant('FaAktennotiz.Message.ConcurrencyMessErrorWhenDelete'));
        this.setDisableBtn(true);
        break;
      case AppEnums.StatusCode.CONCURRENCY:
        // concurrency case delete - updated (4)
        this.remainingMessage.showMessage(this.translateService.instant('FaAktennotiz.Message.ConcurrencyMessErrorWhenDelete'));
        this.setDisableBtn(true);
        break;
      default:
        break;
    }
  }
  changeViewState(toViewMode: boolean) {
    this.cleanRemainingMessage();
    this.isViewMode = toViewMode;
    this.checkPencilTree(!toViewMode);
    this.setVisibleExportExcelAndPrint(toViewMode);
  }
  canDeactivate() {
    if (!this.isViewMode && this.createEditComponent.isFormDirty()) {
      this.showPopupConfirm(this.translateService.instant('FaAktennotiz.NavigatorPopupConfirm.Message'),
        () => this.navigatorConfirmYes(),
        () => this.navigatorConfirmNo(),
        this.translateService.instant('FaAktennotiz.NavigatorPopupConfirm.Yes'),
        this.translateService.instant('FaAktennotiz.NavigatorPopupConfirm.No'),
        this.translateService.instant('FaAktennotiz.NavigatorPopupConfirm.Title')
      );
      return this.navigateAwaySelection$;
    } else {
      this.checkPencilTree(false);
      return true;
    }
  }
  navigatorConfirmYes() {
    this.isViewMode = true;
    this.checkPencilTree(false);
    this.navigateAwaySelection$.next(true);
    this.popUpConfirmModel.isVisible = false;
  }
  navigatorConfirmNo() {
    this.navigateAwaySelection$.next(false);
    this.popUpConfirmModel.isVisible = false;
  }
  afterCancelled() {
  }
  onRowFocusing(rowData) {
    this.remainingMessage.hideMessage();
    if (rowData) {
      this.faAktennotizDetail = this.FaAktennotizDetailMapField(rowData);
      return;
    }
    this.faAktennotizDetail = new FaAktennotizDetailModel();
    this.faAktennotizDetail.Datum = null;
  }
  //#endregion
}
