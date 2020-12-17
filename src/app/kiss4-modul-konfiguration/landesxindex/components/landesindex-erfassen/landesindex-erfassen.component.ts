import 'devextreme-intl';

import { Component, EventEmitter, HostListener, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxValidationGroupComponent, DxPopupComponent } from 'devextreme-angular';
import { DxButtonComponent } from 'devextreme-angular/ui/button';
import { DxCheckBoxComponent } from 'devextreme-angular/ui/check-box';
import { DxFormComponent } from 'devextreme-angular/ui/form';
import { DxTextBoxComponent } from 'devextreme-angular/ui/text-box';
import { DxValidatorComponent } from 'devextreme-angular/ui/validator';
import { locale } from 'devextreme/localization';
import { isUndefined, isNullOrUndefined } from 'util';

import { LandesxindexSandbox } from '../../landesxindex.sandbox';
import { InsertIkLandesIndex, Landesindex, Wert } from '../../models';

@Component({
    selector: 'kiss-landesindex-erfassen',
    templateUrl: './landesindex-erfassen.component.html',
    styleUrls: ['./landesindex-erfassen.component.scss']
})

@SetClassRight('Ctllandesxindex')
export class LandesindexErfassenComponent extends BaseComponent implements OnInit {
    @ViewChild('datebox') datebox: DxCheckBoxComponent;
    @ViewChild('validation') validation: DxValidatorComponent;
    @ViewChild('btnCancel') btnCancelComponent: DxButtonComponent;
    @ViewChild('textbox') textboxComponent: DxTextBoxComponent;
    @ViewChild('checkbox') checkbox: DxCheckBoxComponent;
    @ViewChild('btnSave') btnSave: DxButtonComponent;
    @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
    @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;
    @ViewChild('form') form: DxFormComponent;
    @ViewChild('landesIndexErfassen') popupLandesIndexErfassen: DxPopupComponent;
    //#region "Declare variables input"
    @Input() toolbarControlAdd = {
        isShowbuttonAdd: false,
        popupVisible: false
    };
    @Input() isAddNew: boolean;
    @Input() ikLandesindexID: number;
    @Input() landesxindexes: Landesindex[];
    @Input() defaultDate: Date;
    @Input() nameLandesindex: string;
    //#endregion

    //#region "Declare variables output"
    @Output() emitterGetWert: EventEmitter<any> = new EventEmitter();
    @Output() emitterAddLandesIndex: EventEmitter<any> = new EventEmitter();
    @Output() emitterModelAddLandesIndex: EventEmitter<any> = new EventEmitter();
    @Output() emitterCheckboxState: EventEmitter<any> = new EventEmitter();
    @Output() emitterAddNewState: EventEmitter<any> = new EventEmitter();
    //#endregion

    checkboxVisible = false;
    insertLandesIndex = new InsertIkLandesIndex();
    modelWert = new Wert();
    isOnInput: boolean;
    numberShift: number;
    keyName: string;
    isFocusButtonAbbrechen = false;
    arrowDownIndex = 1;
    arrowUpCheckBoxIndex = 1;
    arrowUpIndex = 1;
    isClosedDateBox = true;
    widthNumberAndDateBox = CommonConstant.WidthNumberAndDateBox;
    dateVisible = true;
    messageErr = null;
    isErrorClosed = false;
    lengthInput = AppEnums.Validation.MAX_LENGTH_INPUT_50_VALIDATOR;
    txtLandesIndex: string;
    minDate = new Date(1753, 0, 1);
    maxDate = new Date(9999, 11, 31);
    constructor(
        injector: Injector,
        public LandesindexesSandbox: LandesxindexSandbox,
        public utilService: UtilService,
        public translateService: TranslateService,
        public layoutSandbox: LayoutSandbox) {
        super(injector);
        locale(UtilityHelper.getLanguageCodeFromLocalStorage());
        this.validationCallback = this.validationCallback.bind(this);
    }

    ngOnInit() {
        this.initData();
    }

    initData() {
        this.checkboxVisible = false;
    }
    onShown() {
        this.checkboxVisible = false;
        this.btnSave.instance.focus();
    }

