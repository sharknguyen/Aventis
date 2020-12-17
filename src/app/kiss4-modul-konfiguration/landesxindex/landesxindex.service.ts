import { Injectable } from '@angular/core';
import { ResSuccess } from '@shared/models/shared/res-success.model';
import { isNullOrUndefined } from 'util';

import {
    IkLandesindexModel,
    Landesindex,
    LandesindexDelete,
    LandesindexWert,
    LandesindexWertOutput,
    Status,
} from './models';

@Injectable()
export class LandesindexService {
    static gridAdapter(Landesxindexes: any): Array<any> {
        return Landesxindexes.map(
            landesxindex => new Landesindex(landesxindex)
        );
    }

    static gridAdapterDetail(Lanadesxindexes: any): Array<any> {
        return Lanadesxindexes.map(
            landesxindex => new LandesindexWert(landesxindex)
        );
    }

    static deleteLandesindexAdapter(data: any): any {
        if (!isNullOrUndefined(data)) {
            return new LandesindexDelete(data);
        }
        return new LandesindexDelete();
    }

    static deleteLandesindexWertAdapter(data: any): any {
        if (!isNullOrUndefined(data)) {
            return new LandesindexDelete(data);
        }
        return new LandesindexDelete();
    }

    // Apdapter for update multi-rows in top grid
    static updateLandesxindexAdapter(data: any): any {
        if (!isNullOrUndefined(data)) {
            return new ResSuccess(data);
        }
        return new ResSuccess();
    }

    // Add LandesIndex
    static addLandesindex(data: any): Status {
        if (!isNullOrUndefined(data)) {
            return new Status(data);
        }
        return new Status();
    }

    // Get Wert
    static getLandesindexWert(wert: any): LandesindexWertOutput {
        if (!isNullOrUndefined(wert)) {
            return new LandesindexWertOutput(wert);
        }
        return new LandesindexWertOutput();
    }

    // Get IkLandesindex
    static getIkLandesindex(datas: any): any {
        return datas.map(data => new IkLandesindexModel(data));
    }

    // add Wert by LandesIndex
    static addWertbyLandesIndex(data: any): Status {
        if (!isNullOrUndefined(data)) {
            return new Status(data);
        }
        return new Status();
    }

    // get CountIkLandesindexWert
    static getCountIkLandesindexWert(data: any): any {
        if (data && data.length > 0) {
            return data[0];
        }
        return null;
    }

    // get NameIkLandesindex
    static getNameIkLandesindex(data: any): any {
        if (data && data.length > 0) {
            return data[0];
        }
        return null;
    }

    // add IkLandesindexWert
    static addIkLandesindexWert(data: any): any {
        return data;
    }

    static updateWert(data: any): Status {
        if (!isNullOrUndefined(data)) {
            return new Status(data);
        }
        return new Status();
    }

    static addWert(data: any): Status {
        if (!isNullOrUndefined(data)) {
            return new Status(data);
        }
        return new Status();
    }
}
