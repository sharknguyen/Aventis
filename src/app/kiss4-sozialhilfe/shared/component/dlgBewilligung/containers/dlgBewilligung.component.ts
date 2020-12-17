import { OnInit, OnDestroy, Component, Injector, Input } from '@angular/core';
import { AppEnums } from '@shared/AppEnum';
import { Subscription, Subject } from 'rxjs';
import { isEqual } from 'lodash-es';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@shared/components/base.component';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { FallfuhrungTreeConstant } from '@shared/common/fallfuhrung-tree.common';
import { IFinanzplan } from '@app/kiss4-sozialhilfe/regularer-finanzplan/models/regularer-finanzplan.models';

interface IFormData {
  radioGroup: string;
  someText1: string;
  selectBox: string;
  checkBox: boolean;
  someText2: string;
  dateBox: Date;
  textArea: string;
}

@Component({
  selector: 'app-dlg-bewilligung',
  templateUrl: './dlgBewilligung.component.html',
  styleUrls: ['./dlgBewilligung.component.scss']
})
@SetClassRight('Ctlpersonen-im-haushalt')
export class DlgBewilligungComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(
    injector: Injector,
    public translateService: TranslateService,
    public layoutSandbox: LayoutSandbox
  ) {
    super(injector);
  }

  @Input() popupModel: {
    isVisible: boolean;
    data: IFormData;
  } = this.getInitData();
  dateFormat: string = AppEnums.Validation.DATE_FORMAT;
  radioItems = [
    { text: this.translateService.instant('DlgBewilligung.RadioBtn.Bewilligung'), code: 'aaa' },
    { text: this.translateService.instant('DlgBewilligung.RadioBtn.Zuruc'), code: 'bbb' },
    { text: this.translateService.instant('DlgBewilligung.RadioBtn.Bewilligen'), code: 'ccc' },
    { text: this.translateService.instant('DlgBewilligung.RadioBtn.Weite'), code: 'ddd' },
    { text: this.translateService.instant('DlgBewilligung.RadioBtn.Aufheben'), code: 'eee' },
  ];
  selectBoxArr = [
    { text: this.translateService.instant('DlgBewilligung.RadioBtn.Bewilligung'), code: 'aaa' },
    { text: this.translateService.instant('DlgBewilligung.RadioBtn.Zuruc'), code: 'bbb' },
    { text: this.translateService.instant('DlgBewilligung.RadioBtn.Bewilligen'), code: 'ccc' },
    { text: this.translateService.instant('DlgBewilligung.RadioBtn.Weite'), code: 'ddd' },
    { text: this.translateService.instant('DlgBewilligung.RadioBtn.Aufheben'), code: 'eee' },
  ];

  private subscriptions: Subscription[] = [];

  ngOnInit() {
    this.setTitle(FallfuhrungTreeConstant.titlePage);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  onPopupClose() {

  }

  onShown(event) {

  }
  onHiding(event) {

  }
  onHidden(event) {

  }

  private getInitData() {
    return {
      isVisible: false,
      data: {
        radioGroup: 'ddd',
        someText1: 'hehehe',
        selectBox: 'bbb',
        checkBox: true,
        someText2: 'hahaha',
        dateBox: new Date(),
        textArea: 'hihihi',
      },
    };
  }

  private resetData() {
  }
}
