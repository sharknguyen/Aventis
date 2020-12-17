import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites';

export const LoadModuleIconTypes = {
  LOAD: type('[TabModuleFallbearbeitung] Load Module Icon'),
  LOAD_SUCCESS: type('[TabModuleFallbearbeitung] Load Module Icon Success'),
  LOAD_FAIL: type('[TabModuleFallbearbeitung] Load Module Icon Fail'),
};

export const LoadZeitachseVisibleTypes = {
  LOAD: type('[TabModuleFallbearbeitung] Load Zeitachse Visible'),
  LOAD_SUCCESS: type('[TabModuleFallbearbeitung] Load Zeitachse Visible Success'),
  LOAD_FAIL: type('[TabModuleFallbearbeitung] Load Zeitachse Visible Fail'),
};

export const LoadPersonInfoTitelTypes = {
  LOAD: type('[TabModuleFallbearbeitung] Load Person Info Titel'),
  LOAD_SUCCESS: type('[TabModuleFallbearbeitung] Load Person Info Titel Success'),
  LOAD_FAIL: type('[TabModuleFallbearbeitung] Load Person Info Titel Fail'),
};

export const TabModuleFallbearbeitungActionTypes = {
  TabModuleFallbearbeitungAction: type('[TabModuleFallbearbeitung] Action'),
  LoadModuleIconTypes: LoadModuleIconTypes,
  LoadZeitachseVisibleTypes: LoadZeitachseVisibleTypes,
  LoadPersonInfoTitelTypes: LoadPersonInfoTitelTypes,
};

export class TabModuleFallbearbeitungAction implements AppStateAction {
  readonly type = TabModuleFallbearbeitungActionTypes.TabModuleFallbearbeitungAction;
  constructor(public payload?: any) {
  }
}

export namespace LoadModuleIconAction {
  export class LoadAction implements AppStateAction {
    readonly type = LoadModuleIconTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = LoadModuleIconTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = LoadModuleIconTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace LoadZeitachseVisibleAction {
  export class LoadAction implements AppStateAction {
    readonly type = LoadZeitachseVisibleTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = LoadZeitachseVisibleTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = LoadZeitachseVisibleTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
export namespace LoadPersonInfoTitelAction {
  export class LoadAction implements AppStateAction {
    readonly type = LoadPersonInfoTitelTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = LoadPersonInfoTitelTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = LoadPersonInfoTitelTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export type TabModuleFallbearbeitungActions
  = LoadModuleIconAction.LoadAction | LoadModuleIconAction.LoadSuccessAction | LoadModuleIconAction.LoadFailAction
  | LoadZeitachseVisibleAction.LoadAction | LoadZeitachseVisibleAction.LoadSuccessAction | LoadZeitachseVisibleAction.LoadFailAction
  | LoadPersonInfoTitelAction.LoadAction | LoadPersonInfoTitelAction.LoadSuccessAction | LoadPersonInfoTitelAction.LoadFailAction;
