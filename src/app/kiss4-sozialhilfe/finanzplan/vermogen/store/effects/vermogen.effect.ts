import { Injectable } from '@angular/core';
import * as actions from '@app/kiss4-sozialhilfe/finanzplan/vermogen/store/actions/vermogen.action';
import { VermogenApiClient } from '@app/kiss4-sozialhilfe/finanzplan/vermogen/vermogenApiClient.service';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites/utilityHelpers';
import { of } from 'rxjs';
import { catchError, map, switchMap, concatMap } from 'rxjs/operators';

@Injectable()
export class VermogenEffects {

  constructor(
    private actions$: Actions,
    private vermogenApiClient: VermogenApiClient) { }

  // Get data BgPosition
  @Effect()
  getBgPosition$ = this.actions$
    .ofType(actions.VermogenActionTypes.BgPositionTypes.LOAD)
    .pipe(
      map((action: actions.BgPositionDatas.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.vermogenApiClient
          .getBgPosition(query)
          .pipe(
            map(
              bgPosition => {
                return new actions.BgPositionDatas.LoadSuccessAction(
                  bgPosition
                );
              }
            ),
            catchError(error =>
              of(new actions.BgPositionDatas.LoadFailAction(error))
            ));
      })
    );

  /**
   * Get data BgFinanzplan
   */
  @Effect()
  getBgFinanzplan$ = this.actions$
    .ofType(actions.VermogenActionTypes.BgFinanzplanTypes.LOAD)
    .pipe(
      map((action: actions.BgFinanzplanDatas.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.vermogenApiClient
          .getBgFinanzplan(query)
          .pipe(
            map(
              bgFinanzplan => {
                return new actions.BgFinanzplanDatas.LoadSuccessAction(
                  bgFinanzplan
                );
              }
            ),
            catchError(error =>
              of(new actions.BgFinanzplanDatas.LoadFailAction(error))
            ));
      })
    );

  /**
   * Get Personen
   */
  @Effect()
  getPersonen$ = this.actions$
    .ofType(actions.VermogenActionTypes.PersonenTypes.LOAD)
    .pipe(
      map((action: actions.PersonenDatas.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.vermogenApiClient
          .getPersonen(query)
          .pipe(
            map(
              personen => {
                return new actions.PersonenDatas.LoadSuccessAction(
                  personen
                );
              }
            ),
            catchError(error =>
              of(new actions.PersonenDatas.LoadFailAction(error))
            ));
      })
    );

  /**
   * Get WhPositionsart
   */
  @Effect()
  getWhPositionsart$ = this.actions$
    .ofType(actions.VermogenActionTypes.WhPositionsartTypes.LOAD)
    .pipe(
      map((action: actions.WhPositionsartDatas.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.vermogenApiClient
          .getWhPositionsart(query)
          .pipe(
            map(
              whPositionsart => {
                return new actions.WhPositionsartDatas.LoadSuccessAction(
                  whPositionsart
                );
              }
            ),
            catchError(error =>
              of(new actions.PersonenDatas.LoadFailAction(error))
            ));
      })
    );

  /**
   * Delete BgPosition
   */
  @Effect()
  deleteBgPosition$ = this.actions$
    .ofType(actions.VermogenActionTypes.DelBgPositionTypes.DEL)
    .pipe(
      map((action: actions.DelBgPositionAction.DelAction) => action.payload),
      concatMap((query: any) => {
        return this.vermogenApiClient.deleteBgPosition(query)
          .pipe(
            map(initdata => new actions.DelBgPositionAction.DelSuccessAction(initdata)),
            catchError(error => of(new actions.DelBgPositionAction.DelFailAction(error)))
          );
      })
    );

  /**
   * Get Freibetrag
   */
  @Effect()
  getFreibetrag$ = this.actions$
    .ofType(actions.VermogenActionTypes.FreibetragTypes.LOAD)
    .pipe(
      map((action: actions.FreibetragDatas.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.vermogenApiClient
          .getFreibetrag(query)
          .pipe(
            map(
              freibetrag => {
                return new actions.FreibetragDatas.LoadSuccessAction(
                  freibetrag
                );
              }
            ),
            catchError(error =>
              of(new actions.FreibetragDatas.LoadFailAction(error))
            ));
      })
    );

  /**
   * Insert BgPosition
   */
  @Effect()
  insertBgPosition$ = this.actions$
    .ofType(actions.VermogenActionTypes.InsertBgPositionTypes.INSERT)
    .pipe(
      map((action: actions.InsertBgPositionAction.InsertAction) => action.payload),
      concatMap((query: any) => {
        return this.vermogenApiClient.insertBgPosition(query)
          .pipe(
            map(data => new actions.InsertBgPositionAction.InsertSuccessAction(data)),
            catchError(error => of(new actions.InsertBgPositionAction.InsertFailAction(error)))
          );
      })
    );

  /**
   * Update BgPosition
   */
  @Effect()
  updateBgPosition$ = this.actions$
    .ofType(actions.VermogenActionTypes.UpdateBgPositionTypes.UPDATE)
    .pipe(
      map((action: actions.UpdateBgPositionAction.UpdateAction) => action.payload),
      concatMap((query: any) => {
        return this.vermogenApiClient.updateBgPosition(query)
          .pipe(
            map(data => new actions.UpdateBgPositionAction.UpdateSuccessAction(data)),
            catchError(error => of(new actions.UpdateBgPositionAction.UpdateFailAction(error)))
          );
      })
    );

  @Effect()
  getBgSilAHVBeitrag$ = this.actions$
    .ofType(actions.VermogenActionTypes.BgSilAHVBeitragTypes.LOAD)
    .pipe(
      map((action: actions.BgSilAHVBeitragDatas.LoadAction) => action.payload),
      switchMap(state => {
        return this.vermogenApiClient
          .getBgSilAHVBeitrag(state)
          .pipe(
            map(
              berater => {
                return new actions.BgSilAHVBeitragDatas.LoadSuccessAction(
                  berater
                );
              }
            ),
            catchError(error =>
              of(new actions.BgSilAHVBeitragDatas.LoadFailAction(error))
            ));
      })
    );
}

