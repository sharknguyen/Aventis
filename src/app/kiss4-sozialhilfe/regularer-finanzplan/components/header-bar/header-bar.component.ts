import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DatePipe} from '@angular/common';
import {AppEnums} from '@shared/AppEnum';
import {copyElement} from '@shared/utilites/index';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'kiss-header-bar-regularer-finanzplan',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit, OnDestroy {

  constructor(
    private datePipe: DatePipe,
    private translateService: TranslateService
  ) {
  }

  @Input() isShiftKeyDown = false;

  @Input() set isEditMode(value: boolean) {
    this.setEditMode(value);
  }
  @Input()
  set isConcurrency(value: boolean) {
    this.customizeBtn[5].disabled = value;
    this.customizeBtn = [...this.customizeBtn];
  }

  @Input() set titleData([personData, nodeData]) {
    if (nodeData && personData) {
      this.id = nodeData.baPersonID.toString();
      this._personData = personData;
      this.personInfo = `${personData.nameVorname}, (${this.datePipe.transform(personData.geburtsdatum, AppEnums.Validation.DATE_FORMAT)}) ` +
        `- [Id: ${nodeData.baPersonID}]`;
      this.headerTitle = this.personInfo + ` > ${this.pageTitle}, ` +
        this.translateService.instant('PersonenImHaushalt.HeaderBar.FinanzplanVon') +
        ` ${this.datePipe.transform(personData.finanzplanVon, AppEnums.Validation.DATE_FORMAT)} ` +
        this.translateService.instant('PersonenImHaushalt.HeaderBar.FinanzplanBis') +
        ` ${this.datePipe.transform(personData.finanzplanBis, AppEnums.Validation.DATE_FORMAT)}`;
    }
  }

  @Input() set disableBtnData(data: { bewilligung: number, editMask: string }) {
    if (data && data.bewilligung && data.editMask) {
      if (data.editMask === 'R') {
        this.customizeBtn[2].disabled = true;
        this.customizeBtn[3].disabled = true;
        this.customizeBtn[4].disabled = true;
      } else {
        this.customizeBtn[2].disabled = false;
        this.customizeBtn[3].disabled = data.bewilligung < 5;
        this.customizeBtn[4].disabled = data.bewilligung >= 5;
      }
      this.customizeBtn = [...this.customizeBtn];
    }
  }

  @Output() action = new EventEmitter<string>();
  listBtn = [[], []];
  customizeBtn = [
    {
      text: 'RegularerFinanzplan.Header.Aktualisieren',
      hint: this.translateService.instant('RegularerFinanzplan.Header.Aktualisieren'),
      visible: true,
      disabled: false,
      name: 'aktualisieren',
      icon: 'refresh',
      class: 'i031-button'
    },
    {
      text: 'RegularerFinanzplan.Header.Verlauf',
      hint: this.translateService.instant('RegularerFinanzplan.Header.Verlauf'),
      visible: true,
      disabled: false,
      name: 'verlauf',
      icon: 'folder',
      class: 'i031-button'
    },
    {
      text: 'RegularerFinanzplan.Header.Bewilligung',
      hint: this.translateService.instant('RegularerFinanzplan.Header.Bewilligung'),
      visible: true,
      disabled: false,
      name: 'bewilligung',
      icon: 'assets/icon/ic_key.png',
      class: 'i031-button'
    },
    {
      text: 'RegularerFinanzplan.Header.Beenden',
      hint: this.translateService.instant('RegularerFinanzplan.Header.Beenden'),
      visible: true,
      disabled: false,
      name: 'beenden',
      icon: 'bookmark',
      class: 'i031-button'
    },
    {
      text: 'RegularerFinanzplan.Header.Bearbeiten',
      hint: this.translateService.instant('RegularerFinanzplan.Header.Bearbeiten'),
      visible: true,
      disabled: false,
      name: 'bearbeiten',
      icon: 'edit',
      class: 'i031-button'
    },

    {
      text: 'RegularerFinanzplan.Header.Speichern',
      hint: this.translateService.instant('RegularerFinanzplan.Header.Speichern'),
      visible: false,
      disabled: false,
      name: 'speichern',
      icon: 'save',
      class: 'i031-button'
    },
    {
      text: 'RegularerFinanzplan.Header.Abbrechen',
      hint: this.translateService.instant('RegularerFinanzplan.Header.Abbrechen'),
      visible: false,
      disabled: false,
      name: 'abbrechen',
      icon: 'close',
      class: 'i031-button'
    },
  ];
  headerTitle = '';
  private pageTitle = this.translateService.instant('RegularerFinanzplan.PageTitle1');
  private id = '';
  private personInfo = '';
  private subscriptions = new Subscription();
  private _personData: any;

  ngOnInit() {
    this.registerEvents();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  registerEvents() {
    this.subscriptions.add(this.translateService.onLangChange.subscribe(() => this.loadMultilangguage()));
  }

  loadMultilangguage() {
    this.headerTitle = this.personInfo + ` > ${this.pageTitle}, ` +
      this.translateService.instant('PersonenImHaushalt.HeaderBar.FinanzplanVon') +
      ` ${this.datePipe.transform(this._personData.finanzplanVon, AppEnums.Validation.DATE_FORMAT)} ` +
      this.translateService.instant('PersonenImHaushalt.HeaderBar.FinanzplanBis') +
      ` ${this.datePipe.transform(this._personData.finanzplanBis, AppEnums.Validation.DATE_FORMAT)}`;
  }

  toolBarOnItemClickTopGrd(event: string) {
    this.action.next(event);
  }

  onCopyTitle() {
    if (this.isShiftKeyDown) {
      copyElement(this.id);
    } else {
      copyElement(this.personInfo);
    }
  }

  private setEditMode(status: boolean) {
    this.customizeBtn[0].visible = !status;
    this.customizeBtn[1].visible = !status;
    this.customizeBtn[2].visible = !status;
    this.customizeBtn[3].visible = !status;
    this.customizeBtn[4].visible = !status;
    this.customizeBtn[5].visible = status;
    this.customizeBtn[6].visible = status;
    this.customizeBtn = [...this.customizeBtn];
  }
}
