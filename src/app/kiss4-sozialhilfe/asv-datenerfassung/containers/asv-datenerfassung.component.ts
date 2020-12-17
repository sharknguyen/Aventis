import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  TabModuleFallbearbeitungSandbox,
} from '@app/kiss4-main/tab-module-fallbearbeitung/tab-module-fallbearbeitung.sandbox';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { CanDeactivateComponent } from '@shared/components/can-deactivate/can-deactivate.component';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { copyElement, getConditionListBtn, UtilService } from '@shared/utilites';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { Subject, Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';

import { AsvDatenerfassungSandbox } from '../asv-datenerfassung.sandbox';
import {
  AsvDatenerfassungDetailditComponent,
} from '../components/asv-datenerfassung-detail-edit/asv-datenerfassung-detail-edit.component';
import {
  AsvDatenerfassungDetailViewComponent,
} from '../components/asv-datenerfassung-detail-view/asv-datenerfassung-detail-view.component';
import { AsvDatenerfassungGridComponent } from '../components/asv-datenerfassung-grid/asv-datenerfassung-grid.component';
import { AsvDatenerfassung, ModelQueryDelete } from '../models';
import { cloneDeep } from 'lodash-es';
@Component({
  selector: 'app-asv-datenerfassung',
  templateUrl: './asv-datenerfassung.component.html',
  styleUrls: ['./asv-datenerfassung.component.scss']
})
@SetClassRight('CtlWhASVSErfassung')
export class AsvDatenerfassungComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('gridAsvDatenerfassung') gridAsvDatenerfassung: AsvDatenerfassungGridComponent;
  @ViewChild('editComponent') editComponent: AsvDatenerfassungDetailditComponent;
  @ViewChild('viewComponent') viewComponent: AsvDatenerfassungDetailViewComponent;
  @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;
  @ViewChild('canDeactivate') deactivatePopup: CanDeactivateComponent;
  messageCanDeactive?: any;
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
  listBtn = cloneDeep([CommonConstant.ToolbarButtons, getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])]);
  pageTitle: string;
  baPersonID: number;
  faLeistungID: number;
  //#region "Declare variables for grdiview"
  asvDatenerfassungData: AsvDatenerfassung[] = [];
  //#endregion

  //#region "Declare variables for add, update, delete"
  isViewMode = true;
  isAddNew = false;
  //#endregion

  //#region "Declare variables for another bussiness"
  private subscription = new Subscription();
  isShiftKeyDown = false;
  popUpConfirmModel: PopUpModel;
  personCopyTitle: string;
  asvDetailData: AsvDatenerfassung = new AsvDatenerfassung();
  asvComboboxData: any;
  status = 2;
  objKeyAction = {
    add: 'add',
    copy: 'copy',
    delete: 'delete',
    savecopy: 'savecopy',
    save: 'save',
    concurrency: 'concurrency'
  };
  keyAction: string;
  selectedKeys: number;
  lastSelectedKeys: number;
  conPopupVisible = false;
  dataInsertTmp: any;
  keyExpr = 'index';
  dataInsert: any;
  isDaten = false;
  //#endregion
  constructor(
    injector: Injector,
    private ref: ChangeDetectorRef,
    public asvDatenerfassungSandbox: AsvDatenerfassungSandbox,
    public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
    public translateService: TranslateService,
    public utilService: UtilService,
    public router: Router,
    public tabModuleFallbearbeitungSandbox: TabModuleFallbearbeitungSandbox) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    this.popUpConfirmModel = this.initPopUpModel();
    this.asvDatenerfassungSandbox.registerEvents();
  }

  initData(selectedNode) {
    this.asvDatenerfassungSandbox.loadAsvDatenerfassungInitData(selectedNode.faLeistungID);
    this.asvDatenerfassungSandbox.loadComboboxAsvDatenerfassungData(selectedNode.faLeistungID);
  }
  initPopUpModel(): PopUpModel {
    return new PopUpModel(
      {
        title: this.translateService.instant('AsvDatenerfassung.PopupConfirm.Title'),
        isVisibleTitle: true,
        isVisible: false,
        message: '',
        textYes: this.translateService.instant('AsvDatenerfassung.PopupConfirm.Yes'),
        isVisibleYes: true,
        textNo: this.translateService.instant('AsvDatenerfassung.PopupConfirm.No'),
        isVisibleNo: true,
        funcYes: null,
        funcNo: null,
      }
    );
  }
  ngAfterViewInit(): void {
    this.registerEvents();
  }
  //#region "registerEvents function"
  private registerEvents() {
    // Register subscribe for selected person
    this.subscription.add(
      this.tabModuleFallbearbeitungSandbox.getPersonInfoTitel$.subscribe(data => {
        if (isNullOrUndefined(data) || data.status) {
          return;
        }
        this.personCopyTitle = data.titleText;
        this.pageTitle = this.personCopyTitle + ' > ' + this.translateService.instant('AsvDatenerfassung.Title');
      })
    );
    // Register subscribe for selected node from sidebar
    this.subscription.add(
      this.sozialhilfeTreeSandbox.selectedNode$.subscribe(selectedNode => {
        if (!isNullOrUndefined(selectedNode)) {
          this.baPersonID = selectedNode.baPersonID;
          this.faLeistungID = selectedNode.faLeistungID;
          this.initData(selectedNode);
        }
      })
    );
    this.subscription.add(this.asvDatenerfassungSandbox.asvDatenerfassungData$.subscribe(data => {
      if (!data || data.length < 1) {
        this.asvDatenerfassungData = [];
        return;
      }
      this.asvDatenerfassungData = data;
      if (this.keyAction !== this.objKeyAction.copy && !this.isDaten) {
        this.viewMode();
      }
      this.focusRowAfterLoadData();
    }));

    this.subscription.add(this.asvDatenerfassungSandbox.asvDatenerfassungComboboxData$.subscribe(data => {

      if (!data) {
        return;
      }
      this.asvComboboxData = data;
    }));

    this.subscription.add(this.asvDatenerfassungSandbox.asvDatenerfassungInsert$.subscribe(data => {
      if (!data) {
        return;
      }
      if (data && data.status === AppEnums.StatusCode.BAD_REQUEST) {
        this.showMessageHandle(JSON.parse(data._body).message);
        return;
      }
      if (data && data.status === AppEnums.StatusCode.FORBIDDEN) {
        this.remainingMessage.showMessage(this.translateService.instant('HttpStatusMessage.Forbidden'), 'HttpStatusMessage.Forbidden');
        return;
      }
      this.dataInsert = data;
      if (this.keyAction === this.objKeyAction.add) {
        this.asvDatenerfassungSandbox.loadAsvDatenerfassungInitData(this.faLeistungID);
        return;
      }
      if (this.keyAction === this.objKeyAction.copy) {
        this.dataInsertTmp = data;
        this.asvDatenerfassungSandbox.loadAsvDatenerfassungInitData(this.faLeistungID);
        return;
      }
      if (this.keyAction === this.objKeyAction.savecopy) {
        this.asvDatenerfassungSandbox.loadAsvDatenerfassungInitData(this.faLeistungID);
      }
    }));

    this.subscription.add(this.asvDatenerfassungSandbox.asvDatenerfassungUpdate$.subscribe(data => {
      if (!data) {
        return;
      }
      if (data && data.status === AppEnums.StatusCode.BAD_REQUEST) {
        this.showMessageHandle(JSON.parse(data._body).message);
        return;
      }
      if (data && data.status) {
        this.concurrencyUpdateHandler(data);
        return;
      }
      if (this.keyAction === this.objKeyAction.copy) {
        this.gridAsvDatenerfassung.updateRowGrid(data);
        this.editComponent.updateModelCopy(data);
        return;
      }
      this.selectedKeys = data[this.keyExpr];
      this.asvDatenerfassungSandbox.loadAsvDatenerfassungInitData(this.faLeistungID);
    }));

    this.subscription.add(this.asvDatenerfassungSandbox.asvDatenerfassungDelete$.subscribe(data => {
      if (!data) {
        return;
      }

      if (data && data.status === AppEnums.StatusCode.BAD_REQUEST) {
        this.showMessageHandle(JSON.parse(data._body).message);
        return;
      }
      if (data && data.status) {
        this.concurrencyDeleteHandler(data);
        return;
      }
      if (this.lastSelectedKeys !== 0) {
        this.setSelectedKeyAfterDeleteRow();
      }
      this.asvDatenerfassungSandbox.loadAsvDatenerfassungInitData(this.faLeistungID);
    }));

    this.subscription.add(this.gridAsvDatenerfassung.rowFocusing.subscribe(data => {
      if (data && data.WhASVSEintragID) {
        this.asvDetailData = data;
        this.setDisableBtn(false);
        this.closeRemainingMessage();
        return;
      }
      if (this.viewComponent) {
        this.viewComponent.changeDisabled(['edit', 'loschen'], true);
        this.asvDetailData = new AsvDatenerfassung();
      }
    }));

    this.subscription.add(
      this.translateService.onLangChange.subscribe(() => {
        this.pageTitle = this.personCopyTitle + ' > ' + this.translateService.instant('AsvDatenerfassung.Title');
      })
    );
  }
  //#endregion

  setSelectedKeyAfterDeleteRow() {
    if (this.lastSelectedKeys >= this.asvDatenerfassungData.length - 1) {
      this.selectedKeys = this.asvDatenerfassungData[this.asvDatenerfassungData.length - 2][this.keyExpr];
    } else {
      this.selectedKeys = this.asvDatenerfassungData[this.lastSelectedKeys][this.keyExpr];
    }
  }
  concurrencyUpdateHandler(data) {
    switch (data.status) {
      case AppEnums.StatusCode.NOT_FOUND:
        // concurrency case update - deleted (1) Beim Speichern des veränderten Datensatzes ist ein Fehler aufgetreten !
        this.remainingMessage.showMessage(this.translateService.instant('AsvDatenerfassung.Message.ConcurrencyMsg404_DELETE_UPDATE'));
        this.afterConcurrency();
        break;
      case AppEnums.StatusCode.CONCURRENCY:
        this.conPopupVisible = true;
        break;
      case AppEnums.StatusCode.FORBIDDEN:
        this.remainingMessage.showMessage(this.translateService.instant('HttpStatusMessage.Forbidden'), 'HttpStatusMessage.Forbidden');
        break;

      default:
        break;
    }
  }
  afterConcurrency() {
    this.setDisableBtn(true);
  }

  concurrencyDeleteHandler(data) {
    switch (data.status) {
      case AppEnums.StatusCode.NOT_FOUND:
      case AppEnums.StatusCode.CONCURRENCY:
        this.remainingMessage.showMessage(this.translateService.instant('AsvDatenerfassung.Message.ConcurrencyMsg404_DELETE_DELETE'));
        this.afterConcurrency();
        break;
      case AppEnums.StatusCode.FORBIDDEN:
        this.remainingMessage.showMessage(this.translateService.instant('HttpStatusMessage.Forbidden'), 'HttpStatusMessage.Forbidden');
        break;
      default:
        break;
    }
  }

  setDisableBtn(isDisable) {
    if (this.editComponent) {
      this.editComponent.disableButtons(isDisable);
    }

    if (this.viewComponent) {
      this.viewComponent.disableButtons(isDisable);
    }
  }

  toolBarOnItemClickTopGrd(event) {
    this.gridAsvDatenerfassung.onToolbarItemClick(event);
  }

  //#region "CRUD funtion"
  actionNew_OnClick(): any {
    this.changeStateWhenOnClickNew();
  }

  actionEdit_OnClick() {
    this.changeStateWhenOnClickEdit();
  }

  actionSave_OnClick() {
    if (this.keyAction === this.objKeyAction.copy) {
      this.keyAction = this.objKeyAction.savecopy;
    }
    if (!this.keyAction) {
      this.keyAction = this.objKeyAction.save;
    }
    this.save();
  }

  onKeyActionCopy() {
    if (this.editComponent.asvDetailData.WhASVSEintragID) {
      this.editComponent.getModelQuerUpdate(this.faLeistungID);
      this.changeStatus();
      this.asvDatenerfassungSandbox.asvDatenerfassungUpdate(this.editComponent.modelQueryUpdate);
      return;
    }
    this.changeStatus();
    this.callApiInsert();
  }
  save() {
    if (this.editComponent.validationGroupDetails.instance.validate() && !this.editComponent.validationGroupDetails.instance.validate().isValid) {
      this.remainingMessage.showMessage(this.translateService.instant('AsvDatenerfassung.MessageError.Validate'), 'AsvDatenerfassung.MessageError.Validate');
      return;
    }
    if (this.keyAction === this.objKeyAction.add || this.keyAction === this.objKeyAction.savecopy) {
      this.callApiInsert();
      return;
    }

    if (this.keyAction === this.objKeyAction.copy) {
      this.remainingMessage.hideMessage();
      this.onKeyActionCopy();
      return;
    }

    this.editComponent.getModelQuerUpdate(this.faLeistungID);
    this.changeStatus();
    this.asvDatenerfassungSandbox.asvDatenerfassungUpdate(this.editComponent.modelQueryUpdate);
  }
  changeStatus() {
    this.status = this.editComponent.asvDetailData.ASVSEintragStatusCode;
    if (this.status === 5) {
      return;
    }
    if (this.editComponent.asvDetailData.Widerrufen) {
      this.status = this.ChangeStatus(this.status);
      return;
    }
  }

  callApiInsert() {
    this.editComponent.getModelQueryInsert();
    this.editComponent.modelQueryInsert.FaLeistungID = this.faLeistungID;
    this.asvDatenerfassungSandbox.asvDatenerfassungInsert(this.editComponent.modelQueryInsert);
  }
  ChangeStatus(status) {
    if (status === 1 || status === 2) {
      return status;
    } else {
      return this.editComponent.asvDetailData.Widerrufen ? 4 : 3;
    }
  }
  actionCancel_OnClick() {
    if (this.editComponent.isFormDirty()) {
      this.handleActionPopup('btnCancel');
      return;
    }
    this.viewMode();
  }
  handleActionPopup(key, data?: ModelQueryDelete) {
    this.initPopUpModel();
    switch (key) {
      case 'btnCancel':
        this.popUpConfirmModel.funcYes = () => {
          this.viewMode();
          this.onKeyActionConcurency();
          this.popUpConfirmModel.isVisible = false;
        };
        this.popUpConfirmModel.funcNo = () => {
          this.popUpConfirmModel.isVisible = false;
        };
        this.popUpConfirmModel.message = this.translateService.instant('AsvDatenerfassung.PopupConfirm.Message');
        this.popUpConfirmModel.isVisible = true;
        break;

      case 'deleteNewRow':
        this.popUpConfirmModel.funcYes = () => {
          this.viewMode();
          const getVisibleRow = this.gridAsvDatenerfassung.gridComponent.instance.getVisibleRows();
          if (getVisibleRow.length > 0) {
            this.gridAsvDatenerfassung.selectedRowKey = getVisibleRow[getVisibleRow.length - 1].data[this.keyExpr];
          }
          this.popUpConfirmModel.isVisible = false;
        };
        this.popUpConfirmModel.funcNo = () => {
          this.popUpConfirmModel.isVisible = false;
        };
        this.popUpConfirmModel.message = this.translateService.instant('AsvDatenerfassung.PopupConfirm.MessageDeleteNewRow');
        this.popUpConfirmModel.isVisible = true;
        break;

      case 'deleteRow':
        this.popUpConfirmModel.funcYes = () => {
          this.lastSelectedKeys = this.asvDatenerfassungData.findIndex(x => x.WhASVSEintragID === data.WhAsvseintragId);
          this.asvDatenerfassungSandbox.asvDatenerfassungDelete(data);
          this.popUpConfirmModel.isVisible = false;
        };
        this.popUpConfirmModel.funcNo = () => {
          this.popUpConfirmModel.isVisible = false;
        };
        this.popUpConfirmModel.message = this.translateService.instant('AsvDatenerfassung.PopupConfirm.MessageDeleteRow');
        this.popUpConfirmModel.isVisible = true;
        break;
      default:
        break;
    }

  }

  getASVData() {
    this.asvDatenerfassungSandbox.loadAsvDatenerfassungInitData(this.faLeistungID);
  }
  actionCopy_OnClick() {
    this.keyAction = this.objKeyAction.copy;
    this.save();
  }
  changeStateWhenOnClickNew() {
    this.listBtn = [];
    this.isViewMode = false;
    this.isAddNew = true;
    this.keyAction = this.objKeyAction.add;
    this.closeRemainingMessage();
    this.checkPencilTree(true);
  }
  changeStateWhenOnClickEdit() {
    this.listBtn = [];
    this.isViewMode = false;
    this.closeRemainingMessage();
    this.checkPencilTree(true);
  }
  closeRemainingMessage() {
    this.remainingMessage.hideMessage();
  }
  viewMode() {
    this.closeRemainingMessage();
    this.checkPencilTree(false);
    this.isAddNew = false;
    this.isViewMode = true;
    this.listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
  }
  onKeyActionConcurency() {
    if (this.keyAction === this.objKeyAction.concurrency) {
      this.selectedKeys = this.editComponent.asvDetailData[this.keyExpr];
    }
  }
  onDelete(data: AsvDatenerfassung) {
    this.keyAction = this.objKeyAction.delete;
    const modelQueryDelete: ModelQueryDelete = {
      WhAsvseintragId: data.WhASVSEintragID,
      WhAsvseintragTs: data.WhASVSEintragTS
    };
    if (data.WhASVSEintragID) {
      this.handleActionPopup('deleteRow', modelQueryDelete);
      return;
    }
    if (this.editComponent.isFormDirty()) {
      this.handleActionPopup('deleteNewRow', modelQueryDelete);
      return;
    }
    this.viewMode();
  }
  //#endregion

  //#region "Businness, load data for combox..."
  ngOnDestroy() {
    this.asvDatenerfassungSandbox.resetState();
    this.unregisterEvents();
  }

  public unregisterEvents() {
    this.subscription.unsubscribe();
  }
  @HostListener('window:beforeunload', ['$event'])
  public beforeunloadHandler($event) {
    this.blurAll();
    if (this.editComponent.isFormDirty()) {
      $event.returnValue = '';
    }
  }

  onCopyTitle() {
    let text;
    if (this.isShiftKeyDown) {
      text = this.baPersonID.toString();
    } else {
      text = this.personCopyTitle;
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
    if (!this.isViewMode) {
      if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ) {
        event.preventDefault();
        this.blurAll();
        this.actionCancel_OnClick();
      }
      if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyM && !this.editComponent.customizeBtn[3].disabled && (!this.conPopupVisible && !this.popUpConfirmModel.isVisible)) {
        event.preventDefault();
        this.blurAll();
        this.editComponent.onLoschen();
      }
      if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS && !this.editComponent.customizeBtn[1].disabled && (!this.conPopupVisible && !this.popUpConfirmModel.isVisible)) {
        // Save
        event.preventDefault();
        this.blurAll();
        this.editComponent.onSpeichern();
        return;
      }
    }

    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyI && this.isViewMode && (!this.conPopupVisible && !this.popUpConfirmModel.isVisible)) {
      // Create
      event.preventDefault();
      this.viewComponent.onNeueASV();
      return;
    }

    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyM && this.isViewMode && this.viewComponent && !this.viewComponent.customizeBtn[2].disabled && (!this.conPopupVisible && !this.popUpConfirmModel.isVisible)) {
      event.preventDefault();
      this.viewComponent.onLoschenASV();
    }
  }
  checkPencilTree(isShow: boolean) {
    this.sozialhilfeTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: isShow,
      }
    );
  }
  cleanRemainingMessage() {
    this.remainingMessage.hideMessage();
  }
  showMessageHandle(message) {
    switch (message) {
      case 'MSG_01':
        this.remainingMessage.showMessage(this.translateService.instant('AsvDatenerfassung.MessageError.MSG_01'));
        break;
      case 'MSG_02':
        this.remainingMessage.showMessage(this.translateService.instant('AsvDatenerfassung.MessageError.MSG_02'));
        break;
      case 'MSG_03':
        this.remainingMessage.showMessage(this.translateService.instant('AsvDatenerfassung.MessageError.MSG_03'));
        break;
      case 'MSG_04':
        this.remainingMessage.showMessage(this.translateService.instant('AsvDatenerfassung.MessageError.MSG_04'));
        break;
      case 'MSG_05':
        this.remainingMessage.showMessage(this.translateService.instant('AsvDatenerfassung.MessageError.MSG_05'));
        break;
      case 'MSG_06':
        this.remainingMessage.showMessage(this.translateService.instant('AsvDatenerfassung.MessageError.MSG_06'));
        break;
      case 'MSG_09':
        this.remainingMessage.showMessage(this.translateService.instant('AsvDatenerfassung.MessageError.MSG_09'));
        break;
      case 'MSG_12':
        this.remainingMessage.showMessage(this.translateService.instant('AsvDatenerfassung.MessageError.MSG_12'));
        break;
      case 'MSG_18':
        this.remainingMessage.showMessage(this.translateService.instant('AsvDatenerfassung.MessageError.MSG_18'));
        break;
      case 'MSG_10':
        this.remainingMessage.showMessage(this.translateService.instant('AsvDatenerfassung.MessageError.MSG_10'));
        break;
      default:
        break;
    }
  }

  blurAll() {
    const el = document.querySelector(':focus');
    if (el) {
      (el as HTMLElement).blur();
    }
  }

  canDeactivate() {
    if (!this.isViewMode) {
      this.blurAll();
      return this.deactivatePopup.canDeactivate(this.editComponent.isFormDirty(), () => this.checkPencilTree(false));
    }
    return true;
  }

  focusRowAfterLoadData() {
    if (!this.keyAction) {
      this.gridAsvDatenerfassung.selectedRowKey = null;
      return;
    }
    this.isDaten = false;
    if (this.dataInsert) {
      this.gridAsvDatenerfassung.selectedRowKey = this.asvDatenerfassungData.filter(x => x.WhASVSEintragID === this.dataInsert.whAsvseintragId)[0][this.keyExpr];
      this.dataInsert = null;

    } else {
      this.gridAsvDatenerfassung.selectedRowKey = this.selectedKeys;
    }
    if (this.keyAction === this.objKeyAction.copy) {
      setTimeout(() => {
        this.editComponent.updateModelCopy(this.dataInsertTmp);
      }, CommonConstant.SetTimeOut);
      return;
    }
    this.keyAction = '';
  }

  onConYes() {
    this.conPopupVisible = false;
    this.isDaten = true;
    this.asvDatenerfassungSandbox.loadAsvDatenerfassungInitData(this.faLeistungID);
  }

  onConNo() {
    this.conPopupVisible = false;
    this.editComponent.disableButtons(true);
    this.editComponent.isDirty = false;
    this.keyAction = this.objKeyAction.concurrency;
  }

  onRouterChanged() {
    this.checkPencilTree(false);
  }
  //#endregion
}
