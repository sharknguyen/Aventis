export interface ILookUps {
  bfscode?: number;
  code: number;
  description: any;
  isActive?: boolean;
  lovcodeName: string;
  lovname: string;
  lovnameNavigation: any;
  shortText: string;
  shortTextTid?: number;
  sortKey?: number;
  system: boolean;
  text: string;
  textTid?: number;
  value1: string;
  value1Tid?: any;
  value2: any;
  value2Tid?: any;
  value3: any;
  value3Tid?: any;
  xlov: any;
  xlovcodeId: number;
  xlovcodeTs: any;
  xlovid: number;
}

export class LookUps implements ILookUps {
  public bfscode?: number;
  public code: number;
  public description: any;
  public isActive?: boolean;
  public lovcodeName: string;
  public lovname: string;
  public lovnameNavigation: any;
  public shortText: string;
  public shortTextTid?: number;
  public sortKey?: number;
  public system: boolean;
  public text: string;
  public textTid?: number;
  public value1: string;
  public value1Tid?: any;
  public value2: any;
  public value2Tid?: any;
  public value3: any;
  public value3Tid?: any;
  public xlov: any;
  public xlovcodeId: number;
  public xlovcodeTs: any;
  public xlovid: number;

  constructor(data?: ILookUps) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
