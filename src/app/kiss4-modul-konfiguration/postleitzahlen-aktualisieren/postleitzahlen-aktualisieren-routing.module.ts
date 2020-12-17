import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    PostleitzahlenAktualisierenComponent,
} from '@app/kiss4-modul-konfiguration/postleitzahlen-aktualisieren/containers/postleitzahlen-aktualisieren.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

const routes: Routes = [
    {
        path: '',
        component: PostleitzahlenAktualisierenComponent,
        data: {
            title: 'Postleitzahlen Aktualisieren Manager',
            name: 'Postleitzahlen Aktualisieren'
        },
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostleitzahlenAktualisierenRoutingModule { }
