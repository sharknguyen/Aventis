import { Component, Injector, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';

@Component({
  selector: 'kiss-kontoauszug-detail',
  templateUrl: './kontoauszug-detail.component.html',
  styleUrls: ['./kontoauszug-detail.component.scss']
})
export class KontoauszugDetailComponent extends BaseComponent {
  @Input() kontoauszugDetail: any;

  // Common vars
  CommonConstant = CommonConstant;
  // Toolbar vars
  isExpand = true;

  constructor(
    injector: Injector,
    public translateService: TranslateService) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  getSizeQualifier(width) {
    return width < AppEnums.ScreenResolution.SCREEN_RESOLUTION_LARGE ? AppEnums.ScreenResolution.EXTRA_SMALL : AppEnums.ScreenResolution.LARGE;
  }

  onToolbarItemClick(e) {
    if (e === CommonConstant.EventClickTitle) {
      this.isExpand = !this.isExpand;
      return;
    }
  }
}
