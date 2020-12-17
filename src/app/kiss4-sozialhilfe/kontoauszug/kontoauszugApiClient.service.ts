import { Injectable } from '@angular/core';
import { Adapter, Body, DefaultHeaders, GET, HttpService, Path, POST, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs';

import { KontoauszugService } from './kontoauszug.service';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})
export class KontoauszugApiClient extends HttpService {
  @GET('api/v1/SozialHilfe/Kontoauszug/Personnen?bapersonid={baPersonID}')
  @ViewCatcher()
  @Adapter(KontoauszugService.getPersonnen)
  public getPersonnen(@Path('baPersonID') baPersonID: any): Observable<any> {
    return null;
  }

  @GET('api/lookups/KbKontoZeitraum')
  @ViewCatcher()
  @Adapter(KontoauszugService.getZeitraum)
  public getZeitraum(): Observable<any> {
    return null;
  }

  @GET('api/v1/SozialHilfe/Kontoauszug/Kostenart')
  @ViewCatcher()
  @Adapter(KontoauszugService.getKostenart)
  public getKostenart(): Observable<any> {
    return null;
  }

  @POST('api/v1/SozialHilfe/Kontoauszug')
  @ViewCatcher()
  @Adapter(KontoauszugService.searchKontoauszug)
  public searchKontoauszug(@Body payload: any): Observable<any> {
      return null;
  }

  @POST('api/v1/Common/LovLookups')
  @ViewCatcher()
  @Adapter(KontoauszugService.getLovLookups)
  public getLovLookups(@Body payload: any): Observable<any> {
      return null;
  }
}
