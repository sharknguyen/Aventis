import {Component, Injector, Input} from '@angular/core';
import {BaseComponent} from '@shared/components/base.component';
import {AppEnums} from '@shared/AppEnum';
import {ICheck, IFinanzplan, IFinanzplanDropDown} from '@app/kiss4-sozialhilfe/regularer-finanzplan/models';
import {TranslateService} from '@ngx-translate/core';

export interface IStatusInfo {
  key?: number;
  checkInfo?: ICheck[];
  status?: number;
  infoText?: string | string[];
  statusName?: string;
}

@Component({
  selector: 'kiss-regularer-finanzplan-view',
  templateUrl: './regularer-finanzplan-view.component.html',
  styleUrls: ['./regularer-finanzplan-view.component.scss']
})
export class RegularerFinanzplanViewComponent extends BaseComponent {

  constructor(
    injector: Injector,
    public translateService: TranslateService
  ) {
    super(injector);
    this.dateFormat = AppEnums.Validation.DATE_FORMAT;
  }

  @Input() formData: IFinanzplan;
  @Input() isEditMode = false;

  @Input() set upperGrundList(data: IFinanzplanDropDown[]) {
    if (data && data.length && this.formData) {
      this.upperGrund = data.find(el => el.code === this.formData.BgGrundEroeffnenCode) ?
        data.find(el => el.code === this.formData.BgGrundEroeffnenCode).text : '';
    }
  }

  @Input() set lowerGrundList(data: IFinanzplanDropDown[]) {
    if (data && data.length && this.formData) {
      this.lowerGrund = data.find(el => el.code === this.formData.BgGrundAbschlussCode) ?
        data.find(el => el.code === this.formData.BgGrundAbschlussCode).text : '';
    }
  }

  @Input() set typeList(data: IFinanzplanDropDown[]) {
    if (data && data.length && this.formData) {
      this.type = data.find(el => el.code === this.formData.WhHilfeTypCode) ?
        data.find(el => el.code === this.formData.WhHilfeTypCode).text : '';
    }
  }

  @Input() set berechnungList(data: IFinanzplanDropDown[]) {
    if (data && data.length && this.formData) {
      this.berechnung = data.find(el => el.code === this.formData.WhGrundbedarfTypCode) ?
        data.find(el => el.code === this.formData.WhGrundbedarfTypCode).text : '';
    }
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

  upperGrund = '';
  lowerGrund = '';
  type = '';
  berechnung = '';
  dateFormat = '';

  _statusInfo: IStatusInfo;

  private _statusList: IFinanzplanDropDown[] = [];

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
