import 'devextreme-intl';

import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Injector, OnChanges, OnDestroy, OnInit, SimpleChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';

@Component({
  selector: 'kiss-med-grundversorgung-detail-view',
  templateUrl: './detail-view-component.html',
  styleUrls: ['./detail-view-component.scss']
})
@SetClassRight('CtlAhvBeitrage')
export class FormDetailViewComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges, CanComponentDeactivate {
  @Input() shPositionTyp;
  @Input() formData;
  formWidth: number;
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

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }
}
