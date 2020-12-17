import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';

// Load Data Grid
const AsvDatenerfassungDatasTypes = {
  LOAD: type('[AsvDatenerfassung] Load'),
  LOAD_SUCCESS: type('[AsvDatenerfassung] Load Success'),
  LOAD_FAIL: type('[AsvDatenerfassung] Load Fail')
};

// Load Data Combobox
const AsvDatenerfassungComboboxDatasTypes = {
  LOAD: type('[AsvDatenerfassung] Load Combobox'),
  LOAD_SUCCESS: type('[AsvDatenerfassung] Load Combobox Success'),
  LOAD_FAIL: type('[AsvDatenerfassung] Load Combobox Fail')
};

// Insert
const AsvDatenerfassungInsertTypes = {
  LOAD: type('[AsvDatenerfassung] Insert'),
  LOAD_SUCCESS: type('[AsvDatenerfassung] Insert Success'),
  LOAD_FAIL: type('[AsvDatenerfassung] Insert Fail')
};

// Update
const AsvDatenerfassungUpdateTypes = {
  LOAD: type('[AsvDatenerfassung] Update'),
  LOAD_SUCCESS: type('[AsvDatenerfassung] Update Success'),
  LOAD_FAIL: type('[AsvDatenerfassung] Update Fail')
};

// Delete
const AsvDatenerfassungDeleteTypes = {
  Delete: type('[AsvDatenerfassung] Delete'),
  Delete_SUCCESS: type('[AsvDatenerfassung] Delete Success'),
  Delete_FAIL: type('[AsvDatenerfassung] Delete Fail')
};
const AsvDatenerfassungStateTypes = {
  RESET_STATE: type('[AsvDatenerfassung State] Reset'),
};

export const AsvDatenerfassungActionTypes = {
  AsvDatenerfassungAction: type('[AsvDatenerfassung] Action'),
  AsvDatenerfassungDatasTypes: AsvDatenerfassungDatasTypes,
  AsvDatenerfassungStateTypes: AsvDatenerfassungStateTypes,
  AsvDatenerfassungComboboxDatasTypes: AsvDatenerfassungComboboxDatasTypes,
  AsvDatenerfassungInsertTypes: AsvDatenerfassungInsertTypes,
  AsvDatenerfassungUpdateTypes: AsvDatenerfassungUpdateTypes,
  AsvDatenerfassungDeleteTypes: AsvDatenerfassungDeleteTypes
};

export class AsvDatenerfassungAction implements AppStateAction {
  readonly type = AsvDatenerfassungActionTypes.AsvDatenerfassungAction;
  constructor(public payload?: any) { }
}


/**
 * AsvDatenerfassungDatasTypes Action
 */
export namespace AsvDatenerfassungAction {
  export class LoadAction implements AppStateAction {
    readonly type = AsvDatenerfassungDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = AsvDatenerfassungDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = AsvDatenerfassungDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
export namespace AsvDatenerfassungStateAction {
  export class ResetAction implements AppStateAction {
    readonly type = AsvDatenerfassungStateTypes.RESET_STATE;
    constructor(public payload?: any) { }
  }
}

// Load Data combobox
export namespace AsvDatenerfassungComboboxAction {
  export class LoadAction implements AppStateAction {
    readonly type = AsvDatenerfassungComboboxDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = AsvDatenerfassungComboboxDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = AsvDatenerfassungComboboxDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

// Insert
export namespace AsvDatenerfassungInsertAction {
  export class LoadAction implements AppStateAction {
    readonly type = AsvDatenerfassungInsertTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = AsvDatenerfassungInsertTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = AsvDatenerfassungInsertTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

// Update
export namespace AsvDatenerfassungUpdateAction {
  export class LoadAction implements AppStateAction {
    readonly type = AsvDatenerfassungUpdateTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = AsvDatenerfassungUpdateTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = AsvDatenerfassungUpdateTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

// Delete
export namespace AsvDatenerfassungDeleteAction {
  export class DeleteAction implements AppStateAction {
    readonly type = AsvDatenerfassungDeleteTypes.Delete;
    constructor(public payload?: any) { }
  }

  export class DeleteSuccessAction implements AppStateAction {
    readonly type = AsvDatenerfassungDeleteTypes.Delete_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class DeleteFailAction implements AppStateAction {
    readonly type = AsvDatenerfassungDeleteTypes.Delete_FAIL;
    constructor(public payload?: any) { }
  }
}
export type AsvDatenerfassungActions
  = AsvDatenerfassungAction
  | AsvDatenerfassungAction.LoadAction | AsvDatenerfassungAction.LoadSuccessAction | AsvDatenerfassungAction.LoadFailAction | AsvDatenerfassungStateAction.ResetAction
  | AsvDatenerfassungComboboxAction.LoadAction | AsvDatenerfassungComboboxAction.LoadFailAction | AsvDatenerfassungComboboxAction.LoadSuccessAction
  | AsvDatenerfassungInsertAction.LoadAction | AsvDatenerfassungInsertAction.LoadFailAction | AsvDatenerfassungInsertAction.LoadSuccessAction
  | AsvDatenerfassungUpdateAction.LoadAction | AsvDatenerfassungUpdateAction.LoadFailAction | AsvDatenerfassungUpdateAction.LoadSuccessAction
  | AsvDatenerfassungDeleteAction.DeleteAction | AsvDatenerfassungDeleteAction.DeleteFailAction | AsvDatenerfassungDeleteAction.DeleteSuccessAction;



