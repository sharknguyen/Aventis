import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {AuthGuard} from '@shared/guards/auth.guard';
import {CanDeactivateGuard} from '@shared/guards/canDeactivate.guard';
import {LayoutContainersModule} from '@shared/layouts/layouts.module';
import {SharedComponentModule} from '@shared/components/shared-component.module';

import {WhFinanzplanComponent} from '@app/kiss4-sozialhilfe/finanzplan/containers/wh-finanzplan.component';
import {HeaderBarComponent} from '@app/kiss4-sozialhilfe/finanzplan/components/header-bar/header-bar.component';
import {FinanzplanListComponent} from '@app/kiss4-sozialhilfe/finanzplan/components/finanzplan-list/finanzplan-list.component';
import {FallfuhrungTreeConstant} from '@shared/common/fallfuhrung-tree.common';
import {DxBoxModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxFilterBuilderModule, DxPopupModule, DxToolbarModule} from 'devextreme-angular';
import {reducers} from '@app/kiss4-sozialhilfe/finanzplan/store';
import {FinanzplanEffect} from '@app/kiss4-sozialhilfe/finanzplan/store/effects/finanzplan.effect';
import {EffectsModule} from '@ngrx/effects';
import {AppEnums} from '@shared/AppEnum';
import {StoreModule} from '@ngrx/store';
import {FinanzplanApiClient} from '@app/kiss4-sozialhilfe/finanzplan/finanzplanApiClient.service';
import {FinanzplanService} from '@app/kiss4-sozialhilfe/finanzplan/finanzplan.service';
import {PersonenImHaushaltSandbox} from '@app/kiss4-sozialhilfe/personen-im-haushalt/personen-im-haushalt.sandbox';


const Components: any[] = [
  WhFinanzplanComponent,
  HeaderBarComponent,
  FinanzplanListComponent
];

const DxUiModule = [
  DxBoxModule, DxDataGridModule, DxToolbarModule,
  DxButtonModule, DxPopupModule,
  DxFilterBuilderModule,
  DxCheckBoxModule,
];
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: WhFinanzplanComponent,
        canDeactivate: [CanDeactivateGuard],
        pathMatch: 'full'
      },
      {
        path: FallfuhrungTreeConstant.BgVersicherung,
        loadChildren: './versicherungsleistungen/versicherungsleistungen.module#VersicherungsleistungenModule',
      },
      {
        path: FallfuhrungTreeConstant.BgUebersicht,
        loadChildren: './bg-uebersicht/bg-uebersicht.module#BgUebersichtModule',
      },
      {
        path: FallfuhrungTreeConstant.BgGrundbedarf,
        loadChildren: './grund-bedarf/grund-bedarf.module#GrundBedarfModule',
      },
      {
        path: FallfuhrungTreeConstant.BgVermoegen,
        loadChildren: './vermogen/vermogen.module#VermogenModule',
      },
      {
        path: FallfuhrungTreeConstant.BgZulagenEFB,
        loadChildren: './zulagen-efb/zulagen-efb.module#ZulagenEfbModule',
      },
      {
        path: FallfuhrungTreeConstant.Situation,
        loadChildren: './situationsbedingte-leistungen/situation.module#SituationModule',
      },
      {
        path: FallfuhrungTreeConstant.BgErwerbseinkommen,
        loadChildren: './erwerbseinkommen/erwerbseinkommen.module#ErwerbseinkommenModule',
      },
      {
        path: FallfuhrungTreeConstant.BgWohnkosten,
        loadChildren: './wohnkosten/wohnkosten.module#WohnkostenModule',
      },
      {
        path: FallfuhrungTreeConstant.BgAlimente,
        loadChildren: './alimentenguthaben/alimentenguthaben.module#AlimentenguthabenModule',
      },
      {
        path: FallfuhrungTreeConstant.BgKrankenkasse,
        loadChildren: './med-grundversorgung/med-grundversorgung.module#MedGrundversorgungModule',
      },
      {
        path: 'MedGrundversorgung',
        loadChildren: './med-grundversorgung/med-grundversorgung.module#MedGrundversorgungModule',
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild(routes),
    SharedComponentModule,
    LayoutContainersModule,
    DxUiModule,
    StoreModule.forFeature(AppEnums.FeatureModule.finanzplan, reducers),
    EffectsModule.forFeature([FinanzplanEffect])
  ],
  declarations: [...Components],
  providers: [
    FinanzplanApiClient,
    FinanzplanService,
    PersonenImHaushaltSandbox
  ]
})
export class WhFinanzplanModule { }
