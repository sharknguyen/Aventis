import 'devextreme-intl';
import { Component, Injector, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TabModuleFallbearbeitungSandbox } from '@app/kiss4-main/tab-module-fallbearbeitung/tab-module-fallbearbeitung.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { CommonConstant } from '@shared/common/constant.common';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { BehaviorSubject } from 'rxjs';
import { locale } from 'devextreme/localization';
import { WohnkostenSandbox } from '../wohnkosten.sandbox';
import { getConditionListBtn } from '@shared/utilites/utilityHelpers';
import { cloneDeep, find, sortBy, includes } from 'lodash-es';
import { isNullOrUndefined } from 'util';
import { Subscription } from 'rxjs';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { DatePipe } from '@angular/common';
import { AppEnums } from '@shared/AppEnum';
import { ProgressbarComponent } from '@shared/components/progress-bar/progressbar.component';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { WohnkostenConstant } from '../constant';
import * as moment from 'moment';
import { PrinterComponent } from '@shared/components/printer/printer.component';

@Component({
  selector: 'kiss-wohnkosten',
  templateUrl: './wohnkosten-component.html',
  styleUrls: ['./wohnkosten-component.scss']
})
@SetClassRight('CtlWohnKosten')
export class WohnkostenComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  @ViewChild('wohnkostenDetail') wohnkostenDetail: any;
  @ViewChild('canDeactivate') deactivatePopup: any;
  @ViewChild('formList') formList: any;
  @ViewChild('wohnKostenProgressBar') wohnKostenProgressBar: ProgressbarComponent;
  @ViewChild('printer') printer: PrinterComponent;
  private subscriptions = new Subscription();
  CloneCommonConstant = cloneDeep(CommonConstant);
  listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn(CommonConstant.AdditionalButtons, [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
  headerClicked$ = new BehaviorSubject(null);
  isError: boolean;
  messageErr: string;
  isEditMode = false;
  titleHeaderTree: string;
  gridData: any;
  focusedRowKey = 0;

  detailData: any;
  isShiftKeyDown = false;
  baPersonID: number;
  isChangeNode: any;
  nameTree: any;
  bgBudgetID: number;
  finanzplanData: any;
  formDisabled = {
    Item31: true,
  };
  bgGrundbedarfData;
  whKennzahlenData = {};
  bgPositionsartData = [];
  datePopUpList = [];
  startDate;
  endDate;
  visibleConcurrencyPopup = false;
  editMask: any;
  datumVom: any;
  datumBis: any;
  gridAction$ = new BehaviorSubject<string>(null);
  focusFirstRow = true;
  gridListColumns = [
    { minWidth: 150, alignment: 'left', dataType: 'date', dataField: 'DatumVon', caption: this.translateService.instant('WohnKosten.Grid.GultigAb'), format: CommonConstant.shortDateFormat },
    { minWidth: 150, alignment: 'right', dataType: 'number', dataField: 'Betrag', caption: this.translateService.instant('WohnKosten.Grid.Miete'), format: CommonConstant.FormatNumberN2 },
    { minWidth: 150, alignment: 'right', dataType: 'number', dataField: 'NKBetrag', caption: this.translateService.instant('WohnKosten.Grid.Nebenkosten'), format: CommonConstant.FormatNumberN2 },
    { minWidth: 150, alignment: 'right', dataType: 'number', dataField: 'Total', caption: this.translateService.instant('WohnKosten.Grid.Angerechnet'), format: CommonConstant.FormatNumberN2 }
  ];
  disabledGrid = true;
  onFilterGrid = false;
  oldGridData: any;
  gridFunctionModel: GridSettingModel = new GridSettingModel();

  constructor(
    injector: Injector,
    public translateService: TranslateService,
    public utilService: UtilService,
    public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
    public router: Router,
    public wohnkostenSandbox: WohnkostenSandbox,
    public tabModuleFallbearbeitungSandbox: TabModuleFallbearbeitungSandbox,
    private datePipe: DatePipe
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  canDeactivate() {
    return this.deactivatePopup.canDeactivate(this.wohnkostenDetail.isDirty(), () => this.onRouterChanged());
  }

  onRouterChanged() {
    this.finanzplanData = null;
    this.resetGrid();
    if (!isNullOrUndefined(this.bgGrundbedarfData.bgBewilligungStatusCode)) {
      this.wohnkostenDetail.checkBgBewilligungStatusCode(this.bgGrundbedarfData.bgBewilligungStatusCode, null);
    }
    this.wohnkostenDetail.changetoViewMode();
  }

  ngOnInit() {
    this.wohnKostenProgressBar.hideProgressBar();
    this.doUpdateNodeStatus(false);
    this.registerEvents();
    this.initHeaderGrid();
  }

  ngOnDestroy() {
    this.doUpdateNodeStatus(false);
    this.subscriptions.unsubscribe();
  }

  doUpdateNodeStatus(isEditmode) {
    this.sozialhilfeTreeSandbox.updateNodesStatus(
    {
      id: this.router.url,
      isEditMode: isEditmode
    });
  }

  registerEvents() {
    this.subscriptions.add(this.translateService.onLangChange.subscribe(() => this.initHeaderGrid()));
    this.subscriptions.add( this.tabModuleFallbearbeitungSandbox.getPersonInfoTitel$.subscribe(data => this.onGetPersonInfoTitel(data)));
    this.subscriptions.add( this.sozialhilfeTreeSandbox.selectedNode$.subscribe(data => this.onSelectedNodeData(data)));
    this.subscriptions.add( this.wohnkostenSandbox.BgPositionData$.subscribe(data => this.onBgPositionData(data)));
    this.subscriptions.add( this.wohnkostenSandbox.BgFinanzplanData$.subscribe(data => this.onBgFinanzplanData(data)));
    this.subscriptions.add( this.wohnkostenSandbox.BgGrundbedarfData$.subscribe(data => this.onBgGrundbedarfData(data)));
    this.subscriptions.add( this.wohnkostenSandbox.WhKennzahlenData$.subscribe(data => this.onWhKennzahlenData(data)));
    this.subscriptions.add( this.wohnkostenSandbox.BgPositionsartData$.subscribe(data => this.onBgPositionsartData(data)));
    this.subscriptions.add( this.wohnkostenSandbox.updateWohnkostenPosition$.subscribe(data => this.onUpdateWohnkostenPositionData(data)));
    this.subscriptions.add( this.wohnkostenSandbox.createWohnkostenPosition$.subscribe(data => this.onCreateWohnkostenPositionData(data)));
  }

  onGetPersonInfoTitel(data) {
    if (!isNullOrUndefined(data)) {
      this.titleHeaderTree = '';
      this.titleHeaderTree = data.titleText;
    }
  }

  onSelectedNodeData(data) {
    if (!isNullOrUndefined(data)) {
      this.isChangeNode = true;
      this.bgBudgetID = data.bgBudgetID;
      this.baPersonID = data.baPersonID;
      this.editMask = data.editMask;
      if (!isNullOrUndefined(this.bgBudgetID)) {
        this.wohnkostenSandbox.loadBgFinanzplanStore(this.bgBudgetID);
        this.wohnkostenSandbox.loadBgGrundbedarfStore(this.bgBudgetID);
        this.wohnkostenSandbox.loadBgPositionStore(this.bgBudgetID);
      }
    }
  }

  onBgPositionData(data) {
    if (!isNullOrUndefined(data)) {
      this.checkPermission(data);
      this.gridData = sortBy(data, function(item) { return new Date(item.DatumVon); });
      for (let i = 0; i < this.gridData.length; i++) {
        this.gridData[i].SortId = i;
      }
      if (this.focusFirstRow) {
        this.focusedRowKey = 0;
        this.detailData = data[0] ? data[0] : {};
      }
      this.detailData = find(data, {'SortId': this.focusedRowKey});
      this.oldGridData = this.gridData;
      this.gridData = cloneDeep(this.gridData);
    }
  }

  onBgFinanzplanData(data) {
    if (!isNullOrUndefined(data)) {
      this.checkPermission(data);
      setTimeout(() => {
        if (isNullOrUndefined(data[0])) {
          return;
        }
        this.finanzplanData = data[0];
        this.wohnkostenDetail.updateFinanzplanData(this.finanzplanData);
        this.getDatePopUpList();
        this.datumVom = this.finanzplanData.FinanzplanVon;
        this.datumBis = this.finanzplanData.FinanzplanBis;
        if (this.finanzplanData.BgFinanzplanID) {
          this.wohnkostenSandbox.loadWhKennzahlenStore(this.finanzplanData.BgFinanzplanID);
          this.wohnkostenSandbox.loadRichtlinienStore({BgFinanzPlanID: this.finanzplanData.BgFinanzplanID, AnpassenVon: new Date()});
        }
        if (this.finanzplanData.FinanzplanVon && this.finanzplanData.FinanzplanBis) {
          this.wohnkostenSandbox.loadBgPositionsartStore(
            {FinanzplanVon: this.finanzplanData.FinanzplanVon, FinanzplanBis: this.finanzplanData.FinanzplanBis}
          );
        }
        if (isNullOrUndefined(this.finanzplanData.LeistungDatumBis)) {
          this.formDisabled.Item31 = false;
          this.formDisabled = cloneDeep(this.formDisabled);
        }
        switch (this.finanzplanData.WhGrundbedarfTypCode) {
          case 32015:
          case 32016:
          case 32017:
          case 32018:
            this.wohnkostenDetail.doHideZuschlagFields();
            break;
          case 32019:
          case 32011:
          default:
            this.wohnkostenDetail.doShowZuschlagFields();
        }
      });
    }
  }

  onBgGrundbedarfData(data) {
    if (!isNullOrUndefined(data)) {
      this.checkPermission(data);
      this.bgGrundbedarfData = data;
      if (!isNullOrUndefined(this.bgGrundbedarfData.bgBewilligungStatusCode)) {
        this.wohnkostenDetail.checkBgBewilligungStatusCode(this.bgGrundbedarfData.bgBewilligungStatusCode, this.finanzplanData ? this.finanzplanData.LeistungDatumBis : null);
      }
    }
  }

  onWhKennzahlenData(data) {
    if (!isNullOrUndefined(data)) {
      this.checkPermission(data);
      this.whKennzahlenData = data[0] ? data[0] : {};
    }
  }

  onBgPositionsartData(data) {
    if (!isNullOrUndefined(data)) {
      this.checkPermission(data);
      this.bgPositionsartData = data;
      this.bgPositionsartData = cloneDeep(this.bgPositionsartData);
    }
  }

  onUpdateWohnkostenPositionData(data) {
    if (isNullOrUndefined(data)) {
      return;
    }
    this.checkPermission(data);
    if (!isNullOrUndefined(data.status) && data.status !== AppEnums.StatusCode.STATUS_OK) {
      this.onSavePositionDataFail(data);
    } else {
      this.onSavePositionDataSuccess(data, false);
    }
  }

  onCreateWohnkostenPositionData(data) {
    if (isNullOrUndefined(data)) {
      return;
    }
    this.checkPermission(data);
    if (!isNullOrUndefined(data.status) && data.status !== AppEnums.StatusCode.STATUS_OK) {
      this.onSavePositionDataFail(data);
    } else {
      this.onSavePositionDataSuccess(data, true);
    }
  }

  onSavePositionDataFail(data) {
    this.wohnKostenProgressBar.hideProgressBar();
    if (!this.isEditMode) {
      return;
    }
    if (data.hasOwnProperty('status') && data.status === AppEnums.StatusCode.CONCURRENCY) {
      this.visibleConcurrencyPopup = true;
      return;
    }
    if (data.hasOwnProperty('status') && data.status === AppEnums.StatusCode.NOT_FOUND) {
      this.showRemainMessage(this.translateService.instant('WohnKosten.Message.SaveError'));
      return;
    }
    if (data.hasOwnProperty('status') && data.status === AppEnums.StatusCode.INTERNAL_SERVER_ERROR) {
      if (includes(data._body, WohnkostenConstant.MessageOverflowData)) {
        this.wohnkostenDetail.showInfoMessage(this.translateService.instant('WohnKosten.Message.SaveError500'));
        return;
      }
    }
    if (data.hasOwnProperty('status') && data.status !== AppEnums.StatusCode.STATUS_OK) {
      this.showRemainMessage(this.translateService.instant('WohnKosten.ValidateMessage.MSG_006'));
    }
  }
  onSavePositionDataSuccess(data, isCreate) {
    this.wohnKostenProgressBar.hideProgressBar();
    if (!isNullOrUndefined(this.detailData)) {
      this.wohnkostenDetail.changeDetailMode();
      this.detailData = find(this.gridData, {'BgPositionID': data.bgPositionId});
      if (!isNullOrUndefined(this.detailData)) {
        this.focusedRowKey = this.detailData.SortId;
      }
      if (!isCreate) {
        this.focusFirstRow = false;
      } else {
        this.focusFirstRow = true;
      }
      this.wohnkostenSandbox.loadBgPositionStore(this.bgBudgetID);
    }
  }

  checkPermission(data) {
    if (data.hasOwnProperty('status') && data.status === AppEnums.StatusCode.FORBIDDEN) {
      this.showRemainMessage(this.translateService.instant('WohnKosten.Message.SaveError403'));
    }
  }

  getDatePopUpList() {
    this.datePopUpList = [];
    const vonDate = new Date(this.finanzplanData.AnpassenVon);
    const vonMonth = vonDate.getMonth();
    const vonYear = vonDate.getFullYear();
    const bisDate = new Date(this.finanzplanData.AnpassenBis);
    const bisMonth = bisDate.getMonth();
    const bisYear = bisDate.getFullYear();

    const getListMonths = (startMonth, endMonth, year) => {
      for (let i = startMonth; i <= endMonth; i++) {
        const currentLang = localStorage.getItem('currentLang.Culture') || 'de-CH';
        const date = new Date(year, i);
        const item = {
          firstDate: new Date(year, i),
          text: moment(date).locale(currentLang).format('MMMM YYYY')
        };
        this.datePopUpList.push(item);
      }
    };
    if (vonYear === bisYear) {
      if (vonMonth <= bisMonth) {
        getListMonths(vonMonth, bisMonth, vonYear);
      }
    } else {
      getListMonths(vonMonth, 12, vonYear);
      if (bisYear > vonYear + 1) {
        for (let j = vonYear + 1; j < bisYear; j++) {
          getListMonths(1, 12, j);
        }
      }
      getListMonths(1, bisMonth, bisYear);
    }
  }

  onConcurrencyYes() {
    this.wohnkostenSandbox.loadBgPositionStore(this.bgBudgetID);
    this.visibleConcurrencyPopup = false;
  }

  onConcurrencyNo() {
    this.visibleConcurrencyPopup = false;
    this.wohnkostenDetail.disableSpeichernBtn();
  }

  showRemainMessage(remainMsg) {
    this.isError = true;
    this.messageErr = remainMsg;
  }

  toolBarOnItemClick(event) {
    if (event === 'printPdf') {
      this.printPdf();
      return;
    }
    this.formList.toolBarOnItemClick(event);
  }

  onCloseError() {
    this.isError = false;
  }

  gridOnSelectedRowChange(rowData) {
    this.detailData = rowData;
    this.wohnkostenDetail.clearFormDirty();
  }

  doChangeDetailMode(isEditmode) {
    this.isError = false;
    this.isEditMode = isEditmode;
    this.disabledGrid = !this.isEditMode;
    if (this.onFilterGrid) {
      this.gridData = this.oldGridData;
      this.focusedRowKey = 0;
    }
    this.onFilterGrid = false;
    this.gridData = cloneDeep(this.gridData);
  }

  onSaveForm(formData) {
    if (!isNullOrUndefined(formData.BgFinanzplanId)) {
      this.wohnkostenSandbox.createWohnkosten(formData);
      this.wohnKostenProgressBar.showProgressBar();
    } else {
      this.wohnkostenSandbox.updateWohnkosten(formData);
    }
  }

  onShowRMMessage(type) {
    this.showRemainMessage(this.translateService.instant('WohnKosten.Message.SaveError'));
  }

  doFilterGrid(datePopupSelect) {
    this.onFilterGrid = true;
    const filterData = [];
    this.gridData.forEach(item => {
      if (item.Anpassung === 1 || ((item.DatumVon === null || new Date(item.DatumVon) <= new Date(datePopupSelect.firstDate)) && (item.DatumBis === null || new Date(item.DatumBis) > new Date(datePopupSelect.firstDate)))) {
        filterData.push(item);
      }
    });
    this.focusedRowKey = 0;
    this.gridData = filterData;
    if (filterData.length > 1) {
      this.disabledGrid = true;
    } else {
      this.disabledGrid = false;
    }
    if (!isNullOrUndefined(filterData[0])) {
      this.focusedRowKey = filterData[0].SortId;
      this.detailData = filterData[0];
    }
    sortBy(this.gridData, function(item) { return new Date(item.DatumVon); });
    this.gridData = cloneDeep(this.gridData);
  }

  // Shortcuts key
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: any) {
    this.isShiftKeyDown = false;
  }

  @HostListener('document:keydown', ['$event'])
    public keyEvent(event: KeyboardEvent) {
      if (event.shiftKey) {
        this.isShiftKeyDown = true;
      }
  }

  blurAll() {
    const el = document.querySelector(':focus');
    if (el) {
        (el as HTMLElement).blur();
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    this.blurAll();
    if (this.wohnkostenDetail.isDirty()) {
      $event.returnValue = '';
    }
  }

  resetGrid() {
  this.gridFunctionModel.isFilterBuilder = false;
  this.gridFunctionModel.isSearchPanel = false;
  this.gridFunctionModel.isFilter = false;
  this.gridFunctionModel.isSearch = true;
  this.gridFunctionModel.isGrouping = false;
  this.formList.reset();
  }

  initHeaderGrid() {
    this.gridListColumns = [
      { minWidth: 150, alignment: 'left', dataType: 'date', dataField: 'DatumVon', caption: this.translateService.instant('WohnKosten.Grid.GultigAb'), format: CommonConstant.shortDateFormat },
      { minWidth: 150, alignment: 'right', dataType: 'number', dataField: 'Betrag', caption: this.translateService.instant('WohnKosten.Grid.Miete'), format: CommonConstant.FormatNumberN2 },
      { minWidth: 150, alignment: 'right', dataType: 'number', dataField: 'NKBetrag', caption: this.translateService.instant('WohnKosten.Grid.Nebenkosten'), format: CommonConstant.FormatNumberN2 },
      { minWidth: 150, alignment: 'right', dataType: 'number', dataField: 'Total', caption: this.translateService.instant('WohnKosten.Grid.Angerechnet'), format: CommonConstant.FormatNumberN2 }
    ];
    if (this.wohnkostenDetail) {
      this.wohnkostenDetail.customizeBtnDetail[0].text = this.translateService.instant(localStorage.getItem(this.wohnkostenDetail.cloneBtnLabelKey));
    }
  }

  printPdf() {
    const printData = cloneDeep(this.formList.getDataSource());
    const columns = this.formList.getVisibleColumn();
    const nums = columns.filter(x => x.dataType === 'number');
    const dates = columns.filter(x => x.dataType === 'date');
    for (let i = 0; i < nums.length; i++) {
      printData.forEach(element => {
        element[nums[i].dataField] = parseFloat(element[nums[i].dataField].toString());
        element[nums[i].dataField] = UtilityHelper.formatNumberByCulture(element[nums[i].dataField]);
      });
    }
    printData.forEach(element => {
      moment.locale(this.translateService.currentLang);
      element.DatumVon = isNullOrUndefined(element.DatumVon) ? '' : moment(element.DatumVon).format('MMMM YYYY');
    });
    dates.forEach(element => {
      element.dataType = 'other';
    });
    this.printer.setData(printData, { title: this.translateService.instant('WohnKosten.Detail.Wohnkosten') }, columns);
  }
}
