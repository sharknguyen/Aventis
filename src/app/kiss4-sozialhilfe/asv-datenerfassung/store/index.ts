import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
} from '@ngrx/store';

import * as fromAsvDatenerfassung from './reducers/asv-datenerfassung.reducers';

import { AppEnums } from '@shared/AppEnum';

export interface AsvDatenerfassungState {
    AsvDatenerfassungs: fromAsvDatenerfassung.State;
}

export const reducers: ActionReducerMap<AsvDatenerfassungState> = {
    AsvDatenerfassungs: fromAsvDatenerfassung.reducer
};

export const getAsvDatenerfassungState = createFeatureSelector<AsvDatenerfassungState>(
    AppEnums.FeatureModule.asvDatenerfassung
);

/**
* *********************************************************************
* get AsvDatenerfassung store functions
*
*/
/**
 * AsvDatenerfassung store functions
 */
export const getAsvDatenerfassung_State = createSelector(
    getAsvDatenerfassungState,
    (state: AsvDatenerfassungState) => state.AsvDatenerfassungs
);
// Load Data Grid
export const getAsvDatenerfassungData = createSelector(
    getAsvDatenerfassung_State,
    fromAsvDatenerfassung.getAsvDatenerfassungDatas.getDatas
);

// Load Combobox
export const getComboboxAsvDatenerfassungData = createSelector(
    getAsvDatenerfassung_State,
    fromAsvDatenerfassung.getComboboxAsvDatenerfassungDatas.getDatas
);

// Load Insert
export const asvDatenerfassungInsert = createSelector(
    getAsvDatenerfassung_State,
    fromAsvDatenerfassung.asvDatenerfassungInsert.getDatas
);

// Load Update
export const asvDatenerfassungUpdate = createSelector(
    getAsvDatenerfassung_State,
    fromAsvDatenerfassung.asvDatenerfassungUpdate.getDatas
);

// Load Delete
export const asvDatenerfassungDelete = createSelector(
    getAsvDatenerfassung_State,
    fromAsvDatenerfassung.asvDatenerfassungDelete.getDatas
);
