export interface IInstitutionSuchenWh {
  id: number;
  institution: string;
  adresse: string;
  typen: string;
}

export class InstitutionSuchenWh implements IInstitutionSuchenWh {
  public id: number;
  public institution: string;
  public adresse: string;
  public typen: string;

  constructor(data?: IInstitutionSuchenWh) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
