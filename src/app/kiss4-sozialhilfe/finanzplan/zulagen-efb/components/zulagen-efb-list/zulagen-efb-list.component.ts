import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { TranslateService } from '@ngx-translate/core';
import { CustomizeExcelCell } from '@shared/utilites';
import { isNullOrUndefined, isNumber } from 'util';
import { SozialhilfeConstant } from '@shared/common/sozialhilfe.common';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { AppEnums } from '@shared/AppEnum';
import { IAnteilSelectBoxData, IZulageSelectBoxData, BgPosition } from '@app/kiss4-sozialhilfe/finanzplan/zulagen-efb/models';
import { CommonConstant } from '@shared/common/constant.common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr-CH';
import localeEn from '@angular/common/locales/en-CH';
import localeIt from '@angular/common/locales/it-CH';
import localeDe from '@angular/common/locales/de-CH';
import { BehaviorSubject, Subscription } from 'rxjs';

registerLocaleData(localeDe, 'de-CH');
registerLocaleData(localeFr, 'fr-CH');
registerLocaleData(localeEn, 'en-CH');
registerLocaleData(localeIt, 'it-CH');

@Component({
  selector: 'kiss-zulagen-efb-list',
  templateUrl: './zulagen-efb-list.component.html',
  styleUrls: ['./zulagen-efb-list.component.scss']
})
export class ZulagenEfbListComponent implements OnInit, OnDestroy, AfterViewInit {
  //#region 'Declare decorator'
  @ViewChild('dataGrid') dataGrid;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
  @ViewChild('expandGrid') expandGrid: any;
  @ViewChild('printer') printer: PrinterComponent;
  //#endregion

  //#region "Declare variables input and out put"
  @Output() rowSelected: EventEmitter<any> = new EventEmitter();
  @Output() nurAktuelleAnzeigen = new EventEmitter<boolean>();
  @Output() statusButton = new EventEmitter<boolean>();
  @Input() zulageGridData: any[] = [];
  @Input() isDisableGrid: boolean;
  @Input() anteilSelectBoxData: IAnteilSelectBoxData[] = [];
  @Input() zulageSelectBoxData: IZulageSelectBoxData[] = [];
  @Input() changeParamAction: BehaviorSubject<any>;
  //#endregion

  //#region "Declare variables global"
  filter: any;
  gridFunctionModel: GridSettingModel = new GridSettingModel();
  numberFormat = AppEnums.Validation.C007_NUMBER_FORMAT;
  readonly formatDate = CommonConstant.FORMAT_DATE;
  rowIndex: number;
  number_pipe = '1.2-2';
  private subscriptions = new Subscription();
  currentLang = 'de-CH';
  gridFunctionKey = 'gridZulagen';

  constructor(private translateService: TranslateService) {
  }

  ngOnInit() {
    this.registerEvents();
  }

  ngAfterViewInit() {
    this.rowIndex = 0;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  registerEvents() {
    this.subscriptions.add(this.translateService.onLangChange.subscribe(() => this.loadMultilangguage()));
    this.subscriptions.add(this.changeParamAction.subscribe(action => {
      if (action && !isNullOrUndefined(this.dataGrid)) {
        const grid = this.dataGrid.instance;
        if (grid) {
          const columns = grid.option('columns');
          grid.beginUpdate();
          for (let i = 0; i < columns.length; i++) {
            columns[i].visible = true;
            grid.columnOption(columns[i].dataField, 'visible', true);
          }
          this.gridFunction.model.isSearch = true;
          this.gridFunction.model.isFilterBuilder = false;
          this.gridFunction.model.isSearchPanel = false;
          this.gridFunction.model.isGrouping = false;
          grid.hideColumnChooser();
          grid.clearGrouping();
          grid.clearFilter();
          grid.clearSorting();
          grid.state(null);
          grid.endUpdate();
          setTimeout(() => {
            this.rowIndex = 0;
          });
        }
      }
    }));
  }
  loadMultilangguage() {
    this.currentLang = this.translateService.currentLang + '-CH';
  }

  onFormatText(text) {
    if (isNullOrUndefined(text.value)) {
      return '';
    }
    const lines = text.value.split('\n');
    lines.splice(1);
    return lines.join('\n');
  }

  onContentReady(event) {
    const results = this.dataGrid.instance.getDataSource();
    results._totalCount === 0 ? this.statusButton.emit(true) : this.statusButton.emit(false);
    if (event && this.dataGrid && this.dataGrid.instance) {
      this.dataGrid.instance.focusedRowIndex = this.rowIndex;
      this.dataGrid.instance.selectRowsByIndexes([this.rowIndex]);
      this.rowSelected.emit(this.dataGrid.instance.selectRowsByIndexes([this.rowIndex]).resolveArgs[0][0]);
    }
  }

  onFocusedRowChanged(event) {
    if (event) {
      this.rowIndex = event.rowIndex;
    }
  }

  onChangeNurAktuelleAnzeigen(event) {
    const isNurAktuelleAnzeigen = event.value;
    this.nurAktuelleAnzeigen.emit(isNurAktuelleAnzeigen);
  }

  calculateFilterExpressionNumber(filterValue, selectedFilterOperation) {
    const column = this as any;
    if (selectedFilterOperation === '=' && isNumber(filterValue)) {
      const filterExpression = [
        [column.dataField + '', 'contains', filterValue + '']
      ];
      return filterExpression;
    }
    return column.defaultCalculateFilterExpression(arguments);
  }

  calculateCellValue(key: any) {
    return (rowData: any) => rowData[key] + '';
  }

  //#region on grid
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
  zulagenColumn_customizeText = (cellInfo) => {
    let zulagenText = '';
    if (cellInfo.value > 0) {
      const zulagenSelected = this.zulageSelectBoxData.find(zulagen => zulagen.zulageCode === cellInfo.value);
      zulagenText = zulagenSelected.zulageText;
    }
    return zulagenText;
  }

  anteilColumn_customizeText = (cellInfo) => {
    let anteilText = '';
    if (cellInfo.value > 0) {
      const anteilSelected = this.anteilSelectBoxData.find(anteil => anteil.anteilCode === cellInfo.value);
      anteilText = anteilSelected.anteilText;
    }
    return anteilText;
  }
  // end region

  //#region 'Toolbar functions'
  toolBarOnItemClick(event: string) {
    switch (event) {
      case SozialhilfeConstant.LIST_EXPORTEXCEL: {
        this.dataGrid.instance.option({
          export: {
            fileName: 'zulagen-efb',
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

  private getDataSource() {
    return (<any>this.dataGrid.instance.getDataSource())._items;
  }

  private getVisibleColumn() {
    return this.dataGrid.instance.getVisibleColumns();
  }

  private printPdf() {
    this.printer.setData(this.getDataSource(), { title: '' }, this.getVisibleColumn());
  }
}
