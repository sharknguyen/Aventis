import { Injectable } from '@angular/core';
import {
    PostleitzahlenAktualisierenApiClient,
} from '@app/kiss4-modul-konfiguration/postleitzahlen-aktualisieren/postleitzahlen-aktualisieren.ApiClient.service';
import * as actions from '@app/kiss4-modul-konfiguration/postleitzahlen-aktualisieren/store/actions/postleitzahlen-aktualisieren.action';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class PostleitzahlenAktualisierenEffects {

    constructor(
        private actions$: Actions,
        private postleitzahlenAktualisierenApiClient: PostleitzahlenAktualisierenApiClient) { }

    @Effect()
    getInitData$ = this.actions$
        .ofType(actions.PostleitzahlenAktualisierenActionTypes.PostleitzahlenAktualisierenTypes.LOAD)
        .pipe(
            map((action: actions.PostleitzahlenAktualisierenInitData.LoadAction) => action.payload),
            switchMap(state => {
                return this.postleitzahlenAktualisierenApiClient.getPostleitzahlenAktualisierens().pipe(
                    map(initdata => new actions.PostleitzahlenAktualisierenInitData.LoadSuccessAction(initdata)),
                    catchError(error => of(new actions.PostleitzahlenAktualisierenInitData.LoadFailAction(error)))
                );
            })
        );

    @Effect()
    syncData$ = this.actions$
        .ofType(actions.PostleitzahlenAktualisierenActionTypes.PostleitzahlenAktualisierenSyncTypes.SYNC)
        .pipe(
            map((action: actions.PostleitzahlenAktualisierenSyncData.SyncAction) => action.payload),
            switchMap((state?: any) => {
                return this.postleitzahlenAktualisierenApiClient.syncData().pipe(
                    map(initdata => new actions.PostleitzahlenAktualisierenSyncData.SyncSuccessAction(initdata)),
                    catchError(error => of(new actions.PostleitzahlenAktualisierenSyncData.SyncFailAction(error)))
                );
            })
        );

}
