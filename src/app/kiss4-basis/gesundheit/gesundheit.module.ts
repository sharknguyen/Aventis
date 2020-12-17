import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DxBoxModule } from 'devextreme-angular/ui/box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxFilterBuilderModule } from 'devextreme-angular/ui/filter-builder';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxTooltipModule } from 'devextreme-angular/ui/tooltip';
import { DxTreeViewModule } from 'devextreme-angular/ui/tree-view';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { GesundheitEditComponent } from './components/gessundheit-edit/gesundheit-edit.component';
import { GesundheitViewComponent } from './components/gesundheit-view/gesundheit-view.component';
import { GesundheitComponent } from './containers/gesundheit.component';
import { GesundheitRoutingModule } from './gesundheit-routing.module';


const DxUiModule = [
  DxBoxModule,
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
  DxNumberBoxModule,
  DxPopupModule,
  DxCheckBoxModule
];

const components: any[] = [
    GesundheitComponent,
    GesundheitEditComponent,
    GesundheitViewComponent
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
    GesundheitRoutingModule
  ],
  declarations: [...components],
  providers: [
  ]
})
export class GesundheitModule { }
