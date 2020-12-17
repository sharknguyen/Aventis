import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { TabModuleFallbearbeitungApiClient } from '../../tab-module-fallbearbeitungApiClient.service';

import * as actions from '../actions/tab-module-fallbearbeitung.actions';

@Injectable()
export class TabModuleFallbearbeitungEffects {

  constructor(
    private actions$: Actions,
    private tabModuleFallbearbeitungApiClient: TabModuleFallbearbeitungApiClient
  ) { }

  @Effect()
  getModuleIcon$ =
    this.actions$.ofType(actions.LoadModuleIconTypes.LOAD).pipe(
      map((action: actions.LoadModuleIconAction.LoadAction) => action.payload),
      switchMap((payload: any) => {
        return this.tabModuleFallbearbeitungApiClient.getModuleIcon(payload.baPersonID, payload.faFallID).pipe(
          map((data) => new actions.LoadModuleIconAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.LoadModuleIconAction.LoadFailAction(error)))
        );
      })
    );

  @Effect()
  getZeitachseVisible$ =
    this.actions$.ofType(actions.LoadZeitachseVisibleTypes.LOAD).pipe(
      map((action: actions.LoadZeitachseVisibleAction.LoadAction) => action.payload),
      switchMap((payload: any) => {
        return this.tabModuleFallbearbeitungApiClient.getZeitachseVisible().pipe(
          map((data) => new actions.LoadZeitachseVisibleAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.LoadZeitachseVisibleAction.LoadFailAction(error)))
        );
      })
    );

  @Effect()
  getPersonInfoTitel$ =
    this.actions$.ofType(actions.LoadPersonInfoTitelTypes.LOAD).pipe(
      map((action: actions.LoadPersonInfoTitelAction.LoadAction) => action.payload),
      switchMap((payload: any) => {
        return this.tabModuleFallbearbeitungApiClient.getPersonInfoTitel(payload.baPersonID, payload.userID, payload.languageCode).pipe(
          map((data) => new actions.LoadPersonInfoTitelAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.LoadPersonInfoTitelAction.LoadFailAction(error)))
        );
      })
    );
}
