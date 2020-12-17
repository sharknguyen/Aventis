import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'kiss-speziaikonto-detail-view-abzahlungskonti',
    templateUrl: './speziaikonto-detail-view-abzahlungskonti.component.html',
    styleUrls: ['./speziaikonto-detail-view-abzahlungskonti.component.scss']
})
export class SpeziaikontoDetailViewAbzahlungskontiComponent implements OnInit, OnChanges {
    @Input() nameMonthVon: string;
    @Input() nameMonthBis: string;
    @Input() nameRueckerstattung: string;
    @Input() namePerson: string;
    @Input() nameBelastung: string;
    @Input() nameGutschrift: string;
    @Input() detailSelected;
    getLanguageCodeFromLocalStorage: any;

    detailData: any;
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
