import {AppEntityCustomState} from '@shared/AppAction';
import {ZulagenEFBAction, ZulagenEFBActionTypes} from '@app/kiss4-sozialhilfe/finanzplan/zulagen-efb/store/actions/zulagen-efb.action';
import {BgPosition, InitDataCombox, Positionsart, ResultValue, RichtLinie} from '@app/kiss4-sozialhilfe/finanzplan/zulagen-efb/models';


interface BgSilAHVBeitragInitDatasStates extends AppEntityCustomState<any, number> {
}

interface ComboboxInitDataState extends AppEntityCustomState<ResultValue[], InitDataCombox> {
}

interface BgPositionInitDataState extends AppEntityCustomState<BgPosition[], number> {
}

interface RichtLinieInitDataState extends AppEntityCustomState<RichtLinie[], number> {
}

interface BgPositionsartInitDataState extends AppEntityCustomState<Positionsart[], number> {
}

interface BgPositionsartIdInitDataState extends AppEntityCustomState<any[], number> {
}

interface SetIdZulagenInitDatasState extends AppEntityCustomState<any, number> { }

interface IPutBgPositionDataState {
  data: any;
  updating: false;
  updated: false;
  update_fail: false;
}

export interface State {
  BgSilAHVBeitragInitDatasStates: BgSilAHVBeitragInitDatasStates;
  ComboboxInitDataState: ComboboxInitDataState;
  BgPositionInitDataState: BgPositionInitDataState;
  RichtLinieInitDataState: RichtLinieInitDataState;
  BgPositionsartInitDataState: BgPositionsartInitDataState;
  BgPositionsartIdInitDataState: BgPositionsartIdInitDataState;
  SetIdZulagenInitDatasState: SetIdZulagenInitDatasState;
  putBgPositionState: IPutBgPositionDataState;
}

export const initialState: State = {
  BgSilAHVBeitragInitDatasStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  ComboboxInitDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  BgPositionInitDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  RichtLinieInitDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  BgPositionsartInitDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  BgPositionsartIdInitDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  putBgPositionState: {
    updating: false,
    updated: false,
    update_fail: false,
    data: null,
  },
  SetIdZulagenInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  }
};

