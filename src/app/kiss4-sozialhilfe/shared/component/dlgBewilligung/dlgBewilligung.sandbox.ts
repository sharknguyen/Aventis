import { Injectable } from '@angular/core';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as store from '@shared/store';
import * as regularerFinanzplanAction from '@app/kiss4-sozialhilfe/shared/component/dlgBewilligung/store/dlgBewilligung.actions';
import * as dlgBewilligungStore from '@app/kiss4-sozialhilfe/shared/component/dlgBewilligung/store';
import { IFinanzplanSaveParam } from '@app/kiss4-sozialhilfe/shared/component/dlgBewilligung/models';

@Injectable()
export class DlgBewilligungSandbox extends Sandbox {

  constructor(
    protected appState$: Store<store.State>,
    // private regularerFinanzplanState$: Store<dlgBewilligungStore.IFinanzplanState>,
  ) {
    super(appState$);
  }

  loadData(params: { bgFinanzplanID: number, baPersonID: number }) {
  }

  saveData(param: IFinanzplanSaveParam) {
  }
}
