import { BaseComponent } from '@shared/components/base.component';
import { Component, Injector, OnDestroy, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { isArray } from 'util';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant } from '@shared/common/constant.common';
import { UtilService, copyElement, getConditionListBtn } from '@shared/utilites';
import { Router, NavigationEnd } from '@angular/router';
import { locale } from 'devextreme/localization';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { Subject } from 'rxjs';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { KasseSandbox } from '../kasse.sandbox';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { KbBuchungsStatus, ShUnterstuetztePerson, KbBuchung, KbBuchungUpdateModel, SearchQuery } from '../models';
import { KASSE } from '@shared/common/kasse.common';
import { KasseGridComponent } from '../components/kasse-grid/kasse-grid.component';
import { KasseSearchComponent } from '../components/kasse-search/kasse-search.component';
import { KasseEditComponent } from '../components/kasse-detail-edit/kasse-edit.component';
import { KasseDetailViewComponent } from '../components/kasse-detail-view/kasse-view.component';
@Component({
  host: { '(document:keydown)': 'hotkeys($event)' },
  selector: 'app-kasse',
  templateUrl: './kasse.component.html',
  styleUrls: ['./kasse.component.scss']
})
@SetClassRight('CtlKasse')
export class KasseComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {
  @ViewChild('gridKasse') gridKasse: KasseGridComponent;
  @ViewChild('viewComponent') viewComponent: KasseDetailViewComponent;
  @ViewChild('editComponent') editComponent: KasseEditComponent;
  @ViewChild('kasseSearchComponent') kasseSearchComponent: KasseSearchComponent;
  @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;
  messageCanDeactive?: any;
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
  listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
  pageTitle = this.translateService.instant(KASSE.PAGETITLE);
  isNavbar: boolean;
  currentUrl: string;
  //#region "Declare variables for Search"
  dropDownData: ShUnterstuetztePerson[] = [];
  kbBuchungStatusData: KbBuchungsStatus[] = [];
  enumKeyLoad = {
    init: 'init',
    search: 'search',
    update: 'update',
    concurrency: 'concurrency'
  };
  keyExpr = 'Index';
  keyLoad = 'init';
  //#region Need fix after merge to develop
  userFa = '';
  //#endregion

  //#endregion

  //#region "Declare variables for grdiview"
  optionNameExport = 'export.fileName';
  optionKasseValue = 'Kasse';
  kasseData: KbBuchung[] = [];
  //#endregion

  //#region "Declare variables for detail view"
  kasseDetail: KbBuchung = new KbBuchung();
  //#endregion

  //#region "Declare variables for add, update, delete"
  isViewMode = true;
  kasseUpdate: KbBuchungUpdateModel = new KbBuchungUpdateModel();
  conPopupVisible = false;
  //#endregion

  //#region "Declare variables for another bussiness"

