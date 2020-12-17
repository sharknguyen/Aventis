import { Injector, ViewChild, Component, OnInit, OnDestroy, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { locale } from 'devextreme/localization';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { RadioModel, FaAktennotizQueryModel } from '@app/kiss4-fallfuhrung/fa-aktennotiz/models';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { DxFormComponent, DxCheckBoxComponent, DxSelectBoxComponent, DxValidationGroupComponent, DxDropDownBoxComponent, DxDataGridComponent, DxTextBoxComponent } from 'devextreme-angular';
import { DxiItemComponent } from 'devextreme-angular/ui/nested/item-dxi';
import { AppEnums } from '@shared/AppEnum';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { InkassoConstant } from '@shared/common/inkasso.common';
import { CommonConstant } from '@shared/common/constant.common';
@Component({
  host: { '(window:keydown)': 'hotkeys($event)' },
  selector: 'app-fa-aktennotiz-search',
  templateUrl: './fa-aktennotiz-search.component.html',
  styleUrls: ['./fa-aktennotiz-search.component.scss']
})
@SetClassRight('CtlFaAktennotiz')
export class FaAktennotizSearchComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('faAktennotizSearchForm') faAktennotizSearchForm: DxFormComponent;
  @ViewChild('radio') radioItem: DxiItemComponent;
  @ViewChild('themen') checkBoxTheMen: DxCheckBoxComponent;
  @ViewChild('kontaktart') kontaktart: DxSelectBoxComponent;
  @ViewChild('validationGroupSearch') validationGroupSearch: DxValidationGroupComponent;
  @ViewChild('dropDownBox') dropDownBox: DxDropDownBoxComponent;
  @ViewChild('gridMitarbeiter') gridMitarbeiter: DxDataGridComponent;
  @ViewChild('stichworte') stichworte: DxTextBoxComponent;
  @Output() searchEvent: EventEmitter<any> = new EventEmitter();
  @Input() kontaktartData: any[];
  @Input() gridMitarbeiterDataSource: any;
  @Input() theMenDataSource: any;
  @Input() isDisable: boolean;
  @Input() isVisibleRadio: boolean;
  isExpand = true;
  dateFormat = CommonConstant.FORMAT_DATE;
  //#region "Declare variables for Search"
  checkBoxTheMenValue = false;
  tagBoxTheMenValue: string[];
  gridMitarbeiterSelectedRowKeys: number[] = [];
  gridBoxMitarbeiterValue: number;
  selectBoxKontaktartValue: any;
  radioValue: any;
  querySearch: FaAktennotizQueryModel = {
    faLeistungID: null,
    isDeleted1: false,
    isDeleted2: false,
    themen: null,
    alleThemen: true,
    inhalt: null,
    datumBis: null,
    datumVon: null,
    kontaktart: null,
    stichwort: null,
    sucheSar: null
  };
  querySearchInitData: FaAktennotizQueryModel = {
    faLeistungID: null,
    isDeleted1: false,
    isDeleted2: false,
    themen: null,
    alleThemen: true,
    inhalt: null,
    datumBis: null,
    datumVon: null,
    kontaktart: null,
    stichwort: null,
    sucheSar: null
  };
  customizeBtn = [
    {
      text: 'FaAktennotiz.Button.Search',
      visible: true,
      name: 'search',
      type: 'default',
      icon: 'fa fa-search',
      disabled: false
    }
  ];
  dropDownKeyExpr = 'index';
  //#endregion
  //#region "Declare variables for another bussiness"
  subcription: Subscription = new Subscription();
  accessKeyItemFocused = 0;
  keyFocus: string;
  priorities: RadioModel[] = [
    {
      Name: 'Active',
      DisplayName: 'nur aktive'
    },
    {
      Name: 'InActive',
      DisplayName: 'nur gelöschte'
    },
    {
      Name: 'All',
      DisplayName: 'alle'
    }
  ];
  dateBoxDatumVonValue: Date;
  dateBoxDatumBisValue: Date;
  minDate = CommonConstant.MIN_DATE;
  maxDate = CommonConstant.MAX_DATE;
  columnsDef = [
    { dataField: 'name', caption: this.translateService.instant('FaAktennotiz.FieldName') },
    { dataField: 'logonName', caption: this.translateService.instant('FaAktennotiz.FieldLogonName') }
  ];
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

  initData() {
    this.radioItem.cssClass = 'radio-fa-aktennotiz';
    this.radioValue = this.priorities[0].Name;
  }
  ngAfterViewInit(): void {
    this.initData();
    setTimeout(() => {
      this.subcription.add(this.dropDownBox.onOpened.subscribe(event => {
        if (this.dropDownBox.value) {
          this.gridMitarbeiter.focusedRowKey = this.dropDownBox.value;
          return;
        }
        const visibleRows = this.gridMitarbeiter.instance.getVisibleRows();
        if (visibleRows.length > 0) {
          this.gridMitarbeiter.focusedRowKey = visibleRows[0].key;
          return;
        }
      }));
    });
  }
  //#region "Search region"
  public setFaleitungId(faLeistungID) {
    this.querySearchInitData.faLeistungID = faLeistungID;
    this.querySearch.faLeistungID = faLeistungID;
  }
  public getQuerySearch() {
    return this.querySearch;
  }
  public getQuerySearchInitAndResetQuerySearch() {
    this.querySearch = this.querySearchInitData;
    return this.querySearchInitData;
  }
  onSearchByButton() {
    if (this.validationGroupSearch.instance && this.validationGroupSearch.instance.validate().isValid) {
      this.querySearch.stichwort =   this.stichworte.instance.option('text');
      this.searchEvent.emit(this.querySearch);
    }
  }
  gridMitarbeiterOnClick(event) {
    this.gridBoxMitarbeiterValue = event.data.userID;
    this.querySearch.sucheSar = event.data.userID;
    this.closeAndFocusDropDown();
  }
  onChangeCheckBox() {
    this.querySearch.alleThemen = !this.checkBoxTheMenValue;
  }
  onValueRadioChanged(event) {
    switch (event.value) {
      case 'Active':
        this.querySearch.isDeleted1 = false;
        this.querySearch.isDeleted2 = false;
        break;
      case 'InActive':
        this.querySearch.isDeleted1 = true;
        this.querySearch.isDeleted2 = true;
        break;
      case 'All':
        this.querySearch.isDeleted1 = true;
        this.querySearch.isDeleted2 = false;
        break;
      default:
        break;
    }
  }
  onChangeTagBox() {
    this.querySearch.themen = (this.tagBoxTheMenValue && this.tagBoxTheMenValue.length > 0) ? this.tagBoxTheMenValue.join(',') : null;
  }
  onValueDropDownChanged(event) {
    this.querySearch.sucheSar = event.value;
  }
  onChangeTextBoxStichwort() {
  }
  onChangeDateBoxTo() {
    this.querySearch.datumBis = this.dateBoxDatumBisValue ? moment(this.dateBoxDatumBisValue).format('MM.DD.YYYY') : null;
  }
  onChangeDateBoxFrom() {
    this.querySearch.datumVon = this.dateBoxDatumVonValue ? moment(this.dateBoxDatumVonValue).format('MM.DD.YYYY') : null;
  }
  onChangeSelectBox() {
  }
  //#endregion
  //#region "Businness, load data for combox..."
  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  //#region arrow key
  moveFocus(isNext: boolean) {
    const tagNames = ['input', 'textarea', 'span', 'dx-check-box', 'dx-radio-group'];
    for (const tagName of tagNames) {
      const elems = document.getElementsByTagName(tagName);
      for (const el of Array.from(elems)) {
        if (isNext) {
          if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused + 1) {
            (el as HTMLElement).focus();
            return;
          }
        } else {
          if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused - 1) {
            (el as HTMLElement).focus();
            return;
          }
        }
      }
    }
  }
  onFocusIn(element, field: string) {
    this.keyFocus = field;
    this.accessKeyItemFocused = element.accessKey;
  }
  onFocusOut() {
    this.accessKeyItemFocused = 0;
  }
  onFocusInCheckBox(element) {
    this.accessKeyItemFocused = element.accessKey;
  }
  onFocusOutCheckBox() {
    this.accessKeyItemFocused = 0;
  }
  //#endregion
  onKeyDown(e) {
    if (e.event.altKey && e.event.keyCode === AppEnums.KeyCode.KeyEnter) {
      this.onSearchByButton();
      return;
    }
    if (this.keyFocus === 'Kontaktart' || this.keyFocus === 'Mitarbeiter' || this.keyFocus === 'Datumvon' || this.keyFocus === 'Datumbis') {
      if (e.event.keyCode === AppEnums.KeyCode.KeyF4) {
        if (!e.component.option('opened')) {
          e.event.preventDefault();
          e.component.open();
          return;
        }
        e.event.preventDefault();
        e.component.close();
      }
      return;
    }
    if (e.event.keyCode === AppEnums.KeyCode.UpArrowKey && this.keyFocus !== 'Stichworte') {
      const em = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: 'ArrowUp',
      });
      document.dispatchEvent(em);
    } else if (e.event.keyCode === AppEnums.KeyCode.DownArrowKey && this.keyFocus !== 'Stichworte') {
      const em = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: 'ArrowDown',
      });
      document.dispatchEvent(em);
    }
  }
  hotkeys(event) {
    if (event.keyCode === AppEnums.KeyCode.UpArrowKey || event.key === 'ArrowUp') {
      if (this.accessKeyItemFocused === 8 && this.querySearch.alleThemen) {
        this.accessKeyItemFocused--;
      }
      this.moveFocus(false);
      event.preventDefault();
      return;
    }
    if (event.keyCode === AppEnums.KeyCode.DownArrowKey || event.key === 'ArrowDown') {
      if (this.accessKeyItemFocused === 8 && this.querySearch.alleThemen) {
        this.accessKeyItemFocused++;
      }
      this.moveFocus(true);
      event.preventDefault();
      return;
    }
  }
  onCollapseSearchContainer(event) {
    if (event.target.textContent === this.translateService.instant('FaAktennotizDetails.TitleSearch')) {
      this.isExpand = !this.isExpand;
    }
  }
  onKeyDownGrid(e) {
    if (e.event.keyCode === AppEnums.KeyCode.KeyF4) {
      this.closeAndFocusDropDown();
      return;
    }
    if (e.event.keyCode === AppEnums.KeyCode.KeyEnter) {
      this.dropDownBox.value = this.gridMitarbeiter.focusedRowKey;
      this.closeAndFocusDropDown();
    }
  }
  getSizeQualifier(width) {
    return width < InkassoConstant.SCREEN_RESOLUTION_LARGE ? AppEnums.ScreenResolution.EXTRA_SMALL : AppEnums.ScreenResolution.LARGE;
  }
  onFocusedRowChanged(event) {
    if (!event.row) {
      return;
    }
    this.gridMitarbeiter.selectedRowKeys = [event.row.key];
  }
  closeAndFocusDropDown() {
    this.dropDownBox.instance.close();
    this.dropDownBox.instance.focus();
  }
  toolBarOnItemClick(event) {
    switch (event) {
      case 'search':
        this.onSearchByButton();
        break;
      default:
        break;
    }
  }
}
