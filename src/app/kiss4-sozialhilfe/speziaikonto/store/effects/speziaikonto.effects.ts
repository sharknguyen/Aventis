import { Injectable } from '@angular/core';
// rxjs
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { SpezialkontoApiClient } from '../../speziaikonto.ApiClient.service';
import * as actions from '../actions/speziaikonto.actions';


@Injectable()
export class SpezialkontoEffects {

  constructor(
    private actions$: Actions,
    private rechtstitelApiClient: SpezialkontoApiClient) { }

  //  Load data Grid
  @Effect()
  getMasterData$ = this.actions$
    .ofType(actions.SpezialkontoActionTypes.MasterCCBDatasTypes.LOAD)
    .pipe(
      map((action: actions.MasterDataCbxDatas.LoadMasterDataCbxAction) => action.payload),
      switchMap(() => {
        return this.rechtstitelApiClient
          .getMasterDataCbx()
          .pipe(
            map(
              speziaikonto =>
                new actions.MasterDataCbxDatas.LoadMasterDataCbxSuccessAction(
                  speziaikonto
                )
            ),
            catchError(error =>
              of(new actions.MasterDataCbxDatas.LoadMasterDataCbxFailAction(error))
            ));
      }));

  // Load Data Grid Top
  @Effect()
  getDataGridTop$ = this.actions$
    .ofType(actions.SpezialkontoActionTypes.LoadGridTopDatasTypes.LOAD)
    .pipe(
      map((action: actions.LoadGridTopDatas.LoadGridToAction) => action.payload),
      switchMap((state: any) => {
        const query = tryMapPathApi(state);
        return this.rechtstitelApiClient
          .loadDataGridTop(query)
          .pipe(
            map(item => new actions.LoadGridTopDatas.LoadGridTopSuccessAction(item)),
            catchError(error => of(new actions.LoadGridTopDatas.LoadGridTopFailAction(error)))
          );
      }));

  // Load data grid detail
  @Effect()
  getDataDetailGrid$ = this.actions$
    .ofType(actions.SpezialkontoActionTypes.LoadGridDetailDatasTypes.LOAD)
    .pipe(
      map((action: actions.LoadGridDetailDatas.LoadAction) => action.payload),
      switchMap((state: any) => {
        const query = tryMapPathApi(state);
        return this.rechtstitelApiClient
          .loadDataGridDetail(query)
          .pipe(
            map(item => new actions.LoadGridDetailDatas.LoadSuccessAction(item)),
            catchError(error => of(new actions.LoadGridDetailDatas.LoadFailAction(error)))
          );
      }));

  // Load Ba Person
  @Effect()
  getBaPeson$ = this.actions$
    .ofType(actions.SpezialkontoActionTypes.LoadBaPersonDatasTypes.LOAD)
    .pipe(
      map((action: actions.LoadBaPersonDatas.LoadAction) => action.payload),
      switchMap((state: any) => {
        return this.rechtstitelApiClient
          .loadBaPerson(state)
          .pipe(
            map(item => new actions.LoadBaPersonDatas.LoadSuccessAction(item)),
            catchError(error => of(new actions.LoadBaPersonDatas.LoadFailAction(error)))
          );
      }));

  // Load data BgKostenart
  @Effect()
  getBgKostenart$ = this.actions$
    .ofType(actions.SpezialkontoActionTypes.LoadBgKostenartDatasTypes.LOAD)
    .pipe(
      map((action: actions.LoadBgKostenartDatas.LoadAction) => action.payload),
      switchMap((state: any) => {
        const query = tryMapPathApi(state);
        return this.rechtstitelApiClient
          .loadBgKostenart(query)
          .pipe(
            map(item => new actions.LoadBgKostenartDatas.LoadSuccessAction(item)),
            catchError(error => of(new actions.LoadBgKostenartDatas.LoadFailAction(error)))
          );
      }));

  // Load Datum Von
  @Effect()
  getDatumVon$ = this.actions$
    .ofType(actions.SpezialkontoActionTypes.LoadDatumVonDatasTypes.LOAD)
    .pipe(
      map((action: actions.LoadDatumVonDatas.LoadAction) => action.payload),
      switchMap((state: any) => {
        return this.rechtstitelApiClient
          .loadDatumVon(state)
          .pipe(
            map(item => new actions.LoadDatumVonDatas.LoadSuccessAction(item)),
            catchError(error => of(new actions.LoadDatumVonDatas.LoadFailAction(error)))
          );
      }));

