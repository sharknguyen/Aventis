import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { reducers } from '@app/kiss4-basis/demographieH/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {
    DxAutocompleteModule,
    DxBoxModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxDataGridModule,
    DxFilterBuilderModule,
    DxFormModule,
    DxNumberBoxModule,
    DxPopoverModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxScrollViewModule,
} from 'devextreme-angular';

import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { DemografieRoutingModule } from './demographieH-routing.module';
import { DemografieSandbox } from './demographieH.sandbox';
import { DemografieService } from './demographieH.service';
import { DemografieApiClient } from './demographieHApiClient.service';
import { DemografieEffects } from './store/effects/demographieH.effects';
import { DemografieHistoryComponent } from './containers/demographieH.component';
import { DemografieHistoryDetailComponent } from './components/demographieH-detail/demographieH-detail.component';

const DxUiModule = [
    DxDataGridModule,
    DxTextBoxModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxAutocompleteModule,
    DxFormModule,
    DxPopupModule,
    DxBoxModule,
    DxPopoverModule,
    DxToolbarModule,
    DxFilterBuilderModule,
    DxScrollViewModule,
];

const containers: any[] = [
    DemografieHistoryComponent,
    DemografieHistoryDetailComponent,
];
@NgModule({
    imports: [
        CommonModule,
        DxUiModule,
        TranslateModule,
        SimpleNotificationsModule,
        ReactiveFormsModule,
        SharedComponentModule,
        LayoutContainersModule,
        DemografieRoutingModule,
        StoreModule.forFeature(AppEnums.FeatureModule.demografie, reducers),
        EffectsModule.forFeature([DemografieEffects])
    ],
    declarations: [...containers],
    exports: [...containers],
    providers: [
        DemografieService,
        DemografieSandbox,
        DemografieApiClient,
    ]
})
export class DemografieModule { }
