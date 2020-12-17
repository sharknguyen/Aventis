import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, OnChanges, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { getSizeQualifier, getLanguageCodeFromLocalStorage, formatNumberByCulture } from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { BehaviorSubject, Subscription } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de-CH';
import localeEn from '@angular/common/locales/en-CH';
import localeFr from '@angular/common/locales/fr-CH';
import localeIt from '@angular/common/locales/it-CH';
import { cloneDeep } from 'lodash-es';

registerLocaleData(localeDe, 'de-CH');
registerLocaleData(localeFr, 'fr-CH');
registerLocaleData(localeEn, 'en-CH');
registerLocaleData(localeIt, 'it-CH');

@Component({
    selector: 'kiss-vermogen-detail-view',
    templateUrl: './vermogen-detail-view.component.html',
    styleUrls: ['./vermogen-detail-view.component.scss']
})
export class VermogenDetailViewComponent extends BaseComponent implements OnInit, OnDestroy, OnChanges {
    @Input() expandDetail: boolean;
    @Input() isEditMode: any;
    @Input() dataSource: any;
    @Input() shortcutAction: BehaviorSubject<string>;
    @Input() freibetrag: any;
    @Input() angerechnet: any;
    @Input() set bgFinanzplanID(value: number) {
        if (value) {
            this.listBtn = [[], [{
                locateInMenu: 'always',
                text: 'KissCommonBtn.Loschen',
                hint: this.translateService.instant('KissCommonBtn.Loschen'),
                name: 'deleteMenuItemTopGrd',
                visible: true,
                disabled: true
            }]];
            this.customizeBtn = [
                {
                    text: 'Vermogen.Neue-Vermogen',
                    hint: this.translateService.instant('Vermogen.Neue-Vermogen'),
                    disabled: this.disableEditBtn,
                    name: 'neue-vermogen',
                    icon: 'plus',
                    class: 'i006_button'
                },
                {
                    text: 'Vermogen.Bearbeiten',
                    hint: this.translateService.instant('Vermogen.Bearbeiten'),
                    disabled: this.disableEditBtn,
                    name: 'bearbeiten',
                    icon: 'edit',
                    class: 'i006_button'
                }
            ];
        }
    }
    @Input() set disableEditBtn(value: boolean) {
        this.setDisableEditBtn(value);
    }

    @Input() set disableButton(value: boolean) {
        this.isDisableButton(value);
    }
    @Output() action = new EventEmitter<{ actionName: string, data?: any }>();

    constructor(injector: Injector, public translateService: TranslateService, private cdr: ChangeDetectorRef) {
        super(injector);
        locale(getLanguageCodeFromLocalStorage());
    }

    subscription: Subscription = new Subscription();
    CommonBtn = [...CommonConstant.AdditionalButtons];
    listBtn = [[], [{
        locateInMenu: 'always',
        text: 'KissCommonBtn.Loschen',
        hint: this.translateService.instant('KissCommonBtn.Loschen'),
        name: 'deleteMenuItemTopGrd',
        visible: true,
        disabled: true
    }]];
    customizeBtn = [
        {
            text: 'Vermogen.Neue-Vermogen',
            hint: this.translateService.instant('Vermogen.Neue-Vermogen'),
            disabled: this.disableEditBtn,
            name: 'neue-vermogen',
            icon: 'plus',
            class: 'i006_button'
        },
        {
            text: 'Vermogen.Bearbeiten',
            hint: this.translateService.instant('Vermogen.Bearbeiten'),
            disabled: this.disableEditBtn,
            name: 'bearbeiten',
            icon: 'edit',
            class: 'i006_button'
        }
    ];

    getSizeQualifier = getSizeQualifier;
    valueReadOnly: any = {};

    ngOnInit() {
        this.subscription = this.shortcutAction.subscribe(action => {
            this.toolBarOnItemClick(action);
        });
    }

    ngOnChanges() {
        this.formatNumberWidthLanguage();
        this.subscription.add(this.translateService.onLangChange.subscribe((ln) => this.formatNumberWidthLanguage()));
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

    //#region "toolbar event"
    toolBarOnItemClick(actionName) {
        if (actionName === CommonConstant.EventClickTitle) {
            this.action.next({ actionName: CommonConstant.EventClickTitle });
            return;
        }
        this.action.next({ actionName, data: this.dataSource });
    }

    setDisableEditBtn(status) {
        this.customizeBtn[0].disabled = status;
        this.customizeBtn[1].disabled = status;
        this.listBtn[1][0].disabled = status;
        this.customizeBtn = [...this.customizeBtn];
        this.listBtn = [...this.listBtn];
    }

    isDisableButton(status) {
        this.customizeBtn[1].disabled = status;
        this.listBtn[1][0].disabled = status;
        this.customizeBtn = [...this.customizeBtn];
        this.listBtn = [...this.listBtn];
    }

    isDisableButtonConccurrency(status) {
        this.listBtn[1][0].disabled = status;
        this.listBtn = [...this.listBtn];
    }

    formatNumberWidthLanguage() {
        this.valueReadOnly.freibetrag = '';
        this.valueReadOnly.angerechnet = '';
        this.valueReadOnly.Betrag = '';
        this.valueReadOnly.Verbrauch = '';
        if (this.dataSource) {
            this.valueReadOnly.freibetrag = formatNumberByCulture(this.freibetrag);
            this.valueReadOnly.angerechnet = formatNumberByCulture(this.angerechnet);
            this.valueReadOnly.Betrag = formatNumberByCulture(this.dataSource.Betrag);
            this.valueReadOnly.Verbrauch = formatNumberByCulture(this.dataSource.Verbrauch);
        }
        locale(getLanguageCodeFromLocalStorage());
        this.cdr.detectChanges();
        this.cdr.markForCheck();
    }

}
