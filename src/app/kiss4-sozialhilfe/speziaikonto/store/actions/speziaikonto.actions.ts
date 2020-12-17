import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const MasterCCBDatasTypes = {
  LOAD: type('[Spezialkonto InitDatas] LoadMasterCCB'),
  LOAD_SUCCESS: type('[Spezialkonto InitDatas] LoadMasterCCB Success'),
  LOAD_FAIL: type('[Spezialkonto InitDatas] LoadMasterCCB Fail')
};

const LoadGridTopDatasTypes = {
  LOAD: type('[Spezialkonto InitDatas] LoadBgSpezkonto'),
  LOAD_SUCCESS: type('[Spezialkonto InitDatas] LoadBgSpezkonto Success'),
  LOAD_FAIL: type('[Spezialkonto InitDatas] LoadBgSpezkonto Fail')
};

const LoadGridDetailDatasTypes = {
  LOAD: type('[Spezialkonto InitDatas] LoadBgPosition'),
  LOAD_SUCCESS: type('[Spezialkonto InitDatas] LoadBgPosition Success'),
  LOAD_FAIL: type('[Spezialkonto InitDatas] LoadBgPosition Fail')
};

const LoadBaPersonDatasTypes = {
  LOAD: type('[Spezialkonto InitDatas] LoadBaPerson'),
  LOAD_SUCCESS: type('[Spezialkonto InitDatas] LoadBaPerson Success'),
  LOAD_FAIL: type('[Spezialkonto InitDatas] LoadBaPerson Fail')
};

const LoadBgKostenartDatasTypes = {
  LOAD: type('[Spezialkonto InitDatas] LoadBgKostenart'),
  LOAD_SUCCESS: type('[Spezialkonto InitDatas] LoadBgKostenart Success'),
  LOAD_FAIL: type('[Spezialkonto InitDatas] LoadBgKostenart Fail')
};

const LoadDatumVonDatasTypes = {
  LOAD: type('[Spezialkonto InitDatas] LoadDatumVon'),
  LOAD_SUCCESS: type('[Spezialkonto InitDatas] LoadDatumVon Success'),
  LOAD_FAIL: type('[Spezialkonto InitDatas] LoadDatumVon Fail')
};

const LoadBgPosArtDatasTypes = {
  LOAD: type('[Spezialkonto InitDatas] LoadBgPosArt'),
  LOAD_SUCCESS: type('[Spezialkonto InitDatas] LoadBgPosArt Success'),
  LOAD_FAIL: type('[Spezialkonto InitDatas] LoadBgPosArt Fail')
};

const LoadPositionsartenDatasTypes = {
  LOAD: type('[Spezialkonto InitDatas] LoadPositionsarten'),
  LOAD_SUCCESS: type('[Spezialkonto InitDatas] LoadPositionsarten Success'),
  LOAD_FAIL: type('[Spezialkonto InitDatas] LoadPositionsarten Fail')
};

const CreateDatasTypes = {
  LOAD: type('[Spezialkonto InitDatas] Create'),
  LOAD_SUCCESS: type('[Spezialkonto InitDatas] Create Success'),
  LOAD_FAIL: type('[Spezialkonto InitDatas] Create Fail')
};

const EditDatasTypes = {
  LOAD: type('[Spezialkonto InitDatas] Edit'),
  LOAD_SUCCESS: type('[Spezialkonto InitDatas] Edit Success'),
  LOAD_FAIL: type('[Spezialkonto InitDatas] Edit Fail')
};

const DeleteDatasTypes = {
  LOAD: type('[Spezialkonto InitDatas] Delete'),
  LOAD_SUCCESS: type('[Spezialkonto InitDatas] Delete Success'),
  LOAD_FAIL: type('[Spezialkonto InitDatas] Delete Fail')
};

const AbschliessenVisibleDatasTypes = {
  LOAD: type('[Spezialkonto InitDatas] AbschliessenVisible'),
  LOAD_SUCCESS: type('[Spezialkonto InitDatas] AbschliessenVisible Success'),
  LOAD_FAIL: type('[Spezialkonto InitDatas] AbschliessenVisible Fail')
};

