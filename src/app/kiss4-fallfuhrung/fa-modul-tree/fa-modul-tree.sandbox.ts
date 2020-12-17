import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';

import { TreeViewItemsQuery } from './models/tree-view-item.model';
import * as faModulTreeStore from './store';
import * as faModulTreeActions from './store/actions/fa-modul-tree.actions';
import { GetConfigIntQueryModel, InsertFaPhaseQueryModel, MessageInformationQueryModel, Message, FallNavigator } from './models';
import { UpdateFaLeistungQueryModel } from '../fallfuhrung-tree/models';

@Injectable()
export class FaModulTreeSandbox extends Sandbox {
  // Get Treeview datasource
  public getTreeViewItems$ = this.faModulTreeState$.select(faModulTreeStore.getTreeViewItems);
  public getTreeViewItemsLoading$ = this.faModulTreeState$.select(faModulTreeStore.getTreeViewItemsLoading);
  public getTreeViewItemsLoaded$ = this.faModulTreeState$.select(faModulTreeStore.getTreeViewItemsLoaded);
  public getTreeViewItemsFailed$ = this.faModulTreeState$.select(faModulTreeStore.getTreeViewItemsFailed);

  // Get Right Content Items
  public getRightContentItems$ = this.faModulTreeState$.select(faModulTreeStore.getRightContentItems);
  public getRightContentItemsLoading$ = this.faModulTreeState$.select(faModulTreeStore.getRightContentItemsLoading);
  public getRightContentItemsLoaded$ = this.faModulTreeState$.select(faModulTreeStore.getRightContentItemsLoaded);
  public getRightContentItemsFailed$ = this.faModulTreeState$.select(faModulTreeStore.getRightContentItemsFailed);

  // Get UserID FaLeistung
  public getUserIDFaLeistung$ = this.faModulTreeState$.select(faModulTreeStore.getUserIDFaLeistung);
  public getUserIDFaLeistungLoading$ = this.faModulTreeState$.select(faModulTreeStore.getUserIDFaLeistungLoading);
  public getUserIDFaLeistungLoaded$ = this.faModulTreeState$.select(faModulTreeStore.getUserIDFaLeistungLoaded);
  public getUserIDFaLeistungFailed$ = this.faModulTreeState$.select(faModulTreeStore.getUserIDFaLeistungFailed);

  // Get UserID FaPhase
  public getUserIDFaPhase$ = this.faModulTreeState$.select(faModulTreeStore.getUserIDFaPhase);
  public getUserIDFaPhaseLoading$ = this.faModulTreeState$.select(faModulTreeStore.getUserIDFaPhaseLoading);
  public getUserIDFaPhaseLoaded$ = this.faModulTreeState$.select(faModulTreeStore.getUserIDFaPhaseLoaded);
  public getUserIDFaPhaseFailed$ = this.faModulTreeState$.select(faModulTreeStore.getUserIDFaPhaseFailed);

  // Get FaLeistung By BaPersonID
  public getFaLeistungByBaPersonID$ = this.faModulTreeState$.select(faModulTreeStore.getFaLeistungByBaPersonID);
  public getFaLeistungByBaPersonIDLoading$ = this.faModulTreeState$.select(faModulTreeStore.getFaLeistungByBaPersonIDLoading);
  public getFaLeistungByBaPersonIDLoaded$ = this.faModulTreeState$.select(faModulTreeStore.getFaLeistungByBaPersonIDLoaded);
  public getFaLeistungByBaPersonIDFailed$ = this.faModulTreeState$.select(faModulTreeStore.getFaLeistungByBaPersonIDFailed);

  // Get Count FaPhase
  public getCountFaPhase$ = this.faModulTreeState$.select(faModulTreeStore.getCountFaPhase);
  public getCountFaPhaseLoading$ = this.faModulTreeState$.select(faModulTreeStore.getCountFaPhaseLoading);
  public getCountFaPhaseLoaded$ = this.faModulTreeState$.select(faModulTreeStore.getCountFaPhaseLoaded);
  public getCountFaPhaseFailed$ = this.faModulTreeState$.select(faModulTreeStore.getCountFaPhaseFailed);

