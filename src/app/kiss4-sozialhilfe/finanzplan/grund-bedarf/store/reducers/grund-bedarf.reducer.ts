import { InitFormDataModel, InitFormDataQuery, QryBgPositionDataModel, QryKennzahlenModel,
   QryKennzahlenQuery, RichtlinieDataModel, SelectboxModel, SelectboxQueryModel, StatusCodeModel,
   StatusCodeQuery, UpdateBeforePostQueryModel, UpdateFormDataQueryModel } from '@app/kiss4-sozialhilfe/finanzplan/grund-bedarf/models';
import { AppEntityCustomState } from '@shared/AppAction';
import { GrundBedarfActions, GrundBedarfActionTypes } from '../actions/grund-bedarf.action';

interface LoadDatasourceSelectboxDatasState extends AppEntityCustomState<SelectboxModel[], SelectboxQueryModel> { }
interface GrundBedarfInitFormDatasState extends AppEntityCustomState<InitFormDataModel, InitFormDataQuery> { }
interface GrundBedarfRichtlinieDatasState extends AppEntityCustomState<RichtlinieDataModel[], InitFormDataQuery> { }
interface GrundBedarfPauschaleSTEDatasState extends AppEntityCustomState<number, number> { }
interface GrundBedarfqryBgPositionDatasState extends AppEntityCustomState<QryBgPositionDataModel[], InitFormDataQuery> { }
interface GrundBedarfqryKennzahlenDatasState extends AppEntityCustomState<QryKennzahlenModel[], QryKennzahlenQuery> { }
interface GrundBedarfUpdateFormDatasState extends AppEntityCustomState<UpdateFormDataQueryModel, UpdateFormDataQueryModel> {
  updating: false;
  updated: false;
}
interface GrundBedarfUpdateBeforePostDatasState extends AppEntityCustomState<UpdateBeforePostQueryModel, UpdateBeforePostQueryModel> {
  updating: false;
  updated: false;
}
interface LoadStatusCodeDatasState extends AppEntityCustomState<StatusCodeModel[], StatusCodeQuery> { }
interface ShStatusCodeToSqlDatasState extends AppEntityCustomState<number, InitFormDataQuery> { }

export interface State {
  LoadDatasourceSelectboxDatasState: LoadDatasourceSelectboxDatasState;
  GrundBedarfqryBgPositionDatasState: GrundBedarfqryBgPositionDatasState;
  GrundBedarfqryKennzahlenDatasState: GrundBedarfqryKennzahlenDatasState;
  GrundBedarfUpdateFormDatasState: GrundBedarfUpdateFormDatasState;
  LoadStatusCodeDatasState: LoadStatusCodeDatasState;
  GrundBedarfInitFormDatasState: GrundBedarfInitFormDatasState;
  GrundBedarfUpdateBeforePostDatasState: GrundBedarfUpdateBeforePostDatasState;
  GrundBedarfRichtlinieDatasState: GrundBedarfRichtlinieDatasState;
  GrundBedarfPauschaleSTEDatasState: GrundBedarfPauschaleSTEDatasState;
  ShStatusCodeToSqlDatasState: ShStatusCodeToSqlDatasState;
}


export const initialState: State = {

  LoadDatasourceSelectboxDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GrundBedarfqryBgPositionDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GrundBedarfUpdateFormDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    updating: false,
    updated: false,
    data: null,
  },
  LoadStatusCodeDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GrundBedarfInitFormDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GrundBedarfPauschaleSTEDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GrundBedarfRichtlinieDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GrundBedarfqryKennzahlenDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  GrundBedarfUpdateBeforePostDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    updating: false,
    updated: false,
    data: null,
  },
  ShStatusCodeToSqlDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  }
};

