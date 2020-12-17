import { Injector, Component, OnInit, OnDestroy, AfterViewInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { locale } from 'devextreme/localization';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { FaAktennotizDetailModel } from '../../models';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstant } from '@shared/common/constant.common';
import { isEqual } from 'lodash';
@Component({
  selector: 'app-fa-aktennotiz-view',
  templateUrl: './fa-aktennotiz-view.component.html',
  styleUrls: ['./fa-aktennotiz-view.component.scss']
})
@SetClassRight('CtlFaAktennotiz')
export class FaAktennotizDetailViewComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() faAktennotizDetail: FaAktennotizDetailModel;
  @Input() theMenData: any;
  @Input() tagBoxDetailTheMenValue: any;
  @Input() dauerData: any[];
  @Input() isVisibleDauer: boolean;
  @Input() isVisibleGeloschterDatensatz: boolean;
  @Output() btnAddClick: EventEmitter<any> = new EventEmitter();
  @Output() btnEditClick: EventEmitter<any> = new EventEmitter();
  @Output() btnDeleteClick: EventEmitter<any> = new EventEmitter();
  @Output() btnGeloschterDatensatzClick: EventEmitter<any> = new EventEmitter();
  @Output() btnDocumentClick: EventEmitter<any> = new EventEmitter();
  isExpand = true;
  CommonBtn = [...CommonConstant.AdditionalButtons];
  customizeBtn = [
    {
      text: 'FaAktennotiz.Button.GeloschterDatensatz',
      visible: false,
      name: 'geloschter-datensatz',
      icon: '/assets/icon/ico/22.ico',
      type: 'default'
    },
    {
      text: 'FaAktennotiz.Button.Document',
      disabled: undefined,
      visible: true,
      icon: '/assets/icon/base64-decode/document.ico',
      name: 'document',
      type: 'default'
    },
    {
      text: 'FaAktennotiz.Button.Add',
      visible: true,
      name: 'add',
      icon: 'add',
      type: 'default'
    },
    {
      text: 'FaAktennotiz.Button.Edit',
      visible: true,
      name: 'edit',
      icon: 'edit',
      type: 'default'
    },
    {
      text: 'FaAktennotiz.Button.Loschen',
      visible: true,
      disabled: undefined,
      locateInMenu: 'always',
      name: 'loschen',
    }
  ];
  editor: any;
  froalaEditorConfig = {
    heightMin: 150,
    height: 300,
    events: {
      'froalaEditor.initialized': (e, editor) => {
        this.editor = editor;
        if (this.editor) {
          this.editor.edit.off();
        }
      },
      focus: (e) => { }
    }
  };
  //#region "Declare variables for another bussiness"
  accessKeyItemFocused = 0;
  keyFocus: string;
  dateBoxDatumVonValue: Date;
  dateBoxDatumBisValue: Date;
  minDate = new Date(1753, 0, 1);
  maxDate = new Date(9999, 12, 31);
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.faAktennotizDetail && changes.faAktennotizDetail.currentValue && changes.faAktennotizDetail.currentValue.FaDauerCode && this.isVisibleDauer) {
      this.faAktennotizDetail.FaDauerText = (this.dauerData && this.dauerData.length > 0 && this.dauerData.filter(x => x.code === this.faAktennotizDetail.FaDauerCode).length > 0)
        ? this.dauerData.filter(x => x.code === this.faAktennotizDetail.FaDauerCode)[0].text : '';
    }
    if ((changes.isVisibleGeloschterDatensatz && changes.isVisibleGeloschterDatensatz.currentValue !== changes.isVisibleGeloschterDatensatz.previousValue)) {
      this.changeVisible(['geloschter-datensatz'], changes.isVisibleGeloschterDatensatz.currentValue);
    }
    if (changes.faAktennotizDetail && !isEqual(changes.faAktennotizDetail.currentValue, changes.faAktennotizDetail.previousValue)) {
      this.changeDisabled(['geloschter-datensatz'], !changes.faAktennotizDetail.currentValue.IsDeleted);
      this.changeDisabled(['loschen'], changes.faAktennotizDetail.currentValue.IsDeleted);
    }
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
    switch (event) {
      case 'geloschter-datensatz':
        this.btnGeloschterDatensatzClick.emit();
        break;
      case 'document':
        this.btnDocumentClick.emit();
        break;
      case 'add':
        this.btnAddClick.emit();
        break;
      case 'edit':
        this.btnEditClick.emit();
        break;
      case 'loschen':
        if (this.isBtnDisable('loschen')) {
          return;
        }
        this.btnDeleteClick.emit();
        break;
      default:
        break;
    }
  }
  isBtnDisable(btnName) {
    return this.customizeBtn.filter(x => x.name === btnName)[0] ? this.customizeBtn.filter(x => x.name === btnName)[0].disabled : true;
  }
  public setDisableBtnLoschen(isDisable: boolean) {
    isDisable = this.faAktennotizDetail.IsDeleted ? true : isDisable;
    this.changeDisabled(['loschen'], isDisable);
  }
  onValueTagBoxThemenChanged(event) {
    this.faAktennotizDetail.FaThemaCodes = event.value.join(',');
  }

  changeDisabled(btnNames, toDisable) {
    this.customizeBtn = this.customizeBtn.map(btn => {
      if (!btnNames.includes(btn.name)) {
        return btn;
      }
      btn.disabled = btn.disabled !== toDisable ? btnNames.includes(btn.name) && toDisable : btn.disabled;
      return btn;
    });
  }
  changeVisible(btnNames, toVisible) {
    this.customizeBtn = this.customizeBtn.map(btn => {
      if (!btnNames.includes(btn.name)) {
        return btn;
      }
      btn.visible = btn.visible !== toVisible ? btnNames.includes(btn.name) && toVisible : btn.visible;
      return btn;
    });
  }
  public setDisableBtnGeloschterDatensatz(isDisable: boolean) {
    this.changeDisabled(['geloschter-datensatz'], isDisable);
  }
}
