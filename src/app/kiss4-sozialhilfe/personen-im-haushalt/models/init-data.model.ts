// Using for login
interface IInitData {
  userId: number;
  sender: string;
  nameVorname: string;
}

export class InitData implements IInitData {
  userId: number;
  sender: string;
  nameVorname: string;

  constructor(data?: IInitData) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
