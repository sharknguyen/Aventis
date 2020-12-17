import { Injectable } from '@angular/core';
import * as vermogenStore from '@app/kiss4-sozialhilfe/finanzplan/vermogen/store';
import * as VermogenAction from '@app/kiss4-sozialhilfe/finanzplan/vermogen/store/actions/vermogen.action';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import { Subscription } from 'rxjs/rx';

@Injectable()
export class VermogenSandbox extends Sandbox {

  public bgPositionData$ = this.vermogenState$.select(
    vermogenStore.getBgPositionData
  );

  public bgFinanzplanData$ = this.vermogenState$.select(
    vermogenStore.getBgFinanzplanData
  );

  public personenData$ = this.vermogenState$.select(
    vermogenStore.getPersonenData
  );

  public whPositionsartData$ = this.vermogenState$.select(
    vermogenStore.getWhPositionsartData
  );

  public delBgPositionData$ = this.vermogenState$.select(
    vermogenStore.getDelBgPositionData
  );

  public freibetragData$ = this.vermogenState$.select(
    vermogenStore.getFreibetragData
  );

  public insertBgPositionData$ = this.vermogenState$.select(
    vermogenStore.insertBgPositionData
  );

  public updateBgPositionData$ = this.vermogenState$.select(
    vermogenStore.updateBgPositionData
  );

  public bgSilAHVBeitragData$ = this.vermogenState$.select(
    vermogenStore.getBgSilAHVBeitrag
  );

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState$: Store<store.State>,
    private vermogenState$: Store<vermogenStore.VermogenState>
  ) {
    super(appState$);
  }

  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Get BgPosition
   * @param query
   */
  public getBgPosition(query): void {
    this.vermogenState$.dispatch(new VermogenAction.BgPositionDatas.LoadAction(query));
  }

  /**
   * Get BgFinanzplan
   * @param query
   */
  public getBgFinanzplan(query): void {
    this.vermogenState$.dispatch(new VermogenAction.BgFinanzplanDatas.LoadAction(query));
  }

  /**
   * Get Personen
   * @param query
   */
  public getPersonen(query): void {
    this.vermogenState$.dispatch(new VermogenAction.PersonenDatas.LoadAction(query));
  }

  /**
   * Get WhPositionsart
   * @param query
   */
  public getWhPositionsart(query): void {
    this.vermogenState$.dispatch(new VermogenAction.WhPositionsartDatas.LoadAction(query));
  }

  /**
   * Delete BgPosition
   * @param query
   */
  public deleteBgPosition(query): void {
    this.vermogenState$.dispatch(new VermogenAction.DelBgPositionAction.DelAction(query));
  }

  /**
   * Get Freibetrag
   * @param query
   */
  public getFreibetrag(query): void {
    this.vermogenState$.dispatch(new VermogenAction.FreibetragDatas.LoadAction(query));
  }

  /**
   * Insert BgPosition
   * @param query
   */
  public insertBgPosition(query): void {
    this.vermogenState$.dispatch(new VermogenAction.InsertBgPositionAction.InsertAction(query));
  }

  /**
   * Update BgPosition
   * @param query
   */
  public updateBgPosition(query): void {
    this.vermogenState$.dispatch(new VermogenAction.UpdateBgPositionAction.UpdateAction(query));
  }

  /**
   * Get status code
   * @param bgBudgetID
   */
  public getBgSilAHVBeitrag(bgBudgetID): void {
    this.vermogenState$.dispatch(new VermogenAction.BgSilAHVBeitragDatas.LoadAction(bgBudgetID));
  }

  /**
   * Get Id
   *
   */
  public setIdNewVermogen(): void {
    this.vermogenState$.dispatch(new VermogenAction.SetVermongeDatas.LoadAction());
  }

  public resetVermogenState(): void {
    this.vermogenState$.dispatch(
        new VermogenAction.ResetStateDatas.ResetStateAction()
    );
}

}
