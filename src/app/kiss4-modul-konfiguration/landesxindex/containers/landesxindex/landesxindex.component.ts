import 'devextreme-intl';

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { LandesxindexConstant } from '@shared/common/landesxindex.common';
import { BaseComponent } from '@shared/components/base.component';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxButtonComponent, DxDateBoxComponent, DxPopupComponent } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxFormComponent } from 'devextreme-angular/ui/form';
import ArrayStore from 'devextreme/data/array_store';
import { locale } from 'devextreme/localization';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { isArray, isNullOrUndefined, log } from 'util';

import { IndexwerteErfassenComponent } from '../../components/indexwerte-erfassen/indexwerte-erfassen.component';
import { LandesindexErfassenComponent } from '../../components/landesindex-erfassen/landesindex-erfassen.component';
import { LandesxindexDetailComponent } from '../../components/landesxindex-detail/landesxindex-detail.component';
import { LandesxindexListComponent } from '../../components/landesxindex-list/landesxindex-list.component';
import { LandesxindexSandbox } from '../../landesxindex.sandbox';
import {
  IkLandesindexInsertModel,
  IkLandesindexModel,
  InsertIkLandesIndex,
  InsertWertByIkLandesindex,
  Landesindex,
  LandesindexWert,
  ListItem,
  UpdateWert,
} from '../../models';

