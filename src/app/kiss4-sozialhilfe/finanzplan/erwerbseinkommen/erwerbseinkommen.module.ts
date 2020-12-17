import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
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

import { ErwerbseinkommenApiClient } from './erwerbseinkommen.ApiClient.service';
import { ErwerbseinkommenService } from './erwerbseinkommen.service';
import { ErwerbseinkommenSanbox } from './erwerbseinkommen.sandbox';
import { reducers } from './store';
import { ErwerbseinkommenEffects } from './store/effects/erwerbseinkommen.effects';

import { ErwerbseinkommenComponent } from './containers/erwerbseinkommen.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { ErwerbseinkommenListComponent } from './components/erwerbseinkommen-list/erwerbseinkommen-list.component';
import { ErwerbseinkommenViewComponent } from './components/erwerbseinkommen-view/erwerbseinkommen-view.component';
import { ErwerbseinkommenEditComponent } from './components/erwerbseinkommen-edit/erwerbseinkommen-edit.component';
import { AppEnums } from '@shared/AppEnum';


const Components: any[] = [
  ErwerbseinkommenComponent,
  HeaderBarComponent,
  ErwerbseinkommenListComponent,
  ErwerbseinkommenViewComponent,
  ErwerbseinkommenEditComponent
];

const routes: Routes = [
  {
    path: '',
    component: ErwerbseinkommenComponent,
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
    StoreModule.forFeature(AppEnums.FeatureModule.erwerbseinkommen, reducers),
    EffectsModule.forFeature([ErwerbseinkommenEffects])
  ],
  declarations: [...Components],
  providers: [
    ErwerbseinkommenApiClient,
    ErwerbseinkommenService,
    ErwerbseinkommenSanbox
  ]
})
export class ErwerbseinkommenModule { }
