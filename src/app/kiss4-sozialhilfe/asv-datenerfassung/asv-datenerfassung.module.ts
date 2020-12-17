import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DxCheckBoxModule, DxPopupModule, DxRadioGroupModule, DxTagBoxModule } from 'devextreme-angular';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxFilterBuilderModule } from 'devextreme-angular/ui/filter-builder';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxiValidationRuleModule } from 'devextreme-angular/ui/nested/validation-rule-dxi';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxTooltipModule } from 'devextreme-angular/ui/tooltip';
import { DxTreeViewModule } from 'devextreme-angular/ui/tree-view';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';

import { AsvDatenerfassungRoutingModule } from './asv-datenerfassung-routing.module';
import { AsvDatenerfassungSandbox } from './asv-datenerfassung.sandbox';
import { AsvDatenerfassungService } from './asv-datenerfassung.service';
import { AsvDatenerfassungApiClient } from './asv-datenerfassungApiClient.service';
import {
  AsvDatenerfassungDetailditComponent,
} from './components/asv-datenerfassung-detail-edit/asv-datenerfassung-detail-edit.component';
import {
  AsvDatenerfassungDetailViewComponent,
} from './components/asv-datenerfassung-detail-view/asv-datenerfassung-detail-view.component';
import { AsvDatenerfassungGridComponent } from './components/asv-datenerfassung-grid/asv-datenerfassung-grid.component';
import { AsvDatenerfassungComponent } from './containers/asv-datenerfassung.component';
import { reducers } from './store';
import { AsvDatenerfassungEffects } from './store/effects/asv-datenerfassung.effects';

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
  AsvDatenerfassungComponent,
  AsvDatenerfassungGridComponent,
  AsvDatenerfassungDetailViewComponent,
  AsvDatenerfassungDetailditComponent
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
    AsvDatenerfassungRoutingModule,
    StoreModule.forFeature(AppEnums.FeatureModule.asvDatenerfassung, reducers),
    EffectsModule.forFeature([AsvDatenerfassungEffects]),
    FroalaEditorModule,
    FroalaViewModule
  ],
  declarations: [...components],
  providers: [
    AsvDatenerfassungApiClient,
    AsvDatenerfassungService,
    AsvDatenerfassungSandbox
  ]
})
export class AsvDatenerfassungModule { }


