import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromZulageEfb from './reducers/zulagen-efb.reducer';

export interface ZulagenEFBState {
  zulagenEfb: fromZulageEfb.State;
}

export const reducers: ActionReducerMap<ZulagenEFBState> = {
  zulagenEfb: fromZulageEfb.reducer
};

export const getAhvBeitrageState = createFeatureSelector<ZulagenEFBState>(
  AppEnums.FeatureModule.zulagen
);

export const getZulagenEFBState = createSelector(
  getAhvBeitrageState,
  (state: ZulagenEFBState) => state.zulagenEfb
);

/***** Load BgSilAHVBeitrag data*****/
export const getBgSilAHVBeitragLoaded = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getBgSilAHVBeitrag.getLoaded
);

export const getBgSilAHVBeitragLoading = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getBgSilAHVBeitrag.getLoading
);

export const getBgSilAHVBeitragFailed = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getBgSilAHVBeitrag.getFailed
);

export const getBgSilAHVBeitrag = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getBgSilAHVBeitrag.getDatas
);

// Get combobox data
export const getComboboxLoaded = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getComboboxWhLeiStung.getLoaded
);
export const getComboboxLoading = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getComboboxWhLeiStung.getLoading
);
export const getComboboxFailed = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getComboboxWhLeiStung.getFailed
);
export const getComboboxgData = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getComboboxWhLeiStung.getDatas
);

// Get BgPosition data
export const getBgPositionLoaded = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getBgPosition.getLoaded
);
export const getBgPositionLoading = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getBgPosition.getLoading
);
export const getBgPositionFailed = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getBgPosition.getFailed
);
export const getBgPositionData = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getBgPosition.getDatas
);

// Get RichtLinie data
export const getRichtLinieLoaded = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getRichtLinie.getLoaded
);
export const getRichtLinieLoading = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getRichtLinie.getLoading
);
export const getRichtLinieFailed = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getRichtLinie.getFailed
);
export const getRichtLinieData = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getRichtLinie.getDatas
);

// Get getBgPositionsart data
export const getBgPositionsartLoaded = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getBgPositionsart.getLoaded
);
export const getBgPositionsartLoading = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getBgPositionsart.getLoading
);
export const getBgPositionsartFailed = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getBgPositionsart.getFailed
);
export const getBgPositionsartData = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getBgPositionsart.getDatas
);

// Get getBgPositionsartId data
export const getBgPositionsartIdLoaded = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getBgPositionsartId.getLoaded
);
export const getBgPositionsartIdLoading = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getBgPositionsartId.getLoading
);
export const getBgPositionsartIdFailed = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getBgPositionsartId.getFailed
);
export const getBgPositionsartIdData = createSelector(
  getZulagenEFBState,
  fromZulageEfb.getBgPositionsartId.getDatas
);

// update BgPosition
export const getBgPositionUpdateData = createSelector(
  getZulagenEFBState,
  fromZulageEfb.putBgPosition.getRespone
);

export const getBgPositionUpdating = createSelector(
  getZulagenEFBState,
  fromZulageEfb.putBgPosition.getUpdating
);
export const getBgPositionUpdatedSuccess = createSelector(
  getZulagenEFBState,
  fromZulageEfb.putBgPosition.getUpdated
);
export const getBgPositionUpdatedFaild = createSelector(
  getZulagenEFBState,
  fromZulageEfb.putBgPosition.getUpdateFail
);
