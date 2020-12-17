import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'kiss-speziaikonto-detail-view-vorabzugskonti',
  templateUrl: './speziaikonto-detail-view-vorabzugskonti.component.html',
  styleUrls: ['./speziaikonto-detail-view-vorabzugskonti.component.scss']
})
export class SpeziaikontoDetailViewVorabzugskontiComponent implements OnInit, OnChanges {
  @Input() detailSelected;
  getLanguageCodeFromLocalStorage: any;
  detailData: any;
  @Input() nameMonthVon: string;
  @Input() nameMonthBis: string;
  @Input() nameRueckerstattung: string;
  @Input() namePerson: string;

  constructor() { }

  ngOnInit() {
    this.getLanguageCodeFromLocalStorage = UtilityHelper.getLanguageCodeFromLocalStorage();
    locale(this.getLanguageCodeFromLocalStorage);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(this.detailSelected)) {
      this.detailData = { ...this.detailSelected };
      this.detailData.StartSaldo = !isNullOrUndefined(this.detailData.StartSaldo) ? this.formatNumberByCulture(this.detailData.StartSaldo) : '';
      this.detailData.BetragProMonat = !isNullOrUndefined(this.detailData.BetragProMonat) ? this.formatNumberByCulture(this.detailData.BetragProMonat) : '';
    }
  }
  formatNumberByCulture(data) {
    return new Intl.NumberFormat(this.getLanguageCodeFromLocalStorage, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(data);
  }
}
