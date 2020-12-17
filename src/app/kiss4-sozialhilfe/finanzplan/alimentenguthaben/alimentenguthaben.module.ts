import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { StoreModule } from '@ngrx/store';
import {
    DxBoxModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxDataGridModule,
    DxFilterBuilderModule,
    DxFormModule,
    DxNumberBoxModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxValidationGroupModule,
    DxValidatorModule,
} from 'devextreme-angular';

import { AlimentenguthabenComponent } from './containers/alimentenguthaben.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { AlimentenguthabenViewComponent } from './components/alimentenguthaben-view/alimentenguthaben-view.component';
import { AlimentenguthabenEditComponent } from './components/alimentenguthaben-edit/alimentenguthaben-edit.component';
import { AlimentenguthabenRoutingModule } from './alimentenguthaben-rouring.module';
import { AlimentenguthabenApiClient } from './alimentenguthabenApiClient.service';
import { AlimentenguthabenSandbox } from './alimentenguthaben.sandbox';
import { AlimentenguthabenService } from './alimentenguthaben.service';
import { AppEnums } from '@shared/AppEnum';
import { reducers } from '@app/kiss4-sozialhilfe/finanzplan/alimentenguthaben/store/index';
import { AlimentenguthabenEffects } from './store/effects/alimentenguthaben.effects';
import { EffectsModule } from '@ngrx/effects';

const Components: any[] = [
    AlimentenguthabenComponent,
    HeaderBarComponent,
    AlimentenguthabenViewComponent,
    AlimentenguthabenEditComponent
];

const DxUiModule = [
    DxBoxModule, DxDataGridModule, DxToolbarModule,
    DxButtonModule, DxPopupModule,
    DxFilterBuilderModule,
    DxCheckBoxModule,
    DxFormModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxTextAreaModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxSelectBoxModule
];

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        AlimentenguthabenRoutingModule,
        SharedComponentModule,
        LayoutContainersModule,
        DxUiModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        StoreModule.forFeature(AppEnums.FeatureModule.alimentenguthaben, reducers),
        EffectsModule.forFeature([AlimentenguthabenEffects])
    ],
    declarations: [...Components],
    exports: [...Components],
    providers: [
        AlimentenguthabenApiClient,
        AlimentenguthabenSandbox,
        AlimentenguthabenService
    ]
})
export class AlimentenguthabenModule { }
