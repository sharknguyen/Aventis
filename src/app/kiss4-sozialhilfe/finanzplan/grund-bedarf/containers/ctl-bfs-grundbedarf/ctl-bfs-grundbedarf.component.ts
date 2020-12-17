import { Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { TabModuleFallbearbeitungSandbox } from '@app/kiss4-main/tab-module-fallbearbeitung/tab-module-fallbearbeitung.sandbox';
import { GrundBedarfSandbox } from '@app/kiss4-sozialhilfe/finanzplan/grund-bedarf/grund-bedarf.sandbox';
import { RichtlinieDataModel } from '@app/kiss4-sozialhilfe/finanzplan/grund-bedarf/models';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { GrundBedarfConstant } from '@shared/common/sozialhilfe.common';
import { BaseComponent } from '@shared/components/base.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { copyElement } from '@shared/utilites';
import { Subscription } from 'rxjs/Subscription';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';

@Component({
  selector: 'kiss-ctl-bfs-grundbedarf',
  templateUrl: './ctl-bfs-grundbedarf.component.html',
  styleUrls: ['./ctl-bfs-grundbedarf.component.scss']
})
@SetClassRight('CtlGrundBedarf')
export class CtlBfsGrundbedarfComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  //#region 'Declare decorator'
  @ViewChild('formDetail') formDetail: any;
  @ViewChild('printer') printer: PrinterComponent;
  @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;
  //#endregion

  //#region "Declare variables Array"
  private subscriptions: Subscription[] = [];
  isViewMode = true;
  isSxMode = false;
  pageTitle: any;
  pageTitleTemp: string;
  isErrorClosed: any;
  listBtn = [[], []];
  customizeBtn = [
    {
      text: 'I007GrundBedarf.Button.Bearbeiten',
      visible: true,
      name: 'bearbeiten',
      disabled: false,
      icon: 'edit',
      type: 'default',
      class: 'i007-button'
    },
    {
      text: 'I007GrundBedarf.Button.Speichern',
      visible: false,
      name: 'speichern',
      disabled: false,
      icon: 'save',
      class: 'i007-button',
      type: 'default'
    },
    {
      text: 'I007GrundBedarf.Button.Abbrechen',
      visible: false,
      name: 'abbrechen',
      disabled: false,
      icon: 'close',
      class: 'i007-button',
      type: 'default'
    },
  ];
  popUpModel: PopUpModel;
  isShiftKeyDown = false;
  baPersonId: number;
  bgBudgetID: number;
  bgFinanzplanID: number;
  disableEditBtn = false;
  disabledSpeichern = false;
  datenConcurrency = false;
  richtlinieData = new RichtlinieDataModel();
  //#endregion
  constructor(
    injector: Injector,
    public translateService: TranslateService,
    public GrundBedarfSandboxes: GrundBedarfSandbox,
    public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
    public tabModuleFallbearbeitungSandbox: TabModuleFallbearbeitungSandbox,
    public router: Router) {
    super(injector);
  }
  ngOnInit() {
    this.registerEvents();
    this.remainingMessage.hideMessage();
    this.initPopUpModel();
  }

  ngOnDestroy() {
    this.unregisterEvents();
  }

  /**
   * register events sand box
   */
  registerEvents() {
    // Register subscribe for selected person
    this.subscriptions.push(
      this.tabModuleFallbearbeitungSandbox.getPersonInfoTitel$.subscribe(person => {
        if (person) {
          this.pageTitle = person.titleText;
          this.pageTitleTemp = person.titleText;
        }
      })
    );
    // Register subscribe for selected node from sidebar
    this.subscriptions.push(
      this.sozialhilfeTreeSandbox.selectedNode$.subscribe(selectedNode => {
        if (selectedNode && selectedNode.bgBudgetID > 0) {
          this.setInitialParams(selectedNode);
          this.setEditMask(selectedNode);
        }
      })
    );
    this.subscriptions.push(this.GrundBedarfSandboxes.LoadStatusCodeData$.subscribe(data => {
      if (data && data.length > 0) {
        if (data[0].bgBewilligungStatusCode === AppEnums.BgBewilligungStatusCode.InVorbereitung
          || data[0].bgBewilligungStatusCode === AppEnums.BgBewilligungStatusCode.Abgelehnt
          || data[0].bgBewilligungStatusCode === AppEnums.BgBewilligungStatusCode.Angefragt) {
          this.disableEditBtn = false;
        }
        if (data[0].bgBewilligungStatusCode === AppEnums.BgBewilligungStatusCode.Erteilt
          || data[0].bgBewilligungStatusCode === AppEnums.BgBewilligungStatusCode.Gesperrt
          || this.isSxMode) {
          this.disableEditBtn = true;
        }
        this.customizeBtn[0].disabled = this.disableEditBtn;
        this.customizeBtn = [...this.customizeBtn];
      }

    })
    );
    // Register subscribe for load Richtlinie data
    this.subscriptions.push(this.GrundBedarfSandboxes.LoadRichtlinieData$.subscribe(richtlinieDatas => {
      if (richtlinieDatas && richtlinieDatas.length > 0) {
        this.richtlinieData = richtlinieDatas[0];
      }
    }));
  }
  private setInitialParams(selectedNode) {
    this.baPersonId = selectedNode.baPersonID;
    this.bgFinanzplanID = selectedNode.bgFinanzplanID;
    this.bgBudgetID = selectedNode.bgBudgetID;
    this.GrundBedarfSandboxes.loadStatusCodeData({ bgFinanzplanID: this.bgFinanzplanID, baPersonID: this.baPersonId });
    this.loadData(selectedNode.bgBudgetID);
  }
  setEditMask(selectedNode) {
    if (selectedNode.editMask === 'R') {
      this.isSxMode = true;
      return;
    }
    this.isSxMode = false;
  }
  /**
   *  unregister subscription on destroy component
   */
  private unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  initPopUpModel() {
    this.popUpModel = new PopUpModel(
      {
        title: '',
        isVisibleTitle: true,
        isVisible: false,
        message: '',
        textYes: '',
        isVisibleYes: true,
        textNo: '',
        isVisibleNo: true,
        funcYes: null,
        funcNo: null,
      }
    );
  }

  /**
   * @param event
   */
  toolBarOnItemClick(event: string) {
    switch (event) {
      case GrundBedarfConstant.BEARBEITEN_BUTTON:
        this.onClickEditBtn();
        break;
      case GrundBedarfConstant.SPEICHERN_BUTTON:
        this.formDetail.onClickSaveBtn();
        break;
      case GrundBedarfConstant.ABBRECHEN_BUTTON:
        if (this.disabledSpeichern) {
          this.cancelConcurrency();
          return;
        }
        this.formDetail.onClickCancelBtn();
        break;
      default:
        break;
    }
  }
  cancelConcurrency() {
    this.loadData(this.bgBudgetID);
    this.isViewMode = true;
    this.ChangeToViewMode(this.isViewMode);
    this.disabledSpeichern = false;
    this.customizeBtn[1].disabled = this.disabledSpeichern;
    this.customizeBtn = [...this.customizeBtn];
  }
  onClickEditBtn() {
    this.isViewMode = false;
    this.customizeBtn[0].visible = this.isViewMode;
    this.customizeBtn[1].visible = !this.isViewMode;
    this.customizeBtn[2].visible = !this.isViewMode;
    this.customizeBtn = [...this.customizeBtn];
    this.formDetail.showPencilIcon(true);
  }

  ChangeToViewMode(isViewMode) {
    this.customizeBtn[0].visible = isViewMode;
    this.customizeBtn[1].visible = !isViewMode;
    this.customizeBtn[2].visible = !isViewMode;
    this.customizeBtn = [...this.customizeBtn];
    this.formDetail.showPencilIcon(false);
  }
  changeToViewModeEvent($event) {
    this.isViewMode = $event.result;
    this.ChangeToViewMode(this.isViewMode);
    this.remainingMessage.hideMessage();
  }
  /**
   * Shortcuts Key
   * */
  @HostListener('document:keyup', ['$event'])
  public keyUpEvent(event: KeyboardEvent) {
    if (event.keyCode === AppEnums.KeyCode.KeyShift) {
      event.preventDefault();
      this.isShiftKeyDown = false;
    }
  }

  @HostListener('document:keydown', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS) {
      if (!this.isViewMode) {
        event.preventDefault();
        this.formDetail.onClickSaveBtn();
      }
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ) {
      event.preventDefault();
      if (!this.isViewMode) {
        if (this.disabledSpeichern) {
          this.cancelConcurrency();
          return;
        }
        this.formDetail.onClickCancelBtn();
      }
    }
    if ((event.shiftKey || event.metaKey)) {
      this.isShiftKeyDown = true;
    }
  }
