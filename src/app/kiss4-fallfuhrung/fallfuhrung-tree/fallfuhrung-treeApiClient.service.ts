import { Injectable } from '@angular/core';
import {
    Adapter,
    Body,
    DefaultHeaders,
    DELETE,
    GET,
    HttpService,
    Path,
    POST,
    PUT,
    ViewCatcher,
} from '@shared/asyncServices/http';
import { Observable } from 'rxjs';

import { FallfuhrungTreeService } from './fallfuhrung-tree.service';
import { InsertFaPhaseQueryModel, UpdateFaLeistungQueryModel } from './models/beratungsphase.model';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class FallfuhrungTreeApiClient extends HttpService {

    @GET('api/Basis/GetModulTree{query}')
    @Adapter(FallfuhrungTreeService.getTreeViewItems)
    public getTreeViewItems(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('/api/v1/Common/LovLookups?LOVName={LOVName}')
    @Adapter(FallfuhrungTreeService.getRightContentItems)
    public getRightContentItems(@Path('LOVName') LOVName: any): Observable<any> {
        return null;
    }

    @GET('api/common/Faleistung?FaLeistungID={FaLeistungID}')
    @Adapter(FallfuhrungTreeService.getUserIDFaLeistungOrFaPhase)
    public getUserIDFaLeistung(@Path('FaLeistungID') FaLeistungID: any): Observable<any> {
        return null;
    }

    @GET('api/Fallfuehrung/GetUserIDFaPhaseByID?FaPhaseID={FaPhaseID}')
    @Adapter(FallfuhrungTreeService.getUserIDFaLeistungOrFaPhase)
    public getUserIDFaPhase(@Path('FaPhaseID') FaPhaseID: any): Observable<any> {
        return null;
    }

    @GET('api/Basis/GetModulTree{query}')
    @Adapter(FallfuhrungTreeService.getBNavigatorItems)
    public getBNavigatorItems(@Path('query') query: any): Observable<any> {
        return null;
    }

    @DELETE('api/v1/fallfuehrung/faphase?FaPhaseID={query}')
    @Adapter(FallfuhrungTreeService.deleteFaPhaseAdapter)
    public deleteFaPhase(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/v1/fallfuehrung/Faleistung/GetDataUsedFaLeistungByFaLeistungID?FaLeistungID={query}')
    @Adapter(FallfuhrungTreeService.getFaleistungAdapter)
    public getFaLeistung(@Path('query') query: any): Observable<any> {
        return null;
    }

    @DELETE('api/Fallfuehrung/FaModulTree?FaLeistungID={query}')
    @Adapter(FallfuhrungTreeService.deleteFallverlaufAdapter)
    public deleteFallverlauf(@Path('query') query: any): Observable<any> {
        return null;
    }

    @DELETE('api/Basis/DeleteBaPersonRelation{query}')
    @Adapter(FallfuhrungTreeService.deleteBaPersonRelation)
    public deleteBaPersonRelation(@Path('query') query: any): Observable<any> {
        return null;
    }

    // Get FaLeistung By BaPersonID
    @GET('api/Fallfuehrung/GetFaLeistungByBaPersonID?BaPersonID={query}')
    @Adapter(FallfuhrungTreeService.getFaLeistungByBaPersonIDAdapter)
    public getFaLeistungByBaPersonID(@Path('query') query: any): Observable<any> {
        return null;
    }

    // Get CountFa Phase
    @GET('api/v1/Common/Faleistung/GetCountFaPhase?FaLeistungID={query}')
    @Adapter(FallfuhrungTreeService.getCountFaPhaseAdapter)
    public getCountFaPhase(@Path('query') query: any): Observable<any> {
        return null;
    }

    // Get FaPhase By FaLeistungID
    @GET('api/Fallfuehrung/GetFaPhaseByFaLeistungID?FaLeistungID={query}')
    @Adapter(FallfuhrungTreeService.getFaPhaseByFaLeistungIDAdapter)
    public getFaPhaseByFaLeistungID(@Path('query') query: any): Observable<any> {
        return null;
    }

    // Insert FaPhase
    @POST('api/v1/fallfuehrung/faphase')
    @ViewCatcher()
    @Adapter(FallfuhrungTreeService.insertFaPhaseAdapter)
    public insertFaPhase(
        @Body data: InsertFaPhaseQueryModel): Observable<any> {
        return null;
    }

    // updateFaLeistungDataAdapter
    @PUT('api/common/Faleistung')
    @ViewCatcher()
    @Adapter(FallfuhrungTreeService.updateFaLeistungDataAdapter)
    public updateFaleistungData(
        @Body data: UpdateFaLeistungQueryModel): Observable<any> {
        return null;
    }

    // Get Config Int
    @GET('/api/Common/GetConfigInt{query}')
    @Adapter(FallfuhrungTreeService.getConfigIntAdapter)
    public getConfigIntData(@Path('query') query: any): Observable<any> {
        return null;
    }

    // Get Config Bool
    @GET('api/Fallfuehrung/GetConfigBool{query}')
    @Adapter(FallfuhrungTreeService.getConfigBoolAdapter)
    public getConfigBoolData(@Path('query') query: any): Observable<any> {
        return null;
    }

    // Get MLMessage
    @GET('api/Common/MLMessage{query}')
    @Adapter(FallfuhrungTreeService.getMessageInformationAdapter)
    public getMessageInformation(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/Basis/GetCountBgFinanzPlan{query}')
        @Adapter(FallfuhrungTreeService.getCountBgFinanzPlan)
        public getCountBgFinanzPlan(@Path('query') query: any): Observable<any> {
            return null;
    }

    @GET('api/Fallfuehrung/GetBaPersonID_ModulID?FaLeistungID={faLeistungID}')
    @Adapter(FallfuhrungTreeService.getBaPersonIDModulID)
    public getBaPersonIDModulID(@Path('faLeistungID') faLeistungID: any): Observable<any> {
        return null;
    }

    @GET('api/v1/Main/FallNavigator/TreeFallNavigator{query}')
    @ViewCatcher()
    @Adapter(FallfuhrungTreeService.getTreeFallNavigator)
    public getTreeFallNavigator(@Path('query') query: any): Observable<any> {
        return null;
    }
}
