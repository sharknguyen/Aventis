import { AppEntityCustomState, ProcessState } from '@shared/AppAction';
import { mergeArrayObject, moveItemToTopArr } from '@shared/utilites';

import { Person } from '../../models';
import { TreeViewItem, TreeViewItemsQuery } from '../../models/tree-view-item.model';
import { SozialhilfeTreeActionTypes, SozialhilfeTreeActions } from '../actions/sozialhilfe-tree.actions';

interface TreeViewItemsState extends AppEntityCustomState<TreeViewItem[], TreeViewItemsQuery> { }
interface DeleteBudgetStates extends AppEntityCustomState<any, number> { }
interface CreateBudgetStates extends AppEntityCustomState<any, number> { }
interface CreateFinancialPlanStates extends AppEntityCustomState<any, number> { }
interface DeleteFinancialPlanStates extends AppEntityCustomState<any, number> { }
interface DeleteSozialhilfeStates extends AppEntityCustomState<any, number> { }
interface CreateSozialhilfeStates extends AppEntityCustomState<any, number> { }

export interface State extends ProcessState {
  person: Person;
  treeViewItemsState: TreeViewItemsState;
  deleteBudgetStates: DeleteBudgetStates;
  createBudgetStates: CreateBudgetStates;
  createFinancialPlanStates: CreateFinancialPlanStates;
  deleteFinancialPlanStates: DeleteFinancialPlanStates;
  deleteSozialhilfeStates: DeleteSozialhilfeStates;
  createSozialhilfeStates: CreateSozialhilfeStates;
  isEditModeState: boolean;
  selectedNode: any;
  nodesStatus: any;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  failed: false,
  person: new Person(),
  treeViewItemsState: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: [],
  },
  isEditModeState: null,
  selectedNode: null,
  nodesStatus: [
    {
      id: '',
      isEditMode: false
    },
  ],
  deleteBudgetStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  createBudgetStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  createFinancialPlanStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  deleteFinancialPlanStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  deleteSozialhilfeStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
  createSozialhilfeStates: {
    loading: false,
    loaded: false,
    failed: false,
    query: null,
    data: null
  },
};

export function reducer(state = initialState, action: SozialhilfeTreeActions): State {
  if (!action) { return state; }
  switch (action.type) {

    case SozialhilfeTreeActionTypes.EditModeStatusTypes.UPDATE_EDIT_MODE: {
      return Object.assign({}, state, {
        isEditModeState: action.payload
      });
    }

    case SozialhilfeTreeActionTypes.SelectedNodeTypes.UPDATE_SELECTED_NODE: {
      return Object.assign({}, state, {
        selectedNode: action.payload
      });
    }

    case SozialhilfeTreeActionTypes.LoadTreeViewItemsTypes.LOAD: {
      return Object.assign({}, state, {
        treeViewItemsState: {
          loading: true,
          query: action.payload
        }
      });
    }
    case SozialhilfeTreeActionTypes.LoadTreeViewItemsTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        treeViewItemsState: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case SozialhilfeTreeActionTypes.NodesStatusTypes.UPDATE_NODES_STATUS: {
      const nodesStatusTemp = mergeArrayObject(state.nodesStatus, action.payload, 'id');
      moveItemToTopArr(nodesStatusTemp, action.payload);
      return Object.assign({}, state, {
        nodesStatus: [...nodesStatusTemp]
      });
    }

    case SozialhilfeTreeActionTypes.LoadTreeViewItemsTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        treeViewItemsState: {
          loaded: false,
          loading: false,
          failed: true,
          data: []
        }
      });
    }

    case SozialhilfeTreeActionTypes.DeleteBudgetTypes.LOAD: {
      return Object.assign({}, state, {
        deleteBudgetStates: {
          loading: true,
          query: action.payload
        }
      });
    }
    case SozialhilfeTreeActionTypes.DeleteBudgetTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        deleteBudgetStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SozialhilfeTreeActionTypes.DeleteBudgetTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        deleteBudgetStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SozialhilfeTreeActionTypes.CreateBudgetTypes.LOAD: {
      return Object.assign({}, state, {
        createBudgetStates: {
          loading: true,
          query: action.payload
        }
      });
    }
    case SozialhilfeTreeActionTypes.CreateBudgetTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        createBudgetStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SozialhilfeTreeActionTypes.CreateBudgetTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        createBudgetStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }
    case SozialhilfeTreeActionTypes.CreateFinancialPlanTypes.LOAD: {
      return Object.assign({}, state, {
        createFinancialPlanStates: {
          loading: true,
          query: action.payload
        }
      });
    }
    case SozialhilfeTreeActionTypes.CreateFinancialPlanTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        createFinancialPlanStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SozialhilfeTreeActionTypes.CreateFinancialPlanTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        createFinancialPlanStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SozialhilfeTreeActionTypes.DeleteFinancialPlanTypes.LOAD: {
      return Object.assign({}, state, {
        deleteFinancialPlanStates: {
          loading: true,
          query: action.payload
        }
      });
    }
    case SozialhilfeTreeActionTypes.DeleteFinancialPlanTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        deleteFinancialPlanStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SozialhilfeTreeActionTypes.DeleteFinancialPlanTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        deleteFinancialPlanStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SozialhilfeTreeActionTypes.CreateSozialhilfeTypes.LOAD: {
      return Object.assign({}, state, {
        createSozialhilfeStates: {
          loading: true,
          query: action.payload
        }
      });
    }
    case SozialhilfeTreeActionTypes.CreateSozialhilfeTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        createSozialhilfeStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SozialhilfeTreeActionTypes.CreateSozialhilfeTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        createSozialhilfeStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SozialhilfeTreeActionTypes.DeleteSozialhilfeTypes.LOAD: {
      return Object.assign({}, state, {
        deleteSozialhilfeStates: {
          loading: true,
          query: action.payload
        }
      });
    }
    case SozialhilfeTreeActionTypes.DeleteSozialhilfeTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        deleteSozialhilfeStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    case SozialhilfeTreeActionTypes.DeleteSozialhilfeTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        deleteSozialhilfeStates: {
          loaded: true,
          loading: false,
          failed: false,
          data: action.payload
        }
      });
    }

    default: return state;
  }
}

