import { Injectable } from '@angular/core';
import { Kontakt, Institution, BaInstitutionKontakt, Language } from './models';

@Injectable()
export class BeraterService {
  constructor() {
  }
  static gridAdapter(result: any): Kontakt[] {
    return result.map((kontakt, index) => new Kontakt({...kontakt, id: index + 1}));
  }

  // VDHoan start service
  static getKontakt(result: any): Kontakt[] {
    return result.map(i => new Kontakt(i));
  }

  static getInstitution(result: any): Institution[] {
    return result.map((i, index) => new Institution({...i, index}));
  }

  static getLanguage(result: any): Language[] {
    return result.map(i => new Language(i));
  }

  static saveBaInstitutionKontakt(result: any): BaInstitutionKontakt {
    return new BaInstitutionKontakt(result);
  }

  static deleteBaInstitutionKontakt(result: any): BaInstitutionKontakt {
    return new BaInstitutionKontakt(result);
  }
  // VDHoan end service
}
