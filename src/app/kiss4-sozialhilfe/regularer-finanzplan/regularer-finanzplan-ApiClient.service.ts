import { Injectable } from '@angular/core';
import { ICheck, IFinanzplan, IFinanzplanDropDown, IFinanzplanSaveParam } from '@app/kiss4-sozialhilfe/regularer-finanzplan/models';
import { Adapter, Body, DefaultHeaders, GET, HttpService, Path, PUT } from '@shared/asyncServices/http';
import { Observable } from 'rxjs';
import { RegularerFinanzplanService } from './regularer-finanzplan.service';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})
export class RegularerFinanzplanApiClient extends HttpService {

  @GET('api/v1/Sozialhilfe/WhPersonen/Header{query}')
  @Adapter(RegularerFinanzplanService.headerAdapter)
  getHeader(@Path('query') query: string): Observable<any> { return; }
  @GET('api/v1/Sozialhilfe/WhFinanzplan/BgFinanzplan{query}')
  @Adapter(RegularerFinanzplanService.finanzplanAdapter)
  getFinanzplan(@Path('query') query: string): Observable<IFinanzplan> { return; }
  @GET('api/v1/Sozialhilfe/WhFinanzplan/Checking{query}')
  @Adapter(RegularerFinanzplanService.checkAdapter)
  getCheckingInfo(@Path('query') query: string): Observable<ICheck[]> { return; }

  @GET('api/lookups/BgFPGrundEroeffnung')
  @Adapter(RegularerFinanzplanService.grundErAdapter)
  getGrundEr(): Observable<IFinanzplanDropDown[]> { return; }
  @GET('api/lookups/BgFPGrundAbschluss')
  @Adapter(RegularerFinanzplanService.grundAbAdapter)
  getGrundAb(): Observable<IFinanzplanDropDown[]> { return; }
  @GET('api/lookups/WhGrundbedarfTyp')
  @Adapter(RegularerFinanzplanService.grundbedarfTypeAdapter)
  getGrundbedarfType(): Observable<IFinanzplanDropDown[]> { return; }
  @GET('api/lookups/WhHilfeTyp')
  @Adapter(RegularerFinanzplanService.typeAdapter)
  getType(): Observable<IFinanzplanDropDown[]> { return; }
  @GET('api/lookups/BgBewilligungStatus')
  @Adapter(RegularerFinanzplanService.bewilligungStatusAdapter)
  getBewilligungStatus(): Observable<IFinanzplanDropDown[]> { return; }

  @PUT('api/v1/Sozialhilfe/WhFinanzplan/WhFinanzplan')
  @Adapter(RegularerFinanzplanService.saveFinanzplanAdapter)
  saveFinanzplan(@Body body: IFinanzplanSaveParam): Observable<any> { return; }

  @GET('api/v1/Sozialhilfe/WhFinanzplan/BgBewilligung{query}')
  @Adapter(RegularerFinanzplanService.verlaufDataFinanzplanAdapter)
  verlaufDataFinanzplan(@Path('query') query: string): Observable<any> { return; }

  @GET('api/lookups/BgBewilligung')
  @Adapter(RegularerFinanzplanService.verlaufDataFinanzplanAdapter)
  typVerlaufDataFinanzplan(): Observable<any> { return; }

}
