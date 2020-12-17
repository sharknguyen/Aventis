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

import { FaModulTreeService } from './fa-modul-tree.service';
import { InsertFaPhaseQueryModel, UpdateFaLeistungQueryModel } from './models';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class FaModulTreeApiClient extends HttpService {
    @GET('api/Basis/GetModulTree{query}')
    @ViewCatcher()
    @Adapter(FaModulTreeService.getTreeViewItems)
    public getTreeViewItems(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('/api/v1/Common/LovLookups?LOVName={LOVName}')
    @ViewCatcher()
    @Adapter(FaModulTreeService.getRightContentItems)
    public getRightContentItems(@Path('LOVName') LOVName: any): Observable<any> {
        return null;
    }

    @GET('api/common/Faleistung?FaLeistungID={FaLeistungID}')
    @ViewCatcher()
    @Adapter(FaModulTreeService.getUserIDFaLeistungOrFaPhase)
    public getUserIDFaLeistung(@Path('FaLeistungID') FaLeistungID: any): Observable<any> {
        return null;
    }

    @GET('api/v1/Fallfuehrung/FaPhase/{FaPhaseID}')
    @ViewCatcher()
    @Adapter(FaModulTreeService.getUserIDFaLeistungOrFaPhase)
    public getUserIDFaPhase(@Path('FaPhaseID') FaPhaseID: any): Observable<any> {
        return null;
    }

    @GET('api/common/Faleistung?BaPersonID={query}')
    @ViewCatcher()
    @Adapter(FaModulTreeService.getFaLeistungByBaPersonID)
    public getFaLeistungByBaPersonID(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/v1/Fallfuehrung/famodultree/FaPhaseNumber?faleistungid={query}')
    @ViewCatcher()
    @Adapter(FaModulTreeService.getCountFaPhase)
    public getCountFaPhase(@Path('query') query: any): Observable<any> {
        return null;
    }

    @POST('api/Common/GetConfigInt')
    @ViewCatcher()
    @Adapter(FaModulTreeService.getConfigInt)
    public getConfigInt(@Body data: any): Observable<any> {
        return null;
    }

    @GET('api/Common/GetConfigBool{query}')
    @ViewCatcher()
    @Adapter(FaModulTreeService.getConfigBool)
    public getConfigBool(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/Fallfuehrung/GetFaPhaseByFaLeistungID?FaLeistungID={query}')
    @ViewCatcher()
    @Adapter(FaModulTreeService.getFaPhaseByFaLeistungID)
    public getFaPhaseByFaLeistungID(@Path('query') query: any): Observable<any> {
        return null;
    }

    @PUT('api/common/Faleistung')
    @ViewCatcher()
    @Adapter(FaModulTreeService.updateFaLeistungData)
    public updateFaleistung(@Body data: UpdateFaLeistungQueryModel): Observable<any> {
        return null;
    }

    @POST('api/v1/fallfuehrung/faphase')
    @ViewCatcher()
    @Adapter(FaModulTreeService.insertFaPhase)
    public insertFaPhase(
        @Body data: InsertFaPhaseQueryModel): Observable<any> {
        return null;
    }

    @GET('api/Common/MLMessage{query}')
    @ViewCatcher()
    @Adapter(FaModulTreeService.getMessageInformation)
    public getMessageInformation(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/v1/fallfuehrung/famodultree/DataUsedFaLeistung?FaLeistungID={query}')
    @ViewCatcher()
    @Adapter(FaModulTreeService.getDataUsedFaLeistungByFaLeistungID)
    public getDataUsedFaLeistungByFaLeistungID(@Path('query') query: any): Observable<any> {
        return null;
    }

    @DELETE('api/v1/Fallfuehrung/Famodultree?FaLeistungID={query}')
    @ViewCatcher()
    @Adapter(FaModulTreeService.deleteFallverlauf)
    public deleteFallverlauf(@Path('query') query: any): Observable<any> {
        return null;
    }

    @DELETE('api/v1/fallfuehrung/faphase?FaPhaseID={query}')
    @ViewCatcher()
    @Adapter(FaModulTreeService.deletePhase)
    public deletePhase(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/common/Faleistung?FaLeistungID={faLeistungID}')
    @ViewCatcher()
    @Adapter(FaModulTreeService.getBaPersonIDModulID)
    public getBaPersonIDModulID(@Path('faLeistungID') faLeistungID: any): Observable<any> {
        return null;
    }

    @GET('api/v1/Main/FallNavigator/TreeFallNavigator{query}')
    @ViewCatcher()
    @Adapter(FaModulTreeService.getTreeFallNavigator)
    public getTreeFallNavigator(@Path('query') query: any): Observable<any> {
        return null;
    }
}
