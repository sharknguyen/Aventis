import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { tryMapPathApi } from '@shared/utilites';
import * as actions from '@app/kiss4-sozialhilfe/shared/component/dlgBewilligung/store/dlgBewilligung.actions';
import { IFinanzplanSaveParam } from '@app/kiss4-sozialhilfe/shared/component/dlgBewilligung/models/dlgBewilligung.models';
import { DlgBewilligungApiClient } from '@app/kiss4-sozialhilfe/shared/component/dlgBewilligung/dlgBewilligung-ApiClient.service';

@Injectable()
export class DlgBewilligungEffects {

  constructor(
    private actions$: Actions,
    private dlgBewilligungApiClient: DlgBewilligungApiClient
  ) { }

  @Effect()
  getPersonen$ = this.actions$
    .ofType(actions.finanzplanActionTypes.personenDataTypes.LOAD)
    .pipe(
      map((action: actions.PersonenInfoAction.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.dlgBewilligungApiClient
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
        return this.dlgBewilligungApiClient
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
        return this.dlgBewilligungApiClient
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
        return this.dlgBewilligungApiClient.getGrundEr()
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
        return this.dlgBewilligungApiClient.getGrundAb()
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
        return this.dlgBewilligungApiClient.getGrundbedarfType()
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
        return this.dlgBewilligungApiClient.getType()
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
        return this.dlgBewilligungApiClient.getBewilligungStatus()
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
        return this.dlgBewilligungApiClient.saveFinanzplan(payload)
          .pipe(
            map(result => {
              return new actions.FinanzplanSaveData.LoadSuccessAction(result);
            }),
            catchError(error =>
              of(new actions.FinanzplanSaveData.LoadFailAction(error))
            ));
      })
    );
}
