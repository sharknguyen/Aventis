import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AsvDatenerfassungApiClient } from '../../asv-datenerfassungApiClient.service';
import { ModelQueryInsert, ModelQueryUpdate, ModelQueryDelete } from '../../models';
import * as actions from '../actions/asv-datenerfassung.actions';

// rxjs
//
// models entity
@Injectable()
export class AsvDatenerfassungEffects {

    constructor(
        private actions$: Actions,
        private asvDatenerfassungApiClient: AsvDatenerfassungApiClient) { }

    /**
    * AsvDatenerfassung list
    */
    @Effect()
    getAsvDatenerfassungData$ = this.actions$
        .ofType(actions.AsvDatenerfassungActionTypes.AsvDatenerfassungDatasTypes.LOAD)
        .pipe(
            map((action: actions.AsvDatenerfassungAction.LoadAction) => action.payload),
            switchMap((queryModel: any) => {
                return this.asvDatenerfassungApiClient
                    .getAsvDatenerfassung(queryModel)
                    .pipe(
                        map(
                            data =>
                                new actions.AsvDatenerfassungAction.LoadSuccessAction(
                                    data
                                )
                        ),
                        catchError(error =>
                            of(new actions.AsvDatenerfassungAction.LoadFailAction(error))
                        ));
            }));

    /**
    * AsvDatenerfassung Combobox
    */
    @Effect()
    getComboboxAsvDatenerfassungData$ = this.actions$
        .ofType(actions.AsvDatenerfassungActionTypes.AsvDatenerfassungComboboxDatasTypes.LOAD)
        .pipe(
            map((action: actions.AsvDatenerfassungComboboxAction.LoadAction) => action.payload),
            switchMap((queryModel: any) => {
                return this.asvDatenerfassungApiClient
                    .getComboboxAsvDatenerfassung(queryModel)
                    .pipe(
                        map(
                            data =>
                                new actions.AsvDatenerfassungComboboxAction.LoadSuccessAction(
                                    data
                                )
                        ),
                        catchError(error =>
                            of(new actions.AsvDatenerfassungComboboxAction.LoadFailAction(error))
                        ));
            }));

    /**
    * AsvDatenerfassung Insert
    */
    @Effect()
    asvDatenerfassungInsert$ = this.actions$
        .ofType(actions.AsvDatenerfassungActionTypes.AsvDatenerfassungInsertTypes.LOAD)
        .pipe(
            map((action: actions.AsvDatenerfassungInsertAction.LoadAction) => action.payload),
            switchMap((queryModel: ModelQueryInsert) => {
                return this.asvDatenerfassungApiClient
                    .asvDatenerfassungInsert(queryModel, queryModel.Widerruf)
                    .pipe(
                        map(
                            data =>
                                new actions.AsvDatenerfassungInsertAction.LoadSuccessAction(
                                    data
                                )
                        ),
                        catchError(error =>
                            of(new actions.AsvDatenerfassungInsertAction.LoadFailAction(error))
                        ));
            }));

    /**
    * AsvDatenerfassung Update
    */
    @Effect()
    asvDatenerfassungUpdate$ = this.actions$
        .ofType(actions.AsvDatenerfassungActionTypes.AsvDatenerfassungUpdateTypes.LOAD)
        .pipe(
            map((action: actions.AsvDatenerfassungUpdateAction.LoadAction) => action.payload),
            switchMap((queryModel: ModelQueryUpdate) => {
                return this.asvDatenerfassungApiClient
                    .asvDatenerfassungUpdate(queryModel, queryModel.Widerruf, queryModel.LeistungAb, queryModel.WhAsvseintragId)
                    .pipe(
                        map(
                            data =>
                                new actions.AsvDatenerfassungUpdateAction.LoadSuccessAction(
                                    data
                                )
                        ),
                        catchError(error =>
                            of(new actions.AsvDatenerfassungUpdateAction.LoadFailAction(error))
                        ));
            }));

    /**
    * AsvDatenerfassung Delete
    */
    @Effect()
    asvDatenerfassungDelete$ = this.actions$
        .ofType(actions.AsvDatenerfassungActionTypes.AsvDatenerfassungDeleteTypes.Delete)
        .pipe(
            map((action: actions.AsvDatenerfassungDeleteAction.DeleteAction) => action.payload),
            switchMap((queryModel: ModelQueryDelete) => {
                return this.asvDatenerfassungApiClient
                    .asvDatenerfassungDelete(queryModel)
                    .pipe(
                        map(
                            data =>
                                new actions.AsvDatenerfassungDeleteAction.DeleteSuccessAction(
                                    data
                                )
                        ),
                        catchError(error =>
                            of(new actions.AsvDatenerfassungDeleteAction.DeleteFailAction(error))
                        ));
            }));
}

