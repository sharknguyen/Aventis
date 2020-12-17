import {Injectable} from '@angular/core';
import {Adapter, Body, DefaultHeaders, GET, HttpService, Path, POST, PUT, ViewCatcher} from '@shared/asyncServices/http';
import {ZulagenEFBService} from '@app/kiss4-sozialhilfe/finanzplan/zulagen-efb/zulagen-efb.service';
import {Observable} from 'rxjs';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})

export class ZulagenEFBApiClient extends HttpService {
  @GET('api/v1/Sozialhilfe/AHVBeitrag/BgSilAHVBeitrag?bgBudgetID={query}')
  @Adapter(ZulagenEFBService.bgSilAHVBeitragAdapter)
  public getBgSilAHVBeitrag(@Path('query') query: any): Observable<any> {
    return null;
  }

  /**
   * get data Combobox
   */
  @GET('api/v1/Common/LovLookups{query}')
  @ViewCatcher()
  @Adapter(ZulagenEFBService.getDataCombobox)
  public getDataCombobx(@Path('query') query: any): Observable<any> {
    return null;
  }

  /**
   * get data BgPosition grid
   */
  @GET('api/v1/Sozialhilfe/Zulagen/Position{query}')
  @ViewCatcher()
  @Adapter(ZulagenEFBService.getBgPosition)
  public getBgPosition(@Path('query') query: any): Observable<any> {
    return null;
  }

  /**
   * get PR_MIN PR_MAX PR_DEF data
   */
  @POST('api/v1/Sozialhilfe/Zulagen/Richtlinie')
  @ViewCatcher()
  @Adapter(ZulagenEFBService.getRichtLinie)
  public getRichtLinie(@Body richtLinie: any): Observable<any> {
    return null;
  }

  /**
   * get sqlRichtlinie data
   */
  @GET('api/v1/Sozialhilfe/Zulagen/Positionsart{query}')
  @ViewCatcher()
  @Adapter(ZulagenEFBService.getBgPositionsart)
  public getBgPositionsart(@Path('query') query: any): Observable<any> {
    return null;
  }

  /**
   * get GetPositionsartID data
   */
  @GET('api/v1/Sozialhilfe/Zulagen/PositionsartId{query}')
  @ViewCatcher()
  @Adapter(ZulagenEFBService.getBgPositionsartId)
  public getBgPositionsartId(@Path('query') query: any): Observable<any> {
    return null;
  }

  /**
   * SaveBgPosition
   */
  @POST('api/v1/Sozialhilfe/Zulagen/Position')
  @ViewCatcher()
  @Adapter(ZulagenEFBService.saveBgPosition)
  public saveBgPosition(@Body bgPosition: any): Observable<any> {
    return null;
  }

  /**
   * SaveBgPosition
   */
  @PUT('api/v1/Sozialhilfe/Zulagen/Position')
  @ViewCatcher()
  @Adapter(ZulagenEFBService.saveBgPosition)
  public updateBgPosition(@Body bgPosition: any): Observable<any> {
    return null;
  }
}
