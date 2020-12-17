import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DxCheckBoxModule, DxPopupModule, DxRadioGroupModule, DxTagBoxModule } from 'devextreme-angular';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxFilterBuilderModule } from 'devextreme-angular/ui/filter-builder';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxTooltipModule } from 'devextreme-angular/ui/tooltip';
import { DxTreeViewModule } from 'devextreme-angular/ui/tree-view';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { KasseSandbox } from './kasse.sandbox';
import { KasseService } from './kasse.service';
import { KasseApiClient } from './kasseApiClient.service';
import { reducers } from './store';
import { KasseEffects } from './store/effects/kasse.effects';
import { Routes, RouterModule } from '@angular/router';
import { DxiValidationRuleModule } from 'devextreme-angular/ui/nested/validation-rule-dxi';
import { KasseGridComponent } from './components/kasse-grid/kasse-grid.component';
import { KasseComponent } from './containers/kasse.component';
import { KasseDetailViewComponent } from './components/kasse-detail-view/kasse-view.component';
import { KasseEditComponent } from './components/kasse-detail-edit/kasse-edit.component';
import { KasseRoutingModule } from './kasse-routing.module';
import { KasseSearchComponent } from './components/kasse-search/kasse-search.component';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';

// register module devextreme
// register providers
const DxUiModule = [
  DxContextMenuModule,
  DxTreeViewModule,
  DxDataGridModule,
  DxDropDownBoxModule,
  DxDateBoxModule,
  DxSelectBoxModule,
  DxButtonModule,
  DxToolbarModule,
  DxTextBoxModule,
  DxTextAreaModule,
  DxFormModule,
  DxValidationGroupModule,
  DxTooltipModule,
  DxValidatorModule,
  DxFilterBuilderModule,
  DxCheckBoxModule,
  DxTagBoxModule,
  DxRadioGroupModule,
  DxPopupModule,
  DxiValidationRuleModule
];

const components: any[] = [
  KasseComponent,
  KasseDetailViewComponent,
  KasseEditComponent,
  KasseGridComponent,
  KasseSearchComponent
];

const routes: Routes = [
  {
    path: '',
    component: KasseComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SimpleNotificationsModule,
    DxUiModule,
    SharedComponentModule,
    LayoutContainersModule,
    KasseRoutingModule,
    StoreModule.forFeature(AppEnums.FeatureModule.kasse, reducers),
    EffectsModule.forFeature([KasseEffects]),
    RouterModule.forChild(routes),
    FroalaEditorModule,
    FroalaViewModule
  ],
  declarations: [...components],
  providers: [
    KasseApiClient,
    KasseService,
    KasseSandbox,
    LayoutSandbox
  ]
})
export class KasseModule { }
