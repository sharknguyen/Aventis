import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { BaseComponent } from '@shared/components/base.component';
import DevExpress from 'devextreme/bundles/dx.all';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'kiss-berater-search',
  templateUrl: './berater-search.component.html',
  styleUrls: ['./berater-search.component.scss'],
})

export class BeraterFormSearchComponent extends BaseComponent {
  @Input() readOnly: boolean;
  @Input() institutions: any;
  @Input() columnsDef: Array<DevExpress.ui.dxDataGridColumn>;
  @Output() search: EventEmitter<any> = new EventEmitter();
  queryData = {};
  isExpand = true;
  options = {
    type: 'default',
    text: this.translateService.instant('CtlBfsFragenkatalog.Ausführen'),
    icon: 'fa fa-search',
    disable: !this.readOnly,
    onClick: () => this.searchGrid()
  };
  constructor(injector: Injector,
    public translateService: TranslateService) {
    super(injector);
  }

  getValidFields() {
    const obj = {...this.queryData};
    Object.keys(obj).forEach(key => (isNullOrUndefined(obj[key]) || obj[key].toString().trim() === '') && delete obj[key]);
    return obj;
  }

  searchGrid() {
    this.search.emit(this.getValidFields());
  }

  onKeyDown(event) {
    if (event.event.altKey && event.event.keyCode === AppEnums.KeyCode.KeyEnter) {
      this.searchGrid();
    }
  }

  toggleContainer() {
    this.isExpand = !this.isExpand;
  }

  getSizeQualifier(width) {
    if (width < 1300) {
      return 'xs';
    }
    return 'lg';
  }
}
