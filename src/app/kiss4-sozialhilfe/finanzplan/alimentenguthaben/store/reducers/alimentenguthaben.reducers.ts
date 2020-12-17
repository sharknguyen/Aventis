import { AppEntityCustomState } from '@shared/AppAction';
import { AlimentenguthabenActions, AlimentenguthabenActionTypes } from '../actions/alimentenguthaben.actions';

interface AlimentenguthabenState extends AppEntityCustomState<any, any> {
    data: any;
    dataFail: any;
}
interface GetInkassoState extends AppEntityCustomState<any, any> {
    data: any;
    dataFail: any;
}

interface GetPersonenUnterstuetztnState extends AppEntityCustomState<any, any> {
    data: any;
    dataFail: any;
}
interface IAlimentenguthabenNewState extends AppEntityCustomState<any> {
    data: any;
    dataFail: any;
}
interface IAlimentenguthabenSaveState extends AppEntityCustomState<any> {
    data: any;
    dataFail: any;
}
interface IAlimentenguthabenDeleteState extends AppEntityCustomState<any> {
    data: any;
    dataFail: any;
}
export interface State {
    alimentenguthabenState: AlimentenguthabenState;
}
export interface State {
    getInkassoState: GetInkassoState;
}
export interface State {
    getPersonenUnterstuetztnState: GetPersonenUnterstuetztnState;
}
export interface State {
    aimentenguthabenNewState: IAlimentenguthabenNewState;
}
export interface State {
    aimentenguthabenSaveState: IAlimentenguthabenSaveState;
}
export interface State {
    alimentenguthabenDeleteState: IAlimentenguthabenDeleteState;
}
export interface State {
    getTitleState: IAlimentenguthabenDeleteState;
}
export const initialState: State = {
    alimentenguthabenState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null,
        dataFail: null
    },
    getInkassoState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null,
        dataFail: null
    },
    getPersonenUnterstuetztnState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null,
        dataFail: null
    },
    aimentenguthabenNewState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null,
        dataFail: null
    },
    aimentenguthabenSaveState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null,
        dataFail: null
    },
    alimentenguthabenDeleteState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null,
        dataFail: null
    },
    getTitleState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null,
        dataFail: null
    },
};
export function reducer(state = initialState, action: AlimentenguthabenActions): State {
    if (!action) {
        return state;
    }
    switch (action.type) {
        case AlimentenguthabenActionTypes.AlimentenguthabenAction:
            return state;
        case AlimentenguthabenActionTypes.ListGridTypes.LOAD: {
            return Object.assign({}, state, {
                alimentenguthabenState: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    query: action.payload
                }
            });
        }
        case AlimentenguthabenActionTypes.ListGridTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                alimentenguthabenState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload
                }
            });
        }

        case AlimentenguthabenActionTypes.ListGridTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                alimentenguthabenState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: [],
                    dataFail: action.payload
                }
            });
        }


        case AlimentenguthabenActionTypes.GetInkassoDatasTypes.LOAD: {
            return Object.assign({}, state, {
                getInkassoState: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    query: action.payload
                }
            });
        }
        case AlimentenguthabenActionTypes.GetInkassoDatasTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                getInkassoState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload
                }
            });
        }

        case AlimentenguthabenActionTypes.GetInkassoDatasTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                getInkassoState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: [],
                    dataFail: action.payload
                }
            });
        }

        case AlimentenguthabenActionTypes.getPersonenUnterstuetztn.LOAD: {
            return Object.assign({}, state, {
                getPersonenUnterstuetztnState: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    query: action.payload
                }
            });
        }

        case AlimentenguthabenActionTypes.getPersonenUnterstuetztn.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                getPersonenUnterstuetztnState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload
                }
            });
        }

        case AlimentenguthabenActionTypes.getPersonenUnterstuetztn.LOAD_FAIL: {
            return Object.assign({}, state, {
                getPersonenUnterstuetztnState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: [],
                    dataFail: action.payload
                }
            });
        }

        // New
        case AlimentenguthabenActionTypes.NewAlimentenguthabenActionTypes.POST: {
            return Object.assign({}, state, {
                aimentenguthabenNewState: {
                    loading: true,
                    loaded: false,
                    failed: false
                }
            });
        }
        case AlimentenguthabenActionTypes.NewAlimentenguthabenActionTypes.POST_SUCCESS: {
            return Object.assign({}, state, {
                aimentenguthabenNewState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload
                }
            });
        }
        case AlimentenguthabenActionTypes.NewAlimentenguthabenActionTypes.POST_FAIL: {
            return Object.assign({}, state, {
                aimentenguthabenNewState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    dataFail: action.payload
                }
            });
        }
        case AlimentenguthabenActionTypes.NewAlimentenguthabenActionTypes.POST_RESET: {
            return Object.assign({}, state, {
                aimentenguthabenNewState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: null
                }
            });
        }

        // Save
        case AlimentenguthabenActionTypes.SaveAlimentenguthabenActionTypes.PUT: {
            return Object.assign({}, state, {
                aimentenguthabenSaveState: {
                    loading: true,
                    loaded: false,
                    failed: false
                }
            });
        }
        case AlimentenguthabenActionTypes.SaveAlimentenguthabenActionTypes.PUT_SUCCESS: {
            return Object.assign({}, state, {
                aimentenguthabenSaveState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload
                }
            });
        }
        case AlimentenguthabenActionTypes.SaveAlimentenguthabenActionTypes.PUT_FAIL: {
            return Object.assign({}, state, {
                aimentenguthabenSaveState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    dataFail: action.payload
                }
            });
        }

        case AlimentenguthabenActionTypes.SaveAlimentenguthabenActionTypes.PUT_RESET: {
            return Object.assign({}, state, {
                aimentenguthabenSaveState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: null
                }
            });
        }

        // Delete
        case AlimentenguthabenActionTypes.DeleteAlimentenguthabenActionTypes.DELETE: {
            return Object.assign({}, state, {
                alimentenguthabenDeleteState: {
                    loading: true,
                    loaded: false,
                    failed: false
                }
            });
        }
        case AlimentenguthabenActionTypes.DeleteAlimentenguthabenActionTypes.DELETE_SUCCESS: {
            return Object.assign({}, state, {
                alimentenguthabenDeleteState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload
                }
            });
        }
        case AlimentenguthabenActionTypes.DeleteAlimentenguthabenActionTypes.DELETE_FAIL: {
            return Object.assign({}, state, {
                alimentenguthabenDeleteState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    dataFail: action.payload
                }
            });
        }
        case AlimentenguthabenActionTypes.DeleteAlimentenguthabenActionTypes.DELETE_RESET: {
            return Object.assign({}, state, {
                alimentenguthabenDeleteState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: null
                }
            });
        }
        // Title State
        case AlimentenguthabenActionTypes.GetTitleActionTypes.GET: {
            return Object.assign({}, state, {
                getTitleState: {
                    loading: true,
                    loaded: false,
                    failed: false
                }
            });
        }
        case AlimentenguthabenActionTypes.GetTitleActionTypes.GET_SUCCESS: {
            return Object.assign({}, state, {
                getTitleState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload
                }
            });
        }
        case AlimentenguthabenActionTypes.GetTitleActionTypes.GET_FAIL: {
            return Object.assign({}, state, {
                getTitleState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    dataFail: action.payload
                }
            });
        }
        default:
            return state;
    }
}
export const getListGrid = {
    getData: (state: State) => state.alimentenguthabenState.data,
    getLoading: (state: State) => state.alimentenguthabenState.loading,
    getLoaded: (state: State) => state.alimentenguthabenState.loaded,
    getFailed: (state: State) => state.alimentenguthabenState.dataFail
};

