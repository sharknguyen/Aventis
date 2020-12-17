import { Injectable } from '@angular/core';
import {
    FaAktennotiz,
    TreeNav
} from '@app/kiss4-fallfuhrung/fa-aktennotiz/models';
import { Mitarbeiter } from '@app/kiss4-fallfuhrung/fa-aktennotiz/models';

@Injectable()
export class FaAktennotizService {
    /**
     * Transforms grid data FaAktennotiz recieved from the API into array of 'fa-aktennotiz' instances
     *
     * @param FaAktennotiz
     */
    static gridAdapter(faAktennotizs): Array<FaAktennotiz> {
        return faAktennotizs.map(
            (faAktennotiz, index) => new FaAktennotiz({ ...faAktennotiz, index })
        );
    }

    static getTreeNavigatorAdapter(treeNavigators: any): Array<any> {
        return treeNavigators.map(treeNavigator => new TreeNav(treeNavigator));
    }

    static kontaktartAdapter(data) {
        return data;
    }
    static mitarbeiterAdapter(data) {
        return data.map((item, index) => new Mitarbeiter({ ...item, index }));
    }
    static theMenAdapter(data) {
        return data;
    }
    static addFaAktennotiz(data): boolean {
        return data;
    }
    static deleteFaAktennotiz(data) {
        return data;
    }
    static updateFaAktennotiz(data) {
        return data;
    }
    static dauerAdapter(data) {
        return data;
    }
    static configAdapter(data) {
        return data;
    }
    static dokumentAktennotizenAdapter(data) {
        return data;
    }
    static getDefaultKontartPartner(data) {
       return data;
    }
    static getLogischesLoeschen(data) {
        return data;
    }

}
