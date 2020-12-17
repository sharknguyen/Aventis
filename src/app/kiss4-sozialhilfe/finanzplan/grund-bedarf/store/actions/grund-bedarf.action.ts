import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

// Add action for load data for select box data
const BerechnungsgrundlageSelectboxDataTypes = {
  LOAD: type('[Grund-Bedarf] Load Berechnungsgrundlage select box'),
  LOAD_SUCCESS: type('[Grund-Bedarf] Load Berechnungsgrundlage select box Success'),
  LOAD_FAIL: type('[Grund-Bedarf] Load Berechnungsgrundlage select box Fail')
};
// Add action for load data for Form data
const GrundBedarfQryBgPositionDataTypes = {
  LOAD: type('[Grund-Bedarf] Load QryBgPosition data'),
  LOAD_SUCCESS: type('[Grund-Bedarf] Load QryBgPosition data Success'),
  LOAD_FAIL: type('[Grund-Bedarf] Load QryBgPosition data Fail')
};
// Add action for load data for Form data
const GrundBedarfQryKennzahlenDataTypes = {
  LOAD: type('[Grund-Bedarf] Load QryKennzahlen data'),
  LOAD_SUCCESS: type('[Grund-Bedarf] Load QryKennzahlen data Success'),
  LOAD_FAIL: type('[Grund-Bedarf] Load QryKennzahlen data Fail')
};
// Add action for update Form data
const GrundBedarfUpdateFormDataTypes = {
  UPDATE_FORM_DATA: type('[Grund-Bedarf] Update Form data'),
  UPDATING_FORM_DATA: type('[Grund-Bedarf] Updating Form data'),
  UPDATE_FORM_DATA_SUCCESS: type('[Grund-Bedarf] Update Form data Success'),
  UPDATE_FORM_DATA_FAIL: type('[Grund-Bedarf] Update Form data Fail')
};
// Add action for load status code data
const GetStatusCodeTypes = {
  LOAD: type('[Grund-Bedarf] Load Status Code'),
  LOAD_SUCCESS: type('[Grund-Bedarf] Load Status Code Success'),
  LOAD_FAIL: type('[Grund-Bedarf] Load Status Code Fail')
};
// Add action for load init Form data
const GrundBedarfInitFormDataTypes = {
  LOAD: type('[Grund-Bedarf] Load Init Form data'),
  LOAD_SUCCESS: type('[Grund-Bedarf] Load Init Form data Success'),
  LOAD_FAIL: type('[Grund-Bedarf] Load Init Form data Fail')
};

// Add action for update before Post
const GrundBedarfUpdateBeforePostTypes = {
  UPDATE_BEFORE_POST_DATA: type('[Grund-Bedarf] Update before Post data'),
  UPDATING_BEFORE_POST_DATA: type('[Grund-Bedarf] Updating before Post data'),
  UPDATE_BEFORE_POST_DATA_SUCCESS: type('[Grund-Bedarf] Update before Post data Success'),
  UPDATE_BEFORE_POST_DATA_FAIL: type('[Grund-Bedarf] Update before Post data Fail')
};
// Add action for load Richtlinie data
const RichtlinieDataTypes = {
  LOAD: type('[Grund-Bedarf] Load Richtlinie data'),
  LOAD_SUCCESS: type('[Grund-Bedarf] Load Richtlinie data Success'),
  LOAD_FAIL: type('[Grund-Bedarf] Load Richtlinie data Fail')
};

// Add action for load PauschaleSTE data
const PauschaleSTEDataTypes = {
  LOAD: type('[Grund-Bedarf] Load PauschaleSTE data'),
  LOAD_SUCCESS: type('[Grund-Bedarf] Load PauschaleSTE data Success'),
  LOAD_FAIL: type('[Grund-Bedarf] Load PauschaleSTE data Fail')
};
// Add action for load ShStatusCodeToSql data
const ShStatusCodeToSqlDataTypes = {
  LOAD: type('[Grund-Bedarf] Load ShStatusCodeToSql data'),
  LOAD_SUCCESS: type('[Grund-Bedarf] Load ShStatusCodeToSql data Success'),
  LOAD_FAIL: type('[Grund-Bedarf] Load ShStatusCodeToSql data Fail')
};

