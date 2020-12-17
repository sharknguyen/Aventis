import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as DlgBewilligung from './dlgBewilligung.reducers';
import {AppEnums} from '@shared/AppEnum';

export interface IFinanzplanState {
    Finanzplan: DlgBewilligung.IState;
}

export const reducers: ActionReducerMap<IFinanzplanState> = {
    Finanzplan: DlgBewilligung.reducer
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
    DlgBewilligung.getFinanzplanHeader.getData
);
export const regFinanSelector = createSelector(
    finanzplan_State,
    DlgBewilligung.getFinanzplan.getData
);
export const regFinanCheckSelector = createSelector(
    finanzplan_State,
    DlgBewilligung.getFinanzplanCheck.getData
);
export const regFinanGrundErSelector = createSelector(
    finanzplan_State,
    DlgBewilligung.getGrundEr.getData
);
export const regFinanGrundAbSelector = createSelector(
    finanzplan_State,
    DlgBewilligung.getGrundAb.getData
);
export const regFinanGrundbedarfTypeSelector = createSelector(
    finanzplan_State,
    DlgBewilligung.getGrundbedarfType.getData
);
export const regFinanTypeSelector = createSelector(
    finanzplan_State,
    DlgBewilligung.getType.getData
);
export const regFinanBewilligungSelector = createSelector(
    finanzplan_State,
    DlgBewilligung.getBewilligungStatus.getData
);

export const regFinanSaveSelector = createSelector(
    finanzplan_State,
    DlgBewilligung.saveFinanzplanStatus.getData
);
