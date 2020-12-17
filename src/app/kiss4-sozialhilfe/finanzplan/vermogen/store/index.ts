import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromVermogen from './reduces/vermogen.reducer';


export interface VermogenState {
    vermogen: fromVermogen.State;
}

export const reducers: ActionReducerMap<VermogenState> = {
    vermogen: fromVermogen.reducer
};

export const getVermogenState = createFeatureSelector<VermogenState>(
    AppEnums.FeatureModule.vermogen
);

export const getVermogenStates = createSelector(
    getVermogenState,
    (state: VermogenState) => state.vermogen
);


/**
 * Get BgPosition data
 */
export const getBgPositionLoaded = createSelector(
    getVermogenStates,
    fromVermogen.getBgPosition.getLoaded
);
export const getBgPositionLoading = createSelector(
    getVermogenStates,
    fromVermogen.getBgPosition.getLoading
);
export const getBgPositionFailed = createSelector(
    getVermogenStates,
    fromVermogen.getBgPosition.getFailed
);
export const getBgPositionData = createSelector(
    getVermogenStates,
    fromVermogen.getBgPosition.getDatas
);

/**
 * Get BgFinanzplan data
 */
export const getBgFinanzplanLoaded = createSelector(
    getVermogenStates,
    fromVermogen.getBgFinanzplan.getLoaded
);
export const getBgFinanzplanLoading = createSelector(
    getVermogenStates,
    fromVermogen.getBgFinanzplan.getLoading
);
export const getBgFinanzplanFailed = createSelector(
    getVermogenStates,
    fromVermogen.getBgFinanzplan.getFailed
);
export const getBgFinanzplanData = createSelector(
    getVermogenStates,
    fromVermogen.getBgFinanzplan.getDatas
);

/**
 * Get Personen data
 */
export const getPersonenLoaded = createSelector(
    getVermogenStates,
    fromVermogen.getPersonen.getLoaded
);
export const getPersonenLoading = createSelector(
    getVermogenStates,
    fromVermogen.getPersonen.getLoading
);
export const getPersonenFailed = createSelector(
    getVermogenStates,
    fromVermogen.getPersonen.getFailed
);
export const getPersonenData = createSelector(
    getVermogenStates,
    fromVermogen.getPersonen.getDatas
);

/**
 * Get WhPositionsart data
 */
export const getWhPositionsartLoaded = createSelector(
    getVermogenStates,
    fromVermogen.getWhPositionsart.getLoaded
);
export const getWhPositionsartLoading = createSelector(
    getVermogenStates,
    fromVermogen.getWhPositionsart.getLoading
);
export const getWhPositionsartFailed = createSelector(
    getVermogenStates,
    fromVermogen.getWhPositionsart.getFailed
);
export const getWhPositionsartData = createSelector(
    getVermogenStates,
    fromVermogen.getWhPositionsart.getDatas
);

/**
 * Del BgPosition
 */
export const getDelBgPositionLoaded = createSelector(
    getVermogenStates,
    fromVermogen.getDelBgPosition.getLoaded
);
export const getDelBgPositionLoading = createSelector(
    getVermogenStates,
    fromVermogen.getDelBgPosition.getLoading
);
export const getDelBgPositionFailed = createSelector(
    getVermogenStates,
    fromVermogen.getDelBgPosition.getFailed
);
export const getDelBgPositionData = createSelector(
    getVermogenStates,
    fromVermogen.getDelBgPosition.getDatas
);

/**
 * Get Freibetrag data
 */
export const getFreibetragLoaded = createSelector(
    getVermogenStates,
    fromVermogen.getFreibetrag.getLoaded
);
export const getFreibetragLoading = createSelector(
    getVermogenStates,
    fromVermogen.getFreibetrag.getLoading
);
export const getFreibetragFailed = createSelector(
    getVermogenStates,
    fromVermogen.getFreibetrag.getFailed
);
export const getFreibetragData = createSelector(
    getVermogenStates,
    fromVermogen.getFreibetrag.getDatas
);

/**
 * Insert BgPosition
 */
export const insertBgPositionLoaded = createSelector(
    getVermogenStates,
    fromVermogen.insertBgPosition.getLoaded
);
export const insertBgPositionLoading = createSelector(
    getVermogenStates,
    fromVermogen.insertBgPosition.getLoading
);
export const insertBgPositionFailed = createSelector(
    getVermogenStates,
    fromVermogen.insertBgPosition.getFailed
);
export const insertBgPositionData = createSelector(
    getVermogenStates,
    fromVermogen.insertBgPosition.getDatas
);

/**
 * Update BgPosition
 */
export const updateBgPositionLoaded = createSelector(
    getVermogenStates,
    fromVermogen.updateBgPosition.getLoaded
);
export const updateBgPositionLoading = createSelector(
    getVermogenStates,
    fromVermogen.updateBgPosition.getLoading
);
export const updateBgPositionFailed = createSelector(
    getVermogenStates,
    fromVermogen.updateBgPosition.getFailed
);
export const updateBgPositionData = createSelector(
    getVermogenStates,
    fromVermogen.updateBgPosition.getDatas
);

/**
 * Get status code
 */
export const getBgSilAHVBeitragLoaded = createSelector(
    getVermogenStates,
    fromVermogen.getBgSilAHVBeitrag.getLoaded
);

export const getBgSilAHVBeitragLoading = createSelector(
    getVermogenStates,
    fromVermogen.getBgSilAHVBeitrag.getLoading
);

export const getBgSilAHVBeitragFailed = createSelector(
    getVermogenStates,
    fromVermogen.getBgSilAHVBeitrag.getFailed
);

export const getBgSilAHVBeitrag = createSelector(
    getVermogenStates,
    fromVermogen.getBgSilAHVBeitrag.getDatas
);

