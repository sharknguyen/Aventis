import 'devextreme-intl';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de-CH';
import { AfterViewInit, Component, EventEmitter, Injector, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { UtilService } from '@shared/utilites';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxDataGridComponent } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { isNullOrUndefined } from 'util';

import { Relation } from '../../models';

registerLocaleData(localeDe, 'de-CH');

@Component({
  selector: 'kiss-bezungspersonen',
  templateUrl: './bezungspersonen.component.html',
  styleUrls: ['./bezungspersonen.component.scss']
})
@SetClassRight('CtlKlientensystem')
export class KlsBezungspersonenComponent extends BaseComponent implements AfterViewInit, OnChanges {

  @Output() toolbarSelection: any;
  @Output() checkboxChange: EventEmitter<object> = new EventEmitter();
  @Output() glHaushalOut: EventEmitter<object> = new EventEmitter();
  @Output() glHaushaltOutFocusItem: EventEmitter<Object> = new EventEmitter();

  @ViewChild('dataGrid') dataGrid: DxDataGridComponent;
  @ViewChild('gridOption') gridOption: any;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
  @ViewChild('printer') printer: PrinterComponent;

  @Input() bezugspersonenData: any;
  @Input() isReadOnly: any;
  @Input() isAbleGlHaushaltOut: boolean;
  @Input() itemSelected: string;

  filterColumnsTop: Array<any> = [];
  gridFunctionModel: GridSettingModel = new GridSettingModel();
  gridFunctionKey = 'gridSettingc007';
  glHaushaltUserId: any;
  glHaushaltUserPerson: any;
  isCheckedChanged = false;
  rowKey = 0;
  rowIndex = 0;
  glHaushaltCell = {
    row: null,
    focused: false
  };
  isGlHaushaltFocused = false;
  clickColumnFilterIndex = 0;
  selectedKeys = [];
  focusColumnIndex = -1;
  modifyRecords = [];
  focusSelectBox: any;

