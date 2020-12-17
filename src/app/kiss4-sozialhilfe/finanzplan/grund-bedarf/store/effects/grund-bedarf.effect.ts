import { Injectable } from '@angular/core';
import { InitFormDataQuery, QryKennzahlenQuery, StatusCodeQuery, UpdateBeforePostQueryModel, UpdateFormDataQueryModel } from '@app/kiss4-sozialhilfe/finanzplan/grund-bedarf/models';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs/observable/of';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { GrundBedarfApiClient } from '../../grund-bedarfApiClient.service';
import * as actions from '../actions/grund-bedarf.action';


// rxjs
// models entity
@Injectable()
export class GrundBedarfEffects {
  constructor(
    private actions$: Actions,
    private grundBedarfApiClient: GrundBedarfApiClient) { }
  // get data select box
  @Effect()
  getDatasourceSelectboxData$ = this.actions$
    .ofType(actions.GrundBedarfActionTypes.BerechnungsgrundlageSelectboxDataTypes.LOAD)
    .pipe(
      map((action: actions.LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataAction) => action.payload),
      switchMap(state => {
        return this.grundBedarfApiClient
          .getSelectboxDatas().pipe(
            map(
              initdata =>
                new actions.LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataFailAction(error))
            ));
      })
    );
  // Load qryBgPosition data
  @Effect()
  loadGrundBedarfQryPositionData$ = this.actions$
    .ofType(actions.GrundBedarfActionTypes.GrundBedarfQryBgPositionDataTypes.LOAD)
    .pipe(
      map((action: actions.GrundBedarfQryBgPositionData.LoadGrundBedarfQryBgPositionDataAction) => action.payload),
      switchMap((param?: InitFormDataQuery) => {
        const query = tryMapPathApi(param);
        return this.grundBedarfApiClient
          .loadGrundBedarfQryBgPositionData(query).pipe(
            map(
              initdata =>
                new actions.GrundBedarfQryBgPositionData.LoadGrundBedarfQryBgPositionDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GrundBedarfQryBgPositionData.LoadGrundBedarfQryBgPositionDataFailAction(error))
            ));
      })
    );
  // Load qryKennzahlen data
  @Effect()
  loadGrundBedarfQryKennzahlenData$ = this.actions$
    .ofType(actions.GrundBedarfActionTypes.GrundBedarfQryKennzahlenDataTypes.LOAD)
    .pipe(
      map((action: actions.GrundBedarfQryKennzahlenData.LoadGrundBedarfQryKennzahlenDataAction) => action.payload),
      switchMap((param?: QryKennzahlenQuery) => {
        const query = tryMapPathApi(param);
        return this.grundBedarfApiClient
          .loadGrundBedarfQryKennzahlenData(query).pipe(
            map(
              initdata =>
                new actions.GrundBedarfQryKennzahlenData.LoadGrundBedarfQryKennzahlenDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GrundBedarfQryKennzahlenData.LoadGrundBedarfQryKennzahlenDataFailAction(error))
            ));
      })
    );
  // Load Init Form data
  @Effect()
  loadGrundBedarfInitFormData$ = this.actions$
    .ofType(actions.GrundBedarfActionTypes.GrundBedarfInitFormDataTypes.LOAD)
    .pipe(
      map((action: actions.GrundBedarfInitFormData.LoadGrundBedarfInitFormDataAction) => action.payload),
      switchMap((param?: InitFormDataQuery) => {
        const query = tryMapPathApi(param);
        return this.grundBedarfApiClient
          .loadInitGrundBedarfFormData(query).pipe(
            map(
              initdata =>
                new actions.GrundBedarfInitFormData.LoadGrundBedarfInitFormDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GrundBedarfInitFormData.LoadGrundBedarfInitFormDataFailAction(error))
            ));
      })
    );

  // Load Richtlinie data
  @Effect()
  loadGrundBedarfRichtlinieData$ = this.actions$
    .ofType(actions.GrundBedarfActionTypes.RichtlinieDataTypes.LOAD)
    .pipe(
      map((action: actions.GrundBedarfRichtlinieData.LoadRichtlinieDataAction) => action.payload),
      switchMap((param?: InitFormDataQuery) => {
        const query = tryMapPathApi(param);
        return this.grundBedarfApiClient
          .loadRichtlinieData(query).pipe(
            map(
              initdata =>
                new actions.GrundBedarfRichtlinieData.LoadRichtlinieDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GrundBedarfRichtlinieData.LoadRichtlinieDataFailAction(error))
            ));
      })
    );

    // Load PauschaleSTE data
  @Effect()
  loadGrundBedarfPauschaleSTEData$ = this.actions$
    .ofType(actions.GrundBedarfActionTypes.PauschaleSTEDataTypes.LOAD)
    .pipe(
      map((action: actions.GrundBedarfPauschaleSTEData.LoadPauschaleSTEDataAction) => action.payload),
      switchMap(state => {
        return this.grundBedarfApiClient
          .loadPauschaleSTEData().pipe(
            map(
              initdata =>
                new actions.GrundBedarfPauschaleSTEData.LoadPauschaleSTEDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GrundBedarfPauschaleSTEData.LoadPauschaleSTEDataFailAction(error))
            ));
      })
    );

  // Update Form data
  @Effect()
  updateGrundBedarfFormData$ = this.actions$
    .ofType(actions.GrundBedarfActionTypes.GrundBedarfUpdateFormDataTypes.UPDATE_FORM_DATA)
    .pipe(
      map((action: actions.GrundBedarfUpdateFormData.UpdateGrundBedarfFormDataAction) => action.payload),
      concatMap((model?: UpdateFormDataQueryModel) => {
        return this.grundBedarfApiClient
          .updateFormData(model).pipe(
            map(
              initdata =>
                new actions.GrundBedarfUpdateFormData.UpdateGrundBedarfFormDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GrundBedarfUpdateFormData.UpdateGrundBedarfFormDataFailAction(error))
            ));
      })
    );
  // Load Status code
  @Effect()
  getStatusCodeData$ = this.actions$
    .ofType(actions.GrundBedarfActionTypes.GetStatusCodeTypes.LOAD)
    .pipe(
      map((action: actions.LoadStatusCodeData.LoadStatusCodeDataAction) => action.payload),
      switchMap((param?: StatusCodeQuery) => {
        const query = tryMapPathApi(param);
        return this.grundBedarfApiClient
          .getStatusCodeDatas(query).pipe(
            map(
              initdata =>
                new actions.LoadStatusCodeData.LoadStatusCodeDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.LoadStatusCodeData.LoadStatusCodeDataFailAction(error))
            ));
      })
    );

  // Update Before Post data
  @Effect()
  updateGrundBedarfBeforePostData$ = this.actions$
    .ofType(actions.GrundBedarfActionTypes.GrundBedarfUpdateBeforePostTypes.UPDATE_BEFORE_POST_DATA)
    .pipe(
      map((action: actions.GrundBedarfUpdateBeforePostData.UpdateGrundBedarfBeforePostDataAction) => action.payload),
      concatMap((model?: UpdateBeforePostQueryModel) => {
        return this.grundBedarfApiClient
          .updateBeforePost(model).pipe(
            map(
              initdata =>
                new actions.GrundBedarfUpdateBeforePostData.UpdateGrundBedarfBeforePostDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GrundBedarfUpdateBeforePostData.UpdateGrundBedarfBeforePostDataFailAction(error))
            ));
      })
    );
    // Load ShStatusCodeToSql data
  @Effect()
  loadShStatusCodeToSqlData$ = this.actions$
    .ofType(actions.GrundBedarfActionTypes.ShStatusCodeToSqlDataTypes.LOAD)
    .pipe(
      map((action: actions.ShStatusCodeToSqlData.LoadShStatusCodeToSqlDataAction) => action.payload),
      switchMap((param?: InitFormDataQuery) => {
        const query = tryMapPathApi(param);
        return this.grundBedarfApiClient
          .loadShStatusCodeToSqlData(query).pipe(
            map(
              initdata =>
                new actions.ShStatusCodeToSqlData.LoadShStatusCodeToSqlDataSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.ShStatusCodeToSqlData.LoadShStatusCodeToSqlDataFailAction(error))
            ));
      })
    );
}
