

// Using for search gridview
export interface ISearchQuery {
    baPersonId: number;
    datumVon: any;
    datumBis: any;
    nichtAusbezahlt: boolean;
    ausbezahlt: boolean;
    gesperrt: boolean;
}
export class SearchQuery implements ISearchQuery {
    public baPersonId: number;
    public datumVon: any;
    public datumBis: any;
    public nichtAusbezahlt: boolean;
    public ausbezahlt: boolean;
    public gesperrt: boolean;
    constructor(data?: ISearchQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IKbBuchung {
    Index: number;
    KbBuchungID: number;
    BelegNr: number;
    Person: string;
    Verfalldatum: Date;
    Text: string;
    BetragGrid: number;
    BarbelegDatum: Date;
    KbBuchungStatusCode: number;
    Remark: string;
    KbBuchungTS: any;
    Strasse: string;
    PLZOrt: Date;
    Geburtsdatum: string;
    AHVNummer: string;
    Versichertennummer: string;
    ValutaDatum: Date;
    KasseUser: string;
    SAR: string;
    BeguenstigtName: string;
    BeguenstigtStrasse: string;
    BeguenstigtOrt: string;
    StatusText: string;
}
export class KbBuchung implements IKbBuchung {
    public Index: number;
    public KbBuchungID: number;
    public BelegNr: number;
    public Person: string;
    public Verfalldatum: Date;
    public Text: string;
    public BetragGrid: number;
    public BarbelegDatum: Date;
    public KbBuchungStatusCode: number;
    public Remark: string;
    public KbBuchungTS: any;
    public Strasse: string;
    public PLZOrt: Date;
    public Geburtsdatum: string;
    public AHVNummer: string;
    public Versichertennummer: string;
    public ValutaDatum: Date;
    public KasseUser: string;
    public SAR: string;
    public BeguenstigtName: string;
    public BeguenstigtStrasse: string;
    public BeguenstigtOrt: string;
    public StatusText: string;
    constructor(data?: IKbBuchung) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IKbBuchungsStatus {
    Code: number;
    IsActive: boolean;
    ShortText: any;
    SortKey: number;
    Text: string;
    Value1: string;
    Value2: any;
    Value3: any;
}
export class KbBuchungsStatus implements IKbBuchungsStatus {
    public Code: number;
    public IsActive: boolean;
    public ShortText: any;
    public SortKey: number;
    public Text: string;
    public Value1: string;
    public Value2: any;
    public Value3: any;
    constructor(data?: IKbBuchungsStatus) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IShUnterstuetztePerson {
    BaPersonID: number;
    FT: boolean;
    Name: string;
    PLZOrt: string;
    Strasse: string;
}
export class ShUnterstuetztePerson implements IShUnterstuetztePerson {
    public BaPersonID: number;
    public FT: boolean;
    public Name: string;
    public PLZOrt: string;
    public Strasse: string;
    constructor(data?: IShUnterstuetztePerson) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IKbBuchungUpdateModel {
    KbBuchungId: number;
    Remark: string;
    KbBuchungTs: any;
}
export class KbBuchungUpdateModel implements IKbBuchungUpdateModel {
    public KbBuchungId: number;
    public Remark: string;
    public KbBuchungTs: any;
    constructor(data?: IKbBuchungUpdateModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}



