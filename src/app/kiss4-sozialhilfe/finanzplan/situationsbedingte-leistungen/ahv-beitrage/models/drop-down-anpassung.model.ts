export interface IDropDownAnpassung {
  firstDate: any;
  text: any;
}

export class DropDownAnpassung implements IDropDownAnpassung {
  public firstDate: any;
  public text: any;

  constructor(data?: IDropDownAnpassung) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}


