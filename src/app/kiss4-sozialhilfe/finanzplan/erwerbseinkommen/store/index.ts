import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';
import * as erwerbseinkommenReducer from '../store/reducers/erwerbseinkommen.reducers';

export interface ErwerbseinkommenState {
    Erwerbseinkommen: erwerbseinkommenReducer.State;
}

export const reducers: ActionReducerMap<ErwerbseinkommenState> = {
    Erwerbseinkommen: erwerbseinkommenReducer.reducer
};

export const getErwerbseinkommenStampState = createFeatureSelector<ErwerbseinkommenState>(
    AppEnums.FeatureModule.erwerbseinkommen
);

export const geErwerbseinkommen_State = createSelector(
    getErwerbseinkommenStampState,
    (state: ErwerbseinkommenState) => state.Erwerbseinkommen
);

export const ErwerbseinkommenListLoading = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.ErwerbseinkommenLoad_State.getLoading
);

export const ErwerbseinkommenListLoaded = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.ErwerbseinkommenLoad_State.getLoaded
);

export const ErwerbseinkommenListFailed = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.ErwerbseinkommenLoad_State.getFailed
);

export const ErwerbseinkommenList = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.ErwerbseinkommenLoad_State.getDatas
);

export const ErwerbseinkommenAdd = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.ErwerbseinkommenAdd_State.getDatas
);

export const ErwerbseinkommenAddLoading = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.ErwerbseinkommenAdd_State.getLoading
);

export const ErwerbseinkommenAddLoaded = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.ErwerbseinkommenAdd_State.getLoaded
);

export const ErwerbseinkommenAddFailed = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.ErwerbseinkommenAdd_State.getFailed
);

export const ErwerbseinkommenUpdate = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.ErwerbseinkommenUpdate_State.getDatas
);

export const ErwerbseinkommenUpdateLoading = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.ErwerbseinkommenUpdate_State.getLoading
);

export const ErwerbseinkommenUpdateLoaded = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.ErwerbseinkommenUpdate_State.getLoaded
);

export const ErwerbseinkommenUpdateFailed = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.ErwerbseinkommenUpdate_State.getFailed
);

export const ErwerbseinkommenDelete = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.ErwerbseinkommenDelete_State.getDatas
);

export const ErwerbseinkommenDeleteLoading = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.ErwerbseinkommenDelete_State.getLoading
);

export const ErwerbseinkommenDeleteLoaded = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.ErwerbseinkommenDelete_State.getLoaded
);

export const ErwerbseinkommenDeleteFailed = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.ErwerbseinkommenDelete_State.getFailed
);

export const BgErwerbseinkommenListLoading = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenLoad_State.getLoading
);

export const BgErwerbseinkommenListLoaded = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenLoad_State.getLoaded
);

export const BgErwerbseinkommenListFailed = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenLoad_State.getFailed
);

export const BgErwerbseinkommenList = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenLoad_State.getDatas
);

export const BgErwerbseinkommenAdd = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenAdd_State.getDatas
);

export const BgErwerbseinkommenAddLoading = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenAdd_State.getLoading
);

export const BgErwerbseinkommenAddLoaded = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenAdd_State.getLoaded
);

export const BgErwerbseinkommenAddFailed = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenAdd_State.getFailed
);

export const BgErwerbseinkommenUpdate = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenUpdate_State.getDatas
);

export const BgErwerbseinkommenUpdateLoading = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenUpdate_State.getLoading
);

export const BgErwerbseinkommenUpdateLoaded = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenUpdate_State.getLoaded
);

export const BgErwerbseinkommenUpdateFailed = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenUpdate_State.getFailed
);

export const BgErwerbseinkommenDelete = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenDelete_State.getDatas
);

export const BgErwerbseinkommenDeleteLoading = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenDelete_State.getLoading
);

export const BgErwerbseinkommenDeleteLoaded = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenDelete_State.getLoaded
);

export const BgErwerbseinkommenDeleteFailed = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenDelete_State.getFailed
);

export const BgErwerbseinkommenDropdownListLoading = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenLoadDropdown_State.getLoading
);

export const BgErwerbseinkommenDropdownListLoaded = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenLoadDropdown_State.getLoaded
);

export const BgErwerbseinkommenDropdownListFailed = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenLoadDropdown_State.getFailed
);

export const BgErwerbseinkommenDropdownList = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgErwerbseinkommenLoadDropdown_State.getDatas
);

//
export const BgBewilligungStatusCodeLoad = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgBewilligungStatusCode_State.getLoading
);

export const BgBewilligungStatusCodeLoaded = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgBewilligungStatusCode_State.getLoaded
);

export const BgBewilligungStatusCodeFailed = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgBewilligungStatusCode_State.getFailed
);

export const BgBewilligungStatusCode = createSelector(
    geErwerbseinkommen_State,
    erwerbseinkommenReducer.BgBewilligungStatusCode_State.getDatas
);
