export interface IModelFallfuhrung {

    faLeistungID?: number;
}

export class ModelFallfuhrung implements IModelFallfuhrung {
    public faLeistungID?: number;
    constructor(data?: IModelFallfuhrung) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model Query Get Config
export interface IModelQueryGetConfig {
    keyPath: string;
    defaultValue: boolean;
}

export class ModelQueryGetConfig implements IModelQueryGetConfig {
    public keyPath: string;
    public defaultValue: boolean;
    constructor(data?: IModelQueryGetConfig) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model Get Config
export interface IModelGetConfig {
    value: boolean;
    _body: any;
    status: number;

}

export class ModelGetConfig implements IModelGetConfig {
    public value: boolean;
    public _body: any;
    public status: number;
    constructor(data?: IModelGetConfig) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model Get Config
export interface IModelGetFaLeistung {
    FaLeistungID: number;
    BaPersonID: number;
    FaFallID: number;
    ModulID: number;
    UserID: number;
    SachbearbeiterID?: number;
    SchuldnerBaPersonID?: number;
    FaProzessCode?: number;
    GemeindeCode?: number;
    LeistungsartCode?: number;
    EroeffnungsGrundCode?: number;
    AbschlussGrundCode?: number;
    DatumVon: any;
    DatumBis?: any;
    Bemerkung: string;

    Dossiernummer: string;
    FaAufnahmeartCode?: number;
    FaKontaktveranlasserCode?: number;
    FaTeilleistungserbringerCodes: string;
    FaModulDienstleistungenCode?: number;
    IkSchuldnerStatusCode?: number;
    IkAufenthaltsartCode?: number;
    IkHatUnterstuetzung: boolean;
    IkIstRentenbezueger: boolean;
    IkSchuldnerMahnen: boolean;
    IkEinnahmenQuoteCode?: number;
    IkDatumRechtskraft: Date;
    IkInkassoBemuehungCode?: number;

    IkVerjaehrungAm?: Date;
    IkLeistungStatusCode: number;
    IkDatumForderungstitel?: Date;
    IkRueckerstattungTypCode?: number;
    IkForderungTitelCode?: number;
    IkErreichungsGradCode?: number;
    OldUnitID?: number;
    VmAuftragCode?: number;
    KaProzessCode?: number;
    KaEpqJob?: boolean;
    Bezeichnung: string;
    MigrationKA?: number;
    PscdVertragsgegenstandID?: number;
    MigBemerkung: string;
    MigHerkunftCode?: number;
    MigAlteFallNr?: number;
    VUFaFallID?: number;
    visdat36Area: string;
    visdat36FALLID: string;
    visdat36LEISTUNGID: string;
    WiederholteSpezifischeErmittlungEAF: boolean;
    Creator: string;
    Created: Date;
    Modifier: string;
    Modified: Date;
    FaLeistungTS: any[];
    SAR: string;
    faLeistungArchivID?: number;
    GemeindeText: string;
    FaKontaktveranlasserText: string;
    AbsschlussGrundText: string;
    FaAufnahmeartText: string;
}

export class ModelGetFaLeistung implements IModelGetFaLeistung {
    public FaLeistungID: number;
    public BaPersonID: number;
    public FaFallID: number;
    public ModulID: number;
    public UserID: number;
    public SachbearbeiterID?: number;
    public SchuldnerBaPersonID?: number;
    public FaProzessCode?: number;
    public GemeindeCode?: number;
    public LeistungsartCode?: number;
    public EroeffnungsGrundCode?: number;
    public AbschlussGrundCode?: number;
    public DatumVon: any;
    public DatumBis?: any;
    public Bemerkung: string;

    public Dossiernummer: string;
    public FaAufnahmeartCode?: number;
    public FaKontaktveranlasserCode?: number;
    public FaTeilleistungserbringerCodes: string;
    public FaModulDienstleistungenCode?: number;
    public IkSchuldnerStatusCode?: number;
    public IkAufenthaltsartCode?: number;
    public IkHatUnterstuetzung: boolean;
    public IkIstRentenbezueger: boolean;
    public IkSchuldnerMahnen: boolean;
    public IkEinnahmenQuoteCode?: number;
    public IkDatumRechtskraft: Date;
    public IkInkassoBemuehungCode?: number;

