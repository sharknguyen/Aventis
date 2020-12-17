import { AppEntityCustomState } from '@shared/AppAction';
import { SpezialkontoActions, SpezialkontoActionTypes } from '../actions/speziaikonto.actions';

interface MasterDataInitDatasState extends AppEntityCustomState<any, any> { }
interface LoadGridTopInitDatasState extends AppEntityCustomState<any, any> { }
interface LoadGridDetailInitDatasState extends AppEntityCustomState<any, any> { }
interface LoadBaPersonInitDatasState extends AppEntityCustomState<any, any> { }
interface LoadBgKostenartInitDatasState extends AppEntityCustomState<any, any> { }
interface LoadDatumVontInitDatasState extends AppEntityCustomState<any, any> { }
interface LoadBgPosArttInitDatasState extends AppEntityCustomState<any, any> { }
interface LoadPositionsartenInitDatasState extends AppEntityCustomState<any, any> { }
interface CreateDatasState extends AppEntityCustomState<any, any> { }
interface AbschliessenVisible extends AppEntityCustomState<any, any> { }
interface MaxSanktionDataState extends AppEntityCustomState<any, any> { }
interface UpdateKuzungenDataState extends AppEntityCustomState<any, any> { }
interface CreateKuzungenDataState extends AppEntityCustomState<any, any> { }

interface AbschliessenUndoDataState extends AppEntityCustomState<any, any> {
  data: any;
  dataFail: any;
}
interface AbschliessenEditierbarDataState extends AppEntityCustomState<any, any> { }
interface KontoWirdNichtAusgeglichenDataState extends AppEntityCustomState<any, any> {
  data: any;
  dataFail: any;
}
interface UebergabeAnInkassoDataState extends AppEntityCustomState<any, any> {
  data: any;
  dataFail: any;
}

interface EditDatasState extends AppEntityCustomState<any, any> {
  data: any;
  dataFail: any;
}
interface DeleteDatasState extends AppEntityCustomState<any, any> {
  data: any;
  dataFail: any;
}
export interface State {
  MasterDataInitDatasState: MasterDataInitDatasState;
  LoadGridTopInitDatasState: LoadGridTopInitDatasState;
  LoadGridDetailInitDatasState: LoadGridDetailInitDatasState;
  LoadBaPersonInitDatasState: LoadBaPersonInitDatasState;
  LoadBgKostenartInitDatasState: LoadBgKostenartInitDatasState;
  LoadDatumVontInitDatasState: LoadDatumVontInitDatasState;
  LoadBgPosArttInitDatasState: LoadBgPosArttInitDatasState;
  CreateDatasState: CreateDatasState;
  EditDatasState: EditDatasState;
  DeleteDatasState: DeleteDatasState;
  LoadPositionsartenInitDatasState: LoadPositionsartenInitDatasState;
  AbschliessenVisible: AbschliessenVisible;
  MaxSanktionDataState: MaxSanktionDataState;
  AbschliessenUndoDataState: AbschliessenUndoDataState;
  KontoWirdNichtAusgeglichenDataState: KontoWirdNichtAusgeglichenDataState;
  UebergabeAnInkassoDataState: UebergabeAnInkassoDataState;
  AbschliessenEditierbarDataState: AbschliessenEditierbarDataState;
  UpdateKuzungenDataState: UpdateKuzungenDataState;
  CreateKuzungenDataState: CreateKuzungenDataState;

}

export const initialState: State = {
  MasterDataInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  LoadGridTopInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  LoadGridDetailInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  LoadBaPersonInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  LoadBgKostenartInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  LoadDatumVontInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  LoadBgPosArttInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  CreateDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  EditDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
    dataFail: null
  },
  DeleteDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
    dataFail: null
  },
  LoadPositionsartenInitDatasState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  AbschliessenVisible: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  MaxSanktionDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  AbschliessenUndoDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
    dataFail: null
  },
  KontoWirdNichtAusgeglichenDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
    dataFail: null
  },
  UebergabeAnInkassoDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
    dataFail: null
  },
  AbschliessenEditierbarDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  UpdateKuzungenDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  CreateKuzungenDataState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  }
};

