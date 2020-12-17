import { Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { BaseComponent } from '@shared/components/base.component';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { IPopUpModel } from '@shared/models/shared/popup-confirm.model';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { isUndefined, isNullOrUndefined, isNull } from 'util';

import { VersicherungsleistungenSandbox } from '@app/kiss4-sozialhilfe/finanzplan/versicherungsleistungen/versicherungsleistungen.sandbox';
import { Einkommen } from '../models';
import { TabModuleFallbearbeitungSandbox } from '@app/kiss4-main/tab-module-fallbearbeitung/tab-module-fallbearbeitung.sandbox';
import { isEmpty } from 'lodash-es';
import { CommonConstant } from '@shared/common/constant.common';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';

enum Code {
  errorMoney = 'errorMoney',
  headerDblClicked = 'headerDblClicked',
  headerShiftDblClicked = 'headerShiftDblClicked',
  bearbeiten = 'bearbeiten',
  neues = 'neues',
  speichern = 'speichern',
  abbrechen = 'abbrechen',
  loschen = 'loschen',
  delete = 'delete'
}

@Component({
  selector: 'kiss-versicherungsleistungen',
  templateUrl: './versicherungsleistungen.component.html',
  styleUrls: ['./versicherungsleistungen.component.scss']
})

export class VersicherungsleistungenComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  idParams: any;
  einkommenData: Einkommen[];
  artDerVersicherungData: any;
  personList: any;
  editMask: any;
  bgBudgetID: number;
  deleteRecordPosition = -1;
  bgFinanzplanID: number;

  constructor(
    injector: Injector,
    public translateService: TranslateService,
    public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
    public router: Router,
    public route: ActivatedRoute,
    public layoutSandbox: LayoutSandbox,
    public versicherungsleistungenSandbox: VersicherungsleistungenSandbox,
    public tabModuleFallbearbeitungSandbox: TabModuleFallbearbeitungSandbox
  ) {
    super(injector);
  }

  @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;
  @ViewChild('detailForm') detailForm: any;
  @ViewChild('formList') formList: any;
  @ViewChild('viewForm') viewForm: any;

  visibleConcurrencyPopup = false;
  isDirtyForm = false;
  isEditMode = false;
  isShiftKeyDown = false;
  accessKeyItemFocused = 0;
  gridKey: number;
  nurAktuelleAnzeigenValue = false;
  isNavigator = false;
  nameTypeFromAction: string;
  namePopup = '';
  rowDetail: any = {};
  rowDataEdit: any = {};
  popUpModel: IPopUpModel = {
    funcYes: () => {
      this.popUpModel.isVisible = false;
      this.setEditMode(false);
    },
    funcNo: () => {
      this.popUpModel.isVisible = false;
      if (this.namePopup === Code.errorMoney) {
        this.getGridData();
        this.setEditMode(false);
      }
    },
    message: '',
    textYes: '',
    textNo: '',
    title: '',
    isVisibleTitle: true,
    isVisibleYes: true,
    isVisibleNo: true,
    isVisible: false,
  };
  gridAction$ = new BehaviorSubject<string>(null);
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();

  pageTitleTabModule: string;
  numberFormat = CommonConstant.FormatNumberN2;
  dateFormat = CommonConstant.DATE_FORMAT.dd_MM_yyyy;
  monthYearFormat = CommonConstant.DATE_FORMAT.MMMM_yyyy;
  fileName = 'Einkommen aus Versicherungsleistungen';
  bgBewilligungStatusCode: number;
  tempId = -1;

  personenData = {
    baPersonID: 0,
    datumBis: '01.01.1000',
    datumVon: '01.01.1000'
  };
  columnsDataGrid = [];
  summaryDef = [
    { column: 'Betrag', summaryType: 'sum', displayFormat: '{0}', valueFormat: this.numberFormat }
  ];
  gridFunctionModel: GridSettingModel = new GridSettingModel();

  private subscriptions = new Subscription();


  ngOnInit() {
    this.registerEvents();
    this.initGridColumn();
  }

  getGridData() {
    this.versicherungsleistungenSandbox.loadEinkommenFunc({
      bgBudgetID: this.bgBudgetID,
      bgGruppeCode: 3103,
      nurAktuelle: this.nurAktuelleAnzeigenValue
    });
  }

  private registerEvents(): void {
    this.subscriptions.add(this.tabModuleFallbearbeitungSandbox.getPersonInfoTitel$.subscribe(data => this.onGetPersonInfoTitel(data)));
    this.subscriptions.add(this.sozialhilfeTreeSandbox.selectedNode$.subscribe(data => this.onSelectedNode(data)));
    this.subscriptions.add(this.versicherungsleistungenSandbox.einkommenData$.subscribe(data => this.onEinkommenData(data)));
    this.subscriptions.add(this.versicherungsleistungenSandbox.getEinkommenLookUpData$.subscribe(data => this.onGetEinkommenLookUpData(data)));
    this.subscriptions.add(this.versicherungsleistungenSandbox.postEinkommenResult$.subscribe(data => this.onPostEinkommenResult(data)));
    this.subscriptions.add(this.versicherungsleistungenSandbox.putEinkommenResult$.subscribe(data => this.onPutEinkommenResult(data)));
    this.subscriptions.add(this.versicherungsleistungenSandbox.deleteEinkommenResult$.subscribe(data => this.onDeleteEinkommenResult(data)));
    this.subscriptions.add(this.translateService.onLangChange.subscribe(event => { this.initGridColumn(); }));
  }

  initGridColumn() {
    this.columnsDataGrid = [
      { minWidth: 150, width: 'auto', alignment: '', dataType: 'date', dataField: 'DatumVon', caption: this.translateService.instant('Versicherungsleistungen.List.GultigAb'), format: this.monthYearFormat, sortIndex: 1 },
      { minWidth: 100, width: 'auto', alignment: '', dataType: 'string', dataField: 'NameVorname', caption: this.translateService.instant('Versicherungsleistungen.List.Name'), format: '', sortIndex: 2 },
      { minWidth: 100, width: 'auto', alignment: '', dataType: 'date', dataField: 'Geburtsdatum', caption: this.translateService.instant('Versicherungsleistungen.List.Geburtsdatum'), format: this.dateFormat, sortIndex: 2 },
      { minWidth: 150, width: 'auto', alignment: '', dataType: 'string', dataField: 'Buchungstext', caption: this.translateService.instant('Versicherungsleistungen.List.ArtDerVersicherung'), format: this.numberFormat, sortIndex: 2 },
      { minWidth: 170, width: 'auto', alignment: '', dataType: 'number', dataField: 'Betrag', caption: this.translateService.instant('Versicherungsleistungen.List.Einkommen'), format: this.numberFormat, sortIndex: 2 }
    ];
  }

  onDeleteEinkommenResult(data: any): void {
    if (!isNullOrUndefined(data)) {
      if (!isNullOrUndefined(data.bgPositionId)) {
        this.setEditMode(false);
        this.isDirtyForm = false;
        this.getGridData();
      } else if (data.status === AppEnums.StatusCode.FORBIDDEN) {
        this.remainingMessage.showMessage(this.translateService.instant('Versicherungsleistungen.Message.Rights'));
      } else if (data.status === AppEnums.StatusCode.NOT_FOUND) {
        if (this.isEditMode) {
          this.detailForm.disableButtons(true);
        } else {
          this.viewForm.disableDelete(true);
        }
        this.remainingMessage.showMessage(this.translateService.instant('Versicherungsleistungen.Message.DeleteConcurrency'));
      } else if (data.status === AppEnums.StatusCode.INTERNAL_SERVER_ERROR) {
        this.showPopup(Code.errorMoney);
      } else if (data.status === AppEnums.StatusCode.CONCURRENCY) {
        if (this.isEditMode) {
          this.detailForm.disableButtons(true);
        } else {
          this.viewForm.disableDelete(true);
        }
        this.remainingMessage.showMessage(this.translateService.instant('Versicherungsleistungen.Message.DeleteConcurrency'));
      } else if (!isNullOrUndefined(data._body)) {
        this.remainingMessage.showMessage(this.translateService.instant('Versicherungsleistungen.Message.Delete428'));
      }
    }
  }
  onPutEinkommenResult(data: any): void {
    if (isNullOrUndefined(data)) {
      return;
    }
    if (!isNullOrUndefined(data.bgPositionId)) {
      this.einkommenData = [];
      this.gridKey = -1;
      this.getGridData();
      this.setEditMode(false);
      setTimeout(() => {
        this.gridKey = data.bgPositionId;
      }, CommonConstant.SetTimeOut300);
    } else if (data.status === AppEnums.StatusCode.NOT_FOUND) {
      this.detailForm.disableButtons(true);
      this.remainingMessage.showMessage(this.translateService.instant('Versicherungsleistungen.Message.UpdateConcurrency'));
    } else if (data.status === AppEnums.StatusCode.CONCURRENCY) {
      this.visibleConcurrencyPopup = true;
    } else if (data.status === AppEnums.StatusCode.INTERNAL_SERVER_ERROR) {
      this.showPopup(Code.errorMoney);
    } else if (data.status === AppEnums.StatusCode.FORBIDDEN) {
      this.remainingMessage.showMessage(this.translateService.instant('Versicherungsleistungen.Message.Rights'));
    } else if (!isNullOrUndefined(data._body)) {
      this.remainingMessage.showMessage(this.translateService.instant('Versicherungsleistungen.Message.UpdateConcurrency'));
    }
  }
  onPostEinkommenResult(data: any): void {
    if (isNullOrUndefined(data)) {
      return;
    }
    if (data.status === AppEnums.StatusCode.INTERNAL_SERVER_ERROR) {
      this.showPopup(Code.errorMoney);
      return;
    }
    if (data.status === AppEnums.StatusCode.FORBIDDEN) {
      this.remainingMessage.showMessage(this.translateService.instant('Versicherungsleistungen.Message.Rights'));
      return;
    }
    if (!isNullOrUndefined(data._body)) {
      this.remainingMessage.showMessage(this.translateService.instant('Versicherungsleistungen.Message.InsertFail'));
      return;
    }
    this.getGridData();
    this.setEditMode(false);
    setTimeout(() => {
      this.gridKey = data.bgPositionId;
    }, 300);
  }
  onGetEinkommenLookUpData(data: any): void {
    if (isNullOrUndefined(data)) {
      return;
    }
    if (!isNullOrUndefined(data._body)) {
      const message = JSON.parse(data._body);
      this.remainingMessage.showMessage(message.message);
      return;
    }
    if (!isNullOrUndefined(data) && !isEmpty(data)) {
      this.artDerVersicherungData = data.einkommens;
      this.personList = data.persons;
      this.bgBewilligungStatusCode = data.bgBewilligungStatusCode;
      this.personenData.datumBis = data.title.finanzplanBis;
      this.personenData.datumVon = data.title.finanzplanVon;
      this.bgFinanzplanID = data.title.bgFinanzplanID;
    }
  }

  onEinkommenData(data: Einkommen[]): void {
    if (isNullOrUndefined(data)) {
      return;
    }
    this.einkommenData = data;
    this.einkommenData.sort((a, b) => (a.BgPositionID > b.BgPositionID) ? 1 : ((b.BgPositionID > a.BgPositionID) ? -1 : 0));
    if (this.deleteRecordPosition > -1 && this.einkommenData.length > 0) {
      this.gridKey = this.einkommenData[0].BgPositionID;
      this.deleteRecordPosition = -1;
    }
    if (this.tempId !== -1 && this.einkommenData.length > 0) {
      this.gridKey = this.tempId;
      this.rowDataEdit = this.einkommenData.find(x => x.BgPositionID === this.tempId);
      this.tempId = -1;
    }

    if (this.isNavigator) {
      this.setEditMode(false);
      this.isNavigator = false;
      this.resetGrid();
    }
  }
  onSelectedNode(data: any): void {
    if (!data) {
      return;
    }
    this.personenData.baPersonID = data.baPersonID;
    this.editMask = data.editMask;
    this.bgBudgetID = data.bgBudgetID;

    if (data.className = 'CtlBgVersicherung') {
      this.versicherungsleistungenSandbox.loadEinkommenFunc({
        bgBudgetID: data.bgBudgetID,
        bgGruppeCode: 3103,
        nurAktuelle: false
      });
      this.versicherungsleistungenSandbox.getEinkommenLookUpFunc(
        data.bgBudgetID
      );
    }
  }
  onGetPersonInfoTitel(data: any): void {
    if (isNullOrUndefined(data) || data.status) {
      return;
    }
    this.pageTitleTabModule = data.titleText;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onHeaderAction(event: string) {
    this.formList.toolBarOnItemClick(event);
  }

  onFormAction(action: { actionName: string, data?: any }) {
    this.remainingMessage.hideMessage();
    switch (action.actionName) {
      case Code.bearbeiten:
        this.rowDataEdit = Object.assign({}, this.rowDetail);
        this.nameTypeFromAction = 'edit';
        this.setEditMode(true);
        break;
      case Code.neues:
        this.nameTypeFromAction = 'add';
        this.rowDataEdit = {};
        this.setEditMode(true);
        break;
      case Code.speichern:
        if (action.data !== false) {
          this.saveEinkommen(action.data);
        } else {
          this.remainingMessage.showMessage(this.translateService.instant('Versicherungsleistungen.Message.InValidData'));
        }
        break;
      case Code.abbrechen:
        if (this.isDirtyForm) {
          this.showPopup('cancel');
          this.nameTypeFromAction = 'edit-mode';
          return;
        }
        this.setEditMode(false);
        this.popUpModel.isVisible = false;
        break;
      case Code.loschen:
        this.showPopup(Code.delete);
        break;
    }
  }

  private saveEinkommen(data) {
    if (isNullOrUndefined(data.BgPositionID)) {
      this.versicherungsleistungenSandbox.postEinkommenFunc({
        BgBudgetID: this.bgBudgetID,
        BaPersonID: data.BaPersonID,
        BgPositionsartID: data.BgPositionsartID,
        Betrag: data.Betrag,
        Buchungstext: data.Buchungstext,
        VerwaltungSD: data.VerwaltungSD,
        Bemerkung: data.Bemerkung,
        BgFinanzplanID: this.bgFinanzplanID
      });
    } else {
      data.bgFinanzplanID = this.bgFinanzplanID;
      this.versicherungsleistungenSandbox.putEinkommenFunc(
        {
          BgPositionID: data.BgPositionID,
          BgBudgetID: this.bgBudgetID,
          BaPersonID: data.BaPersonID,
          BgPositionsartID: data.BgPositionsartID,
          Betrag: data.Betrag,
          Buchungstext: data.Buchungstext,
          VerwaltungSD: data.VerwaltungSD,
          Bemerkung: data.Bemerkung,
          BgPositionTS: data.BgPositionTS,
          BgFinanzplanID: this.bgFinanzplanID
        }
      );
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyI && !this.isEditMode) {
      event.preventDefault();
      if (!this.viewForm.customizeBtn[0]['disabled']) {
        this.nameTypeFromAction = 'add';
        this.rowDataEdit = {};
        this.setEditMode(true);
      }
      return;
    } else if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyM) {
      event.preventDefault();
      if ((!isNullOrUndefined(this.viewForm) && !this.viewForm.customizeBtn[2]['disabled'])
        || (!isNullOrUndefined(this.detailForm) && !this.detailForm.customizeBtn[2]['disabled'])) {
        if (!this.isEditMode || this.nameTypeFromAction === 'edit') {
          this.showPopup(Code.delete);
        } else {
          this.onFormAction({ actionName: Code.abbrechen });
        }
      }
      return;
    } else if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ) {
      const el = document.querySelector(':focus');
      if (el) {
        (el as HTMLElement).blur();
      }
      event.preventDefault();
      if (this.isDirtyForm) {
        this.showPopup('cancel');
        this.nameTypeFromAction = 'edit-mode';
        return;
      }
      this.setEditMode(false);
      this.popUpModel.isVisible = false;
      return;
    }
  }

  private setEditMode(isEditMode) {
    this.isEditMode = isEditMode;
    this.remainingMessage.hideMessage();
    this.isDirtyForm = false;
    this.sozialhilfeTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: isEditMode
      });
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
  }

  private showPopup(type) {
    this.popUpModel.isVisible = true;
    this.namePopup = type;
    switch (type) {
      default:
      case 'cancel': {
        this.popUpModel.title = this.translateService.instant('Versicherungsleistungen.Message.Title');
        this.popUpModel.message = isUndefined(this.rowDataEdit.BgPositionID) ? this.translateService.instant('Versicherungsleistungen.Message.CancelAdd')
          : this.translateService.instant('Versicherungsleistungen.Message.ConfirmDeactive');
        this.popUpModel.textYes = this.translateService.instant('Versicherungsleistungen.Button.Yes');
        this.popUpModel.textNo = this.translateService.instant('Versicherungsleistungen.Button.No');
        this.popUpModel.isVisibleYes = true;
        this.popUpModel.isVisibleNo = true;
        this.popUpModel.funcYes = () => {
          this.setEditMode(false);
          this.popUpModel.isVisible = false;
          this.isDirtyForm = false;
          this.remainingMessage.hideMessage();
        };
        this.popUpModel.funcNo = () => {
          this.popUpModel.isVisible = false;
        };
        break;
      }
      case 'changeform': {
        this.popUpModel.title = this.translateService.instant('Versicherungsleistungen.Message.Title');
        this.popUpModel.message = this.translateService.instant('Versicherungsleistungen.Message.ConfirmMessage');
        this.popUpModel.textYes = this.translateService.instant('Versicherungsleistungen.Button.Discard');
        this.popUpModel.textNo = this.translateService.instant('Versicherungsleistungen.Button.Abbrechen');
        this.popUpModel.isVisibleYes = true;
        this.popUpModel.isVisibleNo = true;
        this.popUpModel.funcYes = () => {
          this.setEditMode(false);
          this.sozialhilfeTreeSandbox.updateNodesStatus(
            {
              id: this.router.url,
              isEditMode: false,
            }
          );
          this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
          this.navigateAwaySelection$.next(true);
          this.popUpModel.isVisible = false;
        };
        this.popUpModel.funcNo = () => {
          this.layoutSandbox.clearDeletingSticky();
          this.navigateAwaySelection$.next(false);
          this.popUpModel.isVisible = false;
          return false;
        };
        break;
      }
      case Code.delete: {
        this.popUpModel.title = this.translateService.instant('Versicherungsleistungen.Message.Title');
        this.popUpModel.message = this.translateService.instant('Versicherungsleistungen.Message.ConfirmDelete');
        this.popUpModel.textYes = this.translateService.instant('Versicherungsleistungen.Button.Yes');
        this.popUpModel.textNo = this.translateService.instant('Versicherungsleistungen.Button.No');
        this.popUpModel.isVisibleYes = true;
        this.popUpModel.isVisibleNo = true;
        this.popUpModel.funcYes = () => {
          this.popUpModel.isVisible = false;
          this.deleteEinkommen();
        };
        this.popUpModel.funcNo = () => {
          this.popUpModel.isVisible = false;
        };
        break;
      }
      case Code.errorMoney: {
        this.popUpModel.title = this.translateService.instant('PersonenImHaushalt.TitleInformationMessage');
        this.popUpModel.isVisibleYes = false;
        this.popUpModel.isVisibleNo = false;
        this.popUpModel.message = this.translateService.instant('Erwerbseinkommen.Messager.NumberMoneyError');
        this.versicherungsleistungenSandbox.resetState();
        break;
      }
    }
  }

  deleteEinkommen() {
    for (let i = 0; i < this.einkommenData.length; i++) {
      if (this.einkommenData[i].BgPositionID === this.rowDetail.BgPositionID) {
        this.deleteRecordPosition = i;
      }
    }

    this.versicherungsleistungenSandbox.deleteEinkommenFunc({
      BgPositionID: this.rowDetail.BgPositionID,
      BgPositionTS: this.rowDetail.BgPositionTS,
      BgBudgetID: this.bgBudgetID
    });
  }

  canDeactivate() {
    this.isNavigator = true;
    if (this.isDirtyForm) {
      this.showPopup('changeform');
      return this.navigateAwaySelection$;
    }
    this.setEditMode(false);
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    return true;
  }

  setDirtyForm(event: boolean) {
    this.isDirtyForm = event;
  }
  onConcurrencyYes() {
    this.tempId = this.rowDetail.BgPositionID;
    this.visibleConcurrencyPopup = false;
    this.remainingMessage.hideMessage();
    this.getGridData();
  }

  onConcurrencyNo() {
    this.visibleConcurrencyPopup = false;
    this.detailForm.disableButtons(true);
  }

  onCheckBoxChange(value) {
    this.getGridData();
  }

  onSelectedRow(rowData) {
    this.remainingMessage.hideMessage();
    if (isNullOrUndefined(rowData)) {
      this.rowDetail = new Einkommen();
      return;
    }
    this.rowDetail = rowData;
  }

  resetGrid() {
    this.gridFunctionModel.isFilterBuilder = false;
    this.gridFunctionModel.isSearchPanel = false;
    this.gridFunctionModel.isFilter = false;
    this.gridFunctionModel.isSearch = true;
    this.gridFunctionModel.isGrouping = false;
    this.formList.reset();
  }
}
