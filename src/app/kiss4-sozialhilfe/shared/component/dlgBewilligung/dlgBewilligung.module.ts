import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import {
  DxButtonModule, DxPopupModule,
  DxFormModule, DxSelectBoxModule,
  DxTextAreaModule, DxTextBoxModule, DxValidationGroupModule,
  DxValidatorModule, DxDateBoxModule, DxRadioGroupModule, DxCheckBoxModule
} from 'devextreme-angular';
import { reducers } from './store';
import { DlgBewilligungEffects } from './store/dlgBewilligung.effects';
import { DlgBewilligungComponent } from './containers/dlgBewilligung.component';

const DxUiModule = [
  DxButtonModule,
  DxFormModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxValidationGroupModule,
  DxValidatorModule,
  DxDateBoxModule,
  DxRadioGroupModule,
  DxCheckBoxModule,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    DxUiModule,
  ],
  declarations: [DlgBewilligungComponent],
  exports: [DlgBewilligungComponent],
})
export class DlgBewilligungModule { }
