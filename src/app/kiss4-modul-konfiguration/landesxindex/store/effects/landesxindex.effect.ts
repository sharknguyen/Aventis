import { Injectable } from '@angular/core';
import { LandesindexApiClient } from '@app/kiss4-modul-konfiguration/landesxindex/landesxindexApiClient.service';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ListItem, Wert } from '../../models';
import * as actions from '../actions/landesxindex.action';

@Injectable()
export class LandesxindexesEffects {
  constructor(
    private actions$: Actions,
    private LandesxindexApiClient: LandesindexApiClient
  ) { }

  @Effect()
  getInitData$ = this.actions$
    .ofType(actions.LandesxindexActionTypes.LandesxindexTypes.LOAD)
    .pipe(
      map((action: actions.LandesxindexInitData.LoadAction) => action.payload),
      switchMap(state => {
        return this.LandesxindexApiClient
          .getLandesindexes().pipe(
            map(
              initdata =>
                new actions.LandesxindexInitData.LoadSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.LandesxindexInitData.LoadFailAction(error))
            ));
      })
    );

  /**
  * Subcriber GetLandesindexWertData
  */
  @Effect()
  getDetailData$ = this.actions$
    .ofType(actions.LandesxindexActionTypes.LandesxindexGetDetailTypes.GETDETAIL)
    .pipe(
      map((action: actions.GetLandesindexWertData.GetLandesindexWertAction) => action.payload),
      switchMap((ikLandesindexID?: number) => {
        return this.LandesxindexApiClient
          .getLandesindexWert(ikLandesindexID).pipe(
            map(
              initdata => {
                return new actions.GetLandesindexWertData.GetLandesindexWertSuccessAction(initdata);
              }
            ),
            catchError(error =>
              of(new actions.GetLandesindexWertData.GetLandesindexWertFailAction(error))
            ));
      })
    );

  /**
  * Delete a row in top grid
  */
  @Effect()
  deleteTopData$ = this.actions$
    .ofType(actions.LandesxindexActionTypes.LandesxindexDeleteTypes.DELETE)
    .pipe(
      map((action: actions.LandesindexDeleteData.DeleteAction) => action.payload),
      switchMap((id: number) => {
        return this.LandesxindexApiClient
          .deleteLandesindex(id).pipe(
            map(
              data => {
                return new actions.LandesindexDeleteData.DeleteSuccessAction(data);
              }
            ),
            catchError(error =>
              of(new actions.LandesindexDeleteData.DeleteFailAction(error))
            ));
      })
    );

  /**
  * Delete inline in bottom grid
  */
  @Effect()
  deleteBottomData$ = this.actions$
    .ofType(actions.LandesxindexActionTypes.LandesxindexWertDeleteTypes.DELETE_WERT)
    .pipe(
      map((action: actions.LandesindexWertDeleteData.DeleteAction) => action.payload),
      switchMap((id?: number) => {
        return this.LandesxindexApiClient
          .deleteLandesindexWert(id).pipe(
            map(
              initdata => {
                return new actions.LandesindexWertDeleteData.DeleteSuccessAction(initdata);
              }
            ),
            catchError(error =>
              of(new actions.LandesindexWertDeleteData.DeleteFailAction(error))
            ));
      })
    );

  /**
  * Update a row in top grid
  */
  @Effect()
  updateTopData$ = this.actions$
    .ofType(actions.LandesxindexActionTypes.LandesxindexesUpdateTypes.UPDATE_LANDES)
    .pipe(
      map((action: actions.LandesindexesUpdateData.UpdateAction) => action.payload),
      switchMap((model?: ListItem) => {
        return this.LandesxindexApiClient
          .updateLandesindexes(model).pipe(
            map(
              initdata => {
                return new actions.LandesindexesUpdateData.UpdateSuccessAction(initdata);
              }
            ),
            catchError(error =>
              of(new actions.LandesindexesUpdateData.UpdateFailAction(error))
            ));
      })
    );

  // get IkLandesindex
  @Effect()
  getIkLandesindexData$ = this.actions$
    .ofType(actions.LandesxindexActionTypes.IkLandesindexTypes.LOAD)
    .pipe(
      map((action: actions.LoadIkLandesindex.LoadIkLandesindexAction) => action.payload),
      switchMap(() => {
        return this.LandesxindexApiClient
          .getIkLandesindex().pipe(
            map(
              initdata => {
                return new actions.LoadIkLandesindex.LoadIkLandesindexSuccessAction(initdata);
              }
            ),
            catchError(error =>
              of(new actions.LoadIkLandesindex.LoadIkLandesindexFailAction(error))
            ));

      })
    );

  // Get Wert
  @Effect()
  getWertData$ = this.actions$
    .ofType(actions.LandesxindexActionTypes.GetWert.LOAD)
    .pipe(
      map((action: actions.GetWertInitData.GetWertAction) => action.payload),
      switchMap((state: Wert) => {
        const query = tryMapPathApi(state);
        return this.LandesxindexApiClient
          .getWert(query).pipe(
            map(
              initdata =>
                new actions.GetWertInitData.GetWertSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.GetWertInitData.GetWertFailAction(error))
            ));
      })
    );

  @Effect()
  insertLandesIndexData$ = this.actions$
    .ofType(actions.LandesxindexActionTypes.AddLandesindexGridtop.ADD)
    .pipe(
      map((action: actions.AddGridTopData.AddLandesindexGridtopAction) => action.payload),
      switchMap((data) => {
        return this.LandesxindexApiClient
          .addLandesindex(data).pipe(
            map(
              initdata =>
                new actions.AddGridTopData.AddLandesindexGridtopSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.AddGridTopData.AddLandesindexGridtopFailAction(error))
            ));
      })
    );

  // load CountIkLandesindexWert
  @Effect()
  getCountIkLandesindexWertData$ = this.actions$
    .ofType(actions.LandesxindexActionTypes.CountIkLandesindexWertTypes.LOAD)
    .pipe(
      map((action: actions.LoadCountIkLandesindexWert.LoadCountIkLandesindexWertAction) => action.payload),
      switchMap((queryModel) => {
        const query = tryMapPathApi(queryModel);
        return this.LandesxindexApiClient
          .getCountIkLandesindexWert(query).pipe(
            map(
              initdata => {
                return new actions.LoadCountIkLandesindexWert.LoadCountIkLandesindexWertSuccessAction(initdata);
              }
            ),
            catchError(error =>
              of(new actions.LoadCountIkLandesindexWert.LoadCountIkLandesindexWertFailAction(error))
            ));
      })
    );

  // Add Wert by LandesIndex
  @Effect()
  insertWertbyLandesIndexData$ = this.actions$
    .ofType(actions.LandesxindexActionTypes.AddWertByIkLandesindex.ADD)
    .pipe(
      map((action: actions.AddWertByIkLandesindexData.AddWertByIkLandesindexAction) => action.payload),
      switchMap((data) => {
        return this.LandesxindexApiClient
          .addWertbyLandesIndex(data).pipe(
            map(
              initdata =>
                new actions.AddWertByIkLandesindexData.AddWertByIkLandesindexSuccessAction(initdata)
            ),
            catchError(error =>
              of(new actions.AddWertByIkLandesindexData.AddWertByIkLandesindexFailAction(error))
            ));
      })
    );

  // NameIkLandesindex
  @Effect()
  getNameIkLandesindexData$ = this.actions$
    .ofType(actions.LandesxindexActionTypes.NameIkLandesindexTypes.LOAD)
    .pipe(
      map((action: actions.LoadNameIkLandesindex.LoadNameIkLandesindexAction) => action.payload),
      switchMap((query: number) => {
        return this.LandesxindexApiClient
          .getNameIkLandesindex(query).pipe(
            map(
              initdata => {
                return new actions.LoadNameIkLandesindex.LoadNameIkLandesindexSuccessAction(initdata);
              }
            ),
            catchError(error =>
              of(new actions.LoadNameIkLandesindex.LoadNameIkLandesindexFailAction(error))
            ));
      })
    );

  // add IkLandesindexWert
  @Effect()
  addIkLandesindexWertData$ = this.actions$
    .ofType(actions.LandesxindexActionTypes.AddLandesindexWertErfassenTypes.ADD)
    .pipe(
      map((action: actions.AddLandesindexWertErfassen.AddLandesindexWertErfassenAction) => action.payload),
      switchMap((body) => {
        return this.LandesxindexApiClient
          .addIkLandesindexWert(body).pipe(
            map(
              initdata => {
                return new actions.AddLandesindexWertErfassen.AddLandesindexWertErfassenSuccessAction(initdata);
              }
            ),
            catchError(error =>
              of(new actions.AddLandesindexWertErfassen.AddLandesindexWertErfassenFailAction(error))
            ));
      })
    );

  // Update Wert when Insert
  @Effect()
  updateWert$ = this.actions$
    .ofType(actions.LandesxindexActionTypes.UpdateWert.UPDATE)
    .pipe(
      map((action: actions.UpdateWertInitData.UpdateWertAction) => action.payload),
      switchMap((body) => {
        return this.LandesxindexApiClient
          .updateWert(body).pipe(
            map(
              initdata => {
                return new actions.UpdateWertInitData.UpdateWertSuccessAction(initdata);
              }
            ),
            catchError(error =>
              of(new actions.UpdateWertInitData.UpdateWertFailAction(error))
            ));
      })
    );

  // add a Wert
  @Effect()
  addWertData$ = this.actions$
    .ofType(actions.LandesxindexActionTypes.AddWertTypes.ADD)
    .pipe(
      map((action: actions.AddWertInitData.AddWertAction) => action.payload),
      switchMap((body) => {
        return this.LandesxindexApiClient
          .addWert(body).pipe(
            map(
              initdata => {
                return new actions.AddWertInitData.AddWertSuccessAction(initdata);
              }
            ),
            catchError(error =>
              of(new actions.AddWertInitData.AddWertFailAction(error))
            ));
      })
    );
}
