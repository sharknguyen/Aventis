import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as fromLandesxindexes from './reducers/landesxindex.reducer';

export interface LandesxindexState {
    landesxindexes: fromLandesxindexes.State;
}

export const reducers: ActionReducerMap<LandesxindexState> = {
    landesxindexes: fromLandesxindexes.reducer
};

export const getLandesxindexState = createFeatureSelector<LandesxindexState>(
    AppEnums.FeatureModule.landesxindex
);

export const getLandesxindexsState = createSelector(
    getLandesxindexState,
    (state: LandesxindexState) => state.landesxindexes
);
/***** Load data for top grid *****/
export const getLandesxindexesLoaded = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getLandesxindexInit.getLoaded
);

export const getLandesxindexesLoading = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getLandesxindexInit.getLoading
);
export const getLandesxindexesFailed = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getLandesxindexInit.getFailed
);
export const getLandesxindexesData = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getLandesxindexInit.getDatas
);
/***** The End Load data for top grid *****/

/***** Load data for bottom grid *****/
// GetLandesindexWertDatasState
export const getLandesindexWertLoading = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getLandesindexWert.getLoading
);
export const getLandesindexWertFailed = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getLandesindexWert.getFailed
);
export const getLandesindexWertData = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getLandesindexWert.getDatas
);
/***** The End Load data bottom top grid *****/

/***** delete a row in grid top *****/
export const getLandesindexDeleteData = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getDeleteLandesxindex.getDatas
);

export const getLandesindexDeleting = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getDeleteLandesxindex.getDeleting
);
export const getLandesindexDeletedSuccess = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getDeleteLandesxindex.getDeleted
);
export const getLandesindexsDeletedFaild = createSelector(

    getLandesxindexsState,
    fromLandesxindexes.getDeleteLandesxindex.getFailed
);
/***** The end delete a row in grid top *****/

/***** Delete all rows in bottom grid follow by Top grid *****/
export const getLandesindexWertByIkLandesindexIDDeleteData = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getDeleteLandesxindexWertByIkLandesindexID.getDatas
);

export const getLandesindexWertByIkLandesindexIDDeleting = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getDeleteLandesxindexWertByIkLandesindexID.getDeleting
);
export const getLandesindexWertByIkLandesindexIDDeletedSuccess = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getDeleteLandesxindexWertByIkLandesindexID.getDeleted
);
export const getLandesindexWertByIkLandesindexIDDeletedFaild = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getDeleteLandesxindexWertByIkLandesindexID.getFailed
);
/***** The End Delete all rows in bottom grid follow by Top grid *****/

// delete a row in bottom grid
export const getLandesxindexWertDeleteData = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getDeleteLandesxindexWert.getDatas
);

export const getLandesxindexWertDeleting = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getDeleteLandesxindexWert.getDeleting
);
export const getLandesxindexWertDeletedSuccess = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getDeleteLandesxindexWert.getDeleted
);
export const getLandesxindexWertDeletedFaild = createSelector(

    getLandesxindexsState,
    fromLandesxindexes.getDeleteLandesxindexWert.getFailed
);
// update a row in top grid
export const getLandesxindexUpdateData = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getUpdateLandesindex.getDatas
);

export const getLandesxindexUpdating = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getUpdateLandesindex.getUpdating
);
export const getLandesxindexUpdatedSuccess = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getUpdateLandesindex.getUpdated
);
export const getLandesxindexUpdatedFaild = createSelector(

    getLandesxindexsState,
    fromLandesxindexes.getUpdateLandesindex.getFailed
);
// Add Landesxindex
export const getLandesxindexAddData = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getAddLandesindex.getDatas
);

export const getLandesxindexAdding = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getAddLandesindex.getAdding
);
export const getLandesxindexAdded = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getAddLandesindex.getAdded
);
export const getLandesxindexAddFail = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getAddLandesindex.getFailed
);
/***** Load IkLandesindex *****/
export const getIkLandesindexData = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getIkLandesindex.getDatas
);
/***** Load IkLandesindex *****/
/***** Load CountIkLandesindexWert *****/
export const getCountIkLandesindexWertStateData = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getCountIkLandesindexWert.getState
);
/***** Load CountIkLandesindexWert *****/

/***** Load NameIkLandesindex *****/
export const getNameIkLandesindexStateData = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getNameIkLandesindex.getState
);
/***** Load NameIkLandesindex *****/
/***** Get AddIkLandesindexWert Data *****/
export const getAddIkLandesindexWertData = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getAddLandesindexWertErfassen.getDatas
);
/***** Get AddIkLandesindexWert Data *****/
// Get Wert
export const getWertLoaded = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getWert.getLoadded
);

export const getWertLoading = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getWert.getLoadding
);
export const getWertFailed = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getWert.getFailed
);
export const getWertsData = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getWert.getDatas
);

// Add Wert by LandesIndex

export const getWertbyLandesIndexAdding = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.addLandesWertByLandesIndex.getAdding
);

export const getWertbyLandesIndexAdded = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.addLandesWertByLandesIndex.getAdded
);
export const getWertbyLandesIndexAddFail = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.addLandesWertByLandesIndex.getFailed
);
export const getWertbyLandesIndexData = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.addLandesWertByLandesIndex.getDatas
);

// Update Wert when insert

export const getUpdateWertUpdating = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getUpdateWert.getUpdating
);

export const getUpdateWertUpdated = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getUpdateWert.getUpdated
);
export const getUpdateWertUpdateFail = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getUpdateWert.getFailed
);
export const getUpdateWertData = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getUpdateWert.getDatas
);

// Add a Wert

export const getAddingWert = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getAddWert.getAdding
);

export const geAddedtWert = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getAddWert.getAdded
);
export const getAddFailWert = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getAddWert.getFailed
);
export const getAddDataWert = createSelector(
    getLandesxindexsState,
    fromLandesxindexes.getAddWert.getDatas
);
