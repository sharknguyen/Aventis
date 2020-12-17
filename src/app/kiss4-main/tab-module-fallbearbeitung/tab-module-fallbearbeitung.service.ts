import { Injectable } from '@angular/core';

import { ModuleIcon as ModuleIcon } from './models/module-icon.model';
import { PersonInfoTitel } from './models/person-info-titel.model';

@Injectable({
  providedIn: 'root'
})
export class TabModuleFallbearbeitungService {
  constructor() { }

  static getModuleIcon(data: any): any {
    return data.map(item => new ModuleIcon(item));
  }

  static getZeitachseVisible(data: any): any {
    return data;
  }

  static getPersonInfoTitel(data: any): any {
    return new PersonInfoTitel(data[0]);
  }
}
