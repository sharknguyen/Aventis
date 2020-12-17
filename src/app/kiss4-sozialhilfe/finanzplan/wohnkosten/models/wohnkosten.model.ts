export interface BgFinanzplan {
  FaFallID: number;
  FaLeistungID: number;
  BgFinanzplanID: number;
  WhGrundbedarfTypCode: number;
  BgBewilligungStatusCode: number;
  FinanzplanVon: Date;
  FinanzplanBis: Date;
  AnpassenVon: Date;
  AnpassenBis: Date;
  LeistungDatumBis: Date;
}

export interface BgPositionsart {
  Code: number;
  Text: string;
  SortKey: number;
}

export interface BgGrundbedarf {
  bgBewilligungStatusCode: number;
}
