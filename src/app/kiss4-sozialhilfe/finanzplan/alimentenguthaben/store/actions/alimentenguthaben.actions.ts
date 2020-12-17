import { AppStateAction } from '@shared/AppAction';
import { type } from '@shared/utilites/utilityHelpers';

const ListGridTypes = {
  LOAD: type('[ListGrid Datas] Load'),
  LOAD_SUCCESS: type('[ListGrid Datas] Load Success'),
  LOAD_FAIL: type('[ListGrid Datas] Load Fail')
};
const GetInkassoDatasTypes = {
  LOAD: type('[TableDatas] Load'),
  LOAD_SUCCESS: type('[TableDatas] Load Success'),
  LOAD_FAIL: type('[TableDatas] Load Fail')
};
const getPersonenUnterstuetztn = {
  LOAD: type('[TypDatas] Load'),
  LOAD_SUCCESS: type('[TypDatas] Load Success'),
  LOAD_FAIL: type('[TypDatas] Load Fail')
};

const NewAlimentenguthabenActionTypes = {
  POST: type('[POST] POST'),
  POST_SUCCESS: type('[POST] POST Success'),
  POST_FAIL: type('[POST] POST Fail'),
  POST_RESET: type('[POST] POST Reset')
};

const SaveAlimentenguthabenActionTypes = {
  PUT: type('[PUT] PUT'),
  PUT_SUCCESS: type('[PUT] PUT Success'),
  PUT_FAIL: type('[PUT] PUT Fail'),
  PUT_RESET: type('[PUT] PUT Reset')
};

const DeleteAlimentenguthabenActionTypes = {
  DELETE: type('[DELETE] DELETE'),
  DELETE_SUCCESS: type('[DELETE] DELETE Success'),
  DELETE_FAIL: type('[DELETE] DELETE Fail'),
  DELETE_RESET: type('[DELETE] DELETE Reset')
};

const GetTitleActionTypes = {
  GET: type('[GET] GET'),
  GET_SUCCESS: type('[GET] GET Success'),
  GET_FAIL: type('[GET] GET Fail')
};

export const AlimentenguthabenActionTypes = {
  AlimentenguthabenAction: type('[ListGrid] Action'),
  ListGridTypes: ListGridTypes,
  GetInkassoDatasTypes: GetInkassoDatasTypes,
  getPersonenUnterstuetztn: getPersonenUnterstuetztn,
  NewAlimentenguthabenActionTypes: NewAlimentenguthabenActionTypes,
  SaveAlimentenguthabenActionTypes: SaveAlimentenguthabenActionTypes,
  DeleteAlimentenguthabenActionTypes: DeleteAlimentenguthabenActionTypes,
  GetTitleActionTypes: GetTitleActionTypes
};
export class AlimentenguthabenAction implements AppStateAction {
  readonly type = AlimentenguthabenActionTypes.AlimentenguthabenAction;
  constructor(public payload?: any) { }
}

