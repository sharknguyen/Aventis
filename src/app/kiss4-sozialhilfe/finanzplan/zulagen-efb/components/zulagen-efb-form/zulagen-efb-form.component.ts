import { ChangeDetectorRef, Component, EventEmitter, HostListener, Injector, Input, OnDestroy, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { CommonConstant } from '@shared/common/constant.common';
import { TranslateService } from '@ngx-translate/core';
import { getLanguageCodeFromLocalStorage, isClearNumberBox, getSizeQualifier, formatNumberByCulture } from '@shared/utilites/utilityHelpers';
import { BaseComponent } from '@shared/components/base.component';
import { locale } from 'devextreme/localization';
import { AppEnums, LOV } from '@shared/AppEnum';
import { DxSelectBoxComponent, DxValidationGroupComponent, DxNumberBoxComponent } from 'devextreme-angular';
import { BgPosition, IZulageSelectBoxData } from '@app/kiss4-sozialhilfe/finanzplan/zulagen-efb/models';
import { BehaviorSubject, Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { FragenkatalogConstant } from '@shared/common/sostat.common';
import BgGruppeCode = LOV.BgGruppeCode;

@Component({
  selector: 'kiss-zulagen-efb-form',
  templateUrl: './zulagen-efb-form.component.html',
  styleUrls: ['./zulagen-efb-form.component.scss']
})
export class ZulagenEfbFormComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('validationZulagen') validationAhvBeitrage: DxValidationGroupComponent;
  @ViewChild('zulage') zulage: DxSelectBoxComponent;
  @ViewChild('anteil') anteil: DxSelectBoxComponent;
  @ViewChild('betrag') betrag: DxNumberBoxComponent;
  @Output() action = new EventEmitter<{ event: string, dataForm: any }>();
  @Output() processAction = new EventEmitter<string>();
  @Output() zulageSelectAction = new EventEmitter<number>();
  @Output() messageAction = new EventEmitter<string>();
  @Input() zulageSelectBoxData: IZulageSelectBoxData[] = [];
  @Input() anteilSelectBoxData: IZulageSelectBoxData[] = [];
  @Input() dataForm: BgPosition;
  @Input() positionsartMasterData: any[];
  @Input()
  set isEditMode(value: boolean) {
    // this.isInitForm = true;
  }

  @Input()
  set formAction(action: any) {
    if (action instanceof KeyboardEvent) {
      this.handleKeyboardEvent(action);
    } else {
      this.onloadBetragSumData(action);
    }
  }
  getSizeQualifier = getSizeQualifier;
  subscription: Subscription;
  CommonBtn = [...CommonConstant.AdditionalButtons];
  listBtn = [];
  isViewModel = true;

  // Arrow key from
  accessKeyItemFocused = 0;
  keyFocus: string;
  keyInput: string;

  isDisableAnteil = true;
  isDisableAlleinerziehend = true;
  isDisableBetrag = false;
  numberFormat = AppEnums.Validation.C007_NUMBER_FORMAT;

  minBetragSum: number;
  maxBetragSum: number;
  isAnteilSelected = false;
  isInitForm = true;
  realonlyBetragSum: number;
  //#region "button"
  customizeBtn = [
    {
      text: 'CtlBfsFragenkatalog.Speichern',
      visible: this.isViewModel,
      name: 'speichern',
      disabled: false,
      icon: 'save',
      type: 'default',
      class: 'i010-button'
    },
    {
      text: 'CtlBfsFragenkatalog.Abbrechen',
      visible: this.isViewModel,
      name: 'abbrechen',
      icon: 'close',
      type: 'default',
      class: 'i010-button'
    }
  ];

  isAnteilValid = true;
  anteilValidationError = {};
  isBetragValid = true;
  betragValidationError = {};

  constructor(injector: Injector, public translateService: TranslateService, private cdr: ChangeDetectorRef) {
    super(injector);
    locale(getLanguageCodeFromLocalStorage());
  }

  //#region logic
  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.dataForm) {
      this.onRefreshStatusForm();
      this.zulage.instance.focus();
    }
  }

  ngOnDestroy() {
  }

  private onloadBetragSumData(data) {
    if (!isNullOrUndefined(data)) {
      const bgGruppeCode = this.dataForm.bgGruppeCode;
      if (bgGruppeCode === BgGruppeCode.IZU_Alleinerziehend || bgGruppeCode === BgGruppeCode.IZU_Auszubildende ||
        bgGruppeCode === BgGruppeCode.IZU_Betrag || bgGruppeCode === BgGruppeCode.MIZ || bgGruppeCode === BgGruppeCode.Sanktion ||
        ((bgGruppeCode === BgGruppeCode.EFB_Erwerbsaufnahme || bgGruppeCode === BgGruppeCode.IZU || bgGruppeCode === BgGruppeCode.EFB) && this.dataForm.anteil > 0)) {
        this.realonlyBetragSum = Math.abs(this.dataForm.betragSum);
        if (!isNullOrUndefined(data[0]['PR_DEF'])) {
          this.dataForm.betragSum = Number(data[0]['PR_DEF']);
        } else {
          this.dataForm.betragSum = Number(data[0]['PR_MIN']);
        }
        if (this.realonlyBetragSum !== this.dataForm.betragSum && this.dataForm.betragSum === 0) {
          this.dataForm.betragSum = this.realonlyBetragSum;
        }
        if (!isNullOrUndefined(data[0]['PR_MIN'])) {
          this.minBetragSum = Number(data[0]['PR_MIN']);
        }
        if (!isNullOrUndefined(data[0]['PR_MAX'])) {
          this.maxBetragSum = Number(data[0]['PR_MAX']);
        }
      }
      this.isInitForm = false;
    }
  }

  private onRefreshStatusForm() {
    switch (this.dataForm.bgGruppeCode) {
      case -1: // blank
        this.isDisableAnteil = true;
        this.dataForm.anteil = null;
        this.dataForm.anteilMode = false;
        this.isDisableAlleinerziehend = true;
        this.isDisableBetrag = true;
        break;
      case BgGruppeCode.Sanktion: // Sanktion
        this.isDisableAnteil = true;
        this.dataForm.anteil = null;
        this.dataForm.anteilMode = false;
        this.isDisableAlleinerziehend = true;
        this.isDisableBetrag = false;
        break;
      case BgGruppeCode.EFB_Erwerbsaufnahme: // EFB Erwerbsaufnahme
        this.isDisableAnteil = false;
        this.dataForm.anteilMode = true;
        this.isDisableAlleinerziehend = false;
        this.isDisableBetrag = true;
        break;
      case BgGruppeCode.EFB: // EFB
        this.isDisableAnteil = false;
        this.dataForm.anteilMode = true;
        this.isDisableAlleinerziehend = false;
        this.isDisableBetrag = true;
        break;
      case BgGruppeCode.IZU: // IZU %
        this.isDisableAnteil = false;
        this.dataForm.anteilMode = true;
        this.isDisableAlleinerziehend = true;
        this.isDisableBetrag = true;
        break;
      case BgGruppeCode.IZU_Alleinerziehend: // IZU Alleinerziehend
        this.isDisableAnteil = true;
        this.dataForm.anteilMode = false;
        this.dataForm.anteil = null;
        this.isDisableAlleinerziehend = true;
        this.isDisableBetrag = false;
        break;
      case BgGruppeCode.IZU_Auszubildende: // IZU Auszubildende
        this.isDisableAnteil = true;
        this.dataForm.anteilMode = false;
        this.dataForm.anteil = null;
        this.isDisableAlleinerziehend = true;
        this.isDisableBetrag = false;
        break;
      case BgGruppeCode.IZU_Betrag: // IZU Betrag
        this.isDisableAnteil = true;
        this.dataForm.anteilMode = false;
        this.dataForm.anteil = null;
        this.isDisableAlleinerziehend = true;
        this.isDisableBetrag = true;
        break;
      case BgGruppeCode.MIZ: // MIZ
        this.isDisableAnteil = true;
        this.dataForm.anteilMode = false;
        this.dataForm.anteil = null;
        this.isDisableAlleinerziehend = true;
        this.isDisableBetrag = true;
        break;
    }
    // only detectChanges if view is not destroyed
    if (!(<any>this.cdr)['destroyed']) {
      this.cdr.detectChanges();
    }
  }

  //#region "toolbar event"
  toolBarOnItemClick(event: string) {
    const data = {
      event: event,
      dataForm: this.dataForm
    };
    switch (event) {
      case FragenkatalogConstant.DETAIL_ABBRECHEN: // cancel
        this.action.next(data);
        break;
      case FragenkatalogConstant.DETAIL_SPEICHERN: // save
        if (!data.dataForm.anteil && !data.dataForm.bemerkung && !data.dataForm.bgGruppeCode && !data.dataForm.buchungstext && !data.dataForm.betragSum) {
          data.event = FragenkatalogConstant.DETAIL_ABBRECHEN;
          this.action.next(data);
          return;
        }
        if (this.isValidateData()) {
          this.action.next(data);
        }
        break;
      default:
        break;
    }
  }

  isConcurrency(value: boolean) {
    this.customizeBtn[0].disabled = value;
    this.customizeBtn = [...this.customizeBtn];
  }

  isValidateData() {
    if (this.dataForm.bgGruppeCode === 0 || isNullOrUndefined(this.dataForm.bgGruppeCode)) {
      this.messageAction.emit(this.translateService.instant('ExterneBerater.Messgage.ValidateForm'));
      this.zulage.instance.focus();
      return false;
    }
    if (!this.isDisableAnteil && !this.dataForm.anteil) {
      this.messageAction.emit(this.translateService.instant('ExterneBerater.Messgage.ValidateForm'));
      this.anteilValidationError = { message: this.translateService.instant('ZulagenEfb.Message.AnteilBlank') };
      this.isAnteilValid = false;
      this.anteil.instance.focus();
      return false;
    }
    if (isNullOrUndefined(this.dataForm.betragSum)) {
      this.messageAction.emit(this.translateService.instant('ExterneBerater.Messgage.ValidateForm'));
      this.betrag.instance.focus();
      return false;
    }
    if (this.dataForm.betragSum > this.maxBetragSum) { // validate min max
      this.messageAction.emit(this.translateService.instant('ExterneBerater.Messgage.ValidateForm'));
      this.betragValidationError = { message: this.translateService.instant('ZulagenEfb.Message.Max') + ' ' + formatNumberByCulture(this.maxBetragSum) + ' ' + this.translateService.instant('ZulagenEfb.Form.Betrag') };
      this.isBetragValid = false;
      this.betrag.instance.focus();
      return false;
    } else if (this.dataForm.betragSum < this.minBetragSum) {
      this.messageAction.emit(this.translateService.instant('ExterneBerater.Messgage.ValidateForm'));
      this.betragValidationError = { message: this.translateService.instant('ZulagenEfb.Message.Min') + ' ' + formatNumberByCulture(this.minBetragSum) + ' ' + this.translateService.instant('ZulagenEfb.Form.Betrag') };
      this.isBetragValid = false;
      this.betrag.instance.focus();
      return false;
    }
    const isValid = this.validationAhvBeitrage.instance.validate().isValid; // validate requirement
    if (!isValid) {
      return false;
    }
    this.anteilValidationError = {};
    this.isAnteilValid = true;
    this.betragValidationError = {};
    this.isBetragValid = true;
    return true;
  }

  getBgPositionsartCode() {
    let bgGruppeCode = this.dataForm.bgGruppeCode;
    if (bgGruppeCode !== BgGruppeCode.IZU_Alleinerziehend && this.dataForm.alleinerziehend) {
      bgGruppeCode = bgGruppeCode + 10;
    }
    if (this.dataForm.anteil) {
      bgGruppeCode = bgGruppeCode + this.dataForm.anteil;
    }
    return bgGruppeCode;
  }

  onChangeZulage(event) {
    if (event) {
      this.isInitForm = false;
      this.isAnteilSelected = false;
      this.dataForm.bgGruppeCode = event.value;
      const bgGruppeCode = this.getBgPositionsartCode();
      this.zulageSelectAction.emit(bgGruppeCode);
      if (event.value !== BgGruppeCode.EFB) { // EFB
        this.dataForm.alleinerziehend = false;
      }
      if (event.value === BgGruppeCode.IZU_Alleinerziehend || event.value === BgGruppeCode.IZU_Auszubildende ||
        event.value === BgGruppeCode.IZU_Betrag || event.value === BgGruppeCode.MIZ || event.value === BgGruppeCode.Sanktion) {
        const zulageSelectedPositionsart = this.positionsartMasterData.filter(positionsart => positionsart.BgGruppeCode === this.dataForm.bgGruppeCode);
        if (zulageSelectedPositionsart[0]) {
          this.dataForm.buchungstext = zulageSelectedPositionsart[0].Name;
          const sqlRichtlinie = zulageSelectedPositionsart[0].BgPositionsartID;
          this.dataForm.bgKategorieCode = zulageSelectedPositionsart[0].BgKategorieCode;
          this.processAction.emit(sqlRichtlinie);
        }
      }
      if ((event.value === BgGruppeCode.EFB_Erwerbsaufnahme || event.value === BgGruppeCode.IZU || event.value === BgGruppeCode.EFB) && this.dataForm.anteil > 0) { // selected anteil and zulage
        this.unSelectZulageAnteilAlleinerziehend(true);
      }
      this.onRefreshStatusForm();
      this.anteilValidationError = {};
      this.isAnteilValid = true;
      setTimeout(() => {
        this.zulage.instance.focus();
      });
    }
  }

  onChangeAnteil(event) {
    if (event) {
      this.isInitForm = false;
      this.dataForm.anteil = event.value;
      this.isAnteilSelected = true;
      const bgGruppeCode = this.getBgPositionsartCode();
      this.zulageSelectAction.emit(bgGruppeCode);
      if (this.dataForm.alleinerziehend) {
        this.selectZulageAnteilAlleinerziehend();
      } else {
        this.unSelectZulageAnteilAlleinerziehend(false);
      }
      this.onRefreshStatusForm();
      if (!this.isDisableBetrag) {
        // this.betrag.instance.focus();
      }
    }
  }

  onChangeAlleinerziehend(event) {
    if (event) {
      this.dataForm.alleinerziehend = event.value;
      if (event.value === true) {
        this.selectZulageAnteilAlleinerziehend();
      } else {
        this.unSelectZulageAnteilAlleinerziehend(false);
      }
      const bgGruppeCode = this.getBgPositionsartCode();
      this.zulageSelectAction.emit(bgGruppeCode);
      this.onRefreshStatusForm();
    }
  }

  unSelectZulageAnteilAlleinerziehend(isZulageSelected) {
    const zulageSelectedPositionsart = this.positionsartMasterData.filter(positionsart => positionsart.BgGruppeCode === this.dataForm.bgGruppeCode);
    const arrPositionsart = zulageSelectedPositionsart.filter(positionsart => positionsart.BgPositionsartCode === this.dataForm.anteil + this.dataForm.bgGruppeCode);
    if (arrPositionsart[0]) {
      this.dataForm.buchungstext = arrPositionsart[0].Name;
      const sqlRichtlinie = arrPositionsart[0].BgPositionsartID;
      this.dataForm.bgKategorieCode = arrPositionsart[0].BgKategorieCode;
      this.processAction.emit(sqlRichtlinie);
    }
  }

  selectZulageAnteilAlleinerziehend() {
    const zulageSelectedPositionsart = this.positionsartMasterData.filter(positionsart => positionsart.BgGruppeCode === this.dataForm.bgGruppeCode + 10);
    if (zulageSelectedPositionsart) {
      const arrPositionsart = zulageSelectedPositionsart.filter(positionsart => positionsart.BgPositionsartCode === this.dataForm.anteil + this.dataForm.bgGruppeCode + 10);
      if (arrPositionsart[0]) {
        const sqlRichtlinie = arrPositionsart[0].BgPositionsartID;
        this.dataForm.buchungstext = arrPositionsart[0].Name;
        this.dataForm.bgKategorieCode = arrPositionsart[0].BgKategorieCode;
        this.processAction.emit(sqlRichtlinie);
      }
    }
  }
  // end region

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ) {
      const data = {
        event: FragenkatalogConstant.DETAIL_ABBRECHEN,
        dataForm: this.dataForm
      };
      this.action.next(data);
    } else if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS) {
      this.blurAll();
      const data = {
        event: FragenkatalogConstant.DETAIL_SPEICHERN,
        dataForm: this.dataForm
      };
      if (this.isValidateData()) {
        this.action.next(data);
      }
      event.preventDefault();
    }
    if (event.keyCode === AppEnums.KeyCode.UpArrowKey || event.key === AppEnums.ArrowKeyPress.ArrowUp) {
      this.moveFocus(false);
    } else if (event.keyCode === AppEnums.KeyCode.DownArrowKey || event.key === AppEnums.ArrowKeyPress.ArrowDown) {
      this.moveFocus(true);
    }
  }

  /*** Arrow Key*/
  moveFocus(isNext: boolean) {
    const tagNames = ['input', 'dx-check-box', 'textarea'];
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

  onFocusIn(element, field: string, key) {
    this.keyFocus = field;
    this.keyInput = key;
    this.accessKeyItemFocused = element.accessKey;
  }

  onFocusOut() {
    this.accessKeyItemFocused = 0;
    if (!this.isDisableAnteil && !this.dataForm.anteil) {
      this.anteilValidationError = { message: this.translateService.instant('ZulagenEfb.Message.AnteilBlank') };
      this.isAnteilValid = false;
      return false;
    }

    this.anteilValidationError = {};
    this.isAnteilValid = true;

  }

  blurAll() {
    const el = document.querySelector(':focus');
    if (el) {
      (el as HTMLElement).blur();
    }
  }

  onFormKeyDown(e) {
    if ((this.keyFocus === 'zulage' || this.keyFocus === 'anteil') && (e.event.keyCode === AppEnums.KeyCode.KeyF4)) {
      e.event.preventDefault();
      if (this.keyFocus === 'zulage') {
        this.zulage.opened = !this.zulage.opened;
      }
      if (this.keyFocus === 'anteil') {
        this.anteil.opened = !this.anteil.opened;
      }
    }
  }

  formatNumberBox(event) {
    if (isClearNumberBox(event) && !this.isDisableBetrag) {
      this.dataForm['betragSum'] = 0;
      setTimeout(() => {
        this.dataForm['betragSum'] = null;
      });
    }
  }
}
