import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';

import * as faModulTreeReducer from './reducers/fa-modul-tree.reducer';

export interface IFaModulTreeState {
  faModulTree: faModulTreeReducer.State;
}

export const reducers: ActionReducerMap<IFaModulTreeState> = {
  faModulTree: faModulTreeReducer.reducer
};

export const getFeatureFaModulTreeState = createFeatureSelector<IFaModulTreeState>(
  AppEnums.FeatureModule.faModulTree
);

export const getFaModulTreeState = createSelector(
  getFeatureFaModulTreeState,
  (state: IFaModulTreeState) => state.faModulTree,
);

// Get TreeView Items
export const getTreeViewItems = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetTreeViewItems.getData,
);
export const getTreeViewItemsLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetTreeViewItems.getLoading
);
export const getTreeViewItemsLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetTreeViewItems.getLoaded
);
export const getTreeViewItemsFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetTreeViewItems.getFailed
);

// Get Right Content Items
export const getRightContentItems = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetRightContentItems.getData,
);
export const getRightContentItemsLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetRightContentItems.getLoading
);
export const getRightContentItemsLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetRightContentItems.getLoaded
);
export const getRightContentItemsFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetRightContentItems.getFailed
);

// Get UserID FaLeistung
export const getUserIDFaLeistung = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetUserIDFaLeistung.getData,
);
export const getUserIDFaLeistungLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetUserIDFaLeistung.getLoading
);
export const getUserIDFaLeistungLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetUserIDFaLeistung.getLoaded
);
export const getUserIDFaLeistungFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetUserIDFaLeistung.getFailed
);

// Get UserID FaPhase
export const getUserIDFaPhase = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetUserIDFaPhase.getData,
);
export const getUserIDFaPhaseLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetUserIDFaPhase.getLoading
);
export const getUserIDFaPhaseLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetUserIDFaPhase.getLoaded
);
export const getUserIDFaPhaseFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetUserIDFaPhase.getFailed
);

// Get FaLeistung By BaPersonID
export const getFaLeistungByBaPersonID = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetFaLeistungByBaPersonID.getData,
);
export const getFaLeistungByBaPersonIDLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetFaLeistungByBaPersonID.getLoading
);
export const getFaLeistungByBaPersonIDLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetFaLeistungByBaPersonID.getLoaded
);
export const getFaLeistungByBaPersonIDFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetFaLeistungByBaPersonID.getFailed
);

// Get Count FaPhase
export const getCountFaPhase = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetCountFaPhase.getData,
);
export const getCountFaPhaseLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetCountFaPhase.getLoading
);
export const getCountFaPhaseLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetCountFaPhase.getLoaded
);
export const getCountFaPhaseFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetCountFaPhase.getFailed
);

// Get Config Int
export const getConfigInt = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigInt.getData,
);
export const getConfigIntLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigInt.getLoading
);
export const getConfigIntLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigInt.getLoaded
);
export const getConfigIntFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigInt.getFailed
);

export const getConfigOffeneIntakeLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigOffeneIntake.getLoaded
);
export const getConfigOffeneIntakeLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigOffeneIntake.getLoading
);
export const getConfigOffeneIntakeFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigOffeneIntake.getFailed
);
export const getConfigOffeneIntake = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigOffeneIntake.getData
);

export const getConfigTotalBeratungsphasenLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigTotalBeratungsphasen.getLoaded
);
export const getConfigTotalBeratungsphasenLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigTotalBeratungsphasen.getLoading
);
export const getConfigTotalBeratungsphasenFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigTotalBeratungsphasen.getFailed
);
export const getConfigTotalBeratungsphasen = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigTotalBeratungsphasen.getData
);

export const getConfigTransferPhaseUserLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigTransferPhaseUser.getLoaded
);
export const getConfigTransferPhaseUserLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigTransferPhaseUser.getLoading
);
export const getConfigTransferPhaseUserFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigTransferPhaseUser.getFailed
);
export const getConfigTransferPhaseUser = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigTransferPhaseUser.getData
);

