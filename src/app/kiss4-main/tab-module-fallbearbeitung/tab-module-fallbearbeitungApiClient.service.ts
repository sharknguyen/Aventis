import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, Path, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs';

import { TabModuleFallbearbeitungService } from './tab-module-fallbearbeitung.service';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class TabModuleFallbearbeitungApiClient extends HttpService {
    @GET('api/GetIconMoudle?BaPersonID={baPersonID}&FaFallID={faFallID}')
    @ViewCatcher()
    @Adapter(TabModuleFallbearbeitungService.getModuleIcon)
    public getModuleIcon(@Path('baPersonID') baPersonID: any, @Path('faFallID') faFallID: any): Observable<any> {
        return null;
    }

    @GET('api/GetVisibleZeitachse')
    @ViewCatcher()
    @Adapter(TabModuleFallbearbeitungService.getZeitachseVisible)
    public getZeitachseVisible(): Observable<any> {
        return null;
    }

    @GET('api/GetPersonInfoTitel?BaPersonID={baPersonID}&UserID={userID}&LanguageCode={languageCode}')
    @ViewCatcher()
    @Adapter(TabModuleFallbearbeitungService.getPersonInfoTitel)
    public getPersonInfoTitel(@Path('baPersonID') baPersonID: any, @Path('userID') userID: any, @Path('languageCode') languageCode: any): Observable<any> {
        return null;
    }
}
