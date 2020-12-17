// Query for API get header
export interface IPersonenImHaushalt {
  bgFinanzplanID: number;
  baPersonID?: number;
  bgBewilligungStatusCode: number;
  finanzplanVon: Date;
  finanzplanBis?: Date;
  nameVorname: string;
  wohnsitzStrasseHausNr: string;
  wohnsitzPLZOrt: string;
  geburtsdatum?: Date;
  heimatort: string;
}
export class PersonenImHaushaltQuery implements IPersonenImHaushalt {
  bgFinanzplanID: number;
  baPersonID?: number;
  bgBewilligungStatusCode: number;
  finanzplanVon: Date;
  finanzplanBis?: Date;
  nameVorname: string;
  wohnsitzStrasseHausNr: string;
  wohnsitzPLZOrt: string;
  geburtsdatum?: Date;
  heimatort: string;
  constructor(data?: IPersonenImHaushalt) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
