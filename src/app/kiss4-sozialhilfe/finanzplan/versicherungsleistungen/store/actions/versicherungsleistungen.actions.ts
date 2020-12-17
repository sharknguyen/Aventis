import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';

const LoadEinkommenTypes = {
    LOAD: type('[Einkommen] Load'),
    LOAD_SUCCESS: type('[Einkommen] Load Success'),
    LOAD_FAIL: type('[Einkommen] Load Fail'),
};
const PostEinkommenTypes = {
    POST: type('[Einkommen] Post'),
    POST_SUCCESS: type('[Einkommen] Post Success'),
    POST_FAIL: type('[Einkommen] Post Fail'),
    RESET: type('[Einkommen] Post Reset')
};
const PutEinkommenTypes = {
    PUT: type('[Einkommen] Put'),
    PUT_SUCCESS: type('[Einkommen] Put Success'),
    PUT_FAIL: type('[Einkommen] Put Fail'),
    RESET: type('[Einkommen] Put Reset')
};
const DeleteEinkommenTypes = {
    DELETE: type('[Einkommen] Delete'),
    DELETE_SUCCESS: type('[Einkommen] Delete Success'),
    DELETE_FAIL: type('[Einkommen] Delete Fail'),
};
const GetEinkommenLookUpTypes = {
    GET: type('[EinkommenLookUp] Get'),
    GET_SUCCESS: type('[EinkommenLookUp] Get Success'),
    GET_FAIL: type('[EinkommenLookUp] Get Fail'),
};
const GetPersonListTypes = {
    GET: type('[Einkommen PersonList] Get'),
    GET_SUCCESS: type('[Einkommen PersonList] Get Success'),
    GET_FAIL: type('[Einkommen PersonList] Get Fail'),
};
const GetBgBewilligungStatusCodeTypes = {
    GET: type('[BgBewilligungStatusCode] Get'),
    GET_SUCCESS: type('[BgBewilligungStatusCode] Get Success'),
    GET_FAIL: type('[BgBewilligungStatusCode] Get Fail'),
};

export const VersicherungsleistungenTypes = {
    VersicherungsleistungenAction: type('[Versicherungsleistungen] Action'),
    LoadEinkommenTypes: LoadEinkommenTypes,
    PostEinkommenTypes: PostEinkommenTypes,
    PutEinkommenTypes: PutEinkommenTypes,
    DeleteEinkommenTypes: DeleteEinkommenTypes,
    GetEinkommenLookUpTypes: GetEinkommenLookUpTypes,
    GetPersonListTypes: GetPersonListTypes,
    GetBgBewilligungStatusCodeTypes: GetBgBewilligungStatusCodeTypes
};

export class VersicherungsleistungenAction implements AppStateAction {
    readonly type = VersicherungsleistungenTypes.VersicherungsleistungenAction;
    constructor(public payload?: any) { }
}

export class LoadEinkommenAction implements AppStateAction {
    readonly type = LoadEinkommenTypes.LOAD;
    constructor(public payload?: any) { }
}
export class LoadSuccessEinkommenAction implements AppStateAction {
    readonly type = LoadEinkommenTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
}
export class LoadFailEinkommenAction implements AppStateAction {
    readonly type = LoadEinkommenTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
}

export class PostEinkommenAction implements AppStateAction {
    readonly type = PostEinkommenTypes.POST;
    constructor(public payload?: any) { }
}
export class PostSuccessEinkommenAction implements AppStateAction {
    readonly type = PostEinkommenTypes.POST_SUCCESS;
    constructor(public payload?: any) { }
}
export class PostFailEinkommenAction implements AppStateAction {
    readonly type = PostEinkommenTypes.POST_FAIL;
    constructor(public payload?: any) { }
}
export class ResetPostEinkommenAction implements AppStateAction {
    readonly type = PostEinkommenTypes.RESET;
    constructor(public payload?: any) { }
}

export class PutEinkommenAction implements AppStateAction {
    readonly type = PutEinkommenTypes.PUT;
    constructor(public payload?: any) { }
}
export class PutSuccessEinkommenAction implements AppStateAction {
    readonly type = PutEinkommenTypes.PUT_SUCCESS;
    constructor(public payload?: any) { }
}
export class PutFailEinkommenAction implements AppStateAction {
    readonly type = PutEinkommenTypes.PUT_FAIL;
    constructor(public payload?: any) { }
}
export class ResetPutEinkommenAction implements AppStateAction {
    readonly type = PutEinkommenTypes.RESET;
    constructor(public payload?: any) { }
}

export class DeleteEinkommenAction implements AppStateAction {
    readonly type = DeleteEinkommenTypes.DELETE;
    constructor(public payload?: any) { }
}
export class DeleteSuccessEinkommenAction implements AppStateAction {
    readonly type = DeleteEinkommenTypes.DELETE_SUCCESS;
    constructor(public payload?: any) { }
}
export class DeleteFailEinkommenAction implements AppStateAction {
    readonly type = DeleteEinkommenTypes.DELETE_FAIL;
    constructor(public payload?: any) { }
}

export class GetEinkommenLookUpAction implements AppStateAction {
    readonly type = GetEinkommenLookUpTypes.GET;
    constructor(public payload?: any) { }
}
export class GetEinkommenLookUpSuccessAction implements AppStateAction {
    readonly type = GetEinkommenLookUpTypes.GET_SUCCESS;
    constructor(public payload?: any) { }
}
export class GetEinkommenLookUpFailAction implements AppStateAction {
    readonly type = GetEinkommenLookUpTypes.GET_FAIL;
    constructor(public payload?: any) { }
}

export class GetPersonListAction implements AppStateAction {
    readonly type = GetPersonListTypes.GET;
    constructor(public payload?: any) { }
}
export class GetPersonListSuccessAction implements AppStateAction {
    readonly type = GetPersonListTypes.GET_SUCCESS;
    constructor(public payload?: any) { }
}
export class GetPersonListFailAction implements AppStateAction {
    readonly type = GetPersonListTypes.GET_FAIL;
    constructor(public payload?: any) { }
}

export class GetBgBewilligungStatusCodeAction implements AppStateAction {
    readonly type = GetBgBewilligungStatusCodeTypes.GET;
    constructor(public payload?: any) { }
}
export class GetBgBewilligungStatusCodeSuccessAction implements AppStateAction {
    readonly type = GetBgBewilligungStatusCodeTypes.GET_SUCCESS;
    constructor(public payload?: any) { }
}
export class GetBgBewilligungStatusCodeFailAction implements AppStateAction {
    readonly type = GetBgBewilligungStatusCodeTypes.GET_FAIL;
    constructor(public payload?: any) { }
}

export type VersicherungsleistungenActions
    = VersicherungsleistungenAction
    | LoadEinkommenAction
    | LoadSuccessEinkommenAction
    | LoadFailEinkommenAction
    | PostEinkommenAction
    | PostSuccessEinkommenAction
    | PostFailEinkommenAction
    | ResetPostEinkommenAction
    | PutEinkommenAction
    | PutSuccessEinkommenAction
    | PutFailEinkommenAction
    | ResetPutEinkommenAction
    | DeleteEinkommenAction
    | DeleteSuccessEinkommenAction
    | DeleteFailEinkommenAction
    | GetEinkommenLookUpAction
    | GetEinkommenLookUpSuccessAction
    | GetEinkommenLookUpFailAction
    | GetPersonListAction
    | GetPersonListFailAction
    | GetPersonListSuccessAction
    | GetBgBewilligungStatusCodeAction
    | GetBgBewilligungStatusCodeSuccessAction
    | GetBgBewilligungStatusCodeFailAction;

