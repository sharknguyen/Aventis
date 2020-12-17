import { Injector, ViewChild, Component, OnInit, OnDestroy, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { locale } from 'devextreme/localization';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { AppEnums } from '@shared/AppEnum';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstant } from '@shared/common/constant.common';
import { DxDateBoxComponent, DxValidationGroupComponent, DxTextBoxComponent } from 'devextreme-angular';
import { KbBuchung } from '@app/kiss4-sozialhilfe/sh-kasse/models';
@Component({
  selector: 'app-kasse-edit',
  templateUrl: './kasse-edit.component.html',
  styleUrls: ['./kasse-edit.component.scss']
})
@SetClassRight('CtlKasse')
export class KasseEditComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('validationGroupDetails') validationGroupDetails: DxValidationGroupComponent;
  @ViewChild('txtBoxRemask') txtBoxRemask: DxTextBoxComponent;
  @Input() kasseDetail: KbBuchung;
  @Output() btnSaveClick: EventEmitter<any> = new EventEmitter();
  @Output() btnCancelClick: EventEmitter<any> = new EventEmitter();
  dirty = false;
  isExpand = true;
  dateFormat = CommonConstant.FORMAT_DATE;
  CommonBtn = [...CommonConstant.AdditionalButtons];
  customizeBtn = [
    {
      text: 'Kasse.Button.Save',
      visible: true,
      disabled: undefined,
      name: 'save',
      icon: 'save',
      type: 'default'
    },
    {
      text: 'Kasse.Button.Cancel',
      visible: true,
      name: 'cancel',
      icon: 'close',
      type: 'default'
    }
  ];
  editor: any;
  froalaEditorConfig = {
    heightMin: 150,
    height: 300,
    events: {
      'froalaEditor.initialized': (e, editor) => {
        this.editor = editor;
        if (this.editor) {
          this.editor.edit.on();
        }
      },
      focus: (e) => { }
    }
  };
  //#region "Declare variables for another bussiness"
  accessKeyItemFocused = 0;
  //#endregion
  constructor(
    injector: Injector,
    public translateService: TranslateService
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.txtBoxRemask.instance.focus();
    });
  }
  //#region "Businness, load data for combox..."
  ngOnDestroy() {
  }

  //#region arrow key
  moveFocus(isNext: boolean) {
    const tagNames = ['input', 'textarea', 'dx-check-box'];
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
  onFocusIn(element, field: string) {
    this.accessKeyItemFocused = element.accessKey;
  }
  onFocusOut() {
    this.accessKeyItemFocused = 0;
  }
  onFocusInCheckBox(element) {
    this.accessKeyItemFocused = element.accessKey;
  }
  onFocusOutCheckBox() {
    this.accessKeyItemFocused = 0;
  }
  //#endregion
  onKeyDown(e) {
    if ((e.event.keyCode === AppEnums.KeyCode.KeyF4)) {
      if (!e.component.option('opened')) {
        e.event.preventDefault();
        e.component.open();
        return;
      }
      e.event.preventDefault();
      e.component.close();
    }
    return;
  }
  changeCollapseFormContent(event) {
    if (event.target.textContent === this.translateService.instant('Kasse.TitleDetail')) {
      this.isExpand = !this.isExpand;
    }
  }
  toolBarOnItemClick(event) {
    switch (event) {
      case 'save':
        this.blurAll();
        this.btnSaveClick.emit(this.kasseDetail);
        break;
      case 'cancel':
        this.blurAll();
        this.btnCancelClick.emit();
        break;
      default:
        break;
    }
  }
  public validateForm(): boolean {
    if (!this.validationGroupDetails.instance) {
      return true;
    }
    return this.validationGroupDetails.instance.validate().isValid;
  }
  changeStatusButtons(toDisable) {
    const btnDisabledNames = ['save'];
    this.changeDisabled(btnDisabledNames, toDisable);
  }
  changeDisabled(btnNames, toDisable) {
    this.customizeBtn = this.customizeBtn.map(btn => {
      if (!btnNames.includes(btn.name)) {
        return btn;
      }
      btn.disabled = btn.disabled !== toDisable ? btnNames.includes(btn.name) && toDisable : btn.disabled;
      return btn;
    });
  }
  onValueChange(event) {
    if (event !== undefined) {
      this.dirty = true;
    }
  }
  isDirty(): boolean {
    return this.dirty;
  }
  blurAll() {
    const el = document.querySelector(':focus');
    if (el) {
      (el as HTMLElement).blur();
    }
  }
  getSizeQualifier(width) {
    return width < 1500 ? AppEnums.ScreenResolution.EXTRA_SMALL : AppEnums.ScreenResolution.LARGE;
  }
  isDisableBtnSave() {
    return this.customizeBtn.filter(x => x.name === 'save')[0].disabled;
  }
}
