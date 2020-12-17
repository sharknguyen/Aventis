export interface IIkLandesindexModel {
    IkLandesindexID: number;
    Name: string;
    Value: number;
}
export class IkLandesindexModel implements IIkLandesindexModel {
    public IkLandesindexID: number;
    public Name: string;
    public Value: number;
    constructor(data?: IIkLandesindexModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface ICountIkLandesindexWertQueryModel {
    IkLandesindexID: number;
    Jahr: number;
    Monat: number;
}
export class CountIkLandesindexWertQueryModel implements ICountIkLandesindexWertQueryModel {
    public IkLandesindexID: number;
    public Jahr: number;
    public Monat: number;
    constructor(data?: IIkLandesindexModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IIkLandesindexInsertModel {
    Jahr: number;
    Monat: number;
    Values: DictionaryLandesindex[];
}
export class IkLandesindexInsertModel implements IIkLandesindexInsertModel {
    public Jahr: number;
    public Monat: number;
    public Values: DictionaryLandesindex[];
    constructor(data?: IIkLandesindexModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
export interface IDictionaryLandesindex {
    Key: number;
    Value: number;
}
export class DictionaryLandesindex implements IDictionaryLandesindex {
    public Key: number;
    public Value: number;
    constructor(data?: IIkLandesindexModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}
