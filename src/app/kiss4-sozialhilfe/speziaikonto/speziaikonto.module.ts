import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { reducers } from '@app/kiss4-sozialhilfe/speziaikonto/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
// register module devextreme
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
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
import { SpeziaikontoDetailEditAbzahlungskontiComponent } from './components/speziaikonto-detail-edit-abzahlungskonti/speziaikonto-detail-edit-abzahlungskonti.component';
import { SpeziaikontoDetailEditAusgabekontiComponent } from './components/speziaikonto-detail-edit-ausgabekonti/speziaikonto-detail-edit-ausgabekonti.component';
import { SpeziaikontoDetailEditKurzungenComponent } from './components/speziaikonto-detail-edit-kurzungen/speziaikonto-detail-edit-kurzungen.component';
import { SpeziaikontoDetailEditVorabzugskontiComponent } from './components/speziaikonto-detail-edit-vorabzugskonti/speziaikonto-detail-edit-vorabzugskonti.component';
import { SpeziaikontoDetailGridComponent } from './components/speziaikonto-detail-grid/speziaikonto-detail-grid.component';
import { SpeziaikontoDetailViewAbzahlungskontiComponent } from './components/speziaikonto-detail-view-abzahlungskonti/speziaikonto-detail-view-abzahlungskonti.component';
import { SpeziaikontoDetailViewAusgabekontiComponent } from './components/speziaikonto-detail-view-ausgabekonti/speziaikonto-detail-view-ausgabekonti.component';
import { SpeziaikontoDetailViewKurzungenComponent } from './components/speziaikonto-detail-view-kurzungen/speziaikonto-detail-view-kurzungen.component';
import { SpeziaikontoDetailViewVorabzugskontiComponent } from './components/speziaikonto-detail-view-vorabzugskonti/speziaikonto-detail-view-vorabzugskonti.component';
import { SpeziaikontoDetailComponent } from './components/speziaikonto-detail/speziaikonto-detail.component';
import { SpeziaikontoGridComponent } from './components/speziaikonto-grid/speziaikonto-grid.component';
import { SpezialkontoComponent } from './containers/speziaikonto.component';
import { SpezialkontoRoutingModule } from './speziaikonto-routing.module';
// register providers
import { SpezialkontoApiClient } from './speziaikonto.ApiClient.service';
import { SpezialkontoSandbox } from './speziaikonto.sandbox';
import { SpezialkontoService } from './speziaikonto.service';
import { SpezialkontoEffects } from './store/effects/speziaikonto.effects';

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
  DxNumberBoxModule,
  DxCheckBoxModule,
  DxPopupModule
];

const components: any[] = [
  SpezialkontoComponent,
  SpeziaikontoDetailViewKurzungenComponent,
  SpeziaikontoDetailEditKurzungenComponent,
  SpeziaikontoDetailEditAusgabekontiComponent,
  SpeziaikontoDetailViewAusgabekontiComponent,
  SpeziaikontoDetailEditAbzahlungskontiComponent,
  SpeziaikontoDetailViewAbzahlungskontiComponent,
  SpeziaikontoDetailEditVorabzugskontiComponent,
  SpeziaikontoDetailViewVorabzugskontiComponent,
  SpeziaikontoDetailComponent,
  SpeziaikontoGridComponent,
  SpeziaikontoDetailGridComponent
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
    SpezialkontoRoutingModule,
    StoreModule.forFeature(AppEnums.FeatureModule.speziaikonto, reducers),
    EffectsModule.forFeature([SpezialkontoEffects])
  ],
  declarations: [...components],
  providers: [
    SpezialkontoApiClient,
    SpezialkontoService,
    SpezialkontoSandbox
  ]
})
export class SpezialkontoModule { }


