import 'devextreme-intl';

import { AfterViewInit, Component, Injector, OnChanges, OnDestroy, OnInit, SimpleChanges, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { IPopUpModel, PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { locale } from 'devextreme/localization';
import { CommonConstant } from '@shared/common/constant.common';
import { FallfuhrungTreeConstant } from '@shared/common/fallfuhrung-tree.common';
import { BehaviorSubject, Subject } from 'rxjs';
import { TabModuleFallbearbeitungSandbox } from '@app/kiss4-main/tab-module-fallbearbeitung/tab-module-fallbearbeitung.sandbox';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';

import {
  CountRecord,
  DataGridBottom,
  DeleteRecord,
  ResultValue,
  TopFaLeistungValue,
  UpdateVorsaldo,
  UpdateWhLeistung,
} from '../models';
import { SozialhilfeConstant } from '@shared/common/sozialhilfe.common';
import { WhLeistungSandbox } from '../whleistung.sandbox';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';
import { AppEnums } from '@shared/AppEnum';
import { copyElement } from '@shared/utilites/utilityHelpers';
import { DatePipe } from '@angular/common';
import { cloneDeep, filter } from 'lodash-es';
@Component({
  selector: 'kiss-whleistung',
  templateUrl: './whleistung-component.html',
  styleUrls: ['./whleistung-component.scss']
})
@SetClassRight('CtlWhLeistung')
export class WhLeistungComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges, CanComponentDeactivate {
  @ViewChild('gridData') formList: any;
  @ViewChild('formEdit') formEdit: any;
  @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;
  formData: TopFaLeistungValue = new TopFaLeistungValue();
  formDataTemplate: TopFaLeistungValue = new TopFaLeistungValue();
  topFaLeistungValueSave: any;
  isReadMode = true;
  isReadOnly = true;
  isEdit = false;
  isAddNew = false;
  titleHeader: any;
  infoPerson: any;
  isEmptySozialhilfe = false;
  person: any;
  isCreateNewSosizlhife = false;
  private treeViewItemsQuery: any;
  idPerson: any;
  nameCombobox: ResultValue[] = [];
  nameComboboxBFS: any;
  nameComboboxGeme: any;
  nameComboboxBottom: any;
  listBtn = cloneDeep([CommonConstant.ToolbarButtons, CommonConstant.AdditionalButtons]);
  headerClicked$ = new BehaviorSubject(null);
  isError: boolean;
  messageErr: string;
  isShiftKeyDown = false;
  private subscriptionList = new Subscription();
  faLeistungId: number;
  kbKostenstelleTS: any;
  leiOrigDatumBis: Date;
  grundSelectboxTop: any;
  isConfirmYes = false;
  bfsSelectbox: any;
  onHasPenden = false;
  grundSelectboxBottom: any;
  minDate = CommonConstant.MIN_DATE;
  maxDate =  CommonConstant.MAX_DATE;
  gemeSelectbox: any;
  dataGridBottom: DataGridBottom[] = [];
  selectedKeys = [];
  isUpdateConfirm = false;
  isDelete = false;
  isUpdateError = false;
  updateWhLeistungModel: UpdateWhLeistung;
  conPopupVisible = false;
  isConcurrency = false;
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
  isSxMode = false;
  customizeBtn = [
    {
      text: 'I001WhLeistung.Button.Bearbeiten',
      visible: true,
      disabled: false,
      name: 'bearbeiten',
      icon: 'edit',
      class: 'i001-button'
    },
    {
      text: 'I001WhLeistung.Button.Speichern',
      visible: false,
      disabled: false,
      name: 'speichern',
      icon: 'floppy',
      class: 'i001-button'
    },
    {
      text: 'I001WhLeistung.Button.Abbrechen',
      visible: false,
      disabled: false,
      name: 'abbrechen',
      icon: 'close',
      class: 'i001-button'
    },
    {
      text: 'AsvDatenerfassung.Button.Delete',
      visible: true,
      disabled: false,
      locateInMenu: 'always',
      name: 'loschen',
    }
  ];

  private navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();

  constructor(
    injector: Injector,
    public whLeistungSandbox: WhLeistungSandbox,
    public translateService: TranslateService,
    public utilService: UtilService,
    public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
    public tabModuleFallbearbeitungSandbox: TabModuleFallbearbeitungSandbox,
    public router: Router,
    private datePipe: DatePipe,
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  canDeactivate() {
    if (!this.isReadOnly && this.isFormEdited()) {
      const message = this.translateService.instant('I001WhLeistung.Message.MessageExit');
      this.showPopup(message, 5);
      return this.navigateAwaySelection$;
    }
    this.sozialhilfeTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
    return true;
  }

  ngOnInit() {
    this.setTitle(SozialhilfeConstant.PAGETITLE);
    this.registerEvents();
    this.visibleListBtnNavigator(this.isReadOnly);
    this.isCreateNewSosizlhife = false;
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy() {
    this.whLeistungSandbox.resetState();
    this.subscriptionList.unsubscribe();
  }

  ngAfterViewInit() {
  }

  toolBarOnItemClick(event) {
    switch (event) {
      case CommonConstant.ButtonExportExcel:
      case CommonConstant.ButtonPrintPdf:
      {
        this.formList.toolBarOnItemClick(event);
        return;
      }
      case 'neue-sozialhilfe': {
        this.createNew();
        return;
      }
      case 'bearbeiten': {
        this.update();
        return;
      }
      case 'speichern': {
        this.doSaveOrUpdateData();
        return;
      }
      case 'abbrechen': {
        this.doCancel();
        return;
      }
      case 'loschen': {
        this.confirmRemove();
        return;
      }
      default:
        break;
    }
  }

  remove() {
    this.confirmDialogData.isVisible = false;
    const itemDelete = {
      faLeistungID: this.faLeistungId,
      faLeistungTS: this.formData.faLeistungTS,
    };
    this.sozialhilfeTreeSandbox.deleteSozialhilfe(itemDelete);
    this.isReadOnly = true;
  }

  getTreeViewItems(): void {
    this.treeViewItemsQuery = {
      baPersonID : this.idPerson,
      modulID : FallfuhrungTreeConstant.ModulIdS
    };
    this.tabModuleFallbearbeitungSandbox.getModuleIcon(this.idPerson, '');
    this.sozialhilfeTreeSandbox.getTreeViewItems(this.treeViewItemsQuery);
  }

  confirmRemove() {
    if (this.isSxMode) {
      return;
    }
    if (this.dataGridBottom.length > 0) {
      this.showHideRemainingMessage(true, this.translateService.instant('I001WhLeistung.Message.Message11'));
    } else {
      this.isDelete = true;
      this.showPopup( this.translateService.instant('I001WhLeistung.Message.Message17'), 1);
    }
  }

  createNew() {
    this.showHideRemainingMessage(true, this.translateService.instant('I001WhLeistung.Message.Message1'));
    return;
  }

  update() {
    if (!this.formData || !this.formData.faLeistungID ) {
      return;
    }
    this.showHideRemainingMessage(false, '');
    this.formDataTemplate = { ... this.formData };
    this.isReadOnly = false;
    this.isEdit = true;
    this.customizeBtn[0].visible = false;
    this.customizeBtn[1].visible = true;
    this.customizeBtn[2].visible = true;
    this.customizeBtn[3].visible = false;
    this.customizeBtn = [...this.customizeBtn];
    this.visibleListBtnNavigator(this.isReadOnly);
    setTimeout(() => {
      this.formEdit.dateboxEr.instance.focus();
    }, 300);
    this.sozialhilfeTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: true,
      }
    );
  }

  doCancel() {
    if (this.isConcurrency) {
      this.cancelConcurrency();
      return;
    }
    if (!this.isFormEdited() && !this.isCreateNewSosizlhife) {
      this.cancelEditData();
    } else {
      // TO DO: edited
      this.showPopup(this.translateService.instant('I001WhLeistung.Message.MessageCanCel'), 1);
    }
  }

  cancelConcurrency() {
    this.isConcurrency = false;
    this.isCreateNewSosizlhife = false;
    this.getDataTop();
  }

  cancelEditData() {
    this.isReadOnly = true;
    this.isEdit = false;
    this.isError = false;
    this.customizeBtn[0].visible = true;
    this.customizeBtn[1].visible = false;
    this.customizeBtn[2].visible = false;
    this.customizeBtn[3].visible = true;
    this.customizeBtn = [...this.customizeBtn];
    this.visibleListBtnNavigator(this.isReadOnly);
    this.formData = { ... this.formDataTemplate };
    this.isAddNew = false;
    this.confirmDialogData.isVisible = false;
    this.isCreateNewSosizlhife = false;
    this.remainingMessage.hideMessage();
    this.sozialhilfeTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
  }

  doSaveOrUpdateData() {
    const isValidaton = this.formEdit.validationWhLeistungForm.instance.validate();
    // TO DO : HOT FIX
    if (!this.isFormEdited() && this.formData.gemeindeCode && isValidaton.isValid) {
      this.cancelEditData();
      return;
    }
    if (this.validateDataForm(this.formData)) {
      this.isError = false;
      this.whLeistungSandbox.getAnzahlOffenePendenzen(this.faLeistungId);
    }
  }

  onUpdateVor() {
    this.remainingMessage.hideMessage();
    const updateVorsaldoWhLeistung: UpdateVorsaldo = {
      kbKostenstelleID: this.formData.kbKostenstelleID,
      kbKostenstelleTS: this.kbKostenstelleTS,
      vorsaldo: (this.formData.vorsaldo) ? this.formData.vorsaldo : 0
    };
    this.whLeistungSandbox.updateVorsaldoDataWhLeistung(updateVorsaldoWhLeistung);
  }


  validateDataForm(data) {
    const isValidaton = this.formEdit.validationWhLeistungForm.instance.validate();
    if (!isValidaton.isValid
      || !data.datumVon
      || ((new Date(data.datumVon) < this.minDate))
      || ((new Date(data.datumVon) > this.maxDate))
      || (data.datumBis && (new Date(data.datumVon) > new Date(data.datumBis)))
      || !data.gemeindeCode
    ) {
      this.showHideRemainingMessage(true, this.translateService.instant('I001WhLeistung.Message.InValidFormData'));
      return false;
    }
    return true;
  }

  showHideRemainingMessage(status, message) {
    if (status) {
      this.remainingMessage.showMessage(message);
    } else {
      this.remainingMessage.hideMessage();
    }
  }

  onCopyTitle() {
    let text;
    if (this.isShiftKeyDown) {
      text = this.idPerson + '';
    } else {
      text = this.person.titleText;
    }
    copyElement(text);
  }

  // type = 1. show yes no
  // type = 2. show yes
  // type = 3. show no
  // type = 4. hide all button
  // type = 5. custom button
  showPopup(message, type) {
    this.confirmDialogData.isVisibleNo = true;
    this.confirmDialogData.isVisibleYes = true;
    this.confirmDialogData.message = message;
    this.confirmDialogData.title = this.translateService.instant('I001WhLeistung.Title.TitlePopup');
    if (type === 1 ) {
      this.confirmDialogData.isVisibleNo = true;
      this.confirmDialogData.isVisibleYes = true;
    } else if (type === 2 ) {
      this.confirmDialogData.isVisibleNo = false;
      this.confirmDialogData.isVisibleYes = true;
    } else if (type === 3 ) {
      this.confirmDialogData.isVisibleNo = true;
      this.confirmDialogData.isVisibleYes = false;
    } else if (type === 4 ) {
      this.confirmDialogData.isVisibleNo = false;
      this.confirmDialogData.isVisibleYes = false;
      this.confirmDialogData.title = this.translateService.instant('I001WhLeistung.Message.Information');
    } else if (type === 5) {
      this.confirmDialogData.isVisibleNo = true;
      this.confirmDialogData.isVisibleYes = true;
    }
    if (type === 5) {
      this.confirmDialogData.textYes = this.translateService.instant('I001WhLeistung.Button.Discard');
      this.confirmDialogData.textNo = this.translateService.instant('I001WhLeistung.Button.Abbrechen');
    } else {
      this.confirmDialogData.textYes = this.translateService.instant('I001WhLeistung.Button.Ja');
      this.confirmDialogData.textNo = this.translateService.instant('I001WhLeistung.Button.Nein');
    }
    this.confirmDialogData.funcYes = () => this.buttonClicked('yes');
    this.confirmDialogData.funcNo = () => this.buttonClicked('no');
    this.confirmDialogData.funcHiding = () => this.buttonClicked('no');
    this.confirmDialogData.isVisible = true;
  }

  initPopUpModel() {
   this.confirmDialogData = {
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
  }

  buttonClicked(event)  {
    if (event === 'yes') {
      if (this.isUpdateConfirm) {
        this.isConfirmYes = true;
        this.topFaLeistungValueSave.IsConfirmYes = this.isConfirmYes;
        this.whLeistungSandbox.updateDataWhLeistung(this.topFaLeistungValueSave);
      } else if (this.isEdit) {
        this.cancelEditData();
      } else if (this.isDelete) {
        this.remove();
      }
      this.confirmDialogData.isVisible = false;
      this.navigateAwaySelection$.next(true);
    } else {
      if (this.onHasPenden) {
        this.onHasPenden = false;
        this.onUpdateVor();
      }
      this.isError = false;
      this.confirmDialogData.isVisible = false;
      this.navigateAwaySelection$.next(false);
    }
  }

  private registerEvents() {
    this.subscriptionList.add(this.translateService.onLangChange.subscribe(event => this.formList.setColumnCaptions()));

    this.subscriptionList.add(
      this.tabModuleFallbearbeitungSandbox.getPersonInfoTitel$.subscribe(person => {
        if (isNullOrUndefined(person) || person.status) {
          return;
        }
        this.person = person;
        if (this.person) {
          const titleHeaderLabel = (this.isEmptySozialhilfe) ? '' : SozialhilfeConstant.TITLENAVIGATOR;
          this.titleHeader = this.person.titleText + titleHeaderLabel;
        }
      })
    );

    this.subscriptionList.add(
      this.sozialhilfeTreeSandbox.createSozialhilfe$.subscribe(data => {
        if (data && data.baPersonId) {
          this.isCreateNewSosizlhife = true;
        } else {
          this.isEdit = false;
          this.isCreateNewSosizlhife = false;
        }
      })
    );
    // Register subscribe for faLeistungID
    this.subscriptionList.add(
      this.sozialhilfeTreeSandbox.selectedNode$.subscribe(selectedNode => {
        setTimeout(() => {
          if (!isNullOrUndefined(selectedNode)) {
            this.clearAllData();
            this.setEditMask(selectedNode);
            this.isEmptySozialhilfe = selectedNode.isEmptySozialhilfe;
            this.idPerson = selectedNode.baPersonID;
            this.faLeistungId = selectedNode.faLeistungID;
            if (this.person) {
              const titleHeaderLabel = (this.isEmptySozialhilfe) ? '' : SozialhilfeConstant.TITLENAVIGATOR;
              this.titleHeader = this.person.titleText + titleHeaderLabel;
            }
            if (!this.faLeistungId) {
              return;
            }
            this.getDataCombobox();
            this.getDataTop();
            this.loadGridBottomData();
          }
        }, 300);
      })
    );

    //  Register subscribe for cbx Grund
    this.subscriptionList.add(this.whLeistungSandbox.comBoBoxData$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.nameCombobox = data;
        this.nameCombobox.unshift(new ResultValue());
      }
    }));

    // Register subscribe for Cbx BFS
    this.subscriptionList.add(this.whLeistungSandbox.comBoBoxDataBFS$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.nameComboboxBFS = data;
        this.nameComboboxBFS.unshift(new ResultValue());
      }
    }));

    // Register subscribe for Cbx Geme
    this.subscriptionList.add(this.whLeistungSandbox.comBoBoxDataGeme$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.nameComboboxGeme = data;
        this.nameComboboxGeme.unshift(new ResultValue());
      }
    }));

    // Register subscribe for Cbx Bottom
    this.subscriptionList.add(this.whLeistungSandbox.comBoBoxDataBottom$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.nameComboboxBottom = filter(data, item => item.isActive !== false);
        this.nameComboboxBottom.unshift(new ResultValue());
      }
    }));

    // Register subscribe for  Top data
    this.subscriptionList.add(this.whLeistungSandbox.loadTopdata$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.formData = data;
        this.leiOrigDatumBis = this.formData.datumBis;
        this.isConfirmYes = false;
        this.isUpdateConfirm = false;
        this.whLeistungSandbox.getVorsaldoKbKostenstelleID(data.kbKostenstelleID);
        if (this.isConcurrency) {
          this.isConcurrency = false;
        } else {
          this.resetStatusWhenUpdateComplete();
        }
        if (this.isCreateNewSosizlhife) {
          this.update();
        }
      }
    }));

    // Register subscribe for Load Bottom Grid
    this.subscriptionList.add(this.whLeistungSandbox.loadGridBottomdata$.subscribe(data => {
      if (!isNullOrUndefined(data) && data.length > 0) {
        this.dataGridBottom = data;
        this.selectedKeys = [data[0].bgFinanzplanID];
      }
    }));

    // Register subscribe for Count Data
    this.subscriptionList.add(this.whLeistungSandbox.countWhLeistungdata$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
      }
    }));

    // Register subscribe for Update
    this.subscriptionList.add(this.whLeistungSandbox.updateWhLeistungdata$.subscribe(data => {
      if (isNullOrUndefined(data)) {
        return;
      }
      if (data.status) {
        this.errorHandler(data);
        return;
      }

      this.leiOrigDatumBis = data.LeiOrigDatumBis;
      this.sozialhilfeTreeSandbox.changeTreeNodeUpdateState(true);
      if (data.infoAfterReactivation) {
        this.whLeistungSandbox.getMLMessage(this.getMLMessageQuery('CtlWhLeistung', 'WhASVAnmeldungAnpassen', 'Die ASV-Anmeldung muss angepasst werden.'));
      }
      this.getTreeViewItems();
      this.getDataTop();
    }));

    // Register subscribe for Update Vorsaldo
    this.subscriptionList.add(this.whLeistungSandbox.updateVorsaldoWhLeistungdata$.subscribe(data => {
      if (data) {
        this.whLeistungSandbox.updateDataWhLeistung(this.createItemToSave(data));
      }
    }));

    // Register subscribe for getAnzahlOffenePendenzen
    this.subscriptionList.add(this.whLeistungSandbox.getAnzahlOffenePendenzen$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        if (data.Count > 0 && !isNullOrUndefined(this.formData.datumBis)) {
          this.onHasPenden = true;
          this.showHideRemainingMessage(true, this.translateService.instant('I001WhLeistung.Message.MessageErrorPendenzen'));
        } else {
          this.onHasPenden = false;
          this.onUpdateVor();
        }
      }
    }));
    // Register subscribe for VorsaldoKbKostenstelleID
    this.subscriptionList.add(this.whLeistungSandbox.getVorsaldoKbKostenstelleIdData$.subscribe(data => {
      if (data && data.length > 0) {
        this.kbKostenstelleTS = data[0].KbKostenstelleTS;
      }
    }));
    this.subscriptionList.add(
      this.whLeistungSandbox.getMLMessage$.subscribe(data => {
        if (data && data.message) {
          this.showPopup(data.message, 4);
        }
      }));
  }

  clearAllData() {
    this.whLeistungSandbox.resetState();
    this.formData = new TopFaLeistungValue();
    this.dataGridBottom = [];
    this.faLeistungId = undefined;
    this.titleHeader = '';
  }

  resetStatusWhenUpdateComplete() {
    this.isReadOnly = true;
    this.isEdit = false;
    this.isError = false;
    this.customizeBtn[0].visible = true;
    this.customizeBtn[1].visible = false;
    this.customizeBtn[2].visible = false;
    this.customizeBtn[0].disabled = false;
    this.customizeBtn[1].disabled = false;
    this.customizeBtn[2].disabled = false;
    this.customizeBtn[3].visible = true;
    this.customizeBtn = [...this.customizeBtn];
    this.visibleListBtnNavigator(this.isReadOnly);
    this.isAddNew = false;
    this.sozialhilfeTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
  }

  getDataCombobox() {
    const nameCombobox = 'Eroeffnungsgrund';
    const nameComboboxBfs = 'Leistungsart';
    const nameComboboxGeme = 'GemeindeSozialdienst';
    const nameComboboxBottom = 'AbschlussHauptGrund';
    this.whLeistungSandbox.getDataComboboxBottom(nameComboboxBottom);
    this.whLeistungSandbox.getDataComboboxGeme(nameComboboxGeme);
    this.whLeistungSandbox.getDataComboboxBFS(nameComboboxBfs);
    this.whLeistungSandbox.getDataCombobox(nameCombobox);
  }

  getDataTop() {
    this.whLeistungSandbox.getDataTop(this.faLeistungId);
  }

  loadGridBottomData() {
    this.whLeistungSandbox.getDataBottomGrid(this.faLeistungId);
    this.whLeistungSandbox.countDataWhLeistung(this.faLeistungId);
  }

  errorHandler(response) {
    const body = JSON.parse(response._body);
    switch (response.status) {
      case AppEnums.StatusCode.BAD_REQUEST:
      if (body.errorDetails && body.errorDetails.length > 0) {
        this.showHideRemainingMessage(true, JSON.parse(response._body).message);
      } else {
        this.isUpdateConfirm = true;
        this.showPopup(JSON.parse(response._body).message, 1);
      }
      break;
      case AppEnums.StatusCode.INTERNAL_SERVER_ERROR:
        if (body.errorDetails && body.errorDetails.length > 0) {
          this.showHideRemainingMessage(true, JSON.parse(response._body).message);
          // TO DO: hanlder ERROR
          return;
        }
        break;
      case AppEnums.StatusCode.NOT_FOUND:
        let message = '';
        if (this.isDelete) {
          this.isDelete = false;
          message = this.translateService.instant('SozialhilfeTree.NotFoundDelete');
        } else {
          message = this.translateService.instant('SozialhilfeTree.NotFoundUpdate');
        }
        this.showHideRemainingMessage(true, message);
        break;
      case AppEnums.StatusCode.CONCURRENCY:
        this.conPopupVisible = true;
        this.isConcurrency = true;
        // TO DO: hanlder CONCURRENCY
        break;
      default:
        break;
    }
  }

  onConNo() {
    this.conPopupVisible = false;
    this.customizeBtn[0].disabled = false;
    this.customizeBtn[1].disabled = true;
    this.customizeBtn[2].disabled = false;
    this.customizeBtn = [ ... this.customizeBtn];
  }

  onConYes() {
    this.conPopupVisible = false;
    this.getDataTop();
  }


  getMLMessageQuery(maskName: string, messageName: string, defaultText: string, params?: string) {
    return {
      maskName: maskName,
      messageName: messageName,
      defaultText: defaultText,
      parameters: params
    };
  }

  @HostListener('document:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    this.isShiftKeyDown = false;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: any) {
    if ((event.shiftKey || event.metaKey)) {
      this.isShiftKeyDown = true;
      return;
    }
    // Ctrl Z
    if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyZ) {
      event.preventDefault();
        this.doCancel();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyS) {
      event.preventDefault();
        this.doSaveOrUpdateData();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyM) {
      event.preventDefault();
        this.confirmRemove();
      return;
    }
  }

  private isFormEdited() {
    return !this.isMatchObject(this.formData, this.formDataTemplate);
  }

  isMatchObject(object: any, objectCompare: any): boolean {
    return JSON.stringify(object) === JSON.stringify(objectCompare);
  }

  createItemToSave(data) {
    this.topFaLeistungValueSave = {
      GemeindeCode: this.formData.gemeindeCode,
      LeistungsartCode: this.formData.leistungsartCode,
      EroeffnungsGrundCode: this.formData.eroeffnungsGrundCode,
      AbschlussGrundCode: this.formData.abschlussGrundCode,
      DatumVon: this.datePipe.transform(this.formData.datumVon, CommonConstant.DATE_FORMAT.yyyy_MM_dd),
      DatumBis: this.datePipe.transform(this.formData.datumBis, CommonConstant.DATE_FORMAT.yyyy_MM_dd),
      Bemerkung: this.formData.bemerkung ? this.formData.bemerkung.trim() : null,
      FaLeistungID: this.formData.faLeistungID,
      FaLeistungTS: this.formData.faLeistungTS,
      ModulID: this.formData.modulID,
      FaProzessCode: this.formData.faProzessCode,
      FaFallID: this.formData.faFallID,
      BgFinanzplanID: this.formList.selectedKeys.length > 0 ? this.formList.selectedKeys[0] : null,
      LeiOrigDatumBis: this.leiOrigDatumBis,
      KbKostenstelleID: data.kbKostenstelleID,
      KbKostenstelleTS: data.kbKostenstelleTS,
      IsConfirmInfo: true,
      IsConfirmYes: this.isConfirmYes,
    };
    return this.topFaLeistungValueSave;
  }

  visibleListBtnNavigator(status: boolean) {
    if (status) {
      this.listBtn[0][0]['visible'] = true;
      this.listBtn[0][1]['visible'] = true;
      this.listBtn[0][2]['visible'] = false;
      this.listBtn[1][0]['visible'] = false;
      this.listBtn[1][1]['visible'] = false;
      this.listBtn[1][2]['visible'] = false;
      this.listBtn[1][3]['visible'] = false;
      this.listBtn[1][4]['visible'] = false;
      this.listBtn[1][5]['visible'] = false;
      this.listBtn[1][6]['visible'] = false;
      this.listBtn[1][7]['visible'] = false;
      this.listBtn[1][8]['visible'] = false;
    } else {
      this.listBtn[0][0]['visible'] = false;
      this.listBtn[0][1]['visible'] = false;
      this.listBtn[0][2]['visible'] = false;
      this.listBtn[1][0]['visible'] = false;
      this.listBtn[1][1]['visible'] = false;
      this.listBtn[1][2]['visible'] = false;
      this.listBtn[1][3]['visible'] = false;
      this.listBtn[1][4]['visible'] = false;
      this.listBtn[1][5]['visible'] = false;
      this.listBtn[1][6]['visible'] = false;
      this.listBtn[1][7]['visible'] = false;
      this.listBtn[1][8]['visible'] = false;
    }
    this.listBtn = [...this.listBtn];
  }

  setEditMask(selectedNode) {
    if (selectedNode.editMask === 'R' || selectedNode.editMask === 'RU') {
      this.isSxMode = true;
    } else {
      this.isSxMode = false;
    }
    this.customizeBtn[3].disabled = this.isSxMode;
  }
}
