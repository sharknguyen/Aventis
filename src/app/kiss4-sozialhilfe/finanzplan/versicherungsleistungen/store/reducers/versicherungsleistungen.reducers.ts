import { ProcessState } from '@shared/AppAction';
import { VersicherungsleistungenActions, VersicherungsleistungenTypes } from '../actions/versicherungsleistungen.actions';
import { Einkommen } from '../../models';


export interface State extends ProcessState {
    einkommen: Einkommen[];
    postEinkommen: any;
    putEinkommen: any;
    deleteEinkommen: any;
    getEinkommenLookUp: any;
    getPersonList: any;
    getBgBewilligungStatusCode: any;
}

export const initialState: State = {
    loading: false,
    loaded: false,
    failed: false,
    einkommen: [],
    postEinkommen: null,
    putEinkommen: null,
    deleteEinkommen: null,
    getEinkommenLookUp: [],
    getPersonList: [],
    getBgBewilligungStatusCode: null
};

export function reducer(state = initialState, action: VersicherungsleistungenActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case VersicherungsleistungenTypes.VersicherungsleistungenAction:
            return state;

        case VersicherungsleistungenTypes.LoadEinkommenTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                failed: false,
                einkommen: []
            });
        }
        case VersicherungsleistungenTypes.LoadEinkommenTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                failed: false,
                einkommen: action.payload
            });
        }
        case VersicherungsleistungenTypes.LoadEinkommenTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                failed: true,
                einkommen: action.payload
            });
        }

        case VersicherungsleistungenTypes.PostEinkommenTypes.POST: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                failed: false,
                postEinkommen: null
            });
        }
        case VersicherungsleistungenTypes.PostEinkommenTypes.POST_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                failed: false,
                postEinkommen: action.payload
            });
        }
        case VersicherungsleistungenTypes.PostEinkommenTypes.POST_FAIL: {
            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                failed: true,
                postEinkommen: action.payload
            });
        }
        case VersicherungsleistungenTypes.PostEinkommenTypes.RESET: {
            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                failed: true,
                postEinkommen: null
            });
        }

        case VersicherungsleistungenTypes.PutEinkommenTypes.PUT: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                failed: false,
                putEinkommen: null
            });
        }
        case VersicherungsleistungenTypes.PutEinkommenTypes.PUT_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                failed: false,
                putEinkommen: action.payload
            });
        }
        case VersicherungsleistungenTypes.PutEinkommenTypes.PUT_FAIL: {
            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                failed: true,
                putEinkommen: action.payload
            });
        }
        case VersicherungsleistungenTypes.PutEinkommenTypes.RESET: {
            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                failed: true,
                putEinkommen: null
            });
        }

        case VersicherungsleistungenTypes.DeleteEinkommenTypes.DELETE: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                failed: false,
                deleteEinkommen: null
            });
        }
        case VersicherungsleistungenTypes.DeleteEinkommenTypes.DELETE_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                failed: false,
                deleteEinkommen: action.payload
            });
        }
        case VersicherungsleistungenTypes.DeleteEinkommenTypes.DELETE_FAIL: {
            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                failed: true,
                deleteEinkommen: action.payload
            });
        }

        case VersicherungsleistungenTypes.GetEinkommenLookUpTypes.GET: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                failed: false,
                getEinkommenLookUp: []
            });
        }
        case VersicherungsleistungenTypes.GetEinkommenLookUpTypes.GET_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                failed: false,
                getEinkommenLookUp: action.payload
            });
        }
        case VersicherungsleistungenTypes.GetEinkommenLookUpTypes.GET_FAIL: {
            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                failed: true,
                getEinkommenLookUp: action.payload
            });
        }

        case VersicherungsleistungenTypes.GetPersonListTypes.GET: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                failed: false,
                getPersonList: []
            });
        }
        case VersicherungsleistungenTypes.GetPersonListTypes.GET_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                failed: false,
                getPersonList: action.payload
            });
        }
        case VersicherungsleistungenTypes.GetPersonListTypes.GET_FAIL: {
            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                failed: true,
                getPersonList: action.payload
            });
        }

        case VersicherungsleistungenTypes.GetBgBewilligungStatusCodeTypes.GET: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                failed: false,
                getBgBewilligungStatusCode: null
            });
        }
        case VersicherungsleistungenTypes.GetBgBewilligungStatusCodeTypes.GET_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                failed: false,
                getBgBewilligungStatusCode: action.payload
            });
        }
        case VersicherungsleistungenTypes.GetBgBewilligungStatusCodeTypes.GET_FAIL: {
            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                failed: true,
                getBgBewilligungStatusCode: action.payload
            });
        }

        default:
            return state;
    }
}

export const LoadEinkommensLoading = (state: State) => state.loading;
export const LoadEinkommensLoaded = (state: State) => state.loaded;
export const LoadEinkommensFailed = (state: State) => state.failed;
export const LoadEinkommens = (state: State) => state.einkommen;
export const PostEinkommens = (state: State) => state.postEinkommen;
export const PutEinkommens = (state: State) => state.putEinkommen;
export const DeleteEinkommens = (state: State) => state.deleteEinkommen;
export const GetEinkommensLookUp = (state: State) => state.getEinkommenLookUp;
export const GetPersonList = (state: State) => state.getPersonList;
export const GetBgBewilligungStatusCode = (state: State) => state.getBgBewilligungStatusCode;
