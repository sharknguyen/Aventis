import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { TreeViewItemsQuery } from '../../models/tree-view-item.model';
import { SozialhilfeTreeApiClient } from '../../sozialhilfe-treeApiClient.service';
import * as actions from '../actions/sozialhilfe-tree.actions';

@Injectable()
export class SozialhilfeTreeEffects {

  constructor(
    private actions$: Actions,
    private fallfuhrungTreeApiClient: SozialhilfeTreeApiClient
  ) { }
  @Effect()
  getTreeViewItems$ =
    this.actions$.ofType(actions.LoadTreeViewItemsTypes.LOAD).pipe(
      map((action: actions.LoadTreeViewItemsAction.LoadAction) => action.payload),
      switchMap((state: TreeViewItemsQuery) => {
        const query = tryMapPathApi(state);
        return this.fallfuhrungTreeApiClient.getTreeViewItems(query).pipe(
          map((data) => new actions.LoadTreeViewItemsAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.LoadTreeViewItemsAction.LoadFailAction(error)))
        );
      })
    );

  @Effect()
  deleteBudget$ =
    this.actions$.ofType(actions.DeleteBudgetTypes.LOAD).pipe(
      map((action: actions.DeleteBudgetAction.LoadAction) => action.payload),
      switchMap((state) => {
        return this.fallfuhrungTreeApiClient.deleteBudget(state).pipe(
          map((data) => new actions.DeleteBudgetAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.DeleteBudgetAction.LoadFailAction(error)))
        );
      })
    );

    @Effect()
  createBudget$ =
    this.actions$.ofType(actions.CreateBudgetTypes.LOAD).pipe(
      map((action: actions.CreateBudgetAction.LoadAction) => action.payload),
      switchMap((state) => {
        return this.fallfuhrungTreeApiClient.createBudget(state).pipe(
          map((data) => new actions.CreateBudgetAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.CreateBudgetAction.LoadFailAction(error)))
        );
      })
    );

    @Effect()
  createFinancialPlan$ =
    this.actions$.ofType(actions.CreateFinancialPlanTypes.LOAD).pipe(
      map((action: actions.CreateFinancialPlanTypesAction.LoadAction) => action.payload),
      switchMap((state) => {
        return this.fallfuhrungTreeApiClient.createFinancialPlan(state).pipe(
          map((data) => new actions.CreateFinancialPlanTypesAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.CreateFinancialPlanTypesAction.LoadFailAction(error)))
        );
      })
    );

    @Effect()
  deleteFinancialPlan$ =
    this.actions$.ofType(actions.DeleteFinancialPlanTypes.LOAD).pipe(
      map((action: actions.DeleteFinancialPlanTypesAction.LoadAction) => action.payload),
      switchMap((state) => {
        return this.fallfuhrungTreeApiClient.deleteFinancialPlan(state).pipe(
          map((data) => new actions.DeleteFinancialPlanTypesAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.DeleteFinancialPlanTypesAction.LoadFailAction(error)))
        );
      })
    );

    @Effect()
  deleteSozialhilfe$ =
    this.actions$.ofType(actions.DeleteSozialhilfeTypes.LOAD).pipe(
      map((action: actions.DeleteSozialhilfeTypesAction.LoadAction) => action.payload),
      switchMap((state) => {
        return this.fallfuhrungTreeApiClient.deleteSozialhilfe(state).pipe(
          map((data) => new actions.DeleteSozialhilfeTypesAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.DeleteSozialhilfeTypesAction.LoadFailAction(error)))
        );
      })
    );

    @Effect()
  createSozialhilfe$ =
    this.actions$.ofType(actions.CreateSozialhilfeTypes.LOAD).pipe(
      map((action: actions.CreateSozialhilfeTypesAction.LoadAction) => action.payload),
      switchMap((state) => {
        return this.fallfuhrungTreeApiClient.createSozialhilfe(state).pipe(
          map((data) => new actions.CreateSozialhilfeTypesAction.LoadSuccessAction(data)),
          catchError(error => of(new actions.CreateSozialhilfeTypesAction.LoadFailAction(error)))
        );
      })
    );
}
