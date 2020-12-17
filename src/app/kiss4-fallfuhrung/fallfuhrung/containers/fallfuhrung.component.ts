import { Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FaModulTreeSandbox } from '@app/kiss4-fallfuhrung/fa-modul-tree/fa-modul-tree.sandbox';
import {
  TabModuleFallbearbeitungSandbox,
} from '@app/kiss4-main/tab-module-fallbearbeitung/tab-module-fallbearbeitung.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { FallfuhrungConstant } from '@shared/common/fallfuhrung.common';
import { BaseComponent } from '@shared/components/base.component';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { UtilService } from '@shared/utilites/utility.service';
import { DxDateBoxComponent, DxValidationGroupComponent } from 'devextreme-angular';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

import { copyElement, getRoleLocalStorage } from '../../../../shared/utilites/utilityHelpers';
import { FallfuhrungSandbox } from '../fallfuhrung.sandbox';
import {
  ModelGetDataCombobox,
  ModelGetFaLeistung,
  ModelQueryGetConfig,
  ModelQueryGetLOVName,
  ModelQueryUpdateFaleistung,
  ModelQueryValidationFaLeistung,
} from '../models';
import * as moment from 'moment';

@Component({
  selector: 'kiss-fallfuhrung',
  templateUrl: './fallfuhrung.component.html',
  styleUrls: ['./fallfuhrung.component.scss']
})
@SetClassRight('CtlFallfuhrung')
export class FallfuhrungComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  @ViewChild('datum') dateBox: DxDateBoxComponent;
  @ViewChild('datumAbsch') datumAbsch: DxDateBoxComponent;
  @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
  @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;
  AdditionalButtons = [...CommonConstant.AdditionalButtons];
  initialCustomizeBtn = [
    {
      text: 'Fallfuhrung.Toolbar.FallWieder',
      visible: false,
      name: 'fallwieder'
    },
    {
      text: 'Fallfuhrung.Toolbar.Bearbeiten',
      visible: true,
      name: 'bearbeiten',
      disabled: undefined
    },
    {
      text: 'Fallfuhrung.Toolbar.Speichern',
      visible: false,
      name: 'speichern',
      disabled: undefined
    },
    {
      text: 'Fallfuhrung.Toolbar.Abbrechen',
      visible: false,
      name: 'abbrechen'
    },
    {
      text: 'Fallfuhrung.Toolbar.Loschen',
      visible: true,
      disabled: undefined,
      locateInMenu: 'always',
      name: 'loschen',
    }
  ];
  customizeBtn = this.cloneArray(this.initialCustomizeBtn);
  //#region "Declare variables for toolbarControl"
  isNavbar: boolean;
  //#endregion

  //#region "Declare variables for another bussiness"
  pageTitle: string;
  modelQueryConfig: ModelQueryGetConfig = new ModelQueryGetConfig();
  faleistung: ModelGetFaLeistung = new ModelGetFaLeistung();
  _faLeistungID: number;
  _canUpdate = true;
  dataComboboxKontaktveranl: ModelGetDataCombobox[] = [];
  dataComboboxGrund: ModelGetDataCombobox[] = [];
  dataComboboxGemeinde: ModelGetDataCombobox[] = [];
  dataComboboxAnmeldeart: ModelGetDataCombobox[] = [];
  modelQueryUpdate: ModelQueryUpdateFaleistung = new ModelQueryUpdateFaleistung();
  modelQueryComboboxKontaktveranl: ModelQueryGetLOVName = new ModelQueryGetLOVName();
  modelQueryComboboxGrund: ModelQueryGetLOVName = new ModelQueryGetLOVName();
  modelQueryComboboxGemeinde: ModelQueryGetLOVName = new ModelQueryGetLOVName();
  modelQueryComboboxAnmeldeart: ModelQueryGetLOVName = new ModelQueryGetLOVName();
  panelAnmeldeart = false;
  userRole: any;
  isReadOnly = true;
  isReadOnlyControl = false;
  isEditMode = false;
  datumVonTmp: Date;
  isDatumVonModified = false;
  accessKeyItemFocused = 0;
  keyFocus: string;
  isVisibleFallWieder = false;
  isClosed = true;
  keyInput: string;
  isShiftKeyDown = false;
  isLoadData = false;
  modelQueryValidationFaLeistung: ModelQueryValidationFaLeistung = new ModelQueryValidationFaLeistung();
  private subscriptions: Subscription[] = [];
  minDate = new Date(1753, 0, 1);
  editor: any;
  faleistungTmp: ModelGetFaLeistung = new ModelGetFaLeistung();
  readonly setTimeOut: number = CommonConstant.SetTimeOut;
  personInfo: string;
  valueChange: string;
  froalaEditorConfig = {
    heightMin: 150,
    height: 280,
    events: {
      'froalaEditor.initialized': (e, editor) => {
        this.editor = editor;
        this.handleTextarea();
      },
    }
  };
  concurrency: string;
  popUpModel: PopUpModel;
  messageCanDeactive: any;
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
  information = 'information';
  maxDate = new Date(9999, 11, 31);

  widthDateBox = CommonConstant.WidthNumberAndDateBox;
  isConfirmFallWieder = false;
  popUpConcurrencyModel: PopUpModel;
  isSetDeleteMode = false;
  dateFormat = CommonConstant.FORMAT_DATE;
  //#endregion

  constructor(
    injector: Injector,
    public FallfuhrungsSandbox: FallfuhrungSandbox,
    public utilService: UtilService,
    public translateService: TranslateService,
    public faModulTreeSandbox: FaModulTreeSandbox,
    public layoutSandbox: LayoutSandbox,
    public router: Router,
    public tabModuleFallbearbeitungSandbox: TabModuleFallbearbeitungSandbox) {
    super(injector);
  }
  ngOnInit() {
    this.setTitle(FallfuhrungConstant.PAGETITLE);
    this.initPopUpModel();
    this.isNavbar = JSON.parse(localStorage.getItem('settings:toogleNavbar'));
    this.initData();
    this.initFunction();
    this.registerEvents();
    this.initPopUpConcurModel();
  }

  initPopUpConcurModel() {
    this.popUpConcurrencyModel = new PopUpModel(
      {
        title: this.translateService.instant('Fallfuhrung.PopupConfirm.Title'),
        isVisibleTitle: true,
        isVisible: false,
        message: '',
        textYes: this.translateService.instant('Fallfuhrung.PopupConfirm.Abbrechen'),
        isVisibleYes: true,
        textNo: this.translateService.instant('Fallfuhrung.PopupConfirm.Daten'),
        isVisibleNo: true,
        funcYes: null,
        funcNo: null,
      }
    );
  }

  ngOnDestroy() {
    this.FallfuhrungsSandbox.resetFallfuhrungState();
    this.unregisterEvents();
  }

  unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  //#region "registerEvents function"
  private registerEvents(): void {
    // Register subscribe for selected person
    this.subscriptions.push(
      this.tabModuleFallbearbeitungSandbox.getPersonInfoTitel$.subscribe(data => {
        if (isNullOrUndefined(data) || data.status) {
          return;
        }
        this.pageTitle = data.titleText + ' > ' + this.translateService.instant('Fallfuhrung.Title');
        this.personInfo = data.titleText;
      })
    );
    // Register subscribe for selected node from sidebar
    this.subscriptions.push(
      this.faModulTreeSandbox.selectedNode$.subscribe(selectedNode => {
        if (!isNullOrUndefined(selectedNode)) {
          if (this._faLeistungID !== selectedNode.faLeistungID && !isNullOrUndefined(selectedNode.faLeistungID)) {
            this._faLeistungID = selectedNode.faLeistungID;
            // Get data Fallfuhrung
            this.FallfuhrungsSandbox.loadFallfuhrungData(this._faLeistungID);
            this.modeView();
            return;
          }
          if (isNullOrUndefined(this.faleistung.FaLeistungID)) {
            this.customizeBtn[4].disabled = true;
            this.customizeBtn[1].disabled = true;
            this.customizeBtn = [...this.customizeBtn];
          }
        }
      })
    );
    // Register subscribe for load config
    this.subscriptions.push(this.FallfuhrungsSandbox.ConfigData$.subscribe(data => {
      if (data && data.status === AppEnums.StatusCode.BAD_REQUEST) {
        this.updateHandleError(data);
        return;
      }
      if (isNullOrUndefined(data) || isNullOrUndefined(data.value)) {
        return;
      }

      if (data.value) {
        this.panelAnmeldeart = true;
        return;
      }
      this.panelAnmeldeart = false;
    }));

    // Register subscribe for load data Faleistung
    this.subscriptions.push(this.FallfuhrungsSandbox.FallfuhrungData$.subscribe(dataFaleistung => {
      if (isNullOrUndefined(dataFaleistung)) {
        return;
      }

      if (dataFaleistung && dataFaleistung.status === AppEnums.StatusCode.BAD_REQUEST) {
        this.updateHandleError(dataFaleistung);
        return;
      }
      if (dataFaleistung) {
        this.faleistungTmp = { ...dataFaleistung };
        this.focusDateBox();
        this.isLoadData = true;
        this.datumVonTmp = dataFaleistung.DatumVon;
        this.faleistung = dataFaleistung;
        this.FallfuhrungsSandbox.loadFallRightsData(dataFaleistung.FaLeistungID);
      }
    }));

    // Register subscribe for load data fall rights
    this.subscriptions.push(this.FallfuhrungsSandbox.FallRightsData$.subscribe(dataFallRight => {
      if (!isNullOrUndefined(dataFallRight) && !isNullOrUndefined(dataFallRight.mayClose)) {
        if (dataFallRight.mayClose) {
          let open = false;
          if (isNullOrUndefined(this.faleistung.DatumBis)) {
            open = true;
          }
          let archived = true;
          if (isNullOrUndefined(this.faleistung.faLeistungArchivID)) {
            archived = false;
          }
          this._canUpdate = open;
          if (open === false && archived === false && dataFallRight.mayClose === true && this.checkRole('CtlFaPeriodeReopen') === true) {
            this.customizeBtn[0].visible = true;
            this.customizeBtn[1].disabled = true;
            this.customizeBtn = [...this.customizeBtn];
            this.isVisibleFallWieder = true;
          } else {
            this.setVisibleBtn();
          }
          if (open) {
            this.isReadOnly = false;
          } else {
            this.isReadOnly = true;
          }
        } else {
          this._canUpdate = false;
          this.customizeBtn[0].visible = false;
          this.customizeBtn = [...this.customizeBtn];
          this.isReadOnly = true;
          this.isVisibleFallWieder = false;
        }
        this.isReadOnlyControl = !this._canUpdate;
        this.isReadOnly = !this._canUpdate;
      }

    }));

    // Register subscribe for load data combobox Kontaktveranl
    this.subscriptions.push(this.FallfuhrungsSandbox.KontaktveranlData$.subscribe(dataKontaktveranl => {
      if (dataKontaktveranl && dataKontaktveranl.status === AppEnums.StatusCode.BAD_REQUEST) {
        this.updateHandleError(dataKontaktveranl);
        return;
      }

      if (isNullOrUndefined(dataKontaktveranl)) {
        return;
      }
      dataKontaktveranl.forEach(item => {
        if (item.isActive) {
          this.dataComboboxKontaktveranl.push(item);
        }
      });
    }));

    // Register subscribe for load data combobox Grund
    this.subscriptions.push(this.FallfuhrungsSandbox.GrundData$.subscribe(dataGrund => {
      if (dataGrund && dataGrund.status === AppEnums.StatusCode.BAD_REQUEST) {
        this.updateHandleError(dataGrund);
        return;
      }

      if (isNullOrUndefined(dataGrund)) {
        return;
      }
      dataGrund.forEach(item => {
        if (item.isActive) {
          this.dataComboboxGrund.push(item);
        }
      });
    }));

    // Register subscribe for load data combobox Gemeinde
    this.subscriptions.push(this.FallfuhrungsSandbox.GemeindeData$.subscribe(dataGemeinde => {
      if (dataGemeinde && dataGemeinde.status === AppEnums.StatusCode.BAD_REQUEST) {
        this.updateHandleError(dataGemeinde);
        return;
      }

      if (isNullOrUndefined(dataGemeinde)) {
        return;
      }
      dataGemeinde.forEach(item => {
        if (item.isActive) {
          this.dataComboboxGemeinde.push(item);
        }
      });
    }));

    // Register subscribe Update FaLeistung
    this.subscriptions.push(this.FallfuhrungsSandbox.UpdateFaLeistungData$.subscribe(data => {
      if (isNullOrUndefined(data)) {
        return;
      }

      if (data && data.status) {
        this.updateHandleError(data);
        return;
      }

      if (data) {
        this.FallfuhrungsSandbox.loadFallfuhrungData(this._faLeistungID);
        this.faModulTreeSandbox.changeTreeNodeUpdateState(true);
        this.tabModuleFallbearbeitungSandbox.getModuleIcon(this.faleistung.BaPersonID.toString(), '');
        this.configMode();
        return;
      }
    }));

    // Register subscribe for load data combobox Anmeldeart
    this.subscriptions.push(this.FallfuhrungsSandbox.AnmeldeartData$.subscribe(dataAnmeldeart => {
      if (dataAnmeldeart && dataAnmeldeart.status === AppEnums.StatusCode.BAD_REQUEST) {
        this.updateHandleError(dataAnmeldeart);
        return;
      }

      if (isNullOrUndefined(dataAnmeldeart)) {
        return;
      }

      dataAnmeldeart.forEach(item => {
        if (item.isActive) {
          this.dataComboboxAnmeldeart.push(item);
        }
      });
    }));

    this.subscriptions.push(this.faModulTreeSandbox.loadMessage$.subscribe(data => {
      if (isNullOrUndefined(data)) {
        return;
      }
      this.remainingMessage.showMessage(data.message);
    }));

    // Register subscribe for load data AnzahlOffenePendenzen
    this.subscriptions.push(this.FallfuhrungsSandbox.AnzahlOffenePendenzenData$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        if (data > 0 && !isNullOrUndefined(this.faleistung.DatumBis)) {
          this.handleActionPopup(this.information, this.translateService.instant('Fallfuhrung.MessageError.SaveMessageFirstError') + data + this.translateService.instant('Fallfuhrung.MessageError.SaveMessageLastError'));
        } else {
          this.UpdateFaleistung();
        }
      }
    }));

    // Register subscribe for load data ValidationFaLeistung
    this.subscriptions.push(this.FallfuhrungsSandbox.ValidationFaLeistungData$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        if (data.FaleistungID !== -1) {
          this.remainingMessage.showMessage(this.translateService.instant('Fallfuhrung.MessageError.ValidationFaLeistungDataError'));
          return;
        }
        this.checkCondition();
      }
    }));

    this.subscriptions.push(this.FallfuhrungsSandbox.getCountFaPhase$.subscribe(data => {
      if (isNullOrUndefined(data) || data.status) {
        return;
      }
      if (data.length > 0) {
        if (data[0].countOpenBeratung + data[0].countOpenIntake === 0) {
          this.getAnzahOffenePendenzen();
        } else {
          this.faleistung.DatumBis = null;
          this.remainingMessage.showMessage(this.translateService.instant('Fallfuhrung.MessageError.ValidationCountFaPhase'));
        }
      }
    }));

    this.subscriptions.push(
      this.translateService.onLangChange.subscribe(event => {
        this.pageTitle = this.personInfo + ' > ' + this.translateService.instant('Fallfuhrung.Title');
      })
    );
  }

  // Update handle error
  updateHandleError(data: any) {
    switch (data.status) {
      case AppEnums.StatusCode.BAD_REQUEST:
        this.faleistung.DatumBis = null;
        this.showMessageError(JSON.parse(data._body).message);
        break;

      case AppEnums.StatusCode.CONCURRENCY:
        const message = this.translateService.instant('Fallfuhrung.Message.ConcurrencyMsg409');
        message.replace('\r\n', '<br>');
        this.showPopupConcurrency(message);
        break;
      case AppEnums.StatusCode.NOT_FOUND:
        this.remainingMessage.showMessage(this.translateService.instant('Fallfuhrung.Message.ConcurrencyMsg404'));
        this.setDeleteMode();
        break;
      case AppEnums.StatusCode.FORBIDDEN:
        this.remainingMessage.showMessage(this.translateService.instant('HttpStatusMessage.Forbidden'), 'HttpStatusMessage.Forbidden');
        break;

      default:
        break;
    }
  }
  showMessageError(message) {
    switch (message) {
      case 'MSG001':
      case 'MSG002':
      case 'MSG003':
      case 'MSG004':
      case 'MSG005':
      case 'MSG006':
      case 'MSG007':
        this.remainingMessage.showMessage(this.translateService.instant(`Fallfuhrung.Message.${message}`));
        break;

      default:
        this.remainingMessage.showMessage(message);
        break;
    }
  }
  initFunction() {
    // Get data config
    this.FallfuhrungsSandbox.loadConfigData(this.modelQueryConfig);
    // Get data cbb Kontaktveranl, Grund, Gemeinde
    this.FallfuhrungsSandbox.loadKontaktveranlData(this.modelQueryComboboxKontaktveranl.lOVName);
    this.FallfuhrungsSandbox.loadGrundData(this.modelQueryComboboxGrund.lOVName);
    this.FallfuhrungsSandbox.loadGemeindeData(this.modelQueryComboboxGemeinde.lOVName);
    this.FallfuhrungsSandbox.loadAnmeldeartData(this.modelQueryComboboxAnmeldeart.lOVName);
  }

  initData() {
    // Get config data
    this.modelQueryConfig.keyPath = 'System\\Fallfuehrung\\ErweitereFallverlaufMaske';
    this.modelQueryConfig.defaultValue = false;
    // Model query data cbb Kontaktveranl, Grund, Gemeinde, Anmeldeart
    this.modelQueryComboboxKontaktveranl.lOVName = 'FaKontaktveranlasser';
    this.modelQueryComboboxGrund.lOVName = 'Abschlussgrund';
    this.modelQueryComboboxGemeinde.lOVName = 'GemeindeSozialdienst';
    this.modelQueryComboboxAnmeldeart.lOVName = 'FaAnmeldeart';
    const modelGetDataCombobox = new ModelGetDataCombobox();
    modelGetDataCombobox.text = '';
    this.dataComboboxKontaktveranl.push(modelGetDataCombobox);
    this.dataComboboxGrund.push(modelGetDataCombobox);
    this.dataComboboxGemeinde.push(modelGetDataCombobox);
    this.dataComboboxAnmeldeart.push(modelGetDataCombobox);
  }
  //#endregion

  onClickEditBtnGrdTop() {
    this.customizeBtn[0].visible = false;
    this.customizeBtn[1].visible = false;
    this.customizeBtn[2].visible = true;
    this.customizeBtn[3].visible = true;
    this.customizeBtn = [...this.customizeBtn];
    this.isEditMode = true;
    this.isLoadData = false;
    this.handleTextarea();
    this.focusDateBox();
    this.isReadOnly = false;
    this.faModulTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: true,
      }
    );
    this.remainingMessage.hideMessage();
  }
  onClickCancelBtnGrdTop() {
    if (this.isSetDeleteMode) {
      this.handleActionPopup('onClickCancelConcurrency', this.translateService.instant('Fallfuhrung.PopupConfirm.Message'));
      return;
    }

    if (this.concurrency === CommonConstant.Concurrency) {
      this.concurrency = '';
      this.getFaleistungData();
      this.modeView();
      this.setFocusOutDateBox();
    } else {
      if (this.isModifyData() || (this.validationGroup.instance.validate() && !this.validationGroup.instance.validate().isValid)) {
        this.handleActionPopup('onClickCancelBtnGrdTop', this.translateService.instant('Fallfuhrung.PopupConfirm.Message'));
      } else {
        this.modeView();
      }
    }
  }

  modeView() {
    if (this.isVisibleFallWieder === true) {
      this.customizeBtn[0].visible = true;
      this.customizeBtn[1].disabled = true;
    } else {
      this.customizeBtn[0].visible = false;
    }
    this.customizeBtn[4].disabled = false;
    this.customizeBtn[1].visible = true;
    this.customizeBtn[2].visible = false;
    this.customizeBtn[3].visible = false;
    this.customizeBtn[2].disabled = false;
    this.customizeBtn = [...this.customizeBtn];
    this.isEditMode = false;
    this.isReadOnly = true;
    this.handleTextarea();
    this.faModulTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
    this.remainingMessage.hideMessage();
    if (this.dateBox) {
      this.dateBox.isValid = true;
    }
    if (this.datumAbsch) {
      this.datumAbsch.isValid = true;
    }
  }

  UpdateFaleistung() {
    if (!this.isVisibleFallWieder) {
      const postFaLeistung: ModelGetFaLeistung = {
        BaPersonID: this.faleistung.BaPersonID,
        DatumVon: moment(this.faleistung.DatumVon).format(CommonConstant.FORMAT_DATE_MM_DD_YYYY),
        FaLeistungID: this._faLeistungID,
        DatumBis: this.faleistung.DatumBis ? this.faleistung.DatumBis.toDateString() : null,
        GemeindeCode: this.faleistung.GemeindeCode,
        AbschlussGrundCode: this.faleistung.AbschlussGrundCode,
        Bemerkung: this.faleistung.Bemerkung ? this.faleistung.Bemerkung.toString().trim() : '',
        FaAufnahmeartCode: this.faleistung.FaAufnahmeartCode,
        FaKontaktveranlasserCode: this.faleistung.FaKontaktveranlasserCode,
        ModulID: this.faleistung.ModulID,
        FaLeistungTS: this.faleistung.FaLeistungTS,
        FaFallID: this.faleistung.FaFallID,
        UserID: this.faleistung.UserID,
        SachbearbeiterID: this.faleistung.SachbearbeiterID,
        SchuldnerBaPersonID: this.faleistung.SchuldnerBaPersonID,
        FaProzessCode: this.faleistung.FaProzessCode,
        LeistungsartCode: this.faleistung.LeistungsartCode,

        EroeffnungsGrundCode: this.faleistung.EroeffnungsGrundCode,
        Dossiernummer: this.faleistung.Dossiernummer,
        FaTeilleistungserbringerCodes: this.faleistung.FaTeilleistungserbringerCodes,
        FaModulDienstleistungenCode: this.faleistung.FaModulDienstleistungenCode,
        IkSchuldnerStatusCode: this.faleistung.IkSchuldnerStatusCode,
        IkAufenthaltsartCode: this.faleistung.IkAufenthaltsartCode,
        IkHatUnterstuetzung: this.faleistung.IkHatUnterstuetzung,
        IkIstRentenbezueger: this.faleistung.IkIstRentenbezueger,
        IkSchuldnerMahnen: this.faleistung.IkSchuldnerMahnen,
        IkEinnahmenQuoteCode: this.faleistung.IkEinnahmenQuoteCode,
        IkDatumRechtskraft: this.faleistung.IkDatumRechtskraft,
        IkInkassoBemuehungCode: this.faleistung.IkInkassoBemuehungCode,
        IkVerjaehrungAm: this.faleistung.IkVerjaehrungAm,
        IkLeistungStatusCode: this.faleistung.IkLeistungStatusCode,

        IkDatumForderungstitel: this.faleistung.IkDatumForderungstitel,
        IkRueckerstattungTypCode: this.faleistung.IkRueckerstattungTypCode,
        IkForderungTitelCode: this.faleistung.IkForderungTitelCode,
        IkErreichungsGradCode: this.faleistung.IkErreichungsGradCode,
        OldUnitID: this.faleistung.OldUnitID,
        VmAuftragCode: this.faleistung.VmAuftragCode,
        KaProzessCode: this.faleistung.KaProzessCode,
        KaEpqJob: this.faleistung.KaEpqJob,
        Bezeichnung: this.faleistung.Bezeichnung,
        MigrationKA: this.faleistung.MigrationKA,
        PscdVertragsgegenstandID: this.faleistung.PscdVertragsgegenstandID,
        MigBemerkung: this.faleistung.MigBemerkung,
        MigHerkunftCode: this.faleistung.MigHerkunftCode,
        MigAlteFallNr: this.faleistung.MigAlteFallNr,
        VUFaFallID: this.faleistung.VUFaFallID,
        visdat36Area: this.faleistung.visdat36Area,
        visdat36FALLID: this.faleistung.visdat36FALLID,
        visdat36LEISTUNGID: this.faleistung.visdat36LEISTUNGID,
        WiederholteSpezifischeErmittlungEAF: this.faleistung.WiederholteSpezifischeErmittlungEAF,
        Creator: this.faleistung.Creator,
        Created: this.faleistung.Created,
        Modifier: this.faleistung.Modifier,
        Modified: this.faleistung.Modified,
        SAR: this.faleistung.SAR,

        AbsschlussGrundText: this.faleistung.AbsschlussGrundText,
        FaAufnahmeartText: this.faleistung.FaAufnahmeartText,
        FaKontaktveranlasserText: this.faleistung.FaKontaktveranlasserText,
        faLeistungArchivID: this.faleistung.faLeistungArchivID,
        GemeindeText: this.faleistung.GemeindeText,
      };
      this.FallfuhrungsSandbox.updateFaLeistungData(postFaLeistung);
    }
  }

  toolBarOnItemClick($event) {
    switch ($event) {
      case 'bearbeiten': {
        this.onClickEditBtnGrdTop();
        return;
      }
      case 'speichern': {
        this.getValidationFaLeistung();
        return;
      }
      case 'abbrechen': {
        this.onClickCancelBtnGrdTop();
        return;
      }
      case 'loschen': {
        if (!this.customizeBtn[4].disabled) {
          this.remainingMessage.showMessage(this.translateService.instant('Fallfuhrung.MessageError.DeleteMessageError'));
        }
        return;
      }
      case 'fallwieder': {
        this.handleActionPopup('fallwieder', this.translateService.instant('Fallfuhrung.PopupConfirm.MessageFallWieder'));
        return;
      }
      default:
        break;
    }
  }

  checkRole(name: any) {
    this.userRole = getRoleLocalStorage(name);
    if (!isNullOrUndefined(this.userRole) && !isNullOrUndefined(this.userRole.IsRead)) {
      return this.userRole.IsRead;
    }
  }

  // Shortcuts key
  @HostListener('document:keydown', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS && !this.isReadOnly) {
      event.preventDefault();
      this.setKeyUpDateBox();
      setTimeout(() => {
        this.getValidationFaLeistung();
      }, this.setTimeOut);
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ && !this.isReadOnly) {
      event.preventDefault();
      this.setKeyUpDateBox();
      setTimeout(() => {
        this.onClickCancelBtnGrdTop();
      }, this.setTimeOut);
    }
    if ((event.shiftKey || event.metaKey)) {
      this.isShiftKeyDown = true;
    }
    if (this.isEditMode && this.keyFocus !== 'bemerkung' && !this.isVisibleFallWieder) {
      if (event.keyCode === AppEnums.KeyCode.UpArrowKey || event.key === 'ArrowUp') {
        this.moveFocus(false);
      } else if (event.keyCode === AppEnums.KeyCode.DownArrowKey || event.key === 'ArrowDown') {
        this.moveFocus(true);
      }
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyM && !this.customizeBtn[4].disabled) {
      this.remainingMessage.showMessage(this.translateService.instant('Fallfuhrung.MessageError.DeleteMessageError'));
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

  // Check Showed popup
  onShownPopUp() {
    if (!document.getElementById('d001_popup-confirm_ja')) {
      return;
    }
    const value = document.getElementById('d001_popup-confirm_ja');
    value.focus();
  }

  onCopyTitle() {
    let text;
    if (this.isShiftKeyDown) {
      text = this.faleistung.BaPersonID.toString();
    } else {
      text = this.personInfo;
    }
    copyElement(text);
  }

  onChangeData(event, key: string) {
    if (key === 'DatumVon') {
      if (this.datumVonTmp !== event.value) {
        this.isDatumVonModified = true;
      } else {
        this.isDatumVonModified = false;
      }
    }
  }

  // Handle close/refresh the tab
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.isModifyData()) {
      return false;
    }
  }

  onFocusIn(element, field: string, key) {
    if (this.isEditMode) {
      this.keyFocus = field;
      this.keyInput = key;
      if (!this.panelAnmeldeart && field === 'DatumVon') {
        this.accessKeyItemFocused = 8;
      } else {
        this.accessKeyItemFocused = element.accessKey;
      }
    }
  }

  onFocusOut() {
    this.accessKeyItemFocused = 0;
  }

  // Arrow-key
  moveFocus(isNext: boolean) {
    const tagNames = ['input', 'textarea'];
    for (const tagName of tagNames) {
      const elems = document.getElementsByTagName(tagName);
      for (const el of Array.from(elems)) {
        if (isNext) {
          if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused + 1) {
            (el as HTMLElement).focus();
            return;
          }
        } else {
          if (!this.panelAnmeldeart && this.keyFocus === 'DatumAbsch') {
            if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused - 3) {
              (el as HTMLElement).focus();
              return;
            }
          } else if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused - 1) {
            (el as HTMLElement).focus();
            return;
          }
        }
      }
    }
  }

  focusDateBox() {
    if (!isNullOrUndefined(this.dateBox) && !isNullOrUndefined(this.dateBox.instance)) {
      setTimeout(() => {
        this.dateBox.instance.focus();
      }, 300);
    }
  }

  // Onkey Down
  onKeyDown(e) {
    if (!this.isEditMode && this.isVisibleFallWieder) {
      return;
    }

    if (!(this.keyInput === 'selectbox' || this.keyInput === 'datebox')) {
      return;
    }

    if (e.event.keyCode === AppEnums.KeyCode.KeyF4) {
      if (!(e.component.option('opened'))) {
        e.event.preventDefault();
        e.component.open();
        return;
      }
      e.component.close();
      return;
    }
    if (this.isClosed && this.keyInput !== 'selectbox') {
      this.dispatchArrowKey(e.event.keyCode);
    }

  }

  dispatchArrowKey(keyCode) {
    if (keyCode === AppEnums.KeyCode.UpArrowKey) {
      const em = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: 'ArrowUp',
      });
      document.dispatchEvent(em);
    } else if (keyCode === AppEnums.KeyCode.DownArrowKey) {
      const em = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: 'ArrowDown',
      });
      document.dispatchEvent(em);
    }
  }

  getValueTextArea(e) {
    this.onChangeData(e, 'textarea');
  }

  getFaleistungData() {
    this.FallfuhrungsSandbox.loadFallfuhrungData(this._faLeistungID);
  }

  onClosed() {
    this.isClosed = true;
  }

  onOpened(e, key) {
    switch (key) {
      case 'kontaktveranl':
        if (this.faleistung.FaKontaktveranlasserCode === null) {
          e.component.option('value', this.dataComboboxKontaktveranl[0].code);
        }
        break;
      case 'anmeldeart':
        if (this.faleistung.FaAufnahmeartCode === null) {
          e.component.option('value', this.dataComboboxAnmeldeart[0].code);
        }
        break;
      case 'grund':
        if (this.faleistung.AbschlussGrundCode === null) {
          e.component.option('value', this.dataComboboxGrund[0].code);
        }
        break;
      case 'gemeinde':
        if (this.faleistung.GemeindeCode === null) {
          e.component.option('value', this.dataComboboxGemeinde[0].code);
        }
        break;

      default:
        break;
    }
    this.isClosed = false;
  }

  checkCondition() {
    if (!isNullOrUndefined(this.faleistung.DatumBis)) {
      this.FallfuhrungsSandbox.getCountFaPhase(this.faleistung.FaLeistungID);
    } else {
      this.UpdateFaleistung();
    }
  }
  getValidationFaLeistung() {
    if (this.validationGroup.instance.validate() && this.validationGroup.instance.validate().isValid) {
      if (this.isDatumVonModified) {
        this.isDatumVonModified = false;
        this.getModelQueryValidation();
        this.FallfuhrungsSandbox.validationFaLeistungData(this.modelQueryValidationFaLeistung);
      } else {
        this.checkCondition();
      }
    } else {
      this.remainingMessage.showMessage(this.translateService.instant('Fallfuhrung.MessageValidation.Validate'));
    }
    this.setFocusOutDateBox();
  }
  getModelQueryValidation() {
    this.modelQueryValidationFaLeistung.baPersonID = this.faleistung.BaPersonID;
    this.modelQueryValidationFaLeistung.datumVon = moment(this.faleistung.DatumVon).format(CommonConstant.FORMAT_DATE_MM_DD_YYYY);
    this.modelQueryValidationFaLeistung.notFaLeistungID = this._faLeistungID;
  }

  getAnzahOffenePendenzen() {
    this.FallfuhrungsSandbox.loadAnzahlOffenePendenzenData(this._faLeistungID);
  }

  isModifyData(): boolean {
    if (JSON.stringify(this.faleistung) !== JSON.stringify(this.faleistungTmp)) {
      return true;
    }
    return false;
  }

  showPopupConcurrency(message) {
    this.popUpConcurrencyModel.message = message;
    this.popUpConcurrencyModel.isVisible = true;
    this.popUpConcurrencyModel.funcYes = () => {
      this.doAbbrechenConcurrency();
    };
    this.popUpConcurrencyModel.funcNo = () => {
      this.getFaleistungData();
      this.popUpConcurrencyModel.isVisible = false;
    };
    this.popUpConcurrencyModel.funcHiding = () => {
      this.doAbbrechenConcurrency();
    };
  }
  doAbbrechenConcurrency() {
    this.customizeBtn[4].disabled = true;
    this.popUpConcurrencyModel.isVisible = false;
    this.concurrency = CommonConstant.Concurrency;
    this.customizeBtn[2].disabled = true;
    this.customizeBtn = [...this.customizeBtn];
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

  showPopup(message, popupType?) {
    this.popUpModel.message = message;
    this.popUpModel.isVisible = true;
    switch (popupType) {
      case this.information:
        this.popUpModel.isVisibleNo = false;
        this.popUpModel.isVisibleYes = false;
        this.popUpModel.title = this.translateService.instant('Fallfuhrung.PopupMessage.Title');
        break;
      case 'NavigatorPopup':
        this.popUpModel.textYes = this.translateService.instant('Fallfuhrung.NavigatorPopupConfirm.Yes');
        this.popUpModel.textNo = this.translateService.instant('Fallfuhrung.NavigatorPopupConfirm.No');
        this.popUpModel.title = this.translateService.instant('Fallfuhrung.NavigatorPopupConfirm.Title');
        break;
      default:
        this.popUpModel.textYes = this.translateService.instant('Fallfuhrung.PopupConfirm.Yes');
        this.popUpModel.textNo = this.translateService.instant('Fallfuhrung.PopupConfirm.No');
        this.popUpModel.title = this.translateService.instant('Fallfuhrung.PopupConfirm.Title');
        break;
    }
  }

  handleActionPopup(key, message: string) {
    this.initPopUpModel();
    switch (key) {
      case 'onClickCancelBtnGrdTop':
        this.popUpModel.funcYes = () => {
          this.getFaleistungData();
          this.modeView();
          this.popUpModel.isVisible = false;
          this.setFocusOutDateBox();
        };
        this.popUpModel.funcNo = () => {
          this.popUpModel.isVisible = false;
        };
        this.showPopup(message);
        break;
      case 'fallwieder':
        this.popUpModel.funcYes = () => {
          this._canUpdate = true;
          this.faleistung.DatumBis = null;
          this.isVisibleFallWieder = false;
          this.UpdateFaleistung();
          this.popUpModel.isVisible = false;
          this.isConfirmFallWieder = true;
        };
        this.popUpModel.funcNo = () => {
          this.popUpModel.isVisible = false;
        };
        this.showPopup(message);
        break;
      case 'onNavigate':
        this.popUpModel.funcYes = () => {
          this.isEditMode = false;
          this.faModulTreeSandbox.updateNodesStatus(
            {
              id: this.router.url,
              isEditMode: false,
            }
          );
          this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
          this.navigateAwaySelection$.next(true);
          this.popUpModel.isVisible = false;
        };
        this.popUpModel.funcNo = () => {
          this.layoutSandbox.clearDeletingSticky();
          this.navigateAwaySelection$.next(false);
          this.popUpModel.isVisible = false;
        };
        this.showPopup(message, 'NavigatorPopup');
        break;
      case this.information:
        this.showPopup(message, this.information);
        this.popUpModel.funcHiding = () => {
          this.UpdateFaleistung();
        };
        break;
      case 'onClickCancelConcurrency':
        this.popUpModel.funcYes = () => {
          this.isSetDeleteMode = false;
          this.getFaleistungData();
          this.popUpModel.isVisible = false;
          this.setModeAfterCancelConcurency();
        };
        this.popUpModel.funcNo = () => {
          this.popUpModel.isVisible = false;
        };
        this.showPopup(message);
        break;
      default:
        break;
    }

  }

  canDeactivate() {
    if (this.isModifyData()) {
      this.handleActionPopup('onNavigate', this.translateService.instant('Fallfuhrung.NavigatorPopupConfirm.Message'));
      return this.navigateAwaySelection$;
    } else {
      this.faModulTreeSandbox.updateNodesStatus(
        {
          id: this.router.url,
          isEditMode: false,
        }
      );
      this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
      return true;
    }
  }

  handleTextarea() {
    if (isNullOrUndefined(this.editor)) {
      return;
    }
    if (!this.isEditMode) {
      this.editor.edit.off();
      return;
    }
    this.editor.edit.on();
  }


  setVisibleBtn() {
    if (this.customizeBtn[0].visible) {
      if (!this.faleistung.DatumBis) {
        this.customizeBtn = this.cloneArray(this.initialCustomizeBtn);
        this.isVisibleFallWieder = false;
        return;
      }
      this.customizeBtn[1].disabled = true;
      this.customizeBtn = [...this.customizeBtn];
      return;
    }
    this.customizeBtn[1].disabled = false;
    this.customizeBtn = [...this.customizeBtn];
    this.isVisibleFallWieder = false;
  }

  setDeleteMode() {
    this.customizeBtn[2].disabled = true;
    this.customizeBtn[4].disabled = true;
    this.customizeBtn = [...this.customizeBtn];
    this.isSetDeleteMode = true;
  }

  setKeyUpDateBox() {
    this.dateBox.valueChangeEvent = 'keyup';
    this.datumAbsch.valueChangeEvent = 'keyup';
  }

  setFocusOutDateBox() {
    this.dateBox.valueChangeEvent = 'focusout';
    this.datumAbsch.valueChangeEvent = 'focusout';
  }

  configMode() {
    if (this.isConfirmFallWieder) {
      this.isConfirmFallWieder = false;
      this.onClickEditBtnGrdTop();
      return;
    }
    this.modeView();
  }

  cloneArray(arrSource) {
    const array = [];
    for (let index = 0; index < arrSource.length; index++) {
      const element = arrSource[index];
      array.push(Object.assign({}, element));
    }
    return array;
  }

  setModeAfterCancelConcurency() {
    this.customizeBtn[1].visible = true;
    this.customizeBtn[1].disabled = true;
    this.customizeBtn[2].visible = false;
    this.customizeBtn[3].visible = false;
    this.customizeBtn[2].disabled = false;
    this.customizeBtn = [...this.customizeBtn];
    this.isEditMode = false;
    this.isReadOnly = true;
    this.handleTextarea();
    this.remainingMessage.hideMessage();
    this.faModulTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
  }
}
