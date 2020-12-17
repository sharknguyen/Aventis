import { Injector, ViewChild, Component, OnInit, OnDestroy, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { locale } from 'devextreme/localization';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { AppEnums } from '@shared/AppEnum';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { Subscription, Subject } from 'rxjs';
import { KbBuchung, KbBuchungsStatus } from '@app/kiss4-sozialhilfe/sh-kasse/models';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { CommonConstant } from '@shared/common/constant.common';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { customizeExportData, CustomizeExcelCell } from '@shared/utilites/utilityHelpers';
import { cloneDeep } from 'lodash-es';
@Component({
  selector: 'app-kasse-grid',
  templateUrl: './kasse-grid.component.html',
  styleUrls: ['./kasse-grid.component.scss']
})
@SetClassRight('CtlWpfMask')
export class KasseGridComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('gridComponent') gridComponent: DxDataGridComponent;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
  @ViewChild('printer') printer: PrinterComponent;
  @Input() isDisable: boolean;
  @Input() kassesData: KbBuchung[];
  @Input() kbBuchungStatusData: KbBuchungsStatus[];
  @Input() keyExpr: string;
  @Output() rowClick: EventEmitter<any> = new EventEmitter();
  @Output() rowPrepared: EventEmitter<any> = new EventEmitter();
  @Output() contextMenuPreparing: EventEmitter<any> = new EventEmitter();
  @Output() rowFocusing: EventEmitter<any> = new EventEmitter();
  @Output() visibleRowChange: EventEmitter<any> = new EventEmitter();
  @Output() gridKeyDownEvent: EventEmitter<any> = new EventEmitter();
  formatNumber = CommonConstant.FormatNumber;
  filter: any;
  gridFunctionKey = 'gridSetting';
  applyFilter$ = new Subject();
  customizeExportData = customizeExportData;
  customizeExcelCell = CustomizeExcelCell;
  dateFormat = CommonConstant.FORMAT_DATE;
  subcription: Subscription = new Subscription();
  autoExpandAll = false;
  constructor(
    injector: Injector,
    public translateService: TranslateService
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.subcription.add(this.applyFilter$.asObservable().pipe(
      debounceTime(200),
      map(() => this.gridComponent.instance.getVisibleRows()),
      distinctUntilChanged()
    ).subscribe((visibleRows) => {
      this.visibleRowChange.emit(visibleRows);
    }));
    this.subcription.add(this.applyFilter$.asObservable().pipe(
      debounceTime(200),
      map(() => this.gridComponent.instance.getCombinedFilter()),
      distinctUntilChanged()
    ).subscribe((result) => {
      if (isNullOrUndefined(result)) {
        return;
      }
      const grid = this.gridComponent.instance;
      const visibleRows = grid.getVisibleRows();
      if (visibleRows.length < 1) {
        this.rowFocusing.emit(null);
        return;
      }
      const focusKey = this.gridComponent.focusedRowKey;
      if (visibleRows.find(row => row.key === focusKey)) {
        return;
      }
      this.gridComponent.focusedRowKey = visibleRows[0].key;
      this.rowFocusing.emit(this.gridComponent.focusedRowKey);
    }));
  }
  //#region "Businness, load data for combox..."
  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
  printPdf() {
    const rowData = [];
    const visibleColumns = cloneDeep(this.gridComponent.instance.getVisibleColumns());
    const visibleRows = cloneDeep(this.gridComponent.instance.getVisibleRows());
    if (visibleRows.length > 0) {
      visibleRows.forEach(item => {
        if (item.rowType === 'data') {
          const _betragGrid = item.data.BetragGrid;
          item.data.BetragGrid = _betragGrid && !Number.isNaN(_betragGrid) ? UtilityHelper.formatNumberByCulture(_betragGrid) : _betragGrid;
          rowData.push(item.data);
        }
      });
    }
    this.printer.setData(rowData, { title: this.translateService.instant('Kasse.PageTitle') }, visibleColumns);
  }
  onContentReady(event) {
    this.applyFilter$.next(event);
  }
  public exportExcel() {
    this.gridComponent.instance.exportToExcel(false);
  }
  onFocusedRowChanged(event) {
    this.gridComponent.selectedRowKeys = [this.gridComponent.focusedRowKey];
    this.rowFocusing.emit(this.gridComponent.focusedRowKey);
  }
  public setFocusByKey(key) {
    setTimeout(() => {
      const visibleRows = this.gridComponent.instance.getVisibleRows();
      if (key === null) {
        if (visibleRows.length < 1) {
          return;
        }
        this.gridComponent.focusedRowKey = visibleRows[0].key;
        return;
      }
      if (visibleRows.length > 0) {
        if (visibleRows.filter(x => x.key === key).length > 0) {
          this.gridComponent.focusedRowKey = key;
          return;
        }
        this.gridComponent.focusedRowKey = visibleRows[0].key;
        return;
      }
      this.rowFocusing.emit(null);
    });
  }
  onContextMenuPreparing(e: any) {
    if (!isNullOrUndefined(e.items)) {
      let colCount = this.gridComponent.instance.getVisibleColumns().length;
      for (let i = 0; i < this.gridComponent.instance.columnCount(); i++) {
        if (this.gridComponent.instance.columnOption(i, 'groupIndex') > -1) {
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
            disabled: false, onItemClick: colCount === 1 ? undefined : () => this.hideColumn(e.column.caption), text: this.translateService.instant('Kasse.Grid.HideColumn'), value: 'hideCol'
          });
          break;
        case 'content':
          e.items.push({ disabled: false, onItemClick: () => this.expandCloumnGrouping(), text: this.translateService.instant('Kasse.Grid.ExpandCloumnGrouping') });
          e.items.push({ disabled: false, onItemClick: () => this.unExpandCloumnGrouping(), text: this.translateService.instant('Kasse.Grid.UnExpandCloumnGrouping') });
          break;
        default:
          break;
      }
    }
  }
  hideColumn(e) {
    if (this.gridComponent.instance.getVisibleColumns().length === 1) {
      return false;
    }
    this.gridComponent.instance.columnOption(e, 'visible', false);
  }
  expandCloumnGrouping() {
    this.autoExpandAll = true;
  }

  unExpandCloumnGrouping() {
    this.autoExpandAll = false;
  }
  onToolbarItemClick(e) {
    switch (e) {
      case CommonConstant.ButtonPrintPdf: {
        this.printPdf();
        return;
      }
      case CommonConstant.ButtonExportExcel: {
        this.gridComponent.instance.exportToExcel(false);
        return;
      }
      case CommonConstant.ButtonColumnChooser: {
        this.gridComponent.instance.showColumnChooser();
        return;
      }
      default:
        break;
    }
    this.gridFunction.model[e] = !this.gridFunction.model[e];
    if (this.gridFunction.model.autoSaveSetting) {
      this.gridFunction.updateSetting(this.gridFunction.model);
    }
  }
  onKeyDown(event) {
    this.gridKeyDownEvent.emit(event);
  }
}
