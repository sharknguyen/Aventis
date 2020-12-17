import { AppEntityCustomState } from '@shared/AppAction';
import { mergeArrayObject, moveItemToTopArr } from '@shared/utilites';

import {
  GetConfigIntQueryModel,
  InsertFaPhaseQueryModel,
  TreeViewItemsQuery,
  UpdateFaLeistungQueryModel,
  MessageInformationQueryModel,
  Message,
  FallNavigator,
} from '../../models';
import { FaModulTreeActions, FaModulTreeActionTypes } from '../actions/fa-modul-tree.actions';

interface GetTreeViewItemsState extends AppEntityCustomState<any, TreeViewItemsQuery> { }
interface GetRightContentItemsState extends AppEntityCustomState<any> { }
// New Intake
interface GetFaLeistungByBaPersonIDState extends AppEntityCustomState<any, number> { }
interface GetCountFaPhaseState extends AppEntityCustomState<any, number> { }
interface GetConfigIntState extends AppEntityCustomState<any, GetConfigIntQueryModel> { }
interface GetConfigOffeneIntakeState extends AppEntityCustomState<any, GetConfigIntQueryModel> { }
interface GetConfigTotalBeratungsphasenState extends AppEntityCustomState<any, GetConfigIntQueryModel> { }
interface GetConfigTransferPhaseUserState extends AppEntityCustomState<any, GetConfigIntQueryModel> { }
interface GetConfigBoolState extends AppEntityCustomState<any, GetConfigIntQueryModel> { }
interface GetFaPhaseByFaLeistungIDState extends AppEntityCustomState<any, number> { }
interface UpdateFaleistungState extends AppEntityCustomState<any, UpdateFaLeistungQueryModel> { }
interface InsertFaPhaseState extends AppEntityCustomState<any, InsertFaPhaseQueryModel> { }
interface GetMessageInformationState extends AppEntityCustomState<any, MessageInformationQueryModel> { }
// Delete
interface GetDataUsedFaLeistungByFaLeistungIDState extends AppEntityCustomState<any, number> { }
interface DeleteFallverlaufState extends AppEntityCustomState<any, number> { }
interface DeletePhaseState extends AppEntityCustomState<any, number> { }

export interface State {
  getTreeViewItemsState: GetTreeViewItemsState;
  getRightContentItemsState: GetRightContentItemsState;
  getUserIDFaLeistungState: any;
  getUserIDFaPhaseState: any;
  getFaLeistungByBaPersonIDState: GetFaLeistungByBaPersonIDState;
  getCountFaPhaseState: GetCountFaPhaseState;
  getConfigIntState: GetConfigIntState;
  getConfigOffeneIntakeState: GetConfigOffeneIntakeState;
  getConfigTotalBeratungsphasenState: GetConfigTotalBeratungsphasenState;
  getConfigTransferPhaseUserState: GetConfigTransferPhaseUserState;
  getConfigBoolState: GetConfigBoolState;
  getFaPhaseByFaLeistungIDState: GetFaPhaseByFaLeistungIDState;
  updateFaLeistungState: UpdateFaleistungState;
  insertFaPhaseState: InsertFaPhaseState;
  getMessageInformationState: GetMessageInformationState;
  getDataUsedFaLeistungByFaLeistungIDState: GetDataUsedFaLeistungByFaLeistungIDState;
  deleteFallverlaufState: DeleteFallverlaufState;
  deletePhaseState: DeletePhaseState;
  getBaPersonIDModulIDState: any;
  isUpdatedTreeNode: boolean;
  nodesStatus: any;
  treeFallNavigatorState: any;
  selectedNode: any;
  loadMessageState: Message;
  loadFallNavigatorState: FallNavigator;
  addNewNode: any;
}

export const initialState: State = {
  getTreeViewItemsState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  getRightContentItemsState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  getUserIDFaLeistungState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  getUserIDFaPhaseState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  getFaLeistungByBaPersonIDState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  getCountFaPhaseState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  getConfigIntState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  getConfigOffeneIntakeState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  getConfigTotalBeratungsphasenState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  getConfigTransferPhaseUserState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  getConfigBoolState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  getFaPhaseByFaLeistungIDState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  updateFaLeistungState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  insertFaPhaseState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  getMessageInformationState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  getDataUsedFaLeistungByFaLeistungIDState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  deleteFallverlaufState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  deletePhaseState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  getBaPersonIDModulIDState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  isUpdatedTreeNode: false,
  nodesStatus: [
    {
      id: '',
      isEditMode: false
    },
  ],
  treeFallNavigatorState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null,
  },
  selectedNode: null,
  loadMessageState: null,
  loadFallNavigatorState: null,
  addNewNode: null,
};

