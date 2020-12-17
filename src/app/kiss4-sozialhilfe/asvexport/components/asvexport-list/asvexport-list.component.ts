import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { UtilService } from '@shared/utilites/utility.service';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { isNullOrUndefined } from 'util';

import { ASVDetenerfassung } from '../../models';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { AsvConstant } from '@shared/common/asv-export.common';
import { CommonConstant } from '@shared/common/constant.common';

@Component({
    selector: 'kiss-asvexport-list',
    templateUrl: './asvexport-list.component.html',
    styleUrls: ['./asvexport-list.component.scss']
})
@SetClassRight('CtlAsvexport')
export class AsvexportListComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
    @ViewChild('gridAsvexportTop') gridAsvexportTop: DxDataGridComponent;
    @ViewChild('expandGridTop') expandGridTop: any;
    @ViewChild('printer') printer: PrinterComponent;
    //#region "Declare variables input"
    @Input() dataExportAllGridTop: ASVDetenerfassung[];
    @Input() selectedKeys = [];
    @Input() isDisabledGridTop: boolean;
    //#endregion

    //#region "Declare variables output"
    @Output() emitDataGridTop: EventEmitter<any> = new EventEmitter();
    @Output() emitVisibleRows: EventEmitter<any> = new EventEmitter();
    @Output() emitStateSearch: EventEmitter<any> = new EventEmitter();
    @Output() rowFocusing: EventEmitter<any> = new EventEmitter();
    @Output() emitStateAdd: EventEmitter<any> = new EventEmitter();
    //#endregion
    filterAvs: any;
    gridFunctionKey = 'gridSetting';
    applyFilter$ = new Subject();
    gridDatenerFilter = [];
    dateFormat = CommonConstant.FORMAT_DATE;
    private subscription = new Subscription();
    constructor(injector: Injector, public utilService: UtilService, public translateService: TranslateService,
        public layoutSandbox: LayoutSandbox, private router: Router) {
        super(injector);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    ngOnInit() {
        this.loadGridSetting();
    }

    ngAfterViewInit(): void {
        this.subscription.add(this.applyFilter$.asObservable().pipe(
            debounceTime(200),
            map(() => this.gridAsvexportTop.instance.getCombinedFilter()),
            distinctUntilChanged()
        ).subscribe((result) => {
            if (isNullOrUndefined(result)) {
                this.emitStateSearch.emit();
                return;
            }
            const grid = this.gridAsvexportTop.instance;
            const visibleRows = grid.getVisibleRows();
            this.emitVisibleRows.emit([...visibleRows]);
            if (visibleRows.length < 1) {
                this.rowFocusing.emit(null);
                return;
            }
            const focusKey = this.gridAsvexportTop.focusedRowKey;
            if (visibleRows.find(row => row.key === focusKey)) {
                return;
            }
            this.gridAsvexportTop.focusedRowKey = visibleRows[0].key;
        }));
    }
    getDetailGridBottom($event) {
        this.emitDataGridTop.emit({ ...$event });
    }

    onContextMenuPreparing(e: any) {
        if (!isNullOrUndefined(e.items)) {
            let colCount = this.gridAsvexportTop.instance.getVisibleColumns().length;
            for (let i = 0; i < this.gridAsvexportTop.instance.columnCount(); i++) {
                if (this.gridAsvexportTop.instance.columnOption(i, 'groupIndex') > -1) {
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
        this.gridAsvexportTop.instance.columnOption(e, 'groupIndex', 0);
    }

    unAllGroupingHeaderRightClick() {
        this.gridAsvexportTop.instance.clearGrouping();
    }

    hideColumn(e) {
        if (this.gridAsvexportTop.instance.getVisibleColumns().length === 1) {
            return false;
        }
        this.gridAsvexportTop.instance.columnOption(e, 'visible', false);
    }

    expandCloumnGrouping() {
        this.expandGridTop.autoExpandAll = true;
    }

    unExpandCloumnGrouping() {
        this.expandGridTop.autoExpandAll = false;
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


    onContentReady(e) {
        this.applyFilter$.next(event);
    }

    onFocusedRowChanged(e) {
        if (!e.row) {
            return;
        }
        if (e.row.rowType === 'data') {
            this.gridAsvexportTop.selectedRowKeys = [this.gridAsvexportTop.focusedRowKey];
            this.rowFocusing.emit(this.gridAsvexportTop.focusedRowKey);
        }
    }

    setFocusByKey(key) {
        this.gridAsvexportTop.focusedRowKey = key;
        this.emitStateAdd.emit();
    }

    printPdf() {
        const visibleColumns = this.gridAsvexportTop.instance.getVisibleColumns();
        const visibleRows = (<any>this.gridAsvexportTop.instance.getDataSource())._items;
        this.printer.setData(visibleRows, { title: AsvConstant.PAGETITLE }, visibleColumns);
    }

    onClickFilterGrid() {
        this.gridDatenerFilter = this.filterAvs;
    }
}
