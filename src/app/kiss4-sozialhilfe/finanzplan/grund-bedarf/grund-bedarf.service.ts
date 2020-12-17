import { Injectable } from '@angular/core';
import { InitFormDataModel, QryBgPositionDataModel, QryKennzahlenModel, RichtlinieDataModel, SelectboxModel, StatusCodeModel, UpdateBeforePostQueryModel, UpdateFormDataQueryModel } from '@app/kiss4-sozialhilfe/finanzplan/grund-bedarf/models';
@Injectable()
export class GrundBedarfService {
    // Map select box data
    static getBerechnungsgrundlageSelcectboxDataAdapter(BerechnungsgrundlageSelectbox: any): Array<any> {
        return BerechnungsgrundlageSelectbox.map(
            item => new SelectboxModel(item)
        );
    }
    // Map data when load QryKennzahlen data
    static loadQryKennzahlenDataAdapter(qryKennzahlenModel: any): Array<any> {
        return qryKennzahlenModel.map(
            itemData => new QryKennzahlenModel(itemData)
        );
    }
    // Map data when load QryBgPosition data
    static loadQryBgPositionDataAdapter(qryKennzahlenModel: any): Array<any> {
        return qryKennzahlenModel.map(
            itemData => new QryBgPositionDataModel(itemData)
        );
    }
    // Map data when update form data
    static updateFormDataAdapter(data: any): UpdateFormDataQueryModel {
        if (data) {
            return new UpdateFormDataQueryModel(data);
        }
        return new UpdateFormDataQueryModel();
    }
    // Map status code data
    static getStatusCodeDataAdapter(StatusCode: any): Array<any> {
        return StatusCode.map(
            item => new StatusCodeModel(item)
        );
    }
    // Map data when load Init Form data
    static loadInitFormDataAdapter(formDataGrundBedarf: any): InitFormDataModel {
        if (formDataGrundBedarf) {
            return new InitFormDataModel(formDataGrundBedarf);
        }
        return new InitFormDataModel();
    }
    // Map data when load Richtlinie data
    static loadRichtlinieDataAdapter(RichtlinieGrundBedarf: any): Array<any> {
        return RichtlinieGrundBedarf.map(
            itemData => new RichtlinieDataModel(itemData)
        );
    }
    // Map data when load PauschaleSTE data
    static getPauschaleSTEDataAdapter(pauschaleSTE: number): any {
        if (pauschaleSTE) {
            return pauschaleSTE;
        }
    }
    // Map data when update before post
    static updateBeforePostAdapter(data: any): UpdateBeforePostQueryModel {
        if (data) {
            return new UpdateBeforePostQueryModel(data);
        }
        return new UpdateBeforePostQueryModel();
    }
    // Map data when load ShStatusCodeToSql data
    static getShStatusCodeToSqlDataAdapter(data: number): any {
        if (data) {
            return data;
        }
    }
}
