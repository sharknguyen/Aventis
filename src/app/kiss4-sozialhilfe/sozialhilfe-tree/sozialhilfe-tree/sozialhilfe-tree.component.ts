import { Component, DoCheck, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstant } from '@shared/common/constant.common';
import { FallfuhrungTreeConstant } from '@shared/common/fallfuhrung-tree.common';
import { BaseComponent } from '@shared/components/base.component';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { IPopUpModel } from '@shared/models/shared/popup-confirm.model';
import { DxTreeViewComponent } from 'devextreme-angular';
import { Subject, Subscription } from 'rxjs';
import { buffer, debounceTime } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { getRoleSessionStorage, getUserIdFromLocalStorage } from '@shared/utilites';
import { AppEnums } from '@shared/AppEnum';

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
import { TreeViewItem } from '../models/tree-view-item.model';
import { SozialhilfeTreeSandbox } from '../sozialhilfe-tree.sandbox';
import { filter } from 'lodash-es';

enum TypePopUp {
  ShowYesNo = 1,
  ShowYes = 2,
  ShowNo = 3,
  HideAll = 4
}

@Component({
  selector: 'kiss-sozialhilfe-tree',
  templateUrl: './sozialhilfe-tree.component.html',
  styleUrls: ['./sozialhilfe-tree.component.scss']
})
@SetClassRight('CtlSozialhilfeTree')
export class SozialhilfeTreeComponent extends BaseComponent implements OnInit, OnDestroy, DoCheck {
  @ViewChild('treeView') treeView: DxTreeViewComponent;

  icon_Characters_Url: any = 'assets/icon/characters-and-numbers/png/';
  readonly NEUS_INTAKE_FAPHASE_CODE = 1;
  readonly NEUS_BERATUNGSPHASE_FAPHASE_CODE = 2;
  dateFormat = CommonConstant.DATE_FORMAT.dd_MM_yyyy;
  baPersonID: string;
  iconName = '';
  iconShortName = '';
  isShiftKeyDown = false;
  isPopupVisible = false;
  private subscriptions: Subscription[] = [];
  private treeViewItemsQuery: any;
  treeViewDataSource: any[] = [];
  itemTreeNodeEmpty: any;
  isVisibalePopoverTreeEmpty = false;
  rightContentItems: RightContentItem[];
  initialSelectedItem: TreeViewItem;
  selectedItem: any;
  newFaPhaseAddition: any;
  isDelete = false;
  isCreateNew = false;
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
  confirmDialogData: IPopUpModel = {
    isVisible: false,
    title: this.translateService.instant('I001WhLeistung.Title.TitlePopup'),
    message: this.translateService.instant('I001WhLeistung.Message.MessageCanCel'),
    textYes: this.translateService.instant('I001WhLeistung.Button.Ja'),
    textNo: this.translateService.instant('I001WhLeistung.Button.Nein'),
    funcYes: () => this.buttonClicked('yes'),
    funcNo: () => this.buttonClicked('no'),
    funcHiding: () => this.buttonClicked('no'),
    isVisibleTitle: true,
    isVisibleYes: true,
    isVisibleNo: true,
  };

  deleteResult: any;
  nodeAfterDelete: any;
  textDisplayModel: any;
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
  // module B
  CtlBaHaushalt = FallfuhrungTreeConstant.CtlBaHaushalt;
  CtlBaInstitutionenFachpersonen = FallfuhrungTreeConstant.CtlBaInstitutionenFachpersonen;
  CtlArbeit = FallfuhrungTreeConstant.CtlArbeit;
  CtlGesundheit = FallfuhrungTreeConstant.CtlGesundheit;
  CtlBaPerson = FallfuhrungTreeConstant.CtlBaPerson;

  clickStream$ = new Subject();
  dbclickStream$ = this.clickStream$.pipe(buffer(this.clickStream$.pipe(debounceTime(300))));
  treeFallNavigator: any;
  newBaPerson: any;
  limitedSelectedActions: Array<any> = [];
  languageCurrent: any;
  showPopover = false;

  language: any;

  isNeuesFinanzplan = false;
  isNeueUberbruckung = false;
  isNeueSozialhilfe = false;
  isSozialhilfeloschen = false;
  isFallZugriff = false;
  isFallInfo = false;
  isNeueMonatsbuget = false;
  isMonatsbugetMasterbudget = false;
  isMonatsbugetLoschen = false;
  isFinanzplanloschen = false;

