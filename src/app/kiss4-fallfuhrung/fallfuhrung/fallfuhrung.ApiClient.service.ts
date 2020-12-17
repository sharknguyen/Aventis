import { Injectable } from '@angular/core';
import { Adapter, Body, DefaultHeaders, GET, HttpService, Path, PUT, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

import { FallfuhrungService } from './fallfuhrung.service';
import { ModelQueryUpdateFaleistung, ModelQueryValidationFaLeistung } from './models/fallfuhrung.model';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': localStorage.getItem('currentLang.Culture') || 'de-CH'
})
export class FallfuhrungApiClient extends HttpService {
    @GET('api/common/Faleistung/v2?FaLeistungID={query}&includeusername=true&includetext=true')
    @ViewCatcher()
    @Adapter(FallfuhrungService.getDataFallfuhrung)
    public getDataFallfuhrung(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/Common/GetConfigBool{query}')
    @ViewCatcher()
    @Adapter(FallfuhrungService.getConfigAdapter)
    public getConfig(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/common/Faleistung/FallRights?FaLeistungID={query}')
    @ViewCatcher()
    @Adapter(FallfuhrungService.getFallRightsAdapter)
    public getDataFallRights(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/lookups/{query}')
    @ViewCatcher()
    @Adapter(FallfuhrungService.getDataCbboxAdapter)
    public getDataCombobox(@Path('query') query: any): Observable<any> {
        return null;
    }

    @PUT('api/v1/Fallfuehrung/Beratungsperiode')
    @ViewCatcher()
    @Adapter(FallfuhrungService.updateFaLeistungAdapter)
    public updateFaLeistungTransaction(@Body modelFaleistung: ModelQueryUpdateFaleistung): Observable<any> {
        return null;
    }

    @GET('api/common/Faleistung/AnzahlOffene?FaLeistungID={query}')
    @ViewCatcher()
    @Adapter(FallfuhrungService.getAnzahlOffenePendenzenAdapter)
    public getAnzahlOffenePendenzen(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/common/faleistung/v2{query}')
    @ViewCatcher()
    @Adapter(FallfuhrungService.validationFaLeistungAdapter)
    public validationFaLeistung(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/v1/Fallfuehrung/famodultree/FaPhaseNumber?faleistungid={query}')
    @ViewCatcher()
    @Adapter(FallfuhrungService.getCountFaPhase)
    public getCountFaPhase(@Path('query') query: any): Observable<any> {
        return null;
    }
}
