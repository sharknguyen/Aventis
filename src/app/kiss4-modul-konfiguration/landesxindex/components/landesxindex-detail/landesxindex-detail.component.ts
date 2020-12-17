import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { LandesxindexConstant } from '@shared/common/landesxindex.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { isNullOrUndefined } from 'util';

import { LandesindexWert } from '../../models';
import { formatNumberByCulture } from '@shared/utilites';

@Component({
    selector: 'kiss-landesxindex-detail',
    templateUrl: './landesxindex-detail.component.html',
    styleUrls: ['./landesxindex-detail.component.scss']
})

@SetClassRight('Ctllandesxindex')
export class LandesxindexDetailComponent extends BaseComponent implements OnInit {
    //#region 'Declare decorator'
    @ViewChild('gridLandesxindexBottom') gridLandesxindexBottom: DxDataGridComponent;
    @ViewChild('gridFunctionBottom') gridFunctionBottom: GridFunctionComponent;
    @ViewChild('expandGridBottom') expandGridBottom: any;
    @ViewChild('printer') printer: PrinterComponent;
    //#endregion

    //#region "Declare variables input"
    @Input() landesindexesWertes: LandesindexWert[];
    @Input() selectedKeysBottom: any;
    @Input() allowUpdatingGrdBottom: boolean;
    @Input() allowAddingBtm: boolean;
    @Input() editingControl: any;
    @Input() landesxindexWertModel: LandesindexWert;
    @Input() rowSelectedIDBtm: number;
    //#endregion

    //#region "Declare variables output"
    @Output() emitterOnNeueMonatswerteErfassenClick: EventEmitter<any> = new EventEmitter();
    @Output() emitterOnLoschenClick: EventEmitter<any> = new EventEmitter();
    @Output() emitterOnSelectionChanged: EventEmitter<any> = new EventEmitter();
    @Output() emitterOnRowClick: EventEmitter<any> = new EventEmitter();
    @Output() emitterOnRowUpdating: EventEmitter<any> = new EventEmitter();
    @Output() emitterOnEditingStart: EventEmitter<any> = new EventEmitter();
    @Output() emitterOnKeyDown: EventEmitter<any> = new EventEmitter();
    @Output() emitterOnCellClick: EventEmitter<any> = new EventEmitter();
    //#endregion

    //#region "Declare variables global"
    toolbarButton = [];
    AdditionalButtons = [...CommonConstant.AdditionalButtons];
    listBtnBottom = [this.toolbarButton, [...this.AdditionalButtons]];
    customizeBtn = [{
        text: 'J001Landesxindex.NeueMonatswerteErfassen',
        visible: true,
        name: 'neue-monatswerte-erfassen'
    }];
    optionNameExport = 'export.fileName';
    optionLandesxindexWertValue = 'LandesxindexWert';
    gridFunctionKeyBottom = 'gridSettingBottom';
    filter = [];
    gridFilterValue = [];
    popUpModel: PopUpModel;
    readonly dateMinFullYear: number = CommonConstant.DATE_MIN_FULLYEAR;
    readonly dateMaxFullYear: number = CommonConstant.DATE_MAX_FULLYEAR;
    readonly dateMinMonth: number = CommonConstant.DATE_MIN_MONTH;
    readonly dateMaxMonth: number = CommonConstant.DATE_MAX_MONTH;
    minLengthInput = AppEnums.Money.MIN_VALUE;
    maxLengthInput = AppEnums.Money.MAX_VALUE;
    patternInteger = '^\\d+$';
    //#endregion

    constructor(
        injector: Injector,
        public translateService: TranslateService
    ) {
        super(injector);
        this.validationCallbackBottom = this.validationCallbackBottom.bind(this);
    }

    ngOnInit() {
        this.loadToolbarBtnBottom();
        this.handleButtonVisibility(true);
        this.loadGridBottomSetting();
    }

    loadToolbarBtnBottom() {
        for (let index = 0; index < CommonConstant.ToolbarButtons.length; index++) {
            const element = Object.assign({}, CommonConstant.ToolbarButtons[index]);
            this.toolbarButton.push(element);
        }
        this.toolbarButton[0].id = LandesxindexConstant.SET_PRINTID;
        this.toolbarButton[1].id = LandesxindexConstant.SET_EXPORTID;
        this.toolbarButton[2].id = LandesxindexConstant.SET_COLUMNCHOOSER;
    }

    handleButtonVisibility(status: boolean) {
        if (this.listBtnBottom[0].length > 0) {
            for (let index = 0; index < CommonConstant.ToolbarButtons.length; index++) {
                this.listBtnBottom[0][index]['visible'] = status;
            }
        }
        for (let index = 0; index < CommonConstant.AdditionalButtons.length; index++) {
            this.listBtnBottom[1][index]['visible'] = status;
        }
        this.listBtnBottom[1][7]['visible'] = true;
        this.listBtnBottom[1][8]['visible'] = false;
        this.listBtnBottom = [...this.listBtnBottom];
    }

