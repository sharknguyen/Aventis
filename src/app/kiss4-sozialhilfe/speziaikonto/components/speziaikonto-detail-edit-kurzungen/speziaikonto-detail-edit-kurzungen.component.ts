import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant } from '@shared/common/constant.common';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxNumberBoxComponent, DxTextBoxComponent, DxValidationGroupComponent } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { isNullOrUndefined } from 'util';
import { isSelectedAll } from '@shared/utilites/utilityHelpers';

@Component({
  selector: 'kiss-speziaikonto-detail-edit-kurzungen',
  templateUrl: './speziaikonto-detail-edit-kurzungen.component.html',
  styleUrls: ['./speziaikonto-detail-edit-kurzungen.component.scss']
})
export class SpeziaikontoDetailEditKurzungenComponent implements OnInit, OnChanges {
  //#region 'Declare decorator'
  @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
  @ViewChild('BezeichnungTextBox') BezeichnungTextBox: DxTextBoxComponent;
  @ViewChild('AnteilvomGBNumberBox') AnteilvomGBNumberBox: DxNumberBoxComponent;
  @ViewChild('LaufzeitNumberBox') LaufzeitNumberBox: DxNumberBoxComponent;
  @ViewChild('GultigvonNumberBox') GultigvonNumberBox: DxNumberBoxComponent;
  @ViewChild('GultigbisNumberBox') GultigbisNumberBox: DxNumberBoxComponent;
  @ViewChild('Bemerkungen') Bemerkungen: DxNumberBoxComponent;

  //#endregion

  //#region 'Input/Output variables'
  @Input() detailSelected;
  @Input() namePerson: string;
  @Input() nameMonthVon: string;
  @Input() nameMonthBis: string;
  @Input() dataSourceBaPerson;
  @Input() monat;
  @Input() maxSanktion;
  @Input() isDisableKurzungen;
  @Input() isDisableSalo;
  @Input() isEdit;
  @Output() objValueChange: EventEmitter<any> = new EventEmitter();
  //#endregion

  //#region 'Declare global variables'
  detailData: any;
  getLanguageCodeFromLocalStorage: any;
  formatPercent = CommonConstant.FORMATNUMBERDEFAULTP1;
  formatNumberInteger = CommonConstant.FormatNumberInteger;
  //#endregion
  elementFocus: string;
  constructor() { }

  //#region component life cycle functions
  ngOnInit() {
    this.initFocus();
    this.getLanguageCodeFromLocalStorage = UtilityHelper.getLanguageCodeFromLocalStorage();
    locale(this.getLanguageCodeFromLocalStorage);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(this.detailSelected)) {
      this.detailData = { ...this.detailSelected };
    }
  }
  //#endregion

  //#region utility functions
  onValueChanged() {
    const data = {
      dataForm: this.detailData,
      isChange: true
    };
    this.objValueChange.emit({ ...data });
  }

  onKeyUpNumberBox(event, fieldName) {
    if (this.isBackSpacePressed(event) && this.detailData[fieldName] === 0) {
      this.detailData[fieldName] = null;
    }
  }

  onFocusIn(e, field: string) {
    this.elementFocus = field;
  }

  onKeyDown(e) {
    if (this.elementFocus === 'selectbox') {
      if (e.event.keyCode === AppEnums.KeyCode.KeyF4) {
        if (!(e.component.option('opened'))) {
          e.event.preventDefault();
          e.component.open();
          return;
        }
        e.component.close();
      }
    }
  }

  onKeyDownNumberBox(event, fieldName) {
    if (this.isBackSpacePressed(event) && isSelectedAll(event)) {
      this.detailData[fieldName] = null;
    }
  }

  isBackSpacePressed(event) {
    if (event.event.keyCode === AppEnums.KeyCode.BackSpace || event.event.keyCode === AppEnums.KeyCode.Delete) {
      return event.event.keyCode;
    }
  }

  initFocus() {
    setTimeout(() => {
      this.BezeichnungTextBox.instance.focus();
    }, CommonConstant.SetTimeOut300);
  }

  funcCheckValidation() {
    return (this.validationGroup.instance.validate() && this.validationGroup.instance.validate().isValid);
  }

  setKeyUp() {
    this.BezeichnungTextBox.valueChangeEvent = 'keyup';
    this.AnteilvomGBNumberBox.valueChangeEvent = 'keyup';
    this.LaufzeitNumberBox.valueChangeEvent = 'keyup';
    this.GultigvonNumberBox.valueChangeEvent = 'keyup';
    this.GultigbisNumberBox.valueChangeEvent = 'keyup';
    this.Bemerkungen.valueChangeEvent = 'keyup';
  }

  setFocusOut() {
    this.BezeichnungTextBox.valueChangeEvent = 'focusout';
    this.AnteilvomGBNumberBox.valueChangeEvent = 'focusout';
    this.LaufzeitNumberBox.valueChangeEvent = 'focusout';
    this.GultigvonNumberBox.valueChangeEvent = 'focusout';
    this.GultigbisNumberBox.valueChangeEvent = 'focusout';
    this.Bemerkungen.valueChangeEvent = 'focusout';
  }

  onFocusOutAnteil() {
    this.formatPercent = CommonConstant.FORMATNUMBERDEFAULTP1;
  }

  onFocusInAnteil() {
    this.formatPercent = CommonConstant.FormatAnteilPercent;
  }
  //#endregion
}
