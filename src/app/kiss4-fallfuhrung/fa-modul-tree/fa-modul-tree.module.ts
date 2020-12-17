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

import { FaModulTreeSandbox } from './fa-modul-tree.sandbox';
import { FaModulTreeService } from './fa-modul-tree.service';
import { FaModulTreeComponent } from './fa-modul-tree/fa-modul-tree.component';
import { FaModulTreeApiClient } from './fa-modul-treeApiClient.service';
import { reducers } from './store';
import { FaModulTreeEffects } from './store/effects/fa-modul-tree.effects';

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
  FaModulTreeComponent
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SimpleNotificationsModule,
    ReactiveFormsModule,
    SharedComponentModule,
    StoreModule.forFeature(AppEnums.FeatureModule.faModulTree, reducers),
    EffectsModule.forFeature([FaModulTreeEffects]),
    DxUiModule,
  ],
  declarations: [...Components],
  providers: [
    FaModulTreeService,
    FaModulTreeSandbox,
    FaModulTreeApiClient,
    DatePipe,
    FallNavsSandbox
  ],
  exports: [...Components]
})
export class FaModulTreeModule { }
