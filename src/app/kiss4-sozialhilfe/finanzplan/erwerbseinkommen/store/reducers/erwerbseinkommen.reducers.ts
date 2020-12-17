import { AppEntityCustomState } from '@shared/AppAction';
import { ErwerbseinkommenActions, ErwerbseinkommenActionTypes } from '../actions/erwerbseinkommen.actions';

interface ErwerbseinkommenListState extends AppEntityCustomState <any[], any> {
    loading: false;
    loaded: false;
}

interface ErwerbseinkommenAddState extends AppEntityCustomState <any[], any> {
    adding: false;
    added: false;
}

interface ErwerbseinkommenUpdateState extends AppEntityCustomState <any[], any> {
    updating: false;
    updated: false;
}

interface ErwerbseinkommenDeleteState extends AppEntityCustomState <any[], any> {
    deleting: false;
    deleted: false;
}

interface BgErwerbseinkommenListState extends AppEntityCustomState <any[], any> {
    loading: false;
    loaded: false;
}

interface BgErwerbseinkommenAddState extends AppEntityCustomState <any[], any> {
    adding: false;
    added: false;
}

interface BgErwerbseinkommenUpdateState extends AppEntityCustomState <any[], any> {
    updating: false;
    updated: false;
}

interface BgErwerbseinkommenDeleteState extends AppEntityCustomState <any[], any> {
    deleting: false;
    deleted: false;
}

interface BgErwerbseinkommenDropdownListState extends AppEntityCustomState <any[], any> {
    loading: false;
    loaded: false;
}

interface BgBewilligungStatusCodeState extends AppEntityCustomState <any[], any> {
    loading: false;
    loaded: false;
}

export interface State {
    ErwerbseinkommenListState: ErwerbseinkommenListState;
    ErwerbseinkommenAddState: ErwerbseinkommenAddState;
    ErwerbseinkommenUpdateState: ErwerbseinkommenUpdateState;
    ErwerbseinkommenDeleteState: ErwerbseinkommenDeleteState;
    BgErwerbseinkommenListState: BgErwerbseinkommenListState;
    BgErwerbseinkommenAddState: BgErwerbseinkommenAddState;
    BgErwerbseinkommenUpdateState: BgErwerbseinkommenUpdateState;
    BgErwerbseinkommenDeleteState: BgErwerbseinkommenDeleteState;
    BgErwerbseinkommenDropdownListState: BgErwerbseinkommenDropdownListState;
    BgBewilligungStatusCodeState: BgBewilligungStatusCodeState;
}

export const initialState: State = {
    ErwerbseinkommenListState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    ErwerbseinkommenAddState: {
        loading: false,
        loaded: false,
        failed: false,
        adding: false,
        added: false,
        query: null,
        data: null
    },
    ErwerbseinkommenUpdateState: {
        loading: false,
        loaded: false,
        failed: false,
        updating: false,
        updated: false,
        query: null,
        data: null
    },
    ErwerbseinkommenDeleteState: {
        loading: false,
        loaded: false,
        failed: false,
        deleting: false,
        deleted: false,
        query: null,
        data: null
    },
    BgErwerbseinkommenListState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    BgErwerbseinkommenAddState: {
        loading: false,
        loaded: false,
        failed: false,
        adding: false,
        added: false,
        query: null,
        data: null
    },
    BgErwerbseinkommenUpdateState: {
        loading: false,
        loaded: false,
        failed: false,
        updating: false,
        updated: false,
        query: null,
        data: null
    },
    BgErwerbseinkommenDeleteState: {
        loading: false,
        loaded: false,
        failed: false,
        deleting: false,
        deleted: false,
        query: null,
        data: null
    },
    BgErwerbseinkommenDropdownListState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    },
    BgBewilligungStatusCodeState: {
        loading: false,
        loaded: false,
        failed: false,
        query: null,
        data: null
    }
};

