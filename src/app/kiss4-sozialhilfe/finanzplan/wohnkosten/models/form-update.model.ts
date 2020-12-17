export interface IFormUpdateModel {
  payload: {
    BgPositionID: number;
    Betrag: number;
    Reduktion: number;
    Abzug: number;
    MaxBeitragSD: number;
    Bemerkung: string;
    DatumVon: Date;
    DatumBis: Date;
    BgPositionTS: any;
    BgPositionsartID: number;
  };
  Beitrag: number;
  NKBetrag: number;
  NKMaxBeitragSD: number;
}

export class FormUpdateModel implements IFormUpdateModel {
  payload: {
    BgPositionID: number;
    Betrag: number;
    Reduktion: number;
    Abzug: number;
    MaxBeitragSD: number;
    Bemerkung: string;
    DatumVon: Date;
    DatumBis: Date;
    BgPositionTS: any;
    BgPositionsartID: number;
  };
  Beitrag: number;
  NKBetrag: number;
  NKMaxBeitragSD: number;
  constructor(data?: IFormUpdateModel) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