export const getFallfuhrungTreeLoading = (state: State) => state.loading;
export const getFallfuhrungTreeLoaded = (state: State) => state.loaded;
export const getFallfuhrungTreeFailed = (state: State) => state.failed;
export const getFallfuhrungTreePerson = (state: State) => state.person;
export const getNodesStatus = (state: State) => state.nodesStatus;
export const getTreeViewItems = {
  getData: (state: State) => state.treeViewItemsState.data,
  getLoading: (state: State) => state.treeViewItemsState.loading,
  getLoaded: (state: State) => state.treeViewItemsState.loaded,
  getFailed: (state: State) => state.treeViewItemsState.failed
};
export const deleteBugdet = {
  getData: (state: State) => state.deleteBudgetStates.data,
  getLoading: (state: State) => state.deleteBudgetStates.loading,
  getLoaded: (state: State) => state.deleteBudgetStates.loaded,
  getFailed: (state: State) => state.deleteBudgetStates.failed
};
export const createBugdet = {
  getData: (state: State) => state.createBudgetStates.data,
  getLoading: (state: State) => state.createBudgetStates.loading,
  getLoaded: (state: State) => state.createBudgetStates.loaded,
  getFailed: (state: State) => state.createBudgetStates.failed
};
export const createFinancialPlan = {
  getData: (state: State) => state.createFinancialPlanStates.data,
  getLoading: (state: State) => state.createFinancialPlanStates.loading,
  getLoaded: (state: State) => state.createFinancialPlanStates.loaded,
  getFailed: (state: State) => state.createFinancialPlanStates.failed
};
export const deleteFinancialPlan = {
  getData: (state: State) => state.deleteFinancialPlanStates.data,
  getLoading: (state: State) => state.deleteFinancialPlanStates.loading,
  getLoaded: (state: State) => state.deleteFinancialPlanStates.loaded,
  getFailed: (state: State) => state.deleteFinancialPlanStates.failed
};
export const createSozialhilfe = {
  getData: (state: State) => state.createSozialhilfeStates.data,
  getLoading: (state: State) => state.createSozialhilfeStates.loading,
  getLoaded: (state: State) => state.createSozialhilfeStates.loaded,
  getFailed: (state: State) => state.createSozialhilfeStates.failed
};
export const deleteSozialhilfe = {
  getData: (state: State) => state.deleteSozialhilfeStates.data,
  getLoading: (state: State) => state.deleteSozialhilfeStates.loading,
  getLoaded: (state: State) => state.deleteSozialhilfeStates.loaded,
  getFailed: (state: State) => state.deleteSozialhilfeStates.failed
};
export const getEditModeStatus = (state: State) => state.isEditModeState;
export const getTreeNodeUpdateState = (state: State) => state.isEditModeState;
export const getSelectedNode = (state: State) => state.selectedNode;
