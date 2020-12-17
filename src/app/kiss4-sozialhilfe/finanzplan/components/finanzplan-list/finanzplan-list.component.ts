import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { TranslateService } from '@ngx-translate/core';
import { CustomizeExcelCell } from '@shared/utilites';
import { isNullOrUndefined } from 'util';
import { SozialhilfeConstant } from '@shared/common/sozialhilfe.common';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { LOV } from '@shared/AppEnum';
import { IFinanzplan } from '@app/kiss4-sozialhilfe/finanzplan/models';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConstant } from '@shared/common/constant.common';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr-CH';
import localeEn from '@angular/common/locales/en-CH';
import localeIt from '@angular/common/locales/it-CH';
import localeDe from '@angular/common/locales/de-CH';
import { BehaviorSubject, Subscription } from 'rxjs';
import BgGruppeCode = LOV.BgGruppeCode;
import * as UtilityHelper from '@shared/utilites/utilityHelpers';

registerLocaleData(localeDe, 'de-CH');
registerLocaleData(localeFr, 'fr-CH');
registerLocaleData(localeEn, 'en-CH');
registerLocaleData(localeIt, 'it-CH');


@Component({
  selector: 'kiss-finanzplan-list',
  templateUrl: './finanzplan-list.component.html',
  styleUrls: ['./finanzplan-list.component.scss']
})
export class FinanzplanListComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private translateService: TranslateService, private router: Router, private route: ActivatedRoute) {
  }

  gridFunctionKey = 'gridFinanzplan';

  //#region 'Declare decorator'
  @ViewChild('dataGrid') dataGrid: any;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
  @ViewChild('expandGrid') expandGrid: any;
  @ViewChild('printer') printer: PrinterComponent;
  @ViewChild('columnChooser') columnChooser: any;

  //#endregion

  //#region "Declare variables input and out put"
  rowSelected: IFinanzplan;
  @Input() finanzplanGridData: IFinanzplan[] = [];
  @Input() changeParamAction: BehaviorSubject<any>;
  //#endregion

  //#region "Declare variables global"
  filter: any;
  gridFunctionModel: GridSettingModel = new GridSettingModel();
  numberFormat = CommonConstant.FormatNumber;
  rowIndex: number;
  number_pipe = '1.2-2';
  customizeExportData = UtilityHelper.customizeExportData;
  private subscriptions = new Subscription();
  currentLang = 'de-CH';
  bezeVisible = false;
  ngOnInit() {
    this.registerEvents();
    this.subscriptions.add( this.changeParamAction.subscribe(action => {
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
          grid.hideColumnChooser();
          grid.endUpdate();
        }
      }
    }));
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.dataGrid) {
        this.dataGrid.instance.selectRowsByIndexes([this.rowIndex]);
      }
    });

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  registerEvents() {
    this.subscriptions.add(this.translateService.onLangChange.subscribe(() => this.loadMultilangguage()));
  }

  loadMultilangguage() {
    this.currentLang = this.translateService.currentLang +'-CH';
  }
  onContentReady(event) {
    if (!isNullOrUndefined(this.dataGrid)) {
      if (this.rowIndex === 0) {
        this.dataGrid.instance.focusedRowIndex = this.rowIndex;
        this.dataGrid.instance.selectRowsByIndexes([this.rowIndex]);
      }
      const visibleRows = this.dataGrid.instance.getVisibleRows();
      const row = visibleRows.find(result => result.isSelected === true);
      if (!isNullOrUndefined(row)) {
        this.rowSelected = row.data;
      }
    }
  }
  onCellPrepared(e) {
    if (!isNullOrUndefined(e.value)) {
      e.cellElement.title = e.value;
    }
  }
  goToForm(rowDetail) {
    if (rowDetail.ClassName) {
      const bgGruppeCode = rowDetail.BgGruppeCode;
      const endPoint = rowDetail.ClassName.substring(3, rowDetail.ClassName.length);
      let url = '../../' + endPoint;
      if (bgGruppeCode >= BgGruppeCode.Situationsbedingte_Leistungen && bgGruppeCode <= BgGruppeCode.AHV_Beitraege) {
        url = '../../Situation/' + rowDetail.ClassName.substring(8, rowDetail.ClassName.length);
      }
      this.router.navigate([url], { relativeTo: this.route });
    }
  }

  onClickRowGrid(event) {
    if (!isNullOrUndefined(event)) {
      const component = event.component;
      const prevClickTime = component.lastClickTime;
      component.lastClickTime = new Date();
      if (prevClickTime && (component.lastClickTime - prevClickTime < 300)) {
        const rowDetail = event.data;
        this.goToForm(rowDetail);
      }
    }
  }

  onFocusedRowChanged(event) {
    this.rowIndex = event.rowIndex;
    this.dataGrid.instance.focusedRowIndex = event.rowIndex;
    this.dataGrid.instance.selectRowsByIndexes([event.rowIndex]);
  }

  //#region on grid
  onContextMenuPreparing(event) {
    if (isNullOrUndefined(event.items)) {
      event.items = [];
    }
    const colCount = this.dataGrid.instance.getVisibleColumns().length;
    switch (event.target) {
      case 'header':
        event.items.push({ disabled: true, onItemClick: () => this.groupingHeaderRightClick(event.column.caption), text: this.translateService.instant('ZulagenEfb.ClientList.Caption'), beginGroup: true });
        event.items.push({ disabled: true, onItemClick: () => this.unAllGroupingHeaderRightClick(), text: this.translateService.instant('ZulagenEfb.ClientList.UnGrouping') });
        event.items.push({ disabled: false, onItemClick: colCount === 1 ? () => { return; } : () => this.hideColumn(event.column.caption), text: this.translateService.instant('ZulagenEfb.ClientList.HiddenColum') });
        break;
      default:
        break;
    }
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
  // end region

  //#region 'Toolbar functions'
  toolBarOnItemClick(event: string) {
    switch (event) {
      case SozialhilfeConstant.LIST_EXPORTEXCEL: {
        this.dataGrid.instance.option({
          export: {
            fileName: 'finanzplan',
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
      case 'printPdf': {
        this.printPdf();
        document.getElementById('gridDruckenId').blur();
        return;
      }
      default:
        this.gridFunction.model[event] = !this.gridFunction.model[event];
        if (this.gridFunction.model.autoSaveSetting) {
          this.gridFunction.updateSetting(this.gridFunction.model);
        }
        break;
    }
  }


  private printPdf() {
    const fieldsToExport: any[] = [
      {
        caption: this.translateService.instant('Finanzplan.ClientList.Bezeichnung'),
        dataField: 'Bezeichnung'
      },
      {
        caption: this.translateService.instant('Finanzplan.ClientList.Betrag'),
        dataField: 'Betrag'
      },
      {
        caption: this.translateService.instant('Finanzplan.ClientList.Total'),
        dataField: 'Total'
      },
      {
        caption: this.translateService.instant('Finanzplan.ClientList.Info'),
        dataField: 'Info'
      }
    ];
    const gridDataSource = this.dataGrid.instance.getDataSource();
    const fileName = this.translateService.instant('Finanzplan.ClientList.FilePdf');
    this.printer.setData(gridDataSource._items,  { title: fileName }, fieldsToExport);
  }
}
