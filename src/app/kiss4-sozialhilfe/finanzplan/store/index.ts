import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromFinanzplan from '@app/kiss4-sozialhilfe/finanzplan/store/reducers/finanzplan.reducer';

export interface FinanzplanState {
  finanzPlan: fromFinanzplan.State;
}

export const reducers: ActionReducerMap<FinanzplanState> = {
  finanzPlan: fromFinanzplan.reducer
};

export const getFinanzPlanState = createFeatureSelector<FinanzplanState>(
  AppEnums.FeatureModule.finanzplan
);

export const getFinanzplanState = createSelector(
  getFinanzPlanState,
  (state: FinanzplanState) => state.finanzPlan
);

/***** Load BgSilAHVBeitrag data*****/
export const getBgSilAHVBeitragLoaded = createSelector(
  getFinanzplanState,
  fromFinanzplan.getBgSilAHVBeitrag.getLoaded
);

export const getBgSilAHVBeitragLoading = createSelector(
  getFinanzplanState,
  fromFinanzplan.getBgSilAHVBeitrag.getLoading
);

export const getBgSilAHVBeitragFailed = createSelector(
  getFinanzplanState,
  fromFinanzplan.getBgSilAHVBeitrag.getFailed
);

export const getBgSilAHVBeitrag = createSelector(
  getFinanzplanState,
  fromFinanzplan.getBgSilAHVBeitrag.getDatas
);

// Get finanzplan data
export const getFinanzplanLoaded = createSelector(
  getFinanzplanState,
  fromFinanzplan.getFinanzplan.getLoaded
);
export const getFinanzplanLoading = createSelector(
  getFinanzplanState,
  fromFinanzplan.getFinanzplan.getLoading
);
export const getFinanzplanFailed = createSelector(
  getFinanzplanState,
  fromFinanzplan.getFinanzplan.getFailed
);
export const getFinanzplanData = createSelector(
  getFinanzplanState,
  fromFinanzplan.getFinanzplan.getDatas
);
