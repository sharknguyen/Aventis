import {AppEntityCustomState} from '@shared/AppAction';
import {FinanzplanAction, FinanzplanActionTypes} from '@app/kiss4-sozialhilfe/finanzplan/store/actions/finanzplan.action';
import {Finanzplan} from '@app/kiss4-sozialhilfe/finanzplan/models';

interface BgSilAHVBeitragInitDatasStates extends AppEntityCustomState<any, number> {
}

interface FinanzplanInitDatasStates extends AppEntityCustomState<Finanzplan[], number> {
}

export interface State {
  BgSilAHVBeitragInitDatasStates: BgSilAHVBeitragInitDatasStates;
  FinanzplanInitDatasStates: FinanzplanInitDatasStates;
}
export const initialState: State = {
  BgSilAHVBeitragInitDatasStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },

  FinanzplanInitDatasStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
}

export function reducer(state = initialState, action: FinanzplanAction): State {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case FinanzplanActionTypes.FinanzplanAction:
      return state;

    // Load data BgSilAHVBeitrag
    case FinanzplanActionTypes.BgSilAHVBeitragTypes.LOAD: {
      return Object.assign({}, state, {
        BgSilAHVBeitragInitDatasStates: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload
        }
      });
    }

    case FinanzplanActionTypes.BgSilAHVBeitragTypes.LOAD_SUCCESS: {
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

    case FinanzplanActionTypes.BgSilAHVBeitragTypes.LOAD_FAIL: {
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

    // Load data Finanzplan
    case FinanzplanActionTypes.FinanzplanTypes.LOAD: {
      return Object.assign({}, state, {
        FinanzplanInitDatasStates: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload
        }
      });
    }

    case FinanzplanActionTypes.FinanzplanTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        FinanzplanInitDatasStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case FinanzplanActionTypes.FinanzplanTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        FinanzplanInitDatasStates: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }

    default:
      return state;
  }
}

export const getBgSilAHVBeitrag = {
  getDatas: (state: State) => state.BgSilAHVBeitragInitDatasStates.data,
  getLoading: (state: State) => state.BgSilAHVBeitragInitDatasStates.loading,
  getLoaded: (state: State) => state.BgSilAHVBeitragInitDatasStates.loaded,
  getFailed: (state: State) => state.BgSilAHVBeitragInitDatasStates.failed
};

export const getFinanzplan = {
  getDatas: (state: State) => state.FinanzplanInitDatasStates.data,
  getLoading: (state: State) => state.FinanzplanInitDatasStates.loading,
  getLoaded: (state: State) => state.FinanzplanInitDatasStates.loaded,
  getFailed: (state: State) => state.FinanzplanInitDatasStates.failed
};
