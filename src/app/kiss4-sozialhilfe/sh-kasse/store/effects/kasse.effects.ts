import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi, tryMapPathApiEncoded } from '@shared/utilites/utilityHelpers';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, concatMap } from 'rxjs/operators';

import { KasseApiClient } from '../../kasseApiClient.service';
import * as actions from '../actions/kasse.actions';

// rxjs
//
// models entity
@Injectable()
export class KasseEffects {

  constructor(
    private actions$: Actions,
    private kasseApiClient: KasseApiClient) { }

  /**
  * Kasse list
  */
  @Effect()
  getKasseData$ = this.actions$
    .ofType(actions.KasseActionTypes.KasseDatasTypes.LOAD)
    .pipe(
      map((action: actions.KasseAction.LoadAction) => action.payload),
      switchMap((queryModel: any) => {
        const query = tryMapPathApiEncoded(queryModel);
        return this.kasseApiClient
          .getKasse(query)
          .pipe(
            map(
              data =>
                new actions.KasseAction.LoadSuccessAction(data)
            ),
            catchError(error =>
              of(new actions.KasseAction.LoadFailAction(error))
            ));
      }));
  /**
* dropdown
*/
  @Effect()
  getDropDownData$ = this.actions$
    .ofType(actions.KasseActionTypes.DropDownTypes.LOAD)
    .pipe(
      map((action: actions.DropDownAction.LoadAction) => action.payload),
      switchMap((queryModel: any) => {
        const query = tryMapPathApiEncoded(queryModel);
        return this.kasseApiClient
          .getDropDownData(query)
          .pipe(
            map(
              data =>
                new actions.DropDownAction.LoadSuccessAction(
                  data
                )
            ),
            catchError(error =>
              of(new actions.DropDownAction.LoadFailAction(error))
            ));
      }));
  /**
* KbBuchung
*/
  @Effect()
  updateKbBuchung$ = this.actions$
    .ofType(actions.KasseActionTypes.KbBuchungTypes.UPDATE)
    .pipe(
      map((action: actions.KbBuchungAction.UpdateAction) => action.payload),
      concatMap((body: any) => {
        return this.kasseApiClient
          .updateKbBuchung(body, false)
          .pipe(
            map(
              data =>
                new actions.KbBuchungAction.UpdateSuccessAction(
                  data
                )
            ),
            catchError(error =>
              of(new actions.KbBuchungAction.UpdateFailAction(error))
            ));
      }));
  /**
* KbBuchungStatus
*/
  @Effect()
  updateKbBuchungStatus$ = this.actions$
    .ofType(actions.KasseActionTypes.KbBuchungStatusTypes.UPDATE)
    .pipe(
      map((action: actions.KbBuchungStatusAction.UpdateAction) => action.payload),
      concatMap((body: any) => {
        return this.kasseApiClient
          .updateKbBuchung(body, true)
          .pipe(
            map(
              data =>
                new actions.KbBuchungStatusAction.UpdateSuccessAction(
                  data
                )
            ),
            catchError(error =>
              of(new actions.KbBuchungStatusAction.UpdateFailAction(error))
            ));
      }));
}

