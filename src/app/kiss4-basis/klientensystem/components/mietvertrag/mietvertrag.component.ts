import 'devextreme-intl';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de-CH';
import { AfterViewInit, Component, Injector, Input, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxCheckBoxComponent } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { isNullOrUndefined } from 'util';

import { Mietvertrag } from '../../models';

registerLocaleData(localeDe, 'de-CH');

@Component({
  selector: 'kiss-mietvertrag',
  templateUrl: './mietvertrag.component.html',
  styleUrls: ['./mietvertrag.component.scss']
})
@SetClassRight('CtlKlientensystem')
export class KlsMietvertragComponent extends BaseComponent implements AfterViewInit {

  @Input() mietvertragData: Mietvertrag;
  @ViewChild('mieteAbgetreten1') mieteAbgetreten1: DxCheckBoxComponent;

  dateFormat = CommonConstant.FORMAT_DATE;
  editor: any;
  maxLengthNumber = CommonConstant.MAX_LENGTH_NUMBER + CommonConstant.DECIMA_SIZE + (CommonConstant.MAX_LENGTH_NUMBER / CommonConstant.DECIMA_SIZE - 1);
  froalaEditorConfig = {
    heightMin: 150,
    height: 300,
    events: {
      'froalaEditor.initialized': (e, editor) => {
        this.editor = editor;
      },
      'froalaEditor.input': (e, editor) => {
      },
      'froalaEditor.paste.after': (e, editor) => {
      },
      focus: (e) => {
      }
    }
  };

  constructor(
    injector: Injector,
    public translateService: TranslateService
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngAfterViewInit(): void {
    this.disableTextarea();
  }

  disableTextarea() {
    if (!isNullOrUndefined(this.editor)) {
      this.editor.edit.off();
    }
  }
  getSizeQualifier(width) {
    if (width < 1300) {
      return 'xs';
    }
    return 'lg';
  }
}