    onToolbarItemClick($event) {
        switch ($event) {
            case 'exportExcel': {
                this.gridLandesxindexBottom.instance.option(this.optionNameExport, this.optionLandesxindexWertValue);
                this.gridLandesxindexBottom.instance.exportToExcel(false);
                return;
            }
            case 'printPdf': {
                this.printPdf();
                return;
            }
            case 'chooserColumn': {
                this.gridLandesxindexBottom.instance.showColumnChooser();
                return;
            }
            case 'neue-monatswerte-erfassen': {
                this.emitterOnNeueMonatswerteErfassenClick.emit();
                return;
            }
            case 'deleteMenuItemTopGrd': {
                this.emitterOnLoschenClick.emit(this.landesxindexWertModel);
                return;
            }
            default:
                break;
        }
        if (this.gridFunctionBottom.model.hasOwnProperty($event)) {
            this.gridFunctionBottom.model[$event] = !this.gridFunctionBottom.model[
                $event
            ];
            if (this.gridFunctionBottom.model.autoSaveSetting) {
                this.gridFunctionBottom.updateSetting(this.gridFunctionBottom.model);
            }
        }
    }

    printPdf() {
        const visibleColumns = this.gridLandesxindexBottom.instance.getVisibleColumns();
        const columns = visibleColumns.slice(1, 4);
        const visibleRows = this.gridLandesxindexBottom.instance.getVisibleRows();
        const rowData = [];
        if (visibleRows.length > 0) {
            visibleRows.forEach(item => {
              if (item.rowType === 'data') {
                const _wert = item.data.wert;
                item.data.wert = _wert && !Number.isNaN(_wert) ? formatNumberByCulture(_wert) : _wert;
                rowData.push(item.data);
              }
            });
        }
        this.printer.setData(rowData, { title: this.translateService.instant('J001Landesxindex.Title') }, columns);
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

    filterGridData() {
        this.gridFilterValue = this.filter;
    }

    selectionChanged(e) {
        this.emitterOnSelectionChanged.emit(e);
    }

    selectRowBottomGrd(e) {
        this.emitterOnRowClick.emit(e);
    }

    onRowUpdatingBottom(e) {
        this.emitterOnRowUpdating.emit(e);
    }

    onEditingStartBottom(e) {
        this.emitterOnEditingStart.emit(e);
    }

    onKeyPress(e) {
        this.emitterOnKeyDown.emit(e);
    }

    onContextMenuPreparing(e) {
        if (!isNullOrUndefined(e.items)) {
            let colCount = this.gridLandesxindexBottom.instance.getVisibleColumns().length;
            for (let i = 0; i < this.gridLandesxindexBottom.instance.columnCount(); i++) {
                if (this.gridLandesxindexBottom.instance.columnOption(i, 'groupIndex') > -1) {
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
                        disabled: false, onItemClick: colCount === 1 ? undefined : () => this.hideColumn(e.column.caption), text: this.translateService.instant('J001Landesxindex.HideColumn'), value: 'hideCol'
                    });
                    break;
                case 'content':
                    e.items.push({ disabled: false, onItemClick: () => this.expandCloumnGrouping(), text: this.translateService.instant('J001Landesxindex.ExpandCloumnGrouping') });
                    e.items.push({ disabled: false, onItemClick: () => this.unExpandCloumnGrouping(), text: this.translateService.instant('J001Landesxindex.UnExpandCloumnGrouping') });
                    break;
                default:
                    break;
            }
        }
    }

    groupingHeaderRightClick(e) {
        this.gridLandesxindexBottom.instance.columnOption(e, 'groupIndex', 0);
    }

    hideColumn(e) {
        this.gridLandesxindexBottom.instance.columnOption(e, 'visible', false);
    }

    unAllGroupingHeaderRightClick() {
        this.gridLandesxindexBottom.instance.clearGrouping();
    }

    expandCloumnGrouping() {
        this.expandGridBottom.autoExpandAll = true;
    }

    unExpandCloumnGrouping() {
        this.expandGridBottom.autoExpandAll = false;
    }

    toolbarPreparing(e: any) {
        const searchPanel = e.toolbarOptions.items.filter(x => x.name === 'searchPanel');
        const groupPanel = e.toolbarOptions.items.filter(x => x.name === 'groupPanel');
        if (e.toolbarOptions.items.length > 0) {
            e.toolbarOptions.items.splice(0, e.toolbarOptions.items.length);
        }
        if (searchPanel.length > 0) {
            e.toolbarOptions.items.push(searchPanel[0]);
        }
        if (groupPanel.length > 0) {
            e.toolbarOptions.items.push(groupPanel[0]);
        }
    }

    onCellClickGridBottom(e) {
        this.emitterOnCellClick.emit(e);
    }

    validationCallbackBottom(e) {
        if (isNullOrUndefined(this.landesindexesWertes) || this.landesindexesWertes.length < 1) {
            return true;
        }
        return !this.landesindexesWertes.some(item => item.jahr === e.data.jahr && item.monat === e.data.monat && item.ikLandesindexId === e.data.ikLandesindexId && item.ikLandesindexWertId !== e.data.ikLandesindexWertId);
    }

}
