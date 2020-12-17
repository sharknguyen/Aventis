import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { GemeindeDaten } from '@app/kiss4-modul-konfiguration/gemeinde-daten/models';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxDataGridComponent } from 'devextreme-angular';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'kiss-gemeinde-daten-grid',
    templateUrl: './gemeinde-daten-grid.component.html',
    styleUrls: ['./gemeinde-daten-grid.component.scss']
})
@SetClassRight('CtlGemeindeDaten')
export class GemeindeDatenGridComponent {

    @Input() dataSource: GemeindeDaten[];
    @Input() rowSelectedIndex: GemeindeDaten;
    @Input() expand: any;

    @ViewChild('gridGemeindeDaten') gridGemeindeDaten: DxDataGridComponent;
    @ViewChild('gridFunction') gridFunction: GridFunctionComponent;

    @Output() selectData = new EventEmitter<GemeindeDaten>();

    dataGemeindeDaten: GemeindeDaten;
    filterColumns: Array<any> = [];
    filterAvs: any;
    selectedKeys: GemeindeDaten;
    gridFunctionModel: GridSettingModel = new GridSettingModel();
    gridFunctionKey = this.translateService.instant('GemeindeDaten.Message.gridSetting');
    formatDate = CommonConstant.FORMAT_DATE;
    customizeExcelCell = UtilityHelper.CustomizeExcelCell;
    customizeExportData = UtilityHelper.customizeExportData;

    constructor(private translateService: TranslateService) { }

    // #region component CRUD functions
    onRowPrepared(event) {
        if (!isNullOrUndefined(event.data) && event.data.bfsDelivered) {
            event.rowElement.style.backgroundColor = '#ff0000';
        }
    }

    onContextMenuPreparing(event) {
        UtilityHelper.menuGrouping(event, this.gridGemeindeDaten);
    }

    onChangeGridSetting() {
        this.gridFunctionModel = this.gridFunction.model;
    }

    onFocusedRowChanged(event) {
        if (event.row.rowType !== 'group') {
            this.selectData.emit(event.row.data);
            this.rowSelectedIndex = event.row.data;
            this.gridGemeindeDaten.selectedRowKeys = [event.row.data];
        }
    }

    setSelectedKeys(selectedKeys: GemeindeDaten) {
        this.selectedKeys = selectedKeys;
        this.rowSelectedIndex = selectedKeys;
    }

    exportExcel() {
        this.gridGemeindeDaten.instance.exportToExcel(false);
    }

    showColumnChooser() {
        this.gridGemeindeDaten.instance.showColumnChooser();
    }

    focus() {
        this.gridGemeindeDaten.instance.focus();
    }
    // #endregion

    // #region utility functions
    getFilterColumns() {
        const columnCount = this.gridGemeindeDaten.instance.columnCount();
        for (let i = 0; i < columnCount; i++) {
            if (this.gridGemeindeDaten.instance.columnOption(i).dataField) {
                this.filterColumns.push(this.gridGemeindeDaten.instance.columnOption(i));
            }
        }
    }

    updateGridSetting(item) {
        this.gridFunctionModel[item] = !this.gridFunctionModel[item];
        if (this.gridFunctionModel.autoSaveSetting) {
            this.gridFunction.updateSetting(this.gridFunctionModel);
        }
    }
    // #endregion

}