export function reducer(state = initialState, action: GrundBedarfActions): State {
  if (!action) { return state; }
  switch (action.type) {
    case GrundBedarfActionTypes.GrundBedarfAction:
      return state;

    case GrundBedarfActionTypes.BerechnungsgrundlageSelectboxDataTypes.LOAD: {
      return Object.assign({}, state, {
        LoadDatasourceSelectboxDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.BerechnungsgrundlageSelectboxDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LoadDatasourceSelectboxDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.BerechnungsgrundlageSelectboxDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LoadDatasourceSelectboxDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    case GrundBedarfActionTypes.GrundBedarfQryBgPositionDataTypes.LOAD: {
      return Object.assign({}, state, {
        GrundBedarfqryBgPositionDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.GrundBedarfQryBgPositionDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GrundBedarfqryBgPositionDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case GrundBedarfActionTypes.GrundBedarfQryBgPositionDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GrundBedarfqryBgPositionDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }

    case GrundBedarfActionTypes.GrundBedarfQryKennzahlenDataTypes.LOAD: {
      return Object.assign({}, state, {
        GrundBedarfqryKennzahlenDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.GrundBedarfQryKennzahlenDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GrundBedarfqryKennzahlenDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case GrundBedarfActionTypes.GrundBedarfQryKennzahlenDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GrundBedarfqryKennzahlenDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }
    // GrundBedarfInitFormDatasState
    case GrundBedarfActionTypes.GrundBedarfInitFormDataTypes.LOAD: {
      return Object.assign({}, state, {
        GrundBedarfInitFormDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.GrundBedarfInitFormDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GrundBedarfInitFormDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case GrundBedarfActionTypes.GrundBedarfInitFormDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GrundBedarfInitFormDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
          query: null,
        }
      });
    }
    // GrundBedarfRichtlinieDatasState
    case GrundBedarfActionTypes.RichtlinieDataTypes.LOAD: {
      return Object.assign({}, state, {
        GrundBedarfRichtlinieDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.RichtlinieDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GrundBedarfRichtlinieDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case GrundBedarfActionTypes.RichtlinieDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GrundBedarfRichtlinieDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }
    // GrundBedarfPauschaleSTEDatasState
    case GrundBedarfActionTypes.PauschaleSTEDataTypes.LOAD: {
      return Object.assign({}, state, {
        GrundBedarfPauschaleSTEDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.PauschaleSTEDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GrundBedarfPauschaleSTEDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case GrundBedarfActionTypes.PauschaleSTEDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GrundBedarfPauschaleSTEDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }
    // ShStatusCodeToSqlDatasState
    case GrundBedarfActionTypes.ShStatusCodeToSqlDataTypes.LOAD: {
      return Object.assign({}, state, {
        ShStatusCodeToSqlDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.ShStatusCodeToSqlDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        ShStatusCodeToSqlDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }

    case GrundBedarfActionTypes.ShStatusCodeToSqlDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        ShStatusCodeToSqlDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: [],
          query: null,
        }
      });
    }

    case GrundBedarfActionTypes.GrundBedarfUpdateFormDataTypes.UPDATE_FORM_DATA: {
      return Object.assign({}, state, {
        GrundBedarfUpdateFormDatasState: {
          updating: true,
          updated: false,
          failed: false,
          data: null
        }
      });
    }

    case GrundBedarfActionTypes.GrundBedarfUpdateFormDataTypes.UPDATE_FORM_DATA_SUCCESS: {
      return Object.assign({}, state, {
        GrundBedarfUpdateFormDatasState: {
          updating: false,
          updated: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.GrundBedarfUpdateFormDataTypes.UPDATE_FORM_DATA_FAIL: {
      return Object.assign({}, state, {
        GrundBedarfUpdateFormDatasState: {
          updating: false,
          updated: false,
          failed: true,
          data: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.GrundBedarfUpdateBeforePostTypes.UPDATE_BEFORE_POST_DATA: {
      return Object.assign({}, state, {
        GrundBedarfUpdateBeforePostDatasState: {
          updating: true,
          updated: false,
          failed: false,
          data: null
        }
      });
    }

    case GrundBedarfActionTypes.GrundBedarfUpdateBeforePostTypes.UPDATE_BEFORE_POST_DATA_SUCCESS: {
      return Object.assign({}, state, {
        GrundBedarfUpdateBeforePostDatasState: {
          updating: false,
          updated: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.GrundBedarfUpdateBeforePostTypes.UPDATE_BEFORE_POST_DATA_FAIL: {
      return Object.assign({}, state, {
        GrundBedarfUpdateBeforePostDatasState: {
          updating: false,
          updated: false,
          failed: true,
          data: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.GetStatusCodeTypes.LOAD: {
      return Object.assign({}, state, {
        LoadStatusCodeDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.GetStatusCodeTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LoadStatusCodeDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case GrundBedarfActionTypes.GetStatusCodeTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LoadStatusCodeDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    default:
      return state;
  }
}

export const getBerechnungsgrundlageSelectboxData = {
  getDatas: (state: State) => state.LoadDatasourceSelectboxDatasState.data,
  getLoading: (state: State) => state.LoadDatasourceSelectboxDatasState.loading,
  getLoaded: (state: State) => state.LoadDatasourceSelectboxDatasState.loaded,
  getFailed: (state: State) => state.LoadDatasourceSelectboxDatasState.failed
};

export const getGrundBedarfQryBgPositionData = {
  getDatas: (state: State) => state.GrundBedarfqryBgPositionDatasState.data,
  getLoading: (state: State) => state.GrundBedarfqryBgPositionDatasState.loading,
  getLoaded: (state: State) => state.GrundBedarfqryBgPositionDatasState.loaded,
  getFailed: (state: State) => state.GrundBedarfqryBgPositionDatasState.failed
};
export const getGrundBedarfQryKennzahlenData = {
  getDatas: (state: State) => state.GrundBedarfqryKennzahlenDatasState.data,
  getLoading: (state: State) => state.GrundBedarfqryKennzahlenDatasState.loading,
  getLoaded: (state: State) => state.GrundBedarfqryKennzahlenDatasState.loaded,
  getFailed: (state: State) => state.GrundBedarfqryKennzahlenDatasState.failed
};
export const getGrundBedarfInitFormData = {
  getDatas: (state: State) => state.GrundBedarfInitFormDatasState.data,
  getLoading: (state: State) => state.GrundBedarfInitFormDatasState.loading,
  getLoaded: (state: State) => state.GrundBedarfInitFormDatasState.loaded,
  getFailed: (state: State) => state.GrundBedarfInitFormDatasState.failed
};
export const getGrundBedarfPauschaleSTEData = {
  getDatas: (state: State) => state.GrundBedarfPauschaleSTEDatasState.data,
  getLoading: (state: State) => state.GrundBedarfPauschaleSTEDatasState.loading,
  getLoaded: (state: State) => state.GrundBedarfPauschaleSTEDatasState.loaded,
  getFailed: (state: State) => state.GrundBedarfPauschaleSTEDatasState.failed
};
export const getGrundBedarfRichtlinieData = {
  getDatas: (state: State) => state.GrundBedarfRichtlinieDatasState.data,
  getLoading: (state: State) => state.GrundBedarfRichtlinieDatasState.loading,
  getLoaded: (state: State) => state.GrundBedarfRichtlinieDatasState.loaded,
  getFailed: (state: State) => state.GrundBedarfRichtlinieDatasState.failed
};
export const getGrundBedarfUpdateFormData = {
  getDatas: (state: State) => state.GrundBedarfUpdateFormDatasState.data,
  getUpdating: (state: State) => state.GrundBedarfUpdateFormDatasState.updating,
  getUpdated: (state: State) => state.GrundBedarfUpdateFormDatasState.updated,
  getFailed: (state: State) => state.GrundBedarfUpdateFormDatasState.failed
};

export const getGrundBedarfUpdateBeforePostData = {
  getDatas: (state: State) => state.GrundBedarfUpdateBeforePostDatasState.data,
  getUpdating: (state: State) => state.GrundBedarfUpdateBeforePostDatasState.updating,
  getUpdated: (state: State) => state.GrundBedarfUpdateBeforePostDatasState.updated,
  getFailed: (state: State) => state.GrundBedarfUpdateBeforePostDatasState.failed
};

export const getStatusCodeData = {
  getDatas: (state: State) => state.LoadStatusCodeDatasState.data,
  getLoading: (state: State) => state.LoadStatusCodeDatasState.loading,
  getLoaded: (state: State) => state.LoadStatusCodeDatasState.loaded,
  getFailed: (state: State) => state.LoadStatusCodeDatasState.failed
};

export const getShStatusCodeToSqlData = {
  getDatas: (state: State) => state.ShStatusCodeToSqlDatasState.data,
  getLoading: (state: State) => state.ShStatusCodeToSqlDatasState.loading,
  getLoaded: (state: State) => state.ShStatusCodeToSqlDatasState.loaded,
  getFailed: (state: State) => state.ShStatusCodeToSqlDatasState.failed
};
