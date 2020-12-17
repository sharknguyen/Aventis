import { Injectable } from '@angular/core';
import { UpdateBeforePostQueryModel, UpdateFormDataQueryModel } from '@app/kiss4-sozialhilfe/finanzplan/grund-bedarf/models';
import { Adapter, Body, DefaultHeaders, GET, HttpService, Path, PUT, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';
import { GrundBedarfService } from './grund-bedarf.service';




@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class GrundBedarfApiClient extends HttpService {

    // Load Berechnungsgrundlage select box data
    @GET('api/lookups/WhGrundbedarfTyp')
    @ViewCatcher()
    @Adapter(GrundBedarfService.getBerechnungsgrundlageSelcectboxDataAdapter)
    public getSelectboxDatas(): Observable<any> {
        return null;
    }
    // Load QryBgPosition data
    @GET('api/v1/Sozialhilfe/BgGrundbedarf/BgPosition{query}')
    @ViewCatcher()
    @Adapter(GrundBedarfService.loadQryBgPositionDataAdapter)
    public loadGrundBedarfQryBgPositionData(@Path('query') query: string): Observable<any> {
        return null;
    }
    // Load QryKennzahlen data
    @GET('api/v1/Sozialhilfe//WhPersonen/WhKennzahlen{query}')
    @ViewCatcher()
    @Adapter(GrundBedarfService.loadQryKennzahlenDataAdapter)
    public loadGrundBedarfQryKennzahlenData(@Path('query') query: string): Observable<any> {
        return null;
    }
    // Update from data
    @PUT('api/v1/Sozialhilfe/BgGrundbedarf/BgGrundbedarf')
    @ViewCatcher()
    @Adapter(GrundBedarfService.updateFormDataAdapter)
    public updateFormData(
        @Body data: UpdateFormDataQueryModel): Observable<any> {
        return null;
    }
    @GET('api/v1/Sozialhilfe/WhPersonen/Header{query}')
    @ViewCatcher()
    @Adapter(GrundBedarfService.getStatusCodeDataAdapter)
    getStatusCodeDatas(@Path('query') query: string): Observable<any> {
        return null;
    }
    // Load init data
    @GET('api/v1/Sozialhilfe/BgGrundbedarf/BgBudget{query}')
    @ViewCatcher()
    @Adapter(GrundBedarfService.loadInitFormDataAdapter)
    public loadInitGrundBedarfFormData(@Path('query') query: string): Observable<any> {
        return null;
    }
    // Load Richtlinie data
    @GET('api/v1/Sozialhilfe/BgGrundbedarf/Richtlinie{query}')
    @ViewCatcher()
    @Adapter(GrundBedarfService.loadRichtlinieDataAdapter)
    public loadRichtlinieData(@Path('query') query: string): Observable<any> {
        return null;
    }
    @GET('api/v1/Sozialhilfe/BgGrundbedarf/PauschaleSTE')
    @ViewCatcher()
    @Adapter(GrundBedarfService.getPauschaleSTEDataAdapter)
    public loadPauschaleSTEData(): Observable<any> {
        return null;
    }
    // update before post
    @PUT('api/v1/Sozialhilfe/BgGrundbedarf/BgPosition')
    @ViewCatcher()
    @Adapter(GrundBedarfService.updateBeforePostAdapter)
    public updateBeforePost(
        @Body data: UpdateBeforePostQueryModel): Observable<any> {
        return null;
    }
    @GET('api/v1/Sozialhilfe/BgGrundbedarf/ShStatusCodeToSql{query}')
    @ViewCatcher()
    @Adapter(GrundBedarfService.getShStatusCodeToSqlDataAdapter)
    public loadShStatusCodeToSqlData(@Path('query') query: string): Observable<any> {
        return null;
    }
}
