import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import { UtilService } from '@shared/utilites/utility.service';
import { Subscription } from 'rxjs';

import * as wohnkostenStore from './store';
import * as WohnkostenAction from './store/actions/wohnkosten.actions';

@Injectable()
export class WohnkostenSandbox extends Sandbox {
  public BgFinanzplanData$ = this.wohnkostenStoreState$.select(
    wohnkostenStore.getBgFinanzplanData
  );
  public BgGrundbedarfData$ = this.wohnkostenStoreState$.select(
    wohnkostenStore.getBgGrundbedarfData
  );
  public BgPositionsartData$ = this.wohnkostenStoreState$.select(
    wohnkostenStore.getBgPositionsartData
  );
  public BgPositionData$ = this.wohnkostenStoreState$.select(
    wohnkostenStore.getBgPositionData
  );
  public WhKennzahlenData$ = this.wohnkostenStoreState$.select(
    wohnkostenStore.getWhKennzahlenData
  );
  public deleteWohnkosten$ = this.wohnkostenStoreState$.select(
    wohnkostenStore.deleteWohnkosten
  );
  public updateWohnkostenPosition$ = this.wohnkostenStoreState$.select(
    wohnkostenStore.updateWohnkosten
  );
  public createWohnkostenPosition$ = this.wohnkostenStoreState$.select(
    wohnkostenStore.createWohnkosten
  );

  private subscriptions: Array<Subscription> = [];

  constructor(protected appState$: Store<store.State>,
    private wohnkostenStoreState$: Store<wohnkostenStore.WohnkostenState>,
    private utilService: UtilService) {
    super(appState$);
  }

  public loadBgFinanzplanStore(data: any): void {
    this.wohnkostenStoreState$.dispatch(new WohnkostenAction.BgFinanzplanDatas.LoadAction(data));
  }
  public loadBgGrundbedarfStore(data: any): void {
    this.wohnkostenStoreState$.dispatch(new WohnkostenAction.BgGrundbedarfDatas.LoadAction(data));
  }
  public loadBgPositionsartStore(query: any): void {
    this.wohnkostenStoreState$.dispatch(new WohnkostenAction.BgPositionsartDatas.LoadAction(query));
  }
  public loadBgPositionStore(data: any): void {
    this.wohnkostenStoreState$.dispatch(new WohnkostenAction.BgPositionDatas.LoadAction(data));
  }
  public loadWhKennzahlenStore(data: any): void {
    this.wohnkostenStoreState$.dispatch(new WohnkostenAction.WhKennzahlenDatas.LoadAction(data));
  }
  public loadRichtlinienStore(query: any): void {
    this.wohnkostenStoreState$.dispatch(new WohnkostenAction.RichtlinienDatas.LoadAction(query));
  }
  public deleteWohnkosten(query): void {
    this.wohnkostenStoreState$.dispatch(new WohnkostenAction.WohnkostenDeleteDatas.LoadAction(query));
  }
  public updateWohnkosten(query): void {
    this.wohnkostenStoreState$.dispatch(new WohnkostenAction.WohnkostenUpdateDatas.LoadAction(query));
  }
  public createWohnkosten(query): void {
    this.wohnkostenStoreState$.dispatch(new WohnkostenAction.WohnkostenCreateDatas.LoadAction(query));
  }

  /**
   * Unsubscribes from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
