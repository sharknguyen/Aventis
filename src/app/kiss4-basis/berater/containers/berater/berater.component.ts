import { Component, Injector, OnDestroy, OnInit, ViewChild, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BeraterConstant } from '@shared/common/berater.common';
import { CommonConstant, FormState } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { BeraterSandbox } from '../../berater.sandbox';
import { Kontakt } from '../../models/kontakt.models';


@Component({
  selector: 'kiss-berater',
  templateUrl: './berater.component.html',
  styleUrls: ['./berater.component.scss'],
})

export class BeraterComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild('remainMessage') remainMessage: any;
  @ViewChild('formList') formList: any;
  @ViewChild('detailForm') detailForm: any;
  @ViewChild('canDeactivate') deactivatePopup: any;
  visibleConcurrencyPopup = false;
  titlePage: any;
  listBtn = [CommonConstant.ToolbarButtons, CommonConstant.AdditionalButtons.slice(0, 7)];
  customizeBtn = [];
  queryDataSearch = {};
  beraterData: any = [];
  formData: Kontakt = new Kontakt();
  beraterLanguages = [];
  institutions = [];
  columnsDef = [
    { dataField: 'name', caption: 'Name' },
    { dataField: 'adresse', caption: 'Adresse' },
    { dataField: 'typen', caption: 'Typen' }
  ];
  columnsDataGrid = [
    { dataField: 'institution', caption: 'Institution', minWidth: '80', width: 'auto' },
    { dataField: 'name', caption: 'Name', minWidth: '80', width: 'auto' },
    { dataField: 'vorname', caption: 'Vorname', minWidth: '80', width: 'auto' },
    { dataField: 'telefon', caption: 'Telefon', minWidth: '80', width: 'auto' },
    { dataField: 'eMail', caption: 'Email', minWidth: '80', width: 'auto' }];
  selectedDataID: number;
  createdNewID: number;
  popUpModelConfirm: PopUpModel = new PopUpModel({ isVisible: false });
  readOnly = true;
  private subscriptions = new Subscription();
  constructor(injector: Injector,
    public beraterSandbox: BeraterSandbox,
    public translateService: TranslateService,
    public layoutSandbox: LayoutSandbox) {
    super(injector);
  }

  ngOnInit() {
    this.titlePage = this.translateService.instant('ExterneBerater.TitlePage');
    this.setTitle(this.titlePage);
    this.getBeraterData({});
    this.getInstitution({ baInstitutionTypId: -1, onlyActive: true });
    this.beraterSandbox.getLanguage();
    this.registerEvent();
  }

  ngOnDestroy(): void {
    this.unregisterEvent();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.isFormDirty()) {
      $event.returnValue = '';
    }
  }

  canDeactivate() {
    return this.deactivatePopup.canDeactivate(this.isFormDirty());
  }

  isFormDirty(): boolean {
    return this.detailForm.isDirty();
  }

  registerEvent() {
    this.subscriptions.add(this.beraterSandbox.beraterData$.subscribe(data => this.onBeraterData(data)));
    this.subscriptions.add(this.beraterSandbox.beraterLanguageData$.subscribe(list => this.beraterLanguages = list));
    this.subscriptions.add(this.beraterSandbox.beraterInstitutionData$.subscribe(list => this.institutions = list));
    this.subscriptions.add(this.beraterSandbox.beraterSaveKontaktData$.subscribe(data => this.onSaveKontaktData(data)));
    this.subscriptions.add(this.beraterSandbox.beraterSaveKontakDataFail$.subscribe(data => this.onSaveKontakDataFail(data)));
    this.subscriptions.add(this.beraterSandbox.beraterDelKontaktData$.subscribe(data => this.onDelKontaktData(data)));
    this.subscriptions.add(this.beraterSandbox.beraterDelKontaktFailData$.subscribe(data => this.onDelKontaktFailData(data)));
  }

  private onBeraterData(data) {
    if (!isNullOrUndefined(data)) {
      this.beraterData = data;
      this.selectedDataID = this.createdNewID && this.setSelectedItem(this.getSelectedItem());
    }
  }

  private getSelectedItem() {
    return this.beraterData.find(berater => berater.baInstitutionKontaktID === this.createdNewID);
  }

  private setSelectedItem(item) {
    this.createdNewID = undefined;
    return item && item.id;
  }

  private onSaveKontaktData(data) {
    if (!isNullOrUndefined(data)) {
      this.onCloseError();
      this.getBeraterData(this.queryDataSearch);
      this.createdNewID = data.baInstitutionKontaktId;
      this.detailForm.changeFormStatus(FormState.ReadOnly);
    }
  }

  private onSaveKontakDataFail(data) {
    if (!isNullOrUndefined(data)) {
      if (data.status && data.status === 409) {
        return this.visibleConcurrencyPopup = true;
      }
      this.showRemainMessage(this.translateService.instant('ExterneBerater.Messgage.MessageErrorEdit'));
      if (data.status && data.status === 404) {
        this.detailForm.disableButtons(true);
      }
    }
  }

  private onDelKontaktData(data) {
    if (!isNullOrUndefined(data)) {
      this.detailForm.changeFormStatus(FormState.ReadOnly);
      this.getBeraterData(this.queryDataSearch);
      this.beraterData = [];
    }
  }

  private onDelKontaktFailData(data) {
    if (!isNullOrUndefined(data)) {
      this.showRemainMessage(this.translateService.instant('ExterneBerater.Messgage.MessageDelError'));
      if (data.status && data.status === 404) {
        this.detailForm.disableButtons(true);
      }
    }
  }

  private getInstitution(query) {
    this.beraterSandbox.loadInstitution(query);
  }

  getBeraterData(query) {
    this.beraterSandbox.loadBeraterData(query);
  }

  onSearch(query) {
    this.queryDataSearch = query;
    this.getBeraterData(query);
  }

  toolBarOnItemClick(event: string) {
    this.formList.toolBarOnItemClick(event);
  }

  onSelectedRow(event) {
    this.formData = event instanceof Kontakt ? event : null;
  }

  unregisterEvent() {
    this.subscriptions.unsubscribe();
  }

  saveData(save) {
    this.beraterSandbox.saveKontakt(save);
  }

  showRemainMessage(remainMsg) {
    this.remainMessage.showMessage(remainMsg);
  }

  onCloseError() {
    this.remainMessage.hideMessage();
  }

  onLoschen() {
    this.showLoschenConfirmation();
  }

  private showLoschenConfirmation() {
    this.popUpModelConfirm = {
      ...this.popUpModelConfirm,
      isVisible: true,
      isVisibleYes: true,
      isVisibleNo: true,
      title: this.translateService.instant(BeraterConstant.ConfirmPopupTitle),
      textYes: this.translateService.instant(BeraterConstant.PopupYes),
      textNo: this.translateService.instant(BeraterConstant.PopupNo),
      message: this.translateService.instant(BeraterConstant.LoschenMessage),
      funcYes: () => this.onLoschenYes(),
      funcNo: () => this.onNo()
    };
  }

  private onYes() {
    this.onCloseError();
    this.popUpModelConfirm.isVisible = false;
  }

  private onNo() {
    this.popUpModelConfirm.isVisible = false;
  }

  onConcurrencyYes() {
    this.visibleConcurrencyPopup = false;
    this.onCloseError();
    this.getBeraterData(this.queryDataSearch);
  }

  onConcurrencyNo() {
    this.visibleConcurrencyPopup = false;
    this.detailForm.disableButtons(true);
  }

  private onLoschenYes() {
    this.onYes();
    if (!this.detailForm.isNew()) {
      this.beraterSandbox.delKontakt(this.formData.baInstitutionKontaktID, this.formData.baInstitutionKontaktTS);
    }
  }

  onFormStateChanged(event: FormState) {
    this.readOnly = event === FormState.ReadOnly;
  }
}

