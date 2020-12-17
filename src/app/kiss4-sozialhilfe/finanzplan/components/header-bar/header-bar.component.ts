import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonConstant } from '@shared/common/constant.common';
import { copyElement, getConditionListBtn } from '@shared/utilites/index';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import {Subscription} from 'rxjs';
import {cloneDeep} from 'lodash-es';


@Component({
  selector: 'kiss-finanzplan-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit, OnDestroy {

  constructor(
    private datePipe: DatePipe,
    private translateService: TranslateService
  ) {
  }
  private subscriptions = new Subscription();

  @Output() action = new EventEmitter<string>();
  @Input() isShiftKeyDown: boolean;

  @Input() set isEditMode(value: boolean) {
    this.setEditMode(value);
  }

  @Input() set hideBtnEdit(value: boolean) {
    if (value) {
      this.customizeBtn[0].disabled = true;
      this.customizeBtn[1].disabled = false;
      this.customizeBtn[2].disabled = false;
    } else {
      this.customizeBtn[0].disabled = false;
    }
    this.customizeBtn = [...this.customizeBtn];
  }

  @Input() set personenData(personenData: any) {
    if (personenData) {
      this.id = personenData.baPersonID.toString();
      this.infoCopy = personenData.personen.titleText;
      this._personenData = personenData;
      const dateFinanzplanVonFormatDot = moment(this._personenData.data.finanzplanVon).format('MMMM YYYY');
      const dateFinanzplanBisFormatDot = moment(this._personenData.data.finanzplanBis).format('MMMM YYYY')
      this.info = this._personenData.personen.titleText + ' > ' + this.translateService.instant('Finanzplan.HeaderBar.FinanzplanLblTitle') + ' ' + this.translateService.instant('Finanzplan.HeaderBar.FinanzplanVon');
      this.info = this.info + ' ' + dateFinanzplanVonFormatDot + ' ' + this.translateService.instant('Finanzplan.HeaderBar.FinanzplanBis') + ' ' + dateFinanzplanBisFormatDot;

    }
  }
  AdditionalButtons = [...CommonConstant.AdditionalButtons];
  listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn([...this.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn, CommonConstant.GridIsSearch])];

  customizeBtn = [
    {
      text: 'Bearbeiten',
      visible: false,
      disabled: false,
      name: 'bearbeiten'
    },
    {
      text: 'Speichern',
      visible: false,
      disabled: false,
      name: 'speichern'
    },
    {
      text: 'Abbrechen',
      visible: false,
      disabled: false,
      name: 'abbrechen'
    },
  ];
  info = '';
  infoCopy = '';
  id = '';
  _personenData: any;

  ngOnInit() {
    this.registerEvents();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  registerEvents() {
    this.subscriptions.add(this.translateService.onLangChange.subscribe(() => this.loadMultilangguage()));
  }
  loadMultilangguage() {
    const dateFinanzplanVonFormatDot = moment(this._personenData.data.finanzplanVon).format('MMMM YYYY');
    const dateFinanzplanBisFormatDot = moment(this._personenData.data.finanzplanBis).format('MMMM YYYY')
    this.info = this._personenData.personen.titleText + ' > ' + this.translateService.instant('Finanzplan.HeaderBar.FinanzplanLblTitle') + ' ' + this.translateService.instant('Finanzplan.HeaderBar.FinanzplanVon');
    this.info = this.info + ' ' + dateFinanzplanVonFormatDot + ' ' + this.translateService.instant('Finanzplan.HeaderBar.FinanzplanBis') + ' ' + dateFinanzplanBisFormatDot;
  }
  /**
   * Create function to process all events when user click on menu item in Top Grid
   * @param event
   */
  toolBarOnItemClickTopGrd(event: string) {
    this.action.next(event);
  }

  setEditMode(status: boolean) {
    this.customizeBtn[0].visible = status;
    this.customizeBtn[1].visible = status;
    this.customizeBtn[2].visible = status;
    this.listBtn[0][0]['visible'] = !status;
    this.listBtn[0][1]['visible'] = !status;
    this.listBtn[0][2]['visible'] = !status;
    this.listBtn[1][0]['visible'] = !status;
    this.listBtn[1][1]['visible'] = !status;
    this.listBtn[1][2]['visible'] = !status;
    this.listBtn[1][3]['visible'] = !status;
    this.listBtn[1][3]['disabled'] = true;
    this.listBtn[1][4]['visible'] = !status;
    this.listBtn[1][5]['visible'] = !status;
    this.customizeBtn = cloneDeep(this.customizeBtn);
    this.listBtn = cloneDeep(this.listBtn);
  }

  onCopyTitle() {
    if (this.isShiftKeyDown) {
      copyElement(this.id);
    } else {
      copyElement(this.infoCopy);
    }
  }
}
