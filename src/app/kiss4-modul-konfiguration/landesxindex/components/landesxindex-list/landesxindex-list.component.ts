import { Component, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { isNullOrUndefined } from 'util';

import { Landesindex } from '../../models';

@Component({
    selector: 'kiss-landesxindex-list',
    templateUrl: './landesxindex-list.component.html',
    styleUrls: ['./landesxindex-list.component.scss']
})

@SetClassRight('Ctllandesxindex')
export class LandesxindexListComponent extends BaseComponent {
    //#region 'Declare decorator'
    @ViewChild('gridLandesxindexTop') gridLandesxindexTop: DxDataGridComponent;
    @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
    @ViewChild('expandGridTop') expandGridTop: any;
    @ViewChild('printer') printer: PrinterComponent;
    //#endregion

    //#region "Declare variables input"
    @Input() landesxindexes: Landesindex[];
    @Input() selectedKeysTop: any[];
    @Input() gridFunctionKey: any;
    @Input() allowUpdatingGrdTop: boolean;
    @Input() editingControl: any;
    @Input() rowSelectedIDTop: number;
    //#endregion

    //#region "Declare variables output"
    @Output() emitterOnSelectionChanged: EventEmitter<any> = new EventEmitter();
    @Output() emitterOnEditingStart: EventEmitter<any> = new EventEmitter();
    @Output() emitterOnRowUpdating: EventEmitter<any> = new EventEmitter();
    @Output() emitterMousedown: EventEmitter<any> = new EventEmitter();
    @Output() emitterOnCellClick: EventEmitter<any> = new EventEmitter();
    //#endregion

    //#region "Declare variables global"
    readonly patternName = '^.{1,50}$';
    filter = [];
    gridFilterValue = [];
    //#endregion

    constructor(
        injector: Injector,
        public translateService: TranslateService,
    ) {
        super(injector);
        this.validationCallbackTop = this.validationCallbackTop.bind(this);
    }

    filterGridData() {
        this.gridFilterValue = this.filter;
    }

    selectionChangedTop(e) {
        this.emitterOnSelectionChanged.emit(e);
    }

    onEditingStartTop(e) {
        this.emitterOnEditingStart.emit(e);
    }

    onRowUpdatingTop(e) {
        this.emitterOnRowUpdating.emit(e);
    }

    onContextMenuPreparing(e) {
        if (!isNullOrUndefined(e.items)) {
            let colCount = this.gridLandesxindexTop.instance.getVisibleColumns().length;
            for (let i = 0; i < this.gridLandesxindexTop.instance.columnCount(); i++) {
                if (this.gridLandesxindexTop.instance.columnOption(i, 'groupIndex') > -1) {
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

    toolbarPreparing(e) {
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

    onCellClickGridTop(e) {
        this.emitterOnCellClick.emit(e);
    }

    groupingHeaderRightClick(e) {
        this.gridLandesxindexTop.instance.columnOption(e, 'groupIndex', 0);
    }

    hideColumn(e) {
        this.gridLandesxindexTop.instance.columnOption(e, 'visible', false);
    }

    unAllGroupingHeaderRightClick() {
        this.gridLandesxindexTop.instance.clearGrouping();
    }

    expandCloumnGrouping() {
        this.expandGridTop.autoExpandAll = true;
    }

    unExpandCloumnGrouping() {
        this.expandGridTop.autoExpandAll = false;
    }

    validationCallbackTop(e) {
        if (isNullOrUndefined(this.landesxindexes) || this.landesxindexes.length < 1) {
            return true;
        }
        return !this.landesxindexes.some(item => item.name === e.data.name.trim() && item.ikLandesindexId !== e.data.ikLandesindexId);
    }
}
