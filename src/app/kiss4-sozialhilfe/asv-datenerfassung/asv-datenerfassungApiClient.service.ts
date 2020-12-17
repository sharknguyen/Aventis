import { Injectable } from '@angular/core';
import { Adapter, Body, DefaultHeaders, GET, HttpService, Path, POST, PUT, ViewCatcher, DELETE } from '@shared/asyncServices/http';
import { Observable } from 'rxjs';

import { AsvDatenerfassungService } from './asv-datenerfassung.service';
import { ModelQueryInsert, ModelQueryUpdate, ModelQueryDelete } from './models';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class AsvDatenerfassungApiClient extends HttpService {

    @GET('api/v1/Sozialhilfe/WhASVSErfassung?faleistungId={query}')
    @ViewCatcher()
    @Adapter(AsvDatenerfassungService.gridAdapter)
    public getAsvDatenerfassung(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/v1/Sozialhilfe/WhASVSErfassung/DataInit?faleistungId={query}')
    @ViewCatcher()
    @Adapter(AsvDatenerfassungService.gridAdapter)
    public getComboboxAsvDatenerfassung(@Path('query') query: any): Observable<any> {
        return null;
    }

    @POST('api/v1/Sozialhilfe/WhASVSErfassung?leistungAb=&widerruf={widerruf}')
    @ViewCatcher()
    @Adapter(AsvDatenerfassungService.insertAdapter)
    public asvDatenerfassungInsert(@Body data: ModelQueryInsert, @Path('widerruf') Widerruf: any): Observable<any> {
        return null;
    }

    @PUT('api/v1/Sozialhilfe/WhASVSErfassung?WhAsvseintragId={whAsvseintragId}&LeistungAb={leistungAb}&Widerruf={widerruf}')
    @ViewCatcher()
    @Adapter(AsvDatenerfassungService.updateAdapter)
    public asvDatenerfassungUpdate(@Body data: ModelQueryUpdate, @Path('widerruf') Widerruf: any, @Path('leistungAb') LeistungAb: any, @Path('whAsvseintragId') WhAsvseintragId: any): Observable<any> {
        return null;
    }

    @DELETE('api/v1/Sozialhilfe/WhASVSErfassung')
    @ViewCatcher()
    @Adapter(AsvDatenerfassungService.deleteAdapter)
    public asvDatenerfassungDelete(@Body data: ModelQueryDelete): Observable<any> {
        return null;
    }
}
