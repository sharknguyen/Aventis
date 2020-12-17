import { AppEntityCustomState } from '@shared/AppAction';

import { AsvDatenerfassungActions, AsvDatenerfassungActionTypes } from '../actions/asv-datenerfassung.actions';

interface AsvDatenerfassungDatasState extends AppEntityCustomState<any, any> { }

interface AsvDatenerfassungComboboxDatasState extends AppEntityCustomState<any, any> { }

interface AsvDatenerfassungInsertState extends AppEntityCustomState<any, any> { }

interface AsvDatenerfassungUpdateState extends AppEntityCustomState<any, any> { }
interface AsvDatenerfassungDeleteState extends AppEntityCustomState<any, any> { }
export interface State {
  AsvDatenerfassungDatasState: AsvDatenerfassungDatasState;
  AsvDatenerfassungComboboxDatasState: AsvDatenerfassungComboboxDatasState;
  AsvDatenerfassungInsertState: AsvDatenerfassungInsertState;
  AsvDatenerfassungUpdateState: AsvDatenerfassungUpdateState;
  AsvDatenerfassungDeleteState: AsvDatenerfassungDeleteState;
}

export const initialState: State = {
  AsvDatenerfassungDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: [],
  },
  AsvDatenerfassungComboboxDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: [],
  },
  AsvDatenerfassungInsertState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  AsvDatenerfassungUpdateState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  AsvDatenerfassungDeleteState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
};

export function reducer(state = initialState, action: AsvDatenerfassungActions): State {
  if (!action) { return state; }
  switch (action.type) {
    case AsvDatenerfassungActionTypes.AsvDatenerfassungAction:
      return state;

    // Load data grid
    case AsvDatenerfassungActionTypes.AsvDatenerfassungDatasTypes.LOAD: {
      return Object.assign({}, state, {
        AsvDatenerfassungDatasState: {
          loading: true,
          query: action.payload,
          data: null
        }
      });
    }

    case AsvDatenerfassungActionTypes.AsvDatenerfassungDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        AsvDatenerfassungDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case AsvDatenerfassungActionTypes.AsvDatenerfassungDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        AsvDatenerfassungDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
        }
      });
    }

    // Load Data Combobox
    case AsvDatenerfassungActionTypes.AsvDatenerfassungComboboxDatasTypes.LOAD: {
      return Object.assign({}, state, {
        AsvDatenerfassungComboboxDatasState: {
          loading: true,
          query: action.payload,
          data: null
        }
      });
    }

    case AsvDatenerfassungActionTypes.AsvDatenerfassungComboboxDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        AsvDatenerfassungComboboxDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case AsvDatenerfassungActionTypes.AsvDatenerfassungComboboxDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        AsvDatenerfassungComboboxDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
        }
      });
    }

    // Insert
    case AsvDatenerfassungActionTypes.AsvDatenerfassungInsertTypes.LOAD: {
      return Object.assign({}, state, {
        AsvDatenerfassungInsertState: {
          loading: true,
          query: action.payload,
          data: null
        }
      });
    }

    case AsvDatenerfassungActionTypes.AsvDatenerfassungInsertTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        AsvDatenerfassungInsertState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case AsvDatenerfassungActionTypes.AsvDatenerfassungInsertTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        AsvDatenerfassungInsertState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
        }
      });
    }

    // Update
    case AsvDatenerfassungActionTypes.AsvDatenerfassungUpdateTypes.LOAD: {
      return Object.assign({}, state, {
        AsvDatenerfassungUpdateState: {
          loading: true,
          query: action.payload,
          data: null
        }
      });
    }

    case AsvDatenerfassungActionTypes.AsvDatenerfassungUpdateTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        AsvDatenerfassungUpdateState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case AsvDatenerfassungActionTypes.AsvDatenerfassungUpdateTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        AsvDatenerfassungUpdateState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
        }
      });
    }

    // Delete
    case AsvDatenerfassungActionTypes.AsvDatenerfassungDeleteTypes.Delete: {
      return Object.assign({}, state, {
        AsvDatenerfassungDeleteState: {
          loading: true,
          query: action.payload,
          data: null
        }
      });
    }

    case AsvDatenerfassungActionTypes.AsvDatenerfassungDeleteTypes.Delete_SUCCESS: {
      return Object.assign({}, state, {
        AsvDatenerfassungDeleteState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case AsvDatenerfassungActionTypes.AsvDatenerfassungDeleteTypes.Delete_FAIL: {
      return Object.assign({}, state, {
        AsvDatenerfassungDeleteState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
        }
      });
    }
    // Reset
    case AsvDatenerfassungActionTypes.AsvDatenerfassungStateTypes.RESET_STATE: {
      return initialState;
    }
    default:
      return state;
  }
}

export const getAsvDatenerfassungDatas = {
  getDatas: (state: State) => state.AsvDatenerfassungDatasState.data,
};

export const getComboboxAsvDatenerfassungDatas = {
  getDatas: (state: State) => state.AsvDatenerfassungComboboxDatasState.data,
};

export const asvDatenerfassungInsert = {
  getDatas: (state: State) => state.AsvDatenerfassungInsertState.data,
};

export const asvDatenerfassungUpdate = {
  getDatas: (state: State) => state.AsvDatenerfassungUpdateState.data,
};

export const asvDatenerfassungDelete = {
  getDatas: (state: State) => state.AsvDatenerfassungDeleteState.data,
};
