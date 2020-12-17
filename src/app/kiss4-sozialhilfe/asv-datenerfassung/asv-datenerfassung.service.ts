import { Injectable } from '@angular/core';
import { AsvDatenerfassung } from './models/asv-datenerfassung.models';

@Injectable()
export class AsvDatenerfassungService {
    /**
     * Transforms grid data AsvDatenerfassung
     *
     */
    static gridAdapter(dataAsv: any): any {
        return dataAsv.map((item, index) => new AsvDatenerfassung({...item, index}));
    }

    static comboboxDataAdapter(dataCombobox: any): any {
        return dataCombobox;
    }

    static insertAdapter(data: any): any {
        return data;
    }

    static updateAdapter(data: any): any {
        return data;
    }

    static deleteAdapter(data: any): any {
        return data;
    }

}
