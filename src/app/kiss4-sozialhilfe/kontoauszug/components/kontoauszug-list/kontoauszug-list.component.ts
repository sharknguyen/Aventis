import { Component, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxDataGridComponent } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { isNullOrUndefined } from 'util';

import { Kontoauszug } from '../../models';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'kiss-kontoauszug-list',
  templateUrl: './kontoauszug-list.component.html',
  styleUrls: ['./kontoauszug-list.component.scss']
})
export class KontoauszugListComponent extends BaseComponent {
  @Input() KbBuchungsStatus: any;
  @Input() statusCodeHeaderFilter = [];
  @Input() buchungKostenart: Kontoauszug[];
  @Input() selectedRowKey: number;
  @Output() emitOnFocusedRowChanged = new EventEmitter();
  @Output() emitOnKeyDown = new EventEmitter();

  @ViewChild('buchungKostenartGrid') buchungKostenartGrid: DxDataGridComponent;
  @ViewChild('buchungKostenartGridFunction') buchungKostenartGridFunction: GridFunctionComponent;
  @ViewChild('gridGrouping') gridGrouping: any;
  @ViewChild('printer') printer: PrinterComponent;

  // Common vars
  CommonConstant = CommonConstant;
  icoFolderPath = '/assets/icon/ico/';

  // Grid vars
  // - Grid function
  customizeExportData = UtilityHelper.customizeExportData;
  customizeExcelCell = UtilityHelper.CustomizeExcelCell;
  filter = [];
  gridFilterValue = [];
  gridFunctionKey = 'gridSetting';
  keyExpr = 'ID';

  constructor(
    injector: Injector,
    public translateService: TranslateService) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  onToolbarItemClick(e) {
    switch (e) {
      case CommonConstant.ButtonPrintPdf: {
        this.printPdf();
        return;
      }
      case CommonConstant.ButtonExportExcel: {
        this.buchungKostenartGrid.instance.exportToExcel(false);
        return;
      }
      case CommonConstant.ButtonColumnChooser: {
        this.buchungKostenartGrid.instance.showColumnChooser();
        return;
      }
      default:
        break;
    }
    this.buchungKostenartGridFunction.model[e] = !this.buchungKostenartGridFunction.model[e];
    if (this.buchungKostenartGridFunction.model.autoSaveSetting) {
      this.buchungKostenartGridFunction.updateSetting(this.buchungKostenartGridFunction.model);
    }
  }

  printPdf() {
    const rowData = [];
    const visibleColumns = cloneDeep(this.buchungKostenartGrid.instance.getVisibleColumns());
    visibleColumns.forEach(item => {
      if (item.dataField === 'KbBuchungStatusCode') {
        (<any>item).dataType = 'img-text';
        item.alignment = 'left';
      }
    });
    const visibleRows = cloneDeep(this.buchungKostenartGrid.instance.getVisibleRows());
    if (visibleRows.length > 0) {
      visibleRows.forEach(item => {
        if (item.rowType === 'data') {
          const _ausgabe = item.data.Ausgabe;
          item.data.Ausgabe = _ausgabe && !isNaN(_ausgabe) ? UtilityHelper.formatNumberByCulture(_ausgabe) : _ausgabe;
          const _einnahme = item.data.Einnahme;
          item.data.Einnahme = _ausgabe && !isNaN(_einnahme) ? UtilityHelper.formatNumberByCulture(_einnahme) : _einnahme;
          const _saldo = item.data.Saldo;
          item.data.Saldo = _saldo && !isNaN(_ausgabe) ? UtilityHelper.formatNumberByCulture(_saldo) : _saldo;
          const _KbBuchungStatusCode = item.data.KbBuchungStatusCode;
          if (this.getIconID(_KbBuchungStatusCode)) {
            item.data.KbBuchungStatusCode = { imgUrl: `${this.icoFolderPath + this.getIconID(_KbBuchungStatusCode)}.ico`, text: this.getText(_KbBuchungStatusCode) };
          }
          rowData.push(item.data);
        }
      });
    }
    const ausgabe = this.buchungKostenartGrid.instance.getTotalSummaryValue('Ausgabe');
    const einnahme = this.buchungKostenartGrid.instance.getTotalSummaryValue('Einnahme');
    rowData.push({
      Ausgabe: ausgabe && !isNaN(ausgabe) ?
        UtilityHelper.formatNumberByCulture(ausgabe) : 0.00,
      Einnahme: ausgabe && !isNaN(einnahme) ?
        UtilityHelper.formatNumberByCulture(einnahme) : 0.00,
    });
    this.printer.setData(rowData, { title: this.translateService.instant('CtlWhKontoauszug.Container.PageTitle') }, visibleColumns);
  }

  getSizeQualifier(width) {
    return width < AppEnums.ScreenResolution.SCREEN_RESOLUTION_LARGE ? AppEnums.ScreenResolution.EXTRA_SMALL : AppEnums.ScreenResolution.LARGE;
  }

  onContextMenuPreparing(e: any) {
    if (!isNullOrUndefined(e.items)) {
      let colCount = this.buchungKostenartGrid.instance.getVisibleColumns().length;
      for (let i = 0; i < this.buchungKostenartGrid.instance.columnCount(); i++) {
        if (this.buchungKostenartGrid.instance.columnOption(i, 'groupIndex') > -1) {
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
            disabled: false, onItemClick: colCount === 1 ? undefined : () => this.hideColumn(e.column.caption), text: this.translateService.instant('DataGrid.ColumnGrouping.HideColumn'), value: 'hideCol'
          });
          break;
        case 'content':
          e.items.push({ disabled: false, onItemClick: () => this.expandColumnGrouping(), text: this.translateService.instant('DataGrid.ColumnGrouping.ExpandCloumnGrouping') });
          e.items.push({ disabled: false, onItemClick: () => this.unExpandColumnGrouping(), text: this.translateService.instant('DataGrid.ColumnGrouping.UnExpandCloumnGrouping') });
          break;
        default:
          break;
      }
    }
  }

  private hideColumn(event) {
    this.buchungKostenartGrid.instance.columnOption(event, 'visible', false);
  }

  private expandColumnGrouping() {
    this.gridGrouping.autoExpandAll = true;
  }

  private unExpandColumnGrouping() {
    this.gridGrouping.autoExpandAll = false;
  }

  onContentReady(e) {
    const visibleRows = this.buchungKostenartGrid.instance.getVisibleRows();
    const selectedRow = visibleRows.find(row => row.key === this.selectedRowKey) || visibleRows[0];
    if (selectedRow && selectedRow.rowType === 'data') {
      this.selectedRowKey = selectedRow.data[this.keyExpr];
      this.emitOnFocusedRowChanged.emit(selectedRow.data);
    } else {
      this.selectedRowKey = null;
      this.emitOnFocusedRowChanged.emit(null);
    }
  }

  onKeyDown(e) {
    if (e.event.altKey && e.event.keyCode === AppEnums.KeyCode.KeyEnter) {
      e.event.preventDefault();
      this.emitOnKeyDown.emit(e);
    }
  }

  filterGrid() {
    this.gridFilterValue = this.filter;
  }

  getIconID(data) {
    if (!data) {
      return;
    }
    const iconId = this.KbBuchungsStatus.find(item => item.Code === data);
    if (iconId && iconId.Value1) {
      return iconId.Value1;
    }
  }

  getText(value) {
    if (!value) {
      return;
    }
    const item = this.KbBuchungsStatus.find(x => x.Code === value);
    if (item) {
      return item.Text;
    }
  }
}
