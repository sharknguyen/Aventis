import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';

import * as tabModuleFallbearbeitungStore from './store';
import * as tabModuleFallbearbeitungActions from './store/actions/tab-module-fallbearbeitung.actions';

@Injectable()
export class TabModuleFallbearbeitungSandbox extends Sandbox {
  // Get Module Icon
  public getModuleIcon$ = this.tabModuleFallbearbeitungState$.select(tabModuleFallbearbeitungStore.getModuleIcon);
  public getModuleIconLoading$ = this.tabModuleFallbearbeitungState$.select(tabModuleFallbearbeitungStore.getModuleIconLoading);
  public getModuleIconLoaded$ = this.tabModuleFallbearbeitungState$.select(tabModuleFallbearbeitungStore.getModuleIconLoaded);
  public getModuleIconFailed$ = this.tabModuleFallbearbeitungState$.select(tabModuleFallbearbeitungStore.getModuleIconFailed);

  // Get Zeitachse Visible
  public getZeitachseVisible$ = this.tabModuleFallbearbeitungState$.select(tabModuleFallbearbeitungStore.getZeitachseVisible);
  public getZeitachseVisibleLoading$ = this.tabModuleFallbearbeitungState$.select(tabModuleFallbearbeitungStore.getZeitachseVisibleLoading);
  public getZeitachseVisibleLoaded$ = this.tabModuleFallbearbeitungState$.select(tabModuleFallbearbeitungStore.getZeitachseVisibleLoaded);
  public getZeitachseVisibleFailed$ = this.tabModuleFallbearbeitungState$.select(tabModuleFallbearbeitungStore.getZeitachseVisibleFailed);

  // Get PersonInfo Titel
  public getPersonInfoTitel$ = this.tabModuleFallbearbeitungState$.select(tabModuleFallbearbeitungStore.getPersonInfoTitel);
  public getPersonInfoTitelLoading$ = this.tabModuleFallbearbeitungState$.select(tabModuleFallbearbeitungStore.getPersonInfoTitelLoading);
  public getPersonInfoTitelLoaded$ = this.tabModuleFallbearbeitungState$.select(tabModuleFallbearbeitungStore.getPersonInfoTitelLoaded);
  public getPersonInfoTitelFailed$ = this.tabModuleFallbearbeitungState$.select(tabModuleFallbearbeitungStore.getPersonInfoTitelFailed);

  constructor(
    protected appState$: Store<store.State>,
    private tabModuleFallbearbeitungState$: Store<tabModuleFallbearbeitungStore.ITabModuleFallbearbeitungState>,
  ) {
    super(appState$);
  }

  public getModuleIcon(baPersonID: string, faFallID: any) {
    this.tabModuleFallbearbeitungState$.dispatch(new tabModuleFallbearbeitungActions.LoadModuleIconAction.LoadAction({ baPersonID, faFallID }));
  }

  public getZeitachseVisible() {
    this.tabModuleFallbearbeitungState$.dispatch(new tabModuleFallbearbeitungActions.LoadZeitachseVisibleAction.LoadAction());
  }

  public getPersonInfoTitel(baPersonID: string, userID: number, languageCode: number) {
    this.tabModuleFallbearbeitungState$.dispatch(new tabModuleFallbearbeitungActions.LoadPersonInfoTitelAction.LoadAction({ baPersonID, userID, languageCode }));
  }
}
