import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, DELETE, Path, Body, ViewCatcher, POST } from '@shared/asyncServices/http';
import { Observable } from 'rxjs';

import { SozialhilfeTreeService } from './sozialhilfe-tree.service';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class SozialhilfeTreeApiClient extends HttpService {

    // TO DO NEW API : @GET('api/v1/Common/ModuleTree/TreeNode{query}')
    // TO DO OLD API : @GET('api/Basis/GetModulTree{query}')
    @GET('api/v1/Common/ModuleTree/TreeNode{query}')
    @Adapter(SozialhilfeTreeService.getTreeViewItems)
    public getTreeViewItems(@Path('query') query: any): Observable<any> {
        return null;
    }
    // Delete budget
    @DELETE('api/v1/Sozialhilfe/ModuleTree/BgBudget')
    @ViewCatcher()
    @Adapter(SozialhilfeTreeService.deleteBudget)
    public deleteBudget(@Body data: any): Observable<any> {
        return null;
    }
    // Create budget
    @POST('api/v1/Sozialhilfe/ModuleTree/BgBudget')
    @ViewCatcher()
    @Adapter(SozialhilfeTreeService.createBudget)
    public createBudget(@Body data: any): Observable<any> {
        return null;
    }
    // delete FinancialPlan
    @DELETE('api/v1/Sozialhilfe/ModuleTree/FinancialPlan')
    @ViewCatcher()
    @Adapter(SozialhilfeTreeService.deleteFinancialPlan)
    public deleteFinancialPlan(@Body data: any): Observable<any> {
        return null;
    }
    // Create FinancialPlan
    @POST('api/v1/Sozialhilfe/ModuleTree/FinancialPlan')
    @ViewCatcher()
    @Adapter(SozialhilfeTreeService.createFinancialPlan)
    public createFinancialPlan(@Body data: any): Observable<any> {
        return null;
    }
    // delete Sozialhilfe
    @DELETE('api/v1/Sozialhilfe/WhLeistung/Leistung')
    @ViewCatcher()
    @Adapter(SozialhilfeTreeService.deleteFinancialPlan)
    public deleteSozialhilfe(@Body data: any): Observable<any> {
        return null;
    }
    // Create Sozialhilfe
    @POST('api/v1/Sozialhilfe/ModuleTree/Sozialhilfe')
    @ViewCatcher()
    @Adapter(SozialhilfeTreeService.createFinancialPlan)
    public createSozialhilfe(@Body data: any): Observable<any> {
        return null;
    }
}
