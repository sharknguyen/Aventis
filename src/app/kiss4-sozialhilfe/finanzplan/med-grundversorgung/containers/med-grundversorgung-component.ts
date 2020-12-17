import 'devextreme-intl';

import { Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { CommonConstant } from '@shared/common/constant.common';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { Subscription, BehaviorSubject } from 'rxjs';
import { locale } from 'devextreme/localization';
import { MedGrundversorgungSandbox } from '../med-grundversorgung.sandbox';
import { getConditionListBtn } from '@shared/utilites/utilityHelpers';
import { cloneDeep } from 'lodash';
import { MedGrundversorgungConstant } from '../constant';
import { TabModuleFallbearbeitungSandbox } from '@app/kiss4-main/tab-module-fallbearbeitung/tab-module-fallbearbeitung.sandbox';
import { isNullOrUndefined } from 'util';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'kiss-med-rundversorgung',
  templateUrl: './med-grundversorgung-component.html',
  styleUrls: ['./med-grundversorgung-component.scss']
})
@SetClassRight('CtlMedGrundversorgung')
export class MedGrundversorgungComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  @ViewChild('detailForm') detailForm: any;

  private subscriptions = new Subscription();
  CloneCommonConstant = cloneDeep(CommonConstant);
  listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn(CommonConstant.AdditionalButtons, [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
  titleHeader: string;
  isError: boolean;
  messageErr: string;
  isEditMode = false;
  headerClicked$ = new BehaviorSubject(null);
  // Fake data
  gridData = [];
  detailData = new Object();
  focusedRowKey = 1;
  columnsDataGrid = MedGrundversorgungConstant.columnsDataGrid;
  PersonInfo: any;
  FinanzplanInfo: any;
  isChangeNode: any;
  bgBudgetID: any;
  baPersonID: any;
  nameTree: any;
  info: any;
  dateFormat = CommonConstant.DATE_FORMAT.dd_MM_yyyy;
  nurAktuelleAnzeigen = false;
  shPositionTyp: any[];
  baInstitution: any[];
  editMask: string;
  bgBewilligungStatusCode: number;
  leistungDatumBis: any;
  datePopUpList = [];
  allowBewilligte = false;
  isGridDisable = true;
  datePopupSelect: Date;

  columnsDef = [
    { dataField: 'Institution', caption: 'Institution' },
    { dataField: 'Adresse', caption: 'Adresse' },
    { dataField: 'Typen', caption: 'Typen' }
  ];

  constructor(
    injector: Injector,
    public translateService: TranslateService,
    public utilService: UtilService,
    public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
    public router: Router,
    public medGrundversorgungSandbox: MedGrundversorgungSandbox,
    public tabModuleFallbearbeitungSandbox: TabModuleFallbearbeitungSandbox,
    private datePipe: DatePipe,
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  canDeactivate() {
    return true;
  }

  ngOnInit() {
    this.registerEvents();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  registerEvents() {
  }

  onWhAlleKvgVvgAnpassenDatas(data: any): void {
    if (isNullOrUndefined(data)) {
      return;
    }

    if (data === 0) {
      this.allowBewilligte = true;
      // this.isGridDisable = false;
      // TODO: disable grid function, invisible item 41

      for (let i = 0; i < this.gridData.length; i++) {
        if (this.gridData[i].DatumVon !== this.datePopupSelect) {
          this.gridData.splice(i, 1);
        }
      }
    }
  }

  onBgGrundbedarfDatas(data: any): void {
    if (isNullOrUndefined(data)) {
      return;
    }
    this.bgBewilligungStatusCode = data;
  }

  onBaInstitutionDatas(data: any[]): void {
    if (isNullOrUndefined(data)) {
      return;
    }
    this.baInstitution = data;
  }

  onBgPositionDatas(data: any[]): void {
    if (isNullOrUndefined(data)) {
      return;
    }
    this.gridData = data;
  }

  onShPositionTypDatas(data: any[]): void {
    if (isNullOrUndefined(data)) {
      return;
    }
    this.shPositionTyp = data;
  }

  onGetPersonInfoTitel(data) {
    if (isNullOrUndefined(data)) {
      return;
    }
    this.PersonInfo = data;
    this.loadMultilangguage();
  }

  onSelectedNodeData(data) {
    if (!isNullOrUndefined(data)) {
      this.editMask = data.editMask;
      this.isChangeNode = true;
      this.bgBudgetID = data.bgBudgetID;
      this.baPersonID = data.baPersonID;
      this.nameTree = data.name;
    }
  }

  onBgFinanzplanData(data) {
  }

  monthDiff(d1: Date, d2: Date) {
    if (d1 > d2) {
      return [];
    }

    const dateStart = moment(d1);
    const dateEnd = moment(d2);
    const timeValues = [];

    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
      timeValues.push({
        text: dateStart.format('MMM YYYY'),
        value: dateStart.toDate()
      });
      dateStart.add(1, 'month');
    }
    return timeValues;
  }

  getGridData() {
  }

  onCopyTitle() {

  }

  toolBarOnItemClick(event) {

  }

  onCloseError() {

  }

  onSelectedRow(rowData) {
    if (isNullOrUndefined(rowData)) {
      return;
    }
    this.detailData = rowData;
  }

  loadMultilangguage() {
    if (isNullOrUndefined(this.FinanzplanInfo) || isNullOrUndefined(this.PersonInfo)) {
      return;
    }
    this.titleHeader = this.PersonInfo.titleText + this.translateService.instant('MedGrundversorgung.Title.Part1')
      + this.datePipe.transform(this.FinanzplanInfo.FinanzplanVon, this.dateFormat)
      + this.translateService.instant('MedGrundversorgung.Title.Part2')
      + this.datePipe.transform(this.FinanzplanInfo.FinanzplanBis, this.dateFormat);
  }

  checkboxChange() {
    this.getGridData();
  }


  isFormDirty(): boolean {
    return this.detailForm.isDirty();
  }

  isReadOnly(): void {
    // TODO: Check is readOnly
    // console.log(this.detailForm.isReadOnly());
    // this.isGridDisable = false;
    // return this.detailForm.isReadOnly();
  }

  callWhAlleKvgVvgAnpassen(event) {
  }

  enableGrid(event) {
    this.isGridDisable = event;
    this.getGridData();
  }
}