export function reducer(state = initialState, action: ErwerbseinkommenActions) {
    if (!action) {
        return state;
    }
    switch (action.type) {
        case ErwerbseinkommenActionTypes.ErwerbseinkommenLoadType.LOAD: {
            return Object.assign({}, state, {
                ErwerbseinkommenListState: {
                    loading: true,
                    loaded: false
                }
            });
        }

        case ErwerbseinkommenActionTypes.ErwerbseinkommenLoadType.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                ErwerbseinkommenListState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    data: action.payload
                }
            });
        }

        case ErwerbseinkommenActionTypes.ErwerbseinkommenLoadType.LOAD_FAIL: {
            return Object.assign({}, state, {
                ErwerbseinkommenListState: {
                    loading: false,
                    loaded: true,
                    failed: true,
                    data: action.payload
                }
            });
        }

        case ErwerbseinkommenActionTypes.ErwerbseinkommenAddType.ADD: {
            return Object.assign({}, state, {
                ErwerbseinkommenAddState: {
                    adding: true,
                    loaded: false,
                }
            });
        }

        case ErwerbseinkommenActionTypes.ErwerbseinkommenAddType.ADD_SUCCESS: {
            return Object.assign({}, state, {
                ErwerbseinkommenAddState: {
                    adding: false,
                    loaded: true,
                    failed: false,
                    data: action.payload
                }
            });
        }

        case ErwerbseinkommenActionTypes.ErwerbseinkommenAddType.ADD_FAIL: {
            return Object.assign({}, state, {
                ErwerbseinkommenAddState: {
                    adding: false,
                    loaded: true,
                    failed: true,
                    data: action.payload
                }
            });
        }

        case ErwerbseinkommenActionTypes.ErwerbseinkommenUpdateType.PUT: {
            return Object.assign({}, state, {
                ErwerbseinkommenUpdateState: {
                    updating: true,
                    updated: false,
                }
            });
        }

        case ErwerbseinkommenActionTypes.ErwerbseinkommenUpdateType.PUT_SUCCESS: {
            return Object.assign({}, state, {
                ErwerbseinkommenUpdateState: {
                    updating: false,
                    updated: true,
                    failed: false,
                    data: action.payload
                }
            });
        }

        case ErwerbseinkommenActionTypes.ErwerbseinkommenUpdateType.PUT_FAIL: {
            return Object.assign({}, state, {
                ErwerbseinkommenUpdateState: {
                    updating: false,
                    updated: true,
                    failed: true,
                    data: action.payload
                }
            });
        }

        case ErwerbseinkommenActionTypes.ErwerbseinkommenDelType.DEL: {
            return Object.assign({}, state, {
                ErwerbseinkommenDeleteState: {
                    deleting: true,
                    deleted: false,
                }
            });
        }

        case ErwerbseinkommenActionTypes.ErwerbseinkommenDelType.DEL_SUCCESS: {
            return Object.assign({}, state, {
                ErwerbseinkommenDeleteState: {
                    deleting: false,
                    deleted: true,
                    failed: false,
                    data: action.payload
                }
            });
        }

        case ErwerbseinkommenActionTypes.ErwerbseinkommenDelType.DEL_FAIL: {
            return Object.assign({}, state, {
                ErwerbseinkommenDeleteState: {
                    deleting: false,
                    deleted: true,
                    failed: true,
                    data: action.payload
                }
            });
        }

        case ErwerbseinkommenActionTypes.BgErwerbseinkommenLoadType.LOAD: {
            return Object.assign({}, state, {
                BgErwerbseinkommenListState: {
                    ...state.BgErwerbseinkommenListState,
                    loading: true,
                    loaded: false,
                }
            });
        }

        case ErwerbseinkommenActionTypes.BgErwerbseinkommenLoadType.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                BgErwerbseinkommenListState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    data: action.payload
                }
            });
        }

        case ErwerbseinkommenActionTypes.BgErwerbseinkommenLoadType.LOAD_FAIL: {
            return Object.assign({}, state, {
                BgErwerbseinkommenListState: {
                    loading: false,
                    loaded: true,
                    failed: true,
                    data: action.payload
                }
            });
        }

        case ErwerbseinkommenActionTypes.BgErwerbseinkommenAddType.ADD: {
            return Object.assign({}, state, {
                BgErwerbseinkommenAddState: {
                    adding: true,
                    loaded: false,
                }
            });
        }

        case ErwerbseinkommenActionTypes.BgErwerbseinkommenAddType.ADD_SUCCESS: {
            return Object.assign({}, state, {
                BgErwerbseinkommenAddState: {
                    adding: false,
                    loaded: true,
                    failed: false,
                    data: action.payload
                }
            });
        }

        case ErwerbseinkommenActionTypes.BgErwerbseinkommenAddType.ADD_FAIL: {
            return Object.assign({}, state, {
                BgErwerbseinkommenAddState: {
                    adding: false,
                    loaded: true,
                    failed: true,
                    data: action.payload
                }
            });
        }

        case ErwerbseinkommenActionTypes.BgErwerbseinkommenUpdateType.PUT: {
            return Object.assign({}, state, {
                BgErwerbseinkommenUpdateState: {
                    updating: true,
                    updated: false,
                }
            });
        }

        case ErwerbseinkommenActionTypes.BgErwerbseinkommenUpdateType.PUT_SUCCESS: {
            return Object.assign({}, state, {
                BgErwerbseinkommenUpdateState: {
                    updating: false,
                    updated: true,
                    failed: false,
                    data: action.payload
                }
            });
        }

        case ErwerbseinkommenActionTypes.BgErwerbseinkommenUpdateType.PUT_FAIL: {
            return Object.assign({}, state, {
                BgErwerbseinkommenUpdateState: {
                    updating: false,
                    updated: true,
                    failed: true,
                    data: action.payload
                }
            });
        }

        case ErwerbseinkommenActionTypes.BgErwerbseinkommenDelType.DEL: {
            return Object.assign({}, state, {
                BgErwerbseinkommenDeleteState: {
                    deleting: true,
                    deleted: false,
                }
            });
        }

        case ErwerbseinkommenActionTypes.BgErwerbseinkommenDelType.DEL_SUCCESS: {
            return Object.assign({}, state, {
                BgErwerbseinkommenDeleteState: {
                    deleting: false,
                    deleted: true,
                    failed: false,
                    data: action.payload
                }
            });
        }

        case ErwerbseinkommenActionTypes.BgErwerbseinkommenDelType.DEL_FAIL: {
            return Object.assign({}, state, {
                BgErwerbseinkommenDeleteState: {
                    deleting: false,
                    deleted: true,
                    failed: true,
                    data: action.payload
                }
            });
        }

        case ErwerbseinkommenActionTypes.BgErwerbseinkommenDropdownLoadType.LOAD: {
            return Object.assign({}, state, {
                BgErwerbseinkommenDropdownListState: {
                    loading: true,
                    loaded: false
                }
            });
        }

        case ErwerbseinkommenActionTypes.BgErwerbseinkommenDropdownLoadType.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                BgErwerbseinkommenDropdownListState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    data: action.payload
                }
            });
        }

        case ErwerbseinkommenActionTypes.BgErwerbseinkommenDropdownLoadType.LOAD_FAIL: {
            return Object.assign({}, state, {
                BgErwerbseinkommenDropdownListState: {
                    loading: false,
                    loaded: true,
                    failed: true,
                    data: action.payload
                }
            });
        }

        case ErwerbseinkommenActionTypes.BgBewilligungStatusCodeLoadType.LOAD: {
            return Object.assign({}, state, {
                BgBewilligungStatusCodeState: {
                    loading: true,
                    loaded: false
                }
            });
        }

        case ErwerbseinkommenActionTypes.BgBewilligungStatusCodeLoadType.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                BgBewilligungStatusCodeState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    data: action.payload
                }
            });
        }

        case ErwerbseinkommenActionTypes.BgBewilligungStatusCodeLoadType.LOAD_FAIL: {
            return Object.assign({}, state, {
                BgBewilligungStatusCodeState: {
                    loading: false,
                    loaded: true,
                    failed: true,
                    data: action.payload
                }
            });
        }

        default:
        return state;
    }
}