export function reducer(state = initialState, action: SpezialkontoActions): State {
  if (!action) { return state; }
  switch (action.type) {
    case SpezialkontoActionTypes.SpezialkontoAction:
      return state;

    //#region  Load combobox MasterData
    case SpezialkontoActionTypes.MasterCCBDatasTypes.LOAD: {
      return Object.assign({}, state, {
        MasterDataInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.MasterCCBDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        MasterDataInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.MasterCCBDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        MasterDataInitDatasState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }
    //#endregion

    //#region  Load Data Grid Top
    case SpezialkontoActionTypes.LoadGridTopDatasTypes.LOAD: {
      return Object.assign({}, state, {
        LoadGridTopInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.LoadGridTopDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LoadGridTopInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.LoadGridTopDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LoadGridTopInitDatasState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }
    //#endregion

    //#region  Load Grid Detail
    case SpezialkontoActionTypes.LoadGridDetailDatasTypes.LOAD: {
      return Object.assign({}, state, {
        LoadGridDetailInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.LoadGridDetailDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LoadGridDetailInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.LoadGridDetailDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LoadGridDetailInitDatasState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }
    //#endregion

    //#region  Load Ba Person
    case SpezialkontoActionTypes.LoadBaPersonDatasTypes.LOAD: {
      return Object.assign({}, state, {
        LoadBaPersonInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.LoadBaPersonDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LoadBaPersonInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.LoadBaPersonDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LoadBaPersonInitDatasState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }
    //#endregion

    //#region  Load BgKostenart
    case SpezialkontoActionTypes.LoadBgKostenartDatasTypes.LOAD: {
      return Object.assign({}, state, {
        LoadBgKostenartInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.LoadBgKostenartDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LoadBgKostenartInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.LoadBgKostenartDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LoadBgKostenartInitDatasState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }
    //#endregion

    //#region  Load DatumVon
    case SpezialkontoActionTypes.LoadDatumVonDatasTypes.LOAD: {
      return Object.assign({}, state, {
        LoadDatumVontInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.LoadDatumVonDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LoadDatumVontInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.LoadDatumVonDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LoadDatumVontInitDatasState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }
    //#endregion

    //#region  Load BgPosArt
    case SpezialkontoActionTypes.LoadBgPosArtDatasTypes.LOAD: {
      return Object.assign({}, state, {
        LoadBgPosArttInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.LoadBgPosArtDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LoadBgPosArttInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.LoadBgPosArtDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LoadBgPosArttInitDatasState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }
    //#endregion

    //#region Create
    case SpezialkontoActionTypes.CreateDatasTypes.LOAD: {
      return Object.assign({}, state, {
        CreateDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.CreateDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        CreateDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.CreateDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        CreateDatasState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }
    //#endregion

    //#region Edit
    case SpezialkontoActionTypes.EditDatasTypes.LOAD: {
      return Object.assign({}, state, {
        EditDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.EditDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        EditDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.EditDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        EditDatasState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          dataFail: action.payload,
        }
      });
    }
    //#endregion

    //#region Delete
    case SpezialkontoActionTypes.DeleteDatasTypes.LOAD: {
      return Object.assign({}, state, {
        DeleteDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.DeleteDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        DeleteDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.DeleteDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        DeleteDatasState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          dataFail: action.payload
        }
      });
    }
    //#endregion

    //#region LoadPositionsarten
    case SpezialkontoActionTypes.LoadPositionsartenDatasTypes.LOAD: {
      return Object.assign({}, state, {
        LoadPositionsartenInitDatasState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.LoadPositionsartenDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        LoadPositionsartenInitDatasState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.LoadPositionsartenDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        LoadPositionsartenInitDatasState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          dataFail: action.payload
        }
      });
    }
    //#endregion

    //#region AbschliessenVisible
    case SpezialkontoActionTypes.AbschliessenVisibleDatasTypes.LOAD: {
      return Object.assign({}, state, {
        AbschliessenVisible: {
          loading: true,
          query: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.AbschliessenVisibleDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        AbschliessenVisible: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.AbschliessenVisibleDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        AbschliessenVisible: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          dataFail: action.payload
        }
      });
    }
    //#endregion

    //#region MaxSanktion
    case SpezialkontoActionTypes.MaxSanktionDatasTypes.LOAD: {
      return Object.assign({}, state, {
        MaxSanktionDataState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.MaxSanktionDatasTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        MaxSanktionDataState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.MaxSanktionDatasTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        MaxSanktionDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          dataFail: action.payload
        }
      });
    }
    case SpezialkontoActionTypes.ResetDatasTypes.RESET: {
      state = initialState;
      return state;
    }
    //#region Undo
    case SpezialkontoActionTypes.AbschliessenUndoTypes.LOAD: {
      return Object.assign({}, state, {
        AbschliessenUndoDataState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.AbschliessenUndoTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        AbschliessenUndoDataState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.AbschliessenUndoTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        AbschliessenUndoDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          dataFail: action.payload
        }
      });
    }
    //#region Undo
    case SpezialkontoActionTypes.AbschliessenEditierbarTypes.LOAD: {
      return Object.assign({}, state, {
        AbschliessenEditierbarDataState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.AbschliessenEditierbarTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        AbschliessenEditierbarDataState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.AbschliessenEditierbarTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        AbschliessenEditierbarDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          dataFail: action.payload
        }
      });
    }

    //#region Undo
    case SpezialkontoActionTypes.KontoWirdNichtAusgeglichenTypes.LOAD: {
      return Object.assign({}, state, {
        KontoWirdNichtAusgeglichenDataState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.KontoWirdNichtAusgeglichenTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        KontoWirdNichtAusgeglichenDataState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.KontoWirdNichtAusgeglichenTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        KontoWirdNichtAusgeglichenDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          dataFail: action.payload
        }
      });
    }

    //#region Undo
    case SpezialkontoActionTypes.UebergabeAnInkassoTypes.LOAD: {
      return Object.assign({}, state, {
        UebergabeAnInkassoDataState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.UebergabeAnInkassoTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        UebergabeAnInkassoDataState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.UebergabeAnInkassoTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        UebergabeAnInkassoDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          dataFail: action.payload
        }
      });
    }
    //#endregion

    //#region Update Kuzungen
    case SpezialkontoActionTypes.UpdateKuzungenTypes.LOAD: {
      return Object.assign({}, state, {
        UpdateKuzungenDataState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.UpdateKuzungenTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        UpdateKuzungenDataState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.UpdateKuzungenTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        UpdateKuzungenDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }
    //#endregion

    //#region Create Kuzungen
    case SpezialkontoActionTypes.CreateKuzungenTypes.LOAD: {
      return Object.assign({}, state, {
        CreateKuzungenDataState: {
          loading: true,
          query: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.CreateKuzungenTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        CreateKuzungenDataState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SpezialkontoActionTypes.CreateKuzungenTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        CreateKuzungenDataState: {
          loading: false,
          loaded: false,
          failed: true,
          query: null,
          data: action.payload
        }
      });
    }
    //#endregion

    default:
      return state;
  }
}

export const MasterDataCBBInit = {
  getDatas: (state: State) => state.MasterDataInitDatasState.data,
  getLoading: (state: State) => state.MasterDataInitDatasState.loading,
  getLoaded: (state: State) => state.MasterDataInitDatasState.loaded,
  getFailed: (state: State) => state.MasterDataInitDatasState.failed
};

export const LoadDataGridTopInit = {
  getDatas: (state: State) => state.LoadGridTopInitDatasState.data,
  getLoading: (state: State) => state.LoadGridTopInitDatasState.loading,
  getLoaded: (state: State) => state.LoadGridTopInitDatasState.loaded,
  getFailed: (state: State) => state.LoadGridTopInitDatasState.failed
};

export const LoadDataGridDetailInit = {
  getDatas: (state: State) => state.LoadGridDetailInitDatasState.data,
  getLoading: (state: State) => state.LoadGridDetailInitDatasState.loading,
  getLoaded: (state: State) => state.LoadGridDetailInitDatasState.loaded,
  getFailed: (state: State) => state.LoadGridDetailInitDatasState.failed
};

export const LoadBaPersonInit = {
  getDatas: (state: State) => state.LoadBaPersonInitDatasState.data,
  getLoading: (state: State) => state.LoadBaPersonInitDatasState.loading,
  getLoaded: (state: State) => state.LoadBaPersonInitDatasState.loaded,
  getFailed: (state: State) => state.LoadBaPersonInitDatasState.failed
};

export const LoadBgKostenartInit = {
  getDatas: (state: State) => state.LoadBgKostenartInitDatasState.data,
  getLoading: (state: State) => state.LoadBgKostenartInitDatasState.loading,
  getLoaded: (state: State) => state.LoadBgKostenartInitDatasState.loaded,
  getFailed: (state: State) => state.LoadBgKostenartInitDatasState.failed
};

export const LoadDatumVonInit = {
  getDatas: (state: State) => state.LoadDatumVontInitDatasState.data,
  getLoading: (state: State) => state.LoadDatumVontInitDatasState.loading,
  getLoaded: (state: State) => state.LoadDatumVontInitDatasState.loaded,
  getFailed: (state: State) => state.LoadDatumVontInitDatasState.failed
};

export const LoadBgPosArtInit = {
  getDatas: (state: State) => state.LoadBgPosArttInitDatasState.data,
  getLoading: (state: State) => state.LoadBgPosArttInitDatasState.loading,
  getLoaded: (state: State) => state.LoadBgPosArttInitDatasState.loaded,
  getFailed: (state: State) => state.LoadBgPosArttInitDatasState.failed
};

export const CreateDataInit = {
  getDatas: (state: State) => state.CreateDatasState.data,
  getLoading: (state: State) => state.CreateDatasState.loading,
  getLoaded: (state: State) => state.CreateDatasState.loaded,
  getFailed: (state: State) => state.CreateDatasState.failed
};

export const EditDataInit = {
  getDatas: (state: State) => state.EditDatasState.data,
  getLoading: (state: State) => state.EditDatasState.loading,
  getLoaded: (state: State) => state.EditDatasState.loaded,
  getFailed: (state: State) => state.EditDatasState.dataFail
};

export const DeleteDataInit = {
  getDatas: (state: State) => state.DeleteDatasState.data,
  getLoading: (state: State) => state.DeleteDatasState.loading,
  getLoaded: (state: State) => state.DeleteDatasState.loaded,
  getFailed: (state: State) => state.DeleteDatasState.dataFail
};

export const PositionsartenDataInit = {
  getDatas: (state: State) => state.LoadPositionsartenInitDatasState.data,
  getLoading: (state: State) => state.LoadPositionsartenInitDatasState.loading,
  getLoaded: (state: State) => state.LoadPositionsartenInitDatasState.loaded,
  getFailed: (state: State) => state.LoadPositionsartenInitDatasState.failed
};

export const AbschliessenVisibleDataInit = {
  getDatas: (state: State) => state.AbschliessenVisible.data,
  getLoading: (state: State) => state.AbschliessenVisible.loading,
  getLoaded: (state: State) => state.AbschliessenVisible.loaded,
  getFailed: (state: State) => state.AbschliessenVisible.failed
};

export const MaxSanktionDataInit = {
  getDatas: (state: State) => state.MaxSanktionDataState.data,
  getLoading: (state: State) => state.MaxSanktionDataState.loading,
  getLoaded: (state: State) => state.MaxSanktionDataState.loaded,
  getFailed: (state: State) => state.MaxSanktionDataState.failed
};
export const AbschliessenUndoDataInit = {
  getDatas: (state: State) => state.AbschliessenUndoDataState.data,
  getLoading: (state: State) => state.AbschliessenUndoDataState.loading,
  getLoaded: (state: State) => state.AbschliessenUndoDataState.loaded,
  getFailed: (state: State) => state.AbschliessenUndoDataState.dataFail
};
export const AbschliessenEditierbarDataInit = {
  getDatas: (state: State) => state.AbschliessenEditierbarDataState.data,
  getLoading: (state: State) => state.AbschliessenEditierbarDataState.loading,
  getLoaded: (state: State) => state.AbschliessenEditierbarDataState.loaded,
  getFailed: (state: State) => state.AbschliessenEditierbarDataState.failed
};
export const KontoWirdNichtAusgeglichenDataInit = {
  getDatas: (state: State) => state.KontoWirdNichtAusgeglichenDataState.data,
  getLoading: (state: State) => state.KontoWirdNichtAusgeglichenDataState.loading,
  getLoaded: (state: State) => state.KontoWirdNichtAusgeglichenDataState.loaded,
  getFailed: (state: State) => state.KontoWirdNichtAusgeglichenDataState.dataFail
};
export const UebergabeAnInkassoDataInit = {
  getDatas: (state: State) => state.UebergabeAnInkassoDataState.data,
  getLoading: (state: State) => state.UebergabeAnInkassoDataState.loading,
  getLoaded: (state: State) => state.UebergabeAnInkassoDataState.loaded,
  getFailed: (state: State) => state.UebergabeAnInkassoDataState.dataFail
};

export const UpdateKuzungenDataInit = {
  getDatas: (state: State) => state.UpdateKuzungenDataState.data,
  getLoading: (state: State) => state.UpdateKuzungenDataState.loading,
  getLoaded: (state: State) => state.UpdateKuzungenDataState.loaded,
  getFailed: (state: State) => state.UpdateKuzungenDataState.failed
};

export const CreateKuzungenDataInit = {
  getDatas: (state: State) => state.CreateKuzungenDataState.data,
  getLoading: (state: State) => state.CreateKuzungenDataState.loading,
  getLoaded: (state: State) => state.CreateKuzungenDataState.loaded,
  getFailed: (state: State) => state.CreateKuzungenDataState.failed
};
