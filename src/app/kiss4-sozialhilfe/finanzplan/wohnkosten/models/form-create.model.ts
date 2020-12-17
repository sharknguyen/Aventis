export interface IFormCreateModel {
  payload: {
    BgPositionID: number;
    BgPositionsartID: number;
    BgBudgetID: number,
    Betrag: number;
    Reduktion: number;
    Abzug: number;
    MaxBeitragSD: number;
    Bemerkung: string;
    DatumVon: Date;
    DatumBis: Date;
    BgPositionTS: any;
  };
  Beitrag: Number;
  NKBetrag: number;
  NKMaxBeitragSD: number;
  Berechnungsgrundlage: number;
  RntHgUeFactor: number;
  Wohnsituation: number;
  AnpassenVon: Date;
  BgFinanzplanId: number;
}

export class FormCreateModel implements IFormCreateModel {
  payload: {
    BgPositionID: number;
    BgPositionsartID: number;
    BgBudgetID: number,
    Betrag: number;
    Reduktion: number;
    Abzug: number;
    MaxBeitragSD: number;
    Bemerkung: string;
    DatumVon: Date;
    DatumBis: Date;
    BgPositionTS: any;
  };
  Beitrag: Number;
  NKBetrag: number;
  NKMaxBeitragSD: number;
  Berechnungsgrundlage: number;
  RntHgUeFactor: number;
  Wohnsituation: number;
  AnpassenVon: Date;
  BgFinanzplanId: number;
  constructor(data?: IFormCreateModel) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