export const ErwerbseinkommenLoad_State = {
    getDatas: (state: State) => state.ErwerbseinkommenListState.data,
    getLoading: (state: State) => state.ErwerbseinkommenListState.loading,
    getLoaded: (state: State) => state.ErwerbseinkommenListState.loaded,
    getFailed: (state: State) => state.ErwerbseinkommenListState.failed
};

export const ErwerbseinkommenAdd_State = {
    getDatas: (state: State) => state.ErwerbseinkommenAddState.data,
    getLoading: (state: State) => state.ErwerbseinkommenAddState.adding,
    getLoaded: (state: State) => state.ErwerbseinkommenAddState.added,
    getFailed: (state: State) => state.ErwerbseinkommenAddState.failed
};

export const ErwerbseinkommenUpdate_State = {
    getDatas: (state: State) => state.ErwerbseinkommenUpdateState.data,
    getLoading: (state: State) => state.ErwerbseinkommenUpdateState.updating,
    getLoaded: (state: State) => state.ErwerbseinkommenUpdateState.updated,
    getFailed: (state: State) => state.ErwerbseinkommenUpdateState.failed
};

export const ErwerbseinkommenDelete_State = {
    getDatas: (state: State) => state.ErwerbseinkommenDeleteState.data,
    getLoading: (state: State) => state.ErwerbseinkommenDeleteState.deleting,
    getLoaded: (state: State) => state.ErwerbseinkommenDeleteState.deleted,
    getFailed: (state: State) => state.ErwerbseinkommenDeleteState.failed
};