export const getInkasso = {
    getData: (state: State) => state.getInkassoState.data,
    getLoading: (state: State) => state.getInkassoState.loading,
    getLoaded: (state: State) => state.getInkassoState.loaded,
    getFailed: (state: State) => state.getInkassoState.dataFail
};

export const getPersonenUnterstuetztn = {
    getData: (state: State) => state.getPersonenUnterstuetztnState.data,
    getLoading: (state: State) => state.getPersonenUnterstuetztnState.loading,
    getLoaded: (state: State) => state.getPersonenUnterstuetztnState.loaded,
    getFailed: (state: State) => state.getPersonenUnterstuetztnState.dataFail
};
// New
export const getNewAimentenguthaben = {
    getDatas: (state: State) => state.aimentenguthabenNewState.data,
    getLoading: (state: State) => state.aimentenguthabenNewState.loading,
    getLoaded: (state: State) => state.aimentenguthabenNewState.loaded,
    getFailed: (state: State) => state.aimentenguthabenNewState.dataFail
};
// Save
export const getSaveAimentenguthaben = {
    getDatas: (state: State) => state.aimentenguthabenSaveState.data,
    getLoading: (state: State) => state.aimentenguthabenSaveState.loading,
    getLoaded: (state: State) => state.aimentenguthabenSaveState.loaded,
    getFailed: (state: State) => state.aimentenguthabenSaveState.dataFail
};

// Delete
export const getDeleteAimentenguthaben = {
    getDatas: (state: State) => state.alimentenguthabenDeleteState.data,
    getLoading: (state: State) => state.alimentenguthabenDeleteState.loading,
    getLoaded: (state: State) => state.alimentenguthabenDeleteState.loaded,
    getFailed: (state: State) => state.alimentenguthabenDeleteState.dataFail
};


// Get Title
export const getTitle = {
    getDatas: (state: State) => state.getTitleState.data,
    getLoading: (state: State) => state.getTitleState.loading,
    getLoaded: (state: State) => state.getTitleState.loaded,
    getFailed: (state: State) => state.getTitleState.dataFail
};
