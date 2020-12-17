import { AppEntityCustomState } from '@shared/AppAction';

import {
  TabModuleFallbearbeitungActions,
  TabModuleFallbearbeitungActionTypes,
} from '../actions/tab-module-fallbearbeitung.actions';

interface GetModuleIconState extends AppEntityCustomState<any, any> { }
interface GetZeitachseVisibleState extends AppEntityCustomState<any, any> { }
interface GetPersonInfoTitleState extends AppEntityCustomState<any, any> { }

export interface State {
  getModuleIconState: GetModuleIconState;
  getZeitachseVisibleState: GetZeitachseVisibleState;
  getPersonInfoTitelState: GetPersonInfoTitleState;
}

export const initialState: State = {
  getModuleIconState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  getZeitachseVisibleState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  getPersonInfoTitelState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  }
};

export function reducer(state = initialState, action: TabModuleFallbearbeitungActions): State {
  if (!action) { return state; }
  switch (action.type) {
    case TabModuleFallbearbeitungActionTypes.TabModuleFallbearbeitungAction:
      return state;
    // Load Module Icon
    case TabModuleFallbearbeitungActionTypes.LoadModuleIconTypes.LOAD: {
      return Object.assign({}, state, {
        getModuleIconState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case TabModuleFallbearbeitungActionTypes.LoadModuleIconTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getModuleIconState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case TabModuleFallbearbeitungActionTypes.LoadModuleIconTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getModuleIconState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    // Load Zeitachse Visible
    case TabModuleFallbearbeitungActionTypes.LoadZeitachseVisibleTypes.LOAD: {
      return Object.assign({}, state, {
        getZeitachseVisibleState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case TabModuleFallbearbeitungActionTypes.LoadZeitachseVisibleTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getZeitachseVisibleState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case TabModuleFallbearbeitungActionTypes.LoadZeitachseVisibleTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getZeitachseVisibleState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    // Load Person Info Titel
    case TabModuleFallbearbeitungActionTypes.LoadPersonInfoTitelTypes.LOAD: {
      return Object.assign({}, state, {
        getPersonInfoTitelState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case TabModuleFallbearbeitungActionTypes.LoadPersonInfoTitelTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getPersonInfoTitelState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case TabModuleFallbearbeitungActionTypes.LoadPersonInfoTitelTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getPersonInfoTitelState: {
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

export const getModuleIcon = {
  getData: (state: State) => state.getModuleIconState.data,
  getLoading: (state: State) => state.getModuleIconState.loading,
  getLoaded: (state: State) => state.getModuleIconState.loaded,
  getFailed: (state: State) => state.getModuleIconState.failed
};

export const getZeitachseVisible = {
  getData: (state: State) => state.getZeitachseVisibleState.data,
  getLoading: (state: State) => state.getZeitachseVisibleState.loading,
  getLoaded: (state: State) => state.getZeitachseVisibleState.loaded,
  getFailed: (state: State) => state.getZeitachseVisibleState.failed
};

export const getPersonInfoTitel = {
  getData: (state: State) => state.getPersonInfoTitelState.data,
  getLoading: (state: State) => state.getPersonInfoTitelState.loading,
  getLoaded: (state: State) => state.getPersonInfoTitelState.loaded,
  getFailed: (state: State) => state.getPersonInfoTitelState.failed
};
