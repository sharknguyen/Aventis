import { Component, EventEmitter, HostListener, Injector, Input, OnInit, Output, ViewChild, OnChanges } from '@angular/core';
import { BeraterAllConstant } from '@app/kiss4-basis/berater/berater.constant';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant, FormState } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import DevExpress from 'devextreme/bundles/dx.all';
import { isFunction, isEmpty } from 'lodash-es';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'kiss-berater-detail',
  templateUrl: './berater-detail.component.html',
  styleUrls: ['./berater-detail.component.scss'],
})

export class BeraterFormDetailComponent extends BaseComponent implements OnInit, OnChanges {
  @ViewChild('editForm') editForm;
  @Output() formDataSave: EventEmitter<any> = new EventEmitter();
  @Output() formRemainData: EventEmitter<any> = new EventEmitter();
  @Output() closeRemain: EventEmitter<any> = new EventEmitter();
  @Output() loschen: EventEmitter<any> = new EventEmitter();
  @Output() formStateChanged: EventEmitter<FormState> = new EventEmitter();
  @Output() loadDataGrid: EventEmitter<FormState> = new EventEmitter();
  @Output() createdNewIDChange: EventEmitter<FormState> = new EventEmitter();
  @Input() formData: any;
  @Input() institutions: any;
  @Input() columnsDef: Array<DevExpress.ui.dxDataGridColumn>;
  @Input() beraterLanguages: any;
  @Input() createdNewID: number;
  AdditionalButtons = [...CommonConstant.AdditionalButtons];
  customizeBtnDetail = [];
  expandedDetail = true;
  formState: FormState = FormState.ReadOnly;
  popUpConfirmModel: PopUpModel = new PopUpModel(
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
      funcNo: null
    });

  constructor(injector: Injector,
    public translateService: TranslateService) {
    super(injector);
  }

  ngOnInit() {
    this.customizeBtnDetail = [
      {
        text: 'ExterneBerater.ExterneBeraterSucheBox.Speichern',
        visible: false,
        useSubmitBehavior: true,
        icon: 'save',
        name: 'speichern',
        disabled: false,
        callback: () => this.onSpeichern()
      },
      {
        text: 'ExterneBerater.ExterneBeraterSucheBox.Abbrechen',
        visible: false,
        icon: 'close',
        name: 'abbrechen',
        callback: () => this.onAbbrechen()
      },
      {
        text: 'ExterneBerater.ExterneBeraterSucheBox.NeuerExternerBerater',
        visible: true,
        icon: 'add',
        name: 'neuer',
        callback: () => this.onNeuer()
      },
      {
        text: 'ExterneBerater.ExterneBeraterSucheBox.Bearbeiten',
        visible: true,
        icon: 'edit',
        name: 'bearbeiten',
        callback: () => this.onBearbeiten()
      },
      {
        text: 'ExterneBerater.ExterneBeraterSucheBox.Delete',
        visible: true,
        useSubmitBehavior: true,
        locateInMenu: 'always',
        disabled: false,
        name: 'loschen',
        callback: () => this.onLoschen()
      }
    ];
  }

  ngOnChanges(event) {
    if (!isNullOrUndefined(event.formData)) {
      this.changeDisabled(['bearbeiten', 'loschen'], isEmpty(event.formData.currentValue));
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
    this.formStateChanged.emit(this.formState);
  }

  private updateButtons() {
    let btnNames = ['speichern', 'abbrechen', 'loschen'];
    if (this.isReadOnly()) {
      btnNames = ['neuer', 'bearbeiten', 'loschen'];
    }
    this.showButtons(btnNames);
  }

  disableButtons(status: boolean) {
    const btnDisabledNames = ['speichern', 'loschen'];
    this.changeDisabled(btnDisabledNames, status);
  }

  private showButtons(btnNames) {
    this.customizeBtnDetail = this.customizeBtnDetail.map(btn => {
      btn.visible = btnNames.includes(btn.name);
      return btn;
    });
  }

  changeDisabled(btnNames, status) {
    this.customizeBtnDetail = this.customizeBtnDetail.map(btn => {
      btn.disabled = btnNames.includes(btn.name) && status;
      return btn;
    });
  }

  toolBarOnItemDetailClick(e) {
    if (isFunction(e.callback) && e.callback()) {
      return;
    }
    if (e === BeraterAllConstant.headerClicked) {
      this.expandedDetail = !this.expandedDetail;
      return;
    }
  }

  private onNeuer() {
    this.changeFormStatus(FormState.New);
  }

  private onBearbeiten() {
    if (this.formData.hasOwnProperty('id') && this.formData.id !== '') {
      this.changeFormStatus(FormState.Edit);
    }
  }

  private onSpeichern() {
    const message = this.editForm.validate();
    if (message) {
      return this.showRemainMessage(this.translateService.instant('ExterneBerater.Messgage.ValidateForm'));
    }
    this.saveForm(this.editForm.getFormData());
  }

  private onAbbrechen() {
    this.createdNewIDChange.emit(this.formData.baInstitutionKontaktID);
    this.disableButtons(false);
    if (this.editForm.isDirty()) {
      this.showConfirmPopUp(this.translateService.instant('ExterneBeraterDetail.AbbrechenDetail'));
    } else {
      this.closeRemain.emit();
      this.loadDataGrid.emit();
      this.changeFormStatus(FormState.ReadOnly);
    }
  }

  private getText(text: string) {
    return this.translateService.instant('ExterneBerater.' + text);
  }

  private showConfirmPopUp(message) {
    this.popUpConfirmModel.isVisible = true;
    this.popUpConfirmModel.message = this.getText(message);
    this.popUpConfirmModel.title = this.getText('ExterneBeraterDetail.ConfirmPopupTitle');
    this.popUpConfirmModel.textYes = this.getText('ExterneBeraterDetail.PopupYes');
    this.popUpConfirmModel.textNo = this.getText('ExterneBeraterDetail.PopupNo');
    this.popUpConfirmModel.funcYes = () => {
      this.popUpConfirmModel.isVisible = false;
      this.loadDataGrid.emit();
      this.closeRemain.emit();
      this.changeFormStatus(FormState.ReadOnly);
    };
    this.popUpConfirmModel.funcNo = () => {
      this.popUpConfirmModel.isVisible = false;
    };
  }

  private onLoschen() {
    if (!this.isDirty() && this.isNew()) {
      return this.changeFormStatus(FormState.ReadOnly);
    }
    if (!this.customizeBtnDetail[4].disabled) {
      this.loschen.emit();
    }
  }

  private saveForm(data) {
    this.formDataSave.emit(data);
  }

  private showRemainMessage(data) {
    this.formRemainData.emit(data);
  }

  blurAll() {
    const el = document.querySelector(':focus');
    if (el) {
      (el as HTMLElement).blur();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Ctrl + B
    if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyB) {
      event.preventDefault();
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyS) {
      event.preventDefault();
      this.blurAll();
      this.onSpeichern();
      return;
    }
    // Ctrl + z
    if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyZ) {
      event.preventDefault();
      this.blurAll();
      this.onAbbrechen();
      return;
    }
    // Ctrl + I
    if ((event.ctrlKey) && event.keyCode === AppEnums.KeyCode.KeyI) {
      if (!this.isEdit()) {
        event.preventDefault();
        this.onNeuer();
        return;
      }
    }
    // Ctrl + M
    if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyM) {
      event.preventDefault();
      this.onLoschen();
      return;
    }
  }
}
