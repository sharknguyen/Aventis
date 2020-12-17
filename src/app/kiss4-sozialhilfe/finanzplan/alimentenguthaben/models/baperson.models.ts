export interface IBaPerson {
    BaPersonID: number;
    LT: number;
    Name: string;
    NameVorname: string;
    Vorname: string;
}
export class BaPerson implements IBaPerson {
    BaPersonID: number;
    LT: number;
    Name: string;
    NameVorname: string;
    Vorname: string;
    constructor(data?: IBaPerson) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
