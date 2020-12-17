// model for Top grid
export interface IASVDetenerfassung {
    SstASVSExportID: number;
    Bemerkung: string;
    DatumExport?: Date;
    Anzahl: number;
    DocumentID?: number;
    SstASVSExportTS: number[];
    Modifier: string;
    Creator: string;
    Modified: string;
    Created: Date;

}


export class ASVDetenerfassung implements IASVDetenerfassung {
    public SstASVSExportID: number;
    public Bemerkung: string;
    public DatumExport?: Date;
    public Anzahl: number;
    public DocumentID?: number;
    public SstASVSExportTS: number[];
    public Modifier: string;
    public Creator: string;
    public Modified: string;
    public Created: Date;
    constructor(data?: IASVDetenerfassung) {
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
export interface IZuExportierendeEintrage {
    index: number;
    baPersonID: number;
    nameVorname: string;
    datumVon: Date;
    datumBis?: Date;
    widerruf: boolean;
    itemName: string;
    problem: string;

}


export class ZuExportierendeEintrage implements IZuExportierendeEintrage {
    public index: number;
    public baPersonID: number;
    public nameVorname: string;
    public datumVon: Date;
    public datumBis?: Date;
    public widerruf: boolean;
    public itemName: string;
    public problem: string;
    constructor(data?: IZuExportierendeEintrage) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model query for Bottom grid
export interface IZuExportierendeEintrageQuery {
    sstASVSExportID: number;
    isFindeDieZu: boolean;
    orgUnitID?: number;
}


export class ZuExportierendeEintrageQuery implements IZuExportierendeEintrageQuery {
    public sstASVSExportID: number;
    public isFindeDieZu: boolean;
    public orgUnitID?: number;
    constructor(data?: IZuExportierendeEintrageQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model query updateSstASVSExport
export interface IModelQueryUpdateASVSExport {
    DatumExport?: Date;
    Bemerkung: string;
    DocumentID?: number;
    SstASVSExportID: number;
    SstASVSExportTS: any[];
}

export class ModelQueryUpdateASVSExport implements IModelQueryUpdateASVSExport {
    public DatumExport?: Date;
    public Bemerkung: string;
    public DocumentID?: number;
    public SstASVSExportID: number;
    public SstASVSExportTS: any[];
    constructor(data?: IModelQueryUpdateASVSExport) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model Get File Binary By DocumnetID
export interface IModelFileBinary {
    FileBinary: any[];
    DbName: string;
}

export class ModelFileBinary implements IModelFileBinary {
    public FileBinary: any[];
    public DbName: string;
    constructor(data?: IModelFileBinary) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Get XOrgUnit All for combobox Sektion
export interface IModelXOrgUnit {
    code: number;
    text: string;
}

export class ModelXOrgUnit implements IModelXOrgUnit {
    public code: number;
    public text: string;
    constructor(data?: IModelXOrgUnit) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model query insert SstASVSExport
export interface IModelQueryInsertASVSExport {
    datumExport?: Date;
    bemerkung: string;
    documentID?: number;
    creator: string;
    created: Date;
    modifier: string;
    modified: any;
}

export class ModelQueryInsertASVSExport implements IModelQueryInsertASVSExport {
    public datumExport?: Date;
    public bemerkung: string;
    public documentID?: number;
    public creator: string;
    public created: Date;
    public modifier: string;
    public modified: any;
    constructor(data?: IModelQueryInsertASVSExport) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IModelUpdateTransaction {
    isSuccess: boolean;
    status: number;
    _body: any;
}

export class ModelUpdateTransaction implements IModelUpdateTransaction {
    public isSuccess: boolean;
    public status: number;
    public _body: any;
    constructor(data?: IModelUpdateTransaction) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IModelQueryUpdateTransaction {
    datumExport?: Date;
    bemerkung: string;
    documentID?: number;
    orgUnitID?: number;
}

export class ModelQueryUpdateTransaction implements IModelQueryUpdateTransaction {
    public datumExport?: Date;
    public bemerkung: string;
    public documentID?: number;
    public orgUnitID?: number;
    constructor(data?: IModelQueryUpdateTransaction) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model Update
export interface IModelUpdateASVSExport {
    value: boolean;
    _body: any;
    status: number;

}

export class ModelUpdateASVSExport implements IModelUpdateASVSExport {
    public value: boolean;
    public _body: any;
    public status: number;
    constructor(data?: IModelUpdateASVSExport) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
