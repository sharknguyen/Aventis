import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import * as rechtstitelStore from './store';
import * as rechtstitelAction from './store/actions/speziaikonto.actions';

@Injectable()
export class SpezialkontoSandbox extends Sandbox {
  public cbxMasterData$ = this.speziaikontoState$.select(rechtstitelStore.getMasterDataCBB);
  public loadDataGridTop$ = this.speziaikontoState$.select(rechtstitelStore.getDataGridTop);
  public loadDataGridDetail$ = this.speziaikontoState$.select(rechtstitelStore.getDataGridDetail);
  public loadBaPerson$ = this.speziaikontoState$.select(rechtstitelStore.getBaPerson);
  public loadBgKostenart$ = this.speziaikontoState$.select(rechtstitelStore.getBgKostenart);
  public loadDatumVon$ = this.speziaikontoState$.select(rechtstitelStore.getDatumVon);
  public loadBgPosArt$ = this.speziaikontoState$.select(rechtstitelStore.getBgPosArt);
  public createSpeziaikonto$ = this.speziaikontoState$.select(rechtstitelStore.createSpeziaikonto);
  public editSpeziaikonto$ = this.speziaikontoState$.select(rechtstitelStore.editSpeziaikonto);
  public editSpeziaikontoFails$ = this.speziaikontoState$.select(rechtstitelStore.editSpeziaikontoFails);
  public deleteSpeziaikonto$ = this.speziaikontoState$.select(rechtstitelStore.deleteSpeziaikonto);
  public deleteSpeziaikontoFails$ = this.speziaikontoState$.select(rechtstitelStore.deleteSpeziaikontoFails);
  public loadPositionsarten$ = this.speziaikontoState$.select(rechtstitelStore.getPositionsarten);
  public loadAbschliessenVisible$ = this.speziaikontoState$.select(rechtstitelStore.getAbschliessenVisible);
  public maxSanktione$ = this.speziaikontoState$.select(rechtstitelStore.getMaxSanktion);
  public abschliessenUndo$ = this.speziaikontoState$.select(rechtstitelStore.getAbschliessenUndo);
  public abschliessenUndoFails$ = this.speziaikontoState$.select(rechtstitelStore.editAbschliessenUndoFails);
  public getKontoWirdNichtAusgeglichen$ = this.speziaikontoState$.select(rechtstitelStore.getKontoWirdNichtAusgeglichen);
  public getKontoWirdNichtAusgeglichenFalis$ = this.speziaikontoState$.select(rechtstitelStore.getKontoWirdNichtAusgeglichenFails);
  public getUebergabeAnInkasso$ = this.speziaikontoState$.select(rechtstitelStore.getUebergabeAnInkasso);
  public getUebergabeAnInkassoFails$ = this.speziaikontoState$.select(rechtstitelStore.getUebergabeAnInkassoFails);
  public getabschliessenEditbar$ = this.speziaikontoState$.select(rechtstitelStore.getAbschliessenEditbar);
  public updateKuzungen$ = this.speziaikontoState$.select(rechtstitelStore.updateKuzungen);
  public createKuzungen$ = this.speziaikontoState$.select(rechtstitelStore.createKuzungen);


  constructor(
    protected appState$: Store<store.State>,
    private speziaikontoState$: Store<rechtstitelStore.SpezialkontoState>,
  ) {
    super(appState$);
  }

  /**
   * Loads rechtstitels from the server
   */

  // get Master data combobox
  public getMasterDataCombobox(): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.MasterDataCbxDatas.LoadMasterDataCbxAction());
  }

  // Load Data Grid Top
  public loadDataGrid(data: any): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.LoadGridTopDatas.LoadGridToAction(data));
  }

  // Load Data Grid Detail
  public loadDataGridDetail(data: any): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.LoadGridDetailDatas.LoadAction(data));
  }

  // Load BaPerson
  public loadBaPerson(data: any): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.LoadBaPersonDatas.LoadAction(data));
  }

  // Load BgKostenart
  public loadBgKostenart(data: any): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.LoadBgKostenartDatas.LoadAction(data));
  }

  // Load DatumVon
  public loadDatumVon(data: any): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.LoadDatumVonDatas.LoadAction(data));
  }

  // Load BgPosArt
  public loadBgPosArt(data: any): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.LoadBgPosArtDatas.LoadAction(data));
  }

  // Create
  public createSpeziaikonto(data: any): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.CreateDatas.LoadAction(data));
  }

  // Edit
  public editSpeziaikonto(data: any): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.EditDatas.LoadAction(data));
  }

  // Delete
  public deleteSpeziaikonto(data: any): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.DeleteDatas.LoadAction(data));
  }

  // Load Positionsarten
  public loadPositionsarten(): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.LoadPositionsartenDatas.LoadAction());
  }

  // Load AbschliessenVisible
  public loadAbschliessenVisible(): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.LoadAbschliessenVisible.LoadAction());
  }

  //  Reset
  public reset(): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.Reset.LoadAction());
  }
  // Load MaxSanktion
  public maxSanktion(): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.MaxSanktion.LoadAction());
  }

  // Load MaxSanktion
  public loadAbschliessenUndo(data): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.AbschliessenUndo.LoadAction(data));
  }

  public loadKontoWirdNichtAusgeglichen(data): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.KontoWirdNichtAusgeglichen.LoadAction(data));
  }

  public loadUebergabeAnInkasso(data): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.UebergabeAnInkasso.LoadAction(data));
  }

  public loadAbschliessenEditbar(): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.AbschliessenEditierbar.LoadAction());
  }

  // Update Kuzungen
  public updateKuzungen(data: any): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.UpdateKuzungen.LoadAction(data));
  }

  // Create Kuzungen
  public createKuzungen(data: any): void {
    this.speziaikontoState$.dispatch(new rechtstitelAction.CreateKuzungen.LoadAction(data));
  }
}
