import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, ViewChild, OnChanges, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant } from '@shared/common/constant.common';
import { SozialhilfeConstant } from '@shared/common/sozialhilfe.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { CustomizeExcelCell } from '@shared/utilites';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { BehaviorSubject, Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'kiss-vermogen-list',
  templateUrl: './vermogen-list.component.html',
  styleUrls: ['./vermogen-list.component.scss']
})
export class VermogenListComponent extends BaseComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
  @ViewChild('expandGrid') expandGrid: any;
  @ViewChild('dataGrid') dataGrid: DxDataGridComponent;
  @ViewChild('printer') printer: PrinterComponent;
  @Output() rowSelection: EventEmitter<any[]> = new EventEmitter();
  @Output() nurAktiveAnzeigen: EventEmitter<any[]> = new EventEmitter();
  @Input() dataSource: any;
  @Input() gridAction: BehaviorSubject<string>;
  @Input() disableGrid: boolean;
  @Input() changeParamAction: BehaviorSubject<any>;
  @Input() selectedRowKey: number;
  @Input() set bgFinanzplanID(value: number) {
    if (value) {
      this.gridFunction.model.isSearchPanel = false;
      this.gridFunction.model.isFilterBuilder = false;
      this.gridFunction.model.isSearch = true;
      this.gridFunction.model.isGrouping = false;
    }
  }
  keyExpr = 'BgPositionID';
  rowIndex: number;
  isInitDataGrid = false;
  formatNumber = AppEnums.Validation.C007_NUMBER_FORMAT;
  private subscription = new Subscription();
  readonly formatDate = CommonConstant.FORMAT_DATE;
  filter: any;
  CommonConstant = CommonConstant;

  constructor(injector: Injector, public translateService: TranslateService, private cdr: ChangeDetectorRef) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    this.subscription = this.gridAction.subscribe(action => {
      this.toolBarOnItemClick(action);
    });
    this.formatNumberWidthLanguage(UtilityHelper.getLanguageCodeFromLocalStorage().replace('-CH', ''));

    this.subscription.add(this.changeParamAction.subscribe(action => {
      this.rowIndex = 0;
      if (action && !isNullOrUndefined(this.dataGrid)) {
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
          this.dataGrid.instance.hideColumnChooser();
          this.dataGrid.instance.clearFilter();
          this.dataGrid.instance.clearGrouping();
          this.dataGrid.instance.clearSorting();
          grid.endUpdate();
        }
      }
    }));
  }

  ngOnChanges() {
    this.subscription.add(this.translateService.onLangChange.subscribe((ln) => this.formatNumberWidthLanguage(ln.lang)));
  }
  onContentReady(event) {
    this.selectRowByData(this.getSelectedRowData(this.getVisibleRows()));
  }

  getSelectedRowData(rows) {
    return (rows.find(row => row.key === this.selectedRowKey) || rows[0] || { data: null }).data;
  }

  selectRowByData(rowData) {
    this.selectedRowKey = rowData && rowData[this.keyExpr];
    this.rowSelection.emit(rowData);
  }

  getVisibleRows() {
    return this.dataGrid.instance.getVisibleRows();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onChangeNurAktiveAnzeigen(event) {
    this.selectedRowKey = null;
    this.nurAktiveAnzeigen.next(event.value);
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

  private groupingHeaderRightClick(event) {
    this.dataGrid.instance.columnOption(event, 'groupIndex', 0);
  }

  private unAllGroupingHeaderRightClick() {
    this.dataGrid.instance.clearGrouping();
  }

  private hideColumn(event) {
    this.dataGrid.instance.columnOption(event, 'visible', false);
  }

  private expandCloumnGrouping() {
    this.expandGrid.autoExpandAll = true;
  }

  private unExpandCloumnGrouping() {
    this.expandGrid.autoExpandAll = false;
  }



  toolBarOnItemClick(event: string) {
    if (event) {
      switch (event) {
        case SozialhilfeConstant.LIST_EXPORTEXCEL: {
          this.dataGrid.instance.option({
            export: {
              fileName: 'vermogen',
              excelFilterEnabled: true,
              customizeExcelCell: CustomizeExcelCell,
            }
          });
          this.dataGrid.instance.exportToExcel(false);
          break;
        }
        case SozialhilfeConstant.LIST_CHOOSERCOLUMN: {
          this.dataGrid.instance.showColumnChooser();
          break;
        }
        case 'isGrouping': {
          break;
        }
        case 'printPdf': {
          this.printPdf();
          document.getElementById('gridDruckenId').blur();
          return;
        }
      }

      if (this.gridFunction.model.hasOwnProperty(event)) {
        this.gridFunction.model[event] = !this.gridFunction.model[event];
      }
    }
  }

  getDataSource() {
    return (<any>this.dataGrid.instance.getDataSource())._items;
  }

  getVisibleColumn() {
    return this.dataGrid.instance.getVisibleColumns();
  }

  private printPdf() {
    this.printer.setData(this.getDataSource(), { title: this.translateService.instant('Vermogen.FormName') }, this.getVisibleColumn());
  }

  formatNumberWidthLanguage(lang) {
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }
}
