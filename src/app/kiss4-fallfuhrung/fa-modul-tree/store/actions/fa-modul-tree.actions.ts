import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites';

import { Message, FallNavigator } from '../../models';

export const GetTreeViewItemsTypes = {
  LOAD: type('[FaModulTree] Load Tree View Items'),
  LOAD_SUCCESS: type('[FaModulTree] Load Tree View Items Success'),
  LOAD_FAIL: type('[FaModulTree] Load Tree View Items Fail'),
  RESET_STATE: type('[FaModulTree] Reset State')
};

// Action Right Content
export const GetRightContentItemsTypes = {
  LOAD: type('[FaModulTree] Load Right Content Items'),
  LOAD_SUCCESS: type('[FaModulTree] Load Right Content Items Success'),
  LOAD_FAIL: type('[FaModulTree] Load Right Content Items Fail'),
};

export const GetUserIDFaLeistungTypes = {
  LOAD: type('[FaModulTree] Load UserID FaLeistung'),
  LOAD_SUCCESS: type('[FaModulTree] Load UserID FaLeistung Success'),
  LOAD_FAIL: type('[FaModulTree] Load UserID FaLeistung Fail'),
};

export const GetUserIDFaPhaseTypes = {
  LOAD: type('[FaModulTree] Load UserID FaPhase'),
  LOAD_SUCCESS: type('[FaModulTree] Load UserID FaPhase Success'),
  LOAD_FAIL: type('[FaModulTree] Load UserID FaPhase Fail'),
};

// Action Add New Intake
export const GetFaLeistungByBaPersonIDTypes = {
  LOAD: type('[FaModulTree] Get FaLeistung By BaPersonID'),
  LOAD_SUCCESS: type('[FaModulTree] Get FaLeistung By BaPersonID Success'),
  LOAD_FAIL: type('[FaModulTree] Get FaLeistung By BaPersonID Fail')
};

export const GetCountFaPhaseTypes = {
  LOAD: type('[FaModulTree] Get Count FaPhase'),
  LOAD_SUCCESS: type('[FaModulTree] Get Count FaPhase Success'),
  LOAD_FAIL: type('[FaModulTree] Get Count FaPhase Fail')
};

export const GetConfigIntTypes = {
  LOAD: type('[FaModulTree] Get Config Total Intake'),
  LOAD_SUCCESS: type('[FaModulTree] Get Config Total Intake Success'),
  LOAD_FAIL: type('[FaModulTree] Get Config Total Intake Fail')
};
// other GetConfigIntTypes
export const GetConfigOffeneIntakeTypes = {
  LOAD: type('[FaModulTree] Get Config Offene Intake'),
  LOAD_SUCCESS: type('[FaModulTree] Get Config Offene Intake Success'),
  LOAD_FAIL: type('[FaModulTree] Get Config Offene Intake Fail')
};
// other GetConfigIntTypes
export const GetConfigTotalBeratungsphasenTypes = {
  LOAD: type('[FaModulTree] Get Config Total Beratungsphasen'),
  LOAD_SUCCESS: type('[FaModulTree] Get Config Total Beratungsphasen Success'),
  LOAD_FAIL: type('[FaModulTree] Get Config Total Beratungsphasen Fail')
};
// other GetConfigIntTypes
export const GetConfigTransferPhaseUserTypes = {
  LOAD: type('[FaModulTree] Get Config TransferPhase User'),
  LOAD_SUCCESS: type('[FaModulTree] Get Config TransferPhase User Success'),
  LOAD_FAIL: type('[FaModulTree] Get Config TransferPhase User Fail')
};

export const GetConfigBoolTypes = {
  LOAD: type('[FaModulTree] Get Config Bool'),
  LOAD_SUCCESS: type('[FaModulTree] Get Config Bool Success'),
  LOAD_FAIL: type('[FaModulTree] Get Config Bool Fail')
};

