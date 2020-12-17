import {Injectable} from '@angular/core';
import {
  BgPosition, BgPositionData,
  BgSilAHVBeitrag, Positionsart, RichtLinie, ZulageSelectBoxData
} from './models';


@Injectable()
export class ZulagenEFBService {

  static bgSilAHVBeitragAdapter(data: any): any {
    const dataBgSilAHVBeitrag = data.map(
      item => new BgSilAHVBeitrag(item)
    )[0];
    return dataBgSilAHVBeitrag;
  }

  // get data combobox
  static getDataCombobox(data: any): Array<any> {
    return data.map(cb => new ZulageSelectBoxData(cb));
  }

  // get data BgPosition grid
  static getBgPosition(data: any): Array<any> {
    return data.map(item => new BgPosition(item));
  }

  // get data Min Max Def data
  static getRichtLinie(data: any): Array<any> {
    return data.map(item => new RichtLinie(item));
  }

  // get data sqlRichtlinie
  static getBgPositionsart(data: any): Array<any> {
    return data.map(item => new Positionsart(item));
  }

  // get data getBgPositionsartId
  static getBgPositionsartId(data: any): Array<any> {
    return data;
  }


  // save bgPosition
  static saveBgPosition(data: any): any {
    return new BgPositionData(data);
  }
  // update bgPosition
  static updateBgPosition(data: any): any {
    return new BgPositionData(data);
  }
}
