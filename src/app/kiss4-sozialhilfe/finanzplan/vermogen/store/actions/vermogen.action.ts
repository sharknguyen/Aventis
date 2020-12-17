import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

// Load data BgPosition
const BgPositionTypes = {
    LOAD: type('[Vermogen BgPosition] Load'),
    LOAD_SUCCESS: type('[Vermogen BgPosition] Load Success'),
    LOAD_FAIL: type('[Vermogen BgPosition] Load Fail')
};

// Load data BgFinanzplan
const BgFinanzplanTypes = {
    LOAD: type('[Vermogen BgFinanzplan] Load'),
    LOAD_SUCCESS: type('[Vermogen BgFinanzplan] Load Success'),
    LOAD_FAIL: type('[Vermogen BgFinanzplan] Load Fail')
};

// Load data Personen
const PersonenTypes = {
    LOAD: type('[Vermogen Personen] Load'),
    LOAD_SUCCESS: type('[Vermogen Personen] Load Success'),
    LOAD_FAIL: type('[Vermogen Personen] Load Fail')
};

// Load data WhPositionsart
const WhPositionsartTypes = {
    LOAD: type('[Vermogen WhPositionsart] Load'),
    LOAD_SUCCESS: type('[Vermogen WhPositionsart] Load Success'),
    LOAD_FAIL: type('[Vermogen WhPositionsart] Load Fail')
};

const DelBgPositionTypes = {
    DEL: type('[Vermogen DelBgPosition] Del'),
    DEL_SUCCESS: type('[Vermogen DelBgPosition] Del Success'),
    DEL_FAIL: type('[Vermogen DelBgPosition] Del Fail')
};

// Load data Freibetrag
const FreibetragTypes = {
    LOAD: type('[Vermogen Freibetrag] Load'),
    LOAD_SUCCESS: type('[Vermogen Freibetrag] Load Success'),
    LOAD_FAIL: type('[Vermogen Freibetrag] Load Fail')
};

// Insert BgPosition
const InsertBgPositionTypes = {
    INSERT: type('[Vermogen BgPosition] Insert'),
    INSERT_SUCCESS: type('[Vermogen BgPosition] Insert Success'),
    INSERT_FAIL: type('[Vermogen BgPosition] Insert Fail')
};

// Update BgPosition
const UpdateBgPositionTypes = {
    UPDATE: type('[Vermogen BgPosition] Update'),
    UPDATE_SUCCESS: type('[Vermogen BgPosition] Update Success'),
    UPDATE_FAIL: type('[Vermogen BgPosition] Update Fail')
};

// Get status code
const BgSilAHVBeitragTypes = {
    LOAD: type('[Vermogen BgSilAHVBeitrag] Load'),
    LOAD_SUCCESS: type('[Vermogen BgSilAHVBeitrag] Load Success'),
    LOAD_FAIL: type('[Vermogen BgSilAHVBeitrag] Load Fail')
};

const SetIdVerMogenTypes = {
    LOAD: type('[Vermogen SetIdVerMogen] Load'),
    LOAD_SUCCESS: type('[Vermogen SetIdVerMogen] Load Success'),
    LOAD_FAIL: type('[Vermogen SetIdVerMogen] Load Fail')
};

const ResetStateTypes = {
    RESET_STATE: type('[Vermogen] Reset State')
};
export const VermogenActionTypes = {
    VermogenAction: type('[Vermogen] Action'),
    BgPositionTypes: BgPositionTypes,
    BgFinanzplanTypes: BgFinanzplanTypes,
    PersonenTypes: PersonenTypes,
    WhPositionsartTypes: WhPositionsartTypes,
    DelBgPositionTypes: DelBgPositionTypes,
    FreibetragTypes: FreibetragTypes,
    InsertBgPositionTypes: InsertBgPositionTypes,
    UpdateBgPositionTypes: UpdateBgPositionTypes,
    BgSilAHVBeitragTypes: BgSilAHVBeitragTypes,
    SetIdVerMogenTypes: SetIdVerMogenTypes,
    ResetStateTypes: ResetStateTypes
};

export class VermogenAction implements AppStateAction {
    readonly type = VermogenActionTypes.VermogenAction;
    constructor(public payload?: any) {
    }
}

// BgPosition Actions
export namespace BgPositionDatas {
    export class LoadAction implements AppStateAction {
        readonly type = BgPositionTypes.LOAD;
        constructor(public payload?: any) {
        }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = BgPositionTypes.LOAD_SUCCESS;
        constructor(public payload?: any) {
        }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = BgPositionTypes.LOAD_FAIL;
        constructor(public payload?: any) {
        }
    }
}

// BgFinanzplan Actions
export namespace BgFinanzplanDatas {
    export class LoadAction implements AppStateAction {
        readonly type = BgFinanzplanTypes.LOAD;
        constructor(public payload?: any) {
        }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = BgFinanzplanTypes.LOAD_SUCCESS;
        constructor(public payload?: any) {
        }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = BgFinanzplanTypes.LOAD_FAIL;
        constructor(public payload?: any) {
        }
    }
}


/**
 * Personen Actions
 */
