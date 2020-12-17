import { Injectable } from '@angular/core';
import { BgFinanzplan, BgPositionsart, BgPosition, WhKennzahlen } from './models';

@Injectable()
export class WohnkostenService {

  static bgFinanzplanAdapter(bgFinanzplan: BgFinanzplan): any {
    return bgFinanzplan;
  }
  static bgGrundbedarfAdapter(bgGrundbedarf: any): any {
    return bgGrundbedarf;
  }
  static bgPositionsartAdapter(bgPositionsart: BgPositionsart): any {
    return bgPositionsart;
  }
  static bgBgPositionAdapter(bgPosition: BgPosition): any {
    return bgPosition;
  }
  static whKennzahlenAdapter(whKennzahlenAdapter: WhKennzahlen): any {
    return whKennzahlenAdapter;
  }
  static richtlinienAdapter(richtlinien: any): any {
    return richtlinien;
  }
  static deleteWohnkostenAdapter(data: any): any {
    return data;
  }
  static updateWohnkostenAdapter(data: any): any {
    return data;
  }
  static createWohnkostenAdapter(data: any): any {
    return data;
  }
}
