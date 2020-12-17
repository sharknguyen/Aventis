import { Injectable } from '@angular/core';
import { Einkommen } from './models';

@Injectable()
export class VersicherungsleistungenService {

    static einkommenAdapter(data: any): any {
        return data.map(
            einkommen => new Einkommen(einkommen)
        );
    }

    static postEinkommenAdapter(data: any): any {
        return data;
    }

    static putEinkommenAdapter(data: any): any {
        return data;
    }

    static deleteEinkommenAdapter(data: any): any {
        return data;
    }

    static getEinkomenLookupAdapter(data: any): any {
        return data;
    }

    static getListDataAdapte(data: any): any {
        return data;
    }

    static getBgBewilligungStatusCodeAdapter(data: any): any {
        return data;
    }
}
