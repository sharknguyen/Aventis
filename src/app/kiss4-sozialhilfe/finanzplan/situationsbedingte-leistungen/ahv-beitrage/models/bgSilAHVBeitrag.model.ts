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
