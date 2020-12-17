import { AppEntityCustomState } from '@shared/AppAction';

import { LandesxindexActions, LandesxindexActionTypes } from '../actions/landesxindex.action';

interface LandesxindexInitDatasState extends AppEntityCustomState<any, number> { }
interface GetLandesindexWertDatasState extends AppEntityCustomState<any, number> { }
interface LandesxindexDeleteDatasState extends AppEntityCustomState<any, any> {
  deleting: false;
  deleted: false;
}
interface LandesxindexWertByIkLandesindexIDDeleteDatasState extends AppEntityCustomState<any> {
  deleting: false;
  deleted: false;
}
interface LandesxindexWertDeleteDatasState extends AppEntityCustomState<any, any> {
  deleting: false;
  deleted: false;
}
interface LandesxindexUpdateDatasState extends AppEntityCustomState<any, any> {
  updating: false;
  updated: false;
}
interface LandesindexAddDataState extends AppEntityCustomState<any, any> {
  adding: false;
  added: false;
}
interface AddLandesindexWertErfassenState extends AppEntityCustomState<any, any> {
  adding: false;
  added: false;
}
interface LoadIkLandesindexState extends AppEntityCustomState<any, any> { }
interface LoadCountIkLandesindexWertState extends AppEntityCustomState<any, any> { }
interface LoadNameIkLandesindexState extends AppEntityCustomState<any, any> { }
interface LandesidexGetWertState extends AppEntityCustomState<any, any> { }
interface AddWertbyLandesIndexState extends AppEntityCustomState<any, any> {
  adding: false;
  added: false;
}
interface UpdateWertState extends AppEntityCustomState<any, any> {
  updating: false;
  updated: false;
}
interface AddWertState extends AppEntityCustomState<any, any> {
  adding: false;
  added: false;
}

export interface State {
  LandesxindexInitDatasState: LandesxindexInitDatasState;
  LandesxindexDeleteDatasState: LandesxindexDeleteDatasState;
  GetLandesindexWertDatasState: GetLandesindexWertDatasState;
  LandesxindexWertByIkLandesindexIDDeleteDatasState: LandesxindexWertByIkLandesindexIDDeleteDatasState;
  LandesxindexWertDeleteDatasState: LandesxindexWertDeleteDatasState;
  LandesxindexUpdateDatasState: LandesxindexUpdateDatasState;
  LandesindexAddDataState: LandesindexAddDataState;
  LandesidexGetWertSate: LandesidexGetWertState;
  AddLandesindexWertErfassenState: AddLandesindexWertErfassenState;
  LoadIkLandesindexState: LoadIkLandesindexState;
  AddWertbyLandesIndexState: AddWertbyLandesIndexState;
  LoadCountIkLandesindexWertState: LoadCountIkLandesindexWertState;
  LoadNameIkLandesindexState: LoadNameIkLandesindexState;
  UpdateWertState: UpdateWertState;
  AddWertState: AddWertState;
}

export const initialState: State = {
  LandesxindexInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  LandesxindexDeleteDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    deleting: false,
    deleted: false,
    query: null,
    data: null,
  },
  LandesxindexWertByIkLandesindexIDDeleteDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    deleting: false,
    deleted: false,
    query: null,
    data: null,
  },
  GetLandesindexWertDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  LandesxindexWertDeleteDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    deleting: false,
    deleted: false,
    data: null,
  },
  LandesxindexUpdateDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    updating: false,
    updated: false,
    data: null,
  },
  LandesindexAddDataState: {
    loading: false,
    loaded: false,
    adding: false,
    added: false,
    failed: false,
    query: null,
    data: null,
  },
  AddLandesindexWertErfassenState: {
    loading: false,
    loaded: false,
    adding: false,
    added: false,
    failed: false,
    query: null,
    data: null
  },
  LoadIkLandesindexState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  LandesidexGetWertSate: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  AddWertbyLandesIndexState: {
    loading: false,
    loaded: false,
    adding: false,
    added: false,
    failed: false,
    query: null,
    data: null,
  },
  LoadCountIkLandesindexWertState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  LoadNameIkLandesindexState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  UpdateWertState: {
    loading: false,
    loaded: false,
    failed: false,
    updating: false,
    updated: false,
    data: null,
  },
  AddWertState: {
    loading: false,
    loaded: false,
    adding: false,
    added: false,
    failed: false,
    query: null,
    data: null,
  }
};

