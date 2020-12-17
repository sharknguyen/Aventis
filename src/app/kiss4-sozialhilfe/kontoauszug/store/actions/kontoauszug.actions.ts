import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites';

export const GetPersonnenTypes = {
  LOAD: type('[Kontoauszug] Load Personnen'),
  LOAD_SUCCESS: type('[Kontoauszug] Load Personnen Success'),
  LOAD_FAIL: type('[Kontoauszug] Load Personnen Fail')
};

export const GetZeitraumTypes = {
  LOAD: type('[Kontoauszug] Load Zeitraum'),
  LOAD_SUCCESS: type('[Kontoauszug] Load Zeitraum Success'),
  LOAD_FAIL: type('[Kontoauszug] Load Zeitraum Fail')
};

export const GetKostenartTypes = {
  LOAD: type('[Kontoauszug] Load Kostenart'),
  LOAD_SUCCESS: type('[Kontoauszug] Load Kostenart Success'),
  LOAD_FAIL: type('[Kontoauszug] Load Kostenart Fail')
};

export const SearchKontoauszugTypes = {
  LOAD: type('[Kontoauszug] Search Kontoauszug'),
  LOAD_SUCCESS: type('[Kontoauszug] Search Kontoauszug Success'),
  LOAD_FAIL: type('[Kontoauszug] Search Kontoauszug Fail')
};

export const GetLovLookupsTypes = {
  LOAD: type('[Kontoauszug] Get LovLookups'),
  LOAD_SUCCESS: type('[Kontoauszug] Get LovLookups Success'),
  LOAD_FAIL: type('[Kontoauszug] Get LovLookups Fail')
};

export const KontoauszugActionTypes = {
  KontoauszugAction: type('[Kontoauszug] Action'),
  ResetStateAction: type('[Kontoauszug] Reset state'),
  GetPersonnenTypes: GetPersonnenTypes,
  GetZeitraumTypes: GetZeitraumTypes,
  GetKostenartTypes: GetKostenartTypes,
  SearchKontoauszugTypes: SearchKontoauszugTypes,
  GetLovLookupsTypes: GetLovLookupsTypes
};

export class KontoauszugAction implements AppStateAction {
  readonly type = KontoauszugActionTypes.KontoauszugAction;
  constructor(public payload?: any) {
  }
}

export class ResetStateAction implements AppStateAction {
  readonly type = KontoauszugActionTypes.ResetStateAction;
  constructor(public payload?: any) { }
}

export namespace GetPersonnenAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetPersonnenTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetPersonnenTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetPersonnenTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export namespace GetZeitraumAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetZeitraumTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetZeitraumTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetZeitraumTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace GetKostenartAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetKostenartTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetKostenartTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetKostenartTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace SearchKontoauszugAction {
  export class LoadAction implements AppStateAction {
    readonly type = SearchKontoauszugTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = SearchKontoauszugTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = SearchKontoauszugTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace GetLovLookupsAction {
  export class LoadAction implements AppStateAction {
    readonly type = GetLovLookupsTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetLovLookupsTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = GetLovLookupsTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export type KontoauszugActions
  = KontoauszugAction | ResetStateAction
  | GetPersonnenAction.LoadAction | GetPersonnenAction.LoadFailAction | GetPersonnenAction.LoadSuccessAction
  | GetZeitraumAction.LoadAction | GetZeitraumAction.LoadFailAction | GetZeitraumAction.LoadSuccessAction
  | GetKostenartAction.LoadAction | GetKostenartAction.LoadFailAction | GetKostenartAction.LoadSuccessAction
  | SearchKontoauszugAction.LoadAction | SearchKontoauszugAction.LoadFailAction | SearchKontoauszugAction.LoadSuccessAction
  | GetLovLookupsAction.LoadAction | GetLovLookupsAction.LoadFailAction | GetLovLookupsAction.LoadSuccessAction;
