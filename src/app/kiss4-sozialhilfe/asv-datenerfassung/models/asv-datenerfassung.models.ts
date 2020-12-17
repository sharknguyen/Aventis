export interface IAsvDatenerfassung {
    WhASVSEintragID: number;
    FaLeistungID: number;
    BaPersonID: number;
    DatumVon: any;
    DatumBis: any;
    Bemerkung: string;
    Widerrufen: boolean;
    NameVorname: string;
    ExportDatumWiderruf: any;
    ASVSEintragStatusCode: number;
    WhASVSEintragTS: any;
    LeistungAb: any;
    DatumExport: any;
}
export class AsvDatenerfassung implements IAsvDatenerfassung {
    public WhASVSEintragID: number;
    public FaLeistungID: number;
    public BaPersonID: number;
    public DatumVon: any;
    public DatumBis: any;
    public Bemerkung: string;
    public Widerrufen: boolean;
    public NameVorname: string;
    public ExportDatumWiderruf: any;
    public ASVSEintragStatusCode: number;
    public WhASVSEintragTS: any;
    public LeistungAb: any;
    public DatumExport: any;
    public index: number;
    constructor(data?: IAsvDatenerfassung) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IModelQueryInsert {
    FaLeistungID: number;
    BaPersonID?: number;
    DatumVon?: any;
    DatumBis?: any;
    LeistungAb?: any;
    AsvseintragStatusCode: number;
    Bemerkung: string;
    Widerruf: boolean;
}
export class ModelQueryInsert implements IModelQueryInsert {
    public FaLeistungID: number;
    public BaPersonID?: number;
    public DatumVon?: any;
    public DatumBis?: any;
    public LeistungAb?: any;
    public AsvseintragStatusCode: number;
    public Bemerkung: string;
    public Widerruf: boolean;
    constructor(data?: IModelQueryInsert) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IModelQueryUpdate {
    WhAsvseintragId: number;
    BaPersonId: number;
    DatumVon: any;
    DatumBis?: any;
    LeistungAb?: any;
    AsvseintragStatusCode: number;
    Bemerkung: string;
    WhAsvseintragTs: any;
    Widerruf: boolean;
    FaleistungId: number;
}
export class ModelQueryUpdate implements IModelQueryUpdate {
    public WhAsvseintragId: number;
    public BaPersonId: number;
    public DatumVon: any;
    public DatumBis?: any;
    public LeistungAb?: any;
    public AsvseintragStatusCode: number;
    public Bemerkung: string;
    public WhAsvseintragTs: any;
    public Widerruf: boolean;
    public FaleistungId: number;
    constructor(data?: IModelQueryUpdate) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IModelQueryDelete {
    WhAsvseintragId: number;
    WhAsvseintragTs: any;
}
export class ModelQueryDelete implements IModelQueryDelete {
    public WhAsvseintragId: number;
    public WhAsvseintragTs: any;
    constructor(data?: IModelQueryDelete) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