@Component({
  selector: 'kiss-landesxindex',
  templateUrl: './landesxindex.component.html',
  styleUrls: ['./landesxindex.component.scss']
})
@SetClassRight('Ctllandesxindex')
export class LandesindexComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  @ViewChild('landesxindexList') landesxindexList: LandesxindexListComponent;
  @ViewChild('landesxindexDetail') landesxindexDetail: LandesxindexDetailComponent;
  @ViewChild('gridLandesindexWertErfassen') gridLandesindexWertErfassen: DxDataGridComponent;
  @ViewChild('gridpopup') gridpopup: DxPopupComponent;
  @ViewChild('landesIndexErfassen') landesIndexErfassen: DxPopupComponent;
  @ViewChild('dxform') dxform: DxFormComponent;
  @ViewChild('expandGridPopup') expandGridPopup: any;
  @ViewChild('buttonSpeichernLandesindexWertErfassen') buttonSpeichernLandesindexWertErfassen: DxButtonComponent;
  @ViewChild('dateBoxWertErfassen') dateBoxWertErfassen: DxDateBoxComponent;
  @ViewChild('landesindexErfassen') landesindexErfassen: LandesindexErfassenComponent;
  @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;
  @ViewChild('indexwerteErfassen') indexwerteErfassen: IndexwerteErfassenComponent;
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
  AdditionalButtons = [...CommonConstant.AdditionalButtons];
  listBtn = [CommonConstant.ToolbarButtons, [...this.AdditionalButtons]];
  listBtnPopup = [CommonConstant.ToolbarButtons, CommonConstant.AdditionalButtons];
  customizeBtn = [
    {
      text: 'BFS-Webseite',
      visible: false,
      name: 'bfs-webseite'
    },
    {
      text: 'J001Landesxindex.NeuerLandesindex',
      visible: true,
      name: 'neue-landesxindex'
    },
    {
      text: 'J001Landesxindex.Bearbeiten',
      visible: true,
      name: 'bearbeiten'
    },
    {
      text: 'J001Landesxindex.Speichern',
      visible: false,
      name: 'speichern',
      disabled: false
    },
    {
      text: 'J001Landesxindex.Abbrechen',
      visible: false,
      name: 'abbrechen'
    },
  ];
  public toolbarControl: any = {
    isVisible: false,
    isSearch: false,
    isSearchPanel: false,
    isFilterBuilder: false,
    isFilter: true,
  };
  gridFunctionKey = 'gridSetting';
  gridFunctionKeyPopUp = 'gridSettingPopUp';
  public controlButtonTop = {
    isPrintTop: true
  };
  public controlButtonBottom = {
    isPrintBottom: true
  };
  toolbarBottomControl = {
    isVisible: true,
    isSearch: false,
    isSearchPanel: false,
    isFilterBuilder: false,
    isFilter: true,
  };
  editingControl = {
    isEditTop: false,
    isEditBtm: false,
  };
  toolbarControlAdd = {
    isShowbuttonAdd: false,
    popupVisible: false
  };
  isErrorOpen = false;
  messageErr = null;
  clickedGridName = null;
  popupVisibleLandesindexWertErfassen = false;
  popupLandesindexWertErfassen = {
    popupVisibleLandesindexWertErfassen: false
  };
  tabindexItemFocused = 0;
  isCloseForm = true;
  landesxindexes: Landesindex[];
  arrayUpdateMasters: Landesindex[] = [];
  arrayUpdateDetails: LandesindexWert[] = [];
  listItem: ListItem;
  landesindexesWertes: LandesindexWert[];
  landesindexModel: Landesindex;
  landesxindexWertModel: LandesindexWert;
  ikLandesindexID: number;
  nameLandesindex = null;
  optionNameExport = 'export.fileName';
  optionLandesxindexValue = 'Landesxindex';
  optionLandesindexWertErfassenValue = 'LandesindexWertErfassen';
  insertLandesIndex = new InsertIkLandesIndex();
  landesIndex: InsertIkLandesIndex[] = [];

  // declare model combobox, grid bfs
  selectedKeysTop = [];
  selectedKeysBottom = [];
  rowIndexLandesxindex = 0;
  rowIndexLandesxindexWert = 0;
  isDeleteIndex = false;
  isDeleteIndexWert = false;
  defaultDate: Date = new Date(2011, 5, 15);
  checkboxVisible = false;
  minDate = new Date(1753, 0, 1);
  maxDate = new Date(9999, 11, 31);
  newDate: Date = new Date(2011, 5, 15);
  addLandesIndexWert = new InsertWertByIkLandesindex();
  isConfirm: boolean;
  isAddNew: boolean;
  isAddNewWert = false;
  neuBasic = -1;
  updateWert = new UpdateWert();
  popupDataMess = {
    visible: false,
    message: '',
    title: '',
    key: '',
    yes: '',
  };
  ikLandesindexs: IkLandesindexModel[] = [];
  ikLandesindexsToInsert: IkLandesindexInsertModel = new IkLandesindexInsertModel();
  selectedLandesindexWertErfassenKeys = [];
  accessKeyItemFocused = 0;
  errorMessages: string[];
  selectedItemKeys: any[] = [];
  dataSource: ArrayStore;
  allowUpdatingGrdTop = false;
  allowUpdatingGrdBottom = false;
  allowAddingBtm = false;
  popUpModel: PopUpModel;
  popUpConcurrencyModel: PopUpModel;
  visibleAdditionalFunction = true;
  rowSelectedIDTop: number;
  rowSelectedIDBtm: number;
  rowSelectedWertPopup: number;
  filterColumnsTop: Array<any> = [];
  filterColumnsPopup: Array<any> = [];
  details: any = {};
  wertDefault = new LandesindexWert();
  wertData = new LandesindexWert();
  isViewMode = true;
  isSaveDataToSever = false;
  filter: any;
  readonly dateMinFullYear: number = CommonConstant.DATE_MIN_FULLYEAR;
  readonly dateMaxFullYear: number = CommonConstant.DATE_MAX_FULLYEAR;
  readonly dateMinMonth: number = CommonConstant.DATE_MIN_MONTH;
  readonly dateMaxMonth: number = CommonConstant.DATE_MAX_MONTH;
  private subscriptionList: Subscription[] = [];

  constructor(
    injector: Injector,
    public LandesindexesSandbox: LandesxindexSandbox,
    public utilService: UtilService,
    private moduleConfigSandbox: ModuleConfigSandbox,
    public translateService: TranslateService,
    public layoutSandbox: LayoutSandbox,
    public cdr: ChangeDetectorRef
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    this.setTitle(LandesxindexConstant.PAGETITLE);
    this.initPopUpModel();
    this.initPopUpConcurModel();
    this.registerEvents();
    this.visibleListBtnNavigator(true);
    this.loadGridSetting();
    this.isAddNewWert = false;
    this.LandesindexesSandbox.loadLandesindexes();
  }

  ngOnDestroy() {
    this.groupActionButton(true);
    this.visibleListBtnNavigator(true);
    this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
    this.moduleConfigSandbox.updateDirtyFormStatus(false);
    this.unregisterEvents();
  }

  unregisterEvents() {
    this.subscriptionList.forEach(sub => sub.unsubscribe());
  }

  initPopUpModel() {
    this.popUpModel = new PopUpModel(
      {
        title: '',
        isVisibleTitle: true,
        isVisible: false,
        message: '',
        textYes: '',
        isVisibleYes: true,
        textNo: '',
        isVisibleNo: true,
        funcYes: null,
        funcNo: null,
        funcHiding: null
      }
    );
  }

  initPopUpConcurModel() {
    this.popUpConcurrencyModel = new PopUpModel(
      {
        title: '',
        isVisibleTitle: true,
        isVisible: false,
        message: '',
        textYes: '',
        isVisibleYes: true,
        textNo: '',
        isVisibleNo: true,
        funcYes: null,
        funcNo: null,
      }
    );
  }

  ngAfterViewInit() {
  }

  private registerEvents(): void {
    this.subscriptionList.push(this.LandesindexesSandbox.landesxindexesData$.subscribe(data => {
      if (isNullOrUndefined(data)) {
        return;
      }
      if (data.status) {
        this.remainingMessage.showMessage(JSON.parse(data._body).message);
        return;
      }
      this.landesxindexes = data;
      this.details = {};
      if (this.isAddNew) {
        this.doAfterAddLandesindexErfassen();
        return;
      }
      if (this.landesxindexes.length < 1) {
        this.customizeBtn[2].disabled = true;
        return;
      }
      if (!isNullOrUndefined(this.landesxindexes[this.landesxindexes.length - 1])) {
        this.landesindexModel = this.landesxindexes[this.landesxindexes.length - 1];
        if (this.isDeleteIndexWert) {
          const ikLandesindexID = this.landesxindexList.gridLandesxindexTop.instance.getKeyByRowIndex(this.rowIndexLandesxindex);
          this.selectedKeysTop = [ikLandesindexID];
          this.LandesindexesSandbox.loadLandesindexWert(ikLandesindexID);
        } else if (this.rowIndexLandesxindex < this.landesxindexes.length && this.isDeleteIndex) {
          let ikLandesindexID = this.landesxindexList.gridLandesxindexTop.instance.getKeyByRowIndex(this.rowIndexLandesxindex - 1);
          if (this.rowIndexLandesxindex < this.landesxindexes.length - 1) {
            ikLandesindexID = this.landesxindexList.gridLandesxindexTop.instance.getKeyByRowIndex(this.rowIndexLandesxindex + 1);
          }
          this.selectedKeysTop = [ikLandesindexID];
          this.LandesindexesSandbox.loadLandesindexWert(ikLandesindexID);
        } else if (!isNullOrUndefined(this.landesxindexes[this.landesxindexes.length - 1].ikLandesindexId)) {
          this.rowIndexLandesxindex = this.landesxindexes.length - 1;
          const ikLandesindexID = this.landesxindexes[this.landesxindexes.length - 1].ikLandesindexId;
          this.selectedKeysTop = [ikLandesindexID];
          this.LandesindexesSandbox.loadLandesindexWert(ikLandesindexID);
        }
        this.arrayUpdateMasters = [];
        setTimeout(() => {
          const scrollable = this.landesxindexList.gridLandesxindexTop.instance.getScrollable();
          if (scrollable != null) {
            scrollable.scrollToElement(this.landesxindexList.gridLandesxindexTop.instance.getRowElement(this.landesxindexList.gridLandesxindexTop.instance.getRowIndexByKey(this.selectedKeysTop[0])));
          }
        }, 300);
        if (this.isViewMode) {
          this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
          this.moduleConfigSandbox.updateDirtyFormStatus(false);
        }
        this.isDeleteIndex = false;
        this.editingControl.isEditTop = false;
      }
    }));

    // Register subscribe for update top grid
    this.subscriptionList.push(this.LandesindexesSandbox.getLandesxindexUpdatedData$.subscribe((data: any) => {
      if (isNullOrUndefined(data)) {
        return;
      }
      if (data.status) {
        const body = JSON.parse(data._body);
        if (data.status === AppEnums.StatusCode.CONCURRENCY) {
          this.showPopupConcurrency(this.translateService.instant('J001Landesxindex.Msg.ConcurrencyUpdateLandesxindex'));
          return;
        }
        if (data.status === AppEnums.StatusCode.BAD_REQUEST) {
          this.remainingMessage.showMessage(this.translateService.instant('J001Landesxindex.Msg.CheckExist'));
          return;
        }
        this.remainingMessage.showMessage(body.message);
        return;
      }
      this.resetFormState();
      // Clear temporary update list
      this.arrayUpdateMasters = [];
    }));

    this.subscriptionList.push(this.LandesindexesSandbox.landesindexWertData$.subscribe(data => {
      if (isNullOrUndefined(data)) {
        return;
      }
      if (data.status) {
        this.remainingMessage.showMessage(JSON.parse(data._body).message);
        return;
      }
      this.landesindexesWertes = data;
      if (this.landesindexesWertes.length < 1) {
        this.landesxindexWertModel = new LandesindexWert();
        return;
      }
      if (!isNullOrUndefined(this.landesindexesWertes[this.landesindexesWertes.length - 1])) {
        if (this.rowIndexLandesxindexWert < this.landesindexesWertes.length && this.isDeleteIndexWert) {
          const landesindexWert = this.landesindexesWertes[this.rowIndexLandesxindexWert];
          this.landesxindexWertModel = new LandesindexWert();
          this.landesxindexWertModel = landesindexWert;
          this.rowSelectedIDBtm = landesindexWert.ikLandesindexWertId;
          this.selectedKeysBottom = [landesindexWert];
        } else if (!isNullOrUndefined(this.landesindexesWertes[this.landesindexesWertes.length - 1].ikLandesindexWertId)) {
          const ikLandesindexWertID = this.landesindexesWertes[this.landesindexesWertes.length - 1].ikLandesindexWertId;
          this.rowIndexLandesxindexWert = this.landesindexesWertes.length - 1;
          this.landesxindexWertModel = new LandesindexWert();
          this.landesxindexWertModel.ikLandesindexWertId = ikLandesindexWertID;
          this.rowSelectedIDBtm = ikLandesindexWertID;
          this.selectedKeysBottom = [this.landesindexesWertes[this.landesindexesWertes.length - 1]];
        }
        this.isAddNewWert = false;
        this.isDeleteIndexWert = false;
        this.editingControl.isEditBtm = false;
        if (this.isViewMode) {
          this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
          this.moduleConfigSandbox.updateDirtyFormStatus(false);
        }
        this.arrayUpdateDetails = [];
        setTimeout(() => {
          const scrollable = this.landesxindexDetail.gridLandesxindexBottom.instance.getScrollable();
          if (scrollable != null) {
            scrollable.scrollToElement(this.landesxindexDetail.gridLandesxindexBottom.instance.getRowElement(this.rowIndexLandesxindexWert));
          }
        }, 300);
      }
    }));

    this.subscriptionList.push(this.LandesindexesSandbox.getLandesxindexWertDeleteData$.subscribe(data => {
      if (isNullOrUndefined(data)) {
        return;
      }
      if (data.status) {
        const body = JSON.parse(data._body);
        if (data.status === AppEnums.StatusCode.NOT_FOUND) {
          this.remainingMessage.showMessage(this.translateService.instant('J001Landesxindex.Msg.ConcurrencyDeleteLandesxindexWert'));
        } else {
          this.remainingMessage.showMessage(body.message);
        }
        return;
      }
      this.isDeleteIndexWert = true;
      this.LandesindexesSandbox.loadLandesindexes();
      this.allowUpdating(false);
      this.groupActionButton(true);
      this.visibleListBtnNavigator(true);
    }));

    this.subscriptionList.push(this.LandesindexesSandbox.getLandesindexDeleteData$.subscribe(data => {
      if (isNullOrUndefined(data)) {
        return;
      }
      if (data.status) {
        const body = JSON.parse(data._body);
        if (data.status === AppEnums.StatusCode.NOT_FOUND) {
          this.remainingMessage.showMessage(this.translateService.instant('J001Landesxindex.Msg.ConcurrencyDeleteLandesxindexWert'));
        } else {
          this.remainingMessage.showMessage(body.message);
        }
        return;
      }
      this.isDeleteIndex = true;
      this.LandesindexesSandbox.loadLandesindexes();
      this.LandesindexesSandbox.loadLandesindexWert(this.ikLandesindexID);
      this.allowUpdating(false);
      this.groupActionButton(true);
      this.visibleListBtnNavigator(true);
    }));

    this.subscriptionList.push(this.LandesindexesSandbox.wertData$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        if (data.wert === null || data.wert < 0) {
          if (this.isAddNew) {
            this.neuBasic = -1;
            this.isAddNew = false;
            this.landesindexErfassen.remainingMessage.showMessage(this.translateService.instant('J003NeuerLandesindex.Message-J003-3'));
            return;
          }
        }
        if (data.status && data.status === AppEnums.StatusCode.BAD_REQUEST) {
          const body = JSON.parse(data._body);
          const message = body.message.toString();
          this.landesindexErfassen.remainingMessage.showMessage(message);
          return;
        }
        this.neuBasic = data.wert;
        this.LandesindexesSandbox.addLandesIndex(this.insertLandesIndex);
      }
    }));

    this.subscriptionList.push(this.LandesindexesSandbox.AddLandesIndexData$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        if (data && data.ikLandesindexId > 0) {
          this.isAddNew = true;
          this.toolbarControlAdd.popupVisible = false;
          this.LandesindexesSandbox.loadLandesindexes();
          this.onCloseError();
          return;
        }
        if (data.status && data.status === AppEnums.StatusCode.CONCURRENCY) {
          this.landesindexErfassen.remainingMessage.showMessage(this.translateService.instant('J003NeuerLandesindex.Message-J003-2'));
          return;
        }
        if (data.status && data.status === AppEnums.StatusCode.BAD_REQUEST) {
          this.landesindexErfassen.remainingMessage.showMessage(this.translateService.instant('J003NeuerLandesindex.Message-J003-2'));
          return;
        }
      }
    }));

    this.subscriptionList.push(this.LandesindexesSandbox.AddLandesIndexWertByLandesIndexData$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        if (data.isSuccess) {
          if (this.neuBasic !== -1) {
            if (this.neuBasic !== 0) {
              this.updateWert.neuberechnungBasis = this.neuBasic;
              this.updateWert.newIkLandesindexID = this.addLandesIndexWert.newIkLandesindexID;
              this.LandesindexesSandbox.updateWert(this.updateWert);
              return;
            }
            this.LandesindexesSandbox.loadLandesindexes();
            this.neuBasic = -1;
          }
        }
        if (data.status && data.status === AppEnums.StatusCode.BAD_REQUEST) {
          const body = JSON.parse(data._body);
          const message = body.message.toString();
          this.landesindexErfassen.remainingMessage.showMessage(message);
          return;
        }
      }
    }));

    this.subscriptionList.push(this.LandesindexesSandbox.updateWertData$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        if (data.isSuccess) {
          this.LandesindexesSandbox.loadLandesindexes();
          this.LandesindexesSandbox.loadLandesindexWert(this.addLandesIndexWert.newIkLandesindexID);
          this.onCloseError();
          return;
        }
        if (data.status && data.status === AppEnums.StatusCode.BAD_REQUEST) {
          const body = JSON.parse(data._body);
          const message = body.message.toString();
          this.landesindexErfassen.remainingMessage.showMessage(message);
          return;
        }
      }
    }));

    this.subscriptionList.push(this.LandesindexesSandbox.IkLandesindexData$.subscribe(datas => {
      if (!isNullOrUndefined(datas) && datas.length > 0) {
        this.ikLandesindexs = datas;
        this.rowSelectedWertPopup = this.ikLandesindexs[0].IkLandesindexID;
        this.selectedLandesindexWertErfassenKeys = [this.ikLandesindexs[0].IkLandesindexID];
      }
    }));

    this.subscriptionList.push(this.LandesindexesSandbox.AddIkLandesindexWertData$.subscribe(data => {
      if (data && data.status && data.status === AppEnums.StatusCode.BAD_REQUEST) {
        this.indexwerteErfassen.remainingMessageJ002.showMessage(this.translateService.instant('J002LandesindexWertErfassen.MessageId2'));
        return;
      }

      if (data && data.isSuccess) {
        if (data.messages && data.messages.length > 0) {
          const message = data.messages.join('\r\n');
          this.indexwerteErfassen.remainingMessageJ002.showMessage(message);
        } else {
          this.popupLandesindexWertErfassen.popupVisibleLandesindexWertErfassen = false;
        }
        if (this.isViewMode) {
          this.LandesindexesSandbox.loadLandesindexes();
          if (this.selectedKeysTop.length > 0) {
            this.LandesindexesSandbox.loadLandesindexWert(this.selectedKeysTop[0]);
          }
        }
      }
    }));

    this.subscriptionList.push(this.LandesindexesSandbox.AddWertData$.subscribe(data => {
      if (!isNullOrUndefined(data) && !isNullOrUndefined(data.value)) {
        if (data.value) {
          this.isAddNewWert = false;
          this.isErrorOpen = false;
          this.remainingMessage.hideMessage();
          this.allowAddingBtm = false;
          this.LandesindexesSandbox.loadLandesindexWert(this.ikLandesindexID);
        }
      }
    }));
  }

  resetFormState() {
    this.isSaveDataToSever = false;
    this.isErrorOpen = false;
    this.remainingMessage.hideMessage();
    this.isAddNewWert = false;
    this.allowAddingBtm = false;
    this.messageErr = null;
    this.allowUpdating(false);
    this.groupActionButton(true);
    this.visibleListBtnNavigator(true);
    this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
    this.moduleConfigSandbox.updateDirtyFormStatus(false);
    // Refresh data for bottom grid after user click on Save button
    this.LandesindexesSandbox.loadLandesindexes();
  }

  createWertDefault() {
    return this.wertDefault = new LandesindexWert({
      ikLandesindexId: 0,
      ikLandesindexWertId: 0,
      jahr: null,
      monat: null,
      wert: null,
      created: new Date(),
      creator: null,
      modified: new Date(),
      modifier: null,
    });
  }

  onClickEditBtnGrdTop() {
    this.allowUpdating(true);
    this.groupActionButton(false);
    this.moduleConfigSandbox.updateEditModeStatus({ attr: true });
    this.moduleConfigSandbox.updateDirtyFormStatus(false);
    this.visibleListBtnNavigator(false);
  }

  onClickSaveBtnGrdTop() {
    document.getElementById('j001_text_header-top_grid').focus();
    const el = document.querySelector(':focus');
    if (el) {
      (el as HTMLElement).blur();
    }
    if (this.validateGrids()) {
      this.landesxindexList.gridLandesxindexTop.instance.saveEditData().then(() => this.landesxindexDetail.gridLandesxindexBottom.instance.saveEditData().then(
        () => {
          if (this.arrayUpdateDetails.length + this.arrayUpdateMasters.length > 0) {
            const monatWert = [...this.arrayUpdateDetails];
            const listIndexes = new ListItem({
              listMasters_item: this.arrayUpdateMasters,
              listDetails_item: monatWert
            });
            this.LandesindexesSandbox.updateLandesindex(listIndexes);
          } else {
            this.resetFormState();
          }
        }
      ));
      return;
    }
    this.messageErr = this.translateService.instant('J001Landesxindex.Msg.InvalidData');
    this.remainingMessage.showMessage(this.messageErr);
  }

  validateGrids() {
    const gridLandesxindexTop = this.landesxindexList.gridLandesxindexTop.instance as any;
    const gridLandesxindexBottom = this.landesxindexDetail.gridLandesxindexBottom.instance as any;
    return gridLandesxindexTop.getController('validating').validate(true) && gridLandesxindexBottom.getController('validating').validate(true);
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onClickCancelBtnGrdTop() {
    if (this.isAddNewWert && this.hasEditGrid() ) {
      this.showPopupConfirm(this.translateService.instant('J001Landesxindex.Msg.ConfirmInsertDeleteCancel'), () => this.doCancel());
      return;
    }
    if (this.hasEditGrid()) {
      this.showPopupConfirm(this.translateService.instant('J001Landesxindex.Msg.ConfirmCacel'), () => this.doCancel());
      return;
    }
    if (this.isAddNewWert) {
      this.landesindexesWertes = this.removeItemArray(0, this.landesindexesWertes, false);
      if (this.landesindexesWertes.length > 0) {
        const lastItem = this.landesindexesWertes[this.landesindexesWertes.length - 1];
        this.rowSelectedIDBtm = lastItem.ikLandesindexWertId;
        this.selectedKeysBottom = [lastItem];
      }
    }
    this.isAddNewWert = false;
    this.allowAddingBtm = false;
    this.isSaveDataToSever = false;
    this.messageErr = null;
    this.allowUpdating(false);
    this.groupActionButton(true);
    this.visibleListBtnNavigator(true);
    this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
    this.moduleConfigSandbox.updateDirtyFormStatus(false);
    this.editingControl.isEditTop = false;
    this.editingControl.isEditBtm = false;
  }

  doCancel() {
    this.popUpModel.isVisible = false;
    this.isAddNewWert = false;
    this.messageErr = null;
    this.allowUpdating(false);
    this.groupActionButton(true);
    this.visibleListBtnNavigator(true);
    this.agreeFunction();
    this.LandesindexesSandbox.loadLandesindexes();
    this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
    this.moduleConfigSandbox.updateDirtyFormStatus(false);
  }

  agreeFunction() {
    this.onCloseError();
    this.LandesindexesSandbox.loadLandesindexes();
  }

  deleteRecords() {
    this.selectedItemKeys.forEach((key) => {
      this.dataSource.remove(key);
    });
    this.dataGrid.instance.refresh();
  }

  onFocusIn(element) {
    this.tabindexItemFocused = element.tabIndex;
  }

  onFocusOut() {
    this.tabindexItemFocused = 0;
  }

  refesh() {
    this.controlButtonTop.isPrintTop = true;
  }

  selectRowBottomGrd($event) {
    this.landesxindexWertModel = $event.data;
    this.rowIndexLandesxindexWert = $event.rowIndex;
    this.rowSelectedIDBtm = this.landesxindexWertModel.ikLandesindexWertId;
  }

  selectionChangedTop(data: any) {
    if (data.selectedRowsData.length > 0) {
      this.landesindexModel = new Landesindex(data.selectedRowsData[0]);
      this.ikLandesindexID = data.selectedRowKeys[0];
      this.nameLandesindex = data.selectedRowsData[0].name;
      this.rowSelectedIDTop = data.selectedRowsData[0].ikLandesindexId;
      this.cdr.detectChanges();
    }
  }

  onEditingStartTop(e) {
    this.editingControl.isEditTop = true;
    if (this.hasEditGrid()) {
      this.moduleConfigSandbox.updateDirtyFormStatus(true);
    }
  }

  onEditingStartBottom(e) {
    this.editingControl.isEditBtm = true;
    if (!isNullOrUndefined(e) && !isNullOrUndefined(e.data)) {
      this.landesxindexWertModel = new LandesindexWert(e.data);
      this.rowSelectedIDBtm = this.landesxindexWertModel.ikLandesindexWertId;
      this.selectedKeysBottom = [e.key];
      if (this.hasEditGrid()) {
        this.moduleConfigSandbox.updateDirtyFormStatus(true);
      }
    }
  }

  selectionChanged(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
  }

  toolBarOnItemClickTopGrd($event) {
    switch ($event) {
      case 'exportExcel':
        {
          this.landesxindexList.gridLandesxindexTop.instance.option(this.optionNameExport, this.optionLandesxindexValue);
          this.landesxindexList.gridLandesxindexTop.instance.exportToExcel(false);
          return;
        }
      case 'printPdf': {
        this.printPdf(this.landesxindexList.gridLandesxindexTop);
        return;
      }
      case 'chooserColumn': {
        this.landesxindexList.gridLandesxindexTop.instance.showColumnChooser();
        return;
      }
      case 'deleteMenuItemTopGrd': {
        this.deleteInlineInGridTop(this.landesindexModel);
        return;
      }
      case 'gridSetting': {
        this.landesxindexList.gridFunction.showPopup(this.landesxindexList.gridFunction.model);
        return;
      }
      case 'neue-landesxindex': {
        this.actionAddNew_OnClick();
        return;
      }
      case 'bearbeiten': {
        this.onClickEditBtnGrdTop();
        return;
      }
      case 'speichern': {
        this.onClickSaveBtnGrdTop();
        return;
      }
      case 'abbrechen': {
        this.onClickCancelBtnGrdTop();
        return;
      }
      default:
        break;
    }
    if (this.landesxindexList.gridFunction.model.hasOwnProperty($event)) {
      this.landesxindexList.gridFunction.model[$event] = !this.landesxindexList.gridFunction.model[
        $event
      ];
      if (this.landesxindexList.gridFunction.model.autoSaveSetting) {
        this.landesxindexList.gridFunction.updateSetting(this.landesxindexList.gridFunction.model);
      }
    }
  }

  printPdf(dataGrid) {
    const visibleColumns = dataGrid.instance.getVisibleColumns();
    const columns = visibleColumns.slice(1, 3);
    const visibleRows = dataGrid.instance.getDataSource()._items;
    this.landesxindexList.printer.setData(visibleRows, { title: this.translateService.instant('J001Landesxindex.Title') }, columns);
  }

  onNeueMonatswerteErfassenClick() {
    this.neueMonatswerteErfassen();
  }

  onClickExportExcelGridTop() {
    this.landesxindexList.gridLandesxindexTop.instance.option(this.optionNameExport, this.optionLandesxindexValue);
    this.landesxindexList.gridLandesxindexTop.instance.exportToExcel(false);
  }

  deleteInlineInGridBottom(landesxindexWertModel: LandesindexWert) {
    if (!isNullOrUndefined(landesxindexWertModel) && !isNullOrUndefined(landesxindexWertModel.ikLandesindexWertId)) {
      if (this.isAddNewWert && landesxindexWertModel.ikLandesindexWertId === 0) {
        this.showPopupConfirm(
          this.translateService.instant('J001Landesxindex.Msg.ConfirmInsertDeleteCancel'),
          () => {
            this.popUpModel.isVisible = false;
            this.rowIndexLandesxindexWert = this.landesxindexDetail.gridLandesxindexBottom.instance.getRowIndexByKey(this.landesxindexWertModel);
            this.isDeleteIndexWert = true;
            this.LandesindexesSandbox.loadLandesindexWert(this.landesindexModel.ikLandesindexId);
          }
        );
      } else {
        this.showPopupConfirm(
          this.translateService.instant('J001Landesxindex.Msg.ConfirmDelete'),
          () => {
            this.popUpModel.isVisible = false;
            this.LandesindexesSandbox.deleteLandesindexWert(this.landesxindexWertModel.ikLandesindexWertId);
          }
        );
      }
    }
  }

  deleteInlineInGridTop(landesxindexModel: Landesindex) {
    if (!isNullOrUndefined(landesxindexModel)) {
      this.showPopupConfirm(
        this.translateService.instant('J001Landesxindex.Msg.ConfirmDelete'),
        () => {
          this.popUpModel.isVisible = false;
          this.LandesindexesSandbox.deleteLandesindex(this.landesindexModel.ikLandesindexId);
        }
      );
    }
  }

  // Event Check data bottom when changed
  onRowUpdatingBottom(e) {
    this.rowSelectedIDBtm = e.key.ikLandesindexWertId;
    if (isArray(this.arrayUpdateDetails)) {
      this.arrayUpdateDetails = this.removeItemArray(e.key.ikLandesindexWertId, this.arrayUpdateDetails, false);
    }
    this.arrayUpdateDetails.push(e.key);
    this.details[e.key.ikLandesindexId] = this.landesindexesWertes;
  }

  /**
   * Change value Wert null
   */
  changeDataWert(array: LandesindexWert[], key: any, value: number) {
    for (const i in array) {
      if (array[i].ikLandesindexWertId === key) {
        array[i].wert = value;
        break;
      }
    }
  }

  onCloseError() {
    this.isErrorOpen = false;
    this.remainingMessage.hideMessage();
  }

  removeItemArray(id: any, array: any, isIkLandesindex: boolean): any {
    if (isIkLandesindex) {
      return array.filter(item => item.ikLandesindexId !== id);
    }
    return array.filter(item => item.ikLandesindexWertId !== id);
  }

  moveFocus(isNext: boolean) {
    const tagNames = ['input', 'dx-button', 'dx-button-content', 'dx-check-box', 'span'];
    for (const tagName of tagNames) {
      const elems = document.getElementsByTagName(tagName);
      for (const el of Array.from(elems)) {
        if (isNext) {
          if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused + 1) {
            (el as HTMLElement).focus();
            return;
          }
        } else {
          if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused - 1) {
            (el as HTMLElement).focus();
            return;
          }
        }
      }
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.hasEditGrid() && this.editingControl.isEditTop) {
      const value = document.getElementById('j001_text_header-top_grid');
      value.focus();
      this.delay(300);
      this.isCloseForm = false;
    } else if (this.hasEditGrid() && this.editingControl.isEditBtm) {
      const value = document.getElementById('j001_detail_label_title');
      value.focus();
      this.delay(300);
      this.isCloseForm = false;
    } else {
      this.isCloseForm = true;
    }
    if (!this.isCloseForm) {
      return false;
    }
  }

  showPopupConfirm(message, yesFunc) {
    this.initPopUpModel();
    this.popUpModel.title = this.translateService.instant('J001Landesxindex.Msg.Title');
    this.popUpModel.message = message;
    this.popUpModel.textYes = this.translateService.instant('J001Landesxindex.Msg.Yes');
    this.popUpModel.isVisibleYes = true;
    this.popUpModel.textNo = this.translateService.instant('J001Landesxindex.Msg.No');
    this.popUpModel.isVisibleNo = true;
    this.popUpModel.funcYes = yesFunc;
    this.popUpModel.funcNo = () => this.popUpModel.isVisible = false;
    this.popUpModel.isVisible = true;
  }

  showPopupConcurrency(message: string) {
    this.initPopUpConcurModel();
    this.popUpConcurrencyModel.title = this.translateService.instant('J001Landesxindex.Msg.Title');
    this.popUpConcurrencyModel.message = message;
    this.popUpConcurrencyModel.textYes = this.translateService.instant('J001Landesxindex.Abbrechen');
    this.popUpConcurrencyModel.textNo = this.translateService.instant('J001Landesxindex.Msg.UpdateData');
    this.popUpConcurrencyModel.funcYes = () => {
      this.popUpConcurrencyModel.isVisible = false;
      this.customizeBtn[3].disabled = true;
      this.customizeBtn = [...this.customizeBtn];
    };
    this.popUpConcurrencyModel.funcNo = () => {
      this.popUpConcurrencyModel.isVisible = false;
      this.LandesindexesSandbox.loadLandesindexes();
      this.allowUpdating(true);
      this.groupActionButton(false);
      this.visibleListBtnNavigator(false);
      this.moduleConfigSandbox.updateEditModeStatus({ attr: true });
      this.moduleConfigSandbox.updateDirtyFormStatus(false);
    };
    this.popUpConcurrencyModel.isVisible = true;
  }

  allowUpdating(status: boolean) {
    if (status) {
      this.allowUpdatingGrdTop = true;
      this.allowUpdatingGrdBottom = true;
    } else {
      this.allowUpdatingGrdTop = false;
      this.allowUpdatingGrdBottom = false;
    }
  }

  groupActionButton(status: boolean) {
    this.customizeBtn[3].disabled = false;
    if (status) {
      this.isViewMode = true;
      this.visibleAdditionalFunction = true;
      this.toolbarBottomControl.isVisible = true;
      this.customizeBtn[1].visible = true;
      this.customizeBtn[2].visible = true;
      this.customizeBtn[3].visible = false;
      this.customizeBtn[4].visible = false;
      this.customizeBtn = [...this.customizeBtn];
    } else {
      this.isViewMode = false;
      this.visibleAdditionalFunction = false;
      this.toolbarBottomControl.isVisible = true;
      this.customizeBtn[1].visible = false;
      this.customizeBtn[2].visible = false;
      this.customizeBtn[3].visible = true;
      this.customizeBtn[4].visible = true;
      this.customizeBtn = [...this.customizeBtn];
    }
  }

  visibleListBtnNavigator(status: boolean) {
    for (let index = 0; index < CommonConstant.ToolbarButtons.length; index++) {
      this.listBtn[0][index]['visible'] = status;
    }
    for (let index = 0; index < CommonConstant.AdditionalButtons.length; index++) {
      this.listBtn[1][index]['visible'] = status;
    }
    this.listBtn[1][7]['visible'] = true;
    this.listBtn[1][8]['visible'] = false;
    this.listBtn = [...this.listBtn];
    this.landesxindexDetail.handleButtonVisibility(status);
  }

  loadSettingFromLocalstorage(gridSetting) {
    this.landesxindexList.gridFunction.model = new GridSettingModel();
    this.landesxindexList.gridFunction.model = Object.assign(this.landesxindexList.gridFunction.model, gridSetting);
  }

  setGridKeytoLocalstorge() {
    this.landesxindexList.gridFunction.model = new GridSettingModel();
    localStorage.setItem(this.gridFunctionKey, JSON.stringify(this.landesxindexList.gridFunction.model));
  }

  loadGridSetting() {
    const gridSetting = JSON.parse(localStorage.getItem(this.gridFunctionKey));
    if (gridSetting) {
      this.loadSettingFromLocalstorage(gridSetting);
    } else {
      this.setGridKeytoLocalstorge();
    }
  }

  onKeyPress(e) {
    if (e.event.keyCode === AppEnums.KeyCode.KeyE) {
      e.event.preventDefault();
    }
  }

  onRowUpdatingTop(e) {
    if (e.key !== undefined) {
      const data = new Landesindex();
      data.ikLandesindexId = e.key;
      data.name = e.newData.name.trim();
      if (isArray(this.arrayUpdateMasters)) {
        this.arrayUpdateMasters = this.removeItemArray(e.key, this.arrayUpdateMasters, true);
      }
      this.arrayUpdateMasters.push(data);
    }
  }

  onCellClickGridTop(e) {
    this.clickedGridName = LandesxindexConstant.NAME_GRID_TOP;
    this.rowSelectedIDTop = e.key;
    this.selectedKeysTop = [this.rowSelectedIDTop];
    this.rowIndexLandesxindex = e.rowIndex;
    if (!isNullOrUndefined(e.data)) {
      this.landesindexModel = e.data;
      this.ikLandesindexID = e.data.ikLandesindexId;
      if (!this.isViewMode && this.checkExistItemDetails(this.details, this.rowSelectedIDTop)) {
        this.landesindexesWertes = this.details[this.rowSelectedIDTop];
        this.landesxindexDetail.gridLandesxindexBottom.selectedRowKeys = [this.landesindexesWertes[this.landesindexesWertes.length - 1]];
        this.rowSelectedIDBtm = this.landesindexesWertes[this.landesindexesWertes.length - 1].ikLandesindexWertId;
      } else {
        this.LandesindexesSandbox.loadLandesindexWert(this.rowSelectedIDTop);
      }
      if (!isNullOrUndefined(e.data.name)) {
        this.nameLandesindex = e.data.name;
      }
    }
    if (!this.isViewMode) {
      this.editingControl.isEditBtm = false;
      if (e.rowType !== 'data' || e.columnIndex !== 1) {
        this.editingControl.isEditTop = false;
      }
    }
  }

  onCellClickGridBottom(e) {
    this.clickedGridName = LandesxindexConstant.NAME_GRID_BOTTOM;
    if (!isNullOrUndefined(e) && !isNullOrUndefined(e.key)) {
      this.rowSelectedIDBtm = e.key.ikLandesindexWertId;
      this.selectedKeysBottom = [e.key];
      this.rowIndexLandesxindexWert = e.rowIndex;
      if (!this.isViewMode) {
        if (this.editingControl.isEditTop) {
          this.editingControl.isEditTop = false;
        }
        if ((e.rowType !== 'data' || e.columnIndex === 0) && this.editingControl.isEditBtm) {
          this.editingControl.isEditBtm = false;
        }
      }
    } else {
      if (!this.isViewMode && (this.editingControl.isEditTop || this.editingControl.isEditBtm)) {
        this.editingControl.isEditTop = false;
        this.editingControl.isEditBtm = false;
      }
    }
  }

  actionAddNew_OnClick() {
    this.defaultDate = new Date(2011, 5, 15);
    this.toolbarControlAdd.popupVisible = true;
  }

  popupHiding(e) {
    this.isConfirm = true;
    this.popupDataMess.visible = false;
  }

  @HostListener('document:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // Ctrl + S
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS) {
      event.preventDefault();
      if (!this.customizeBtn[3].disabled && !this.isViewMode && !this.popUpModel.isVisible && !this.popUpConcurrencyModel.isVisible) {
        this.onClickSaveBtnGrdTop();
        return;
      }
    }
    // Ctrl + Z
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ) {
      if (!this.isViewMode) {
        event.preventDefault();
        this.onClickCancelBtnGrdTop();
        return;
      }
    }
    // Ctrl + I
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyI) {
      event.preventDefault();
      if (this.isViewMode) {
        this.createNewWert();
      }
      this.onClickEditBtnGrdTop();
      return;
    }
    // Ctrl + M
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyM) {
      event.preventDefault();
      if (!this.landesxindexWertModel) {
        return;
      }
      this.deleteInlineInGridBottom(this.landesxindexWertModel);
    }
    // Tab in grid
    if (this.clickedGridName === LandesxindexConstant.NAME_GRID_TOP || this.clickedGridName === LandesxindexConstant.NAME_GRID_BOTTOM) {
      if (event.key === 'Tab' || event.keyCode === AppEnums.KeyCode.KeyTab) {
        document.querySelectorAll('.dx-datagrid-focus-overlay')[0].setAttribute('style', 'border-color: #337ab7;');
      }
    }
  }

  showMessageInformation(message) {
    this.popUpModel.isVisible = true;
    this.popUpModel.title = this.translateService.instant('J003NeuerLandesindex.TitleMess');
    this.popUpModel.message = message;
    this.popUpModel.isVisibleNo = false;
    this.popUpModel.isVisibleYes = false;
  }

  neueMonatswerteErfassen() {
    this.onCloseError();
    if (this.landesxindexes.length <= 0) {
      this.remainingMessage.showMessage(this.translateService.instant('J001Landesxindex.Msg.NeueMonatswerteErfassenWhenNotLandesindex'));
      return;
    }
    this.ikLandesindexsToInsert.Values = [];
    this.LandesindexesSandbox.getIkLandesindex();
    this.popupLandesindexWertErfassen.popupVisibleLandesindexWertErfassen = true;
  }

  public toolbarPreparing(data: any) {
    const searchPanel = data.toolbarOptions.items.filter(x => x.name === 'searchPanel');
    const groupPanel = data.toolbarOptions.items.filter(x => x.name === 'groupPanel');
    if (data.toolbarOptions.items.length > 0) {
      data.toolbarOptions.items.splice(0, data.toolbarOptions.items.length);
    }
    if (searchPanel.length > 0) {
      data.toolbarOptions.items.push(searchPanel[0]);
    }
    if (groupPanel.length > 0) {
      data.toolbarOptions.items.push(groupPanel[0]);
    }
  }

  handleAfterCreateLandesindexWert() {
    this.selectedKeysTop = this.landesxindexes[this.landesxindexes.length - 1] ? [this.landesxindexes[this.landesxindexes.length - 1].ikLandesindexId] : [];
    this.selectedKeysBottom = this.landesindexesWertes[this.landesindexesWertes.length - 1] ? [this.landesindexesWertes[this.landesindexesWertes.length - 1]] : [];
    setTimeout(() => {
      const scrollable = this.landesxindexList.gridLandesxindexTop.instance.getScrollable();
      if (scrollable != null) {
        scrollable.scrollTo(scrollable.scrollHeight());
      }
    }, 300);
    setTimeout(() => {
      const scrollable = this.landesxindexDetail.gridLandesxindexBottom.instance.getScrollable();
      if (scrollable != null) {
        scrollable.scrollTo(scrollable.scrollHeight());
      }
    }, 300);
  }

  getFilterColumns() {
    const columnCountTop = this.landesxindexList.gridLandesxindexTop.instance.columnCount();
    for (let i = 0; i < columnCountTop; i++) {
      if (this.landesxindexList.gridLandesxindexTop.instance.columnOption(i).dataField) {
        this.filterColumnsTop.push(this.landesxindexList.gridLandesxindexTop.instance.columnOption(i));
      }
    }
  }

  checkExistItemDetails(details: any, id: number) {
    return !isNullOrUndefined(details[id]) && isArray(details[id]) && details[id].length > 0;
  }

  hasEditGrid() {
    document.getElementById('j001_text_header-top_grid').focus();
    const el = document.querySelector(':focus');
    if (el) {
      (el as HTMLElement).blur();
    }
    const hasEditBTop = this.landesxindexList.gridLandesxindexTop.instance.hasEditData();
    const hasEditBtm = this.landesxindexDetail.gridLandesxindexBottom.instance.hasEditData();
    if (!this.isViewMode && (hasEditBTop || hasEditBtm || this.arrayUpdateDetails.length > 0 || this.arrayUpdateMasters.length > 0)) {
      return true;
    }
    return false;
  }

  createNewWert() {
    this.isAddNewWert = true;
    this.wertData = this.createWertDefault();
    this.landesxindexWertModel = this.wertData;
    this.wertData.ikLandesindexId = this.landesindexModel.ikLandesindexId;
    this.landesindexesWertes.unshift(this.wertData);
    this.details[this.rowSelectedIDTop] = this.landesindexesWertes;
    this.landesxindexDetail.gridLandesxindexBottom.instance.saveEditData().then(
      () => {
        this.landesxindexDetail.gridLandesxindexBottom.instance.refresh();
        this.rowSelectedIDBtm = 0;
        this.landesxindexDetail.gridLandesxindexBottom.selectedRowKeys = [this.landesindexesWertes[0]];
      }
    );
  }

  showPopup() {
    this.popUpModel.message = this.translateService.instant('J001Landesxindex.Msg.MessageCloseBrowse');
    this.popUpModel.textYes = this.translateService.instant('J001Landesxindex.Msg.Discard');
    this.popUpModel.textNo = this.translateService.instant('J001Landesxindex.Msg.Abbrechen');
    this.popUpModel.title = this.translateService.instant('J001Landesxindex.Msg.Title');
    this.popUpModel.funcYes = () => {
      this.navigateAwaySelection$.next(true);
      this.popUpModel.isVisible = false;
    };
    this.popUpModel.funcNo = () => {
      this.navigateAwaySelection$.next(false);
      this.popUpModel.isVisible = false;
    };
    this.popUpModel.isVisible = true;
  }

  canDeactivate() {
    if (this.hasEditGrid()) {
      this.showPopup();
      return this.navigateAwaySelection$;
    }
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    return true;
  }

  getWert(data) {
    this.LandesindexesSandbox.getWert(data);
  }

  addLandesIndex(data) {
    this.LandesindexesSandbox.addLandesIndex(data);
  }

  modelAddLandesIndex(data) {
    this.insertLandesIndex = data;
  }

  checkboxState(data) {
    this.checkboxVisible = data;
  }

  addnewState(data) {
    this.isAddNew = data;
  }

  doAfterAddLandesindexErfassen() {
    this.isAddNew = false;
    this.selectedKeysTop = [this.landesxindexes[this.landesxindexes.length - 1].ikLandesindexId];
    if (this.checkboxVisible === true) {
      this.addLandesIndexWert.oldIkLandesindexID = this.ikLandesindexID;
      this.addLandesIndexWert.newIkLandesindexID = this.landesxindexes[this.landesxindexes.length - 1].ikLandesindexId;
      this.LandesindexesSandbox.addWertByLandesIndex(this.addLandesIndexWert);
      return;
    }
    this.LandesindexesSandbox.loadLandesindexWert(this.landesxindexes[this.landesxindexes.length - 1].ikLandesindexId);
    this.scrollToElement();
  }

  scrollToElement() {
    setTimeout(() => {
      const scrollable = this.landesxindexList.gridLandesxindexTop.instance.getScrollable();
      if (scrollable != null) {
        scrollable.scrollToElement(this.landesxindexList.gridLandesxindexTop.instance.getRowElement(this.landesxindexList.gridLandesxindexTop.instance.getRowIndexByKey(this.selectedKeysTop[0])));
      }
    }, 300);
  }

  existNameOrMonatWert(data: any, array: any, isIkLandesindex: boolean) {
    if (isNullOrUndefined(array) || array.length < 1) {
      return false;
    }
    if (isIkLandesindex) {
      return array.some(item => item.name === data.name && item.ikLandesindexId !== data.ikLandesindexId);
    }
    return array.some(item => item.jahr === data.jahr && item.monat === data.monat && item.ikLandesindexId === data.ikLandesindexId && item.ikLandesindexWertID !== data.ikLandesindexWertID);
  }

  addIkLandesindexWert(data) {
    this.LandesindexesSandbox.addIkLandesindexWert(data);
  }
}
