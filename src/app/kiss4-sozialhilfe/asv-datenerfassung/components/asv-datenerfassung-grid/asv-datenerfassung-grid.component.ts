import {
    AfterViewInit,
    Component,
    EventEmitter,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxDataGridComponent } from 'devextreme-angular';
import { locale } from 'devextreme/localization';

import { AsvDatenerfassung } from '../../models';
import { isNullOrUndefined } from 'util';
import { PrinterComponent } from '@shared/components/printer/printer.component';

@Component({
    selector: 'app-asv-datenerfassung-grid',
    templateUrl: './asv-datenerfassung-grid.component.html',
    styleUrls: ['./asv-datenerfassung-grid.component.scss']
})
@SetClassRight('CtlWhASVSErfassung')
export class AsvDatenerfassungGridComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('gridComponent') gridComponent: DxDataGridComponent;
    @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
    @Input() asvDatenerfassungData: AsvDatenerfassung[];
    @Input() selectedKeys = [];
    @Input() isViewMode: boolean;
    @Input() keyExpr: string;
    @Output() rowFocusing: EventEmitter<any> = new EventEmitter();
    @ViewChild('expandGridTop') expandGridTop: any;
    @ViewChild('printer') printer: PrinterComponent;
    customizeExportData = UtilityHelper.customizeExportData;
    customizeExcelCell = UtilityHelper.CustomizeExcelCell;
    gridFunctionKey = 'gridSetting';
    dateFormat = CommonConstant.FORMAT_DATE;
    selectedRowKey: number;
    filterAvs = [];
    gridFilterAsv = [];
    constructor(
        injector: Injector,
        public translateService: TranslateService
    ) {
        super(injector);
        locale(UtilityHelper.getLanguageCodeFromLocalStorage());
    }

    ngOnInit() {
        this.loadGridSetting();
    }

    ngAfterViewInit(): void {
    }
    //#region "Businness, load data for combox..."
    ngOnDestroy() {
    }

    public exportExcel() {
        this.gridComponent.instance.exportToExcel(false);
    }

    loadSettingFromLocalstorage(gridSetting) {
        this.gridFunction.model = new GridSettingModel();
        this.gridFunction.model = Object.assign(this.gridFunction.model, gridSetting);
    }

    setGridKeytoLocalstorge() {
        this.gridFunction.model = new GridSettingModel();
        localStorage.setItem(this.gridFunctionKey, JSON.stringify(this.gridFunction.model));
    }

    loadGridSetting() {
        const gridSetting = JSON.parse(localStorage.getItem(this.gridFunctionKey));
        if (gridSetting) {
            this.loadSettingFromLocalstorage(gridSetting);
        } else {
            this.setGridKeytoLocalstorge();
        }
    }

    getSelectedRowData(rows) {
        return (
            rows.find(row => row.key === this.selectedRowKey) ||
            rows[0] || { data: new AsvDatenerfassung() }).data;
    }

    selectRowByData(rowData) {
        this.selectedRowKey = rowData[this.keyExpr];
        this.rowFocusing.emit(rowData);
    }

    onContentReady() {
        this.selectRowByData(this.getSelectedRowData(this.gridComponent.instance.getVisibleRows()));
    }

    updateRowGrid(data) {
        const findIndex = this.asvDatenerfassungData.findIndex(x => x.WhASVSEintragID === data.whAsvseintragId);
        this.asvDatenerfassungData[findIndex].ASVSEintragStatusCode = data.asvseintragStatusCode;
        this.asvDatenerfassungData[findIndex].BaPersonID = data.baPersonId;
        this.asvDatenerfassungData[findIndex].Bemerkung = data.bemerkung;
        this.asvDatenerfassungData[findIndex].DatumBis = data.datumBis;
        this.asvDatenerfassungData[findIndex].DatumVon = data.datumVon;
        this.asvDatenerfassungData[findIndex].FaLeistungID = data.faLeistungId;
        this.asvDatenerfassungData[findIndex].ASVSEintragStatusCode = data.asvseintragStatusCode;
        this.asvDatenerfassungData[findIndex].WhASVSEintragID = data.whAsvseintragId;
        this.asvDatenerfassungData[findIndex].WhASVSEintragTS = data.whAsvseintragTs;
    }
    onToolbarItemClick(e) {
        switch (e) {
            case CommonConstant.ButtonPrintPdf: {
                this.printPdf();
                return;
            }
            case CommonConstant.ButtonExportExcel: {
                this.gridComponent.instance.exportToExcel(false);
                return;
            }
            case CommonConstant.ButtonColumnChooser: {
                this.gridComponent.instance.showColumnChooser();
                return;
            }
            default:
                break;
        }
        this.gridFunction.model[e] = !this.gridFunction.model[e];
        if (this.gridFunction.model.autoSaveSetting) {
            this.gridFunction.updateSetting(this.gridFunction.model);
        }
    }

    onContextMenuPreparing(e: any) {
        if (!isNullOrUndefined(e.items)) {
            let colCount = this.gridComponent.instance.getVisibleColumns().length;
            for (let i = 0; i < this.gridComponent.instance.columnCount(); i++) {
                if (this.gridComponent.instance.columnOption(i, 'groupIndex') > -1) {
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

    hideColumn(e) {
        if (this.gridComponent.instance.getVisibleColumns().length === 1) {
            return false;
        }
        this.gridComponent.instance.columnOption(e, 'visible', false);
    }

    expandCloumnGrouping() {
        this.expandGridTop.autoExpandAll = true;
    }

    unExpandCloumnGrouping() {
        this.expandGridTop.autoExpandAll = false;
    }

    printPdf() {
        const visibleColumns = this.gridComponent.instance.getVisibleColumns();
        const visibleRows = (<any>this.gridComponent.instance.getDataSource())._items;
        this.printer.setData(visibleRows, { title: this.translateService.instant('AsvDatenerfassung.Title') }, visibleColumns);
    }

    filterAsvDaten() {
        this.gridFilterAsv = this.filterAvs;
    }
}
