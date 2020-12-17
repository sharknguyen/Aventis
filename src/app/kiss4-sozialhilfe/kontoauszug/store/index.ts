import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as kontoauszugReducers from './reducers/kontoauszug.reducers';
import { AppEnums } from '@shared/AppEnum';

export interface IKontoauszugState {
    kontoauszug: kontoauszugReducers.IState;
}

export const reducers: ActionReducerMap<IKontoauszugState> = {
    kontoauszug: kontoauszugReducers.reducer
};

export const getFeatureKontoauszugState = createFeatureSelector<IKontoauszugState>(
    AppEnums.FeatureModule.kontoauszug
);

export const getKontoauszugState = createSelector(
    getFeatureKontoauszugState,
    (state: IKontoauszugState) => state.kontoauszug,
);

// Get Personnen
export const getPersonnen = createSelector(getKontoauszugState, kontoauszugReducers.GetPersonnen.getData);
export const getPersonnenLoading = createSelector(getKontoauszugState, kontoauszugReducers.GetPersonnen.getLoading);
export const getPersonnenLoaded = createSelector(getKontoauszugState, kontoauszugReducers.GetPersonnen.getLoaded);
export const getPersonnenFailed = createSelector(getKontoauszugState, kontoauszugReducers.GetPersonnen.getFailed);

// Get Zeitraum
export const getZeitraum = createSelector(getKontoauszugState, kontoauszugReducers.GetZeitraum.getData);
export const getZeitraumLoading = createSelector(getKontoauszugState, kontoauszugReducers.GetZeitraum.getLoading);
export const getZeitraumLoaded = createSelector(getKontoauszugState, kontoauszugReducers.GetZeitraum.getLoaded);
export const getZeitraumFailed = createSelector(getKontoauszugState, kontoauszugReducers.GetZeitraum.getFailed);

// Get Kostenart
export const getKostenart = createSelector(getKontoauszugState, kontoauszugReducers.GetKostenart.getData);
export const getKostenartLoading = createSelector(getKontoauszugState, kontoauszugReducers.GetKostenart.getLoading);
export const getKostenartLoaded = createSelector(getKontoauszugState, kontoauszugReducers.GetKostenart.getLoaded);
export const getKostenartFailed = createSelector(getKontoauszugState, kontoauszugReducers.GetKostenart.getFailed);

// Search Kontoauszug
export const searchKontoauszug = createSelector(getKontoauszugState, kontoauszugReducers.SearchKontoauszug.getData);
export const searchKontoauszugLoading = createSelector(getKontoauszugState, kontoauszugReducers.SearchKontoauszug.getLoading);
export const searchKontoauszugLoaded = createSelector(getKontoauszugState, kontoauszugReducers.SearchKontoauszug.getLoaded);
export const searchKontoauszugFailed = createSelector(getKontoauszugState, kontoauszugReducers.SearchKontoauszug.getFailed);

// Get LovLookups
export const getLovLookups = createSelector(getKontoauszugState, kontoauszugReducers.GetLovLookups.getData);
export const getLovLookupsLoading = createSelector(getKontoauszugState, kontoauszugReducers.GetLovLookups.getLoading);
export const getLovLookupsLoaded = createSelector(getKontoauszugState, kontoauszugReducers.GetLovLookups.getLoaded);
export const getLovLookupsFailed = createSelector(getKontoauszugState, kontoauszugReducers.GetLovLookups.getFailed);