// Get Config Bool
export const getConfigBool = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigBool.getData,
);
export const getConfigBoolLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigBool.getLoading
);
export const getConfigBoolLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigBool.getLoaded
);
export const getConfigBoolFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetConfigBool.getFailed
);

// Get FaPhase By FaLeistungID
export const getFaPhaseByFaLeistungID = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetFaPhaseByFaLeistungID.getData,
);
export const getFaPhaseByFaLeistungIDLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetFaPhaseByFaLeistungID.getLoading
);
export const getFaPhaseByFaLeistungIDLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetFaPhaseByFaLeistungID.getLoaded
);
export const getFaPhaseByFaLeistungIDFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetFaPhaseByFaLeistungID.getFailed
);

// Update FaLeistung
export const updateFaLeistung = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.UpdateFaLeistung.getData,
);
export const updateFaLeistungLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.UpdateFaLeistung.getLoading
);
export const updateFaLeistungLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.UpdateFaLeistung.getLoaded
);
export const updateFaLeistungFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.UpdateFaLeistung.getFailed
);

// Insert FaPhase
export const insertFaPhase = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.InsertFaPhase.getData,
);
export const insertFaPhaseLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.InsertFaPhase.getLoading
);
export const insertFaPhaseLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.InsertFaPhase.getLoaded
);
export const insertFaPhaseFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.InsertFaPhase.getFailed
);

// Get Message Information
export const getMessageInformation = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.getMessageInformation.getData
);
export const getMessageInformationLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.getMessageInformation.getLoaded
);
export const getMessageInformationLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.getMessageInformation.getLoading
);
export const getMessageInformationFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.getMessageInformation.getFailed
);

// Get DataUsedFaLeistung By FaLeistungID
export const getDataUsedFaLeistungByFaLeistungID = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetDataUsedFaLeistungByFaLeistungID.getData,
);
export const getDataUsedFaLeistungByFaLeistungIDLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetDataUsedFaLeistungByFaLeistungID.getLoading
);
export const getDataUsedFaLeistungByFaLeistungIDLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetDataUsedFaLeistungByFaLeistungID.getLoaded
);
export const getDataUsedFaLeistungByFaLeistungIDFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetDataUsedFaLeistungByFaLeistungID.getFailed
);

// Delete Fallverlauf
export const deleteFallverlauf = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.DeleteFallverlauf.getData,
);
export const deleteFallverlaufLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.DeleteFallverlauf.getLoading
);
export const deleteFallverlaufLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.DeleteFallverlauf.getLoaded
);
export const deleteFallverlaufFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.DeleteFallverlauf.getFailed
);

// Delete Phase
export const deletePhase = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.DeletePhase.getData,
);
export const deletePhaseLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.DeletePhase.getLoading
);
export const deletePhaseLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.DeletePhase.getLoaded
);
export const deletePhaseFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.DeletePhase.getFailed
);

// Get BaPersonIDModulID
export const getBaPersonIDModulID = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetBaPersonIDModulID.getData,
);
export const getBaPersonIDModulIDLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetBaPersonIDModulID.getLoading
);
export const getBaPersonIDModulIDLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetBaPersonIDModulID.getLoaded
);
export const getBaPersonIDModulIDFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.GetBaPersonIDModulID.getFailed
);

export const getTreeNodeUpdateState = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.getTreeNodeUpdateState,
);

export const getNodesStatus = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.getNodesStatus
);

export const getTreeFallNavigator = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.getTreeFallNavigator.getData,
);
export const getTreeFallNavigatorLoading = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.getTreeFallNavigator.getLoading
);
export const getTreeFallNavigatorLoaded = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.getTreeFallNavigator.getLoaded
);
export const getTreeFallNavigatorFailed = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.getTreeFallNavigator.getFailed
);

export const getSelectedNode = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.getSelectedNode
);

export const loadMessage = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.loadMessage
);

export const loadFallNavigator = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.loadFallNavigator
);

export const getAddNewNode = createSelector(
  getFaModulTreeState,
  faModulTreeReducer.getAddNewNode
);
