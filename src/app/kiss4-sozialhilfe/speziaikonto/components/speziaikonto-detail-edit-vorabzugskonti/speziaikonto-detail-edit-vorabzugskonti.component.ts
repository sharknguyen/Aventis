import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant } from '@shared/common/constant.common';
import { isSelectedAll } from '@shared/utilites/utilityHelpers';
import {
  DxNumberBoxComponent,
  DxSelectBoxComponent,
  DxTextAreaComponent,
  DxTextBoxComponent,
  DxValidationGroupComponent,
} from 'devextreme-angular';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'kiss-speziaikonto-detail-edit-vorabzugskonti',
  templateUrl: './speziaikonto-detail-edit-vorabzugskonti.component.html',
  styleUrls: ['./speziaikonto-detail-edit-vorabzugskonti.component.scss']
})
export class SpeziaikontoDetailEditVorabzugskontiComponent implements OnInit, OnChanges {
  @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
  @ViewChild('BezeichnungTextBox') BezeichnungTextBox: DxTextBoxComponent;
  @ViewChild('Startsaldo') Startsaldo: DxNumberBoxComponent;
  @ViewChild('MonatlicherBetrag') MonatlicherBetrag: DxNumberBoxComponent;
  @ViewChild('GultigvonNumberbox') GultigvonNumberbox: DxNumberBoxComponent;
  @ViewChild('GultigbisNumberbox') GultigbisNumberbox: DxNumberBoxComponent;
  @ViewChild('Gultigvon') Gultigvon: DxSelectBoxComponent;
  @ViewChild('Gultigbis') Gultigbis: DxSelectBoxComponent;
  @ViewChild('Bemerkungen') Bemerkungen: DxTextAreaComponent;
  @Input() dataSourceBaPerson;
  @Input() detailSelected;
  @Input() monat;
  @Input() queryVorhanden;
  @Input() queryBeglichen;
  @Input() isDatumBis;
  @Output() objValueChange: EventEmitter<any> = new EventEmitter();

  formatNumberDefault = CommonConstant.FormatNumberN2;
  formatNumberInteger = CommonConstant.FormatNumberInteger;
  elementFocus: string;
  monatVon: any;
  monatBis: any;
  detailData: any;
  constructor() {
    this.validationCallback = this.validationCallback.bind(this);
  }

  ngOnInit() {
    this.initFocus();
  }

  onFocusIn(e, field: string) {
    this.elementFocus = field;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(this.detailSelected)) {
      this.detailData = { ...this.detailSelected };
    }
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
    this.Startsaldo.valueChangeEvent = 'keyup';
    this.MonatlicherBetrag.valueChangeEvent = 'keyup';
    this.GultigvonNumberbox.valueChangeEvent = 'keyup';
    this.GultigbisNumberbox.valueChangeEvent = 'keyup';
    this.Bemerkungen.valueChangeEvent = 'keyup';
  }

  setFocusOut() {
    this.BezeichnungTextBox.valueChangeEvent = 'focusout';
    this.Startsaldo.valueChangeEvent = 'focusout';
    this.MonatlicherBetrag.valueChangeEvent = 'focusout';
    this.GultigvonNumberbox.valueChangeEvent = 'focusout';
    this.GultigbisNumberbox.valueChangeEvent = 'focusout';
    this.Bemerkungen.valueChangeEvent = 'focusout';
  }

}
