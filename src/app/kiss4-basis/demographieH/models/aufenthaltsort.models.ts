export interface IAufenthaltsort {
  BaAdresseID: number;
  BaPersonID: number;
  BaInstitutionID: number;
  UserID: number;
  PlatzierungInstID: number;
  VmMandantID: number;
  VmPriMaID: number;
  KaBetriebID: number;
  KaBetriebKontaktID: number;
  BaLandID: number;
  DatumVon: Date;
  DatumBis: Date;
  AusEinwohnerregister: boolean;
  Gesperrt: boolean;
  AdresseCode: number;
  CareOf: string;
  Zusatz: string;
  ZuhandenVon: string;
  Strasse: string;
  StrasseCode: number;
  HausNr: string;
  Postfach: string;
  PostfachOhneNr: boolean;
  PLZ: string;
  Ort: string;
  OrtschaftCode: number;
  Kanton: string;
  Bezirk: string;
  Bemerkung: string;
  InstitutionName: string;
  PlatzierungsartCode: number;
  WohnStatusCode: number;
  WohnungsgroesseCode: number;
  QuartierCode: number;
  MigrationKA: number;
  VerID: number;
  Creator: string;
  Created: Date;
  Modifier: string;
  Modified: Date;
  VerID_DELETED: number;
  PlatzierungInst: string;
  BaLandName: string;
}

export class Aufenthaltsort implements IAufenthaltsort {
  BaAdresseID: number;
  BaPersonID: number;
  BaInstitutionID: number;
  UserID: number;
  PlatzierungInstID: number;
  VmMandantID: number;
  VmPriMaID: number;
  KaBetriebID: number;
  KaBetriebKontaktID: number;
  BaLandID: number;
  DatumVon: Date;
  DatumBis: Date;
  AusEinwohnerregister: boolean;
  Gesperrt: boolean;
  AdresseCode: number;
  CareOf: string;
  Zusatz: string;
  ZuhandenVon: string;
  Strasse: string;
  StrasseCode: number;
  HausNr: string;
  Postfach: string;
  PostfachOhneNr: boolean;
  PLZ: string;
  Ort: string;
  OrtschaftCode: number;
  Kanton: string;
  Bezirk: string;
  Bemerkung: string;
  InstitutionName: string;
  PlatzierungsartCode: number;
  WohnStatusCode: number;
  WohnungsgroesseCode: number;
  QuartierCode: number;
  MigrationKA: number;
  VerID: number;
  Creator: string;
  Created: Date;
  Modifier: string;
  Modified: Date;
  VerID_DELETED: number;
  PlatzierungInst: string;
  BaLandName: string;
  constructor(data?: IAufenthaltsort) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
}
