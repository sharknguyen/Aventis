import { Injectable } from '@angular/core';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import * as versicherungsleistungenStore from '@app/kiss4-sozialhilfe/finanzplan/versicherungsleistungen/store';
import { Store, select } from '@ngrx/store';
import * as versicherungsleistungenActions from '@app/kiss4-sozialhilfe/finanzplan/versicherungsleistungen/store/actions/versicherungsleistungen.actions';

@Injectable()
export class VersicherungsleistungenSandbox extends Sandbox {

    constructor(
        protected appState$: Store<store.State>,
        private versicherungsleistungenState$: Store<versicherungsleistungenStore.VersicherungsleistungenState>
    ) {
        super(appState$);
    }

    public einkommenData$ = this.versicherungsleistungenState$.pipe(select(versicherungsleistungenStore.loadEinkommenData));
    public postEinkommenResult$ = this.versicherungsleistungenState$.pipe(select(versicherungsleistungenStore.postEinkommenData));
    public putEinkommenResult$ = this.versicherungsleistungenState$.pipe(select(versicherungsleistungenStore.putEinkommenData));
    public deleteEinkommenResult$ = this.versicherungsleistungenState$.pipe(select(versicherungsleistungenStore.deleteEinkommenData));
    public getEinkommenLookUpData$ = this.versicherungsleistungenState$.pipe(select(versicherungsleistungenStore.getEinkommenLooUpData));
    public getPersonListData$ = this.versicherungsleistungenState$.pipe(select(versicherungsleistungenStore.getPersonListData));
    public getBgBewilligungStatusCodeData$ = this.versicherungsleistungenState$.pipe(select(versicherungsleistungenStore.getBgBewilligungStatusCodeData));

    public loadEinkommenFunc(params?: any): void {
        this.versicherungsleistungenState$.dispatch(new versicherungsleistungenActions.LoadEinkommenAction(params));
    }

    public postEinkommenFunc(params?: any): void {
        this.versicherungsleistungenState$.dispatch(new versicherungsleistungenActions.PostEinkommenAction(params));
    }

    public putEinkommenFunc(params?: any): void {
        this.versicherungsleistungenState$.dispatch(new versicherungsleistungenActions.PutEinkommenAction(params));
    }

    public deleteEinkommenFunc(params?: any): void {
        this.versicherungsleistungenState$.dispatch(new versicherungsleistungenActions.DeleteEinkommenAction(params));
    }

    public getEinkommenLookUpFunc(params?: any): void {
        this.versicherungsleistungenState$.dispatch(new versicherungsleistungenActions.GetEinkommenLookUpAction(params));
    }

    public getPersonListFunc(params?: any): void {
        this.versicherungsleistungenState$.dispatch(new versicherungsleistungenActions.GetPersonListAction(params));
    }

    public getBgBewilligungStatusCodeFunc(params?: any): void {
        this.versicherungsleistungenState$.dispatch(new versicherungsleistungenActions.GetBgBewilligungStatusCodeAction(params));
    }

    resetState() {
        this.versicherungsleistungenState$.dispatch(
            new versicherungsleistungenActions.ResetPostEinkommenAction()
        );
        this.versicherungsleistungenState$.dispatch(
            new versicherungsleistungenActions.ResetPutEinkommenAction()
        );
    }
}
