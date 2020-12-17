import { Component, EventEmitter, HostListener, Injector, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BgPosition } from '@app/kiss4-sozialhilfe/finanzplan/vermogen/models/vermogen.model';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { getLanguageCodeFromLocalStorage, isClearNumberBox, getSizeQualifier } from '@shared/utilites/utilityHelpers';
import { DxSelectBoxComponent, DxValidationGroupComponent } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { isEqual } from 'lodash-es';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
    selector: 'kiss-vermogen-detail-edit',
    templateUrl: './vermogen-detail-edit.component.html',
    styleUrls: ['./vermogen-detail-edit.component.scss']
})
export class VermogenDetailEditComponent extends BaseComponent implements OnInit, OnDestroy {
    @ViewChild('validationVermogen') validationVermogen: DxValidationGroupComponent;
    @ViewChild('artDesVermogens') artDesVermogens: DxSelectBoxComponent;
    @ViewChild('person') person: DxSelectBoxComponent;
    @Output() action = new EventEmitter<{ actionName: string, data?: any }>();
    @Input() expandDetail: boolean;
    @Input() isEditMode: any;
    @Input() dataSelectBoxPerson: any;
    @Input() dataSelectBoxArtDesVermogen: any;
    @Input() shortcutAction: BehaviorSubject<string>;
    @Input() freibetrag: any;
    @Input() angerechnet: any;
    @Input() set dataSource(value: any) {
        this._data = value;
        if (isEqual(this._data, {})) {
            this._data.Betrag = 0;
            this._data.Verbrauch = null;
        }
        this.oldData = Object.assign({}, this._data);
    }
    _data: BgPosition = new BgPosition();
    oldData: BgPosition = new BgPosition();

    // Arrow key from
    accessKeyItemFocused = 0;
    keyFocus: string;
    keyInput: string;
    getSizeQualifier = getSizeQualifier;
    formatNumber = AppEnums.Validation.C007_NUMBER_FORMAT;

    minNumber = AppEnums.Money.MIN_VALUE;
    maxNumber = AppEnums.Money.MAX_VALUE;

    constructor(injector: Injector, public translateService: TranslateService, ) {
        super(injector);
        locale(getLanguageCodeFromLocalStorage());
    }

    subscription: Subscription;
    CommonBtn = [...CommonConstant.AdditionalButtons];
    listBtn = [[], [{
        locateInMenu: 'always',
        text: 'KissCommonBtn.Loschen',
        name: 'deleteMenuItemTopGrd',
        hint: this.translateService.instant('KissCommonBtn.Loschen'),
        visible: true,
        disabled: true
    }]];
    customizeBtn = [
        {
            text: 'Vermogen.Speichern',
            hint: this.translateService.instant('Vermogen.Speichern'),
            visible: true,
            name: 'speichern',
            disabled: false,
            icon: 'save',
            class: 'i006_button'
        },
        {
            text: 'Vermogen.Abbrechen',
            hint: this.translateService.instant('Vermogen.Abbrechen'),
            visible: true,
            name: 'abbrechen',
            icon: 'close',
            class: 'i006_button'
        }
    ];

    ngOnInit() {
        this.subscription = this.shortcutAction.subscribe(action => {
            this.toolBarOnItemClick(action);
        });
    }

    ngOnDestroy() {

    }

    isDisable(btnName) {
        const customBtn = this.customizeBtn.filter(x => x.name === btnName)[0];
        if (customBtn) {
            return customBtn.disabled;
        }
        let flag = false;
        this.listBtn.forEach(lst => {
            lst.forEach(btn => {
                if (btn.name === btnName) {
                    flag = btn.disabled;
                }
            });
        });
        return flag;
    }

