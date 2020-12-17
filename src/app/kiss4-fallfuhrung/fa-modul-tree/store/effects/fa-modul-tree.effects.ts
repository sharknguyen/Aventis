import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs';
import { catchError, map, switchMap, concatMap } from 'rxjs/operators';

import { FaModulTreeApiClient } from '../../fa-modul-treeApiClient.service';
import { TreeViewItemsQuery } from '../../models/tree-view-item.model';
import * as actions from '../actions/fa-modul-tree.actions';
import { GetConfigIntQueryModel, UpdateFaLeistungQueryModel, InsertFaPhaseQueryModel, MessageInformationQueryModel } from '../../models';
import { FallNavFilterModel } from '@app/kiss4-main/fall-navigator/models';

@Injectable()
export class FaModulTreeEffects {

  constructor(
    private actions$: Actions,
    private faModulTreeApiClient: FaModulTreeApiClient
  ) { }

  @Effect()
  getTreeViewItems$ = this.actions$.ofType(actions.GetTreeViewItemsTypes.LOAD).pipe(
    map((action: actions.GetTreeViewItemsAction.LoadAction) => action.payload),
    switchMap((state: TreeViewItemsQuery) => {
      const query = tryMapPathApi(state);
      return this.faModulTreeApiClient.getTreeViewItems(query).pipe(
        map((data) => new actions.GetTreeViewItemsAction.LoadSuccessAction(data)),
        catchError(error => of(new actions.GetTreeViewItemsAction.LoadFailAction(error)))
      );
    })
  );

  @Effect()
  getRightContentItems$ = this.actions$.ofType(actions.GetRightContentItemsTypes.LOAD).pipe(
    map((action: actions.GetRightContentItemsAction.LoadAction) => action.payload),
    switchMap((params: any) => {
      return this.faModulTreeApiClient.getRightContentItems(params).pipe(
        map((data) => new actions.GetRightContentItemsAction.LoadSuccessAction(data)),
        catchError(error => of(new actions.GetRightContentItemsAction.LoadFailAction(error)))
      );
    })
  );

  @Effect()
  getUserIDFaLeistung$ = this.actions$.ofType(actions.GetUserIDFaLeistungTypes.LOAD).pipe(
    map((action: actions.GetUserIDFaLeistungAction.LoadAction) => action.payload),
    switchMap((params: any) => {
      return this.faModulTreeApiClient.getUserIDFaLeistung(params).pipe(
        map((data) => new actions.GetUserIDFaLeistungAction.LoadSuccessAction(data)),
        catchError(error => of(new actions.GetUserIDFaLeistungAction.LoadFailAction(error)))
      );
    })
  );

  @Effect()
  getUserIDFaPhase$ = this.actions$.ofType(actions.GetUserIDFaPhaseTypes.LOAD).pipe(
    map((action: actions.GetUserIDFaPhaseAction.LoadAction) => action.payload),
    switchMap((params: any) => {
      return this.faModulTreeApiClient.getUserIDFaPhase(params).pipe(
        map((data) => new actions.GetUserIDFaPhaseAction.LoadSuccessAction(data)),
        catchError(error => of(new actions.GetUserIDFaPhaseAction.LoadFailAction(error)))
      );
    })
  );

  @Effect()
  getFaLeistungByBaPersonID$ = this.actions$.ofType(actions.GetFaLeistungByBaPersonIDTypes.LOAD).pipe(
    map((action: actions.GetFaLeistungByBaPersonIDAction.LoadAction) => action.payload),
    switchMap((params: any) => {
      return this.faModulTreeApiClient.getFaLeistungByBaPersonID(params).pipe(
        map(data => new actions.GetFaLeistungByBaPersonIDAction.LoadSuccessAction(data)),
        catchError(error => of(new actions.GetFaLeistungByBaPersonIDAction.LoadFailAction(error)))
      );
    })
  );

  @Effect()
  getCountFaPhase$ = this.actions$.ofType(actions.GetCountFaPhaseTypes.LOAD).pipe(
    map((action: actions.GetCountFaPhaseAction.LoadAction) => action.payload),
    switchMap((params: any) => {
      return this.faModulTreeApiClient.getCountFaPhase(params).pipe(
        map(data => new actions.GetCountFaPhaseAction.LoadSuccessAction(data)),
        catchError(error => of(new actions.GetCountFaPhaseAction.LoadFailAction(error)))
      );
    })
  );

