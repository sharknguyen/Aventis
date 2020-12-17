import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { AppEnums } from '@shared/AppEnum';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {
  DxBoxModule, DxButtonModule, DxPopupModule,
  DxToolbarModule, DxFormModule, DxSelectBoxModule,
  DxTextAreaModule, DxTextBoxModule, DxValidationGroupModule,
  DxValidatorModule, DxDateBoxModule, DxCheckBoxModule, DxDataGridModule, DxScrollViewModule, DxFilterBuilderModule
} from 'devextreme-angular';
import { RegularerFinanzplanComponent } from '@app/kiss4-sozialhilfe/regularer-finanzplan/containers/regularer-finanzplan.component';
import { RegularerFinanzplanFormComponent } from '@app/kiss4-sozialhilfe/regularer-finanzplan/components/regularer-finanzplan-form/regularer-finanzplan-form.component';
import { HeaderBarComponent } from '@app/kiss4-sozialhilfe/regularer-finanzplan/components/header-bar/header-bar.component';
import { RegularerFinanzplanViewComponent } from '@app/kiss4-sozialhilfe/regularer-finanzplan/components/regularer-finanzplan-view/regularer-finanzplan-view.component';
import { RegularerBeendenPopupComponent } from '@app/kiss4-sozialhilfe/regularer-finanzplan/components/regularer-beenden-popup/regularer-beenden-popup.component';
import { RegularerVerlaufPopupComponent } from '@app/kiss4-sozialhilfe/regularer-finanzplan/components/regularer-verlauf-popup/regularer-verlauf-popup.component';
import { RegularerFinanzplanRoutingModule } from '@app/kiss4-sozialhilfe/regularer-finanzplan/regularer-finanzplan-routing.module';
import { RegularerFinanzplanApiClient } from '@app/kiss4-sozialhilfe/regularer-finanzplan/regularer-finanzplan-ApiClient.service';
import { RegularerFinanzplanService } from '@app/kiss4-sozialhilfe/regularer-finanzplan/regularer-finanzplan.service';
import { RegularerFinanzplanEffects } from '@app/kiss4-sozialhilfe/regularer-finanzplan/store/effects/regularer-finanzplan.effects';
import { RegularerFinanzplanSandbox } from '@app/kiss4-sozialhilfe/regularer-finanzplan/regularer-finanzplan.sandbox';
import { reducers } from '@app/kiss4-sozialhilfe/regularer-finanzplan/store';
import { DlgBewilligungModule } from '@app/kiss4-sozialhilfe/shared/component/dlgBewilligung/dlgBewilligung.module';


const DxUiModule = [
  DxBoxModule,
  DxButtonModule,
  DxFormModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxValidationGroupModule,
  DxValidatorModule,
  DxDateBoxModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxScrollViewModule,
  DxFilterBuilderModule
];

const components: any[] = [
  RegularerFinanzplanComponent,
  RegularerFinanzplanFormComponent,
  HeaderBarComponent,
  RegularerFinanzplanViewComponent,
  RegularerBeendenPopupComponent,
  RegularerVerlaufPopupComponent
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
    RegularerFinanzplanRoutingModule,
    DlgBewilligungModule,
    StoreModule.forFeature(AppEnums.FeatureModule.regularerFinanzplan, reducers),
    EffectsModule.forFeature([RegularerFinanzplanEffects])
  ],
  declarations: [...components],
  providers: [
    RegularerFinanzplanApiClient,
    RegularerFinanzplanService,
    RegularerFinanzplanSandbox,
    DatePipe,
  ],
})
export class RegularerFinanzplanModule { }
