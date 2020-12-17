import { Component, EventEmitter, HostListener, Injector, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant } from '@shared/common/constant.common';
import { KontoauszugConstant } from '@shared/common/kontoauszug.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxDataGridComponent, DxDateBoxComponent, DxFormComponent, DxSelectBoxComponent } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { cloneDeep } from 'lodash-es';
import * as moment from 'moment';
import { Subject, Subscription } from 'rxjs';
import { buffer, debounceTime } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { Kostenart } from '../../models';

@Component({
  selector: 'kiss-kontoauszug-search',
  templateUrl: './kontoauszug-search.component.html',
  styleUrls: ['./kontoauszug-search.component.scss']
})
export class KontoauszugSearchComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() personnenData: any[];
  @Input() zeitraumData: any[];
  @Input() kostenartData: Kostenart[];
  @Input() verfuegbarData: Kostenart[];
  @Input() verfuegbarRowKey: number;
  @Input() countID: number;
  @Input() kontoauszugSearchFormData: any;
  @Output() emitOnSearchBtnClick = new EventEmitter();

  @ViewChild('kontoauszugSearchForm') kontoauszugSearchForm: DxFormComponent;
  @ViewChild('zeitraumSelectBox') zeitraumSelectBox: DxSelectBoxComponent;
  @ViewChild('datumVon') datumVon: DxDateBoxComponent;
  @ViewChild('datumBis') datumBis: DxDateBoxComponent;
  @ViewChild('verfuegbarGrid') verfuegbarGrid: DxDataGridComponent;
  @ViewChild('zugeteiltGrid') zugeteiltGrid: DxDataGridComponent;
  @ViewChild('verfuegbarGridFunction') verfuegbarGridFunction: GridFunctionComponent;
  @ViewChild('zugeteiltGridFunction') zugeteiltGridFunction: GridFunctionComponent;
  @ViewChild('verfuegbarGridGrouping') verfuegbarGridGrouping: any;
  @ViewChild('zugeteiltGridGrouping') zugeteiltGridGrouping: any;
  @ViewChild('printer') printer: PrinterComponent;

  // Toolbar vars
  listBtn = [CommonConstant.ToolbarButtons, UtilityHelper.getConditionListBtn(CommonConstant.AdditionalButtons, [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
  customizeBtn = [{
    name: KontoauszugConstant.SearchBtn,
    text: 'SeachForm.SearchBtnText',
    icon: 'fa fa-search',
    visible: true,
    class: 'i020-res-search-button',
    useSubmitBehavior: true
  }];
  // Common vars
  CommonConstant = CommonConstant;
  isExpand = true;
  // Form vars
  // - Grid kostenart
  private subscription = new Subscription();
  clickStreamVerfuegbarRow$ = new Subject();
  dbclickStreamVerfuegbarRow$ = this.clickStreamVerfuegbarRow$.pipe(buffer(this.clickStreamVerfuegbarRow$.pipe(debounceTime(300))));
  clickStreamVerfuegbarHeader$ = new Subject();
  dbclickStreamVerfuegbarHeader$ = this.clickStreamVerfuegbarHeader$.pipe(buffer(this.clickStreamVerfuegbarHeader$.pipe(debounceTime(300))));
  clickStreamZugeteiltRow$ = new Subject();
  dbclickStreamZugeteiltRow$ = this.clickStreamZugeteiltRow$.pipe(buffer(this.clickStreamZugeteiltRow$.pipe(debounceTime(300))));
  clickStreamZugeteiltHeader$ = new Subject();
  dbclickStreamZugeteiltHeader$ = this.clickStreamZugeteiltHeader$.pipe(buffer(this.clickStreamZugeteiltHeader$.pipe(debounceTime(300))));
  selectedGrid: any;
  zugeteiltData: Kostenart[] = [];
  zugeteiltRowKey: number;
  selectedVerfuegbar: any;
  selectedZugeteilt: any;
  // - Grid function
  customizeExportData = UtilityHelper.customizeExportData;
  customizeExcelCell = UtilityHelper.CustomizeExcelCell;
  verfuegbarFilter = [];
  gridVerfuegbarFilter = [];
  zugeteiltFilter = [];
  gridZugeteiltFilter = [];
  gridFunctionKey = 'gridSetting';
  keyExpr = 'ID';

  constructor(
    injector: Injector,
    public translateService: TranslateService) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    this.resetToolbarBtnState();
    this.registerEvents();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  registerEvents() {
    this.subscription.add(
      this.dbclickStreamVerfuegbarRow$.subscribe((clickedItems: any[]) => {
        if (clickedItems.length >= 2 && clickedItems[0].itemIndex === clickedItems[1].itemIndex) {
          this.onAddBtnClicked();
        }
      })
    );

    this.subscription.add(
      this.dbclickStreamVerfuegbarHeader$.subscribe((clickedItems: any[]) => {
        if (clickedItems.length >= 2 && clickedItems[0].itemIndex === clickedItems[1].itemIndex) {
          this.onAddBtnClicked();
        }
      })
    );

    this.subscription.add(
      this.dbclickStreamZugeteiltRow$.subscribe((clickedItems: any[]) => {
        if (clickedItems.length >= 2 && clickedItems[0].itemIndex === clickedItems[1].itemIndex) {
          this.onRemoveBtnClicked();
        }
      })
    );

    this.subscription.add(
      this.dbclickStreamZugeteiltHeader$.subscribe((clickedItems: any[]) => {
        if (clickedItems.length >= 2 && clickedItems[0].itemIndex === clickedItems[1].itemIndex) {
          this.onRemoveBtnClicked();
        }
      })
    );
  }

  resetToolbarBtnState() {
    this.listBtn[0] = this.listBtn[0].map(btn => {
      return {...btn, visible: true};
    });
    this.listBtn[1] = this.listBtn[1].map(btn => {
      return {...btn, visible: true, disabled: btn.name === 'isGrouping'};
    });
  }

  onToolbarItemClick(e) {
    let currentGrid, gridFunction;
    if (isNullOrUndefined(this.selectedGrid) || this.selectedGrid === KontoauszugConstant.VERFUEGBAR) {
      currentGrid = this.verfuegbarGrid;
      gridFunction = this.verfuegbarGridFunction;
    } else {
      currentGrid = this.zugeteiltGrid;
      gridFunction = this.zugeteiltGridFunction;
    }
    switch (e) {
      case CommonConstant.EventClickTitle:
        this.isExpand = !this.isExpand;
        return;
      case KontoauszugConstant.SearchBtn:
        this.searchKontoauszug();
        return;
      case CommonConstant.ButtonPrintPdf: {
        this.printPdf(currentGrid);
        return;
      }
      case CommonConstant.ButtonExportExcel: {
        currentGrid.instance.exportToExcel(false);
        return;
      }
      case CommonConstant.ButtonColumnChooser: {
        currentGrid.instance.showColumnChooser();
        return;
      }
      default:
        break;
    }
    const disabledBtnsName = [];
    this.listBtn[1].filter(btn => btn.disabled).forEach(item => disabledBtnsName.push(item.name));
    if (disabledBtnsName.includes(e)) {
      return;
    }
    gridFunction.model[e] = !gridFunction.model[e];
    if (gridFunction.model.autoSaveSetting) {
      gridFunction.updateSetting(gridFunction.model);
    }
  }

  printPdf(dataGrid) {
    const visibleColumns = dataGrid.instance.getVisibleColumns();
    const visibleRows = dataGrid.instance.getDataSource()._items;
    this.printer.setData(visibleRows, { title: this.translateService.instant('CtlWhKontoauszug.Container.PageTitle') }, visibleColumns);
  }

  getSizeQualifier(width) {
    return width < AppEnums.ScreenResolution.SCREEN_RESOLUTION_LARGE ? AppEnums.ScreenResolution.EXTRA_SMALL : AppEnums.ScreenResolution.LARGE;
  }

  onGanzeValueChanged(e) {
    if (e.value) {
      this.kontoauszugSearchFormData.klient = [];
    }
  }

  onValueKlientDataChanged(e) {
    this.kontoauszugSearchFormData.ganze = this.kontoauszugSearchFormData.klient.length === 0;
  }

  onZeitraumValueChanged(e) {
    if (isNullOrUndefined(e.value) && this.zeitraumData.length > 0) {
      setTimeout(() => {
        this.kontoauszugSearchFormData.zeitraum = this.zeitraumData[0].code;
      });
    }
    this.kontoauszugSearchFormData.betrageVer = e.value === 3;
  }

  onKeyDown(e) {
    if ((e.event.keyCode === AppEnums.KeyCode.KeyF4)) {
      if (!e.component.option('opened')) {
        e.event.preventDefault();
        e.component.open();
        return;
      }
      e.event.preventDefault();
      e.component.close();
    }
    if (e.event.keyCode === AppEnums.KeyCode.UpArrowKey) {
      const em = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: 'ArrowUp',
      });
      document.dispatchEvent(em);
    } else if (e.event.keyCode === AppEnums.KeyCode.DownArrowKey) {
      const em = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: 'ArrowDown',
      });
      document.dispatchEvent(em);
    }
  }

  onVerfuegbarContentReady(e) {
    const visibleRows = e.component.getVisibleRows();
    const selectedRow = visibleRows.find(row => row.key === this.verfuegbarRowKey) || visibleRows[0];
    if (selectedRow && selectedRow.rowType === 'data') {
      this.verfuegbarRowKey = selectedRow.data[this.keyExpr];
      this.selectedVerfuegbar = { ...selectedRow.data };
    } else {
      this.verfuegbarRowKey = null;
      this.selectedVerfuegbar = null;
    }
  }

  onVerfuegbarRowClick(e) {
    this.clickStreamVerfuegbarRow$.next(e);
  }

  onVerfuegbarCellClick(e) {
    this.selectedGrid = KontoauszugConstant.VERFUEGBAR;
    if (e.rowType === 'header') {
      this.clickStreamVerfuegbarHeader$.next(e);
    }
  }

  filterVerfuegbar() {
    this.gridVerfuegbarFilter = this.verfuegbarFilter;
  }

  onZugeteiltContentReady(e) {
    const visibleRows = e.component.getVisibleRows();
    const selectedRow = visibleRows.find(row => row.key === this.zugeteiltRowKey) || visibleRows[0];
    if (selectedRow && selectedRow.rowType === 'data') {
      this.zugeteiltRowKey = selectedRow.data[this.keyExpr];
      this.selectedZugeteilt = { ...selectedRow.data };
    } else {
      this.zugeteiltRowKey = null;
      this.selectedZugeteilt = null;
    }
  }

  onZugeteiltRowClick(e) {
    this.clickStreamZugeteiltRow$.next(e);
  }

  onZugeteiltCellClick(e) {
    this.selectedGrid = KontoauszugConstant.ZUGETEILT;
    if (e.rowType === 'header') {
      this.clickStreamZugeteiltHeader$.next(e);
    }
  }

  filterZugeteilt() {
    this.gridZugeteiltFilter = this.zugeteiltFilter;
  }

  @HostListener('document:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // Alt + Enter
    if (event.altKey && event.keyCode === AppEnums.KeyCode.KeyEnter) {
      event.preventDefault();
      this.searchKontoauszug();
    }
  }

  onKeyDownVerfuegbarGrid(e) {
    if (e.event.altKey && e.event.keyCode === AppEnums.KeyCode.KeyEnter) {
      e.event.preventDefault();
      this.searchKontoauszug();
    }
    if (e.event.keyCode === AppEnums.KeyCode.KeyTab) {
      this.onTabInVerfuegbarGrid(e);
    }
  }

  onKeyDownZugeteiltGrid(e) {
    if (e.event.altKey && e.event.keyCode === AppEnums.KeyCode.KeyEnter) {
      e.event.preventDefault();
      this.searchKontoauszug();
    }
    if (e.event.keyCode === AppEnums.KeyCode.KeyTab) {
      this.onTabInZugeteiltGrid(e);
    }
  }

  onTabInVerfuegbarGrid(e) {
    e.event.preventDefault();
    const nextElement = this.verfuegbarGrid.instance.getCellElement(this.verfuegbarGrid.instance.getRowIndexByKey(this.verfuegbarRowKey || 0), 'Name');
    this.verfuegbarGrid.instance.focus(nextElement);
    e.event.srcElement.blur();
  }

  onTabInZugeteiltGrid(e) {
    e.event.preventDefault();
    const nextElement = this.zugeteiltGrid.instance.getCellElement(this.zugeteiltGrid.instance.getRowIndexByKey(this.zugeteiltRowKey || 0), 'Name');
    this.zugeteiltGrid.instance.focus(nextElement);
    e.event.srcElement.blur();
  }

  onAddBtnClicked() {
    const visibleRows = this.verfuegbarGrid.instance.getVisibleRows();
    if (visibleRows.length < 1) {
      return;
    }
    if (isNullOrUndefined(this.selectedVerfuegbar)) {
      return;
    }
    const nextRow = visibleRows.find(item => item.key === this.selectedVerfuegbar.ID + 1);
    const prevRow = visibleRows.find(item => item.key === this.selectedVerfuegbar.ID - 1);
    const indexOfCurRow = this.verfuegbarData.indexOf(this.verfuegbarData.find(item => item.ID === this.selectedVerfuegbar.ID));
    this.verfuegbarData.splice(indexOfCurRow, 1);
    const newRow = { ...this.selectedVerfuegbar, ID: this.countID++ };
    this.zugeteiltData.push(newRow);
    if (nextRow) {
      this.verfuegbarRowKey = nextRow.key;
    } else if (prevRow) {
      this.verfuegbarRowKey = prevRow.key;
    }
    this.zugeteiltRowKey = newRow.ID;
  }

  onRemoveBtnClicked() {
    const visibleRows = this.zugeteiltGrid.instance.getVisibleRows();
    if (visibleRows.length < 1) {
      return;
    }
    if (isNullOrUndefined(this.selectedZugeteilt)) {
      return;
    }
    const nextRow = visibleRows.find(item => item.key === this.selectedZugeteilt.ID + 1);
    const prevRow = visibleRows.find(item => item.key === this.selectedZugeteilt.ID - 1);
    const indexOfCurRow = this.zugeteiltData.indexOf(this.zugeteiltData.find(item => item.ID === this.selectedZugeteilt.ID));
    this.zugeteiltData.splice(indexOfCurRow, 1);
    const newRow = { ...this.selectedZugeteilt, ID: this.countID++ };
    this.verfuegbarData.push(newRow);
    if (nextRow) {
      this.zugeteiltRowKey = nextRow.key;
    } else if (prevRow) {
      this.zugeteiltRowKey = prevRow.key;
    }
    this.verfuegbarRowKey = newRow.ID;
  }

  onAddAllBtnClicked() {
    if (this.verfuegbarData.length < 1) {
      return;
    }
    this.verfuegbarData = [];
    this.zugeteiltData = cloneDeep(this.kostenartData);
    this.verfuegbarRowKey = null;
    this.zugeteiltRowKey = null;
  }

  onRemoveAllBtnClicked() {
    if (this.zugeteiltData.length < 1) {
      return;
    }
    this.zugeteiltData = [];
    this.verfuegbarData = cloneDeep(this.kostenartData);
    this.verfuegbarRowKey = null;
    this.zugeteiltRowKey = null;
  }

  onSearchBtnClicked() {
    this.searchKontoauszug();
  }

  searchKontoauszug() {
    const datumVon = moment(this.datumVon.instance.option('value'), CommonConstant.DD_MM_YYYY_FORMAT_DATE);
    const datumBis = moment(this.datumBis.instance.option('value'), CommonConstant.DD_MM_YYYY_FORMAT_DATE);
    if (datumVon.isAfter(datumBis)) {
      this.emitOnSearchBtnClick.emit(
        {
          validationMessage: this.translateService.instant('CtlWhKontoauszug.Search.DatumVonLessThanDatumBis'),
        }
      );
      return;
    }
    this.kontoauszugSearchFormData.zugeteiltData = this.zugeteiltData.map(item => +item.KontoNr);
    this.emitOnSearchBtnClick.emit(
      {
        kontoauszugSearchFormData: this.kontoauszugSearchFormData
      }
    );
  }
}
