import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import { Subscription } from 'rxjs/rx';

import { Landesindex, ListItem, Wert } from './models';
import * as landesxindexStore from './store';
import * as LandesindexesAction from './store/actions/landesxindex.action';

@Injectable()
export class LandesxindexSandbox extends Sandbox {
  public landesxindexesData$ = this.landesxindexState$.select(
    landesxindexStore.getLandesxindexesData
  );
  // LandesindexWert
  public landesindexWertData$ = this.landesxindexState$.select(
    landesxindexStore.getLandesindexWertData
  );
  // select delete a row in top grid success
  public getLandesindexDeleteData$ = this.landesxindexState$.select(
    landesxindexStore.getLandesindexDeleteData
  );
  // select delete all rows in bottom grid success follow top grid
  public landesindexWertByIkLandesindexIDDeleteSuccess$ = this.landesxindexState$.select(
    landesxindexStore.getLandesindexWertByIkLandesindexIDDeletedSuccess
  );
  // delete a row in bottom grid
  public getLandesxindexWertDeleteData$ = this.landesxindexState$.select(
    landesxindexStore.getLandesxindexWertDeleteData
  );
  // update a row in top grid
  public getLandesxindexUpdatedData$ = this.landesxindexState$.select(
    landesxindexStore.getLandesxindexUpdateData
  );
  // Get wert
  public wertData$ = this.landesxindexState$.select(
    landesxindexStore.getWertsData
  );
  // Get IkLandesindex
  public IkLandesindexData$ = this.landesxindexState$.select(
    landesxindexStore.getIkLandesindexData
  );
  // Get CountIkLandesindexWert
  public CountIkLandesindexWertStateData$ = this.landesxindexState$.select(
    landesxindexStore.getCountIkLandesindexWertStateData
  );
  // Get NameIkLandesindex
  public NameIkLandesindexStateData$ = this.landesxindexState$.select(
    landesxindexStore.getNameIkLandesindexStateData
  );
  // Get AddIkLandesindexWert Data
  public AddIkLandesindexWertData$ = this.landesxindexState$.select(
    landesxindexStore.getAddIkLandesindexWertData
  );
  // Get Add Landesindes Data
  public AddLandesIndexData$ = this.landesxindexState$.select(
    landesxindexStore.getLandesxindexAddData
  );
  // Get Add LandesindesWert by LandesIndex Data
  public AddLandesIndexWertByLandesIndexData$ = this.landesxindexState$.select(
    landesxindexStore.getWertbyLandesIndexData
  );
  // get Update Wert when Insert
  public updateWertData$ = this.landesxindexState$.select(
    landesxindexStore.getUpdateWertData
  );
  // Get Add Wert Data
  public AddWertData$ = this.landesxindexState$.select(
    landesxindexStore.getAddDataWert
  );

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState$: Store<store.State>,
    private landesxindexState$: Store<landesxindexStore.LandesxindexState>
  ) {
    super(appState$);
  }

  public loadLandesindexes(): void {
    this.landesxindexState$.dispatch(new LandesindexesAction.LandesxindexInitData.LoadAction());
  }

  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // getLandesindexWert
  public loadLandesindexWert(ikLandesindexID: any): void {
    this.landesxindexState$.dispatch(new LandesindexesAction.GetLandesindexWertData.GetLandesindexWertAction(ikLandesindexID));
  }

  // delete a row in top grid
  public deleteLandesindex(data: Landesindex): void {
    this.landesxindexState$.dispatch(new LandesindexesAction.LandesindexDeleteData.DeleteAction(data));
  }

  // delete all rows in bottom grid follow by top grid
  public deleteLandesindexWertByIkLandesindexID(id: number): void {
    this.landesxindexState$.dispatch(new LandesindexesAction.LandesindexWertByIkLandesindexIdDeleteData.DeleteAction(id));
  }

  // Delete a row in bottom grid
  public deleteLandesindexWert(id: number): void {
    this.landesxindexState$.dispatch(new LandesindexesAction.LandesindexWertDeleteData.DeleteAction(id));
  }

  // Update a row in top grid
  public updateLandesindex(model: ListItem): void {
    this.landesxindexState$.dispatch(new LandesindexesAction.LandesindexesUpdateData.UpdateAction(model));

  }

  // Add LandesIndex
  public addLandesIndex(landesIndex: any): void {
    this.landesxindexState$.dispatch(new LandesindexesAction.AddGridTopData.AddLandesindexGridtopAction(landesIndex));
  }

  // Get IkLandesindex
  public getIkLandesindex(): void {
    this.landesxindexState$.dispatch(new LandesindexesAction.LoadIkLandesindex.LoadIkLandesindexAction());
  }

  // Get Wert
  public getWert(model: Wert): void {
    this.landesxindexState$.dispatch(new LandesindexesAction.GetWertInitData.GetWertAction(model));
  }

  // Add Wert by Landesindex
  public addWertByLandesIndex(landesindexWert: any): void {
    this.landesxindexState$.dispatch(new LandesindexesAction.AddWertByIkLandesindexData.AddWertByIkLandesindexAction(landesindexWert));
  }

  // Get CountIkLandesindexWert
  public getCountIkLandesindexWert(query: any): void {
    this.landesxindexState$.dispatch(new LandesindexesAction.LoadCountIkLandesindexWert.LoadCountIkLandesindexWertAction(query));
  }

  // Get NameIkLandesindex
  public getNameIkLandesindex(query: any): void {
    this.landesxindexState$.dispatch(new LandesindexesAction.LoadNameIkLandesindex.LoadNameIkLandesindexAction(query));
  }

  // Add IkLandesindexWert
  public addIkLandesindexWert(body: any): void {
    this.landesxindexState$.dispatch(new LandesindexesAction.AddLandesindexWertErfassen.AddLandesindexWertErfassenAction(body));
  }

  // Update Wert when Insert
  public updateWert(body: any): void {
    this.landesxindexState$.dispatch(new LandesindexesAction.UpdateWertInitData.UpdateWertAction(body));
  }

  // Add a Wert
  public addWert(body: any): void {
    this.landesxindexState$.dispatch(new LandesindexesAction.AddWertInitData.AddWertAction(body));
  }
}
