import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'kiss-speziaikonto-detail-view-kurzungen',
  templateUrl: './speziaikonto-detail-view-kurzungen.component.html',
  styleUrls: ['./speziaikonto-detail-view-kurzungen.component.scss']
})
export class SpeziaikontoDetailViewKurzungenComponent implements OnInit, OnChanges {
  //#region 'Input/Output variables'
  @Input() detailSelected;
  @Input() namePerson: string;
  @Input() nameMonthVon: string;
  @Input() nameMonthBis: string;
  //#endregion

  //#region 'Declare global variables'
  detailData: any;
  getLanguageCodeFromLocalStorage: any;
  //#endregion

  constructor() { }

  //#region component life cycle functions
  ngOnInit() {
    this.getLanguageCodeFromLocalStorage = UtilityHelper.getLanguageCodeFromLocalStorage();
    locale(this.getLanguageCodeFromLocalStorage);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(this.detailSelected)) {
      this.detailData = { ...this.detailSelected };
      this.detailData.KuerzungAnteilGBL = !isNullOrUndefined(this.detailData.KuerzungAnteilGBL) ? this.formatNumberByCulture(this.detailData.KuerzungAnteilGBL, 'percent') : '';
    }
  }
  //#endregion

  //#region utility functions
  formatNumberByCulture(data, type) {
    if (type = 'percent') {
      return new Intl.NumberFormat(this.getLanguageCodeFromLocalStorage, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(data);
    }
    if (type = 'money') {
      return new Intl.NumberFormat(this.getLanguageCodeFromLocalStorage, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(data);
    }
  }
  //#endregion
}
