// Model for DPL select box data
export interface ISelectboxModel {
    code: number;
    text?: string;
}

export class SelectboxModel implements ISelectboxModel {
    public code: number;
    public text?: string;
    constructor(data?: ISelectboxModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface ISelectboxQueryModel {
    finanzplanVon: string;
    finanzplanBis: string;
}

export class SelectboxQueryModel implements ISelectboxQueryModel {
    public finanzplanVon: string;
    public finanzplanBis: string;
    constructor(data?: ISelectboxQueryModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

/********* Model for Update function *************/
export interface IUpdateFormDataQueryModel {
    bgPositionID: number;
    bgPositionTS: any;
    bgFinanzplanID: number;
    bgBudgetID: number;
    bgPositionsartID: number;
    betrag: number;
    reduktion: number;
    bemerkung: string;
    value?: boolean;
    _body?: any;
    status?: number;
}

export class UpdateFormDataQueryModel implements IUpdateFormDataQueryModel {
    public bgPositionID: number;
    public bgPositionTS: any;
    public bgFinanzplanID: number;
    public bgBudgetID: number;
    public bgPositionsartID: number;
    public betrag: number;
    public reduktion: number;
    public bemerkung: string;
    public value?: boolean;
    public _body?: any;
    public status?: number;
    constructor(data?: IUpdateFormDataQueryModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IResult {
    value: boolean;
    _body: any;
    status: number;
}

export class Result implements IResult {
    public value: boolean;
    public _body: any;
    public status: number;
    constructor(data?: IResult) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
/********* The end model for Update function *****/
// Get status code
export interface IStatusCodeModel {
    bgBewilligungStatusCode: number;
    bgFinanzplanID: number;
    finanzplanBis: Date;
    finanzplanVon: Date;
    geburtsdatum: Date;
    heimatort: string;
    nameVorname: string;
    wohnsitzPLZOrt: string;
    wohnsitzStrasseHausNr: string;
}

export class StatusCodeModel implements IStatusCodeModel {
    public bgBewilligungStatusCode: number;
    public bgFinanzplanID: number;
    public finanzplanBis: Date;
    public finanzplanVon: Date;
    public geburtsdatum: Date;
    public heimatort: string;
    public nameVorname: string;
    public wohnsitzPLZOrt: string;
    public wohnsitzStrasseHausNr: string;
    constructor(data?: IStatusCodeModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IStatusCodeQuery {
    baPersonID: number;
    bgFinanzplanID: number;
}

export class StatusCodeQuery implements IStatusCodeQuery {
    public baPersonID: number;
    public bgFinanzplanID: number;
    constructor(data?: IStatusCodeQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IInitFormDataModel {
    bgFinanzplanID: number;
    finanzplanBis: string;
    finanzplanVon: string;
    bgBewilligungStatusCode: number;
    bgBudgetId: number;
    lblTitelText: string;
    status: any;
    _body: any;
}

export class InitFormDataModel implements IInitFormDataModel {
    public bgFinanzplanID: number;
    public finanzplanBis: string;
    public finanzplanVon: string;
    public bgBewilligungStatusCode: number;
    public bgBudgetId: number;
    public lblTitelText: string;
    public status: any;
    public _body: any;
    constructor(data?: IInitFormDataModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IInitFormDataQuery {
    bgBudgetID: number;
}

export class InitFormDataQuery implements IInitFormDataQuery {
    public bgBudgetID: number;
    constructor(data?: IInitFormDataQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
// Get data for qryBgPosition
export interface IQryBgPositionDataModel {
    BgPositionID: number;
    BgPositionTS: any;
    BgPositionsartID: number;
    BgPositionsartCode: number;
    BgBudgetID: number;
    SKOS2005_HG: number;
    SKOS2005_Anpassung: number;
    SKOS2005_Total: number;
    SKOS2005_UE: number;
    GBII_Hg: number;
    GBI_Hg: number;
    GBII_AsOnePerson: boolean;
    GrundbedarfII: number;
    GrundbedarfII_Anpassung: number;
    Betrag_SKOS: number;
    GrundbedarfTotal: number;
    GBIZuschlag_Hg: number;
    GrundbedarfZusatz: number;
    GrundbedarfI_Anpassung: number;
    Reduktion: number;
    GBII_Hg_Einzel: number;
    GBII_Einzel: number;
    GBII_Hg_Gemeinschaft: number;
    GBII_Gemeinschaft: number;
    Bemerkung: string;
    ELSE_Anpassung: number;
    ELSE_Total: number;
    AbzugVVG: number;
    ELSE_Betrag: number;
    Betrag: number;
}

export class QryBgPositionDataModel implements IQryBgPositionDataModel {
    public BgPositionID: number;
    public BgPositionTS: any;
    public BgPositionsartID: number;
    public BgPositionsartCode: number;
    public BgBudgetID: number;
    public SKOS2005_HG: number;
    public SKOS2005_Anpassung: number;
    public SKOS2005_Total: number;
    public SKOS2005_UE: number;
    public GBII_Hg: number;
    public GBI_Hg: number;
    public GBII_AsOnePerson: boolean;
    public GrundbedarfII: number;
    public GrundbedarfII_Anpassung: number;
    public Betrag_SKOS: number;
    public GrundbedarfTotal: number;
    public GBIZuschlag_Hg: number;
    public GrundbedarfZusatz: number;
    public GrundbedarfI_Anpassung: number;
    public Reduktion: number;
    public GBII_Hg_Einzel: number;
    public GBII_Einzel: number;
    public GBII_Hg_Gemeinschaft: number;
    public GBII_Gemeinschaft: number;
    public Bemerkung: string;
    public ELSE_Anpassung: number;
    public ELSE_Total: number;
    public AbzugVVG: number;
    public ELSE_Betrag: number;
    public Betrag: number;
    constructor(data?: IQryBgPositionDataModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IQryKennzahlenQuery {
    bgFinanzplanID: number;
}

export class QryKennzahlenQuery implements IQryKennzahlenQuery {
    public bgFinanzplanID: number;
    constructor(data?: IQryKennzahlenQuery) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IQryKennzahlenModel {
    b23Amount: number;
    gbHgUeFactor?: number;
    gbUseHgUeFactor?: number;
    hgGrundbedarf: number;
    hgWohnkosten?: number;
    hgZuschlagI?: number;
    refDate?: any;
    rntHgUeFactor?: number;
    rntUseHgUeFactor?: number;
    ueGrundbedarf: number;
    ueWohnkosten?: number;
    ueZuschlagI?: number;
}

export class QryKennzahlenModel implements IQryKennzahlenModel {
    public b23Amount: number;
    public gbHgUeFactor?: number;
    public gbUseHgUeFactor?: number;
    public hgGrundbedarf: number;
    public hgWohnkosten?: number;
    public hgZuschlagI?: number;
    public refDate?: any;
    public rntHgUeFactor?: number;
    public rntUseHgUeFactor?: number;
    public ueGrundbedarf: number;
    public ueWohnkosten?: number;
    public ueZuschlagI?: number;
    constructor(data?: IQryKennzahlenModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface IUpdateBeforePostQueryModel {
    bgBudgetID: number;
    GrundbedarfII_Anpassung: number;
    GBII_AsOnePerson: Boolean;
    BgPositionsartID: number;
    value?: boolean;
    _body?: any;
    status?: number;
}

export class UpdateBeforePostQueryModel implements IUpdateBeforePostQueryModel {
    public bgBudgetID: number;
    public GrundbedarfII_Anpassung: number;
    public GBII_AsOnePerson: Boolean;
    public BgPositionsartID: number;
    public value?: boolean;
    public _body?: any;
    public status?: number;
    constructor(data?: IUpdateBeforePostQueryModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IRichtlinieDataModel {
    HG_MIN: number;
    HG_MAX: number;
    HG_DEF: number;
    UE_MIN: number;
    UE_MAX: number;
    UE_DEF: number;
}

export class RichtlinieDataModel implements IRichtlinieDataModel {
    public HG_MIN: number;
    public HG_MAX: number;
    public HG_DEF: number;
    public UE_MIN: number;
    public UE_MAX: number;
    public UE_DEF: number;
    constructor(data?: IRichtlinieDataModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