  constructor(
    private router: Router,
    public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
    public translateService: TranslateService,
    public layoutSandbox: LayoutSandbox,
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.setTitle(FallfuhrungTreeConstant.titlePage);
    this.initData();
    this.registerEvents();
    this.language = localStorage.getItem('currentLang.Culture');
  }

  ngDoCheck() {
    if (this.languageCurrent && this.language !== this.languageCurrent) {
      this.languageCurrent = this.language;
      this.getTreeViewItems();
    }
  }

  initData(): void {
    this.userID = getUserIdFromLocalStorage();
    this.languageCurrent = this.language;
    this.initDataFromUrl();
  }

  registerEvents() {
    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.handleUrlChange(event.url);
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
      this.sozialhilfeTreeSandbox.treeViewItems$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.afterTreeViewGetDatasource(data);
          this.sozialhilfeTreeSandbox.changeTreeNodeUpdateState(false);
        }
      })
    );


    this.subscriptions.push(
      this.sozialhilfeTreeSandbox.nodesStatus$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.nodesStatus = data;
          if (this.treeViewDataSource.length > 0) {
            this.displayEdittingIcon(this.nodesStatus);
          }
        }
      })
    );


    this.subscriptions.push(
      this.sozialhilfeTreeSandbox.treeNodeUpdateState$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.getTreeViewItems();
        }
      })
    );

    this.subscriptions.push(
      this.sozialhilfeTreeSandbox.createBudget$.subscribe(data => {
        this.hanlderDataEvent(data);
      })
    );

    this.subscriptions.push(
      this.sozialhilfeTreeSandbox.createFinancialPlan$.subscribe(data => {
        this.hanlderDataEvent(data);
      })
    );

    this.subscriptions.push(
      this.sozialhilfeTreeSandbox.deleteFinancialPlan$.subscribe(data => {
        this.hanlderDataEvent(data);
      })
    );

    this.subscriptions.push(
      this.sozialhilfeTreeSandbox.createSozialhilfe$.subscribe(data => {
        this.hanlderDataEvent(data);
      })
    );

    this.subscriptions.push(
      this.sozialhilfeTreeSandbox.deleteSozialhilfe$.subscribe(data => {
        this.isDelete = true;
        this.hanlderDataEvent(data);
      })
    );
  }

  hanlderDataEvent(data) {
    if (isNullOrUndefined(data)) {
      return;
    }
    if (data.status && data.status !== 200) {
      this.errorHandler(data);
      return;
    }
    this.getTreeViewItems();
  }

  errorHandler(response) {
    const body = JSON.parse(response._body);
    switch (response.status) {
      case AppEnums.StatusCode.BAD_REQUEST:
        if (body.errorDetails && body.errorDetails.length > 0) {
          this.showPopupConfirm(JSON.parse(response._body).errorDetails[0].message , TypePopUp.HideAll);
        } else {
          this.showPopupConfirm(JSON.parse(response._body).message , TypePopUp.HideAll);
        }
        break;
      case AppEnums.StatusCode.CONCURRENCY:
        this.showPopupConfirm(this.translateService.instant('SozialhilfeTree.Concurrency') , TypePopUp.HideAll);
        break;
      case AppEnums.StatusCode.NOT_FOUND:
        let message = '';
        if (this.isDelete) {
          message = this.translateService.instant('SozialhilfeTree.NotFoundDelete');
        } else {
          message = this.translateService.instant('SozialhilfeTree.NotFoundUpdate');
        }
        this.showPopupConfirm(message, TypePopUp.HideAll);
        break;
      case AppEnums.StatusCode.INTERNAL_SERVER_ERROR:
        this.showPopupConfirm(JSON.parse(response._body).message , TypePopUp.HideAll);
        break;
      default:
        break;
    }
    this.isDelete = false;
    this.isCreateNew = false;
  }

  ngOnDestroy() {
    this.unregisterEvents();
    this.sozialhilfeTreeSandbox.resetTreeState();
    this.sozialhilfeTreeSandbox.unregisterEvents();
  }

  unregisterEvents() {
    this.subscriptions.forEach(i => i.unsubscribe());
  }

  initDataFromUrl() {
    const urlParameters = this.router.url.split('/');
    this.iconShortName = urlParameters[3];
    this.iconName = urlParameters[4];
    this.baPersonID = urlParameters[5];
    this.getTreeViewItems();
  }

  handleUrlChange(url) {
    this.updateOrAddSticky(url);
    const urlParameters = url.split('/');
    if (this.iconShortName !== urlParameters[3] || this.baPersonID !== urlParameters[5]) {
      this.iconShortName = urlParameters[3];
      this.iconName = urlParameters[4];
      this.baPersonID = urlParameters[5];
      this.getTreeViewItems();
    } else {
      this.selectedItem = this.treeViewDataSource.find(item => `/${item.url}` === url);
      this.treeView.instance.selectItem(this.selectedItem.id);
      setTimeout(() => this.treeView.instance.expandItem(this.selectedItem.id));
      this.updateSelectedNodeLogic(this.selectedItem);
    }
  }

  updateSelectedNodeLogic(selectedItem) {
    let selectedItemObject;
    if (!selectedItem) {
      selectedItemObject = {
        baPersonID : this.baPersonID,
        isEmptySozialhilfe: true,
      };
    } else {
      this.selectedItem.isEmptySozialhilfe = false;
    }
    this.sozialhilfeTreeSandbox.updateSelectedNode(selectedItem ? selectedItem : selectedItemObject);
  }

  toggleVisiblePopover(itemObj) {
    this.resetPopover();
    let isHasOption = false;
    if (!itemObj.visiblePopover) {
      const className = itemObj.className;
      switch (className) {
        case 'CtlWhLeistung':
          isHasOption = true;
          this.isNeueUberbruckung = true;
          this.isNeuesFinanzplan = true;
          if (this.checkIsReadRole('ShNavigNewSozialhilfe')) {
              this.isNeueSozialhilfe = true;
          }
          if (this.checkIsReadRole('ShNavigDeleteSozialhilfe')) {
            this.isSozialhilfeloschen = true;
          }
          if (this.checkIsReadRole('FrmFallZugriff')) {
            this.isFallZugriff = true;
          }
          if (this.checkIsReadRole('FrmFallInfo')) {
            this.isFallInfo = true;
          }
        break;
        case 'CtlWhFinanzplan':
          isHasOption = true;
          this.isFinanzplanloschen = true;
          if (this.checkIsReadRole('ShNavigNewMonatsbudget')
            && !itemObj.abgeschlossen
            && itemObj.bgBewilligungStatusCode === AppEnums.BgBewilligungStatusCode.Erteilt) {
              this.isNeueMonatsbuget = true;
          }
        break;
        case 'CtlWhBudget':
          isHasOption = true;
          if (itemObj.masterBudget) {
            // TO DO : btnBgBudgetResetMaster.Visibility = BarItemVisibility.Always;
          } else {
            this.isMonatsbugetMasterbudget = true;
            if (this.checkIsReadRole('ShNavigDeleteMonatsbudget')) {
              this.isMonatsbugetLoschen = true;
            }
          }
          if (this.checkIsReadRole('ShNavigNewMonatsbudget')
            && !itemObj.abgeschlossen
            && itemObj.bgBewilligungStatusCode === AppEnums.BgBewilligungStatusCode.Erteilt ) {
              this.isNeueMonatsbuget = true;
          }
        break;
      }
      itemObj.visiblePopover = isHasOption;
      return;
    }
    itemObj.visiblePopover = false;
  }

  checkNodeTreeToRenderIcon(itemObj) {
    const className = itemObj.className;
    if (className === 'CtlWhLeistung' || className === 'CtlWhFinanzplan' || className === 'CtlWhBudget') {
      return true;
    }
    return false;
  }

  resetPopover() {
    this.isNeuesFinanzplan = false;
    this.isNeueUberbruckung = false;
    this.isNeueSozialhilfe = false;
    this.isSozialhilfeloschen = false;
    this.isFallZugriff = false;
    this.isFallInfo = false;
    this.isNeueMonatsbuget = false;
    this.isMonatsbugetMasterbudget = false;
    this.isMonatsbugetLoschen = false;
    this.isFinanzplanloschen = false;
  }


  checkIsReadRole(name: any) {
    const isUserHasRight = getRoleSessionStorage(name);
    return !isNullOrUndefined(isUserHasRight) && !isNullOrUndefined(isUserHasRight.IsRead);
  }

  getTreeViewItems(): void {
    this.treeViewItemsQuery = {
      baPersonID : this.baPersonID,
      modulID : FallfuhrungTreeConstant.ModulIdS
    };
    this.sozialhilfeTreeSandbox.getTreeViewItems(this.treeViewItemsQuery);
  }

  afterTreeViewGetDatasource(data) {
    data.forEach(item => {
      item.url = this.makeUrlForItemS(item);
    });
    this.selectedItem = data.find(item => `/${item.url}` === this.router.url);
    if (!this.selectedItem && data.length > 0) {
      this.selectedItem = data[0];
    }
    if (this.selectedItem) {
      this.selectedItem.isSelected = true;
      this.selectedItem.isExpanded = true;
      this.router.navigate([this.selectedItem.url]);
    }

    this.setDefaultExpandForS(data);
    this.updateSelectedNodeLogic(this.selectedItem);
    this.treeViewDataSource = data;
  }

  makeUrlForItemS(selectedItem: any) {
    let targetUrl = FallfuhrungTreeConstant.mainUrl + FallfuhrungTreeConstant.sUrl + this.baPersonID;
    switch (selectedItem.className) {
      case FallfuhrungTreeConstant.CtlWhLeistung:
        targetUrl += `/${FallfuhrungTreeConstant.WhLeistung}/${selectedItem.faLeistungID}`;
        break;
      // Kontoauszug
      case FallfuhrungTreeConstant.CtlWhKontoauszug:
        targetUrl += `/${FallfuhrungTreeConstant.Kontoauszug}`;
        break;
      case FallfuhrungTreeConstant.CtlWhFinanzplan:
        targetUrl += `/${FallfuhrungTreeConstant.WhRegularerFinanzplan}/${selectedItem.bgFinanzplanID}`;
        break;
      case FallfuhrungTreeConstant.CtlBgVersicherung:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.BgVersicherung}`;
        break;
      case FallfuhrungTreeConstant.CtlWhPersonen:
        targetUrl += `/${FallfuhrungTreeConstant.WhPersonen}/${selectedItem.bgFinanzplanID}`;
        break;
      case FallfuhrungTreeConstant.CtlBgUebersicht:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}`;
        break;
      case FallfuhrungTreeConstant.CtlBgVermoegen:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.BgVermoegen}`;
        break;
      case FallfuhrungTreeConstant.CtlBgErwerbseinkommen:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.BgErwerbseinkommen}`;
        break;
      case FallfuhrungTreeConstant.CtlBgGrundbedarf:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.BgGrundbedarf}`;
        break;
      case FallfuhrungTreeConstant.CtlBgZulagenEFB:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.BgZulagenEFB}`;
        break;
      case FallfuhrungTreeConstant.CtlBgAlimente:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.BgAlimente}`;
      break;
      case FallfuhrungTreeConstant.CtlBgKrankenkasse:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.MedGrundversorgung}`;
        break;
      case FallfuhrungTreeConstant.CtlBgWohnkosten:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.BgWohnkosten}`;
        break;
      // situations case
      case FallfuhrungTreeConstant.CtlBgSilAHVBeitrag:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.Situation}/${FallfuhrungTreeConstant.AHVBeitrag}`;
        break;
      case FallfuhrungTreeConstant.CtlBgSilWiedereingliederung:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.Situation}/${FallfuhrungTreeConstant.BgSilWiedereingliederung}`;
        break;
      case FallfuhrungTreeConstant.CtlBgSilTherapieEntzug:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.Situation}/${FallfuhrungTreeConstant.BgSilTherapieEntzug}`;
        break;
      case FallfuhrungTreeConstant.CtlBgSilKrankheitBehinderungLeistung:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.Situation}/${FallfuhrungTreeConstant.BgSilKrankheitBehinderungLeistung}`;
        break;
      case FallfuhrungTreeConstant.CtlBgSilSituationsbedingteLeistungen:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.Situation}/${FallfuhrungTreeConstant.BgSilSituationsbedingteLeistungen}`;
        break;
      case FallfuhrungTreeConstant.CtlWhSpezialkonto:
        targetUrl += `/${FallfuhrungTreeConstant.CtlWhSpezialkonto}/${selectedItem.modulTreeID}`;
        break;
      case FallfuhrungTreeConstant.CtlWhASVSErfassung:
        targetUrl += `/${FallfuhrungTreeConstant.ASV}`;
        break;
      default:
        targetUrl += `/${FallfuhrungTreeConstant.NotImplementUrl}`;
        break;
    }
    return targetUrl;
  }

  setDefaultExpandForS(data) {
    if (data && data.length > 0) {
      data[0].isExpanded = true;
      const childNodes = data.filter(ele => ele.parentID === data[0].id);
      if (childNodes && childNodes.length > 0) {
        data[data.indexOf((childNodes[0]))].isExpanded = true;
      }
    }
  }

  onItemClick(e) {
    this.router.navigate([e.itemData.url]);
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

  buttonClicked(event) {
    if (event === 'yes') {

    }
    this.confirmDialogData.isVisible = false;
  }


  showPopupConfirm(message, type: TypePopUp = 1) {
    this.confirmDialogData.isVisibleNo = true;
    this.confirmDialogData.isVisibleYes = true;
    this.confirmDialogData.message = message;
    if (type === TypePopUp.HideAll) {
      this.confirmDialogData.isVisibleNo = false;
      this.confirmDialogData.isVisibleYes = false;
    }
    this.confirmDialogData.funcYes = () => this.buttonClicked('yes');
    this.confirmDialogData.funcNo = () => this.buttonClicked('no');
    this.confirmDialogData.funcHiding = () => this.buttonClicked('no');
    this.confirmDialogData.title = this.translateService.instant('I001WhLeistung.Title.Information');
    this.confirmDialogData.isVisible = true;
  }

  newSozialhilfe(item) {
    const itemCreate = {
      modulId: FallfuhrungTreeConstant.ModulIdS,
      baPersonId: Number(this.baPersonID),
    };
    item.visiblePopover = false;
    this.sozialhilfeTreeSandbox.createSozialhilfe(itemCreate);
  }


  deleteSozialhilfe(item) {
    if (this.checkFinanzplanExits())  {
      // TO DO: alert error
      this.showPopupConfirm(this.translateService.instant('SozialhilfeTree.FinanzplanExit') , TypePopUp.HideAll);
      return;
    }
    const itemDelete = {
      faLeistungID: item.faLeistungID
    };
    this.isDelete = true;
    item.visiblePopover = false;
    this.sozialhilfeTreeSandbox.deleteSozialhilfe(itemDelete);
  }

  checkFinanzplanExits() {
    const grundCode = filter(this.treeViewDataSource, item => item.bgFinanzplanID !== null);
    return grundCode.length > 0 ? true : false;
  }

  createFinanzplan(item, type) {
    const itemCreate = {
      bgFinancialPlanType : (type === 1) ? AppEnums.WhHilfeTypCode.Ueberbrueckungshilfe : AppEnums.WhHilfeTypCode.Regulaerer_Finanzplan ,
      faLeistungId : item.faLeistungID,
    };
    item.isCreateNew = false;
    this.isDelete = true;
    this.sozialhilfeTreeSandbox.createFinancialPlan(itemCreate);
  }

  deleteFinanzplan(item) {
    const itemDelete = {
      bgFinanzplanId: item.bgFinanzplanID
    };
    item.visiblePopover = false;
    this.isDelete = true;
    this.sozialhilfeTreeSandbox.deleteFinancialPlan(itemDelete);
  }

  createBudget(item) {
    const createBudgetData = {
      bgFinanzplanId: item.bgFinanzplanID,
    };
    item.visiblePopover = false;
    this.isCreateNew = true;
    this.sozialhilfeTreeSandbox.createBudget(createBudgetData);
  }

  deleteBudget(item) {
    const deleteBudget = {
      bgBewilligungStatusCode: item.bgBewilligungStatusCode,
      bgBudgetID: item.bgBudgetID,
      // TO DO : masterBudget: item.masterBudget,
    };
    item.visiblePopover = false;
    this.isDelete = true;
    this.sozialhilfeTreeSandbox.deleteBudget(deleteBudget);
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

  newSozialhilfeWhenEmpty() {
    const itemCreate = {
      modulId: FallfuhrungTreeConstant.ModulIdS,
      baPersonId: Number(this.baPersonID),
    };
    this.isVisibalePopoverTreeEmpty = false;
    this.sozialhilfeTreeSandbox.createSozialhilfe(itemCreate);
  }


  hideRightContent(itemObj) {
    itemObj.visiblePopover = false;
  }

  onClickAddNew() {
    this.isVisibalePopoverTreeEmpty = !this.isVisibalePopoverTreeEmpty;
  }
}