export const GetFaPhaseByFaLeistungIDTypes = {
  LOAD: type('[FaModulTree] Get FaPhase by FaleistungID'),
  LOAD_SUCCESS: type('[FaModulTree] Get FaPhase by FaleistungID Success'),
  LOAD_FAIL: type('[FaModulTree] Get FaPhase by FaleistungID Fail')
};

export const UpdateFaLeistungTypes = {
  UPDATE: type('[FaModulTree] Update FaLeistung'),
  UPDATE_SUCCESS: type('[FaModulTree] Update FaLeistung Success'),
  UPDATE_FAIL: type('[FaModulTree] Update FaLeistung Fail')
};

export const InsertFaPhaseTypes = {
  ISNERT: type('[FaModulTree] Insert FaPhase'),
  ISNERT_SUCCESS: type('[FaModulTree] Insert FaPhase succes'),
  ISNERT_FAIL: type('[FaModulTree] Insert FaPhase Fail')
};

export const LoadMessageInformationTypes = {
  LOAD: type('[FaModulTree] Load Message Information'),
  LOAD_SUCCESS: type('[FaModulTree] Load Message Information Success'),
  LOAD_FAIL: type('[FaModulTree] Load Message Information Fail'),
};

// Delete
export const GetDataUsedFaLeistungByFaLeistungIDTypes = {
  LOAD: type('[FaModulTree] Load DataUsedFaLeistung By FaLeistungID'),
  LOAD_SUCCESS: type('[FaModulTree] Load DataUsedFaLeistung By FaLeistungID Success'),
  LOAD_FAIL: type('[FaModulTree] Load DataUsedFaLeistung By FaLeistungID Fail'),
};

export const DeleteFallverlaufTypes = {
  DELETE: type('[FaModulTree] Delete Fallverlauf'),
  DELETE_SUCCESS: type('[FaModulTree] Delete Fallverlauf Success'),
  DELETE_FAIL: type('[FaModulTree] Delete Fallverlauf Fail')
};

export const DeletePhaseTypes = {
  DELETE: type('[FaModulTree] Delete Phase'),
  DELETE_SUCCESS: type('[FaModulTree] Delete Phase Success'),
  DELETE_FAIL: type('[FaModulTree] Delete Phase Fail')
};

// Double click in S node
export const GetBaPersonIDModulIDTypes = {
  LOAD: type('[FaModulTree] Load BaPersonIDModulID'),
  LOAD_SUCCESS: type('[FaModulTree] Load BaPersonIDModulID Success'),
  LOAD_FAIL: type('[FaModulTree] Load BaPersonIDModulID Fail'),
};

// Tree & Form
export const ChangeTreeNodeUpdateStateTypes = {
  CHANGE_TREE_NODE_UPDATE_STATE: type('[FaModulTree] Change TreeNode Update State'),
};

export const UpdateNodesStatusTypes = {
  UPDATE_NODES_STATUS: type('[FaModulTree] Update Nodes Status'),
};

export const GetTreeFallNavigatorTypes = {
  LOAD: type('[FaModulTree] Load TreeFallNavigator'),
  LOAD_SUCCESS: type('[FaModulTree] Load TreeFallNavigator Success'),
  LOAD_FAIL: type('[FaModulTree] Load TreeFallNavigator Fail'),
};

export const SelectedNodeTypes = {
  UPDATE_SELECTED_NODE: type('[FaModulTree] Update Selected Node'),
};

// Other
export const LoadMessageTypes = {
  LOAD_MESSAGE: type('[FaModulTree] Load Message'),
};

export const LoadDataFallNavigatorTypes = {
  LOAD_FALL_NAVIGATOR: type('[FaModulTree] Load Data Fall Navigator'),
};

export const AddNewNodeTypes = {
  ADD_NEW_NODE: type('[FaModulTree] Add New Node'),
};