  private subscriptions: Subscription = new Subscription();
  messageErr = null;
  isShiftKeyDown = false;
  popUpConfirmModel: PopUpModel;
  personCopyTitle: string;
  //#endregion
  constructor(
    injector: Injector,
    private ref: ChangeDetectorRef,
    public kasseSandbox: KasseSandbox,
    public layoutSandbox: LayoutSandbox,
    public translateService: TranslateService,
    public utilService: UtilService,
    public router: Router) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    this.isNavbar = JSON.parse(localStorage.getItem('settings:toogleNavbar'));
    this.popUpConfirmModel = this.initPopUpModel();
    this.kasseSandbox.registerEvents();
  }
  format(strFormat, ...args: any[]) {
    return strFormat.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] !== 'undefined'
        ? args[number]
        : match
        ;
    });
  }
  setVisibleExportExcelAndPrint(isVisible) {
    if (isVisible) {
      this.listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
      return;
    }
    this.listBtn = [];
  }
  initData() {
    this.setTitle(this.translateService.instant(KASSE.PAGETITLE));
  }
  initPopUpModel(): PopUpModel {
    return new PopUpModel(
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
  ngAfterViewInit(): void {
    this.registerEvents();
    this.initData();
    this.kasseSandbox.loadDropDownData();
  }
  //#region "registerEvents function"
  private registerEvents() {
    this.subscriptions.add(this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.pageTitle = this.translateService.instant(KASSE.PAGETITLE);
      this.setTitle(this.translateService.instant(KASSE.PAGETITLE));
    }));
    this.subscriptions.add(this.gridKasse.visibleRowChange.subscribe(visibleRows => {
      if (visibleRows.length) {
        if (this.viewComponent) {
          this.viewComponent.changeStatusButtons(false);
        }
        return;
      }
      if (this.viewComponent) {
        this.viewComponent.changeStatusButtons(true);
      }
    }));
    this.subscriptions.add(this.gridKasse.rowFocusing.subscribe(key => {
      // load detail with key
      if (key) {
        if (this.kasseData.length > 0 && this.kasseData.filter(x => x[this.keyExpr] === key).length > 0) {
          this.kasseDetail = { ...this.kasseData.filter(x => x[this.keyExpr] === key)[0] };
        }
        return;
      }
      this.kasseDetail = new KbBuchung();
    }));
    this.subscriptions.add(this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    }));
    this.subscriptions.add(this.kasseSandbox.kasseData$.subscribe(data => {
      if (!data || !isArray(data)) {
        return;
      }
      this.handlerAfterLoad(data);
    }));
    this.subscriptions.add(this.kasseSandbox.dropDownData$.subscribe(data => {
      if (!data || !isArray(data)) {
        return;
      }
      this.dropDownData = data;
    }));
    this.subscriptions.add(this.kasseSandbox.KbBuchungUpdatedData$.subscribe(data => {
      if (!data) {
        return;
      }
      if (data.status) {
        this.concurrencyUpdateHandler(data);
        return;
      }
      if (data.kbBuchungId) {
        this.handleAfterUpdated();
      }
    }));
    this.subscriptions.add(this.kasseSandbox.KbBuchungStatusUpdatedData$.subscribe(data => {
      if (!data) {
        return;
      }
      if (data.status) {
        this.concurrencyUpdateHandler(data);
        return;
      }
      if (data.kbBuchungId) {
        this.handleAfterUpdated();
      }
    }));
  }
  //#endregion
  handlerAfterLoad(data) {
    this.kasseData = data;
    const sub = this.gridKasse.gridComponent.onContentReady.subscribe(event => {
      switch (this.keyLoad) {
        case this.enumKeyLoad.update:
          this.gridKasse.setFocusByKey(this.kasseDetail[this.keyExpr]);
          break;
        case this.enumKeyLoad.concurrency:
          this.gridKasse.setFocusByKey(this.kasseDetail[this.keyExpr]);
          break;
        default:
          if (data.length < 1) {
            this.gridKasse.rowFocusing.emit(null);
          } else {
            this.gridKasse.setFocusByKey(null);
          }
          break;
      }
      sub.unsubscribe();
    });
  }
  onSearchByButton(searchQuery: SearchQuery) {
    this.keyLoad = this.enumKeyLoad.search;
    this.onSearch(searchQuery);
  }
  onSearch(searchQuery: SearchQuery) {
    this.remainingMessage.hideMessage();
    this.kasseSandbox.loadKasseInitData(searchQuery);
  }
  searchErrorEvent(event) {
    this.remainingMessage.showMessage(event);
  }
  scrollChanged(e) {
    this.layoutSandbox.scrollChanged.next(e);
  }
  //#region "Search region"
  //#endregion
  toolBarOnItemClickTopGrd(event) {
    this.gridKasse.onToolbarItemClick(event);
  }
  //#endregion

  //#region "CRUD funtion"
  actionAuszahlen_OnClick() {
    const mess = this.format(this.translateService.instant('Kasse.Detail.MessConfirmAusfuhren'),
      this.kasseDetail.BetragGrid.toLocaleString(UtilityHelper.getLanguageCodeFromLocalStorage(),
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }), this.kasseDetail.Person);
    this.showPopupConfirm(mess, () => {
      this.auszahlen();
      this.popUpConfirmModel.isVisible = false;
    },
      () => {
        this.popUpConfirmModel.isVisible = false;
      });
  }
  auszahlen() {
    this.keyLoad = this.enumKeyLoad.update;
    this.kasseUpdate = this.mappingDataToUpdate(this.kasseDetail);
    this.kasseSandbox.updateKbBuchungStatus(this.kasseUpdate);
  }
  actionEdit_OnClick() {
    this.changeViewState(false);
    this.keyLoad = this.enumKeyLoad.update;
  }

  actionSave_OnClick(event) {
    if (this.editComponent.validateForm()) {
      this.kasseUpdate = this.mappingDataToUpdate(this.kasseDetail);
      this.kasseSandbox.updateKbBuchung(this.kasseUpdate);
      return;
    }
    this.remainingMessage.showMessage(this.translateService.instant('Kasse.Validation.RemainingValidate'), 'Kasse.Validation.RemainingValidate');
  }
  mappingDataToUpdate(data: KbBuchung) {
    const result = new KbBuchungUpdateModel();
    result.KbBuchungId = data.KbBuchungID;
    result.KbBuchungTs = data.KbBuchungTS;
    result.Remark = data.Remark ? data.Remark.trim() : null;
    return result;
  }
  handleAfterUpdated() {
    this.changeViewState(true);
    this.kasseSearchComponent.onSearch();
  }
  actionCancel_OnClick() {
    if (this.editComponent.isDirty()) {
      this.showPopupConfirm(this.translateService.instant('Kasse.Detail.MessageConfirmCancelEdit'),
        () => this.cancelConfirmYes(),
        () => this.popUpConfirmModel.isVisible = false);
      return;
    }
    this.changeViewState(true);
  }
  cancelConfirmYes() {
    this.changeViewState(true);
    this.popUpConfirmModel.isVisible = false;
    if (this.keyLoad === this.enumKeyLoad.concurrency) {
      this.kasseSearchComponent.onSearch();
      return;
    }
    const detail = this.kasseData.filter(x => x[this.keyExpr] === this.kasseDetail[this.keyExpr]);
    if (this.kasseData.length > 0 && detail.length > 0) {
      this.kasseDetail = { ...detail[0] };
    }
  }
  showPopupConfirm(message, funcYes?, funcNo?,
    textYes = this.translateService.instant('Kasse.Button.BtnYes'),
    textNo = this.translateService.instant('Kasse.Button.BtnNo'),
    title = this.translateService.instant('Kasse.Message.TitleConfirm')) {
    this.popUpConfirmModel.title = title;
    this.popUpConfirmModel.isVisible = true;
    this.popUpConfirmModel.textYes = textYes;
    this.popUpConfirmModel.textNo = textNo;
    this.popUpConfirmModel.message = message;
    this.popUpConfirmModel.funcYes = funcYes;
    this.popUpConfirmModel.funcNo = funcNo;
  }

  //#endregion

  //#region "Businness, load data for combox..."
  ngOnDestroy() {
    this.kasseSandbox.resetState();
    this.unregisterEvents();
    this.kasseSandbox.unregisterEvents();
  }

  public unregisterEvents() {
    this.subscriptions.unsubscribe();
  }
  @HostListener('window:beforeunload', ['$event'])
  public beforeunloadHandler($event) {
    this.blurAll();
    if (this.isDirty()) {
      $event.returnValue = 'Are you sure?';
    }
  }
  isDirty() {
    return !this.isViewMode && this.editComponent.isDirty();
  }
  gridKeyDownEvent(e) {
    if (e.event.altKey && e.event.keyCode === AppEnums.KeyCode.KeyEnter && this.isViewMode && !this.conPopupVisible && !this.popUpConfirmModel.isVisible) {
      this.kasseSearchComponent.onSearchByButton();
      event.preventDefault();
    }
  }
  // Shortcuts key
  hotkeys(event) {
    if ((event.shiftKey || event.metaKey)) {
      this.isShiftKeyDown = true;
      return;
    }
  }
  // Shortcuts key
  @HostListener('document:keyup', ['$event'])
  public keyUpEvent(event: KeyboardEvent) {
    if ((event.keyCode === 16 || event.metaKey)) {
      event.preventDefault();
      this.isShiftKeyDown = false;
    }
  }
  @HostListener('document:keydown', ['$event'])
  public hotKey(event: KeyboardEvent) {
    if ((event.shiftKey || event.metaKey)) {
      this.isShiftKeyDown = true;
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ && !this.isViewMode && !this.conPopupVisible && !this.popUpConfirmModel.isVisible) {
      this.blurAll();
      this.actionCancel_OnClick();
      event.preventDefault();
    }
    if (event.altKey && event.keyCode === AppEnums.KeyCode.KeyEnter && this.isViewMode && !this.conPopupVisible && !this.popUpConfirmModel.isVisible) {
      this.kasseSearchComponent.onSearchByButton();
      event.preventDefault();
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS && !this.isViewMode && !this.editComponent.isDisableBtnSave()
      && !this.conPopupVisible && !this.popUpConfirmModel.isVisible) {
      // Save
      this.blurAll();
      this.actionSave_OnClick(this.kasseDetail);
      event.preventDefault();
      return;
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyB) {
      // TODO ctrl + B
      event.preventDefault();
      return;
    }
  }
  blurAll() {
    const el = document.querySelector(':focus');
    if (el) {
      (el as HTMLElement).blur();
    }
  }
  onShownConfirm() {
  }
  cleanRemainingMessage() {
    this.remainingMessage.hideMessage();
  }
  concurrencyUpdateHandler(data) {
    switch (data.status) {
      case AppEnums.StatusCode.NOT_FOUND:
        // concurrency case update - deleted (1)
        this.remainingMessage.showMessage(this.translateService.instant('Kasse.Detail.ConcurrencyMessUpdateRecordDeleted'));
        this.changeBtnAfterConcurrency();
        // disable button
        break;
      case AppEnums.StatusCode.FORBIDDEN:
        // concurrency case update - deleted (1)
        this.remainingMessage.showMessage(this.translateService.instant('HttpStatusMessage.Forbidden'), 'HttpStatusMessage.Forbidden');
        // disable button
        break;
      case AppEnums.StatusCode.CONCURRENCY:
        this.conPopupVisible = true;
        // concurrency case update - updated (3)
        this.keyLoad = this.enumKeyLoad.concurrency;
        break;
      default:
        break;
    }
  }
  changeBtnAfterConcurrency() {
    if (!this.isViewMode) {
      this.editComponent.changeStatusButtons(true);
    } else {
      this.viewComponent.changeDisabled(['auszahlen'], true);
    }
  }
  changeViewState(toViewMode: boolean) {
    this.cleanRemainingMessage();
    this.isViewMode = toViewMode;
    this.setVisibleExportExcelAndPrint(toViewMode);
  }
  canDeactivate() {
    if (!this.isViewMode && this.editComponent.isDirty()) {
      this.showPopupConfirm(this.translateService.instant('Kasse.NavigatorPopupConfirm.Message'),
        () => this.navigatorConfirmYes(),
        () => this.navigatorConfirmNo(),
        this.translateService.instant('Kasse.NavigatorPopupConfirm.Yes'),
        this.translateService.instant('Kasse.NavigatorPopupConfirm.No'),
        this.translateService.instant('Kasse.NavigatorPopupConfirm.Title')
      );
      return this.navigateAwaySelection$;
    } else {
      return true;
    }
  }
  navigatorConfirmYes() {
    this.isViewMode = true;
    this.navigateAwaySelection$.next(true);
    this.popUpConfirmModel.isVisible = false;
  }
  navigatorConfirmNo() {
    this.navigateAwaySelection$.next(false);
    this.popUpConfirmModel.isVisible = false;
  }
  onConYes() {
    this.conPopupVisible = false;
    this.kasseSearchComponent.onSearch();
  }
  onConNo() {
    this.conPopupVisible = false;
    this.changeBtnAfterConcurrency();
  }
  //#endregion
}