  // Get Config Int
  public getConfigInt$ = this.faModulTreeState$.select(faModulTreeStore.getConfigInt);
  public getConfigIntLoading$ = this.faModulTreeState$.select(faModulTreeStore.getConfigIntLoading);
  public getConfigIntLoaded$ = this.faModulTreeState$.select(faModulTreeStore.getConfigIntLoaded);
  public getConfigIntFailed$ = this.faModulTreeState$.select(faModulTreeStore.getConfigIntFailed);

  public getConfigOffeneIntake$ = this.faModulTreeState$.select(faModulTreeStore.getConfigOffeneIntake);
  public getConfigOffeneIntakeLoading$ = this.faModulTreeState$.select(faModulTreeStore.getConfigOffeneIntakeLoading);
  public getConfigOffeneIntakeLoaded$ = this.faModulTreeState$.select(faModulTreeStore.getConfigOffeneIntakeLoaded);
  public getConfigOffeneIntakeFailed$ = this.faModulTreeState$.select(faModulTreeStore.getConfigOffeneIntakeFailed);

  public getConfigTotalBeratungsphasen$ = this.faModulTreeState$.select(faModulTreeStore.getConfigTotalBeratungsphasen);
  public getConfigTotalBeratungsphasenLoading$ = this.faModulTreeState$.select(faModulTreeStore.getConfigTotalBeratungsphasenLoading);
  public getConfigTotalBeratungsphasenLoaded$ = this.faModulTreeState$.select(faModulTreeStore.getConfigTotalBeratungsphasenLoaded);
  public getConfigTotalBeratungsphasenFailed$ = this.faModulTreeState$.select(faModulTreeStore.getConfigTotalBeratungsphasenFailed);

  public getConfigTransferPhaseUser$ = this.faModulTreeState$.select(faModulTreeStore.getConfigTransferPhaseUser);
  public getConfigTransferPhaseUserLoading$ = this.faModulTreeState$.select(faModulTreeStore.getConfigTransferPhaseUserLoading);
  public getConfigTransferPhaseUserLoaded$ = this.faModulTreeState$.select(faModulTreeStore.getConfigTransferPhaseUserLoaded);
  public getConfigTransferPhaseUserFailed$ = this.faModulTreeState$.select(faModulTreeStore.getConfigTransferPhaseUserFailed);

  // Get Config Bool
  public getConfigBool$ = this.faModulTreeState$.select(faModulTreeStore.getConfigBool);
  public getConfigBoolLoading$ = this.faModulTreeState$.select(faModulTreeStore.getConfigBoolLoading);
  public getConfigBoolLoaded$ = this.faModulTreeState$.select(faModulTreeStore.getConfigBoolLoaded);
  public getConfigBoolFailed$ = this.faModulTreeState$.select(faModulTreeStore.getConfigBoolFailed);

  // Get FaPhase By FaLeistungID
  public getFaPhaseByFaLeistungID$ = this.faModulTreeState$.select(faModulTreeStore.getFaPhaseByFaLeistungID);
  public getFaPhaseByFaLeistungIDLoading$ = this.faModulTreeState$.select(faModulTreeStore.getFaPhaseByFaLeistungIDLoading);
  public getFaPhaseByFaLeistungIDLoaded$ = this.faModulTreeState$.select(faModulTreeStore.getFaPhaseByFaLeistungIDLoaded);
  public getFaPhaseByFaLeistungIDFailed$ = this.faModulTreeState$.select(faModulTreeStore.getFaPhaseByFaLeistungIDFailed);

  // Update FaLeistung
  public updateFaLeistung$ = this.faModulTreeState$.select(faModulTreeStore.updateFaLeistung);
  public updateFaLeistungLoading$ = this.faModulTreeState$.select(faModulTreeStore.updateFaLeistungLoading);
  public updateFaLeistungLoaded$ = this.faModulTreeState$.select(faModulTreeStore.updateFaLeistungLoaded);
  public updateFaLeistungFailed$ = this.faModulTreeState$.select(faModulTreeStore.updateFaLeistungFailed);

