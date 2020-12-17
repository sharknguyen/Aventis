import { BgFinanzplan, BgPosition, Personen, WhPositionsart } from '@app/kiss4-sozialhilfe/finanzplan/vermogen/models';
import {
    VermogenActions,
    VermogenActionTypes,
} from '@app/kiss4-sozialhilfe/finanzplan/vermogen/store/actions/vermogen.action';
import { AppEntityCustomState } from '@shared/AppAction';


interface BgPositionInitDataState extends AppEntityCustomState<BgPosition[], number> { }
interface BgFinanzplanState extends AppEntityCustomState<BgFinanzplan[], number> { }
interface PersonenState extends AppEntityCustomState<Personen[], number> { }
interface WhPositionsartState extends AppEntityCustomState<WhPositionsart[], number> { }
interface DelPositionState extends AppEntityCustomState<any, number> { }
interface FreibetragState extends AppEntityCustomState<any[], number> { }
interface InsertBgPositionState extends AppEntityCustomState<any, number> { }
interface UpdateBgPositionState extends AppEntityCustomState<any, number> { }
interface BgSilAHVBeitragInitDatasStates extends AppEntityCustomState<any, number> { }
interface SetIdMogenInitDatasStates extends AppEntityCustomState<any, number> { }

export interface State {
    BgPositionInitDataState: BgPositionInitDataState;
    BgFinanzplanState: BgFinanzplanState;
    PersonenState: PersonenState;
    WhPositionsartState: WhPositionsartState;
    DelPositionState: DelPositionState;
    FreibetragState: FreibetragState;
    InsertBgPositionState: InsertBgPositionState;
    UpdateBgPositionState: UpdateBgPositionState;
    BgSilAHVBeitragInitDatasStates: BgSilAHVBeitragInitDatasStates;
    SetIdMogenInitDatasStates: SetIdMogenInitDatasStates;
}

export const initialState: State = {

    BgPositionInitDataState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    BgFinanzplanState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    PersonenState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    WhPositionsartState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    DelPositionState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    FreibetragState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    InsertBgPositionState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    UpdateBgPositionState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    BgSilAHVBeitragInitDatasStates: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    SetIdMogenInitDatasStates: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    }

};

export function reducer(state = initialState, action: VermogenActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case VermogenActionTypes.VermogenAction:
            return state;

        // Load data BgPosition grid
        case VermogenActionTypes.BgPositionTypes.LOAD: {
            return Object.assign({}, state, {
                BgPositionInitDataState: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    query: action.payload,
                }
            });
        }

        case VermogenActionTypes.BgPositionTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                BgPositionInitDataState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    query: null,
                    data: action.payload
                }
            });
        }

        case VermogenActionTypes.BgPositionTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                BgPositionInitDataState: {
                    loading: false,
                    loaded: false,
                    failed: true,
                    query: null,
                    data: action.payload
                }
            });
        }

        /**
         * Load data BgFinanzplan
         */
        case VermogenActionTypes.BgFinanzplanTypes.LOAD: {
            return Object.assign({}, state, {
                BgFinanzplanState: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    query: action.payload,
                }
            });
        }

        case VermogenActionTypes.BgFinanzplanTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                BgFinanzplanState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    query: null,
                    data: action.payload
                }
            });
        }

        case VermogenActionTypes.BgFinanzplanTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                BgFinanzplanState: {
                    loading: false,
                    loaded: false,
                    failed: true,
                    query: null,
                    data: action.payload
                }
            });
        }

        /**
         * Load data Personen
         */
        case VermogenActionTypes.PersonenTypes.LOAD: {
            return Object.assign({}, state, {
                PersonenState: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    query: action.payload,
                }
            });
        }

        case VermogenActionTypes.PersonenTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                PersonenState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    query: null,
                    data: action.payload
                }
            });
        }

        case VermogenActionTypes.PersonenTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                PersonenState: {
                    loading: false,
                    loaded: false,
                    failed: true,
                    query: null,
                    data: action.payload
                }
            });
        }

        /**
         * Load data WhPositionsart
         */

        case VermogenActionTypes.WhPositionsartTypes.LOAD: {
            return Object.assign({}, state, {
                WhPositionsartState: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    query: action.payload,
                }
            });
        }

        case VermogenActionTypes.WhPositionsartTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                WhPositionsartState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    query: null,
                    data: action.payload
                }
            });
        }

        case VermogenActionTypes.WhPositionsartTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                WhPositionsartState: {
                    loading: false,
                    loaded: false,
                    failed: true,
                    query: null,
                    data: action.payload
                }
            });
        }

        /**
         *  Delete BgPosition
         */
        case VermogenActionTypes.DelBgPositionTypes.DEL: {
            return Object.assign({}, state, {
                DelPositionState: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    query: action.payload,
                }
            });
        }

        case VermogenActionTypes.DelBgPositionTypes.DEL_SUCCESS: {
            return Object.assign({}, state, {
                DelPositionState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    query: null,
                    data: action.payload
                }
            });
        }

        case VermogenActionTypes.DelBgPositionTypes.DEL_FAIL: {
            return Object.assign({}, state, {
                DelPositionState: {
                    loading: false,
                    loaded: false,
                    failed: true,
                    query: null,
                    data: action.payload
                }
            });
        }

        /**
         * Load data Freibetrag
         */
        case VermogenActionTypes.FreibetragTypes.LOAD: {
            return Object.assign({}, state, {
                FreibetragState: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    query: action.payload,
                }
            });
        }

        case VermogenActionTypes.FreibetragTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                FreibetragState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    query: null,
                    data: action.payload
                }
            });
        }

        case VermogenActionTypes.FreibetragTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                FreibetragState: {
                    loading: false,
                    loaded: false,
                    failed: true,
                    query: null,
                    data: action.payload
                }
            });
        }

        /**
         * Insert BgPosition
         */
        case VermogenActionTypes.InsertBgPositionTypes.INSERT: {
            return Object.assign({}, state, {
                InsertBgPositionState: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    query: action.payload,
                }
            });
        }

        case VermogenActionTypes.InsertBgPositionTypes.INSERT_SUCCESS: {
            return Object.assign({}, state, {
                InsertBgPositionState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    query: null,
                    data: action.payload
                }
            });
        }

        case VermogenActionTypes.InsertBgPositionTypes.INSERT_FAIL: {
            return Object.assign({}, state, {
                InsertBgPositionState: {
                    loading: false,
                    loaded: false,
                    failed: true,
                    query: null,
                    data: action.payload
                }
            });
        }

        /**
         * Update BgPosition
         */
        case VermogenActionTypes.UpdateBgPositionTypes.UPDATE: {
            return Object.assign({}, state, {
                UpdateBgPositionState: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    query: action.payload,
                }
            });
        }

        case VermogenActionTypes.UpdateBgPositionTypes.UPDATE_SUCCESS: {
            return Object.assign({}, state, {
                UpdateBgPositionState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    query: null,
                    data: action.payload
                }
            });
        }

        case VermogenActionTypes.UpdateBgPositionTypes.UPDATE_FAIL: {
            return Object.assign({}, state, {
                UpdateBgPositionState: {
                    loading: false,
                    loaded: false,
                    failed: true,
                    query: null,
                    data: action.payload
                }
            });
        }

        // Load data BgSilAHVBeitrag
        case VermogenActionTypes.BgSilAHVBeitragTypes.LOAD: {
            return Object.assign({}, state, {
                BgSilAHVBeitragInitDatasStates: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    query: action.payload
                }
            });
        }

        case VermogenActionTypes.BgSilAHVBeitragTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                BgSilAHVBeitragInitDatasStates: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload,
                    query: null,
                }
            });
        }

        case VermogenActionTypes.BgSilAHVBeitragTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                BgSilAHVBeitragInitDatasStates: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: [],
                    query: null,
                }
            });
        }

        // Load data BgSilAHVBeitrag
        case VermogenActionTypes.SetIdVerMogenTypes.LOAD: {
            return Object.assign({}, state, {
                InsertBgPositionState: {
                    data: null
                },
                UpdateBgPositionState: {
                    data: null
                }
            });
        }

        case VermogenActionTypes.ResetStateTypes.RESET_STATE: {
            state = initialState;
            return state;
        }

        default:
            return state;
    }
}

