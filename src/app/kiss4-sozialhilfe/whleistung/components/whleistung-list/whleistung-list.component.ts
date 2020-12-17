import 'devextreme-intl';

import {
  AfterViewInit,
  Component,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { AppEnums } from '@shared/AppEnum';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { isNullOrUndefined } from 'util';
import { DataGridBottom } from '../../models';
import { CommonConstant } from '@shared/common/constant.common';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';

@Component({
  selector: 'kiss-whleistung-list',
  templateUrl: './whleistung-list-component.html',
  styleUrls: ['./whleistung-list-component.scss']
})
@SetClassRight('CtlWhLeistung')
export class FormListComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @ViewChild('dataGrid') dataGrid: any;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;

  @Input() dataGridBottomEmit: any;
  @Input() selectedKeysEmit: any;
  @Input() enableGridEmit: any;

  enableGrid = true;
  formData: any;
  sizeQualifier: any;
  wohnsituation: any;
  dataGridBottom: DataGridBottom[] = [];
  selectedKeys = [];
  gridFunctionModel: GridSettingModel = new GridSettingModel();
  isDisabledGird: boolean;
  filter: any;
  isLoading = false;
  dateFormat = CommonConstant.FORMAT_DATE;

  columnsDataGrid: any;

  constructor(
    injector: Injector,
    public translateService: TranslateService,
    public utilService: UtilService,
    public router: Router,
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    this.gridFunctionModel.isSearch = false;
    this.setColumnCaptions();
  }

  setColumnCaptions() {
    this.columnsDataGrid = [
      { dataField: 'status', caption: this.translateService.instant('I001WhLeistung.Title.Status'), minWidth: '50', width: 'auto' },
      { dataField: 'ub', caption: this.translateService.instant('I001WhLeistung.Title.UB'), minWidth: '50', width: 'auto' },
      { dataField: 'geplantVon', caption: this.translateService.instant('I001WhLeistung.Title.Geplantvon'), minWidth: '50', width: 'auto', dataType: 'date', format: this.dateFormat },
      { dataField: 'geplantBis', caption: this.translateService.instant('I001WhLeistung.Title.Geplantbis'), minWidth: '50', width: 'auto', dataType: 'date', format: this.dateFormat },
      { dataField: 'datumVon', caption: this.translateService.instant('I001WhLeistung.Title.Gultigvon'), minWidth: '50', width: 'auto', dataType: 'date', format: this.dateFormat },
      { dataField: 'datumBis', caption: this.translateService.instant('I001WhLeistung.Title.Gultigbis'), minWidth: '50', width: 'auto', dataType: 'date', format: this.dateFormat },
      { dataField: 'hg', caption: this.translateService.instant('I001WhLeistung.Title.Hg'), minWidth: '50', width: 'auto' },
      { dataField: 'ue', caption: this.translateService.instant('I001WhLeistung.Title.Ue'), minWidth: '50', width: 'auto' },
      { dataField: 'finanzPlaene', caption: this.translateService.instant('I001WhLeistung.Title.Monatsbudgets'), minWidth: '50', width: 'auto' },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(changes.dataGridBottomEmit) && !isNullOrUndefined(changes.dataGridBottomEmit.currentValue)) {
      this.dataGridBottom = changes.dataGridBottomEmit.currentValue;
    }
    if (!isNullOrUndefined(changes.enableGridEmit) && !isNullOrUndefined(changes.enableGridEmit.currentValue)) {
      // TO TO: disable grid
    }
    if (!isNullOrUndefined(changes.selectedKeysEmit) && !isNullOrUndefined(changes.selectedKeysEmit.currentValue)) {
      this.selectedKeys = changes.selectedKeysEmit.currentValue;
    }
  }

  onKeyDown(e) {
    if (!isNullOrUndefined(e.component.getSelectedRowKeys)) {
      const data = e.component.getSelectedRowKeys();
      const currentKey = data[0];
      let index = e.component.getRowIndexByKey(currentKey);
      if (e.event.keyCode === AppEnums.KeyCode.UpArrowKey) {
        index--;
        if (index < 0) {
          index++;
        }
      } else if (e.event.keyCode === AppEnums.KeyCode.DownArrowKey) {
        index++;
        if (e.component.getKeyByRowIndex(index) == null) {
          index--;
        }
      }
      e.component.selectRows([e.component.getKeyByRowIndex(index)], false);
      const indexKey = e.component.getKeyByRowIndex(index);
      let dataObj = null;
      e.component.byKey(indexKey).done(function (dataObject) {
        dataObj = dataObject;
      });
      this.selectedKeys = [dataObj.bgFinanzplanID];
      e.component.getScrollable().scrollToElement(e.component.getRowElement(index));
      e.event.stopPropagation();
    }
  }

  onClickRowGrid(event) {
    if (event && event.key) {
      this.selectedKeys = [event.key];
    }
  }

  toolBarOnItemClick(e) {
    this.dataGrid.toolBarOnItemClick(e);
  }
  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }
}
