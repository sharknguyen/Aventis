// Query for API get Haushalt
export interface IHaushalt {
  bgFinanzplanID: number;
  baPersonID: number;
  istUnterstuetzt: boolean;
  baZahlungswegID?: number;
  referenzNummer: string;
  kbKostenstelleID?: number;
  kbKostenstelleID_KVG?: number;
  shNrmVerrechnungsbasisID: number;
  prsNummerKanton: string;
  prsNummerHeimat: string;
  nrmVerrechnungVon?: Date;
  nrmVerrechnungBis?: Date;
  nrmVerrechnungsAnteilCode?: number;
  istAuslandCh: boolean;
  auslandChVon?: Date;
  auslandChBis?: Date;
  auslandChMeldungAm?: Date;
  auslandChReferenzNrBund: string;
  burgergemeindeID?: number;
  bemerkung: string;
  bgFinanzplan_BaPersonTS: number[];
  nameVorname: string;
  geburtsdatum?: Date;
  alter?: number;
  beziehung: string;
}
export class HaushaltQuery {
  private haushaltData: IHaushalt[] = [];
  constructor(data: IHaushalt[]) {
    if (data && data.length) {
      this.haushaltData = data;
    }
  }

  get ViewHaushaltData() {
    return this.haushaltData.map(row => (
      {
        baPersonID: row.baPersonID,
        istUnterstuetzt: row.istUnterstuetzt,
        nameVorname: row.nameVorname,
        geburtsdatum: row.geburtsdatum,
        alter: row.alter,
        beziehung: row.beziehung,
        bgFinanzplan_BaPersonTS: row.bgFinanzplan_BaPersonTS,
      }
    ));
  }
}
