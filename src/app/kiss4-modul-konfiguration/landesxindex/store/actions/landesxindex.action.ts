import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const LandesxindexTypes = {
  LOAD: type('[Landesxindex] Load'),
  LOAD_SUCCESS: type('[Landesxindex] Load Success'),
  LOAD_FAIL: type('[Landesxindex] Load Fail')
};

// Add code for Get detail Landesxindex
const LandesxindexGetDetailTypes = {
  GETDETAIL: type('[Landesxindex] Get Detail'),
  GETDETAIL_SUCCESS: type('[Landesxindex] Get Detail Success'),
  GETDETAIL_FAIL: type('[Landesxindex] Get Detail Fail')
};

// Delete a row in top grid
const LandesxindexDeleteTypes = {
  DELETE: type('[Landesxindex] Delete New'),
  DELETE_SUCCESS: type('[Landesxindex] Deleted Success'),
  DELETE_FAIL: type('[Landesxindex] Delete Fail')
};

// Delete all rows in bottom grid follow by in top grid
const LandesxindexWertByIkLandesindexIDDeleteTypes = {
  DELETE_WERT: type('[Landesxindex] Delete Werts New'),
  DELETE_WERT_SUCCESS: type('[Landesxindex] Deleted Werts Success'),
  DELETE_WERT_FAIL: type('[Landesxindex] Delete Werts Fail')
};

// Delete a row in bottom grid
const LandesxindexWertDeleteTypes = {
  DELETE_WERT: type('[Landesxindex] Delete a Wert New'),
  DELETE_WERT_SUCCESS: type('[Landesxindex] Deleted a Werts Success'),
  DELETE_WERT_FAIL: type('[Landesxindex] Delete a Wert Fail')
};

// Update multi-rows in top grid
const LandesxindexesUpdateTypes = {
  UPDATE_LANDES: type('[Landesxindex] Update multi-rows Landesxindexes'),
  UPDATING_LANDES: type('[Landesxindex] Updating multi-rows Landesxindexes'),
  UPDATE_LANDES_SUCCESS: type('[Landesxindex] Update multi-rows Landesxindexes Success'),
  UPDATE_LANDES_FAIL: type('[Landesxindex] Update multi-rows Landesxindexes Fail')
};

// Add action for load data combobox benut
const CBBoxBenutTypes = {
  LOAD: type('[Landesxindex] Load CBBox Benut'),
  LOAD_SUCCESS: type('[Landesxindex] Load CBBox Success'),
  LOAD_FAIL: type('[Landesxindex] Load CBBox Fail')
};

// Add action for load data grid BFS Webseite
const GridBFSWebseiteTypes = {
  LOAD: type('[Landesxindex] Load Grid BFS'),
  LOAD_SUCCESS: type('[Landesxindex] Load Grid BFS Success'),
  LOAD_FAIL: type('[Landesxindex] Load Grid BFS Fail')
};

// Add action for Get UserProfileCode
const UserProfileTypes = {
  LOAD: type('[Landesxindex] Load User Profile'),
  LOAD_SUCCESS: type('[Landesxindex] Load User Profile Success'),
  LOAD_FAIL: type('[Landesxindex] Load User Profile Fail')
};

// Add LandesindexGridtop
const AddLandesindexGridtop = {
  ADD: type('[Landesxindex] Add LandesindexGridtop'),
  ADD_SUCCESS: type('[Landesxindex] Add LandesindexGridtop Success'),
  ADD_FAIL: type('[Landesxindex] Add LandesindexGridtop Fail')
};

// Add action for LandesindexWertErfassen
const AddLandesindexWertErfassenTypes = {
  ADD: type('[CreateLandesindexWertErfassen] Add'),
  ADD_SUCCESS: type('[UpdateLandesindexWertErfassen] Add Success'),
  ADD_FAIL: type('[CreateLandesindexWertErfassen] Add Fail')
};

// IkLandesindex
const IkLandesindexTypes = {
  LOAD: type('[IkLandesindex] Load'),
  LOAD_SUCCESS: type('[IkLandesindex] Load Success'),
  LOAD_FAIL: type('[IkLandesindex] Load Fail')
};