// --------------------------------
export const FaModulTreeActionTypes = {
  FaModulTreeAction: type('[FaModulTree] Action'),
  getTreeViewItemsTypes: GetTreeViewItemsTypes,
  getRightContentItemsTypes: GetRightContentItemsTypes,
  getUserIDFaLeistungTypes: GetUserIDFaLeistungTypes,
  getUserIDFaPhaseTypes: GetUserIDFaPhaseTypes,
  getFaLeistungByBaPersonIDTypes: GetFaLeistungByBaPersonIDTypes,
  getCountFaPhaseTypes: GetCountFaPhaseTypes,
  getConfigIntTypes: GetConfigIntTypes,
  getConfigOffeneIntakeTypes: GetConfigOffeneIntakeTypes,
  getConfigTotalBeratungsphasenTypes: GetConfigTotalBeratungsphasenTypes,
  getConfigTransferPhaseUserTypes: GetConfigTransferPhaseUserTypes,
  getConfigBoolTypes: GetConfigBoolTypes,
  getFaPhaseByFaLeistungIDTypes: GetFaPhaseByFaLeistungIDTypes,
  updateFaLeistungTypes: UpdateFaLeistungTypes,
  insertFaPhaseTypes: InsertFaPhaseTypes,
  loadMessageInformationTypes: LoadMessageInformationTypes,
  getDataUsedFaLeistungByFaLeistungIDTypes: GetDataUsedFaLeistungByFaLeistungIDTypes,
  deleteFallverlaufTypes: DeleteFallverlaufTypes,
  deletePhaseTypes: DeletePhaseTypes,
  getBaPersonIDModulIDTypes: GetBaPersonIDModulIDTypes,
  changeTreeNodeUpdateStateTypes: ChangeTreeNodeUpdateStateTypes,
  updateNodesStatusTypes: UpdateNodesStatusTypes,
  getTreeFallNavigatorTypes: GetTreeFallNavigatorTypes,
  selectedNodeTypes: SelectedNodeTypes,
  loadMessageTypes: LoadMessageTypes,
  loadDataFallNavigatorTypes: LoadDataFallNavigatorTypes,
  addNewNodeTypes: AddNewNodeTypes
};

export class FaModulTreeAction implements AppStateAction {
  readonly type = FaModulTreeActionTypes.FaModulTreeAction;
  constructor(public payload?: any) {
  }
}

export namespace GetTreeViewItemsAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetTreeViewItemsTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetTreeViewItemsTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetTreeViewItemsTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
  export class ResetStateAction implements AppStateAction {
    readonly type = GetTreeViewItemsTypes.RESET_STATE;
    constructor(public payload?: any) {
    }
  }
}

