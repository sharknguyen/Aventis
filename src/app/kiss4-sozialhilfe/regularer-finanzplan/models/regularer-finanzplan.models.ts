export interface IPersonenInfo {
  bgFinanzplanID: number;
  baPersonID?: number;
  bgBewilligungStatusCode: number;
  finanzplanVon: Date;
  finanzplanBis?: Date;
  nameVorname: string;
  wohnsitzStrasseHausNr: string;
  wohnsitzPLZOrt: string;
  geburtsdatum?: Date;
  heimatort: string;
}
export interface IFinanzplan {
  BgFinanzplanID: number;
  FaLeistungID: number;
  BgBewilligungStatusCode: number;
  BgGrundEroeffnenCode?: any;
  BgGrundAbschlussCode: number;
  WhHilfeTypCode: number;
  GeplantVon: Date;
  GeplantBis: Date;
  DatumVon?: any;
  DatumBis?: any;
  Bemerkung: string;
  BgFinanzplanTS: string;
  WhGrundbedarfTypCode: number;
  FinanzplanVon: Date;
  FinanzplanBis: Date;
  FallDatumVon: Date;
  FallDatumBis?: any;
  upperGrund?: string;
  lowerGrund?: string;
  type?: string;
  berechnung?: string;
}
export interface ICheck {
  Typ: number;
  StatusInfo: string;
}
export interface IFinanzplanDropDown {
  code: number;
  text: string;
}

export interface IFinanzplanSaveParam {
  BgBudgetID?: number;
  BgBewilligungStatusCode: number;
  FaLeistungID: number;
  BgFinanzplanID: number;
  WhHilfeTypCode: number;
  WhGrundbedarfTypCodeIsModified: boolean; //
  GeplantVonIsModified: boolean; //
  GeplantBisIsModified: boolean; //
  WhGrundbedarfTypCode: number;
  GeplantVon: Date;
  GeplantBis?: Date;
  DatumVon: Date;
  DatumBis?: Date;
  BgFinanzplanTS: string;
  BgGrundEroeffnenCode: number;
  BgGrundAbschlussCode: number;
  Bemerkung: string;
}
