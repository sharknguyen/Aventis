import 'devextreme-intl';

import {
  AfterViewInit,
  Component,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxSelectBoxComponent, DxValidationGroupComponent } from 'devextreme-angular';
import DevExpress from 'devextreme/bundles/dx.all';
import { locale } from 'devextreme/localization';

@Component({
  selector: 'kiss-med-grundversorgung-detail-edit',
  templateUrl: './detail-edit-component.html',
  styleUrls: ['./detail-edit-component.scss']
})
@SetClassRight('CtlAhvBeitrage')
export class FormDetailEditComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges, CanComponentDeactivate {
  @ViewChild('person') person: DxSelectBoxComponent;
  @ViewChild('validationAhvBeitrage') validationAhvBeitrage: DxValidationGroupComponent;
  @Input() shPositionTyp;
  @Input() formData;
  @Input() baInstitution;
  @Input() columnsDef: Array<DevExpress.ui.dxDataGridColumn>;
  @Input() newForm: boolean;
  @Input() datePopupSelect;
  sizeQualifier: any;
  formWidth: number;
  numberFormat = AppEnums.Validation.C007_NUMBER_FORMAT;
  minNumber = AppEnums.Money.MIN_VALUE;
  maxNumber = AppEnums.Money.MAX_VALUE;
  numberboxSelectAll = false;

  // Fake data
  wohnsituations = [{ title: 'Mietwohnung' }, { title: 'Eigentum' }, { title: 'Untermiete' }, { title: 'Andere' }];
  berechnungsgrundlages = [{ title: 'MedGrundversorgung gem. Richtlinien bestimmen' }, { title: 'MedGrundversorgung individuell bestimmen' }];

  constructor(
    injector: Injector,
    public translateService: TranslateService,
    public utilService: UtilService,
    public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox,
    public router: Router,
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  canDeactivate() {
    return true;
  }

  ngOnInit() {
    this.formWidth = window.screen.width - 424;
  }

  ngOnChanges(changes: SimpleChanges): void { }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.person.instance.focus();
    });
  }

  onFocusIn(event, field) {

  }

  onFocusOut(event, field) {

  }

  onValueChanged(event, field) {

  }

  onKeyDown(event, field) {

  }


  getSizeQualifier(width) {
    if (width < 1300) {
      return 'xs';
    }
    return 'lg';
  }

  onFieldDataChanged(e) {

  }

  onItemFocusOut(field) {
    this.numberboxSelectAll = false;
    switch (field) {
      case 'BgPositionsartID':
        // TODO: Save BgPositionsartID & BgPositionsartCode to object .Call API to check condition
        // DataRowView dataRowView = (DataRowView)edtBgPositionsart.Properties.GetDataSourceRowByKeyValue(e.Row["BgPositionsartID"]);
        // if (dataRowView != null) {
        //   e.Row["BgPositionsartCode"] = dataRowView.Row["BgPositionsartCode"];
        //   e.Row["KVGLimit"] = DBUtil.GetConfigValue(
        //     string.Format(@"System\Sozialhilfe\Krankenkasse\{0}", dataRowView.Row["BgPositionsartCode"]),
        //   decimal.Zero,
        //     (DateTime)(bAnpassen ? AnpassenVon : qryBgFinanzplan["FinanzplanVon"]),
        //     false);

        //   e.Row["KVGReduktion"] = DBUtil.GetConfigValue(
        //     string.Format(@"System\Sozialhilfe\Praemienverbilligung\{0}", dataRowView.Row["BgPositionsartCode"]),
        //   decimal.Zero,
        //     (DateTime)(bAnpassen ? AnpassenVon : qryBgFinanzplan["FinanzplanVon"]),
        //     false);
        // }
        break;

      case 'KVGBetrag':
      case 'KVGReduktion':
      case 'KVGBeitragSD':
      case 'KVGLimit':
        if (this.formData['BgPositionsartCode'] === 32020) {
          this.formData['KVGMaxBeitrag'] = this.formData['KVGBetrag'];
          this.formData['KVGBeitragDiff'] = 0;
        } else {
          this.formData['KVGMaxBeitrag'] = this.formData['KVGBetrag'] < this.formData['KVGLimit'] ? this.formData['KVGBetrag'] : this.formData['KVGLimit'];
          this.formData['KVGBeitragDiff'] = this.formData['KVGBetrag'] - this.formData['KVGMaxBeitrag'];
        }
        this.formData['KVGUnterstuetzt'] = this.formData['KVGMaxBeitrag'] - this.formData['KVGReduktion'];
        this.formData['KVGUnterstuetztDiff'] = this.formData['KVGBeitragSD'] ? this.formData['KVGBeitragDiff'] : 0;
        this.formData['KVGTotal'] = this.formData['KVGBetrag'] - this.formData['KVGReduktion'];

        if (field === 'KVGBetrag') {
          // TODO: Call API to check condition
          // DataRowView dataRow = (DataRowView)edtBgPositionsart.Properties.GetDataSourceRowByKeyValue(e.Row["BgPositionsartID"]);
          // e.Row["KVGReduktion"] = DBUtil.GetConfigValue(
          //   string.Format(@"System\Sozialhilfe\Praemienverbilligung\{0}", dataRow.Row["BgPositionsartCode"]),
          // decimal.Zero,
          //   (DateTime)(bAnpassen ? AnpassenVon : qryBgFinanzplan["FinanzplanVon"]),
          //   false);
        }

        if (field === 'KVGReduktion' && this.formData['KVGMaxBeitrag'] < this.formData['KVGReduktion']) {
          // TODO: show item 18 message
        }
        break;

      case 'VVGBetrag':
      case 'VVGReduktion':
      case 'VVGBeitragSD':
        this.formData['VVGTotal'] = this.formData['VVGBetrag'] - this.formData['VVGReduktion'];
        this.formData['VVGUnterstuetzt'] = this.formData['VVGBeitragSD'] ? this.formData['VVGTotal'] : 0;
        if (field === 'VVGReduktion' && this.formData['VVGBetrag'] < this.formData['VVGReduktion']) {
          // TODO: show item 18 message
        }
        break;

      case 'KVGUnterstuetzt':
      case 'KVGUnterstuetztDiff':
      case 'VVGUnterstuetzt':
        this.formData['TotalUnterstuetzt'] = this.formData['KVGUnterstuetzt'] + this.formData['KVGUnterstuetztDiff'] + this.formData['VVGUnterstuetzt'];
        break;

      case 'KVGTotal':
      case 'VVGTotal':
        this.formData['Total'] = this.formData['KVGTotal'] + this.formData['VVGTotal'];
        break;

      default:
        return;
    }
  }

  numberboxDblClick() {
    this.numberboxSelectAll = true;
  }

  onNumberboxKeyDown(e, type) {
    if (this.numberboxSelectAll && e.event.keyCode === AppEnums.KeyCode.BackSpace) {
      this.formData[type] = null; // TODO: Set field data to null
    }
    if (e.event.ctrlKey && e.event.keyCode === AppEnums.KeyCode.KeyA) {
      this.numberboxSelectAll = true;
    } else {
      this.numberboxSelectAll = false;
    }
  }

  validate() {
    return this.validationAhvBeitrage.instance.validate();
  }

}
