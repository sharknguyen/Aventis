import { AppEntityCustomState } from '@shared/AppAction';
import { WohnkostenActions, WohnkostenActionTypes } from '../actions/wohnkosten.actions';

interface BgFinanzplanState extends AppEntityCustomState<any[], any> { }
interface BgGrundbedarfState extends AppEntityCustomState<any[], any> { }
interface BgPositionsartState extends AppEntityCustomState<any[], any> { }
interface BgPositionState extends AppEntityCustomState<any[], any> { }
interface WhKennzahlenState extends AppEntityCustomState<any[], any> { }
interface RichtlinienState extends AppEntityCustomState<any[], any> { }
interface DeleteWohnkostenInitDatasStates extends AppEntityCustomState<any, number> { }
interface UpdateWohnkostenInitDatasStates extends AppEntityCustomState<any, number> { }
interface CreateWohnkostenInitDatasStates extends AppEntityCustomState<any, number> { }
export interface State {
  BgFinanzplanState: BgFinanzplanState;
  BgGrundbedarfState: BgGrundbedarfState;
  BgPositionsartState: BgPositionsartState;
  BgPositionState: BgPositionState;
  WhKennzahlenState: WhKennzahlenState;
  RichtlinienState: RichtlinienState;
  DeleteWohnkostenInitDatasStates: DeleteWohnkostenInitDatasStates;
  UpdateWohnkostenInitDatasStates: UpdateWohnkostenInitDatasStates;
  CreateWohnkostenInitDatasStates: CreateWohnkostenInitDatasStates;
}

