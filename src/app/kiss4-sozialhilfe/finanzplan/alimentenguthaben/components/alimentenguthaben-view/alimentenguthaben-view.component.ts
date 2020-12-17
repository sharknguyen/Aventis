import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de-CH';
import localeEn from '@angular/common/locales/en-CH';
import localeFr from '@angular/common/locales/fr-CH';
import localeIt from '@angular/common/locales/it-CH';
import { Component, EventEmitter, Injector, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import * as utilites from '@shared/utilites';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { isEmpty } from 'lodash-es';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Alimentenguthaben } from '../../models';
import { isNullOrUndefined } from 'util';
registerLocaleData(localeDe, 'de-CH');
registerLocaleData(localeFr, 'fr-CH');
registerLocaleData(localeEn, 'en-CH');
registerLocaleData(localeIt, 'it-CH');

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
    save = 'save'
}
@Component({
    selector: 'kiss-alimentenguthaben-view',
    templateUrl: './alimentenguthaben-view.component.html',
    styleUrls: ['./alimentenguthaben-view.component.scss']
})
export class AlimentenguthabenViewComponent extends BaseComponent implements OnInit, OnDestroy, OnChanges {

    @Input() showTitleDetail: boolean;
    @Input() dataSource: any;
    displayBeschreibung = '';
    @Input() inkassoSelectbox: any;
    @Input() shortcutAction: BehaviorSubject<string>;
    @Output() action = new EventEmitter<{ actionName: string, data?: any }>();
    @Input() permis: boolean;
    @Input() checkConcurrency: boolean;
    dataNew = new Alimentenguthaben(null);
    constructor(injector: Injector, public translateService: TranslateService) {
        super(injector);
        locale(UtilityHelper.getLanguageCodeFromLocalStorage());
    }

    subscription: Subscription;
    CommonBtn = [...CommonConstant.AdditionalButtons];
    customizeBtn = [
        {
            text: 'Aliment.Detail.Neues',
            disabled: false,
            name: Code.neue,
            icon: 'plus',
            class: 'i004-button'
        },
        {
            text: 'Aliment.Detail.Bearbeiten',
            disabled: false,
            name: Code.bearbeiten,
            icon: 'edit',
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

    ngOnInit() {

    }
    ngOnChanges() {
        if (isEmpty(this.dataSource)) {
            this.customizeBtn[1].disabled = true;
            this.customizeBtn[2].disabled = true;
        } else {
            this.customizeBtn[1].disabled = false;
            this.customizeBtn[2].disabled = false;
        }
        if (this.permis) {
            this.customizeBtn[0].disabled = false;
        } else {
            this.customizeBtn[0].disabled = true;
            this.customizeBtn[1].disabled = true;
            this.customizeBtn[2].disabled = true;
        }
        if (this.checkConcurrency) {
            this.customizeBtn[2].disabled = true;
        }
        this.customizeBtn = [...this.customizeBtn];
    }

    ngOnDestroy() {
    }

    //#region "toolbar event"
    toolBarOnItemClick(actionName) {
        if (actionName === Code.neue) {
            this.action.next({ actionName, data: this.dataNew });
        } else if (actionName === Code.bearbeiten) {
            this.action.next({ actionName, data: this.dataSource });
        } else if (actionName === Code.deleteMenuItemTopGrd) {
            if (this.customizeBtn[2].disabled === false) {
                this.action.next({ actionName, data: this.dataSource });
            }
        }
    }
    screenByWidthSize(width) {
        return utilites.getSizeQualifier(width);
    }
}
