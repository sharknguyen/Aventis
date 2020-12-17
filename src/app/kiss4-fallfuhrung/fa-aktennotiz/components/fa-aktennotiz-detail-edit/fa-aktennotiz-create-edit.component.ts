import { Injector, ViewChild, Component, OnInit, OnDestroy, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { locale } from 'devextreme/localization';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { AppEnums } from '@shared/AppEnum';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstant } from '@shared/common/constant.common';
import { FaAktennotizDetailModel } from '@app/kiss4-fallfuhrung/fa-aktennotiz/models';
import { DxDateBoxComponent, DxValidationGroupComponent, DxTextBoxComponent, DxDataGridComponent, DxDropDownBoxComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-fa-aktennotiz-create-edit',
  templateUrl: './fa-aktennotiz-create-edit.component.html',
  styleUrls: ['./fa-aktennotiz-create-edit.component.scss']
})
@SetClassRight('CtlFaAktennotiz')
export class FaAktennotizCreateEditComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('datebox') datebox: DxDateBoxComponent;
  @ViewChild('validationGroupDetails') validationGroupDetails: DxValidationGroupComponent;
  @ViewChild('textBoxKontaktpartner') textBoxKontaktpartner: DxTextBoxComponent;
  @ViewChild('textBoxStichwort') textBoxStichwort: DxTextBoxComponent;
  @ViewChild('dropDownBox') dropDownBox: DxDropDownBoxComponent;
  @ViewChild('gridMitarbeiter') gridMitarbeiter: DxDataGridComponent;
  @Input() mitarbeiterData: any;
  @Input() faAktennotizDetail: FaAktennotizDetailModel;
  @Input() theMenData: any;
  @Input() tagBoxDetailTheMenValue: any;
  @Input() isVisibleDauer: any;
  @Input() dauerData: any;
  @Input() kontaktartData: any;
  @Output() btnDocumentClick: EventEmitter<any> = new EventEmitter();
  @Output() btnSaveClick: EventEmitter<any> = new EventEmitter();
  @Output() btnCancelClick: EventEmitter<any> = new EventEmitter();
  @Output() btnDeleteClick: EventEmitter<any> = new EventEmitter();
  subcription: Subscription = new Subscription();
  isExpand = true;
  isDirty = false;
  CommonBtn = [...CommonConstant.AdditionalButtons];
  dateFormat = CommonConstant.FORMAT_DATE;
  editorValue: string;
  customizeBtn = [
    {
      text: 'FaAktennotiz.Button.Document',
      disabled: undefined,
      visible: true,
      name: 'document',
      type: 'default',
      icon: '/assets/icon/base64-decode/document.ico'
    },
    {
      text: 'FaAktennotiz.Button.Save',
      visible: true,
      disabled: undefined,
      name: 'save',
      icon: 'save',
      type: 'default'
    },
    {
      text: 'FaAktennotiz.Button.Cancel',
      visible: true,
      name: 'cancel',
      icon: 'close',
      type: 'default'
    },
    {
      text: 'FaAktennotiz.Button.Loschen',
      visible: true,
      disabled: undefined,
      locateInMenu: 'always',
      name: 'loschen',
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
          if (this.faAktennotizDetail.IsDeleted) {
            this.editor.edit.off();
          } else {
            this.editor.edit.on();
          }
        }
      },
      focus: (e) => { },
      'froalaEditor.input': (e, editor, inputEvent) => {
        this.isDirty = true;
      },
    }
  };
  //#region "Declare variables for another bussiness"
  accessKeyItemFocused = 0;
  keyFocus: string;
  dateBoxDatumVonValue: Date;
  dateBoxDatumBisValue: Date;
  minDate = new Date(1753, 0, 1);
  maxDate = new Date(9999, 12, 31);
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
    this.editorValue = this.faAktennotizDetail.InhaltRtf;
    setTimeout(() => {
      this.datebox.instance.focus();
      this.subcription.add(this.dropDownBox.onOpened.subscribe(event => {
        if (this.dropDownBox.value) {
          this.gridMitarbeiter.focusedRowKey = this.dropDownBox.value;
          return;
        }
        const visibleRows = this.gridMitarbeiter.instance.getVisibleRows();
        if (visibleRows.length > 0) {
          this.gridMitarbeiter.focusedRowKey = visibleRows[0].key;
          return;
        }
      }));
    });
  }
  //#region "Businness, load data for combox..."
  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
  //#region arrow key
  moveFocus(isNext: boolean) {
    const tagNames = ['input', 'textarea', 'span', 'dx-check-box', 'dx-radio-group'];
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
    this.keyFocus = field;
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
    if (this.keyFocus === 'Datum' || this.keyFocus === 'Kontaktart' || this.keyFocus === 'Dauer' || this.keyFocus === 'Mitarbeiter') {
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
  }
  changeCollapseFormContent(event) {
    if (event.target.textContent === this.translateService.instant('FaAktennotizDetails.TitleDetail')) {
      this.isExpand = !this.isExpand;
    }
  }
  toolBarOnItemClick(event) {
    switch (event) {
      case 'document':
        this.btnDocumentClick.emit();
        break;
      case 'save':
        this.btnSaveClick.emit();
        break;
      case 'cancel':
        this.btnCancelClick.emit();
        break;
      case 'loschen':
        if (this.isBtnDisable('loschen')) {
          return;
        }
        this.btnDeleteClick.emit();
        break;
      default:
        break;
    }
  }
  isBtnDisable(btnName) {
    return this.customizeBtn.filter(x => x.name === btnName)[0] ? this.customizeBtn.filter(x => x.name === btnName)[0].disabled : true;
  }
  onValueDropDownAutorChanged(event) {
    if (event !== undefined) {
      this.isDirty = true;
    }
    this.faAktennotizDetail.UserId = event.value;
  }
  onValueTagBoxThemenChanged(event) {
    if (event !== undefined) {
      this.isDirty = true;
    }
    this.faAktennotizDetail.FaThemaCodes = event.value.join(',');
  }
  gridAutorOnClick(event) {
    this.faAktennotizDetail.UserId = event.data.userID;
    this.closeAndFocusDropDown();
  }
  public validateForm(): boolean {
    if (!this.validationGroupDetails.instance) {
      return true;
    }
    return this.validationGroupDetails.instance.validate().isValid;
  }
  public setDisableBtnSave(isDisable: boolean) {
    this.changeDisabled(['save'], isDisable);
  }
  public setDisableBtnLoschen(isDisable: boolean) {
    isDisable = this.faAktennotizDetail.IsDeleted ? true : isDisable;
    this.changeDisabled(['loschen'], isDisable);
  }
  public getCurrentTextKontaktpartner() {
    return this.textBoxKontaktpartner.instance ? this.textBoxKontaktpartner.instance.option('text') : null;
  }
  public getCurrentTextStichwort() {
    return this.textBoxStichwort.instance ? this.textBoxStichwort.instance.option('text') : null;
  }
  public getCurrentValueDatum() {
    if (!this.datebox.instance) {
      return null;
    }
    this.datebox.valueChangeEvent = 'keyup';
    return { data: this.datebox.instance.option('value'), datebox: this.datebox };
  }
  onFocusedRowChanged(event) {
    if (!event.row) {
      return;
    }
    this.gridMitarbeiter.selectedRowKeys = [event.row.key];
  }
  onKeyDownGrid(e) {
    if (e.event.keyCode === AppEnums.KeyCode.KeyF4) {
      this.closeAndFocusDropDown();
      return;
    }
    if (e.event.keyCode === AppEnums.KeyCode.KeyEnter) {
      this.dropDownBox.value = this.gridMitarbeiter.focusedRowKey;
      this.closeAndFocusDropDown();
    }
  }
  closeAndFocusDropDown() {
    this.dropDownBox.instance.close();
    this.dropDownBox.instance.focus();
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
  changeVisible(btnNames, toVisible) {
    this.customizeBtn = this.customizeBtn.map(btn => {
      if (!btnNames.includes(btn.name)) {
        return btn;
      }
      btn.visible = btn.visible !== toVisible ? btnNames.includes(btn.name) && toVisible : btn.visible;
      return btn;
    });
  }
  valueChange(value) {
    if (value !== undefined) {
      this.isDirty = true;
    }
  }
  isFormDirty() {
    return this.isDirty || this.editorValue !== this.faAktennotizDetail.InhaltRtf;
  }
}
