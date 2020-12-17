import { Injectable } from '@angular/core';
import { Adapter, Body, DefaultHeaders, GET, HttpService, Path, POST, PUT, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

import { AsvexportService } from './asvexport.service';
import {
    ModelQueryInsertASVSExport,
    ModelQueryUpdateASVSExport,
    ModelQueryUpdateTransaction,
} from './models/asvexport.model';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class AsvexportApiClient extends HttpService {

    /**
* *****************************************************************
* Load asvexport list
* *****************************************************************
*/
    @GET('api/v1/Sozialhilfe/WhASVSExport/SstASVSExports')
    @ViewCatcher()
    @Adapter(AsvexportService.gridAdapter)
    public getAsvexports(): Observable<any> {
        return null;
    }

    /**
* *****************************************************************
* Load Asvex Eintrage Grid
* *****************************************************************
*/
    @GET('api/v1/Sozialhilfe/WhASVExport/SstAVSEintrag{query}')
    @ViewCatcher()
    @Adapter(AsvexportService.getGridAsvEintrage)
    public getAsvEintrage(@Path('query') query: any): Observable<any> {
        return null;
    }
    /**
* *****************************************************************
* Load File Binary Data
* *****************************************************************
*/
    @GET('api/v1/Sozialhilfe/WhASVExport/FileBinary?documentID={query}')
    @ViewCatcher()
    @Adapter(AsvexportService.getFileBinary)
    public getFileBinaryByDocumnetID(@Path('query') query: any): Observable<any> {
        return null;
    }
    /**
* *****************************************************************
* Get XOrgUnit All Data
* *****************************************************************
*/
    @GET('api/v1/Sozialhilfe/WhASVSExport/XOrgUnits')
    @ViewCatcher()
    @Adapter(AsvexportService.gridXOrgUnit)
    public getXOrgUnits(): Observable<any> {
        return null;
    }

    /**
* *****************************************************************
* Insert One Row In Grid SstASVSExport Api
* *****************************************************************
*/
    @POST('api/Sozialhilfe/SstASVSExportCommand')
    @ViewCatcher()
    @Adapter(AsvexportService.insertSstASVSExportAdapter)
    public insertSstASVSExport(@Body sstASVSExport: ModelQueryInsertASVSExport): Observable<any> {
        return null;
    }

    /**
 * *****************************************************************
 * UpdateASVSExportData  api
 * *****************************************************************
 */
    @PUT('api/v1/Sozialhilfe/WhASVExport/SstASVSExport/{ID}')
    @ViewCatcher()
    @Adapter(AsvexportService.updateSstASVSExport)
    public updateASVSExport(@Body modelQueryASVSExport: ModelQueryUpdateASVSExport,  @Path('ID') sstASVSExportID: number): Observable<any> {
        return null;
    }
    /**
 * *****************************************************************
 * Update ASVSExport Data Transaction api
 * *****************************************************************
 */
    @PUT('api/v1/Sozialhilfe/WhASVExport/SstASVSExportTransaction')
    @ViewCatcher()
    @Adapter(AsvexportService.updateSstASVSExportTransaction)
    public updateASVSExportTransaction(@Body modelQueryASVSExportTransaction: ModelQueryUpdateTransaction): Observable<any> {
        return null;
    }
}
