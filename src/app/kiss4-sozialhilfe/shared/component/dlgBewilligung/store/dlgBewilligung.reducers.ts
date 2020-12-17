import { AppEntityCustomState } from '@shared/AppAction';
import { DlgBewilligungActions, finanzplanActionTypes } from '@app/kiss4-sozialhilfe/shared/component/dlgBewilligung/store/dlgBewilligung.actions';
import { IFinanzplan, ICheck, IFinanzplanDropDown, IPersonenInfo, IFinanzplanSaveParam } from '@app/kiss4-sozialhilfe/shared/component/dlgBewilligung/models';

const getInitState = () => {
  return {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  };
};

interface IFinanzplanHeaderState extends AppEntityCustomState<IPersonenInfo> { }
interface IFinanzplanState extends AppEntityCustomState<IFinanzplan> { }
interface IFinanzplanCheckState extends AppEntityCustomState<ICheck[]> { }
interface IFinanzplanGrundErState extends AppEntityCustomState<IFinanzplanDropDown[]> { }
interface IFinanzplanGrundAbState extends AppEntityCustomState<IFinanzplanDropDown[]> { }
interface IFinanzplanGrundbedarfTypeState extends AppEntityCustomState<IFinanzplanDropDown[]> { }
interface IFinanzplanTypeState extends AppEntityCustomState<IFinanzplanDropDown[]> { }
interface IFinanzplanBewilligungState extends AppEntityCustomState<IFinanzplanDropDown[]> { }

interface IFinanzplanSaveState extends AppEntityCustomState<any> { }
export interface IState {
  finanzplanHeaderState: IFinanzplanHeaderState;
  finanzplanState: IFinanzplanState;
  finanzplanCheckState: IFinanzplanCheckState;
  finanzplanGrundErState: IFinanzplanGrundErState;
  finanzplanGrundAbState: IFinanzplanGrundAbState;
  finanzplanGrundbedarfTypeState: IFinanzplanGrundbedarfTypeState;
  finanzplanTypeState: IFinanzplanTypeState;
  finanzplanBewilligungState: IFinanzplanBewilligungState;
  finanzplanSaveState: IFinanzplanSaveState;
}

export const initialState: IState = {
  finanzplanHeaderState: getInitState(),
  finanzplanState: getInitState(),
  finanzplanCheckState: getInitState(),
  finanzplanGrundErState: getInitState(),
  finanzplanGrundAbState: getInitState(),
  finanzplanGrundbedarfTypeState: getInitState(),
  finanzplanTypeState: getInitState(),
  finanzplanBewilligungState: getInitState(),
  finanzplanSaveState: getInitState(),
};

export function reducer(state = initialState, action: DlgBewilligungActions): IState {
  if (!action) { return state; }
  switch (action.type) {
    case finanzplanActionTypes.personenDataTypes.LOAD: {
      return Object.assign({}, state, {
        finanzplanHeaderState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case finanzplanActionTypes.personenDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        finanzplanHeaderState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case finanzplanActionTypes.personenDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        finanzplanHeaderState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    case finanzplanActionTypes.finanzplanDataTypes.LOAD: {
      return Object.assign({}, state, {
        finanzplanState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case finanzplanActionTypes.finanzplanDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        finanzplanState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case finanzplanActionTypes.finanzplanDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        finanzplanState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    case finanzplanActionTypes.finanzplanCheckDataTypes.LOAD: {
      return Object.assign({}, state, {
        finanzplanCheckState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case finanzplanActionTypes.finanzplanCheckDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        finanzplanCheckState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case finanzplanActionTypes.finanzplanCheckDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        finanzplanCheckState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    case finanzplanActionTypes.GrundErDataTypes.LOAD: {
      return Object.assign({}, state, {
        finanzplanGrundErState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case finanzplanActionTypes.GrundErDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        finanzplanGrundErState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case finanzplanActionTypes.GrundErDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        finanzplanGrundErState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    case finanzplanActionTypes.GrundAbDataTypes.LOAD: {
      return Object.assign({}, state, {
        finanzplanGrundAbState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case finanzplanActionTypes.GrundAbDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        finanzplanGrundAbState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case finanzplanActionTypes.GrundAbDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        finanzplanGrundAbState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    case finanzplanActionTypes.GrundbedarfTypeDataTypes.LOAD: {
      return Object.assign({}, state, {
        finanzplanGrundbedarfTypeState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case finanzplanActionTypes.GrundbedarfTypeDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        finanzplanGrundbedarfTypeState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case finanzplanActionTypes.GrundbedarfTypeDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        finanzplanGrundbedarfTypeState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    case finanzplanActionTypes.TypeDataTypes.LOAD: {
      return Object.assign({}, state, {
        finanzplanTypeState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case finanzplanActionTypes.TypeDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        finanzplanTypeState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case finanzplanActionTypes.TypeDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        finanzplanTypeState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    case finanzplanActionTypes.BewilligungStatusDataTypes.LOAD: {
      return Object.assign({}, state, {
        finanzplanBewilligungState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case finanzplanActionTypes.BewilligungStatusDataTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        finanzplanBewilligungState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case finanzplanActionTypes.BewilligungStatusDataTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        finanzplanBewilligungState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }
    case finanzplanActionTypes.FinanzplanSaveTypes.LOAD: {
      return Object.assign({}, state, {
        finanzplanSaveState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case finanzplanActionTypes.FinanzplanSaveTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        finanzplanSaveState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case finanzplanActionTypes.FinanzplanSaveTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        finanzplanSaveState: {
          loaded: false,
          loading: false,
          failed: true,
          data: action.payload
        }
      });
    }

    default:
      return state;
  }
}

export const getFinanzplanHeader = {
  getData: (state: IState) => state.finanzplanHeaderState.data,
};
export const getFinanzplan = {
  getData: (state: IState) => state.finanzplanState.data,
};
export const getFinanzplanCheck = {
  getData: (state: IState) => state.finanzplanCheckState.data,
};

export const getGrundEr = {
  getData: (state: IState) => state.finanzplanGrundErState.data,
};
export const getGrundAb = {
  getData: (state: IState) => state.finanzplanGrundAbState.data,
};
export const getGrundbedarfType = {
  getData: (state: IState) => state.finanzplanGrundbedarfTypeState.data,
};
export const getType = {
  getData: (state: IState) => state.finanzplanTypeState.data,
};
export const getBewilligungStatus = {
  getData: (state: IState) => state.finanzplanBewilligungState.data,
};

export const saveFinanzplanStatus = {
  getData: (state: IState) => state.finanzplanSaveState.data,
};
