export interface IWhPositionsart {
    bgGruppeCode: number;
    value: boolean;
    BgBudgetID: number;
}
export class WhPositionsart implements IWhPositionsart {
    public bgGruppeCode: number;
    public value: boolean;
    public BgBudgetID: number;
    constructor(data?: IWhPositionsart) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
