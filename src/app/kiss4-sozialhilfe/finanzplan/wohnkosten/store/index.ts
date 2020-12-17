import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromWohnkosten from './reducers/wohnkosten.reducer';

export interface WohnkostenState {
  wohnkosten: fromWohnkosten.State;
}

export const reducers: ActionReducerMap<WohnkostenState> = {
  wohnkosten: fromWohnkosten.reducer
};

export const getWohnkostenStampState = createFeatureSelector<WohnkostenState>(
  AppEnums.FeatureModule.wohnkosten
);

export const getWohnkosten_State = createSelector(
  getWohnkostenStampState,
  (state: WohnkostenState) => state.wohnkosten
);

/***** get Finanzplan data *****/
export const getBgFinanzplanLoaded = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getBgFinanzplan_StateInit.getLoaded
);
export const getBgFinanzplanLoading = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getBgFinanzplan_StateInit.getLoading
);
export const getBgFinanzplanFailed = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getBgFinanzplan_StateInit.getFailed
);
export const getBgFinanzplanData = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getBgFinanzplan_StateInit.getDatas
);

/***** get BgGrundbedarf data *****/
export const getBgGrundbedarfLoaded = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getBgFinanzplan_StateInit.getLoaded
);
export const getBgGrundbedarfLoading = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getBgFinanzplan_StateInit.getLoading
);
export const getBgGrundbedarfFailed = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getBgFinanzplan_StateInit.getFailed
);
export const getBgGrundbedarfData = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getBgFinanzplan_StateInit.getDatas
);

/***** get BgPositionsart data *****/
export const getBgPositionsartLoaded = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getBgPositionsart_StateInit.getLoaded
);
export const getBgPositionsartLoading = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getBgPositionsart_StateInit.getLoading
);
export const getBgPositionsartFailed = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getBgPositionsart_StateInit.getFailed
);
export const getBgPositionsartData = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getBgPositionsart_StateInit.getDatas
);

/***** get BgPosition data *****/
export const getBgPositionLoaded = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getBgPosition_StateInit.getLoaded
);
export const getBgPositionLoading = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getBgPosition_StateInit.getLoading
);
export const getBgPositionFailed = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getBgPosition_StateInit.getFailed
);
export const getBgPositionData = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getBgPosition_StateInit.getDatas
);

/***** get WhKennzahlen data *****/
export const getWhKennzahlenLoaded = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getWhKennzahlen_StateInit.getLoaded
);
export const getWhKennzahlenLoading = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getWhKennzahlen_StateInit.getLoading
);
export const getWhKennzahlenFailed = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getWhKennzahlen_StateInit.getFailed
);
export const getWhKennzahlenData = createSelector(
  getWohnkosten_State,
  fromWohnkosten.getWhKennzahlen_StateInit.getDatas
);

/***** delete Wohnkosten *****/
export const deleteWohnkostenLoaded = createSelector(
  getWohnkosten_State,
  fromWohnkosten.deleteWohnkosten.getLoaded
);

export const deleteWohnkostenLoading = createSelector(
  getWohnkosten_State,
  fromWohnkosten.deleteWohnkosten.getLoading
);

export const deleteWohnkostenFailed = createSelector(
  getWohnkosten_State,
  fromWohnkosten.deleteWohnkosten.getFailed
);

export const deleteWohnkosten = createSelector(
  getWohnkosten_State,
  fromWohnkosten.deleteWohnkosten.getDatas
);

/***** update Wohnkosten *****/
export const updateWohnkostenLoaded = createSelector(
  getWohnkosten_State,
  fromWohnkosten.updateWohnkosten.getLoaded
);

export const updateWohnkostenLoading = createSelector(
  getWohnkosten_State,
  fromWohnkosten.updateWohnkosten.getLoading
);

export const updateWohnkostenFailed = createSelector(
  getWohnkosten_State,
  fromWohnkosten.updateWohnkosten.getFailed
);

export const updateWohnkosten = createSelector(
  getWohnkosten_State,
  fromWohnkosten.updateWohnkosten.getDatas
);

/***** create Wohnkosten *****/
export const createWohnkostenLoaded = createSelector(
  getWohnkosten_State,
  fromWohnkosten.createWohnkosten.getLoaded
);

export const createWohnkostenLoading = createSelector(
  getWohnkosten_State,
  fromWohnkosten.createWohnkosten.getLoading
);

export const createWohnkostenFailed = createSelector(
  getWohnkosten_State,
  fromWohnkosten.createWohnkosten.getFailed
);

export const createWohnkosten = createSelector(
  getWohnkosten_State,
  fromWohnkosten.createWohnkosten.getDatas
);
