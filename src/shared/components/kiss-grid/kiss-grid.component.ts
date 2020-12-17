import { Component, EventEmitter, Injector, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@shared/components/base.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import {
  CustomizeExcelCell,
  customizeExportData,
  registerFocusedRowEvent,
  unRegisterFocusedRowEvent,
  formatNumberByCulture,
} from '@shared/utilites/utilityHelpers';
import { DxDataGridComponent } from 'devextreme-angular';
import DevExpress from 'devextreme/bundles/dx.all';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'kiss-grid',
  templateUrl: './kiss-grid.component.html',
  styleUrls: ['./kiss-grid.component.scss'],
})

export class KissGridComponent extends BaseComponent implements OnChanges {
  @ViewChild('gridData') gridData: DxDataGridComponent;
  @ViewChild('printer') printer: PrinterComponent;
  @ViewChild('expand') expand: any;
  @Input() dataSource: any;
  @Input() columnsDef: Array<DevExpress.ui.dxDataGridColumn>;
  @Input() readOnly: boolean;
  @Input() selectedRowKey: number;
  @Input() keyExpr: string;
  @Input() fileName: string;
  @Input() idGridName: string;
  @Input() filterBuilderName: string;
  @Input() noDataText: string;
  @Input() columnChooserName: string;
  @Input() searchPlaceholder: string;
  @Input() gridFunctionModel: GridSettingModel = new GridSettingModel();
  @Output() selectedRow: EventEmitter<any> = new EventEmitter();
  @Input() summary: Array<any>;
  @Input() emptyGroupText: string;
  @Input() hideContextMenuHeader: boolean;

  rocusedRowElement: Element;
  customizeExportData = customizeExportData;
  customizeExcelCell = CustomizeExcelCell;
  filterValue: any;

  constructor(injector: Injector, public translateService: TranslateService) {
    super(injector);
  }

  toolBarOnItemClick(e) {
    switch (e) {
      case 'exportExcel': {
        this.gridData.instance.exportToExcel(false);
        break;
      }
      case 'gridprint':
      case 'printPdf': {
        this.printPdf();
        break;
      }
      case 'chooserColumn': {
        this.gridData.instance.showColumnChooser();
        return;
      }
    }
    this.gridFunctionModel[e] = !this.gridFunctionModel[e];
  }

  getVisibleColumn() {
    return this.gridData.instance.getVisibleColumns();
  }

  //#region print datagrid
  getDataSource() {
    return (<any>this.gridData.instance.getDataSource())._items;
  }

  getSummary() {
    return this.summary && this.summary.reduce((acc, ele) => {
      acc[ele.column] = this.gridData.instance.getTotalSummaryValue(ele.column);
      return acc;
    }, {});
  }

  getDataSourceWithSummary(sum) {
    return sum ? [...this.getDataSource(), sum] : this.getDataSource();
  }

  printPdf() {
    const printData = cloneDeep(this.getDataSourceWithSummary(this.getSummary()));
    const columns = this.getVisibleColumn();
    const attributes = columns.filter(x => x.dataType === 'number');
    for (let i = 0; i < attributes.length; i++) {
      printData.forEach(element => {
        element[attributes[i].dataField] = parseFloat(element[attributes[i].dataField].toString());
        element[attributes[i].dataField] = formatNumberByCulture(element[attributes[i].dataField]);
      });
    }
    this.printer.setData(printData, { title: this.fileName }, columns);
  }
  //#endregion

  getVisibleRows() {
    return this.gridData.instance.getVisibleRows();
  }

  getSelectedRowData(rows) {
    return (rows.find(row => row.key === this.selectedRowKey) || rows[0] || { data: null }).data;
  }

  selectRowByData(rowData) {
    this.selectedRowKey = rowData && rowData[this.keyExpr];
    this.selectedRow.emit(rowData);
  }

  onContentReady(event) {
    return this.readOnly && this.selectRowByData(this.getSelectedRowData(this.getVisibleRows()));
  }

  onFocusedRowChanged(event) {
    return event.row && this.selectedRow.emit(event.row.data);
  }

  onContextMenuPreparing(args: any) {
      if (this.hideContextMenuHeader) {
        args.items = [];
      } else {
        const dataColumnNumber = this.countDataColumn(this.getDataColumns());
        if (args.target === 'header' && args.items.length > 1) {
          this.addRemoverMenuItem(args.items, dataColumnNumber === 1 ? undefined : () => this.onRemoverColumn(args.column.dataField));
        }
        if (args.target === 'header' && dataColumnNumber === 1) {
          this.disableMenuItem(args.items);
        }
      }
      if (args.target === 'content' && args.items) {
        args.items = this.addGroupingMenuItem(args.items);
      }
  }

  private countDataColumn(columns): number {
    return columns && columns.length;
  }

  private getDataColumns() {
    return this.gridData.instance.getVisibleColumns().filter((column: any) => !column.command);
  }

  private addRemoverMenuItem(menu, onClick) {
    menu.push(
      {
        disabled: false,
        icon: '',
        onItemClick: onClick,
        text: this.translateService.instant('DemografieHistory.Grid.HideColumn'),
        value: 'none'
      });
  }

  private disableMenuItem(menu) {
    menu.filter(item => item.value === 'group').map(item => item.disabled = true);
  }

  private addGroupingMenuItem(menu) {
    return menu.concat([
      {
        disabled: false,
        onItemClick: () => this.expandCloumnGrouping(true),
        text: this.translateService.instant('DemografieHistory.Grid.ExpandAllGroups')
      },
      {
        disabled: false,
        onItemClick: () => this.expandCloumnGrouping(false),
        text: this.translateService.instant('DemografieHistory.Grid.ReduceAllGroups')
      }
    ]);
  }

  private expandCloumnGrouping(expand: boolean) {
    this.expand.autoExpandAll = expand;
  }

  onRemoverColumn(field) {
    this.gridData.instance.columnOption(field, 'visible', false);
    setTimeout(() => {
      this.gridData.instance.refresh();
      this.gridData.instance.repaint();
    });
  }

  //#region fix click on focused row then tab or arrow key
  ngOnChanges(event) {
    if (event.readOnly) {
      unRegisterFocusedRowEvent(this.rocusedRowElement);
      if (!this.readOnly) {
        this.rocusedRowElement = registerFocusedRowEvent(this.idGridName);
      }
    }
  }
  //#endregion

  reset() {
    this.gridData.instance.hideColumnChooser();
    this.gridData.instance.clearFilter();
    this.gridData.instance.clearGrouping();
    this.gridData.instance.clearSorting();
    this.gridData.instance.state(null);
  }
}
