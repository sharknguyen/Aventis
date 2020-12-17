import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
} from '@ngrx/store';

import * as fromKasse from './reducers/kasse.reducers';

import { AppEnums } from '@shared/AppEnum';

export interface KasseState {
    kasses: fromKasse.State;
}

export const reducers: ActionReducerMap<KasseState> = {
    kasses: fromKasse.reducer
};

export const getKasseState = createFeatureSelector<KasseState>(
    AppEnums.FeatureModule.kasse
);

/**
* *********************************************************************
* get Kasse store functions
*
*/
/**
 * Kasse store functions
 */
export const getKasse_State = createSelector(
    getKasseState,
    (state: KasseState) => state.kasses
);
export const getKasseData = createSelector(
    getKasse_State,
    fromKasse.getKasseDatas.getDatas
);
export const getDropDownData = createSelector(
    getKasse_State,
    fromKasse.getDropDownDatas.getDatas
);
export const KbBuchungUpdatedDatas = createSelector(
    getKasse_State,
    fromKasse.KbBuchungUpdatedDatas.getDatas
);
export const KbBuchungStatusUpdatedData = createSelector(
    getKasse_State,
    fromKasse.KbBuchungStatusUpdatedData.getDatas
);
