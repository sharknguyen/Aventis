import 'devextreme-intl';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de-CH';
import { AfterViewInit, Component, HostListener, Injector, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { getConditionListBtn, getXuserSessionStorage, UtilService } from '@shared/utilites';
import * as CurrencyHelper from '@shared/utilites/currencyHelper';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

import { KlientensystemSandbox } from '../klientensystem.sandbox';
import { Falltraeger, Mietvertrag } from '../models';
import { TabModuleFallbearbeitungSandbox } from '@app/kiss4-main/tab-module-fallbearbeitung/tab-module-fallbearbeitung.sandbox';
import { FaModulTreeSandbox } from '@app/kiss4-fallfuhrung/fa-modul-tree/fa-modul-tree.sandbox';
import { isEmpty } from 'lodash-es';

registerLocaleData(localeDe, 'de-CH');

@Component({
  selector: 'app-klientensystem',
  templateUrl: './klientensystem.component.html',
  styleUrls: ['./klientensystem.component.scss']
})
@SetClassRight('CtlKlientensystem')
export class KlientensystemComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {
  @Output() toolbarSelection: any;

  isNavigator = false;
  rowIndex: number;
  checkboxName = '';
  isAbleGlHaushaltOut = true;
  saveAfterCallAPI = false;
  itemSelected = '';
  messageCanDeactive: any;
  listNumberCheck = [
    {
      name: 'mietkosten',
      format: CommonConstant.FormatNumberDefault
    },
    {
      name: 'kostenanteilUE',
      format: CommonConstant.FormatNumberDefault
    },
    {
      name: 'mietdepot',
      format: CommonConstant.FormatNumberDefault
    },
    {
      name: 'nebenkosten',
      format: CommonConstant.FormatNumberDefault
    },
    {
      name: 'mietzinsgarantie',
      format: CommonConstant.FormatNumberDefault
    }
  ];

  //#region "Declare variables for toolbarControl"
  isNavbar: boolean;

  popUpModel: PopUpModel;
  popUpConcurrencyModel: PopUpModel;
  popupType = '';

  initPopupData = {
    visible: false,
    message: '',
    title: '',
    key: '',
    yes: '',
    no: '',
    ok: ''
  };
  popupData: any;
  listBtn: any;
  CommonBtn = [...CommonConstant.AdditionalButtons];
  customizeBtn: any;
  falltraegerData = new Falltraeger();
  bezugspersonenData = [];
  beziehungRelationData = [];
  maleRelationData = [];
  femaleRelationData = [];
  genericRelationData = [];
  mietvertragData = new Mietvertrag();
  mietvertragDefaultData = new Mietvertrag();
  comboboxVermieter: any;
  maxLength = 4000;
  pageTitle: any;
  languageCode: any;
  languageCodeXuser: any;
  numberFormat = AppEnums.Validation.C007_NUMBER_FORMAT;
  dateFormat = CommonConstant.FORMAT_DATE;
  baPerson_Relation: any;
  idParams: any;
  isReadOnly: any;
  httpErrorCodes = [
    AppEnums.StatusCode.LIMIT_FILE_SIZE,
    AppEnums.StatusCode.XML_FORMAT,
    AppEnums.StatusCode.DOWNLOAD_FILE,
    AppEnums.StatusCode.PRECONDITION_REQUIRED,
    AppEnums.StatusCode.UNPROCESSABLE_ENTITY,
    AppEnums.StatusCode.BAD_REQUEST,
    AppEnums.StatusCode.INTERNAL_SERVER_ERROR,
    AppEnums.StatusCode.NOT_FOUND];

  currency = {
    mietkosten: '0.00',
    kostenanteilUE: '0.00',
    mietdepot: '0.00',
    nebenkosten: '0.00',
    mietzinsgarantie: '0.00',
  };
  minDate: Date = new Date(1753, 0, 1); // ?????
  maxDate: Date = new Date(9999, 11, 31); // ?????
  widthNumberAndDateBox = CommonConstant.WidthNumberAndDateBox;
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
  remainMessage = {
    visible: false,
    message: ''
  };
  popupConcurrency = {
    title: this.translateService.instant('Fallfuhrung.PopupConfirm.Title'),
    visible: false,
    message: '',
    abbrechen: this.translateService.instant('Fallfuhrung.PopupConfirm.Abbrechen'),
    datenAktualisieren: this.translateService.instant('Fallfuhrung.PopupConfirm.Daten')
  };
  glHaushaltOutFocusItem = {
    row: 0,
    focused: false
  };

  private subscription: Subscription = new Subscription();
  //#endregion


  constructor(
    injector: Injector,
    public klientensystemSandbox: KlientensystemSandbox,
    public translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox,
    public layoutSandbox: LayoutSandbox,
    public utilService: UtilService,
    public tabModuleFallbearbeitungSandbox: TabModuleFallbearbeitungSandbox,
    public faModulTreeSandbox: FaModulTreeSandbox
  ) {
    super(injector);
    this.isReadOnly = false;
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngAfterViewInit(): void {
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

  // #region "Businness, load data for combox..."
  ngOnInit() {
    this.isNavbar = UtilityHelper.tryParseJSON(localStorage.getItem('settings:toogleNavbar'));
    this.idParams = this.route.snapshot.params.baPersonID;
    this.initToolbarItem(false);
    this.popupData = this.initPopupData;
    this.registerEvents();
    this.klientensystemSandbox.registerEvents();
    this.beziehungRelationGenericInit();
    this.beziehungRelationFemaleInit();
    this.beziehungRelationMaleInit();
    this.getComboboxVermieterData();
    this.baPerson_Relation = [];
    for (let index = 0; index < this.listNumberCheck.length; index++) {
      const element = this.listNumberCheck[index];
      this.currency[element.name] = '0.00';
    }

    this.initPopUpModel();
    this.initPopUpConcurModel();
  }

  ngOnDestroy() {
    this.unregisterEvents();
    this.klientensystemSandbox.resetState();
    this.klientensystemSandbox.unregisterEvents();
    this.fallfuhrungTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
  }

  public unregisterEvents() {
    this.subscription.unsubscribe();
  }

  // Section init data from server
  private registerEvents(): void {
    this.subscription.add(this.tabModuleFallbearbeitungSandbox.getPersonInfoTitel$.subscribe(data => this.getPersonInfoTitel(data)));
    this.subscription.add(this.fallfuhrungTreeSandbox.selectedNode$.subscribe(data => this.onSelectedNodeData(data)));
    this.subscription.add(this.klientensystemSandbox.falltraegerData$.subscribe(data => this.handleFalltraegerData(data)));
    this.subscription.add(this.klientensystemSandbox.relationData$.subscribe(data => this.handleRelationData(data)));
    this.subscription.add(this.klientensystemSandbox.beziehungRelationMaleData$.subscribe(data => this.handleBeziehungRelationMaleData(data)));
    this.subscription.add(this.klientensystemSandbox.beziehungRelationGenericData$.subscribe(data => this.handleBeziehungRelationGenericData(data)));
    this.subscription.add(this.klientensystemSandbox.beziehungRelationFemaleData$.subscribe(data => this.handleBeziehungRelationFemaleData(data)));
    this.subscription.add(this.klientensystemSandbox.vwInstitutionData$.subscribe(data => this.handleVwInstitutionData(data)));
    this.subscription.add(this.klientensystemSandbox.mietvertragData$.subscribe(data => this.handleMietvertragData(data)));
    this.subscription.add(this.klientensystemSandbox.haushaltValidatorData$.subscribe(data => this.handleHaushaltValidatorData(data)));
    this.subscription.add(this.klientensystemSandbox.gleicheAdresseData$.subscribe(data => this.handleGleicheAdresseData(data)));
    this.subscription.add(this.klientensystemSandbox.updateBaMietvertragData$.subscribe(data => this.handleUpdateBaMietvertragData(data)));
  }

  getPersonInfoTitel(data) {
    if (isNullOrUndefined(data)) {
      return;
    }
    this.pageTitle = data.titleText;
  }
  onSelectedNodeData(data) {
    if (isNullOrUndefined(data)) {
      return;
    }

    this.idParams = data.baPersonID;
    this.fillKlientensystemData(data.baPersonID);
    this.fillBezugspersonenData(data.baPersonID);
    this.fillMietvertragData(data.baPersonID);

    if (this.isNavigator) {
      this.cancelAll();
      this.isNavigator = false;
    }
  }
  handleFalltraegerData(data) {
    if (isNullOrUndefined(data)) {
      return;
    }
    if (this.httpErrorCodes.includes(data.status)) {
      const message = UtilityHelper.tryParseJSON(data._body);
      this.showRemainMessage(message.message);
    } else {
      this.falltraegerData = data;
      this.remainMessage = {
        visible: false,
        message: ''
      };
    }
  }
  handleRelationData(data) {
    if (isNullOrUndefined(data)) {
      return;
    }
    if (this.httpErrorCodes.includes(data.status)) {
      const message = UtilityHelper.tryParseJSON(data._body);
      this.showRemainMessage(message.message);
    } else {
      this.bezugspersonenData = data;
      this.bezugspersonenData.forEach(element => {
        if (element.geschlechtCode === 1) {
          element.dropdownboxData = this.maleRelationData;
        } else if (element.geschlechtCode === 2) {
          element.dropdownboxData = this.femaleRelationData;
        } else {
          element.dropdownboxData = this.genericRelationData;
        }
        for (let i = 0; i < element.dropdownboxData.length; i++) {
          if (element.relationID === element.dropdownboxData[i].code) {
            element.beziehung = element.dropdownboxData[i].text;
            return;
          }
        }
      });
    }
  }
  handleBeziehungRelationGenericData(data) {
    if (isNullOrUndefined(data)) {
      return;
    }

    if (this.httpErrorCodes.includes(data.status)) {
      const message = UtilityHelper.tryParseJSON(data._body);
      this.showRemainMessage(message.message);
    } else {
      this.genericRelationData = data;
    }
  }
  handleBeziehungRelationMaleData(data) {
    if (isNullOrUndefined(data)) {
      return;
    }

    if (this.httpErrorCodes.includes(data.status)) {
      const message = UtilityHelper.tryParseJSON(data._body);
      this.showRemainMessage(message.message);
    } else {
      this.maleRelationData = data;
    }
  }
  handleBeziehungRelationFemaleData(data) {
    if (isNullOrUndefined(data)) {
      return;
    }

    if (this.httpErrorCodes.includes(data.status)) {
      const message = UtilityHelper.tryParseJSON(data._body);
      this.showRemainMessage(message.message);
    } else {
      this.femaleRelationData = data;
    }
  }
  handleVwInstitutionData(data) {
    if (isNullOrUndefined(data)) {
      return;
    }

    if (this.httpErrorCodes.includes(data.status)) {
      const message = UtilityHelper.tryParseJSON(data._body);
      this.showRemainMessage(message.message);
    } else {
      this.comboboxVermieter = data;
    }
  }
  handleMietvertragData(data) {
    if (isNullOrUndefined(data)) {
      return;
    }
    if (isEmpty(data)) {
      this.mietvertragData = new Mietvertrag();
      return;
    }

    this.mietvertragData = Object.assign({}, data[0]);
    this.mietvertragDefaultData = Object.assign({}, data[0]);
    this.mietvertragDefaultData.isValid = true;
    this.mietvertragData.isValid = true;
  }
  handleHaushaltValidatorData(data) {
    if (!isNullOrUndefined(data) && data !== false) {
      if (!isNullOrUndefined(data.status) && data.status === AppEnums.StatusCode.BAD_REQUEST) {
        const body = UtilityHelper.tryParseJSON(data._body);
        switch (body.errorDetails[0].fieldName) {
          case 'CheckboxAbhaengig':
            this.showRemainMessage(this.translateService.instant('Klientensystem.Message.C007_MSG004'));
            this.isAbleGlHaushaltOut = false;
            break;
          case 'InvalidAddressOfSourcePerson_01':
            this.showRemainMessage(this.translateService.instant('Klientensystem.Message.C007_MSG002_1')
              + this.bezugspersonenData[this.rowIndex].person
              + this.translateService.instant('Klientensystem.Message.C007_MSG002_2'));
            this.isAbleGlHaushaltOut = false;
            break;
          case 'KopplungAdresseNichtMoeglich':
            this.showRemainMessage(this.translateService.instant('Klientensystem.Message.C007_MSG003'));
            this.isAbleGlHaushaltOut = false;
            break;
        }
      } else {
        const message = UtilityHelper.tryParseJSON(data._body) ;
        this.showRemainMessage(message.message);
      }
    } else {
      this.isAbleGlHaushaltOut = true;
    }
  }
  handleGleicheAdresseData(data) {
    if (!isNullOrUndefined(data) && data !== true) {
      if (!isNullOrUndefined(data.status) && data.status === AppEnums.StatusCode.BAD_REQUEST) {
        const body = UtilityHelper.tryParseJSON(data._body);
        switch (body.errorDetails[0].fieldName) {
          case 'SetGleicherHaushalt':
            this.popupType = 'SetGleicherHaushalt';
            this.initPopUpModel();
            this.showPopupConfirm(this.translateService.instant('Klientensystem.Message.C007_MSG005_1')
              + this.bezugspersonenData[this.glHaushaltOutFocusItem.row].person
              + this.translateService.instant('Klientensystem.Message.C007_MSG005_2')
              + this.falltraegerData.wohnsitz
              + this.translateService.instant('Klientensystem.Message.C007_MSG005_3'));
            break;
          case 'AdressenBereinigen':
            this.showRemainMessage(this.translateService.instant('Klientensystem.Message.C007_MSG006_1')
              + this.bezugspersonenData[this.glHaushaltOutFocusItem.row].person
              + this.translateService.instant('Klientensystem.Message.C007_MSG006_2'));
            this.bezugspersonenData[this.glHaushaltOutFocusItem.row].glHaushalt = false;
            break;
        }
      }
    } else {
      if (this.saveAfterCallAPI === true) {
        this.updateAll();
        this.saveAfterCallAPI = false;
      }
    }
  }
  handleUpdateBaMietvertragData(data) {
    if (!isNullOrUndefined(data.value) && data.value === true) {
      this.fillBezugspersonenData(this.idParams);
      this.fillMietvertragData(this.idParams);
      this.onCloseError();
    } else if (!isNullOrUndefined(data.status)) {
      if (data.status === AppEnums.StatusCode.CONCURRENCY) {
        this.initPopUpConcurModel();
        this.showPopupConcurrency(this.translateService.instant('Klientensystem.Message.Concurrency'));
      } else {
        this.showRemainMessage(this.translateService.instant('Klientensystem.Message.BemerkungMaxlength'));
        this.fillBezugspersonenData(this.idParams);
        this.fillMietvertragData(this.idParams);
      }
    }
  }

  fillKlientensystemData(idParams: any) {
    this.klientensystemSandbox.loadFalltraegerInitData({
      BaPersonID: idParams,
      LanguageCode: 1
    });
  }

  fillBezugspersonenData(idParams: any) {
    this.klientensystemSandbox.loadRelationInitData({
      BaPersonID: idParams
    });
  }

  fillMietvertragData(idParams: any) {
    this.klientensystemSandbox.loadMietvertragInitData({
      BaPersonID: idParams
    });
  }

  getComboboxVermieterData() {
    this.klientensystemSandbox.loadVwInstitutionInitData();
  }

  beziehungRelationGenericInit() {
    this.klientensystemSandbox.loadBeziehungRelationGenericInitData();
  }

  beziehungRelationMaleInit() {
    this.klientensystemSandbox.loadBeziehungRelationMaleInitData();
  }

  beziehungRelationFemaleInit() {
    this.klientensystemSandbox.loadBeziehungRelationFemaleInitData();
  }

  getHaushaltValidatorData(
    PersonID: number,
    FieldNameChange: string,
    WohnsitzAdresseID: number,
    Person: string,
    Klient: boolean,
    GlHaushalt: boolean,
    Wohnsitz: string
  ) {
    this.klientensystemSandbox.loadHaushaltValidatorInitData({
      personID: PersonID,
      fieldNameChange: FieldNameChange,
      wohnsitzAdresseID: WohnsitzAdresseID,
      person: Person,
      klient: Klient,
      glHaushalt: GlHaushalt,
      wohnsitz: Wohnsitz,
      baPersonID: this.idParams
    });
  }

  checkValiditionGleicherHaushalt(
    IsGleicherHaushalt: boolean,
    BaPersonIDTargetPerson: number,
    NameTargetPerson: string,
    BaAdresseIDSourcePerson: number,
    AddressSourcePerson: string,
    IsValidAddressFirst: boolean
  ) {

    this.klientensystemSandbox.loadGleicheAdresseInitData({
      columnModified: true,
      isGleicherHaushalt: IsGleicherHaushalt,
      baPersonIDTargetPerson: BaPersonIDTargetPerson,
      nameTargetPerson: NameTargetPerson,
      baAdresseIDSourcePerson: BaAdresseIDSourcePerson,
      addressSourcePerson: AddressSourcePerson,
      isValidAddressFirst: IsValidAddressFirst
    });
  }

  updateBaMietvertrag(
    BaPersonID: number,
    BaAdresseIDSourcePerson: number, // wohnsitzAdresseID
    BaPerson_Relation: any,
    BaMietvertrag: any,
  ) {
    this.klientensystemSandbox.updateBaMietvertragData({
      baPersonID: BaPersonID,
      baAdresseIDSourcePerson: BaAdresseIDSourcePerson,
      baPerson_Relation: BaPerson_Relation,
      baMietvertrag: BaMietvertrag
    }
    );
  }

  initToolbarItem(isEdit: boolean) {
    this.customizeBtn = [
      {
        text: 'Klientensystem.Toolbar.Speichern',
        name: 'speichern',
        visible: isEdit
      },
      {
        text: 'Klientensystem.Toolbar.Abbrechen',
        name: 'abbrechen',
        visible: isEdit
      },
      {
        text: 'Klientensystem.Toolbar.Bearbeiten',
        name: 'bearbeiten',
        visible: !isEdit
      }
    ];
    this.listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn([...this.CommonBtn], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
  }

  toolBarOnItemClick(e) {
    this.itemSelected = e;
    let copyElement = '';
    switch (e) {
      case 'headerDblClicked':
        copyElement = this.pageTitle;
        this.copyElement(copyElement);
        break;
      case 'headerShiftDblClicked':
        copyElement = this.idParams + '';
        this.copyElement(copyElement);
        break;
      case 'bearbeiten': {
        this.isReadOnly = true;
        this.fallfuhrungTreeSandbox.updateNodesStatus(
          {
            id: this.router.url,
            isEditMode: true,
          }
        );
        this.initToolbarItem(this.isReadOnly);
        return;
      }
      case 'speichern': {
        if (this.glHaushaltOutFocusItem.focused === true) {
          this.checkValiditionGleicherHaushalt(
            this.bezugspersonenData[this.glHaushaltOutFocusItem.row].glHaushalt
            , this.bezugspersonenData[this.glHaushaltOutFocusItem.row].personID
            , this.bezugspersonenData[this.glHaushaltOutFocusItem.row].person
            , this.falltraegerData.wohnsitzAdresseID
            , this.falltraegerData.wohnsitz
            , false);
          this.glHaushaltOutFocusItem.focused = false;
          this.saveAfterCallAPI = true;
        } else {
          this.updateAll();
        }
        return;
      }
      case 'abbrechen': {
        if (this.isModifyData() || this.isGridModify()) {
          this.initPopUpModel();
          this.popupType = 'abbrechen';
          this.showPopupConfirm(this.translateService.instant('Klientensystem.Message.Edit'));
        } else {
          this.cancelAll();
        }
        return;
      }
    }
    setTimeout(() => { this.itemSelected = ''; });
  }

  cancelAll() {
    this.isReadOnly = false;
    this.fallfuhrungTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
    this.initToolbarItem(this.isReadOnly);
    this.fillBezugspersonenData(this.idParams);
    this.fillMietvertragData(this.idParams);
  }

  getXUser() {
    const Xuser = getXuserSessionStorage();
    if (Xuser) {
      this.languageCode = Xuser[0].languageCode;
      this.languageCodeXuser = this.languageCode;
    } else {
      this.languageCode = 1;
    }
    return Xuser;
  }

  showPopupConfirm(message) {
    this.popUpModel.message = message;
    this.popUpModel.title = this.translateService.instant('Klientensystem.Message.Title');
    this.popUpModel.isVisible = true;
    if (this.popupType === 'onNavigate') {
      this.popUpModel.textYes = this.translateService.instant('Klientensystem.Discard');
      this.popUpModel.textNo = this.translateService.instant('Klientensystem.PopupButton.Abbrechen');
    } else {
      this.popUpModel.textYes = this.translateService.instant('Klientensystem.PopupButton.Yes');
      this.popUpModel.textNo = this.translateService.instant('Klientensystem.PopupButton.No');
    }

    this.popUpModel.funcNo = () => {
      this.popUpModel.isVisible = false;
      switch (this.popupType) {
        case 'SetGleicherHaushalt':
          this.bezugspersonenData[this.glHaushaltOutFocusItem.row].glHaushalt = false;
          break;
        case 'onNavigate':
          this.popUpModel.isVisible = false;
          this.layoutSandbox.clearDeletingSticky();
          this.navigateAwaySelection$.next(false);
          return false;
          break;
        default:
          break;
      }
      this.popupType = '';
    };

    this.popUpModel.funcYes = () => {
      this.popUpModel.isVisible = false;
      switch (this.popupType) {
        case 'SetGleicherHaushalt':
          this.checkValiditionGleicherHaushalt(
            this.bezugspersonenData[this.glHaushaltOutFocusItem.row].glHaushalt,
            this.bezugspersonenData[this.glHaushaltOutFocusItem.row].personID,
            this.bezugspersonenData[this.glHaushaltOutFocusItem.row].person
            , this.falltraegerData.wohnsitzAdresseID
            , this.falltraegerData.wohnsitz
            , true);
          break;
        case 'abbrechen':
          this.cancelAll();
          break;
        case 'onNavigate':
          this.isReadOnly = false;
          this.fallfuhrungTreeSandbox.updateNodesStatus(
            {
              id: this.router.url,
              isEditMode: false,
            }
          );
          this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
          this.navigateAwaySelection$.next(true);
          this.popUpModel.isVisible = false;
          break;
        default:
          break;
      }
      this.popupType = '';
    };
    this.popUpModel.funcHidden = () => {
      switch (this.popupType) {
        case 'SetGleicherHaushalt':
          this.bezugspersonenData[this.glHaushaltOutFocusItem.row].glHaushalt = false;
          break;
      }
    };
  }

  concurrencyButton() {
    this.listBtn = [];
    this.customizeBtn = [
      {
        text: 'Klientensystem.Toolbar.Speichern',
        name: 'speichern',
        disabled: true
      },
      {
        text: 'Klientensystem.Toolbar.Abbrechen',
        name: 'abbrechen'
      }
    ];
  }

  copyElement(copyElement: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = copyElement.trim();
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  /**
   * Handle hot key Alt + charactor
   * @param event
   */

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ) {
      const el = document.querySelector(':focus');
      if (el) {
        (el as HTMLElement).blur();
      }
      event.preventDefault();
      if (this.isReadOnly === true) {
        if (this.isModifyData() || this.isGridModify()) {
          this.initPopUpModel();
          this.popupType = 'abbrechen';
          this.showPopupConfirm(this.translateService.instant('Klientensystem.Message.Edit'));
        } else {
          this.cancelAll();
        }
      }
    } else if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS) {
      const el = document.querySelector(':focus');
      if (el) {
        (el as HTMLElement).blur();
      }
      event.preventDefault();
      if (this.isReadOnly === true) {
        if (this.glHaushaltOutFocusItem.focused === true) {
          this.checkValiditionGleicherHaushalt(
            this.bezugspersonenData[this.glHaushaltOutFocusItem.row].glHaushalt
            , this.bezugspersonenData[this.glHaushaltOutFocusItem.row].personID
            , this.bezugspersonenData[this.glHaushaltOutFocusItem.row].person
            , this.falltraegerData.wohnsitzAdresseID
            , this.falltraegerData.wohnsitz
            , false);
          this.glHaushaltOutFocusItem.focused = false;
          this.saveAfterCallAPI = true;
        } else {
          this.updateAll();
        }
      }
    }
  }

  // Handle close/refresh the tab
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.isReadOnly) {
      return false;
    }
  }

  // #region Validation, checking

  isModifyData(): boolean {
    for (let index = 0; index < this.listNumberCheck.length; index++) {
      const element = this.listNumberCheck[index];
      if (!isNullOrUndefined(this.mietvertragData[element.name])) {
        this.mietvertragData[element.name] = CurrencyHelper.parseFloat(this.mietvertragData[element.name].toString());
      }
    }
    if (JSON.stringify(this.mietvertragDefaultData) !== JSON.stringify(this.mietvertragData)) {
      return true;
    }
    return false;
  }

  isGridModify(): boolean {
    for (const item of this.bezugspersonenData) {
      if (item.isEdit === true) {
        return true;
      }
    }
    return false;
  }

  editValueChanging(id, person, klient, glHaushalt, fieldNameChange) {
    this.getHaushaltValidatorData(
      id,
      fieldNameChange,
      this.falltraegerData.wohnsitzAdresseID,
      person,
      klient,
      glHaushalt,
      this.falltraegerData.wohnsitz);
  }

  canDeactivate() {
    this.isNavigator = true;
    if (this.isModifyData() || this.isGridModify()) {
      this.popupType = 'onNavigate';
      this.initPopUpModel();
      this.showPopupConfirm(this.translateService.instant('Klientensystem.MessageBestatigung'));
      return this.navigateAwaySelection$;
    }
    this.fallfuhrungTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    return true;
  }

  onCloseError() {
    this.remainMessage.visible = false;
  }

  showRemainMessage(message) {
    this.remainMessage = {
      visible: true,
      message: message
    };
  }

  showPopupConcurrency(message) {
    this.popUpConcurrencyModel.message = message;
    this.popUpConcurrencyModel.textYes = this.translateService.instant('Klientensystem.PopupButton.Abbrechen');
    this.popUpConcurrencyModel.textNo = this.translateService.instant('Klientensystem.PopupButton.DatenAktualisieren');
    this.popUpConcurrencyModel.title = this.translateService.instant('Klientensystem.Message.Title');

    this.popUpConcurrencyModel.isVisible = true;
    this.popUpConcurrencyModel.funcYes = () => {
      this.popUpConcurrencyModel.isVisible = false;
      this.isReadOnly = true;
      this.fallfuhrungTreeSandbox.updateNodesStatus(
        {
          id: this.router.url,
          isEditMode: true,
        }
      );
      this.fillBezugspersonenData(this.idParams);
      this.fillMietvertragData(this.idParams);
      setTimeout(() => {
        this.concurrencyButton();
      }, CommonConstant.SetTimeOut500);
      this.popupType = '';
    };
    this.popUpConcurrencyModel.funcNo = () => {
      this.popUpConcurrencyModel.isVisible = false;
      this.isReadOnly = true;
      this.fallfuhrungTreeSandbox.updateNodesStatus(
        {
          id: this.router.url,
          isEditMode: false,
        }
      );
      this.fillBezugspersonenData(this.idParams);
      this.fillMietvertragData(this.idParams);
      this.initToolbarItem(this.isReadOnly);


      this.popupType = '';
    };
    this.popUpConcurrencyModel.funcHiding = () => {
      this.popUpConcurrencyModel.isVisible = false;
      this.isReadOnly = true;
      this.fallfuhrungTreeSandbox.updateNodesStatus(
        {
          id: this.router.url,
          isEditMode: true,
        }
      );
      this.fillBezugspersonenData(this.idParams);
      this.fillMietvertragData(this.idParams);
      setTimeout(() => {
        this.concurrencyButton();
      }, CommonConstant.SetTimeOut500);
      this.popupType = '';
    };
  }

  handleError(event) {
    this.remainMessage.message = event;
  }

  updateAll() {
    this.baPerson_Relation = [];

    this.bezugspersonenData.forEach(element => {
      this.baPerson_Relation.push({
        baPerson_RelationID: element.baPerson_RelationID,
        baPerson_RelationTS: element.baPerson_RelationTS,
        baPersonID_1: element.baPersonID_1,
        baPersonID_2: element.baPersonID_2,
        baRelationID: element.baRelationID,
        unterstuetzt: element.unterstuetzt,
        personID: element.personID,
        glHaushalt: element.glHaushalt,
        relationID: element.relationID
      });
    });

    if (isNullOrUndefined(this.mietvertragData.baMietvertragID)) {
      this.mietvertragData.baMietvertragID = isNullOrUndefined(this.mietvertragData.baMietvertragID) ? 0 : this.mietvertragData.baMietvertragID;
      this.mietvertragData.datumVon = isNullOrUndefined(this.mietvertragData.datumVon) ? null : this.mietvertragData.datumVon;
      this.mietvertragData.datumBis = isNullOrUndefined(this.mietvertragData.datumBis) ? null : this.mietvertragData.datumBis;
      this.mietvertragData.mietkosten = isNullOrUndefined(this.mietvertragData.mietkosten) ? null : this.mietvertragData.mietkosten;
      this.mietvertragData.nebenkosten = isNullOrUndefined(this.mietvertragData.nebenkosten) ? null : this.mietvertragData.nebenkosten;
      this.mietvertragData.kostenanteilUE = isNullOrUndefined(this.mietvertragData.kostenanteilUE) ? null : this.mietvertragData.kostenanteilUE;
      this.mietvertragData.mietdepot = isNullOrUndefined(this.mietvertragData.mietdepot) ? null : this.mietvertragData.mietdepot;
      this.mietvertragData.baInstitutionID = isNullOrUndefined(this.mietvertragData.baInstitutionID) ? null : this.mietvertragData.baInstitutionID;
      this.mietvertragData.bemerkung = isNullOrUndefined(this.mietvertragData.bemerkung) ? '' : this.mietvertragData.bemerkung;
      this.mietvertragData.baMietvertragTS = isNullOrUndefined(this.mietvertragData.baMietvertragTS) ? null : this.mietvertragData.baMietvertragTS;
      this.mietvertragData.baPersonID = isNullOrUndefined(this.mietvertragData.baPersonID) ? null : this.mietvertragData.baPersonID;
      this.mietvertragData.garantieBis = isNullOrUndefined(this.mietvertragData.garantieBis) ? null : this.mietvertragData.garantieBis;
      this.mietvertragData.mieteAbgetreten = isNullOrUndefined(this.mietvertragData.mieteAbgetreten) ? null : this.mietvertragData.mieteAbgetreten;
      this.mietvertragData.mietzinsgarantie = isNullOrUndefined(this.mietvertragData.mietzinsgarantie) ? null : this.mietvertragData.mietzinsgarantie;
      this.mietvertragData.vermieter = isNullOrUndefined(this.mietvertragData.vermieter) ? '' : this.mietvertragData.vermieter;
    }

    if (this.mietvertragData.isValid && this.baPerson_Relation.length >= 0) {
      this.updateBaMietvertrag(
        this.idParams,
        this.falltraegerData.wohnsitzAdresseID,
        this.baPerson_Relation,
        this.mietvertragData);
      this.isReadOnly = false;
      this.fallfuhrungTreeSandbox.updateNodesStatus(
        {
          id: this.router.url,
          isEditMode: false,
        }
      );
      this.initToolbarItem(this.isReadOnly);
    } else {
      this.remainMessage.visible = true;
    }
  }

  handleCheckboxChange(event) {
    this.editValueChanging(event.PersonID, event.Person, event.Klient, event.GlHaushalt, event.FieldNameChange);
    this.rowIndex = event.RowIndex;
    this.checkboxName = event.FieldNameChange;
  }

  handleGlHaushalOut(event) {
    this.checkValiditionGleicherHaushalt(
      event.IsGleicherHaushalt
      , event.BaPersonIDTargetPerson
      , event.NameTargetPerson
      , this.falltraegerData.wohnsitzAdresseID
      , this.falltraegerData.wohnsitz
      , false);
  }

  getGlHaushaltOutFocusItem(event) {
    this.glHaushaltOutFocusItem = event;
  }
}
