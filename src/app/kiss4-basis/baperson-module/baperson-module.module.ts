import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FallfuhrungTreeConstant } from '@shared/common/fallfuhrung-tree.common';
import { BaPersonModuleComponent } from './baperson-module.component';

const components: any[] = [
  BaPersonModuleComponent
];

const routes: Routes = [
  {
    path: '',
    component: BaPersonModuleComponent,
    children: [
      {
        path: 'Arbeit',
        loadChildren: './../../kiss4-basis/arbeit/arbeit.module#ArbeitModule',
      },
      {
        path: FallfuhrungTreeConstant.Gesundheit,
        loadChildren: './../../kiss4-basis/gesundheit/gesundheit.module#GesundheitModule',
      },
      {
        path: '',
        loadChildren: './../demographie/demographie.module#DemographieModule',
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [components],
})
export class BaPersonModuleModule { }
