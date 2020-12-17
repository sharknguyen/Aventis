export interface IWhKennzahlen {
  HgGrundbedarf: number;
  UeGrundbedarf: number;
  HgWohnkosten: number;
  UeWohnkosten: number;
  HgZuschlagI: number;
  UeZuschlagI: number;
  B23Amount: number;
  GBUseHgUeFactor: number;
  RntUseHgUeFactor: number;
  GBHgUeFactor: number;
  RntHgUeFactor: number;
  RefDate: Date;
}

export class WhKennzahlen implements IWhKennzahlen {
  HgGrundbedarf: number;
  UeGrundbedarf: number;
  HgWohnkosten: number;
  UeWohnkosten: number;
  HgZuschlagI: number;
  UeZuschlagI: number;
  B23Amount: number;
  GBUseHgUeFactor: number;
  RntUseHgUeFactor: number;
  GBHgUeFactor: number;
  RntHgUeFactor: number;
  RefDate: Date;
  constructor(data?: IWhKennzahlen) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
