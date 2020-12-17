import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const BgFinanzplanTypes = {
  LOAD: type('[BgFinanzplan] Load Data Search'),
  LOAD_SUCCESS: type('[BgFinanzplan] Load Data Search Success'),
  LOAD_FAIL: type('[BgFinanzplan] Load Data Search Fail')
};
const BgGrundbedarfTypes = {
  LOAD: type('[BgGrundbedarf] Load Data Search'),
  LOAD_SUCCESS: type('[BgGrundbedarf] Load Data Search Success'),
  LOAD_FAIL: type('[BgGrundbedarf] Load Data Search Fail')
};
const BgPositionsartTypes = {
  LOAD: type('[BgPositionsart] Load Data Search'),
  LOAD_SUCCESS: type('[BgPositionsart] Load Data Search Success'),
  LOAD_FAIL: type('[BgPositionsart] Load Data Search Fail')
};
const BgPositionTypes = {
  LOAD: type('[BgPosition] Load Data Search'),
  LOAD_SUCCESS: type('[BgPosition] Load Data Search Success'),
  LOAD_FAIL: type('[BgPosition] Load Data Search Fail')
};
const WhKennzahlenTypes = {
  LOAD: type('[WhKennzahlen] Load Data Search'),
  LOAD_SUCCESS: type('[WhKennzahlen] Load Data Search Success'),
  LOAD_FAIL: type('[WhKennzahlen] Load Data Search Fail')
};
const RichtlinienTypes = {
  LOAD: type('[WohnkostenList] Load Data Search'),
  LOAD_SUCCESS: type('[WohnkostenList] Load Data Search Success'),
  LOAD_FAIL: type('[WohnkostenList] Load Data Search Fail')
};
const WohnkostenDeleteTypes = {
  LOAD: type('[WohnkostenDelete] Load'),
  LOAD_SUCCESS: type('[WohnkostenDelete] Load Success'),
  LOAD_FAIL: type('[WohnkostenDelete] Load Fail')
};

const WohnkostenUpdateTypes = {
  LOAD: type('[WohnkostenUpdate] Load'),
  LOAD_SUCCESS: type('[WohnkostenUpdate] Load Success'),
  LOAD_FAIL: type('[WohnkostenUpdate] Load Fail')
};

const WohnkostenCreateTypes = {
  LOAD: type('[WohnkostenCreate] Load'),
  LOAD_SUCCESS: type('[WohnkostenCreate] Load Success'),
  LOAD_FAIL: type('[WohnkostenCreate] Load Fail')
};
export const WohnkostenActionTypes = {
  WohnkostenAction: type('[Wohnkosten] Action'),
  BgFinanzplanTypes: BgFinanzplanTypes,
  BgGrundbedarfTypes: BgGrundbedarfTypes,
  BgPositionsartTypes: BgPositionsartTypes,
  BgPositionTypes: BgPositionTypes,
  WhKennzahlenTypes: WhKennzahlenTypes,
  RichtlinienTypes: RichtlinienTypes,
  WohnkostenDeleteTypes: WohnkostenDeleteTypes,
  WohnkostenUpdateTypes: WohnkostenUpdateTypes,
  WohnkostenCreateTypes: WohnkostenCreateTypes
};


/**
 * Wohnkosten action
 */
export class WohnkostenAction implements AppStateAction {
  readonly type = WohnkostenActionTypes.WohnkostenAction;

  constructor(public payload?: any) {
  }
}

// Wohnkosten Actions get BgFinanzplan
export namespace BgFinanzplanDatas {
  export class LoadAction implements AppStateAction {
    readonly type = BgFinanzplanTypes.LOAD;

