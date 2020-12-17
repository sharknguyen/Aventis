import { Adapter, Body, DefaultHeaders, DELETE, GET, HttpService, Path, POST, PUT, ViewCatcher } from '@shared/asyncServices/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErwerbseinkommenService } from './erwerbseinkommen.service';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})

export class ErwerbseinkommenApiClient extends HttpService {

  // bgErwerbseinkommenDropdown
  @GET('api/v1/Sozialhilfe/BgErwerbseinkommen/Initialization/{query}')
  @Adapter(ErwerbseinkommenService.getBgErwerbseinkommenDropdown)
  public getErwerbseinkommenDropdown(@Path('query') data?: any): Observable<any> {
    return null;
  }

  // bgErwerbseinkommen
  @GET('api/v1/Sozialhilfe/BgErwerbseinkommen?bgBudgetID={data1}&bgGruppeCode={data2}&isShowOnlyCurrent={data3}')
  @Adapter(ErwerbseinkommenService.getBgErwerbseinkommen)
  public getBgErwerbseinkommen(@Path('data1') data1?: any, @Path('data2') data2?: any, @Path('data3') data3?: any): Observable<any> {
    return null;
  }

  @POST('api/v1/Sozialhilfe/BgErwerbseinkommen')
  @Adapter(ErwerbseinkommenService.addBgErwerbseinkommen)
  public addBgErwerbseinkommen(@Body data: any): Observable<any> {
    return null;
  }

  @PUT('api/v1/Sozialhilfe/BgErwerbseinkommen')
  @Adapter(ErwerbseinkommenService.updateBgErwerbseinkommen)
  public updateBgErwerbseinkommen(@Body data: any): Observable<any> {
    return null;
  }

  @DELETE('api/v1/Sozialhilfe/BgErwerbseinkommen')
  @Adapter(ErwerbseinkommenService.deleteBgErwerbseinkommen)
  public deleteBgErwerbseinkommen(@Body data: any): Observable<any> {
    return null;
  }

  // get BgBewilligungStatusCode
  @GET('api/v1/Sozialhilfe/SozialhilfeCommon/BgBewilligungStatusCode/{query}')
  @Adapter(ErwerbseinkommenService.getBgBewilligungStatusCode)
  public getBgBewilligungStatusCode(@Path('query') data?: any): Observable<any> {
    return null;
  }

}
