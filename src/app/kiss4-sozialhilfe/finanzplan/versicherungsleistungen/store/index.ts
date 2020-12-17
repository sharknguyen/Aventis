import * as versicherungsleistungenReducers from '@app/kiss4-sozialhilfe/finanzplan/versicherungsleistungen/store/reducers/versicherungsleistungen.reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';


export interface VersicherungsleistungenState {
    versicherungsleistungen: versicherungsleistungenReducers.State;
}

export const reducers: ActionReducerMap<VersicherungsleistungenState> = {
    versicherungsleistungen: versicherungsleistungenReducers.reducer
};

export const getVersicherungsleistungenState = createFeatureSelector<VersicherungsleistungenState>(
    AppEnums.FeatureModule.versicherungsleistungen
);

export const selectVersicherungsleistungenState = createSelector(
    getVersicherungsleistungenState,
    (state: VersicherungsleistungenState) => state.versicherungsleistungen
);

export const loadEinkommenLoaded = createSelector(
    selectVersicherungsleistungenState,
    versicherungsleistungenReducers.LoadEinkommensLoaded
);
export const loadEinkommenLoading = createSelector(
    selectVersicherungsleistungenState,
    versicherungsleistungenReducers.LoadEinkommensLoading
);
export const loadEinkommenFailed = createSelector(
    selectVersicherungsleistungenState,
    versicherungsleistungenReducers.LoadEinkommensFailed
);
export const loadEinkommenData = createSelector(
    selectVersicherungsleistungenState,
    versicherungsleistungenReducers.LoadEinkommens
);
export const postEinkommenData = createSelector(
    selectVersicherungsleistungenState,
    versicherungsleistungenReducers.PostEinkommens
);
export const putEinkommenData = createSelector(
    selectVersicherungsleistungenState,
    versicherungsleistungenReducers.PutEinkommens
);
export const deleteEinkommenData = createSelector(
    selectVersicherungsleistungenState,
    versicherungsleistungenReducers.DeleteEinkommens
);
export const getEinkommenLooUpData = createSelector(
    selectVersicherungsleistungenState,
    versicherungsleistungenReducers.GetEinkommensLookUp
);
export const getPersonListData = createSelector(
    selectVersicherungsleistungenState,
    versicherungsleistungenReducers.GetPersonList
);
export const getBgBewilligungStatusCodeData = createSelector(
    selectVersicherungsleistungenState,
    versicherungsleistungenReducers.GetBgBewilligungStatusCode
);

