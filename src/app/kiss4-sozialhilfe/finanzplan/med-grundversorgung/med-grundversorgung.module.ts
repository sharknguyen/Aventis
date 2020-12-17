import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppEnums } from '@shared/AppEnum';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { MedGrundversorgungRoutingModule } from './med-grundversorgung-routing.module';
import { DxValidationGroupModule, DxValidatorModule, DxTooltipModule } from 'devextreme-angular';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxTreeListModule } from 'devextreme-angular/ui/tree-list';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
import { DxFilterBuilderModule } from '@node_modules/devextreme-angular';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxProgressBarModule } from 'devextreme-angular';

import { DxNumberBoxModule } from 'devextreme-angular';

import {
  FormDetailComponent,
} from './components/detail/detail-component';

import {
  FormDetailEditComponent,
} from './components/detail-edit/detail-edit-component';

import {
  FormDetailViewComponent,
} from './components/detail-view/detail-view-component';

import {
  MedGrundversorgungComponent
} from './containers/med-grundversorgung-component';
import { MedGrundversorgungEffects } from './store/efffects/med-grundversorgung.effect';
import { MedGrundversorgungSandbox } from './med-grundversorgung.sandbox';
import { MedGrundversorgungApiClient } from './med-grundversorgungApiClient.service';
import { MedGrundversorgungService } from './med-grundversorgung.service';

const DxUiModule = [
  DxValidationGroupModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxTreeListModule,
  DxDataGridModule,
  DxSelectBoxModule,
  DxButtonModule,
  DxCheckBoxModule,
  DxFormModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxTextAreaModule,
  DxToolbarModule,
  DxDropDownBoxModule,
  DxFilterBuilderModule,
  DxPopupModule,
  DxProgressBarModule,
  DxNumberBoxModule,
  DxValidatorModule,
  DxTooltipModule,
];

const MedGrundversorgungComponents: any[] = [
  MedGrundversorgungComponent,
  FormDetailComponent,
  FormDetailEditComponent,
  FormDetailViewComponent
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
    MedGrundversorgungRoutingModule,
    EffectsModule.forFeature([MedGrundversorgungEffects])
  ],
  declarations: [...MedGrundversorgungComponents],
  providers: [
    MedGrundversorgungApiClient,
    MedGrundversorgungService,
    MedGrundversorgungSandbox
  ]
})

export class MedGrundversorgungModule { }