export function reducer(state = initialState, action: FaModulTreeActions): State {
  if (state.loadMessageState === action.payload) {
    state.loadMessageState = null;
  }
  if (!action) { return state; }
  switch (action.type) {
    case FaModulTreeActionTypes.FaModulTreeAction:
      return state;

    // Get Tree View Items
    case FaModulTreeActionTypes.getTreeViewItemsTypes.LOAD: {
      return Object.assign({}, state, {
        getTreeViewItemsState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case FaModulTreeActionTypes.getTreeViewItemsTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getTreeViewItemsState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FaModulTreeActionTypes.getTreeViewItemsTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getTreeViewItemsState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }
    case FaModulTreeActionTypes.getTreeViewItemsTypes.RESET_STATE: {
      return {
        ...initialState,
        loadFallNavigatorState: state.loadFallNavigatorState
      };
    }

    // Get Right Content Items
    case FaModulTreeActionTypes.getRightContentItemsTypes.LOAD: {
      return Object.assign({}, state, {
        getRightContentItemsState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case FaModulTreeActionTypes.getRightContentItemsTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getRightContentItemsState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FaModulTreeActionTypes.getRightContentItemsTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getRightContentItemsState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    // Get UserID FaLeistung
    case FaModulTreeActionTypes.getUserIDFaLeistungTypes.LOAD: {
      return Object.assign({}, state, {
        getUserIDFaLeistungState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case FaModulTreeActionTypes.getUserIDFaLeistungTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getUserIDFaLeistungState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FaModulTreeActionTypes.getUserIDFaLeistungTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getUserIDFaLeistungState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    // Get UserID FaPhase
    case FaModulTreeActionTypes.getUserIDFaPhaseTypes.LOAD: {
      return Object.assign({}, state, {
        getUserIDFaPhaseState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case FaModulTreeActionTypes.getUserIDFaPhaseTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getUserIDFaPhaseState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FaModulTreeActionTypes.getUserIDFaPhaseTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getUserIDFaPhaseState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    // Get FaLeistung By BaPersonID
    case FaModulTreeActionTypes.getFaLeistungByBaPersonIDTypes.LOAD: {
      return Object.assign({}, state, {
        getFaLeistungByBaPersonIDState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case FaModulTreeActionTypes.getFaLeistungByBaPersonIDTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getFaLeistungByBaPersonIDState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FaModulTreeActionTypes.getFaLeistungByBaPersonIDTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getFaLeistungByBaPersonIDState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    // Get Count FaPhase
    case FaModulTreeActionTypes.getCountFaPhaseTypes.LOAD: {
      return Object.assign({}, state, {
        getCountFaPhaseState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case FaModulTreeActionTypes.getCountFaPhaseTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getCountFaPhaseState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FaModulTreeActionTypes.getCountFaPhaseTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getCountFaPhaseState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    // Get Config Int
    case FaModulTreeActionTypes.getConfigIntTypes.LOAD: {
      return Object.assign({}, state, {
        getConfigIntState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case FaModulTreeActionTypes.getConfigIntTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getConfigIntState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FaModulTreeActionTypes.getConfigIntTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getConfigIntState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case FaModulTreeActionTypes.getConfigOffeneIntakeTypes.LOAD: {
      return Object.assign({}, state, {
        getConfigOffeneIntakeState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case FaModulTreeActionTypes.getConfigOffeneIntakeTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getConfigOffeneIntakeState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FaModulTreeActionTypes.getConfigOffeneIntakeTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getConfigOffeneIntakeState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case FaModulTreeActionTypes.getConfigTotalBeratungsphasenTypes.LOAD: {
      return Object.assign({}, state, {
        getConfigTotalBeratungsphasenState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case FaModulTreeActionTypes.getConfigTotalBeratungsphasenTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getConfigTotalBeratungsphasenState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FaModulTreeActionTypes.getConfigTotalBeratungsphasenTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getConfigTotalBeratungsphasenState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case FaModulTreeActionTypes.getConfigTransferPhaseUserTypes.LOAD: {
      return Object.assign({}, state, {
        getConfigTransferPhaseUserState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case FaModulTreeActionTypes.getConfigTransferPhaseUserTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getConfigTransferPhaseUserState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FaModulTreeActionTypes.getConfigTransferPhaseUserTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getConfigTransferPhaseUserState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    // Get Config Bool
    case FaModulTreeActionTypes.getConfigBoolTypes.LOAD: {
      return Object.assign({}, state, {
        getConfigBoolState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case FaModulTreeActionTypes.getConfigBoolTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getConfigBoolState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FaModulTreeActionTypes.getConfigBoolTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getConfigBoolState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    // Get FaPhase By FaLeistungID
    case FaModulTreeActionTypes.getFaPhaseByFaLeistungIDTypes.LOAD: {
      return Object.assign({}, state, {
        getFaPhaseByFaLeistungIDState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case FaModulTreeActionTypes.getFaPhaseByFaLeistungIDTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getFaPhaseByFaLeistungIDState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FaModulTreeActionTypes.getFaPhaseByFaLeistungIDTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getFaPhaseByFaLeistungIDState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    // Update FaLeistung
    case FaModulTreeActionTypes.updateFaLeistungTypes.UPDATE: {
      return Object.assign({}, state, {
        updateFaLeistungState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case FaModulTreeActionTypes.updateFaLeistungTypes.UPDATE_FAIL: {
      return Object.assign({}, state, {
        updateFaLeistungState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FaModulTreeActionTypes.updateFaLeistungTypes.UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        updateFaLeistungState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    // Insert FaPhase
    case FaModulTreeActionTypes.insertFaPhaseTypes.ISNERT: {
      return Object.assign({}, state, {
        insertFaPhaseState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case FaModulTreeActionTypes.insertFaPhaseTypes.ISNERT_FAIL: {
      return Object.assign({}, state, {
        insertFaPhaseState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FaModulTreeActionTypes.insertFaPhaseTypes.ISNERT_SUCCESS: {
      return Object.assign({}, state, {
        insertFaPhaseState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case FaModulTreeActionTypes.loadMessageInformationTypes.LOAD: {
      return Object.assign({}, state, {
        getMessageInformationState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case FaModulTreeActionTypes.loadMessageInformationTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getMessageInformationState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FaModulTreeActionTypes.loadMessageInformationTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getMessageInformationState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    // Delete
    // Get DataUsedFaLeistung By FaLeistungID
    case FaModulTreeActionTypes.getDataUsedFaLeistungByFaLeistungIDTypes.LOAD: {
      return Object.assign({}, state, {
        getDataUsedFaLeistungByFaLeistungIDState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case FaModulTreeActionTypes.getDataUsedFaLeistungByFaLeistungIDTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getDataUsedFaLeistungByFaLeistungIDState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FaModulTreeActionTypes.getDataUsedFaLeistungByFaLeistungIDTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getDataUsedFaLeistungByFaLeistungIDState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    // Delete Fallverlauf
    case FaModulTreeActionTypes.deleteFallverlaufTypes.DELETE: {
      return Object.assign({}, state, {
        deleteFallverlaufState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case FaModulTreeActionTypes.deleteFallverlaufTypes.DELETE_FAIL: {
      return Object.assign({}, state, {
        deleteFallverlaufState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FaModulTreeActionTypes.deleteFallverlaufTypes.DELETE_SUCCESS: {
      return Object.assign({}, state, {
        deleteFallverlaufState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    // Delete Phase
    case FaModulTreeActionTypes.deletePhaseTypes.DELETE: {
      return Object.assign({}, state, {
        deletePhaseState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case FaModulTreeActionTypes.deletePhaseTypes.DELETE_FAIL: {
      return Object.assign({}, state, {
        deletePhaseState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FaModulTreeActionTypes.deletePhaseTypes.DELETE_SUCCESS: {
      return Object.assign({}, state, {
        deletePhaseState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    // Get BaPersonIDModulID
    case FaModulTreeActionTypes.getBaPersonIDModulIDTypes.LOAD: {
      return Object.assign({}, state, {
        getBaPersonIDModulIDState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        }
      });
    }
    case FaModulTreeActionTypes.getBaPersonIDModulIDTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        getBaPersonIDModulIDState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        }
      });
    }
    case FaModulTreeActionTypes.getBaPersonIDModulIDTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        getBaPersonIDModulIDState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case FaModulTreeActionTypes.changeTreeNodeUpdateStateTypes.CHANGE_TREE_NODE_UPDATE_STATE: {
      return Object.assign({}, state, {
        isUpdatedTreeNode: action.payload,
      });
    }

    case FaModulTreeActionTypes.updateNodesStatusTypes.UPDATE_NODES_STATUS: {
      const nodesStatusTemp = mergeArrayObject(state.nodesStatus, action.payload, 'id');
      moveItemToTopArr(nodesStatusTemp, action.payload);
      return Object.assign({}, state, {
        nodesStatus: [...nodesStatusTemp]
      });
    }

    case FaModulTreeActionTypes.getTreeFallNavigatorTypes.LOAD: {
      return Object.assign({}, state, {
        treeFallNavigatorState: {
          loading: true,
          loaded: false,
          failed: false,
          query: action.payload,
          data: null,
        },
      });
    }
    case FaModulTreeActionTypes.getTreeFallNavigatorTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        treeFallNavigatorState: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload,
        },
      });
    }
    case FaModulTreeActionTypes.getTreeFallNavigatorTypes.LOAD_SUCCESS: {
      const datas = Object.assign({}, state, {
        treeFallNavigatorState: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        },
      });
      return datas;
    }

    case FaModulTreeActionTypes.selectedNodeTypes.UPDATE_SELECTED_NODE: {
      return Object.assign({}, state, {
        selectedNode: action.payload
      });
    }

    case FaModulTreeActionTypes.loadMessageTypes.LOAD_MESSAGE: {
      return {
        ...state,
        loadMessageState: { ...action.payload }
      };
    }

    case FaModulTreeActionTypes.loadDataFallNavigatorTypes.LOAD_FALL_NAVIGATOR: {
      return {
        ...state,
        loadFallNavigatorState: { ...action.payload }
      };
    }

    case FaModulTreeActionTypes.addNewNodeTypes.ADD_NEW_NODE: {
      return Object.assign({}, state, {
        addNewNode: action.payload
      });
    }

    default: return state;
  }
}

export const GetTreeViewItems = {
  getData: (state: State) => state.getTreeViewItemsState.data,
  getLoading: (state: State) => state.getTreeViewItemsState.loading,
  getLoaded: (state: State) => state.getTreeViewItemsState.loaded,
  getFailed: (state: State) => state.getTreeViewItemsState.failed
};

export const GetRightContentItems = {
  getData: (state: State) => state.getRightContentItemsState.data,
  getLoading: (state: State) => state.getRightContentItemsState.loading,
  getLoaded: (state: State) => state.getRightContentItemsState.loaded,
  getFailed: (state: State) => state.getRightContentItemsState.failed
};

export const GetUserIDFaLeistung = {
  getData: (state: State) => state.getUserIDFaLeistungState.data,
  getLoading: (state: State) => state.getUserIDFaLeistungState.loading,
  getLoaded: (state: State) => state.getUserIDFaLeistungState.loaded,
  getFailed: (state: State) => state.getUserIDFaLeistungState.failed
};

export const GetUserIDFaPhase = {
  getData: (state: State) => state.getUserIDFaPhaseState.data,
  getLoading: (state: State) => state.getUserIDFaPhaseState.loading,
  getLoaded: (state: State) => state.getUserIDFaPhaseState.loaded,
  getFailed: (state: State) => state.getUserIDFaPhaseState.failed
};

export const GetFaLeistungByBaPersonID = {
  getData: (state: State) => state.getFaLeistungByBaPersonIDState.data,
  getLoading: (state: State) => state.getFaLeistungByBaPersonIDState.loading,
  getLoaded: (state: State) => state.getFaLeistungByBaPersonIDState.loaded,
  getFailed: (state: State) => state.getFaLeistungByBaPersonIDState.failed
};

export const GetCountFaPhase = {
  getData: (state: State) => state.getCountFaPhaseState.data,
  getLoading: (state: State) => state.getCountFaPhaseState.loading,
  getLoaded: (state: State) => state.getCountFaPhaseState.loaded,
  getFailed: (state: State) => state.getCountFaPhaseState.failed
};

export const GetConfigInt = {
  getData: (state: State) => state.getConfigIntState.data,
  getLoading: (state: State) => state.getConfigIntState.loading,
  getLoaded: (state: State) => state.getConfigIntState.loaded,
  getFailed: (state: State) => state.getConfigIntState.failed
};

export const GetConfigOffeneIntake = {
  getData: (state: State) => state.getConfigOffeneIntakeState.data,
  getLoading: (state: State) => state.getConfigOffeneIntakeState.loading,
  getLoaded: (state: State) => state.getConfigOffeneIntakeState.loaded,
  getFailed: (state: State) => state.getConfigOffeneIntakeState.failed
};

export const GetConfigTotalBeratungsphasen = {
  getData: (state: State) => state.getConfigTotalBeratungsphasenState.data,
  getLoading: (state: State) => state.getConfigTotalBeratungsphasenState.loading,
  getLoaded: (state: State) => state.getConfigTotalBeratungsphasenState.loaded,
  getFailed: (state: State) => state.getConfigTotalBeratungsphasenState.failed
};

export const GetConfigTransferPhaseUser = {
  getData: (state: State) => state.getConfigTransferPhaseUserState.data,
  getLoading: (state: State) => state.getConfigTransferPhaseUserState.loading,
  getLoaded: (state: State) => state.getConfigTransferPhaseUserState.loaded,
  getFailed: (state: State) => state.getConfigTransferPhaseUserState.failed
};

export const GetConfigBool = {
  getData: (state: State) => state.getConfigBoolState.data,
  getLoading: (state: State) => state.getConfigBoolState.loading,
  getLoaded: (state: State) => state.getConfigBoolState.loaded,
  getFailed: (state: State) => state.getConfigBoolState.failed
};

export const GetFaPhaseByFaLeistungID = {
  getData: (state: State) => state.getFaPhaseByFaLeistungIDState.data,
  getLoading: (state: State) => state.getFaPhaseByFaLeistungIDState.loading,
  getLoaded: (state: State) => state.getFaPhaseByFaLeistungIDState.loaded,
  getFailed: (state: State) => state.getFaPhaseByFaLeistungIDState.failed
};

export const UpdateFaLeistung = {
  getData: (state: State) => state.updateFaLeistungState.data,
  getLoading: (state: State) => state.updateFaLeistungState.loading,
  getLoaded: (state: State) => state.updateFaLeistungState.loaded,
  getFailed: (state: State) => state.updateFaLeistungState.failed
};

export const InsertFaPhase = {
  getData: (state: State) => state.insertFaPhaseState.data,
  getLoading: (state: State) => state.insertFaPhaseState.loading,
  getLoaded: (state: State) => state.insertFaPhaseState.loaded,
  getFailed: (state: State) => state.insertFaPhaseState.failed
};

export const getMessageInformation = {
  getData: (state: State) => state.getMessageInformationState.data,
  getLoading: (state: State) => state.getMessageInformationState.loading,
  getLoaded: (state: State) => state.getMessageInformationState.loaded,
  getFailed: (state: State) => state.getMessageInformationState.failed
};

export const GetDataUsedFaLeistungByFaLeistungID = {
  getData: (state: State) => state.getDataUsedFaLeistungByFaLeistungIDState.data,
  getLoading: (state: State) => state.getDataUsedFaLeistungByFaLeistungIDState.loading,
  getLoaded: (state: State) => state.getDataUsedFaLeistungByFaLeistungIDState.loaded,
  getFailed: (state: State) => state.getDataUsedFaLeistungByFaLeistungIDState.failed
};

export const DeleteFallverlauf = {
  getData: (state: State) => state.deleteFallverlaufState.data,
  getLoading: (state: State) => state.deleteFallverlaufState.loading,
  getLoaded: (state: State) => state.deleteFallverlaufState.loaded,
  getFailed: (state: State) => state.deleteFallverlaufState.failed
};

export const DeletePhase = {
  getData: (state: State) => state.deletePhaseState.data,
  getLoading: (state: State) => state.deletePhaseState.loading,
  getLoaded: (state: State) => state.deletePhaseState.loaded,
  getFailed: (state: State) => state.deletePhaseState.failed
};

export const GetBaPersonIDModulID = {
  getData: (state: State) => state.getBaPersonIDModulIDState.data,
  getLoading: (state: State) => state.getBaPersonIDModulIDState.loading,
  getLoaded: (state: State) => state.getBaPersonIDModulIDState.loaded,
  getFailed: (state: State) => state.getBaPersonIDModulIDState.failed
};

export const getTreeNodeUpdateState = (state: State) => state.isUpdatedTreeNode;

export const getNodesStatus = (state: State) => state.nodesStatus;

export const getTreeFallNavigator = {
  getData: (state: State) => state.treeFallNavigatorState.data,
  getLoading: (state: State) => state.treeFallNavigatorState.loading,
  getLoaded: (state: State) => state.treeFallNavigatorState.loaded,
  getFailed: (state: State) => state.treeFallNavigatorState.failed
};

export const getSelectedNode = (state: State) => state.selectedNode;

export const loadMessage = (state: State) => state.loadMessageState;

export const loadFallNavigator = (state: State) => state.loadFallNavigatorState;

export const getAddNewNode = (state: State) => state.addNewNode;
