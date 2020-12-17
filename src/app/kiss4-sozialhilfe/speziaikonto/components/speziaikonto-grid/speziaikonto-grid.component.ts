import {
  AfterViewInit,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { menuGrouping } from '@shared/utilites';
import {
  customizeExcelCellOriginal,
  customizeExportData,
  getLanguageCodeFromLocalStorage,
  unRegisterFocusedRowEvent,
  registerFocusedRowEvent,
} from '@shared/utilites/utilityHelpers';
import { DxDataGridComponent } from 'devextreme-angular';
import DevExpress from 'devextreme/bundles/dx.all';
import { locale } from 'devextreme/localization';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';

import { SpezialkontoSandbox } from '../../speziaikonto.sandbox';

@Component({
  selector: 'kiss-speziaikonto-grid',
  templateUrl: './speziaikonto-grid.component.html',
  styleUrls: ['./speziaikonto-grid.component.scss']
})
@SetClassRight('CtlSpeziaikonto')
export class SpeziaikontoGridComponent extends BaseComponent implements AfterViewInit, OnInit, OnDestroy, OnChanges {
  @Output() rowSelected: EventEmitter<any> = new EventEmitter();
  @Input() rowSelectedGrid: any;
  @Input() isEditMode: boolean;
  @Input() dataSource: any;
  @Input() isState1: boolean;
  @Input() isState2: boolean;
  @Input() isState3: boolean;
  @Input() isState4: boolean;
  @Input() FaLeistung: number;
  @Input() edtAktiv: boolean;
  @Input() bgSpezkontoTypCode: number;
  @Input() formName: string;
  @Output() isValueCheckbox: EventEmitter<boolean> = new EventEmitter();
  @Output() displayDetailWhenGridEmpty: EventEmitter<any> = new EventEmitter();

  @ViewChild('gridSpezialkonto') gridSpezialkonto: DxDataGridComponent;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
  @ViewChild('printer') printer: PrinterComponent;

  gridFunctionModel: GridSettingModel = new GridSettingModel();
  private subscription = new Subscription();
  rightClickColumnHeaderIndex = 0;
  filterColumns: any;
  gridFunctionKey = CommonConstant.GridSettingBtn;
  isViewMode = true;
  optionNameExport = 'export.fileName';
  filter: any;
  clickColumnFilterIndex = 0;
  formatDate = CommonConstant.FORMAT_DATE;
  numberFormat = CommonConstant.FormatNumberN2;
  formatNumberDefault = CommonConstant.FORMATNUMBERDEFAULTP1;
  selectedRowKey: any[];
  isDisable: boolean;
  checkboxValue = true;
  columnsDef: Array<DevExpress.ui.dxDataGridColumn>;
  fileName: string;
  customizeExcelCell = customizeExcelCellOriginal;
  customizeExportData = customizeExportData;
  rocusedRowElement: Element;
  idGridName = 'grid-spezialkonto';

  ngOnInit() {
  }

  constructor(injector: Injector, public translateService: TranslateService, public speziaikontoSandbox: SpezialkontoSandbox) {
    super(injector);
    locale(getLanguageCodeFromLocalStorage());
  }


  ngAfterViewInit() {

  }
  getSelectedRow() {
    this.rowSelected.emit(this.gridSpezialkonto.dataSource[this.gridSpezialkonto.focusedRowKey - 1]);
  }

  onContentReady(event) {
    const visibleRows = this.gridSpezialkonto.instance.getVisibleRows();
    if (isNullOrUndefined(visibleRows) || visibleRows.length <= 0) {
      this.displayDetailWhenGridEmpty.emit(true);
    } else {
      this.displayDetailWhenGridEmpty.emit(false);
    }
    if (isNullOrUndefined(this.dataSource) || this.dataSource.length <= 0) {
      this.isDisable = true;
      return;
    }
    this.isDisable = false;
    // if (isNullOrUndefined(this.rowSelectedGrid) && isNullOrUndefined(this.rowSelectedGrid.id)) {
    //     return;
    // }
    // this.selectedRowKey = this.rowSelectedGrid['id'];
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(changes.rowSelectedGrid)) {
      this.selectedRowKey = this.rowSelectedGrid ? this.rowSelectedGrid['id'] : 0;
    }
    if (changes.isEditMode) {
      unRegisterFocusedRowEvent(this.rocusedRowElement);
      if (this.isEditMode) {
        this.rocusedRowElement = registerFocusedRowEvent(this.idGridName);
      }
    }
  }

  ngOnDestroy() {
    this.unregisterEvents();
  }
  private unregisterEvents() {
    this.subscription.unsubscribe();
  }

  loadDataDetail(objectDetail) {
    this.rowSelected.emit({ ...objectDetail });
  }
  //#endregion

  //#region 'Component CRUD functions'
  onValueChanged($event) {
    const data = {
      faLeistungID: this.FaLeistung,
      bgSpezkontoTypCode: this.bgSpezkontoTypCode,
      edtAktiv: $event.value
    };
    this.isValueCheckbox.emit($event.value);
    this.speziaikontoSandbox.loadDataGrid(data);
  }

  // #endregion

  //#region 'Business functions'
  toolBarOnItemClick(e) {
    switch (e) {
      case CommonConstant.ButtonExportExcel: {
        this.gridSpezialkonto.instance.exportToExcel(false);
        break;
      }
      case CommonConstant.ButtonColumnChooser: {
        this.gridSpezialkonto.instance.showColumnChooser();
        break;
      }
      case CommonConstant.ButtonPrintPdf: {
        this.fileName = 'KiSS Export, ' + moment().format('DD.MM.YY h.m A');
        let values = [];
        const columns = [];
        const visibleColumns = this.gridSpezialkonto.instance.getVisibleColumns();
        if (this.gridFunctionModel.isGrouping && visibleColumns.find(column => !column.allowGrouping)) {
          let groupingColumn = '';
          visibleColumns.forEach(item => {
            if (!item.allowGrouping) {
              groupingColumn = item.caption;
              columns.push({ dataField: item.caption });
            } else {
              if (item.dataType === 'number') {
                columns.push({ caption: item.caption, dataField: item.dataField, alignment: 'right', dataType: 'customNumber', format: '1.2-2' });
              } else if (item.dataType === 'date') {
                columns.push({ caption: item.caption, dataField: item.dataField, dataType: 'date' });
              } else {
                columns.push({ caption: item.caption, dataField: item.dataField, dataType: 'string' });
              }
            }
          });
          this.gridSpezialkonto.instance.getDataSource().items().forEach(item => {
            this.getValuesArray(item, groupingColumn, values);
          });
        } else {
          visibleColumns.forEach(item => {
            if (item.dataType === 'number') {
              columns.push({ caption: item.caption, dataField: item.dataField, alignment: 'right', dataType: 'customNumber', format: '1.2-2' });
            } else if (item.dataType === 'date') {
              columns.push({ caption: item.caption, dataField: item.dataField, dataType: 'date' });
            } else {
              columns.push({ caption: item.caption, dataField: item.dataField, dataType: 'string' });
            }
          });
          values = this.gridSpezialkonto.instance.getDataSource().items();
        }
        this.printer.setData(values, { title: this.fileName }, columns);
        break;
      }
    }
    this.gridFunctionModel[e] = !this.gridFunctionModel[e];
    if (this.gridFunctionModel.autoSaveSetting) {
      this.gridFunction.updateSetting(this.gridFunctionModel);
    }
  }

  getValuesArray(item, groupingColumn, values) {
    const groupingItem = {};
    groupingItem[groupingColumn] = groupingColumn + ': ' + item.key;
    values.push(groupingItem);
    if (!isNullOrUndefined(item.items)) {
      item.items.forEach(object => {
        if (object.key) {
          this.getValuesArray(object, groupingColumn, values);
        } else {
          values.push(object);
        }
      });
    }
  }

  onRowClick(e) {
    //  this.gridSpezialkonto.selectedRowKeys = e;
    this.loadDataDetail(e.data);
  }

  rightClickColumnHeader(index: number) {
    const elements = document.getElementsByClassName('dx-datagrid-action');
    const element = elements.item(index);
    if (document.createEvent) {
      const events = new MouseEvent('contextmenu', {
        bubbles: true,
        clientX: this.getOffset(element).left,
        clientY: this.getOffset(element).top
      });
      element.dispatchEvent(events);
      this.rightClickColumnHeaderIndex++;
      if (this.rightClickColumnHeaderIndex === elements.length) {
        this.rightClickColumnHeaderIndex = 0;
      }
      return;
    }
  }

  /**
   * Functions handle event for right column filter
   * @param {number} index column filter index
   */

  onKeyDown(e) {
    if (e.event.keyCode === AppEnums.KeyCode.UpArrowKey) {
      // this.keyDownArrowKey(true, e);
    } else if (e.event.keyCode === AppEnums.KeyCode.DownArrowKey) {
      // this.keyDownArrowKey(false, e);
    }
  }

  //#region 'U'tility functions'
  getFilterColumns() {
    const columnCount = this.gridSpezialkonto.instance.columnCount();
    for (let i = 0; i < columnCount; i++) {
      if (this.gridSpezialkonto.instance.columnOption(i).dataField) {
        this.filterColumns.push(this.gridSpezialkonto.instance.columnOption(i));
      }
    }
  }
  /**
   * Functions get offset of the element
   * @param {Element} el element to calculate offset
   * @return {Object} return left and top offset
   */
  getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + el.offsetWidth / 2 + window.scrollX,
      top: rect.top + el.offsetHeight / 2 + window.scrollY
    };
  }

  disableList(e) {
    this.gridSpezialkonto.disabled = !e;
    this.isViewMode = false;
  }

  onFocusedRowChanged(event) {
    if (!isNullOrUndefined(event.row)) {
      this.loadDataDetail(event.row.data);
    }
  }
  onContextMenuPreparing(event) {
    menuGrouping(event, this.gridSpezialkonto);
  }

  // print PDF
  printPdf() {
    this.printer.setData(this.dataSource, { title: this.fileName }, this.columnsDef);
  }

  displayButtonWithGrid() {
    const visibleRows = this.gridSpezialkonto.instance.getVisibleRows();
    if (isNullOrUndefined(visibleRows) || visibleRows.length <= 0) {
      this.displayDetailWhenGridEmpty.emit(true);
    } else {
      this.displayDetailWhenGridEmpty.emit(false);
    }
  }

  resetDataGrid() {
    if (!isNullOrUndefined(this.gridSpezialkonto) && !isNullOrUndefined(this.gridSpezialkonto.instance)) {
      this.gridSpezialkonto.instance.beginUpdate();
      this.gridSpezialkonto.instance.clearFilter();
      this.gridSpezialkonto.instance.clearGrouping();
      this.gridSpezialkonto.instance.clearSorting();
      this.gridSpezialkonto.instance.endUpdate();
    }
  }
  // #endregion
}
