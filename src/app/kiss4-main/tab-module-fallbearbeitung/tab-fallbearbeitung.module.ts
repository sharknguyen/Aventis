import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FaModulTreeModule } from '@app/kiss4-fallfuhrung/fa-modul-tree/fa-modul-tree.module';
import { SozialhilfeModulTreeModule } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.module';
import { FallfuhrungTreeModule } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { reducers } from './store';
import { TabModuleFallbearbeitungEffects } from './store/effects/tab-module-fallbearbeitung.effects';
import { TabModuleFallbearbeitungSandbox } from './tab-module-fallbearbeitung.sandbox';
import { TabModuleFallbearbeitungService } from './tab-module-fallbearbeitung.service';
import { TabModuleFallbearbeitungComponent } from './tab-module-fallbearbeitung/tab-module-fallbearbeitung.component';
import { TabModuleFallbearbeitungApiClient } from './tab-module-fallbearbeitungApiClient.service';


const Components: any[] = [
    TabModuleFallbearbeitungComponent
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        SimpleNotificationsModule,
        SharedComponentModule,
        StoreModule.forFeature(AppEnums.FeatureModule.tabModuleFallbearbeitung, reducers),
        EffectsModule.forFeature([TabModuleFallbearbeitungEffects]),
        FallfuhrungTreeModule,
        FaModulTreeModule,
        SozialhilfeModulTreeModule
    ],
    declarations: [...Components],
    providers: [
        TabModuleFallbearbeitungService,
        TabModuleFallbearbeitungSandbox,
        TabModuleFallbearbeitungApiClient,
    ],
    exports: [...Components]
})
export class TabModuleFallbearbeitungModule { }
