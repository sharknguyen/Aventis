import 'devextreme-intl';

import { Component, EventEmitter, HostListener, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxDataGridComponent, DxDateBoxComponent, DxPopupComponent, DxValidationGroupComponent } from 'devextreme-angular';
import { DxButtonComponent } from 'devextreme-angular/ui/button';
import { locale } from 'devextreme/localization';

import { LandesxindexSandbox } from '../../landesxindex.sandbox';
import { DictionaryLandesindex, IkLandesindexInsertModel, IkLandesindexModel, Landesindex } from '../../models';

@Component({
    selector: 'kiss-indexwerte-erfassen',
    templateUrl: './indexwerte-erfassen.component.html',
    styleUrls: ['./indexwerte-erfassen.component.scss']
})

@SetClassRight('Ctllandesxindex')
export class IndexwerteErfassenComponent extends BaseComponent implements OnInit {
    @ViewChild('dateBoxWertErfassen') dateBoxWertErfassen: DxDateBoxComponent;
    @ViewChild('gridLandesindexWertErfassen') gridLandesindexWertErfassen: DxDataGridComponent;
    @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
    @ViewChild('remainingMessageJ002') remainingMessageJ002: RemainingMessageComponent;
    @ViewChild('indexwerteErfassen') popupIndexwerteErfassen: DxPopupComponent;
    @ViewChild('buttonSpeichernLandesindexWertErfassen') buttonSpeichernLandesindexWertErfassen: DxButtonComponent;
    //#region "Declare variables input"
    @Input() popupLandesindexWertErfassen = {
        popupVisibleLandesindexWertErfassen: false
    };
    @Input() landesindexModel: Landesindex;
    @Input() rowSelectedWertPopup: number;
    @Input() filterColumnsPopup: Array<any> = [];
    @Input() ikLandesindexs: IkLandesindexModel[] = [];
    @Input() ikLandesindexsToInsert: IkLandesindexInsertModel = new IkLandesindexInsertModel();
    @Input() ikLandesindexID: number;
    @Input() selectedLandesindexWertErfassenKeys = [];
    //#endregion

    //#region "Declare variables output"
    @Output() addIkLandesindexWert: EventEmitter<any> = new EventEmitter();

    //#endregion
    valueDateBoxLandesindexWertErfassen: Date = new Date(2011, 5, 1);
    isEditModel = false;
    filter: any;
    minDate = new Date(1753, 0, 1);
    maxDate = new Date(9999, 11, 31);
    minLengthInput = AppEnums.Money.MIN_VALUE;
    maxLengthInput = AppEnums.Money.MAX_VALUE;
    isValid = true;
    isClosed = true;
    constructor(
        injector: Injector,
        public LandesindexesSandbox: LandesxindexSandbox,
        public utilService: UtilService,
        public translateService: TranslateService,
        public layoutSandbox: LayoutSandbox) {
        super(injector);
        locale(UtilityHelper.getLanguageCodeFromLocalStorage());
    }
    ngOnInit() {
    }

    onFocusInLandesindexWertErfassen() {
        this.isEditModel = false;
    }

    public onEditorPreparing(event) {
        if (this.landesindexModel && this.landesindexModel.ikLandesindexId && event.row && event.row.data) {
            this.isEditModel = true;
            this.rowSelectedWertPopup = event.row.data.IkLandesindexID;
        }
    }

    onCellClickGridLandesindexWertErfassen(data) {
        if (data.row) {
            this.rowSelectedWertPopup = data.row.data.IkLandesindexID;
            if (data.column.caption !== 'Wert') {
                this.isEditModel = false;
            }
        }
    }

    onHiddenPopupLandesindexWertErfassen() {
        this.dateBoxWertErfassen.instance.reset();
        this.valueDateBoxLandesindexWertErfassen = new Date(2011, 5, 1);
        this.gridLandesindexWertErfassen.instance.cancelEditData();
        this.ikLandesindexs = [];
        this.remainingMessageJ002.hideMessage();
    }

    onClickSpeichernLandesindexWertErfassen() {
        this.gridLandesindexWertErfassen.instance.saveEditData().then(
            () => {
                if (this.ikLandesindexsToInsert.Values.length > 0 && !this.valueDateBoxLandesindexWertErfassen && this.isValid) {
                    this.remainingMessageJ002.showMessage(this.translateService.instant('J002LandesindexWertErfassen.MessageId2'));
                    return;
                }
                if (this.ikLandesindexsToInsert.Values.length === 0 && this.isValid && (!this.valueDateBoxLandesindexWertErfassen || this.valueDateBoxLandesindexWertErfassen)) {
                    this.popupLandesindexWertErfassen.popupVisibleLandesindexWertErfassen = false;
                    return;
                }
                if (this.isValid && (this.validationGroup.instance.validate() && this.validationGroup.instance.validate().isValid)) {
                    this.addDataLandesindexWertErfassen();
                } else {
                    this.remainingMessageJ002.showMessage(this.translateService.instant('J003NeuerLandesindex.MessageValidation.Validate'));
                }
            }
        );
    }

    onUpdatedLandesindexWertErfassen(event) {
        if (event.data) {
            const checkDuplicateKey = this.ikLandesindexsToInsert.Values.filter(x => x.Key === event.key);
            if (checkDuplicateKey.length === 0) {
                const data: DictionaryLandesindex = {
                    Key: event.key,
                    Value: event.data.Value
                };
                this.ikLandesindexsToInsert.Values.push(data);
                return;
            }
            const checkDuplicateValues = this.ikLandesindexsToInsert.Values.filter(x => x.Key === event.key && x.Value === event.data.Value);
            if (checkDuplicateValues.length > 0) {
                return;
            }
            const findIndex = this.ikLandesindexsToInsert.Values.findIndex(x => x.Key === event.key);
            this.ikLandesindexsToInsert.Values[findIndex].Value = event.data.Value;
            this.ikLandesindexsToInsert.Values = this.ikLandesindexsToInsert.Values.filter(x => x.Value !== null);
        }
    }

    addDataLandesindexWertErfassen() {
        if (this.ikLandesindexsToInsert.Values && this.ikLandesindexsToInsert.Values.length > 0) {
            this.ikLandesindexsToInsert.Monat = this.valueDateBoxLandesindexWertErfassen.getMonth() + 1;
            this.ikLandesindexsToInsert.Jahr = this.valueDateBoxLandesindexWertErfassen.getFullYear();
            this.addIkLandesindexWert.emit({ ...this.ikLandesindexsToInsert });
        } else {
            this.popupLandesindexWertErfassen.popupVisibleLandesindexWertErfassen = false;
        }
    }

    public toolbarPreparing(data: any) {
        const searchPanel = data.toolbarOptions.items.filter(x => x.name === 'searchPanel');
        const groupPanel = data.toolbarOptions.items.filter(x => x.name === 'groupPanel');
        if (data.toolbarOptions.items.length > 0) {
            data.toolbarOptions.items.splice(0, data.toolbarOptions.items.length);
        }
        if (searchPanel.length > 0) {
            data.toolbarOptions.items.push(searchPanel[0]);
        }
        if (groupPanel.length > 0) {
            data.toolbarOptions.items.push(groupPanel[0]);
        }
    }

    onKeyDownLandesindexWert(e) {
        if (e.event.keyCode === AppEnums.KeyCode.KeyE) {
            e.event.preventDefault();
        }

        if (e.event.keyCode === AppEnums.KeyCode.KeyEnter && this.isClosed) {
            setTimeout(() => {
                this.onClickSpeichernLandesindexWertErfassen();
            });
        }
    }

    onClickAbbrechenLandesindexWertErfassen() {
        if (this.gridLandesindexWertErfassen.instance) {
            this.gridLandesindexWertErfassen.instance.cancelEditData();
            this.gridLandesindexWertErfassen.instance.state({});
        }
        this.popupLandesindexWertErfassen.popupVisibleLandesindexWertErfassen = false;
        this.remainingMessageJ002.hideMessage();
    }

    onShownWertErfassen() {
        this.buttonSpeichernLandesindexWertErfassen.instance.focus();
    }

    onRowValidating(e) {
        this.isValid = e.isValid;
    }

    @HostListener('document:keydown', ['$event'])
    public keyEvent(event: KeyboardEvent) {
        if (event.keyCode === AppEnums.KeyCode.KeyEnter && this.isClosed) {
            this.onClickSpeichernLandesindexWertErfassen();
        }
    }

    onKeyDown(e) {
        if (e.event.keyCode === AppEnums.KeyCode.KeyF4) {
            if (!(e.component.option('opened'))) {
                e.event.preventDefault();
                e.component.open();
                return;
            }
            e.component.close();
            return;
        }
    }

    onClosed() {
        this.isClosed = true;
    }

    onOpened() {
        this.isClosed = false;
    }

    onShowing(e: any) {
        const overlayContent = e.component.overlayContent();
        overlayContent.addClass('kw-popup--scroll');
    }

    onHidden(e: any) {
        const overlayContent = e.component.overlayContent();
        overlayContent.removeClass('kw-popup--scroll');
    }
}
