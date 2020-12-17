import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { CustomizeExcelCell } from '@shared/utilites';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { DataGridActionService } from '@app/kiss4-sozialhilfe/personen-im-haushalt/data-grid-action.service';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import Validation = AppEnums.Validation;

@Component({
  selector: 'kiss-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit, OnDestroy {

  constructor(
    private dataGridActionService: DataGridActionService,
    private translateService: TranslateService,
  ) { }

  @Input() title = '';
  @Input() type: 'KlientenSystem' | 'Haushalt' = 'KlientenSystem';
  @Input() clientList: any[];
  @Input() enable = false;
  dateFomat = Validation.DATE_FORMAT;
  @Input() set changeParamAction(value: string) {
    if (value && !isNullOrUndefined(this.dataGrid)) {
      const grid = this.dataGrid.instance;
      if (grid) {
        const columns = grid.option('columns');
        grid.beginUpdate();
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].dataField !== 'Style') {
            columns[i].visible = true;
            grid.columnOption(columns[i].dataField, 'visible', true);
          }
        }
        this.gridFunction.model.isSearch = true;
        this.gridFunction.model.isFilterBuilder = false;
        this.gridFunction.model.isSearchPanel = false;
        this.gridFunction.model.isGrouping = false;
        grid.hideColumnChooser();
        grid.clearGrouping();
        grid.clearSorting();
        grid.clearFilter();
        grid.state(null);
        grid.endUpdate();
      }
    }
  }

  @Output() rowSelection = new EventEmitter<any[]>();
  @Output() rowDataChange = new EventEmitter();
  @Output() doubleClickRow = new EventEmitter();

  @ViewChild('dataGrid') dataGrid;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
  @ViewChild('expandGrid') expandGrid: any;
  @ViewChild('printer') printer: PrinterComponent;
  @ViewChild('filterBuilder') filterBuilder: any;

  filter: any;
  gridFunctionKey = 'PersonenImHaushalt' + this.type;
  filterColumnsTop: Array<any> = [];
  private rightClickColumnHeaderIndex = 0;
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.setGridKeytoLocalstorge();
    if (this.type === 'KlientenSystem') {
      this.subscription.add(this.dataGridActionService.leftGrid_Action$.subscribe(action => {
        this.handleAction(action);
      }));
    }
    if (this.type === 'Haushalt') {
      this.subscription.add(this.dataGridActionService.rightGrid_Action$.subscribe(action => {
        this.handleAction(action);
      }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSelectRow(ev) {
    this.rowSelection.next(ev.selectedRowKeys);
  }

  onDoubleClickRow($event) {
    const component = $event.component,
      prevClickTime = component.lastClickTime;
    component.lastClickTime = new Date();
    if (prevClickTime && (component.lastClickTime - prevClickTime < 300)) {
      this.doubleClickRow.next($event.key);
    }
  }

  onContextMenuPreparing(e: any) {
    if (!isNullOrUndefined(e.items)) {
      let colCount = this.dataGrid.instance.getVisibleColumns().length;
      for (let i = 0; i < this.dataGrid.instance.columnCount(); i++) {
        if (this.dataGrid.instance.columnOption(i, 'groupIndex') > -1) {
          colCount--;
        }
      }
      switch (e.target) {
        case 'header':
          if (e.items && e.items.length > 1 && colCount === 1) {
            for (let index = 0; index < e.items.length; index++) {
              const element = e.items[index];
              if (element.value === 'group') {
                element.onItemClick = () => {
                  return true;
                };
                break;
              }
            }
          }
          e.items.push({
            disabled: false, onItemClick: colCount === 1 ? undefined : () => this.hideColumn(e.column.caption), text: this.translateService.instant('Asvexport.HideColumn'), value: 'hideCol'
          });
          break;
        case 'content':
          e.items.push({ disabled: false, onItemClick: () => this.expandCloumnGrouping(), text: this.translateService.instant('Asvexport.ExpandCloumnGrouping') });
          e.items.push({ disabled: false, onItemClick: () => this.unExpandCloumnGrouping(), text: this.translateService.instant('Asvexport.UnExpandCloumnGrouping') });
          break;
        default:
          break;
      }
    }
  }

  focusTopRowInGrid(event) {
    this.dataGrid.instance.selectRowsByIndexes([0]);
  }

  customizeExportData(columns, rows) {
    const systemCols = [];
    columns.forEach((item, index) => {
      if (index === 0 && item.dataType === 'boolean') {
        systemCols.push(index);
      }
    });
    rows.forEach(row => {
      const rowValues = row.values;
      systemCols.forEach(systemCol => {
        rowValues[systemCol] ? rowValues[systemCol] = 'x' : rowValues[systemCol] = '';
      });
    });
  }

  rowUpdate(event) {
    this.rowDataChange.next(Object.assign(event.oldData, event.newData));
  }

  private groupingHeaderRightClick(event) {
    this.dataGrid.instance.columnOption(event, 'groupIndex', 0);
  }

  private hideColumn(event) {
    this.dataGrid.instance.columnOption(event, 'visible', false);
  }

  private unAllGroupingHeaderRightClick() {
    this.dataGrid.instance.clearGrouping();
  }

  private expandCloumnGrouping() {
    this.expandGrid.autoExpandAll = true;
  }

  private unExpandCloumnGrouping() {
    this.expandGrid.autoExpandAll = false;
  }

  private setGridKeytoLocalstorge() {
    this.gridFunction.model = new GridSettingModel();
    localStorage.setItem(this.gridFunctionKey, JSON.stringify(this.gridFunction.model));
  }

  private handleAction(action: string) {
    if (action) {
      switch (action) {
        case 'exportExcel': {
          this.dataGrid.instance.option({
            export: {
              fileName: 'personenImHaushalt',
              excelFilterEnabled: true,
              customizeExcelCell: CustomizeExcelCell,
            }
          });
          this.dataGrid.instance.exportToExcel(false);
          return;
        }
        case 'printPdf': {
          this.printPdf();
          return;
        }
        case 'chooserColumn': {
          this.dataGrid.instance.showColumnChooser();
          document.getElementById('spaltenauswahlId').blur();
          return;
        }
        case 'UpArrowKey': {
          this.setRowSelection(-1);
          return;
        }
        case 'DownArrowKey': {
          this.setRowSelection(1);
          return;
        }
        case 'OpenContextMenu': {
          this.openContextMenu(this.rightClickColumnHeaderIndex, 'contextmenu');
          return;
        }
        case 'OpenColumnFiter': {
          this.openContextMenu(this.rightClickColumnHeaderIndex, 'click');
          return;
        }
      }

      if (this.gridFunction.model.hasOwnProperty(action)) {
        this.gridFunction.model[action] = !this.gridFunction.model[action];
        if (this.gridFunction.model.autoSaveSetting) {
          this.gridFunction.updateSetting(this.gridFunction.model);
        }
      }
    }
  }

  private printPdf() {
    if (this.clientList) {
      let fieldsToExport: any[] = [
        {
          caption: this.translateService.instant('PersonenImHaushalt.ClientList.Name'),
          dataField: 'nameVorname'
        },
        {
          caption: this.translateService.instant('PersonenImHaushalt.ClientList.DateOfBirth'),
          dataField: 'geburtsdatum'
        },
        {
          caption: this.translateService.instant('PersonenImHaushalt.ClientList.Alter'),
          dataField: 'alter'
        },
        {
          caption: this.translateService.instant('PersonenImHaushalt.ClientList.Beziehung'),
          dataField: 'beziehung'
        }
      ];
      if (this.type === 'Haushalt') {
        fieldsToExport = [
          ...[{
            caption: this.translateService.instant('PersonenImHaushalt.ClientList.Check'),
            dataField: 'istUnterstuetzt',
            type: 'checkbox'
          }],
          ...fieldsToExport
        ];
      }
      const gridDataSource = this.dataGrid.instance.getDataSource();
      this.printer.setData(gridDataSource._items, null, fieldsToExport);
    }
  }

  private setRowSelection(direction: number) {
    const selectedRowKey = this.dataGrid.instance.getSelectedRowKeys()[0];
    let selectedRowIndex = this.dataGrid.instance.getRowIndexByKey(selectedRowKey);
    if (selectedRowIndex > -1) {
      selectedRowIndex += direction;
    }
    if (selectedRowIndex < 0) {
      selectedRowIndex = 0;
    }
    this.dataGrid.instance.selectRows([this.dataGrid.instance.getKeyByRowIndex(selectedRowIndex)], false);
  }

  /**
  * Create function for Right Click on Grid's Column Header
  */
  private openContextMenu(index: number, type: 'contextmenu' | 'click') {
    const elements: HTMLCollection = this.dataGrid.element.nativeElement.getElementsByClassName('dx-header-filter');
    const element = elements[index];
    if (index < elements.length - 1) {
      this.rightClickColumnHeaderIndex++;
    } else {
      this.rightClickColumnHeaderIndex = 0;
    }
    if (document.createEvent) {
      const events = new MouseEvent(type, {
        bubbles: true,
        clientX: this.getOffset(element).left,
        clientY: this.getOffset(element).top
      });
      element.dispatchEvent(events);
      return;
    }
  }

  private getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + el.offsetWidth / 2 + window.scrollX,
      top: rect.top + el.offsetHeight / 2 + window.scrollY
    };
  }
}