    toolBarOnItemClick(actionName: string) {
        switch (actionName) {
            case 'speichern': // save
                if (!Object.keys(this.oldData).length) {
                    let isDataNull = true;
                    Object.keys(this._data).forEach(key => { if (this._data[key]) { isDataNull = false; } });
                    if (isDataNull) {
                        this.action.emit({ actionName: 'abbrechen' });
                        return;
                    }
                }
                if (this.validationVermogen.instance.validate().isValid) {
                    this._data.Bemerkung = this._data.Bemerkung ? this._data.Bemerkung.toString().trim() : '';
                    this.action.emit({ actionName, data: this._data });
                    return;
                }
                this.action.emit({ actionName: 'form-invalid' });
                break;
            case 'abbrechen': // cancel
                if (isEqual(this.oldData, this._data)) {
                    this.action.emit({ actionName });
                    return;
                }
                if (Object.keys(this.oldData).length) {
                    this.action.emit({ actionName: 'dirty-form-edit' });
                    return;
                }
                this.action.emit({ actionName: 'dirty-form-new' });
                break;
            case 'deleteMenuItemTopGrd': // delete
                return !this.isDisable('deleteMenuItemTopGrd') && this.action.emit({ actionName, data: this._data });
            case CommonConstant.EventClickTitle:
                this.action.emit({ actionName: CommonConstant.EventClickTitle });
                break;
            default:
                break;
        }
    }

    onFocusIn(element, field: string, key) {
        this.keyFocus = field;
        this.keyInput = key;
        this.accessKeyItemFocused = element.accessKey;
    }

    onFocusOut() {
        this.accessKeyItemFocused = 0;
    }

    onInitInstitution(e) {
        setTimeout(() => {
            this.person.instance.focus();
        });
    }

    onFormKeyDown(e, key: string) {
        if ((this.keyFocus === 'artDesVermogens' || this.keyFocus === 'person') && (e.event.keyCode === AppEnums.KeyCode.KeyF4)) {
            e.event.preventDefault();
            if (this.keyFocus === 'artDesVermogens') {
                this.artDesVermogens.opened = !this.artDesVermogens.opened;
            }
            if (this.keyFocus === 'person') {
                this.person.opened = !this.person.opened;
            }
        }
        if (e.event.keyCode === AppEnums.KeyCode.UpArrowKey) {
            e.event.preventDefault();
            const em = new KeyboardEvent('keyup', {
                bubbles: true,
                cancelable: true,
                key: 'ArrowUp',
            });
            document.dispatchEvent(em);
        } else if (e.event.keyCode === AppEnums.KeyCode.DownArrowKey) {
            e.event.preventDefault();
            const em = new KeyboardEvent('keydown', {
                bubbles: true,
                cancelable: true,
                key: 'ArrowDown',
            });
            document.dispatchEvent(em);
        }
        // Clear number box
        if (isClearNumberBox(e)) {
            this._data[key] = 0;
            setTimeout(() => {
                this._data[key] = null;
            });
        }

    }

    /*** Arrow Key*/
    moveFocus(isNext: boolean) {
        const tagNames = ['input', 'dx-check-box', 'textarea'];
        for (const tagName of tagNames) {
            const elems = document.getElementsByTagName(tagName);
            for (const el of Array.from(elems)) {
                if (isNext) {
                    if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused + 1) {
                        (el as HTMLElement).focus();
                        return;
                    }
                } else {
                    if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused - 1) {
                        (el as HTMLElement).focus();
                        return;
                    }
                }
            }
        }
    }

    isDisableButtonConccurrency(status) {
        this.listBtn[1][0].disabled = status;
        this.customizeBtn[0].disabled = status;
        this.listBtn = [...this.listBtn];
        this.customizeBtn = [...this.customizeBtn];
    }

    disableButtonSave(status) {
        this.listBtn[1][0].disabled = status;
        this.listBtn = [...this.listBtn];
    }

    isDirtyForm() {
        this.blurAll();
        return (!isEqual(this.oldData, this._data));
    }

    blurAll() {
        const el = document.querySelector(':focus');
        if (el) {
            (el as HTMLElement).blur();
        }
    }

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification(event: any) {
        event.preventDefault();
        if (this.isDirtyForm() && this.isEditMode) {
            event.returnValue = '';
            return false;
        }
    }
}
