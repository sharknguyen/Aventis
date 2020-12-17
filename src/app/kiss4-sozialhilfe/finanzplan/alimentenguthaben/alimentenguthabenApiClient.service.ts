import { HttpService, DefaultHeaders, POST, ViewCatcher, Body, Adapter, GET, Path, PUT, DELETE } from '@shared/asyncServices/http';
import { Injectable } from '@angular/core';
import { AlimentenguthabenService } from './alimentenguthaben.service';
import { Observable } from 'rxjs';
import { Alimentenguthaben } from './models';

@Injectable()
@DefaultHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
})

export class AlimentenguthabenApiClient extends HttpService {
  @GET('api/v1/Sozialhilfe/BgAlimente/Alimentenguthaben?bgBudgetID={bgBudgetID}&bgGruppeCode={bgGruppeCode}&nurAktuelle={nurAktuelle}')
  @ViewCatcher()
  @Adapter(AlimentenguthabenService.getListData)
  public getListData(@Path('bgBudgetID') bgBudgetID: any, @Path('bgGruppeCode') bgGruppeCode: any, @Path('nurAktuelle') nurAktuelle: boolean): Observable<any> {
    return null;
  }

  @GET('api/v1/Sozialhilfe/BgAlimente/Alimentenguthaben/LookUpBgPosition?bgGruppeCode={bgGruppeCode}&value={value}&bgBudgetID={bgBudgetID}')
  @ViewCatcher()
  @Adapter(AlimentenguthabenService.getListData)
  public getInkasso(@Path('bgGruppeCode') bgGruppeCode: any, @Path('value') value: boolean, @Path('bgBudgetID') bgBudgetID: number): Observable<any> {
    return null;
  }

  @GET('api/v1/Sozialhilfe/SozialhilfeCommon/PersonenUnterstuetzt?bgBudgetID={bgBudgetID}')
  @ViewCatcher()
  @Adapter(AlimentenguthabenService.getListData)
  public getPersonenUnterstuetztn(@Path('bgBudgetID') bgBudgetID: any): Observable<any> {
    return null;
  }
  // New
  @POST('api/v1/Sozialhilfe/BgAlimente/Alimentenguthaben')
  @ViewCatcher()
  @Adapter(AlimentenguthabenService.newAlimentenguthaben)
  public newAlimentenguthaben(@Body alimentenguthaben: Alimentenguthaben): Observable<any> {
    return null;
  }
  // Edit
  @PUT('api/v1/Sozialhilfe/BgAlimente/Alimentenguthaben')
  @ViewCatcher()
  @Adapter(AlimentenguthabenService.saveAlimentenguthaben)
  public saveAlimentenguthaben(@Body alimentenguthaben: Alimentenguthaben): Observable<any> {
    return null;
  }

  // Delete
  @DELETE('api/v1/Sozialhilfe/BgAlimente/Alimentenguthaben')
  @ViewCatcher()
  @Adapter(AlimentenguthabenService.deleteAlimentenguthaben)
  public deleteAlimentenguthaben(@Body alimentenguthaben: Alimentenguthaben): Observable<any> {
    return null;
  }

  @GET('api/v1/Sozialhilfe/BgAlimente/Alimentenguthaben/BgBewilligungStatusCode?bgBudgetID={bgBudgetID}')
  @ViewCatcher()
  @Adapter(AlimentenguthabenService.getListData)
  public getTitle(@Path('bgBudgetID') bgBudgetID: number): Observable<any> {
    return null;
  }
}
