import { Injectable } from '@angular/core';
import { VermogenService } from '@app/kiss4-sozialhilfe/finanzplan/vermogen/vermogen.service';
import { Adapter, DefaultHeaders, GET, HttpService, Path, ViewCatcher, DELETE, Body, POST, PUT } from '@shared/asyncServices/http';
import { Observable } from 'rxjs';


@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class VermogenApiClient extends HttpService {

    /**
     * get data BgPosition (grid)
     */
    @GET('api/v1/Sozialhilfe/Vermoegen/Position{query}')
    @ViewCatcher()
    @Adapter(VermogenService.getBgPosition)
    public getBgPosition(@Path('query') query: any): Observable<any> {
        return null;
    }

    /**
     * get BgFinanzplan (headerbar)
     */
    @GET('api/v1/Sozialhilfe/Vermoegen/Finanzplan{query}')
    @ViewCatcher()
    @Adapter(VermogenService.getBgFinanzplan)
    public getBgFinanzplan(@Path('query') query: any): Observable<any> {
        return null;
    }

    /**
     * get Personen (selectbox)
     */
    @GET('api/v1/Sozialhilfe/SozialhilfeCommon/PersonenUnterstuetzt{query}')
    @ViewCatcher()
    @Adapter(VermogenService.getPersonen)
    public getPersonen(@Path('query') query: any): Observable<any> {
        return null;
    }

    /**
     * get WhPositionsart (selectbox)
     */
    @GET('api/v1/Sozialhilfe/Vermoegen/Positionsart{query}')
    @ViewCatcher()
    @Adapter(VermogenService.getWhPositionsart)
    public getWhPositionsart(@Path('query') query: any): Observable<any> {
        return null;
    }

    /**
     * delete BgPosition
     */
    @DELETE('api/v1/Sozialhilfe/Vermoegen/Position')
    @ViewCatcher()
    @Adapter(VermogenService.deleteBgPosition)
    public deleteBgPosition(@Body obj: any): Observable<any> {
        return null;
    }

    /**
     * Calculate Freibetrag & Angerechnet
     */
    @GET('api/v1/Sozialhilfe/Vermoegen/CalculateFreibetra{query}')
    @ViewCatcher()
    @Adapter(VermogenService.getFreibetrag)
    public getFreibetrag(@Path('query') query: any): Observable<any> {
        return null;
    }

    /**
     * Insert BgPosition
     */
    @POST('api/v1/Sozialhilfe/Vermoegen/Position/')
    @ViewCatcher()
    @Adapter(VermogenService.insertBgPosition)
    public insertBgPosition(@Body obj: any): Observable<any> {
        return null;
    }

    /**
     * Update BgPosition
     */
    @PUT('api/v1/Sozialhilfe/Vermoegen/Position/')
    @ViewCatcher()
    @Adapter(VermogenService.updateBgPosition)
    public updateBgPosition(@Body obj: any): Observable<any> {
        return null;
    }

    /**
     * Get status code editable
     * @param query
     */
    @GET('api/v1/Sozialhilfe/AHVBeitrag/BgSilAHVBeitrag?bgBudgetID={query}')
    @Adapter(VermogenService.bgSilAHVBeitragAdapter)
    public getBgSilAHVBeitrag(@Path('query') query: any): Observable<any> {
        return null;
    }
}
