import {Observable} from '@node_modules/rxjs';
import {Adapter, DefaultHeaders, GET, HttpService, Path, ViewCatcher} from '@shared/asyncServices/http';
import {Injectable} from '@node_modules/@angular/core';
import {FinanzplanService} from '@app/kiss4-sozialhilfe/finanzplan/finanzplan.service';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})

export class FinanzplanApiClient extends HttpService {
  @GET('api/v1/Sozialhilfe/AHVBeitrag/BgSilAHVBeitrag?bgBudgetID={query}')
  @Adapter(FinanzplanService.bgSilAHVBeitragAdapter)
  public getBgSilAHVBeitrag(@Path('query') query: any): Observable<any> {
    return null;
  }
  @GET('api/v1/Sozialhilfe/Uebersicht/Finanzplan?bgBudgetID={query}')
  @ViewCatcher()
  @Adapter(FinanzplanService.getFinanzplan)
  public getFinanzplan(@Path('query') query: any): Observable<any> {
    return null;
  }
}
