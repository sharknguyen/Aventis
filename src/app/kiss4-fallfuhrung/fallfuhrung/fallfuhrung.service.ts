import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

import { ModelFallfuhrung, ModelFallRights, ModelGetConfig, ModelGetDataCombobox, GetCountFaPhaseModel } from './models';

@Injectable()
export class FallfuhrungService {
    static getDataFallfuhrung(Fallfuhrung: ModelFallfuhrung): any {
        return new ModelFallfuhrung(Fallfuhrung);
    }

    // Get Config
    static getConfigAdapter(configData: any): any {
        return new ModelGetConfig(configData);
    }

    // Get Fall Rights
    static getFallRightsAdapter(fallRightsData: any): ModelFallRights {
        if (!isNullOrUndefined(fallRightsData)) {
            return new ModelFallRights(fallRightsData);
        }
        return new ModelFallRights();
    }

    // Map data combobox
    static getDataCbboxAdapter(dataCombobox: any): Array<any> {
        return dataCombobox.map(
            item => new ModelGetDataCombobox(item)
        );
    }

    //  Update FaLeistung
    static updateFaLeistungAdapter(data: any): any {
        return new ModelGetConfig(data);
    }

    // Map data AnzahlOffenePendenzen
    static getAnzahlOffenePendenzenAdapter(anzahlOffenePendenzen: any): any {
        if (!isNullOrUndefined(anzahlOffenePendenzen)) {
            return anzahlOffenePendenzen;
        }
    }

    // Validation FaLeistung
    static validationFaLeistungAdapter(data: any): any {
        return new ModelFallfuhrung(data);
    }

    static getCountFaPhase(data: any): Array<any> {
        return data.map(
            item => new GetCountFaPhaseModel(item)
        );
    }
}
