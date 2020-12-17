// Query for API get WhKennzahlen
export interface IWhKennzahlen {
  bgFinanzplanID?: number;
  hgGrundbedarf: number;
  ueGrundbedarf: number;
  hgWohnkosten?: number;
  ueWohnkosten?: number;
  hgZuschlagI?: number;
  ueZuschlagI?: number;
  b23Amount: number;
  gBUseHgUeFactor?: number;
  rntUseHgUeFactor?: number;
  gBHgUeFactor?: number;
  rntHgUeFactor?: number;
  refDate: Date;
}

export interface IViewWhKennzahlenData {
  grundbedarf: number;
  wohnkosten: number;
  zuschlagI: number;
}
export class WhKennzahlenQuery {
  private WhKennzahlenData: IWhKennzahlen;
  upperViewWhKennzahlen: IViewWhKennzahlenData;
  lowerViewWhKennzahlen: IViewWhKennzahlenData;
  constructor(data?: IWhKennzahlen) {
    if (data) {
      this.WhKennzahlenData = data;
      this.setViewWhKennzahlenData();
    }
  }

  private setViewWhKennzahlenData() {
    this.upperViewWhKennzahlen = {
      grundbedarf: this.WhKennzahlenData.hgGrundbedarf,
      wohnkosten: this.WhKennzahlenData.hgWohnkosten,
      zuschlagI: this.WhKennzahlenData.hgZuschlagI,
    };
    this.lowerViewWhKennzahlen = {
      grundbedarf: this.WhKennzahlenData.ueGrundbedarf,
      wohnkosten: this.WhKennzahlenData.ueWohnkosten,
      zuschlagI: this.WhKennzahlenData.ueZuschlagI,
    };
  }
}
