import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';
import { SpezialkontoComponent } from './containers/speziaikonto.component';

const routes: Routes = [
  {
    path: '',
    component: SpezialkontoComponent,
    data: {
      title: 'Spezialkonto',
      name: 'Spezialkonto'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpezialkontoRoutingModule { }
