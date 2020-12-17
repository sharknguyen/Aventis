import {Injectable} from '@angular/core';
import {
  BgSilAHVBeitrag, Finanzplan
} from './models';


@Injectable()
export class FinanzplanService {

  static bgSilAHVBeitragAdapter(data: any): any {
    const dataBgSilAHVBeitrag = data.map(
      item => new BgSilAHVBeitrag(item)
    )[0];
    return dataBgSilAHVBeitrag;
  }
  // get data finanzplan grid
  static getFinanzplan(data: any): Array<any> {
    return data.map(item => new Finanzplan(item));
  }
}
