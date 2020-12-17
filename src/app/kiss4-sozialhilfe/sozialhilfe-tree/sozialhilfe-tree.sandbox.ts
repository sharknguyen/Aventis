import { createBugdet } from './store/reducers/sozialhilfe-tree.reducer';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import { Subscription } from 'rxjs';

import {
  FallNavigator,
  GetConfigIntQueryModel,
  InsertFaPhaseQueryModel,
  Message,
  MessageInformationQueryModel,
  UpdateFaLeistungQueryModel,
} from './models';
import { BNavigatorItemsQuery } from './models/b-navigator.model';
import { BapersonRelationQuery } from './models/baperson-relation.model';
import { TreeViewItemsQuery } from './models/tree-view-item.model';
import * as sozialhilfeTreeStore from './store';
import * as sozialhilfeTreeActions from './store/actions/sozialhilfe-tree.actions';

@Injectable()
export class SozialhilfeTreeSandbox extends Sandbox {
  public fallfuhrungTreeLoaded$ = this.sozialhilfeTreeState$.pipe(select(sozialhilfeTreeStore.getFallfuhrungTreeLoaded));
  public fallfuhrungTreeLoading$ = this.sozialhilfeTreeState$.pipe(select(sozialhilfeTreeStore.getFallfuhrungTreeLoading));
  public fallfuhrungTreeFailed$ = this.sozialhilfeTreeState$.pipe(select(sozialhilfeTreeStore.getFallfuhrungTreeFailed));

  public treeViewItemsLoading$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.getTreeViewItemsLoading);
  public treeViewItemsFailed$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.getTreeViewItemsFailed);
  public treeViewItems$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.getTreeViewItems);

  public deleteBudgetLoading$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.deleteBudgetLoading);
  public deleteBudgetFailed$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.deleteBudgetFailed);
  public deleteBudget$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.deleteBudget);

  public createBudgetLoading$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.createBudgetLoading);
  public createBudgetFailed$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.createBudgetFailed);
  public createBudget$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.createBudget);

  public createFinancialPlanLoading$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.createFinancialPlaLoading);
  public createFinancialPlanFailed$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.createFinancialPlaFailed);
  public createFinancialPlan$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.createFinancialPlan);

  public deleteFinancialPlanLoading$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.deleteFinancialPlaLoading);
  public deleteFinancialPlanFailed$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.deleteFinancialPlaFailed);
  public deleteFinancialPlan$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.deleteFinancialPlan);

  public createSozialhilfeLoading$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.createSozialhilfeLoading);
  public createSozialhilfeFailed$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.createSozialhilfeFailed);
  public createSozialhilfe$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.createSozialhilfe);

  public deleteSozialhilfeLoading$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.deleteSozialhilfeLoading);
  public deleteSozialhilfeFailed$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.deleteSozialhilfeFailed);
  public deleteSozialhilfe$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.deleteSozialhilfe);

  public nodesStatus$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.getNodesStatus);

  public isEditModeStatus$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.getEditModeStatus);
  public selectedNode$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.getSelectedNode);

  public treeNodeUpdateState$ = this.sozialhilfeTreeState$.select(sozialhilfeTreeStore.getTreeNodeUpdateState);
  private subscriptions: Subscription[] = [];

  constructor(
    protected appState$: Store<store.State>,
    private sozialhilfeTreeState$: Store<sozialhilfeTreeStore.ISozialhilfeTreeState>,
  ) {
    super(appState$);
  }


  public getTreeViewItems(treeViewItemsQuery?: TreeViewItemsQuery): void {
    this.sozialhilfeTreeState$.dispatch(new sozialhilfeTreeActions.LoadTreeViewItemsAction.LoadAction(treeViewItemsQuery));
  }

  public updateEditModeStatus(isEditMode: boolean): void {
    this.sozialhilfeTreeState$.dispatch(new sozialhilfeTreeActions.UpdateEditModeStatusAction(isEditMode));
  }

  public updateSelectedNode(selectedNode: any): void {
    this.sozialhilfeTreeState$.dispatch(new sozialhilfeTreeActions.UpdateSelectedNodeAction(selectedNode));
  }

  public resetTreeState(): void {
    this.sozialhilfeTreeState$.dispatch(
      new sozialhilfeTreeActions.LoadTreeViewItemsAction.ResetStateAction()
    );
  }

  public updateNodesStatus(data: any): void {
    this.sozialhilfeTreeState$.dispatch(new sozialhilfeTreeActions.UpdateNodesStatusAction(data));
  }

  public changeTreeNodeUpdateState(isUpdatedTreeNode: any): void {
    this.sozialhilfeTreeState$.dispatch(new sozialhilfeTreeActions.ChangeTreeNodeUpdateStateAction(isUpdatedTreeNode));
  }

  public deleteBudget(data: any): void {
    this.sozialhilfeTreeState$.dispatch(new sozialhilfeTreeActions.DeleteBudgetAction.LoadAction(data));
  }

  public createBudget(data: any): void {
    this.sozialhilfeTreeState$.dispatch(new sozialhilfeTreeActions.CreateBudgetAction.LoadAction(data));
  }

  public createFinancialPlan(data: any): void {
    this.sozialhilfeTreeState$.dispatch(new sozialhilfeTreeActions.CreateFinancialPlanTypesAction.LoadAction(data));
  }

  public deleteFinancialPlan(data: any): void {
    this.sozialhilfeTreeState$.dispatch(new sozialhilfeTreeActions.DeleteFinancialPlanTypesAction.LoadAction(data));
  }

  public deleteSozialhilfe(data: any): void {
    this.sozialhilfeTreeState$.dispatch(new sozialhilfeTreeActions.DeleteSozialhilfeTypesAction.LoadAction(data));
  }

  public createSozialhilfe(data: any): void {
    this.sozialhilfeTreeState$.dispatch(new sozialhilfeTreeActions.CreateSozialhilfeTypesAction.LoadAction(data));
  }

  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public registerEvents(): void {
    this.subscriptions.push(this.loggedUser$.subscribe((user: any) => {
      if (user.isLoggedIn) {
        // Do something here
      } else {
        this.unregisterEvents();
        this.clearStore();
      }
    }));
  }

  clearStore() {
    sozialhilfeTreeStore.getFallfuhrungTreeLoaded.release();
    sozialhilfeTreeStore.getFallfuhrungTreeLoading.release();
    sozialhilfeTreeStore.getFallfuhrungTreeFailed.release();
    sozialhilfeTreeStore.getFallfuhrungTreePerson.release();
    sozialhilfeTreeStore.getTreeViewItems.release();
  }
}
