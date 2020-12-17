import 'devextreme-intl';
import { Component, Injector, OnInit, Input, ViewChild, Output, EventEmitter, HostListener, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { IPopUpModel, PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { locale } from 'devextreme/localization';
import { CommonConstant } from '@shared/common/constant.common';
import { cloneDeep } from 'lodash-es';
import { DxButtonComponent } from 'devextreme-angular';
import { WohnkostenConstant } from '@app/kiss4-sozialhilfe/finanzplan/wohnkosten/constant';
import { FormDetailEditComponent } from '../wohnkosten-detail-edit/wohnkosten-detail-edit-component';
import { BgPosition } from '@app/kiss4-sozialhilfe/finanzplan/wohnkosten/models';
import { isNullOrUndefined } from 'util';
import { AppEnums } from '@shared/AppEnum';
@Component({
  selector: 'kiss-wohnkosten-detail',
  templateUrl: './wohnkosten-detail-component.html',
  styleUrls: ['./wohnkosten-detail-component.scss']
})
@SetClassRight('CtlWohnKosten')
export class FormDetailComponent extends BaseComponent implements OnInit {
  @Input() isEditMode;
  @Input() detailData: BgPosition;
  @Input() formDisabled;
  @Input() datePopUpList;
  @Input() whKennzahlenData;
  @Input() bgPositionsartData;
  @Input() finanzplanData;
  @Input() editMask;
  @Output() showRemainingMessage = new EventEmitter<any>(true);
  @Output() changeViewMode = new EventEmitter<any>(true);
  @Output() saveForm = new EventEmitter<any>(true);
  @Output() filterGrid = new EventEmitter<any>(true);
  @ViewChild('btnAbbrechenPopup') btnAbbrechenPopup: DxButtonComponent;
  @ViewChild('editForm') editForm: FormDetailEditComponent;

  showDetailContainer = true;
  listDropDownAnpassungs: any;
  datePopupSelect: any;
  visiblePopUpDate: boolean;
  popUpModel: PopUpModel = new PopUpModel({ isVisible: false });
  isCard = true;
  confirmDialogData: IPopUpModel = {
    isVisible: false,
    title: this.translateService.instant('PersonenImHaushalt.TitleCancelMessage'),
    message: this.translateService.instant('PersonenImHaushalt.CancelMessage'),
    textYes: this.translateService.instant('PersonenImHaushalt.Yes'),
    textNo: this.translateService.instant('PersonenImHaushalt.No'),
    isVisibleTitle: true,
    isVisibleYes: true,
    isVisibleNo: true,
  };
  customizeBtnDetail = WohnkostenConstant.customizeBtnDetail;
  showZuschlagFields = false;
  disableBtnBewilligung = true;
  visibleBtnEdit = true;
  formState = AppEnums.FormState.Update;
  cloneBtnLabelKey = 'cloneBtnLabel';

  constructor(
    injector: Injector,
    public translateService: TranslateService,
    public utilService: UtilService,
    public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
    public router: Router,
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    if (!this.smallScreen()) {
      const cloneBtnLabel = localStorage.getItem(this.cloneBtnLabelKey);
      if (cloneBtnLabel) {
        this.customizeBtnDetail[0].text = this.translateService.instant(cloneBtnLabel);
      } else {
        localStorage.setItem(this.cloneBtnLabelKey, WohnkostenConstant.BewilligteWohnostenAnpassen);
      }
      this.customizeBtnDetail = cloneDeep(this.customizeBtnDetail);
    }
  }

  popupShown() {
    if (this.datePopUpList.length > 0) {
      this.datePopupSelect = this.datePopUpList[0];
      for (let i = 0; i < this.datePopUpList.length; i++) {
        if (new Date(this.datePopUpList[i].firstDate) > new Date()) {
          return;
        } else {
          const index = Math.min(i + 1, this.datePopUpList.length - 1);
          this.datePopupSelect = this.datePopUpList[index];
        }
      }
    }
    if (this.btnAbbrechenPopup) {
      this.btnAbbrechenPopup.instance.focus();
    }
  }

  buttonPopUpClicked(type) {
    if (type === 'ok') {
      const cloneBtnLabel = WohnkostenConstant.WohnkostenAnpassen;
      localStorage.setItem(this.cloneBtnLabelKey, cloneBtnLabel);
      if (!this.smallScreen()) {
        this.customizeBtnDetail[0].text = this.translateService.instant(cloneBtnLabel);
      }
      this.changeDetailMode();
      this.filterGrid.emit(this.datePopupSelect);
    }
    this.visiblePopUpDate = false;
  }

  onItemDropdownDatePopUpClick(event) {
    this.datePopupSelect = event.itemData;
  }

  changetoViewMode() {
    this.isEditMode = true;
    localStorage.setItem(this.cloneBtnLabelKey, WohnkostenConstant.BewilligteWohnostenAnpassen);
    this.changeDetailMode();
  }

  doUpdateNodesStatus() {
    this.sozialhilfeTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: this.isEditMode
      }
    );
  }

  changeDetailMode() {
    if (!this.smallScreen()) {
      this.customizeBtnDetail[0].text = this.translateService.instant(localStorage.getItem(this.cloneBtnLabelKey));
    }
    this.isEditMode = !this.isEditMode;
    this.doUpdateNodesStatus();
    this.changeViewMode.emit(this.isEditMode);
    if (this.isEditMode) {
      this.customizeBtnDetail[0].visible = false;
      this.customizeBtnDetail[0].disabled = this.disableBtnBewilligung;
      this.customizeBtnDetail[1].visible = false;
      this.customizeBtnDetail[2].visible = this.isCloneState();
      this.customizeBtnDetail[3].visible = !this.isCloneState();
      this.customizeBtnDetail[4].visible = true;
      setTimeout(() => {
        this.editForm.berechnungsgrundlage.instance.focus();
      });
    } else {
      this.customizeBtnDetail[0].disabled = this.disableBtnBewilligung;
      this.customizeBtnDetail[0].visible = true;
      this.customizeBtnDetail[1].visible = this.visibleBtnEdit;
      this.customizeBtnDetail[2].visible = false;
      this.customizeBtnDetail[3].visible = false;
      this.customizeBtnDetail[4].visible = false;
    }
    this.customizeBtnDetail = cloneDeep(this.customizeBtnDetail);
    if (!this.smallScreen()) {
      this.customizeBtnDetail[0].text = this.translateService.instant(localStorage.getItem(this.cloneBtnLabelKey));
    }
  }

  doSave() {
    if (this.editForm && !this.editForm.validateDataValid()) {
      this.showRemainingMessage.emit(WohnkostenConstant.messageValidate);
      return;
    }
    if (this.isCloneState()) {
      if (!this.editForm.formDirty) {
        this.onAbbrechen();
        return;
      }
      this.initPopUpModel();
      this.popUpModel.isVisible = true;
      this.popUpModel.title = this.translateService.instant('WohnKosten.PopupConfirm.TitleConfirmClone');
      this.popUpModel.message = this.translateService.instant('WohnKosten.PopupConfirm.MessageConfirmClone');
      this.popUpModel.textYes = this.translateService.instant('WohnKosten.PopupConfirm.Ja');
      this.popUpModel.textNo = this.translateService.instant('WohnKosten.PopupConfirm.Nein');
      this.popUpModel.funcYes = () => {
        this.popUpModel.isVisible = false;
        const formData = this.editForm.getFormCreateData(this.finanzplanData);
        if (isNullOrUndefined(formData.BgFinanzplanId)) {
          formData.BgFinanzplanId = this.finanzplanData.BgFinanzplanId;
        }
        this.saveForm.emit(formData);
      };
      this.popUpModel.funcNo = () => {
        this.popUpModel.isVisible = false;
        this.changeDetailMode();
      };
    } else {
      const formData = this.editForm.getFormUpdateData(this.finanzplanData);
      if (isNullOrUndefined(formData.FinanzplanVon)) {
        formData.FinanzplanVon = this.finanzplanData.FinanzplanVon;
      }
      this.saveForm.emit(formData);
    }
  }

  toolBarOnItemClickEdit($event) {
    switch ($event) {
      case WohnkostenConstant.ButtonType.BewilligteAnpassen: {
        if (this.datePopUpList.length === 0) {
          this.initPopUpModel();
          this.popUpModel.isVisible = true;
          this.popUpModel.title = this.translateService.instant('WohnKosten.Message.Information');
          this.popUpModel.message = this.translateService.instant('WohnKosten.Message.MessageInformation');
          this.popUpModel.isVisibleYes = false;
          this.popUpModel.isVisibleNo = false;
          this.popUpModel.funcHiding = () => {
            this.popUpModel.isVisible = false;
            this.visiblePopUpDate = true;
            return;
          };
        } else {
          this.visiblePopUpDate = true;
        }
        return;
      }
      case WohnkostenConstant.ButtonType.Abschilessen: {
        this.doSave();
        return;
      }
      case WohnkostenConstant.ButtonType.Save: {
        if (!this.editForm.formDirty) {
          this.changeDetailMode();
          return;
        }
        this.doSave();
        return;
      }
      case WohnkostenConstant.ButtonType.Bearbeiten: {
        this.changeDetailMode();
        return;
      }
      case WohnkostenConstant.ButtonType.Abbrechen: {
        this.onAbbrechen();
        return;
      }
      case CommonConstant.EventClickTitle: {
        this.showDetailContainer = !this.showDetailContainer;
        return;
      }
    }
  }

  onAbbrechen() {
    if (isNullOrUndefined(this.editForm)) {
      this.changeDetailMode();
    }
    if (this.editForm.formDirty) {
      this.initPopUpModel();
      this.popUpModel.isVisible = true;
      this.popUpModel.title = this.translateService.instant('WohnKosten.PopupConfirm.TitleCloseForm');
      this.popUpModel.message = this.translateService.instant('WohnKosten.PopupConfirm.MessageCloseForm');
      this.popUpModel.textYes = this.translateService.instant('WohnKosten.PopupConfirm.Ja');
      this.popUpModel.textNo = this.translateService.instant('WohnKosten.PopupConfirm.Nein');
      this.popUpModel.funcYes = () => {
        this.popUpModel.isVisible = false;
        this.detailData = this.editForm.oldDetailData;
        this.changeDetailMode();
        this.customizeBtnDetail[3].disabled = false;
      };
      this.popUpModel.funcNo = () => {
        this.popUpModel.isVisible = false;
      };
      return;
    }
    this.changeDetailMode();
  }

  initPopUpModel() {
    this.popUpModel = new PopUpModel(
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

  doHideZuschlagFields() {
    this.showZuschlagFields = false;
  }
  doShowZuschlagFields() {
    this.showZuschlagFields = true;
  }

  editMaskReadonly() {
    return this.editMask === 'R';
  }

  checkBgBewilligungStatusCode(bgBewilligungStatusCode, leistungDatumBis) {
    if (this.editMaskReadonly()) {
      this.customizeBtnDetail[0].disabled = true;
      this.customizeBtnDetail[1].visible = this.customizeBtnDetail[2].visible = false;
      this.customizeBtnDetail = cloneDeep(this.customizeBtnDetail);
      return;
    }
    if (!isNullOrUndefined(bgBewilligungStatusCode) && bgBewilligungStatusCode >= 5) {
      this.formState = AppEnums.FormState.Clone;
      this.visibleBtnEdit = false;
      if (isNullOrUndefined(leistungDatumBis)) {
        this.disableBtnBewilligung = false;
      } else {
        this.disableBtnBewilligung = true;
      }
    } else {
      this.formState = AppEnums.FormState.Update;
      this.disableBtnBewilligung = true;
      this.visibleBtnEdit = true;
    }
    this.customizeBtnDetail[0].disabled = this.disableBtnBewilligung;
    this.customizeBtnDetail[1].visible = this.visibleBtnEdit;
    this.customizeBtnDetail = cloneDeep(this.customizeBtnDetail);
  }

  isDirty(): boolean {
    return this.isEditMode && this.editForm.formDirty;
  }

  blurAll() {
    const el = document.querySelector(':focus');
    if (el) {
      (el as HTMLElement).blur();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyS) {
      event.preventDefault();
      this.blurAll();
      this.doSave();
      return;
    }
    // Ctrl + z
    if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyZ && this.isEditMode) {
      event.preventDefault();
      this.blurAll();
      this.onAbbrechen();
      return;
    }
  }

  smallScreen() {
    const widthViewScroll = window.innerWidth;
    return widthViewScroll <= CommonConstant.SCREEN_RESOLUTION_LARGE;
  }

  @HostListener('window:resize', ['$event'])
  handleWindowResize(event: KeyboardEvent) {
    if (this.smallScreen()) {
      this.customizeBtnDetail.forEach(item => {
        item.text = '';
      });
    } else {
      this.customizeBtnDetail[0].text = this.translateService.instant(localStorage.getItem(this.cloneBtnLabelKey));
      for (let i = 1; i < this.customizeBtnDetail.length; i++) {
        this.customizeBtnDetail[i].text = WohnkostenConstant.customizeBtnDetail[i].text;
      }
    }
    this.customizeBtnDetail = cloneDeep(this.customizeBtnDetail);
  }

  isCloneState() {
    return this.formState === AppEnums.FormState.Clone;
  }

  updateFinanzplanData(finanzplanData) {
    this.finanzplanData = finanzplanData;
    this.finanzplanData = cloneDeep(this.finanzplanData);
  }

  selectDatePopupKeyDown(e) {
    if (e.event.keyCode === AppEnums.KeyCode.KeyF4) {
      e.event.stopPropagation();
      if (!(e.component.option('opened'))) {
        e.component.open();
      } else {
        e.component.close();
      }
    }
  }

  clearFormDirty() {
    if (this.editForm) {
      this.editForm.formDirty = false;
    }
  }

  showInfoMessage(message) {
    this.popUpModel.isVisible = true;
    this.popUpModel.title = this.translateService.instant('WohnKosten.Message.Information');
    this.popUpModel.message = this.translateService.instant(message);
    this.popUpModel.isVisibleYes = false;
    this.popUpModel.isVisibleNo = false;
    this.popUpModel.funcHiding = () => {
      this.popUpModel.isVisible = false;
      return;
    };
  }

  disableSpeichernBtn() {
    this.customizeBtnDetail[3].disabled = true;
    this.customizeBtnDetail = cloneDeep(this.customizeBtnDetail);
  }
}