  // Load BgPosArt
  @Effect()
  getBgPosArt$ = this.actions$
    .ofType(actions.SpezialkontoActionTypes.LoadBgPosArtDatasTypes.LOAD)
    .pipe(
      map((action: actions.LoadBgPosArtDatas.LoadAction) => action.payload),
      switchMap((state: any) => {
        return this.rechtstitelApiClient
          .loadBgPosArt(state)
          .pipe(
            map(item => new actions.LoadBgPosArtDatas.LoadSuccessAction(item)),
            catchError(error => of(new actions.LoadBgPosArtDatas.LoadFailAction(error)))
          );
      }));

  // Create
  @Effect()
  createSpeziaikonto$ = this.actions$
    .ofType(actions.SpezialkontoActionTypes.CreateDatasTypes.LOAD)
    .pipe(
      map((action: actions.CreateDatas.LoadAction) => action.payload),
      concatMap((state: any) => {
        return this.rechtstitelApiClient
          .createSpeziaikonto(state)
          .pipe(
            map(item => new actions.CreateDatas.LoadSuccessAction(item)),
            catchError(error => of(new actions.CreateDatas.LoadFailAction(error)))
          );
      }));

  // Edit
  @Effect()
  editSpeziaikonto$ = this.actions$
    .ofType(actions.SpezialkontoActionTypes.EditDatasTypes.LOAD)
    .pipe(
      map((action: actions.EditDatas.LoadAction) => action.payload),
      concatMap((state: any) => {
        return this.rechtstitelApiClient.editSpeziaikonto(state, state.BgSpezkontoID, state.Saldo)
          .pipe(
            map(speziaikonto => new actions.EditDatas.LoadSuccessAction(speziaikonto)),
            catchError(error => of(new actions.EditDatas.LoadFailAction(error))));
      }));

  // Delete
  @Effect()
  deleteSpeziaikonto$ = this.actions$
    .ofType(actions.SpezialkontoActionTypes.DeleteDatasTypes.LOAD)
    .pipe(
      map((action: actions.DeleteDatas.LoadAction) => action.payload),
      concatMap((state: any) => {
        return this.rechtstitelApiClient
          .deleteSpeziaikonto(state)
          .pipe(
            map(item => new actions.DeleteDatas.LoadSuccessAction(item)),
            catchError(error => of(new actions.DeleteDatas.LoadFailAction(error)))
          );
      }));

  // Load Positionsarten
  @Effect()
  getPositionsarten$ = this.actions$
    .ofType(actions.SpezialkontoActionTypes.LoadPositionsartenDatasTypes.LOAD)
    .pipe(
      map((action: actions.LoadPositionsartenDatas.LoadAction) => action.payload),
      switchMap(() => {
        return this.rechtstitelApiClient
          .getPositionsarten()
          .pipe(
            map(
              speziaikonto =>
                new actions.LoadPositionsartenDatas.LoadSuccessAction(
                  speziaikonto
                )
            ),
            catchError(error =>
              of(new actions.LoadPositionsartenDatas.LoadFailAction(error))
            ));
      }));

  // Load Positionsarten
  @Effect()
  getAbschliessenVisible$ = this.actions$
    .ofType(actions.SpezialkontoActionTypes.AbschliessenVisibleDatasTypes.LOAD)
    .pipe(
      map((action: actions.LoadAbschliessenVisible.LoadAction) => action.payload),
      switchMap(() => {
        return this.rechtstitelApiClient
          .getAbschliessenVisible()
          .pipe(
            map(
              speziaikonto =>
                new actions.LoadAbschliessenVisible.LoadSuccessAction(
                  speziaikonto
                )
            ),
            catchError(error =>
              of(new actions.LoadAbschliessenVisible.LoadFailAction(error))
            ));
      }));

  // Load MaxSanktion
  @Effect()
  getMaxSanktion$ = this.actions$
    .ofType(actions.SpezialkontoActionTypes.MaxSanktionDatasTypes.LOAD)
    .pipe(
      map((action: actions.MaxSanktion.LoadAction) => action.payload),
      switchMap(() => {
        return this.rechtstitelApiClient
          .getMaxSanktion()
          .pipe(
            map(
              speziaikonto =>
                new actions.MaxSanktion.LoadSuccessAction(
                  speziaikonto
                )
            ),
            catchError(error =>
              of(new actions.MaxSanktion.LoadFailAction(error))
            ));
      }));

