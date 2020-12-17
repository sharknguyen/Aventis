import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant } from '@shared/common/constant.common';
import { copyElement, getConditionListBtn } from '@shared/utilites';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'kiss-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit, OnDestroy {

  constructor(
    private datePipe: DatePipe,
    private translateService: TranslateService
  ) { }

  @Input() isShiftKeyDown = false;
  @Input() set titleHeader(titleHeader: any) {
    if (titleHeader.titleText !== '' && titleHeader.bgFinanzplan !== {}) {
      const finanzplanVon = this.datePipe.transform(titleHeader.bgFinanzplan.FinanzplanVon, AppEnums.Validation.DATE_FORMAT);
      const finanzplanBis = this.datePipe.transform(titleHeader.bgFinanzplan.FinanzplanBis, AppEnums.Validation.DATE_FORMAT);
      const titleHeaderBar = this.translateService.instant('Vermogen.TitleHeaderBar');
      this.info = titleHeader.titleText + ' > ' + titleHeaderBar + ' ' + this.translateService.instant('Vermogen.vom') + ' ' + finanzplanVon + ' ' + this.translateService.instant('Vermogen.bis') + ' ' + finanzplanBis;
      this.dataCopy = titleHeader.titleText;
    }
  }
  @Input() set bgFinanzplanID(value: number) {
    if (value) {
      this.listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn([...this.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
    }
  }
  @Input() baPersonID: number;
  @Input() bgFinanzplan: any;
  @Input() set isEditMode(value: boolean) {
    this.setEditMode(value);
  }
  @Output() action = new EventEmitter<string>();

  info = '';
  dataCopy = '';

  AdditionalButtons = [...CommonConstant.AdditionalButtons];
  listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn([...this.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];


  ngOnInit() {
  }

  ngOnDestroy() { }

  /**
   * Create function to process all events when user click on menu item in Top Grid
   * @param event
   */
  toolBarOnItemClickTopGrd(event: string) {
    this.action.next(event);
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

  onCopyTitle() {
    if (this.isShiftKeyDown) {
      copyElement(this.baPersonID.toString());
    } else {
      copyElement(this.dataCopy);
    }
  }
}
