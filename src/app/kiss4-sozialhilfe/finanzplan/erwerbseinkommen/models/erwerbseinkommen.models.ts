export interface IErwerbseinkommen {
    Id: number;
    Gultigab: string;
    Name: string;
    Geburtsdatum: Date;
    ArtDesEinkommens: string;
    Einkommen: number;
    Unkosten: number;
    Reduktion: number;
    Beschreigung: string;
}

export interface BgErwerbseinkommen {
    BgPositionID: number;
    BgPositionID_Parent?: number;
    BgPositionID_CopyOf?: number;
    BgBudgetID: number;
    BaPersonID?: number;
    BgPositionsartID?: number;
    BgSpezkontoID?: number;
    BaInstitutionID?: number;
    DebitorBaPersonID?: number;
    ErstelltUserID?: number;
    MutiertUserID?: number;
    BgPositionID_AutoForderung?: number;
    BgKategorieCode: number;
    ShBelegID?: number;
    Betrag: number;
    Reduktion: number;
    Abzug: number;
    BetragEff?: number;
    MaxBeitragSD: number;
    Buchungstext: string;
    VerwaltungSD: string;
    Bemerkung: string;
    DatumVon: Date;
    DatumBis: Date;
    OldID?: number;
    VerwPeriodeVon: Date;
    VerwPeriodeBis: Date;
    FaelligAm: Date;
    RechnungDatum: Date;
    BgBewilligungStatusCode: number;
    Value1: string;
    Value2: string;
    Value3: string;
    BetragAnfrage?: number;
    BgAuszahlungID?: number;
    DatumEff: Date;
    BemerkungSaldierung: string;
    Saldiert: string;
    ErstelltDatum: Date;
    MutiertDatum: Date;
    BgPositionTS: string;
    BetragGBLAufAusgabekonto?: number;
    NameVorname: string;
    Geburtsdatum: Date;
    UKBetrag?: number;
    UKReduktion?: number;
    UKAngerechnet?: number;
    Total?: number;
}

export interface BgBewilligungStatusCode {
    BgBewilligungStatusCode: number;
}

export class BgBewilligungStatusCodes implements BgBewilligungStatusCode {
    public BgBewilligungStatusCode: number;
    constructor(data: BgBewilligungStatusCode) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export class BgErwerbseinkommens implements BgErwerbseinkommen {
    public BgPositionID: number;
    public BgPositionID_Parent?: number;
    public BgPositionID_CopyOf?: number;
    public BgBudgetID: number;
    public BaPersonID?: number;
    public BgPositionsartID?: number;
    public BgSpezkontoID?: number;
    public BaInstitutionID?: number;
    public DebitorBaPersonID?: number;
    public ErstelltUserID?: number;
    public MutiertUserID?: number;
    public BgPositionID_AutoForderung?: number;
    public BgKategorieCode: number;
    public ShBelegID?: number;
    public Betrag: number;
    public Reduktion: number;
    public Abzug: number;
    public BetragEff?: number;
    public MaxBeitragSD: number;
    public Buchungstext: string;
    public VerwaltungSD: string;
    public Bemerkung: string;
    public DatumVon: Date;
    public DatumBis: Date;
    public OldID?: number;
    public VerwPeriodeVon: Date;
    public VerwPeriodeBis: Date;
    public FaelligAm: Date;
    public RechnungDatum: Date;
    public BgBewilligungStatusCode: number;
    public Value1: string;
    public Value2: string;
    public Value3: string;
    public BetragAnfrage?: number;
    public BgAuszahlungID?: number;
    public DatumEff: Date;
    public BemerkungSaldierung: string;
    public Saldiert: string;
    public ErstelltDatum: Date;
    public MutiertDatum: Date;
    public BgPositionTS: string;
    public BetragGBLAufAusgabekonto?: number;
    public NameVorname: string;
    public Geburtsdatum: Date;
    public UKBetrag?: number;
    public UKReduktion?: number;
    public UKAngerechnet?: number;
    public Total?: number;
    constructor(data?: IErwerbseinkommen) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export class Erwerbseinkommen implements IErwerbseinkommen {
    public Id: number;
    public Gultigab: string;
    public Name: string;
    public Geburtsdatum: Date;
    public ArtDesEinkommens: string;
    public Einkommen: number;
    public Unkosten: number;
    public Reduktion: number;
    public Beschreigung: string;
    constructor(data?: IErwerbseinkommen) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
