import {Injectable} from '@angular/core';
import {Sandbox} from '@shared/sandbox/base.sandbox';
import * as finanzplanStore from './store';
import * as store from '@shared/store';
import {Store, select} from '@ngrx/store';
import {Subscription} from '@node_modules/rxjs';
import * as finanzplanAction from '@app/kiss4-sozialhilfe/finanzplan/store/actions/finanzplan.action';
import {User} from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class FinanzplanSandbox extends Sandbox {

  public bgSilAHVBeitragData$ = this.finanzplanState$.select(
    finanzplanStore.getBgSilAHVBeitrag
  );

  public finanzplanData$ = this.finanzplanState$.pipe(
    select(
      finanzplanStore.getFinanzplanData
    )
  );

  private subscriptions: Array<Subscription> = [];
  constructor(
    protected appState$: Store<store.State>,
    private finanzplanState$: Store<finanzplanStore.FinanzplanState>
  ) {
    super(appState$);
  }
  /**
   * Unsubscribes from events
   */
  unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  /**
   * Subscribes to events
   */
  public registerEvents(): void {
    this.subscriptions.push(
      this.loggedUser$.subscribe((user: User) => {
        if (!user.isLoggedIn) {
          this.unregisterEvents();
          this.clearStore();
        }
      })
    );
  }
  public getBgSilAHVBeitrag(bgBudgetID): void {
    this.finanzplanState$.dispatch(new finanzplanAction.BgSilAHVBeitragDatas.LoadAction(bgBudgetID));
  }
  public getFinanzplan(bgBudgetID): void {
    this.finanzplanState$.dispatch(new finanzplanAction.FinanzplanDatas.LoadAction(bgBudgetID));
  }
  clearStore() {
    finanzplanStore.getBgSilAHVBeitrag.release();
    finanzplanStore.getFinanzplanData.release();
  }
}
