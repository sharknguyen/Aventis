export interface IModuleIcon {
  moduleID?: number;
  shortName?: string;
  iconID?: number;
}

export class ModuleIcon implements IModuleIcon {
  moduleID?: number;
  shortName?: string;
  iconID?: number;

  constructor(data?: IModuleIcon) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
