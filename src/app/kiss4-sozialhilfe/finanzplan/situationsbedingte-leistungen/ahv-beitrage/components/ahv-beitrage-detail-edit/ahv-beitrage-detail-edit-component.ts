import 'devextreme-intl';

import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { UtilService } from '@shared/utilites/utility.service';
import { Subscription } from 'rxjs';
import { isClearNumberBox, isSelectedAll, getLanguageCodeFromLocalStorage } from '@shared/utilites/utilityHelpers';
import {
  DxDateBoxComponent,
  DxDropDownBoxComponent,
  DxFormComponent,
  DxSelectBoxComponent,
  DxTextAreaComponent,
  DxValidationGroupComponent,
  DxValidatorComponent,
} from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { isNullOrUndefined } from 'util';
import {
  InstitutionSuchenWh
} from '../../models';

import { AhvBeitrageSandbox } from '../../ahv-beitrage.sandbox';

@Component({
  selector: 'kiss-ahv-beitrage-detail-edit',
  templateUrl: './ahv-beitrage-detail-edit-component.html',
  styleUrls: ['./ahv-beitrage-detail-edit-component.scss']
})
@SetClassRight('CtlAhvBeitrage')
export class FormDetailEditComponent  extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() ahvBetrageDetailEmit: any;
  @Input() listSqlQueryShPositionTypEmit: any;
  @Input() sizeQualifier: number;
  @Input() numberFormat: string;
  @Input() valueMaxValidateBetrag: any;
  @Input() valueMinValidateBetrag: any;
  @Input() maxDate: any;
  @Input() minDate: any;
  @Input() showDateVon: any;
  @Input() msgValidateDateErr: any;
  @Input() handleKeyboardEventEmit: any;
  @Input() isShow: any;
  @Input() isBgSilTherapieEntzug: any;
  @Input() BgSilAHVBeitragEmit: any;
  @Input() expandDetail: boolean;

  @Output() focusIn = new EventEmitter();
  @Output() focusOut = new EventEmitter();
  @Output() keyDownSelectOption = new EventEmitter();
  @Output() itemDropdownClick = new EventEmitter();
  @Output() changeData = new EventEmitter();
  @Output() keyDownAdd = new EventEmitter();
  @Output() dataGridInstitutionClick = new EventEmitter();

  @ViewChild('validationAhvBeitrage') validationAhvBeitrage: DxValidationGroupComponent;
  @ViewChild('datumVon') datumVon: DxDateBoxComponent;
  @ViewChild('datumBis') datumBis: DxDateBoxComponent;
  @ViewChild('betrag') betrag: any;
  @ViewChild('la') la: DxSelectBoxComponent;
  @ViewChild('person') person: DxSelectBoxComponent;
  @ViewChild('institution') institution: DxDropDownBoxComponent;
  @ViewChild('validatorBis') validatorBis: DxValidatorComponent;
  @ViewChild('validatorVon') validatorVon: DxValidatorComponent;
  @ViewChild('validationLA') validationLA: DxValidatorComponent;
  @ViewChild('detailAhvBeitrageForm') detailAhvBeitrageForm: DxFormComponent;
  @ViewChild('bemerkung') bemerkung: DxTextAreaComponent;

  private subscriptions: Subscription = new Subscription();

  listAhvInstitutionSuchenWh: InstitutionSuchenWh[] = [];
  ahvBeitragPositionDetail: any;
  listSqlQueryShPositionTyp: any = [];
  isgridInstitution: false;
  nameFocus: string;
  maxDateValue: any;
  minDateValue: any;
  isShowStatus: boolean;
  bgSilAHVBeitrag: any;
  isBgSilTherapieEntzugStatus: boolean;
  isFristLoad = false;
  validationType: any;
  isOpenLa = false;
  isOpenBetrag = false;
  isOpenDateVon = false;
  isOpenDateBis = false;
  isOpenInstiution = false;
  dateFormat = CommonConstant.FORMAT_DATE;
  columnsDef = [
    { dataField: 'institution', caption : this.translateService.instant('AhvBeitrage.Detail.Institution')},
    { dataField: 'adresse', caption: this.translateService.instant('AhvBeitrage.Detail.Andresse')},
    { dataField: 'typen', caption: this.translateService.instant('AhvBeitrage.Detail.Typen') }
  ];
  sumaries = [
    { column: 'institution', summaryType: 'count', displayFormat : this.translateService.instant('AhvBeitrage.Detail.AnzahlDatenstze')}
  ];
  baInstitutionID: number;
  constructor(injector: Injector, public translateService: TranslateService,
    public ahvBeitragesSandbox: AhvBeitrageSandbox, public utilService: UtilService, private datePipe: DatePipe, public router: Router,
  ) {
    super(injector);
    locale(getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    this.registerEvents();
  }

  registerEvents() {
    this.subscriptions.add(this.ahvBeitragesSandbox.ahvInstitutionSuchenWh$.subscribe(dataExport => {
      if (!isNullOrUndefined(dataExport)) {
        this.listAhvInstitutionSuchenWh = dataExport;
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(changes.listSqlQueryShPositionTypEmit) && !isNullOrUndefined(changes.listSqlQueryShPositionTypEmit.currentValue)) {
      this.listSqlQueryShPositionTyp = changes.listSqlQueryShPositionTypEmit.currentValue;
    }
    if (!isNullOrUndefined(changes.ahvBetrageDetailEmit) && !isNullOrUndefined(changes.ahvBetrageDetailEmit.currentValue)) {
      this.resetValitaion();
      this.ahvBeitragPositionDetail = { ... changes.ahvBetrageDetailEmit.currentValue};
    }
    if (!isNullOrUndefined(changes.maxDate) && !isNullOrUndefined(changes.maxDate.currentValue)) {
      this.maxDateValue = changes.maxDate.currentValue;
    }
    if (!isNullOrUndefined(changes.minDate) && !isNullOrUndefined(changes.minDate.currentValue)) {
      this.minDateValue = changes.minDate.currentValue;
    }
    if (!isNullOrUndefined(changes.isBgSilTherapieEntzug) && !isNullOrUndefined(changes.isBgSilTherapieEntzug.currentValue)) {
      this.isBgSilTherapieEntzugStatus = changes.isBgSilTherapieEntzug.currentValue;
      if (this.isBgSilTherapieEntzugStatus) {
        this.validationType = 'required';
      } else {
        this.validationType = undefined;
      }
    }
    if (!isNullOrUndefined(changes.BgSilAHVBeitragEmit) && !isNullOrUndefined(changes.BgSilAHVBeitragEmit.currentValue)) {
      this.bgSilAHVBeitrag = changes.BgSilAHVBeitragEmit.currentValue;
    }
    if (!isNullOrUndefined(changes.isShow) && !isNullOrUndefined(changes.isShow.currentValue)) {
      if (changes.isShow.currentValue) {
        setTimeout(() => this.person.instance.focus(), CommonConstant.SetTimeOut300);
      }
    }
  }

  resetValitaion() {
    this.isOpenLa = false;
    this.isOpenBetrag = false;
    this.isOpenDateVon = false;
    this.isOpenDateBis = false;
    this.isOpenInstiution = false;
    this.isFristLoad = false;
  }

  activeValitaion() {
    this.isOpenLa = true;
    this.isOpenBetrag = true;
    this.isOpenDateVon = true;
    if (this.isBgSilTherapieEntzugStatus) {
      this.isOpenInstiution = true;
      this.isOpenDateBis = true;
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(e: any) {
    if ((e.keyCode === AppEnums.KeyCode.KeyF4)) {
      if (isNullOrUndefined(this.nameFocus)) {
        return;
      }
      if (this[this.nameFocus].opened) {
        this[this.nameFocus].instance.close();
      } else {
        this[this.nameFocus].instance.open();
      }
      return;
    }
  }

  validationBisDate = (data) => {
    if (!data.value) {
      return true;
    }
    return new Date(this.ahvBeitragPositionDetail.datumVon) <= new Date(data.value);
  }

  closedSelectBox() {
    this.isOpenLa = true;
  }

  validationDateVon = (data) => {
    if (!data.value && this.bgSilAHVBeitrag.bgBewilligungStatusCode < 5 ) {
      if (this.isBgSilTherapieEntzug) {
        return false;
      }
      return true;
    }
    if (new Date(this.minDate) <= new Date(data.value) && new Date(data.value) <= new Date(this.maxDate)) {
      return true;
    } else {
      return false;
    }
  }

  validationBetrag = (data) => {
    return data.value > 0;
  }

  onFocusIn($e, field) {
    this.nameFocus = field;
    this.focusIn.emit({$e, field});
  }

  onKeyDownAdd (e) {
  }

  isBackSpacePressed(event) {
    if (event.event.keyCode === AppEnums.KeyCode.BackSpace || event.event.keyCode === AppEnums.KeyCode.Delete) {
        return event.event.keyCode;
    }
  }
  onNumberboxKeyDown(event, fieldName) {
      if (this.isBackSpacePressed(event) && isSelectedAll(event)) {
        this.ahvBeitragPositionDetail[fieldName] = null;
      }
  }

  onKeyDown(e, field) {
    if (isClearNumberBox(e)) {
      this.ahvBeitragPositionDetail[field] = 0;
      setTimeout(() => {
          this.ahvBeitragPositionDetail[field] = null;
      });
    }
  }

  onFocusOut($e, field) {
    if (field === 'datumVon') {
      this.validatorVon.instance.validate()
    }
    this.nameFocus = '';
    this.focusOut.emit({$e, field});
  }

  onChangeData($e, field) {
    if (field === 'betrag') {
      this.isOpenBetrag = true;
    }
    if (field === 'datumVon') {
      this.isOpenDateVon = true;
    }
    if (field === 'datumBis') {
      this.isOpenDateBis = true;
    }
    if (field === 'datumBis') {
      this.isOpenDateBis = true;
    }
    if (field === 'baInstitutionID') {
      if (!$e.value) {
        const institution = $e.value;
        const id = $e.value;
        this.dataGridInstitutionClick.emit({institution, id});
      }
      return;
    }

    this.changeData.emit({$e, field});
  }

  onKeyDownSelectOption($e, field) {
    this.keyDownSelectOption.emit({$e, field});
  }

  ondDataGridInstitutionClick(id) {
    const institutionItem = this.listAhvInstitutionSuchenWh.find(x => x.id === id);
    this.dataGridInstitutionClick.emit(institutionItem);
    this.isgridInstitution = false;
  }

  onItemDropdownClick($e, field) {
    this.itemDropdownClick.emit({$e, field});
  }

  ngAfterViewInit() {
  }
}


