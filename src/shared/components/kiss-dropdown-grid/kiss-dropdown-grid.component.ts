import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AppEnums } from '@shared/AppEnum';
import { DxDataGridComponent, DxDropDownBoxComponent } from 'devextreme-angular';
import DevExpress from 'devextreme/bundles/dx.all';
import { isFunction, isEqual, isEmpty } from 'lodash-es';

@Component({
  selector: 'kiss-dropdown-grid',
  templateUrl: './kiss-dropdown-grid.component.html',
  styleUrls: ['./kiss-dropdown-grid.component.scss'],
})

export class KissDropdownGridComponent {
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild('dropdownBox') dropdownBox: DxDropDownBoxComponent;
  @Input() dataSource: any;
  @Input() columnsDef: Array<DevExpress.ui.dxDataGridColumn>;
  @Input() displayExpr = 'name';
  @Input() valueExpr: string;
  @Input() validation: string;
  @Input() placeholder: string;
  @Input() sumaries;
  @Input() validationMsg: string;
  @Input() noDataText = 'keine Daten';
  @Input() keyExpr: string;
  @Input() value: number | any;
  @Input() defaultFocus = true;
  @Input() disabled = false;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Output() dataGridChange: EventEmitter<any> = new EventEmitter();
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();
  @Output() keyDown: EventEmitter<any> = new EventEmitter();
  focusedRowKey: any;
  opened: boolean;
  opening = true;
  typing = false;
  constructor() {
  }

  //#region datagrid
  setFocusedRowValue() {
    return this.setValueByKey(this.getFocusedRowData(this.getVisibleRows()));
  }

  setValueByKey(rowData) {
    this.value = rowData && rowData.data[this.valueExpr];
    this.valueChange.emit(this.value);
  }

  onFocusedRowChanged(e) {
    return (!this.typing) && (this.opened) && this.setFocusedRowValue();
  }

  onContentReady() {
    this.focusInTypingDropDownBox();
    this.focusRow(this.getFocusedRowData(this.getVisibleRows()));
    return this.opening && this.doOpening();
  }

  getFocusedRowData(rows) {
    return rows.find(row => row.key === this.focusedRowKey) ||
      rows[0] ||
      undefined;
  }

  focusRow(rowData) {
    this.focusedRowKey = rowData && rowData.key;
  }

  onRowClick(event) {
    this.opened = false;
    this.valueChange.emit(event.data[this.valueExpr]);
  }

  onGridKeyDown(e) {
    this.doSwitch({
      [AppEnums.KeyCode.KeyEnter]: () => this.onEnter(),
      [AppEnums.KeyCode.KeyF4]: () => this.onF4()
    }[e.event.keyCode]);
    this.typing = false;
  }

  getVisibleRows() {
    return this.grid.instance.getVisibleRows();
  }

  focusInTypingDropDownBox() {
    return this.typing && this.setFocus(this.dropdownBox.instance);
  }
  //#endregion

  onInitialized(e) {
    return this.defaultFocus && this.setFocus(e.component);
  }

  getRowDataByValue(rows) {
    return rows && rows.find(row => row[this.valueExpr] === this.value);
  }

  focusRowByValue(data) {
    this.focusedRowKey = data && data[this.keyExpr];
  }

  onOpened() {
    this.setFocus(this.dropdownBox.instance);
    if (!this.typing) {
      this.focusRowByValue(this.getRowDataByValue(this.dataSource));
    }
  }

  onClosed() {
    this.clearInvalidInput();
    this.dropdownBox.instance.focus();
    this.grid.instance.searchByText('');
    this.typing = false;
  }

  clearInvalidInput () {
    const data = this.getFocusedRowData(this.getVisibleRows());
    if ((!data) || data && !isEqual(data.data[this.displayExpr], this.dropdownBox.text)) {
      this.value = undefined;
      this.valueChange.emit();
    }
  }

  getText(e) {
    return e.event.originalEvent && e.event.originalEvent.srcElement.value;
  }

  onInput(e) {
    this.typing = true;
    this.opened = true;
    this.dropdownBox.instance.focus();
    this.clearValue(e);
    return this.grid && this.grid.instance.searchByText(this.getText(e));
  }

  clearValue(e) {
    if (isEmpty(this.getText(e))) {
      this.value = undefined;
      this.valueChange.emit();
    }
  }

  onKeyDown(e) {
    this.doSwitch({
      [AppEnums.KeyCode.KeyEnter]: () => this.onEnter(),
      [AppEnums.KeyCode.KeyF4]: () => this.onF4(),
      [AppEnums.KeyCode.DownArrowKey]: () => this.onArrowKeyDown(),
      [AppEnums.KeyCode.UpArrowKey]: () => this.onArrowKeyUp()
    }[e.event.keyCode]);
    this.keyDown.emit(e);
  }

  onEnter() {
    this.typing = false;
    this.opened = false;
  }

  onF4() {
    this.toggleDropDown();
  }

  toggleDropDown() {
    this.opened = !this.opened;
  }

  onArrowKeyDown() {
    return this.grid && this.doUpDownKey(1);
  }

  onArrowKeyUp() {
    return this.grid && this.doUpDownKey(-1);
  }

  doUpDownKey(diff: number) {
    this.typing = false;
    this.focusRow(this.getFocusedRowDiff(this.getVisibleRows(), diff));
  }

  getFocusedRowDiff(rows, diff) {
    return (
      rows[rows.findIndex(row => row.key === this.grid.instance.option('focusedRowKey')) + diff] ||
      { key: undefined }
    );
  }

  doOpening() {
    this.opening = false;
    this.setFocus(this.dropdownBox.instance);
    return this.typing && this.grid.instance.searchByText(this.dropdownBox.text);
  }

  doSwitch(func: Function) {
    return isFunction(func) && func();
  }

  setFocus(component) {
    setTimeout(() => {
      component.focus();
    }, 0);
  }
}
