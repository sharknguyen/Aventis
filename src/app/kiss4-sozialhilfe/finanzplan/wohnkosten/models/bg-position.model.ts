export interface IBgPosition {
  SortId: number;
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
  VerwaltungSD: string;
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
  BemerkungSaldierung: string;
  Saldiert: string;
  ErstelltDatum: Date;
  MutiertDatum: Date;
  BgPositionTS: string;
  BetragGBLAufAusgabekonto: number;
  Wohnsituation: number;
  Berechnungsgrundlage: number;
  Beitrag: number;
  NKBetrag: number;
  NKMaxBeitragSD: number;
  Total: number;
  Anpassung: number;
  WohnkostenHg: number;
  Angerechnet: number;
  Unterdeckung: number;
}
export class BgPosition implements IBgPosition {
  SortId: number;
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
  VerwaltungSD: string;
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
  BemerkungSaldierung: string;
  Saldiert: string;
  ErstelltDatum: Date;
  MutiertDatum: Date;
  BgPositionTS: string;
  BetragGBLAufAusgabekonto: number;
  Wohnsituation: number;
  Berechnungsgrundlage: number;
  Beitrag: number;
  NKBetrag: number;
  NKMaxBeitragSD: number;
  Total: number;
  Anpassung: number;
  WohnkostenHg: number;
  Angerechnet: number;
  Unterdeckung: number;
  constructor(data?: IBgPosition) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
