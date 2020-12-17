import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';
import { DemografieHistoryComponent } from './containers/demographieH.component';
const routes: Routes = [
    {
      path: '',
      component: DemografieHistoryComponent,
      data: {
        title: 'Demografie',
        name: 'demografie'
      }
    },
    { path: '**', redirectTo: '/exception/404' }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class DemografieRoutingModule { }
