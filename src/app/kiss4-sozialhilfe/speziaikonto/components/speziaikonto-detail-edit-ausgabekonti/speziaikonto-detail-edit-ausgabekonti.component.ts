import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant } from '@shared/common/constant.common';
import { isSelectedAll } from '@shared/utilites/utilityHelpers';
import { DxSelectBoxComponent, DxTextBoxComponent, DxValidationGroupComponent } from 'devextreme-angular';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'kiss-speziaikonto-detail-edit-ausgabekonti',
  templateUrl: './speziaikonto-detail-edit-ausgabekonti.component.html',
  styleUrls: ['./speziaikonto-detail-edit-ausgabekonti.component.scss']
})
export class SpeziaikontoDetailEditAusgabekontiComponent implements OnInit, OnChanges {
  //#region 'Declare decorator'
  @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
  @ViewChild('BezeichnungTextBox') BezeichnungTextBox: DxTextBoxComponent;
  @ViewChild('GultigvonNumberbox') GultigvonNumberbox: DxTextBoxComponent;
  @ViewChild('GultigbisNumberbox') GultigbisNumberbox: DxTextBoxComponent;
  @ViewChild('Gultigvon') Gultigvon: DxSelectBoxComponent;
  @ViewChild('Gultigbis') Gultigbis: DxSelectBoxComponent;
  @ViewChild('Bemerkungen') Bemerkungen: DxTextBoxComponent;
  //#endregion

  //#region 'Input/Output variables'
  @Input() detailSelected;
  @Input() nameGutschrift: string;
  @Input() namePerson: string;
  @Input() nameMonthVon: string;
  @Input() nameMonthBis: string;
  @Input() dataSourceBgKostenart;
  @Input() dataSourceBaPerson;
  @Input() monat;
  @Input() queryVorhanden;
  @Input() queryBeglichen;
  @Input() isDatumBis;
  @Output() objValueChange: EventEmitter<any> = new EventEmitter();

  //#endregion

  //#region 'Declare variables'
  detailData: any;
  elementFocus: string;
  formatNumberInteger = CommonConstant.FormatNumberInteger;
  //#endregion

  constructor() {
    this.validationCallback = this.validationCallback.bind(this);
  }

  //#region component life cycle functions
  ngOnInit() {
    this.initFocus();
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

  onValueChangedDateBox() {
    this.onValueChanged();
    this.GultigvonNumberbox.validator.instance.validate();
    this.GultigbisNumberbox.validator.instance.validate();
    this.Gultigvon.validator.instance.validate();
    this.Gultigbis.validator.instance.validate();
  }

  validationCallback() {
    if (this.detailData.DatumBisJahr && this.detailData.DatumBisMonat) {
      return ((this.detailData.DatumVonJahr < this.detailData.DatumBisJahr) || ((this.detailData.DatumVonJahr === this.detailData.DatumBisJahr) && (this.detailData.DatumVonMonat <= this.detailData.DatumBisMonat)));
    }
    return true;
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
    this.GultigvonNumberbox.valueChangeEvent = 'keyup';
    this.GultigbisNumberbox.valueChangeEvent = 'keyup';
    this.Bemerkungen.valueChangeEvent = 'keyup';
  }

  setFocusOut() {
    this.BezeichnungTextBox.valueChangeEvent = 'focusout';
    this.GultigvonNumberbox.valueChangeEvent = 'focusout';
    this.GultigbisNumberbox.valueChangeEvent = 'focusout';
    this.Bemerkungen.valueChangeEvent = 'focusout';
  }
  //#endregion
}
