import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {FinanzplanApiClient} from '@app/kiss4-sozialhilfe/finanzplan/finanzplanApiClient.service';
import * as actions from '@app/kiss4-sozialhilfe/finanzplan/store/actions/finanzplan.action';
import {tryMapPathApi} from '@shared/utilites';

@Injectable()
export class FinanzplanEffect {
  constructor(
    private actions$: Actions,
    private fnanzplanApiClient: FinanzplanApiClient) {
  }

  @Effect()
  getBgSilAHVBeitrag$ = this.actions$
    .ofType(actions.FinanzplanActionTypes.BgSilAHVBeitragTypes.LOAD)
    .pipe(
      map((action: actions.BgSilAHVBeitragDatas.LoadAction) => action.payload),
      switchMap(state => {
        return this.fnanzplanApiClient
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

  @Effect()
  getFinanzplan$ = this.actions$
    .ofType(actions.FinanzplanActionTypes.FinanzplanTypes.LOAD)
    .pipe(
      map((action: actions.FinanzplanDatas.LoadAction) => action.payload),
      switchMap(state => {
        // const query = tryMapPathApi(state);
        return this.fnanzplanApiClient
          .getFinanzplan(state)
          .pipe(
            map(
              finanzplan => {
                return new actions.FinanzplanDatas.LoadSuccessAction(
                  finanzplan
                );
              }
            ),
            catchError(error =>
              of(new actions.FinanzplanDatas.LoadFailAction(error))
            ));
      })
    );

}
