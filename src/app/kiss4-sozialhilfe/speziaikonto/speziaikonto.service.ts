import { Injectable } from '@angular/core';
import { CommonConstant } from '@shared/common/constant.common';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';

import { InitData } from './models/speziaikonto.models';

@Injectable()
export class SpezialkontoService {
    static gridAdapter(Abklaerungens: any): any {
        return Abklaerungens.map((data, index) => {
            if (!isNullOrUndefined(data.DatumVon)) {
                data.DatumVon = new Date(data.DatumVon);
                data.DatumVon = moment(data.DatumVon).format(CommonConstant.FORMAT_DATE_MM_DD_YYYY);
            }
            if (!isNullOrUndefined(data.DatumBis)) {
                data.DatumBis = new Date(data.DatumBis);
                data.DatumBis = moment(data.DatumBis).format(CommonConstant.FORMAT_DATE_MM_DD_YYYY);
            }
            return new InitData({ ...data, id: index + 1 });
        });
    }

    static gridDetailAdapter(Kontoblatt: any): any {
        return Kontoblatt.map((data, index) => {
            if (!isNullOrUndefined(data.Datum)) {
                data.Datum = new Date(data.Datum);
                data.Datum = moment(data.Datum).format(CommonConstant.FORMAT_DATE_MM_DD_YYYY);
            }
            return new InitData({ ...data, id: index + 1 });
        });
    }

}
