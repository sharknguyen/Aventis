import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

import { LandesindexComponent } from './containers/landesxindex/landesxindex.component';

const routes: Routes = [
  {
    path: '',
    component: LandesindexComponent,
    data: {
      title: 'Landesxindex',
      name: 'Landesxindex',
      roles: ['CtlLandesxindex.mayInsert', 'CtlLandesxindex.mayUpdate', 'CtlLandesxindex.mayDelete']
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandesindexRoutingModule { }
