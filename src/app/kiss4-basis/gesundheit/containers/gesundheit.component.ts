import { Component, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@shared/components/base.component';
import { getLanguageCodeFromLocalStorage } from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';

@Component({
    selector: 'kiss-gesundheit',
    templateUrl: './gesundheit.component.html',
    styleUrls: ['./gesundheit.component.scss']
})

export class GesundheitComponent extends BaseComponent {

    constructor(
        injector: Injector,
        public translateService: TranslateService
    ) {
        super(injector);
        locale(getLanguageCodeFromLocalStorage());
    }

    isViewMode = true;
    

    customizeBtn = [
        {
            text: 'Gesundheit.Button.NeueVersicherung',
            visible: true,
            name: 'neue-versicherung',
            icon: 'add'
        },
        {
            text: 'Gesundheit.Button.Bearbeiten',
            visible: true,
            name: 'bearbeiten',
            icon: 'edit'
        },
        {
            text: 'Gesundheit.Button.PramieBerechnen',
            visible: false,
            name: 'pramie-berechnen'
        },
        {
            text: 'Gesundheit.Button.Speichern',
            visible: false,
            name: 'speichern',
            icon: 'floppy'
        },
        {
            text: 'Gesundheit.Button.Abbrechen',
            visible: false,
            name: 'abbrechen',
            icon: 'close'
        },
        {
            text: 'Gesundheit.Button.Loschen',
            useSubmitBehavior: true,
            locateInMenu: 'always',
            name: 'deleteMenuItemTopGrd',
            visible: true
        }
    ];


    toolBarOnItemClick(event: string) {
        switch (event) {
            case 'neue-versicherung':
                this.isViewMode = false
                this.changeStatusBtn(this.isViewMode);
                break;
            case 'bearbeiten':
                this.isViewMode = false
                this.changeStatusBtn(this.isViewMode);
                break;
            case 'pramie-berechnen':
                
                break;
            case 'speichern':
                this.isViewMode = true;
                this.changeStatusBtn(this.isViewMode);
                break;
            case 'abbrechen':
                this.isViewMode = true;
                this.changeStatusBtn(this.isViewMode);
                break;
            case 'deleteMenuItemTopGrd':
                break;
            default:
                break;
        }
    }

    changeStatusBtn(status: boolean) {
        if (status) {
            this.customizeBtn[0].visible = true;
            this.customizeBtn[1].visible = true;
            this.customizeBtn[2].visible = false;
            this.customizeBtn[3].visible = false;
            this.customizeBtn[4].visible = false;
            this.customizeBtn[5].visible = true;
        }else {
            this.customizeBtn[0].visible = false;
            this.customizeBtn[1].visible = false;
            this.customizeBtn[2].visible = true;
            this.customizeBtn[3].visible = true;
            this.customizeBtn[4].visible = true;
            this.customizeBtn[5].visible = true;
        }
        this.customizeBtn = [...this.customizeBtn];
    }

}