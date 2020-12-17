import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';
import * as fromSpezialkonto from './reducers/speziaikonto.reducers';

export interface SpezialkontoState {
    rechtstitels: fromSpezialkonto.State;
}

export const reducers: ActionReducerMap<SpezialkontoState> = {
    rechtstitels: fromSpezialkonto.reducer
};

export const getSpezialkontoState = createFeatureSelector<SpezialkontoState>(
    AppEnums.FeatureModule.speziaikonto
);

/**
 * Spezialkonto store functions
 */
export const getSpezialkonto_State = createSelector(
    getSpezialkontoState,
    (state: SpezialkontoState) => state.rechtstitels
);

// Load Data Combobox
export const getMasterDataCBB = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.MasterDataCBBInit.getDatas
);

// Load Data Grid Top
export const getDataGridTop = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.LoadDataGridTopInit.getDatas
);

// Load Data Grid Detail
export const getDataGridDetail = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.LoadDataGridDetailInit.getDatas
);

// Load Ba Person
export const getBaPerson = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.LoadBaPersonInit.getDatas
);

// Load BgKostenart
export const getBgKostenart = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.LoadBgKostenartInit.getDatas
);

// Load DatumVon
export const getDatumVon = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.LoadDatumVonInit.getDatas
);

// Load DatumVon
export const getBgPosArt = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.LoadBgPosArtInit.getDatas
);

// Create
export const createSpeziaikonto = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.CreateDataInit.getDatas
);

// Edit
export const editSpeziaikonto = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.EditDataInit.getDatas
);
export const editSpeziaikontoFails = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.EditDataInit.getFailed
);

// Delete
export const deleteSpeziaikonto = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.DeleteDataInit.getDatas
);

export const deleteSpeziaikontoFails = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.DeleteDataInit.getFailed
);

// Load Positionsarten
export const getPositionsarten = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.PositionsartenDataInit.getDatas
);

// Load AbschliessenVisible
export const getAbschliessenVisible = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.AbschliessenVisibleDataInit.getDatas
);

// Load AbschliessenVisible
export const getMaxSanktion = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.MaxSanktionDataInit.getDatas
);
export const getAbschliessenUndo = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.AbschliessenUndoDataInit.getDatas
);

export const editAbschliessenUndoFails = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.AbschliessenUndoDataInit.getFailed
);

export const getAbschliessenEditbar = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.AbschliessenEditierbarDataInit.getDatas
);
export const getKontoWirdNichtAusgeglichen = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.KontoWirdNichtAusgeglichenDataInit.getDatas
);

export const getUebergabeAnInkasso = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.UebergabeAnInkassoDataInit.getDatas
);

export const getKontoWirdNichtAusgeglichenFails = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.KontoWirdNichtAusgeglichenDataInit.getFailed
);

export const getUebergabeAnInkassoFails = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.UebergabeAnInkassoDataInit.getFailed
);

// Update Kuzungen
export const updateKuzungen = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.UpdateKuzungenDataInit.getDatas
);

// Create Kuzungen
export const createKuzungen = createSelector(
    getSpezialkonto_State,
    fromSpezialkonto.CreateKuzungenDataInit.getDatas
);
