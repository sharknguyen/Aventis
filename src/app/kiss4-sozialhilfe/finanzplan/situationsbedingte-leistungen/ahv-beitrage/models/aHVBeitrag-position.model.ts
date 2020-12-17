export interface IAHVBeitragPosition {
  bgPositionID: number;
  anpassenVon?: any;
  bgPositionID_Parent?: number;
  bgPositionID_CopyOf?: number;
  bgBudgetID: number;
  baPersonID?: number;
  baPersonIDNew?: number;
  bgPositionsartID?: number;
  bgPositionsartTitle?: string;
  bgSpezkontoID?: number;
  baInstitutionID?: number;
  erstelltUserID?: number;
  mutiertUserID?: number;
  bgPositionID_AutoForderung?: number;
  bgKategorieCode: number;
  shBelegID?: number;
  betrag: any;
  text: string;
  textStatus: string;
  betragFormat: any;
  reduktion: any;
  abzug: any;
  betragEff?: any;
  maxBeitragSD: any;
  buchungstext: string;
  verwaltungSD: boolean;
  bemerkung: string;
  datumVon?: any;
  datumBis?: any;
  oldID?: number;
  verwPeriodeVon?: any;
  verwPeriodeBis?: any;
  faelligAm?: any;
  rechnungDatum?: any;
  bgBewilligungStatusCode: number;
  value1?: any;
  value2?: any;
  value3?: any;
  betragAnfrage?: number;
  bgAuszahlungID?: number;
  datumEff?: number;
  bemerkungSaldierung: string;
  saldiert: boolean;
  erstelltDatum?: any;
  mutiertDatum?: any;
  bgPositionTS: any;
  betragGBLAufAusgabekonto?: number;
  geburtsdatum?: any;
  nameVorname: string;
  institutionName: string;
  anpassung: boolean;
}

export class AHVBeitragPosition implements IAHVBeitragPosition {
  public bgPositionID: number;
  public anpassenVon?: any;
  public bgPositionID_Parent?: number;
  public bgPositionID_CopyOf?: number;
  public bgBudgetID: number;
  public baPersonID?: number;
  public baPersonIDNew?: number;
  public bgPositionsartID?: number;
  public bgPositionsartTitle?: string;
  public bgSpezkontoID?: number;
  public baInstitutionID?: number;
  public erstelltUserID?: number;
  public mutiertUserID?: number;
  public bgPositionID_AutoForderung?: number;
  public bgKategorieCode: number;
  public shBelegID?: number;
  public betrag: any;
  public text: string;
  public textStatus: string;
  public betragFormat: any;
  public reduktion: number;
  public abzug: number;
  public betragEff?: number;
  public maxBeitragSD: number;
  public buchungstext: string;
  public verwaltungSD: boolean;
  public bemerkung: string;
  public datumVon?: any;
  public datumBis?: any;
  public oldID?: number;
  public verwPeriodeVon?: any;
  public verwPeriodeBis?: any;
  public faelligAm?: any;
  public rechnungDatum?: any;
  public bgBewilligungStatusCode: number;
  public value1?: any;
  public value2?: any;
  public value3?: any;
  public betragAnfrage?: number;
  public bgAuszahlungID?: number;
  public datumEff?: number;
  public bemerkungSaldierung: string;
  public saldiert: boolean;
  public erstelltDatum?: any;
  public mutiertDatum?: any;
  public bgPositionTS: any;
  public betragGBLAufAusgabekonto?: number;
  public geburtsdatum?: any;
  public nameVorname: string;
  public institutionName: string;
  public anpassung: boolean;

  constructor(data?: IAHVBeitragPosition) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
      this.baPersonIDNew = data.baPersonID;
    }
  }
}
