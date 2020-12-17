import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

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
  DxValidatorModule,
  DxValidationGroupModule,
  DxToolbarModule
} from 'devextreme-angular';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';

import { VersicherungsleistungenComponent } from './containers/versicherungsleistungen.component';
import { VersicherungsleistungenFormComponent } from './components/versicherungsleistungen-form/versicherungsleistungen-form.component';
import { VersicherungsleistungenViewComponent } from './components/versicherungsleistungen-view/versicherungsleistungen-view.component';
import { VersicherungsleistungenSandbox } from './versicherungsleistungen.sandbox';
import { VersicherungsleistungenService } from './versicherungsleistungen.service';
import { VersicherungsleistungenApiClient } from './versicherungsleistungenApiClient.service';
import { EffectsModule } from '@ngrx/effects';
import { VersicherungsleistungenEffects } from './store/effects/versicherungsleistungen.effects';
import { StoreModule } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';
import { reducers } from '@app/kiss4-sozialhilfe/finanzplan/versicherungsleistungen/store';

const Components: any[] = [
  VersicherungsleistungenComponent,
  HeaderBarComponent,
  VersicherungsleistungenFormComponent,
  VersicherungsleistungenViewComponent
];

const routes: Routes = [
  {
    path: '',
    component: VersicherungsleistungenComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
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
  DxValidationGroupModule
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild(routes),
    SharedComponentModule,
    LayoutContainersModule,
    DxUiModule,
    DxSelectBoxModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    EffectsModule.forFeature([VersicherungsleistungenEffects]),
    StoreModule.forFeature(AppEnums.FeatureModule.versicherungsleistungen, reducers)
  ],
  declarations: [...Components],
  exports: [...Components],
  providers: [
    VersicherungsleistungenSandbox,
    VersicherungsleistungenService,
    VersicherungsleistungenApiClient
  ]
})
export class VersicherungsleistungenModule {
}
