import 'devextreme-intl';

import {
  AfterViewInit,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { FormState } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { IPopUpModel, PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxButtonComponent } from 'devextreme-angular';
import DevExpress from 'devextreme/bundles/dx.all';
import { locale } from 'devextreme/localization';
import { cloneDeep, isEmpty, isFunction } from 'lodash-es';
import { isNull, isNullOrUndefined, isUndefined } from 'util';

import { MedGrundversorgung } from '../../models';

@Component({
  selector: 'kiss-med-grundversorgung-detail',
  templateUrl: './detail-component.html',
  styleUrls: ['./detail-component.scss']
})
@SetClassRight('CtlAhvBeitrage')
export class FormDetailComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges, CanComponentDeactivate {

  @Output() callWhAlleKvgVvgAnpassen: EventEmitter<any> = new EventEmitter();
  @Output() enableGrid: EventEmitter<boolean> = new EventEmitter();
  @Input() isEditMode;
  @Input() set gridData(value: any) {
    if (isNullOrUndefined(value)) {
      return;
    }
    this._editGridData = value;
  }

  @Input() set formData(value: any) {
    if (isNullOrUndefined(value)) {
      return;
    }
    try {
      if (isEmpty(this._editFormData)) {
        return;
      }
      for (let i = 0; i < this._editGridData.length; i++) {
        if (this._editGridData[i].BgPositionID === this._editFormData.BgPositionID) {
          this._editGridData[i] = this._editFormData;
        }
      }
    } finally {
      this._editFormData = new MedGrundversorgung(value);
    }
  }

  @Input() shPositionTyp;
  @Input() baInstitution;
  @Input() datePopUpList;
  @ViewChild('editForm') editForm;
  @ViewChild('btnAbbrechenPopup') btnAbbrechenPopup: DxButtonComponent;
  @Input() columnsDef: Array<DevExpress.ui.dxDataGridColumn>;
  @Input() set editMask(value: string) {
    this._editMask = value;
    this.initButton();
  }
  @Input() set bgBewilligungStatusCode(value: any) {
    if (isNullOrUndefined(value)) {
      return;
    }
    this._bgBewilligungStatusCode = value.bgBewilligungStatusCode;
    this.initButton();
  }
  @Input() set leistungDatumBis(value: any) {
    this._leistungDatumBis = value;
    this.initButton();
  }
  @Input() set allowBewilligte(value: any) {
    if (value) {
      this.onBearbeiten();
    }
  }



  _editGridData: any;
  _editFormData = new MedGrundversorgung();
  _editMask: string;
  _bgBewilligungStatusCode: number;
  _leistungDatumBis = undefined;
  isVisibleItem41 = true;
  isBewilligteMedGrundversorgungAnpassen = true;

  datePopupSelect: Date;
  showDetailContainer = true;
  listDropDownAnpassungs: any;
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

  customizeBtnDetail = [
    {
      text: 'MedGrundversorgung.Detail.BewilligteWohnostenAnpassen',
      visible: true,
      name: 'bewilligteMedGrundversorgungAnpassen',
      icon: 'edit',
      callback: () => this.onBewilligteMedGrundversorgungAnpassen()
    },
    {
      text: 'MedGrundversorgung.Detail.BeitrageAnpassen',
      visible: true,
      name: 'beitrageAnpassen',
      icon: 'edit',
      callback: () => this.onBeitrageAnpassen()
    },
    {
      text: 'MedGrundversorgung.Detail.Bearbeiten',
      visible: true,
      name: 'bearbeiten',
      icon: 'edit',
      callback: () => this.onBearbeiten()
    },
    {
      text: 'MedGrundversorgung.Detail.Bearbeitung_Abschilessen',
      visible: false,
      disabled: true,
      name: 'abschilessen',
      icon: 'save',
      class: 'form-detail-button',
      callback: () => this.onAbschilessen()
    },
    {
      text: 'MedGrundversorgung.Detail.Speichern',
      visible: false,
      disabled: true,
      name: 'speichern',
      icon: 'save',
      class: 'form-detail-button',
      callback: () => this.onSpeichern()
    },
    {
      text: 'MedGrundversorgung.Detail.Abbrechen',
      visible: false,
      name: 'abbrechen',
      icon: 'close',
      class: 'form-detail-button',
      callback: () => this.onAbbrechen()
    }
  ];

  formState: FormState = FormState.ReadOnly;

  constructor(
    injector: Injector,
    public translateService: TranslateService,
    public utilService: UtilService,
    public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox,
    public router: Router,
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  canDeactivate() {
    return true;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void { }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }

  popupShown(event) {
    if (this.btnAbbrechenPopup) {
      this.btnAbbrechenPopup.instance.focus();
    }
  }

  buttonPopUpClicked(type) {
    this.visiblePopUpDate = false;
    if (type === 'ok') {
      this.callWhAlleKvgVvgAnpassen.emit(this.datePopupSelect);
      this.isBewilligteMedGrundversorgungAnpassen = false;
      this.changeFormStatus(FormState.Edit);
    }
  }

  onItemDropdownDatePopUpClick(event) {

  }

  changeDetailMode() {
    this.isEditMode = !this.isEditMode;
    this.isEditMode = cloneDeep(this.isEditMode);
    for (let i = 0; i < this.customizeBtnDetail.length; i++) {
      this.customizeBtnDetail[i].visible = !this.customizeBtnDetail[i].visible;
    }
    this.customizeBtnDetail = cloneDeep(this.customizeBtnDetail);
  }

  toolBarOnItemClickEdit(e) {
    if (isFunction(e.callback) && e.callback()) {
      return;
    }
  }

  isReadOnly(): boolean {
    return this.formState === FormState.ReadOnly;
  }

  isNew(): boolean {
    return this.formState === FormState.New;
  }

  isEdit(): boolean {
    return this.formState === FormState.Edit;
  }

  isDirty(): boolean {
    return !this.isReadOnly() && this.editForm.isDirty();
  }

  changeFormStatus(status) {
    this.formState = status;
    this.updateButtons();
  }

  private initButton() {
    if (isNullOrUndefined(this._editMask) || isNullOrUndefined(this._bgBewilligungStatusCode) || isUndefined(this._leistungDatumBis)) {
      return;
    }

    let btnVisisble = [];
    let btnDisabled = [];

    if (this._editMask === 'R' || this._editMask.indexOf('U') === -1 || this._leistungDatumBis !== null) {
      btnVisisble = ['bewilligteMedGrundversorgungAnpassen'];
      btnDisabled = ['bewilligteMedGrundversorgungAnpassen'];
      this.showButtons(btnVisisble, btnDisabled);
    } else if (this._bgBewilligungStatusCode >= 5) {
      if (this.isBewilligteMedGrundversorgungAnpassen) {
        btnVisisble = ['bewilligteMedGrundversorgungAnpassen'];
      } else {
        btnVisisble = ['beitrageAnpassen'];
      }
      this.showButtons(btnVisisble, btnDisabled);
    } else if (isNull(this._bgBewilligungStatusCode) || this._bgBewilligungStatusCode < 5) {
      btnVisisble = ['bewilligteMedGrundversorgungAnpassen', 'bearbeiten'];
      btnDisabled = ['bewilligteMedGrundversorgungAnpassen'];
      this.showButtons(btnVisisble, btnDisabled);
    }
  }

  private updateButtons() {
    let btnVisisble = [];

    let btnDisabled = [];
    if (this.isReadOnly()) {
      this.initButton();
    } else {
      if (this._bgBewilligungStatusCode >= 5) {
        btnVisisble = ['abschilessen', 'abbrechen'];
        btnDisabled = [];
      } else {
        btnVisisble = ['speichern', 'abbrechen'];
        btnDisabled = [];
      }
      this.showButtons(btnVisisble, btnDisabled);
    }
  }

  private showButtons(btnNames, btnDisabled?) {
    this.customizeBtnDetail = this.customizeBtnDetail.map(btn => {
      btn.visible = btnNames.includes(btn.name);
      btn.disabled = btnDisabled.includes(btn.name);
      return btn;
    });
  }

  private onBearbeiten() {
    this.changeFormStatus(FormState.Edit);
  }

  private onSpeichern() {
    const validator = this.editForm.validate();
    if (validator.isValid) {
      // Call API
    } else {
      // Show remain message
    }
  }

  private onAbbrechen() {
    this._editFormData = new MedGrundversorgung();
    this.changeFormStatus(FormState.ReadOnly);
    this.enableGrid.emit(true);
  }

  private onBewilligteMedGrundversorgungAnpassen() {
    if (this.datePopUpList.length === 0) {
      this.popUpModel.isVisible = true;
      this.popUpModel.title = this.translateService.instant('MedGrundversorgung.PopupConfirm.TitleConfirmDate');
      this.popUpModel.message = this.translateService.instant('MedGrundversorgung.PopupConfirm.MessageNoData');
      this.popUpModel.isVisibleNo = false;
      this.popUpModel.isVisibleYes = false;
      this.popUpModel.funcHidden = () => {
        this.datePopupSelect = null;
        this.visiblePopUpDate = true;
        this.popUpModel = new PopUpModel({ isVisible: false });
      };
    } else {
      this.visiblePopUpDate = true;
      this.datePopupSelect = this.datePopUpList[this.datePopUpList.length - 1].value;
    }
  }

  private onAbschilessen() {
  }

  private onBeitrageAnpassen() {
    this.onBewilligteMedGrundversorgungAnpassen();
  }

}
