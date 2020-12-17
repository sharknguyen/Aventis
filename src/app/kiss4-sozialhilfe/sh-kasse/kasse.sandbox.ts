import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/rx';
import { UtilService } from '@shared/utilites/utility.service';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as kasseAction from './store/actions/kasse.actions';
import * as store from '@shared/store';
import * as kasseStore from './store';

@Injectable()
export class KasseSandbox extends Sandbox {
  public kasseData$ = this.kasseState$.select(
    kasseStore.getKasseData
  );
  public dropDownData$ = this.kasseState$.select(
    kasseStore.getDropDownData
  );
  public KbBuchungUpdatedData$ = this.kasseState$.select(
    kasseStore.KbBuchungUpdatedDatas
  );
  public KbBuchungStatusUpdatedData$ = this.kasseState$.select(
    kasseStore.KbBuchungStatusUpdatedData
  );
  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState$: Store<store.State>,
    private kasseState$: Store<kasseStore.KasseState>,
    private utilService: UtilService
  ) {
    super(appState$);
  }

  /**
   * Loads kasse from the server
   */
  public loadKasseInitData(params?: any): void {
    this.kasseState$.dispatch(new kasseAction.KasseAction.LoadAction(params));
  }
    /**
   * Loads dropdown data from the server
   */
  public loadDropDownData(params?: any): void {
    this.kasseState$.dispatch(new kasseAction.DropDownAction.LoadAction(params));
  }
      /**
   * Update KbBuchung
   */
  public updateKbBuchung(params?: any): void {
    this.kasseState$.dispatch(new kasseAction.KbBuchungAction.UpdateAction(params));
  }
      /**
   * Update KbBuchung Status
   */
  public updateKbBuchungStatus(params?: any): void {
    this.kasseState$.dispatch(new kasseAction.KbBuchungStatusAction.UpdateAction(params));
  }
 /**
   * Reset State
   */
  public resetState(params?: any): void {
    this.kasseState$.dispatch(new kasseAction.KasseStateAction.ResetAction(params));
  }
  /**
   * Unsubscribes from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Subscribes to events
   */
  public registerEvents(): void {
  }

  /**
   * Clear store for sandbox Kasse
   */
  private clearStore() {
    kasseStore.getKasseData.release();
  }
}
