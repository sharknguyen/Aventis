import { Component, Injector, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { BaseComponent } from '@shared/components/base.component';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant } from '@shared/common/constant.common';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'kiss-regularer-verlauf-popup',
    templateUrl: './regularer-verlauf-popup.component.html',
    styleUrls: ['./regularer-verlauf-popup.component.scss']
})

export class RegularerVerlaufPopupComponent extends BaseComponent implements OnInit {
    @ViewChild('gridVerlauf') gridVerlauf: DxDataGridComponent;
    @ViewChild('formList') formList: any;
    @Output() visiblePopupVerlaufChange: EventEmitter<any> = new EventEmitter();
    @Input() visiblePopupVerlauf: boolean;
    @Input() bgFinanzplanID: number;
    @Input() verlaufData: any;
    formData: any;
    columnsDataGrid = [];
    dateFormat = CommonConstant.DATE_FORMAT.dd_MM_yyyy;
    filter: any;
    listBtn = [CommonConstant.ToolbarButtons, CommonConstant.AdditionalButtons.slice(0, 7)];
    gridFunctionModel: GridSettingModel = new GridSettingModel();
    gridFunctionKey = 'gridSettingI031';
    constructor(
        injector: Injector,
        public translateService: TranslateService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.initGridColumn();
    }

    initGridColumn() {
        this.columnsDataGrid = [
            { dataField: 'Datum', dataType: 'date', caption: this.translateService.instant('RegularerFinanzplan.PopupVerlauf.Datum'), minWidth: '160', width: 'auto', format: this.dateFormat },
            { dataField: 'Absender', dataType: 'string', caption: this.translateService.instant('RegularerFinanzplan.PopupVerlauf.Absender'), minWidth: '80', width: 'auto' },
            { dataField: 'Empfaenger', dataType: 'string', caption: this.translateService.instant('RegularerFinanzplan.PopupVerlauf.Empfanger'), minWidth: '80', width: 'auto' },
            { dataField: 'typText', dataType: 'string', caption: this.translateService.instant('RegularerFinanzplan.PopupVerlauf.Typ'), minWidth: '80', width: 'auto' },
            { dataField: 'PerDatum', dataType: 'date', caption: this.translateService.instant('RegularerFinanzplan.PopupVerlauf.PerDatum'), minWidth: '160', width: 'auto', format: this.dateFormat },
            { dataField: 'Bemerkung', dataType: 'string', caption: this.translateService.instant('RegularerFinanzplan.PopupVerlauf.Bemerkung'), minWidth: '80', width: 'auto' },
        ];
    }

    toolBarOnItemClickTopGrd(e) {
        if (e === 'closePopup') {
            this.onCancelClicked();
            return;
        }
        this.formList.toolBarOnItemClick(e);
    }

    onCancelClicked() {
        this.visiblePopupVerlaufChange.emit(false);
    }

    onSelectedRow(event) {
        this.formData = event ? event : null;
    }
}