export function reducer(state = initialState, action: ZulagenEFBAction): State {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case ZulagenEFBActionTypes.ZulagenEFBAction:
      return state;

    // Load data BgSilAHVBeitrag
    case ZulagenEFBActionTypes.BgSilAHVBeitragTypes.LOAD: {
      return Object.assign({}, state, {
        BgSilAHVBeitragInitDatasStates: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload
        }
      });
    }

    case ZulagenEFBActionTypes.BgSilAHVBeitragTypes.LOAD_SUCCESS: {
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

    case ZulagenEFBActionTypes.BgSilAHVBeitragTypes.LOAD_FAIL: {
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

    // Load data Zulagen combobox
    case ZulagenEFBActionTypes.ComboboxDatasTypes.LOAD: {
      return Object.assign({}, state, {
        ComboboxInitDataState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
        }
      });
    }

    case ZulagenEFBActionTypes.ComboboxDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        ComboboxInitDataState: {
          loading: false,
          loaded: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }

    case ZulagenEFBActionTypes.ComboboxDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        ComboboxInitDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }

    // Load data BgPosition grid
    case ZulagenEFBActionTypes.BgPositionTypes.LOAD: {
      return Object.assign({}, state, {
        BgPositionInitDataState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
        }
      });
    }

    case ZulagenEFBActionTypes.BgPositionTypes.LOAD_SUCCESS: {
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

    case ZulagenEFBActionTypes.BgPositionTypes.LOAD_FAIL: {
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

    // Load RichtLinie data
    case ZulagenEFBActionTypes.RichtLinieTypes.LOAD: {
      return Object.assign({}, state, {
        RichtLinieInitDataState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
        }
      });
    }

    case ZulagenEFBActionTypes.RichtLinieTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        RichtLinieInitDataState: {
          loading: false,
          loaded: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }

    case ZulagenEFBActionTypes.RichtLinieTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        RichtLinieInitDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }

    // Load Positionsart data
    case ZulagenEFBActionTypes.BgPositionsartTypes.LOAD: {
      return Object.assign({}, state, {
        BgPositionsartInitDataState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
        }
      });
    }

    case ZulagenEFBActionTypes.BgPositionsartTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        BgPositionsartInitDataState: {
          loading: false,
          loaded: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }

    case ZulagenEFBActionTypes.BgPositionsartTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        BgPositionsartInitDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }

    // Load PositionsartId data
    case ZulagenEFBActionTypes.BgPositionsartIdTypes.LOAD: {
      return Object.assign({}, state, {
        BgPositionsartIdInitDataState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
        }
      });
    }

    case ZulagenEFBActionTypes.BgPositionsartIdTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        BgPositionsartIdInitDataState: {
          loading: false,
          loaded: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }

    case ZulagenEFBActionTypes.BgPositionsartIdTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        BgPositionsartIdInitDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }


    // Put BgPosition
    case ZulagenEFBActionTypes.BgPositionUpdateTypes.PUT: {
      return Object.assign({}, state, {
        putBgPositionState: {
          updated: false,
          updating: true,
          updating_fail: false,
          query: action.payload
        }
      });
    }
    case ZulagenEFBActionTypes.BgPositionUpdateTypes.PUT_SUCCESS: {
      return Object.assign({}, state, {
        putBgPositionState: {
          updated: true,
          updating: false,
          updating_fail: false,
          data: action.payload
        }
      });
    }
    case ZulagenEFBActionTypes.BgPositionUpdateTypes.PUT_FAIL: {
      return Object.assign({}, state, {
        putBgPositionState: {
          updated: false,
          updating: false,
          updating_fail: true,
          data: action.payload
        }
      });
    }

    case ZulagenEFBActionTypes.SetIdZulagenTypes.LOAD: {
      return Object.assign({}, state, {
        putBgPositionState: {
          updated: false,
          updating: false,
          updating_fail: true,
          data: null
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

export const getComboboxWhLeiStung = {
  getDatas: (state: State) => state.ComboboxInitDataState.data,
  getLoading: (state: State) => state.ComboboxInitDataState.loading,
  getLoaded: (state: State) => state.ComboboxInitDataState.loaded,
  getFailed: (state: State) => state.ComboboxInitDataState.failed
};

export const getBgPosition = {
  getDatas: (state: State) => state.BgPositionInitDataState.data,
  getLoading: (state: State) => state.BgPositionInitDataState.loading,
  getLoaded: (state: State) => state.BgPositionInitDataState.loaded,
  getFailed: (state: State) => state.BgPositionInitDataState.failed
};

export const getRichtLinie = {
  getDatas: (state: State) => state.RichtLinieInitDataState.data,
  getLoading: (state: State) => state.RichtLinieInitDataState.loading,
  getLoaded: (state: State) => state.RichtLinieInitDataState.loaded,
  getFailed: (state: State) => state.RichtLinieInitDataState.failed
};

export const getBgPositionsart = {
  getDatas: (state: State) => state.BgPositionsartInitDataState.data,
  getLoading: (state: State) => state.BgPositionsartInitDataState.loading,
  getLoaded: (state: State) => state.BgPositionsartInitDataState.loaded,
  getFailed: (state: State) => state.BgPositionsartInitDataState.failed
};

export const getBgPositionsartId = {
  getDatas: (state: State) => state.BgPositionsartIdInitDataState.data,
  getLoading: (state: State) => state.BgPositionsartIdInitDataState.loading,
  getLoaded: (state: State) => state.BgPositionsartIdInitDataState.loaded,
  getFailed: (state: State) => state.BgPositionsartIdInitDataState.failed
};

export const putBgPosition = {
  getRespone: (state: State) => state.putBgPositionState.data,
  getUpdating: (state: State) => state.putBgPositionState.updating,
  getUpdated: (state: State) => state.putBgPositionState.updated,
  getUpdateFail: (state: State) => state.putBgPositionState.data
};
