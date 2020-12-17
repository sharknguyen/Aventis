import { Injector, ViewChild, Component, OnInit, OnDestroy, AfterViewInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { locale } from 'devextreme/localization';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { BaseComponent } from '@shared/components/base.component';
import { DxFormComponent, DxValidationGroupComponent, DxDropDownBoxComponent, DxDataGridComponent } from 'devextreme-angular';
import { AppEnums } from '@shared/AppEnum';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { SearchQuery } from '@app/kiss4-sozialhilfe/sh-kasse/models';
import { CommonConstant } from '@shared/common/constant.common';
@Component({
  host: { '(document:keydown)': 'hotkeys($event)' },
  selector: 'app-kasse-search',
  templateUrl: './kasse-search.component.html',
  styleUrls: ['./kasse-search.component.scss']
})
export class KasseSearchComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @ViewChild('searchForm') searchForm: DxFormComponent;
  @ViewChild('validationGroupSearch') validationGroupSearch: DxValidationGroupComponent;
  @ViewChild('dropDownBox') dropDownBox: DxDropDownBoxComponent;
  @ViewChild('gridDropDownBox') gridDropDownBox: DxDataGridComponent;
  @Output() searchEventByButton: EventEmitter<any> = new EventEmitter();
  @Output() searchEvent: EventEmitter<any> = new EventEmitter();
  @Input() isDisable = false;
  @Input() dropDownData: any[];
  @Output() errorEvent: EventEmitter<any> = new EventEmitter();
  arrF4 = ['Datumvon', 'Datumbis', 'dropDownBox'];
  isExpand = true;
  dropDownKeyExpr = 'index';
  //#region "Declare variables for Search"
  cbNochNichtValue = true;
  cbAusgedrucktValue = false;
  cbGesperrtValue = false;
  searchQuery: SearchQuery;
  searchQueryExcuted: SearchQuery;
  dropDownNoData = this.translateService.instant('Kasse.Search.DropDownNoData');
  //#endregion
  //#region "Declare variables for another bussiness"
  subscription: Subscription = new Subscription();
  accessKeyItemFocused = 0;
  keyFocus: string;
  minDate = new Date(1753, 0, 1);
  maxDate = new Date(9999, 12, 31);
  dateFormat = CommonConstant.FORMAT_DATE;
  customizeBtn = [
    {
      text: 'Kasse.Button.Ausfuhren',
      visible: true,
      name: 'ausfuhren',
      type: 'default',
      icon: 'fa fa-search',
      disabled: false
    }
  ];
  columnsDef = [
    { dataField: 'FT', caption: this.translateService.instant('Kasse.Grid.FT') },
    { dataField: 'BaPersonID', caption: this.translateService.instant('Kasse.Grid.Nr') },
    { dataField: 'Name', caption: this.translateService.instant('Kasse.Grid.Name') },
    { dataField: 'Strasse', caption: this.translateService.instant('Kasse.Grid.Strasse') },
    { dataField: 'PLZOrt', caption: this.translateService.instant('Kasse.Grid.PLZOrt') },
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
    this.searchQuery = this.initSearchQuery();
    this.subscription.add(this.translateService.onLangChange.subscribe(event => this.onLangChange()));
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.isDisable && changes.isDisable.currentValue !== changes.isDisable.previousValue) {
      this.changeStatusBtns(['ausfuhren'], changes.isDisable.currentValue);
    }
  }
  changeStatusBtns(btnNames, isDisable) {
    this.customizeBtn = this.customizeBtn.map(btn => {
      return { ...btn, disabled: btnNames.includes(btn.name) && isDisable };
    });
  }
  onLangChange() {
    this.columnsDef = [
      { dataField: 'FT', caption: this.translateService.instant('Kasse.Grid.FT') },
      { dataField: 'BaPersonID', caption: this.translateService.instant('Kasse.Grid.Nr') },
      { dataField: 'Name', caption: this.translateService.instant('Kasse.Grid.Name') },
      { dataField: 'Strasse', caption: this.translateService.instant('Kasse.Grid.Strasse') },
      { dataField: 'PLZOrt', caption: this.translateService.instant('Kasse.Grid.PLZOrt') },
    ];
    this.dropDownNoData = this.translateService.instant('Kasse.Search.DropDownNoData');
  }
  ngAfterViewInit(): void {
  }
  initSearchQuery() {
    return new SearchQuery({
      baPersonId: null,
      datumVon: null,
      datumBis: null,
      nichtAusbezahlt: true,
      ausbezahlt: false,
      gesperrt: false
    });
  }
  onFocusedRowChanged(event) {
    if (!event.row) {
      return;
    }
    this.gridDropDownBox.selectedRowKeys = [event.row.key];
    this.searchQuery.baPersonId = event.row.key;
  }
  //#region "Search region"
  onSearchByButton() {
    if (this.validationGroupSearch.instance && this.validationGroupSearch.instance.validate().isValid) {
      if (this.searchQuery.baPersonId || this.searchQuery.datumBis || this.searchQuery.datumVon) {
        if (this.searchQuery.datumVon) {
          this.searchQuery.datumVon = moment(this.searchQuery.datumVon).format('MM.DD.YYYY');
        }
        if (this.searchQuery.datumBis) {
          this.searchQuery.datumBis = moment(this.searchQuery.datumBis).format('MM.DD.YYYY');
        }
        this.searchQueryExcuted = { ...this.searchQuery };
        this.searchEventByButton.emit(this.searchQuery);
        return;
      }
      this.errorEvent.emit(this.translateService.instant('Kasse.Search.MessRequireField'));
    }
  }
  onSearch() {
    this.searchEvent.emit(this.searchQueryExcuted);
  }

  //#endregion
  //#region "Businness, load data for combox..."
  ngOnDestroy() {
    this.subscription.unsubscribe();
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
    if (this.arrF4.includes(this.keyFocus)) {
      if ((e.event.keyCode === AppEnums.KeyCode.KeyF4)) {
        if (!e.component.option('opened')) {
          e.event.preventDefault();
          e.component.open();
          return;
        }
        e.event.preventDefault();
        e.component.close();
        return;
      }
    }
    if (e.event.keyCode === AppEnums.KeyCode.UpArrowKey) {
      const em = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: 'ArrowUp',
      });
      document.dispatchEvent(em);
      return;
    }
    if (e.event.keyCode === AppEnums.KeyCode.DownArrowKey) {
      const em = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: 'ArrowDown',
      });
      document.dispatchEvent(em);
      return;
    }
  }
  hotkeys(event) {
    if (event.keyCode === AppEnums.KeyCode.UpArrowKey || event.key === 'ArrowUp') {
      this.moveFocus(false);
      event.preventDefault();
      return;
    }
    if (event.keyCode === AppEnums.KeyCode.DownArrowKey || event.key === 'ArrowDown') {
      this.moveFocus(true);
      event.preventDefault();
      return;
    }
  }
  toolBarOnItemClick(event) {
    switch (event) {
      case 'ausfuhren':
        this.onSearchByButton();
        break;
      default:
        break;
    }
  }
  onCollapseSearchContainer(event) {
    if (event.target.textContent === this.translateService.instant('Kasse.TitleSearch')) {
      this.isExpand = !this.isExpand;
    }
  }
  getSizeQualifier(width) {
    return width < 1000 ? AppEnums.ScreenResolution.EXTRA_SMALL : AppEnums.ScreenResolution.LARGE;
  }
}