export namespace ListGridDatas {
  export class LoadAction implements AppStateAction {
    readonly type = ListGridTypes.LOAD;
    constructor(public payload?: any) { }
  }
  export class LoadSuccessAction implements AppStateAction {
    readonly type = ListGridTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }
  export class LoadFailAction implements AppStateAction {
    readonly type = ListGridTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace GetInkassoDatas {
  export class LoadAction implements AppStateAction {
    readonly type = GetInkassoDatasTypes.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = GetInkassoDatasTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = GetInkassoDatasTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace GetPersonenUnterstuetztnDatas {
  export class LoadAction implements AppStateAction {
    readonly type = getPersonenUnterstuetztn.LOAD;
    constructor(public payload?: any) { }
  }

  export class LoadSuccessAction implements AppStateAction {
    readonly type = getPersonenUnterstuetztn.LOAD_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class LoadFailAction implements AppStateAction {
    readonly type = getPersonenUnterstuetztn.LOAD_FAIL;
    constructor(public payload?: any) { }
  }
}

export namespace NewAlimentenguthabenAction {
  export class PostAction implements AppStateAction {
    readonly type = NewAlimentenguthabenActionTypes.POST;
    constructor(public payload?: any) { }
  }

  export class PostSuccessAction implements AppStateAction {
    readonly type = NewAlimentenguthabenActionTypes.POST_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class PostFailAction implements AppStateAction {
    readonly type = NewAlimentenguthabenActionTypes.POST_FAIL;
    constructor(public payload?: any) { }
  }
  export class PostResetAction implements AppStateAction {
    readonly type = NewAlimentenguthabenActionTypes.POST_RESET;
    constructor(public payload?: any) { }
  }
}

export namespace SaveAlimentenguthabenAction {
  export class PutAction implements AppStateAction {
    readonly type = SaveAlimentenguthabenActionTypes.PUT;
    constructor(public payload?: any) { }
  }

  export class PutSuccessAction implements AppStateAction {
    readonly type = SaveAlimentenguthabenActionTypes.PUT_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class PutFailAction implements AppStateAction {
    readonly type = SaveAlimentenguthabenActionTypes.PUT_FAIL;
    constructor(public payload?: any) { }
  }
  export class PutResetAction implements AppStateAction {
    readonly type = SaveAlimentenguthabenActionTypes.PUT_SUCCESS;
    constructor(public payload?: any) { }
  }
}
export namespace DeleteAlimentenguthabenAction {
  export class DeleteAction implements AppStateAction {
    readonly type = DeleteAlimentenguthabenActionTypes.DELETE;
    constructor(public payload?: any) { }
  }

  export class DeleteSuccessAction implements AppStateAction {
    readonly type = DeleteAlimentenguthabenActionTypes.DELETE_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class DeleteFailAction implements AppStateAction {
    readonly type = DeleteAlimentenguthabenActionTypes.DELETE_FAIL;
    constructor(public payload?: any) { }
  }
  export class DeleteResetAction implements AppStateAction {
    readonly type = DeleteAlimentenguthabenActionTypes.DELETE_RESET;
    constructor(public payload?: any) { }
  }
}

export namespace GetTitleAction {
  export class TitleAction implements AppStateAction {
    readonly type = GetTitleActionTypes.GET;
    constructor(public payload?: any) { }
  }

  export class TitleSuccessAction implements AppStateAction {
    readonly type = GetTitleActionTypes.GET_SUCCESS;
    constructor(public payload?: any) { }
  }

  export class TitleFailAction implements AppStateAction {
    readonly type = GetTitleActionTypes.GET_FAIL;
    constructor(public payload?: any) { }
  }
}

export type AlimentenguthabenActions = AlimentenguthabenAction
  | ListGridDatas.LoadAction
  | ListGridDatas.LoadSuccessAction
  | ListGridDatas.LoadFailAction
  | GetInkassoDatas.LoadAction
  | GetInkassoDatas.LoadSuccessAction
  | GetInkassoDatas.LoadFailAction
  | GetPersonenUnterstuetztnDatas.LoadAction
  | GetPersonenUnterstuetztnDatas.LoadSuccessAction
  | GetPersonenUnterstuetztnDatas.LoadFailAction
  | NewAlimentenguthabenAction.PostAction
  | NewAlimentenguthabenAction.PostSuccessAction
  | NewAlimentenguthabenAction.PostFailAction
  | NewAlimentenguthabenAction.PostResetAction
  | SaveAlimentenguthabenAction.PutAction
  | SaveAlimentenguthabenAction.PutSuccessAction
  | SaveAlimentenguthabenAction.PutFailAction
  | SaveAlimentenguthabenAction.PutResetAction
  | DeleteAlimentenguthabenAction.DeleteAction
  | DeleteAlimentenguthabenAction.DeleteSuccessAction
  | DeleteAlimentenguthabenAction.DeleteFailAction
  | DeleteAlimentenguthabenAction.DeleteResetAction
  | GetTitleAction.TitleAction
  | GetTitleAction.TitleSuccessAction
  | GetTitleAction.TitleFailAction
  ;