  @Effect()
  geConfigInt$ = this.actions$.ofType(actions.GetConfigIntTypes.LOAD).pipe(
    map((action: actions.GetConfigIntAction.LoadAction) => action.payload),
    concatMap((param?: any) => {
      return this.faModulTreeApiClient.getConfigInt(param).pipe(
        map(data => new actions.GetConfigIntAction.LoadSuccessAction(data)),
        catchError(error => of(new actions.GetConfigIntAction.LoadFailAction(error)))
      );
    })
  );

  @Effect()
  getConfigOffeneIntake$ = this.actions$.ofType(actions.GetConfigOffeneIntakeTypes.LOAD).pipe(
    map((action: actions.GetConfigOffeneIntakeAction.LoadAction) => action.payload),
    concatMap((param?: any) => {
      return this.faModulTreeApiClient.getConfigInt(param).pipe(
        map(data => new actions.GetConfigOffeneIntakeAction.LoadSuccessAction(data)),
        catchError(error => of(new actions.GetConfigOffeneIntakeAction.LoadFailAction(error)))
      );
    })
  );

  @Effect()
  getConfigTotalBeratungsphasen$ = this.actions$.ofType(actions.GetConfigTotalBeratungsphasenTypes.LOAD).pipe(
    map((action: actions.GetConfigTotalBeratungsphasenAction.LoadAction) => action.payload),
    concatMap((param?: any) => {
      return this.faModulTreeApiClient.getConfigInt(param).pipe(
        map(initdata => new actions.GetConfigTotalBeratungsphasenAction.LoadSuccessAction(initdata)),
        catchError(error => of(new actions.GetConfigTotalBeratungsphasenAction.LoadFailAction(error)))
      );
    })
  );

  @Effect()
  getConfigTransferPhaseUser$ = this.actions$.ofType(actions.GetConfigTransferPhaseUserTypes.LOAD).pipe(
    map((action: actions.GetConfigTransferPhaseUserAction.LoadAction) => action.payload),
    concatMap((param?: any) => {
      return this.faModulTreeApiClient.getConfigInt(param).pipe(
        map(initdata => new actions.GetConfigTransferPhaseUserAction.LoadSuccessAction(initdata)),
        catchError(error => of(new actions.GetConfigTransferPhaseUserAction.LoadFailAction(error)))
      );
    })
  );

  @Effect()
  geConfigBool$ = this.actions$.ofType(actions.GetConfigBoolTypes.LOAD).pipe(
    map((action: actions.GetConfigBoolAction.LoadAction) => action.payload),
    switchMap((param?: GetConfigIntQueryModel) => {
      const query = tryMapPathApi(param);
      return this.faModulTreeApiClient.getConfigBool(query).pipe(
        map(data => new actions.GetConfigBoolAction.LoadSuccessAction(data)),
        catchError(error => of(new actions.GetConfigBoolAction.LoadFailAction(error)))
      );
    })
  );

  @Effect()
  getFaPhaseByFaLeistungID$ = this.actions$.ofType(actions.GetFaPhaseByFaLeistungIDTypes.LOAD).pipe(
    map((action: actions.GetFaPhaseByFaLeistungIDAction.LoadAction) => action.payload),
    switchMap((param: any) => {
      return this.faModulTreeApiClient.getFaPhaseByFaLeistungID(param).pipe(
        map(data => new actions.GetFaPhaseByFaLeistungIDAction.LoadSuccessAction(data)),
        catchError(error => of(new actions.GetFaPhaseByFaLeistungIDAction.LoadFailAction(error)))
      );
    })
  );

  @Effect()
  updateFaleistung$ = this.actions$.ofType(actions.UpdateFaLeistungTypes.UPDATE).pipe(
    map((action: actions.UpdateFaLeistungAction.UpdateAction) => action.payload),
    concatMap((model?: UpdateFaLeistungQueryModel) => {
      return this.faModulTreeApiClient.updateFaleistung(model).pipe(
        map(data => new actions.UpdateFaLeistungAction.UpdateSuccessAction(data)),
        catchError(error => of(new actions.UpdateFaLeistungAction.UpdateFailAction(error)))
      );
    })
  );

