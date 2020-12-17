import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { AsvConstant } from '@shared/common/asv-export.common';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { getConditionListBtn } from '@shared/utilites';
import { UtilService } from '@shared/utilites/utility.service';
import { DxTextBoxComponent, DxValidationGroupComponent } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { isNullOrUndefined } from 'util';

import { ModelXOrgUnit, ZuExportierendeEintrage } from '../../models';
import { PrinterComponent } from '@shared/components/printer/printer.component';

@Component({
    selector: 'kiss-asvexport-detail',
    templateUrl: './asvexport-detail.component.html',
    styleUrls: ['./asvexport-detail.component.scss']
})
@SetClassRight('CtlAsvexport')
export class AsvexportDetailComponent extends BaseComponent implements OnInit {
    @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
    @ViewChild('expandGridTop') expandGridTop: any;
    @ViewChild('gridZuExportierendeEintrageBottom') gridAsvexportBottom: DxDataGridComponent;
    @ViewChild('gridFunctionBottom') gridFunctionBottom: GridFunctionComponent;
    @ViewChild('bemerkung') bemerkungViewChild: DxTextBoxComponent;
    @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
    @ViewChild('printer') printer: PrinterComponent;
    //#region "Declare variables input"
    @Input() isAddNew: boolean;
    @Input() txtBemerkung: string;
    @Input() isReadOnly: boolean;
    @Input() xOrgUnitData: ModelXOrgUnit[];
    @Input() dataExportAllGridBottom: ZuExportierendeEintrage[];
    @Input() customizeBtn = [];
    //#endregion

