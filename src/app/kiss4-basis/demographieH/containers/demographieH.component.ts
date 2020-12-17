import { Component, Injector, Input, OnInit, EventEmitter, Output, OnChanges, ViewChild, OnDestroy, SimpleChanges } from '@angular/core';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@shared/components/base.component';
import { Subscription } from 'rxjs';
import { DemografieSandbox } from '../demographieH.sandbox';
import { isNullOrUndefined } from 'util';
import { xUserHistory, Personalien, Aufenthaltsort, Wohnsitz } from '../models';
import { CommonConstant } from '@shared/common/constant.common';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { KissGridComponent } from '@shared/components/kiss-grid/kiss-grid.component';

@Component({
    selector: 'kiss-demografie-history',
    templateUrl: './demographieH.component.html',
    styleUrls: ['./demographieH.component.scss'],
})
export class DemografieHistoryComponent extends BaseComponent implements OnInit, OnChanges, OnDestroy {
    @Input() isPopupVisible: boolean;
    @Output() emitCloseHistory = new EventEmitter<any>();
    @ViewChild('formList') formList: KissGridComponent;
    @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;
    subscriptions = new Subscription;
    baPersonID: number;
    xUserHistory: xUserHistory[];
    data: any;
    personalien: Personalien;
    wohnsitz: Wohnsitz;
    aufenthaltsort: Aufenthaltsort;
    selectedKeys = [];
    inCHSeitGeburts = false;
    listBtn = [CommonConstant.ToolbarButtons, CommonConstant.AdditionalButtons.slice(0, 7)];
    fileName = 'Demografie History';
    columnsDataGrid = [];
    gridFunctionModel: GridSettingModel = new GridSettingModel();
    dateFormat = CommonConstant.DATE_FORMAT.dd_MM_yyyy;
    timeFormat = CommonConstant.DATE_FORMAT.hh_mm_ss;
    constructor(
        injector: Injector,
        public demografieSandbox: DemografieSandbox,
        public translateService: TranslateService,
        public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox,
    ) { super(injector); }
    ngOnInit() {
        this.registerEvents();
        this.initHeaderGrid();
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.initHeaderGrid();
    }
    ngOnDestroy() {
        this.unregisterEvents();
    }
    unregisterEvents() {
        this.subscriptions.unsubscribe();
    }
    private registerEvents(): void {
        this.subscriptions.add(this.translateService.onLangChange.subscribe(() => this.initHeaderGrid()));
        this.subscriptions.add(
            this.fallfuhrungTreeSandbox.selectedNode$.subscribe(selectedNode => {
                if (!isNullOrUndefined(selectedNode)) {
                    this.baPersonID = selectedNode.baPersonID;
                this.loadXUserHistory(this.baPersonID);
                }
            })
        );
        this.subscriptions.add(
            this.demografieSandbox.xUserHistoryData$.subscribe(data => {
                this.xUserHistory = data ? data : [];
                this.xUserHistory = data ? this.xUserHistory.map((e, index) => Object.assign(e, { id: index + 2 })) : [];
                if (!isNullOrUndefined(this.xUserHistory) && this.xUserHistory.length) {
                    this.selectedKeys = [this.xUserHistory[0]];
                    this.data = {
                        baPersonID: this.selectedKeys[0].BaPersonID,
                        verID: this.selectedKeys[0].VerID
                    };
                    this.loadDetail(this.data);
                }
            }));

        this.subscriptions.add(this.demografieSandbox.personalienData$.subscribe(dataPersonalien => {
            if (!isNullOrUndefined(dataPersonalien)) {
                this.personalien = dataPersonalien[0];
            }
        }));
        this.subscriptions.add(this.demografieSandbox.wohnsitzData$.subscribe(dataWohnsitz => {
            if (!isNullOrUndefined(dataWohnsitz)) {
                this.wohnsitz = dataWohnsitz[0];
            }
        }));
        this.subscriptions.add(this.demografieSandbox.aufenthaltsort$.subscribe(dataAufenthaltsort => {
            if (!isNullOrUndefined(dataAufenthaltsort)) {
                this.aufenthaltsort = dataAufenthaltsort[0];
            }
        }));

        this.subscriptions.add(this.demografieSandbox.xUserHistoryDataFail$.subscribe(data => {
            if (isNullOrUndefined(data)) {
                return;
            }
            this.checkResponseData(data);
        }));
        this.subscriptions.add(this.demografieSandbox.personalienDataFail$.subscribe(data => {
            if (isNullOrUndefined(data)) {
                return;
            }
            this.checkResponseData(data);
        }));
        this.subscriptions.add(this.demografieSandbox.wohnsitzDataFail$.subscribe(data => {
            if (isNullOrUndefined(data)) {
                return;
            }
            this.checkResponseData(data);
        }));
        this.subscriptions.add(this.demografieSandbox.aufenthaltsortFail$.subscribe(data => {
            if (isNullOrUndefined(data)) {
                return;
            }
            this.checkResponseData(data);
        }));
    }
    loadXUserHistory(baPersonID) {
        this.demografieSandbox.GetXUserHistory(baPersonID);
    }
    checkResponseData(data) {
        // TODO: Call API Fail
    }
    showRemainingMessage(event) {
        this.remainingMessage.showMessage(event);
    }
    hideRemainingMessage() {
        this.remainingMessage.hideMessage();
    }
    loadDetail(query) {
        if (query.baPersonID !== undefined && query.verID !== undefined) {
            this.demografieSandbox.GetPersonalien(query);
            this.demografieSandbox.GetWohnsitz(query);
            this.demografieSandbox.GetAufenthaltsort(query);
        }
    }
    toolBarOnItemClickTopGrd(e) {
        if (e === 'closePopup') {
            this.closeHistory();
            return;
        }
        this.formList.toolBarOnItemClick(e);
    }
    closeHistory() {
        this.emitCloseHistory.emit(false);
    }
    onSelectedRow(rowData) {
        if (isNullOrUndefined(rowData)) {
            return;
        }
        this.data = {
            baPersonID: rowData.BaPersonID,
            verID: rowData.VerID
        };
        this.loadDetail(this.data);
    }
    initHeaderGrid() {
        this.columnsDataGrid = [
            { minWidth: '80', width: 'auto', alignment: '', dataType: 'date', dataField: 'Datum', caption: this.translateService.instant('DemografieHistory.Grid.Datum'), format: this.dateFormat, sortIndex: 1 },
            { minWidth: '80', width: 'auto', alignment: '', editorOptions: '{\'type\': \'time\'}', dataField: 'Zeit', caption: this.translateService.instant('DemografieHistory.Grid.Zeit'), format: this.timeFormat, sortIndex: 2 },
            { minWidth: '80', width: 'auto', alignment: '', dataType: 'string', dataField: 'Benutzer', caption: this.translateService.instant('DemografieHistory.Grid.Benutzer') },
        ];
    }
}