  @Effect()
  insertFaPhase$ = this.actions$.ofType(actions.InsertFaPhaseTypes.ISNERT).pipe(
    map((action: actions.InsertFaPhaseAction.InsertAction) => action.payload),
    concatMap((param?: InsertFaPhaseQueryModel) => {
      return this.faModulTreeApiClient.insertFaPhase(param).pipe(
        map(data => new actions.InsertFaPhaseAction.InsertSuccessAction(data)),
        catchError(error => of(new actions.InsertFaPhaseAction.InsertFailAction(error)))
      );
    })
  );

  @Effect()
  getMessageInformation$ = this.actions$.ofType(actions.LoadMessageInformationTypes.LOAD).pipe(
    map((action: actions.LoadMessageInformationAction.LoadAction) => action.payload),
    switchMap((param?: MessageInformationQueryModel) => {
      const query = tryMapPathApi(param);
      return this.faModulTreeApiClient.getMessageInformation(query).pipe(
        map(data => new actions.LoadMessageInformationAction.LoadSuccessAction(data)),
        catchError(error => of(new actions.LoadMessageInformationAction.LoadFailAction(error)))
      );
    })
  );

  // Delete
  @Effect()
  getDataUsedFaLeistungByFaLeistungID$ = this.actions$.ofType(actions.GetDataUsedFaLeistungByFaLeistungIDTypes.LOAD).pipe(
    map((action: actions.GetDataUsedFaLeistungByFaLeistungIDAction.LoadAction) => action.payload),
    switchMap(state => {
      return this.faModulTreeApiClient.getDataUsedFaLeistungByFaLeistungID(state).pipe(
        map(data => new actions.GetDataUsedFaLeistungByFaLeistungIDAction.LoadSuccessAction(data)),
        catchError(error => of(new actions.GetDataUsedFaLeistungByFaLeistungIDAction.LoadFailAction(error)))
      );
    })
  );

  @Effect()
  deleteFallverlauf$ = this.actions$.ofType(actions.DeleteFallverlaufTypes.DELETE).pipe(
    map((action: actions.DeleteFallverlaufAction.DeleteAction) => action.payload),
    concatMap((state: any) => {
      return this.faModulTreeApiClient.deleteFallverlauf(state).pipe(
        map(data => new actions.DeleteFallverlaufAction.DeleteSuccessAction(data)),
        catchError(error => of(new actions.DeleteFallverlaufAction.DeleteFailAction(error)))
      );
    })
  );

  @Effect()
  deletePhase$ = this.actions$.ofType(actions.DeletePhaseTypes.DELETE).pipe(
    map((action: actions.DeletePhaseAction.DeleteAction) => action.payload),
    concatMap((state: any) => {
      return this.faModulTreeApiClient.deletePhase(state).pipe(
        map(initdata => new actions.DeletePhaseAction.DeleteSuccessAction(initdata)),
        catchError(error => of(new actions.DeletePhaseAction.DeleteFailAction(error)))
      );
    })
  );

  @Effect()
  getBaPersonIDModulID$ = this.actions$.ofType(actions.GetBaPersonIDModulIDTypes.LOAD).pipe(
    map((action: actions.GetBaPersonIDModulIDAction.LoadAction) => action.payload),
    switchMap((faLeistungID: any) => {
      return this.faModulTreeApiClient.getBaPersonIDModulID(faLeistungID).pipe(
        map((data) => new actions.GetBaPersonIDModulIDAction.LoadSuccessAction(data)),
        catchError(error => of(new actions.GetBaPersonIDModulIDAction.LoadFailAction(error)))
      );
    })
  );

  @Effect()
  getTreeFallNavigator$ = this.actions$.ofType(actions.GetTreeFallNavigatorTypes.LOAD).pipe(
    map((action: actions.GetTreeFallNavigatorAction.LoadAction) => action.payload),
    switchMap((state: FallNavFilterModel) => {
      const query = tryMapPathApi(state);
      return this.faModulTreeApiClient.getTreeFallNavigator(query).pipe(
        map(data => new actions.GetTreeFallNavigatorAction.LoadSuccessAction(data)),
        catchError(error => of(new actions.GetTreeFallNavigatorAction.LoadFailAction(error)))
      );
    })
  );

}
