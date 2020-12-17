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
import { KasseService } from './kasse.service';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class KasseApiClient extends HttpService {
    @GET('api/v1/Sozialhilfe/Kasse{query}')
    @ViewCatcher()
    @Adapter(KasseService.gridAdapter)
    public getKasse(@Path('query') query: any): Observable<any> {
        return null;
    }
    @GET('api/v1/Sozialhilfe/Kasse/ShUnterstuetztePerson')
    @ViewCatcher()
    @Adapter(KasseService.dropDownDataAdapter)
    public getDropDownData(@Path('query') query: any): Observable<any> {
        return null;
    }
    @PUT('api/v1/Sozialhilfe/Kasse/KbBuchung?isStatus={isStatus}')
    @ViewCatcher()
    @Adapter(KasseService.updateKbBuchungAdapter)
    public updateKbBuchung(@Body body: any, @Path('isStatus') isStatus: boolean): Observable<any> {
        return null;
    }
}