export const getBgPosition = {
    getDatas: (state: State) => state.BgPositionInitDataState.data,
    getLoading: (state: State) => state.BgPositionInitDataState.loading,
    getLoaded: (state: State) => state.BgPositionInitDataState.loaded,
    getFailed: (state: State) => state.BgPositionInitDataState.failed
};


export const getBgFinanzplan = {
    getDatas: (state: State) => state.BgFinanzplanState.data,
    getLoading: (state: State) => state.BgFinanzplanState.loading,
    getLoaded: (state: State) => state.BgFinanzplanState.loaded,
    getFailed: (state: State) => state.BgFinanzplanState.failed
};

export const getPersonen = {
    getDatas: (state: State) => state.PersonenState.data,
    getLoading: (state: State) => state.PersonenState.loading,
    getLoaded: (state: State) => state.PersonenState.loaded,
    getFailed: (state: State) => state.PersonenState.failed
};

export const getWhPositionsart = {
    getDatas: (state: State) => state.WhPositionsartState.data,
    getLoading: (state: State) => state.WhPositionsartState.loading,
    getLoaded: (state: State) => state.WhPositionsartState.loaded,
    getFailed: (state: State) => state.WhPositionsartState.failed
};

export const getDelBgPosition = {
    getDatas: (state: State) => state.DelPositionState.data,
    getLoading: (state: State) => state.DelPositionState.loading,
    getLoaded: (state: State) => state.DelPositionState.loaded,
    getFailed: (state: State) => state.DelPositionState.failed
};

export const getFreibetrag = {
    getDatas: (state: State) => state.FreibetragState.data,
    getLoading: (state: State) => state.FreibetragState.loading,
    getLoaded: (state: State) => state.FreibetragState.loaded,
    getFailed: (state: State) => state.FreibetragState.failed
};

export const insertBgPosition = {
    getDatas: (state: State) => state.InsertBgPositionState.data,
    getLoading: (state: State) => state.InsertBgPositionState.loading,
    getLoaded: (state: State) => state.InsertBgPositionState.loaded,
    getFailed: (state: State) => state.InsertBgPositionState.failed
};

export const updateBgPosition = {
    getDatas: (state: State) => state.UpdateBgPositionState.data,
    getLoading: (state: State) => state.UpdateBgPositionState.loading,
    getLoaded: (state: State) => state.UpdateBgPositionState.loaded,
    getFailed: (state: State) => state.UpdateBgPositionState.failed
};

export const getBgSilAHVBeitrag = {
    getDatas: (state: State) => state.BgSilAHVBeitragInitDatasStates.data,
    getLoading: (state: State) => state.BgSilAHVBeitragInitDatasStates.loading,
    getLoaded: (state: State) => state.BgSilAHVBeitragInitDatasStates.loaded,
    getFailed: (state: State) => state.BgSilAHVBeitragInitDatasStates.failed
};
