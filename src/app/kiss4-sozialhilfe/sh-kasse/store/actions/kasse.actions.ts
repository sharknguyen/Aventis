import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';

const KasseDatasTypes = {
  LOAD: type('[Kasse InitDatas] Load'),
  LOAD_SUCCESS: type('[Kasse InitDatas] Load Success'),
  LOAD_FAIL: type('[Kasse InitDatas] Load Fail')
};
const KasseStateTypes = {
  RESET_STATE: type('[Kasse State] Reset'),
};
const DropDownTypes = {
  LOAD: type('[Kasse DropDown] Load'),
  LOAD_SUCCESS: type('[Kasse DropDown] Load Success'),
  LOAD_FAIL: type('[Kasse DropDown] Load Fail')
};
const KbBuchungTypes = {
  UPDATE: type('[KbBuchung Update] Load'),
  UPDATE_SUCCESS: type('[KbBuchung Update] Load Success'),
  UPDATE_FAIL: type('[KbBuchung Update] Load Fail')
};
const KbBuchungStatusTypes = {
  UPDATE: type('[KbBuchungStatus Update] Load'),
  UPDATE_SUCCESS: type('[KbBuchungStatus Update] Load Success'),
  UPDATE_FAIL: type('[KbBuchungStatus Update] Load Fail')
};

export const KasseActionTypes = {
  KasseAction: type('[Kasse] Action'),
  KasseDatasTypes: KasseDatasTypes,
  KasseStateTypes: KasseStateTypes,
  DropDownTypes: DropDownTypes,
  KbBuchungTypes: KbBuchungTypes,
  KbBuchungStatusTypes: KbBuchungStatusTypes,
};

export class KasseAction implements AppStateAction {
  readonly type = KasseActionTypes.KasseAction;
  constructor(public payload?: any) { }
}


/**
 * KasseDatasTypes Action
 */
export namespace KasseAction {
  export class LoadAction implements AppStateAction {
    readonly type = KasseDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = KasseDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = KasseDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
export namespace KasseStateAction {
  export class ResetAction implements AppStateAction {
    readonly type = KasseStateTypes.RESET_STATE;
    constructor(public payload?: any) { }
  }
}
/**
 * DropDown Action
 */
export namespace DropDownAction {
  export class LoadAction implements AppStateAction {
    readonly type = DropDownTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = DropDownTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = DropDownTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
/**
 * Update KbBuchung Action
 */
export namespace KbBuchungAction {
  export class UpdateAction implements AppStateAction {
    readonly type = KbBuchungTypes.UPDATE;
    constructor(public payload?: any) { }
  }

  export class UpdateSuccessAction implements AppStateAction {
    readonly type = KbBuchungTypes.UPDATE_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class UpdateFailAction implements AppStateAction {
    readonly type = KbBuchungTypes.UPDATE_FAIL;
    constructor(public payload?: any) { }
  }
}
/**
 * Update KbBuchungStatus Action
 */
export namespace KbBuchungStatusAction {
  export class UpdateAction implements AppStateAction {
    readonly type = KbBuchungStatusTypes.UPDATE;
    constructor(public payload?: any) { }
  }

  export class UpdateSuccessAction implements AppStateAction {
    readonly type = KbBuchungStatusTypes.UPDATE_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class UpdateFailAction implements AppStateAction {
    readonly type = KbBuchungStatusTypes.UPDATE_FAIL;
    constructor(public payload?: any) { }
  }
}
export type KasseActions
  = KasseAction
  | KasseAction.LoadAction
  | KasseAction.LoadSuccessAction
  | KasseAction.LoadFailAction
  | KasseStateAction.ResetAction
  | DropDownAction.LoadAction
  | DropDownAction.LoadSuccessAction
  | DropDownAction.LoadFailAction;

