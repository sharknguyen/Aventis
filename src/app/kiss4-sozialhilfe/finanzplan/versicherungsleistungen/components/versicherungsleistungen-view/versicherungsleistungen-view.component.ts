import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de-CH';
import localeEn from '@angular/common/locales/en-CH';
import localeFr from '@angular/common/locales/fr-CH';
import localeIt from '@angular/common/locales/it-CH';
import { Component, EventEmitter, Injector, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AfterViewInit, Input } from '@node_modules/@angular/core';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { isEmpty } from 'lodash-es';
import { isNullOrUndefined } from 'util';
import { formatNumberByCulture } from '@shared/utilites/utilityHelpers';
import { Subscription } from 'rxjs';

registerLocaleData(localeDe, 'de-CH');
registerLocaleData(localeFr, 'fr-CH');
registerLocaleData(localeEn, 'en-CH');
registerLocaleData(localeIt, 'it-CH');
interface IZulage {
  zulageId: number;
  zulage: string;
}
@Component({
  selector: 'kiss-versicherungsleistungen-view',
  templateUrl: './versicherungsleistungen-view.component.html',
  styleUrls: ['./versicherungsleistungen-view.component.scss']
})
export class VersicherungsleistungenViewComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(injector: Injector, public translateService: TranslateService, ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }
  @Output() action = new EventEmitter<{ actionName: string, data?: any }>();
  @Input() personList: any[] = [];
  @Input() artDerVersicherungList: any[] = [];
  @Input() set dataForm(value: any) {
    this._dataForm = value;
    this._betrag = formatNumberByCulture(this._dataForm.Betrag);
    this.initButton();
  }
  @Input() set editMask(value: any) {
    this._editMask = value;
    this.initButton();
  }
  @Input() set bgBewilligungStatusCode(value: any) {
    this._bgBewilligungStatusCode = value;
    this.initButton();
  }
  private subscriptions = new Subscription();

  _editMask: string;
  _bgBewilligungStatusCode: number;
  _betrag: string;

  numberFormat = CommonConstant.FormatNumber;
  listBtn = [];
  customizeBtn = [
    {
      text: 'Versicherungsleistungen.Form.Neues',
      disabled: true,
      name: 'neues',
      icon: 'plus',
      class: 'i005_button'
    },
    {
      text: 'Versicherungsleistungen.Form.Bearbeiten',
      disabled: true,
      name: 'bearbeiten',
      icon: 'edit',
      class: 'i005_button'
    },
    {
      text: 'Versicherungsleistungen.Form.Loschen',
      visible: true,
      useSubmitBehavior: true,
      locateInMenu: 'always',
      disabled: true,
      name: 'loschen'
    }
  ];
  _dataForm: any;
  isFirstTimeRun = true;
  displayBeschreibung = '';

  ngOnInit() {
    this.subscriptions.add(this.translateService.onLangChange.subscribe(event => {
      this._betrag = formatNumberByCulture(this._dataForm.Betrag);
    }));
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  toolBarOnItemClick(actionName) {
    if (actionName === 'loschen' && this.customizeBtn[2]['disabled']) {
      return;
    }
    this.action.next({ actionName });
  }

  initButton() {
    if (isNullOrUndefined(this._editMask) || isNullOrUndefined(this._bgBewilligungStatusCode)) {
      return;
    }

    this.customizeBtn[0]['disabled'] = false;
    this.customizeBtn[1]['disabled'] = false;
    this.customizeBtn[2]['disabled'] = false;

    try {
      if (this._editMask === 'R' || this._bgBewilligungStatusCode >= 5) {
        this.customizeBtn[0]['disabled'] = true;
        this.customizeBtn[1]['disabled'] = true;
        this.customizeBtn[2]['disabled'] = true;
        this.customizeBtn = [...this.customizeBtn];
        return;
      }
      if (this._editMask.indexOf('I') === -1) {
        this.customizeBtn[0]['disabled'] = true;
        this.customizeBtn[1]['disabled'] = false;
        this.customizeBtn[2]['disabled'] = false;
        this.customizeBtn = [...this.customizeBtn];
        return;
      }
      if (this._editMask.indexOf('U') === -1) {
        this.customizeBtn[0]['disabled'] = false;
        this.customizeBtn[1]['disabled'] = true;
        this.customizeBtn[2]['disabled'] = false;
        this.customizeBtn = [...this.customizeBtn];
        return;
      }
    } finally {
      this.showButton();
    }

  }

  showButton() {
    if (isEmpty(this._dataForm)) {
      this.customizeBtn[0]['disabled'] = this.customizeBtn[0]['disabled'] ? this.customizeBtn[0]['disabled'] : false;
      this.customizeBtn[1]['disabled'] = true;
      this.customizeBtn[2]['disabled'] = true;
    }

    this.customizeBtn = [...this.customizeBtn];
  }

  disableDelete(status) {
    this.customizeBtn[2]['disabled'] = status;
    this.customizeBtn = [...this.customizeBtn];
  }
}