  // Insert FaPhase
  public insertFaPhase$ = this.faModulTreeState$.select(faModulTreeStore.insertFaPhase);
  public insertFaPhaseLoading$ = this.faModulTreeState$.select(faModulTreeStore.insertFaPhaseLoading);
  public insertFaPhaseLoaded$ = this.faModulTreeState$.select(faModulTreeStore.insertFaPhaseLoaded);
  public insertFaPhaseFailed$ = this.faModulTreeState$.select(faModulTreeStore.insertFaPhaseFailed);

  // Get Message Information
  public GetMessageInformation$ = this.faModulTreeState$.select(faModulTreeStore.getMessageInformation);

  // Get DataUsedFaLeistung By FaLeistungID
  public getDataUsedFaLeistungByFaLeistungID$ = this.faModulTreeState$.select(faModulTreeStore.getDataUsedFaLeistungByFaLeistungID);
  public getDataUsedFaLeistungByFaLeistungIDLoading$ = this.faModulTreeState$.select(faModulTreeStore.getDataUsedFaLeistungByFaLeistungIDLoading);
  public getDataUsedFaLeistungByFaLeistungIDLoaded$ = this.faModulTreeState$.select(faModulTreeStore.getDataUsedFaLeistungByFaLeistungIDLoaded);
  public getDataUsedFaLeistungByFaLeistungIDFailed$ = this.faModulTreeState$.select(faModulTreeStore.getDataUsedFaLeistungByFaLeistungIDFailed);

  // Delete Fallverlauf
  public deleteFallverlauf$ = this.faModulTreeState$.select(faModulTreeStore.deleteFallverlauf);
  public deleteFallverlaufLoading$ = this.faModulTreeState$.select(faModulTreeStore.deleteFallverlaufLoading);
  public deleteFallverlaufLoaded$ = this.faModulTreeState$.select(faModulTreeStore.deleteFallverlaufLoaded);
  public deleteFallverlaufFailed$ = this.faModulTreeState$.select(faModulTreeStore.deleteFallverlaufFailed);

  // Delete Phase
  public deletePhase$ = this.faModulTreeState$.select(faModulTreeStore.deletePhase);
  public deletePhaseLoading$ = this.faModulTreeState$.select(faModulTreeStore.deletePhaseLoading);
  public deletePhaseLoaded$ = this.faModulTreeState$.select(faModulTreeStore.deletePhaseLoaded);
  public deletePhaseFailed$ = this.faModulTreeState$.select(faModulTreeStore.deletePhaseFailed);

  // Get BaPersonIDModulID
  public getBaPersonIDModulID$ = this.faModulTreeState$.select(faModulTreeStore.getBaPersonIDModulID);
  public getBaPersonIDModulIDLoading$ = this.faModulTreeState$.select(faModulTreeStore.getBaPersonIDModulIDLoading);
  public getBaPersonIDModulIDLoaded$ = this.faModulTreeState$.select(faModulTreeStore.getBaPersonIDModulIDLoaded);
  public getBaPersonIDModulIDFailed$ = this.faModulTreeState$.select(faModulTreeStore.getBaPersonIDModulIDFailed);

  public treeNodeUpdateState$ = this.faModulTreeState$.select(faModulTreeStore.getTreeNodeUpdateState);

  public nodesStatus$ = this.faModulTreeState$.select(faModulTreeStore.getNodesStatus);

  public getTreeFallNavigator$ = this.faModulTreeState$.select(faModulTreeStore.getTreeFallNavigator);
  public getTreeFallNavigatorLoading$ = this.faModulTreeState$.select(faModulTreeStore.getTreeFallNavigatorLoading);
  public getTreeFallNavigatorLoaded$ = this.faModulTreeState$.select(faModulTreeStore.getTreeFallNavigatorLoaded);
  public getTreeFallNavigatorFailed$ = this.faModulTreeState$.select(faModulTreeStore.getTreeFallNavigatorFailed);

  public selectedNode$ = this.faModulTreeState$.select(faModulTreeStore.getSelectedNode);

  public loadMessage$ = this.faModulTreeState$.select(faModulTreeStore.loadMessage);

