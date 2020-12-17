import { Injectable } from '@angular/core';
import { KbBuchung, ShUnterstuetztePerson } from './models';

@Injectable()
export class KasseService {
    /**
     * Transforms grid data Kasse
     *
     */
    static gridAdapter(data): Array<KbBuchung> {
        return data.map((item, Index) => new KbBuchung({ ...item, Index: Index + 1 }));
    }
    static dropDownDataAdapter(data): Array<ShUnterstuetztePerson> {
        return data.map((item, index) => new ShUnterstuetztePerson({ ...item, index }));
    }
    static updateKbBuchungAdapter(data) {
        return data;
    }

}