export function reducer(state = initialState, action: LandesxindexActions): State {
  if (!action) { return state; }
  switch (action.type) {
    case LandesxindexActionTypes.LandesxindexAction:
      return state;

    case LandesxindexActionTypes.LandesxindexTypes.LOAD: {
      return Object.assign({}, state, {
        LandesxindexInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case LandesxindexActionTypes.LandesxindexTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LandesxindexInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }
    case LandesxindexActionTypes.LandesxindexTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LandesxindexInitDatasState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
          query: null,
        }
      });
    }

    case LandesxindexActionTypes.LandesxindexGetDetailTypes.GETDETAIL: {
      return Object.assign({}, state, {
        GetLandesindexWertDatasState: {
          loading: true,
          loaded: false,
          failed: false,
          query: null,
          data: null
        }
      });
    }
    case LandesxindexActionTypes.LandesxindexGetDetailTypes.GETDETAIL_SUCCESS: {
      return Object.assign({}, state, {
        GetLandesindexWertDatasState: {
          loading: false,
          loaded: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }
    case LandesxindexActionTypes.LandesxindexGetDetailTypes.GETDETAIL_FAIL: {
      return Object.assign({}, state, {
        GetLandesindexWertDatasState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }

    case LandesxindexActionTypes.LandesxindexDeleteTypes.DELETE: {
      return Object.assign({}, state, {
        LandesxindexDeleteDatasState: {
          deleting: true,
          deleted: false,
          failed: false,
          data: null,
          query: null,
        }
      });
    }
    case LandesxindexActionTypes.LandesxindexDeleteTypes.DELETE_SUCCESS: {
      return Object.assign({}, state, {
        LandesxindexDeleteDatasState: {
          deleting: false,
          deleted: true,
          failed: false,
          query: null,
          data: action.payload,
        }
      });
    }
    case LandesxindexActionTypes.LandesxindexDeleteTypes.DELETE_FAIL: {
      return Object.assign({}, state, {
        LandesxindexDeleteDatasState: {
          deleting: false,
          deleted: false,
          failed: true,
          query: null,
          data: action.payload,
        }
      });
    }

    case LandesxindexActionTypes.LandesxindexWertByIkLandesindexIDDeleteTypes.DELETE_WERT: {
      return Object.assign({}, state, {
        LandesxindexWertByIkLandesindexIDDeleteDatasState: {
          deleting: true,
          deleted: false,
          failed: false,
          data: null,
          query: null,
        }
      });
    }
    case LandesxindexActionTypes.LandesxindexWertByIkLandesindexIDDeleteTypes.DELETE_WERT_SUCCESS: {
      return Object.assign({}, state, {
        LandesxindexWertByIkLandesindexIDDeleteDatasState: {
          deleting: false,
          deleted: true,
          failed: false,
          query: null,
          data: action.payload,
        }
      });
    }
    case LandesxindexActionTypes.LandesxindexWertByIkLandesindexIDDeleteTypes.DELETE_WERT_FAIL: {
      return Object.assign({}, state, {
        LandesxindexWertByIkLandesindexIDDeleteDatasState: {
          deleting: false,
          deleted: false,
          failed: true,
          query: null,
          data: action.payload,
        }
      });
    }

    case LandesxindexActionTypes.LandesxindexWertDeleteTypes.DELETE_WERT: {
      return Object.assign({}, state, {
        LandesxindexWertDeleteDatasState: {
          deleting: true,
          deleted: false,
          failed: false,
          data: null,
          query: action.payload
        }
      });
    }
    case LandesxindexActionTypes.LandesxindexWertDeleteTypes.DELETE_WERT_SUCCESS: {
      return Object.assign({}, state, {
        LandesxindexWertDeleteDatasState: {
          deleting: false,
          deleted: true,
          failed: false,
          data: action.payload,
        }
      });
    }
    case LandesxindexActionTypes.LandesxindexWertDeleteTypes.DELETE_WERT_FAIL: {
      return Object.assign({}, state, {
        LandesxindexWertDeleteDatasState: {
          deleting: false,
          deleted: false,
          failed: true,
          data: action.payload,
        }
      });
    }

    case LandesxindexActionTypes.LandesxindexesUpdateTypes.UPDATE_LANDES: {
      return Object.assign({}, state, {
        LandesxindexUpdateDatasState: {
          updating: true,
          updated: false,
          failed: false,
          data: null
        }
      });
    }
    case LandesxindexActionTypes.LandesxindexesUpdateTypes.UPDATE_LANDES_SUCCESS: {
      return Object.assign({}, state, {
        LandesxindexUpdateDatasState: {
          updating: false,
          updated: true,
          failed: false,
          data: action.payload
        }
      });
    }
    case LandesxindexActionTypes.LandesxindexesUpdateTypes.UPDATE_LANDES_FAIL: {
      return Object.assign({}, state, {
        LandesxindexUpdateDatasState: {
          adding: false,
          added: false,
          failed: true,
          data: action.payload
        }
      });
    }

    case LandesxindexActionTypes.AddLandesindexGridtop.ADD: {
      return Object.assign({}, state, {
        LandesindexAddDataState: {
          adding: true,
          query: action.payload,
        }
      });
    }
    case LandesxindexActionTypes.AddLandesindexGridtop.ADD_SUCCESS: {
      return Object.assign({}, state, {
        LandesindexAddDataState: {
          adding: false,
          added: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }
    case LandesxindexActionTypes.AddLandesindexGridtop.ADD_FAIL: {
      return Object.assign({}, state, {
        LandesindexAddDataState: {
          adding: false,
          added: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }

    case LandesxindexActionTypes.AddLandesindexWertErfassenTypes.ADD: {
      return Object.assign({}, state, {
        AddLandesindexWertErfassenState: {
          added: false,
          adding: true,
          failed: false,
          query: action.payload,
          data: null
        }
      });
    }
    case LandesxindexActionTypes.AddLandesindexWertErfassenTypes.ADD_SUCCESS: {
      return Object.assign({}, state, {
        AddLandesindexWertErfassenState: {
          added: true,
          adding: false,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }
    case LandesxindexActionTypes.AddLandesindexWertErfassenTypes.ADD_FAIL: {
      return Object.assign({}, state, {
        AddLandesindexWertErfassenState: {
          added: false,
          adding: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }

    case LandesxindexActionTypes.IkLandesindexTypes.LOAD: {
      return Object.assign({}, state, {
        LoadIkLandesindexState: {
          loaded: false,
          loading: true,
          failed: false,
          query: action.payload,
          data: null
        }
      });
    }
    case LandesxindexActionTypes.IkLandesindexTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LoadIkLandesindexState: {
          loaded: true,
          loading: false,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }
    case LandesxindexActionTypes.IkLandesindexTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LoadIkLandesindexState: {
          loaded: false,
          loading: false,
          failed: true,
          query: null,
          data: null
        }
      });
    }

    case LandesxindexActionTypes.CountIkLandesindexWertTypes.LOAD: {
      return Object.assign({}, state, {
        LoadCountIkLandesindexWertState: {
          loaded: false,
          loading: true,
          failed: false,
          query: action.payload,
          data: null
        }
      });
    }
    case LandesxindexActionTypes.CountIkLandesindexWertTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LoadCountIkLandesindexWertState: {
          loaded: true,
          loading: false,
          failed: false,
          query: state.LoadCountIkLandesindexWertState.query,
          data: action.payload
        }
      });
    }
    case LandesxindexActionTypes.CountIkLandesindexWertTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LoadCountIkLandesindexWertState: {
          loaded: false,
          loading: false,
          failed: true,
          query: null,
          data: null
        }
      });
    }

    case LandesxindexActionTypes.NameIkLandesindexTypes.LOAD: {
      return Object.assign({}, state, {
        LoadNameIkLandesindexState: {
          loaded: false,
          loading: true,
          failed: false,
          query: action.payload,
          data: null
        }
      });
    }
    case LandesxindexActionTypes.NameIkLandesindexTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LoadNameIkLandesindexState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case LandesxindexActionTypes.NameIkLandesindexTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LoadNameIkLandesindexState: {
          loaded: false,
          loading: false,
          failed: true,
          query: null,
          data: null
        }
      });
    }

    case LandesxindexActionTypes.GetWert.LOAD: {
      return Object.assign({}, state, {
        LandesidexGetWertSate: {
          loading: true,
          query: action.payload,
          data: state.LandesidexGetWertSate.data,
        }
      });
    }
    case LandesxindexActionTypes.GetWert.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LandesidexGetWertSate: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload,
          query: null,
        }
      });
    }
    case LandesxindexActionTypes.GetWert.LOAD_FAIL: {
      return Object.assign({}, state, {
        LandesidexGetWertSate: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload,
          query: null,
        }
      });
    }

    case LandesxindexActionTypes.AddWertByIkLandesindex.ADD: {
      return Object.assign({}, state, {
        AddWertbyLandesIndexState: {
          adding: true,
          query: action.payload,
        }
      });
    }
    case LandesxindexActionTypes.AddWertByIkLandesindex.ADD_SUCCESS: {
      return Object.assign({}, state, {
        AddWertbyLandesIndexState: {
          adding: false,
          added: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }
    case LandesxindexActionTypes.AddWertByIkLandesindex.ADD_FAIL: {
      return Object.assign({}, state, {
        AddWertbyLandesIndexState: {
          adding: false,
          added: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }

    case LandesxindexActionTypes.UpdateWert.UPDATE: {
      return Object.assign({}, state, {
        UpdateWertState: {
          updating: true,
          updated: false,
          failed: false,
          data: null
        }
      });
    }
    case LandesxindexActionTypes.UpdateWert.UPDATE_FAIL: {
      return Object.assign({}, state, {
        UpdateWertState: {
          adding: false,
          added: false,
          failed: true,
          data: action.payload
        }
      });
    }
    case LandesxindexActionTypes.UpdateWert.UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        UpdateWertState: {
          updating: false,
          updated: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case LandesxindexActionTypes.AddWertTypes.ADD: {
      return Object.assign({}, state, {
        AddWertState: {
          adding: true,
          query: action.payload,
        }
      });
    }
    case LandesxindexActionTypes.AddWertTypes.ADD_SUCCESS: {
      return Object.assign({}, state, {
        AddWertState: {
          adding: false,
          added: true,
          failed: false,
          query: null,
          data: action.payload
        }
      });
    }
    case LandesxindexActionTypes.AddWertTypes.ADD_FAIL: {
      return Object.assign({}, state, {
        AddWertState: {
          adding: false,
          added: false,
          failed: true,
          query: null,
          data: null
        }
      });
    }
    default:
      return state;
  }
}


export const getLandesxindexInit = {
  getDatas: (state: State) => state.LandesxindexInitDatasState.data,
  getLoading: (state: State) => state.LandesxindexInitDatasState.loading,
  getLoaded: (state: State) => state.LandesxindexInitDatasState.loaded,
  getFailed: (state: State) => state.LandesxindexInitDatasState.failed
};

export const getDeleteLandesxindex = {
  getDatas: (state: State) => state.LandesxindexDeleteDatasState.data,
  getDeleting: (state: State) => state.LandesxindexDeleteDatasState.deleting,
  getDeleted: (state: State) => state.LandesxindexDeleteDatasState.deleted,
  getFailed: (state: State) => state.LandesxindexDeleteDatasState.failed
};

export const getLandesindexWert = {
  getDatas: (state: State) => state.GetLandesindexWertDatasState.data,
  getLoading: (state: State) => state.GetLandesindexWertDatasState.loading,
  getLoaded: (state: State) => state.GetLandesindexWertDatasState.loaded,
  getFailed: (state: State) => state.GetLandesindexWertDatasState.failed
};

export const getDeleteLandesxindexWertByIkLandesindexID = {
  getDatas: (state: State) => state.LandesxindexWertByIkLandesindexIDDeleteDatasState.data,
  getDeleting: (state: State) => state.LandesxindexWertByIkLandesindexIDDeleteDatasState.deleting,
  getDeleted: (state: State) => state.LandesxindexWertByIkLandesindexIDDeleteDatasState.deleted,
  getFailed: (state: State) => state.LandesxindexWertByIkLandesindexIDDeleteDatasState.failed
};

export const getDeleteLandesxindexWert = {
  getDatas: (state: State) => state.LandesxindexWertDeleteDatasState.data,
  getDeleting: (state: State) => state.LandesxindexWertDeleteDatasState.deleting,
  getDeleted: (state: State) => state.LandesxindexWertDeleteDatasState.deleted,
  getFailed: (state: State) => state.LandesxindexWertDeleteDatasState.failed
};

export const getUpdateLandesindex = {
  getDatas: (state: State) => state.LandesxindexUpdateDatasState.data,
  getUpdating: (state: State) => state.LandesxindexUpdateDatasState.updating,
  getUpdated: (state: State) => state.LandesxindexUpdateDatasState.updated,
  getFailed: (state: State) => state.LandesxindexUpdateDatasState.failed
};

export const getAddLandesindex = {
  getDatas: (state: State) => state.LandesindexAddDataState.data,
  getAdding: (state: State) => state.LandesindexAddDataState.adding,
  getAdded: (state: State) => state.LandesindexAddDataState.added,
  getFailed: (state: State) => state.LandesindexAddDataState.failed
};

export const getIkLandesindex = {
  getDatas: (state: State) => state.LoadIkLandesindexState.data,
  getLoading: (state: State) => state.LoadIkLandesindexState.loading,
  getLoaded: (state: State) => state.LoadIkLandesindexState.loaded,
  getFailed: (state: State) => state.LoadIkLandesindexState.failed
};

export const getWert = {
  getDatas: (state: State) => state.LandesidexGetWertSate.data,
  getLoadding: (state: State) => state.LandesidexGetWertSate.loading,
  getLoadded: (state: State) => state.LandesidexGetWertSate.loaded,
  getFailed: (state: State) => state.LandesidexGetWertSate.failed
};

export const addLandesWertByLandesIndex = {
  getDatas: (state: State) => state.AddWertbyLandesIndexState.data,
  getAdding: (state: State) => state.AddWertbyLandesIndexState.adding,
  getAdded: (state: State) => state.AddWertbyLandesIndexState.added,
  getFailed: (state: State) => state.AddWertbyLandesIndexState.failed
};

export const getCountIkLandesindexWert = {
  getDatas: (state: State) => state.LoadCountIkLandesindexWertState.data,
  getLoading: (state: State) => state.LoadCountIkLandesindexWertState.loading,
  getLoaded: (state: State) => state.LoadCountIkLandesindexWertState.loaded,
  getFailed: (state: State) => state.LoadCountIkLandesindexWertState.failed,
  getState: (state: State) => state.LoadCountIkLandesindexWertState,
};

export const getNameIkLandesindex = {
  getDatas: (state: State) => state.LoadNameIkLandesindexState.data,
  getLoading: (state: State) => state.LoadNameIkLandesindexState.loading,
  getLoaded: (state: State) => state.LoadNameIkLandesindexState.loaded,
  getFailed: (state: State) => state.LoadNameIkLandesindexState.failed,
  getState: (state: State) => state.LoadNameIkLandesindexState,
};

export const getAddLandesindexWertErfassen = {
  getDatas: (state: State) => state.AddLandesindexWertErfassenState.data,
  getLoading: (state: State) => state.AddLandesindexWertErfassenState.loading,
  getLoaded: (state: State) => state.AddLandesindexWertErfassenState.loaded,
  getFailed: (state: State) => state.AddLandesindexWertErfassenState.failed
};

export const getUpdateWert = {
  getDatas: (state: State) => state.UpdateWertState.data,
  getUpdating: (state: State) => state.UpdateWertState.updating,
  getUpdated: (state: State) => state.UpdateWertState.updated,
  getFailed: (state: State) => state.UpdateWertState.failed
};

export const getAddWert = {
  getDatas: (state: State) => state.AddWertState.data,
  getAdding: (state: State) => state.AddWertState.adding,
  getAdded: (state: State) => state.AddWertState.added,
  getFailed: (state: State) => state.AddWertState.failed
};