  public loadFallNavigator$ = this.faModulTreeState$.select(faModulTreeStore.loadFallNavigator);

  public addNewNode$ = this.faModulTreeState$.select(faModulTreeStore.getAddNewNode);

  constructor(
    protected appState$: Store<store.State>,
    private faModulTreeState$: Store<faModulTreeStore.IFaModulTreeState>,
  ) {
    super(appState$);
  }

  public getTreeViewItems(treeViewItemsQuery?: TreeViewItemsQuery): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.GetTreeViewItemsAction.LoadAction(treeViewItemsQuery));
  }

  public resetTreeState(): void {
    this.faModulTreeState$.dispatch(
      new faModulTreeActions.GetTreeViewItemsAction.ResetStateAction()
    );
  }

  public getRightContentItems(LOVName: string): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.GetRightContentItemsAction.LoadAction(LOVName));
  }

  public getUserIDFaLeistung(FaLeistungID: number): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.GetUserIDFaLeistungAction.LoadAction(FaLeistungID));
  }

  public getUserIDFaPhase(FaPhaseID: number): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.GetUserIDFaPhaseAction.LoadAction(FaPhaseID));
  }

  public getFaLeistungByBaPersonID(baPersonID: number): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.GetFaLeistungByBaPersonIDAction.LoadAction(baPersonID));
  }

  public getCountFaPhase(faleistungid: number): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.GetCountFaPhaseAction.LoadAction(faleistungid));
  }

  public getConfigInt(model: any): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.GetConfigIntAction.LoadAction(model));
  }

  public getConfigOffeneIntake(model: any): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.GetConfigOffeneIntakeAction.LoadAction(model));
  }

  public getConfigTotalBeratungsphasen(model: any): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.GetConfigTotalBeratungsphasenAction.LoadAction(model));
  }

  public getConfigTransferPhaseUser(model: any): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.GetConfigTransferPhaseUserAction.LoadAction(model));
  }

  public getConfigBool(model: GetConfigIntQueryModel): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.GetConfigBoolAction.LoadAction(model));
  }

  public getFaPhaseByFaLeistungID(faLeistungID: number): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.GetFaPhaseByFaLeistungIDAction.LoadAction(faLeistungID));
  }

  public updateFaLeistung(model: UpdateFaLeistungQueryModel): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.UpdateFaLeistungAction.UpdateAction(model));
  }

  public insertFaPhase(model: InsertFaPhaseQueryModel): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.InsertFaPhaseAction.InsertAction(model));
  }

  public getMessageInformation(model: MessageInformationQueryModel): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.LoadMessageInformationAction.LoadAction(model));
  }

  public getDataUsedFaLeistungByFaLeistungID(faleistungID: number): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.GetDataUsedFaLeistungByFaLeistungIDAction.LoadAction(faleistungID));
  }

  public deleteFallverlauf(faLeistungID: number): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.DeleteFallverlaufAction.DeleteAction(faLeistungID));
  }

  public deletePhase(faPhaseID: number): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.DeletePhaseAction.DeleteAction(faPhaseID));
  }

  public getBaPersonIDModulID(faLeistungID: any): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.GetBaPersonIDModulIDAction.LoadAction(faLeistungID));
  }

  public changeTreeNodeUpdateState(isUpdatedTreeNode: any): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.ChangeTreeNodeUpdateStateAction(isUpdatedTreeNode));
  }

  public updateNodesStatus(data: any): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.UpdateNodesStatusAction(data));
  }

  public getTreeFallNavigator(query: any): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.GetTreeFallNavigatorAction.LoadAction(query));
  }

  public updateSelectedNode(selectedNode: any): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.UpdateSelectedNodeAction(selectedNode));
  }

  public loadMessage(data: Message): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.LoadMessageAction(data));
  }

  public loadFallNavigator(data: FallNavigator): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.LoadFallNavigatorAction(data));
  }

  public addNewNode(addNewNode: any): void {
    this.faModulTreeState$.dispatch(new faModulTreeActions.AddNewNodeAction(addNewNode));
  }
}
