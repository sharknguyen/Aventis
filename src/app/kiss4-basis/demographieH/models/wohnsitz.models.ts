export interface IWohnsitz {
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
  datumVon: Date;
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
  WohnungsgroesseName: string;
  WohnStatusName: string;
  BaLandName: string;
}

export class Wohnsitz implements IWohnsitz {
  public BaAdresseID: number;
  public BaPersonID: number;
  public BaInstitutionID: number;
  public UserID: number;
  public PlatzierungInstID: number;
  public VmMandantID: number;
  public VmPriMaID: number;
  public KaBetriebID: number;
  public KaBetriebKontaktID: number;
  public BaLandID: number;
  public datumVon: Date;
  public DatumBis: Date;
  public AusEinwohnerregister: boolean;
  public Gesperrt: boolean;
  public AdresseCode: number;
  public CareOf: string;
  public Zusatz: string;
  public ZuhandenVon: string;
  public Strasse: string;
  public StrasseCode: number;
  public HausNr: string;
  public Postfach: string;
  public PostfachOhneNr: boolean;
  public PLZ: string;
  public Ort: string;
  public OrtschaftCode: number;
  public Kanton: string;
  public Bezirk: string;
  public Bemerkung: string;
  public InstitutionName: string;
  public PlatzierungsartCode: number;
  public WohnStatusCode: number;
  public WohnungsgroesseCode: number;
  public QuartierCode: number;
  public MigrationKA: number;
  public VerID: number;
  public Creator: string;
  public Created: Date;
  public Modifier: string;
  public Modified: Date;
  public VerID_DELETED: number;
  public WohnungsgroesseName: string;
  public WohnStatusName: string;
  public BaLandName: string;
  public constructor(data?: IWohnsitz) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];

        }
      }
    }
  }
}
