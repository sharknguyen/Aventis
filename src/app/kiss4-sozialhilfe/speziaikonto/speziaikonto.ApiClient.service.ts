import { Injectable } from '@angular/core';
import { DefaultHeaders, HttpService, GET, ViewCatcher, POST, Path, Body, PUT, DELETE, Adapter, PATCH } from '@shared/asyncServices/http';
import { Observable } from 'rxjs';
import { SpezialkontoService } from './speziaikonto.service';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class SpezialkontoApiClient extends HttpService {
    @GET('api/v1/Sozialhilfe/WhSpezialkonto/MasterData')
    @ViewCatcher()
    public getMasterDataCbx(): Observable<any> {
        return null;
    }

    // Load data grid top
    @GET('api/v1/Sozialhilfe/WhSpezialkonto/BgSpezkonto{query}')
    @ViewCatcher()
    @Adapter(SpezialkontoService.gridAdapter)
    public loadDataGridTop(@Path('query') query: any): Observable<any> {
        return null;
    }

    // Load data grid detail
    @GET('api/v1/Sozialhilfe/WhSpezialkonto/BgPosition{query}')
    @ViewCatcher()
    @Adapter(SpezialkontoService.gridDetailAdapter)
    public loadDataGridDetail(@Path('query') query: any): Observable<any> {
        return null;
    }

    // Load BaPerson
    @GET('api/v1/Sozialhilfe/WhSpezialkonto/BaPerson/ByFaLeistung/{id}')
    @ViewCatcher()
    public loadBaPerson(@Path('id') id: any): Observable<any> {
        return null;
    }

    // Load BgKostenart
    @GET('api/v1/Sozialhilfe/WhSpezialkonto/BgKostenart{query}')
    @ViewCatcher()
    public loadBgKostenart(@Path('query') query: any): Observable<any> {
        return null;
    }

    // Load DatumVon
    @GET('api/v1/Sozialhilfe/WhSpezialkonto/DatumVon/{id}')
    @ViewCatcher()
    public loadDatumVon(@Path('id') id: any): Observable<any> {
        return null;
    }

    // Load BgPosArt
    @GET('api/v1/Sozialhilfe/WhSpezialkonto/BgPosArt/{bgPositionsartID}')
    @ViewCatcher()
    public loadBgPosArt(@Path('bgPositionsartID') bgPositionsartID: any): Observable<any> {
        return null;
    }

    // Create
    @POST('api/v1/Sozialhilfe/WhSpezialkonto/BgSpezkonto')
    @ViewCatcher()
    public createSpeziaikonto(@Body data: any): Observable<any> {
        return null;
    }

    // Edit
    @PUT('api/v1/Sozialhilfe/WhSpezialkonto/BgSpezkonto/{bgSpezkontoId}/{numberSaldo}')
    @ViewCatcher()
    public editSpeziaikonto(@Body speziaikonto: any, @Path('bgSpezkontoId') bgSpezkontoId: number, @Path('numberSaldo') numberSaldo: number): Observable<any> {
        return null;
    }

    // Delete
    @DELETE('api/v1/Sozialhilfe/WhSpezialkonto/BgSpezkonto')
    @ViewCatcher()
    public deleteSpeziaikonto(@Body data: any): Observable<any> {
        return null;
    }

    @GET('api/v1/Sozialhilfe/WhSpezialkonto/Positionsarten')
    @ViewCatcher()
    public getPositionsarten(): Observable<any> {
        return null;
    }

    // AbschliessenVisible
    @GET('api/v1/Sozialhilfe/WhSpezialkonto/AbschliessenVisible')
    @ViewCatcher()
    public getAbschliessenVisible(): Observable<any> {
        return null;
    }

    // MaxSanktion
    @GET('api/v1/Sozialhilfe/WhSpezialkonto/MaxSanktion')
    @ViewCatcher()
    public getMaxSanktion(): Observable<any> {
        return null;
    }

    @PUT('api/v1/Sozialhilfe/WhSpezialkonto/AbschliessenUndo')
    @ViewCatcher()
    public getAbschliessenUndo(@Body data: any): Observable<any> {
        return null;
    }

    @PUT('api/v1/Sozialhilfe/WhSpezialkonto/UebergabeAnInkasso')
    @ViewCatcher()
    public getUebergabeAnInkasso(@Body data: any): Observable<any> {
        return null;
    }

    @PUT('api/v1/Sozialhilfe/WhSpezialkonto/KontoWirdNichtAusgeglichen')
    @ViewCatcher()
    public getKontoWirdNichtAusgeglichen(@Body data: any): Observable<any> {
        return null;
    }

    @GET('api/v1/Sozialhilfe/WhSpezialkonto/AbzahlungskontoAbschliessen')
    @ViewCatcher()
    public getConfigEditierbar(): Observable<any> {
        return null;
    }

    // Update Kuzungen
    @PUT('api/v1/Sozialhilfe/WhSpezialkonto/BgSpezkonto/{bgSpezkontoId}/{numberSaldo}/{inAcktive}')
    @ViewCatcher()
    public updateKuzung(@Body speziaikonto: any, @Path('bgSpezkontoId') bgSpezkontoId: number, @Path('numberSaldo') numberSaldo: number, @Path('inAcktive') inAcktive: number): Observable<any> {
        return null;
    }

    // Create Kuzungen
    @POST('api/v1/Sozialhilfe/WhSpezialkonto/BgSpezkonto/{inAcktive}')
    @ViewCatcher()
    public createKuzung(@Body speziaikonto: any, @Path('inAcktive') inAcktive: number): Observable<any> {
        return null;
    }
}
