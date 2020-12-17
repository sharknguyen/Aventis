// Query for API get Klientensystem

export interface IKlientenSystem {
  baPersonID: number;
  nameVorname: string;
  geburtsdatum?: Date;
  alter?: number;
  beziehung: string;
  unterstuetzt: boolean;
}

export class KlientenSystemQuery {
  private klientenSystem: IKlientenSystem[] = [];
  constructor(data: IKlientenSystem[]) {
    if (data && data.length) {
      this.klientenSystem = data;
    }
  }

  get ViewKlientenSystem() {
    return this.klientenSystem.map(row => (
      {
        baPersonID: row.baPersonID,
        nameVorname: row.nameVorname,
        geburtsdatum: row.geburtsdatum,
        alter: row.alter,
        beziehung: row.beziehung,
      }
    ));
  }
}
