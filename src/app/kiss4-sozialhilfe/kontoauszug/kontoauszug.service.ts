import { Injectable } from '@angular/core';

import { Kontoauszug, Kostenart, Personnen, Zeitraum } from './models';

@Injectable()
export class KontoauszugService {
    static getPersonnen(personnens: any): Array<Personnen> {
        return personnens;
    }

    static getZeitraum(zeitraums: any): Array<Zeitraum> {
        return zeitraums;
    }

    static getKostenart(kostenarts: any): Array<Kostenart> {
        return kostenarts.map((kostenart, index) => new Kostenart({...kostenart, ID: index + 1}));
    }

    static searchKontoauszug(kontoauszugs: any): Array<Kontoauszug> {
        return kontoauszugs.map((kontoauszug, index) => new Kontoauszug({...kontoauszug, ID: index + 1}));
    }

    static getLovLookups(data: any): Array<any> {
        return data;
    }
}
