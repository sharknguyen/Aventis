export interface BgErwerbseinkommenTitle {
    BgFinanzplanID: number;
    FinanzplanVon: Date;
    FinanzplanBis: Date;
}

export interface BgErwerbseinkommenPersonDropdown {
    BaPersonID?: number;
    NameVorname: string;
    Name: string;
    Vorname: string;
    LT: number;
}

export interface BgErwerbseinkommenDropdown {
    BgPositionsartID: number;
    Name: string;
    Code: number;
    Text: string;
    HilfeText: string;
    VerwaltungSD_Default: string;
}

export class BgErwerbseinkommenTitles implements BgErwerbseinkommenTitle {
    public BgFinanzplanID: number;
    public FinanzplanVon: Date;
    public FinanzplanBis: Date;
    constructor(data?: BgErwerbseinkommenTitle) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data[property]);
                }
            }
        }
    }
}

export class BgErwerbseinkommenPersonDropdowns implements BgErwerbseinkommenPersonDropdown {
    public BaPersonID?: number;
    public NameVorname: string;
    public Name: string;
    public Vorname: string;
    public LT: number;
    constructor(data?: BgErwerbseinkommenPersonDropdown) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data[property]);
                }
            }
        }
    }
}

export class BgErwerbseinkommenDropdowns implements BgErwerbseinkommenDropdown {
    public BgPositionsartID: number;
    public Name: string;
    public Code: number;
    public Text: string;
    public HilfeText: string;
    public VerwaltungSD_Default: string;
    constructor(data?: BgErwerbseinkommenDropdown) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data[property]);
                }
            }
        }
    }
}
