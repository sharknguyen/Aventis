import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Sandbox} from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import * as zulagenEFBStore from './store';
import * as zulagenEfbAction from './store/actions/zulagen-efb.action';
import {User} from '@shared/models';
import {combineLatest, Subscription} from 'rxjs';

@Injectable()
export class ZulagenEFBSandbox extends Sandbox {
  public bgSilAHVBeitragData$ = this.zulagenEfbState$.select(
    zulagenEFBStore.getBgSilAHVBeitrag
  );
  public comBoBoxData$ = this.zulagenEfbState$.select(
    zulagenEFBStore.getComboboxgData
  );
  public bgPositionData$ = this.zulagenEfbState$.select(
    zulagenEFBStore.getBgPositionData
  );
  public bgPositionsartData$ = this.zulagenEfbState$.select(
    zulagenEFBStore.getBgPositionsartData
  );
  public bgPositionsartIdData$ = this.zulagenEfbState$.select(
    zulagenEFBStore.getBgPositionsartIdData
  );

  public richtLinieData$ = this.zulagenEfbState$.select(
    zulagenEFBStore.getRichtLinieData
  );

  public updateBgPositionData$ = combineLatest(
    this.zulagenEfbState$.select(zulagenEFBStore.getBgPositionUpdatedSuccess),
    this.zulagenEfbState$.select(zulagenEFBStore.getBgPositionUpdatedFaild)
  );

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState$: Store<store.State>,
    private zulagenEfbState$: Store<zulagenEFBStore.ZulagenEFBState>
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
    this.zulagenEfbState$.dispatch(new zulagenEfbAction.BgSilAHVBeitragDatas.LoadAction(bgBudgetID));
  }

  // get Data Combobox
  public getDataCombobox(data: any): void {
    this.zulagenEfbState$.dispatch(new zulagenEfbAction.ZulagenComboboxInitDatas.LoadAction(data));
  }

  public getBgPosition(query): void {
    this.zulagenEfbState$.dispatch(new zulagenEfbAction.BgPositionDatas.LoadAction(query));
  }

  // get Richtlinie data
  public getRichtLinie(query): void {
    this.zulagenEfbState$.dispatch(new zulagenEfbAction.RichtLinieDatas.LoadAction(query));
  }

  // get sqlRichtlinie data
  public getBgPositionsart(query): void {
    this.zulagenEfbState$.dispatch(new zulagenEfbAction.BgPositionsartDatas.LoadAction(query));
  }

  // get sqlRichtlinie data
  public getBgPositionsartId(query): void {
    this.zulagenEfbState$.dispatch(new zulagenEfbAction.BgPositionsartIdDatas.LoadAction(query));
  }

  // update bgPosition data
  public updateBgPosition(data): void {
    this.zulagenEfbState$.dispatch(new zulagenEfbAction.BgPositionUpdateDatas.UpdadeAction(data));
  }

  // clear data in I010
  public clearDataPosition(): void {
    this.zulagenEfbState$.dispatch(new zulagenEfbAction.SetZulagenDatas.LoadAction());
  }


  clearStore() {
    zulagenEFBStore.getBgSilAHVBeitrag.release();
    zulagenEFBStore.getComboboxgData.release();
    zulagenEFBStore.getBgPositionData.release();
    zulagenEFBStore.getRichtLinieData.release();
    zulagenEFBStore.getBgPositionsartData.release();
  }
}
