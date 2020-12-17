import {
  KasseActions,
  KasseActionTypes
} from '../actions/kasse.actions';
import { AppEntityCustomState } from '@shared/AppAction';

interface KasseDatasState extends AppEntityCustomState<any, any> { }
interface DropDownDatasState extends AppEntityCustomState<any, any> { }
interface KbBuchungUpdateState extends AppEntityCustomState<any, any> {
  updating: boolean;
  updated: boolean;
}
interface KbBuchungStatusUpdateState extends AppEntityCustomState<any, any> {
  updating: boolean;
  updated: boolean;
}
export interface State {
  KasseDatasState: KasseDatasState;
  DropDownDatasState: DropDownDatasState;
  KbBuchungUpdateState: KbBuchungUpdateState;
  KbBuchungStatusUpdateState: KbBuchungStatusUpdateState;
}

export const initialState: State = {
  KasseDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: [],
  },
  DropDownDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: [],
  },
  KbBuchungUpdateState: {
    updating: false,
    updated: false,
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  KbBuchungStatusUpdateState: {
    updating: false,
    updated: false,
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  }
};

export function reducer(state = initialState, action: KasseActions): State {
  if (!action) { return state; }
  switch (action.type) {
    case KasseActionTypes.KasseAction:
      return state;
    // init grid
    case KasseActionTypes.KasseDatasTypes.LOAD: {
      return Object.assign({}, state, {
        KasseDatasState: {
          loading: true,
          query: action.payload,
          data: null
        }
      });
    }

    case KasseActionTypes.KasseDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        KasseDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case KasseActionTypes.KasseDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        KasseDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
        }
      });
    }
    // DropDown
    case KasseActionTypes.DropDownTypes.LOAD: {
      return Object.assign({}, state, {
        DropDownDatasState: {
          loading: true,
          query: action.payload,
          data: []
        }
      });
    }

    case KasseActionTypes.DropDownTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        DropDownDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case KasseActionTypes.DropDownTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        DropDownDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
        }
      });
    }
    // Update KbBuchung
    case KasseActionTypes.KbBuchungTypes.UPDATE: {
      return Object.assign({}, state, {
        KbBuchungUpdateState: {
          updating: true,
          updated: false,
          query: action.payload,
          data: null
        }
      });
    }

    case KasseActionTypes.KbBuchungTypes.UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        KbBuchungUpdateState: {
          updating: false,
          updated: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case KasseActionTypes.KbBuchungTypes.UPDATE_FAIL: {
      return Object.assign({}, state, {
        KbBuchungUpdateState: {
          updating: false,
          updated: false,
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
        }
      });
    }
    // Update KbBuchung Status
    case KasseActionTypes.KbBuchungStatusTypes.UPDATE: {
      return Object.assign({}, state, {
        KbBuchungStatusUpdateState: {
          updating: true,
          updated: false,
          query: action.payload,
          data: null
        }
      });
    }

    case KasseActionTypes.KbBuchungStatusTypes.UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        KbBuchungStatusUpdateState: {
          updating: false,
          updated: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case KasseActionTypes.KbBuchungStatusTypes.UPDATE_FAIL: {
      return Object.assign({}, state, {
        KbBuchungStatusUpdateState: {
          updating: false,
          updated: false,
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
        }
      });
    }
    // Reset
    case KasseActionTypes.KasseStateTypes.RESET_STATE: {
      return initialState;
    }
    default:
      return state;
  }
}

export const getKasseDatas = {
  getDatas: (state: State) => state.KasseDatasState.data,
};
export const getDropDownDatas = {
  getDatas: (state: State) => state.DropDownDatasState.data,
};
export const KbBuchungUpdatedDatas = {
  getDatas: (state: State) => state.KbBuchungUpdateState.data,
};
export const KbBuchungStatusUpdatedData = {
  getDatas: (state: State) => state.KbBuchungStatusUpdateState.data,
};
