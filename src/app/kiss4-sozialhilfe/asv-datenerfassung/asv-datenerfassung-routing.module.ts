import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';
import { AsvDatenerfassungComponent } from './containers/asv-datenerfassung.component';

const routes: Routes = [
  {
    path: '',
    component: AsvDatenerfassungComponent,
    data: {
      title: 'AsvDatenerfassung',
      name: 'AsvDatenerfassung'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsvDatenerfassungRoutingModule { }
