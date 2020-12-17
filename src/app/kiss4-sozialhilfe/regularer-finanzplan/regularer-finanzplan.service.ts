import { Injectable } from '@angular/core';
import { ICheck, IFinanzplan, IFinanzplanDropDown } from '@app/kiss4-sozialhilfe/regularer-finanzplan/models';

@Injectable()
export class RegularerFinanzplanService {

    static headerAdapter = (result: any[]) => result[0];
    static finanzplanAdapter = (result: IFinanzplan[]) => result[0];
    static checkAdapter = (result: ICheck[]) => result;
    static grundErAdapter = (result: IFinanzplanDropDown[]) => result;
    static grundAbAdapter = (result: IFinanzplanDropDown[]) => result;
    static grundbedarfTypeAdapter = (result: IFinanzplanDropDown[]) => result;
    static typeAdapter = (result: IFinanzplanDropDown[]) => result;
    static bewilligungStatusAdapter = (result: IFinanzplanDropDown[]) => result;
    static saveFinanzplanAdapter = (result: any) => result;
    static verlaufDataFinanzplanAdapter = (result: any) => result;
}
