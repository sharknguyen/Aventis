import {
  AfterViewInit,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant } from '@shared/common/constant.common';
import { FragenkatalogConstant } from '@shared/common/sostat.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { getConditionListBtn, getLanguageCodeFromLocalStorage, menuGrouping } from '@shared/utilites';
import { customizeExportDataSummeries } from '@shared/utilites/utilityHelpers';
import { DxDataGridComponent } from 'devextreme-angular';
import DevExpress from 'devextreme/bundles/dx.all';
import { locale } from 'devextreme/localization';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';

import { GridBottom } from '../../models/speziaikonto.models';

@Component({
  selector: 'kiss-speziaikonto-detail-grid',
  templateUrl: './speziaikonto-detail-grid.component.html',
  styleUrls: ['./speziaikonto-detail-grid.component.scss']
})
export class SpeziaikontoDetailGridComponent extends BaseComponent implements AfterViewInit, OnInit, OnChanges {
  @Output() rowSelected: EventEmitter<any> = new EventEmitter();
  @Input() rowSelectedGrid: any;
  @Input() isDisableViewModel: boolean;
  @Input() dataSource: GridBottom[];
  @Input() isVorabzugskonti: boolean;
  @Input() isAbzahlungskonti: boolean;
  @Input() isAusgabekonti: boolean;
  @Input() isKurzungen: boolean;
  @Input() formName: string;
  rowSelectedForGrid: any[];
  @ViewChild('gridSpezialkontoBot') gridSpezialkontoBot: DxDataGridComponent;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
  @ViewChild('printer') printer: PrinterComponent;

