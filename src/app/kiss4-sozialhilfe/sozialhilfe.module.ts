import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SozialhilfeComponent } from './sozialhilfe.component';
import { FallfuhrungTreeConstant } from '@shared/common/fallfuhrung-tree.common';

const routes: Routes = [
  {
    path: '',
    component: SozialhilfeComponent,
    children: [
      {
        path: '',
        loadChildren: './whleistung/whleistung.module#WhLeistungModule',
      },
      {
        path: FallfuhrungTreeConstant.WhLeistung + '/:faLeistungID',
        loadChildren: './whleistung/whleistung.module#WhLeistungModule',
      },
      {
        path: FallfuhrungTreeConstant.ASV,
        loadChildren: './asv-datenerfassung/asv-datenerfassung.module#AsvDatenerfassungModule',
      },
      {
        path: FallfuhrungTreeConstant.Kontoauszug,
        loadChildren: './kontoauszug/kontoauszug.module#KontoauszugModule',
      },
      {
        path: FallfuhrungTreeConstant.WhRegularerFinanzplan + '/:bgFinanzplanID',
        loadChildren: './regularer-finanzplan/regularer-finanzplan.module#RegularerFinanzplanModule',
      },
      {
        path: FallfuhrungTreeConstant.CtlWhSpezialkonto + '/:modulTreeID',
        loadChildren: './speziaikonto/speziaikonto.module#SpezialkontoModule',
      },
      {
        path: FallfuhrungTreeConstant.WhPersonen + '/:bgFinanzplanID',
        loadChildren: './personen-im-haushalt/personen-im-haushalt.module#PersonenImHaushaltModule',
      },
      {
        path: FallfuhrungTreeConstant.WhFinanzplan + '/:bgFinanzplanID',
        loadChildren: './finanzplan/wh-finanzplan.module#WhFinanzplanModule',
      },
    ]

  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SozialhilfeComponent],
})
export class SozialhilfeModule { }
