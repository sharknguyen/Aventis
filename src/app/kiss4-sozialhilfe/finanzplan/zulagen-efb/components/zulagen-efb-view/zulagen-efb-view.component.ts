import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getLanguageCodeFromLocalStorage, getSizeQualifier } from '@shared/utilites/utilityHelpers';
import { BaseComponent } from '@shared/components/base.component';
import { locale } from 'devextreme/localization';
import { BgPosition, IAnteilSelectBoxData, IBgPosition, IZulageSelectBoxData } from '@app/kiss4-sozialhilfe/finanzplan/zulagen-efb/models';
import { BehaviorSubject, combineLatest, Subject, Subscription } from 'rxjs';
import { AppEnums } from '@shared/AppEnum';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr-CH';
import localeEn from '@angular/common/locales/en-CH';
import localeIt from '@angular/common/locales/it-CH';
import localeDe from '@angular/common/locales/de-CH';
import { isNullOrUndefined } from 'util';

registerLocaleData(localeDe, 'de-CH');
registerLocaleData(localeFr, 'fr-CH');
registerLocaleData(localeEn, 'en-CH');
registerLocaleData(localeIt, 'it-CH');

@Component({
  selector: 'kiss-zulagen-efb-view',
  templateUrl: './zulagen-efb-view.component.html',
  styleUrls: ['./zulagen-efb-view.component.scss']
})
export class ZulagenEfbViewComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  private zulageSelectBoxData$ = new Subject<IZulageSelectBoxData[]>();
  private dataView$ = new Subject<IBgPosition>();
  private stream$ = combineLatest(this.zulageSelectBoxData$, this.dataView$);
  getSizeQualifier = getSizeQualifier;
  constructor(injector: Injector, public translateService: TranslateService, private cdr: ChangeDetectorRef) {
    super(injector);
    locale(getLanguageCodeFromLocalStorage());
  }

  //#region "Declare variables input and out put"
  @Output() action = new EventEmitter<{ event: string, dataForm: any }>();

  @Input()
  set zulageSelectBoxData(data: IZulageSelectBoxData[]) {
    if (!isNullOrUndefined(data)) {
      this.zulageSelectBoxData$.next(data);
    }
  }

  @Input() anteilSelectBoxData: IAnteilSelectBoxData[] = [];
  @Input() viewAction: BehaviorSubject<any>;
  subscription: Subscription = new Subscription();

  @Input() set dataView(data: IBgPosition) {
    if (!isNullOrUndefined(data)) {
      this.dataView$.next(data);
      this.data = data;
    }
    if (this.anteilSelectBoxData && data) {
      this.anteilSelected = this.anteilSelectBoxData.find(anteil => anteil.anteilCode === data.anteil);
    }
  }

  //#endregion
  numberFormat = AppEnums.Validation.NUMBER_FORMAT;
  anteilSelected: IAnteilSelectBoxData;
  zulagenSelected: IZulageSelectBoxData;
  data: BgPosition;
  currentLang: string;
  customizeBtn = [
    {
      text: 'CtlBfsFragenkatalog.Bearbeiten',
      disabled: false,
      name: 'bearbeiten',
      icon: 'edit',
      type: 'default',
      class: 'i010-button'
    }
  ];
  number_pipe = '1.2-2';

  ngOnInit() {
    this.subscription.add(this.stream$.subscribe(([zulageSelectBoxData, data]) => {
      if (data && zulageSelectBoxData) {
        this.zulagenSelected = zulageSelectBoxData.find(zulage => zulage.zulageCode === data.bgGruppeCode);
      }
    }));
    this.subscription.add(this.viewAction.subscribe(action => {
      if (action >= 5) {
        this.customizeBtn[0].disabled = true;
      } else {
        this.customizeBtn[0].disabled = false;
      }
      this.customizeBtn = [...this.customizeBtn];
    }));
    this.currentLang = this.translateService.currentLang;
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //#region "toolbar event"
  toolBarOnItemClick(event: string) {
    const data = {
      event: event,
      dataForm: this.data
    };
    this.action.next(data);
  }

  onDisabledButton(value) {
      this.customizeBtn[0].disabled = value;
      this.customizeBtn = [...this.customizeBtn];
  }
}