// Handle close/refresh the tab
@HostListener('window:beforeunload', ['$event'])
unloadNotification($event: any) {
  if (this.formDetail.isModifyData()) {
    return false;
  }
  return true;
}
  canDeactivate() {
    return this.formDetail.canDeactivate();
  }

  onCopyTitle() {
    let text;
    if (this.isShiftKeyDown) {
      text = this.baPersonId.toString();
    } else {
      text = this.pageTitleTemp;
    }
    copyElement(text);
  }
  handleActionPopup(key, message: string) {
    this.initPopUpModel();
    if (key === 'messagePopup') {
      this.showMesagePopup(message);
    }
    return message;
  }
  showMesagePopup(message) {
    this.popUpModel.message = message;
    this.popUpModel.isVisibleNo = false;
    this.popUpModel.isVisibleYes = false;
    this.popUpModel.isVisibleTitle = true;
    this.popUpModel.title = this.translateService.instant('I007GrundBedarf.Msg.Information');
    this.popUpModel.isVisible = true;
  }

  displayRemainingMessage($event) {
    this.remainingMessage.showMessage($event.messageErr);
  }
  isConcurrencyEvent($event) {
    if ($event.result === 'abbrechen' || $event.result === 'close') {
      this.customizeBtn[1].disabled = true;
      this.customizeBtn = [...this.customizeBtn];
      this.disabledSpeichern = true;
      this.formDetail.showPencilIcon(true);
      return;
    }
    if ($event.result === 'daten') {
      // load form data latest in edit mode
      this.loadData(this.bgBudgetID);
      this.datenConcurrency = true;
      return;
    }
  }
  refreshDataEvent($event) {
    // TO DO: refresh form after save
  }
  loadData(bgBudgetID) {
    this.GrundBedarfSandboxes.loadPauschaleSTEData();
    this.GrundBedarfSandboxes.loadGrundBedarfInitFormData({ bgBudgetID: bgBudgetID });
    this.GrundBedarfSandboxes.loadRichtlinieData({ bgBudgetID: bgBudgetID });
  }
  titleTextEvent($event) {
    this.pageTitle = this.pageTitleTemp + ' > ' + $event.lblTitelText;
  }
}