// Load CountIkLandesindexWert
const CountIkLandesindexWertTypes = {
  LOAD: type('[CountIkLandesindexWert] Load'),
  LOAD_SUCCESS: type('[CountIkLandesindexWert] Load Success'),
  LOAD_FAIL: type('[CountIkLandesindexWert] Load Fail')
};

// Load NameIkLandesindex
const NameIkLandesindexTypes = {
  LOAD: type('[NameIkLandesindex] Load'),
  LOAD_SUCCESS: type('[NameIkLandesindex] Load Success'),
  LOAD_FAIL: type('[NameIkLandesindex] Load Fail')
};

// Get Wert
const GetWert = {
  LOAD: type('[Landesxindex] Get Wert'),
  LOAD_SUCCESS: type('[Landesxindex] Get Wert Success'),
  LOAD_FAIL: type('[Landesxindex] Get Wert Fail')
};

// Insert Wert by  IkLandesindex
const AddWertByIkLandesindex = {
  ADD: type('[Landesxindex] Add WertbyIkLandesindex'),
  ADD_SUCCESS: type('[Landesxindex] Add WertbyIkLandesindex Success'),
  ADD_FAIL: type('[Landesxindex] Add WertbyIkLandesindex Fail')
};

const UpdateWert = {
  UPDATE: type('[Landesxindex] Update Wert'),
  UPDATE_SUCCESS: type('[Landesxindex] Update Success'),
  UPDATE_FAIL: type('[Landesxindex] Update Fail')
};

const AddWertTypes = {
  ADD: type('[Landesxindex] Add Wert'),
  ADD_SUCCESS: type('[Landesxindex] Add Wert Success'),
  ADD_FAIL: type('[Landesxindex] Add Wert Fail')
};

export const LandesxindexActionTypes = {
  LandesxindexAction: type('[Landesxindex] Action'),
  LandesxindexTypes: LandesxindexTypes,
  LandesxindexGetDetailTypes: LandesxindexGetDetailTypes,
  LandesxindexDeleteTypes: LandesxindexDeleteTypes,
  LandesxindexWertByIkLandesindexIDDeleteTypes: LandesxindexWertByIkLandesindexIDDeleteTypes,
  LandesxindexWertDeleteTypes: LandesxindexWertDeleteTypes,
  LandesxindexesUpdateTypes: LandesxindexesUpdateTypes,
  CBBoxBenutTypes: CBBoxBenutTypes,
  GridBFSWebseiteTypes: GridBFSWebseiteTypes,
  UserProfileTypes: UserProfileTypes,
  AddLandesindexGridtop: AddLandesindexGridtop,
  AddLandesindexWertErfassenTypes: AddLandesindexWertErfassenTypes,
  IkLandesindexTypes: IkLandesindexTypes,
  GetWert: GetWert,
  AddWertByIkLandesindex: AddWertByIkLandesindex,
  CountIkLandesindexWertTypes: CountIkLandesindexWertTypes,
  NameIkLandesindexTypes: NameIkLandesindexTypes,
  UpdateWert: UpdateWert,
  AddWertTypes: AddWertTypes
};

export class LandesxindexAction implements AppStateAction {
  readonly type = LandesxindexActionTypes.LandesxindexAction;
  constructor(public payload?: any) {
  }
}

/**
 * *****************************************************************
 * LandesxindexTypes Actions
 * *****************************************************************
 */
export namespace LandesxindexInitData {
  export class LoadAction implements AppStateAction {
    readonly type = LandesxindexTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = LandesxindexTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = LandesxindexTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

// GetLandesindexWert
export namespace GetLandesindexWertData {
  export class GetLandesindexWertAction implements AppStateAction {
    readonly type = LandesxindexGetDetailTypes.GETDETAIL;
    constructor(public payload?: any) {
    }
  }

  export class GetLandesindexWertSuccessAction implements AppStateAction {
    readonly type = LandesxindexGetDetailTypes.GETDETAIL_SUCCESS;
    constructor(public payload: any) {
    }
  }

