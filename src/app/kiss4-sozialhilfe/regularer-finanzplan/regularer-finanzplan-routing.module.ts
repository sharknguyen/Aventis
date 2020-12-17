import {RegularerFinanzplanComponent} from './containers/regularer-finanzplan.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@shared/guards/auth.guard';
import {CanDeactivateGuard} from '@shared/guards/canDeactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: RegularerFinanzplanComponent,
    data: {
      title: 'Regularer Finanzplan',
      name: 'Regularer Finanzplan'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegularerFinanzplanRoutingModule { }
