import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonConstant } from '@shared/common/constant.common';
import { isClearNumberBox } from '@shared/utilites/utilityHelpers';
import DxNumberBox from 'devextreme/ui/number_box';

@Component({
  selector: 'kiss-number-box',
  templateUrl: './kiss-number-box.component.html',
  styleUrls: ['./kiss-number-box.component.scss'],
})

export class KissNumberBoxComponent {
  @ViewChild('numberbox') numberbox: DxNumberBox;
  @Input() readOnly: boolean;
  @Input() className: string;
  @Input() value: number;
  @Input() format: string;
  @Input() step: number;
  @Input() tabIndex: number;
  @Input() disabled: boolean;
  @Input() accessKey: string;
  @Input() elementAttr: string;
  @Input() width = CommonConstant.WidthNumberAndDateBox;
  @Input() rules: Array<any>;
  @Output() valueChange: EventEmitter<number> = new EventEmitter();
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();
  @Output() keyDown: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  onKeyDown(event) {
    if (isClearNumberBox(event)) {
      event.component.reset();
    }
    this.keyDown.emit(event);
  }

  onValueChanged(event) {
    this.valueChange.emit(event && event.value);
    this.valueChanged.emit(event);
  }
}
