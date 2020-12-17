import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant } from '@shared/common/constant.common';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { getLanguageCodeFromLocalStorage, isSelectedAll } from '@shared/utilites/utilityHelpers';
import { DxValidationGroupComponent, DxFormComponent, DxNumberBoxComponent, DxButtonComponent } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { cloneDeep } from 'lodash-es';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';

import { InitData } from '../../models/speziaikonto.models';
import { SpezialkontoSandbox } from '../../speziaikonto.sandbox';
import {
  SpeziaikontoDetailEditAbzahlungskontiComponent,
} from '../speziaikonto-detail-edit-abzahlungskonti/speziaikonto-detail-edit-abzahlungskonti.component';
import {
  SpeziaikontoDetailEditAusgabekontiComponent,
} from '../speziaikonto-detail-edit-ausgabekonti/speziaikonto-detail-edit-ausgabekonti.component';
import {
  SpeziaikontoDetailEditKurzungenComponent,
} from '../speziaikonto-detail-edit-kurzungen/speziaikonto-detail-edit-kurzungen.component';
import {
  SpeziaikontoDetailEditVorabzugskontiComponent,
} from '../speziaikonto-detail-edit-vorabzugskonti/speziaikonto-detail-edit-vorabzugskonti.component';
import { SpeziaikontoConstant } from '@shared/common/speziaikonto.common';

@Component({
  selector: 'kiss-speziaikonto-detail',
  templateUrl: './speziaikonto-detail.component.html',
  styleUrls: ['./speziaikonto-detail.component.scss']
})

export class SpeziaikontoDetailComponent implements OnInit, OnChanges {
  @ViewChild('vorabzugskonti') vorabzugskonti: SpeziaikontoDetailEditVorabzugskontiComponent;
  @ViewChild('abzahlungskonti') abzahlungskonti: SpeziaikontoDetailEditAbzahlungskontiComponent;
  @ViewChild('ausgabekonti') ausgabekonti: SpeziaikontoDetailEditAusgabekontiComponent;
  @ViewChild('kurzungenEdit') kurzungenEdit: SpeziaikontoDetailEditKurzungenComponent;
  @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
  @ViewChild('numberbox') numberbox: DxNumberBoxComponent;
  @ViewChild('InkassoUbergabe') InkassoUbergabe: DxButtonComponent;
  @Input() isVorabzugskonti: boolean;
  @Input() queryVorhanden;
  @Input() queryBeglichen;
  @Input() isAbzahlungskonti: boolean;
  @Input() isAusgabekonti: boolean;
  @Input() isKurzungen: boolean;
  @Input() detailSelected;
  @Input() FaLeistung: number;
  @Input() dataSource: any;
  @Input() monat;
  @Input() dataSourceBaPerson;
  @Input() dataSourceBgKostenart;
  @Input() abzahlungskontoRueckerstattung;
  @Input() nameMonthVon: string;
  @Input() nameMonthBis: string;
  @Input() nameRueckerstattung: string;
  @Input() nameGutschrift: string;
  @Input() edtAktiv: boolean;
  @Input() bgSpezkontoTypCode: number;
  @Input() namePerson: string;
  @Input() nameBelastung: string;
  @Input() dataSourceDatumVon;
  @Input() dataSourceGutschrift;
  @Input() isCheckUserRole;
  @Input() isAbschliessenVisible;
  @Input() isVisiblePanasch;
  @Input() customizeBtn;
  @Input() isEditMode;
  @Input() maxSanktion;
  @Input() formName: string;
  @Input() isLoadEditBar;
  @Input() isDisableKurzungen;
  @Input() isDisableSalo;
  @Input() isDatumBis;
  @Output() editMode: EventEmitter<any> = new EventEmitter();
  @Output() dataValueChange: EventEmitter<boolean> = new EventEmitter();
  @Output() disableViewModelEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output() messageEmitter: EventEmitter<any> = new EventEmitter();
  @Output() hideMessageRemaining: EventEmitter<any> = new EventEmitter();
  @Output() displayButtonWithGrid: EventEmitter<any> = new EventEmitter();


  AdditionalButtons = [...CommonConstant.AdditionalButtons];
  isVisibleTitle = false;
  customizeBtnState = [
    {
      text: 'CtlSpeziaikonto.Speichern',
      visible: true,
      name: 'Speichern',
      icon: 'save',
      useSubmitBehavior: true,
      class: 'toolbar-button'
    },
    {
      text: 'CtlSpeziaikonto.Abbrechen',
      visible: true,
      name: 'Abbrechen',
      icon: 'remove',
      class: 'toolbar-button'
    },
    {
      text: 'CtlSpeziaikonto.Loschen',
      visible: true,
      useSubmitBehavior: true,
      locateInMenu: 'always',
      disabled: false,
      name: 'loschen',
    }];
  formatNumberDefault = CommonConstant.FormatNumberN2;
  customizeBtn3: any;
  listBtn = [null, this.AdditionalButtons.splice(7, 1)];
  popUpModel: PopUpModel;
  isValueChange: boolean;
  isAddOrEdit = false;
  dataObj: any;
  initDataSource: any;
  bgSpezkontoID: number;
  bgSpezkontoTS: any;
  originalSaldo: number;
  originalStartSaldo: number;
  isAbschelieUndo = false;
  isAbchelies = false;
  isBearbeiten = false;
  isKonto = true;
  initBtn: any;
  queryVorhandenCopy: boolean;
  queryBeglichenCopy: boolean;
  dataSourceCopy: any;
  isVisiblePanaschCopy: any;
  showDetailContainer = true;
  constructor(public speziaikontoSandbox: SpezialkontoSandbox, private translateService: TranslateService) {
    locale(getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    this.initPopUpModel();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(changes && changes.detailSelected)) {
      this.initDataSource = changes.detailSelected.currentValue;
    }
    if (!isNullOrUndefined(changes && changes.customizeBtn)) {
      this.customizeBtn3 = cloneDeep(this.customizeBtn);
    }
    if (!isNullOrUndefined(changes && changes.queryVorhanden) || !isNullOrUndefined(changes && changes.queryBeglichen)) {
      this.queryVorhandenCopy = cloneDeep(this.queryVorhanden);
      this.queryBeglichenCopy = cloneDeep(this.queryBeglichen);
    }
    if (!isNullOrUndefined(changes && changes.dataSource)) {
      this.dataSourceCopy = cloneDeep(this.dataSource);
    }
    if (!isNullOrUndefined(changes.isVisiblePanasch)) {
      this.isVisiblePanaschCopy = this.isVisiblePanasch;
    }
    if (this.isEditMode) {
      this.customizeBtnEditMode();
    }
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
        funcHidden: null
      }
    );
  }

  showPopup(mess, title?: string, textYes?: string, textNo?: string, isVisibleNo?: boolean, isVisibleYes?: boolean, funcYes?: any, funcNo?: any) {
    this.popUpModel.title = title;
    this.popUpModel.isVisibleNo = isVisibleNo;
    this.popUpModel.isVisibleYes = isVisibleYes;
    this.popUpModel.message = mess;
    this.popUpModel.isVisible = true;
    this.popUpModel.textYes = textYes;
    this.popUpModel.textNo = textNo;
    this.popUpModel.funcYes = funcYes;
    this.popUpModel.funcNo = funcNo;
  }

  customizeBtnViewMode() {
    this.customizeBtn = this.customizeBtn3;
    this.customizeBtn = [...this.customizeBtn];
    this.checkEditMode(this.customizeBtn);
    this.isEditMode = false;
    this.isAddOrEdit = false;
    this.isValueChange = false;
    this.disableViewModelEventEmitter.emit(true);
  }

  customizeBtnEditMode() {
    this.customizeBtn = this.customizeBtnState;
    this.customizeBtn = [...this.customizeBtn];
    this.isEditMode = true;
    this.checkEditMode(this.customizeBtn);
  }

  toolBarOnItemClick(event) {
    switch (event) {
      case SpeziaikontoConstant.ABSCHLIESSENRUCKGANGIG: {
        this.checkAbschliessenGangig();
        return;
      }
      case SpeziaikontoConstant.ABSCHLIESSEN: {
        this.checkAbschliessen();
        return;
      }
      case SpeziaikontoConstant.AUFHEBEN: {
        this.onClickButtonChangeStatus(SpeziaikontoConstant.AUFHEBEN);
        return;
      }
      case SpeziaikontoConstant.FREIGEBEN: {
        this.onClickButtonChangeStatus(SpeziaikontoConstant.FREIGEBEN);
        return;
      }
      case SpeziaikontoConstant.VORBEREITUNG: {
        this.onClickButtonChangeStatus(SpeziaikontoConstant.VORBEREITUNG);
        return;
      }
      case SpeziaikontoConstant.ADD: {
        this.loadDatumVon();
        return;
      }
      case SpeziaikontoConstant.BEARBEITEN: {
        this.doEdit();
        return;
      }
      case SpeziaikontoConstant.SPEICHERN: {
        this.doSave();
        return;
      }
      case SpeziaikontoConstant.ABBRECHEN: {
        this.doCancel();
        return;
      }
      case SpeziaikontoConstant.LOSCHEN: {
        this.doDelete();
        return;
      }
      case CommonConstant.EventClickTitle: {
        this.showDetailContainer = !this.showDetailContainer;
        return;
      }
      default:
        break;
    }
  }
  checkAbschliessenGangig(): any {
    const data = {
      'BgSpezkontoId': this.detailSelected.BgSpezkontoID,
      'AbschlussgrundCode': this.detailSelected.AbschlussgrundCode,
      'BgSpezkontoTS': this.detailSelected.BgSpezkontoTS
    };
    this.speziaikontoSandbox.loadAbschliessenUndo(data);
    // call Api
  }
  checkAbschliessen(): any {
    let message = this.translateService.instant('CtlSpeziaikonto.Message.MessageAbschliessen');
    if (!this.detailSelected.AbzahlungskontoRueckerstattungCode || !this.detailSelected.AbschlussBegruendung) {
      if (!this.detailSelected.AbzahlungskontoRueckerstattungCode) {
        message += '\r\n ' + this.translateService.instant('CtlSpeziaikonto.Message.MessageEmptyRuckerstattung');
      }
      if (!this.detailSelected.AbschlussBegruendung) {
        message += '\r\n ' + this.translateService.instant('CtlSpeziaikonto.Message.MessageEmptyAbschluss');
      }
      this.customizeBtnEditMode();
      this.disableViewModelEventEmitter.emit(false);
      this.sendMessageEmit(message);
      this.isAddOrEdit = true;
      return;
    }
    this.isVisibleTitle = true;
  }
  onShownWertErfassen() {
    this.InkassoUbergabe.instance.focus();
}
  closePopup() {
    this.isVisibleTitle = false;
  }

  clickAusgleichen() {
    this.isKonto = true;
    const data = {
      'BgSpezkontoId': this.detailSelected.BgSpezkontoID,
      'BgSpezkontoTS': this.detailSelected.BgSpezkontoTS
    };
    this.speziaikontoSandbox.loadKontoWirdNichtAusgeglichen(data);
  }
  clickOkInkasso() {
    this.isKonto = false;
    if (!this.numberbox.instance.option('isValid') || !this.detailSelected['Saldo']) {

      return;
    }
    const data = {
      'BgSpezkontoId': this.detailSelected.BgSpezkontoID,
      'FaLeistungID': this.detailSelected.FaLeistungID,
      'BgSpezkontoTS': this.detailSelected.BgSpezkontoTS,
      'Betrag': this.detailSelected.Saldo
    };
    this.speziaikontoSandbox.loadUebergabeAnInkasso(data);
  }

  loadDatumVon() {
    this.speziaikontoSandbox.loadDatumVon(this.FaLeistung);
  }

  doAdd(data: any) {
    this.customizeBtnEditMode();
    this.dataSource = [];
    this.queryVorhanden = false;
    this.queryBeglichen = false;
    this.isAddOrEdit = false;
    this.isVisiblePanasch = true;
    this.disableViewModelEventEmitter.emit(false);
    this.hideMessageRemaining.emit();
    this.disableButtons(false);

    const dataAddNewVor = new InitData({
      FaLeistungID: this.FaLeistung,
      BgSpezkontoTypCode: this.bgSpezkontoTypCode,
      NameSpezkonto: '',
      OhneEinzelzahlung: false,
      StartSaldo: 0.00,
      BetragProMonat: 100.00,
      BgPositionsartID: null,
      ErsterMonat: null,
      BgKostenartID: null,
      DatumVon: data.datumVon,
      DatumBis: null,
      Bemerkung: '',
      OldID: null,
      DatumVonJahr: data.year,
      DatumVonMonat: data.month,
      BaInstitutionID: null,
      BaPersonID: null,
      Inaktiv: false,
      KuerzungLaufzeitMonate: null,
      KuerzungAnteilGBL: null,
      AbschlussBegruendung: null,
      AbzahlungskontoRueckerstattungCode: null,
      AbschlussgrundCode: null
    });
    const dataAddNewAbz = new InitData({
      FaLeistungID: this.FaLeistung,
      BgSpezkontoTypCode: this.bgSpezkontoTypCode,
      NameSpezkonto: '',
      OhneEinzelzahlung: true,
      StartSaldo: 100.00,
      BetragProMonat: 100.00,
      BgPositionsartID: null,
      ErsterMonat: null,
      BgKostenartID: null,
      DatumVon: data.datumVon,
      DatumBis: null,
      Bemerkung: '',
      OldID: null,
      DatumVonJahr: data.year,
      DatumVonMonat: data.month,
      BaInstitutionID: null,
      BaPersonID: null,
      Inaktiv: false,
      KuerzungLaufzeitMonate: null,
      KuerzungAnteilGBL: null,
      AbschlussBegruendung: null,
      AbzahlungskontoRueckerstattungCode: null,
      AbschlussgrundCode: null
    });
    const dataAddNewAus = new InitData({
      FaLeistungID: this.FaLeistung,
      BgSpezkontoTypCode: this.bgSpezkontoTypCode,
      NameSpezkonto: '',
      OhneEinzelzahlung: false,
      StartSaldo: 0,
      BetragProMonat: null,
      BgPositionsartID: null,
      ErsterMonat: null,
      BgKostenartID: null,
      DatumVon: data.datumVon,
      DatumBis: null,
      Bemerkung: '',
      OldID: null,
      DatumVonJahr: data.year,
      DatumVonMonat: data.month,
      BaInstitutionID: null,
      BaPersonID: null,
      Inaktiv: false,
      KuerzungLaufzeitMonate: null,
      KuerzungAnteilGBL: null,
      AbschlussBegruendung: null,
      AbzahlungskontoRueckerstattungCode: null,
      AbschlussgrundCode: null
    });
    const dataAddNewKur = new InitData({
      FaLeistungID: this.FaLeistung,
      BgSpezkontoTypCode: this.bgSpezkontoTypCode,
      NameSpezkonto: '',
      OhneEinzelzahlung: false,
      StartSaldo: 0,
      BetragProMonat: null,
      BgPositionsartID: null,
      ErsterMonat: null,
      BgKostenartID: null,
      DatumVon: data.datumVon,
      DatumBis: null,
      Bemerkung: '',
      OldID: null,
      DatumVonJahr: data.year,
      DatumVonMonat: data.month,
      BaInstitutionID: null,
      BaPersonID: null,
      Inaktiv: false,
      KuerzungLaufzeitMonate: 6,
      KuerzungAnteilGBL: this.maxSanktion,
      AbschlussBegruendung: null,
      AbzahlungskontoRueckerstattungCode: null,
      AbschlussgrundCode: null
    });
    if (this.isVorabzugskonti) {
      this.detailSelected = dataAddNewVor;
      return;
    }
    if (this.isAbzahlungskonti) {
      this.detailSelected = dataAddNewAbz;
      return;
    }
    if (this.isAusgabekonti) {
      this.detailSelected = dataAddNewAus;
      return;
    }
    if (this.isKurzungen) {
      this.detailSelected = dataAddNewKur;
      return;
    }
  }

  doEdit() {
    this.customizeBtnEditMode();
    this.isVisiblePanasch = this.isVisiblePanaschCopy;
    this.queryVorhanden = this.queryVorhandenCopy;
    this.queryBeglichen = this.queryBeglichenCopy;
    this.disableViewModelEventEmitter.emit(false);
    this.isAddOrEdit = true;
    this.hideMessageRemaining.emit();
    this.disableButtons(false);
  }

  sendMessageEmit(message: string) {
    this.messageEmitter.emit(message);
  }

  doSave() {
    this.dataSource = this.dataSourceCopy;
    if (this.isVorabzugskonti) {
      if (!this.vorabzugskonti.funcCheckValidation()) {
        this.sendMessageEmit(this.translateService.instant('CtlSpeziaikonto.Message.MessageErrorValidate'));
        return;
      }
    }
    if (this.isAbzahlungskonti) {
      if (!this.abzahlungskonti.funcCheckValidation()) {
        this.sendMessageEmit(this.translateService.instant('CtlSpeziaikonto.Message.MessageErrorValidate'));
        return;
      }
    }
    if (this.isAusgabekonti) {
      if (!this.ausgabekonti.funcCheckValidation()) {
        this.sendMessageEmit(this.translateService.instant('CtlSpeziaikonto.Message.MessageErrorValidate'));
        return;
      }
    }
    if (this.isKurzungen) {
      if (!this.kurzungenEdit.funcCheckValidation()) {
        this.sendMessageEmit(this.translateService.instant('CtlSpeziaikonto.Message.MessageErrorValidate'));
        return;
      }
    }
    if (this.dataObj) {
      if (!this.isAddOrEdit) {
        if (this.dataObj['BgSpezkontoTypCode'] === SpeziaikontoConstant.ID_SPEZIAIKONTOKUZUNGEN) {
          this.queryData();
          this.disableViewModelEventEmitter.emit(true);
          this.dataValueChange.emit(false);
          this.speziaikontoSandbox.createKuzungen(this.dataObj);

          return;
        }
        this.queryData();
        this.dataValueChange.emit(false);
        this.speziaikontoSandbox.createSpeziaikonto(this.dataObj);

        return;
      }
      if (this.isAddOrEdit) {
        if (this.dataObj['BgSpezkontoTypCode'] === SpeziaikontoConstant.ID_SPEZIAIKONTOKUZUNGEN) {
          this.queryData();
          this.speziaikontoSandbox.updateKuzungen(this.dataObj);
          this.dataValueChange.emit(false);
          return;
        }
        this.queryData();
        this.speziaikontoSandbox.editSpeziaikonto(this.dataObj);
        // this.disableViewModelEventEmitter.emit(true);
        this.dataValueChange.emit(false);
      }
    }
    if (!this.isValueChange) {
      this.dataValueChange.emit(false);
      this.customizeBtnViewMode();
    }
  }

  queryData() {
    if (this.dataObj.DatumBisJahr === null || this.dataObj.DatumBisMonat === null) {
      this.dataObj.DatumBisJahr = null;
      this.dataObj.DatumBisMonat = null;
      this.dataObj.DatumBis = null;
    }
    this.dataObj.DatumVon = this.mergeDate(this.dataObj.DatumVonMonat, this.dataObj.DatumVonJahr)[0];
    if (this.dataObj.DatumBisMonat && this.dataObj.DatumBisJahr) {
      this.dataObj.DatumBis = this.mergeDate(this.dataObj.DatumBisMonat, this.dataObj.DatumBisJahr)[1];
    }
    this.dataObj.NameSpezkonto = this.dataObj.NameSpezkonto ? this.dataObj.NameSpezkonto.trim() : '';
    this.dataObj.Bemerkung = this.dataObj.Bemerkung ? this.dataObj.Bemerkung.trim() : '';
  }

  loadingData() {
    const data = {
      faLeistungID: this.FaLeistung,
      bgSpezkontoTypCode: this.bgSpezkontoTypCode,
      edtAktiv: this.edtAktiv
    };
    this.speziaikontoSandbox.loadDataGrid(data);
  }

  doCancel() {
    const message = !this.isAddOrEdit ? this.translateService.instant('CtlSpeziaikonto.Message.MessageDeleteNew') : this.translateService.instant('CtlSpeziaikonto.Message.Message');
    const funcYes = () => {
      this.popUpModel.isVisible = false;
      this.customizeBtnViewMode();
      this.detailSelected = this.initDataSource;
      this.dataSource = this.dataSourceCopy;
      this.dataValueChange.emit(false);
      this.hideMessageRemaining.emit();
      this.disableButtons(false);
    };
    const funcNo = () => {
      this.popUpModel.isVisible = false;
      this.isValueChange = true;
      this.dataValueChange.emit(true);
    };
    if (this.isValueChange) {
      this.showPopup(message,
        this.translateService.instant('CtlSpeziaikonto.Message.Title'),
        this.translateService.instant('CtlSpeziaikonto.Message.Yes'),
        this.translateService.instant('CtlSpeziaikonto.Message.No'),
        true, true, funcYes, funcNo);
      return;
    }
    this.displayButtonWithGrid.emit();
    this.customizeBtnViewMode();
    this.dataValueChange.emit(false);
    this.detailSelected = this.initDataSource;
    this.dataSource = this.dataSourceCopy;
    this.hideMessageRemaining.emit();
    this.disableButtons(false);
  }

  doDelete() {
    let btnDelete = null;
    this.customizeBtn.forEach(btn => {
      if (btn.name === 'loschen') {
        btnDelete = btn;
      }
    });
    if (btnDelete.disabled === true) {
      return;
    }
    const data = {
      'bgSpezkontoId': this.detailSelected.BgSpezkontoID,
      'bgSpezkontoTs': this.detailSelected.BgSpezkontoTS,
    };
    const message = (!this.isAddOrEdit && this.isEditMode) ? this.translateService.instant('CtlSpeziaikonto.Message.MessageDeleteNew') : this.translateService.instant('CtlSpeziaikonto.Message.MessageDelete');
    const funcYes = () => {
      if (!this.isAddOrEdit && this.isValueChange) {
        this.popUpModel.isVisible = false;
        this.customizeBtnViewMode();
        this.loadingData();
        this.dataValueChange.emit(false);
        return;
      }
      this.popUpModel.isVisible = false;
      this.speziaikontoSandbox.deleteSpeziaikonto(data);
    };
    const funcNo = () => {
      this.popUpModel.isVisible = false;
    };
    if (this.isEditMode && !this.isAddOrEdit && !this.isValueChange) {
      this.customizeBtnViewMode();
      this.dataValueChange.emit(false);
      this.loadingData();
      return;
    }
    this.showPopup(message,
      this.translateService.instant('CtlSpeziaikonto.Message.Title'),
      this.translateService.instant('CtlSpeziaikonto.Message.Yes'),
      this.translateService.instant('CtlSpeziaikonto.Message.No'),
      true, true, funcYes, funcNo);
  }

  checkEditMode(isEditMode: any[]) {
    this.editMode.emit(isEditMode);
  }

  onValueDataChange(event) {
    this.dataObj = event.dataForm;
    this.isValueChange = event.isChange;
    this.dataValueChange.emit(event.isChange);
  }

  disableButtons(status) {
    const btnDisabledNames = ['Speichern', 'loschen'];
    this.changeDisabled(btnDisabledNames, status);
  }

  changeDisabled(btnNames, status) {
    this.customizeBtn = this.customizeBtn.map(btn => {
      btn.disabled = btnNames.includes(btn.name) && status;
      return btn;
    });
  }

  mergeDate(month: number, year: number) {
    const date = moment(year + '-' + month + '-' + '01').format(CommonConstant.DATE_FORMAT.YYYY_MM_DD);
    const endDate = moment(date).endOf('month').format(CommonConstant.DATE_FORMAT.YYYY_MM_DD);
    return [date, endDate];
  }


  onChangeStatus(status: boolean) {
    if (!isNullOrUndefined(this.detailSelected)) {
      if (this.detailSelected.DatumBisJahr && (this.detailSelected.DatumBisJahr < 2000 || this.detailSelected.DatumBisJahr > 3000)) {
        this.sendMessageEmit(this.translateService.instant('CtlSpeziaikonto.Message.MessageDatumBis3001'));
        return;
      }
    }
    const objDetailSelected = { ...this.detailSelected };
    objDetailSelected.Inaktiv = status;
    this.speziaikontoSandbox.updateKuzungen(objDetailSelected);
  }

  onClickButtonChangeStatus(button: string) {
    switch (button) {
      case SpeziaikontoConstant.AUFHEBEN: {
        this.onChangeStatus(true);
        break;
      }
      case SpeziaikontoConstant.FREIGEBEN: {
        this.onChangeStatus(false);
        break;
      }
      case SpeziaikontoConstant.VORBEREITUNG: {
        this.onChangeStatus(true);
        break;
      }
      default:
        break;
    }
  }

  onKeyDownNumberBox(event) {
    if (this.isBackSpacePressed(event) && isSelectedAll(event)) {
      this.detailSelected['Saldo'] = null;
    }
  }

  isBackSpacePressed(event) {
    if (event.event.keyCode === AppEnums.KeyCode.BackSpace || event.event.keyCode === AppEnums.KeyCode.Delete) {
      return event.event.keyCode;
    }
  }
}