    pressKey(event) {
        if (event.event.keyCode === AppEnums.KeyCode.KeyEnter) {
            setTimeout(() => {
                this.saveDataLandesIndex();
            });
        }
    }

    saveDataLandesIndex() {
        if (!this.validationGroup && !this.remainingMessage) {
            return;
        }
        if (this.validationGroup.instance.validate() && this.validationGroup.instance.validate().isValid) {
            if (!this.setDataBeforeSave()) {
                return;
            }
            if (this.checkboxVisible === true) {
                this.emitterCheckboxState.emit(this.checkboxVisible);
                this.emitterModelAddLandesIndex.emit({ ...this.insertLandesIndex });
                this.emitterGetWert.emit({ ...this.modelWert });
                return;
            }
            this.emitterAddLandesIndex.emit({ ...this.insertLandesIndex });
        } else {
            this.remainingMessage.showMessage(this.translateService.instant('J003NeuerLandesindex.MessageValidation.Validate'));
        }
    }

    popupHidingI003(e) {
        this.checkboxVisible = false;
        this.txtLandesIndex = null;
        this.dateVisible = true;
        this.datebox.instance.reset();
        this.validation.instance.reset();
        this.remainingMessage.hideMessage();
        this.isOnInput = false;
    }

    convert(str) {
        const date = new Date(str),
            mnth = ('0' + (date.getMonth() + 1)).slice(-2);
        return [date.getFullYear(), mnth].join('.');
    }

    onFocusJ003(e, field: string) {
        switch (field) {
            case 'Textbox':
                this.arrowDownIndex = 2;
                break;
            case 'CheckBox':
                this.arrowDownIndex = 3;
                break;
            case 'cancelDataLandesIndex':
                this.isFocusButtonAbbrechen = true;
                break;
            default:
                break;
        }
        this.numberShift = e.accessKey;
        this.keyName = field;
    }

    keyShiftTab() {
        switch (this.numberShift) {
            case 1: {
                this.btnCancelComponent.instance.focus();
                break;
            }
            case 2: {
                this.textboxComponent.instance.focus();
                break;
            }
            case 3: {
                this.checkbox.instance.focus();
                break;
            }
            case 4: {
                if (this.checkboxVisible === true) {
                    this.datebox.instance.focus();
                } else {
                    this.checkbox.instance.focus();
                }
                break;
            }
            case 5: {
                this.btnSave.instance.focus();
                break;
            }
            default: break;
        }
    }

    onFocusOutJ003(e, field: string) {
        if (field === 'Textbox' && !this.txtLandesIndex) {
            this.txtLandesIndex = this.textboxComponent.text;
        }
        if (field === 'cancelDataLandesIndex') {
            setTimeout(() => {
                this.isFocusButtonAbbrechen = false;
            }, 50);
        }
        this.keyName = '';
        this.numberShift = 0;
    }

    keyArrowDownAction() {
        switch (this.arrowDownIndex) {
            case 1: {
                this.textboxComponent.instance.focus();
                this.arrowDownIndex = 2;
                break;
            }
            case 2: {
                this.checkbox.instance.focus();
                this.arrowDownIndex = 3;
                break;
            }
            case 3: {
                if (this.checkboxVisible === true) {
                    this.datebox.instance.focus();
                } else {
                    this.btnSave.instance.focus();
                }
                this.arrowDownIndex = 4;
                break;
            }
            case 4: {
                if (this.keyName === 'DateBox') {
                    this.btnSave.instance.focus();
                    this.arrowDownIndex = 5;
                } else {
                    this.btnCancelComponent.instance.focus();
                    this.arrowDownIndex = 1;
                }
                break;
            }
            case 5: {
                this.btnCancelComponent.instance.focus();
                this.arrowDownIndex = 1;
                break;
            }
            default: break;
        }
    }

