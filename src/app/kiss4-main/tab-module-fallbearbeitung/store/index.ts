import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as tabModuleFallbearbeitungReducer from './reducers/tab-module-fallbearbeitung.reducer';

export interface ITabModuleFallbearbeitungState {
  tabModuleFallbearbeitung: tabModuleFallbearbeitungReducer.State;
}

export const reducers: ActionReducerMap<ITabModuleFallbearbeitungState> = {
  tabModuleFallbearbeitung: tabModuleFallbearbeitungReducer.reducer
};

export const getFeatureTabModuleFallbearbeitungState = createFeatureSelector<ITabModuleFallbearbeitungState>(
  AppEnums.FeatureModule.tabModuleFallbearbeitung
);

export const getTabModuleFallbearbeitungState = createSelector(
  getFeatureTabModuleFallbearbeitungState,
  (state: ITabModuleFallbearbeitungState) => state.tabModuleFallbearbeitung,
);

// Get Module Icon
export const getModuleIcon = createSelector(
  getTabModuleFallbearbeitungState,
  tabModuleFallbearbeitungReducer.getModuleIcon.getData,
);
export const getModuleIconLoading = createSelector(
  getTabModuleFallbearbeitungState,
  tabModuleFallbearbeitungReducer.getModuleIcon.getLoading,
);
export const getModuleIconLoaded = createSelector(
  getTabModuleFallbearbeitungState,
  tabModuleFallbearbeitungReducer.getModuleIcon.getLoaded,
);
export const getModuleIconFailed = createSelector(
  getTabModuleFallbearbeitungState,
  tabModuleFallbearbeitungReducer.getModuleIcon.getFailed,
);

// Get Zeitachse Visible
export const getZeitachseVisible = createSelector(
  getTabModuleFallbearbeitungState,
  tabModuleFallbearbeitungReducer.getZeitachseVisible.getData,
);
export const getZeitachseVisibleLoading = createSelector(
  getTabModuleFallbearbeitungState,
  tabModuleFallbearbeitungReducer.getZeitachseVisible.getLoading,
);
export const getZeitachseVisibleLoaded = createSelector(
  getTabModuleFallbearbeitungState,
  tabModuleFallbearbeitungReducer.getZeitachseVisible.getLoaded,
);
export const getZeitachseVisibleFailed = createSelector(
  getTabModuleFallbearbeitungState,
  tabModuleFallbearbeitungReducer.getZeitachseVisible.getFailed,
);

// Get Person Info Titel
export const getPersonInfoTitel = createSelector(
  getTabModuleFallbearbeitungState,
  tabModuleFallbearbeitungReducer.getPersonInfoTitel.getData,
);
export const getPersonInfoTitelLoading = createSelector(
  getTabModuleFallbearbeitungState,
  tabModuleFallbearbeitungReducer.getPersonInfoTitel.getLoading,
);
export const getPersonInfoTitelLoaded = createSelector(
  getTabModuleFallbearbeitungState,
  tabModuleFallbearbeitungReducer.getPersonInfoTitel.getLoaded,
);
export const getPersonInfoTitelFailed = createSelector(
  getTabModuleFallbearbeitungState,
  tabModuleFallbearbeitungReducer.getPersonInfoTitel.getFailed,
);
