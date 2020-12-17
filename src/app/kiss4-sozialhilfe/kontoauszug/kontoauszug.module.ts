import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {
  DxButtonModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxFilterBuilderModule,
  DxFormModule,
  DxLookupModule,
  DxSelectBoxModule,
  DxTagBoxModule,
  DxToolbarModule,
  DxValidationGroupModule,
  DxValidatorModule,
  DxTextBoxModule,
} from 'devextreme-angular';

import { KontoauszugDetailComponent } from './components/kontoauszug-detail/kontoauszug-detail.component';
import { KontoauszugDokumenteComponent } from './components/kontoauszug-dokumente/kontoauszug-dokumente.component';
import { KontoauszugListComponent } from './components/kontoauszug-list/kontoauszug-list.component';
import { KontoauszugSearchComponent } from './components/kontoauszug-search/kontoauszug-search.component';
import { KontoauszugComponent } from './containers/kontoauszug.component';
import { KontoauszugRoutingModule } from './kontoauszug-routing.module';
import { KontoauszugSandbox } from './kontoauszug.sandbox';
import { KontoauszugService } from './kontoauszug.service';
import { KontoauszugApiClient } from './kontoauszugApiClient.service';
import { reducers } from './store';
import { KontoauszugEffects } from './store/effects/kontoauszug.effects';

const DxUiModule = [
  DxToolbarModule,
  DxValidationGroupModule,
  DxFormModule,
  DxCheckBoxModule,
  DxTagBoxModule,
  DxSelectBoxModule,
  DxDateBoxModule,
  DxDataGridModule,
  DxFilterBuilderModule,
  DxButtonModule,
  DxValidatorModule,
  DxLookupModule,
  DxTextBoxModule
];

const components: any[] = [
  KontoauszugComponent,
  KontoauszugSearchComponent,
  KontoauszugListComponent,
  KontoauszugDetailComponent,
  KontoauszugDokumenteComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SimpleNotificationsModule,
    LayoutContainersModule,
    DxUiModule,
    SharedComponentModule,
    KontoauszugRoutingModule,
    StoreModule.forFeature(AppEnums.FeatureModule.kontoauszug, reducers),
    EffectsModule.forFeature([KontoauszugEffects])
  ],
  declarations: [...components],
  providers: [
    KontoauszugApiClient,
    KontoauszugService,
    KontoauszugSandbox,
    DatePipe,
  ]
})
export class KontoauszugModule { }
