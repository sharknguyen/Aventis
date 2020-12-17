import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';

import { KontoauszugQueryModel } from './models';
import * as kontoauszugStore from './store';
import * as kontoauszugAction from './store/actions/kontoauszug.actions';

@Injectable()
export class KontoauszugSandbox extends Sandbox {
  // Get Personnen
  public getPersonnen$ = this.kontoauszugState$.select(kontoauszugStore.getPersonnen);
  public getPersonnenLoading$ = this.kontoauszugState$.select(kontoauszugStore.getPersonnenLoading);
  public getPersonnenLoaded$ = this.kontoauszugState$.select(kontoauszugStore.getPersonnenLoaded);
  public getPersonnenFailed$ = this.kontoauszugState$.select(kontoauszugStore.getPersonnenFailed);

  // Get Personnen
  public getZeitraum$ = this.kontoauszugState$.select(kontoauszugStore.getZeitraum);
  public getZeitraumLoading$ = this.kontoauszugState$.select(kontoauszugStore.getZeitraumLoading);
  public getZeitraumLoaded$ = this.kontoauszugState$.select(kontoauszugStore.getZeitraumLoaded);
  public getZeitraumFailed$ = this.kontoauszugState$.select(kontoauszugStore.getZeitraumFailed);

  // Get Personnen
  public getKostenart$ = this.kontoauszugState$.select(kontoauszugStore.getKostenart);
  public getKostenartLoading$ = this.kontoauszugState$.select(kontoauszugStore.getKostenartLoading);
  public getKostenartLoaded$ = this.kontoauszugState$.select(kontoauszugStore.getKostenartLoaded);
  public getKostenartFailed$ = this.kontoauszugState$.select(kontoauszugStore.getKostenartFailed);

  // Search Kontoauszug
  public searchKontoauszug$ = this.kontoauszugState$.select(kontoauszugStore.searchKontoauszug);
  public searchKontoauszugLoading$ = this.kontoauszugState$.select(kontoauszugStore.searchKontoauszugLoading);
  public searchKontoauszugLoaded$ = this.kontoauszugState$.select(kontoauszugStore.searchKontoauszugLoaded);
  public searchKontoauszugFailed$ = this.kontoauszugState$.select(kontoauszugStore.searchKontoauszugFailed);

  // Get LovLookups
  public getLovLookups$ = this.kontoauszugState$.select(kontoauszugStore.getLovLookups);
  public getLovLookupsLoading$ = this.kontoauszugState$.select(kontoauszugStore.getLovLookupsLoading);
  public getLovLookupsLoaded$ = this.kontoauszugState$.select(kontoauszugStore.getLovLookupsLoaded);
  public getLovLookupsFailed$ = this.kontoauszugState$.select(kontoauszugStore.getLovLookupsFailed);

  constructor(
    protected appState$: Store<store.State>,
    private kontoauszugState$: Store<kontoauszugStore.IKontoauszugState>
  ) {
    super(appState$);
  }

  public getPersonnen(params?: any): void {
    this.kontoauszugState$.dispatch(new kontoauszugAction.GetPersonnenAction.LoadAction(params));
  }

  public getZeitraum(): void {
    this.kontoauszugState$.dispatch(new kontoauszugAction.GetZeitraumAction.LoadAction());
  }

  public getKostenart(): void {
    this.kontoauszugState$.dispatch(new kontoauszugAction.GetKostenartAction.LoadAction());
  }

  public searchKontoauszug(payload?: KontoauszugQueryModel): void {
    this.kontoauszugState$.dispatch(new kontoauszugAction.SearchKontoauszugAction.LoadAction(payload));
  }

  public getLovLookups(payload?: any): void {
    this.kontoauszugState$.dispatch(new kontoauszugAction.GetLovLookupsAction.LoadAction(payload));
  }

  public resetKontoauszugState(): void {
    this.kontoauszugState$.dispatch(new kontoauszugAction.ResetStateAction());
  }
}