export const initialState: State = {
  BgFinanzplanState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  BgGrundbedarfState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  BgPositionsartState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  BgPositionState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  WhKennzahlenState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  RichtlinienState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  DeleteWohnkostenInitDatasStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  UpdateWohnkostenInitDatasStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  CreateWohnkostenInitDatasStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  }
};
export function reducer(state = initialState, action: WohnkostenActions): State {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case WohnkostenActionTypes.WohnkostenAction:
      return state;

      // get BgFinanzplan data
      case WohnkostenActionTypes.BgFinanzplanTypes.LOAD: {
        return Object.assign({}, state, {
          BgFinanzplanState: {
            loading: true,
            query: action.payload
          }
        });
      }

      case WohnkostenActionTypes.BgFinanzplanTypes.LOAD_SUCCESS: {
        return Object.assign({}, state, {
          BgFinanzplanState: {
            loaded: true,
            loading: false,
            failed: false,
            data: action.payload
          }
        });
      }

      case WohnkostenActionTypes.BgFinanzplanTypes.LOAD_FAIL: {
        return Object.assign({}, state, {
          BgFinanzplanState: {
            loaded: false,
            loading: false,
            failed: true,
            data: action.payload
          }
        });
      }

      // get BgGrundbedarf data
      case WohnkostenActionTypes.BgGrundbedarfTypes.LOAD: {
        return Object.assign({}, state, {
          BgGrundbedarfState: {
            loading: true,
            query: action.payload
          }
        });
      }

      case WohnkostenActionTypes.BgGrundbedarfTypes.LOAD_SUCCESS: {
        return Object.assign({}, state, {
          BgGrundbedarfState: {
            loaded: true,
            loading: false,
            failed: false,
            data: action.payload
          }
        });
      }

      case WohnkostenActionTypes.BgGrundbedarfTypes.LOAD_FAIL: {
        return Object.assign({}, state, {
          BgGrundbedarfState: {
            loaded: false,
            loading: false,
            failed: true,
            data: action.payload
          }
        });
      }

      // get BgPositionsart data
      case WohnkostenActionTypes.BgPositionsartTypes.LOAD: {
        return Object.assign({}, state, {
          BgPositionsartState: {
            loading: true,
            query: action.payload
          }
        });
      }

      case WohnkostenActionTypes.BgPositionsartTypes.LOAD_SUCCESS: {
        return Object.assign({}, state, {
          BgPositionsartState: {
            loaded: true,
            loading: false,
            failed: false,
            data: action.payload
          }
        });
      }

      case WohnkostenActionTypes.BgPositionsartTypes.LOAD_FAIL: {
        return Object.assign({}, state, {
          BgPositionsartState: {
            loaded: false,
            loading: false,
            failed: true,
            data: action.payload
          }
        });
      }

    // get BgPosition data
    case WohnkostenActionTypes.BgPositionTypes.LOAD: {
      return Object.assign({}, state, {
        BgPositionState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case WohnkostenActionTypes.BgPositionTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        BgPositionState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case WohnkostenActionTypes.BgPositionTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        BgPositionState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload
        }
      });
    }

    // get WhKennzahlen data
    case WohnkostenActionTypes.WhKennzahlenTypes.LOAD: {
      return Object.assign({}, state, {
        WhKennzahlenState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case WohnkostenActionTypes.WhKennzahlenTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        WhKennzahlenState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case WohnkostenActionTypes.WhKennzahlenTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        WhKennzahlenState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload
        }
      });
    }

    // Delete Wohnkosten
    case WohnkostenActionTypes.WohnkostenDeleteTypes.LOAD: {
      return Object.assign({}, state, {
        DeleteWohnkostenInitDatasStates: {
          loading: true,
          query: action.payload
        }
      });
    }

    case WohnkostenActionTypes.WohnkostenDeleteTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        DeleteWohnkostenInitDatasStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case WohnkostenActionTypes.WohnkostenDeleteTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        DeleteWohnkostenInitDatasStates: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
          query: null,
        }
      });
    }

    // Update Wohnkosten
    case WohnkostenActionTypes.WohnkostenUpdateTypes.LOAD: {
      return Object.assign({}, state, {
        UpdateWohnkostenInitDatasStates: {
          loading: true,
          query: action.payload
        }
      });
    }

    case WohnkostenActionTypes.WohnkostenUpdateTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        UpdateWohnkostenInitDatasStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case WohnkostenActionTypes.WohnkostenUpdateTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        UpdateWohnkostenInitDatasStates: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
          query: null,
        }
      });
    }
    // Create Wohnkosten
    case WohnkostenActionTypes.WohnkostenCreateTypes.LOAD: {
      return Object.assign({}, state, {
        CreateWohnkostenInitDatasStates: {
          loading: true,
          query: action.payload
        }
      });
    }

    case WohnkostenActionTypes.WohnkostenCreateTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        CreateWohnkostenInitDatasStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case WohnkostenActionTypes.WohnkostenCreateTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        CreateWohnkostenInitDatasStates: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
          query: null,
        }
      });
    }

    default:
      return state;
  }
}
export const getBgFinanzplan_StateInit = {
  getDatas: (state: State) => state.BgFinanzplanState.data,
  getLoading: (state: State) => state.BgFinanzplanState.loading,
  getLoaded: (state: State) => state.BgFinanzplanState.loaded,
  getFailed: (state: State) => state.BgFinanzplanState.failed
};
export const getBgPositionsart_StateInit = {
  getDatas: (state: State) => state.BgPositionsartState.data,
  getLoading: (state: State) => state.BgPositionsartState.loading,
  getLoaded: (state: State) => state.BgPositionsartState.loaded,
  getFailed: (state: State) => state.BgPositionsartState.failed
};
export const getBgPosition_StateInit = {
  getDatas: (state: State) => state.BgPositionState.data,
  getLoading: (state: State) => state.BgPositionState.loading,
  getLoaded: (state: State) => state.BgPositionState.loaded,
  getFailed: (state: State) => state.BgPositionState.failed
};
export const getWhKennzahlen_StateInit = {
  getDatas: (state: State) => state.WhKennzahlenState.data,
  getLoading: (state: State) => state.WhKennzahlenState.loading,
  getLoaded: (state: State) => state.WhKennzahlenState.loaded,
  getFailed: (state: State) => state.WhKennzahlenState.failed
};
export const getRichtlinien_StateInit = {
  getDatas: (state: State) => state.RichtlinienState.data,
  getLoading: (state: State) => state.RichtlinienState.loading,
  getLoaded: (state: State) => state.RichtlinienState.loaded,
  getFailed: (state: State) => state.RichtlinienState.failed
};
export const deleteWohnkosten = {
  getDatas: (state: State) => state.DeleteWohnkostenInitDatasStates.data,
  getLoading: (state: State) => state.DeleteWohnkostenInitDatasStates.loading,
  getLoaded: (state: State) => state.DeleteWohnkostenInitDatasStates.loaded,
  getFailed: (state: State) => state.DeleteWohnkostenInitDatasStates.failed
};
export const updateWohnkosten = {
  getDatas: (state: State) => state.UpdateWohnkostenInitDatasStates.data,
  getLoading: (state: State) => state.UpdateWohnkostenInitDatasStates.loading,
  getLoaded: (state: State) => state.UpdateWohnkostenInitDatasStates.loaded,
  getFailed: (state: State) => state.UpdateWohnkostenInitDatasStates.failed
};
export const createWohnkosten = {
  getDatas: (state: State) => state.CreateWohnkostenInitDatasStates.data,
  getLoading: (state: State) => state.CreateWohnkostenInitDatasStates.loading,
  getLoaded: (state: State) => state.CreateWohnkostenInitDatasStates.loaded,
  getFailed: (state: State) => state.CreateWohnkostenInitDatasStates.failed
};
