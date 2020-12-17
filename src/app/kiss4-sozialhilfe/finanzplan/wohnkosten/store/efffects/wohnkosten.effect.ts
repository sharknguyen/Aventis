import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as actions from '../actions/wohnkosten.actions';
import { WohnkostenApiClient } from '../../wohnkostenApiClient.service';

@Injectable()
export class WohnkostenEffects {

  constructor(private actions$: Actions,
    private wohnkostenApiClient: WohnkostenApiClient) {
  }

  @Effect()
  getBgFinanzplan$ = this.actions$
    .ofType(actions.WohnkostenActionTypes.BgFinanzplanTypes.LOAD)
    .pipe(
      map((action: actions.BgFinanzplanDatas.LoadAction) => action.payload),
      switchMap((state: any) => {
        return this.wohnkostenApiClient.getBgFinanzplan(state)
          .pipe(
            map(
              bgFinanzplan =>
              new actions.BgFinanzplanDatas.LoadSuccessAction(bgFinanzplan)
            ),
            catchError(error =>
              of(new actions.BgFinanzplanDatas.LoadFailAction(error))
            ));
      }));
  @Effect()
  getBgGrundbedarf$ = this.actions$
    .ofType(actions.WohnkostenActionTypes.BgGrundbedarfTypes.LOAD)
    .pipe(
      map((action: actions.BgGrundbedarfDatas.LoadAction) => action.payload),
      switchMap((data: any) => {
        return this.wohnkostenApiClient.getBgGrundbedarf(data)
          .pipe(
            map(
              bgGrundbedarf =>
              new actions.BgFinanzplanDatas.LoadSuccessAction(bgGrundbedarf)
            ),
            catchError(error =>
              of(new actions.BgFinanzplanDatas.LoadFailAction(error))
            ));
      }));
  @Effect()
  getBgPositionsart$ = this.actions$
    .ofType(actions.WohnkostenActionTypes.BgPositionsartTypes.LOAD)
    .pipe(
      map((action: actions.BgPositionsartDatas.LoadAction) => action.payload),
      switchMap((data: any) => {
        return this.wohnkostenApiClient.getBgPositionsart(data)
          .pipe(
            map(
              bgPositionsart =>
              new actions.BgPositionsartDatas.LoadSuccessAction(bgPositionsart)
            ),
            catchError(error =>
              of(new actions.BgFinanzplanDatas.LoadFailAction(error))
            ));
      }));
  @Effect()
  getBgPosition$ = this.actions$
    .ofType(actions.WohnkostenActionTypes.BgPositionTypes.LOAD)
    .pipe(
      map((action: actions.BgPositionDatas.LoadAction) => action.payload),
      switchMap((state: any) => {
        return this.wohnkostenApiClient.getBgPosition(state)
          .pipe(
            map(
              bgPosition =>
              new actions.BgPositionDatas.LoadSuccessAction(bgPosition)
            ),
            catchError(error =>
              of(new actions.BgPositionDatas.LoadFailAction(error))
            ));
      }));
  @Effect()
  getWhKennzahlen$ = this.actions$
    .ofType(actions.WohnkostenActionTypes.WhKennzahlenTypes.LOAD)
    .pipe(
      map((action: actions.WhKennzahlenDatas.LoadAction) => action.payload),
      switchMap((state: any) => {
        return this.wohnkostenApiClient.getWhKennzahlen(state)
          .pipe(
            map(
              whKennzahlen =>
              new actions.WhKennzahlenDatas.LoadSuccessAction(whKennzahlen)
            ),
            catchError(error =>
              of(new actions.WhKennzahlenDatas.LoadFailAction(error))
            ));
      }));
  @Effect()
  getRichtlinien$ = this.actions$
    .ofType(actions.WohnkostenActionTypes.RichtlinienTypes.LOAD)
    .pipe(
      map((action: actions.RichtlinienDatas.LoadAction) => action.payload),
      switchMap((data: any) => {
        return this.wohnkostenApiClient.getRichtlinien(data)
          .pipe(
            map(
              wohnkosten =>
              new actions.RichtlinienDatas.LoadSuccessAction(wohnkosten)
            ),
            catchError(error =>
              of(new actions.RichtlinienDatas.LoadFailAction(error))
            ));
      }));
  @Effect()
  deleteWohnkosten$ = this.actions$
    .ofType(actions.WohnkostenActionTypes.WohnkostenDeleteTypes.LOAD)
    .pipe(
      map((action: actions.WohnkostenDeleteDatas.LoadAction) => action.payload),
      switchMap((state ?: any) => {
        return this.wohnkostenApiClient.deleteWohnkosten(state)
          .pipe(
            map(
              berater => {
                return new actions.WohnkostenDeleteDatas.LoadSuccessAction(
                  berater
                );
              }
            ),
            catchError(error =>
              of(new actions.WohnkostenDeleteDatas.LoadFailAction(error))
            ));
      }));
  @Effect()
  updateWohnkosten$ = this.actions$
    .ofType(actions.WohnkostenActionTypes.WohnkostenUpdateTypes.LOAD)
    .pipe(
      map((action: actions.WohnkostenUpdateDatas.LoadAction) => action.payload),
      switchMap((ahvBeitrage?: any) => {
        return this.wohnkostenApiClient.updateWohnkosten(ahvBeitrage)
          .map(
            data =>
              new actions.WohnkostenUpdateDatas.LoadSuccessAction(data)
          )
          .catch(error =>
            of(new actions.WohnkostenUpdateDatas.LoadFailAction(error))
          );
      }));
  @Effect()
  createAhvBeitrage$ = this.actions$
    .ofType(actions.WohnkostenActionTypes.WohnkostenCreateTypes.LOAD)
    .pipe(
      map((action: actions.WohnkostenUpdateDatas.LoadAction) => action.payload),
      switchMap((ahvBeitrage?: any) => {
        return this.wohnkostenApiClient.addWohnkosten(ahvBeitrage)
          .map(
            data =>
            new actions.WohnkostenCreateDatas.LoadSuccessAction(data)
          )
          .catch(error =>
            of(new actions.WohnkostenCreateDatas.LoadFailAction(error))
          );
      }));
}
