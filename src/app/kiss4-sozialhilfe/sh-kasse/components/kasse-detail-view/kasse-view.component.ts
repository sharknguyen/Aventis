import { Injector, Component, OnInit, OnDestroy, AfterViewInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { locale } from 'devextreme/localization';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { BaseComponent } from '@shared/components/base.component';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstant } from '@shared/common/constant.common';
import { KbBuchung } from '@app/kiss4-sozialhilfe/sh-kasse/models';
import { AppEnums } from '@shared/AppEnum';

@Component({
  selector: 'app-kasse-view',
  templateUrl: './kasse-view.component.html',
  styleUrls: ['./kasse-view.component.scss']
})
@SetClassRight('CtlKasse')
export class KasseDetailViewComponent extends BaseComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() kasseDetail: KbBuchung;
  @Output() btnAuszahlenClick: EventEmitter<any> = new EventEmitter();
  @Output() btnEditClick: EventEmitter<any> = new EventEmitter();
  dateFormat = CommonConstant.FORMAT_DATE;
  isExpand = true;
  CommonBtn = [...CommonConstant.AdditionalButtons];
  customizeBtn = [
    {
      text: 'Kasse.Button.Auszahlen',
      visible: true,
      name: 'auszahlen',
      type: 'default',
      icon: '/assets/icon/ico/27.ico',
      disabled: false
    },
    {
      text: 'Kasse.Button.Edit',
      visible: true,
      name: 'edit',
      icon: 'edit',
      type: 'default',
      disabled: false
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
    if (changes.kasseDetail) {
      const btnDisabledNames = ['auszahlen'];
      if (changes.kasseDetail.currentValue.KbBuchungStatusCode !== 2) {
        this.changeDisabled(btnDisabledNames, true);
      } else {
        this.changeDisabled(btnDisabledNames, false);
      }
    }
  }
  ngAfterViewInit(): void {
  }
  //#region "Businness, load data for combox..."
  ngOnDestroy() {
  }
  changeCollapseFormContent(event) {
    if (event.target.textContent === this.translateService.instant('Kasse.TitleDetail')) {
      this.isExpand = !this.isExpand;
    }
  }
  toolBarOnItemClick(event) {
    switch (event) {
      case 'auszahlen':
        this.btnAuszahlenClick.emit();
        break;
      case 'edit':
        this.btnEditClick.emit();
        break;
      default:
        break;
    }
  }
  changeStatusButtons(toDisable) {
    const btnDisabledNames = this.kasseDetail.KbBuchungStatusCode !== 2 ? ['edit'] : ['auszahlen', 'edit'];
    this.changeDisabled(btnDisabledNames, toDisable);
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
  getSizeQualifier(width) {
    return width < 1500 ? AppEnums.ScreenResolution.EXTRA_SMALL : AppEnums.ScreenResolution.LARGE;
  }
}
