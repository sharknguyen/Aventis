import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';
import * as fromGrundBedarf from './reducers/grund-bedarf.reducer';


export interface GrundBedarfState {
    grundbedarf: fromGrundBedarf.State;
}

export const reducers: ActionReducerMap<GrundBedarfState> = {
    grundbedarf: fromGrundBedarf.reducer
};

export const getGrundBedarfState = createFeatureSelector<GrundBedarfState>(
    AppEnums.FeatureModule.grundBedarf
);

export const getGrundBedarfStates = createSelector(
    getGrundBedarfState,
    (state: GrundBedarfState) => state.grundbedarf
);

export const getBerechnungsgrundlageSelectBoxDataLoading = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getBerechnungsgrundlageSelectboxData.getLoading
);
export const getBerechnungsgrundlageSelectBoxDataFailed = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getBerechnungsgrundlageSelectboxData.getFailed
);
export const getBerechnungsgrundlageSelectBoxData = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getBerechnungsgrundlageSelectboxData.getDatas
);

export const getGrundBedarfqryBgPositionDataLoaded = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfQryBgPositionData.getLoaded
);
export const getGrundBedarfqryBgPositionDataLoading = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfQryBgPositionData.getLoading
);
export const getGrundBedarfqryBgPositionDataFailed = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfQryBgPositionData.getFailed
);
export const getGrundBedarfqryBgPositionData = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfQryBgPositionData.getDatas
);

export const getGrundBedarfqryKennzahlenDataLoaded = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfQryKennzahlenData.getLoaded
);
export const getGrundBedarfqryKennzahlenDataLoading = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfQryKennzahlenData.getLoading
);
export const getGrundBedarfqryKennzahlenDataFailed = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfQryKennzahlenData.getFailed
);
export const getGrundBedarfqryKennzahlenData = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfQryKennzahlenData.getDatas
);

export const getGrundBedarfInitFormDataLoaded = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfInitFormData.getLoaded
);

export const getGrundBedarfInitFormDataLoading = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfInitFormData.getLoading
);
export const getGrundBedarfInitFormDataFailed = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfInitFormData.getFailed
);
export const getGrundBedarfInitFormData = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfInitFormData.getDatas
);

export const getGrundBedarfRichtlinieDataLoaded = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfRichtlinieData.getLoaded
);

export const getGrundBedarfRichtlinieDataLoading = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfRichtlinieData.getLoading
);
export const getGrundBedarfRichtlinieDataFailed = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfRichtlinieData.getFailed
);
export const getGrundBedarfRichtlinieData = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfRichtlinieData.getDatas
);

// GrundBedarfPauschaleSTEDatasState
export const getGrundBedarfPauschaleSTEDataLoaded = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfPauschaleSTEData.getLoaded
);

export const getGrundBedarfPauschaleSTEDataLoading = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfPauschaleSTEData.getLoading
);
export const getGrundBedarfPauschaleSTEDataFailed = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfPauschaleSTEData.getFailed
);
export const getGrundBedarfPauschaleSTEData = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfPauschaleSTEData.getDatas
);

// ShStatusCodeToSqlDatasState
export const getShStatusCodeToSqlDataLoaded = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getShStatusCodeToSqlData.getLoaded
);

export const getShStatusCodeToSqlDataLoading = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getShStatusCodeToSqlData.getLoading
);
export const getShStatusCodeToSqlDataFailed = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getShStatusCodeToSqlData.getFailed
);
export const getShStatusCodeToSqlData = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getShStatusCodeToSqlData.getDatas
);

export const getGrundBedarfUpdateFormData = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfUpdateFormData.getDatas
);

export const getGrundBedarfUpdateFormDataUpdating = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfUpdateFormData.getUpdating
);
export const getGrundBedarfUpdateFormDataSuccess = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfUpdateFormData.getUpdated
);
export const getGrundBedarfUpdateFormDataFaild = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfUpdateFormData.getFailed
);

export const getGrundBedarfUpdateBeforePostData = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfUpdateBeforePostData.getDatas
);

export const getGrundBedarfUpdateBeforePostDataUpdating = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfUpdateBeforePostData.getUpdating
);
export const getGrundBedarfUpdateBeforePostDataSuccess = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfUpdateBeforePostData.getUpdated
);
export const getGrundBedarfUpdateBeforePostDataFaild = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getGrundBedarfUpdateBeforePostData.getFailed
);

export const getStatusCodeDataLoaded = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getStatusCodeData.getLoaded
);

export const getStatusCodeDataLoading = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getStatusCodeData.getLoading
);
export const getStatusCodeDataFailed = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getStatusCodeData.getFailed
);
export const getStatusCodeData = createSelector(
    getGrundBedarfStates,
    fromGrundBedarf.getStatusCodeData.getDatas
);
