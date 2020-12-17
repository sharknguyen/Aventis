import 'devextreme-intl';
import { Component, Injector, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { DxSelectBoxComponent, DxValidationGroupComponent, DxNumberBoxComponent } from 'devextreme-angular';
import { AppEnums } from '@shared/AppEnum';
import { WohnkostenConstant } from '@app/kiss4-sozialhilfe/finanzplan/wohnkosten/constant';
import { BgPosition, IFormCreateModel, FormCreateModel } from '@app/kiss4-sozialhilfe/finanzplan/wohnkosten/models';
import { DatePipe } from '@angular/common';
import { CommonConstant } from '@shared/common/constant.common';
import { isSelectedAll } from '@shared/utilites/utilityHelpers';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'kiss-wohnkosten-detail-edit',
  templateUrl: './wohnkosten-detail-edit-component.html',
  styleUrls: ['./wohnkosten-detail-edit-component.scss']
})
@SetClassRight('CtlWohnKosten')
export class FormDetailEditComponent extends BaseComponent implements OnInit {
  @Input() detailData: BgPosition;
  @Input() showZuschlagFields;
  @Input() whKennzahlenData;
  @Input() bgPositionsartData;
  @Input() finanzplanData;
  @Input() datePopupSelect;
  @Input() cloneState;
  @ViewChild('berechnungsgrundlage') berechnungsgrundlage: DxSelectBoxComponent;
  @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
  @ViewChild('betrag') betrag: DxNumberBoxComponent;
  @ViewChild('beitrag') beitrag: DxNumberBoxComponent;
  @ViewChild('nkBetrag') nkBetrag: DxNumberBoxComponent;
  @ViewChild('nkMaxBeitragSD') nkMaxBeitragSD: DxNumberBoxComponent;
  @ViewChild('perechnungsgrundlage') perechnungsgrundlage: DxSelectBoxComponent;
  @ViewChild('maxBeitragSD') maxBeitragSD: DxNumberBoxComponent;

  formData: IFormCreateModel;
  formDirty = false;
  numberBoxFormat = CommonConstant.FormatNumberN2;
  bemerkungMaxlength = WohnkostenConstant.bemerkungMaxlength;
  richtlinienTitle;
  disabledZinskostenUE = true;
  visibleRichtlinienHG = false;
  disabledRichtlinienUE = true;
  disableNebenkostenUE = false;
  dateFormat = CommonConstant.shortDateFormat;
  oldDetailData: BgPosition;
  numberMin = CommonConstant.MONEY_MIN_VALUE;
  numberMax = CommonConstant.MONEY_MAX_VALUE;
  getSizeQualifier = UtilityHelper.getSizeQualifier;

  berechnungsgrundlages = [{Text: 'Wohnkosten gem. Richtlinien bestimmen', Code: 0}, {Text: 'Wohnkosten individuell bestimmen', Code: 1}];

  constructor(
    injector: Injector,
    public translateService: TranslateService,
    public utilService: UtilService,
    public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
    public router: Router,
    private datePipe: DatePipe
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    if (this.detailData) {
      this.oldDetailData = this.detailData;
      this.handleBerechnungsgrundlage(this.detailData.Berechnungsgrundlage);
    } else {
      this.detailData = new BgPosition();
    }
    this.formData = new FormCreateModel(this.formData);
  }

  checkMaxRangeNumber (number) {
    return this.numberMin <= number && number <= this.numberMax;
  }

  onChange() {
    this.formDirty = true;
  }

  onInput() {
    this.formDirty = true;
  }

  onValueChanged(type = null) {
    if (!isNullOrUndefined(this.detailData.Betrag) && !isNullOrUndefined(this.detailData.Beitrag) && this.detailData.Betrag >= this.detailData.Beitrag
        && this.checkMaxRangeNumber(this.detailData.Betrag) && this.checkMaxRangeNumber(this.detailData.Beitrag)) {
      this.betrag.isValid = this.beitrag.isValid = true;
    }
    if (!isNullOrUndefined(this.detailData.NKBetrag) && !isNullOrUndefined(this.detailData.NKMaxBeitragSD) && this.detailData.NKBetrag >= this.detailData.NKMaxBeitragSD
    && this.checkMaxRangeNumber(this.detailData.NKMaxBeitragSD) && this.checkMaxRangeNumber(this.detailData.NKMaxBeitragSD)) {
      this.nkBetrag.isValid = this.nkMaxBeitragSD.isValid = true;
    }
    if (type === WohnkostenConstant.Wohnsituation) {
      this.formDirty = true;
    }
    if (type === WohnkostenConstant.Berechnungsgrundlage) {
      this.formDirty = true;
      this.handleBerechnungsgrundlage(this.detailData.Berechnungsgrundlage);
      setTimeout(() => {
        this.perechnungsgrundlage.instance.focus();
        this.betrag.validator.instance.validate();
        this.beitrag.validator.instance.validate();
        this.nkBetrag.validator.instance.validate();
        this.nkMaxBeitragSD.validator.instance.validate();
      });
    }
    this.reCalc(this.detailData.Berechnungsgrundlage);
  }

  roundMoney(value) {
    return Math.round(value * 2 * 10) / 20;
  }

  onKeyDown(e) {
    if (!(e.component.option('opened'))) {
      if (e.event.keyCode === AppEnums.KeyCode.KeyF4) {
        e.event.stopPropagation();
        e.component.open();
        return;
      } else {
        e.event.keyCode = null;
        e.event.which = null;
      }
    } else {
      if (e.event.keyCode === AppEnums.KeyCode.KeyF4) {
        e.event.stopPropagation();
        e.component.close();
      }
    }
  }

