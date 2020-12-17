import { Injector, ViewChild, Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { locale } from 'devextreme/localization';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { TranslateService } from '@ngx-translate/core';
import { FaAktennotiz } from '@app/kiss4-fallfuhrung/fa-aktennotiz/models';
import { DxDataGridComponent } from 'devextreme-angular';
import { Subject, Subscription } from 'rxjs';
import { PrinterComponent } from '@shared/components/printer/printer.component';
@Component({
  selector: 'app-fa-aktennotiz-grid',
  templateUrl: './fa-aktennotiz-grid.component.html',
  styleUrls: ['./fa-aktennotiz-grid.component.scss']
})
@SetClassRight('CtlFaAktennotiz')
export class FaAktennotizGridComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild('gridComponent') gridComponent: DxDataGridComponent;
  @ViewChild('printer') printer: PrinterComponent;
  @Input() isDisable: boolean;
  @Input() faAktennotizsData: FaAktennotiz[];
  @Output() rowPrepared: EventEmitter<any> = new EventEmitter();
  @Output() contextMenuPreparing: EventEmitter<any> = new EventEmitter();
  @Output() rowFocusing: EventEmitter<any> = new EventEmitter();
  applyFilter$ = new Subject();
  customizeExportData = UtilityHelper.customizeExportData;
  customizeExcelCell = UtilityHelper.CustomizeExcelCell;
  subscription: Subscription = new Subscription();
  keyExpr = 'index';
  selectedRowKey: number;
  constructor(
    injector: Injector,
    public translateService: TranslateService
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
  }
  //#region "Businness, load data for combox..."
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  printPdf() {
    const visibleColumns = this.gridComponent.instance.getVisibleColumns();
    const visibleRows = (<any>this.gridComponent.instance.getDataSource())._items;
    this.printer.setData(visibleRows, { title: this.translateService.instant('Kasse.PageTitle') }, visibleColumns);
  }
  onRowPrepared(event) {
    this.rowPrepared.emit(event);
  }
  getVisibleRows() {
    return this.gridComponent.instance.getVisibleRows();
  }

  getSelectedRowData(rows) {
    return (rows.find(row => row.key === this.selectedRowKey) || rows[rows.length - 1] || { data: null }).data;
  }

  selectRowByData(rowData) {
    this.selectedRowKey = rowData && rowData[this.keyExpr];
    this.rowFocusing.emit(rowData);
  }

  onContentReady() {
    return !this.isDisable && this.selectRowByData(this.getSelectedRowData(this.getVisibleRows()));
  }

  onFocusedRowChanged(event) {
    return event.row && this.rowFocusing.emit(event.row.data);
  }

  public exportExcel() {
    this.gridComponent.instance.exportToExcel(false);
  }
  selectRow() {
    this.selectRowByData(this.getSelectedRowData(this.getVisibleRows()));
  }
}
