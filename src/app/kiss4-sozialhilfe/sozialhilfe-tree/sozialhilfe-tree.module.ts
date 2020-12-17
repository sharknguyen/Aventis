import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FallNavsSandbox } from '@app/kiss4-main/fall-navigator/fall-navigator.sandbox';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {
  DxButtonModule,
  DxCheckBoxModule,
  DxContextMenuModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxDropDownBoxModule,
  DxFilterBuilderModule,
  DxFormModule,
  DxPopoverModule,
  DxPopupModule,
  DxScrollViewModule,
  DxSelectBoxModule,
  DxToolbarModule,
  DxTooltipModule,
  DxTreeViewModule,
  DxValidationGroupModule,
} from 'devextreme-angular';

import { SozialhilfeTreeSandbox } from './sozialhilfe-tree.sandbox';
import { SozialhilfeTreeService } from './sozialhilfe-tree.service';
import { SozialhilfeTreeComponent } from './sozialhilfe-tree/sozialhilfe-tree.component';
import { SozialhilfeTreeApiClient } from './sozialhilfe-treeApiClient.service';
import { reducers } from './store';
import { SozialhilfeTreeEffects } from './store/effects/sozialhilfe-tree.effects';

const DxUiModule = [
  DxPopupModule,
  DxContextMenuModule,
  DxTreeViewModule,
  DxDataGridModule,
  DxDropDownBoxModule,
  DxDateBoxModule,
  DxSelectBoxModule,
  DxPopupModule,
  DxButtonModule,
  DxToolbarModule,
  DxFormModule,
  DxValidationGroupModule,
  DxTooltipModule,
  DxFilterBuilderModule,
  DxCheckBoxModule,
  DxScrollViewModule,
  DxPopoverModule,
];

const Components: any[] = [
  SozialhilfeTreeComponent
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SimpleNotificationsModule,
    ReactiveFormsModule,
    SharedComponentModule,
    StoreModule.forFeature(AppEnums.FeatureModule.sozialhilfeTree, reducers),
    EffectsModule.forFeature([SozialhilfeTreeEffects]),
    DxUiModule,
  ],
  declarations: [...Components],
  providers: [
    SozialhilfeTreeService,
    SozialhilfeTreeSandbox,
    SozialhilfeTreeApiClient,
    DatePipe,
    FallNavsSandbox
  ],
  exports: [...Components]
})
export class SozialhilfeModulTreeModule { }