    constructor(public payload?: number) {
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

// Wohnkosten Actions get BgGrundbedarf
export namespace BgGrundbedarfDatas {
  export class LoadAction implements AppStateAction {
    readonly type = BgGrundbedarfTypes.LOAD;

    constructor(public payload?: number) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = BgGrundbedarfTypes.LOAD_SUCCESS;

    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = BgGrundbedarfTypes.LOAD_FAIL;

    constructor(public payload?: any) {
    }
  }
}

// Wohnkosten Actions get BgPositionsart
export namespace BgPositionsartDatas {
  export class LoadAction implements AppStateAction {
    readonly type = BgPositionsartTypes.LOAD;

    constructor(public payload?: number) {
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

// Wohnkosten Actions get BgPosition
export namespace BgPositionDatas {
  export class LoadAction implements AppStateAction {
    readonly type = BgPositionTypes.LOAD;

    constructor(public payload?: number) {
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

// Wohnkosten Actions get WhKennzahlen
export namespace WhKennzahlenDatas {
  export class LoadAction implements AppStateAction {
    readonly type = WhKennzahlenTypes.LOAD;

    constructor(public payload?: number) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = WhKennzahlenTypes.LOAD_SUCCESS;

    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = WhKennzahlenTypes.LOAD_FAIL;

    constructor(public payload?: any) {
    }
  }
}

// Wohnkosten Actions get Richtlinien
export namespace RichtlinienDatas {
  export class LoadAction implements AppStateAction {
    readonly type = RichtlinienTypes.LOAD;

    constructor(public payload?: number) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = RichtlinienTypes.LOAD_SUCCESS;

    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = RichtlinienTypes.LOAD_FAIL;

    constructor(public payload?: any) {
    }
  }
}


// Wohnkosten Actions delete
export namespace WohnkostenDeleteDatas {
  export class LoadAction implements AppStateAction {
    readonly type = WohnkostenDeleteTypes.LOAD;

    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = WohnkostenDeleteTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = WohnkostenDeleteTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

// Wohnkosten Actions update
export namespace WohnkostenUpdateDatas {
  export class LoadAction implements AppStateAction {
    readonly type = WohnkostenUpdateTypes.LOAD;

    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = WohnkostenUpdateTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = WohnkostenUpdateTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

// Wohnkosten Actions create
export namespace WohnkostenCreateDatas {
  export class LoadAction implements AppStateAction {
    readonly type = WohnkostenCreateTypes.LOAD;

    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = WohnkostenCreateTypes.LOAD_SUCCESS;

    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = WohnkostenCreateTypes.LOAD_FAIL;

    constructor(public payload?: any) { }
  }
}

export type WohnkostenActions
  = WohnkostenAction
  | BgFinanzplanDatas.LoadAction
  | BgFinanzplanDatas.LoadSuccessAction
  | BgFinanzplanDatas.LoadFailAction
  | BgGrundbedarfDatas.LoadAction
  | BgGrundbedarfDatas.LoadSuccessAction
  | BgGrundbedarfDatas.LoadFailAction
  | BgPositionsartDatas.LoadAction
  | BgPositionsartDatas.LoadSuccessAction
  | BgPositionsartDatas.LoadFailAction
  | BgPositionDatas.LoadAction
  | BgPositionDatas.LoadFailAction
  | BgPositionDatas.LoadSuccessAction
  | WhKennzahlenDatas.LoadAction
  | WhKennzahlenDatas.LoadFailAction
  | WhKennzahlenDatas.LoadSuccessAction
  | RichtlinienDatas.LoadAction
  | RichtlinienDatas.LoadSuccessAction
  | RichtlinienDatas.LoadFailAction
  | WohnkostenDeleteDatas.LoadAction
  | WohnkostenDeleteDatas.LoadSuccessAction
  | WohnkostenDeleteDatas.LoadFailAction
  | WohnkostenUpdateDatas.LoadAction
  | WohnkostenUpdateDatas.LoadSuccessAction
  | WohnkostenUpdateDatas.LoadFailAction
  | WohnkostenCreateDatas.LoadAction
  | WohnkostenCreateDatas.LoadSuccessAction
  | WohnkostenCreateDatas.LoadFailAction;
