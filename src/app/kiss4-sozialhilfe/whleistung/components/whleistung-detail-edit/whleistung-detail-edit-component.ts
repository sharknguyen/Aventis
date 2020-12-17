import 'devextreme-intl';

import {
  AfterViewInit,
  Component,
  HostListener,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { GrundBedarfConstant } from '@shared/common/sozialhilfe.common';
import { BaseComponent } from '@shared/components/base.component';
import { UtilService } from '@shared/utilites/utility.service';
import { isClearNumberBox, getLanguageCodeFromLocalStorage, isSelectedAll } from '@shared/utilites/utilityHelpers';
import {
  DxDateBoxComponent,
  DxSelectBoxComponent,
  DxValidationGroupComponent,
  DxValidatorComponent,
} from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { isNullOrUndefined } from 'util';

import { DataGridBottom, TopFaLeistungValue } from '../../models';

@Component({
  selector: 'kiss-whleistung-detail-edit',
  templateUrl: './whleistung-detail-edit-component.html',
  styleUrls: ['./whleistung-detail-edit-component.scss']
})
@SetClassRight('CtlWhLeistung')
export class FormDetailEditComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  @ViewChild('validationWhLeistungForm') validationWhLeistungForm: DxValidationGroupComponent;
  @ViewChild('datumVonValidator') datumVonValidator: DxValidatorComponent;
  @ViewChild('validatorVor') validatorVor: DxValidatorComponent;
  @ViewChild('dateboxEr') dateboxEr: DxDateBoxComponent;
  @ViewChild('dateboxAb') dateboxAb: DxDateBoxComponent;
  @ViewChild('selectbox') selectbox: DxSelectBoxComponent;
  @ViewChild('selectboxBFS') selectboxBFS: DxSelectBoxComponent;
  @ViewChild('selectboxGem') selectboxGem: DxSelectBoxComponent;
  @ViewChild('selectboxBottom') selectboxBottom: DxSelectBoxComponent;

  formData: TopFaLeistungValue = new TopFaLeistungValue();
  sizeQualifier: any;
  wohnsituation: any;
  dateFormat = CommonConstant.FORMAT_DATE;
  nameCombobox: any;
  nameComboboxBFS: any;
  nameComboboxGeme: any;
  nameComboboxBottom: any;

  minDate = CommonConstant.MIN_DATE;
  maxDate =  CommonConstant.MAX_DATE;

  minNumber = AppEnums.Money.MIN_VALUE;
  maxNumber = AppEnums.Money.MAX_VALUE;

  dataGridBottom: DataGridBottom[] = [];

  numberFormat = GrundBedarfConstant.NUMBER_FORMAT;
  formWidth: number;

  @Input() formDataEmit: any;
  @Input() nameComboboxEmit: any;
  @Input() nameComboboxBFSEmit: any;
  @Input() nameComboboxGemeEmit: any;
  @Input() nameComboboxBottomEmit: any;

  nameFocus: any;
  accessKeyItemFocused: any;

  constructor(
    injector: Injector,
    public translateService: TranslateService,
    public utilService: UtilService,
    public router: Router,
  ) {
    super(injector);
    locale(getLanguageCodeFromLocalStorage());
    this.validationCallbackDatum = this.validationCallbackDatum.bind(this);
  }

  canDeactivate() {
    return true;
  }

  ngOnInit() {
    this.formWidth = window.screen.width - CommonConstant.LeftMenuWidth;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(changes.nameComboboxEmit) && !isNullOrUndefined(changes.nameComboboxEmit.currentValue)) {
      this.nameCombobox = changes.nameComboboxEmit.currentValue;
    }
    if (!isNullOrUndefined(changes.nameComboboxBFSEmit) && !isNullOrUndefined(changes.nameComboboxBFSEmit.currentValue)) {
      this.nameComboboxBFS = changes.nameComboboxBFSEmit.currentValue;
    }
    if (!isNullOrUndefined(changes.nameComboboxGemeEmit) && !isNullOrUndefined(changes.nameComboboxGemeEmit.currentValue)) {
      this.nameComboboxGeme = changes.nameComboboxGemeEmit.currentValue;
    }
    if (!isNullOrUndefined(changes.nameComboboxBottomEmit) && !isNullOrUndefined(changes.nameComboboxBottomEmit.currentValue)) {
      this.nameComboboxBottom = changes.nameComboboxBottomEmit.currentValue;
    }
    if (!isNullOrUndefined(changes.formDataEmit) && !isNullOrUndefined(changes.formDataEmit.currentValue)) {
      this.formData = changes.formDataEmit.currentValue;
    }
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }

  validationVonDate = (value) => {
  }

  onFocusIn(event, field) {
    this.nameFocus = field;
    this.accessKeyItemFocused = event.accessKey;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(e: any) {
    if ((e.keyCode === AppEnums.KeyCode.KeyF4)) {
      if (isNullOrUndefined(this.nameFocus)) {
        return;
      }
      if (this[this.nameFocus].opened) {
        this[this.nameFocus].instance.close();
      } else {
        this[this.nameFocus].instance.open();
      }
      return;
    }
    if (e.keyCode === AppEnums.KeyCode.UpArrowKey || e.key === 'ArrowUp') {

      this.moveFocus(false);
    } else if (e.keyCode === AppEnums.KeyCode.DownArrowKey || e.key === 'ArrowDown') {
      this.moveFocus(true);
    }
  }

  onPasteVor = (event) => {
    this.validatorVor.instance.validate();
  }

  validationVor = (event) => {
    return !(event.value && (event.value < this.minNumber || event.value > this.maxNumber));
  }

  validationCallbackDatum = (e) => {
    return !(new Date(e.value) < CommonConstant.MIN_DATE);
  }

  isBackSpacePressed(event) {
    if (event.event.keyCode === AppEnums.KeyCode.BackSpace || event.event.keyCode === AppEnums.KeyCode.Delete) {
        return event.event.keyCode;
    }
  }
  onNumberboxKeyDown(event, fieldName) {
      if (this.isBackSpacePressed(event) && isSelectedAll(event)) {
        this.formData[fieldName] = null;
      }
  }

  /*** Arrow Key*/
  moveFocus(isNext: boolean) {
    const tagNames = ['input', 'dx-check-box'];
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

  onFocusOut(event, field) {
    this.nameFocus = '';
    if (field === 'dateboxEr') {
      this.datumVonValidator.instance.validate();
    }
  }

  onValueChanged(event, field) {

  }

  onKeyDown(e, field) {
    if (isClearNumberBox(e)) {
      this.formData[field] = 0;
      setTimeout(() => {
          this.formData[field] = null;
      });
    }
  }
}
