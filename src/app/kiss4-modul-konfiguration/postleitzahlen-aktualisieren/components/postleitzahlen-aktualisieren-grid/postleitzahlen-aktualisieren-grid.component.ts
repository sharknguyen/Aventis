import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PostleitzahlenAktualisieren } from '@app/kiss4-modul-konfiguration/postleitzahlen-aktualisieren/models';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { CustomizeExcelCell, customizeExportData, menuGrouping } from '@shared/utilites';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'kiss-postleitzahlen-aktualisieren-grid',
    templateUrl: './postleitzahlen-aktualisieren-grid.component.html',
    styleUrls: ['./postleitzahlen-aktualisieren-grid.component.scss']
})
@SetClassRight('CtlPostleitzahlenAktualisieren')
export class PostleitzahlenAktualisierenGridComponent {

    @Input() dataSource: PostleitzahlenAktualisieren[];
    @Input() rowSelectedIndex: PostleitzahlenAktualisieren;

    @ViewChild('gridPostleitzahlen') gridPostleitzahlen: DxDataGridComponent;
    @ViewChild('gridFunction') gridFunction: GridFunctionComponent;

    @Output() selectData = new EventEmitter<PostleitzahlenAktualisieren>();

    filterColumns: Array<any> = [];
    filterAvs: any;
    selectedKeys: PostleitzahlenAktualisieren;
    gridFunctionModel: GridSettingModel = new GridSettingModel();
    gridFunctionKey = this.translateService.instant('PostleitzahlenAktualisieren.Message.gridSetting');
    formatDate = CommonConstant.FORMAT_DATE;
    customizeExcelCell = CustomizeExcelCell;
    customizeExportData = customizeExportData;

    constructor(private translateService: TranslateService) { }

    // #region component CRUD functions
    onRowPrepared(event) {
        if (!isNullOrUndefined(event.data) && event.data.system) {
            event.rowElement.style.backgroundColor = '#ff0000';
        }
    }

    onContextMenuPreparing(event) {
        menuGrouping(event, this.gridPostleitzahlen);
    }

    onChangeGridSetting() {
        this.gridFunctionModel = this.gridFunction.model;
    }

    onFocusedRowChanged(event) {
        if (event.row.rowType !== 'group') {
            this.selectData.emit(event.row.data);
            this.rowSelectedIndex = event.row.data;
            this.gridPostleitzahlen.selectedRowKeys = [event.row.data];
        }
    }

    setSelectedKeys(selectedKeys: PostleitzahlenAktualisieren) {
        this.selectedKeys = selectedKeys;
        this.rowSelectedIndex = selectedKeys;
    }

    exportExcel() {
        this.gridPostleitzahlen.instance.exportToExcel(false);
    }

    showColumnChooser() {
        this.gridPostleitzahlen.instance.showColumnChooser();
    }

    focus() {
        this.gridPostleitzahlen.instance.focus();
    }
    // #endregion

    // #region utility functions
    getFilterColumns() {
        const columnCount = this.gridPostleitzahlen.instance.columnCount();
        for (let i = 0; i < columnCount; i++) {
            if (this.gridPostleitzahlen.instance.columnOption(i).dataField) {
                this.filterColumns.push(this.gridPostleitzahlen.instance.columnOption(i));
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
