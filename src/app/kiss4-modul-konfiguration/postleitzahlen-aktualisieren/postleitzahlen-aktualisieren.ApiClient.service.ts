import { Injectable } from '@angular/core';
import {
    PostleitzahlenAktualisierenService,
} from '@app/kiss4-modul-konfiguration/postleitzahlen-aktualisieren/postleitzahlen-aktualisieren.service';
import { Adapter, DefaultHeaders, GET, HttpService, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class PostleitzahlenAktualisierenApiClient extends HttpService {

    @GET('api/Basis/GetBaPlz')
    @Adapter(PostleitzahlenAktualisierenService.gridAdapter)
    public getPostleitzahlenAktualisierens(): Observable<any> {
        return null;
    }

    @GET('api/Basis/SyncBaPlz')
    @ViewCatcher()
    @Adapter(PostleitzahlenAktualisierenService.syncDataAdapter)
    public syncData(): Observable<any> {
        return null;
    }

}
