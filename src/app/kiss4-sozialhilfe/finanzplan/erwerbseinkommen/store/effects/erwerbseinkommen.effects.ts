import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ErwerbseinkommenApiClient } from '../../erwerbseinkommen.ApiClient.service';
import * as action from '../actions/erwerbseinkommen.actions';

@Injectable()
export class ErwerbseinkommenEffects {

    constructor(private actions$: Actions,
        private erwerbseinkommenApiClient: ErwerbseinkommenApiClient) {
    }

    @Effect()
    loadBgErwerbseinkommenData$ = this.actions$
    .ofType(action.ErwerbseinkommenActionTypes.BgErwerbseinkommenLoadType.LOAD)
    .pipe(
        map((actions: action.BgErwerbseinkommenLoadData.LoadAction) => actions.payload),
        switchMap((type: any) => {
            return this.erwerbseinkommenApiClient.getBgErwerbseinkommen(type.bgBudgetID, type.bgGruppeCode, type.isShowOnlyCurrent)
            .pipe(
                map(bgErwerbseinkommen => new action.BgErwerbseinkommenLoadData.LoadSuccessAction(bgErwerbseinkommen)),
                catchError(error => of(new action.BgErwerbseinkommenLoadData.LoadFailAction(error)))
            );
        })
    );

    @Effect()
    addBgErwerbseinkommenData$ = this.actions$
    .ofType(action.ErwerbseinkommenActionTypes.BgErwerbseinkommenAddType.ADD)
    .pipe(
        map((actions: action.BgErwerbseinkommenAddData.AddAction) => actions.payload),
        switchMap((data: any) => {
            return this.erwerbseinkommenApiClient.addBgErwerbseinkommen(data)
            .pipe(
                map(bgErwerbseinkommen => new action.BgErwerbseinkommenAddData.AddSuccessAction(bgErwerbseinkommen)),
                catchError(error => of(new action.BgErwerbseinkommenAddData.AddFailAction(error)))
            );
        })
    );

    @Effect()
    updateBgErwerbseinkommenData$ = this.actions$
    .ofType(action.ErwerbseinkommenActionTypes.BgErwerbseinkommenUpdateType.PUT)
    .pipe(
        map((actions: action.BgErwerbseinkommenUpdateData.UpdateAction) => actions.payload),
        switchMap((data: any) => {
            return this.erwerbseinkommenApiClient.updateBgErwerbseinkommen(data)
            .pipe(
                map(bgErwerbseinkommen => new action.BgErwerbseinkommenUpdateData.UpdateSuccessAction(bgErwerbseinkommen)),
                catchError(error => of(new action.BgErwerbseinkommenUpdateData.UpdateFailAction(error)))
            );
        })
    );

    @Effect()
    deleteBgErwerbseinkommenData$ = this.actions$
    .ofType(action.ErwerbseinkommenActionTypes.BgErwerbseinkommenDelType.DEL)
    .pipe(
        map((actions: action.BgErwerbseinkommenDeleteData.DeleteAction) => actions.payload),
        switchMap((data: any) => {
            return this.erwerbseinkommenApiClient.deleteBgErwerbseinkommen(data)
            .pipe(
                map(bgErwerbseinkommen => new action.BgErwerbseinkommenDeleteData.DeleteSuccessAction(bgErwerbseinkommen)),
                catchError(error => of(new action.BgErwerbseinkommenDeleteData.DeleteFailAction(error)))
            );
        })
    );

    @Effect()
    loadBgErwerbseinkommenDropdownData$ = this.actions$
    .ofType(action.ErwerbseinkommenActionTypes.BgErwerbseinkommenDropdownLoadType.LOAD)
    .pipe(
        map((actions: action.BgErwerbseinkommenDropdownLoadData.LoadAction) => actions.payload),
        switchMap((data: any) => {
            return this.erwerbseinkommenApiClient.getErwerbseinkommenDropdown(data)
            .pipe(
                map(bgErwerbseinkommenDropdown => new action.BgErwerbseinkommenDropdownLoadData.LoadSuccessAction(bgErwerbseinkommenDropdown)),
                catchError(error => of(new action.BgErwerbseinkommenDropdownLoadData.LoadFailAction(error)))
            );
        })
    );

    @Effect()
    loadBgBewilligungStatusCodeData$ = this.actions$
    .ofType(action.ErwerbseinkommenActionTypes.BgBewilligungStatusCodeLoadType.LOAD)
    .pipe(
        map((actions: action.BgBewilligungStatusCodeLoadData.LoadAction) => actions.payload),
        switchMap((data: any) => {
            return this.erwerbseinkommenApiClient.getBgBewilligungStatusCode(data)
            .pipe(
                map(bgErwerbseinkommenDropdown => new action.BgBewilligungStatusCodeLoadData.LoadSuccessAction(bgErwerbseinkommenDropdown)),
                catchError(error => of(new action.BgBewilligungStatusCodeLoadData.LoadFailAction(error)))
            );
        })
    );

}