  export class GetLandesindexWertFailAction implements AppStateAction {
    readonly type = LandesxindexGetDetailTypes.GETDETAIL_FAIL;
    constructor(public payload?: any) {
    }
  }
}

/**
 * Create namespace for delete action in top grid
 */
export namespace LandesindexDeleteData {
  export class DeleteAction implements AppStateAction {
    readonly type = LandesxindexDeleteTypes.DELETE;
    constructor(public payload?: any) {
    }
  }

  export class DeleteSuccessAction implements AppStateAction {
    readonly type = LandesxindexDeleteTypes.DELETE_SUCCESS;
    constructor(public payload: any) {
    }
  }

  export class DeleteFailAction implements AppStateAction {
    readonly type = LandesxindexDeleteTypes.DELETE_FAIL;
    constructor(public payload?: any) {
    }
  }
}

/**
 * Create namespace for delete action in bottom grid by IkLandesindexID
 */
export namespace LandesindexWertByIkLandesindexIdDeleteData {
  export class DeleteAction implements AppStateAction {
    readonly type = LandesxindexWertByIkLandesindexIDDeleteTypes.DELETE_WERT;
    constructor(public payload?: any) {
    }
  }

  export class DeleteSuccessAction implements AppStateAction {
    readonly type = LandesxindexWertByIkLandesindexIDDeleteTypes.DELETE_WERT_SUCCESS;
    constructor(public payload: any) {
    }
  }

  export class DeleteFailAction implements AppStateAction {
    readonly type = LandesxindexWertByIkLandesindexIDDeleteTypes.DELETE_WERT_FAIL;
    constructor(public payload?: any) {
    }
  }
}
/**
 * Create namespace for delete inline action in bottom grid
 */
export namespace LandesindexWertDeleteData {
  export class DeleteAction implements AppStateAction {
    readonly type = LandesxindexWertDeleteTypes.DELETE_WERT;
    constructor(public payload?: any) {
    }
  }

  export class DeleteSuccessAction implements AppStateAction {
    readonly type = LandesxindexWertDeleteTypes.DELETE_WERT_SUCCESS;
    constructor(public payload: any) {
    }
  }

  export class DeleteFailAction implements AppStateAction {
    readonly type = LandesxindexWertDeleteTypes.DELETE_WERT_FAIL;
    constructor(public payload?: any) {
    }
  }
}

/**
 * Create namespace for update multi-rows action in top grid
 */
export namespace LandesindexesUpdateData {
  export class UpdateAction implements AppStateAction {
    readonly type = LandesxindexesUpdateTypes.UPDATE_LANDES;
    constructor(public payload?: any) {
    }
  }

  export class UpdateSuccessAction implements AppStateAction {
    readonly type = LandesxindexesUpdateTypes.UPDATE_LANDES_SUCCESS;
    constructor(public payload: any) {
    }
  }

