import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';
import { GesundheitComponent } from './containers/gesundheit.component';


const routes: Routes = [
  {
    path: '',
    component: GesundheitComponent,
    data: {
      title: 'Gesundheit',
      name: 'Gesundheit'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GesundheitRoutingModule { }
