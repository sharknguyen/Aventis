import {type} from '@shared/utilites/utilityHelpers';
import {AppStateAction} from '@shared/AppAction';
import {BgPositionData} from '@app/kiss4-sozialhilfe/finanzplan/zulagen-efb/models';


const BgSilAHVBeitragTypes = {
  LOAD: type('[Zulagen BgSilAHVBeitrag] Load'),
  LOAD_SUCCESS: type('[Zulagen BgSilAHVBeitrag] Load Success'),
  LOAD_FAIL: type('[Zulagen BgSilAHVBeitrag] Load Fail')
};

// Load data Combobox
const ComboboxDatasTypes = {
  LOAD: type('[Zulagen InitDatas] Load'),
  LOAD_SUCCESS: type('[Zulagen InitDatas] Load Success'),
  LOAD_FAIL: type('[Zulagen InitDatas] Load Fail')
};

// Load data BgPosition
const BgPositionTypes = {
  LOAD: type('[Zulagen BgPosition] Load'),
  LOAD_SUCCESS: type('[Zulagen BgPosition] Load Success'),
  LOAD_FAIL: type('[Zulagen BgPosition] Load Fail')
};

// Load Richtlinie data
const RichtLinieTypes = {
  LOAD: type('[Zulagen Richtlinie] Load'),
  LOAD_SUCCESS: type('[Zulagen Richtlinie] Load Success'),
  LOAD_FAIL: type('[Zulagen Richtlinie] Load Fail')
};

// Load BgPositionsart data
const BgPositionsartTypes = {
  LOAD: type('[Zulagen BgPositionsart] Load'),
  LOAD_SUCCESS: type('[Zulagen BgPositionsart] Load Success'),
  LOAD_FAIL: type('[Zulagen BgPositionsart] Load Fail')
};

// Load BgPositionsartId data
const BgPositionsartIdTypes = {
  LOAD: type('[Zulagen BgPositionsartId] Load'),
  LOAD_SUCCESS: type('[Zulagen BgPositionsartId] Load Success'),
  LOAD_FAIL: type('[Zulagen BgPositionsartId] Load Fail')
};

const BgPositionUpdateTypes = {
  PUT: type('[BgPositionUpdate] Load'),
  PUT_SUCCESS: type('[BgPositionUpdateUpdate] Load Success'),
  PUT_FAIL: type('[BgPositionUpdateUpdate] Load Fail')
};

const SetIdZulagenTypes = {
  LOAD: type('[Zulagen SetIdVerMogen] Load'),
  LOAD_SUCCESS: type('[Zulagen SetIdVerMogen] Load Success'),
  LOAD_FAIL: type('[Zulagen SetIdVerMogen] Load Fail')
};

export const ZulagenEFBActionTypes = {
  ZulagenEFBAction: type('[ZulagenEFB] Action'),
  BgSilAHVBeitragTypes: BgSilAHVBeitragTypes,
  ComboboxDatasTypes: ComboboxDatasTypes,
  BgPositionTypes: BgPositionTypes,
  RichtLinieTypes: RichtLinieTypes,
  BgPositionsartTypes: BgPositionsartTypes,
  BgPositionsartIdTypes: BgPositionsartIdTypes,
  BgPositionUpdateTypes: BgPositionUpdateTypes,
  SetIdZulagenTypes: SetIdZulagenTypes
};

export class ZulagenEFBAction implements AppStateAction {
  readonly type = ZulagenEFBActionTypes.ZulagenEFBAction;

  constructor(public payload?: any) {
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

/**
 * *****************************************************************
 * ComboboxDatasTypes Actions
 * *****************************************************************
 */
export namespace ZulagenComboboxInitDatas {
  export class LoadAction implements AppStateAction {
    readonly type = ComboboxDatasTypes.LOAD;

    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = ComboboxDatasTypes.LOAD_SUCCESS;

    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = ComboboxDatasTypes.LOAD_FAIL;

    constructor(public payload?: any) {
    }
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

// Richtlinie Actions
export namespace RichtLinieDatas {
  export class LoadAction implements AppStateAction {
    readonly type = RichtLinieTypes.LOAD;

    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = RichtLinieTypes.LOAD_SUCCESS;

    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = RichtLinieTypes.LOAD_FAIL;

    constructor(public payload?: any) {
    }
  }
}

// BgPositionsart Actions
export namespace BgPositionsartDatas {
  export class LoadAction implements AppStateAction {
    readonly type = BgPositionsartTypes.LOAD;

    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = BgPositionsartTypes.LOAD_SUCCESS;

    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = BgPositionsartTypes.LOAD_FAIL;

    constructor(public payload?: any) {
    }
  }
}

// BgPositionsartId Actions
export namespace BgPositionsartIdDatas {
  export class LoadAction implements AppStateAction {
    readonly type = BgPositionsartIdTypes.LOAD;

    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = BgPositionsartIdTypes.LOAD_SUCCESS;

    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = BgPositionsartIdTypes.LOAD_FAIL;

    constructor(public payload?: any) {
    }
  }
}

// BgPosition Actions update
export namespace BgPositionUpdateDatas {
  export class UpdadeAction implements AppStateAction {
    readonly type = BgPositionUpdateTypes.PUT;

    constructor(public payload?: BgPositionData) {
    }
  }

  export class UpdateSuccessAction implements AppStateAction {
    readonly type = BgPositionUpdateTypes.PUT_SUCCESS;

    constructor(public payload?: any) {
    }
  }

  export class UpdateFailAction implements AppStateAction {
    readonly type = BgPositionUpdateTypes.PUT_FAIL;

    constructor(public payload?: any) {
    }
  }
}

// Set ID VerMonge Actions
export namespace SetZulagenDatas {
  export class LoadAction implements AppStateAction {
      readonly type = SetIdZulagenTypes.LOAD;
      constructor(public payload?: any) {
      }
  }
}

export type ZulagenEFBActions
  = ZulagenEFBAction
  | BgSilAHVBeitragDatas.LoadAction
  | BgSilAHVBeitragDatas.LoadSuccessAction
  | BgSilAHVBeitragDatas.LoadFailAction

  | ZulagenComboboxInitDatas.LoadAction
  | ZulagenComboboxInitDatas.LoadSuccessAction
  | ZulagenComboboxInitDatas.LoadFailAction

  | BgPositionDatas.LoadAction
  | BgPositionDatas.LoadSuccessAction
  | BgPositionDatas.LoadFailAction

  | RichtLinieDatas.LoadAction
  | RichtLinieDatas.LoadSuccessAction
  | RichtLinieDatas.LoadFailAction

  | BgPositionsartDatas.LoadAction
  | BgPositionsartDatas.LoadSuccessAction
  | BgPositionsartDatas.LoadFailAction

  | BgPositionsartIdDatas.LoadAction
  | BgPositionsartIdDatas.LoadSuccessAction
  | BgPositionsartIdDatas.LoadFailAction

  | BgPositionUpdateDatas.UpdadeAction
  | BgPositionUpdateDatas.UpdateSuccessAction
  | BgPositionUpdateDatas.UpdateFailAction

  | SetZulagenDatas.LoadAction;
