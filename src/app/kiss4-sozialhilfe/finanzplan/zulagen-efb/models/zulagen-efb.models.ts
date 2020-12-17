export interface IZulageSelectBoxData {
  zulageCode: number;
  zulageText: string;
}

export class ZulageSelectBoxData implements IZulageSelectBoxData {
  zulageCode: number;
  zulageText: string;

  constructor(data?: IResult) {
    this.zulageCode = data.Code;
    this.zulageText = data.Text;
  }
}

export interface IAnteilSelectBoxData {
  anteilCode: number;
  anteilText: string;
}


// model for title
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

// Model Get Data Combobox Zulagen
interface IInitDataCombox {
  lovName: string;
}

export class InitDataCombox implements IInitDataCombox {
  public lovName: string;

  constructor(data?: IInitDataCombox) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

interface IResult {
  Code: number;
  Text: string;
  ShortText: string;
  Value1: string;
  Value2: string;
  Value3: string;
  SortKey: number;
  IsActive: boolean;
}


export class ResultValue implements IResult {
  Code: number;
  Text: string;
  ShortText: string;
  Value1: string;
  Value2: string;
  Value3: string;
  SortKey: number;
  IsActive: boolean;

  constructor(data?: IResult[]) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

export interface IBgPosition {
  bgPositionID: number;
  bgPositionID_Parent: number;
  bgPositionID_CopyOf: number;
  bgBudgetID: number;
  baPersonID: number;
  bgPositionsartID: number;
  bgSpezkontoID: number;
  baInstitutionID: number;
  debitorBaPersonID: number;
  erstelltUserID: number;
  mutiertUserID: number;
  bgPositionID_AutoForderung: number;
  bgKategorieCode: number;
  shBelegID: number;
  betrag: number;
  reduktion: number;
  abzug: number;
  betragEff: number;
  baxBeitragSD: number;
  buchungstext: string;
  verwaltungSD: boolean;
  bemerkung: string;
  datumVon: Date;
  datumBis: Date;
  oldID: number;
  verwPeriodeVon: Date;
  verwPeriodeBis: Date;
  faelligAm: Date;
  rechnungDatum: Date;
  bgBewilligungStatusCode: number;
  value1: string;
  value2: string;
  value3: string;
  betragAnfrage: number;
  bgAuszahlungID: number;
  datumEff: Date;
  bemerkungSaldierung: string;
  saldiert: boolean;
  erstelltDatum: Date;
  mutiertDatum: Date;
  bgPositionTS: string;
  betragGBLAufAusgabekonto: number;
  betragSum: number;
  bgGruppeCode: number;
  alleinerziehend: boolean;
  anteil: number;
  baPersonID_NEW: number;
  geburtsdatum: Date;
  nameVorname: string;
  zulageText: string;
  anteilText: string;
  anteilMode: boolean;
}

export class BgPosition implements IBgPosition {
  bgPositionID: number;
  bgPositionID_Parent: number;
  bgPositionID_CopyOf: number;
  bgBudgetID: number;
  baPersonID: number;
  bgPositionsartID: number;
  bgSpezkontoID: number;
  baInstitutionID: number;
  debitorBaPersonID: number;
  erstelltUserID: number;
  mutiertUserID: number;
  bgPositionID_AutoForderung: number;
  bgKategorieCode: number;
  shBelegID: number;
  betrag: number;
  reduktion: number;
  abzug: number;
  betragEff: number;
  baxBeitragSD: number;
  buchungstext: string;
  verwaltungSD: boolean;
  bemerkung: string;
  datumVon: Date;
  datumBis: Date;
  oldID: number;
  verwPeriodeVon: Date;
  verwPeriodeBis: Date;
  faelligAm: Date;
  rechnungDatum: Date;
  bgBewilligungStatusCode: number;
  value1: string;
  value2: string;
  value3: string;
  betragAnfrage: number;
  bgAuszahlungID: number;
  datumEff: Date;
  bemerkungSaldierung: string;
  saldiert: boolean;
  erstelltDatum: Date;
  mutiertDatum: Date;
  bgPositionTS: string;
  betragGBLAufAusgabekonto: number;
  betragSum: number;
  bgGruppeCode: number;
  alleinerziehend: boolean;
  anteil: number;
  baPersonID_NEW: number;
  geburtsdatum: Date;
  nameVorname: string;
  zulageText: string;
  anteilText: string;
  anteilMode: boolean;
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

interface IRichtLinie {
  pr_min: number;
  pr_max: number;
  pr_def: number;
}

export class RichtLinie implements IRichtLinie {
  pr_min: number;
  pr_max: number;
  pr_def: number;

  constructor(data?: IRichtLinie[]) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

export interface IPositionsart {
  xlovCodeID: number;
  xlovID: number;
  lovName: string;
  code: number;
  text: string;
  textTID?: number;
  sortKey?: number;
  shortText: string;
  shortTextTID?: number;
  bfsCode?: number;
  value1: string;
  value1TID?: number;
  value2: string;
  value2TID?: number;
  value3: string;
  value3TID?: number;
  description: string;
  lovCodeName: string;
  isActive: boolean;
  system: boolean;
  xlovCodeTS: any;
}

export class Positionsart implements IPositionsart {
  xlovCodeID: number;
  xlovID: number;
  lovName: string;
  code: number;
  text: string;
  textTID?: number;
  sortKey?: number;
  shortText: string;
  shortTextTID?: number;
  bfsCode?: number;
  value1: string;
  value1TID?: number;
  value2: string;
  value2TID?: number;
  value3: string;
  value3TID?: number;
  description: string;
  lovCodeName: string;
  isActive: boolean;
  system: boolean;
  xlovCodeTS: any;

  constructor(data?: IPositionsart[]) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}

export interface IBgPositionData {
  buchungstext: string;
  anpassenVon?: Date;
  bgPositionID?: number;
  bgBudgetID?: number;
  baPersonID?: number;
  bgPositionsartID?: number;
  betrag: number;
  datumVon?: Date;
  datumBis?: Date;
  bemerkung: string;
  baInstitutionID?: number;
  bgPositionTS: any;
  bAnpassen?: boolean;
  bgPositionsartTitle: string;
  finanzplanVon?: Date;
  finanzplanBis?: Date;
  bgPositionID_CopyOf?: number;
  bgBewilligungStatusCode?: number;
  bgFinanzplanID?: number;
  bgKategorieCode?: number;
  anteil?: number;
  bgGruppeCode?: number;
}
export class BgPositionData implements IBgPositionData {
  buchungstext: string;
  anpassenVon?: Date;
  bgPositionID?: number;
  bgBudgetID?: number;
  baPersonID?: number;
  bgPositionsartID?: number;
  betrag: number;
  datumVon?: Date;
  datumBis?: Date;
  bemerkung: string;
  baInstitutionID?: number;
  bgPositionTS: any;
  bAnpassen?: boolean;
  bgPositionsartTitle: string;
  finanzplanVon?: Date;
  finanzplanBis?: Date;
  bgPositionID_CopyOf?: number;
  bgBewilligungStatusCode?: number;
  bgFinanzplanID?: number;
  bgKategorieCode?: number;
  anteil?: number;
  bgGruppeCode?: number;
  constructor(data?: IBgPositionData[]) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
      /*anpassenVon = data.
      bAnpassen
      bgPositionsartTitle
      finanzplanVon
      finanzplanBis
      bgFinanzplanID*/
    }
  }
}
