import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, HostListener, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstant } from '@shared/common/constant.common';
import { copyElement, getConditionListBtn } from '@shared/utilites';
import { AppEnums } from '@shared/AppEnum';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

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

  @Input() set isEditMode(value: boolean) {
    this.editMode = value;
    this.setEditMode(this.editMode);
  }
  @Input() isShiftKeyDown = false;
  @Input() titleHeader: any;
  @Input() vom: any;
  @Input() bis: any;
  @Input() baPersonID: number;
  @Output() action = new EventEmitter<any>();

  private editMode = false;
  AdditionalButtons = [...CommonConstant.AdditionalButtons];
  listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn([...this.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
  isErrorClosed = false;
  messageErr: any;
  dateFormat: string = AppEnums.Validation.DATE_FORMAT;
  info = '';
  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.registerEvents();
    this.setEditMode(this.editMode);
  }

  ngOnChanges() {
    this.loadMultilangguage();
    this.setEditMode(this.editMode);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Create function to process all events when user click on menu item in Top Grid
   * @param event
   */

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

  onCopyTitle() {
    if (this.isShiftKeyDown) {
      copyElement(this.baPersonID.toString());
    } else {
      copyElement(this.titleHeader);
    }
  }
  toolBarOnItemClickTopGrd(event: string) {
    this.action.next({ type: 'toolbar', messager: event });
  }
  @HostListener('document:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    this.isShiftKeyDown = false;
  }
  @HostListener('document:keydown', ['$event'])
  keyDownEvent(event: KeyboardEvent) {
    if (event.shiftKey) {
      this.isShiftKeyDown = true;
    }
  }

  registerEvents() {
    this.subscriptions.push(this.translateService.onLangChange.subscribe(() => this.loadMultilangguage()));
  }


  loadMultilangguage() {
    this.info = this.titleHeader + ' > ' + this.translateService.instant('Erwerbseinkommen.Title.MonatlichesErwerbseinkommen') + ' ' +
    this.translateService.instant('Erwerbseinkommen.Title.Vom') + ' ' + this.datePipe.transform(this.vom, this.dateFormat) + ' ' + this.translateService.instant('Erwerbseinkommen.Title.Bis') + ' ' + this.datePipe.transform(this.bis, this.dateFormat);
  }
}
