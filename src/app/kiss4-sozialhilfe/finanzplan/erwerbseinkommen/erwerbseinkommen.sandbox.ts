import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import { UtilService } from '@shared/utilites/utility.service';
import { Subscription } from 'rxjs';

import * as ErwerbseinkommenAction from './store/actions/erwerbseinkommen.actions';
import * as erwerbseinkommenStore from './store';

@Injectable()
export class ErwerbseinkommenSanbox extends Sandbox {
    constructor(protected appState$: Store<store.State>,
        private ErwerbseinkommenState$: Store<erwerbseinkommenStore.ErwerbseinkommenState>,
        private utilService: UtilService) {
        super(appState$);
    }
    public bgErwerbseinkommen$ = this.ErwerbseinkommenState$.select(
        erwerbseinkommenStore.BgErwerbseinkommenList
    );

    public bgErwerbseinkommenAdd$ = this.ErwerbseinkommenState$.select(
        erwerbseinkommenStore.BgErwerbseinkommenAdd
    );

    public bgErwerbseinkommenUpdate$ = this.ErwerbseinkommenState$.select(
        erwerbseinkommenStore.BgErwerbseinkommenUpdate
    );

    public bgErwerbseinkommenDelete$ = this.ErwerbseinkommenState$.select(
        erwerbseinkommenStore.BgErwerbseinkommenDelete
    );

    public bgErwerbseinkommenDropdown$ = this.ErwerbseinkommenState$.select(
        erwerbseinkommenStore.BgErwerbseinkommenDropdownList
    );

    public bgBewilligungStatusCode$ = this.ErwerbseinkommenState$.select(
        erwerbseinkommenStore.BgBewilligungStatusCode
    );

    private subscriptions: Array<Subscription> = [];

    public loadBgErwerbseinkommen(data): void {
        this.ErwerbseinkommenState$.dispatch(new ErwerbseinkommenAction.BgErwerbseinkommenLoadData.LoadAction(data));
    }

    public addBgErwerbseinkommen(data): void {
        this.ErwerbseinkommenState$.dispatch(new ErwerbseinkommenAction.BgErwerbseinkommenAddData.AddAction(data));
    }

    public updateBgErwerbseinkommen(data): void {
        this.ErwerbseinkommenState$.dispatch(new ErwerbseinkommenAction.BgErwerbseinkommenUpdateData.UpdateAction(data));
    }

    public deleteBgErwerbseinkommen(data): void {
        this.ErwerbseinkommenState$.dispatch(new ErwerbseinkommenAction.BgErwerbseinkommenDeleteData.DeleteAction(data));
    }
    public loadBgErwerbseinkommenDropdown(data: any): void {
        this.ErwerbseinkommenState$.dispatch(new ErwerbseinkommenAction.BgErwerbseinkommenDropdownLoadData.LoadAction(data));
    }

    public loadBgBewilligungStatusCode(data: any): void {
        this.ErwerbseinkommenState$.dispatch(new ErwerbseinkommenAction.BgBewilligungStatusCodeLoadData.LoadAction(data));
    }

    /**
   * Unsubscribes from events
   */
    public unregisterEvents() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