const MaxSanktionDatasTypes = {
  LOAD: type('[Spezialkonto InitDatas] MaxSanktion'),
  LOAD_SUCCESS: type('[Spezialkonto InitDatas] MaxSanktion Success'),
  LOAD_FAIL: type('[Spezialkonto InitDatas] MaxSanktion Fail')
};

const ResetDatasTypes = {
  RESET: type('[Spezialkonto InitDatas] Reset')
};

const AbschliessenUndoTypes = {
  LOAD: type('[Spezialkonto InitDatas] AbschliessenUndo'),
  LOAD_SUCCESS: type('[Spezialkonto InitDatas] AbschliessenUndo Success'),
  LOAD_FAIL: type('[Spezialkonto InitDatas] AbschliessenUndo Fail')
};

const KontoWirdNichtAusgeglichenTypes = {
  LOAD: type('[Spezialkonto InitDatas] KontoWirdNichtAusgeglichen'),
  LOAD_SUCCESS: type('[Spezialkonto InitDatas] KontoWirdNichtAusgeglichen Success'),
  LOAD_FAIL: type('[Spezialkonto InitDatas] KontoWirdNichtAusgeglichen Fail')
};
const UebergabeAnInkassoTypes = {
  LOAD: type('[Spezialkonto InitDatas] UebergabeAnInkasso'),
  LOAD_SUCCESS: type('[Spezialkonto InitDatas] UebergabeAnInkasso Success'),
  LOAD_FAIL: type('[Spezialkonto InitDatas] UebergabeAnInkasso Fail')
};

const AbschliessenEditierbarTypes = {
  LOAD: type('[Spezialkonto InitDatas] AbschliessenEditierbar'),
  LOAD_SUCCESS: type('[Spezialkonto InitDatas] AbschliessenEditierbar Success'),
  LOAD_FAIL: type('[Spezialkonto InitDatas] AbschliessenEditierbar Fail')
};

const UpdateKuzungenTypes = {
  LOAD: type('[Spezialkonto InitDatas] UpdateKuzungen'),
  LOAD_SUCCESS: type('[Spezialkonto InitDatas] UpdateKuzungen Success'),
  LOAD_FAIL: type('[Spezialkonto InitDatas] UpdateKuzungen Fail')
};

const CreateKuzungenTypes = {
  LOAD: type('[Spezialkonto InitDatas] CreateKuzungen'),
  LOAD_SUCCESS: type('[Spezialkonto InitDatas] CreateKuzungen Success'),
  LOAD_FAIL: type('[Spezialkonto InitDatas] CreateKuzungen Fail')
};

export const SpezialkontoActionTypes = {
  SpezialkontoAction: type('[Spezialkonto] Action'),
  MasterCCBDatasTypes: MasterCCBDatasTypes,
  LoadGridTopDatasTypes: LoadGridTopDatasTypes,
  LoadGridDetailDatasTypes: LoadGridDetailDatasTypes,
  LoadBaPersonDatasTypes: LoadBaPersonDatasTypes,
  LoadBgKostenartDatasTypes: LoadBgKostenartDatasTypes,
  LoadDatumVonDatasTypes: LoadDatumVonDatasTypes,
  LoadBgPosArtDatasTypes: LoadBgPosArtDatasTypes,
  CreateDatasTypes: CreateDatasTypes,
  EditDatasTypes: EditDatasTypes,
  DeleteDatasTypes: DeleteDatasTypes,
  LoadPositionsartenDatasTypes: LoadPositionsartenDatasTypes,
  AbschliessenVisibleDatasTypes: AbschliessenVisibleDatasTypes,
  MaxSanktionDatasTypes: MaxSanktionDatasTypes,
  AbschliessenUndoTypes: AbschliessenUndoTypes,
  KontoWirdNichtAusgeglichenTypes: KontoWirdNichtAusgeglichenTypes,
  UebergabeAnInkassoTypes: UebergabeAnInkassoTypes,
  ResetDatasTypes: ResetDatasTypes,
  AbschliessenEditierbarTypes: AbschliessenEditierbarTypes,
  UpdateKuzungenTypes: UpdateKuzungenTypes,
  CreateKuzungenTypes: CreateKuzungenTypes
};

