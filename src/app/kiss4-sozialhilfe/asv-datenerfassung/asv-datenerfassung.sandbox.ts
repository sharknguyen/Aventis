import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/rx';
import { UtilService } from '@shared/utilites/utility.service';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as AsvDatenerfassungAction from './store/actions/asv-datenerfassung.actions';
import * as store from '@shared/store';
import * as asvDatenerfassungStore from './store';

@Injectable()
export class AsvDatenerfassungSandbox extends Sandbox {
  public asvDatenerfassungData$ = this.asvDatenerfassungState$.select(
    asvDatenerfassungStore.getAsvDatenerfassungData
  );

  public asvDatenerfassungComboboxData$ = this.asvDatenerfassungState$.select(
    asvDatenerfassungStore.getComboboxAsvDatenerfassungData
  );

  public asvDatenerfassungInsert$ = this.asvDatenerfassungState$.select(
    asvDatenerfassungStore.asvDatenerfassungInsert
  );

  public asvDatenerfassungUpdate$ = this.asvDatenerfassungState$.select(
    asvDatenerfassungStore.asvDatenerfassungUpdate
  );

  public asvDatenerfassungDelete$ = this.asvDatenerfassungState$.select(
    asvDatenerfassungStore.asvDatenerfassungDelete
  );
  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState$: Store<store.State>,
    private asvDatenerfassungState$: Store<asvDatenerfassungStore.AsvDatenerfassungState>,
    private utilService: UtilService
  ) {
    super(appState$);
  }

  /**
   * Loads AsvDatenerfassung from the server
   */
  public loadAsvDatenerfassungInitData(params?: any): void {
    this.asvDatenerfassungState$.dispatch(new AsvDatenerfassungAction.AsvDatenerfassungAction.LoadAction(params));
  }
  /**
   * Loads Combobox AsvDatenerfassung from the server
   */
  public loadComboboxAsvDatenerfassungData(params?: any): void {
    this.asvDatenerfassungState$.dispatch(new AsvDatenerfassungAction.AsvDatenerfassungComboboxAction.LoadAction(params));
  }
  /**
   * Insert New Row
   */
  public asvDatenerfassungInsert(params?: any): void {
    this.asvDatenerfassungState$.dispatch(new AsvDatenerfassungAction.AsvDatenerfassungInsertAction.LoadAction(params));
  }
  /**
   * Update
   */
  public asvDatenerfassungUpdate(params?: any): void {
    this.asvDatenerfassungState$.dispatch(new AsvDatenerfassungAction.AsvDatenerfassungUpdateAction.LoadAction(params));
  }
  /**
   * Delete
   */
  public asvDatenerfassungDelete(params?: any): void {
    this.asvDatenerfassungState$.dispatch(new AsvDatenerfassungAction.AsvDatenerfassungDeleteAction.DeleteAction(params));
  }
 /**
   * Reset State
   */
  public resetState(params?: any): void {
    this.asvDatenerfassungState$.dispatch(new AsvDatenerfassungAction.AsvDatenerfassungStateAction.ResetAction(params));
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
   * Clear store for sandbox AsvDatenerfassung
   */
  private clearStore() {
    asvDatenerfassungStore.getAsvDatenerfassungData.release();
  }
}
