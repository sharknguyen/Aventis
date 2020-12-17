import { Component, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@shared/components/base.component';
import { getLanguageCodeFromLocalStorage } from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';

@Component({
    selector: 'kiss-gesundheit-edit',
    templateUrl: './gesundheit-edit.component.html',
    styleUrls: ['./gesundheit-edit.component.scss']
})

export class GesundheitEditComponent extends BaseComponent {

    constructor(
        injector: Injector,
        public translateService: TranslateService,
    ) {
        super(injector);
        locale(getLanguageCodeFromLocalStorage());
    }

}