  constructor(
    injector: Injector,
    public translateService: TranslateService,
    public utilService: UtilService
  ) {
    super(injector);
    this.isReadOnly = false;
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngAfterViewInit(): void {
    this.getFilterColumns();
  }

  ngOnChanges(event) {
    if (!isNullOrUndefined(event.bezugspersonenData) && !isNullOrUndefined(event.bezugspersonenData.currentValue)) {
      this.modifyRecords = [];
      event.bezugspersonenData.currentValue.forEach(element => {
        this.modifyRecords.push(new Relation(element));
      });
    }
    if (!isNullOrUndefined(event.itemSelected) && !isNullOrUndefined(event.itemSelected.currentValue)) {
      this.toolBarOnItemClick(event.itemSelected.currentValue);
    }

  }

  onHideWidgetsMenu(event) {
    event.preventDefault();
    const leftContentClass = 'hide-widgets-menu';
    const tmp = document.getElementsByTagName('body');
    const checkIsShowMenu = tmp[0].classList.contains(leftContentClass);
    if (checkIsShowMenu) {
      tmp[0].classList.remove(leftContentClass);
    } else {
      tmp[0].classList.add(leftContentClass);
    }
  }

  toolBarOnItemClick(e) {
    switch (e) {
      case 'exportExcel': {
        this.dataGrid.instance.option({
          export: {
            fileName: 'Klientensystem',
            excelFilterEnabled: true,
            excelWrapTextEnabled: true,
            customizeExcelCell: UtilityHelper.CustomizeExcelCell,
          }
        });
        this.dataGrid.instance.exportToExcel(false);
        break;
      }
      case 'printPdf': {
        break;
      }
      case 'chooserColumn': {
        this.dataGrid.instance.showColumnChooser();
        return;
      }
      case 'gridSetting': {
        this.gridFunction.showPopup(this.gridFunctionModel);
        return;
      }
    }
    this.gridFunctionModel[e] = !this.gridFunctionModel[e];
    if (this.gridFunctionModel.autoSaveSetting) {
      localStorage.setItem(this.gridFunctionKey, JSON.stringify(this.gridFunctionModel));
    }
  }

  printPdf() {
    this.printer.setData(this.bezugspersonenData, false, [
      {
        caption: this.translateService.instant('Klientensystem.SectionBezugspersonen.Name'),
        dataField: 'person'
      },
      {
        caption: this.translateService.instant('Klientensystem.SectionBezugspersonen.Beziehung'),
        dataField: 'beziehung'
      },
      {
        caption: this.translateService.instant('Klientensystem.SectionBezugspersonen.Alter'),
        dataField: 'age'
      },
      {
        caption: this.translateService.instant('Klientensystem.SectionBezugspersonen.Unterstutzt'),
        dataField: 'unterstuetzt'
      },
      {
        caption: this.translateService.instant('Klientensystem.SectionBezugspersonen.Haushalt'),
        dataField: 'glHaushalt'
      },
      {
        caption: this.translateService.instant('Klientensystem.SectionBezugspersonen.Klientln'),
        dataField: 'klient'
      }
    ]);
  }

  hideHeader(option: any) {
    const header = document.getElementsByClassName('header') as HTMLCollectionOf<HTMLElement>;
    if (option) {
      header[0].style.display = 'none';
    } else {
      header[0].style.display = 'block';
    }
  }

  onChangeGridSetting() {
    this.gridFunctionModel = this.gridFunction.model;
  }

  loadGridSetting() {
    let gridSetting: any = localStorage.getItem(this.gridFunctionKey);
    if (gridSetting) {
      // load setting from localstorage with customize key
      this.gridFunctionModel = new GridSettingModel();
      gridSetting = JSON.parse(gridSetting);
      this.gridFunctionModel = Object.assign(this.gridFunctionModel, gridSetting);
    } else {
      // setup initial setting and storage on localstorage with customize key
      this.gridFunctionModel = new GridSettingModel();
      localStorage.setItem(this.gridFunctionKey, JSON.stringify(this.gridFunctionModel));
    }
  }

  onContentReady(event) {
    const visibleRows = this.dataGrid.instance.getVisibleRows();
    const row = visibleRows.find(result => result.key === this.rowKey);

    if (!isNullOrUndefined(row)) {
      this.rowKey = row.key;
    } else if (visibleRows.length > 0) {
      this.rowKey = visibleRows[0].key;
    }
  }

  onFocusedCellChanged(event) {
    // Handle event focus selectbox
    const selectbox = event.cellElement[0].getElementsByTagName('input');
    if (event.columnIndex === 2 && selectbox.length > 0) {
      setTimeout(() => {
        selectbox[1].focus();
      }, 100);
    }
    // Handle arrow key up
    if (event.rowIndex !== -1) {
      this.focusColumnIndex = event.columnIndex;
    }

    if (this.isAbleGlHaushaltOut && this.glHaushaltCell.focused === true) {
      this.glHaushalOut.emit({
        IsGleicherHaushalt: this.bezugspersonenData[this.glHaushaltCell.row].glHaushalt,
        BaPersonIDTargetPerson: this.bezugspersonenData[this.glHaushaltCell.row].personID,
        NameTargetPerson: this.bezugspersonenData[this.glHaushaltCell.row].person
      });
      this.glHaushaltCell.focused = false;
      this.glHaushaltOutFocusItem.emit(this.glHaushaltCell);
    }
  }

  onContextMenuPreparing(args: any) {
    let colCount = this.dataGrid.instance.columnCount();
    for (let i = 0; i < this.dataGrid.instance.columnCount(); i++) {
      if (this.dataGrid.instance.columnOption(i, 'groupIndex') > -1) {
        colCount--;
      }
    }
    if (args.target === 'header') {
      if (args.items && args.items.length > 1) {
        args.items.push(
          {
            disabled: false,
            icon: '',
            onItemClick: () => {
              this.onRemoverColumn(args.column.dataField);
            },
            text: this.translateService.instant('Klientensystem.SpalteAusblenden'),
            value: 'none'
          });
        if (colCount === 1) {
          for (let index = 0; index < args.items.length; index++) {
            const element = args.items[index];
            if (element.value === 'group') {
              element.onItemClick = () => {
                return true;
              };
              break;
            }
          }
        }
      }
    }
    if (args.target === 'content') {
      args.items.push({ disabled: false, onItemClick: () => this.expandCloumnGrouping(), text: this.translateService.instant('Klientensystem.AllesErweitern') });
      args.items.push({ disabled: false, onItemClick: () => this.unExpandCloumnGrouping(), text: this.translateService.instant('Klientensystem.AllesReduzieren') });
    }
  }
  onRemoverColumn(e) {
    this.dataGrid.instance.columnOption(e, 'visible', false);
    setTimeout(() => {
      this.dataGrid.instance.refresh();
      this.dataGrid.instance.repaint();
    }, CommonConstant.SetTimeOut);
  }

  private expandCloumnGrouping() {
    this.gridOption.autoExpandAll = true;
  }

  private unExpandCloumnGrouping() {
    this.gridOption.autoExpandAll = false;
  }

  getFilterColumns() {
    const columnCountTop = this.dataGrid.instance.columnCount();
    for (let i = 0; i < columnCountTop; i++) {
      if (this.dataGrid.instance.columnOption(i).dataField) {
        this.filterColumnsTop.push(this.dataGrid.instance.columnOption(i));
      }
    }
  }

  getSizeQualifier(width) {
    if (width < 1300) {
      return 'xs';
    }
    return 'lg';
  }

  customizeExportData(columns, rows) {
    const systemCols = [];
    columns.forEach((item, index) => {
      if (index > 0) {
        if (item.dataType === 'boolean') {
          systemCols.push(index);
        }
      }
    });
    rows.forEach(row => {
      const rowValues = row.values;
      systemCols.forEach(systemCol => {
        rowValues[systemCol] ? rowValues[systemCol] = 'x' : rowValues[systemCol] = '';
      });
    });
  }

  onSelectBoxKeyDown(event) {
    if (event.event.keyCode === AppEnums.KeyCode.KeyF4) {
      if (!(event.component.option('opened'))) {
        event.component.open();
      } else {
        event.component.close();
      }
    } else if (event.event.keyCode === AppEnums.KeyCode.RightArrowKey) {
      setTimeout(() => {
        this.dataGrid.instance.focus(this.dataGrid.instance.getCellElement(this.rowIndex, 3));
        event.component.close();
      }, 100);
    } else if (event.event.keyCode === AppEnums.KeyCode.LeftArrowKey) {
      setTimeout(() => {
        this.dataGrid.instance.focus(this.dataGrid.instance.getCellElement(this.rowIndex, 1));
        event.component.close();
      }, 100);
    }
  }

  ckbValueChange(fieldName) {
    this.bezugspersonenData[this.rowIndex].isEdit = true;
    this.checkboxChange.emit({
      PersonID: this.bezugspersonenData[this.rowIndex].personID,
      FieldNameChange: fieldName,
      Person: this.bezugspersonenData[this.rowIndex].person,
      Klient: this.bezugspersonenData[this.rowIndex].klient,
      GlHaushalt: this.bezugspersonenData[this.rowIndex].glHaushalt,
      RowIndex: this.rowIndex
    });
    if (fieldName === 'GlHaushalt') {
      this.glHaushaltCell = {
        row: this.rowIndex,
        focused: true
      };
      this.glHaushaltOutFocusItem.emit(this.glHaushaltCell);
    }
    if (fieldName === 'unterstuetzt') {
      this.glHaushaltCell = {
        row: this.rowIndex,
        focused: false
      };
      this.glHaushaltOutFocusItem.emit(this.glHaushaltCell);
    }
  }

  onValueChanged(rowIndex) {
    this.bezugspersonenData[rowIndex].isEdit = true;
  }
}
