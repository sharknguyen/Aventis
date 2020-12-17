import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonConstant } from '@shared/common/constant.common';
import { copyElement, getConditionListBtn } from '@shared/utilites/index';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'kiss-zulagen-header-bar',
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
  @Output() copyHeaderAction = new EventEmitter<string>();
  @Output() action = new EventEmitter<string>();
  isShiftKeyDown = false;

  @Input() set isEditMode(value: boolean) {
    this.setEditMode(value);
  }

  @Input() set personenData(personenData: any) {
    if (personenData) {
      this.id = personenData.baPersonID.toString();
      this.infoCopy = personenData.personen.titleText;
      this._personenData = personenData;

      const dateFinanzplanVonFormatDot = this.datePipe.transform(personenData.data.finanzplanVon, AppEnums.Validation.DATE_FORMAT);
      const dateFinanzplanBisFormatDot = this.datePipe.transform(personenData.data.finanzplanBis, AppEnums.Validation.DATE_FORMAT);
      this.info = personenData.personen.titleText + ' >  ' + this.translateService.instant('ZulagenEfb.Header.Title') + ' ' + this.translateService.instant('ZulagenEfb.Header.Vom') + ' ' + dateFinanzplanVonFormatDot + ' ' + this.translateService.instant('ZulagenEfb.Header.Bis') + ' ' + dateFinanzplanBisFormatDot;
    }
  }

  AdditionalButtons = [...CommonConstant.AdditionalButtons];
  listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn([...this.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];

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
    const dateFinanzplanVonFormatDot = this.datePipe.transform(this._personenData.data.finanzplanVon, AppEnums.Validation.DATE_FORMAT);
    const dateFinanzplanBisFormatDot = this.datePipe.transform(this._personenData.data.finanzplanBis, AppEnums.Validation.DATE_FORMAT);
    this.info = this._personenData.personen.titleText + ' >  ' + this.translateService.instant('ZulagenEfb.Header.Title') + ' ' + this.translateService.instant('ZulagenEfb.Header.Vom') + ' ' + dateFinanzplanVonFormatDot + ' ' + this.translateService.instant('ZulagenEfb.Header.Bis') + ' ' + dateFinanzplanBisFormatDot;
  }
  //#region Tab/Arrow key
  @HostListener('document:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    if (event.keyCode === AppEnums.KeyCode.KeyShift) {
      this.isShiftKeyDown = false;
      this.action.emit('shiftKeyUp');
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === AppEnums.KeyCode.KeyShift) {
      this.isShiftKeyDown = true;
      this.action.emit('shiftKeyDown');
    }
  }
  /**
   * Create function to process all events when user click on menu item in Top Grid
   * @param event
   */
  toolBarOnItemClickTopGrd(event: string) {
    this.action.emit(event);
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

  onCopyZulageTitle() {
    if (this.isShiftKeyDown) {
      copyElement(this.id);
    } else {
      copyElement(this.infoCopy);
    }
  }
}
