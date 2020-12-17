import { DatePipe } from '@angular/common';
import { Component, Injector, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FallNavFilterModel } from '@app/kiss4-main/fall-navigator/models';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstant } from '@shared/common/constant.common';
import { FallfuhrungTreeConstant } from '@shared/common/fallfuhrung-tree.common';
import { BaseComponent } from '@shared/components/base.component';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { getRoleSessionStorage, getUserIdFromLocalStorage } from '@shared/utilites';
import { DxTreeViewComponent } from 'devextreme-angular';
import { Subject, Subscription } from 'rxjs';
import { buffer, debounceTime } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { FaModulTreeSandbox } from '../fa-modul-tree.sandbox';
import { FallNavigator, Message } from '../models';
import {
  GetConfigIntQueryModel,
  GetCountFaPhaseModel,
  GetFaLeistungByBaPersonIDModel,
  InsertFaPhaseQueryModel,
  MessageInformationQueryModel,
  UpdateFaLeistungQueryModel,
} from '../models/beratungsphase.model';
import { RightContentItem } from '../models/right-content-item.model';
import { TreeViewItem, TreeViewItemsQuery } from '../models/tree-view-item.model';

@Component({
  selector: 'kiss-fa-modul-tree',
  templateUrl: './fa-modul-tree.component.html',
  styleUrls: ['./fa-modul-tree.component.scss']
})
export class FaModulTreeComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() baPersonID: any;

  @ViewChild('treeView') treeView: DxTreeViewComponent;

  dateFormat = CommonConstant.DATE_FORMAT.dd_MM_yyyy;
  readonly NEUS_INTAKE_FAPHASE_CODE = 1;
  readonly NEUS_BERATUNGSPHASE_FAPHASE_CODE = 2;
  iconName = FallfuhrungTreeConstant.Fallfuhrung;
  iconShortName = FallfuhrungTreeConstant.codeF;
  isShiftKeyDown = false;
  isPopupVisible = false;
  private subscriptions: Subscription[] = [];
  private treeViewItemsQuery: any;
  treeViewDataSource: any[] = [];
  rightContentItems: RightContentItem[];
  initialSelectedItem: TreeViewItem;
  selectedItem: any;
  newFaPhaseAddition: any;
  isNeuesIntakeVisible: boolean;
  isNeueBeratungsphaseVisible: boolean;
  isLoschenVisible: boolean;
  isFrmFallZugriffVisible: boolean;
  isFrmFallInfoVisible: boolean;
  isPeriode: boolean;
  isPhase: boolean;
  owner: any;
  userIsOwner: boolean;
  viewEntfernenPerson = false;
  entfernenPerson = '';
  deleteTreeNodeObj: Message = new Message();
  isDeleteFaPhaseSuccess = false;
  pkey: number;
  userID: string;
  dataNavigator: FallNavigator = new FallNavigator();
  popUpModel: PopUpModel;
  deleteResult: any;
  nodeAfterDelete: any;
  neuesIntakeCaption = 'Neues Intake';
  neueBeratungsphaseCaption = 'Neue Beratungsphase';
  stickyItems: any;
  nodesStatus: any;
  faPhaseCode: number;
  countIntake: number;
  countOpenIntake: number;
  countBeratung: number;
  countOpenBeratung: number;
  configTotalIntakePhasen: number;
  configOffeneIntakePhasen: number;
  configIntakeErstePhase: number;
  configTotalBeratungsphasen: number;
  getCountFaPhaseModel: GetCountFaPhaseModel = new GetCountFaPhaseModel();
  modelQueryConfigToTalIntake: GetConfigIntQueryModel = new GetConfigIntQueryModel();
  modelQueryConfigOffeneIntake: GetConfigIntQueryModel = new GetConfigIntQueryModel();
  modelQueryConfigTotalBeratungsphasen: GetConfigIntQueryModel = new GetConfigIntQueryModel();
  modelQueryConfigTransferPhaseUser: GetConfigIntQueryModel = new GetConfigIntQueryModel();
  modelQueryConfigIntakeErstePhase: GetConfigIntQueryModel = new GetConfigIntQueryModel();
  newDate: any;
  insertFaPhaseQueryModel: InsertFaPhaseQueryModel = new InsertFaPhaseQueryModel();
  faLeistungByBaPersonIDModel: GetFaLeistungByBaPersonIDModel = new GetFaLeistungByBaPersonIDModel();
  transfer: boolean;
  idInsertFaPhase: number;
  updateFaLeistungQueryModel: UpdateFaLeistungQueryModel = new UpdateFaLeistungQueryModel();
  identity: number;
  information = 'information';
  modelQueryMessage: MessageInformationQueryModel = new MessageInformationQueryModel();
  ctlFaModulTree = 'CtlFaModulTree';
  clickStream$ = new Subject();
  dbclickStream$ = this.clickStream$.pipe(buffer(this.clickStream$.pipe(debounceTime(300))));
  treeFallNavigator: any;
  newBaPerson: any;
  limitedSelectedActions: Array<any> = [];
  languageCurrent: any;
  showPopover = false;

  constructor(
    private router: Router,
    public faModulTreeSandbox: FaModulTreeSandbox,
    public translateService: TranslateService,
    private datePipe: DatePipe,
    public layoutSandbox: LayoutSandbox,
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.registerEvents();
    this.initData();
    this.initPopUpModel();
  }

  ngOnDestroy() {
    this.unregisterEvents();
    this.faModulTreeSandbox.resetTreeState();
  }

  registerEvents() {
    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.onUrlChanged(event.url);
        }
      })
    );

    this.subscriptions.push(
      this.layoutSandbox.selectedAction$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.stickyItems = data;
          this.limitedSelectedActions = this.stickyItems.length > 6 ? this.stickyItems.slice(length - 6, length) : this.stickyItems;
        }
      })
    );

    this.subscriptions.push(
      this.faModulTreeSandbox.getRightContentItems$.subscribe(data => {
        if (isNullOrUndefined(data) || data.status) {
          return;
        }
        this.updateRightContentItemCaption(data);
      })
    );

    this.subscriptions.push(
      this.faModulTreeSandbox.getTreeViewItems$.subscribe(data => {
        if (isNullOrUndefined(data) || data.status) {
          return;
        }
        this.afterTreeViewGetDatasource(data);
        this.faModulTreeSandbox.changeTreeNodeUpdateState(false);
      })
    );

    this.subscriptions.push(
      this.faModulTreeSandbox.getUserIDFaLeistung$.subscribe(data => {
        if (isNullOrUndefined(data) || data.status) {
          return;
        }
        this.owner = data.userId;
        this.handleLoschenVisible();
      })
    );

    this.subscriptions.push(
      this.faModulTreeSandbox.getUserIDFaPhase$.subscribe(data => {
        if (isNullOrUndefined(data) || data.status) {
          return;
        }
        this.owner = data.userId;
        this.handleLoschenVisible();
      })
    );

    this.subscriptions.push(this.faModulTreeSandbox.getFaLeistungByBaPersonID$.subscribe(data => {
      if (isNullOrUndefined(data) || data.status) {
        return;
      }
      if (!isNullOrUndefined(data.datumBis)) {
        this.getMessageInformation(this.ctlFaModulTree, 'FallverlaufBereitsAbgeschlossen', 'Der aktuellste Fallverlauf ist bereits abgeschlossen!');
        return;
      }
      this.faLeistungByBaPersonIDModel = data;
      this.getConfigData();
      this.faModulTreeSandbox.getCountFaPhase(data.faLeistungId);
    }));

    this.subscriptions.push(this.faModulTreeSandbox.getCountFaPhase$.subscribe(data => {
      if (isNullOrUndefined(data) || data.status) {
        return;
      }
      if (data.length > 0) {
        this.getCountFaPhaseModel = data[0];
        if (data[0].countOpenBeratung > 0) {
          this.getMessageInformation(this.ctlFaModulTree, 'NichtAbgeschlPhasenVorhanden', 'Es gibt noch nicht abgeschlossene Beratungsphasen!');
          return;
        }
        this.checkValidateBeforeNeueFaPhase();
      }
    }));

    this.subscriptions.push(this.faModulTreeSandbox.getConfigInt$.subscribe(data => {
      if (isNullOrUndefined(data) || data.status) {
        return;
      }
      if (!isNullOrUndefined(data.value)) {
        this.configTotalIntakePhasen = data.value;
      }
    }));
    // other getConfigInt
    this.subscriptions.push(this.faModulTreeSandbox.getConfigOffeneIntake$.subscribe(data => {
      if (isNullOrUndefined(data) || data.status) {
        return;
      }
      if (!isNullOrUndefined(data.value)) {
        this.configOffeneIntakePhasen = data.value;
      }
    }));
    // other getConfigInt
    this.subscriptions.push(this.faModulTreeSandbox.getConfigTotalBeratungsphasen$.subscribe(data => {
      if (isNullOrUndefined(data) || data.status) {
        return;
      }
      if (!isNullOrUndefined(data.value)) {
        this.configTotalBeratungsphasen = data.value;
      }
    }));
    // other getConfigInt
    this.subscriptions.push(this.faModulTreeSandbox.getConfigTransferPhaseUser$.subscribe(data => {
      if (isNullOrUndefined(data) || data.status) {
        return;
      }
      if (!isNullOrUndefined(data.value)) {
        if (data.value === 1) {
          this.transfer = false;
        }
        this.checkValidateBeforeUpdateFaleistung();
      }
    }));

    this.subscriptions.push(this.faModulTreeSandbox.getConfigBool$.subscribe(data => {
      if (isNullOrUndefined(data) || data.status) {
        return;
      }
      if (!isNullOrUndefined(data.value)) {
        this.configIntakeErstePhase = data.value;
      }
    }));

    this.subscriptions.push(this.faModulTreeSandbox.updateFaLeistung$.subscribe(data => {
      if (isNullOrUndefined(data)) {
        return;
      }
      if (data.status) {
        // TODO use remaining
        this.handleError(data);
        return;
      }
      this.checkValidateAfterUpdateFaLeistung();
    }));

    this.subscriptions.push(this.faModulTreeSandbox.insertFaPhase$.subscribe(data => {
      if (isNullOrUndefined(data)) {
        return;
      }
      if (data.status) {
        // TODO use remaining
        this.handleError(data);
        return;
      }
      this.transfer = true;
      this.idInsertFaPhase = data.id;
      this.addNewNode();
      this.getConfigTransferPhaseUserToFall();
    }));

    this.subscriptions.push(
      this.faModulTreeSandbox.getDataUsedFaLeistungByFaLeistungID$.subscribe(data => {
        if (isNullOrUndefined(data) || data.status || data.length <= 0) {
          return;
        }
        this.checkValidateDelete(data[0]);
      })
    );

    this.subscriptions.push(
      this.faModulTreeSandbox.deleteFallverlauf$.subscribe(data => {
        if (isNullOrUndefined(data) || data.status) {
          return;
        }
        if (this.limitedSelectedActions.length > 1) {
          this.router.navigate([this.limitedSelectedActions[this.limitedSelectedActions.length - 2].url]);
        } else {
          this.router.navigate(['/']);
          this.loadDataFallNavigator();
        }
        this.layoutSandbox.deleteSelectedActionItems(this.stickyItems.find(ele => ele.url === `/${this.selectedItem.url}`));
      })
    );

    this.subscriptions.push(
      this.faModulTreeSandbox.deletePhase$.subscribe(data => {
        if (isNullOrUndefined(data) || data.status) {
          return;
        }
        this.getTreeViewItems();
        this.isDeleteFaPhaseSuccess = true;
      })
    );

    this.subscriptions.push(
      this.dbclickStream$.subscribe((clickedItems: any[]) => {
        if (clickedItems.length >= 2 && clickedItems[0].itemIndex === clickedItems[1].itemIndex) {
          this.faModulTreeSandbox.getBaPersonIDModulID(clickedItems[0].itemData.faLeistungID);
        } else {
          this.goto(clickedItems[0].itemData);
        }
      })
    );

    this.subscriptions.push(
      this.faModulTreeSandbox.getBaPersonIDModulID$.subscribe(data => {
        if (isNullOrUndefined(data) || data.status) {
          return;
        }
        this.navigatorByBaPersonIDModulID(data);
      })
    );

    this.subscriptions.push(
      this.faModulTreeSandbox.nodesStatus$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.nodesStatus = data;
          this.displayEdittingIcon(this.nodesStatus);
        }
      })
    );

    this.subscriptions.push(this.faModulTreeSandbox.GetMessageInformation$.subscribe(result => {
      if (!isNullOrUndefined(result) && !isNullOrUndefined(result.message)) {
        this.showPopupInformation(this.translateService.instant('Fallbearbeitung.Message.TitleInformation'), result.message);
      }
    }));

    this.subscriptions.push(
      this.faModulTreeSandbox.treeNodeUpdateState$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.getTreeViewItems();
        }
      })
    );

    this.subscriptions.push(
      this.faModulTreeSandbox.getTreeFallNavigator$.subscribe(data => {
        if (isNullOrUndefined(data) || data.status) {
          return;
        }
        this.treeFallNavigator = data;
      })
    );
  }

  unregisterEvents() {
    this.subscriptions.forEach(i => i.unsubscribe());
  }

  initData(): void {
    const urlParameters = this.router.url.split('/');
    this.baPersonID = urlParameters[5];
    this.getRightContentItems();
    this.getTreeViewItems();
    this.getTreeFallNavigator();
  }

  getRightContentItems() {
    this.faModulTreeSandbox.getRightContentItems('DynaPhase');
  }

  getTreeViewItems(): void {
    this.treeViewItemsQuery = new TreeViewItemsQuery();
    this.treeViewItemsQuery.BaPersonID = this.baPersonID;
    this.treeViewItemsQuery.ModulID = FallfuhrungTreeConstant.ModulIdF;
    this.faModulTreeSandbox.getTreeViewItems(this.treeViewItemsQuery);
  }

  getTreeFallNavigator() {
    this.userID = getUserIdFromLocalStorage();
    this.languageCurrent = localStorage.getItem('currentLang.Culture');
    const filters: FallNavFilterModel = {
      UserId: this.userID,
      Active: true,
      Closed: true,
      Archived: true,
      IncludeGroup: true,
      IncludeGuest: true,
      IncludeTasks: true
    };
    this.faModulTreeSandbox.getTreeFallNavigator(filters);
  }

  initPopUpModel() {
    this.popUpModel = new PopUpModel(
      {
        title: '',
        isVisibleTitle: true,
        isVisible: false,
        message: '',
        textYes: '',
        isVisibleYes: false,
        textNo: '',
        isVisibleNo: false,
        funcYes: null,
        funcNo: null,
      }
    );
  }

  onUrlChanged(url) {
    this.updateOrAddSticky(url);
    const urlParameters = url.split('/');
    if (this.iconShortName !== urlParameters[3] || this.baPersonID !== urlParameters[5]) {
      this.iconShortName = urlParameters[3];
      this.iconName = urlParameters[4];
      this.baPersonID = urlParameters[5];
      this.getTreeViewItems();
      return;
    }
    this.selectedItem = this.treeViewDataSource.find(item => `/${item.url}` === url);
    if (this.selectedItem) {
      this.treeView.instance.selectItem(this.selectedItem.id);
      this.faModulTreeSandbox.updateSelectedNode(this.selectedItem);
    }
  }

  updateRightContentItemCaption(rightContentItems: RightContentItem[]) {
    rightContentItems.forEach(rightContentItem => {
      if (rightContentItem.value1 != null) {
        switch (rightContentItem.code) {
          case 1:
            this.neuesIntakeCaption = rightContentItem.value1;
            break;
          case 2:
            this.neueBeratungsphaseCaption = rightContentItem.value1;
            break;
          default:
            break;
        }
      }
    });
  }

  afterTreeViewGetDatasource(data) {
    if (data.length > 0) {
      data = this.makeUrlForItemF(data);
      this.selectedItem = data[0];
      if (data.length > 1) {
        // TODO check old tree status
        // if null -> setDefault
        this.setDefaultTreeStatus(data);
        if (this.isDeleteFaPhaseSuccess) {
          this.isDeleteFaPhaseSuccess = false;
          this.selectedItem = data.find(item => item.pkey === this.pkey);
        } else if (this.identity > 0) {
          const nextUrl = `${FallfuhrungTreeConstant.mainUrl}${FallfuhrungTreeConstant.fUrl}${this.selectedItem.baPersonID}/${this.selectedItem.faLeistungID}/${FallfuhrungTreeConstant.Beratungsphase}/${this.idInsertFaPhase}`;
          this.router.navigate([nextUrl]);
          this.selectedItem = data.find(item => `${item.url}` === nextUrl);
        } else {
          this.selectedItem = data.find(item => `/${item.url}` === this.router.url);
        }
      }
      if (this.selectedItem) {
        this.selectedItem.isSelected = true;
        this.selectedItem.isExpanded = true;
        this.faModulTreeSandbox.updateSelectedNode(this.selectedItem);
      }
    }
    this.treeViewDataSource = data;
  }

  makeUrlForItemF(data) {
    let numberOfFallfuhrung = 0;
    data.forEach(item => {
      let targetUrl = FallfuhrungTreeConstant.mainUrl + FallfuhrungTreeConstant.fUrl + this.baPersonID;
      switch (item.className) {
        case FallfuhrungTreeConstant.CtlFaBeratungsperiode:
          numberOfFallfuhrung++;
          targetUrl += numberOfFallfuhrung > 1 ? `/${item.faLeistungID}` : '';
          break;
        case FallfuhrungTreeConstant.CtlFaBeratungsphase:
          targetUrl += `/${item.faLeistungID}/${FallfuhrungTreeConstant.Beratungsphase}/${item.faPhaseID}`;
          break;
        case FallfuhrungTreeConstant.CtlFaAktennotiz:
          targetUrl += `/${item.faLeistungID}/${FallfuhrungTreeConstant.Dokumentation}/${FallfuhrungTreeConstant.Besprechung}`;
          break;
        default:
          targetUrl += `/${FallfuhrungTreeConstant.NotImplementUrl}`;
          break;
      }
      item.url = targetUrl;
    });
    return data;
  }

  setDefaultTreeStatus(data) {
    data[1].isExpanded = true;
    const childNodes = data.filter(ele => ele.parentID === data[1].id);
    if (childNodes && childNodes.length > 0) {
      data[data.indexOf((childNodes[0]))].isExpanded = true;
    }
    if (childNodes && childNodes.length > 1) {
      data[data.indexOf((childNodes[1]))].isExpanded = true;
    }
    data[1].isSelected = true;
  }

  toggleVisiblePopover(itemObj) {
    if (!itemObj.visiblePopover) {
      this.isLoschenVisible = false;
      this.isNeueBeratungsphaseVisible = false;
      this.isNeuesIntakeVisible = false;
      if (this.checkIsReadRole('FaNavigNewIntake')) {
        this.isNeuesIntakeVisible = true;
      }
      if (this.checkIsReadRole('FaNavigNewPhase')) {
        this.isNeueBeratungsphaseVisible = true;
      }
      this.isPeriode = itemObj.className === 'CtlFaBeratungsperiode';
      this.isPhase = false;
      if (itemObj.className === 'CtlFaBeratungsphase') {
        const parentNode = this.getParentNodeByParentID(itemObj.parentID);
        this.isPhase = (parentNode != null && parentNode.className === 'CtlFaBeratungsperiode');
      }
      this.owner = -1;
      if (this.isPeriode) {
        this.faModulTreeSandbox.getUserIDFaLeistung(itemObj.faLeistungID);
      }
      if (this.isPhase) {
        this.faModulTreeSandbox.getUserIDFaPhase(itemObj.faPhaseID);
      }
      this.isFrmFallZugriffVisible = ((this.isPeriode || this.isPhase) && this.checkIsReadRole('FrmFallZugriff'));
      // Not implement btn [Fallinfo] visible
      if (this.isNeuesIntakeVisible
        || this.isNeueBeratungsphaseVisible
        || this.isLoschenVisible
        || this.isFrmFallZugriffVisible
        || this.isFrmFallInfoVisible) {
        itemObj.visiblePopover = true;
      }
      return;
    }
    itemObj.visiblePopover = false;
  }

  handleLoschenVisible() {
    this.userIsOwner = false;
    if (this.owner === parseInt(getUserIdFromLocalStorage(), 10)) {
      this.userIsOwner = true;
    }
    if (this.isPeriode && this.userIsOwner && this.checkIsReadRole('FaNavigDeletePeriode')) {
      this.isLoschenVisible = true;
    }
    if (this.isPhase && this.userIsOwner && this.checkIsReadRole('FaNavigDeletePhase')) {
      this.isLoschenVisible = true;
    }
  }

  checkIsReadRole(name: any) {
    const isUserHasRight = getRoleSessionStorage(name);
    return !isNullOrUndefined(isUserHasRight) && !isNullOrUndefined(isUserHasRight.IsRead);
  }

  unvisiblePopoverModuleB(itemObj) {
    itemObj.visiblePopoverB = false;
    this.showPopover = false;
  }

  // need update url
  openAddNewForm(itemObj) {
    this.unvisiblePopoverModuleB(itemObj);
  }

  private getParentNodeByParentID(parentID) {
    const parentNodes = this.treeViewDataSource.filter(item => item.id === parentID);
    return parentNodes.length > 0 ? parentNodes[0] : null;
  }

  neuesIntakeMenuItem(itemObj) {
    this.hideRightContent(itemObj);
    this.selectedItem = itemObj;
    this.faPhaseCode = this.NEUS_INTAKE_FAPHASE_CODE;
    this.faModulTreeSandbox.getFaLeistungByBaPersonID(+this.baPersonID);
  }

  neueBeratungsphaseMenuItem(itemObj) {
    this.hideRightContent(itemObj);
    this.selectedItem = itemObj;
    this.faPhaseCode = this.NEUS_BERATUNGSPHASE_FAPHASE_CODE;
    this.faModulTreeSandbox.getFaLeistungByBaPersonID(+this.baPersonID);
  }

  onItemClick(e) {
    if (e.itemData.id.indexOf(FallfuhrungTreeConstant.nodeIdFirstLetter) === 0) {
      this.clickStream$.next(e);
    } else {
      this.goto(e.itemData);
    }
  }

  goto(itemData) {
    this.router.navigate([itemData.url]);
  }

  displayEdittingIcon(nodesStatus) {
    if (this.treeView.instance) {
      const items = this.treeView.instance.option('items');
      nodesStatus.forEach(element => {
        const tempNode = items.find(item => `/${item.url}` === element.id);
        if (tempNode) {
          if (element.isEditMode) {
            tempNode.icon = FallfuhrungTreeConstant.edittingIconLocation;
          } else {
            tempNode.icon = '';
          }
        }
      });
    }
  }

  deleteFallverlaufData() {
    this.faModulTreeSandbox.deleteFallverlauf(this.selectedItem.faLeistungID);
  }

  deleteFaPhaseData() {
    this.pkey = this.selectedItem.pkey;
    this.faModulTreeSandbox.deletePhase(this.selectedItem.faPhaseID);
  }

  deleteNodeTree(itemObj) {
    this.hideRightContent(itemObj);
    this.selectedItem = itemObj;
    if (itemObj.className === 'CtlFaBeratungsperiode') {
      this.faModulTreeSandbox.getDataUsedFaLeistungByFaLeistungID(itemObj.faLeistungID);
    } else {
      const className = this.getParentNodeByParentID(itemObj.parentID).className ? this.getParentNodeByParentID(itemObj.parentID).className : '';
      if (itemObj.className === 'CtlFaBeratungsphase' && className === 'CtlFaBeratungsperiode') {
        const popupTitle = this.translateService.instant('Fallbearbeitung.Message.TitleConfirm');
        const popupMessage = (this.translateService.instant('Fallbearbeitung.Message.MessageDeletePhaseFirst'))
          + '\'' + itemObj.name + ` ${this.datePipe.transform(itemObj.aufnahme, 'dd.MM.yyyy')}`
          + '\'' + this.translateService.instant('Fallbearbeitung.Message.MessageDeletePhaseLast');
        const popupTextYes = this.translateService.instant('Fallbearbeitung.Message.ComfirmYes');
        const popupTextNo = this.translateService.instant('Fallbearbeitung.Message.ComfirmNo');
        this.showPopupConfirm(popupTitle, popupMessage, () => this.deleteFaPhaseData(), null, true, true, popupTextYes, popupTextNo);
      }
    }
  }

  checkValidateDelete(data: any) {
    if (data.datumBis) {
      this.deleteTreeNodeObj.message = this.translateService.instant('Fallbearbeitung.Message.MessageDatumbis');
      this.faModulTreeSandbox.loadMessage(this.deleteTreeNodeObj);
      return;
    }
    if (data.countPhase > 0) {
      this.deleteTreeNodeObj.message = this.translateService.instant('Fallbearbeitung.Message.MessageCountPhaseFirst') + data.countPhase +
        this.translateService.instant('Fallbearbeitung.Message.MessageCountPhaseLast');
      this.faModulTreeSandbox.loadMessage(this.deleteTreeNodeObj);
      return;
    }
    if (data.countDatenErfasst > 0) {
      this.deleteTreeNodeObj.message = this.translateService.instant('Fallbearbeitung.Message.MessageCountDatenErfasst');
      this.faModulTreeSandbox.loadMessage(this.deleteTreeNodeObj);
      return;
    }
    if (data.hasOtherModul) {
      this.deleteTreeNodeObj.message = this.translateService.instant('Fallbearbeitung.Message.MessageHasOtherModul');
      this.faModulTreeSandbox.loadMessage(this.deleteTreeNodeObj);
      return;
    }
    if (data.hasClosedModul) {
      if (!data.hasClosedF) {
        this.deleteTreeNodeObj.message = this.translateService.instant('Fallbearbeitung.Message.MessageHasClosedModul');
        this.faModulTreeSandbox.loadMessage(this.deleteTreeNodeObj);
        return;
      }
    }
    const popupTitle = this.translateService.instant('Fallbearbeitung.Message.TitleConfirm');
    const popupMessage = (this.translateService.instant('Fallbearbeitung.Message.MessageDeleteFallverlaufFirst'))
      + this.selectedItem.name + ' \'' + `${this.datePipe.transform(this.selectedItem.aufnahme, 'dd.MM.yyyy')}`
      + '\'' + this.translateService.instant('Fallbearbeitung.Message.MessageDeleteFallverlaufLast');
    const popupTextYes = this.translateService.instant('Fallbearbeitung.Message.ComfirmYes');
    const popupTextNo = this.translateService.instant('Fallbearbeitung.Message.ComfirmNo');
    this.showPopupConfirm(popupTitle, popupMessage, () => this.deleteFallverlaufData(), null, true, true, popupTextYes, popupTextNo);
  }

  showPopupInformation(title, message) {
    this.showPopupConfirm(title, message, null, null, false, false, '', '');
  }

  showPopupConfirm(title, message, funcComfirmYes, funcComfirmNo, isVisibleYes, isVisibleNo, textYes, textNo) {
    this.initPopUpModel();
    this.popUpModel.title = title;
    this.popUpModel.message = message;
    this.popUpModel.isVisibleYes = isVisibleYes;
    this.popUpModel.isVisibleNo = isVisibleNo;
    this.popUpModel.textYes = textYes;
    this.popUpModel.textNo = textNo;
    this.popUpModel.funcYes = () => {
      if (funcComfirmYes && typeof funcComfirmYes === 'function') {
        funcComfirmYes();
      }
      this.popUpModel.isVisible = false;
    };

    this.popUpModel.funcNo = () => {
      if (funcComfirmNo && typeof funcComfirmNo === 'function') {
        funcComfirmNo();
      }
      this.popUpModel.isVisible = false;
    };
    this.popUpModel.isVisible = true;
  }

  handleResultDelete(node) {
    if (node) {
      this.goto(node);
      this.getTreeViewItems();
    }
  }

  loadDataFallNavigator() {
    this.dataNavigator.dataFallNavigator = 'E' + this.userID;
    this.faModulTreeSandbox.loadFallNavigator(this.dataNavigator);
  }

  checkValidateBeforeNeueFaPhase() {
    this.countIntake = this.getCountFaPhaseModel.countIntake;
    this.countOpenIntake = this.getCountFaPhaseModel.countOpenIntake;
    this.countBeratung = this.getCountFaPhaseModel.countBeratung;
    if (this.faPhaseCode === 1) {
      if (this.configTotalIntakePhasen > -1 && this.countIntake >= this.configTotalIntakePhasen) {
        if (this.configTotalIntakePhasen === 0) {
          this.getMessageInformation(this.ctlFaModulTree, 'KeineIntakePhaseErlaubt', 'Es dürfen keine Intake-Phasen erstellt werden.');
          return;
        }
        this.getMessageInformation(this.ctlFaModulTree, 'MaximaleAnzahlIntakePhasenErreicht', 'Es kann keine weitere Intake-Phase erstellt werden. Die maximale Anzahl Intake-Phasen ist erreicht.');
        return;
      }
      switch (this.countOpenIntake) {
        case 0:
          break;

        case 1:
          if (this.configOffeneIntakePhasen === 1) {
            this.getMessageInformation(this.ctlFaModulTree, 'IntakePhaseVorhanden1', 'Es gibt bereits eine offene Intake-Phase!');
            return;
          }
          this.getMessageInformation(this.ctlFaModulTree, 'IntakePhaseVorhanden2', 'Achtung, es gibt bereits eine offene Intake-Phase!');
          break;

        case 2:
          this.getMessageInformation(this.ctlFaModulTree, '2OffeneIntakePhasen', 'Es gibt bereits 2 offene Intake-Phasen!');
          return;

        default:
          return;
      }
    } else {
      if (this.configTotalBeratungsphasen > -1 && this.countBeratung >= this.configTotalBeratungsphasen) {
        if (this.configTotalBeratungsphasen === 0) {
          this.getMessageInformation(this.ctlFaModulTree, 'KeineBeratungsphaseErlaubt', 'Es dürfen keine Beratungsphasen erstellt werden.');
          return;
        }
        this.getMessageInformation(this.ctlFaModulTree, 'MaximaleAnzahlBeratungsphasenErreicht', 'Es kann keine weitere Beratungsphase erstellt werden. Die maximale Anzahl Beratungsphasen ist erreicht.');
        return;
      }

      if (this.configIntakeErstePhase && this.countIntake === 0) {
        this.getMessageInformation(this.ctlFaModulTree, 'ErstePhaseMussIntakeSein', 'Die erste Phase muss eine Intake-Phase sein.');
        return;
      }

      if (this.countOpenIntake > 0) {
        this.getMessageInformation(this.ctlFaModulTree, 'IntakePhaseNichtAbgeschlossen', 'Es gibt noch nicht abgeschlossene Intake-Phasen!');
        return;
      }

    }
    this.neueFaPhase();
  }

  neueFaPhase() {
    this.getDataForInsertFaPhase();
    this.faModulTreeSandbox.insertFaPhase(this.insertFaPhaseQueryModel);
  }

  getDataForInsertFaPhase() {
    this.insertFaPhaseQueryModel.FaLeistungID = this.faLeistungByBaPersonIDModel.faLeistungId;
    this.insertFaPhaseQueryModel.FaPhaseCode = this.faPhaseCode;
  }

  getConfigData() {
    this.modelQueryConfigToTalIntake.keyPath = 'System\\Fallfuehrung\\TotalIntakePhasen';
    this.modelQueryConfigToTalIntake.defaultValue = -1;
    this.modelQueryConfigOffeneIntake.keyPath = 'System\\Fallfuehrung\\OffeneIntakePhasen';
    this.modelQueryConfigOffeneIntake.defaultValue = 1;
    this.modelQueryConfigTotalBeratungsphasen.keyPath = 'System\\Fallfuehrung\\TotalBeratungsphasen';
    this.modelQueryConfigTotalBeratungsphasen.defaultValue = -1;
    this.modelQueryConfigIntakeErstePhase.keyPath = 'System\\Fallfuehrung\\IntakeErstePhase';
    this.modelQueryConfigIntakeErstePhase.defaultValue = false;
    this.faModulTreeSandbox.getConfigBool(this.modelQueryConfigIntakeErstePhase);
    this.faModulTreeSandbox.getConfigInt({ ListGetConfigIntQuery: [this.modelQueryConfigToTalIntake] });
    this.faModulTreeSandbox.getConfigOffeneIntake({ ListGetConfigIntQuery: [this.modelQueryConfigOffeneIntake] });
    this.faModulTreeSandbox.getConfigTotalBeratungsphasen({ ListGetConfigIntQuery: [this.modelQueryConfigTotalBeratungsphasen] });
  }

  getConfigTransferPhaseUserToFall() {
    this.modelQueryConfigTransferPhaseUser.keyPath = 'System\\Fallfuehrung\\TransferPhaseUserToFall';
    this.modelQueryConfigTransferPhaseUser.defaultValue = 1;
    this.faModulTreeSandbox.getConfigTransferPhaseUser({ ListGetConfigIntQuery: [this.modelQueryConfigTransferPhaseUser] });
  }

  checkValidateBeforeUpdateFaleistung() {
    if (this.transfer === true) {
      this.updateFaLeistungQueryModel.faLeistungID = this.faLeistungByBaPersonIDModel.faLeistungId;
      this.faModulTreeSandbox.updateFaLeistung(this.updateFaLeistungQueryModel);
    }
  }

  checkValidateAfterUpdateFaLeistung() {
    this.identity = -1;
    if (this.idInsertFaPhase > 0) {
      this.identity = this.idInsertFaPhase;
    }
    this.getTreeViewItems();
  }

  handleError(data) {
    const body = JSON.parse(data._body);
    const message = body.message.toString();
    this.showPopupInformation(this.translateService.instant('Fallbearbeitung.Message.TitleInformation'), message);
  }

  getMessageInformation(maskName, messageName, defaultText) {
    this.modelQueryMessage.maskName = maskName;
    this.modelQueryMessage.messageName = messageName;
    this.modelQueryMessage.defaultText = defaultText;
    this.faModulTreeSandbox.getMessageInformation(this.modelQueryMessage);
  }

  addNewNode() {
    this.newFaPhaseAddition = {
      faPhaseID: this.idInsertFaPhase,
      baPersonID: this.selectedItem.baPersonID
    };
    this.faModulTreeSandbox.addNewNode(this.newFaPhaseAddition);
  }

  navigatorByBaPersonIDModulID(data) {
    let url = FallfuhrungTreeConstant.mainUrl;
    switch (data.modulID) {
      case FallfuhrungTreeConstant.ModulIdB:
        url += FallfuhrungTreeConstant.bUrl + data.baPersonID;
        break;
      case FallfuhrungTreeConstant.ModulIdF:
      case FallfuhrungTreeConstant.ModulIdFs:
        url += FallfuhrungTreeConstant.fUrl + data.baPersonID;
        break;
      case FallfuhrungTreeConstant.ModulIdS:
        url += FallfuhrungTreeConstant.sUrl + data.baPersonID;
        break;
      default:
        break;
    }
    if (url !== FallfuhrungTreeConstant.mainUrl) {
      this.newBaPerson = this.treeFallNavigator.find(ele => ele.baPersonId === data.baPersonID);
      this.router.navigate([url]);
    }
  }

  updateOrAddSticky(endUrl) {
    if (endUrl.includes(FallfuhrungTreeConstant.NotImplementUrl)) {
      return;
    }
    const endUrlParams = endUrl.split('/');
    let matchedStickyItem;
    this.stickyItems.forEach(element => {
      const stickyItemParams = element.url.split('/');
      if (stickyItemParams.length > 5 && endUrlParams[5] === stickyItemParams[5]) {
        matchedStickyItem = element;
        return;
      }
    });
    if (matchedStickyItem) {
      this.layoutSandbox.updateOrAddSticky(matchedStickyItem.data, endUrl);
    } else if (endUrlParams[2] === 'fallbearbeitung' && this.newBaPerson) {
      this.layoutSandbox.updateOrAddSticky(this.newBaPerson, endUrl);
    }
  }

  hideRightContent(itemObj) {
    itemObj.visiblePopover = false;
  }

  fallzugriff(itemObj) {
    this.hideRightContent(itemObj);
  }
}