  handleBerechnungsgrundlage(value) {
    this.richtlinienTitle = value === 1 ? this.translateService.instant('WohnKosten.Detail.Zinskosten') : this.translateService.instant('WohnKosten.Detail.Ansatz');
    this.disabledZinskostenUE = this.visibleRichtlinienHG = this.disabledRichtlinienUE = this.disableNebenkostenUE = value !== 1;
    if (this.cloneState) {
      this.disabledRichtlinienUE = true;
    }
  }

  validationBetrag = () => {
    return this.detailData.Betrag >= this.detailData.Beitrag;
  }

  validationNKBetrag = () => {
    return this.detailData.NKMaxBeitragSD <= this.detailData.NKBetrag;
  }

  validateDataValid() {
    if (!this.betrag.isValid) {
      this.betrag.instance.focus();
      return false;
    }
    if (!this.beitrag.isValid) {
      this.beitrag.instance.focus();
      return false;
    }
    if (!this.nkBetrag.isValid) {
      this.nkBetrag.instance.focus();
      return false;
    }
    if (!this.nkMaxBeitragSD.isValid) {
      this.nkMaxBeitragSD.instance.focus();
      return false;
    }
    if (!this.maxBeitragSD.isValid) {
      this.maxBeitragSD.instance.focus();
      return false;
    }
    return true;
  }

  isBackSpacePressed(event) {
    return event.event.keyCode === AppEnums.KeyCode.BackSpace || event.event.keyCode === AppEnums.KeyCode.Delete;
  }

  onKeyDownCurrency(event, fieldName) {
    if (this.isBackSpacePressed(event) && isSelectedAll(event)) {
    this.detailData[fieldName] = null;
    }
  }

  getFormUpdateData(finanzplanData) {
    return {
      payload: {
        BgBudgetID: this.detailData.BgBudgetID,
        BgPositionID: this.detailData.BgPositionID,
        BgPositionsartID: this.detailData.BgPositionsartID,
        Betrag: this.detailData.Betrag,
        Reduktion: this.detailData.Reduktion,
        Abzug: this.detailData.Abzug,
        MaxBeitragSD: this.detailData.MaxBeitragSD,
        Bemerkung: this.detailData.Bemerkung ? this.detailData.Bemerkung.trim() : null,
        DatumBis: this.detailData.DatumBis,
        DatumVon: this.detailData.DatumVon,
        BgPositionTS: this.detailData.BgPositionTS,
      },
      Beitrag: this.detailData.Beitrag,
      NKBetrag: this.detailData.NKBetrag,
      NKMaxBeitragSD: this.detailData.NKMaxBeitragSD,
      Berechnungsgrundlage: this.detailData.Berechnungsgrundlage,
      RntHgUeFactor: this.whKennzahlenData.RntHgUeFactor,
      Wohnsituation: this.detailData.Wohnsituation,
      FinanzplanVon: finanzplanData.FinanzplanVon
    };
  }

  reCalc(value) {
    if (!this.formData) {
      return;
    }
    if (value !== 1) {
      this.detailData.MaxBeitragSD = this.roundMoney(this.detailData.WohnkostenHg * this.whKennzahlenData.RntHgUeFactor);
      if (this.detailData.Betrag !== null) {
        this.detailData.Beitrag = this.roundMoney(this.detailData.Betrag * this.whKennzahlenData.RntHgUeFactor);
      }
      if (this.detailData.NKBetrag !== null) {
        this.detailData.NKMaxBeitragSD = this.roundMoney(this.detailData.NKBetrag * this.whKennzahlenData.RntHgUeFactor);
      }
    }
    this.detailData.Angerechnet = Math.min(this.detailData.MaxBeitragSD, this.detailData.Beitrag);
    this.detailData.Unterdeckung = this.detailData.Beitrag - this.detailData.Angerechnet;
    if (this.detailData.Unterdeckung < 0) {
      this.detailData.Unterdeckung = 0;
    }
    this.detailData.Total = this.detailData.Angerechnet + this.detailData.NKMaxBeitragSD;
  }

  getFormCreateData(finanzplanData) {
    const anpassenVon = this.datePipe.transform(this.datePopupSelect.firstDate, CommonConstant.DATE_FORMAT.yyyy_MM_dd);
    return {
      payload: {
        BgPositionID: this.detailData.BgPositionID,
        BgPositionsartID: this.detailData.BgPositionsartID,
        BgBudgetID: this.detailData.BgBudgetID,
        Betrag: this.detailData.Betrag,
        Reduktion: this.detailData.Reduktion,
        Abzug: this.detailData.Abzug,
        MaxBeitragSD: this.detailData.MaxBeitragSD,
        Bemerkung: this.detailData.Bemerkung ? this.detailData.Bemerkung.trim() : null,
        DatumVon: this.detailData.DatumVon,
        DatumBis: this.detailData.DatumBis,
        BgPositionTS: this.detailData.BgPositionTS,
      },
      Beitrag: this.detailData.Beitrag,
      NKBetrag: this.detailData.NKBetrag,
      NKMaxBeitragSD: this.detailData.NKMaxBeitragSD,
      Berechnungsgrundlage: this.detailData.Berechnungsgrundlage,
      RntHgUeFactor: this.whKennzahlenData.RntHgUeFactor,
      Wohnsituation: this.detailData.Wohnsituation,
      AnpassenVon: anpassenVon,
      BgFinanzplanId: finanzplanData.BgFinanzplanID
    };
  }
}
