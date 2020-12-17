import { type } from '@shared/utilites';
import { AppStateAction } from '@shared/AppAction';
import { IFinanzplan, ICheck, IFinanzplanDropDown, IPersonenInfo, IFinanzplanSaveParam } from '@app/kiss4-sozialhilfe/regularer-finanzplan/models';

const personenDataTypes = {
  LOAD: type('[personenData] Load'),
  LOAD_SUCCESS: type('[personenData] Load Success'),
  LOAD_FAIL: type('[personenData] Load Fail')
};
const finanzplanDataTypes = {
  LOAD: type('[finanzplanData] Load'),
  LOAD_SUCCESS: type('[finanzplanData] Load Success'),
  LOAD_FAIL: type('[finanzplanData] Load Fail')
};
const finanzplanCheckDataTypes = {
  LOAD: type('[finanzplanCheckData] Load'),
  LOAD_SUCCESS: type('[finanzplanCheckData] Load Success'),
  LOAD_FAIL: type('[finanzplanCheckData] Load Fail')
};

const GrundErDataTypes = {
  LOAD: type('[finanzplanGrundErData] Load'),
  LOAD_SUCCESS: type('[finanzplanGrundErData] Load Success'),
  LOAD_FAIL: type('[finanzplanGrundErData] Load Fail')
};
const GrundAbDataTypes = {
  LOAD: type('[finanzplanGrundAbData] Load'),
  LOAD_SUCCESS: type('[finanzplanGrundAbData] Load Success'),
  LOAD_FAIL: type('[finanzplanGrundAbData] Load Fail')
};
const GrundbedarfTypeDataTypes = {
  LOAD: type('[finanzplanGrundbedarfTypeData] Load'),
  LOAD_SUCCESS: type('[finanzplanGrundbedarfTypeData] Load Success'),
  LOAD_FAIL: type('[finanzplanGrundbedarfTypeData] Load Fail')
};
const TypeDataTypes = {
  LOAD: type('[finanzplanTypeData] Load'),
  LOAD_SUCCESS: type('[finanzplanTypeData] Load Success'),
  LOAD_FAIL: type('[finanzplanTypeData] Load Fail')
};
const BewilligungStatusDataTypes = {
  LOAD: type('[finanzplanBewilligungStatusData] Load'),
  LOAD_SUCCESS: type('[finanzplanBewilligungStatusData] Load Success'),
  LOAD_FAIL: type('[finanzplanBewilligungStatusData] Load Fail')
};

const FinanzplanSaveTypes = {
  LOAD: type('[finanzplanSaveData] Load'),
  LOAD_SUCCESS: type('[finanzplanSaveData] Load Success'),
  LOAD_FAIL: type('[finanzplanSaveData] Load Fail')
};

const VerlaufDataTypes = {
  LOAD: type('[VerlaufData] Load'),
  LOAD_SUCCESS: type('[VerlaufData] Load Success'),
  LOAD_FAIL: type('[VerlaufData] Load Fail')
};

const TypVerlaufDataTypes = {
  LOAD: type('[TypVerlaufData] Load'),
  LOAD_SUCCESS: type('[TypVerlaufData] Load Success'),
  LOAD_FAIL: type('[TypVerlaufData] Load Fail')
};

export const finanzplanActionTypes = {
  finanzplanAction: type('[finanzplan] Action'),
  personenDataTypes,
  finanzplanDataTypes,
  finanzplanCheckDataTypes,
  GrundErDataTypes,
  GrundAbDataTypes,
  GrundbedarfTypeDataTypes,
  TypeDataTypes,
  BewilligungStatusDataTypes,
  FinanzplanSaveTypes,
  VerlaufDataTypes,
  TypVerlaufDataTypes

};

export class RegularerFinanzplanActions implements AppStateAction {
  readonly type = finanzplanActionTypes.finanzplanAction;
  constructor(public payload?: any) {
  }
}

