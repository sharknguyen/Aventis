export interface ISqlQueryShPositionTyp {
  BgPositionsartID: number;
  Name: string;
  Code: number;
  Text: string;
  HilfeText: string;
  VerwaltungSD_Default: boolean;
}


export class SqlQueryShPositionTyp implements ISqlQueryShPositionTyp {
  public BgPositionsartID: number;
  public Name: string;
  public Code: number;
  public Text: string;
  public HilfeText: string;
  public VerwaltungSD_Default: boolean;

  constructor(data?: ISqlQueryShPositionTyp) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
