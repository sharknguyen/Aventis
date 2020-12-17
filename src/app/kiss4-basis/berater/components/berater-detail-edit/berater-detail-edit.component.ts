import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@shared/components/base.component';
import { DxFormComponent, DxValidationGroupComponent } from 'devextreme-angular';
import DevExpress from 'devextreme/bundles/dx.all';
import { Kontakt, PostKontakt } from '../../models';

@Component({
  selector: 'kiss-berater-detail-edit',
  templateUrl: './berater-detail-edit.component.html',
  styleUrls: ['./berater-detail-edit.component.scss'],
})

export class BeraterFormDetailEditComponent extends BaseComponent implements OnInit {
  @ViewChild('detailBeraterForm') form: DxFormComponent;
  @ViewChild('gridInstitutionDetail') gridInstitutionDetail: any;
  @ViewChild('validation') validation: DxValidationGroupComponent;
  @Input() newForm: boolean;
  @Input() institutions: any;
  @Input() columnsDef: Array<DevExpress.ui.dxDataGridColumn>;
  @Input() beraterLanguages: any;
  @Input() formData: any;
  institutionElement;
  dirty = false;
  openedDropdownGrid = false;
  remainMessage = { visible: false, message: '' };
  focusRowStatus = true;
  froalaEditorConfig = {
    heightMin: 150,
    height: 300,
    events: {
      'froalaEditor.contentChanged': () => {
        this.dirty = true;
      }
    }
  };

  constructor(injector: Injector,
    public translateService: TranslateService) {
    super(injector);
  }

  ngOnInit() {
    this.formData = new Kontakt(this.newForm ? null : this.formData);
  }

  isDirty(): boolean {
    return this.dirty;
  }

  onFieldDataChanged(event) {
    if (event.value !== undefined) {
      this.dirty = true;
    }
  }

  getFormData(): PostKontakt {
    return {
      BaInstitutionKontaktID: this.formData.baInstitutionKontaktID ? this.formData.baInstitutionKontaktID : 0,
      BaInstitutionID: this.formData.baInstitutionID,
      Aktiv: this.formData.aktiv ? this.formData.aktiv : true,
      ManuelleAnrede: this.formData.manuelleAnrede ? this.formData.manuelleAnrede : false,
      Anrede: this.formData.anrede ? this.formData.anrede.toString().trim() : '',
      Name: this.formData.name ? this.formData.name.toString().trim() : null,
      Vorname: this.formData.vorname ? this.formData.vorname.toString().trim() : null,
      GeschlechtCode: this.formData.geschlechtCode ? this.formData.geschlechtCode : null,
      Telefon: this.formData.telefon ? this.formData.telefon.toString().trim() : '',
      Fax: this.formData.fax ? this.formData.fax.toString().trim() : '',
      EMail: this.formData.eMail ? this.formData.eMail.toString().trim() : '',
      SprachCode: this.formData.sprachCode ? this.formData.sprachCode : null,
      Bemerkung: this.formData.bemerkung ? this.formData.bemerkung.toString().trim() : '',
      Creator: this.formData.creator ? this.formData.creator : localStorage.getItem('user'),
      Created: this.formData.created ? new Date(this.formData.created) : new Date(),
      Modifier: `${localStorage.getItem('user')}, ${localStorage.getItem('user:userId')}`,
      Modified: new Date(),
      BaInstitutionKontaktTS: this.formData.baInstitutionKontaktTS ? this.formData.baInstitutionKontaktTS : null,
    };
  }

  validate(): string {
    const validationMsg = this.validation.instance.validate();
    const formMsg = this.form.instance.validate();
    if (validationMsg.isValid && formMsg.isValid) {
      return null;
    }
    return this.getValidationSummary(validationMsg.brokenRules) + this.getValidationSummary(formMsg.brokenRules);
  }

  getValidationSummary(rules: any): string {
    return rules.reduce((msgs: string, rule: any) => msgs + rule.message + '\n', '');
  }

  getSizeQualifier(width) {
    if (width < 1300) {
      return 'xs';
    }
    return 'lg';
  }
}
