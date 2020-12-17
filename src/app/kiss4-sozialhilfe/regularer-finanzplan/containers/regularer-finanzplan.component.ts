import { Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnums } from '@shared/AppEnum';
import { BehaviorSubject, combineLatest, Subject, Subscription, from } from 'rxjs';
import { isEqual } from 'lodash-es';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@shared/components/base.component';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { IPopUpModel } from '@shared/models/shared/popup-confirm.model';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { FallfuhrungTreeConstant } from '@shared/common/fallfuhrung-tree.common';
import { RegularerFinanzplanSandbox } from '@app/kiss4-sozialhilfe/regularer-finanzplan/regularer-finanzplan.sandbox';
import { IFinanzplan, IFinanzplanDropDown, IFinanzplanSaveParam } from '@app/kiss4-sozialhilfe/regularer-finanzplan/models/regularer-finanzplan.models';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { isNullOrUndefined } from 'util';
import { IStatusInfo } from '../components/regularer-finanzplan-view/regularer-finanzplan-view.component';

enum messageCodeConst {
  message1 = 1,
  message2 = 2,
  message3 = 3,
  message4 = 4,
  message5 = 5,
}

@Component({
  selector: 'app-regularer-finanzplan',
  templateUrl: './regularer-finanzplan.component.html',
  styleUrls: ['./regularer-finanzplan.component.scss']
})
@SetClassRight('Ctlpersonen-im-haushalt')
export class RegularerFinanzplanComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;
  constructor(
    injector: Injector,
    private regularerFinanzplanSandbox: RegularerFinanzplanSandbox,
    public translateService: TranslateService,
    public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
    public router: Router,
    public layoutSandbox: LayoutSandbox
  ) {
    super(injector);
  }

  verlaufData = [];
  typVerlaufData = [];
  headerAction$ = new BehaviorSubject<string>(null);
  isEditMode = false;
  isShiftKeyDown = false;
  popUpModel: IPopUpModel = {
    funcYes: () => {
      this.resetData();
    },
    funcNo: () => {
      this.popUpModel.isVisible = false;
      this.layoutSandbox.clearDeletingSticky();
      this.navigateAwaySelection$.next(false);
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
  bewilligungPopup = {
    isVisible: false,
    data: {
      radioGroup: 'ddd',
      someText1: 'hehehe',
      selectBox: 'bbb',
      checkBox: true,
      someText2: 'hahaha',
      dateBox: new Date(),
      textArea: 'hihihi',
    },
  };

  visibleConcurrencyPopup = false;
  isConcurrency = false;
  formData: IFinanzplan = this.getInitData();
  upperGrundList: IFinanzplanDropDown[] = [];
  lowerGrundList: IFinanzplanDropDown[] = [];
  typeList: IFinanzplanDropDown[] = [];
  berechnungList: IFinanzplanDropDown[] = [];
  visiblePopupBeenden: boolean;
  visiblePopupVerlauf: boolean;
  statusInfo: IStatusInfo = {
    key: null,
    checkInfo: null,
    status: null,
  };
  disableBtnData = {
    editMask: '',
    bewilligung: null,
  };
  statusList$ = this.regularerFinanzplanSandbox.bewilligungData$;
  headerData$ = combineLatest(this.regularerFinanzplanSandbox.finanzplanHeaderData$, this.sozialhilfeTreeSandbox.selectedNode$);
  private bgBudgetID: number = null;
  private baPersonID: number = null;
  bgFinanzplanID: number = null;
  private oldFormData: IFinanzplan = this.getInitData();
  private subscriptions: Subscription[] = [];
  private navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {
    this.setTitle(FallfuhrungTreeConstant.titlePage);
    this.subscriptions.push(
      this.sozialhilfeTreeSandbox.selectedNode$.subscribe(node => {
        if (node && node.bgBudgetID && node.baPersonID && node.bgFinanzplanID) {
          this.disableBtnData.editMask = node.editMask;
          this.baPersonID = node.baPersonID;
          this.bgBudgetID = node.bgBudgetID;
          this.bgFinanzplanID = node.bgFinanzplanID;
          this.statusInfo.key = node.bgFinanzplanID;
          this.statusInfo = Object.assign({}, this.statusInfo);
          this.disableBtnData = Object.assign({}, this.disableBtnData);
          this.regularerFinanzplanSandbox.loadData({ bgFinanzplanID: node.bgFinanzplanID, baPersonID: node.baPersonID });
        }
      }),
      this.regularerFinanzplanSandbox.checkData$.subscribe(data => {
        this.statusInfo.checkInfo = data;
        this.statusInfo = Object.assign({}, this.statusInfo);
      }),
      this.regularerFinanzplanSandbox.finanzplanData$.subscribe(data => {
        if (data) {
          this.formData = data;
          this.oldFormData = { ...this.formData };
          this.statusInfo.status = data.BgBewilligungStatusCode;
          this.disableBtnData.bewilligung = this.formData.BgBewilligungStatusCode;
          this.statusInfo = Object.assign({}, this.statusInfo);
          this.disableBtnData = Object.assign({}, this.disableBtnData);
        }
      }),

      this.regularerFinanzplanSandbox.grundErData$.subscribe(data => {
        this.upperGrundList = data;
      }),
      this.regularerFinanzplanSandbox.grundAbData$.subscribe(data => {
        this.lowerGrundList = data;
      }),
      this.regularerFinanzplanSandbox.grundbedarfTypeData$.subscribe(data => {
        this.berechnungList = data;
      }),
      this.regularerFinanzplanSandbox.typeData$.subscribe(data => {
        this.typeList = data;
      }),

      this.regularerFinanzplanSandbox.finanzplanSaveData$.subscribe(data => {
        if (!data) { return; }
        if (data.status && data.status === AppEnums.StatusCode.INTERNAL_SERVER_ERROR) {
          this.remainingMessage.showMessage(JSON.parse(data._body).message);
          return;
        } else if (data.status && data.status === AppEnums.StatusCode.CONCURRENCY) {
          this.visibleConcurrencyPopup = true;
          return;
        }
        this.resetData();
      }),

      this.regularerFinanzplanSandbox.verlaufData$.subscribe(data => {
        this.verlaufData = data;
        if (!isNullOrUndefined(data)) {
          if (this.typVerlaufData) {
            data.map((item) => {
              const itemTypText = this.typVerlaufData.find(typItem => typItem.code === item.BgBewilligungCode);
              isNullOrUndefined(itemTypText) ? item.typText = null : item.typText = itemTypText.text;
            });
          }
          this.verlaufData = data;
        }
      }),
      this.regularerFinanzplanSandbox.typVerlaufData$.subscribe(data => {
        this.typVerlaufData = data;
        if (!isNullOrUndefined(data)) {
          this.verlaufData.map((item) => {
            const itemTypText = data.find(typItem => typItem.code === item.BgBewilligungCode);
            isNullOrUndefined(itemTypText) ? item.typText = null : item.typText = itemTypText.text;
          });
        }
      })

    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  onHeaderAction(event: string) {
    switch (event) {
      case 'neuer':
        this.formData = this.getInitData();
        this.isEditMode = true;
        break;
      case 'bearbeiten':
        this.isEditMode = true;
        break;
      case 'aktualisieren':
        this.regularerFinanzplanSandbox.loadCheckData({ bgFinanzplanID: this.bgFinanzplanID, baPersonID: this.baPersonID });
        break;
      case 'bewilligung':
        this.bewilligungPopup.isVisible = true;
        break;
      case 'beenden':
        this.showBeendenPopup();
        break;
      case 'verlauf':
        this.showVerlaufPopup();
        break;
      default:
        break;
    }
    if (event === 'neuer' || event === 'bearbeiten') {
      this.sozialhilfeTreeSandbox.updateNodesStatus({ id: this.router.url, isEditMode: true });
    }
    if (event === 'abbrechen') {
      this.sozialhilfeTreeSandbox.updateNodesStatus({ id: this.router.url, isEditMode: false });
    }
    if (event === 'speichern') {
      this.remainingMessage.hideMessage();
    }
    this.headerAction$.next(event);
  }

  private getInitData() {
    return {
      BgFinanzplanID: null,
      FaLeistungID: null,
      BgBewilligungStatusCode: null,
      BgGrundAbschlussCode: null,
      WhHilfeTypCode: null,
      GeplantVon: null,
      GeplantBis: null,
      Bemerkung: '',
      BgFinanzplanTS: '',
      WhGrundbedarfTypCode: null,
      FinanzplanVon: null,
      FinanzplanBis: null,
      FallDatumVon: null,
    };
  }

  onFormResult(event: { action: string, data?: IFinanzplanSaveParam, messageCode?: 1 | 2 | 3 | 4 | 5 }) {
    switch (event.action) {
      case 'speichern':
        if (event.data) {
          event.data.BgBudgetID = this.bgBudgetID;
          this.regularerFinanzplanSandbox.saveData(event.data);
          return;
        }
        this.isEditMode = false;
        break;
      case 'invalid':
        this.showRemainingMess(event.messageCode);
        break;
      case 'abbrechen':
        this.isEditMode = false;
        break;
      case 'abbrechen-dirty':
        this.remainingMessage.hideMessage();
        this.showPopupDirty();
        break;
      default:
    }
  }

  showBeendenPopup() {
    this.visiblePopupBeenden = true;
  }

  showVerlaufPopup() {
    this.visiblePopupVerlauf = true;
  }

  // Tab/Arrow key
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.shiftKey) {
      this.isShiftKeyDown = true;
    }
    if (event.ctrlKey && this.isEditMode) {
      if (event.keyCode === AppEnums.KeyCode.KeyS) {
        event.preventDefault();
        this.remainingMessage.hideMessage();
        this.headerAction$.next('speichern');
        return;
      }
      if (event.keyCode === AppEnums.KeyCode.KeyZ) {
        event.preventDefault();
        this.headerAction$.next('abbrechen');
        this.isConcurrency = false;
        return;
      }
    }
    if (!event.metaKey) {
      if (event.keyCode === AppEnums.KeyCode.UpArrowKey) {
        event.preventDefault();
        return;
      }
      if (event.keyCode === AppEnums.KeyCode.DownArrowKey) {
        event.preventDefault();
        return;
      }
    }
  }

  @HostListener('document:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    if (event.keyCode === AppEnums.KeyCode.KeyShift) {
      this.isShiftKeyDown = false;
    }
  }

  onDblClickMessage() {
  }

  private showPopupDirty() {
    this.popUpModel.title = this.translateService.instant('RegularerFinanzplan.PopupConfirm.Title');
    this.popUpModel.message = this.translateService.instant('RegularerFinanzplan.PopupConfirm.Message');
    this.popUpModel.textYes = this.translateService.instant('RegularerFinanzplan.PopupConfirm.Yes');
    this.popUpModel.textNo = this.translateService.instant('RegularerFinanzplan.PopupConfirm.No');
    this.popUpModel.isVisibleYes = true;
    this.popUpModel.isVisibleNo = true;
    this.popUpModel.isVisible = true;
  }

  canDeactivate() {
    if (!isEqual(this.formData, this.oldFormData)) {
      this.showPopupDeactivate();
      return this.navigateAwaySelection$;
    }
    this.resetData();
    this.sozialhilfeTreeSandbox.updateNodesStatus({ id: this.router.url, isEditMode: false, });
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    return true;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification(event: any) {
    if (!isEqual(this.formData, this.oldFormData)) {
      event.returnValue = '';
      return this.navigateAwaySelection$;
    }
    this.sozialhilfeTreeSandbox.updateNodesStatus({ id: this.router.url, isEditMode: false, });
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    return true;
  }

  private showPopupDeactivate() {
    this.popUpModel.isVisible = true;
    this.popUpModel.title = this.translateService.instant('PersonenImHaushalt.TitleCancelMessage');
    this.popUpModel.message = this.translateService.instant('PersonenImHaushalt.ConfirmMessage');
    this.popUpModel.textYes = this.translateService.instant('PersonenImHaushalt.Discard');
    this.popUpModel.textNo = this.translateService.instant('PersonenImHaushalt.Abbrechen');
    this.popUpModel.isVisibleYes = true;
    this.popUpModel.isVisibleNo = true;
  }
  onConcurrencyYes() {
    this.visibleConcurrencyPopup = false;
    this.regularerFinanzplanSandbox.loadData({ bgFinanzplanID: this.bgFinanzplanID, baPersonID: this.baPersonID });
    this.isEditMode = true;
  }

  onConcurrencyNo() {
    this.visibleConcurrencyPopup = false;
    this.isEditMode = true;
    this.isConcurrency = true;
  }

  private resetData() {
    this.regularerFinanzplanSandbox.loadData({ bgFinanzplanID: this.bgFinanzplanID, baPersonID: this.baPersonID });
    this.isEditMode = false;
    this.sozialhilfeTreeSandbox.updateNodesStatus({ id: this.router.url, isEditMode: false });
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    this.navigateAwaySelection$.next(true);
    this.popUpModel.isVisible = false;
    this.isConcurrency = false;
  }

  private showRemainingMess(messageCode: 1 | 2 | 3 | 4 | 5) {
    if (messageCode) {
      let message = '';
      if (messageCode === messageCodeConst.message1) { message = this.translateService.instant('RegularerFinanzplan.MessageError.Message1'); }
      if (messageCode === messageCodeConst.message2) { message = this.translateService.instant('RegularerFinanzplan.MessageError.Message2'); }
      if (messageCode === messageCodeConst.message3) { message = this.translateService.instant('RegularerFinanzplan.MessageError.Message3'); }
      if (messageCode === messageCodeConst.message4) { message = this.translateService.instant('RegularerFinanzplan.MessageError.Message4'); }
      if (messageCode === messageCodeConst.message5) { message = this.translateService.instant('RegularerFinanzplan.MessageError.Message5'); }
      this.remainingMessage.showMessage(message);
    }
  }
}
