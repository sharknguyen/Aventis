import 'devextreme-intl';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de-CH';
import { Component, Injector, Input } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';

import { Falltraeger } from '../../models';

registerLocaleData(localeDe, 'de-CH');

@Component({
  selector: 'kiss-falltrager',
  templateUrl: './falltrager.component.html',
  styleUrls: ['./falltrager.component.scss']
})

export class KlsFalltragerComponent extends BaseComponent {
  @Input() falltraegerData: Falltraeger;
  constructor(
    injector: Injector
  ) {
    super(injector);
  }
}