  gridFunctionModel: GridSettingModel = new GridSettingModel();
  private subscription = new Subscription();
  rightClickColumnHeaderIndex = 0;
  filterColumns: any;
  gridFunctionKey = CommonConstant.GridSettingBtn;
  isViewMode = true;
  optionNameExport = 'export.fileName';
  customizeExportDataSummeries = customizeExportDataSummeries;
  filter: any;
  clickColumnFilterIndex = 0;
  formatDate = CommonConstant.FORMAT_DATE;
  numberFormat = CommonConstant.FormatNumberN2;
  dateVomFormat = CommonConstant.FORMAT_DATE_MMM_YYYY;
  formatNumberDefault = CommonConstant.FORMATNUMBERDEFAULTP1;
  listBtn = [[...CommonConstant.ToolbarButtons], getConditionListBtn(CommonConstant.AdditionalButtons, [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
  selectedRowKey: any;
  columnsDef: Array<DevExpress.ui.dxDataGridColumn>;
  fileName: string;
  // selectedRowKey: GridBottom;
  ngOnInit() {
  }

  constructor(injector: Injector, public translateService: TranslateService) {
    super(injector);
    locale(getLanguageCodeFromLocalStorage());
  }


  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(changes.dataSource) && !isNullOrUndefined(this.dataSource)) {
      if (this.dataSource.length > 0) {
        this.selectedRowKey = this.dataSource[0].id;
      }
    }
  }

  onContentReady(event) {
    if (isNullOrUndefined(this.dataSource) || (this.dataSource.length <= 0)) {
      return;
    }
    //  this.selectedRowKey = this.dataSource[0];
    // this.selectRowByData(this.getSelectedRowData(this.getVisibleRows()));
  }
  //#endregion

  //#region 'Component CRUD functions'

  // #endregion

  //#region 'Business functions'
  CustomizeExcelCell(cellData) {
    if (cellData.gridCell.rowType === 'header') {
      cellData.backgroundColor = AppEnums.TemplateExcel.HeaderBackgroundColor;
      cellData.font.bold = false;
      cellData.horizontalAlignment = 'left';
    }
    if (cellData.gridCell.rowType === 'totalFooter') {
      cellData.backgroundColor = AppEnums.TemplateExcel.TotalSummariesBackgroundColor;
      cellData.font.bold = false;
      cellData.horizontalAlignment = 'right';
    }
  }

  toolBarOnItemClick(e) {
    switch (e) {
      case FragenkatalogConstant.LIST_EXPORTEXCEL: {
        if (this.isVorabzugskonti) {
          this.formName = this.translateService.instant('CtlSpeziaikonto.TitleVorabzugskonti');
        }
        if (this.isAbzahlungskonti) {
          this.formName = this.translateService.instant('CtlSpeziaikonto.TitleAbzahlungskonti');
        }
        if (this.isAusgabekonti) {
          this.formName = this.translateService.instant('CtlSpeziaikonto.TitleAusgabekonti');
        }
        if (this.isKurzungen) {
          this.formName = this.translateService.instant('CtlSpeziaikonto.TitleKurzungen');
        }
        this.gridSpezialkontoBot.instance.option({
          export: {
            fileName: this.formName,
            excelFilterEnabled: true,
          }
        });
        this.gridSpezialkontoBot.instance.exportToExcel(false);
      }
        break;
      case FragenkatalogConstant.LIST_CHOOSERCOLUMN: {
        this.gridSpezialkontoBot.instance.showColumnChooser();
        break;
      }
      case CommonConstant.ButtonPrintPdf: {
        this.fileName = 'KiSS Export, ' + moment().format('DD.MM.YY h.m A');
        const columns = [];
        this.gridSpezialkontoBot.instance.getVisibleColumns().forEach(item => {
          if (item.dataType === 'number') {
            columns.push({ caption: item.caption, dataField: item.dataField, alignment: 'right', dataType: 'customNumber', format: '1.2-2' });
          } else if (item.dataType === 'date') {
            columns.push({ caption: item.caption, dataField: item.dataField, dataType: 'customDate', format: this.dateVomFormat });
          } else if (item.dataType === 'boolean') {
            columns.push({ caption: item.caption, dataField: item.dataField, alignment: 'center', dataType: 'checkbox' });
          } else {
            columns.push({ caption: item.caption, dataField: item.dataField, dataType: 'string' });
          }
        });
        const totalRows = [
          {
            Gutschrift: this.gridSpezialkontoBot.instance.getTotalSummaryValue('Gutschrift'),
            Belastung: this.gridSpezialkontoBot.instance.getTotalSummaryValue('Belastung'),
            Saldo: this.gridSpezialkontoBot.instance.getTotalSummaryValue('Saldo')
          }
        ];
        this.printer.setData(this.gridSpezialkontoBot.instance.getDataSource().items(), { title: this.fileName }, columns, totalRows);
        break;
      }
    }
    this.gridFunctionModel[e] = !this.gridFunctionModel[e];
    if (this.gridFunctionModel.autoSaveSetting) {
      this.gridFunction.updateSetting(this.gridFunctionModel);
    }
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


  //#region 'U'tility functions'
  getFilterColumns() {
    const columnCount = this.gridSpezialkontoBot.instance.columnCount();
    for (let i = 0; i < columnCount; i++) {
      if (this.gridSpezialkontoBot.instance.columnOption(i).dataField) {
        this.filterColumns.push(this.gridSpezialkontoBot.instance.columnOption(i));
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
    this.gridSpezialkontoBot.disabled = !e;
    this.isViewMode = false;
  }

  onContextMenuPreparing(event) {
    menuGrouping(event, this.gridSpezialkontoBot);
  }

  calculateSelectedRow = (options) => {
    if (options.name === 'сustomSummary') {
      if (isNullOrUndefined(this.dataSource[0]) || isNullOrUndefined(this.dataSource[0].Saldo)) {
        options.totalValue = 0;
        return;
      }
      options.totalValue = this.dataSource[0].Saldo;
    }
  }

  // print PDF
  printPdf() {
    this.printer.setData(this.dataSource, { title: this.fileName }, this.columnsDef);
  }
  // #endregion
}
