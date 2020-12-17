import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites';

import { FallNavigator, Message } from '../../models';

export const EditModeStatusTypes = {
  UPDATE_EDIT_MODE: type('[SozialhilfeTree] Change Edit Mode Status'),
};

export const LoadTreeViewItemsTypes = {
  LOAD: type('[SozialhilfeTree] Load Tree View Items'),
  LOAD_SUCCESS: type('[SozialhilfeTree] Load Tree View Items Success'),
  LOAD_FAIL: type('[SozialhilfeTree] Load Tree View Items Fail'),
  RESET_STATE: type('[SozialhilfeTree] Reset State')
};

export const DeleteBudgetTypes = {
  LOAD: type('[SozialhilfeTree] Load Delete budget'),
  LOAD_SUCCESS: type('[SozialhilfeTree] Load Delete budget Success'),
  LOAD_FAIL: type('[SozialhilfeTree] Load Delete budget Fail'),
};

export const CreateBudgetTypes = {
  LOAD: type('[SozialhilfeTree] Load Create budget'),
  LOAD_SUCCESS: type('[SozialhilfeTree] Load Create budget Success'),
  LOAD_FAIL: type('[SozialhilfeTree] Load Create budget Fail'),
};

export const CreateFinancialPlanTypes = {
  LOAD: type('[SozialhilfeTree] Load Create FinancialPlan'),
  LOAD_SUCCESS: type('[SozialhilfeTree] Load Create FinancialPlan Success'),
  LOAD_FAIL: type('[SozialhilfeTree] Load Create FinancialPlan Fail'),
};

export const DeleteFinancialPlanTypes = {
  LOAD: type('[SozialhilfeTree] Load Delete FinancialPlan'),
  LOAD_SUCCESS: type('[SozialhilfeTree] Load Delete FinancialPlan Success'),
  LOAD_FAIL: type('[SozialhilfeTree] Load Delete FinancialPlan Fail'),
};

export const CreateSozialhilfeTypes = {
  LOAD: type('[SozialhilfeTree] Load Create Sozialhilfe'),
  LOAD_SUCCESS: type('[SozialhilfeTree] Load Create Sozialhilfe Success'),
  LOAD_FAIL: type('[SozialhilfeTree] Load Create Sozialhilfe Fail'),
};

export const DeleteSozialhilfeTypes = {
  LOAD: type('[SozialhilfeTree] Load Delete Sozialhilfe'),
  LOAD_SUCCESS: type('[SozialhilfeTree] Load Delete Sozialhilfe Success'),
  LOAD_FAIL: type('[SozialhilfeTree] Load Delete Sozialhilfe Fail'),
};

export const SelectedNodeTypes = {
  UPDATE_SELECTED_NODE: type('[SozialhilfeTree] Update Selected Node'),
};

export const NodesStatusTypes = {
  UPDATE_NODES_STATUS: type('[SozialhilfeTree] Update Nodes Status'),
};

export const ChangeTreeNodeUpdateStateTypes = {
  CHANGE_TREE_NODE_UPDATE_STATE: type('[SozialhilfeTree] Change TreeNode Update State'),
};

export const SozialhilfeTreeActionTypes = {
  EditModeStatusTypes: EditModeStatusTypes,
  SelectedNodeTypes: SelectedNodeTypes,
  LoadTreeViewItemsTypes: LoadTreeViewItemsTypes,
  ChangeTreeNodeUpdateStateTypes: ChangeTreeNodeUpdateStateTypes,
  NodesStatusTypes: NodesStatusTypes,
  DeleteBudgetTypes: DeleteBudgetTypes,
  CreateBudgetTypes: CreateBudgetTypes,
  CreateFinancialPlanTypes: CreateFinancialPlanTypes,
  DeleteFinancialPlanTypes: DeleteFinancialPlanTypes,
  CreateSozialhilfeTypes: CreateSozialhilfeTypes,
  DeleteSozialhilfeTypes: DeleteSozialhilfeTypes
};

