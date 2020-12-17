import { AppEntityCustomState } from '@shared/AppAction';

import { KontoauszugActions, KontoauszugActionTypes } from '../actions/kontoauszug.actions';

interface GetPersonnenState extends AppEntityCustomState<any, any> { }
interface GetZeitraumState extends AppEntityCustomState<any, any> { }
interface GetKostenartState extends AppEntityCustomState<any, any> { }
interface SearchKontoauszugState extends AppEntityCustomState<any, any> { }
interface GetLovLookupsState extends AppEntityCustomState<any, any> { }

export interface IState {
  GetPersonnenState: GetPersonnenState;
  GetZeitraumState: GetZeitraumState;
  GetKostenartState: GetKostenartState;
  SearchKontoauszugState: SearchKontoauszugState;
  GetLovLookupsState: GetLovLookupsState;
}

export const initialState: IState = {
  GetPersonnenState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  GetZeitraumState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  GetKostenartState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  SearchKontoauszugState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  GetLovLookupsState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  }
};

export function reducer(state = initialState, action: KontoauszugActions): IState {
  if (!action) { return state; }
  switch (action.type) {
    case KontoauszugActionTypes.KontoauszugAction:
      return state;

    case KontoauszugActionTypes.ResetStateAction:
      return initialState;

    case KontoauszugActionTypes.GetPersonnenTypes.LOAD: {
      return Object.assign({}, state, {
        GetPersonnenState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case KontoauszugActionTypes.GetPersonnenTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetPersonnenState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case KontoauszugActionTypes.GetPersonnenTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetPersonnenState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case KontoauszugActionTypes.GetZeitraumTypes.LOAD: {
      return Object.assign({}, state, {
        GetZeitraumState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case KontoauszugActionTypes.GetZeitraumTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetZeitraumState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case KontoauszugActionTypes.GetZeitraumTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetZeitraumState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case KontoauszugActionTypes.GetKostenartTypes.LOAD: {
      return Object.assign({}, state, {
        GetKostenartState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case KontoauszugActionTypes.GetKostenartTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetKostenartState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case KontoauszugActionTypes.GetKostenartTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetKostenartState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case KontoauszugActionTypes.SearchKontoauszugTypes.LOAD: {
      return Object.assign({}, state, {
        SearchKontoauszugState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case KontoauszugActionTypes.SearchKontoauszugTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        SearchKontoauszugState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case KontoauszugActionTypes.SearchKontoauszugTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        SearchKontoauszugState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case KontoauszugActionTypes.GetLovLookupsTypes.LOAD: {
      return Object.assign({}, state, {
        GetLovLookupsState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case KontoauszugActionTypes.GetLovLookupsTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        GetLovLookupsState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case KontoauszugActionTypes.GetLovLookupsTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        GetLovLookupsState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    default:
      return state;
  }
}

export const GetPersonnen = {
  getData: (state: IState) => state.GetPersonnenState.data,
  getLoading: (state: IState) => state.GetPersonnenState.loading,
  getLoaded: (state: IState) => state.GetPersonnenState.loaded,
  getFailed: (state: IState) => state.GetPersonnenState.failed
};

export const GetZeitraum = {
  getData: (state: IState) => state.GetZeitraumState.data,
  getLoading: (state: IState) => state.GetZeitraumState.loading,
  getLoaded: (state: IState) => state.GetZeitraumState.loaded,
  getFailed: (state: IState) => state.GetZeitraumState.failed
};

export const GetKostenart = {
  getData: (state: IState) => state.GetKostenartState.data,
  getLoading: (state: IState) => state.GetKostenartState.loading,
  getLoaded: (state: IState) => state.GetKostenartState.loaded,
  getFailed: (state: IState) => state.GetKostenartState.failed
};

export const SearchKontoauszug = {
  getData: (state: IState) => state.SearchKontoauszugState.data,
  getLoading: (state: IState) => state.SearchKontoauszugState.loading,
  getLoaded: (state: IState) => state.SearchKontoauszugState.loaded,
  getFailed: (state: IState) => state.SearchKontoauszugState.failed
};

export const GetLovLookups = {
  getData: (state: IState) => state.GetLovLookupsState.data,
  getLoading: (state: IState) => state.GetLovLookupsState.loading,
  getLoaded: (state: IState) => state.GetLovLookupsState.loaded,
  getFailed: (state: IState) => state.GetLovLookupsState.failed
};
