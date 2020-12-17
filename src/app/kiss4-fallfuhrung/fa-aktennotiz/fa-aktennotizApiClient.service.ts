import {
    Adapter,
    Body,
    DefaultHeaders,
    GET,
    HttpService,
    Path,
    POST,
    PUT,
    DELETE,
    ViewCatcher
} from '@shared/asyncServices/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FaAktennotizService } from './fa-aktennotiz.service';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class FaAktennotizApiClient extends HttpService {
    /**
     * Retrieves all FaAktennotiz
     */
    @GET('api/v1/Fallfuehrung/FaAktennotizen{query}')
    @ViewCatcher()
    @Adapter(FaAktennotizService.gridAdapter)
    public getFaAktennotiz(@Path('query') query: any): Observable<any> {
        return null;
    }
    @GET('api/lookups/FaKontaktart')
    @ViewCatcher()
    @Adapter(FaAktennotizService.kontaktartAdapter)
    public getKontaktart(): Observable<any> {
        return null;
    }
    @GET('api/v1/Common/DlgAuswahl/Mitarbeiter')
    @ViewCatcher()
    @Adapter(FaAktennotizService.mitarbeiterAdapter)
    public getMitarbeiter(): Observable<any> {
        return null;
    }
    @GET('api/lookups/FaThema')
    @ViewCatcher()
    @Adapter(FaAktennotizService.theMenAdapter)
    public getTheMen(): Observable<any> {
        return null;
    }
    @POST('api/v1/Fallfuehrung/FaAktennotizen')
    @ViewCatcher()
    @Adapter(FaAktennotizService.addFaAktennotiz)
    public addFaAktennotiz(@Body addBody: any): Observable<any> {
        return null;
    }

    @DELETE('api/v1/Fallfuehrung/FaAktennotizen')
    @ViewCatcher()
    @Adapter(FaAktennotizService.deleteFaAktennotiz)
    public deleteFaAktennotiz(@Body body: any): Observable<any> {
        return null;
    }
    @PUT('api/v1/Fallfuehrung/FaAktennotizen')
    @ViewCatcher()
    @Adapter(FaAktennotizService.updateFaAktennotiz)
    public updateFaAktennotiz(@Body bodyUpdate: any): Observable<any> {
        return null;
    }
    @GET('api/Common/GetConfigBool{query}')
    @ViewCatcher()
    @Adapter(FaAktennotizService.configAdapter)
    public getConfigBool(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/lookups/FaDauer')
    @ViewCatcher()
    @Adapter(FaAktennotizService.dauerAdapter)
    public getDauer(): Observable<any> {
        return null;
    }

    @GET('api/Fallfuehrung/GetDokumentAktennotizen?docContextName=FaDokBesprBericht&xProfileID=Null&docTypeFilter=0')
    @ViewCatcher()
    @Adapter(FaAktennotizService.dokumentAktennotizenAdapter)
    public getDokumentAktennotizen(): Observable<any> {
        return null;
    }
    @GET('api/Personen/{baPersonID}')
    @ViewCatcher()
    @Adapter(FaAktennotizService.getDefaultKontartPartner)
    public getDefaultKontartPartner(@Path('baPersonID') baPersonID: any): Observable<any> {
        return null;
    }
    @GET('api/Common/GetConfigBool?keypath=System\\Fallfuehrung\\LogischesLoeschen&defaultvalue=false')
    @ViewCatcher()
    @Adapter(FaAktennotizService.getLogischesLoeschen)
    public getLogischesLoeschen(): Observable<any> {
        return null;
    }
}
