import { Injectable } from '@angular/core';
import * as actions from '@app/kiss4-sozialhilfe/finanzplan/versicherungsleistungen/store/actions/versicherungsleistungen.actions';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { VersicherungsleistungenApiClient } from '../../versicherungsleistungenApiClient.service';

@Injectable()
export class VersicherungsleistungenEffects {
    constructor(
        private actions$: Actions,
        private versicherungsleistungenApiClient: VersicherungsleistungenApiClient) { }

    @Effect()
    loadEinkommen$ = this.actions$
        .ofType(actions.VersicherungsleistungenTypes.LoadEinkommenTypes.LOAD)
        .pipe(
            map((action: actions.LoadEinkommenAction) => action.payload),
            switchMap(state => {
                const query = tryMapPathApi(state);
                return this.versicherungsleistungenApiClient.loadEinkommen(query).pipe(
                    map(
                        initdata => {
                            return new actions.LoadSuccessEinkommenAction(initdata);
                        }
                    ),
                    catchError(error =>
                        of(new actions.LoadFailEinkommenAction(error))
                    ));
            })
        );

    @Effect()
    postEinkommen$ = this.actions$
        .ofType(actions.VersicherungsleistungenTypes.PostEinkommenTypes.POST)
        .pipe(
            map((action: actions.PostEinkommenAction) => action.payload),
            switchMap(state => {
                return this.versicherungsleistungenApiClient
                    .postEinkommen(state)
                    .pipe(
                        map(responseData => new actions.PostSuccessEinkommenAction(responseData)),
                        catchError(error => of(new actions.PostFailEinkommenAction(error))));
            })
        );

    @Effect()
    putEinkommen$ = this.actions$
        .ofType(actions.VersicherungsleistungenTypes.PutEinkommenTypes.PUT)
        .pipe(
            map((action: actions.PutEinkommenAction) => action.payload),
            switchMap(state => {
                return this.versicherungsleistungenApiClient
                    .putEinkommen(state)
                    .pipe(
                        map(responseData => new actions.PutSuccessEinkommenAction(responseData)),
                        catchError(error => of(new actions.PutFailEinkommenAction(error))));
            })
        );

    @Effect()
    deleteEinkommen$ = this.actions$
        .ofType(actions.VersicherungsleistungenTypes.DeleteEinkommenTypes.DELETE)
        .pipe(
            map((action: actions.DeleteEinkommenAction) => action.payload),
            switchMap(state => {
                return this.versicherungsleistungenApiClient
                    .deleteEinkommen(state)
                    .pipe(
                        map(responseData => new actions.DeleteSuccessEinkommenAction(responseData)),
                        catchError(error => of(new actions.DeleteFailEinkommenAction(error))));
            })
        );

    @Effect()
    getEinkommenLookUp$ = this.actions$
        .ofType(actions.VersicherungsleistungenTypes.GetEinkommenLookUpTypes.GET)
        .pipe(
            map((action: actions.GetEinkommenLookUpAction) => action.payload),
            switchMap(state => {
                return this.versicherungsleistungenApiClient.getEinkommenLookUp(state.toString()).pipe(
                    map(
                        initdata => {
                            return new actions.GetEinkommenLookUpSuccessAction(initdata);
                        }
                    ),
                    catchError(error =>
                        of(new actions.GetEinkommenLookUpFailAction(error))
                    ));
            })
        );

    @Effect()
    getPersonList$ = this.actions$
        .ofType(actions.VersicherungsleistungenTypes.GetPersonListTypes.GET)
        .pipe(
            map((action: actions.GetPersonListAction) => action.payload),
            switchMap(state => {
                const query = tryMapPathApi(state);
                return this.versicherungsleistungenApiClient.getPersonList(query).pipe(
                    map(
                        initdata => {
                            return new actions.GetPersonListSuccessAction(initdata);
                        }
                    ),
                    catchError(error =>
                        of(new actions.GetPersonListFailAction(error))
                    ));
            })
        );

    @Effect()
    getBgBewilligungStatusCode$ = this.actions$
        .ofType(actions.VersicherungsleistungenTypes.GetBgBewilligungStatusCodeTypes.GET)
        .pipe(
            map((action: actions.GetBgBewilligungStatusCodeAction) => action.payload),
            switchMap(state => {
                const query = tryMapPathApi(state);
                return this.versicherungsleistungenApiClient.getBgBewilligungStatusCode(query).pipe(
                    map(
                        initdata => {
                            return new actions.GetBgBewilligungStatusCodeSuccessAction(initdata);
                        }
                    ),
                    catchError(error =>
                        of(new actions.GetBgBewilligungStatusCodeFailAction(error))
                    ));
            })
        );
}
