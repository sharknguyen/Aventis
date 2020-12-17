import { Injectable } from '@angular/core';

import { Erwerbseinkommen, BgErwerbseinkommens, BgErwerbseinkommenDropdowns, BgBewilligungStatusCodes} from './models';

@Injectable()
export class ErwerbseinkommenService {

    static getErwerbseinkommen(erwerbseinkommen: any): any {
        return erwerbseinkommen.map(x => new Erwerbseinkommen(x));
    }

    static addErwerbseinkommen(erwerbseinkommens: any): any {
        return erwerbseinkommens.map(x => new Erwerbseinkommen(x));
    }

    static updateErwerbseinkommen(erwerbseinkommen: any): any {
        return new Erwerbseinkommen(erwerbseinkommen);
    }

    static deleteErwerbseinkommen(response: any): any {
        return { ...response };
    }

    // service BgErwerbseinkommen
    static getBgErwerbseinkommen(bgErwerbseinkommen: any): any {
        return bgErwerbseinkommen.map(x => new BgErwerbseinkommens(x));
    }

    static addBgErwerbseinkommen(bgErwerbseinkommen: any): any {
        return bgErwerbseinkommen.map(x => new BgErwerbseinkommens(x));
    }

    static updateBgErwerbseinkommen(bgErwerbseinkommen: any): any {
        return new BgErwerbseinkommens(bgErwerbseinkommen);
    }

    static deleteBgErwerbseinkommen(bgErwerbseinkommen: any): any {
        return new bgErwerbseinkommen;
    }

    // service BgErwerbseinkommenDropdown
    static getBgErwerbseinkommenDropdown(bgErwerbseinkommenDropdown: any): any {
        return bgErwerbseinkommenDropdown.map(x => new BgErwerbseinkommenDropdowns(x));
    }

    // service get status

    static getBgBewilligungStatusCode(bgBewilligungStatusCode: any): any {
        return bgBewilligungStatusCode.map(x => new BgBewilligungStatusCodes(x));
    }

}
