import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant } from '@shared/common/constant.common';
import { isSelectedAll } from '@shared/utilites/utilityHelpers';
import {
  DxNumberBoxComponent,
  DxTextAreaComponent,
  DxTextBoxComponent,
  DxValidationGroupComponent,
} from 'devextreme-angular';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'kiss-speziaikonto-detail-edit-abzahlungskonti',
  templateUrl: './speziaikonto-detail-edit-abzahlungskonti.component.html',
  styleUrls: ['./speziaikonto-detail-edit-abzahlungskonti.component.scss']
})
export class SpeziaikontoDetailEditAbzahlungskontiComponent implements OnInit, OnChanges {
  @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
  @ViewChild('BezeichnungTextBox') BezeichnungTextBox: DxTextBoxComponent;
  @ViewChild('AbzuzahlenderBetrag') AbzuzahlenderBetrag: DxNumberBoxComponent;
  @ViewChild('MonatlicherBetrag') MonatlicherBetrag: DxNumberBoxComponent;
  @ViewChild('GultigvonNumberbox') GultigvonNumberbox: DxNumberBoxComponent;
  @ViewChild('Bemerkungen') Bemerkungen: DxTextAreaComponent;
  @ViewChild('BegrundungAbschluss') BegrundungAbschluss: DxTextAreaComponent;
  @Input() dataSourceBaPerson;
  @Input() detailSelected;
  @Input() monat;
  @Input() dataSourceBgKostenart;
  @Input() abzahlungskontoRueckerstattung;
  @Input() isDisableField;
  @Input() dataSourceGutschrift;
  @Input() isAbschliessenVisible;
  @Input() isVisiblePanasch;
  @Input() queryVorhanden;
  @Input() queryBeglichen;
  @Input() isEdit;
  @Output() objValueChange: EventEmitter<any> = new EventEmitter();
  elementFocus: string;
  detailData: any;
  formatNumberDefault = CommonConstant.FormatNumberN2;
  formatNumberInteger = CommonConstant.FormatNumberInteger;
  maxValue = AppEnums.Money.MAX_VALUE;

  constructor() { }

  ngOnInit() {
    this.initFocus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(this.detailSelected)) {
      this.detailData = { ...this.detailSelected };
    }
  }

  onValueChanged() {
    const data = {
      dataForm: this.detailData,
      isChange: true
    };
    this.objValueChange.emit({ ...data });
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
    this.AbzuzahlenderBetrag.valueChangeEvent = 'keyup';
    this.MonatlicherBetrag.valueChangeEvent = 'keyup';
    this.GultigvonNumberbox.valueChangeEvent = 'keyup';
    this.Bemerkungen.valueChangeEvent = 'keyup';
    this.BegrundungAbschluss.valueChangeEvent = 'keyup';
  }

  setFocusOut() {
    this.BezeichnungTextBox.valueChangeEvent = 'focusout';
    this.AbzuzahlenderBetrag.valueChangeEvent = 'focusout';
    this.MonatlicherBetrag.valueChangeEvent = 'focusout';
    this.GultigvonNumberbox.valueChangeEvent = 'focusout';
    this.Bemerkungen.valueChangeEvent = 'focusout';
    this.BegrundungAbschluss.valueChangeEvent = 'focusout';
  }
}
