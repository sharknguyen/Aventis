import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {ZulagenEfbComponent} from './containers/zulagen-efb.component';
import {AuthGuard} from '@shared/guards/auth.guard';
import {CanDeactivateGuard} from '@shared/guards/canDeactivate.guard';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {LayoutContainersModule} from '@shared/layouts/layouts.module';
import {SharedComponentModule} from '@shared/components/shared-component.module';
import {HeaderBarComponent} from './components/header-bar/header-bar.component';
import {ZulagenEfbListComponent} from './components/zulagen-efb-list/zulagen-efb-list.component';
import {ZulagenEfbFormComponent} from './components/zulagen-efb-form/zulagen-efb-form.component';
import {ZulagenEfbViewComponent} from './components/zulagen-efb-view/zulagen-efb-view.component';
import {StoreModule} from '@ngrx/store';
import {AppEnums} from '@shared/AppEnum';
import {EffectsModule} from '@ngrx/effects';
import {ZulagenEFBEffect} from '@app/kiss4-sozialhilfe/finanzplan/zulagen-efb/store/effects/zulagen-efb.effect';
import {ZulagenEFBService} from '@app/kiss4-sozialhilfe/finanzplan/zulagen-efb/zulagen-efb.service';
import {ZulagenEFBSandbox} from '@app/kiss4-sozialhilfe/finanzplan/zulagen-efb/zulagen-efb.sandbox';
import {ZulagenEFBApiClient} from '@app/kiss4-sozialhilfe/finanzplan/zulagen-efb/zulagen-efbApiClient.service';
import {reducers} from '@app/kiss4-sozialhilfe/finanzplan/zulagen-efb/store';

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
  DxValidatorModule
} from 'devextreme-angular';


const Components: any[] = [
  ZulagenEfbComponent,
  HeaderBarComponent,
  ZulagenEfbListComponent,
  ZulagenEfbFormComponent,
  ZulagenEfbViewComponent
];

const routes: Routes = [
  {
    path: '',
    component: ZulagenEfbComponent,
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
    StoreModule.forFeature(AppEnums.FeatureModule.zulagen, reducers),
    EffectsModule.forFeature([ZulagenEFBEffect])
  ],
  declarations: [...Components],
  providers: [
    ZulagenEFBApiClient,
    ZulagenEFBService,
    ZulagenEFBSandbox,
  ]
})
export class ZulagenEfbModule {
}
