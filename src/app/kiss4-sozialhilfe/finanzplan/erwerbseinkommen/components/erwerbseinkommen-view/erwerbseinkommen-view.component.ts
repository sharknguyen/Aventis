import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@shared/components/base.component';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { BehaviorSubject, Subscription } from 'rxjs';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeDe, 'de-CH');
import localeDe from '@angular/common/locales/de-CH';
import { isEmpty } from 'lodash-es';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'kiss-erwerbseinkommen-view',
    templateUrl: './erwerbseinkommen-view.component.html',
    styleUrls: ['./erwerbseinkommen-view.component.scss']
})
export class ErwerbseinkommenViewComponent extends BaseComponent implements OnInit, OnDestroy, OnChanges {

    @Input() dataSource: any;
    @Input() concurrency: boolean;
    @Input() shortcutAction: BehaviorSubject<string>;
    @Output() action = new EventEmitter<{ actionName: string, data?: any }>();
    @Input() permistion: any;

    constructor(injector: Injector, public translateService: TranslateService ) {
        super(injector);
        locale(UtilityHelper.getLanguageCodeFromLocalStorage());
    }
    displayBeschreibung = '';
    showcontent: boolean;
    subscription: Subscription;
    formWidth: number;
    customizeBtn = [
        {
            text: 'Erwerbseinkommen.View.NeuesErwerbseinkommen',
            disabled: false,
            name: 'neue-erwerbseinkommen',
            icon: 'plus',
            class: 'i003-button'
        },
        {
            text: 'Erwerbseinkommen.View.Bearbeiten',
            disabled: false,
            name: 'bearbeiten',
            icon: 'edit',
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
        this.formWidth = window.screen.width - 424;
    }

    ngOnChanges() {
        this.showcontent = true;
        if (isEmpty(this.dataSource)) {
            this.customizeBtn[1]['disabled'] = true;
            this.customizeBtn[2]['disabled'] = true;
        } else {
            this.customizeBtn[1]['disabled'] = false;
            this.customizeBtn[2]['disabled'] = false;
        }
        if (this.permistion) {
            this.customizeBtn[0]['disabled'] = false;
        } else {
            this.customizeBtn[0]['disabled'] = true;
            this.customizeBtn[1]['disabled'] = true;
            this.customizeBtn[2]['disabled'] = true;
        }
        if (this.concurrency) {
            this.customizeBtn[2]['disabled'] = true;
        }
        this.customizeBtn = [...this.customizeBtn];

        if (!isNullOrUndefined(this.dataSource.Bemerkung) && !isNullOrUndefined(this.dataSource.Bemerkung)) {
            this.displayBeschreibung = '';
            if (this.dataSource.Bemerkung !== '') {
              const strArr = this.dataSource.Bemerkung.split('');
              for (let i = 0; i < strArr.length; i++) {
                if (strArr[i] === '\n') {
                  strArr[i] = '<br>';
                }
                this.displayBeschreibung = this.displayBeschreibung + strArr[i];
              }
            } else {
              this.displayBeschreibung = '<br><br>';
            }
          }
    }

    ngOnDestroy() {

    }

    //#region "toolbar event"
    toolBarOnItemClick(actionName) {
        if (actionName !== 'deleteMenuItemTopGrd' || !this.concurrency) {
            this.action.next({ actionName });
        }
    }
}
