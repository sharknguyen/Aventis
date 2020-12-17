import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LandesxindexSandbox } from '@app/kiss4-modul-konfiguration/landesxindex/landesxindex.sandbox';
import { LandesindexService } from '@app/kiss4-modul-konfiguration/landesxindex/landesxindex.service';
import { LandesindexApiClient } from '@app/kiss4-modul-konfiguration/landesxindex/landesxindexApiClient.service';
import { reducers } from '@app/kiss4-modul-konfiguration/landesxindex/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { LayoutsAdapterService } from '@shared/layouts/layoutsAdapter.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {
  DxContextMenuModule,
  DxFilterBuilderModule,
  DxTreeListModule,
  DxValidationGroupModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { DxAutocompleteModule } from 'devextreme-angular/ui/autocomplete';
import { DxBoxModule } from 'devextreme-angular/ui/box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxiValidationRuleModule } from 'devextreme-angular/ui/nested/validation-rule-dxi';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxPopoverModule } from 'devextreme-angular/ui/popover';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxTreeViewModule } from 'devextreme-angular/ui/tree-view';

import { IndexwerteErfassenComponent } from './components/indexwerte-erfassen/indexwerte-erfassen.component';
import { LandesindexErfassenComponent } from './components/landesindex-erfassen/landesindex-erfassen.component';
import { LandesxindexDetailComponent } from './components/landesxindex-detail/landesxindex-detail.component';
import { LandesxindexListComponent } from './components/landesxindex-list/landesxindex-list.component';
import { LandesindexComponent } from './containers/landesxindex/landesxindex.component';
import { LandesindexRoutingModule } from './landesxindex-routing.module';
import { LandesxindexesEffects } from './store/effects/landesxindex.effect';

// register providers

const DxUiModule = [
  DxToolbarModule,
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
  DxDateBoxModule,
  DxTreeListModule,
  DxFilterBuilderModule,
  DxTreeViewModule,
  DxContextMenuModule,
  DxValidationGroupModule,
  DxValidatorModule,
  DxiValidationRuleModule
];

const LandesindexComponents: any[] = [
  LandesindexComponent,
  LandesindexErfassenComponent,
  LandesxindexListComponent,
  IndexwerteErfassenComponent,
  LandesxindexDetailComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SimpleNotificationsModule,
    SharedComponentModule,
    LayoutContainersModule,
    DxUiModule,
    StoreModule.forFeature(AppEnums.FeatureModule.landesxindex, reducers),
    EffectsModule.forFeature([LandesxindexesEffects]),
    LandesindexRoutingModule
  ],
  declarations: [...LandesindexComponents],
  providers: [
    LandesindexApiClient,
    LandesindexService,
    LandesxindexSandbox,
    LayoutsAdapterService,
  ]
})
export class LandesxindexModule { }
