// model for Top grid
export interface ILandesindex {
    created?: any;
    creator?: string;
    ikLandesindexId: any;
    modified?: any;
    modifier?: string;
    name?: string;
    edtWert?: string;
    ikLandesindexTs?: any;
}
export class Landesindex implements ILandesindex {
    public created?: any;
    public creator?: string;
    public ikLandesindexId: any;
    public modified?: any;
    public modifier?: string;
    public name: string;
    public edtWert?: string;
    public ikLandesindexTs?: any;
    constructor(data?: ILandesindex) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// ListItem
export interface IListItem {
    listMasters_item: Landesindex[];
    listDetails_item: LandesindexWert[];
}
export class ListItem implements IListItem {
    public listMasters_item: Landesindex[] = [];
    public listDetails_item: LandesindexWert[] = [];
    constructor(data?: IListItem) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model for Bottom grid
export interface ILandesindexWert {
    created?: any;
    creator?: string;
    ikLandesindexId: number;
    ikLandesindexWertId?: number;
    jahr?: number;
    modified?: any;
    modifier?: string;
    monat?: number;
    wert?: number;
}
export class LandesindexWert implements ILandesindexWert {
    created?: any;
    creator?: string;
    ikLandesindexId: number;
    ikLandesindexWertId: number;
    jahr?: number;
    modified?: any;
    modifier?: string;
    monat?: number;
    wert?: number;
    constructor(data?: ILandesindexWert) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model for Bottom grid
export interface ILandesindexDelete {
    isSuccess?: boolean;

}
export class LandesindexDelete implements ILandesindexDelete {
    public isSuccess?: boolean;
    constructor(data?: ILandesindexDelete) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

/**** Add model for navi bar */
class Details {
    id: string;
    text: string;
}
export class Level2Navi extends Details {
    density: string;
    capital?: true;
}

export class Level1Navi extends Details {
    expanded?: boolean;
    selected?: boolean;
}

export class ContentNavi {
    id: string;
    text: string;
    expanded?: boolean;
    selected?: boolean;
    items: Level1Navi[];
}
/**** The End Add model for navi bar */

export interface IMsgResponse {
    statusCode: string;
    msgCode: string;
    msgType: number;
    msgText: string;
}
export class MsgResponse implements IMsgResponse {
    public statusCode: string;
    public msgCode: string;
    public msgType: number;
    public msgText: string;
    constructor(data?: IMsgResponse) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IResult {
    msgRespone: MsgResponse;
    data: string;
}
export class Result implements IResult {
    public msgRespone: MsgResponse;
    public data: string;
    constructor(data?: IResult) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface ILandesindexWertErfassen {
    ikLandesindexID: number;
    edtWert: number;
}
export class LandesindexWertErfassen implements ILandesindexWertErfassen {
    public ikLandesindexID: number;
    public edtWert: number;
    constructor(data?: ILandesindexWertErfassen) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IWert {
    jahr: number;
    monat: number;
    ikLandesindexID: number;
}
export class Wert implements IWert {
    public jahr: number;
    public monat: number;
    public ikLandesindexID: number;
    constructor(data?: IWert) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface ILandesindexWertOutput {
    wert?: any;
}
export class LandesindexWertOutput implements ILandesindexWertOutput {
    public wert?: any;
    constructor(data?: ILandesindexWertOutput) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IInsertIkLandesIndex {
    name: string;
}
export class InsertIkLandesIndex implements IInsertIkLandesIndex {
    public name: string;
    constructor(data?: IInsertIkLandesIndex) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IInsertWertByIkLandesindex {
    oldIkLandesindexID: number;
    creatorModifier: number;
    newIkLandesindexID: number;
}
export class InsertWertByIkLandesindex implements IInsertWertByIkLandesindex {
    public oldIkLandesindexID: number;
    public creatorModifier: number;
    public newIkLandesindexID: number;
    constructor(data?: IInsertWertByIkLandesindex) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IStatus {
  value: boolean;
}
export class Status implements IStatus {
    public value: boolean;
    constructor(data?: IStatus) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IUpdateWert {
    neuberechnungBasis: number;
    newIkLandesindexID: number;
}
export class UpdateWert implements IUpdateWert {
    public neuberechnungBasis: number;
    public newIkLandesindexID: number;
    constructor(data?: IUpdateWert) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
