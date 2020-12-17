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
import { ArbeitService } from './arbeit.service';
@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})
export class ArbeitApiClient extends HttpService {

  // Load baperson list
  // @GET('api/Basis/Arbeit{query}')
  @GET('api/v1/Basis/FallbearbeitungArbeit/{id}')
  @ViewCatcher()
  @Adapter(ArbeitService.bapersonAdapter)
  public getArbeit(@Path('id') id: any): Observable<any> {
      return null;
  }

  @GET('api/lookups/{query}')
  @ViewCatcher()
  @Adapter(ArbeitService.lOVNameAdapter)
  public getLookups(@Path('query') query: any): Observable<any> {
      return null;
  }

  @GET('api/v1/Basis/FallbearbeitungArbeit/geschlechtCode/{id}')
  @ViewCatcher()
  @Adapter(ArbeitService.berufSuchenAdapter)
  public getBerufSuchen(@Path('id') id: any): Observable<any> {
      return null;
  }

  // @GET('api/Basis/InstitutionSuchenArbeit')
  @GET('api/v1/Basis/FallbearbeitungArbeit/InstitutionSuchenArbeit')
  @ViewCatcher()
  @Adapter(ArbeitService.institutionSuchenAdapter)
  public getInstitutionSuchenArbeit(): Observable<any> {
      return null;
  }

  // @POST('api/Basis/Arbeit')
  @POST('api/v1/Basis/FallbearbeitungArbeit/Insert')
  @ViewCatcher()
  @Adapter(ArbeitService.saveAdapter)
  public saveArbeit(@Body barperson: any): Observable<any> {
      return null;
  }
}
