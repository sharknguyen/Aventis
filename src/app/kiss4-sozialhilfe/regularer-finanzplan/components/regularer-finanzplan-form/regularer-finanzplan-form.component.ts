import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AppEnums} from '@shared/AppEnum';
import {isEqual} from 'lodash-es';
import {BehaviorSubject, Subscription} from 'rxjs';
import {DxValidationGroupComponent} from 'devextreme-angular';
import {IFinanzplan, IFinanzplanDropDown, IFinanzplanSaveParam} from '@app/kiss4-sozialhilfe/regularer-finanzplan/models/regularer-finanzplan.models';
import {getSizeQualifier} from '@shared/utilites/utilityHelpers';
import {ICheck} from '@app/kiss4-sozialhilfe/regularer-finanzplan/models';
import {TranslateService} from '@ngx-translate/core';

interface IStatusInfo {
  key?: number;
  checkInfo?: ICheck[];
  status?: number;
  infoText?: string | string[];
  statusName?: string;
}

@Component({
  selector: 'kiss-regularer-finanzplan-form',
  templateUrl: './regularer-finanzplan-form.component.html',
  styleUrls: ['./regularer-finanzplan-form.component.scss']
})
export class RegularerFinanzplanFormComponent implements OnInit, OnDestroy {

  @Input() isEditMode = false;

  @Input() set formData(data: IFinanzplan) {
    this._formData = data;
    this.oldFormData = JSON.parse(JSON.stringify(this._formData));
    this.formDirty.next(false);
  }

  @Input() upperGrundList: IFinanzplanDropDown[];
  @Input() lowerGrundList: IFinanzplanDropDown[];
  @Input() typeList: IFinanzplanDropDown[];
  @Input() berechnungList: IFinanzplanDropDown[];

  @Input() set headerAction(value: BehaviorSubject<string>) {
    this.headerAction$ = value;
  }

  @Input() set statusList(data: IFinanzplanDropDown[]) {
    this._statusList = data;
    this.mapStatusName();
  }

  @Input() set statusInfo(data: IStatusInfo) {
    if (data) {
      this._statusInfo = Object.assign({}, data);
      this._statusInfo['infoText'] = this.getInfoText(data.checkInfo);
      this.mapStatusName();
    }
  }

  @Output() formResult = new EventEmitter<{ action: string, data?: IFinanzplanSaveParam, messageCode?: number }>();
  @Output() formDirty = new EventEmitter<boolean>(false);
  @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;

  _formData: IFinanzplan;
  dateFormat: string = AppEnums.Validation.DATE_FORMAT;
  private oldFormData: IFinanzplan;
  private headerAction$: BehaviorSubject<string>;
  private subscription: Subscription;
  sizeQualifier = getSizeQualifier;
  _statusInfo: IStatusInfo;
  private _statusList: IFinanzplanDropDown[] = [];

  constructor(public translateService: TranslateService) {
  }

  ngOnInit() {
    this.subscription = this.headerAction$.subscribe(action => {
      switch (action) {
        case 'speichern':
          if (isEqual(this._formData, this.oldFormData)) {
            this.formResult.next({action: 'speichern'});
            return;
          }
          if (!this.validationGroup.instance.validate().isValid) {
            this.formResult.next({action: 'invalid', messageCode: 5});
            return;
          }
          const messageCode = this.getMessageValidate();
          if (messageCode) {
            this.formResult.next({action: 'invalid', messageCode});
            return;
          }
          this.formResult.next({action: 'speichern', data: this.getDataToSave()});
          break;
        case 'abbrechen':
          this.formResult.next({action: isEqual(this._formData, this.oldFormData) ? 'abbrechen' : 'abbrechen-dirty'});
          break;
        default:
          this.formResult.next({action});
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription = null;
  }

  onKeyDown(event, el) {
    if (event.event.keyCode === AppEnums.KeyCode.KeyF4) {
      event.event.preventDefault();
      el.opened = !el.opened;
      return;
    }
  }

  private getMessageValidate() {
    const firstDayOfMonthDatumVon = new Date(
      new Date(this._formData.FallDatumVon).getFullYear(),
      new Date(this._formData.FallDatumVon).getMonth(),
      1
    );
    const lastDayOfMonthDatumBis = new Date(
      new Date(this._formData.FallDatumBis).getFullYear(),
      new Date(this._formData.FallDatumBis).getMonth() + 1,
      0
    );
    if (firstDayOfMonthDatumVon > new Date(this._formData.GeplantVon)) {
      return 1;
    }
    if (this._formData.FallDatumBis && lastDayOfMonthDatumBis < new Date(this._formData.GeplantBis)) {
      return 2;
    }
    if (new Date(this._formData.GeplantVon) > new Date(this._formData.GeplantBis)) {
      return 3;
    }
    if (this._formData.WhGrundbedarfTypCode && this._formData.WhGrundbedarfTypCode === 32011) {
      return 4;
    }
    return 0;
  }

  private getDataToSave(): IFinanzplanSaveParam {
    return {
      BgBewilligungStatusCode: this._formData.BgBewilligungStatusCode,
      FaLeistungID: this._formData.FaLeistungID,
      BgFinanzplanID: this._formData.BgFinanzplanID,
      WhHilfeTypCode: this._formData.WhHilfeTypCode,
      WhGrundbedarfTypCode: this._formData.WhGrundbedarfTypCode,
      GeplantVon: this._formData.GeplantVon,
      GeplantBis: this._formData.GeplantBis,
      DatumVon: this._formData.DatumVon,
      DatumBis: this._formData.DatumBis,
      BgFinanzplanTS: this._formData.BgFinanzplanTS,
      BgGrundEroeffnenCode: this._formData.BgGrundEroeffnenCode,
      BgGrundAbschlussCode: this._formData.BgGrundAbschlussCode,
      Bemerkung: this._formData.Bemerkung,
      WhGrundbedarfTypCodeIsModified: this._formData.WhGrundbedarfTypCode !== this.oldFormData.WhGrundbedarfTypCode,
      GeplantVonIsModified: this._formData.GeplantVon !== this.oldFormData.GeplantVon,
      GeplantBisIsModified: this._formData.GeplantBis !== this.oldFormData.GeplantBis,
    };
  }

  private mapStatusName() {
    if (this._statusInfo && this._statusList && this._statusList.length) {
      const itemStatus = this._statusList.find(status => status.code === this._statusInfo.status);
      this._statusInfo['statusName'] = itemStatus ? itemStatus.text : '';
    }
  }

  private getInfoText(info: ICheck[]) {
    if (!info) {
      return '';
    } else {
      const result: string[] = [];
      const updateDataMessage = this.translateService.instant('RegularerFinanzplan.StatusInfo.UpdateData');
      const savedDataMessage = this.translateService.instant('RegularerFinanzplan.StatusInfo.SavedData');
      result.push(info.find(el => el.Typ === 0) ? updateDataMessage : savedDataMessage);
      info.forEach(el => {
        if (el.Typ <= 1) {
          result.push(' - ' + el.StatusInfo);
        }
      });
      if (info.find(el => el.Typ === 2)) {
        const warning = this.translateService.instant('RegularerFinanzplan.StatusInfo.Warning');
        result.push(warning);
        info.forEach(el => {
          if (el.Typ === 2) {
            result.push(' - ' + el.StatusInfo);
          }
        });
      }
      return result;
    }
  }
}
