import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { WohnkostenComponent } from './containers/wohnkosten-component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: WohnkostenComponent,
    data: {
      title: 'Wohnkosten',
      name: 'Wohnkosten'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WohnkostenRoutingModule { }

