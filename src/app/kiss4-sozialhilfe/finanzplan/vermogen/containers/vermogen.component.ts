import { Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { TabModuleFallbearbeitungSandbox } from '@app/kiss4-main/tab-module-fallbearbeitung/tab-module-fallbearbeitung.sandbox';
import { BgFinanzplan, BgPosition, Personen, WhPositionsart } from '@app/kiss4-sozialhilfe/finanzplan/vermogen/models';
import { VermogenSandbox } from '@app/kiss4-sozialhilfe/finanzplan/vermogen/vermogen.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { VermogenConstant } from '@shared/common/sozialhilfe.common';
import { BaseComponent } from '@shared/components/base.component';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { IPopUpModel } from '@shared/models/shared/popup-confirm.model';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { BehaviorSubject, Subscription } from 'rxjs';
import { isNullOrUndefined, isArray } from 'util';
import { CommonConstant } from '@shared/common/constant.common';

@Component({
  selector: 'kiss-vermogen',
  templateUrl: './vermogen.component.html',
  styleUrls: ['./vermogen.component.scss']
})
@SetClassRight('CtlVermogen')
export class VermogenComponent extends BaseComponent implements OnInit, CanComponentDeactivate, OnDestroy {
  @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;
  @ViewChild('canDeactivate') deactivatePopup: any;
  @ViewChild('detailView') detailView: any;
  @ViewChild('detailEdit') detailEdit: any;
  selectedDataID: number;
  createdNewID: number;
  isEditMode = false;
  rowDetail: any = {};
  rowDataEdit: any = {};
  private subscription = new Subscription();
  bgFinanzplanID: number;
  baPersonID: number = null;
  bgBudgetID: number;
  bgFinanzplan: BgFinanzplan[];
  shortcutAction$ = new BehaviorSubject<string>(null);
  gridAction$ = new BehaviorSubject<string>(null);
  disableButton: boolean;
  isDisableGrid = false;
  addNew: boolean;
  edit: boolean;
  pageTitle: any = {
    titleText: '',
    bgFinanzplan: {},
    treeName: ''
  };
  visibleConcurrencyPopup: boolean;
  statusConcurrency: boolean;
  isShiftKeyDown = false;

  popUpModel: IPopUpModel = {
    message: '',
    textYes: this.translateService.instant('Vermogen.Popup.Yes'),
    textNo: this.translateService.instant('Vermogen.Popup.No'),
    title: '',
    isVisibleTitle: true,
    isVisibleYes: true,
    isVisibleNo: true,
    isVisible: false,
  };
  expandDetail = true;
  vermogens: BgPosition[];
  persons: Personen[];
  artDesVermogens: WhPositionsart[];
  // caculate Freibetrag, Angerechnet
  freibetrag: any;
  angerechnet: any;

  disableEditBtn: boolean;
  treeName: '';
  changeParamAction$ = new BehaviorSubject<any>(null);
  objTmp = {
    freibetrag: null,
    angerechnet: null
  };
  isErrorArithmetic = false;
  isErrorDelete = false;
  constructor(
    injector: Injector,
    public translateService: TranslateService,
    public layoutSandbox: LayoutSandbox,
    public router: Router,
    public vermogenSandboxes: VermogenSandbox,
    public tabModuleFallbearbeitungSandbox: TabModuleFallbearbeitungSandbox,
    public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
    private activatedRoute: ActivatedRoute,
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    this.vermogenSandboxes.setIdNewVermogen();
    this.registerEvents();
  }

  ngOnDestroy() {
    this.vermogenSandboxes.resetVermogenState();
    this.setEditMode(false);
    this.subscription.unsubscribe();
  }

  registerEvents() {
    this.activatedRoute.paramMap.pipe().subscribe((params) => { this.changeParamAction$.next(params); });
    // Register subscribe for selected person
    this.subscription.add(
      this.tabModuleFallbearbeitungSandbox.getPersonInfoTitel$.subscribe(data => {
        if (isNullOrUndefined(data) || data.status) {
          return;
        }
        this.pageTitle.titleText = data.titleText;
        this.pageTitle = { ...this.pageTitle };
      }));

    // Register subscribe for selected node from sidebar
    this.subscription.add(this.sozialhilfeTreeSandbox.selectedNode$.subscribe(selectedNode => {
      if (!selectedNode) { return; }
      this.expandDetail = true;
      this.baPersonID = selectedNode.baPersonID;
      this.bgFinanzplanID = selectedNode.bgFinanzplanID;
      this.bgBudgetID = selectedNode.bgBudgetID;
      this.disableEditBtn = false;
      this.setEditMode(false);
      this.remainingMessage.hideMessage();
      this.vermogenSandboxes.getBgFinanzplan({ bgBudgetID: this.bgBudgetID });
      this.vermogenSandboxes.getBgPosition({ bgBudgetID: this.bgBudgetID, edtNurAktuelle: false, bgGruppeCode: 3104 });
      this.vermogenSandboxes.getPersonen({ bgBudgetID: this.bgBudgetID });
      this.vermogenSandboxes.getBgSilAHVBeitrag(selectedNode.bgBudgetID);
      this.treeName = selectedNode.name;
    }));

    // Register subscribe for bgPosition (grid)
    this.subscription.add(this.vermogenSandboxes.bgPositionData$.subscribe(data => {
      this.vermogens = [];
      if (!isNullOrUndefined(data)) {
        this.addNew = false;
        this.edit = false;
        this.statusConcurrency = false;
        if (!this.disableEditBtn) {
          this.changeStatusConcurency(false);
          this.detailEdit.disableButtonSave(false);
        }
        if (data.length <= 0) {
          this.detailView.isDisableButton(true);
        }
        this.vermogens = data;
        this.selectedDataID = this.createdNewID && this.setSelectedItem(this.getSelectedItem());
        this.vermogenSandboxes.getFreibetrag({ finanzplanVon: this.bgFinanzplan[0].FinanzplanVon });
      }
    }));

    // Register subcriber for bgFinanzplan (headerbar)
    this.subscription.add(this.vermogenSandboxes.bgFinanzplanData$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.bgFinanzplan = data;
        this.pageTitle.bgFinanzplan = data[0];
        this.pageTitle.treeName = this.treeName;
        this.pageTitle = { ...this.pageTitle };
        this.vermogenSandboxes.getWhPositionsart({ bgGruppeCode: 3104, bgKategorieCode: 5, datumVon: this.bgFinanzplan[0].FinanzplanVon, datumBis: this.bgFinanzplan[0].FinanzplanBis, concatKontoNrName: false });
        this.vermogenSandboxes.getFreibetrag({ finanzplanVon: data[0].FinanzplanVon });
      }
    }));

    // Register subcriber for Personen (Person select box)
    this.subscription.add(this.vermogenSandboxes.personenData$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.persons = data;
      }
    }));

    this.subscription.add(this.vermogenSandboxes.whPositionsartData$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.artDesVermogens = data;
      }
    }));

    this.subscription.add(this.vermogenSandboxes.freibetragData$.subscribe(data => {
      if (data && this.vermogens && this.bgFinanzplan) {
        this.calculateFreibetrag(data);
      }
    }));

    this.subscription.add(this.vermogenSandboxes.bgSilAHVBeitragData$.subscribe(data => {
      if (data) {
        setTimeout(() => {
          this.disableEditBtn = data.bgBewilligungStatusCode >= 5;
        });
      }
    }));

    this.subscription.add(this.sozialhilfeTreeSandbox.selectedNode$.subscribe(selectedNode => {
      if (selectedNode && selectedNode.bgBudgetID > 0) {
        setTimeout(() => {
          this.disableEditBtn = selectedNode.editMask === 'R';
        });
      }
    }));

    this.subscription.add(this.vermogenSandboxes.insertBgPositionData$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        if (data.status === AppEnums.StatusCode.INTERNAL_SERVER_ERROR) {
          this.showPopupArithmetic();
          return;
        }

        if (isArray(data)) {
          this.saveData(data);
        }
      }
    }));

    this.subscription.add(this.vermogenSandboxes.updateBgPositionData$.subscribe(data => {
      if (data) {
        if (data.status === AppEnums.StatusCode.NOT_FOUND) {
          this.statusConcurrency = true;
          this.changeStatusConcurency(true);
          this.remainingMessage.showMessage(this.translateService.instant('ExterneBerater.Messgage.MessageErrorEdit'));
        }

        if (data.status === AppEnums.StatusCode.INTERNAL_SERVER_ERROR) {
          this.showPopupArithmetic();
          return;
        }

        if (data.status === AppEnums.StatusCode.CONCURRENCY) {
          this.statusConcurrency = true;
          return this.visibleConcurrencyPopup = true;
        }

        if (isArray(data)) {
          this.saveData(data);
        }
      }
    }));

    this.subscription.add(this.vermogenSandboxes.delBgPositionData$.subscribe(data => {
      if (data) {
        if (data.status === AppEnums.StatusCode.NOT_FOUND || data.status === AppEnums.StatusCode.CONCURRENCY) {
          this.statusConcurrency = true;
          this.remainingMessage.showMessage(this.translateService.instant('ExterneBerater.Messgage.MessageDelError'));
          this.changeStatusConcurency(true);
        } else if (data.status === AppEnums.StatusCode.BAD_REQUEST) {
          this.showPopUpDelBadRequest(JSON.parse(data._body).message);
        } else {
          this.remainingMessage.hideMessage();
          this.vermogenSandboxes.getBgPosition({ bgBudgetID: this.bgBudgetID, edtNurAktuelle: false, bgGruppeCode: 3104 });
          this.setEditMode(false);
        }
      }
    }));
  }

  showPopUpDelBadRequest(msg) {
    this.isErrorDelete = true;
    this.popUpModel.isVisible = true;
    this.popUpModel.title = this.translateService.instant('PersonenImHaushalt.TitleInformationMessage');
    this.popUpModel.message = msg;
    this.popUpModel.isVisibleYes = false;
    this.popUpModel.isVisibleNo = false;
    this.popUpModel.funcHiding = () => {
      this.isErrorDelete = false;
      this.popUpModel.isVisible = false;
    };
  }

  private getSelectedItem() {
    return this.vermogens.find(vermogen => vermogen.BgPositionID === this.createdNewID);
  }

  private setSelectedItem(item) {
    this.createdNewID = undefined;
    return item && item.BgPositionID;
  }

  private saveData(value) {
    this.createdNewID = value[0];
    this.setEditMode(false);
    this.vermogenSandboxes.getBgPosition({ bgBudgetID: this.bgBudgetID, edtNurAktuelle: false, bgGruppeCode: 3104 });
  }

  calculateFreibetrag(data) {
    const betragTotal = this.calculateBetragTotal();
    const free = Math.min((data[0].freeAdult * this.bgFinanzplan[0].AnzahlUnterstuetztErwachsen + data[0].freeChild * this.bgFinanzplan[0].AnzahlUnterstuetztKind), data[0].freeMax);
    const temp = Math.min(free, betragTotal);
    this.freibetrag = this.objTmp.freibetrag = temp;
    this.angerechnet = this.objTmp.angerechnet = betragTotal - temp;
    if (this.vermogens && !this.vermogens.length) {
      this.freibetrag = '';
      this.angerechnet = '';
    }
  }

  calculateBetragTotal() {
    let betragTotal = 0;
    this.vermogens.forEach(vermogen => {
      betragTotal += vermogen.Betrag;
    });
    return betragTotal;
  }

  nurAktiveAnzeigen(isNurAktiveAnzeigen) {
    this.createdNewID = null;
    this.vermogenSandboxes.getBgPosition({ bgBudgetID: this.bgBudgetID, edtNurAktuelle: isNurAktiveAnzeigen, bgGruppeCode: 3104 });
  }

  setEditMode(isEditMode) {
    if (!isEditMode) {
      this.addNew = false;
      this.edit = false;
    }
    this.isEditMode = isEditMode;
    this.isDisableGrid = isEditMode;
    this.sozialhilfeTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: isEditMode
      });
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    this.changeStatusConcurency(false);
  }

  blurAll() {
    const el = document.querySelector(':focus');
    if (el) {
      (el as HTMLElement).blur();
    }
  }

  /**
   * Shortcuts Key
   * */
  @HostListener('document:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    if (event.keyCode === AppEnums.KeyCode.KeyShift) {
      this.isShiftKeyDown = false;
    }
  }

  @HostListener('document:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.shiftKey) {
      this.isShiftKeyDown = true;
    }
    if (event.ctrlKey) {
      if (event.keyCode === AppEnums.KeyCode.KeyI) {
        // Todo: open add new form
        event.preventDefault();
        if (!this.disableEditBtn && !this.edit && !this.addNew) {
          this.shortcutAction$.next(VermogenConstant.NEUE_VERMOGEN_BUTTON);
        }
      }

      if (event.keyCode === AppEnums.KeyCode.KeyZ) {
        // Todo: cancel form
        event.preventDefault();
        this.shortcutAction$.next(VermogenConstant.ABBRECHEN_BUTTON);
      }

      if (event.keyCode === AppEnums.KeyCode.KeyS) {
        // Todo: save form
        event.preventDefault();
        this.blurAll();
        this.shortcutAction$.next(VermogenConstant.SPEICHERN_BUTTON);
      }

      if (event.keyCode === AppEnums.KeyCode.KeyM) {
        event.preventDefault();
        const isShowPopupDel = this.vermogens && this.vermogens.length > 0 && !this.disableEditBtn && !this.detailView.listBtn[1][0].disabled && !this.addNew && !this.isErrorArithmetic && !this.isErrorDelete;
        if (isShowPopupDel) {
          this.showPopupDel();
        }

        if (this.addNew && this.detailEdit.isDirtyForm()) {
          this.showPopupDeleteAddMode();
        }

        if (this.addNew) {
          this.setEditMode(false);
        }
      }

    }

  }
  // #endregion

  onHeaderAction(event) {
    this.gridAction$.next(event);
  }

  onSelectionChange(event) {
    this.rowDetail = event ? event : null;
    this.rowDataEdit = event ? event : null;
    this.remainingMessage.hideMessage();
    if (this.statusConcurrency) {
      this.statusConcurrency = false;
      this.changeStatusConcurency(false);
    }

    if (!this.disableEditBtn) {
      this.disableButton = isNullOrUndefined(this.rowDetail);
    }

    if (!event) {
      this.freibetrag = '';
      this.angerechnet = '';
      return;
    }
    this.freibetrag = this.objTmp.freibetrag;
    this.angerechnet = this.objTmp.angerechnet;
  }

  onDetailViewAction(action: { actionName: string, data?: any }) {
    switch (action.actionName) {
      case VermogenConstant.NEUE_VERMOGEN_BUTTON:  // add new
        this.addNew = true;
        this.rowDataEdit = {};
        this.rowDataEdit.BaPersonID = null;
        this.rowDataEdit.Betrag = 0;
        this.rowDataEdit.Verbrauch = null;
        this.rowDataEdit.BgPositionsartID = null;
        this.rowDataEdit.Bemerkung = '';
        this.changeStatusConcurency(false);
        this.setEditMode(true);
        break;
      case VermogenConstant.BEARBEITEN_BUTTON: // edit
        this.edit = true;
        this.rowDataEdit = Object.assign({}, this.rowDetail);
        this.remainingMessage.hideMessage();
        this.changeStatusConcurency(false);
        this.setEditMode(true);
        break;
      case 'deleteMenuItemTopGrd':
        if (this.vermogens && this.vermogens.length > 0 && !this.disableEditBtn && !this.addNew && !this.detailView.isDisable('deleteMenuItemTopGrd')) {
          this.showPopupDel();
        }
        break;
      case CommonConstant.EventClickTitle:
        this.expandDetail = !this.expandDetail;
        break;
      default:
        break;
    }
  }

  onDetailAction(action: { actionName: string, data?: any }) {
    switch (action.actionName) {
      case VermogenConstant.SPEICHERN_BUTTON:  // save
        if (!this.statusConcurrency) {
          this.onSaveData(action);
        }
        break;
      case VermogenConstant.ABBRECHEN_BUTTON: // cancel
        this.addNew = false;
        this.edit = false;
        this.statusConcurrency = false;
        this.remainingMessage.hideMessage();
        this.setEditMode(false);
        break;
      case 'dirty-form-edit': // cancel dirty form
        this.showPopupCancel(this.translateService.instant('PersonenImHaushalt.Message.ConfirmDeactive'));
        break;
      case 'dirty-form-new': // cancel dirty form
        this.showPopupCancel(this.translateService.instant('Vermogen.Popup.MessageCancelNew'));
        break;
      case 'deleteMenuItemTopGrd':
        if (this.vermogens && this.vermogens.length > 0 && !this.disableEditBtn && !this.addNew) {
          this.showPopupDel();
          return;
        }

        if (this.addNew && this.detailEdit.isDirtyForm()) {
          this.showPopupDeleteAddMode();
          return;
        }

        if (this.addNew) {
          this.setEditMode(false);
          return;
        }

        break;
      case 'form-invalid':
        this.remainingMessage.showMessage(this.translateService.instant('Vermogen.RemainMessage.FormInvalid'));
        break;
      case CommonConstant.EventClickTitle:
        this.expandDetail = !this.expandDetail;
        break;
      default:
        break;
    }
  }

  showPopupDeleteAddMode() {
    this.popUpModel.isVisible = true;
    this.popUpModel.title = this.translateService.instant('Vermogen.Popup.TitleDelete');
    this.popUpModel.message = this.translateService.instant('Vermogen.Popup.MessageCancelNew');
    this.popUpModel.isVisibleYes = true;
    this.popUpModel.isVisibleNo = true;
    this.popUpModel.funcYes = () => {
      this.popUpModel.isVisible = false;
      this.setEditMode(false);
    };
    this.popUpModel.funcNo = () => {
      this.popUpModel.isVisible = false;
    };
  }

  onSaveData(value) {
    this.remainingMessage.hideMessage();
    value.data.BgPositionID ? this.updateBgPosition(value) : this.insertBgPosition(value);
  }

  insertBgPosition(action) {
    const body = {
      Buchungstext: this.artDesVermogens.find(el => el.BgPositionsartID === action.data.BgPositionsartID).Name,
      BgPositionID: null,
      BgBudgetID: this.bgBudgetID,
      BaPersonID: action.data.BaPersonID,
      BgPositionsartID: action.data.BgPositionsartID,
      Betrag: action.data.Betrag,
      Bemerkung: action.data.Bemerkung,
      BgFinanzplanID: this.bgFinanzplan[0].BgFinanzplanID,
      BgKategorieCode: 5,
      BgGruppeCode: 3104,
      Verbrauch: action.data.Verbrauch,
      FinanzplanVon: this.bgFinanzplan[0].FinanzplanVon
    };
    this.vermogenSandboxes.insertBgPosition(body);
  }

  updateBgPosition(action) {
    const body = {
      Buchungstext: this.artDesVermogens.find(el => el.BgPositionsartID === action.data.BgPositionsartID).Name,
      BgPositionID: action.data.BgPositionID,
      BgBudgetID: this.bgBudgetID,
      BaPersonID: action.data.BaPersonID,
      BgPositionsartID: action.data.BgPositionsartID,
      Betrag: action.data.Betrag,
      Bemerkung: action.data.Bemerkung,
      BgFinanzplanID: this.bgFinanzplan[0].BgFinanzplanID,
      BgKategorieCode: 5,
      BgGruppeCode: 3104,
      Verbrauch: action.data.Verbrauch,
      FinanzplanVon: this.bgFinanzplan[0].FinanzplanVon,
      BgPositionTS: action.data.BgPositionTS
    };
    this.vermogenSandboxes.updateBgPosition(body);
  }

  private showPopupCancel(message = '') {
    this.popUpModel.title = this.translateService.instant('PersonenImHaushalt.TitleCancelMessage');
    this.popUpModel.message = message;
    this.popUpModel.funcYes = () => {
      this.addNew = false;
      this.edit = false;
      this.popUpModel.isVisible = false;
      this.statusConcurrency = false;
      this.setEditMode(false);
      this.remainingMessage.hideMessage();
    };
    this.popUpModel.funcNo = () => {
      this.popUpModel.isVisible = false;
      this.setEditMode(true);
    };
    this.popUpModel.isVisible = true;
  }

  private showPopupDel() {
    this.popUpModel.isVisible = true;
    this.popUpModel.title = this.translateService.instant('Vermogen.Popup.TitleDelete');
    this.popUpModel.message = this.translateService.instant('Vermogen.Popup.MessageDelete');
    this.popUpModel.isVisibleYes = true;
    this.popUpModel.isVisibleNo = true;
    this.popUpModel.funcYes = () => {
      this.popUpModel.isVisible = false;
      if (this.rowDetail.BgPositionID && this.rowDetail.BgPositionTS) {
        this.vermogenSandboxes.deleteBgPosition({ bgPositionID: this.rowDetail.BgPositionID, bgPositionTS: this.rowDetail.BgPositionTS });
      }
    };
    this.popUpModel.funcNo = () => {
      this.popUpModel.isVisible = false;
    };
  }

  showPopupArithmetic() {
    this.isErrorArithmetic = true;
    this.popUpModel.isVisible = true;
    this.popUpModel.title = this.translateService.instant('Vermogen.Popup.TitleConcurrency');
    this.popUpModel.message = this.translateService.instant('Vermogen.Popup.MsgArithmetic');
    this.popUpModel.isVisibleYes = false;
    this.popUpModel.isVisibleNo = false;
    this.popUpModel.funcHiding = () => {
      this.setEditMode(false);
      this.isErrorArithmetic = false;
      this.vermogenSandboxes.getBgPosition({ bgBudgetID: this.bgBudgetID, edtNurAktuelle: false, bgGruppeCode: 3104 });
    };
  }

  onConcurrencyYes() {
    this.visibleConcurrencyPopup = false;
    this.remainingMessage.hideMessage();
    this.setEditMode(true);
    this.vermogenSandboxes.getBgPosition({ bgBudgetID: this.bgBudgetID, edtNurAktuelle: false, bgGruppeCode: 3104 });
  }

  onConcurrencyNo() {
    this.visibleConcurrencyPopup = false;
    this.changeStatusConcurency(true);
    this.detailEdit.disableButtonSave(true);
  }

  canDeactivate() {
    return this.deactivatePopup.canDeactivate(this.detailEdit.isDirtyForm() && this.isEditMode, () => this.setEditMode(false));
  }

  changeStatusConcurency(status) {
    this.detailEdit.isDisableButtonConccurrency(status);
    this.detailView.isDisableButtonConccurrency(status);
  }
}

