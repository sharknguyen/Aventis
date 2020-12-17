export interface IFinanzplan {
  Rec_ID: number;
  Parent_ID: number;
  SortKey: number;
  Style: number;
  BgKategorieCode: number;
  BgGruppeCode: number;
  Bezeichnung: string;
  Betrag: number;
  BetragFormat: string;
  Total: number;
  TotalFormat: string;
  Info: string;
  ClassName: string;
}

export class Finanzplan implements IFinanzplan {
  Rec_ID: number;
  Parent_ID: number;
  SortKey: number;
  Style: number;
  BgKategorieCode: number;
  BgGruppeCode: number;
  Bezeichnung: string;
  Betrag: number;
  BetragFormat: string;
  Total: number;
  TotalFormat: string;
  Info: string;
  ClassName: string;
  constructor(data?: IFinanzplan[]) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
      this.BetragFormat = this.Betrag ? this.Betrag.toFixed(2) : '';
      this.TotalFormat = this.Total ?  this.Total.toFixed(2) : '';
    }
  }
}
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
