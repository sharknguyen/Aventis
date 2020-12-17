import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const ErwerbseinkommenLoadType = {
    LOAD: type('[Erwerbseinkommen] Load Data'),
    LOAD_SUCCESS: type('[Erwerbseinkommen] Load Data Success'),
    LOAD_FAIL: type('[Erwerbseinkommen] Load Data Fail')
};

const ErwerbseinkommenAddType = {
    ADD: type('[Erwerbseinkommen] Add New'),
    ADD_SUCCESS: type('[Erwerbseinkommen] Add New Success'),
    ADD_FAIL: type('[Erwerbseinkommen] Add New Fail')
};

const ErwerbseinkommenUpdateType = {
    PUT: type('[Erwerbseinkommen] Update Data'),
    PUT_SUCCESS: type('[Erwerbseinkommen] Update Data Success'),
    PUT_FAIL: type('[Erwerbseinkommen] Update Data Fail')
};

const ErwerbseinkommenDelType = {
    DEL: type('[Erwerbseinkommen] Delete Data'),
    DEL_SUCCESS: type('[Erwerbseinkommen] Delete Data Success'),
    DEL_FAIL: type('[Erwerbseinkommen] Delete Data Fail')
};

// BgErwerbseinkommen

const BgErwerbseinkommenLoadType = {
    LOAD: type('[Erwerbseinkommen] Load Data BgErwerbseinkommen'),
    LOAD_SUCCESS: type('[Erwerbseinkommen] Load Data BgErwerbseinkommen Success'),
    LOAD_FAIL: type('[Erwerbseinkommen] Load Data BgErwerbseinkommen Fail')
};

const BgErwerbseinkommenAddType = {
    ADD: type('[Erwerbseinkommen] Add BgErwerbseinkommen New'),
    ADD_SUCCESS: type('[Erwerbseinkommen] Add BgErwerbseinkommen New Success'),
    ADD_FAIL: type('[Erwerbseinkommen] Add BgErwerbseinkommen New Fail')
};

const BgErwerbseinkommenUpdateType = {
    PUT: type('[Erwerbseinkommen] Update BgErwerbseinkommen Data'),
    PUT_SUCCESS: type('[Erwerbseinkommen] Update BgErwerbseinkommen Data Success'),
    PUT_FAIL: type('[Erwerbseinkommen] Update BgErwerbseinkommen Data Fail')
};

const BgErwerbseinkommenDelType = {
    DEL: type('[Erwerbseinkommen] Delete BgErwerbseinkommen Data'),
    DEL_SUCCESS: type('[Erwerbseinkommen] Delete BgErwerbseinkommen Data Success'),
    DEL_FAIL: type('[Erwerbseinkommen] Delete BgErwerbseinkommen Data Fail')
};

// BgErwerbseinkommenDropdown

const BgErwerbseinkommenDropdownLoadType = {
    LOAD: type('[Erwerbseinkommen] Load BgErwerbseinkommenDropdown Data'),
    LOAD_SUCCESS: type('[Erwerbseinkommen] Load BgErwerbseinkommenDropdown Data Success'),
    LOAD_FAIL: type('[Erwerbseinkommen] Load BgErwerbseinkommenDropdown Data Fail')
};

// BgBewilligungStatusCode

const BgBewilligungStatusCodeLoadType = {
    LOAD: type('[Erwerbseinkommen] Load BgBewilligungStatusCode Data'),
    LOAD_SUCCESS: type('[Erwerbseinkommen] Load BgBewilligungStatusCode Data Success'),
    LOAD_FAIL: type('[Erwerbseinkommen] Load BgBewilligungStatusCode Data Fail')
};