export namespace LoadTreeViewItemsAction {
  export class LoadAction implements AppStateAction {
    readonly type = LoadTreeViewItemsTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = LoadTreeViewItemsTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = LoadTreeViewItemsTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
  export class ResetStateAction implements AppStateAction {
    readonly type = LoadTreeViewItemsTypes.RESET_STATE;
    constructor(public payload?: any) {
    }
  }
}

export namespace DeleteBudgetAction {
  export class LoadAction implements AppStateAction {
    readonly type = DeleteBudgetTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = DeleteBudgetTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = DeleteBudgetTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace CreateBudgetAction {
  export class LoadAction implements AppStateAction {
    readonly type = CreateBudgetTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = CreateBudgetTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = CreateBudgetTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace CreateFinancialPlanTypesAction {
  export class LoadAction implements AppStateAction {
    readonly type = CreateFinancialPlanTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = CreateFinancialPlanTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = CreateFinancialPlanTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace CreateSozialhilfeTypesAction {
  export class LoadAction implements AppStateAction {
    readonly type = CreateSozialhilfeTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = CreateSozialhilfeTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = CreateSozialhilfeTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace DeleteSozialhilfeTypesAction {
  export class LoadAction implements AppStateAction {
    readonly type = DeleteSozialhilfeTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = DeleteSozialhilfeTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = DeleteSozialhilfeTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace DeleteFinancialPlanTypesAction {
  export class LoadAction implements AppStateAction {
    readonly type = DeleteFinancialPlanTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = DeleteFinancialPlanTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = DeleteFinancialPlanTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export class ChangeTreeNodeUpdateStateAction implements AppStateAction {
  readonly type = ChangeTreeNodeUpdateStateTypes.CHANGE_TREE_NODE_UPDATE_STATE;
  constructor(public payload?: any) {
  }
}

export class UpdateEditModeStatusAction implements AppStateAction {
  readonly type = EditModeStatusTypes.UPDATE_EDIT_MODE;
  constructor(public payload?: any) {
  }
}

export class UpdateSelectedNodeAction implements AppStateAction {
  readonly type = SelectedNodeTypes.UPDATE_SELECTED_NODE;
  constructor(public payload?: any) {
  }
}

export class UpdateNodesStatusAction implements AppStateAction {
  readonly type = NodesStatusTypes.UPDATE_NODES_STATUS;
  constructor(public payload?: any) {
  }
}

export type SozialhilfeTreeActions
  = UpdateEditModeStatusAction
  | UpdateSelectedNodeAction
  | ChangeTreeNodeUpdateStateAction
  | DeleteBudgetAction.LoadAction | DeleteBudgetAction.LoadSuccessAction | DeleteBudgetAction.LoadFailAction
  | CreateBudgetAction.LoadAction | CreateBudgetAction.LoadSuccessAction | CreateBudgetAction.LoadFailAction
  | CreateFinancialPlanTypesAction.LoadAction | CreateFinancialPlanTypesAction.LoadSuccessAction | CreateFinancialPlanTypesAction.LoadFailAction
  | DeleteFinancialPlanTypesAction.LoadAction | DeleteFinancialPlanTypesAction.LoadSuccessAction | DeleteFinancialPlanTypesAction.LoadFailAction
  | CreateSozialhilfeTypesAction.LoadAction | CreateSozialhilfeTypesAction.LoadSuccessAction | CreateSozialhilfeTypesAction.LoadFailAction
  | DeleteSozialhilfeTypesAction.LoadAction | DeleteSozialhilfeTypesAction.LoadSuccessAction | DeleteSozialhilfeTypesAction.LoadFailAction
  | LoadTreeViewItemsAction.LoadAction | LoadTreeViewItemsAction.LoadSuccessAction | LoadTreeViewItemsAction.LoadFailAction | LoadTreeViewItemsAction.ResetStateAction
  | UpdateNodesStatusAction;
