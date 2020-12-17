import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MedGrundversorgungComponent } from './containers/med-grundversorgung-component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: MedGrundversorgungComponent,
    data: {
      title: 'MedGrundversorgung',
      name: 'MedGrundversorgung'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MedGrundversorgungRoutingModule { }

