import 'devextreme-intl';

import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { CustomizeExcelCell } from '@shared/utilites';
import { UtilService } from '@shared/utilites/utility.service';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { filter } from 'rxjs/operators';
import { GridFunctionComponent } from 'shared/components/grid-function/grid-function.component';
import { isNullOrUndefined } from 'util';

import { AhvBeitrageSandbox } from '../../ahv-beitrage.sandbox';
import { PersonenUnterstuetzt, SqlQueryShPositionTyp, AHVBeitragPosition } from '../../models';

@Component({
  selector: 'kiss-ahv-beitrage-list',
  templateUrl: './ahv-beitrage-list-component.html',
  styleUrls: ['./ahv-beitrage-list-component.scss']
})
@SetClassRight('CtlAhvBeitrage')
export class FormListComponent  extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges  {
  @ViewChild('gridAhvBeitrage') gridAhvBeitrage: DxDataGridComponent;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
  @ViewChild('expand') expand: any;
  @ViewChild('printer') printer: PrinterComponent;
  @ViewChild('expandGrid') expandGrid: any;

  @Input() set statusContainerEmit(value) {
    this.statusContainer = value;
  }
  @Output() rowSelected: EventEmitter<any> = new EventEmitter();
  @Output() keyDown: EventEmitter<any> = new EventEmitter();
  @Input() selectedRowKeyEmit: any;
  @Input() isDisableViewModel: boolean;
  @Input() isLoadingEmit: any;
  @Input() disabledGridInput: boolean;
  @Input() isSxModeEmit: boolean;
  @Input() dataGrid: any;
  @Input() dataInitDropDraw: any;
  @Input() listPersonenUnterstuetztEmit: any;
  @Input() listSqlQueryShPositionTypEmit: any;
  @Input() objectDeleteSuccess: any;
  @Input() disabledGrid: boolean;
  @Input() isFillter: boolean;
  @Input() execlName: string;

  listAHVBeitragPosition: AHVBeitragPosition [] = [];
  listPersonenUnterstuetzt: any;
  baPersonIDLookup: PersonenUnterstuetzt[] = [];
  listSqlQueryShPositionTyp: SqlQueryShPositionTyp[] = [];
  selectedRowKey = [];
  filter: any;
  isSxMode: boolean;
  gridFunctionKey = 'gridSetting';
  execlNameExport: string;

  statusContainer = {
    isAddNew: false,
    isEdited: false,
    isReadOnly: false,
    isBetrageAnpassen: false,
    isBetrageAnpassenAddNew: false,
    isBtnBAnpassen: false,
    iscConcurrency: false,
    isDelete: false,
    dataSize: 0
  };
  dateFormat = CommonConstant.FORMAT_DATE;
  isLoading: false;
  CommonConstant = CommonConstant;

  constructor(injector: Injector, public translateService: TranslateService,
    public ahvBeitragesSandbox: AhvBeitrageSandbox, public utilService: UtilService, private datePipe: DatePipe, public router: Router,
  ) {
    super(injector);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(changes.dataGrid) && !isNullOrUndefined(changes.dataGrid.currentValue)) {
      this.handleDataList(changes.dataGrid.currentValue);
    }
    if (!isNullOrUndefined(changes.listPersonenUnterstuetztEmit) && !isNullOrUndefined(changes.listPersonenUnterstuetztEmit.currentValue)) {
      this.listPersonenUnterstuetzt = changes.listPersonenUnterstuetztEmit.currentValue;
      this.baPersonIDLookup = this.listPersonenUnterstuetzt.filter(d => d.baPersonID);
    }
    if (!isNullOrUndefined(changes.listSqlQueryShPositionTypEmit) && !isNullOrUndefined(changes.listSqlQueryShPositionTypEmit.currentValue)) {
      this.listSqlQueryShPositionTyp = changes.listSqlQueryShPositionTypEmit.currentValue;
    }
    if (!isNullOrUndefined(changes.isSxModeEmit) && !isNullOrUndefined(changes.isSxModeEmit.currentValue)) {
      this.isSxMode = changes.isSxModeEmit.currentValue;
    }
    if (!isNullOrUndefined(changes.selectedRowKeyEmit) && !isNullOrUndefined(changes.selectedRowKeyEmit.currentValue)) {
      this.selectedRowKey = changes.selectedRowKeyEmit.currentValue;
      this.scrollToIndex(this.selectedRowKey);
    }
    if (!isNullOrUndefined(changes.isLoadingEmit) && !isNullOrUndefined(changes.isLoadingEmit.currentValue)) {
      this.isLoading = changes.isLoadingEmit.currentValue;
    }
    if (!isNullOrUndefined(changes.execlName) && !isNullOrUndefined(changes.execlName.currentValue)) {
      this.execlNameExport = changes.execlName.currentValue;
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: any) {
  }

  getSelectedRowData(rows) {
    return (rows.find(row => row.key === this.selectedRowKey[0]) || rows[0] || { data: null }).data;
  }

  getVisibleRows() {
    return this.gridAhvBeitrage.instance.getVisibleRows();
  }

  selectRowByData(rowData) {
    const bgPositionID = rowData && rowData.bgPositionID;
    this.selectedRowKey = [bgPositionID];
    this.loadDataDetail(rowData);
  }

  onContentReady(event) {
    setTimeout(() => {
      this.selectRowByData(this.getSelectedRowData(this.getVisibleRows()));
    }, CommonConstant.SetTimeOut300);
  }

  filterGridData() {
    if (isNullOrUndefined(this.filter)) {
      this.gridAhvBeitrage.instance.clearFilter();
    } else {
      if (this.filter[0] && this.filter[1] === 'between') {
        this.gridAhvBeitrage.instance.filter([
          [this.filter[0], '>=', this.filter[2][0]], 'and', [this.filter[0], '<=', this.filter[2][1]],
        ]);
      } else {
        this.gridAhvBeitrage.instance.filter(this.filter);
      }
      setTimeout(() => {
        const listAfterFilter = this.gridAhvBeitrage.instance.getVisibleRows();
        if (listAfterFilter.length > 0) {
          this.selectedRowKey = [listAfterFilter[0].data.bgPositionID];
          this.rowSelected.emit({ ...listAfterFilter[0].data });
        }
      }, CommonConstant.SetTimeOut300);
    }
  }

  toolBarTopOnItemClick(event) {
    switch (event) {
      case CommonConstant.ButtonExportExcel: {
        this.gridAhvBeitrage.instance.option({
          export: {
            fileName: this.execlNameExport,
            excelFilterEnabled: true,
            customizeExcelCell: CustomizeExcelCell,
          }
        });
        this.gridAhvBeitrage.instance.exportToExcel(false);
        document.getElementById('excelExportId').blur();
        return;
      }
      case CommonConstant.ButtonPrintPdf: {
        this.printPdf('i011_ahv-beitrage_grid-ahv-beitrage');
        document.getElementById('gridDruckenId').blur();
        return;
      }
      case CommonConstant.ButtonColumnChooser: {
        this.gridAhvBeitrage.instance.showColumnChooser();
        document.getElementById('spaltenauswahlId').blur();
        return;
      }
    }
    this.gridFunction.model[event] = !this.gridFunction.model[
      event
    ];
    if (this.gridFunction.model.autoSaveSetting) {
      this.gridFunction.updateSetting(this.gridFunction.model);
    }
  }

  scrollToIndex(selectedRowKey) {
    setTimeout(() => {
      const index = this.gridAhvBeitrage.instance.getRowIndexByKey(selectedRowKey[0]);
      const row = this.gridAhvBeitrage.instance.getRowElement(index);
      this.gridAhvBeitrage.instance.getScrollable().scrollToElement(row);
    }, 300);
  }

  onContextMenuPreparing(e: any) {
    if (!isNullOrUndefined(e.items)) {
      let colCount = this.gridAhvBeitrage.instance.getVisibleColumns().length;
      for (let i = 0; i < this.gridAhvBeitrage.instance.columnCount(); i++) {
        if (this.gridAhvBeitrage.instance.columnOption(i, 'groupIndex') > -1) {
            colCount--;
        }
      }
      switch (e.target) {
        case 'header':
            if (e.items && e.items.length > 1) {
                if (colCount === 1) {
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
            }
            e.items.push({
              disabled: false, onItemClick: colCount === 1 ? undefined : () => this.hideColumn(e.column.caption, colCount), text: this.translateService.instant('AhvBeitrage.HideColumn'), value: 'hideCol'
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

  groupingHeaderRightClick(e) {
    this.gridAhvBeitrage.instance.columnOption(e, 'groupIndex', 0);
  }

  unAllGroupingHeaderRightClick() {
    this.gridAhvBeitrage.instance.clearGrouping();
  }

  hideColumn(e, colCount) {
    if (colCount === 1) {
      return;
    }
    this.gridAhvBeitrage.instance.columnOption(e, 'visible', false);
  }

  expandCloumnGrouping() {
    this.expandGrid.autoExpandAll = true;
  }

  unExpandCloumnGrouping() {
    this.expandGrid.autoExpandAll = false;
  }

  scrollToElement() {
    setTimeout(() => {
      const scrollable = this.gridAhvBeitrage.instance.getScrollable();
      if (scrollable != null) {
        scrollable.scrollTo(scrollable.scrollHeight());
      }
    }, 300);
  }

  printPdf(elementId: string) {
    const gridDataSource = this.gridAhvBeitrage.instance.getDataSource();
    this.printer.setData(gridDataSource['_items'], false, [
      {
        caption: 'Gültig ab',
        dataField: 'datumVon'
      },
      {
        caption: 'Name',
        dataField: 'baPersonID'
      },
      {
        caption: 'Pers.-Nr',
        dataField: 'baPersonID'
      },
      {
        caption: 'Geburtsdatum',
        dataField: 'geburtsdatum'
      },
      {
        caption: 'Leistungsart',
        dataField: 'bgPositionsartID'
      },
      {
        caption: 'Betrag',
        dataField: 'betrag'
      },
      {
        caption: 'Institution',
        dataField: 'institutionName'
      },
      {
        caption: 'Bew. Status',
        dataField: 'bgBewilligungStatusCode'
      }
    ]);
  }

  handleDataList(listAHVBeitragPosition) {
    this.listAHVBeitragPosition = listAHVBeitragPosition;
  }

  loadDataDetail(objectDetail) {
   return !this.disabledGrid &&  this.rowSelected.emit({ ...objectDetail });
  }

  onKeyDown(e) {
    this.keyDown.emit(e.event);
  }
  ngOnDestroy() {
  }
}


