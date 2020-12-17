import { Injectable } from '@angular/core';
import { InitFormDataQuery, QryKennzahlenQuery, StatusCodeQuery, UpdateBeforePostQueryModel, UpdateFormDataQueryModel } from '@app/kiss4-sozialhilfe/finanzplan/grund-bedarf/models';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import { Subscription } from 'rxjs/rx';
import * as grundBedarfStore from './store';
import * as GrundBedarfAction from './store/actions/grund-bedarf.action';


@Injectable()
export class GrundBedarfSandbox extends Sandbox {
  // Get data for select box
  public GetDataSourceSelectboxData$ = this.grundBedarfState$.select(
    grundBedarfStore.getBerechnungsgrundlageSelectBoxData
  );
  // Load QryBgPosition Form Data
  public LoadGrundBedarfQryBgPositionFormData$ = this.grundBedarfState$.select(
    grundBedarfStore.getGrundBedarfqryBgPositionData
  );
  // Load QryKennzahlen Form Data
  public LoadGrundBedarfQryKennzahlenFormData$ = this.grundBedarfState$.select(
    grundBedarfStore.getGrundBedarfqryKennzahlenData
  );
  // Load Init Form Data
  public LoadGrundBedarfInitFormData$ = this.grundBedarfState$.select(
    grundBedarfStore.getGrundBedarfInitFormData
  );
  // Load Richtlinie Data
  public LoadRichtlinieData$ = this.grundBedarfState$.select(
    grundBedarfStore.getGrundBedarfRichtlinieData
  );
  // Load PauschaleSTE Data
  public LoadPauschaleSTEData$ = this.grundBedarfState$.select(
    grundBedarfStore.getGrundBedarfPauschaleSTEData
  );
  // Update Form Data
  public UpdateGrundBedarfFormData$ = this.grundBedarfState$.select(
    grundBedarfStore.getGrundBedarfUpdateFormData
  );
  // Update Before Post Data
  public UpdateGrundBedarfBeforePostData$ = this.grundBedarfState$.select(
    grundBedarfStore.getGrundBedarfUpdateBeforePostData
  );
  // Load status code Data
  public LoadStatusCodeData$ = this.grundBedarfState$.select(
    grundBedarfStore.getStatusCodeData
  );
   // Load ShStatusCodeToSql Data
   public LoadShStatusCodeToSqlData$ = this.grundBedarfState$.select(
    grundBedarfStore.getShStatusCodeToSqlData
  );
  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState$: Store<store.State>,
    private grundBedarfState$: Store<grundBedarfStore.GrundBedarfState>
  ) {
    super(appState$);
  }

  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  // get select box data
  public loadSelectboxData(): void {
    this.grundBedarfState$.dispatch(new GrundBedarfAction.LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataAction());
  }
  // get QryBgPosition data
  public loadGrundBedarfQryBgPositionData(initFormDataQuery?: InitFormDataQuery): void {
    this.grundBedarfState$.dispatch(new GrundBedarfAction.GrundBedarfQryBgPositionData.LoadGrundBedarfQryBgPositionDataAction(initFormDataQuery));
  }
  // get QryKennzahlen data
  public loadGrundBedarfQryKennzahlenData(qryKennzahlenQuery?: QryKennzahlenQuery): void {
    this.grundBedarfState$.dispatch(new GrundBedarfAction.GrundBedarfQryKennzahlenData.LoadGrundBedarfQryKennzahlenDataAction(qryKennzahlenQuery));
  }
  // get Init Form data
  public loadGrundBedarfInitFormData(initFormDataQuery?: InitFormDataQuery): void {
    this.grundBedarfState$.dispatch(new GrundBedarfAction.GrundBedarfInitFormData.LoadGrundBedarfInitFormDataAction(initFormDataQuery));
  }
  // Update Form data
  public updateFormData(model: UpdateFormDataQueryModel): void {
    this.grundBedarfState$.dispatch(new GrundBedarfAction.GrundBedarfUpdateFormData.UpdateGrundBedarfFormDataAction(model));
  }
  // Update Before Post data
  public updateBeforePostData(model: UpdateBeforePostQueryModel): void {
    this.grundBedarfState$.dispatch(new GrundBedarfAction.GrundBedarfUpdateBeforePostData.UpdateGrundBedarfBeforePostDataAction(model));
  }
  // get Status code data
  public loadStatusCodeData(statusCodeModelQuery?: StatusCodeQuery): void {
    this.grundBedarfState$.dispatch(new GrundBedarfAction.LoadStatusCodeData.LoadStatusCodeDataAction(statusCodeModelQuery));
  }
  // get Richtlinie data
  public loadRichtlinieData(initFormDataQuery?: InitFormDataQuery): void {
    this.grundBedarfState$.dispatch(new GrundBedarfAction.GrundBedarfRichtlinieData.LoadRichtlinieDataAction(initFormDataQuery));
  }
  // load PauschaleSTE data
  public loadPauschaleSTEData(): void {
    this.grundBedarfState$.dispatch(new GrundBedarfAction.GrundBedarfPauschaleSTEData.LoadPauschaleSTEDataAction());
  }
  // get ShStatusCodeToSql data
  public loadShStatusCodeToSqlData(query?: InitFormDataQuery): void {
    this.grundBedarfState$.dispatch(new GrundBedarfAction.ShStatusCodeToSqlData.LoadShStatusCodeToSqlDataAction(query));
  }
}