    public IkVerjaehrungAm?: Date;
    public IkLeistungStatusCode: number;
    public IkDatumForderungstitel?: Date;
    public IkRueckerstattungTypCode?: number;
    public IkForderungTitelCode?: number;
    public IkErreichungsGradCode?: number;
    public OldUnitID?: number;
    public VmAuftragCode?: number;
    public KaProzessCode?: number;
    public KaEpqJob?: boolean;
    public Bezeichnung: string;
    public MigrationKA?: number;
    public PscdVertragsgegenstandID?: number;
    public MigBemerkung: string;
    public MigHerkunftCode?: number;
    public MigAlteFallNr?: number;
    public VUFaFallID?: number;
    public visdat36Area: string;
    public visdat36FALLID: string;
    public visdat36LEISTUNGID: string;
    public WiederholteSpezifischeErmittlungEAF: boolean;
    public Creator: string;
    public Created: Date;
    public Modifier: string;
    public Modified: Date;
    public FaLeistungTS: any[];
    public SAR: string;
    public faLeistungArchivID?: number;
    public GemeindeText: string;
    public FaKontaktveranlasserText: string;
    public AbsschlussGrundText: string;
    public FaAufnahmeartText: string;
    constructor(data?: IModelGetFaLeistung) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model Query Get FallRight
export interface IModelFallRights {
    mayRead: boolean;
    mayInsert: boolean;
    mayUpdate: boolean;
    mayDelete: boolean;
    closed?: boolean;
    archived?: boolean;
    mayClose?: boolean;
    mayReopen?: boolean;

}

export class ModelFallRights implements IModelFallRights {
    public mayRead: boolean;
    public mayInsert: boolean;
    public mayUpdate: boolean;
    public mayDelete: boolean;
    public closed?: boolean;
    public archived?: boolean;
    public mayClose?: boolean;
    public mayReopen?: boolean;
    constructor(data?: IModelFallRights) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model Get Data Combobox
export interface IModelGetDataCombobox {
    code: number;
    text?: string;
    shortText?: string;
    value1?: string;
    value2?: string;
    value3?: string;
    sortKey: number;
    isActive: boolean;
}

export class ModelGetDataCombobox implements IModelGetDataCombobox {
    public code: number;
    public text: string;
    public shortText: string;
    public value1: string;
    public value2: string;
    public value3: string;
    public sortKey: number;
    public isActive: boolean;
    constructor(data?: IModelGetDataCombobox) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model Query Update Faleistung
export interface IModelQueryUpdateFaleistung {
    isDatumVonModified: boolean;
    baPersonID: number;
    datumVon: any;
    faLeistungID: number;
    datumBis?: any;
    gemeindeCode?: number;
    abschlussGrundCode?: number;
    bemerkung: string;
    faAufnahmeartCode?: number;
    faKontaktveranlasserCode?: number;
    modulID: number;
    faLeistungTS: any[];

}

export class ModelQueryUpdateFaleistung implements IModelQueryUpdateFaleistung {
    public isDatumVonModified: boolean;
    public baPersonID: number;
    public datumVon: any;
    public faLeistungID: number;
    public datumBis?: any;
    public gemeindeCode?: number;
    public abschlussGrundCode?: number;
    public bemerkung: string;
    public faAufnahmeartCode?: number;
    public faKontaktveranlasserCode?: number;
    public modulID: number;
    public faLeistungTS: any[];
    constructor(data?: IModelQueryUpdateFaleistung) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model query for Combobox
export interface IModelQueryGetLOVName {

    lOVName: string;
    languageCode: number;
}

export class ModelQueryGetLOVName implements IModelQueryGetLOVName {
    public lOVName: string;
    public languageCode: number;
    constructor(data?: IModelQueryGetLOVName) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Model query for Validation FaLeistung
export interface IModelQueryValidationFaLeistung {
    isDatumVonModified: boolean;
    datumVon?: any;
    datumBis?: any;
    baPersonID: number;
    notFaLeistungID: number;
}

export class ModelQueryValidationFaLeistung implements IModelQueryValidationFaLeistung {
    public isDatumVonModified: boolean;
    public datumVon?: any;
    public datumBis?: any;
    public baPersonID: number;
    public notFaLeistungID: number;
    constructor(data?: IModelQueryValidationFaLeistung) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IGetCountFaPhaseModel {
    countBeratung: any;
    countIntake: any;
    countOpenBeratung: any;
    countOpenIntake: any;
}

export class GetCountFaPhaseModel implements IGetCountFaPhaseModel {
    public countBeratung: any;
    public countIntake: any;
    public countOpenBeratung: any;
    public countOpenIntake: any;
    constructor(data?: IGetCountFaPhaseModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