export const ErwerbseinkommenActionTypes = {
    ErwerbseinkommenAction: type('[Erwerbseinkommen] Action' ),
    ErwerbseinkommenLoadType: ErwerbseinkommenLoadType,
    ErwerbseinkommenAddType: ErwerbseinkommenAddType,
    ErwerbseinkommenUpdateType: ErwerbseinkommenUpdateType,
    ErwerbseinkommenDelType: ErwerbseinkommenDelType,
    BgErwerbseinkommenLoadType: BgErwerbseinkommenLoadType,
    BgErwerbseinkommenAddType: BgErwerbseinkommenAddType,
    BgErwerbseinkommenUpdateType: BgErwerbseinkommenUpdateType,
    BgErwerbseinkommenDelType: BgErwerbseinkommenDelType,
    BgErwerbseinkommenDropdownLoadType: BgErwerbseinkommenDropdownLoadType,
    BgBewilligungStatusCodeLoadType: BgBewilligungStatusCodeLoadType
};

export class ErwerbseinkommenAction implements AppStateAction {
    readonly type = ErwerbseinkommenActionTypes.ErwerbseinkommenAction;
    constructor(public payload?: any) {
    }
}

export namespace ErwerbseinkommenLoadData {
    export class LoadAction implements AppStateAction {
        readonly type = ErwerbseinkommenLoadType.LOAD;
        constructor(public payload?: any) {
        }
    }
    export class LoadSuccessAction implements AppStateAction {
        readonly type = ErwerbseinkommenLoadType.LOAD_SUCCESS;
        constructor(public payload?: any) {
        }
    }
    export class LoadFailAction implements AppStateAction {
        readonly type = ErwerbseinkommenLoadType.LOAD_FAIL;
        constructor(public payload?: any) {
        }
    }
}

export namespace ErwerbseinkommenAddData {
    export class AddNewAction implements AppStateAction {
        readonly type = ErwerbseinkommenAddType.ADD;
        constructor(public payload?: any) {
        }
    }
    export class AddNewSuccessAction implements AppStateAction {
        readonly type = ErwerbseinkommenAddType.ADD_SUCCESS;
        constructor(public payload?: any) {
        }
    }
    export class AddNewFailAction implements AppStateAction {
        readonly type = ErwerbseinkommenAddType.ADD_FAIL;
        constructor(public payload?: any) {
        }
    }
}

export namespace ErwerbseinkommenUpdateData {
    export class UpdateAction implements AppStateAction {
        readonly type = ErwerbseinkommenUpdateType.PUT;
        constructor(public payload?: any) {
        }
    }
    export class UpdateSuccessAction implements AppStateAction {
        readonly type = ErwerbseinkommenUpdateType.PUT_SUCCESS;
        constructor(public payload?: any) {
        }
    }
    export class UpdateFailAction implements AppStateAction {
        readonly type = ErwerbseinkommenUpdateType.PUT_FAIL;
        constructor(public payload?: any) {
        }
    }
}

export namespace ErwerbseinkommenDelData {
    export class DeleteAction implements AppStateAction {
        readonly type = ErwerbseinkommenDelType.DEL;
        constructor(public payload?: any) {
        }
    }
    export class DeleteSuccessAction implements AppStateAction {
        readonly type = ErwerbseinkommenDelType.DEL_SUCCESS;
        constructor(public payload?: any) {
        }
    }
    export class DeleteFailAction implements AppStateAction {
        readonly type = ErwerbseinkommenDelType.DEL_FAIL;
        constructor(public payload?: any) {
        }
    }
}

export namespace BgErwerbseinkommenLoadData {
    export class LoadAction implements AppStateAction {
        readonly type = BgErwerbseinkommenLoadType.LOAD;
        constructor(public payload?: any) {
        }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = BgErwerbseinkommenLoadType.LOAD_SUCCESS;
        constructor(public payload?: any) {
        }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = BgErwerbseinkommenLoadType.LOAD_FAIL;
        constructor(public payload?: any) {
        }
    }
}

export namespace BgErwerbseinkommenAddData {
    export class AddAction implements AppStateAction {
        readonly type = BgErwerbseinkommenAddType.ADD;
        constructor(public payload?: any) {
        }
    }

    export class AddSuccessAction implements AppStateAction {
        readonly type = BgErwerbseinkommenAddType.ADD_SUCCESS;
        constructor(public payload?: any) {
        }
    }

    export class AddFailAction implements AppStateAction {
        readonly type = BgErwerbseinkommenAddType.ADD_FAIL;
        constructor(public payload?: any) {
        }
    }
}

export namespace BgErwerbseinkommenUpdateData {
    export class UpdateAction implements AppStateAction {
        readonly type = BgErwerbseinkommenUpdateType.PUT;
        constructor(public payload?: any) {
        }
    }

    export class UpdateSuccessAction implements AppStateAction {
        readonly type = BgErwerbseinkommenUpdateType.PUT_SUCCESS;
        constructor(public payload?: any) {
        }
    }

    export class UpdateFailAction implements AppStateAction {
        readonly type = BgErwerbseinkommenUpdateType.PUT_FAIL;
        constructor(public payload?: any) {
        }
    }
}

export namespace BgErwerbseinkommenDeleteData {
    export class DeleteAction implements AppStateAction {
        readonly type = BgErwerbseinkommenDelType.DEL;
        constructor(public payload?: any) {
        }
    }

    export class DeleteSuccessAction implements AppStateAction {
        readonly type = BgErwerbseinkommenDelType.DEL_SUCCESS;
        constructor(public payload?: any) {
        }
    }

    export class DeleteFailAction implements AppStateAction {
        readonly type = BgErwerbseinkommenDelType.DEL_FAIL;
        constructor(public payload?: any) {
        }
    }
}

export namespace BgErwerbseinkommenDropdownLoadData {
    export class LoadAction implements AppStateAction {
        readonly type = BgErwerbseinkommenDropdownLoadType.LOAD;
        constructor(public payload?: any) {
        }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = BgErwerbseinkommenDropdownLoadType.LOAD_SUCCESS;
        constructor(public payload?: any) {
        }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = BgErwerbseinkommenDropdownLoadType.LOAD_FAIL;
        constructor(public payload?: any) {
        }
    }
}

export namespace BgBewilligungStatusCodeLoadData {
    export class LoadAction implements AppStateAction {
        readonly type = BgBewilligungStatusCodeLoadType.LOAD;
        constructor(public payload?: any) {
        }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = BgBewilligungStatusCodeLoadType.LOAD_SUCCESS;
        constructor(public payload?: any) {
        }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = BgBewilligungStatusCodeLoadType.LOAD_FAIL;
        constructor(public payload?: any) {
        }
    }
}

export type ErwerbseinkommenActions
    = ErwerbseinkommenAction
    | ErwerbseinkommenLoadData.LoadAction | ErwerbseinkommenLoadData.LoadSuccessAction | ErwerbseinkommenLoadData.LoadFailAction
    | ErwerbseinkommenAddData.AddNewAction | ErwerbseinkommenAddData.AddNewSuccessAction | ErwerbseinkommenAddData.AddNewFailAction
    | ErwerbseinkommenUpdateData.UpdateAction | ErwerbseinkommenUpdateData.UpdateSuccessAction | ErwerbseinkommenUpdateData.UpdateFailAction
    | ErwerbseinkommenDelData.DeleteAction | ErwerbseinkommenDelData.DeleteSuccessAction | ErwerbseinkommenDelData.DeleteFailAction
    | BgErwerbseinkommenLoadData.LoadAction | BgErwerbseinkommenLoadData.LoadSuccessAction | BgErwerbseinkommenLoadData.LoadFailAction
    | BgErwerbseinkommenAddData.AddAction | BgErwerbseinkommenAddData.AddSuccessAction | BgErwerbseinkommenAddData.AddFailAction
    | BgErwerbseinkommenUpdateData.UpdateAction | BgErwerbseinkommenUpdateData.UpdateSuccessAction | BgErwerbseinkommenUpdateData.UpdateFailAction
    | BgErwerbseinkommenDeleteData.DeleteAction | BgErwerbseinkommenDeleteData.DeleteSuccessAction | BgErwerbseinkommenDeleteData.DeleteFailAction
    | BgErwerbseinkommenDropdownLoadData.LoadAction | BgErwerbseinkommenDropdownLoadData.LoadSuccessAction | BgErwerbseinkommenDropdownLoadData.LoadFailAction
    | BgBewilligungStatusCodeLoadData.LoadAction | BgBewilligungStatusCodeLoadData.LoadSuccessAction | BgBewilligungStatusCodeLoadData.LoadFailAction;
