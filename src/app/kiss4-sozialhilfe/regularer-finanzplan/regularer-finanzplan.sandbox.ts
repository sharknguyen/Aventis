import { Injectable } from '@angular/core';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as regularerFinanzplanAction from '@app/kiss4-sozialhilfe/regularer-finanzplan/store/actions/regularer-finanzplan.actions';
import * as store from '@shared/store/index';
import * as regularerFinanzplanStore from '@app/kiss4-sozialhilfe/regularer-finanzplan/store';
import { IFinanzplanSaveParam } from '@app/kiss4-sozialhilfe/regularer-finanzplan/models';

@Injectable()
export class RegularerFinanzplanSandbox extends Sandbox {
  finanzplanHeaderData$ = this.regularerFinanzplanState$.select(regularerFinanzplanStore.regFinanHeaderSelector);
  finanzplanData$ = this.regularerFinanzplanState$.select(regularerFinanzplanStore.regFinanSelector);
  checkData$ = this.regularerFinanzplanState$.select(regularerFinanzplanStore.regFinanCheckSelector);

  grundErData$ = this.regularerFinanzplanState$.select(regularerFinanzplanStore.regFinanGrundErSelector);
  grundAbData$ = this.regularerFinanzplanState$.select(regularerFinanzplanStore.regFinanGrundAbSelector);
  grundbedarfTypeData$ = this.regularerFinanzplanState$.select(regularerFinanzplanStore.regFinanGrundbedarfTypeSelector);
  typeData$ = this.regularerFinanzplanState$.select(regularerFinanzplanStore.regFinanTypeSelector);
  bewilligungData$ = this.regularerFinanzplanState$.select(regularerFinanzplanStore.regFinanBewilligungSelector);
  finanzplanSaveData$ = this.regularerFinanzplanState$.select(regularerFinanzplanStore.regFinanSaveSelector);
  verlaufData$ = this.regularerFinanzplanState$.select(regularerFinanzplanStore.verlaufDataSelector);
  typVerlaufData$ = this.regularerFinanzplanState$.select(regularerFinanzplanStore.typVerlaufDataSelector);

  constructor(
    protected appState$: Store<store.State>,
    private regularerFinanzplanState$: Store<regularerFinanzplanStore.IFinanzplanState>,
  ) {
    super(appState$);
  }

  loadData(params: { bgFinanzplanID: number, baPersonID: number }) {
    this.regularerFinanzplanState$.dispatch(new regularerFinanzplanAction.PersonenInfoAction.LoadAction(params));
    this.loadCheckData(params);
    this.regularerFinanzplanState$.dispatch(new regularerFinanzplanAction.RegularerFinanzplanData.LoadAction(params));
    this.regularerFinanzplanState$.dispatch(new regularerFinanzplanAction.GrundErData.LoadAction());
    this.regularerFinanzplanState$.dispatch(new regularerFinanzplanAction.GrundAbData.LoadAction());
    this.regularerFinanzplanState$.dispatch(new regularerFinanzplanAction.GrundbedarfTypeData.LoadAction());
    this.regularerFinanzplanState$.dispatch(new regularerFinanzplanAction.TypeData.LoadAction());
    this.regularerFinanzplanState$.dispatch(new regularerFinanzplanAction.BewilligungStatusData.LoadAction());
    this.regularerFinanzplanState$.dispatch(new regularerFinanzplanAction.VerlaufData.LoadAction(params));
    this.regularerFinanzplanState$.dispatch(new regularerFinanzplanAction.TypVerlaufData.LoadAction({}));
  }

  loadCheckData(params: { bgFinanzplanID: number, baPersonID: number }) {
    this.regularerFinanzplanState$.dispatch(new regularerFinanzplanAction.CheckData.LoadAction(params));
  }

  saveData(param: IFinanzplanSaveParam) {
    this.regularerFinanzplanState$.dispatch(new regularerFinanzplanAction.FinanzplanSaveData.LoadAction(param));
  }
}
