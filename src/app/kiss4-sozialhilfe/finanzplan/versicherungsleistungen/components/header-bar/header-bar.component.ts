import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstant } from '@shared/common/constant.common';
import { copyElement, getConditionListBtn } from '@shared/utilites';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'kiss-versicherungsleistungen-header',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit, OnDestroy {

  constructor(
    private datePipe: DatePipe,
    private translateService: TranslateService
  ) {
  }

  @Output() action = new EventEmitter<string>();
  @Input() pageTitleTabModule: string;
  @Input() set isEditMode(value: boolean) {
    this._isEditMode = value;
    this.setEditMode(this._isEditMode);
  }
  @Input() set personenData(data: any) {
    this.headerData = data;
    if (data && data.baPersonID) {
      this.info = this.translateService.instant('Versicherungsleistungen.Title.String_1')
        + ` ${this.datePipe.transform(data.datumVon, CommonConstant.DATE_FORMAT.dd_MM_yyyy)} `
        + this.translateService.instant('Versicherungsleistungen.Title.String_2')
        + ` ${this.datePipe.transform(data.datumBis, CommonConstant.DATE_FORMAT.dd_MM_yyyy)} `;
    }
  }

  dateFormat = CommonConstant.FORMAT_DATE;
  headerData: any;
  private _isEditMode = false;
  AdditionalButtons = [...CommonConstant.AdditionalButtons];
  listBtn = [cloneDeep(CommonConstant.ToolbarButtons), getConditionListBtn([...this.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
  customizeBtn = [];
  info = '';

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  toolBarOnItemClickTopGrd(event: string) {
    this.action.next(event);
    if (event === 'headerDblClicked') {
      copyElement(this.pageTitleTabModule);
    }
    if (event === 'headerShiftDblClicked') {
      copyElement(this.headerData.baPersonID.toString());
    }
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
    this.listBtn = [...this.listBtn];
  }
}
