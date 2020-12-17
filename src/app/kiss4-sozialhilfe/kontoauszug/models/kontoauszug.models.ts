// search models
export class IPersonnen {
    Code: number;
    Text: string;
}
export class Personnen implements IPersonnen {
    public Code: number;
    public Text: string;
    constructor(data?: IPersonnen) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export class IZeitraum {
    code: number;
    text: string;
}
export class Zeitraum implements IZeitraum {
    public code: number;
    public text: string;
    constructor(data?: IZeitraum) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export class IKostenart {
    ID: number;
    KontoNr: string;
    Name: string;
}
export class Kostenart implements IKostenart {
    public ID: number;
    public KontoNr: string;
    public Name: string;
    constructor(data?: IKostenart) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IKontoauszugQueryModel {
    Bapersonid: number;
    PersonnenIds: number[];
    ZetraumCode: number;
    Datumvon: any;
    Datumbis: any;
    LaListCodes: number[];
    Verdichtet: boolean;
    BetraegeAnpassen: boolean;
    SaldovortragKiss: boolean;
    SaldovortragFremdsystem: boolean;
}
export class KontoauszugQueryModel implements IKontoauszugQueryModel {
    public Bapersonid: number;
    public PersonnenIds: number[];
    public ZetraumCode: number;
    public Datumvon: any;
    public Datumbis: any;
    public LaListCodes: number[];
    public Verdichtet: boolean;
    public BetraegeAnpassen: boolean;
    public SaldovortragKiss: boolean;
    public SaldovortragFremdsystem: boolean;
    constructor(data?: IKontoauszugQueryModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IKontoauszug {
    ID: number;
    OrgName: string;
    OrgAdresse: string;
    OrgPLZOrt: string;
    NeueSeite: boolean;
    DruckDatum: string;
    Auswertungszeitraum: string;
    KbBuchungID: number;
    BelegDatum: Date;
    ValutaDatum: Date;
    BaPersonID: number;
    Klient: string;
    BelegNr: string;
    LA: string;
    LAText: string;
    Buchungstext: string;
    VerwPeriodeVon: Date;
    VerwPeriodeBis: Date;
    BgSplittingArtCode: number;
    Betrag: number;
    BetragSaldo: number;
    Betrag100: number;
    EA: string;
    KbBuchungStatusCode: number;
    Doc: any;
    Auszahlart: any;
    KreditorDebitor: any;
    Einnahme: any;
    Ausgabe: number;
    Saldo: number;
}
export class Kontoauszug implements IKontoauszug {
    public ID: number;
    public OrgName: string;
    public OrgAdresse: string;
    public OrgPLZOrt: string;
    public NeueSeite: boolean;
    public DruckDatum: string;
    public Auswertungszeitraum: string;
    public KbBuchungID: number;
    public BelegDatum: Date;
    public ValutaDatum: Date;
    public BaPersonID: number;
    public Klient: string;
    public BelegNr: string;
    public LA: string;
    public LAText: string;
    public Buchungstext: string;
    public VerwPeriodeVon: Date;
    public VerwPeriodeBis: Date;
    public BgSplittingArtCode: number;
    public Betrag: number;
    public BetragSaldo: number;
    public Betrag100: number;
    public EA: string;
    public KbBuchungStatusCode: number;
    public Doc: any;
    public Auszahlart: any;
    public KreditorDebitor: any;
    public Einnahme: any;
    public Ausgabe: number;
    public Saldo: number;
    constructor(data?: IKontoauszug) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
