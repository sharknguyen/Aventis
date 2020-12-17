import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
    PostleitzahlenAktualisierenDetailComponent,
} from '@app/kiss4-modul-konfiguration/postleitzahlen-aktualisieren/components/postleitzahlen-aktualisieren-detail/postleitzahlen-aktualisieren-detail.component';
import {
    PostleitzahlenAktualisierenGridComponent,
} from '@app/kiss4-modul-konfiguration/postleitzahlen-aktualisieren/components/postleitzahlen-aktualisieren-grid/postleitzahlen-aktualisieren-grid.component';
import {
    PostleitzahlenAktualisierenUploadComponent,
} from '@app/kiss4-modul-konfiguration/postleitzahlen-aktualisieren/components/postleitzahlen-aktualisieren-upload/postleitzahlen-aktualisieren-upload.component';
import {
    PostleitzahlenAktualisierenComponent,
} from '@app/kiss4-modul-konfiguration/postleitzahlen-aktualisieren/containers/postleitzahlen-aktualisieren.component';
import {
    PostleitzahlenAktualisierenRoutingModule,
} from '@app/kiss4-modul-konfiguration/postleitzahlen-aktualisieren/postleitzahlen-aktualisieren-routing.module';
import {
    PostleitzahlenAktualisierenApiClient,
} from '@app/kiss4-modul-konfiguration/postleitzahlen-aktualisieren/postleitzahlen-aktualisieren.ApiClient.service';
import {
    PostleitzahlenAktualisierenSandbox,
} from '@app/kiss4-modul-konfiguration/postleitzahlen-aktualisieren/postleitzahlen-aktualisieren.sandbox';
import {
    PostleitzahlenAktualisierenService,
} from '@app/kiss4-modul-konfiguration/postleitzahlen-aktualisieren/postleitzahlen-aktualisieren.service';
import { reducers } from '@app/kiss4-modul-konfiguration/postleitzahlen-aktualisieren/store';
import {
    PostleitzahlenAktualisierenEffects,
} from '@app/kiss4-modul-konfiguration/postleitzahlen-aktualisieren/store/effects/postleitzahlen-aktualisieren.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {
    DxFileUploaderModule,
    DxFilterBuilderModule,
    DxProgressBarModule,
    DxResponsiveBoxModule,
    DxTreeListModule,
} from 'devextreme-angular';
import { DxAutocompleteModule } from 'devextreme-angular/ui/autocomplete';
import { DxBoxModule } from 'devextreme-angular/ui/box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxPopoverModule } from 'devextreme-angular/ui/popover';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

const DxUiModule = [
    DxToolbarModule,
    DxDataGridModule,
    DxTextBoxModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxAutocompleteModule,
    DxFormModule,
    DxPopupModule,
    DxBoxModule,
    DxPopoverModule,
    DxDateBoxModule,
    DxFilterBuilderModule,
    DxTreeListModule,
    DxFileUploaderModule,
    DxProgressBarModule,
    DxResponsiveBoxModule
];

const PostleitzahlenAktualisierenListComponents: any[] = [
    PostleitzahlenAktualisierenComponent,
    PostleitzahlenAktualisierenGridComponent,
    PostleitzahlenAktualisierenDetailComponent,
    PostleitzahlenAktualisierenUploadComponent
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        SimpleNotificationsModule,
        SharedComponentModule,
        LayoutContainersModule,
        DxUiModule,
        StoreModule.forFeature(AppEnums.FeatureModule.postleitzahlenAktualisieren, reducers),
        EffectsModule.forFeature([PostleitzahlenAktualisierenEffects]),
        PostleitzahlenAktualisierenRoutingModule
    ],
    declarations: [...PostleitzahlenAktualisierenListComponents],
    providers: [
        PostleitzahlenAktualisierenApiClient,
        PostleitzahlenAktualisierenService,
        PostleitzahlenAktualisierenSandbox,
    ]
})
export class PostleitzahlenAktualisierenModule { }
