import { Component, EventEmitter, Injector, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { GrundBedarfSandbox } from '@app/kiss4-sozialhilfe/finanzplan/grund-bedarf/grund-bedarf.sandbox';
import { InitFormDataModel, QryBgPositionDataModel, QryKennzahlenModel, RichtlinieDataModel, SelectboxModel, UpdateFormDataQueryModel } from '@app/kiss4-sozialhilfe/finanzplan/grund-bedarf/models';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import 'devextreme-intl';
import { locale } from 'devextreme/localization';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { GrundBedarfDetailEditComponent } from '../grundbedarf-detail-edit/grundbedarf-detail-edit.component';
import { GrundBedarfDetailViewComponent } from '../grundbedarf-detail-view/grundbedarf-detail-view.component';

@Component({
  selector: 'kiss-grundbedarf-detail',
  templateUrl: './grundbedarf-detail.component.html',
  styleUrls: ['./grundbedarf-detail.component.scss']
})
@SetClassRight('CtlGrundBedarf')
export class FormDetailComponent extends BaseComponent implements OnInit, OnDestroy, OnChanges {

  //#region 'Declare decorator'
  @ViewChild(GrundBedarfDetailEditComponent) grundbedarfDetailEditComponent: GrundBedarfDetailEditComponent;
  @ViewChild(GrundBedarfDetailViewComponent) grundbedarfDetailViewComponent: GrundBedarfDetailViewComponent;
  @ViewChild('detailView') detailView: any;
  //#endregion
  readonly BgBewilligungStatus =
    {
      InVorbereitung: 1,
      Abgelehnt: 2,
      Angefragt: 3,
      Erteilt: 5,
      Gesperrt: 9
    };
  //#region "Declare variables Input And Output"
  @Input() onChangeData: boolean;
  @Input() isViewMode: boolean;
  @Input() richtlinieData: RichtlinieDataModel;
  @Output() loadedGrid: EventEmitter<any> = new EventEmitter();
  @Output() remainingMessageError: EventEmitter<any> = new EventEmitter();
  @Output() changeToViewModeEvent: EventEmitter<any> = new EventEmitter();
  @Output() isConcurrencyEvent: EventEmitter<any> = new EventEmitter();
  @Output() refreshDataEvent: EventEmitter<any> = new EventEmitter();
  @Output() titleTextEvent: EventEmitter<any> = new EventEmitter();
  //#endregion
  typeFormatNumber: any;
  private subscriptions: Subscription[] = [];
  detailkategorie: any;
  detailperson: any;
  detailFieldTyp: any;
  detailValidierung: any;
  detailHafTypDetail: any;
  isCollapseFormDetail = false;
  dataSourceSelectboxes: SelectboxModel[] = [];
  BgPositionsartCode: number;
  berechnungsgrundlageValueSelectbox: string;
  readOnlySettingComponents = {
    berechnungsgrundlage: true,
  };
  visibleGroup = {
    visibleSKOSbzwGroup: false,
    visibleSKOS2005Group: false,
    visibleBerechnungsgrundlageGroup: true,
  };
  visibleComponent = {
    lblUeZuschlagI: false,
    edtUeZuschlagI: false,
  };
  fraELSE: string;
  lblELSE_Betrag: string;
  popUpModel: PopUpModel;
  popUpConcurrencyModel: PopUpModel;
  emptyData: boolean;
  popupConcurrency = {
    title: this.translateService.instant('I007GrundBedarf.PopupConfirm.Title'),
    visible: false,
    message: '',
    abbrechen: this.translateService.instant('I007GrundBedarf.PopupConfirm.Abbrechen'),
    datenAktualisieren: this.translateService.instant('I007GrundBedarf.PopupConfirm.Daten'),
  };
  result: string;
  dataUpdate = new UpdateFormDataQueryModel();
  initData = new InitFormDataModel();
  qryBgPositionData = new QryBgPositionDataModel();
  ELSE_AnpassungTemp: number;
  ELSE_BetragTemp: number;
  BemerkungTemp: string;
  SKOS2005_AnpassungTemp: number;
  GrundbedarfI_AnpassungTemp: number;
  GrundbedarfII_AnpassungTemp: number;
  GBII_AsOnePersonTemp: boolean;
  qryKennzahlenData = new QryKennzahlenModel();
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
  dirty = false;
  disabledSpeichern = false;
  qryBgPosition = {
    CanUpdate: true,
    CanInsert: true,
    CanDelete: true,
    RowModified: false,
  };
  pauschaleSTE: number;
  shStatusCode: any;
  SKOS2005_HGReadMode: any;
  SKOS2005_UEReadMode: any;
  AbzugVVGReadMode: any;
  SKOS2005_TotalReadMode: any;
  ELSE_TotalReadMode: any;
  GBI_HgReadMode: any;
  GBIZuschlag_HgReadMode: any;
  GBII_HgReadMode: any;
  Betrag_SKOSReadMode: any;
  GrundbedarfZusatzReadMode: any;
  GrundbedarfIIReadMode: any;
  GrundbedarfTotalReadMode: any;
  isSaved = false;
  temp: string;

  constructor(injector: Injector,
    public ctlBgGrundbedarfSandbox: GrundBedarfSandbox,
    public translateService: TranslateService,
    public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
    public router: Router) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    this.registerEvents();
    this.initPopUpModel();
    this.initPopUpConcurModel();
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
      }
    );
  }
  showConfirmPopup(message) {
    this.popUpModel.message = message;
    this.popUpModel.textYes = this.translateService.instant('I007GrundBedarf.PopupConfirm.Yes');
    this.popUpModel.textNo = this.translateService.instant('I007GrundBedarf.PopupConfirm.No');
    this.popUpModel.title = this.translateService.instant('I007GrundBedarf.PopupConfirm.Title');
    this.popUpModel.isVisible = true;
  }
  ngOnDestroy() {
    this.showPencilIcon(false);
    this.unregisterEvents();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
  //#endregion

  //#region "RegisterEvents"
  registerEvents() {
    // Register subscribe for load data for dataSource select box
    this.subscriptions.push(this.ctlBgGrundbedarfSandbox.GetDataSourceSelectboxData$.subscribe(data => {
      if (data && data.length > 0) {
        this.dataSourceSelectboxes = data;
      }
    }));
    // Register subscribe for load QryBgPosition data
    this.subscriptions.push(this.ctlBgGrundbedarfSandbox.LoadGrundBedarfQryBgPositionFormData$.subscribe(data => {
      if (data) {
        if (data.length === 0) {
          this.emptyData = true;
          return;
        }
        this.emptyData = false;
        this.qryBgPositionData = data[0];
        this.assignDataTemp(data[0]);
        this.getReadModeData();
        this.BgPositionsartCode = this.qryBgPositionData.BgPositionsartCode;
        this.berechnungsgrundlageValueSelectbox = this.dataSourceSelectboxes.find(e => e.code === this.BgPositionsartCode).text;
        this.edtBgPositionsartCode_EditValueChanged();
        setTimeout(() => {
          this.qryBgPosition_AfterFill();
        }, CommonConstant.SetTimeOut300);
      }
    }));
    // Register subscribe for load QryKennzahlen data
    this.subscriptions.push(this.ctlBgGrundbedarfSandbox.LoadGrundBedarfQryKennzahlenFormData$.subscribe(data => {
      if (data && data.length > 0) {
        this.qryKennzahlenData = data[0];
      }
    }));
    // Register subscribe for load Init Form data
    this.subscriptions.push(this.ctlBgGrundbedarfSandbox.LoadGrundBedarfInitFormData$.subscribe(data => {
      if (data) {
        if (data.status === AppEnums.StatusCode.INTERNAL_SERVER_ERROR) {
          this.handleActionPopup('messagePopup', JSON.parse(data._body).message);
          return;
        }
        this.initData = data;
        this.titleTextEvent.emit({ lblTitelText: data.lblTitelText });
        this.ctlBgGrundbedarfSandbox.loadSelectboxData();
        this.ctlBgGrundbedarfSandbox.loadGrundBedarfQryKennzahlenData({ bgFinanzplanID: this.initData.bgFinanzplanID });
        this.ctlBgGrundbedarfSandbox.loadShStatusCodeToSqlData({ bgBudgetID: this.initData.bgBudgetId });
        setTimeout(() => {
          this.ctlBgGrundbedarfSandbox.loadGrundBedarfQryBgPositionData({ bgBudgetID: this.initData.bgBudgetId });
        }, CommonConstant.SetTimeOut300);
      }
    }));
    this.subscriptions.push(this.ctlBgGrundbedarfSandbox.UpdateGrundBedarfFormData$.subscribe(result => {
      if (result) {
        if (result.status && result.status === AppEnums.StatusCode.CONCURRENCY) {
          const message = this.translateService.instant('I007GrundBedarf.Msg.ConcurrencyMsg409');
          message.replace('\r\n', '<br>');
          this.showPopupConcurrency(message);
          return;
        }
        if (result.status && result.status === AppEnums.StatusCode.BAD_REQUEST) {
          const body = JSON.parse(result._body);
          this.handleActionPopup('messagePopup', body.message);
          return;
        }

        if (result.status && result.status === AppEnums.StatusCode.NOT_FOUND) {
          this.showPopupConcurrency(this.translateService.instant('I007GrundBedarf.Msg.ConcurrencyMsg404'));
          return;
        }
        this.refreshDataEvent.emit({ bgBudgetID: result.bgBudgetID });
        this.changeToViewModeEvent.emit({ result: true });
        this.refreshData(result.bgBudgetID);
        this.isSaved = true;
      }
    }));
    this.subscriptions.push(this.ctlBgGrundbedarfSandbox.UpdateGrundBedarfBeforePostData$.subscribe(result => {
      if (result) {
        if (result.status && result.status === AppEnums.StatusCode.CONCURRENCY) {
          const message = this.translateService.instant('I007GrundBedarf.Msg.ConcurrencyMsg409');
          message.replace('\r\n', '<br>');
          this.showPopupConcurrency(message);
          return;
        }
        if (result.status && result.status === AppEnums.StatusCode.BAD_REQUEST) {
          const body = JSON.parse(result._body);
          this.handleActionPopup('messagePopup', body.message);
          return;
        }

        if (result.status && result.status === AppEnums.StatusCode.NOT_FOUND) {
          this.showPopupConcurrency(this.translateService.instant('I007GrundBedarf.Msg.ConcurrencyMsg404'));
          return;
        }
      }
    }));
    // Register subscribe for load PauschaleSTE data
    this.subscriptions.push(this.ctlBgGrundbedarfSandbox.LoadPauschaleSTEData$.subscribe(pauschaleSTEDatas => {
      if (pauschaleSTEDatas) {
        this.pauschaleSTE = pauschaleSTEDatas;
      }
    }));
    // Register subscribe for load ShStatusCodeToSql data
    this.subscriptions.push(this.ctlBgGrundbedarfSandbox.LoadShStatusCodeToSqlData$.subscribe(ShStatusCode => {
      if (ShStatusCode) {
        this.shStatusCode = ShStatusCode;
        this.ApplyShStatusCodeToSqlQuery();
      }
    }));
    // Handle change language
    this.subscriptions.push(this.translateService.onLangChange.subscribe(event => { this.edtBgPositionsartCode_EditValueChanged(); }));
  }
  // #endregion
  handleActionPopup(key, message: string) {
    this.initPopUpModel();
    if (key === 'messagePopup') {
      this.showMesagePopup(message);
    }
    if (key === 'onNavigate') {
      this.popUpModel.funcYes = () => {
        this.navigate();
      };
      this.popUpModel.funcNo = () => {
        return this.cancelNavigate();
      };
      this.showConfirmPopup(message);
    }
    if (key === 'onClickCancelBtnGrdTop') {
      this.popUpModel.funcYes = () => {
        this.undoChangeFromData();
      };
      this.popUpModel.funcNo = () => {
        this.popUpModel.isVisible = false;
      };
      this.showConfirmPopup(message);
    }
  }
  undoChangeFromData() {
    this.popUpModel.isVisible = false;
    this.changeToViewModeEvent.emit({ result: true });
    this.refreshData(this.qryBgPositionData.BgBudgetID);
  }
  refreshData(bgBudgetID: number) {
    this.ctlBgGrundbedarfSandbox.loadGrundBedarfQryBgPositionData({ bgBudgetID: bgBudgetID });
    this.dirty = false;
  }
  navigate() {
    this.isViewMode = true;
    this.sozialhilfeTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
    this.navigateAwaySelection$.next(true);
    this.popUpModel.isVisible = false;
    this.changeToViewModeEvent.emit({ result: true });
  }
  cancelNavigate() {
    this.popUpModel.isVisible = false;
    this.navigateAwaySelection$.next(false);
    return false;
  }
  showMesagePopup(message) {
    this.popUpModel.message = message;
    this.popUpModel.isVisibleNo = false;
    this.popUpModel.isVisibleYes = false;
    this.popUpModel.isVisibleTitle = true;
    this.popUpModel.title = this.translateService.instant('I007GrundBedarf.Msg.Information');
    this.popUpModel.isVisible = true;
  }
  onClickSaveBtn() {
    if (!this.qryBgPosition_BeforePost()) {
      if (this.qryBgPositionData.BgPositionsartID === 32011) {
        this.updateBeforePost();
      }
      this.dirty = false;
      this.mapFormData();
      this.ctlBgGrundbedarfSandbox.updateFormData(this.dataUpdate);
    }

  }
  onClickCancelBtn() {
    this.setDirty({ result: true });
    if (this.isModifyData()) {
      this.handleActionPopup('onClickCancelBtnGrdTop', this.translateService.instant('I007GrundBedarf.PopupConfirm.Message'));
      return;
    }
    this.changeToViewModeEvent.emit({ result: true });
  }
  updateBeforePost() {
    this.ctlBgGrundbedarfSandbox.updateBeforePostData({
      bgBudgetID: this.qryBgPositionData.BgBudgetID,
      GrundbedarfII_Anpassung: this.qryBgPositionData.GrundbedarfII_Anpassung,
      GBII_AsOnePerson: this.qryBgPositionData.GBII_AsOnePerson,
      BgPositionsartID: this.qryBgPositionData.BgPositionsartID
    });
  }

  /**
   *  unregister subscription on destroy component
   */
  private unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  mapFormData() {
    this.dataUpdate.bgPositionID = this.qryBgPositionData.BgPositionID;
    this.dataUpdate.bgPositionTS = this.qryBgPositionData.BgPositionTS;
    this.dataUpdate.bgPositionsartID = this.qryBgPositionData.BgPositionsartID;
    this.dataUpdate.bgBudgetID = this.qryBgPositionData.BgBudgetID;
    this.dataUpdate.bgFinanzplanID = this.initData.bgFinanzplanID;
    this.dataUpdate.betrag = this.qryBgPositionData.Betrag;
    this.dataUpdate.reduktion = this.qryBgPositionData.Reduktion;
    this.dataUpdate.bemerkung = this.qryBgPositionData.Bemerkung ? this.qryBgPositionData.Bemerkung.trim() :
      this.qryBgPositionData.Bemerkung;
  }
  canDeactivate() {
    this.setDirty({ result: true });
    if (this.isModifyData()) {
      this.handleActionPopup('onNavigate', this.translateService.instant('I007GrundBedarf.NavigatorPopupConfirm.Message'));
      return this.navigateAwaySelection$;
    }
    this.sozialhilfeTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
    this.changeToViewModeEvent.emit({ result: true });
    return true;
  }
  isModifyData(): boolean {
    return this.dirty;
  }
  showPencilIcon(option: any) {
    this.sozialhilfeTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: option,
      }
    );
  }
  isDirtyDataFormEvent($event) {
    this.setDirty($event);
  }
  setDirty($event?: any) {
    if (!_.isEqual(this.ELSE_AnpassungTemp, this.qryBgPositionData.ELSE_Anpassung)
      || !_.isEqual(this.ELSE_BetragTemp, this.qryBgPositionData.ELSE_Betrag)
      || !_.isEqual(this.BemerkungTemp, this.qryBgPositionData.Bemerkung)
      || !_.isEqual(this.SKOS2005_AnpassungTemp, this.qryBgPositionData.SKOS2005_Anpassung)
      || !_.isEqual(this.GrundbedarfI_AnpassungTemp, this.qryBgPositionData.GrundbedarfI_Anpassung)
      || !_.isEqual(this.GrundbedarfII_AnpassungTemp, this.qryBgPositionData.GrundbedarfII_Anpassung)
      || !_.isEqual(this.GBII_AsOnePersonTemp, this.qryBgPositionData.GBII_AsOnePerson)
    ) {
      this.dirty = $event.result;
      return;
    }
    this.dirty = false;
  }
  qryBgPosition_AfterFill() {
    if (this.qryBgPositionData && (this.qryBgPosition.CanUpdate || this.qryBgPositionData.BgPositionsartID === 32015)) {
      if (this.richtlinieData) {
        this.qryBgPositionData.SKOS2005_HG = this.richtlinieData.HG_DEF;
        this.qryBgPositionData.SKOS2005_UE = this.richtlinieData.UE_DEF;
        this.qryBgPositionData.SKOS2005_Total = this.qryBgPositionData.SKOS2005_Total + this.richtlinieData.UE_DEF;
      }
    }
    this.qryBgPosition.RowModified = false;
  }

  edtBgPositionsartCode_EditValueChanged() {
    let bgPositionsartCode = 32011;
    bgPositionsartCode = this.qryBgPositionData.BgPositionsartCode;
    this.setTextLabel(bgPositionsartCode);
    switch (bgPositionsartCode) {
      case 32015:
        // Group 1:
        this.visibleGroup.visibleSKOS2005Group = true;
        this.visibleGroup.visibleSKOSbzwGroup = false;
        this.visibleGroup.visibleBerechnungsgrundlageGroup = false;
        this.visibleComponent.lblUeZuschlagI = false;
        this.visibleComponent.edtUeZuschlagI = false;
        break;
      case 32016:
      case 32017:
      case 32018:
      case 32019:
        // Group 3:
        this.visibleGroup.visibleSKOS2005Group = false;
        this.visibleGroup.visibleSKOSbzwGroup = false;
        this.visibleGroup.visibleBerechnungsgrundlageGroup = true;
        this.visibleComponent.lblUeZuschlagI = false;
        this.visibleComponent.edtUeZuschlagI = false;
        break;
      case 32011:
      default:
        // Group 2:
        this.visibleGroup.visibleSKOS2005Group = false;
        this.visibleGroup.visibleSKOSbzwGroup = true;
        this.visibleGroup.visibleBerechnungsgrundlageGroup = false;
        this.visibleComponent.lblUeZuschlagI = true;
        this.visibleComponent.edtUeZuschlagI = true;
        this.edtSKOS_Leave();
    }
  }

  setTextLabel(code: number) {
    if (this.isSaved) {
      switch (code) {
        case 32017:
          this.fraELSE = this.berechnungsgrundlageValueSelectbox;
          this.lblELSE_Betrag = this.translateService.instant('I007GrundBedarf.Berechnungsgrundlage.monatlicher');
          break;
        case 32018:
          this.fraELSE = this.translateService.instant('I007GrundBedarf.Berechnungsgrundlage.betreiExist');
          this.lblELSE_Betrag = this.translateService.instant('I007GrundBedarf.Berechnungsgrundlage.monatlicherBEX');
          break;
        case 32019:
          this.fraELSE = this.translateService.instant('I007GrundBedarf.Berechnungsgrundlage.SKOSbzwInter');
          this.lblELSE_Betrag = this.translateService.instant('I007GrundBedarf.Berechnungsgrundlage.monatlicherKlienEinr');
          break;
        default:
          break;
      }
      // Notes: fraELSE is caption of group 3 (Berechnungsgrundlage); lblELSE_Betrag is value of monatlicher Grundbedarf
      this.isSaved = false;
      return;
    }
    this.fraELSE = this.translateService.instant('I007GrundBedarf.Berechnungsgrundlage.caption');
    this.lblELSE_Betrag = this.translateService.instant('I007GrundBedarf.Berechnungsgrundlage.monatlicher');
  }

  qryBgPosition_BeforePost() {
    switch (this.qryBgPositionData.BgPositionsartID) {
      case 32011:  // SKOS
        if (this.CheckNotNullField(this.qryBgPositionData.GrundbedarfI_Anpassung) ||
          this.CheckNotNullField(this.qryBgPositionData.GrundbedarfII_Anpassung)) {
          return true;
        }
        this.qryBgPositionData.Reduktion = 0 - this.qryBgPositionData.GrundbedarfI_Anpassung;
        this.qryBgPositionData.Betrag = this.qryBgPositionData.Betrag_SKOS;
        return false;

      case 32015:  // SKOS 2005
        if (this.CheckNotNullField(this.qryBgPositionData.SKOS2005_Anpassung)) {
          return true;
        }

        this.qryBgPositionData.Reduktion = 0 - this.qryBgPositionData.SKOS2005_Anpassung;
        this.qryBgPositionData.Betrag = this.qryBgPositionData.SKOS2005_UE;
        return false;

      case 32019:  // Person in stationären Einrichtung
        if (this.CheckNotNullField(this.qryBgPositionData.ELSE_Betrag) ||
          this.CheckNotNullField(this.qryBgPositionData.ELSE_Anpassung)) {
          return true;
        }

        const PauschaleSTE = this.pauschaleSTE;
        if (this.qryBgPositionData.ELSE_Betrag > PauschaleSTE) {
          this.qryBgPositionData.ELSE_Betrag = PauschaleSTE;
          this.remainingMessageError.emit({ isErrorClosed: true, messageErr: this.translateService.instant('I007GrundBedarf.Msg.MSG_009') });
          return true;
        }
        return this.defaultBeforePost();

      default:
        return this.defaultBeforePost();
    }
  }
  defaultBeforePost() {
    if (this.CheckNotNullField(this.qryBgPositionData.ELSE_Betrag) ||
      this.CheckNotNullField(this.qryBgPositionData.ELSE_Anpassung)) {
      return true;
    }
    this.qryBgPositionData.Betrag = this.qryBgPositionData.ELSE_Betrag;
    this.qryBgPositionData.Reduktion = 0 - this.qryBgPositionData.ELSE_Anpassung;
    return false;
  }
  CheckNotNullField(value) {
    if (value === 0) {
      return false;
    }
    if (!value) {
      let contentMsg = '';
      contentMsg = this.translateService.instant('I007GrundBedarf.Msg.MSG_009');
      this.remainingMessageError.emit({ isErrorClosed: true, messageErr: contentMsg });
      return true;
    }
    return false;
  }
  leaveEvent($event) {
    if ($event.result === true) {
      switch (this.qryBgPositionData.BgPositionsartCode) {
        case 32011:  // SKOS
          this.edtSKOS_Leave();
          break;
        case 32015:  // SKOS 2005
          this.edtSKOS2005_Leave();
          break;
        case 32017:
        case 32018:
        case 32019:
          this.edtELSE_Leave();
          break;

        default:
          break;
      }
    }
  }
  /**
   * Group 3: Berechnungsgrundlage
   */
  edtELSE_Leave() {
    this.qryBgPositionData.ELSE_Total = this.qryBgPositionData.ELSE_Betrag
      + this.qryBgPositionData.ELSE_Anpassung
      - this.qryBgPositionData.AbzugVVG;
    this.ELSE_TotalReadMode = this.formatNumber(this.qryBgPositionData.ELSE_Total);
  }
  /**
   * Group 2: SKOS bzw. interne Richtlinien
   * @param chkGBII_Einzel: value of check box
   */
  edtSKOS_Leave() {
    if (this.qryBgPositionData.GBII_AsOnePerson === true) {
      this.qryBgPositionData.GBII_Hg = this.qryBgPositionData.GBII_Hg_Einzel;
      this.qryBgPositionData.GrundbedarfII = this.qryBgPositionData.GBII_Einzel;
    } else {
      this.qryBgPositionData.GBII_Hg = this.qryBgPositionData.GBII_Hg_Gemeinschaft;
      this.qryBgPositionData.GrundbedarfII = this.qryBgPositionData.GBII_Gemeinschaft;
    }

    this.qryBgPositionData.GrundbedarfTotal = this.qryBgPositionData.Betrag_SKOS
      + this.qryBgPositionData.GrundbedarfI_Anpassung
      + this.qryBgPositionData.AbzugVVG
      + this.qryBgPositionData.GrundbedarfZusatz
      + this.qryBgPositionData.GrundbedarfII
      + this.qryBgPositionData.GrundbedarfII_Anpassung;
    this.GrundbedarfTotalReadMode = this.formatNumber(this.qryBgPositionData.GrundbedarfTotal);
  }
  /**
     * Group 1: SKOS 2005
     */
  edtSKOS2005_Leave() {
    this.qryBgPositionData.SKOS2005_Total = this.qryBgPositionData.SKOS2005_UE
      + this.qryBgPositionData.SKOS2005_Anpassung
      - this.qryBgPositionData.AbzugVVG;
    this.SKOS2005_TotalReadMode = this.formatNumber(this.qryBgPositionData.SKOS2005_UE ? this.qryBgPositionData.SKOS2005_Total : this.qryBgPositionData.SKOS2005_Total + this.richtlinieData.UE_DEF);
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
  showPopupConcurrency(message) {
    this.popUpConcurrencyModel.message = message;
    this.popUpConcurrencyModel.textYes = this.translateService.instant('I007GrundBedarf.PopupConfirm.Abbrechen');
    this.popUpConcurrencyModel.textNo = this.translateService.instant('I007GrundBedarf.PopupConfirm.Daten');
    this.popUpConcurrencyModel.title = this.translateService.instant('I007GrundBedarf.PopupConfirm.Title');

    this.popUpConcurrencyModel.isVisible = true;
    this.popUpConcurrencyModel.funcYes = () => {
      this.processConcurrency('abbrechen');
    };
    this.popUpConcurrencyModel.funcNo = () => {
      this.processConcurrency('daten');
    };
    this.popUpConcurrencyModel.funcHiding = () => {
      this.processConcurrency('close');
    };
  }
  processConcurrency(key: string) {
    this.popUpConcurrencyModel.isVisible = false;
    this.isConcurrencyEvent.emit({ result: key });
  }
  ApplyShStatusCodeToSqlQuery() {
    const BgBewilligungStatusCode = this.shStatusCode.bgBewilligungStatusCode;
    if (BgBewilligungStatusCode == null) {
      return;
    }
    if (BgBewilligungStatusCode >= this.BgBewilligungStatus.Erteilt) {
      this.SqlQueryEditOff();
    }
  }
  SqlQueryEditOff() {
    /* TO DO:
     if (qry == null) {
       if (System.Diagnostics.Debugger.IsAttached)
         System.Diagnostics.Debugger.Break();
       return;
    } */
    this.qryBgPosition.CanInsert = false;
    this.qryBgPosition.CanUpdate = false;
    this.qryBgPosition.CanDelete = false;
  }
  assignDataTemp(data: any) {
    this.ELSE_AnpassungTemp = data.ELSE_Anpassung;
    this.ELSE_BetragTemp = data.ELSE_Betrag;
    this.BemerkungTemp = data.Bemerkung;
    this.SKOS2005_AnpassungTemp = data.SKOS2005_Anpassung;
    this.GrundbedarfI_AnpassungTemp = data.GrundbedarfI_Anpassung;
    this.GrundbedarfII_AnpassungTemp = data.GrundbedarfII_Anpassung;
    this.GBII_AsOnePersonTemp = data.GBII_AsOnePerson;
  }
  private getReadModeData() {
    this.SKOS2005_HGReadMode = this.formatNumber(this.qryBgPositionData.SKOS2005_HG ? this.qryBgPositionData.SKOS2005_HG : this.richtlinieData.HG_DEF);
    this.SKOS2005_UEReadMode = this.formatNumber(this.qryBgPositionData.SKOS2005_UE ? this.qryBgPositionData.SKOS2005_UE : this.richtlinieData.UE_DEF);
    this.AbzugVVGReadMode = this.formatNumber(this.qryBgPositionData.AbzugVVG);
    this.GBI_HgReadMode = this.formatNumber(this.qryBgPositionData.GBI_Hg);
    this.GBIZuschlag_HgReadMode = this.formatNumber(this.qryBgPositionData.GBIZuschlag_Hg);
    this.GBII_HgReadMode = this.formatNumber(this.qryBgPositionData.GBII_Hg);
    this.Betrag_SKOSReadMode = this.formatNumber(this.qryBgPositionData.Betrag_SKOS);
    this.GrundbedarfZusatzReadMode = this.formatNumber(this.qryBgPositionData.GrundbedarfZusatz);
    this.GrundbedarfIIReadMode = this.formatNumber(this.qryBgPositionData.GrundbedarfII);
    this.ELSE_TotalReadMode = this.formatNumber(this.qryBgPositionData.ELSE_Total);
  }
  formatNumber(source: any) {
    if (source || source === 0) {
      this.temp = (+ source.toFixed(2)).toLocaleString(UtilityHelper.getLanguageCodeFromLocalStorage());
    } else {
      this.temp = '';
    }
    if ((this.temp || this.temp === '0') && this.temp.indexOf('.') === -1) {
      this.temp += '.00';
    }
    return this.temp;
  }
}
