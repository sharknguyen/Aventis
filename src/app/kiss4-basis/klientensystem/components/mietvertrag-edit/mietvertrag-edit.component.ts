import 'devextreme-intl';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de-CH';
import { Component, EventEmitter, HostListener, Injector, Input, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { UtilService } from '@shared/utilites';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import {
  DxCheckBoxComponent,
  DxDataGridComponent,
  DxDateBoxComponent,
  DxDropDownBoxComponent,
  DxTextBoxComponent,
} from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { isNullOrUndefined } from 'util';

import { Mietvertrag } from '../../models';

registerLocaleData(localeDe, 'de-CH');

@Component({
  selector: 'kiss-mietvertrag-edit',
  templateUrl: './mietvertrag-edit.component.html',
  styleUrls: ['./mietvertrag-edit.component.scss']
})
@SetClassRight('CtlKlientensystem')
export class KlsMietvertragEditComponent extends BaseComponent {

  @ViewChild('vermieterGrid') vermieterGrid: DxDataGridComponent;
  @ViewChild('garantieBis') garantieBis: DxDateBoxComponent;
  @ViewChild('datumVon') datumVon: DxDateBoxComponent;
  @ViewChild('datumBis') datumBis: DxDateBoxComponent;
  @ViewChild('vermieter') vermieter: DxDropDownBoxComponent;
  @ViewChild('mietkostenNetto') mietkostenNetto: DxTextBoxComponent;
  @ViewChild('nebenkosten') nebenkosten: DxTextBoxComponent;
  @ViewChild('kostenanteilUE') kostenanteilUE: DxTextBoxComponent;
  @ViewChild('mietdepot') mietdepot: DxTextBoxComponent;
  @ViewChild('mietzinsgarantie') mietzinsgarantie: DxTextBoxComponent;
  @ViewChild('mieteAbgetreten1') mieteAbgetreten1: DxCheckBoxComponent;

  @Output() emitErrorStr: EventEmitter<any> = new EventEmitter();

  @Input() mietvertragData = new Mietvertrag();
  @Input() comboboxVermieter: any;

  isDropDownBoxOpened = false;
  selectedKeys = [];
  numberFormat = AppEnums.Validation.C007_NUMBER_FORMAT;
  dateFormat = CommonConstant.FORMAT_DATE;
  minDate: Date = new Date(1753, 0, 1);
  maxDate: Date = new Date(9999, 11, 31);
  minNumber = AppEnums.Money.MIN_VALUE;
  maxNumber = AppEnums.Money.MAX_VALUE;

  //#region "Declare variables for Froala editor"
  editor: any;
  maxLengthNumber = CommonConstant.MAX_LENGTH_NUMBER + CommonConstant.DECIMA_SIZE + (CommonConstant.MAX_LENGTH_NUMBER / CommonConstant.DECIMA_SIZE - 1);
  froalaEditorConfig = {
    heightMin: 150,
    height: 300,
    events: {
      'froalaEditor.initialized': (e, editor) => {
        this.editor = editor;
      },
      'froalaEditor.input': (e, editor) => {
      },
      'froalaEditor.paste.after': (e, editor) => {
      },
      'froalaEditor.blur': (e, editor) => {
        this.onFocusOut();
      },
      focus: (e) => {
      }
    }
  };
  //#endregion

  rowIndex = 0;
  maxLength = 4000;
  vermieterGridIndex = 0;
  isReadOnly: any;

  // Arrow key from
  accessKeyItemFocused = 0;
  keyFocus: string;
  keyInput: string;

  widthNumberAndDateBox = CommonConstant.WidthNumberAndDateBox;
  //#endregion

  constructor(
    injector: Injector,
    public translateService: TranslateService,
    public utilService: UtilService
  ) {
    super(injector);
    this.isReadOnly = false;
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  onInitDropdownbox() {
    setTimeout(() => {
      this.vermieter.instance.focus();
    }, CommonConstant.SetTimeOut);
  }

  disableTextarea() {
    if (!isNullOrUndefined(this.editor)) {
      this.editor.edit.off();
    }
  }

  enableTextarea() {
    if (!isNullOrUndefined(this.editor)) {
      this.editor.edit.on();
    }
  }

  // Validate Bemerkung value
  validateBemerkungValue(innerText) {
    if (innerText) {
      const numberOfLines = innerText.split('\n').length;
      const numberOfCharacters = innerText.length - numberOfLines + 1;
      if (numberOfCharacters > this.maxLength) {
        this.emitErrorStr.emit(this.translateService.instant('Klientensystem.Message.BemerkungMaxlength'));
        return false;
      } else if (numberOfCharacters < this.maxLength) {
        return true;
      }
    } else {
      return true;
    }
  }

  validateBemerkungSubmit() {
    if (this.editor.charCounter.count() > this.maxLength) {
      this.emitErrorStr.emit(this.translateService.instant('Klientensystem.Message.BemerkungMaxlength'));
      return false;
    } else {
      return true;
    }
  }

  /*** Arrow Key*/
  moveFocus(isNext: boolean) {
    const tagNames = ['input', 'dx-check-box'];
    for (const tagName of tagNames) {
      const elems = document.getElementsByTagName(tagName);
      for (const el of Array.from(elems)) {
        if (isNext) {
          if (this.keyInput === 'checkbox') {
            this.editor.events.focus();
            return;
          }
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

  getSizeQualifiergetSizeQualifier(width) {
    if (width < 1300) {
      return 'xs';
    }
    return 'lg';
  }

  onFocusIn(element, field: string, key) {
    this.keyFocus = field;
    this.keyInput = key;
    this.accessKeyItemFocused = element.accessKey;
  }

  onFocusOut() {
    this.accessKeyItemFocused = 0;
    if (this.mietkostenNetto.isValid && this.nebenkosten.isValid && this.kostenanteilUE.isValid
      && this.mietdepot.isValid && this.mietzinsgarantie.isValid && this.garantieBis.isValid
      && this.datumVon.isValid && this.datumBis.isValid && this.editor.charCounter.count() <= this.maxLength) {
      this.mietvertragData.isValid = true;
      this.emitErrorStr.emit('');
    } else if (this.editor.charCounter.count() > this.maxLength) {
      this.mietvertragData.isValid = false;
      this.emitErrorStr.emit(this.translateService.instant('Klientensystem.Message.BemerkungMaxlength'));
    } else {
      this.mietvertragData.isValid = false;
      this.emitErrorStr.emit(this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.ShowDetail.ValidInput'));
    }
  }

  onKeyDown(e) {
    if ((this.keyFocus === 'Vermieter' || this.keyFocus === 'Miete' || this.keyFocus === 'GarantieBis' || this.keyFocus === 'DatumBis') && (e.event.keyCode === AppEnums.KeyCode.KeyF4)) {
      e.event.preventDefault();
      if (this.keyFocus === 'GarantieBis') {
        this.garantieBis.opened = !this.garantieBis.opened;
      }
      if (this.keyFocus === 'Miete') {
        this.datumVon.opened = !this.datumVon.opened;
      }
      if (this.keyFocus === 'DatumBis') {
        this.datumBis.opened = !this.datumBis.opened;
      }
      if (this.keyFocus === 'Vermieter') {
        this.vermieter.opened = !this.vermieter.opened;
      }
    } else {
      if (e.event.keyCode === AppEnums.KeyCode.UpArrowKey) {
        const em = new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          key: 'ArrowUp',
        });
        document.dispatchEvent(em);
      } else if (e.event.keyCode === AppEnums.KeyCode.DownArrowKey) {
        const em = new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          key: 'ArrowDown',
        });
        document.dispatchEvent(em);
      }
    }
  }

  onVermieterOpened(event) {
    this.vermieterGrid.instance.focus();
  }

  onVermieterGridRowSelected(event) {
    this.mietvertragData.baInstitutionID = this.rowIndex;
    this.vermieter.opened = false;
  }
  onFocusedRowChanged() {
    this.selectedKeys[0] = this.rowIndex;
  }

  onVermieterGridRowEnter(event) {
    if (event.event.keyCode === AppEnums.KeyCode.KeyEnter) {
      this.mietvertragData.baInstitutionID = this.rowIndex;
      this.vermieter.opened = false;
      this.vermieter.instance.focus();
    } else if (event.event.keyCode === AppEnums.KeyCode.KeyF4) {
      this.vermieter.opened = false;
      this.vermieter.instance.focus();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.garantieBis.opened && !this.datumVon.opened && !this.datumBis.opened && !this.isDropDownBoxOpened) {
      if (event.keyCode === AppEnums.KeyCode.UpArrowKey || event.key === 'ArrowUp') {
        this.moveFocus(false);
      } else if (event.keyCode === AppEnums.KeyCode.DownArrowKey || event.key === 'ArrowDown') {
        this.moveFocus(true);
      }
    }
  }

  getSizeQualifier(width) {
    if (width < 1300) {
      return 'xs';
    }
    return 'lg';
  }
}
