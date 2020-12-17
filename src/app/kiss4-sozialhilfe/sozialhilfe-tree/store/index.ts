import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as formSozialhilfeTree from './reducers/sozialhilfe-tree.reducer';

export interface ISozialhilfeTreeState {
  sozialhilfeTree: formSozialhilfeTree.State;
}

export const reducers: ActionReducerMap<ISozialhilfeTreeState> = {
  sozialhilfeTree: formSozialhilfeTree.reducer
};

export const getFeatureFallfuhrungTreeState = createFeatureSelector<ISozialhilfeTreeState>(
  AppEnums.FeatureModule.sozialhilfeTree
);

export const getSozialhilfeTreeState = createSelector(
  getFeatureFallfuhrungTreeState,
  (state: ISozialhilfeTreeState) => state.sozialhilfeTree,
);

export const getFallfuhrungTreeLoaded = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.getFallfuhrungTreeLoaded,
);

export const getFallfuhrungTreeLoading = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.getFallfuhrungTreeLoading,
);

export const getNodesStatus = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.getNodesStatus,
);

export const getFallfuhrungTreeFailed = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.getFallfuhrungTreeFailed,
);

export const getFallfuhrungTreePerson = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.getFallfuhrungTreePerson,
);

export const getTreeViewItemsLoading = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.getTreeViewItems.getLoading
);

export const getTreeViewItemsFailed = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.getTreeViewItems.getFailed
);

export const getTreeNodeUpdateState = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.getTreeNodeUpdateState,
);


export const getTreeViewItems = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.getTreeViewItems.getData,
);

export const deleteBudgetLoading = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.deleteBugdet.getLoading
);

export const deleteBudgetFailed = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.deleteBugdet.getFailed
);

export const deleteBudget = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.deleteBugdet.getData,
);

export const createBudgetLoading = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.createBugdet.getLoading
);

export const createBudgetFailed = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.createBugdet.getFailed
);

export const createBudget = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.createBugdet.getData,
);

export const createFinancialPlaLoading = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.createFinancialPlan.getLoading
);

export const createFinancialPlaFailed = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.createFinancialPlan.getFailed
);

export const createFinancialPlan = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.createFinancialPlan.getData,
);

export const deleteFinancialPlaLoading = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.deleteFinancialPlan.getLoading
);

export const deleteFinancialPlaFailed = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.deleteFinancialPlan.getFailed
);

export const deleteFinancialPlan = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.deleteFinancialPlan.getData,
);

export const deleteSozialhilfeLoading = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.deleteSozialhilfe.getLoading
);

export const deleteSozialhilfeFailed = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.deleteSozialhilfe.getFailed
);

export const deleteSozialhilfe = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.deleteSozialhilfe.getData,
);

export const createSozialhilfeLoading = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.createSozialhilfe.getLoading
);

export const createSozialhilfeFailed = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.createSozialhilfe.getFailed
);

export const createSozialhilfe = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.createSozialhilfe.getData,
);

export const getEditModeStatus = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.getEditModeStatus
);

export const getSelectedNode = createSelector(
  getSozialhilfeTreeState,
  formSozialhilfeTree.getSelectedNode
);
