import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

import { AlimentenguthabenComponent } from './containers/alimentenguthaben.component';

const routes: Routes = [
  {
    path: '',
    component: AlimentenguthabenComponent,
    data: {
      title: 'Alimentenguthaben',
      name: 'Alimentenguthaben'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  { path: '**', redirectTo: '/exception/404' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlimentenguthabenRoutingModule { }
