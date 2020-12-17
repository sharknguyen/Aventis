import {
    AfterViewInit,
    Component,
    EventEmitter,
    Injector,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import * as utilites from '@shared/utilites';
import { getLanguageCodeFromLocalStorage, isClearNumberBox } from '@shared/utilites/utilityHelpers';
import { DxNumberBoxComponent, DxSelectBoxComponent, DxValidationGroupComponent } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { isEqual } from 'lodash-es';
import { isNullOrUndefined } from 'util';
import { Alimentenguthaben, BaPerson } from '../../models';
enum Code {
    errorMoney = 'errorMoney',
    deleteMenuItemTopGrd = 'deleteMenuItemTopGrd',
    canDeactivate = 'canDeactivate',
    cancel = 'cancel',
    neue = 'neue-alimentenguthaben',
    abbrechen = 'abbrechen',
    bearbeiten = 'bearbeiten',
    speichern = 'speichern',
    dirty = 'dirty-form',
    delete = 'Delete',
    save = 'save',
    opened = 'opened'
}
@Component({
    selector: 'kiss-alimentenguthaben-edit',
    templateUrl: './alimentenguthaben-edit.component.html',
    styleUrls: ['./alimentenguthaben-edit.component.scss']
})
export class AlimentenguthabenEditComponent extends BaseComponent implements OnInit, OnChanges, AfterViewInit {
    @ViewChild('nameVorname') nameVorname: DxSelectBoxComponent;
    @ViewChild('inkasso') inkasso: DxSelectBoxComponent;
    @ViewChild('betrag') betrag: DxNumberBoxComponent;
    @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;

    constructor(injector: Injector, public translateService: TranslateService) {
        super(injector);
        locale(getLanguageCodeFromLocalStorage());
    }

    @Input() set dataSource(value: any) {
        this._data = value;
        this.oldData = Object.assign({}, this._data);
    }
    @Input() dataSelectBoxPerson: BaPerson;
    @Input() showTitleDetail: boolean;
    @Input() dataSelectBoxInkasso: any;
    @Input() checkConcurrency: boolean;
    @Output() action = new EventEmitter<{ actionName: string, data?: Alimentenguthaben }>();
    @Output() showMessage: EventEmitter<any> = new EventEmitter();
    @Output() isDirtyForm: EventEmitter<boolean> = new EventEmitter();

    _data: Alimentenguthaben;
    oldData: any = {};
    hilfeText: string;
    message = this.translateService.instant('BasisTextmarken.BasisTextmarkenDetails.ShowDetail.ValidInput');
    numberFormat = AppEnums.Validation.C007_NUMBER_FORMAT;

    CommonBtn = [...CommonConstant.AdditionalButtons];
    customizeBtn = [
        {
            text: 'Aliment.Detail.Speichern',
            visible: true,
            name: Code.speichern,
            disabled: false,
            icon: 'save',
            class: 'i004-button'
        },
        {
            text: 'Aliment.Detail.Abbrechen',
            visible: true,
            name: Code.abbrechen,
            icon: 'close',
            class: 'i004-button'
        },
        {
            text: 'BasisTextmarken.Button.Delete',
            useSubmitBehavior: true,
            locateInMenu: 'always',
            name: Code.deleteMenuItemTopGrd,
            disabled: false
        }
    ];
    minNumber = AppEnums.Money.MIN_VALUE;
    maxNumber = AppEnums.Money.MAX_VALUE;


    ngOnInit() {
    }
    ngOnChanges() {
        if (this.checkConcurrency) {
            this.customizeBtn[0].disabled = true;
            this.customizeBtn[2].disabled = true;
        } else {
            this.customizeBtn[0].disabled = false;
            this.customizeBtn[2].disabled = false;
        }
        this.customizeBtn = [...this.customizeBtn];
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.nameVorname.instance.focus();
        });
    }
    toolBarOnItemClick(actionName) {
        switch (actionName) {
            case Code.speichern: // save
                if (this.customizeBtn[0].disabled === true) {
                    return;
                } else if (isEqual(this.oldData, this._data)) {
                    this.action.next({ actionName, data: null });
                } else {
                    if (this.isFormValid()) {
                        this._data.Buchungstext = this.inkasso.text;
                        this.action.next({ actionName, data: this._data });
                        return;
                    }
                    this.showMessage.emit(this.message);
                }
                break;
            case Code.abbrechen: // cancel
                if (isEqual(this.oldData, this._data)) {
                    this.action.next({ actionName });
                } else {
                    this.action.next({ actionName: Code.dirty, data: this._data });
                }
                break;
            case Code.deleteMenuItemTopGrd: // cancel
                if (this.customizeBtn[2].disabled === false) {
                    this.action.next({ actionName, data: this._data });
                }
                break;
            case CommonConstant.EventClickTitle:
                this.action.next({ actionName });
                break;
            default:
                break;
        }
    }

    screenByWidthSize(width) {
        return utilites.getSizeQualifier(width);
    }

    onKeyDownSelectbox(e) {
        if (e.event.keyCode !== AppEnums.KeyCode.KeyF4) {
            return;
        }
        if (!(e.component.option(Code.opened))) {
            e.event.preventDefault();
            e.component.open();
        } else {
            e.component.close();
        }
    }
    onValueChanged(event) {
        this.isDirtyForm.next(true);
    }
    onSelectionChanged(event) {
        if (isNullOrUndefined(event.selectedItem)) {
            this.hilfeText = '';
        } else {
            this.hilfeText = event.selectedItem.HilfeText;
        }
    }
    isFormValid() {
        this.validationGroup.instance.validate();
        if (isNullOrUndefined(this._data.BaPersonID) || this._data.BaPersonID.toString().trim() === '') {
            this.nameVorname.instance.focus();
            return false;
        }
        if (isNullOrUndefined(this._data.BgPositionsartID) || this._data.BgPositionsartID.toString().trim() === '') {
            this.inkasso.instance.focus();
            return false;
        }
        if ((isNullOrUndefined(this._data.Betrag) || this._data.Betrag.toString().trim() === '')
            || (this._data.Betrag < this.minNumber || this._data.Betrag > this.maxNumber)) {
            this.betrag.instance.focus();
            return false;
        }
        this._data.Bemerkung = this._data.Bemerkung ? this._data.Bemerkung.toString().trim() : '';
        return true;
    }

    // select box on click
    selectContentReady(e) {
        if (isNullOrUndefined(this._data.BaPersonID)) {
            this._data.BaPersonID = -1;
            return;
        }
    }
    isBackSpacePressed(event) {
        if (event.event.keyCode === AppEnums.KeyCode.BackSpace || event.event.keyCode === AppEnums.KeyCode.Delete) {
            return event.event.keyCode;
        }
    }
    onNumberboxKeyDown(event, fieldName) {
        if (isClearNumberBox(event)) {
            event.component.reset();
        }
    }
}
