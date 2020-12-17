// Using for login
interface IModel {
    id: any;
}
export class Model implements IModel {
    id: number;

    constructor(data?: IModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
interface IInitData {
    AbschlussBegruendung?: string;
    AbschlussgrundCode?: number;
    AbzahlungskontoRueckerstattungCode?: number;
    BaInstitutionID?: number;
    BaPersonID?: number;
    Bemerkung?: string;
    BetragProMonat?: any;
    BewilligungStatusCode?: number;
    BgKostenartID?: number;
    BgPositionsartID?: number;
    BgSpezkontoID?: number;
    BgSpezkontoTS?: string;
    BgSpezkontoTypCode?: number;
    DatumBis?: any;
    DatumBisJahr?: any;
    DatumBisMonat?: any;
    DatumVon?: any;
    DatumVonJahr?: number;
    DatumVonMonat?: number;
    ErsterMonat?: any;
    FaLeistungID?: number;
    GueltigBis?: any;
    GueltigVon?: any;
    Inaktiv?: boolean;
    InstitutionName?: string;
    KuerzungAnteilGBL?: any;
    KuerzungLaufzeitMonate?: any;
    NameSpezkonto?: string;
    OhneEinzelzahlung?: boolean;
    OldID?: any;
    ProPerson?: boolean;
    ProUE?: boolean;
    Saldo?: number;
    StartSaldo?: number;
    BewilligungStatusName?: string;
}
export class InitData implements IInitData {
    AbschlussBegruendung?: string;
    AbschlussgrundCode?: number;
    AbzahlungskontoRueckerstattungCode?: number;
    BaInstitutionID?: number;
    BaPersonID?: number;
    Bemerkung?: string;
    BetragProMonat?: any;
    BewilligungStatusCode?: number;
    BgKostenartID?: number;
    BgPositionsartID?: number;
    BgSpezkontoID?: number;
    BgSpezkontoTS?: string;
    BgSpezkontoTypCode?: number;
    DatumBis?: any;
    DatumBisJahr?: any;
    DatumBisMonat?: any;
    DatumVon?: any;
    DatumVonJahr?: number;
    DatumVonMonat?: number;
    ErsterMonat?: any;
    FaLeistungID?: number;
    GueltigBis?: any;
    GueltigVon?: any;
    Inaktiv?: boolean;
    InstitutionName?: string;
    KuerzungAnteilGBL?: any;
    KuerzungLaufzeitMonate?: any;
    NameSpezkonto?: string;
    OhneEinzelzahlung?: boolean;
    OldID?: any;
    ProPerson?: boolean;
    ProUE?: boolean;
    Saldo?: number;
    StartSaldo?: number;
    BewilligungStatusName?: string;

    constructor(data?: IInitData) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
// "SortKey":3,
interface IGridBottom {
    SortKey: number;
    Datum: any;
    DatumSort: any;
    Belastung: any;
    Gutschrift: number;
    Freigegeben: boolean;
    Verbucht: any;
    Gesperrt: boolean;
    Buchungstext: string;
    Saldo: number;
    id: number;
}
export class GridBottom implements IGridBottom {
    SortKey: number;
    Datum: any;
    DatumSort: any;
    Belastung: any;
    Gutschrift: number;
    Freigegeben: boolean;
    Verbucht: any;
    Gesperrt: boolean;
    Buchungstext: string;
    Saldo: number;
    id: number;
    constructor(data?: IGridBottom) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