export const GrundBedarfActionTypes = {
  GrundBedarfAction: type('[Grund-Bedarf] Action'),
  BerechnungsgrundlageSelectboxDataTypes: BerechnungsgrundlageSelectboxDataTypes,
  GrundBedarfQryBgPositionDataTypes: GrundBedarfQryBgPositionDataTypes,
  GrundBedarfQryKennzahlenDataTypes: GrundBedarfQryKennzahlenDataTypes,
  GrundBedarfUpdateFormDataTypes: GrundBedarfUpdateFormDataTypes,
  GetStatusCodeTypes: GetStatusCodeTypes,
  GrundBedarfInitFormDataTypes: GrundBedarfInitFormDataTypes,
  GrundBedarfUpdateBeforePostTypes: GrundBedarfUpdateBeforePostTypes,
  RichtlinieDataTypes: RichtlinieDataTypes,
  PauschaleSTEDataTypes: PauschaleSTEDataTypes,
  ShStatusCodeToSqlDataTypes: ShStatusCodeToSqlDataTypes,
};

export class GrundBedarfAction implements AppStateAction {
  readonly type = GrundBedarfActionTypes.GrundBedarfAction;
  constructor(public payload?: any) {
  }
}

// Load Berechnungsgrundlage select box Data
export namespace LoadDataSourceSelectboxData {
  export class LoadDataSourceSelectboxDataAction implements AppStateAction {
    readonly type = BerechnungsgrundlageSelectboxDataTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadDataSourceSelectboxDataSuccessAction implements AppStateAction {
    readonly type = BerechnungsgrundlageSelectboxDataTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadDataSourceSelectboxDataFailAction implements AppStateAction {
    readonly type = BerechnungsgrundlageSelectboxDataTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Load qryBgPosition data for Form
export namespace GrundBedarfQryBgPositionData {
  export class LoadGrundBedarfQryBgPositionDataAction implements AppStateAction {
    readonly type = GrundBedarfQryBgPositionDataTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadGrundBedarfQryBgPositionDataSuccessAction implements AppStateAction {
    readonly type = GrundBedarfQryBgPositionDataTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadGrundBedarfQryBgPositionDataFailAction implements AppStateAction {
    readonly type = GrundBedarfQryBgPositionDataTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Load QryKennzahlen data for Form
export namespace GrundBedarfQryKennzahlenData {
  export class LoadGrundBedarfQryKennzahlenDataAction implements AppStateAction {
    readonly type = GrundBedarfQryKennzahlenDataTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadGrundBedarfQryKennzahlenDataSuccessAction implements AppStateAction {
    readonly type = GrundBedarfQryKennzahlenDataTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadGrundBedarfQryKennzahlenDataFailAction implements AppStateAction {
    readonly type = GrundBedarfQryKennzahlenDataTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Load Init form data GrundBedarfInitFormDataTypes
export namespace GrundBedarfInitFormData {
  export class LoadGrundBedarfInitFormDataAction implements AppStateAction {
    readonly type = GrundBedarfInitFormDataTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadGrundBedarfInitFormDataSuccessAction implements AppStateAction {
    readonly type = GrundBedarfInitFormDataTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadGrundBedarfInitFormDataFailAction implements AppStateAction {
    readonly type = GrundBedarfInitFormDataTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Load Richtlinie data
export namespace GrundBedarfRichtlinieData {
  export class LoadRichtlinieDataAction implements AppStateAction {
    readonly type = RichtlinieDataTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadRichtlinieDataSuccessAction implements AppStateAction {
    readonly type = RichtlinieDataTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadRichtlinieDataFailAction implements AppStateAction {
    readonly type = RichtlinieDataTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Load PauschaleSTE data
export namespace GrundBedarfPauschaleSTEData {
  export class LoadPauschaleSTEDataAction implements AppStateAction {
    readonly type = PauschaleSTEDataTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadPauschaleSTEDataSuccessAction implements AppStateAction {
    readonly type = PauschaleSTEDataTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadPauschaleSTEDataFailAction implements AppStateAction {
    readonly type = PauschaleSTEDataTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Load ShStatusCodeToSql data
export namespace ShStatusCodeToSqlData {
  export class LoadShStatusCodeToSqlDataAction implements AppStateAction {
    readonly type = ShStatusCodeToSqlDataTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadShStatusCodeToSqlDataSuccessAction implements AppStateAction {
    readonly type = ShStatusCodeToSqlDataTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadShStatusCodeToSqlDataFailAction implements AppStateAction {
    readonly type = ShStatusCodeToSqlDataTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Update Form data
export namespace GrundBedarfUpdateFormData {
  export class UpdateGrundBedarfFormDataAction implements AppStateAction {
    readonly type = GrundBedarfUpdateFormDataTypes.UPDATE_FORM_DATA;
    constructor(public payload?: any) {
    }
  }

  export class UpdateGrundBedarfFormDataSuccessAction implements AppStateAction {
    readonly type = GrundBedarfUpdateFormDataTypes.UPDATE_FORM_DATA_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class UpdateGrundBedarfFormDataFailAction implements AppStateAction {
    readonly type = GrundBedarfUpdateFormDataTypes.UPDATE_FORM_DATA_FAIL;
    constructor(public payload?: any) {
    }
  }
}
// Get status code
export namespace LoadStatusCodeData {
  export class LoadStatusCodeDataAction implements AppStateAction {
    readonly type = GetStatusCodeTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadStatusCodeDataSuccessAction implements AppStateAction {
    readonly type = GetStatusCodeTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadStatusCodeDataFailAction implements AppStateAction {
    readonly type = GetStatusCodeTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

// Update Before Post data
export namespace GrundBedarfUpdateBeforePostData {
  export class UpdateGrundBedarfBeforePostDataAction implements AppStateAction {
    readonly type = GrundBedarfUpdateBeforePostTypes.UPDATE_BEFORE_POST_DATA;
    constructor(public payload?: any) {
    }
  }

  export class UpdateGrundBedarfBeforePostDataSuccessAction implements AppStateAction {
    readonly type = GrundBedarfUpdateBeforePostTypes.UPDATE_BEFORE_POST_DATA_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class UpdateGrundBedarfBeforePostDataFailAction implements AppStateAction {
    readonly type = GrundBedarfUpdateBeforePostTypes.UPDATE_BEFORE_POST_DATA_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export type GrundBedarfActions
  = GrundBedarfAction
  | LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataAction
  | LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataSuccessAction
  | LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataFailAction
  | GrundBedarfQryBgPositionData.LoadGrundBedarfQryBgPositionDataAction
  | GrundBedarfQryBgPositionData.LoadGrundBedarfQryBgPositionDataSuccessAction
  | GrundBedarfQryBgPositionData.LoadGrundBedarfQryBgPositionDataFailAction
  | GrundBedarfQryKennzahlenData.LoadGrundBedarfQryKennzahlenDataAction
  | GrundBedarfQryKennzahlenData.LoadGrundBedarfQryKennzahlenDataSuccessAction
  | GrundBedarfQryKennzahlenData.LoadGrundBedarfQryKennzahlenDataFailAction
  | GrundBedarfUpdateFormData.UpdateGrundBedarfFormDataAction
  | GrundBedarfUpdateFormData.UpdateGrundBedarfFormDataSuccessAction
  | GrundBedarfUpdateFormData.UpdateGrundBedarfFormDataFailAction
  | LoadStatusCodeData.LoadStatusCodeDataAction
  | LoadStatusCodeData.LoadStatusCodeDataSuccessAction
  | LoadStatusCodeData.LoadStatusCodeDataFailAction
  | GrundBedarfInitFormData.LoadGrundBedarfInitFormDataAction
  | GrundBedarfInitFormData.LoadGrundBedarfInitFormDataSuccessAction
  | GrundBedarfInitFormData.LoadGrundBedarfInitFormDataFailAction
  | GrundBedarfUpdateBeforePostData.UpdateGrundBedarfBeforePostDataAction
  | GrundBedarfUpdateBeforePostData.UpdateGrundBedarfBeforePostDataSuccessAction
  | GrundBedarfUpdateBeforePostData.UpdateGrundBedarfBeforePostDataFailAction
  | GrundBedarfRichtlinieData.LoadRichtlinieDataAction
  | GrundBedarfRichtlinieData.LoadRichtlinieDataSuccessAction
  | GrundBedarfRichtlinieData.LoadRichtlinieDataFailAction
  | GrundBedarfPauschaleSTEData.LoadPauschaleSTEDataAction
  | GrundBedarfPauschaleSTEData.LoadPauschaleSTEDataSuccessAction
  | GrundBedarfPauschaleSTEData.LoadPauschaleSTEDataFailAction
  | ShStatusCodeToSqlData.LoadShStatusCodeToSqlDataAction
  | ShStatusCodeToSqlData.LoadShStatusCodeToSqlDataSuccessAction
  | ShStatusCodeToSqlData.LoadShStatusCodeToSqlDataFailAction;
