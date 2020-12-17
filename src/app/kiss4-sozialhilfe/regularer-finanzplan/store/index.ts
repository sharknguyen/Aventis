import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as RegularerFinanzplan from './reducers/regularer-finanzplan.reducers';
import {AppEnums} from '@shared/AppEnum';

export interface IFinanzplanState {
    Finanzplan: RegularerFinanzplan.IState;
}

export const reducers: ActionReducerMap<IFinanzplanState> = {
    Finanzplan: RegularerFinanzplan.reducer
};

export const finanzplanState = createFeatureSelector<IFinanzplanState>(
    AppEnums.FeatureModule.regularerFinanzplan
);

/**
* *********************************************************************
* get personen-im-haushalt store functions
*
*/
/**
 * personen-im-haushalt store functions
 */
export const finanzplan_State = createSelector(
    finanzplanState,
    (state: IFinanzplanState) => state.Finanzplan
);

export const regFinanHeaderSelector = createSelector(
    finanzplan_State,
    RegularerFinanzplan.getFinanzplanHeader.getData
);
export const regFinanSelector = createSelector(
    finanzplan_State,
    RegularerFinanzplan.getFinanzplan.getData
);
export const regFinanCheckSelector = createSelector(
    finanzplan_State,
    RegularerFinanzplan.getFinanzplanCheck.getData
);
export const regFinanGrundErSelector = createSelector(
    finanzplan_State,
    RegularerFinanzplan.getGrundEr.getData
);
export const regFinanGrundAbSelector = createSelector(
    finanzplan_State,
    RegularerFinanzplan.getGrundAb.getData
);
export const regFinanGrundbedarfTypeSelector = createSelector(
    finanzplan_State,
    RegularerFinanzplan.getGrundbedarfType.getData
);
export const regFinanTypeSelector = createSelector(
    finanzplan_State,
    RegularerFinanzplan.getType.getData
);
export const regFinanBewilligungSelector = createSelector(
    finanzplan_State,
    RegularerFinanzplan.getBewilligungStatus.getData
);

export const regFinanSaveSelector = createSelector(
    finanzplan_State,
    RegularerFinanzplan.saveFinanzplanStatus.getData
);

export const verlaufDataSelector = createSelector(
    finanzplan_State,
    RegularerFinanzplan.verLaufDataStatus.getData
);

export const typVerlaufDataSelector = createSelector(
    finanzplan_State,
    RegularerFinanzplan.typVerLaufDataStatus.getData
);
