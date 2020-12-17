import {Adapter, Body, DefaultHeaders, DELETE, GET, HttpService, Path, POST, PUT, ViewCatcher} from '@shared/asyncServices/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { WohnkostenService } from './wohnkosten.service';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})
export class WohnkostenApiClient extends HttpService {

  @GET('api/v1/Sozialhilfe/BgWohnkosten/BgFinanzplan/{BgBudgetID}')
  @Adapter(WohnkostenService.bgFinanzplanAdapter)
  public getBgFinanzplan(@Path('BgBudgetID') BgBudgetID: number): Observable<any> {
    return null;
  }
  @GET('api/v1/Sozialhilfe/BgGrundbedarf/ShStatusCodeToSql?BgBudgetID={BgBudgetID}')
  @Adapter(WohnkostenService.bgGrundbedarfAdapter)
  public getBgGrundbedarf(@Path('BgBudgetID') BgBudgetID: number): Observable<any> {
    return null;
  }
  @POST('api/v1/Sozialhilfe/BgWohnkosten/BgPositionsart')
  @Adapter(WohnkostenService.bgPositionsartAdapter)
  public getBgPositionsart(@Body formBody): Observable<any> {
    return null;
  }
  @GET('api/v1/Sozialhilfe/BgWohnkosten/BgPosition/{BgBudgetID}')
  @Adapter(WohnkostenService.bgBgPositionAdapter)
  public getBgPosition(@Path('BgBudgetID') BgBudgetID: number): Observable<any> {
    return null;
  }
  @GET('api/v1/Sozialhilfe/SozialhilfeCommon/WhKennzahlen/{BgFinanzPlanID}')
  @Adapter(WohnkostenService.whKennzahlenAdapter)
  public getWhKennzahlen(@Path('BgFinanzPlanID') BgFinanzPlanID: number): Observable<any> {
    return null;
  }
  @POST('api/v1/Sozialhilfe/BgWohnkosten/Richtlinien')
  @Adapter(WohnkostenService.richtlinienAdapter)
  public getRichtlinien(@Body formBody): Observable<any> {
    return null;
  }
  @DELETE('api/v1/Sozialhilfe/BgWohnkosten/BgPosition')
  @ViewCatcher()
  @Adapter(WohnkostenService.deleteWohnkostenAdapter)
  public deleteWohnkosten(@Body formBody): Observable<any> {
    return null;
  }
  @PUT('api/v1/Sozialhilfe/BgWohnkosten/BgPosition')
  @Adapter(WohnkostenService.updateWohnkostenAdapter)
  public updateWohnkosten(@Body formBody): Observable<any> {
    return null;
  }
  @POST('api/v1/Sozialhilfe/BgWohnkosten/BgPosition')
  @ViewCatcher()
  @Adapter(WohnkostenService.createWohnkostenAdapter)
  public addWohnkosten(@Body formBody): Observable<any> {
    return null;
  }
}
