import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { QryBgPositionDataModel, QryKennzahlenModel, RichtlinieDataModel, SelectboxModel } from '@app/kiss4-sozialhilfe/finanzplan/grund-bedarf/models';
import { getLanguageCodeFromLocalStorage, getSizeQualifier } from '@shared/utilites/utilityHelpers';
@Component({
  selector: 'kiss-grundbedarf-detail-view',
  templateUrl: './grundbedarf-detail-view.component.html',
  styleUrls: ['./grundbedarf-detail-view.component.scss']
})
export class GrundBedarfDetailViewComponent implements OnChanges {
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
  readOnlySettingComponents: any;
  @Input()
  visibleGroup: any;
  @Input()
  visibleComponent: any;
  @Input()
  berechnungsgrundlageValueSelectbox: string;
  @Input()
  SKOS2005_HGReadMode: any;
  @Input()
  SKOS2005_UEReadMode: any;
  @Input()
  AbzugVVGReadMode: any;
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
  fraELSE: any;
  @Input()
  lblELSE_Betrag: any;
  SKOS2005_AnpassungReadMode: any;
  SKOS2005_TotalReadMode: any;
  ELSE_BetragReadMode: any;
  ELSE_AnpassungReadMode: any;
  ELSE_TotalReadMode: any;
  GrundbedarfI_AnpassungReadMode: any;
  GrundbedarfII_AnpassungReadMode: any;
  GrundbedarfTotalReadMode: any;
  temp: string;
  getSizeQualifier = getSizeQualifier;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.qryBgPositionData) {
      this.getReadModeData();
    }
  }
  getReadModeData() {
    this.SKOS2005_AnpassungReadMode = this.formatNumber(this.qryBgPositionData.SKOS2005_Anpassung);
    this.SKOS2005_TotalReadMode = this.formatNumber(this.qryBgPositionData.SKOS2005_UE ? this.qryBgPositionData.SKOS2005_Total : this.qryBgPositionData.SKOS2005_Total + this.richtlinieData.UE_DEF);
    this.ELSE_BetragReadMode = this.formatNumber(this.qryBgPositionData.ELSE_Betrag);
    this.ELSE_AnpassungReadMode = this.formatNumber(this.qryBgPositionData.ELSE_Anpassung);
    this.ELSE_TotalReadMode = this.formatNumber(this.qryBgPositionData.ELSE_Total);
    this.GrundbedarfI_AnpassungReadMode = this.formatNumber(this.qryBgPositionData.GrundbedarfI_Anpassung);
    this.GrundbedarfII_AnpassungReadMode = this.formatNumber(this.qryBgPositionData.GrundbedarfII_Anpassung);
    this.GrundbedarfTotalReadMode = this.formatNumber(this.qryBgPositionData.GrundbedarfTotal);
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
}

