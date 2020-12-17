import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { BaseComponent } from '@shared/components/base.component';
import * as utilites from '@shared/utilites';
import { getLanguageCodeFromLocalStorage, isClearNumberBox } from '@shared/utilites/utilityHelpers';
import { DxNumberBoxComponent, DxSelectBoxComponent, DxValidationGroupComponent } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { isEmpty } from 'lodash-es';
import { isUndefined, isNullOrUndefined } from 'util';

@Component({
  selector: 'kiss-versicherungsleistungen-form',
  templateUrl: './versicherungsleistungen-form.component.html',
  styleUrls: ['./versicherungsleistungen-form.component.scss']
})
export class VersicherungsleistungenFormComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(injector: Injector, public translateService: TranslateService, ) {
    super(injector);
    locale(getLanguageCodeFromLocalStorage());
  }

  @ViewChild('validationVersicherungsleistungen') validationVersicherungsleistungen: DxValidationGroupComponent;
  @ViewChild('person') person: DxSelectBoxComponent;
  @ViewChild('artDerVersicherung') artDerVersicherung: DxSelectBoxComponent;
  @ViewChild('betrag') betrag: DxNumberBoxComponent;

  @Output() action = new EventEmitter<{ actionName: string, data?: any }>();
  @Output() itemTabIndex = new EventEmitter<number>();
  @Output() isDirtyForm = new EventEmitter<boolean>();
  @Input() set dataForm(value: any) {
    this._data = value;
    if (isEmpty(this._data)) {
      this._data.Betrag = 0;
      this._data.VerwaltungSD = false;
    }
    this.oldData = Object.assign({}, this._data);
  }
  @Input() personList: any;
  @Input() artDerVersicherungList: any;

  _data: any = {};
  numberFormat = AppEnums.Validation.C007_NUMBER_FORMAT;
  listBtn = [];
  customizeBtn = [];
  private oldData: any = {};
  accessKeyItemFocused = 0;
  minNumber = AppEnums.Money.MIN_VALUE;
  maxNumber = AppEnums.Money.MAX_VALUE;
  numberboxSelectAll = false;
  allowValidate = true;
  isDirty = false;

  ngOnInit() {
    this.initKissCardButton();
  }

  ngOnDestroy() {
  }

  ngAfterViewInit(): void {
    this.person.instance.focus();
  }


  initKissCardButton() {
    this.customizeBtn = [
      {
        text: 'CtlBfsFragenkatalog.Speichern',
        visible: true,
        name: 'speichern',
        disabled: false,
        icon: 'save',
      },
      {
        text: 'CtlBfsFragenkatalog.Abbrechen',
        visible: true,
        name: 'abbrechen',
        icon: 'close',
      },
      {
        text: 'Versicherungsleistungen.Form.Loschen',
        visible: true,
        useSubmitBehavior: true,
        locateInMenu: 'always',
        disabled: false,
        name: 'loschen'
      }
    ];
  }

  onFormAction(actionName: string) {
    switch (actionName) {
      case 'speichern':
        if (this.isDirty) {
          this._data.Bemerkung = this._data.Bemerkung ? this._data.Bemerkung.toString().trim() : '';
          if (this.validationVersicherungsleistungen.instance.validate().isValid) {
            this.action.next({ actionName, data: this._data });
          } else {
            this.action.next({ actionName, data: false });
          }
        } else {
          this.action.next({ actionName: 'abbrechen', data: this._data.BgPositionID });
        }
        break;
      case 'abbrechen':
        this.action.next({ actionName, data: this._data.BgPositionID });
        break;
      case 'loschen':
        if (this.customizeBtn[2]['disabled']) {
          return;
        } else if (isUndefined(this._data.BgPositionID)) {
          this.action.next({ actionName: 'abbrechen' });
        } else {
          this.action.next({ actionName });
        }
        break;
    }
  }

  screenByWidthSize(width) {
    return utilites.getSizeQualifier(width);
  }

  onKeyDown(event, field) {
    if (event.event.keyCode === AppEnums.KeyCode.KeyF4) {
      if (field === 'person') {
        this.person.opened = !this.person.opened;
      } else if (field === 'artDerVersicherung') {
        this.artDerVersicherung.opened = !this.artDerVersicherung.opened;
      }
    }
  }

  onValueChanged(field) {
    if (field === 'artDerVersicherung') {
      this._data.Buchungstext = this.artDerVersicherung.displayValue;
    }
    this.isDirtyForm.next(true);
    this.isDirty = true;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS) {
      event.preventDefault();
      const el = document.querySelector(':focus');
      if (el) {
        (el as HTMLElement).blur();
      }
      if (this.isDirty) {
        this._data.Bemerkung = this._data.Bemerkung ? this._data.Bemerkung.toString().trim() : '';
        if (this.validationVersicherungsleistungen.instance.validate().isValid) {
          this.action.next({ actionName: 'speichern', data: this._data });
        } else {
          this.action.next({ actionName: 'speichern', data: false });
        }
      } else {
        this.action.next({ actionName: 'abbrechen', data: this._data.BgPositionID });
      }
      return;
    }
  }

  disableButtons(status) {
    this.customizeBtn[0]['disabled'] = status;
    this.customizeBtn[2]['disabled'] = status;
    this.customizeBtn = [...this.customizeBtn];
  }

  disableDelete(status) {
    this.customizeBtn[2]['disabled'] = status;
    this.customizeBtn = [...this.customizeBtn];
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.isDirtyForm) {
      return false;
    }
  }

  // select box on click
  selectContentReady(e) {
    if (isNullOrUndefined(this._data.BaPersonID)) {
      this.personList[0].BaPersonID = -1;
      this._data.BaPersonID = -1;
      return;
    }
  }

  onNumberboxKeyDown(event, fieldName) {
    if (isClearNumberBox(event)) {
      event.component.reset();
    }
  }

  onTextChange(event) {
    const otherKeycode = [AppEnums.KeyCode.BackSpace, AppEnums.KeyCode.KeyEnter, AppEnums.KeyCode.Space, AppEnums.KeyCode.Delete];
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ) {
      return;
    } else if ((AppEnums.KeyCode.KeyNumber0 <= event.keyCode && event.keyCode <= AppEnums.KeyCode.KeyZ)
      || (AppEnums.KeyCode.KeyNumpad0 <= event.keyCode && event.keyCode <= AppEnums.KeyCode.KeyNumpadAdd)
      || (AppEnums.KeyCode.KeyNumpadSubtract <= event.keyCode && event.keyCode <= AppEnums.KeyCode.KeyNumpadDivide)
      || (AppEnums.KeyCode.KeySemiColon <= event.keyCode && event.keyCode <= AppEnums.KeyCode.KeyGraveAccent)
      || (AppEnums.KeyCode.KeyOpenBracket <= event.keyCode && event.keyCode <= AppEnums.KeyCode.KeySingleQuote)
      || otherKeycode.includes(event.keyCode)
    ) {
      this.isDirtyForm.next(true);
      this.isDirty = true;
    }
  }
}
