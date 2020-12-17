import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ZulagenEFBApiClient } from '@app/kiss4-sozialhilfe/finanzplan/zulagen-efb/zulagen-efbApiClient.service';
import * as actions from '@app/kiss4-sozialhilfe/finanzplan/zulagen-efb/store/actions/zulagen-efb.action';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { tryMapPathApi } from '@shared/utilites/utilityHelpers';

@Injectable()
export class ZulagenEFBEffect {
  constructor(
    private actions$: Actions,
    private zulagenEFBApiClient: ZulagenEFBApiClient) {
  }

  @Effect()
  getBgSilAHVBeitrag$ = this.actions$
    .ofType(actions.ZulagenEFBActionTypes.BgSilAHVBeitragTypes.LOAD)
    .pipe(
      map((action: actions.BgSilAHVBeitragDatas.LoadAction) => action.payload),
      switchMap(state => {
        return this.zulagenEFBApiClient
          .getBgSilAHVBeitrag(state)
          .pipe(
            map(
              berater => {
                return new actions.BgSilAHVBeitragDatas.LoadSuccessAction(
                  berater
                );
              }
            ),
            catchError(error =>
              of(new actions.BgSilAHVBeitragDatas.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  getCombobox$ = this.actions$
    .ofType(actions.ZulagenEFBActionTypes.ComboboxDatasTypes.LOAD)
    .pipe(
      map((action: actions.ZulagenComboboxInitDatas.LoadAction) => action.payload),
      switchMap((state: any) => {
        const query = tryMapPathApi(state);
        return this.zulagenEFBApiClient
          .getDataCombobx(query)
          .pipe(
            map(
              zulagens =>
                new actions.ZulagenComboboxInitDatas.LoadSuccessAction(
                  zulagens
                )
            ),
            catchError(error =>
              of(new actions.ZulagenComboboxInitDatas.LoadFailAction(error))
            ));
      }));


  @Effect()
  getBgPosition$ = this.actions$
    .ofType(actions.ZulagenEFBActionTypes.BgPositionTypes.LOAD)
    .pipe(
      map((action: actions.BgPositionDatas.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.zulagenEFBApiClient
          .getBgPosition(query)
          .pipe(
            map(
              bgPosition => {
                return new actions.BgPositionDatas.LoadSuccessAction(
                  bgPosition
                );
              }
            ),
            catchError(error =>
              of(new actions.BgPositionDatas.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  getRichtLinie$ = this.actions$
    .ofType(actions.ZulagenEFBActionTypes.RichtLinieTypes.LOAD)
    .pipe(
      map((action: actions.RichtLinieDatas.LoadAction) => action.payload),
      switchMap(state => {
        // const query = tryMapPathApi(state);
        return this.zulagenEFBApiClient
          .getRichtLinie(state)
          .pipe(
            map(
              richtLinie => {
                return new actions.RichtLinieDatas.LoadSuccessAction(
                  richtLinie
                );
              }
            ),
            catchError(error =>
              of(new actions.RichtLinieDatas.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  getBgPositionsart$ = this.actions$
    .ofType(actions.ZulagenEFBActionTypes.BgPositionsartTypes.LOAD)
    .pipe(
      map((action: actions.BgPositionsartDatas.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.zulagenEFBApiClient
          .getBgPositionsart(query)
          .pipe(
            map(
              richtLinie => {
                return new actions.BgPositionsartDatas.LoadSuccessAction(
                  richtLinie
                );
              }
            ),
            catchError(error =>
              of(new actions.BgPositionsartDatas.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  getBgPositionsartId$ = this.actions$
    .ofType(actions.ZulagenEFBActionTypes.BgPositionsartIdTypes.LOAD)
    .pipe(
      map((action: actions.BgPositionsartIdDatas.LoadAction) => action.payload),
      switchMap(state => {
        const query = tryMapPathApi(state);
        return this.zulagenEFBApiClient
          .getBgPositionsartId(query)
          .pipe(
            map(
              bgPositionsartId => {
                return new actions.BgPositionsartIdDatas.LoadSuccessAction(
                  bgPositionsartId
                );
              }
            ),
            catchError(error =>
              of(new actions.BgPositionsartIdDatas.LoadFailAction(error))
            ));
      })
    );

  @Effect()
  saveBgPosition$ = this.actions$
    .ofType(actions.ZulagenEFBActionTypes.BgPositionUpdateTypes.PUT)
    .pipe(
      map((action: actions.BgPositionUpdateDatas.UpdadeAction) => action.payload),
      concatMap((body: any) => {
        if (body && body.bgPositionID) {
          return this.zulagenEFBApiClient
            .updateBgPosition(body).pipe(
              map((data) =>
                new actions.BgPositionUpdateDatas.UpdateSuccessAction(data)
              ),
              catchError(error =>
                of(new actions.BgPositionUpdateDatas.UpdateFailAction(error))
              ));
        } else {
          return this.zulagenEFBApiClient
            .saveBgPosition(body).pipe(
              map((data) =>
                new actions.BgPositionUpdateDatas.UpdateSuccessAction(data)
              ),
              catchError(error =>
                of(new actions.BgPositionUpdateDatas.UpdateFailAction(error))
              ));

        }
      })
    );

}
