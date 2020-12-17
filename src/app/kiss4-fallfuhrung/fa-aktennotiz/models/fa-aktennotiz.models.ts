
// Using for search gridview
export interface IFaAktennotizQueryModel {
    faLeistungID: number;
    isDeleted1: boolean;
    isDeleted2: boolean;
    themen: string;
    alleThemen: boolean;
    datumVon?: any;
    datumBis?: any;
    stichwort?: string;
    sucheSar?: number;
    kontaktart?: number;
    inhalt: string;
}
export class FaAktennotizQueryModel implements IFaAktennotizQueryModel {
    public faLeistungID: number;
    public isDeleted1: boolean;
    public isDeleted2: boolean;
    public themen: string;
    public alleThemen: boolean;
    public datumVon?: any;
    public datumBis?: any;
    public stichwort?: string;
    public sucheSar?: number;
    public kontaktart?: number;
    public inhalt: string;
    constructor(data?: IFaAktennotizQueryModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IFaAktennotiz {
    index: number;
    User: string;
    FaAktennotizID: number;
    FaLeistungID: number;
    UserID?: number;
    Datum?: Date;
    Zeit?: Date;
    FaDauerCode?: number;
    FaGespraechsStatusCode?: number;
    FaThemaCodes: string;
    FaThemaCodesText: string;
    Themen: string;
    FaGespraechstypCode?: number;
    Kontaktpartner: string;
    AlimentenstelleTypCode?: number;
    BaPersonIDs: string;
    Stichwort: string;
    InhaltRTF: string;
    Vertraulich: boolean;
    BesprechungThema1: boolean;
    BesprechungThema2: boolean;
    BesprechungThema3: boolean;
    BesprechungThema4: boolean;
    BesprechungThemaText1: string;
    BesprechungThemaText2: string;
    BesprechungThemaText3: string;
    BesprechungThemaText4: string;
    BesprechungZiel1: string;
    BesprechungZiel2: string;
    BesprechungZiel3: string;
    BesprechungZiel4: string;
    BesprechungZielGrad1?: number;
    BesprechungZielGrad2?: number;
    BesprechungZielGrad3?: number;
    BesprechungZielGrad4: number;
    FaKontaktartCode?: number;
    Pendenz1: string;
    Pendenz2: string;
    Pendenz3: string;
    Pendenz4: string;
    PendenzErledigt1?: boolean;
    PendenzErledigt2?: boolean;
    PendenzErledigt3?: boolean;
    PendenzErledigt4?: boolean;
    IsDeleted: boolean;
    Creator: string;
    Created: Date;
    Modifier: string;
    Modified: Date;
    FaAktennotizTS: any[];
}
export class FaAktennotiz implements IFaAktennotiz {
    public index: number;
    public User: string;
    public FaAktennotizID: number;
    public FaLeistungID: number;
    public UserID?: number;
    public Datum?: Date;
    public Zeit?: Date;
    public FaDauerCode?: number;
    public FaGespraechsStatusCode?: number;
    public FaThemaCodes: string;
    public FaThemaCodesText: string;
    public Themen: string;
    public FaGespraechstypCode?: number;
    public Kontaktpartner: string;
    public AlimentenstelleTypCode?: number;
    public BaPersonIDs: string;
    public Stichwort: string;
    public InhaltRTF: string;
    public Vertraulich: boolean;
    public BesprechungThema1: boolean;
    public BesprechungThema2: boolean;
    public BesprechungThema3: boolean;
    public BesprechungThema4: boolean;
    public BesprechungThemaText1: string;
    public BesprechungThemaText2: string;
    public BesprechungThemaText3: string;
    public BesprechungThemaText4: string;
    public BesprechungZiel1: string;
    public BesprechungZiel2: string;
    public BesprechungZiel3: string;
    public BesprechungZiel4: string;
    public BesprechungZielGrad1?: number;
    public BesprechungZielGrad2?: number;
    public BesprechungZielGrad3?: number;
    public BesprechungZielGrad4: number;
    public FaKontaktartCode?: number;
    public Pendenz1: string;
    public Pendenz2: string;
    public Pendenz3: string;
    public Pendenz4: string;
    public PendenzErledigt1?: boolean;
    public PendenzErledigt2?: boolean;
    public PendenzErledigt3?: boolean;
    public PendenzErledigt4?: boolean;
    public IsDeleted: boolean;
    public Creator: string;
    public Created: Date;
    public Modifier: string;
    public Modified: Date;
    public FaAktennotizTS: any[];
    constructor(data?: IFaAktennotiz) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IFaAktennotizModel {
    FaLeistungId: number;
    Datum: Date;
    FaDauerCode: any;
    FaThemaCodes: string;
    Kontaktpartner: string;
    Stichwort: string;
    FaKontaktartCode: number;
    IsDeleted: boolean;
}
export class FaAktennotizDetailModel implements IFaAktennotizModel {
    public FaLeistungId: number;
    public FaAktennotizId: number;
    public FaAktennotizTs: any[];
    public UserId: number;
    public Datum: Date;
    public FaDauerCode: any;
    public FaDauerText: string;
    public FaThemaCodes: string;
    public FaThemaCodesText: string;
    public Kontaktpartner: string;
    public Stichwort: string;
    public InhaltRtf: string;
    public FaKontaktartCode: number;
    public FaKontaktartText: number;
    public AutorText: number;
    public IsDeleted: boolean;
    public Creator: string;
    public Created: Date;
    public Modifier: string;
    public Modified: Date;
    constructor(data?: IFaAktennotizQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export class FaAktennotizInsertUpdateModel implements IFaAktennotizModel {
    public FaAktennotizId: number;
    public FaLeistungId: number;
    public UserId: number;
    public Datum: any;
    public Zeit: Date;
    public FaDauerCode: any;
    public FaThemaCodes: string;
    public Kontaktpartner: string;
    public Stichwort: string;
    public InhaltRtf: string;
    public FaKontaktartCode: number;
    public IsDeleted: boolean;
    public FaAktennotizTs: any;
    constructor(data?: IFaAktennotizModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// Using for search region
export interface IFaAktennotizQuery {
    itemType: string;
}
export class FaAktennotizQuery implements IFaAktennotizQuery {
    itemType: string;
    constructor(data?: IFaAktennotizQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IMitarbeiter {
    index: number;
    displayText: string;
    logonName: string;
    name: string;
    userID: number;
}
export class Mitarbeiter implements IMitarbeiter {
    public index: number;
    public displayText: string;
    public logonName: string;
    public name: string;
    public userID: number;
    constructor(data?: IMitarbeiter) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IRadioModel {
    Name: string;
    DisplayName: string;
}
export class RadioModel implements IRadioModel {
    public Name: string;
    public DisplayName: string;
    constructor(data?: IFaAktennotizQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

// If the function have left menu
interface ITreeNavigator {
    id: number;
    caption: string;
    expanded?: boolean;
    enabled: boolean;
    name: string;
    tag: string;
    count?: number;
    parentId?: number;
    selected?: boolean;
}

export class TreeNav implements ITreeNavigator {
    id: number;
    caption: string;
    expanded?: boolean;
    enabled: boolean;
    name: string;
    tag: string;
    count?: number;
    parentId?: number;
    selected?: boolean;

    constructor(data?: ITreeNavigator) {
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

