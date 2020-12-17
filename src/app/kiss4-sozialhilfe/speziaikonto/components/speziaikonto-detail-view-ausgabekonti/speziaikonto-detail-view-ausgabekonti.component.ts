import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'kiss-speziaikonto-detail-view-ausgabekonti',
  templateUrl: './speziaikonto-detail-view-ausgabekonti.component.html',
  styleUrls: ['./speziaikonto-detail-view-ausgabekonti.component.scss']
})
export class SpeziaikontoDetailViewAusgabekontiComponent implements OnInit, OnChanges {
  //#region 'Input/Output variables'
  @Input() detailSelected;
  @Input() nameBelastung: string;
  @Input() namePerson: string;
  @Input() nameMonthVon: string;
  @Input() nameMonthBis: string;
  //#endregion

  //#region 'Declare variables'
  detailData: any;
  //#endregion

  constructor() { }

  //#region component life cycle functions
  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(this.detailSelected)) {
      this.detailData = { ...this.detailSelected };
    }
  }
  //#endregion
}
