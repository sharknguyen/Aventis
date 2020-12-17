import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';
import { KasseComponent } from './containers/kasse.component';

const routes: Routes = [
  {
    path: '',
    component: KasseComponent,
    data: {
      title: 'Kasse',
      name: 'Kasse'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KasseRoutingModule { }
