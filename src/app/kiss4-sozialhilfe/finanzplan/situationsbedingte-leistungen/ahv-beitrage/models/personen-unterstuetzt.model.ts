export interface IPersonenUnterstuetzt {
  BaPersonID?: number;
  NameVorname: string;
  Name: string;
  Vorname: string;
  LT: boolean;
}

export class PersonenUnterstuetzt implements IPersonenUnterstuetzt {
  public BaPersonID?: number;
  public NameVorname: string;
  public Name: string;
  public Vorname: string;
  public LT: boolean;

  constructor(data?: IPersonenUnterstuetzt) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
