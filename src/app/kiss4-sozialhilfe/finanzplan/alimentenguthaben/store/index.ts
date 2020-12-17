import { AppEnums } from '@shared/AppEnum';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAlimentenguthaben from './reducers/alimentenguthaben.reducers';

export interface AlimentenguthabenState {
    alimentenguthaben: fromAlimentenguthaben.State;
}
export const reducers: ActionReducerMap<AlimentenguthabenState> = {
    alimentenguthaben: fromAlimentenguthaben.reducer
};
export const getalimentenguthabenState = createFeatureSelector<AlimentenguthabenState>(
    AppEnums.FeatureModule.alimentenguthaben
);

// List
export const getalimentenguthaben_State = createSelector(
    getalimentenguthabenState,
    (state: AlimentenguthabenState) => state.alimentenguthaben
);

// List
export const fromAlimentenguthabenData = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getListGrid.getData
);
export const fromAlimentenguthabenDataLoading = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getListGrid.getLoading
);

export const fromAlimentenguthabenDataLoaded = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getListGrid.getLoaded
);

export const fromAlimentenguthabenDataFailed = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getListGrid.getFailed
);

// get Inkasso
export const getInkassoData = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getInkasso.getData
);
export const getInkassoDataLoading = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getInkasso.getLoading
);

export const getInkassoDataLoaded = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getInkasso.getLoaded
);

export const getInkassoDataFailed = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getInkasso.getFailed
);

// get PersonenUnterstuetztn Data
export const getPersonenUnterstuetztnData = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getPersonenUnterstuetztn.getData
);
export const getPersonenUnterstuetztnDataLoading = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getPersonenUnterstuetztn.getLoading
);

export const getPersonenUnterstuetztnDataLoaded = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getPersonenUnterstuetztn.getLoaded
);

export const getPersonenUnterstuetztnDataFailed = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getPersonenUnterstuetztn.getFailed
);

// New
export const alimentenguthabenNew = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getNewAimentenguthaben.getDatas
);

export const alimentenguthabenNewLoading = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getNewAimentenguthaben.getLoading
);

export const alimentenguthabenNewLoaded = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getNewAimentenguthaben.getLoaded
);

export const alimentenguthabenNewFail = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getNewAimentenguthaben.getFailed
);

// Edit
export const alimentenguthabenSave = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getSaveAimentenguthaben.getDatas
);

export const alimentenguthabenSaveLoading = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getSaveAimentenguthaben.getLoading
);

export const alimentenguthabenSaveLoaded = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getSaveAimentenguthaben.getLoaded
);

export const alimentenguthabenSaveFail = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getSaveAimentenguthaben.getFailed
);

// Delete
export const alimentenguthabenDelete = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getDeleteAimentenguthaben.getDatas
);

export const alimentenguthabenDeleteLoading = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getDeleteAimentenguthaben.getLoading
);

export const alimentenguthabenDeleteLoaded = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getDeleteAimentenguthaben.getLoaded
);

export const alimentenguthabenDeleteFail = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getDeleteAimentenguthaben.getFailed
);

// Get Title
export const getTitle = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getTitle.getDatas
);

export const getTitleLoading = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getTitle.getLoading
);

export const getTitleLoaded = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getTitle.getLoaded
);

export const getTitleFail = createSelector(
    getalimentenguthaben_State,
    fromAlimentenguthaben.getTitle.getFailed
);
