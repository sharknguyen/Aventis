/**
 * Model BgPosition data grid
 */
export interface IBgPosition {
    BgPositionID: number;
    BgPositionID_Parent: number;
    BgPositionID_CopyOf: number;
    BgBudgetID: number;
    BaPersonID: number;
    BgPositionsartID: number;
    BgSpezkontoID: number;
    BaInstitutionID: number;
    DebitorBaPersonID: number;
    ErstelltUserID: number;
    MutiertUserID: number;
    BgPositionID_AutoForderung: number;
    BgKategorieCode: number;
    ShBelegID: number;
    Betrag: number;
    Reduktion: number;
    Abzug: number;
    BetragEff: number;
    MaxBeitragSD: number;
    Buchungstext: string;
    VerwaltungSD: boolean;
    Bemerkung: string;
    DatumVon: Date;
    DatumBis: Date;
    OldID: number;
    VerwPeriodeVon: Date;
    VerwPeriodeBis: Date;
    FaelligAm: Date;
    RechnungDatum: Date;
    BgBewilligungStatusCode: number;
    Value1: string;
    Value2: string;
    Value3: string;
    BetragAnfrage: number;
    BgAuszahlungID: number;
    DatumEff: Date;
    DemerkungSaldierung: string;
    Saldiert: boolean;
    ErstelltDatum: Date;
    MutiertDatum: Date;
    BgPositionTS: string;
    BetragGBLAufAusgabekonto: number;
    namevorname: string;
    geburtsdatum: string;
    Verbrauch: number;
}

export class BgPosition implements IBgPosition {
    public BgPositionID: number;
    public BgPositionID_Parent: number;
    public BgPositionID_CopyOf: number;
    public BgBudgetID: number;
    public BaPersonID: number;
    public BgPositionsartID: number;
    public BgSpezkontoID: number;
    public BaInstitutionID: number;
    public DebitorBaPersonID: number;
    public ErstelltUserID: number;
    public MutiertUserID: number;
    public BgPositionID_AutoForderung: number;
    public BgKategorieCode: number;
    public ShBelegID: number;
    public Betrag: number;
    public Reduktion: number;
    public Abzug: number;
    public BetragEff: number;
    public MaxBeitragSD: number;
    public Buchungstext: string;
    public VerwaltungSD: boolean;
    public Bemerkung: string;
    public DatumVon: Date;
    public DatumBis: Date;
    public OldID: number;
    public VerwPeriodeVon: Date;
    public VerwPeriodeBis: Date;
    public FaelligAm: Date;
    public RechnungDatum: Date;
    public BgBewilligungStatusCode: number;
    public Value1: string;
    public Value2: string;
    public Value3: string;
    public BetragAnfrage: number;
    public BgAuszahlungID: number;
    public DatumEff: Date;
    public DemerkungSaldierung: string;
    public Saldiert: boolean;
    public ErstelltDatum: Date;
    public MutiertDatum: Date;
    public BgPositionTS: string;
    public BetragGBLAufAusgabekonto: number;
    public namevorname: string;
    public geburtsdatum: string;
    public Verbrauch: number;

    constructor(data?: IBgPosition[]) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}


/**
 * Model Finanzplan
 */
export interface IBgFinanzplan {
    BgFinanzplanID: number;
    FinanzplanVon: Date;
    FinanzplanBis: Date;
    AnzahlUnterstuetztErwachsen: number;
    AnzahlUnterstuetztKind: number;
}

export class BgFinanzplan implements IBgFinanzplan {
    public BgFinanzplanID: number;
    public FinanzplanVon: Date;
    public FinanzplanBis: Date;
    public AnzahlUnterstuetztErwachsen: number;
    public AnzahlUnterstuetztKind: number;

    constructor(data?: IBgFinanzplan[]) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

/**
 * Model Personen select box
 */
export interface IPersonen {
    BaPersonID: number;
    NameVorname: string;
    Name: string;
    Vorname: string;
    LT: number;
}

export class Personen implements IPersonen {
    public BaPersonID: number;
    public NameVorname: string;
    public Name: string;
    public Vorname: string;
    public LT: number;

    constructor(data?: IPersonen[]) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

/**
 * Model Art des Vermoge select box
 */
export interface IWhPositionsart {
    BgPositionsartID: number;
    Name: string;
    Code: number;
    Text: string;
}

export class WhPositionsart implements IWhPositionsart {
    public BgPositionsartID: number;
    public Name: string;
    public Code: number;
    public Text: string;

    constructor(data?: IWhPositionsart[]) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

/**
 * Model Status Code
 */
export interface IBgSilAHVBeitrag {
    faFallID: number;
    faLeistungID: number;
    bgFinanzplanID: number;
    bgBewilligungStatusCode: number;
    finanzplanVon: any;
    finanzplanBis: any;
    anpassenVon: any;
    anpassenBis: any;
  }


  export class BgSilAHVBeitrag implements IBgSilAHVBeitrag {
    public faFallID: number;
    public faLeistungID: number;
    public bgFinanzplanID: number;
    public bgBewilligungStatusCode: number;
    public finanzplanVon: any;
    public finanzplanBis: any;
    public anpassenVon: any;
    public anpassenBis: any;

    constructor(data?: IBgSilAHVBeitrag) {
      if (data) {
        for (const property in data) {
          if (data.hasOwnProperty(property)) {
            (<any>this)[property] = (<any>data)[property];
          }
        }
      }
    }
  }
