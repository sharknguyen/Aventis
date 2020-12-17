import {type} from '@shared/utilites/utilityHelpers';
import {AppStateAction} from '@shared/AppAction';

const BgSilAHVBeitragTypes = {
  LOAD: type('[Finanzplan BgSilAHVBeitrag] Load'),
  LOAD_SUCCESS: type('[Finanzplan BgSilAHVBeitrag] Load Success'),
  LOAD_FAIL: type('[Finanzplan BgSilAHVBeitrag] Load Fail')
};

const FinanzplanTypes = {
  LOAD: type('[Finanzplan] Load'),
  LOAD_SUCCESS: type('[Finanzplan] Load Success'),
  LOAD_FAIL: type('[Finanzplan] Load Fail')
};

export const FinanzplanActionTypes = {
  FinanzplanAction: type('[Finanzplan] Action'),
  BgSilAHVBeitragTypes: BgSilAHVBeitragTypes,
  FinanzplanTypes: FinanzplanTypes
};

export class FinanzplanAction implements AppStateAction {
  readonly type = FinanzplanActionTypes.FinanzplanAction;

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

// finanzplan Actions
export namespace FinanzplanDatas {

  export class LoadAction implements AppStateAction {
    readonly type = FinanzplanTypes.LOAD;

    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = FinanzplanTypes.LOAD_SUCCESS;

    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = FinanzplanTypes.LOAD_FAIL;

    constructor(public payload?: any) {
    }
  }
}

export type FinanzplanActions
  = FinanzplanAction
  | BgSilAHVBeitragDatas.LoadAction
  | BgSilAHVBeitragDatas.LoadSuccessAction
  | BgSilAHVBeitragDatas.LoadFailAction

  | FinanzplanDatas.LoadAction
  | FinanzplanDatas.LoadSuccessAction
  | FinanzplanDatas.LoadFailAction;
