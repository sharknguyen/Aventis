import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SozialhilfeConstant } from '@shared/common/sozialhilfe.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { CustomizeExcelCell } from '@shared/utilites';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AppEnums } from '@shared/AppEnum';
import { isNullOrUndefined } from 'util';
import { CommonConstant } from '@shared/common/constant.common';
import { BgErwerbseinkommens } from '../../models/erwerbseinkommen.models';
import { formatNumber, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de-CH';
import localeEn from '@angular/common/locales/en-CH';
import localeFr from '@angular/common/locales/fr-CH';
import localeIt from '@angular/common/locales/it-CH';

registerLocaleData(localeDe, 'de-CH');
registerLocaleData(localeFr, 'fr-CH');
registerLocaleData(localeEn, 'en-CH');
registerLocaleData(localeIt, 'it-CH');

@Component({
  selector: 'kiss-erwerbseinkommen-list',
  templateUrl: './erwerbseinkommen-list.component.html',
  styleUrls: ['./erwerbseinkommen-list.component.scss']
})

export class ErwerbseinkommenListComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() gridKey: number;
  @Input() dataSource: any;
  @Input() bgBudgetID: any;
  @Input() gridAction: BehaviorSubject<string>;
  @Input() disableGrid: boolean;
  @Output() rowSelection: EventEmitter<any> = new EventEmitter();
  @Output() refresh: EventEmitter<any> = new EventEmitter();

  @ViewChild('printer') printer: PrinterComponent;
  @ViewChild('dataGrid') dataGrid;
  @ViewChild('expandGrid') expandGrid: any;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;

  numberFormat = AppEnums.Validation.C007_NUMBER_FORMAT;
  dateFormat = AppEnums.Validation.DATE_FORMAT;
  rowIndex = 0;
  subscription: Subscription;
  selectKey: number;
  valueCheckbox = false;
  visiableRowSprint: any[];
  visiableColSprint: any[];
  filter: any;
  visibleColumns: number;
  bgBudgetIDOld: any;

  constructor(injector: Injector, private translateService: TranslateService) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    this.subscription = this.gridAction.subscribe(action => {
      this.toolBarOnItemClick(action);
    });
  }
  ngOnChanges() {
    if (this.dataGrid && this.dataGrid.instance) {
      this.visibleColumns = this.dataGrid.instance.getVisibleColumns().length;
    }
    if (this.dataSource && this.dataSource.length > 0) {
      if (this.bgBudgetIDOld !== this.bgBudgetID) {
        this.bgBudgetIDOld = this.bgBudgetID;
        this.reset();
      }
    } else {
      this.dataSource = [];
      this.visibleColumns = 0;
    }
  }
  clickOnRefresh() {
    this.refresh.next(this.valueCheckbox);
  }

  focusFirstRow() {
    this.dataGrid.instance.selectRowsByIndexes([0]);
  }

  onContextMenuPreparing(event) {
    if (!isNullOrUndefined(event.items)) {
      switch (event.target) {
        case 'header':
          if (event.items.length > 3) {
            event.items.splice(3, event.items.length - 3);
          }
          event.items.push({ disabled: false, onItemClick: () => this.groupingHeaderRightClick(event.column.caption), text: this.translateService.instant('Erwerbseinkommen.List.groupingHeaderRightClick'), beginGroup: true });
          event.items.push({ disabled: false, onItemClick: () => this.unAllGroupingHeaderRightClick(), text: this.translateService.instant('Erwerbseinkommen.List.unAllGroupingHeaderRightClick') });
          event.items.push({ disabled: false, onItemClick: () => this.hideColumn(event.column.caption), text: this.translateService.instant('Erwerbseinkommen.List.hideColumn') });
          break;
        case 'content':
          event.items.push({ disabled: false, onItemClick: () => this.expandCloumnGrouping(), text: this.translateService.instant('Erwerbseinkommen.List.expandCloumnGrouping') });
          event.items.push({ disabled: false, onItemClick: () => this.unExpandCloumnGrouping(), text: this.translateService.instant('Erwerbseinkommen.List.unExpandCloumnGrouping') });
          break;
        default:
          break;
      }
    }
  }

  private groupingHeaderRightClick(event) {
    if (this.visibleColumns > 1) {
      this.visibleColumns--;
      this.dataGrid.instance.columnOption(event, 'groupIndex', 0);
    }
  }

  private unAllGroupingHeaderRightClick() {
    this.dataGrid.instance.clearGrouping();
    this.visibleColumns = this.dataGrid.instance.getVisibleColumns().length;
  }

  private hideColumn(event) {
    if (this.visibleColumns > 1) {
      this.visibleColumns--;
      this.dataGrid.instance.columnOption(event, 'visible', false);
    }
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
              fileName: 'erwerbseinkommen',
              excelFilterEnabled: true,
              customizeExcelCell: CustomizeExcelCell
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
          document.getElementById('i003-erewbseinkommen').blur();
          return;
        }
      }

      if (this.gridFunction.model.hasOwnProperty(event)) {
        this.gridFunction.model[event] = !this.gridFunction.model[event];
        if (this.gridFunction.model.autoSaveSetting) {
          this.gridFunction.updateSetting(this.gridFunction.model);
        }
      }
    }
  }

  formatData(data) {
    const value = JSON.parse(data);
    if (value) {
      value.forEach(item => {
        if (item.Betrag || item.Betrag === 0) {
          item.Betrag = item.Betrag.toLocaleString(this.translateService.currentLang + '-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        if (item.UKBetrag || item.UKBetrag === 0) {
          item.UKBetrag = item.UKBetrag.toLocaleString(this.translateService.currentLang + '-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        if (item.UKReduktion || item.UKReduktion === 0) {
          item.UKReduktion = item.UKReduktion.toLocaleString(this.translateService.currentLang + '-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
      });
    }
    return value;
  }

  printPdf() {
    this.visiableRowSprint = [];
    this.visiableColSprint = [];
    if (this.dataSource && this.dataSource.length > 0) {
      this.visiableRowSprint = Object.assign([], this.dataGrid.instance.getDataSource()._items);
      this.visiableColSprint = Object.assign([], this.dataGrid.instance.getVisibleColumns());
    } else {
      const dataFeild = [
        {
          caption: this.translateService.instant('Erwerbseinkommen.List.GultigAb'),
          dataField: 'DatumVon'
        },
        {
          caption: this.translateService.instant('Erwerbseinkommen.List.Name'),
          dataField: 'NameVorname'
        },
        {
          caption: this.translateService.instant('Erwerbseinkommen.List.Geburtsdatum'),
          dataField: 'Geburtsdatum'
        },
        {
          caption: this.translateService.instant('Erwerbseinkommen.List.Einkommen'),
          dataField: 'Betrag'
        },
        {
          caption: this.translateService.instant('Erwerbseinkommen.List.Unkosten'),
          dataField: 'UKBetrag'
        },
        {
          caption: this.translateService.instant('Erwerbseinkommen.List.Reduktion'),
          dataField: 'UKReduktion'
        }
      ];
      this.visiableColSprint = Object.assign([], dataFeild);
    }
    const summary = new BgErwerbseinkommens;
    summary.Betrag = this.dataGrid.instance.getTotalSummaryValue('Betrag');
    summary.UKBetrag = this.dataGrid.instance.getTotalSummaryValue('UKBetrag');
    summary.UKReduktion = this.dataGrid.instance.getTotalSummaryValue('UKReduktion');
    this.visiableRowSprint.push(summary);
    this.printer.setData(this.formatData(JSON.stringify(this.visiableRowSprint)), { title: this.translateService.instant('Erwerbseinkommen.Title.MonatlichesErwerbseinkommen') }, this.visiableColSprint);
  }

  onInitialized() {
    setTimeout(() => {
      this.dataGrid.instance.focus();
    }, CommonConstant.SetTimeOut300);
  }

  onFocusedRowChanged(event) {
    if (event.row) {
      if (event.row !== this.gridKey) {
        this.rowSelection.emit(event.row);
      }
    }
  }

  onContentReady(event) {
    const visibleRows = this.dataGrid.instance.getVisibleRows();
    const row = visibleRows.find(result => result.key === this.gridKey);
    if (row) {
      this.gridKey = row.key;
    } else if (visibleRows && visibleRows.length > 0) {
      this.gridKey = visibleRows[0].key;
    }
  }

  reset() {
    if (this.dataGrid && this.dataGrid.instance) {
      this.dataGrid.instance.hideColumnChooser();
      this.dataGrid.instance.clearFilter();
      this.dataGrid.instance.clearGrouping();
      this.dataGrid.instance.clearSorting();
      this.gridFunction.model.isFilterBuilder = false;
      this.gridFunction.model.isSearchPanel = false;
      this.gridFunction.model.isFilter = false;
      this.gridFunction.model.isSearch = true;
      this.gridFunction.model.isGrouping = false;
      this.dataGrid.instance.state(null);
      this.gridKey = 0;
    }
  }

}
