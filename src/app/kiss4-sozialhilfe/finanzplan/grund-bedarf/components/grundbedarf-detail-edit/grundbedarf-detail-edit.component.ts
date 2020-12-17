import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { QryBgPositionDataModel, QryKennzahlenModel, RichtlinieDataModel, SelectboxModel } from '@app/kiss4-sozialhilfe/finanzplan/grund-bedarf/models';
import { AppEnums } from '@shared/AppEnum';
import { GrundBedarfConstant } from '@shared/common/sozialhilfe.common';
import { getLanguageCodeFromLocalStorage, getSizeQualifier } from '@shared/utilites/utilityHelpers';
import { DxNumberBoxComponent, DxValidationGroupComponent, DxValidatorComponent, DxSelectBoxComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs';
import { isClearNumberBox } from '@shared/utilites/utilityHelpers';

@Component({
  selector: 'kiss-grundbedarf-detail-edit',
  templateUrl: './grundbedarf-detail-edit.component.html',
  styleUrls: ['./grundbedarf-detail-edit.component.scss']
})
export class GrundBedarfDetailEditComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input()
  typeFormatNumber: string;
  // Datasource
  @Input()
  qryBgPositionData = new QryBgPositionDataModel();
  @Input()
  qryKennzahlenData = new QryKennzahlenModel();
  @Input()
  richtlinieData = new RichtlinieDataModel();
  @Input()
  dataSourceSelectboxes: SelectboxModel[] = [];
  @Input()
  BgPositionsartCode: number;
  @Input()
  readOnlySettingComponents: any;
  @Input()
  visibleGroup: any;
  @Input()
  visibleComponent: any;
  @Input()
  SKOS2005_HGReadMode: any;
  @Input()
  SKOS2005_UEReadMode: any;
  @Input()
  AbzugVVGReadMode: any;
  @Input()
  SKOS2005_TotalReadMode: any;
  @Input()
  ELSE_TotalReadMode: any;
  @Input()
  GBI_HgReadMode: any;
  @Input()
  GBIZuschlag_HgReadMode: any;
  @Input()
  GBII_HgReadMode: any;
  @Input()
  Betrag_SKOSReadMode: any;
  @Input()
  GrundbedarfZusatzReadMode: any;
  @Input()
  GrundbedarfIIReadMode: any;
  @Input()
  GrundbedarfTotalReadMode: any;
  @Input()
  fraELSE: any;
  @Input()
  lblELSE_Betrag: any;
  SKOS2005_Total: any;
  ELSE_Total: any;
  GrundbedarfTotal: any;
  @Output() isDirtyDataFormEvent = new EventEmitter();
  @Output() leaveEvent = new EventEmitter();
  @ViewChild('validationGroupgrundbedarf') validationGroupgrundbedarf: DxValidationGroupComponent;
  @ViewChild('edtAnpassungfurUE_SKOS2005') edtAnpassungfurUE_SKOS2005: DxNumberBoxComponent;
  @ViewChild('validatorGrunbedarfAnpassfurUESKOS2005') validatorGrunbedarfAnpassfurUESKOS2005: DxValidatorComponent;
  @ViewChild('edtMonatlicherfurUE_berechnungsgrundlage') edtMonatlicherfurUE_berechnungsgrundlage: DxNumberBoxComponent;
  @ViewChild('validatorMonatlicherfurUEBerechnungsgrundlage') validatorMonatlicherfurUEBerechnungsgrundlage: DxValidatorComponent;
  @ViewChild('edtAnpassungfurUE_berechnungsgrundlage') edtAnpassungfurUE_berechnungsgrundlage: DxNumberBoxComponent;
  @ViewChild('validatorAnpassungfurUEBerechnungsgrundlage') validatorAnpassungfurUEBerechnungsgrundlage: DxValidatorComponent;
  @ViewChild('edtAnpassungIfurUE_SKOSbzw') edtAnpassungIfurUE_SKOSbzw: DxNumberBoxComponent;
  @ViewChild('validatorAnpassungIfurUE_SKOSbzw') validatorAnpassungIfurUE_SKOSbzw: DxValidatorComponent;
  @ViewChild('edtAnpassungIIfurUE_SKOSbzw') edtAnpassungIIfurUE_SKOSbzw: DxNumberBoxComponent;
  @ViewChild('validatorAnpassungIIfurUE_SKOSbzw') validatorAnpassungIIfurUE_SKOSbzw: DxValidatorComponent;
  @ViewChild('BerechnungsgrundlageTemplate') berechnungsgrundlageTemplate: DxSelectBoxComponent;

  numberFormat = GrundBedarfConstant.NUMBER_FORMAT;
  bgPositionsartIdNebe = GrundBedarfConstant.BG_POSITIONSART_ID_NEBE;
  temp: string;
  subscription = new Subscription();
  getSizeQualifier = getSizeQualifier;
  ngAfterViewInit() {
    setTimeout(() => {
      this.berechnungsgrundlageTemplate.instance.focus();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onFocusOut($event: any, key: string) {
    this.isDirtyDataFormEvent.emit({ result: true });
    this.leaveEvent.emit({ result: true });
  }
  validationCallback(event) {
    return event.value >= AppEnums.Money.MIN_VALUE && event.value <= AppEnums.Money.MAX_VALUE;
  }
  validationCallbackMAX500(event) {
    return event.value >= AppEnums.Money.MIN_VALUE && event.value <= AppEnums.Money.MAX_500;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.qryBgPositionData) {
      this.getReadModeData();
    }
  }
  getReadModeData() {
    this.SKOS2005_Total = this.formatNumber(this.qryBgPositionData.SKOS2005_UE ? this.qryBgPositionData.SKOS2005_Total : this.qryBgPositionData.SKOS2005_Total + this.richtlinieData.UE_DEF);
    this.ELSE_Total = this.formatNumber(this.qryBgPositionData.ELSE_Total);
    this.GrundbedarfTotal = this.formatNumber(this.qryBgPositionData.GrundbedarfTotal);
  }
  formatNumber(source: any) {
    if (source || source === 0) {
      this.temp = (+ source.toFixed(2)).toLocaleString(getLanguageCodeFromLocalStorage());
    } else {
      this.temp = '';
    }
    if ((this.temp || this.temp === '0') && this.temp.indexOf('.') === -1) {
      this.temp += '.00';
    }
    return this.temp;
  }

  formatNumberBox(event) {
    if (isClearNumberBox(event)) {
      event.component.reset();
    }
  }
}
