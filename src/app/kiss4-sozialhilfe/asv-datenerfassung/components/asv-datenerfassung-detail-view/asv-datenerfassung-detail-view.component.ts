import { AfterViewInit, Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { isFunction } from 'lodash-es';
import { AsvDatenerfassung } from '../../models';

@Component({
  selector: 'app-asv-datenerfassung-detail-view',
  templateUrl: './asv-datenerfassung-detail-view.component.html',
  styleUrls: ['./asv-datenerfassung-detail-view.component.scss']
})
@SetClassRight('CtlWhASVSErfassung')
export class AsvDatenerfassungDetailViewComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() asvDetailData: AsvDatenerfassung;
  @Output() btnAddClick: EventEmitter<any> = new EventEmitter();
  @Output() btnEditClick: EventEmitter<any> = new EventEmitter();
  @Output() btnDeleteClick: EventEmitter<any> = new EventEmitter();
  isExpand = true;
  CommonBtn = [...CommonConstant.AdditionalButtons];
  customizeBtn = [
    {
      text: 'AsvDatenerfassung.Button.NeueASVDatenerfassung',
      visible: true,
      name: 'add',
      icon: 'add',
      type: 'default',
      callback: () => this.onNeueASV()
    },
    {
      text: 'AsvDatenerfassung.Button.Bearbeiten',
      visible: true,
      name: 'edit',
      icon: 'edit',
      type: 'default',
      callback: () => this.onBearbeitenASV()
    },
    {
      text: 'AsvDatenerfassung.Button.Delete',
      visible: true,
      disabled: undefined,
      locateInMenu: 'always',
      name: 'loschen',
      callback: () => this.onLoschenASV()
    }
  ];
  dateFormat = CommonConstant.FORMAT_DATE;
  //#region "Declare variables for another bussiness"
  accessKeyItemFocused = 0;
  //#endregion
  constructor(
    injector: Injector,
    public translateService: TranslateService
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }
  //#region "Businness, load data for combox..."
  ngOnDestroy() {
  }
  changeCollapseFormContent(event) {
    if (event.target.textContent === this.translateService.instant('FaAktennotizDetails.TitleDetail')) {
      this.isExpand = !this.isExpand;
    }
  }
  toolBarOnItemClick(event) {
    return isFunction(event.callback) && event.callback();
  }
  onNeueASV() {
    this.btnAddClick.emit();
  }
  onBearbeitenASV() {
    this.btnEditClick.emit();
  }
  onLoschenASV() {
    if (this.customizeBtn[2].disabled) {
      return;
    }
    this.btnDeleteClick.emit(this.asvDetailData);
  }

  disableButtons(status) {
    this.changeDisabled(['loschen'], status);
  }

  changeDisabled(btnNames, status) {
    this.customizeBtn = this.customizeBtn.map(btn => {
      return { ...btn, disabled: btnNames.includes(btn.name) && status };
    });
  }
}
