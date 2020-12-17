import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';

import { KontoauszugApiClient } from '../../kontoauszugApiClient.service';
import { KontoauszugQueryModel } from '../../models';
import * as actions from '../actions/kontoauszug.actions';

@Injectable()
export class KontoauszugEffects {
  constructor(
    private actions$: Actions,
    private kontoauszugApiClient: KontoauszugApiClient
  ) { }

  @Effect()
  getPersonnen$ = this.actions$.ofType(actions.GetPersonnenTypes.LOAD).pipe(
    map((action: actions.GetPersonnenAction.LoadAction) => action.payload),
    switchMap((baPersonID: any) => {
      return this.kontoauszugApiClient.getPersonnen(baPersonID).pipe(
        map(data => new actions.GetPersonnenAction.LoadSuccessAction(data)),
        catchError(error => of(new actions.GetPersonnenAction.LoadFailAction(error)))
      );
    })
  );

  @Effect()
  getZeitraum$ = this.actions$.ofType(actions.GetZeitraumTypes.LOAD).pipe(
    map((action: actions.GetZeitraumAction.LoadAction) => action.payload),
    switchMap(() => {
      return this.kontoauszugApiClient.getZeitraum().pipe(
        map(data => new actions.GetZeitraumAction.LoadSuccessAction(data)),
        catchError(error => of(new actions.GetZeitraumAction.LoadFailAction(error)))
      );
    })
  );

  @Effect()
  getKostenart$ = this.actions$.ofType(actions.GetKostenartTypes.LOAD).pipe(
    map((action: actions.GetKostenartAction.LoadAction) => action.payload),
    switchMap(() => {
      return this.kontoauszugApiClient.getKostenart().pipe(
        map(data => new actions.GetKostenartAction.LoadSuccessAction(data)),
        catchError(error => of(new actions.GetKostenartAction.LoadFailAction(error)))
      );
    })
  );

  @Effect()
  searchKontoauszug$ = this.actions$.ofType(actions.SearchKontoauszugTypes.LOAD).pipe(
    map((action: actions.SearchKontoauszugAction.LoadAction) => action.payload),
    concatMap((payload: KontoauszugQueryModel) => {
      return this.kontoauszugApiClient.searchKontoauszug(payload).pipe(
        map(data => new actions.SearchKontoauszugAction.LoadSuccessAction(data)),
        catchError(error => of(new actions.SearchKontoauszugAction.LoadFailAction(error)))
      );
    })
  );

  @Effect()
  getLovLookups$ = this.actions$.ofType(actions.GetLovLookupsTypes.LOAD).pipe(
    map((action: actions.GetLovLookupsAction.LoadAction) => action.payload),
    concatMap((payload: any) => {
      return this.kontoauszugApiClient.getLovLookups(payload).pipe(
        map(data => new actions.GetLovLookupsAction.LoadSuccessAction(data)),
        catchError(error => of(new actions.GetLovLookupsAction.LoadFailAction(error)))
      );
    })
  );

}