  @Effect()
  KontoWirdNichtAusgeglichen$ = this.actions$
    .ofType(actions.SpezialkontoActionTypes.KontoWirdNichtAusgeglichenTypes.LOAD)
    .pipe(
      map((action: actions.KontoWirdNichtAusgeglichen.LoadAction) => action.payload),
      concatMap((state: any) => {
        return this.rechtstitelApiClient
          .getKontoWirdNichtAusgeglichen(state)
          .pipe(
            map(
              speziaikonto =>
                new actions.KontoWirdNichtAusgeglichen.LoadSuccessAction(
                  speziaikonto
                )
            ),
            catchError(error =>
              of(new actions.KontoWirdNichtAusgeglichen.LoadFailAction(error))
            ));
      }));


  @Effect()
  getUebergabeAnInkasso$ = this.actions$
    .ofType(actions.SpezialkontoActionTypes.UebergabeAnInkassoTypes.LOAD)
    .pipe(
      map((action: actions.UebergabeAnInkasso.LoadAction) => action.payload),
      concatMap((state: any) => {
        return this.rechtstitelApiClient
          .getUebergabeAnInkasso(state)
          .pipe(
            map(
              speziaikonto =>
                new actions.UebergabeAnInkasso.LoadSuccessAction(
                  speziaikonto
                )
            ),
            catchError(error =>
              of(new actions.UebergabeAnInkasso.LoadFailAction(error))
            ));
      }));


  @Effect()
  getAbschliessenUndo$ = this.actions$
    .ofType(actions.SpezialkontoActionTypes.AbschliessenUndoTypes.LOAD)
    .pipe(
      map((action: actions.AbschliessenUndo.LoadAction) => action.payload),
      concatMap((state: any) => {
        return this.rechtstitelApiClient
          .getAbschliessenUndo(state)
          .pipe(
            map(
              speziaikonto =>
                new actions.AbschliessenUndo.LoadSuccessAction(
                  speziaikonto
                )
            ),
            catchError(error =>
              of(new actions.AbschliessenUndo.LoadFailAction(error))
            ));
      }));

  @Effect()
  getAbschliessenEditierbar$ = this.actions$
    .ofType(actions.SpezialkontoActionTypes.AbschliessenEditierbarTypes.LOAD)
    .pipe(
      map((action: actions.AbschliessenEditierbar.LoadAction) => action.payload),
      switchMap((state: any) => {
        return this.rechtstitelApiClient
          .getConfigEditierbar()
          .pipe(
            map(
              speziaikonto =>
                new actions.AbschliessenEditierbar.LoadSuccessAction(
                  speziaikonto
                )
            ),
            catchError(error =>
              of(new actions.AbschliessenEditierbar.LoadFailAction(error))
            ));
      }));

  // Update Kuzungen
  @Effect()
  updateKuzungen$ = this.actions$
    .ofType(actions.SpezialkontoActionTypes.UpdateKuzungenTypes.LOAD)
    .pipe(
      map((action: actions.UpdateKuzungen.LoadAction) => action.payload),
      concatMap((state: any) => {
        return this.rechtstitelApiClient.updateKuzung(state, state.BgSpezkontoID, state.Saldo, state.Inaktiv)
          .pipe(
            map(speziaikonto => new actions.UpdateKuzungen.LoadSuccessAction(speziaikonto)),
            catchError(error => of(new actions.UpdateKuzungen.LoadFailAction(error))));
      }));

  // create Kuzungen
  @Effect()
  createKuzungen$ = this.actions$
    .ofType(actions.SpezialkontoActionTypes.CreateKuzungenTypes.LOAD)
    .pipe(
      map((action: actions.CreateKuzungen.LoadAction) => action.payload),
      concatMap((state: any) => {
        return this.rechtstitelApiClient.createKuzung(state, state.Inaktiv)
          .pipe(
            map(speziaikonto => new actions.CreateKuzungen.LoadSuccessAction(speziaikonto)),
            catchError(error => of(new actions.CreateKuzungen.LoadFailAction(error))));
      }));

}

