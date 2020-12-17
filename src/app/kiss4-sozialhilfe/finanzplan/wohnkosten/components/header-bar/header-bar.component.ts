import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstant } from '@shared/common/constant.common';
import { copyElement, getConditionListBtn } from '@shared/utilites';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'kiss-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit, OnDestroy, OnChanges {

  constructor(
    private datePipe: DatePipe,
    private translateService: TranslateService
  ) { }

  @Input() isShiftKeyDown = false;
  @Input() titleHeader: string;
  @Input() datumBis: Date;
  @Input() datumVon: Date;
  @Input() baPersonID: number;
  @Input() set isEditMode(value: boolean) {
    this._isEditMode = value;
    this.setEditMode(this._isEditMode);
  }
  dateFormat = CommonConstant.FORMAT_DATE;
  @Output() action = new EventEmitter<string>();
  AdditionalButtons = [...CommonConstant.AdditionalButtons];
  listBtn = [cloneDeep(CommonConstant.ToolbarButtons), getConditionListBtn([...this.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
  private _isEditMode = false;

  ngOnInit() {
  }

  ngOnDestroy() {}
  ngOnChanges() {
  }
  /**
   * Create function to process all events when user click on menu item in Top Grid
   * @param event
   */
  toolBarOnItemClickTopGrd(actionName: string) {
    this.action.emit(actionName);
    if (actionName === 'headerDblClicked') {
      this.isShiftKeyDown = false;
    }
    if (actionName === 'headerShiftDblClicked') {
      this.isShiftKeyDown = true;
    }
  }

  onCopyTitle() {
    if (this.isShiftKeyDown) {
      copyElement(this.baPersonID.toString());
    } else {
      copyElement(this.titleHeader);
    }
  }

  getTitleHeader () {
    const vom = this.datePipe.transform(this.datumVon, CommonConstant.FORMAT_DATE);
    const bis = this.datePipe.transform(this.datumBis, CommonConstant.FORMAT_DATE);
    return `${this.titleHeader} ${this.translateService.instant('WohnKosten.Title.Vom')} ${vom} ${this.translateService.instant('WohnKosten.Title.Bis')} ${bis}`;
  }

  setEditMode(status: boolean) {
    this.listBtn[0][0]['visible'] = !status;
    this.listBtn[0][1]['visible'] = !status;
    this.listBtn[0][2]['visible'] = !status;
    this.listBtn[1][0]['visible'] = !status;
    this.listBtn[1][1]['visible'] = !status;
    this.listBtn[1][2]['visible'] = !status;
    this.listBtn[1][3]['visible'] = !status;
    this.listBtn[1][4]['visible'] = !status;
    this.listBtn[1][5]['visible'] = !status;
    this.listBtn[1][6]['visible'] = !status;
    this.listBtn = cloneDeep(this.listBtn);
  }

  smallScreen() {
    const widthViewScroll = window.innerWidth;
    return widthViewScroll <= CommonConstant.SCREEN_RESOLUTION_LARGE;
  }

}