  export class UpdateFailAction implements AppStateAction {
    readonly type = LandesxindexesUpdateTypes.UPDATE_LANDES_FAIL;
    constructor(public payload?: any) {
    }
  }
}

// Load CBBox Benut Data
export namespace CBBoxBenutData {
  export class LoadCBBoxBenutDataAction implements AppStateAction {
    readonly type = CBBoxBenutTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadCBBoxBenutDataSuccessAction implements AppStateAction {
    readonly type = CBBoxBenutTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadCBBoxBenutDataFailAction implements AppStateAction {
    readonly type = CBBoxBenutTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

// Load Grid BFS Data
export namespace GridBFSWebseiteData {
  export class LoadGridBFSDataAction implements AppStateAction {
    readonly type = GridBFSWebseiteTypes.LOAD;
    constructor(public payload?: any) {

    }
  }

  export class LoadGridBFSDataSuccessAction implements AppStateAction {
    readonly type = GridBFSWebseiteTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadGridBFSDataFailAction implements AppStateAction {
    readonly type = GridBFSWebseiteTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

// Get User Profile
export namespace UserProfileData {
  export class LoadUserProfileDataAction implements AppStateAction {
    readonly type = UserProfileTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadUserProfileDataSuccessAction implements AppStateAction {
    readonly type = UserProfileTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {

    }
  }

  export class LoadUserProfileDataFailAction implements AppStateAction {
    readonly type = UserProfileTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

// Add LandesindexGridtop
export namespace AddGridTopData {
  export class AddLandesindexGridtopAction implements AppStateAction {
    readonly type = AddLandesindexGridtop.ADD;
    constructor(public payload?: any) {

    }
  }

  export class AddLandesindexGridtopSuccessAction implements AppStateAction {
    readonly type = AddLandesindexGridtop.ADD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class AddLandesindexGridtopFailAction implements AppStateAction {
    readonly type = AddLandesindexGridtop.ADD_FAIL;
    constructor(public payload?: any) {

    }
  }
}

// Add LandesindexWertErfassen
export namespace AddLandesindexWertErfassen {
  export class AddLandesindexWertErfassenAction implements AppStateAction {
    readonly type = AddLandesindexWertErfassenTypes.ADD;
    constructor(public payload?: any) {
    }
  }

  export class AddLandesindexWertErfassenSuccessAction implements AppStateAction {
    readonly type = AddLandesindexWertErfassenTypes.ADD_SUCCESS;
    constructor(public payload?: any) {

    }
  }

  export class AddLandesindexWertErfassenFailAction implements AppStateAction {
    readonly type = AddLandesindexWertErfassenTypes.ADD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

// Get IkLandesindex
export namespace LoadIkLandesindex {
  export class LoadIkLandesindexAction implements AppStateAction {
    readonly type = IkLandesindexTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadIkLandesindexSuccessAction implements AppStateAction {
    readonly type = IkLandesindexTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadIkLandesindexFailAction implements AppStateAction {
    readonly type = IkLandesindexTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

// Get Wert
export namespace GetWertInitData {
  export class GetWertAction implements AppStateAction {
    readonly type = GetWert.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class GetWertSuccessAction implements AppStateAction {
    readonly type = GetWert.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class GetWertFailAction implements AppStateAction {
    readonly type = GetWert.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

// Get CountIkLandesindexWert
export namespace LoadCountIkLandesindexWert {
  export class LoadCountIkLandesindexWertAction implements AppStateAction {
    readonly type = CountIkLandesindexWertTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadCountIkLandesindexWertSuccessAction implements AppStateAction {
    readonly type = CountIkLandesindexWertTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadCountIkLandesindexWertFailAction implements AppStateAction {
    readonly type = CountIkLandesindexWertTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

// Add WertByIkLandesindex
export namespace AddWertByIkLandesindexData {
  export class AddWertByIkLandesindexAction implements AppStateAction {
    readonly type = AddWertByIkLandesindex.ADD;
    constructor(public payload?: any) {
    }
  }

  export class AddWertByIkLandesindexSuccessAction implements AppStateAction {
    readonly type = AddWertByIkLandesindex.ADD_SUCCESS;
    constructor(public payload?: any) {

    }
  }

  export class AddWertByIkLandesindexFailAction implements AppStateAction {
    readonly type = AddWertByIkLandesindex.ADD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

// get NameIkLandesindex
export namespace LoadNameIkLandesindex {
  export class LoadNameIkLandesindexAction implements AppStateAction {
    readonly type = NameIkLandesindexTypes.LOAD;
    constructor(public payload?: any) {
    }
  }

  export class LoadNameIkLandesindexSuccessAction implements AppStateAction {
    readonly type = NameIkLandesindexTypes.LOAD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class LoadNameIkLandesindexFailAction implements AppStateAction {
    readonly type = NameIkLandesindexTypes.LOAD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

// Update Wert When Insert
export namespace UpdateWertInitData {
  export class UpdateWertAction implements AppStateAction {
    readonly type = UpdateWert.UPDATE;
    constructor(public payload?: any) {
    }
  }

  export class UpdateWertSuccessAction implements AppStateAction {
    readonly type = UpdateWert.UPDATE_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class UpdateWertFailAction implements AppStateAction {
    readonly type = UpdateWert.UPDATE_FAIL;
    constructor(public payload?: any) {
    }
  }
}

// Insert a Wert
export namespace AddWertInitData {
  export class AddWertAction implements AppStateAction {
    readonly type = AddWertTypes.ADD;
    constructor(public payload?: any) {
    }
  }

  export class AddWertSuccessAction implements AppStateAction {
    readonly type = AddWertTypes.ADD_SUCCESS;
    constructor(public payload?: any) {
    }
  }

  export class AddWertFailAction implements AppStateAction {
    readonly type = AddWertTypes.ADD_FAIL;
    constructor(public payload?: any) {
    }
  }
}

export type LandesxindexActions
  = LandesxindexAction
  | LandesxindexInitData.LoadAction
  | LandesxindexInitData.LoadSuccessAction
  | LandesxindexInitData.LoadFailAction
  | GetLandesindexWertData.GetLandesindexWertAction
  | GetLandesindexWertData.GetLandesindexWertSuccessAction
  | GetLandesindexWertData.GetLandesindexWertFailAction
  | LandesindexDeleteData.DeleteAction
  | LandesindexDeleteData.DeleteSuccessAction
  | LandesindexDeleteData.DeleteFailAction
  | LandesindexWertByIkLandesindexIdDeleteData.DeleteAction
  | LandesindexWertByIkLandesindexIdDeleteData.DeleteSuccessAction
  | LandesindexWertByIkLandesindexIdDeleteData.DeleteFailAction
  | LandesindexWertDeleteData.DeleteAction
  | LandesindexWertDeleteData.DeleteSuccessAction
  | LandesindexWertDeleteData.DeleteFailAction
  | LandesindexesUpdateData.UpdateAction
  | LandesindexesUpdateData.UpdateSuccessAction
  | LandesindexesUpdateData.UpdateFailAction
  | CBBoxBenutData.LoadCBBoxBenutDataAction
  | CBBoxBenutData.LoadCBBoxBenutDataSuccessAction
  | CBBoxBenutData.LoadCBBoxBenutDataFailAction
  | GridBFSWebseiteData.LoadGridBFSDataAction
  | GridBFSWebseiteData.LoadGridBFSDataSuccessAction
  | GridBFSWebseiteData.LoadGridBFSDataFailAction
  | UserProfileData.LoadUserProfileDataAction
  | UserProfileData.LoadUserProfileDataSuccessAction
  | UserProfileData.LoadUserProfileDataFailAction
  | AddGridTopData.AddLandesindexGridtopAction
  | AddGridTopData.AddLandesindexGridtopSuccessAction
  | AddGridTopData.AddLandesindexGridtopFailAction
  | AddLandesindexWertErfassen.AddLandesindexWertErfassenAction
  | AddLandesindexWertErfassen.AddLandesindexWertErfassenSuccessAction
  | AddLandesindexWertErfassen.AddLandesindexWertErfassenFailAction
  | LoadIkLandesindex.LoadIkLandesindexAction
  | LoadIkLandesindex.LoadIkLandesindexSuccessAction
  | LoadIkLandesindex.LoadIkLandesindexFailAction
  | GetWertInitData.GetWertAction
  | GetWertInitData.GetWertSuccessAction
  | GetWertInitData.GetWertFailAction
  | AddWertByIkLandesindexData.AddWertByIkLandesindexAction
  | AddWertByIkLandesindexData.AddWertByIkLandesindexSuccessAction
  | AddWertByIkLandesindexData.AddWertByIkLandesindexFailAction
  | LoadCountIkLandesindexWert.LoadCountIkLandesindexWertAction
  | LoadCountIkLandesindexWert.LoadCountIkLandesindexWertSuccessAction
  | LoadCountIkLandesindexWert.LoadCountIkLandesindexWertFailAction
  | LoadNameIkLandesindex.LoadNameIkLandesindexAction
  | LoadNameIkLandesindex.LoadNameIkLandesindexSuccessAction
  | LoadNameIkLandesindex.LoadNameIkLandesindexFailAction
  | UpdateWertInitData.UpdateWertAction
  | UpdateWertInitData.UpdateWertSuccessAction
  | UpdateWertInitData.UpdateWertFailAction
  | AddWertInitData.AddWertAction
  | AddWertInitData.AddWertSuccessAction
  | AddWertInitData.AddWertFailAction;
