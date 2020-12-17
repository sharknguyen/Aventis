import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

import { KontoauszugComponent } from './containers/kontoauszug.component';

const routes: Routes = [
  {
    path: '',
    component: KontoauszugComponent,
    data: {
      title: 'kontoauszug',
      name: 'kontoauszug'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KontoauszugRoutingModule { }
