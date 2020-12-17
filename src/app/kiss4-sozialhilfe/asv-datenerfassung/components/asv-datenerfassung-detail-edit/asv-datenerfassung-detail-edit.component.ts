import {
  AfterViewInit,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxDateBoxComponent, DxSelectBoxComponent, DxValidationGroupComponent } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { isFunction } from 'lodash-es';
import * as moment from 'moment';

import { AsvDatenerfassung, ModelQueryInsert, ModelQueryUpdate } from '../../models';

@Component({
  selector: 'app-asv-datenerfassung-detail-edit',
  templateUrl: './asv-datenerfassung-detail-edit.component.html',
  styleUrls: ['./asv-datenerfassung-detail-edit.component.scss']
})
@SetClassRight('CtlWhASVSErfassung')
export class AsvDatenerfassungDetailditComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('datebox') datebox: DxDateBoxComponent;
  @ViewChild('validationGroupDetails') validationGroupDetails: DxValidationGroupComponent;
  @ViewChild('selectBox') selectBox: DxSelectBoxComponent;
  @ViewChild('datumbis') datumbis: DxDateBoxComponent;
  @Input() asvDetailData = new AsvDatenerfassung();
  @Input() asvComboboxData: any;
  @Input() isAddNew: boolean;
  @Input() keyAction: string;
  @Output() btnGeloschterDatensatzClick: EventEmitter<any> = new EventEmitter();
  @Output() btnDocumentClick: EventEmitter<any> = new EventEmitter();
  @Output() btnSaveClick: EventEmitter<any> = new EventEmitter();
  @Output() btnCancelClick: EventEmitter<any> = new EventEmitter();
  @Output() btnDeleteClick: EventEmitter<any> = new EventEmitter();
  @Output() btnCopyClick: EventEmitter<any> = new EventEmitter();
  isExpand = true;
  field: string;
  messageValidationDatumBis: string;
  messageValidationDatumVon: string;
  CommonBtn = [...CommonConstant.AdditionalButtons];
  modelQueryInsert = new ModelQueryInsert();
  modelQueryUpdate = new ModelQueryUpdate();
  isDirty = false;
  customizeBtn = [
    {
      text: 'AsvDatenerfassung.Button.EintragKopieren',
      visible: true,
      name: 'copy',
      type: 'default',
      disabled: undefined,
      callback: () => this.onCopy()
    },
    {
      text: 'AsvDatenerfassung.Button.Speichern',
      visible: true,
      disabled: undefined,
      name: 'speichern',
      icon: 'save',
      type: 'default',
      callback: () => this.onSpeichern()
    },
    {
      text: 'AsvDatenerfassung.Button.Cancel',
      visible: true,
      name: 'cancel',
      icon: 'close',
      type: 'default',
      callback: () => this.onCancel()
    },
    {
      text: 'AsvDatenerfassung.Button.Delete',
      visible: true,
      disabled: undefined,
      locateInMenu: 'always',
      name: 'loschen',
      callback: () => this.onLoschen()
    }
  ];
  dateFormat = CommonConstant.FORMAT_DATE;
  //#region "Declare variables for another bussiness"
  minDate = new Date(1753, 0, 1);
  maxDate = new Date(9999, 11, 31);
  accessKeyItemFocused = 0;
  maxLengthBemerkung = CommonConstant.STRING_MAX_LENGTH_2000;
  objKey = {
    key1: 1,
    key2: 2,
    key3: 3,
    key4: 4,
    copy: 'copy'
  };
  //#endregion
  constructor(
    injector: Injector,
    public translateService: TranslateService
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
    this.validationCallback = this.validationCallback.bind(this);
    this.validationDatumVon = this.validationDatumVon.bind(this);
  }

  ngOnInit() {
    this.asvDetailData = new AsvDatenerfassung(this.isAddNew ? null : this.asvDetailData);
    if (this.isAddNew) {
      this.asvDetailData.Widerrufen = false;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.datebox.instance.focus();
    });
  }
  //#region "Businness, load data for combox..."
  ngOnDestroy() {
  }

  //#endregion
  onKeyDown(e) {
    if ((e.event.keyCode === AppEnums.KeyCode.KeyF4)) {
      if (!e.component.option('opened')) {
        e.event.preventDefault();
        e.component.open();
        return;
      }
      e.event.preventDefault();
      e.component.close();
      return;
    }
  }

  changeCollapseFormContent(event) {
    if (event.target.textContent === this.translateService.instant('FaAktennotizDetails.TitleDetail')) {
      this.isExpand = !this.isExpand;
    }
  }
  toolBarOnItemClick(event) {
    return isFunction(event.callback) && event.callback();
  }
  onSpeichern() {
    this.btnSaveClick.emit();
  }

  onCancel() {
    this.btnCancelClick.emit();
  }

  onCopy() {
    this.btnCopyClick.emit();
  }

  onLoschen() {
    if (this.customizeBtn[3].disabled) {
      return;
    }
    this.btnDeleteClick.emit(this.asvDetailData);
  }
  getModelQueryInsert() {
    this.modelQueryInsert = {
      FaLeistungID: this.asvDetailData.FaLeistungID,
      BaPersonID: this.asvDetailData.BaPersonID,
      DatumVon: moment(this.asvDetailData.DatumVon).format(CommonConstant.FORMAT_DATE_MM_DD_YYYY),
      DatumBis: this.asvDetailData.DatumBis ? moment(this.asvDetailData.DatumBis).format(CommonConstant.FORMAT_DATE_MM_DD_YYYY) : null,
      LeistungAb: this.asvDetailData.LeistungAb ? moment(this.asvDetailData.LeistungAb).format(CommonConstant.DATE_FORMAT.MM_dd_yyyy) : null,
      Widerruf: this.asvDetailData.Widerrufen ? this.asvDetailData.LeistungAb : false,
      AsvseintragStatusCode: 2,
      Bemerkung: this.asvDetailData.Bemerkung ? this.asvDetailData.Bemerkung.trim() : '',
    };
  }

  getModelQuerUpdate(FaLeistungID) {
    this.modelQueryUpdate = {
      BaPersonId: this.asvDetailData.BaPersonID,
      DatumVon: moment(this.asvDetailData.DatumVon).format(CommonConstant.FORMAT_DATE_MM_DD_YYYY),
      DatumBis: this.asvDetailData.DatumBis ? moment(this.asvDetailData.DatumBis).format(CommonConstant.FORMAT_DATE_MM_DD_YYYY) : null,
      LeistungAb: this.asvDetailData.LeistungAb ? this.asvDetailData.LeistungAb : null,
      Widerruf: this.asvDetailData.Widerrufen ? this.asvDetailData.Widerrufen : false,
      AsvseintragStatusCode: this.asvDetailData.ASVSEintragStatusCode,
      Bemerkung: this.asvDetailData.Bemerkung ? this.asvDetailData.Bemerkung.toString().trim() : '',
      WhAsvseintragId: this.asvDetailData.WhASVSEintragID,
      WhAsvseintragTs: this.asvDetailData.WhASVSEintragTS,
      FaleistungId: FaLeistungID
    };
  }
  public validateForm(): boolean {
    if (!this.validationGroupDetails.instance) {
      return true;
    }
    return this.validationGroupDetails.instance.validate().isValid;
  }

  validationCallback($event) {
    if (!this.asvDetailData || !$event.value) {
      return true;
    }

    if (new Date($event.value) < CommonConstant.MIN_DATE) {
      this.messageValidationDatumBis = this.translateService.instant('AsvDatenerfassung.MessageError.DateOutOfRange');
      return false;
    }

    const year = new Date(moment($event.value).format(CommonConstant.FORMAT_DATE_MM_DD_YYYY)).getFullYear();
    const month = new Date(moment($event.value).format(CommonConstant.FORMAT_DATE_MM_DD_YYYY)).getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();
    if (new Date($event.value).getDate() !== lastDay) {
      this.messageValidationDatumBis = this.translateService.instant('AsvDatenerfassung.MessageError.ValidateDatumbisLastDayOfMonth');
      return false;
    }
    return true;
  }

  validationDatumVon($event) {
    if (new Date($event.value) < CommonConstant.MIN_DATE) {
      this.messageValidationDatumVon = this.translateService.instant('AsvDatenerfassung.MessageError.DateOutOfRange');
      return false;
    }
    const year = new Date(moment($event.value).format(CommonConstant.FORMAT_DATE_MM_DD_YYYY)).getFullYear();
    const month = new Date(moment($event.value).format(CommonConstant.FORMAT_DATE_MM_DD_YYYY)).getMonth();
    const firstDay = new Date(year, month, 1).getDate();
    if (new Date($event.value).getDate() !== firstDay) {
      this.messageValidationDatumVon = this.translateService.instant('AsvDatenerfassung.MessageError.ValidateDatumvonFirstDayOfMonth');
      return false;
    }
    return true;
  }

  updateModelCopy(data) {
    this.asvDetailData = new AsvDatenerfassung();
    this.asvDetailData.DatumVon = data.datumVon;
    this.asvDetailData.DatumBis = data.datumBis;
    this.asvDetailData.Bemerkung = '';
    this.asvDetailData.BaPersonID = data.baPersonId;
    this.asvDetailData.Widerrufen = false;
  }

  onChangeData(e) {
    if (e !== undefined) {
      this.isDirty = true;
    }
  }

  isFormDirty(): boolean {
    return this.isDirty;
  }

  // disable when concurrency
  disableButtons(status) {
    this.changeDisabled(['speichern', 'loschen', 'copy'], status);
  }

  changeDisabled(btnNames, status) {
    this.customizeBtn = this.customizeBtn.map(btn => {
      return { ...btn, disabled: btnNames.includes(btn.name) && status };
    });
  }
}
