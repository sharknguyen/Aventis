import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { MedGrundversorgungApiClient } from '../../med-grundversorgungApiClient.service';

@Injectable()
export class MedGrundversorgungEffects {

  constructor(private actions$: Actions,
    private medGrundversorgungApiClient: MedGrundversorgungApiClient) {
  }

}
