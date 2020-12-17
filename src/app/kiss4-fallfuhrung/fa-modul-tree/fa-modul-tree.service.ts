import { Injectable } from '@angular/core';

import { GetCountFaPhaseModel, GetFaLeistungByBaPersonIDModel, RightContentItem, TreeViewItem, Faleistung } from './models';
import { FallNavNavigatorTreeModel } from '@app/kiss4-main/fall-navigator/models';

@Injectable({
  providedIn: 'root'
})
export class FaModulTreeService {

  constructor() { }

  static getTreeViewItems(treeViewItems: any): Array<any> {
    return treeViewItems.map(
      treeViewItem => new TreeViewItem(treeViewItem)
    );
  }

  static getRightContentItems(rightContentItems: any): Array<any> {
    return rightContentItems.map(
      rightContentItem => new RightContentItem(rightContentItem)
    );
  }

  static getUserIDFaLeistungOrFaPhase(data: any): any {
    return data;
  }

  static getFaLeistungByBaPersonID(data: any): any {
    return new GetFaLeistungByBaPersonIDModel(data);
  }

  static getCountFaPhase(data: any): Array<any> {
    return data.map(
      item => new GetCountFaPhaseModel(item)
    );
  }

  static getConfigInt(configIntData: any): any {
    if (configIntData && configIntData.length > 0) {
      return configIntData[0];
    }
  }

  static getConfigBool(configBoolData: any): any {
    return configBoolData;
  }

  static getFaPhaseByFaLeistungID(data: any): any {
    return data;
  }

  static updateFaLeistungData(data: any): any {
    return data;
  }

  static insertFaPhase(FaPhase: any): any {
    return FaPhase;
  }

  static getMessageInformation(data: any): any {
    return data;
  }

  static getDataUsedFaLeistungByFaLeistungID(faleistungs: any): Array<any> {
    return faleistungs.map(
      faleistung => new Faleistung(faleistung)
    );
  }

  static deleteFallverlauf(data: any): any {
    return data;
  }

  static deletePhase(data: any): any {
    return data;
  }

  static getBaPersonIDModulID(data: any): any {
    if (data && data.length > 0) {
      return data[0];
    }
  }

  static getTreeFallNavigator(data: any): any {
    if (data && data[0].type === 'E') {
      data[0].parentId = '0';
    }
    return data.map(tree => new FallNavNavigatorTreeModel(tree));
  }
}
