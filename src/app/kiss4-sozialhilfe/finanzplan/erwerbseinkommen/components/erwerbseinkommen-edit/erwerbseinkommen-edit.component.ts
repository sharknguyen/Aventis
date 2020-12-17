import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild, HostListener, AfterViewInit, ElementRef, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxValidationGroupComponent, DxSelectBoxComponent, DxNumberBoxComponent } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { isEqual } from 'lodash-es';
import { AppEnums } from '@shared/AppEnum';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeDe, 'de-CH');
import localeDe from '@angular/common/locales/de-CH';
import * as utilites from '@shared/utilites';
import { isNullOrUndefined } from 'util';
import { isSelectedAll } from '@shared/utilites/utilityHelpers';


@Component({
    selector: 'kiss-erwerbseinkommen-edit',
    templateUrl: './erwerbseinkommen-edit.component.html',
    styleUrls: ['./erwerbseinkommen-edit.component.scss']
})
export class ErwerbseinkommenEditComponent extends BaseComponent implements OnInit, AfterViewInit, OnChanges {

    @Input() set dataSource(value: any) {
        this.data = value;
        this.oldData = Object.assign({}, this.data);
    }
    @Input() concurrency: boolean;
    @Input() persons: any;
    @Input() artDesEinkommens: any;
    @Output() action = new EventEmitter<{ actionName: string, data?: any }>();
    @Output() formError = new EventEmitter<{messager?: any}>();
    @Output() isDirtyForm: EventEmitter<boolean> = new EventEmitter();
    @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
    @ViewChild('nameVorname') nameVorname: DxSelectBoxComponent;
    @ViewChild('name') name: DxSelectBoxComponent;
    @ViewChild('uKBetrag') uKBetrag: DxNumberBoxComponent;
    @ViewChild('uKReduktion') uKReduktion: DxNumberBoxComponent;
    @ViewChild('betrag') betrag: DxNumberBoxComponent;

    data: any = {};
    oldData: any = {};
    numberboxFocus = false;
    constructor(injector: Injector, public translateService: TranslateService, private elementRef: ElementRef) {
        super(injector);
        locale(UtilityHelper.getLanguageCodeFromLocalStorage());
    }
    isErrorClosed: any;
    messageErr: any;
    minNumber = AppEnums.Money.MIN_VALUE;
    maxNumber = AppEnums.Money.MAX_VALUE;
    numberFormat: string = AppEnums.Validation.C007_NUMBER_FORMAT;
    CommonBtn = [...CommonConstant.AdditionalButtons];
    fieldName: '';
    valueChange: Boolean = false;
    itemSelect: any;
    formWidth: number;
    customizeBtn = [
        {
            text: this.translateService.instant('Erwerbseinkommen.View.Speichern'),
            visible: true,
            name: 'speichern',
            disabled: false,
            icon: 'save',
            class: 'i003-button'
        },
        {
            text: this.translateService.instant('Erwerbseinkommen.View.Abbrechen'),
            visible: true,
            name: 'abbrechen',
            icon: 'close',
            class: 'i003-button'
        },
        {
            text: 'BasisTextmarken.Button.Delete',
            useSubmitBehavior: true,
            locateInMenu: 'always',
            name: 'deleteMenuItemTopGrd',
            disabled: false,
            visible: true
        }
    ];

    ngOnInit() {
        this.isErrorClosed = false;
        this.formWidth = window.screen.width - 424;
    }
    ngOnChanges() {
        if (this.concurrency) {
            this.customizeBtn[0]['disabled'] = true;
            this.customizeBtn[2]['disabled'] = true;
        } else {
            this.customizeBtn[0]['disabled'] = false;
            this.customizeBtn[2]['disabled'] = false;
        }
        this.customizeBtn = [...this.customizeBtn];
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.nameVorname.instance.focus();
        });
    }
    onCloseError() {
        this.isErrorClosed = false;
    }

    changeValue(event) {
        this.valueChange = true;
        this.isDirtyForm.next(true);
    }

    toolBarOnItemClick(actionName) {
        this.data.valueChange = this.valueChange;
        switch (actionName) {
            case 'speichern': // save
                if (this.valueChange) {
                    if (this.isFormValid()) {
                        if (this.data.Bemerkung) {
                            this.data.Bemerkung = this.data.Bemerkung.toString().trim();
                        }
                        this.action.next({ actionName, data: this.data });
                    }
                } else {
                    this.action.next({ actionName });
                }
                break;
            case 'abbrechen': // cancel
                if (this.valueChange && this.data.typeAction === 'edit') {
                    this.data.typeAction = 'cancel-edit';
                }
                this.action.next({actionName, data: this.data});
                break;
            case 'deleteMenuItemTopGrd': // delete
                if (!this.concurrency) {
                    if (this.data.typeAction === 'add') {
                        this.data.typeAction = 'cancelAdd';
                        this.action.next({actionName, data: this.data });
                    } else {
                        if (this.data.BgPositionID) {
                            this.data.typeAction = 'edit';
                        } else {
                            this.data.typeAction = 'add';
                        }
                        this.action.next({ actionName, data: this.data });
                    }
                }
                break;
            default:
                break;
        }
    }

    screenByWidthSize(width) {
        return utilites.getSizeQualifier(width);
    }

    selectContentReady(e) {
        if (isNullOrUndefined(this.data.BaPersonID) && this.persons && this.persons.length > 0) {
            this.persons[0].BaPersonID = -1;
            this.data.BaPersonID = -1;
            return;
        }
    }

    isFormValid() {
        if ( !this.validationGroup.instance.validate().isValid) {
            this.messageErr = this.translateService.instant('Erwerbseinkommen.Messager.MainFormError');
            this.formError.next(this.messageErr);
            if (!this.data.BaPersonID) {
                this.nameVorname.instance.focus();
                return false;
            }
            if (!this.data.BgPositionsartID) {
                this.name.instance.focus();
                return false;
            }
            if (!this.data.Betrag && this.data.Betrag !== 0) {
                this.betrag.instance.focus();
                return false;
            }
            if (!this.data.UKBetrag && this.data.UKBetrag !== 0) {
                this.uKBetrag.instance.focus();
                return false;
            }
            if (!this.data.UKReduktion && this.data.UKReduktion !== 0) {
                this.uKReduktion.instance.focus();
                return false;
            }
            return false;
        }
        return true;
    }

    onKeyDownSelectbox(e) {
        if (e.event.keyCode !== AppEnums.KeyCode.KeyF4) {
            return;
        }
        if (!(e.component.option('opened'))) {
            e.event.preventDefault();
            e.component.open();
        } else {
            e.component.close();
        }
    }

    numberboxFocusOut() {
        this.numberboxFocus = false;
    }

    isBackSpacePressed(event) {
        if (event.event.keyCode === AppEnums.KeyCode.BackSpace || event.event.keyCode === AppEnums.KeyCode.Delete) {
            return event.event.keyCode;
        }
    }

    onNumberboxKeyDown(event, fieldName) {
        if (this.isBackSpacePressed(event) && isSelectedAll(event)) {
            this.data[fieldName] = null;
        }
    }
}