    keyArrowUpAction() {
        if (this.keyName === 'DateBox' || this.keyName === 'CheckBox') {
            if (this.checkboxVisible === true) {
                switch (this.arrowUpCheckBoxIndex) {
                    case 1: {
                        this.datebox.instance.focus();
                        this.arrowUpCheckBoxIndex = 2;
                        break;
                    }
                    case 2: {
                        this.checkbox.instance.focus();
                        this.arrowUpCheckBoxIndex = 1;
                        break;
                    }
                    default: break;
                }
            }
        }
        if (this.keyName !== 'DateBox' && this.keyName !== 'CheckBox') {
            switch (this.arrowUpIndex) {
                case 1: {
                    this.textboxComponent.instance.focus();
                    this.arrowUpIndex = 2;
                    break;
                }
                case 2: {
                    this.btnCancelComponent.instance.focus();
                    this.arrowUpIndex = 3;
                    break;
                }
                case 3: {
                    this.btnSave.instance.focus();
                    this.arrowUpIndex = 1;
                    break;
                }
                default: break;
            }
        }
    }

    @HostListener('document:keydown', ['$event'])
    public keyEvent(event: KeyboardEvent) {
        if (this.isClosedDateBox && (event.keyCode === AppEnums.KeyCode.UpArrowKey || event.key === 'ArrowUp')) {
            this.keyArrowUpAction();
        } else if (this.isClosedDateBox && (event.keyCode === AppEnums.KeyCode.DownArrowKey || event.key === 'ArrowDown')) {
            this.keyArrowDownAction();
        } else if (this.isClosedDateBox && event.keyCode === AppEnums.KeyCode.KeyEnter) {
            this.saveDataLandesIndex();
        }
        if (event.keyCode === AppEnums.KeyCode.KeyTab && this.isFocusButtonAbbrechen && !event.shiftKey) {
            this.textboxComponent.instance.focus();
            event.preventDefault();
        }
        if (event.shiftKey && event.keyCode === AppEnums.KeyCode.KeyTab) {
            event.preventDefault();
            this.keyShiftTab();
        }
    }

    onClosedDateBox() {
        this.isClosedDateBox = true;
    }

    onOpenedDateBox() {
        this.isClosedDateBox = false;
    }

    onValueChangedJ003(event, field: string) {
        this.isOnInput = true;
        if (field === 'CheckBox') {
            (event.value === true) ? this.dateVisible = false : this.dateVisible = true;
        }
    }

    onKeyDownAdd(e) {
        if (e.event.keyCode === AppEnums.KeyCode.UpArrowKey) {
            const em = new KeyboardEvent('keydown', {
                bubbles: true,
                cancelable: true,
                key: 'ArrowUp',
            });
            document.dispatchEvent(em);
        } else if (e.event.keyCode === AppEnums.KeyCode.DownArrowKey) {
            const em = new KeyboardEvent('keydown', {
                bubbles: true,
                cancelable: true,
                key: 'ArrowDown',
            });
            document.dispatchEvent(em);
        }
        if (e.event.keyCode === AppEnums.KeyCode.KeyF4) {
            if (!(e.component.option('opened'))) {
                e.event.preventDefault();
                e.component.open();
                return;
            }
            e.component.close();
        }
    }

    cancelPopup() {
        this.checkboxVisible = false;
        this.toolbarControlAdd.popupVisible = false;
        this.arrowDownIndex = 1;
    }

    onCloseError() {
        this.isErrorClosed = false;
    }

    validationCallback($event) {
        const dupplicateName = this.landesxindexes.filter(data => data.name.toLowerCase() === $event.value.toLowerCase());
        if (dupplicateName.length > 0) {
            return false;
        }
        return true;
    }

    setDataBeforeSave(): boolean {
        if (isNullOrUndefined(this.defaultDate) && this.checkboxVisible) {
            return false;
        }
        this.isAddNew = true;
        this.emitterAddNewState.emit(this.isAddNew);
        const date = this.convert(this.defaultDate);
        this.insertLandesIndex.name = this.txtLandesIndex.trim();
        this.modelWert.ikLandesindexID = this.ikLandesindexID;
        this.modelWert.monat = parseInt(date.split('.')[1], 10);
        this.modelWert.jahr = parseInt(date.split('.')[0], 10);
        return true;
    }

    // Handle close/refresh the tab
    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        if (this.isOnInput) {
            return false;
        }
    }

    onShowing(e: any) {
        const overlayContent = e.component.overlayContent();
        overlayContent.addClass('kw-popup--center');
    }

    onHidden(e: any) {
        const overlayContent = e.component.overlayContent();
        overlayContent.removeClass('kw-popup--center');
    }

}
