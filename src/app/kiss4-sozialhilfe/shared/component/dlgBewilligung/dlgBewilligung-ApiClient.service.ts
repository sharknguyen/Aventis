import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, Path, POST, Body} from '@shared/asyncServices/http';
import { Observable } from 'rxjs';
import { DlgBewilligungService } from '@app/kiss4-sozialhilfe/shared/component/dlgBewilligung/dlgBewilligung.service';
import { ICheck, IFinanzplan, IFinanzplanDropDown, IFinanzplanSaveParam } from '@app/kiss4-sozialhilfe/shared/component/dlgBewilligung/models';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})
export class DlgBewilligungApiClient extends HttpService {

  @GET('api/v1/Sozialhilfe/WhPersonen/Header{query}')
  @Adapter(DlgBewilligungService.headerAdapter)
  getHeader(@Path('query') query: string): Observable<any> { return; }
  @GET('api/v1/Sozialhilfe/WhFinanzplan/QryBgFinanzplan{query}')
  @Adapter(DlgBewilligungService.finanzplanAdapter)
  getFinanzplan(@Path('query') query: string): Observable<IFinanzplan> { return; }
  @GET('api/v1/Sozialhilfe/WhFinanzplan/QryCheck{query}')
  @Adapter(DlgBewilligungService.checkAdapter)
  getCheckingInfo(@Path('query') query: string): Observable<ICheck[]> { return; }

  @GET('api/lookups/BgFPGrundEroeffnung')
  @Adapter(DlgBewilligungService.grundErAdapter)
  getGrundEr(): Observable<IFinanzplanDropDown[]> { return; }
  @GET('api/lookups/BgFPGrundAbschluss')
  @Adapter(DlgBewilligungService.grundAbAdapter)
  getGrundAb(): Observable<IFinanzplanDropDown[]> { return; }
  @GET('api/lookups/WhGrundbedarfTyp')
  @Adapter(DlgBewilligungService.grundbedarfTypeAdapter)
  getGrundbedarfType(): Observable<IFinanzplanDropDown[]> { return; }
  @GET('api/lookups/WhHilfeTyp')
  @Adapter(DlgBewilligungService.typeAdapter)
  getType(): Observable<IFinanzplanDropDown[]> { return; }
  @GET('api/lookups/BgBewilligungStatus')
  @Adapter(DlgBewilligungService.bewilligungStatusAdapter)
  getBewilligungStatus(): Observable<IFinanzplanDropDown[]> { return; }

  @POST('api/v1/Sozialhilfe/WhFinanzplan/WhFinanzplan')
  @Adapter(DlgBewilligungService.saveFinanzplanAdapter)
  saveFinanzplan(@Body body: IFinanzplanSaveParam): Observable<any> { return; }
}
