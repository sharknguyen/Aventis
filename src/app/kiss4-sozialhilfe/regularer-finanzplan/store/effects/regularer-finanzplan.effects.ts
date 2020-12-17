import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { tryMapPathApi } from '@shared/utilites';
import * as actions from '@app/kiss4-sozialhilfe/regularer-finanzplan/store/actions/regularer-finanzplan.actions';
import { IFinanzplanSaveParam } from '@app/kiss4-sozialhilfe/regularer-finanzplan/models/regularer-finanzplan.models';
import { RegularerFinanzplanApiClient } from '@app/kiss4-sozialhilfe/regularer-finanzplan/regularer-finanzplan-ApiClient.service';

@Injectable()
export class RegularerFinanzplanEffects {

  constructor(
    private actions$: Actions,
    private regularerFinanzplanApiClient: RegularerFinanzplanApiClient
  ) { }

  @Effect()
  getPersonen$ = this.actions$
    .ofType(actions.finanzplanActionTypes.personenDataTypes.LOAD)
    .pipe(
      map((action: actions.PersonenInfoAction.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.regularerFinanzplanApiClient
          .getHeader(query)
          .pipe(
            map(result => {
              return new actions.PersonenInfoAction.LoadSuccessAction(result);
            }),
            catchError(error =>
              of(new actions.PersonenInfoAction.LoadFailAction(error))
            ));
      }));

  @Effect()
  getFinanzplan$ = this.actions$
    .ofType(actions.finanzplanActionTypes.finanzplanDataTypes.LOAD)
    .pipe(
      map((action: actions.RegularerFinanzplanData.LoadAction) => action.payload),
      switchMap((state: { bgFinanzplanID: number }) => {
        const query = tryMapPathApi(state);
        return this.regularerFinanzplanApiClient
          .getFinanzplan(query)
          .pipe(
            map(result => {
              return new actions.RegularerFinanzplanData.LoadSuccessAction(result);
            }),
            catchError(error =>
              of(new actions.RegularerFinanzplanData.LoadFailAction(error))
            ));
      }));
  @Effect()
  getCheck$ = this.actions$
    .ofType(actions.finanzplanActionTypes.finanzplanCheckDataTypes.LOAD)
    .pipe(
      map((action: actions.CheckData.LoadAction) => action.payload),
      switchMap((state: { bgFinanzplanID: number }) => {
        const query = tryMapPathApi(state);
        return this.regularerFinanzplanApiClient
          .getCheckingInfo(query)
          .pipe(
            map(result => {
              return new actions.CheckData.LoadSuccessAction(
                result.map(el => {
                  if (el['']) {
                    el.StatusInfo = el[''];
                    delete (el['']);
                  }
                  return el;
                }));
            }),
            catchError(error =>
              of(new actions.RegularerFinanzplanData.LoadFailAction(error))
            ));
      }));
  @Effect()
  getGrundEr$ = this.actions$
    .ofType(actions.finanzplanActionTypes.GrundErDataTypes.LOAD)
    .pipe(
      switchMap(() => {
        return this.regularerFinanzplanApiClient.getGrundEr()
          .pipe(
            map(result => {
              return new actions.GrundErData.LoadSuccessAction(result);
            }),
            catchError(error =>
              of(new actions.GrundErData.LoadFailAction(error))
            ));
      }));

  @Effect()
  getGrundAb$ = this.actions$
    .ofType(actions.finanzplanActionTypes.GrundAbDataTypes.LOAD)
    .pipe(
      switchMap(() => {
        return this.regularerFinanzplanApiClient.getGrundAb()
          .pipe(
            map(result => {
              return new actions.GrundAbData.LoadSuccessAction(result);
            }),
            catchError(error =>
              of(new actions.GrundAbData.LoadFailAction(error))
            ));
      }));

  @Effect()
  getGrundbedarfType$ = this.actions$
    .ofType(actions.finanzplanActionTypes.GrundbedarfTypeDataTypes.LOAD)
    .pipe(
      switchMap(() => {
        return this.regularerFinanzplanApiClient.getGrundbedarfType()
          .pipe(
            map(result => {
              return new actions.GrundbedarfTypeData.LoadSuccessAction(result);
            }),
            catchError(error =>
              of(new actions.GrundbedarfTypeData.LoadFailAction(error))
            ));
      }));

  @Effect()
  getType$ = this.actions$
    .ofType(actions.finanzplanActionTypes.TypeDataTypes.LOAD)
    .pipe(
      switchMap(() => {
        return this.regularerFinanzplanApiClient.getType()
          .pipe(
            map(result => {
              return new actions.TypeData.LoadSuccessAction(result);
            }),
            catchError(error =>
              of(new actions.TypeData.LoadFailAction(error))
            ));
      }));

  @Effect()
  getBewilligungStatus$ = this.actions$
    .ofType(actions.finanzplanActionTypes.BewilligungStatusDataTypes.LOAD)
    .pipe(
      switchMap(() => {
        return this.regularerFinanzplanApiClient.getBewilligungStatus()
          .pipe(
            map(result => {
              return new actions.BewilligungStatusData.LoadSuccessAction(result);
            }),
            catchError(error =>
              of(new actions.BewilligungStatusData.LoadFailAction(error))
            ));
      }));

  @Effect()
  saveFinanzplan$ = this.actions$
    .ofType(actions.finanzplanActionTypes.FinanzplanSaveTypes.LOAD)
    .pipe(
      map((action: actions.FinanzplanSaveData.LoadAction) => action.payload),
      switchMap((payload: IFinanzplanSaveParam) => {
        return this.regularerFinanzplanApiClient.saveFinanzplan(payload)
          .pipe(
            map(result => {
              return new actions.FinanzplanSaveData.LoadSuccessAction(result);
            }),
            catchError(error =>
              of(new actions.FinanzplanSaveData.LoadFailAction(error))
            ));
      }));

  @Effect()
  verlaufDataFinanzplan$ = this.actions$
    .ofType(actions.finanzplanActionTypes.VerlaufDataTypes.LOAD)
    .pipe(
      map((action: actions.VerlaufData.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.regularerFinanzplanApiClient
          .verlaufDataFinanzplan(query)
          .pipe(
            map(result => {
              return new actions.VerlaufData.LoadSuccessAction(result);
            }),
            catchError(error =>
              of(new actions.VerlaufData.LoadFailAction(error))
            ));
      }));

  @Effect()
  typVerlaufDataFinanzplan$ = this.actions$
    .ofType(actions.finanzplanActionTypes.TypVerlaufDataTypes.LOAD)
    .pipe(
      map((action: actions.TypVerlaufData.LoadAction) => action.payload),
      switchMap(() => {
        return this.regularerFinanzplanApiClient
          .typVerlaufDataFinanzplan()
          .pipe(
            map(result => {
              return new actions.TypVerlaufData.LoadSuccessAction(result);
            }),
            catchError(error =>
              of(new actions.TypVerlaufData.LoadFailAction(error))
            ));
      }));
}