export class SpezialkontoAction implements AppStateAction {
  readonly type = SpezialkontoActionTypes.SpezialkontoAction;
  constructor(public payload?: any) { }
}

//#region  Load Master Data
export namespace MasterDataCbxDatas {
  export class LoadMasterDataCbxAction implements AppStateAction {
    readonly type = MasterCCBDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadMasterDataCbxSuccessAction implements AppStateAction {
    readonly type = MasterCCBDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadMasterDataCbxFailAction implements AppStateAction {
    readonly type = MasterCCBDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
//#endregion

//#region  Load GridTop
export namespace LoadGridTopDatas {
  export class LoadGridToAction implements AppStateAction {
    readonly type = LoadGridTopDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadGridTopSuccessAction implements AppStateAction {
    readonly type = LoadGridTopDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadGridTopFailAction implements AppStateAction {
    readonly type = LoadGridTopDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
//#endregion

//#region  Load GridDetail
export namespace LoadGridDetailDatas {
  export class LoadAction implements AppStateAction {
    readonly type = LoadGridDetailDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = LoadGridDetailDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = LoadGridDetailDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
//#endregion

//#region  Load BaPerson
export namespace LoadBaPersonDatas {
  export class LoadAction implements AppStateAction {
    readonly type = LoadBaPersonDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = LoadBaPersonDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = LoadBaPersonDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
//#endregion

//#region  Load BgKostenart
export namespace LoadBgKostenartDatas {
  export class LoadAction implements AppStateAction {
    readonly type = LoadBgKostenartDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = LoadBgKostenartDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = LoadBgKostenartDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
//#endregion

//#region  Load DatumVon
export namespace LoadDatumVonDatas {
  export class LoadAction implements AppStateAction {
    readonly type = LoadDatumVonDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = LoadDatumVonDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = LoadDatumVonDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
//#endregion

//#region  Load BgPosArt
export namespace LoadBgPosArtDatas {
  export class LoadAction implements AppStateAction {
    readonly type = LoadBgPosArtDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = LoadBgPosArtDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = LoadBgPosArtDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
//#endregion

//#region  Create
export namespace CreateDatas {
  export class LoadAction implements AppStateAction {
    readonly type = CreateDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = CreateDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = CreateDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
//#endregion

//#region  Edit
export namespace EditDatas {
  export class LoadAction implements AppStateAction {
    readonly type = EditDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = EditDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = EditDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
//#endregion

//#region  Delete
export namespace DeleteDatas {
  export class LoadAction implements AppStateAction {
    readonly type = DeleteDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = DeleteDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = DeleteDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
//#endregion

//#region  LoadPositionsarten
export namespace LoadPositionsartenDatas {
  export class LoadAction implements AppStateAction {
    readonly type = LoadPositionsartenDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = LoadPositionsartenDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = LoadPositionsartenDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
//#endregion

//#region  AbschliessenVisible
export namespace LoadAbschliessenVisible {
  export class LoadAction implements AppStateAction {
    readonly type = AbschliessenVisibleDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = AbschliessenVisibleDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = AbschliessenVisibleDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
//#endregion

//#region  MaxSanktion
export namespace MaxSanktion {
  export class LoadAction implements AppStateAction {
    readonly type = MaxSanktionDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = MaxSanktionDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = MaxSanktionDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace AbschliessenUndo {
  export class LoadAction implements AppStateAction {
    readonly type = AbschliessenUndoTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = AbschliessenUndoTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = AbschliessenUndoTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace AbschliessenEditierbar {
  export class LoadAction implements AppStateAction {
    readonly type = AbschliessenEditierbarTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = AbschliessenEditierbarTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = AbschliessenEditierbarTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
export namespace KontoWirdNichtAusgeglichen {
  export class LoadAction implements AppStateAction {
    readonly type = KontoWirdNichtAusgeglichenTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = KontoWirdNichtAusgeglichenTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = KontoWirdNichtAusgeglichenTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}


export namespace UebergabeAnInkasso {
  export class LoadAction implements AppStateAction {
    readonly type = UebergabeAnInkassoTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = UebergabeAnInkassoTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = UebergabeAnInkassoTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
//#endregion

//#region
export namespace Reset {
  export class LoadAction implements AppStateAction {
    readonly type = ResetDatasTypes.RESET;
    constructor(public payload?: any) { }
  }
}
//#endregion

//#region update kuzungen
export namespace UpdateKuzungen {
  export class LoadAction implements AppStateAction {
    readonly type = UpdateKuzungenTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = UpdateKuzungenTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = UpdateKuzungenTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
//#endregion

//#region create kuzungen
export namespace CreateKuzungen {
  export class LoadAction implements AppStateAction {
    readonly type = CreateKuzungenTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = CreateKuzungenTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = CreateKuzungenTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}
//#endregion
export type SpezialkontoActions
  = SpezialkontoAction
  | MasterDataCbxDatas.LoadMasterDataCbxAction
  | MasterDataCbxDatas.LoadMasterDataCbxSuccessAction
  | MasterDataCbxDatas.LoadMasterDataCbxFailAction
  | LoadGridTopDatas.LoadGridToAction
  | LoadGridTopDatas.LoadGridTopSuccessAction
  | LoadGridTopDatas.LoadGridTopFailAction
  | LoadGridDetailDatas.LoadAction
  | LoadGridDetailDatas.LoadSuccessAction
  | LoadGridDetailDatas.LoadFailAction
  | LoadBaPersonDatas.LoadAction
  | LoadBaPersonDatas.LoadSuccessAction
  | LoadBaPersonDatas.LoadFailAction
  | LoadBgKostenartDatas.LoadAction
  | LoadBgKostenartDatas.LoadSuccessAction
  | LoadBgKostenartDatas.LoadFailAction
  | LoadDatumVonDatas.LoadAction
  | LoadDatumVonDatas.LoadSuccessAction
  | LoadDatumVonDatas.LoadFailAction
  | LoadBgPosArtDatas.LoadAction
  | LoadBgPosArtDatas.LoadSuccessAction
  | LoadBgPosArtDatas.LoadFailAction
  | CreateDatas.LoadAction
  | CreateDatas.LoadSuccessAction
  | CreateDatas.LoadFailAction
  | EditDatas.LoadAction
  | EditDatas.LoadSuccessAction
  | EditDatas.LoadFailAction
  | DeleteDatas.LoadAction
  | DeleteDatas.LoadSuccessAction
  | DeleteDatas.LoadFailAction
  | LoadPositionsartenDatas.LoadAction
  | LoadPositionsartenDatas.LoadSuccessAction
  | LoadPositionsartenDatas.LoadFailAction
  | LoadAbschliessenVisible.LoadAction
  | LoadAbschliessenVisible.LoadSuccessAction
  | LoadAbschliessenVisible.LoadFailAction
  | MaxSanktion.LoadAction
  | MaxSanktion.LoadSuccessAction
  | MaxSanktion.LoadFailAction
  | Reset.LoadAction
  | AbschliessenUndo.LoadAction
  | AbschliessenUndo.LoadSuccessAction
  | AbschliessenUndo.LoadFailAction
  | UebergabeAnInkasso.LoadAction
  | UebergabeAnInkasso.LoadSuccessAction
  | UebergabeAnInkasso.LoadFailAction
  | KontoWirdNichtAusgeglichen.LoadAction
  | KontoWirdNichtAusgeglichen.LoadSuccessAction
  | KontoWirdNichtAusgeglichen.LoadFailAction
  | AbschliessenEditierbar.LoadAction
  | AbschliessenEditierbar.LoadSuccessAction
  | AbschliessenEditierbar.LoadFailAction
  | UpdateKuzungen.LoadAction
  | UpdateKuzungen.LoadSuccessAction
  | UpdateKuzungen.LoadFailAction
  | CreateKuzungen.LoadAction
  | CreateKuzungen.LoadSuccessAction
  | CreateKuzungen.LoadFailAction;