export namespace PersonenInfoAction {
  export class LoadAction implements AppStateAction {
    readonly type = personenDataTypes.LOAD;
    constructor(public payload: {bgFinanzplanID: number, baPersonID: number}) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = personenDataTypes.LOAD_SUCCESS;
    constructor(public payload: IPersonenInfo) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = personenDataTypes.LOAD_FAIL;
    constructor(public payload: any) {
    }
  }
}

export namespace RegularerFinanzplanData {
  export class LoadAction implements AppStateAction {
    readonly type = finanzplanDataTypes.LOAD;
    constructor(public payload: { bgFinanzplanID: number }) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = finanzplanDataTypes.LOAD_SUCCESS;
    constructor(public payload: IFinanzplan) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = finanzplanDataTypes.LOAD_FAIL;
    constructor(public payload: any) {
    }
  }
}
export namespace CheckData {
  export class LoadAction implements AppStateAction {
    readonly type = finanzplanCheckDataTypes.LOAD;
    constructor(public payload: { bgFinanzplanID: number }) {
    }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = finanzplanCheckDataTypes.LOAD_SUCCESS;
    constructor(public payload: ICheck[]) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = finanzplanCheckDataTypes.LOAD_FAIL;
    constructor(public payload: any) {
    }
  }
}
export namespace GrundErData {
  export class LoadAction implements AppStateAction {
    readonly type = GrundErDataTypes.LOAD;
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = GrundErDataTypes.LOAD_SUCCESS;
    constructor(public payload: IFinanzplanDropDown[]) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = GrundErDataTypes.LOAD_FAIL;
    constructor(public payload: any) { }
  }
}
export namespace GrundAbData {
  export class LoadAction implements AppStateAction {
    readonly type = GrundAbDataTypes.LOAD;
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = GrundAbDataTypes.LOAD_SUCCESS;
    constructor(public payload: IFinanzplanDropDown[]) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = GrundAbDataTypes.LOAD_FAIL;
    constructor(public payload: any) { }
  }
}
export namespace GrundbedarfTypeData {
  export class LoadAction implements AppStateAction {
    readonly type = GrundbedarfTypeDataTypes.LOAD;
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = GrundbedarfTypeDataTypes.LOAD_SUCCESS;
    constructor(public payload: IFinanzplanDropDown[]) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = GrundbedarfTypeDataTypes.LOAD_FAIL;
    constructor(public payload: any) { }
  }
}
export namespace TypeData {
  export class LoadAction implements AppStateAction {
    readonly type = TypeDataTypes.LOAD;
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = TypeDataTypes.LOAD_SUCCESS;
    constructor(public payload: IFinanzplanDropDown[]) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = TypeDataTypes.LOAD_FAIL;
    constructor(public payload: any) { }
  }
}
export namespace BewilligungStatusData {
  export class LoadAction implements AppStateAction {
    readonly type = BewilligungStatusDataTypes.LOAD;
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = BewilligungStatusDataTypes.LOAD_SUCCESS;
    constructor(public payload: IFinanzplanDropDown[]) {
    }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = BewilligungStatusDataTypes.LOAD_FAIL;
    constructor(public payload: any) { }
  }
}

export namespace FinanzplanSaveData {
  export class LoadAction implements AppStateAction {
    readonly type = FinanzplanSaveTypes.LOAD;
    constructor(public payload: IFinanzplanSaveParam) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = FinanzplanSaveTypes.LOAD_SUCCESS;
    constructor(public payload: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = FinanzplanSaveTypes.LOAD_FAIL;
    constructor(public payload: any) { }
  }
}

export namespace VerlaufData {
  export class LoadAction implements AppStateAction {
    readonly type = VerlaufDataTypes.LOAD;
    constructor(public payload: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = VerlaufDataTypes.LOAD_SUCCESS;
    constructor(public payload: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = VerlaufDataTypes.LOAD_FAIL;
    constructor(public payload: any) { }
  }
}

export namespace TypVerlaufData {
  export class LoadAction implements AppStateAction {
    readonly type = TypVerlaufDataTypes.LOAD;
    constructor(public payload: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = TypVerlaufDataTypes.LOAD_SUCCESS;
    constructor(public payload: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = TypVerlaufDataTypes.LOAD_FAIL;
    constructor(public payload: any) { }
  }
}

