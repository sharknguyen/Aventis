﻿import { Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@shared/components/base.component';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { PersonenImHaushaltSandbox } from '../personen-im-haushalt.sandbox';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { IHaushalt, IKlientenSystem, IPersonenImHaushalt, IViewWhKennzahlenData } from '../models';
import { AppEnums } from '@shared/AppEnum';
import { DataGridActionService } from '../data-grid-action.service';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { Subject, Subscription } from 'rxjs';
import { IPopUpModel, PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { FallfuhrungTreeConstant } from '@shared/common/fallfuhrung-tree.common';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';

interface IDataChange {
  baPersonID: number;
  istUnterstuetzt: boolean;
  haushaltActionType: 0 | 1 | 2; // 0 : Insert/ 1: Update/ 2: Delete
  bgFinanzplan_BaPersonTS?: number[];
}

@Component({
  selector: 'app-personen-im-haushalt',
  templateUrl: './personen-im-haushalt.component.html',
  styleUrls: ['./personen-im-haushalt.component.scss']
})
@SetClassRight('Ctlpersonen-im-haushalt')
export class PersonenImHaushaltComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;
  constructor(
    injector: Injector,
    private personenImHaushaltSandbox: PersonenImHaushaltSandbox,
    private dataGridActionService: DataGridActionService,
    public translateService: TranslateService,
    public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public layoutSandbox: LayoutSandbox
  ) {
    super(injector);
  }

  upperViewWhKennzahlen: IViewWhKennzahlenData = null;
  lowerViewWhKennzahlen: IViewWhKennzahlenData = null;
  klientenSystem: IKlientenSystem[];
  haushalt: IHaushalt[];
  oldHaushalt: IHaushalt[];
  isEditMode = false;
  isShiftKeyDown = false;
  popUpModel: IPopUpModel = {
    funcYes: () => {
      if (this.isConcurrency) {
        this.processConcurrency('abbrechen');
        return;
      }
      this.resetData();
    },
    funcNo: () => {
      if (this.isConcurrency) {
        this.processConcurrency('daten');
        this.isConcurrency = false;
        return;
      }
      this.popUpModel.isVisible = false;
      this.layoutSandbox.clearDeletingSticky();
      this.navigateAwaySelection$.next(false);
    },
    funcHiding: () => {
      this.processConcurrency('close');
    },
    message: '',
    textYes: '',
    textNo: '',
    title: '',
    isVisibleTitle: true,
    isVisibleYes: true,
    isVisibleNo: true,
    isVisible: false,
  };
  disable = false;
  disableBtnSave = false;
  isConcurrency = false;
  personenData: IPersonenImHaushalt;
  private bgFinanzplanID: number = null;
  private baPersonID: number = null;
  private selectedKlienten: IKlientenSystem[] = [];
  private selectedHaushalt: IHaushalt[] = [];
  private focusedGrid: 'left' | 'right' | '';
  private subscriptions: Subscription[] = [];
  private navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
  private dataEdited: IDataChange[] = [];
  private timeout: number;

  ngOnInit() {
    this.setTitle(FallfuhrungTreeConstant.titlePage);
    // Register subscribe for selected person
    this.subscriptions.push(
      this.sozialhilfeTreeSandbox.selectedNode$.subscribe(node => {
        if (node && node.bgFinanzplanID && node.baPersonID) {
          this.baPersonID = node.baPersonID;
          this.bgFinanzplanID = node.bgFinanzplanID;
          this.registerEvents();
          this.isEditMode = false;
          if (node.editMask === 'R') {
            this.disable = true;
          } else {
            this.disable = false;
          }
        }
      }),
      this.personenImHaushaltSandbox.personenData$.subscribe(data => {
        if (!data) {
          return;
        }
        if (!this.disable && (
          data.bgBewilligungStatusCode === AppEnums.BgBewilligungStatusCode.InVorbereitung ||
          data.bgBewilligungStatusCode === AppEnums.BgBewilligungStatusCode.Abgelehnt ||
          data.bgBewilligungStatusCode === AppEnums.BgBewilligungStatusCode.Angefragt
        )) {
          this.disable = false;
        }
        if (
          data.bgBewilligungStatusCode === AppEnums.BgBewilligungStatusCode.Erteilt ||
          data.bgBewilligungStatusCode === AppEnums.BgBewilligungStatusCode.Gesperrt
        ) {
          this.disable = true;
        }
        this.personenData = data;
      }),
      this.personenImHaushaltSandbox.whKennzahlenData$.subscribe(data => {
        if (data) {
          this.upperViewWhKennzahlen = data['upperViewWhKennzahlen'];
          this.lowerViewWhKennzahlen = data['lowerViewWhKennzahlen'];
        }
      }),
      this.personenImHaushaltSandbox.klientenSystemData$.subscribe(data => {
        if (data) {
          this.klientenSystem = data['ViewKlientenSystem'];
        }
      }),
      this.personenImHaushaltSandbox.haushaltData$.subscribe(data => {
        if (data) {
          this.haushalt = data['ViewHaushaltData'];
          this.oldHaushalt = data['ViewHaushaltData'];
        }
      }),
      this.personenImHaushaltSandbox.savePersonenImHaushaltRes$.subscribe(([success, failData]) => {
        if (failData) {
          if (failData.status && failData.status === AppEnums.StatusCode.CONCURRENCY) {
            this.isConcurrency = true;
            const message = this.translateService.instant('PersonenImHaushalt.Message.ConcurrencyMsg409');
            message.replace('\r\n', '<br>');
            this.showPopupConcurrency(message);
            return;
          }
        }
        if (success || (failData && failData.status === AppEnums.StatusCode.UNPROCESSABLE_ENTITY)) {
          if (failData && failData.status === AppEnums.StatusCode.UNPROCESSABLE_ENTITY) {
            this.showInformationPopup(JSON.parse(failData._body).message);
          }
          this.dataEdited = [];
          this.registerEvents();
          this.isEditMode = false;
        }
      }),
    );
  }

  ngOnDestroy() {
    this.personenImHaushaltSandbox.resetFailData();
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
    this.personenImHaushaltSandbox.unregisterEvents();
  }

  onKlientenSystemSelectionChange(selection: number[]) {
    this.selectedKlienten = this.klientenSystem.filter(client => selection.find(id => client.baPersonID === id));
  }

  onHaushaltSelectionChange(selection: number[]) {
    this.selectedHaushalt = this.haushalt.filter(client => selection.find(id => client.baPersonID === id));
  }

  registerKlient() {
    if (!this.isEditMode || !this.klientenSystem.length) {
      return;
    }
    this.debounce(() => {
      if (!this.selectedKlienten.length) {
        this.selectedKlienten.push(this.klientenSystem[0]);
      }
      const data = this.selectedKlienten.map(client => ({
        baPersonID: client.baPersonID,
        istUnterstuetzt: true,
        nameVorname: client.nameVorname,
        geburtsdatum: client.geburtsdatum,
        alter: client.alter,
        beziehung: client.beziehung,
      }));
      this.haushalt = [...this.haushalt, ...data as IHaushalt[]];
      Array.from(this.selectedKlienten).forEach(selectedClient => {
        const indexToRemove = this.klientenSystem.findIndex(client => client.baPersonID === selectedClient.baPersonID);
        this.klientenSystem.splice(indexToRemove, 1);
      });
      this.klientenSystem = [...this.klientenSystem];
      this.onMoveData(this.selectedKlienten, 0);
      this.selectedKlienten = [];
    }, 500);
  }

  unregisterKlient() {
    if (!this.isEditMode || !this.haushalt.length) {
      return;
    }
    this.debounce(() => {
      if (!this.selectedHaushalt.length) {
        this.selectedHaushalt.push(this.haushalt[0]);
      }
      const data = this.selectedHaushalt.map(client => ({
        baPersonID: client.baPersonID,
        nameVorname: client.nameVorname,
        geburtsdatum: client.geburtsdatum,
        alter: client.alter,
        beziehung: client.beziehung,
      }));
      this.klientenSystem = [...this.klientenSystem, ...data as IKlientenSystem[]];
      Array.from(this.selectedHaushalt).forEach(selectedClient => {
        const indexToRemove = this.haushalt.findIndex(client => client.baPersonID === selectedClient.baPersonID);
        this.haushalt.splice(indexToRemove, 1);
      });
      this.haushalt = [...this.haushalt];
      this.onMoveData(this.selectedHaushalt, 2);
      this.selectedHaushalt = [];
    }, 500);
  }

  registerAllKlient() {
    if (this.isEditMode && this.klientenSystem.length) {
      this.dataEdited = [];
      this.selectedKlienten = Array.from(this.klientenSystem);
      this.registerKlient();
    }
  }

  unregisterAllKlient() {
    if (this.isEditMode && this.haushalt.length) {
      this.dataEdited = [];
      this.selectedHaushalt = Array.from(this.haushalt);
      this.unregisterKlient();
    }
  }

  setGridFocus(grid: 'left' | 'right') {
    this.focusedGrid = grid;
  }

  onHeaderAction(event) {
    switch (event) {
      case 'bearbeiten': {
        if (this.disable === false) {
          this.remainingMessage.hideMessage();
          this.isEditMode = true;
          this.sozialhilfeTreeSandbox.updateNodesStatus({
            id: this.router.url,
            isEditMode: true,
          });
        }
        break;
      }
      case 'speichern': {
        this.savePersonenImHaushalt();
        break;
      }
      case 'abbrechen': {
        if (this.isConcurrency) {
          this.disableBtnSave = false;
          this.isConcurrency = false;
          this.resetData();
          return;
        }
        if ((JSON.stringify(this.oldHaushalt) !== JSON.stringify(this.haushalt)) && this.isEditMode) {
          this.showPopup('cancel');
          return;
        }
        this.resetData();
        break;
      }
      default:
        if (this.focusedGrid === 'left') {
          this.dataGridActionService.leftGrid_Action$.next(event);
        }
        if (this.focusedGrid === 'right') {
          this.dataGridActionService.rightGrid_Action$.next(event);
        }
        break;
    }
  }

  // Tab/Arrow key
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.shiftKey) {
      this.isShiftKeyDown = true;
    }
    if (event.ctrlKey) {
      if (this.isEditMode) {
        if (event.keyCode === AppEnums.KeyCode.KeyS) {
          event.preventDefault();
          this.savePersonenImHaushalt();
          return;
        }
        if (event.keyCode === AppEnums.KeyCode.KeyZ) {
          event.preventDefault();
          this.showPopup('cancel');
          return;
        }
      }
    }
    if (!event.ctrlKey && !event.altKey) {
      if (event.keyCode === AppEnums.KeyCode.UpArrowKey) {
        event.preventDefault();
        if (this.focusedGrid === 'left') {
          this.dataGridActionService.leftGrid_Action$.next('UpArrowKey');
        }
        if (this.focusedGrid === 'right') {
          this.dataGridActionService.rightGrid_Action$.next('UpArrowKey');
        }
        return;
      }
      if (event.keyCode === AppEnums.KeyCode.DownArrowKey) {
        event.preventDefault();
        if (this.focusedGrid === 'left') {
          this.dataGridActionService.leftGrid_Action$.next('DownArrowKey');
        }
        if (this.focusedGrid === 'right') {
          this.dataGridActionService.rightGrid_Action$.next('DownArrowKey');
        }
        return;
      }
    }
  }

  @HostListener('document:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    if (event.keyCode === AppEnums.KeyCode.KeyShift) {
      this.isShiftKeyDown = false;
    }
  }

  onDblClickMessage() {
    // this.showPopup('information');
  }

  // region check exit edit mode
  canDeactivate() {
    if (JSON.stringify(this.oldHaushalt) !== JSON.stringify(this.haushalt)) {
      this.showPopup('changeform');
      return this.navigateAwaySelection$;
    }
    this.sozialhilfeTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    this.resetData();
    return true;
  }

  // Handle close/refresh the tab
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    return !((JSON.stringify(this.oldHaushalt) !== JSON.stringify(this.haushalt)) && this.isEditMode);
  }

  rowDataChange(newData: IDataChange) {
    const editedIndex = this.dataEdited.findIndex(oldData => oldData.baPersonID === newData.baPersonID);
    if (editedIndex === -1) {
      this.dataEdited.push({
        baPersonID: newData.baPersonID,
        istUnterstuetzt: newData.istUnterstuetzt,
        haushaltActionType: 1,
        bgFinanzplan_BaPersonTS: newData.bgFinanzplan_BaPersonTS,
      });
    } else if (this.dataEdited[editedIndex].haushaltActionType === 0) {
      this.dataEdited[editedIndex].istUnterstuetzt = newData.istUnterstuetzt;
    } else {
      this.dataEdited.splice(editedIndex, 1);
    }
  }

  private debounce(callback: Function, delay: number) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      callback();
      this.timeout = null;
    }, delay);
  }

  private showPopup(type: 'cancel' | 'changeform' | 'information', message = '') {
    this.popUpModel.isVisible = true;
    switch (type) {
      case 'cancel': {
        this.popUpModel.title = this.translateService.instant('PersonenImHaushalt.TitleCancelMessage');
        this.popUpModel.message = this.translateService.instant('PersonenImHaushalt.Message.ConfirmDeactive');
        this.popUpModel.textYes = this.translateService.instant('PersonenImHaushalt.Yes');
        this.popUpModel.textNo = this.translateService.instant('PersonenImHaushalt.No');
        this.popUpModel.isVisibleYes = true;
        this.popUpModel.isVisibleNo = true;
        break;
      }
      case 'changeform': {
        this.popUpModel.title = this.translateService.instant('PersonenImHaushalt.TitleCancelMessage');
        this.popUpModel.message = this.translateService.instant('PersonenImHaushalt.ConfirmMessage');
        this.popUpModel.textYes = this.translateService.instant('PersonenImHaushalt.Discard');
        this.popUpModel.textNo = this.translateService.instant('PersonenImHaushalt.Abbrechen');
        this.popUpModel.isVisibleYes = true;
        this.popUpModel.isVisibleNo = true;
        break;
      }
      case 'information': {
        this.popUpModel.title = this.translateService.instant('PersonenImHaushalt.TitleInformationMessage');
        this.popUpModel.isVisibleYes = false;
        this.popUpModel.isVisibleNo = false;
        const _message = message ||
          (this.isShiftKeyDown ?
            this.translateService.instant('PersonenImHaushalt.ShiftClickMessage') + ' (' + 'ID=' + this.baPersonID + ')' :
            this.translateService.instant('PersonenImHaushalt.DoubleClickMessage'));
        this.popUpModel.message = this.translateService.instant(_message);
        break;
      }
      default:
    }
  }

  private registerEvents() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.remainingMessage.hideMessage();
    });
    if (!this.bgFinanzplanID || !this.baPersonID) {
      return;
    }
    this.personenImHaushaltSandbox
      .loadPersonenImHaushaltInitData(
        {
          bgFinanzplanID: this.bgFinanzplanID,
          baPersonID: this.baPersonID
        }
      );
  }

  private savePersonenImHaushalt() {
    if (!this.isEditMode) {
      return;
    }
    if (this.dataEdited.length) {
      const body = {
        BgFinanzplanID: this.bgFinanzplanID,
        BaPersonItems: this.dataEdited.map(el => ({
          BaPersonID: el.baPersonID,
          IstUnterstuetzt: this.haushalt.find(person => person.baPersonID === el.baPersonID) ? this.haushalt.find(person => person.baPersonID === el.baPersonID).istUnterstuetzt : true,
          HaushaltActionType: el.haushaltActionType,
          BgFinanzplan_BaPersonTS: this.haushalt.find(person => person.baPersonID === el.baPersonID) ? this.haushalt.find(person => person.baPersonID === el.baPersonID).bgFinanzplan_BaPersonTS
            : el.bgFinanzplan_BaPersonTS,
        })),
        UserID: 0
      };
      this.personenImHaushaltSandbox.savePersonenImHaushaltData(body);
      this.sozialhilfeTreeSandbox.updateNodesStatus({
        id: this.router.url,
        isEditMode: false,
      });
    } else {
      this.resetData();
    }
  }

  private resetData() {
    this.registerEvents();
    this.isEditMode = false;
    this.sozialhilfeTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false,
      }
    );
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    this.navigateAwaySelection$.next(true);
    this.popUpModel.isVisible = false;
    this.remainingMessage.hideMessage();
  }

  private onMoveData(movedItem: IKlientenSystem[] | IHaushalt[], actionType: 0 | 2) { // insert - update only
    const _movedItem = Array.from(movedItem as IHaushalt[]);
    _movedItem.forEach(newData => {
      const editedIndex = this.dataEdited.findIndex(oldData => oldData.baPersonID === newData.baPersonID);
      if (editedIndex === -1) {
        this.dataEdited.push({
          baPersonID: newData.baPersonID,
          istUnterstuetzt: actionType === 0 ? true : newData.istUnterstuetzt,
          haushaltActionType: actionType,
        });
      } else {
        const itemEdit = this.dataEdited[editedIndex];
        if (itemEdit.haushaltActionType === 0) {
          this.dataEdited.splice(editedIndex, 1);
        } else {
          this.dataEdited[editedIndex].haushaltActionType = actionType;
        }
      }
    });
  }
  showPopupConcurrency(message) {
    this.popUpModel.message = message;
    this.popUpModel.isVisibleNo = true;
    this.popUpModel.isVisibleYes = true;
    this.popUpModel.textYes = this.translateService.instant('PersonenImHaushalt.Abbrechen');
    this.popUpModel.textNo = this.translateService.instant('PersonenImHaushalt.Daten');
    this.popUpModel.title = this.translateService.instant('PersonenImHaushalt.TitleCancelMessage');
    this.popUpModel.isVisible = true;
  }
  processConcurrency(key: string) {
    this.popUpModel.isVisible = false;
    if (key === 'abbrechen' || key === 'close') {
      this.disableBtnSave = true;
      return;
    }
    if (key === 'daten') {
      // load form data latest in edit mode
      this.resetData();
      this.disableBtnSave = false;
      this.dataEdited = [];
      this.isEditMode = true;
      return;
    }
  }
  showInformationPopup(message) {
    this.popUpModel.message = message;
    this.popUpModel.isVisibleNo = false;
    this.popUpModel.isVisibleYes = false;
    this.popUpModel.isVisibleTitle = true;
    this.popUpModel.title = this.translateService.instant('PersonenImHaushalt.TitleInformationMessage');
    this.popUpModel.isVisible = true;
  }
}