export namespace PersonenDatas {
    export class LoadAction implements AppStateAction {
        readonly type = PersonenTypes.LOAD;
        constructor(public payload?: any) {
        }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = PersonenTypes.LOAD_SUCCESS;
        constructor(public payload?: any) {
        }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = PersonenTypes.LOAD_FAIL;
        constructor(public payload?: any) {
        }
    }
}

export namespace WhPositionsartDatas {
    export class LoadAction implements AppStateAction {
        readonly type = WhPositionsartTypes.LOAD;
        constructor(public payload?: any) {
        }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = WhPositionsartTypes.LOAD_SUCCESS;
        constructor(public payload?: any) {
        }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = WhPositionsartTypes.LOAD_FAIL;
        constructor(public payload?: any) {
        }
    }
}

export namespace DelBgPositionAction {
    export class DelAction implements AppStateAction {
        readonly type = DelBgPositionTypes.DEL;
        constructor(public payload?: any) { }
    }

    export class DelSuccessAction implements AppStateAction {
        readonly type = DelBgPositionTypes.DEL_SUCCESS;
        constructor(public payload?: any) { }
    }

    export class DelFailAction implements AppStateAction {
        readonly type = DelBgPositionTypes.DEL_FAIL;
        constructor(public payload?: any) { }
    }
}

/**
 * Calculate Freibetrag
 */
export namespace FreibetragDatas {
    export class LoadAction implements AppStateAction {
        readonly type = FreibetragTypes.LOAD;
        constructor(public payload?: any) {
        }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = FreibetragTypes.LOAD_SUCCESS;
        constructor(public payload?: any) {
        }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = FreibetragTypes.LOAD_FAIL;
        constructor(public payload?: any) {
        }
    }
}

/**
 * Insert BgPosition
 */
export namespace InsertBgPositionAction {
    export class InsertAction implements AppStateAction {
        readonly type = InsertBgPositionTypes.INSERT;
        constructor(public payload?: any) {
        }
    }

    export class InsertSuccessAction implements AppStateAction {
        readonly type = InsertBgPositionTypes.INSERT_SUCCESS;
        constructor(public payload?: any) {
        }
    }

    export class InsertFailAction implements AppStateAction {
        readonly type = InsertBgPositionTypes.INSERT_FAIL;
        constructor(public payload?: any) {
        }
    }
}

/**
 * Update BgPosition
 */
export namespace UpdateBgPositionAction {
    export class UpdateAction implements AppStateAction {
        readonly type = UpdateBgPositionTypes.UPDATE;
        constructor(public payload?: any) {
        }
    }

    export class UpdateSuccessAction implements AppStateAction {
        readonly type = UpdateBgPositionTypes.UPDATE_SUCCESS;
        constructor(public payload?: any) {
        }
    }

    export class UpdateFailAction implements AppStateAction {
        readonly type = UpdateBgPositionTypes.UPDATE_FAIL;
        constructor(public payload?: any) {
        }
    }
}

// BgSilAHVBeitrag Actions
export namespace BgSilAHVBeitragDatas {
    export class LoadAction implements AppStateAction {
        readonly type = BgSilAHVBeitragTypes.LOAD;
        constructor(public payload?: any) {
        }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = BgSilAHVBeitragTypes.LOAD_SUCCESS;
        constructor(public payload?: any) {
        }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = BgSilAHVBeitragTypes.LOAD_FAIL;
        constructor(public payload?: any) {
        }
    }
}

// Set ID VerMonge Actions
export namespace SetVermongeDatas {
    export class LoadAction implements AppStateAction {
        readonly type = SetIdVerMogenTypes.LOAD;
        constructor(public payload?: any) {
        }
    }
}
export namespace ResetStateDatas {
    export class ResetStateAction implements AppStateAction {
        readonly type = ResetStateTypes.RESET_STATE;
        constructor(public payload?: any) {
        }
    }
}

export type VermogenActions
    = VermogenAction

    | BgPositionDatas.LoadAction
    | BgPositionDatas.LoadSuccessAction
    | BgPositionDatas.LoadFailAction

    | BgFinanzplanDatas.LoadAction
    | BgFinanzplanDatas.LoadSuccessAction
    | BgFinanzplanDatas.LoadFailAction

    | PersonenDatas.LoadAction
    | PersonenDatas.LoadSuccessAction
    | PersonenDatas.LoadFailAction

    | WhPositionsartDatas.LoadAction
    | WhPositionsartDatas.LoadSuccessAction
    | WhPositionsartDatas.LoadFailAction

    | DelBgPositionAction.DelAction
    | DelBgPositionAction.DelSuccessAction
    | DelBgPositionAction.DelFailAction

    | FreibetragDatas.LoadAction
    | FreibetragDatas.LoadSuccessAction
    | FreibetragDatas.LoadFailAction

    | InsertBgPositionAction.InsertAction
    | InsertBgPositionAction.InsertSuccessAction
    | InsertBgPositionAction.InsertFailAction

    | UpdateBgPositionAction.UpdateAction
    | UpdateBgPositionAction.UpdateSuccessAction
    | UpdateBgPositionAction.UpdateFailAction

    | BgSilAHVBeitragDatas.LoadAction
    | BgSilAHVBeitragDatas.LoadSuccessAction
    | BgSilAHVBeitragDatas.LoadFailAction

    | SetVermongeDatas.LoadAction
    | ResetStateDatas.ResetStateAction;


