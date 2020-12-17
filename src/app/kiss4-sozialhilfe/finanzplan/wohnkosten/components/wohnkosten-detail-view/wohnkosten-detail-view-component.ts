import 'devextreme-intl';
import { Component, Injector, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { isNullOrUndefined } from 'util';
import { CommonConstant } from '@shared/common/constant.common';

@Component({
  selector: 'kiss-wohnkosten-detail-view',
  templateUrl: './wohnkosten-detail-view-component.html',
  styleUrls: ['./wohnkosten-detail-view-component.scss']
})
@SetClassRight('CtlWohnKosten')
export class FormDetailViewComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() detailData;
  @Input() showZuschlagFields;
  @Input() whKennzahlenData;
  @Input() bgPositionsartData;
  formData: any;
  wohnsituation;
  berechnungsgrundlage;
  getSizeQualifier = UtilityHelper.getSizeQualifier;
  visibleRichtlinienHG = false;
  wohnkostenHg;

  constructor(
    injector: Injector,
    public translateService: TranslateService,
    public utilService: UtilService,
    public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
    public router: Router,
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (isNullOrUndefined(this.bgPositionsartData) || isNullOrUndefined(this.detailData)) {
      return;
    }
    if (this.detailData.Berechnungsgrundlage === 0) {
      this.berechnungsgrundlage = 'Wohnkosten gem. Richtlinien bestimmen';
      this.wohnkostenHg = this.detailData.WohnkostenHg;
    } else {
      this.berechnungsgrundlage = 'Wohnkosten individuell bestimmen';
      this.wohnkostenHg = '';
    }
    this.bgPositionsartData.forEach(item => {
      if (item.Code === this.detailData.Wohnsituation) {
        this.wohnsituation = item.Text;
      }
    });
  }

  getichtlinienTitle() {
    if (this.detailData) {
      return this.detailData.Berechnungsgrundlage === 1 ? this.translateService.instant('WohnKosten.Detail.Zinskosten')
          : this.translateService.instant('WohnKosten.Detail.Ansatz');
    } else {
      return this.translateService.instant('WohnKosten.Detail.Ansatz');
    }
  }
}