    //#region "Declare variables output"
    @Output() emitExportXml: EventEmitter<any> = new EventEmitter();
    @Output() emitEventAddNew: EventEmitter<any> = new EventEmitter();
    @Output() emitEventEdit: EventEmitter<any> = new EventEmitter();
    @Output() emitEventExport: EventEmitter<any> = new EventEmitter();
    @Output() emitEventSave: EventEmitter<any> = new EventEmitter();
    @Output() emitEventCancel: EventEmitter<any> = new EventEmitter();
    @Output() emitAccessKeyItemFocused: EventEmitter<any> = new EventEmitter();
    @Output() emitSelectDropdownValue: EventEmitter<any> = new EventEmitter();
    @Output() emitChangeSelectBox: EventEmitter<any> = new EventEmitter();
    //#endregion
    filterAvsBottom: any;
    isExpand = true;
    keyInput: string;
    lengthInput = AppEnums.Validation.MAX_LENGTH_INPUT_VALIDATOR;
    gridFunctionKeyBottom = 'gridSettingBottom';
    toolbarButtonBottom = [];
    selectionChangedRaised = false;
    listBtnBottom = [this.toolbarButtonBottom, getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
    gridEintrageFilter = [];
    dateFormat = CommonConstant.FORMAT_DATE;
    constructor(injector: Injector, public utilService: UtilService, public translateService: TranslateService,
        public layoutSandbox: LayoutSandbox, private router: Router) {
        super(injector);
    }

    ngOnInit() {
        this.pushItemToolBar();
    }
    pushItemToolBar() {
        for (let index = 0; index < CommonConstant.ToolbarButtons.length; index++) {
            const element = Object.assign({}, CommonConstant.ToolbarButtons[index]);
            this.toolbarButtonBottom.push(element);
        }
        this.toolbarButtonBottom[0].id = AsvConstant.SET_PRINTID;
        this.toolbarButtonBottom[1].id = AsvConstant.SET_EXPORTID;
        this.toolbarButtonBottom[2].id = AsvConstant.SET_COLUMNCHOOSER;
    }
    onContextMenuPreparing(e: any) {
        if (!isNullOrUndefined(e.items)) {
            let colCount = this.gridAsvexportBottom.instance.getVisibleColumns().length;
            for (let i = 0; i < this.gridAsvexportBottom.instance.columnCount(); i++) {
                if (this.gridAsvexportBottom.instance.columnOption(i, 'groupIndex') > -1) {
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

    groupingHeaderRightClick(e) {
        this.gridAsvexportBottom.instance.columnOption(e, 'groupIndex', 0);
    }

    unAllGroupingHeaderRightClick() {
        this.gridAsvexportBottom.instance.clearGrouping();
    }

    hideColumn(e) {
        if (this.gridAsvexportBottom.instance.getVisibleColumns().length === 1) {
            return false;
        }
        this.gridAsvexportBottom.instance.columnOption(e, 'visible', false);
    }

    expandCloumnGrouping() {
        this.expandGridTop.autoExpandAll = true;
    }

    unExpandCloumnGrouping() {
        this.expandGridTop.autoExpandAll = false;
    }

    changeCollapseFormContent(event) {
        if (event.target.textContent === this.translateService.instant('Asvexport.TitleDetail')) {
            this.isExpand = !this.isExpand;
        }
    }

    toolBarOnItemClick(event) {
        switch (event) {
            case 'exportxml':
                this.emitExportXml.emit();
                break;
            case 'add':
                this.emitEventAddNew.emit();
                break;
            case 'edit':
                this.emitEventEdit.emit();
                break;
            case 'export':
                this.emitEventExport.emit();
                break;
            case 'save':
                this.emitEventSave.emit(this.txtBemerkung);
                break;
            case 'cancel':
                this.emitEventCancel.emit(this.txtBemerkung);
                break;
            default:
                break;
        }
    }

    onFocusIn(element, key) {
        if (this.isAddNew) {
            this.keyInput = key;
            this.emitAccessKeyItemFocused.emit(element.accessKey);
        }
    }

    onFocusOut() {
        this.emitAccessKeyItemFocused.emit(0);
    }

    onKeyDownSelectbox(e) {
        if (this.isAddNew) {
            if (this.keyInput === 'selectbox') {
                if ((e.event.keyCode === AppEnums.KeyCode.KeyF4)) {
                    if (!(e.component.option('opened'))) {
                        e.event.preventDefault();
                        e.component.open();
                    } else {
                        e.component.close();
                    }
                }
            }
        }
    }

    selectDropdownValue(event) {
        this.emitSelectDropdownValue.emit({ ...event });
    }

    onChangeSelectBox(event) {
        this.emitChangeSelectBox.emit({ ...event });
    }

    toolBarOnItemClickBottomGrd($event) {
        switch ($event) {
            case 'printPdf': {
                this.printPdf();
                break;
            }
            case 'exportExcel': {
                this.gridAsvexportBottom.instance.exportToExcel(false);
                document.getElementById('excelExportBottomId').blur();
                return;
            }
            case 'chooserColumn': {
                this.gridAsvexportBottom.instance.showColumnChooser();
                document.getElementById('spaltenauswahlBottomId').blur();
                return;
            }
            default:
                break;
        }
        this.gridFunctionBottom.model[$event] = !this.gridFunctionBottom.model[
            $event
        ];
        if (this.gridFunctionBottom.model.autoSaveSetting) {
            this.gridFunctionBottom.updateSetting(this.gridFunctionBottom.model);
        }
    }

    loadSettingBottomFromLocalstorage(gridFunctionKeyBottom) {
        this.gridFunctionBottom.model = new GridSettingModel();
        this.gridFunctionBottom.model = Object.assign(this.gridFunctionBottom.model, gridFunctionKeyBottom);
    }
    setGridKeyBottomtoLocalstorge() {
        this.gridFunctionBottom.model = new GridSettingModel();
        localStorage.setItem(this.gridFunctionKeyBottom, JSON.stringify(this.gridFunctionBottom.model));
    }

    loadGridBottomSetting() {
        const gridSettingBottom = JSON.parse(localStorage.getItem(this.gridFunctionKeyBottom));
        if (gridSettingBottom) {
            this.loadSettingBottomFromLocalstorage(gridSettingBottom);
        } else {
            this.setGridKeyBottomtoLocalstorge();
        }
    }

    onRowClick(e) {
        this.gridAsvexportBottom.focusedRowEnabled = true;
        if (!this.selectionChangedRaised) {
            const dataGrid = e.component;
            const keys = dataGrid.getSelectedRowKeys();
            dataGrid.deselectRows(keys);
        }
        this.selectionChangedRaised = false;
    }

    onSelectionChanged() {
        this.selectionChangedRaised = true;
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

    onFocusedRowChanged(e) {
        if (!e.row) {
            return;
        }
        this.gridAsvexportBottom.selectedRowKeys = [this.gridAsvexportBottom.focusedRowKey];
    }

    onContentReady() {
        this.gridAsvexportBottom.selectedRowKeys = [];
        this.gridAsvexportBottom.focusedRowKey = null;
    }
    onRowPrepared(e) {
        if (this.isAddNew && e.data && e.data.Problem) {
            e.rowElement.style.backgroundColor = '#ff0000';
        }
    }

    printPdf() {
        const visibleColumns = this.gridAsvexportBottom.instance.getVisibleColumns();
        const visibleRows = (<any>this.gridAsvexportBottom.instance.getDataSource())._items;
        this.printer.setData(visibleRows, { title: AsvConstant.PAGETITLE }, visibleColumns);
    }

    onClickFilterGrid() {
        this.gridEintrageFilter = this.filterAvsBottom;
    }
}
