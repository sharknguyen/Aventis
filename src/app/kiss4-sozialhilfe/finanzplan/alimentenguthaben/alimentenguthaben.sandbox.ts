import { Sandbox } from '@shared/sandbox/base.sandbox';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import * as store from '@shared/store';
import { Store } from '@ngrx/store';
import * as alimentenguthabenStore from './store';
import * as alimentenguthabenAction from './store/actions/alimentenguthaben.actions';
@Injectable()
export class AlimentenguthabenSandbox extends Sandbox {
    // Load Success
    public alimentenguthabenData$ = this.alimentenguthabenState$.select(alimentenguthabenStore.fromAlimentenguthabenData);
    public getInkassosData$ = this.alimentenguthabenState$.select(alimentenguthabenStore.getInkassoData);
    public getPersonenUnterstuetztnData$ = this.alimentenguthabenState$.select(alimentenguthabenStore.getPersonenUnterstuetztnData);
    public newAlimentenguthaben$ = this.alimentenguthabenState$.select(alimentenguthabenStore.alimentenguthabenNew);
    public saveAlimentenguthaben$ = this.alimentenguthabenState$.select(alimentenguthabenStore.alimentenguthabenSave);
    public deleteAlimentenguthaben$ = this.alimentenguthabenState$.select(alimentenguthabenStore.alimentenguthabenDelete);
    public getTitle$ = this.alimentenguthabenState$.select(alimentenguthabenStore.getTitle);
    // Load Fail
    public alimentenguthabenDataFail$ = this.alimentenguthabenState$.select(alimentenguthabenStore.fromAlimentenguthabenDataFailed);
    public getInkassosDataFail$ = this.alimentenguthabenState$.select(alimentenguthabenStore.getInkassoDataFailed);
    public getPersonenUnterstuetztnDataFail$ = this.alimentenguthabenState$.select(alimentenguthabenStore.getPersonenUnterstuetztnDataFailed);
    public newAlimentenguthabenFail$ = this.alimentenguthabenState$.select(alimentenguthabenStore.alimentenguthabenNewFail);
    public saveAlimentenguthabenFail$ = this.alimentenguthabenState$.select(alimentenguthabenStore.alimentenguthabenSaveFail);
    public deleteAlimentenguthabenFail$ = this.alimentenguthabenState$.select(alimentenguthabenStore.alimentenguthabenDeleteFail);
    public getTitleFail$ = this.alimentenguthabenState$.select(alimentenguthabenStore.getTitleFail);

    private subscriptions: Subscription[] = [];
    constructor(
        protected appState$: Store<store.State>,
        private alimentenguthabenState$: Store<alimentenguthabenStore.AlimentenguthabenState>) {
        super(appState$);
    }
    public alimentenguthabenData(param): void {
        this.alimentenguthabenState$.dispatch(new alimentenguthabenAction.ListGridDatas.LoadAction(param));
    }
    public getInkasso(param): void {
        this.alimentenguthabenState$.dispatch(new alimentenguthabenAction.GetInkassoDatas.LoadAction(param));
    }
    public getloadPersonenUnterstuetztn(params): void {
        this.alimentenguthabenState$.dispatch(new alimentenguthabenAction.GetPersonenUnterstuetztnDatas.LoadAction(params));
    }
    public newAlimentenguthaben(params): void {
        this.alimentenguthabenState$.dispatch(new alimentenguthabenAction.NewAlimentenguthabenAction.PostAction(params));
    }
    public saveAlimentenguthaben(params): void {
        this.alimentenguthabenState$.dispatch(new alimentenguthabenAction.SaveAlimentenguthabenAction.PutAction(params));
    }
    public deleteAlimentenguthaben(params): void {
        this.alimentenguthabenState$.dispatch(new alimentenguthabenAction.DeleteAlimentenguthabenAction.DeleteAction(params));
    }
    public getTitle(params): void {
        this.alimentenguthabenState$.dispatch(new alimentenguthabenAction.GetTitleAction.TitleAction(params.bgBudgetID));
    }
    public resetData(): void {
        this.alimentenguthabenState$.dispatch(new alimentenguthabenAction.NewAlimentenguthabenAction.PostResetAction());
        this.alimentenguthabenState$.dispatch(new alimentenguthabenAction.SaveAlimentenguthabenAction.PutResetAction());
        this.alimentenguthabenState$.dispatch(new alimentenguthabenAction.DeleteAlimentenguthabenAction.DeleteResetAction());
    }
}
