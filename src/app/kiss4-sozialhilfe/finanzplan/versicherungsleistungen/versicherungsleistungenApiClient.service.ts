import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, Path, ViewCatcher, POST, Body, PUT, DELETE } from '@shared/asyncServices/http';
import { Observable } from 'rxjs';

import { VersicherungsleistungenService } from './versicherungsleistungen.service';

@Injectable()
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
})

export class VersicherungsleistungenApiClient extends HttpService {
    @GET('api/v1/Sozialhilfe/BgVersicherung{query}')
    @ViewCatcher()
    @Adapter(VersicherungsleistungenService.einkommenAdapter)
    public loadEinkommen(@Path('query') query: any): Observable<any> {
        return null;
    }

    @POST('api/v1/Sozialhilfe/BgVersicherung')
    @ViewCatcher()
    @Adapter(VersicherungsleistungenService.postEinkommenAdapter)
    public postEinkommen(@Body params: any): Observable<any> {
        return null;
    }

    @PUT('api/v1/Sozialhilfe/BgVersicherung')
    @ViewCatcher()
    @Adapter(VersicherungsleistungenService.putEinkommenAdapter)
    public putEinkommen(@Body params: any): Observable<any> {
        return null;
    }

    @DELETE('api/v1/Sozialhilfe/BgVersicherung')
    @ViewCatcher()
    @Adapter(VersicherungsleistungenService.deleteEinkommenAdapter)
    public deleteEinkommen(@Body params: any): Observable<any> {
        return null;
    }

    @GET('api/v1/Sozialhilfe/BgVersicherung/Initialization/{query}')
    @ViewCatcher()
    @Adapter(VersicherungsleistungenService.getEinkomenLookupAdapter)
    public getEinkommenLookUp(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('/api/v1/Sozialhilfe/SozialhilfeCommon/PersonenUnterstuetzt{query}')
    @ViewCatcher()
    @Adapter(VersicherungsleistungenService.getListDataAdapte)
    public getPersonList(@Path('query') bgBudgetID: any): Observable<any> {
        return null;
    }

    @GET('/api/v1/Sozialhilfe/BgAlimente/Alimentenguthaben/BgBewilligungStatusCode{query}')
    @ViewCatcher()
    @Adapter(VersicherungsleistungenService.getBgBewilligungStatusCodeAdapter)
    public getBgBewilligungStatusCode(@Path('query') bgBudgetID: any): Observable<any> {
        return null;
    }
}