export namespace GetRightContentItemsAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetRightContentItemsTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetRightContentItemsTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetRightContentItemsTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace GetUserIDFaLeistungAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetUserIDFaLeistungTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetUserIDFaLeistungTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetUserIDFaLeistungTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace GetUserIDFaPhaseAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetUserIDFaPhaseTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetUserIDFaPhaseTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetUserIDFaPhaseTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace GetFaLeistungByBaPersonIDAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetFaLeistungByBaPersonIDTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetFaLeistungByBaPersonIDTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetFaLeistungByBaPersonIDTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace GetCountFaPhaseAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetCountFaPhaseTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetCountFaPhaseTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetCountFaPhaseTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace GetConfigIntAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetConfigIntTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetConfigIntTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetConfigIntTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace GetConfigOffeneIntakeAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetConfigOffeneIntakeTypes.LOAD;
    constructor(public payload?: any) {
    }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetConfigOffeneIntakeTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetConfigOffeneIntakeTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export namespace GetConfigTotalBeratungsphasenAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetConfigTotalBeratungsphasenTypes.LOAD;
    constructor(public payload?: any) {
    }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetConfigTotalBeratungsphasenTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetConfigTotalBeratungsphasenTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export namespace GetConfigTransferPhaseUserAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetConfigTransferPhaseUserTypes.LOAD;
    constructor(public payload?: any) {
    }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetConfigTransferPhaseUserTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetConfigTransferPhaseUserTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export namespace GetConfigBoolAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetConfigBoolTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetConfigBoolTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetConfigBoolTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace GetFaPhaseByFaLeistungIDAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetFaPhaseByFaLeistungIDTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetFaPhaseByFaLeistungIDTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetFaPhaseByFaLeistungIDTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace UpdateFaLeistungAction {
  export class UpdateAction implements AppStateAction {
    readonly type = UpdateFaLeistungTypes.UPDATE;
    constructor(public payload?: any) { }
  }
  export class UpdateSuccessAction implements AppStateAction {
    readonly type = UpdateFaLeistungTypes.UPDATE_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class UpdateFailAction implements AppStateAction {
    readonly type = UpdateFaLeistungTypes.UPDATE_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace InsertFaPhaseAction {
  export class InsertAction implements AppStateAction {
    readonly type = InsertFaPhaseTypes.ISNERT;
    constructor(public payload?: any) { }
  }
  export class InsertSuccessAction implements AppStateAction {
    readonly type = InsertFaPhaseTypes.ISNERT_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class InsertFailAction implements AppStateAction {
    readonly type = InsertFaPhaseTypes.ISNERT_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace LoadMessageInformationAction {
  export class LoadAction implements AppStateAction {
    readonly type = LoadMessageInformationTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = LoadMessageInformationTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = LoadMessageInformationTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

// Delete
export namespace GetDataUsedFaLeistungByFaLeistungIDAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetDataUsedFaLeistungByFaLeistungIDTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetDataUsedFaLeistungByFaLeistungIDTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetDataUsedFaLeistungByFaLeistungIDTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace DeleteFallverlaufAction {
  export class DeleteAction implements AppStateAction {
    readonly type = DeleteFallverlaufTypes.DELETE;
    constructor(public payload?: any) {
    }
  }

  export class DeleteSuccessAction implements AppStateAction {
    readonly type = DeleteFallverlaufTypes.DELETE_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class DeleteFailAction implements AppStateAction {
    readonly type = DeleteFallverlaufTypes.DELETE_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export namespace DeletePhaseAction {
  export class DeleteAction implements AppStateAction {
    readonly type = DeletePhaseTypes.DELETE;
    constructor(public payload?: any) {
    }
  }

  export class DeleteSuccessAction implements AppStateAction {
    readonly type = DeletePhaseTypes.DELETE_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class DeleteFailAction implements AppStateAction {
    readonly type = DeletePhaseTypes.DELETE_FAIL;
    constructor(public payload?: any) {
    }
  }
}

// Double click in S node
export namespace GetBaPersonIDModulIDAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetBaPersonIDModulIDTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetBaPersonIDModulIDTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetBaPersonIDModulIDTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

// Other
export class ChangeTreeNodeUpdateStateAction implements AppStateAction {
  readonly type = ChangeTreeNodeUpdateStateTypes.CHANGE_TREE_NODE_UPDATE_STATE;
  constructor(public payload?: any) {
  }
}

export class UpdateNodesStatusAction implements AppStateAction {
  readonly type = UpdateNodesStatusTypes.UPDATE_NODES_STATUS;
  constructor(public payload?: any) {
  }
}

export namespace GetTreeFallNavigatorAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetTreeFallNavigatorTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetTreeFallNavigatorTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetTreeFallNavigatorTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export class UpdateSelectedNodeAction implements AppStateAction {
  readonly type = SelectedNodeTypes.UPDATE_SELECTED_NODE;
  constructor(public payload?: any) {
  }
}

export class LoadMessageAction implements AppStateAction {
  readonly type = LoadMessageTypes.LOAD_MESSAGE;
  constructor(public payload: Message) {
  }
}

export class LoadFallNavigatorAction implements AppStateAction {
  readonly type = LoadDataFallNavigatorTypes.LOAD_FALL_NAVIGATOR;
  constructor(public payload: FallNavigator) {
  }
}

export class AddNewNodeAction implements AppStateAction {
  readonly type = AddNewNodeTypes.ADD_NEW_NODE;
  constructor(public payload?: any) {
  }
}

export type FaModulTreeActions
  = GetTreeViewItemsAction.LoadAction | GetTreeViewItemsAction.LoadSuccessAction | GetTreeViewItemsAction.LoadFailAction | GetTreeViewItemsAction.ResetStateAction
  | GetRightContentItemsAction.LoadAction | GetRightContentItemsAction.LoadSuccessAction | GetRightContentItemsAction.LoadFailAction
  | GetUserIDFaLeistungAction.LoadAction | GetUserIDFaLeistungAction.LoadSuccessAction | GetUserIDFaLeistungAction.LoadFailAction
  | GetUserIDFaPhaseAction.LoadAction | GetUserIDFaPhaseAction.LoadSuccessAction | GetUserIDFaPhaseAction.LoadFailAction
  | GetFaLeistungByBaPersonIDAction.LoadAction | GetFaLeistungByBaPersonIDAction.LoadSuccessAction | GetFaLeistungByBaPersonIDAction.LoadFailAction
  | GetCountFaPhaseAction.LoadAction | GetCountFaPhaseAction.LoadSuccessAction | GetCountFaPhaseAction.LoadFailAction
  | GetConfigIntAction.LoadAction | GetConfigIntAction.LoadSuccessAction | GetConfigIntAction.LoadFailAction
  | GetConfigOffeneIntakeAction.LoadAction | GetConfigOffeneIntakeAction.LoadSuccessAction | GetConfigOffeneIntakeAction.LoadFailAction
  | GetConfigTotalBeratungsphasenAction.LoadAction | GetConfigTotalBeratungsphasenAction.LoadSuccessAction | GetConfigTotalBeratungsphasenAction.LoadFailAction
  | GetConfigTransferPhaseUserAction.LoadAction | GetConfigTransferPhaseUserAction.LoadSuccessAction | GetConfigTransferPhaseUserAction.LoadFailAction
  | GetConfigBoolAction.LoadAction | GetConfigBoolAction.LoadSuccessAction | GetConfigBoolAction.LoadFailAction
  | GetFaPhaseByFaLeistungIDAction.LoadAction | GetFaPhaseByFaLeistungIDAction.LoadSuccessAction | GetFaPhaseByFaLeistungIDAction.LoadFailAction
  | UpdateFaLeistungAction.UpdateAction | UpdateFaLeistungAction.UpdateSuccessAction | UpdateFaLeistungAction.UpdateFailAction
  | InsertFaPhaseAction.InsertAction | InsertFaPhaseAction.InsertSuccessAction | InsertFaPhaseAction.InsertFailAction
  | LoadMessageInformationAction.LoadAction |  LoadMessageInformationAction.LoadSuccessAction | LoadMessageInformationAction.LoadFailAction
  | GetDataUsedFaLeistungByFaLeistungIDAction.LoadAction | GetDataUsedFaLeistungByFaLeistungIDAction.LoadSuccessAction | GetDataUsedFaLeistungByFaLeistungIDAction.LoadFailAction
  | DeleteFallverlaufAction.DeleteAction | DeleteFallverlaufAction.DeleteSuccessAction | DeleteFallverlaufAction.DeleteFailAction
  | DeletePhaseAction.DeleteAction | DeletePhaseAction.DeleteSuccessAction | DeletePhaseAction.DeleteFailAction
  | GetBaPersonIDModulIDAction.LoadAction | GetBaPersonIDModulIDAction.LoadSuccessAction | GetBaPersonIDModulIDAction.LoadFailAction
  | ChangeTreeNodeUpdateStateAction
  | UpdateNodesStatusAction
  | GetTreeFallNavigatorAction.LoadAction | GetTreeFallNavigatorAction.LoadSuccessAction | GetTreeFallNavigatorAction.LoadFailAction
  | UpdateSelectedNodeAction
  | LoadMessageAction
  | LoadFallNavigatorAction
  | AddNewNodeAction;
