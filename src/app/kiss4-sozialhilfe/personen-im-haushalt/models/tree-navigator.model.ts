// If the function have left menu
interface ITreeNavigator {
  id: number;
  caption: string;
  expanded?: boolean;
  enabled: boolean;
  name: string;
  tag: string;
  count?: number;
  parentId?: number;
  selected?: boolean;
}

export class TreeNav implements ITreeNavigator {
  id: number;
  caption: string;
  expanded?: boolean;
  enabled: boolean;
  name: string;
  tag: string;
  count?: number;
  parentId?: number;
  selected?: boolean;

  constructor(data?: ITreeNavigator) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
