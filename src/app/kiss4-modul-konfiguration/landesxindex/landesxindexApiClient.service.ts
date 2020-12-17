import { Injectable } from '@angular/core';
import {
    Adapter,
    Body,
    DefaultHeaders,
    DELETE,
    GET,
    HttpService,
    Path,
    POST,
    PUT,
    ViewCatcher,
} from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

import { LandesindexService } from './landesxindex.service';
import { InsertIkLandesIndex, ListItem } from './models/landesxindex.model';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class LandesindexApiClient extends HttpService {
    // Load Landesxindex list
    @GET('api/v1/Inkasso/Landesindex/IkLandesindex')
    @ViewCatcher()
    @Adapter(LandesindexService.gridAdapter)
    public getLandesindexes(): Observable<any> {
        return null;
    }

    // Load Landesxindex detail list
    @GET('api/v1/Inkasso/Landesindex/IkLandesindexWert?ikLandesindexID={ikLandesindexID}')
    @ViewCatcher()
    @Adapter(LandesindexService.gridAdapterDetail)
    public getLandesindexWert(@Path('ikLandesindexID') query: any): Observable<any> {
        return null;
    }

    // Delete a row in top grid
    @DELETE('api/v1/Inkasso/Landesindex/IkLandesindex?ikLandesindexID={ikLandesindexID}')
    @ViewCatcher()
    @Adapter(LandesindexService.deleteLandesindexAdapter)
    public deleteLandesindex(@Path('ikLandesindexID') query: any): Observable<any> {
        return null;
    }

    // Delete a row in bottom grid
    @DELETE('api/v1/Inkasso/Landesindex/IkLandesindexWert?ikLandesindexWertID={ikLandesindexWertID}')
    @ViewCatcher()
    @Adapter(LandesindexService.deleteLandesindexWertAdapter)
    public deleteLandesindexWert(@Path('ikLandesindexWertID') query: any): Observable<any> {
        return null;
    }

    // update data
    @PUT('api/v1/Inkasso/Landesindex/IkLandesindex')
    @ViewCatcher()
    @Adapter(LandesindexService.updateLandesxindexAdapter)
    public updateLandesindexes(
        @Body landesindex: ListItem): Observable<any> {
        return null;
    }

    // J003 Add
    @POST('api/v1/Inkasso/Landesindex/IkLandesindex')
    @ViewCatcher()
    @Adapter(LandesindexService.addLandesindex)
    public addLandesindex(@Body landesindexWert: InsertIkLandesIndex): Observable<any> {
        return null;
    }

    // J003 Get Wert
    @GET('api/v1/Inkasso/Landesindex/Wert{query}')
    @ViewCatcher()
    @Adapter(LandesindexService.getLandesindexWert)
    public getWert(@Path('query') query: any): Observable<any> {
        return null;
    }

    // Get IkLandesindex J002
    @GET('api/v1/Inkasso/WertErfassen')
    @ViewCatcher()
    @Adapter(LandesindexService.getIkLandesindex)
    public getIkLandesindex(): Observable<any> {
        return null;
    }

    // add Wert by LandesIndex J003
    @POST('api/v1/Inkasso/Landesindex/IkLandesindexWerts')
    @Adapter(LandesindexService.addWertbyLandesIndex)
    public addWertbyLandesIndex(@Body landesindexWert: InsertIkLandesIndex): Observable<any> {
        return null;
    }

    // Get CountIkLandesindexWert
    @GET('api/Inkasso/CountIkLandesindexWertQuery{query}')
    @Adapter(LandesindexService.getCountIkLandesindexWert)
    public getCountIkLandesindexWert(@Path('query') query: any): Observable<any> {
        return null;
    }

    // Get NameIkLandesindex
    @GET('api/Inkasso/NameIkLandesindexQuery?IkLandesindexID={query}')
    @Adapter(LandesindexService.getNameIkLandesindex)
    public getNameIkLandesindex(@Path('query') query: number): Observable<any> {
        return null;
    }

    // Add IkLandesindexWert
    @POST('api/v1/Inkasso/Landesindex/IkLandesindexWertValues')
    @ViewCatcher()
    @Adapter(LandesindexService.addIkLandesindexWert)
    public addIkLandesindexWert(@Body landesindexWert: any): Observable<any> {
        return null;
    }

    // J003 WertCommand
    @PUT('api/v1/Inkasso/Landesindex/Wert')
    @ViewCatcher()
    @Adapter(LandesindexService.updateWert)
    public updateWert(@Body data: any): Observable<any> {
        return null;
    }

    @POST('api/Inkasso/IkLandesindexWert')
    @Adapter(LandesindexService.addWert)
    public addWert(@Body landesindexWert: any): Observable<any> {
        return null;
    }
}