export const BgErwerbseinkommenLoad_State = {
    getDatas: (state: State) => state.BgErwerbseinkommenListState.data,
    getLoading: (state: State) => state.BgErwerbseinkommenListState.loading,
    getLoaded: (state: State) => state.BgErwerbseinkommenListState.loaded,
    getFailed: (state: State) => state.BgErwerbseinkommenListState.failed
};

export const BgErwerbseinkommenAdd_State = {
    getDatas: (state: State) => state.BgErwerbseinkommenAddState.data,
    getLoading: (state: State) => state.BgErwerbseinkommenAddState.adding,
    getLoaded: (state: State) => state.BgErwerbseinkommenAddState.added,
    getFailed: (state: State) => state.BgErwerbseinkommenAddState.failed
};

export const BgErwerbseinkommenUpdate_State = {
    getDatas: (state: State) => state.BgErwerbseinkommenUpdateState.data,
    getLoading: (state: State) => state.BgErwerbseinkommenUpdateState.updating,
    getLoaded: (state: State) => state.BgErwerbseinkommenUpdateState.updated,
    getFailed: (state: State) => state.BgErwerbseinkommenUpdateState.failed
};

export const BgErwerbseinkommenDelete_State = {
    getDatas: (state: State) => state.BgErwerbseinkommenDeleteState.data,
    getLoading: (state: State) => state.BgErwerbseinkommenDeleteState.deleting,
    getLoaded: (state: State) => state.BgErwerbseinkommenDeleteState.deleted,
    getFailed: (state: State) => state.BgErwerbseinkommenDeleteState.failed
};
export const BgErwerbseinkommenLoadDropdown_State = {
    getDatas: (state: State) => state.BgErwerbseinkommenDropdownListState.data,
    getLoading: (state: State) => state.BgErwerbseinkommenDropdownListState.loading,
    getLoaded: (state: State) => state.BgErwerbseinkommenDropdownListState.loaded,
    getFailed: (state: State) => state.BgErwerbseinkommenDropdownListState.failed
};

export const BgBewilligungStatusCode_State = {
    getDatas: (state: State) => state.BgBewilligungStatusCodeState.data,
    getLoading: (state: State) => state.BgBewilligungStatusCodeState.loading,
    getLoaded: (state: State) => state.BgBewilligungStatusCodeState.loaded,
    getFailed: (state: State) => state.BgBewilligungStatusCodeState.failed
};
