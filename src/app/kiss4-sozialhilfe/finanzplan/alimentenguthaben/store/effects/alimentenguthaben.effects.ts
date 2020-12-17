import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AlimentenguthabenApiClient } from '../../alimentenguthabenApiClient.service';
import { Alimentenguthaben, WhPositionsart } from '../../models';
import * as actions from '../actions/alimentenguthaben.actions';
@Injectable()
export class AlimentenguthabenEffects {
    constructor(private actions$: Actions, private alimentenguthabenApiClient: AlimentenguthabenApiClient) {
    }
    @Effect()
    getData$ = this.actions$
        .ofType(actions.AlimentenguthabenActionTypes.ListGridTypes.LOAD)
        .pipe(
            map((action: actions.ListGridDatas.LoadAction) => action.payload),
            switchMap((state: any) => {
                return this.alimentenguthabenApiClient
                    .getListData(state.bgBudgetID, state.bgGruppeCode, state.nurAktuelle)
                    .pipe(
                        map(
                            textMarken => {
                                return new actions.ListGridDatas.LoadSuccessAction(textMarken);
                            }
                        ),
                        catchError(
                            error => of(new actions.ListGridDatas.LoadFailAction(error))
                        ));
            })
        );

    @Effect()
    getInkassoData$ = this.actions$
        .ofType(actions.AlimentenguthabenActionTypes.GetInkassoDatasTypes.LOAD)
        .pipe(
            map((action: actions.GetInkassoDatas.LoadAction) => action.payload),
            switchMap((state: WhPositionsart) => {
                return this.alimentenguthabenApiClient
                    .getInkasso(state.bgGruppeCode, state.value, state.BgBudgetID)
                    .pipe(
                        map(
                            getInkasso => {
                                return new actions.GetInkassoDatas.LoadSuccessAction(getInkasso);
                            }
                        ),
                        catchError(
                            error => of(new actions.GetInkassoDatas.LoadFailAction(error))
                        ));
            })
        );

    @Effect()
    getPersonenUnterstuetztnData$ = this.actions$
        .ofType(actions.AlimentenguthabenActionTypes.getPersonenUnterstuetztn.LOAD)
        .pipe(
            map((action: actions.GetPersonenUnterstuetztnDatas.LoadAction) => action.payload),
            switchMap((state: any) => {
                return this.alimentenguthabenApiClient
                    .getPersonenUnterstuetztn(state.bgBudgetID)
                    .pipe(
                        map(getTable => new actions.GetPersonenUnterstuetztnDatas.LoadSuccessAction(getTable)),
                        catchError(error => of(new actions.GetPersonenUnterstuetztnDatas.LoadFailAction(error))));
            })
        );
    // New
    @Effect()
    newBaInstitutionKontakt$ = this.actions$
        .ofType(actions.AlimentenguthabenActionTypes.NewAlimentenguthabenActionTypes.POST)
        .pipe(
            map((action: actions.NewAlimentenguthabenAction.PostAction) => action.payload),
            switchMap((state: Alimentenguthaben) => {
                return this.alimentenguthabenApiClient
                    .newAlimentenguthaben(state)
                    .pipe(
                        map(berater => new actions.NewAlimentenguthabenAction.PostSuccessAction(berater)),
                        catchError(error => of(new actions.NewAlimentenguthabenAction.PostFailAction(error))));
            }));
    // Save
    @Effect()
    saveBaInstitutionKontakt$ = this.actions$
        .ofType(actions.AlimentenguthabenActionTypes.SaveAlimentenguthabenActionTypes.PUT)
        .pipe(
            map((action: actions.SaveAlimentenguthabenAction.PutAction) => action.payload),
            switchMap((state: Alimentenguthaben) => {
                return this.alimentenguthabenApiClient
                    .saveAlimentenguthaben(state)
                    .pipe(
                        map(berater => new actions.SaveAlimentenguthabenAction.PutSuccessAction(berater)),
                        catchError(error => of(new actions.SaveAlimentenguthabenAction.PutFailAction(error))));
            }));

    // Delete
    @Effect()
    deleteBaInstitutionKontakt$ = this.actions$
        .ofType(actions.AlimentenguthabenActionTypes.DeleteAlimentenguthabenActionTypes.DELETE)
        .pipe(
            map((action: actions.DeleteAlimentenguthabenAction.DeleteAction) => action.payload),
            switchMap((state: any) => {
                return this.alimentenguthabenApiClient
                    .deleteAlimentenguthaben(state)
                    .pipe(
                        map(berater => new actions.DeleteAlimentenguthabenAction.DeleteSuccessAction(berater)),
                        catchError(error => of(new actions.DeleteAlimentenguthabenAction.DeleteFailAction(error))));
            }));


    @Effect()
    getTitle$ = this.actions$
        .ofType(actions.AlimentenguthabenActionTypes.GetTitleActionTypes.GET)
        .pipe(
            map((action: actions.GetTitleAction.TitleAction) => action.payload),
            switchMap((state: number) => {
                return this.alimentenguthabenApiClient
                    .getTitle(state)
                    .pipe(
                        map(
                            title => {
                                return new actions.GetTitleAction.TitleSuccessAction(title);
                            }
                        ),
                        catchError(
                            error => of(new actions.GetTitleAction.TitleFailAction(error))
                        ));
            })
        );
}
