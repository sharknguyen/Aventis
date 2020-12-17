import 'devextreme-intl';

import { AfterViewInit, Component, Injector, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { isNullOrUndefined } from 'util';
import { CommonConstant } from '@shared/common/constant.common';

@Component({
  selector: 'kiss-whleistung-detail-view',
  templateUrl: './whleistung-detail-view-component.html',
  styleUrls: ['./whleistung-detail-view-component.scss']
})
@SetClassRight('CtlWhLeistung')
export class FormDetailViewComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges, CanComponentDeactivate {
  formData: any;
  sizeQualifier: any;
  wohnsituation: any;
  vorsaldoString: any;
  formWidth: number;

  @Input() formDataEmit: any;

  constructor(
    injector: Injector,
    public translateService: TranslateService,
    public utilService: UtilService,
    public router: Router,
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  canDeactivate() {
    return true;
  }

  ngOnInit() {
    this.formWidth = window.screen.width - CommonConstant.LeftMenuWidth;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(changes.formDataEmit) && !isNullOrUndefined(changes.formDataEmit.currentValue)) {
      this.formData = changes.formDataEmit.currentValue;
      this.getReadModeData();
    }
  }

  private getReadModeData() {
    this.vorsaldoString = this.formData.vorsaldo;
    if (this.vorsaldoString || this.vorsaldoString === 0) {
      this.vorsaldoString = ( + this.vorsaldoString.toFixed(2))
        .toLocaleString(UtilityHelper.getLanguageCodeFromLocalStorage());
    } else {
      this.vorsaldoString = '';
    }
    if ((this.vorsaldoString || this.vorsaldoString === '0') && this.vorsaldoString.indexOf('.') === -1) {
      this.vorsaldoString += '.00';
    }
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }
}
