import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
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
  DxToolbarModule,
  DxValidationGroupModule,
  DxValidatorModule,
} from 'devextreme-angular';

import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { VermogenDetailEditComponent } from './components/vermogen-detail-edit/vermogen-detail-edit.component';
import { VermogenDetailViewComponent } from './components/vermogen-detail-view/vermogen-detail-view.component';
import { VermogenListComponent } from './components/vermogen-list/vermogen-list.component';
import { VermogenComponent } from './containers/vermogen.component';
import { reducers } from './store';
import { VermogenEffects } from './store/effects/vermogen.effect';
import { VermogenSandbox } from './vermogen.sandbox';
import { VermogenApiClient } from './vermogenApiClient.service';

const Components: any[] = [
  HeaderBarComponent,
  VermogenComponent,
  VermogenListComponent,
  VermogenDetailViewComponent,
  VermogenDetailEditComponent
];

const routes: Routes = [
  {
    path: '',
    component: VermogenComponent,
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
    StoreModule.forFeature(AppEnums.FeatureModule.vermogen, reducers),
    EffectsModule.forFeature([VermogenEffects])
  ],
  declarations: [...Components],
  providers: [
    VermogenSandbox,
    VermogenApiClient
  ]
})
export class VermogenModule { }
