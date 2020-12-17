import { AfterViewInit, Component, Injector, OnDestroy, OnInit, ViewChild, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { Router } from '@angular/router';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { IPopUpModel, PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { BaseComponent } from '@shared/components/base.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { FragenkatalogConstant } from '@shared/common/sostat.common';
import { AppEnums } from '@shared/AppEnum';
import { isNullOrUndefined } from 'util';
import { BgPosition, IAnteilSelectBoxData } from '@app/kiss4-sozialhilfe/finanzplan/zulagen-efb/models';
import { cloneDeep } from 'lodash-es';
import { ZulagenEFBSandbox } from '@app/kiss4-sozialhilfe/finanzplan/zulagen-efb/zulagen-efb.sandbox';
import { DatePipe } from '@angular/common';
import { TabModuleFallbearbeitungSandbox } from '@app/kiss4-main/tab-module-fallbearbeitung/tab-module-fallbearbeitung.sandbox';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { CommonConstant } from '@shared/common/constant.common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kiss-zulagen-efb',
  templateUrl: './zulagen-efb.component.html',
  styleUrls: ['./zulagen-efb.component.scss']
})
export class ZulagenEfbComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate, AfterViewInit {
  @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;
  @ViewChild('zulagenGrid') zulagenGrid: any;
  @ViewChild('editForm') editForm: any;
  @ViewChild('viewForm') viewForm: any;
  isDisableGrid = false;
  isEditMode = false;
  isCopyId = false;
  isDisableBtnEdit = false;
  popUpModel: IPopUpModel = {
    funcYes: () => {
      this.popUpModel.isVisible = false;
      this.resetModeEdit();
    },
    funcNo: () => {
      this.popUpModel.isVisible = false;
      this.layoutSandbox.clearDeletingSticky();
      this.navigateAwaySelection$.next(false);
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
  visibleConcurrencyPopup = false;
  statusConcurrency = false;
  private baPersonID: number = null;
  private bgBudgetID: number = null;
  private buchungstext = '';
  isNurAktuelleAnzeigen = false;
  private subscriptions: Subscription[] = [];
  private navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
  private indexRowSelected: number = null;
  zulageGridData: BgPosition[];
  dataForm: BgPosition;
  dataView: BgPosition;
  zulageSelectBoxData: any;
  anteilSelectBoxData: IAnteilSelectBoxData[];
  personenData: any;
  datumVon: string;
  datumBis: string;
  remainMessage: string;
  positionsartMasterData: any[];
  bgPositionsartId: any;
  bgBewilligungStatusCode: number;
  bgFinanzplanId: number;
  formAction$ = new BehaviorSubject<any>(null);
  viewAction$ = new BehaviorSubject<number>(null);
  changeParamAction$ = new BehaviorSubject<any>(null);
  private oldbgPositionsartID: any;

  //#region 'Fake data'
  anteilSelectBoxFakeData: IAnteilSelectBoxData[] = [
    {
      anteilCode: 1,
      anteilText: '01-20%'
    },
    {
      anteilCode: 2,
      anteilText: '21-30%'
    },
    {
      anteilCode: 3,
      anteilText: '31-40%'
    },
    {
      anteilCode: 4,
      anteilText: '41-50%'
    },
    {
      anteilCode: 5,
      anteilText: '51-60%'
    },
    {
      anteilCode: 6,
      anteilText: '61-70%'
    },
    {
      anteilCode: 7,
      anteilText: '71-80%'
    },
    {
      anteilCode: 8,
      anteilText: '81-90%'
    },
    {
      anteilCode: 9,
      anteilText: '100%'
    }
  ];
  //#endregion

  constructor(
    injector: Injector,
    public translateService: TranslateService, public zulagenEFBSandbox: ZulagenEFBSandbox,
    public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
    public router: Router,
    public layoutSandbox: LayoutSandbox,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    public tabModuleFallbearbeitungSandbox: TabModuleFallbearbeitungSandbox
  ) {
    super(injector);
  }

  ngOnInit() {
    this.anteilSelectBoxData = this.anteilSelectBoxFakeData;
    this.indexRowSelected = 0;
    this.resetModeEdit();
    this.registerEvents();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.zulagenEFBSandbox.clearDataPosition();
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
      this.subscriptions = [];
    });
    this.zulagenEFBSandbox.registerEvents();
  }

  registerEvents() {
    let personen: any = null;
    this.subscriptions.push(
      this.tabModuleFallbearbeitungSandbox.getPersonInfoTitel$.subscribe(data => {
        if (isNullOrUndefined(data) || data.status) {
          return;
        }
        personen = data;
      })
    );
    // Register subscribe for faLeistungID
    this.subscriptions.push(
      this.sozialhilfeTreeSandbox.selectedNode$.subscribe(selectedNode => {
        if (!isNullOrUndefined(selectedNode)) {
          this.baPersonID = selectedNode.baPersonID;
          this.bgBudgetID = selectedNode.bgBudgetID;
          if (selectedNode.editMask === 'R') {
            this.isEditMode = false;
          }
          this.zulagenEFBSandbox.getBgSilAHVBeitrag(selectedNode.bgBudgetID);
          this.zulagenEFBSandbox.getBgPosition({ bgBudgetID: this.bgBudgetID, edtNurAktuelle: this.isNurAktuelleAnzeigen });
        }
      })
    );
    this.subscriptions.push(
      this.zulagenEFBSandbox.bgSilAHVBeitragData$.subscribe(data => {
        if (!isNullOrUndefined(data) && !isNullOrUndefined(personen)) {
          this.personenData = { personen: personen, data: data, baPersonID: this.baPersonID };
          this.datumVon = this.datePipe.transform(data.finanzplanVon, CommonConstant.DATE_FORMAT.yyyy_MM_dd);
          this.datumBis = this.datePipe.transform(data.finanzplanBis, CommonConstant.DATE_FORMAT.yyyy_MM_dd);
          this.zulagenEFBSandbox.getBgPositionsart({ bgPositionsartMin: 39021, bgPositionsartMax: 39999, datumVon: this.datumVon, datumBis: this.datumBis, concatKontoNrName: false });
          this.bgBewilligungStatusCode = data.bgBewilligungStatusCode;
          this.bgFinanzplanId = data.bgFinanzplanID;
          this.viewAction$.next(data.bgBewilligungStatusCode);
        }
      })
    );
    // Register subscribe for cbx Zulagen
    const parame = { LovName: 'BgGruppe', IsLovFilterWhereAppend: true, OrderByColumn: 2, Filter: 'Code BETWEEN 39000 AND 39999 AND Code NOT IN (39000, 39110, 39130, 39910)' };
    this.zulagenEFBSandbox.getDataCombobox(parame);
    this.subscriptions.push(
      this.zulagenEFBSandbox.comBoBoxData$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.zulageSelectBoxData = data;
          this.zulageSelectBoxData.unshift({ zulageCode: null, zulageText: '' });
          if (this.zulageGridData) {
            this.zulageGridData.map((item) => {
              const itemZulagen = this.zulageSelectBoxData.find(zulagen => zulagen.zulageCode === item.bgGruppeCode);
              isNullOrUndefined(itemZulagen) ? item.zulageText = null : item.zulageText = itemZulagen.zulageText;
            });
          }
        }
      })
    );

    this.subscriptions.push(
      this.zulagenEFBSandbox.richtLinieData$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.formAction$.next(data);
        }
      }));

    this.subscriptions.push(
      this.zulagenEFBSandbox.bgPositionsartData$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.positionsartMasterData = cloneDeep(data);
        }
      })
    );
    this.subscriptions.push(
      this.zulagenEFBSandbox.bgPositionsartIdData$.subscribe(data => {
        this.bgPositionsartId = data;
      })
    );
    this.getBgPositionData();
    this.zulagenEFBSandbox.updateBgPositionData$.subscribe(([success, failData]) => {
      if (success || (failData && failData.status === AppEnums.StatusCode.CONCURRENCY)) {
        if (failData && failData.status === AppEnums.StatusCode.CONCURRENCY) {
          this.visibleConcurrencyPopup = true;
          this.statusConcurrency = true;
          return;
        }

        this.zulagenEFBSandbox.getBgPosition({ bgBudgetID: this.bgBudgetID, edtNurAktuelle: this.isNurAktuelleAnzeigen });
        this.getBgPositionData();
        this.resetModeEdit();
      }
      if (!success && failData && failData.status === AppEnums.StatusCode.INTERNAL_SERVER_ERROR) {
        this.showPopupArithmetic();
        return;
      }

    });
    this.activatedRoute.paramMap.pipe().subscribe((params) => {
      this.changeParamAction$.next(params);
    });

  }

  onConcurrencyYes() {
    this.visibleConcurrencyPopup = false;
    this.zulagenEFBSandbox.getBgPosition({ bgBudgetID: this.bgBudgetID, edtNurAktuelle: this.isNurAktuelleAnzeigen });
    this.getBgPositionData();
  }

  onConcurrencyNo() {
    this.visibleConcurrencyPopup = false;
    this.isEditMode = true;
    this.editForm.isConcurrency(true);
  }

  private getBgPositionData() {
    this.zulagenEFBSandbox.bgPositionData$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        data.map((item) => {
          const itemAnteil = this.anteilSelectBoxFakeData.find(anteil => anteil.anteilCode === item.anteil);
          isNullOrUndefined(itemAnteil) ? item.anteilText = null : item.anteilText = itemAnteil.anteilText;
          if (this.zulageSelectBoxData) {
            const itemZulagen = this.zulageSelectBoxData.find(zulagen => zulagen.zulageCode === item.bgGruppeCode);
            isNullOrUndefined(itemZulagen) ? item.zulageText = null : item.zulageText = itemZulagen.zulageText;
          }
        });
        this.statusConcurrency = false;
        this.zulageGridData = data;
        this.dataForm = data[this.indexRowSelected];
        this.dataView = Object.assign({}, this.dataForm);
        if (this.dataForm && this.dataForm.bgGruppeCode) {
          this.oldbgPositionsartID = this.dataForm.bgPositionsartID;
        }
      }
    });
  }

  //#region event form
  private doSaveZulagen() {
    const bgPositionID = this.dataForm.bgPositionID;
    const body = {
      bgPositionID: bgPositionID,
      bgBudgetID: this.bgBudgetID,
      baPersonID: this.dataForm.baPersonID_NEW,
      bgPositionsartID: (!isNullOrUndefined(this.bgPositionsartId) && this.bgPositionsartId !== this.oldbgPositionsartID) ? this.bgPositionsartId : this.dataForm.bgPositionsartID,
      betrag: this.dataForm.betragSum,
      bemerkung: this.dataForm.bemerkung ? this.dataForm.bemerkung.trim().toString() : null,
      bgPositionTS: this.dataForm.bgPositionTS,
      bgBewilligungStatusCode: this.bgBewilligungStatusCode,
      bgKategorieCode: this.dataForm.bgKategorieCode,
      anteil: this.dataForm.anteil,
      bgGruppeCode: this.dataForm.bgGruppeCode,
      finanzplanVon: this.datumVon,
      finanzplanBis: this.datumBis,
      bgFinanzplanID: this.bgFinanzplanId,
      buchungstext: this.dataForm.buchungstext,
      anteilMode: this.dataForm.anteilMode
    };
    this.zulagenEFBSandbox.updateBgPosition(body);
  }

  isDataChange() {
    if (this.zulageGridData) {
      const oldData = this.zulageGridData[this.indexRowSelected];
      const currentData = {...this.dataForm};
      delete currentData['anteilMode'];
      return (JSON.stringify(oldData) !== JSON.stringify(currentData));
    }
  }

  onZulageSelectAction(event) {
    this.zulagenEFBSandbox.getBgPositionsartId({ bgPositionsartCode: event, finanzplanVon: this.datumVon });
    this.zulagenEFBSandbox.bgPositionsartIdData$.subscribe(data => {
      this.bgPositionsartId = data;
    });
  }

  onProcessAction(event) {
    if (event) {
      this.zulagenEFBSandbox.getRichtLinie({ bgBudgetID: this.bgBudgetID, BgPositionsartID: event });
    }
  }

  onMessageAction(event) {
    this.remainingMessage.showMessage(event);
  }
  //#endregion

  //#region Handler event header
  onHeaderAction(event: string) {
    if (event === 'shiftKeyDown') {
      this.isCopyId = true;
      return;
    }
    if (event === 'shiftKeyUp') {
      this.isCopyId = false;
      return;
    }
    this.zulagenGrid.toolBarOnItemClick(event);
  }

  onDblClickMessage() {
  }

  onHandlerKissCardAction(eventData) {
    const event = eventData.event;
    if (!isNullOrUndefined(eventData.dataForm)) {
      this.dataForm = eventData.dataForm;
    }
    switch (event) {
      case FragenkatalogConstant.DETAIL_BEARBEITEN: // edit
        this.isEditMode = true;
        this.isDisableGrid = true;
        this.sozialhilfeTreeSandbox.updateNodesStatus(
          {
            id: this.router.url,
            isEditMode: true
          });
        break;
      case FragenkatalogConstant.DETAIL_SPEICHERN: // save
        this.remainingMessage.hideMessage();
        this.doSaveZulagen();
        break;
      case FragenkatalogConstant.DETAIL_ABBRECHEN: // cancel
        if (this.isDataChange()) {
          this.showPopup('cancel');
        } else {
          if (this.statusConcurrency) {
            this.zulagenEFBSandbox.getBgPosition({ bgBudgetID: this.bgBudgetID, edtNurAktuelle: this.isNurAktuelleAnzeigen });
            this.getBgPositionData();
            this.editForm.isConcurrency(false);
          }
          this.resetModeEdit();
        }
        break;
      default:
        break;
    }
  }
  //#endregion

  //#region event of grid
  onRowSelectedAction(event) {
    if (event) {
      this.dataForm = event;
      this.zulagenEFBSandbox.getRichtLinie({ bgBudgetID: this.bgBudgetID, BgPositionsartID: event.bgPositionsartID });
      this.dataView = Object.assign({}, this.dataForm);
      if (this.dataForm.bgGruppeCode) {
        this.oldbgPositionsartID = this.dataForm.bgPositionsartID;
      }
      if (this.statusConcurrency) {
        this.viewForm.onDisabledButton(false);
      }
      return;
    }
    this.dataView = new BgPosition;
  }

  nurAktuelleAnzeigen(isNurAktuelleAnzeigen) {
    this.isNurAktuelleAnzeigen = isNurAktuelleAnzeigen;
    this.zulagenEFBSandbox.getBgPosition({ bgBudgetID: this.bgBudgetID, edtNurAktuelle: isNurAktuelleAnzeigen });
  }
  //#endregion

  showPopupArithmetic() {
    this.popUpModel.isVisible = true;
    this.popUpModel.title = this.translateService.instant('Vermogen.Popup.TitleConcurrency');
    this.popUpModel.message = this.translateService.instant('Vermogen.Popup.MsgArithmetic');
    this.popUpModel.isVisibleYes = false;
    this.popUpModel.isVisibleNo = false;
    this.isEditMode = false;
    this.zulagenEFBSandbox.getBgPosition({ bgBudgetID: this.bgBudgetID, edtNurAktuelle: this.isNurAktuelleAnzeigen });
    this.getBgPositionData();
  }

  //#region 'process open popup and change screen'
  private resetModeEdit() {
    this.isEditMode = false;
    this.isDisableGrid = false;
    this.sozialhilfeTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: false
      });
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    this.navigateAwaySelection$.next(true);
    this.popUpModel.isVisible = false;
    this.remainingMessage.hideMessage();
  }

  private showPopup(type, message = '') {
    this.popUpModel.isVisible = true;
    switch (type) {
      default:
      case 'cancel': {
        this.popUpModel.title = this.translateService.instant('ZulagenEfb.TitleCancelMessage');
        this.popUpModel.message = this.translateService.instant('ZulagenEfb.Message.ConfirmDeactive');
        this.popUpModel.textYes = this.translateService.instant('ZulagenEfb.Yes');
        this.popUpModel.textNo = this.translateService.instant('ZulagenEfb.No');
        this.popUpModel.isVisibleYes = true;
        this.popUpModel.isVisibleNo = true;
        this.popUpModel.funcYes = () => {
          this.remainingMessage.hideMessage();
          this.popUpModel.isVisible = false;
          this.dataForm = cloneDeep(this.zulageGridData[this.indexRowSelected]);
          this.dataView = cloneDeep(this.zulageGridData[this.indexRowSelected]);
          this.resetModeEdit();
        };
        break;
      }
      case 'changeform': {
        this.popUpModel.title = this.translateService.instant('ZulagenEfb.TitleCancelMessage');
        this.popUpModel.message = this.translateService.instant('ZulagenEfb.Message.ConfirmMessage');
        this.popUpModel.textYes = this.translateService.instant('ZulagenEfb.Discard');
        this.popUpModel.textNo = this.translateService.instant('ZulagenEfb.Abbrechen');
        this.popUpModel.isVisibleYes = true;
        this.popUpModel.isVisibleNo = true;
        this.popUpModel.funcYes = () => {
          this.popUpModel.isVisible = false;
          this.resetModeEdit();
        };
        break;
      }
      case 'information': {
        this.popUpModel.title = this.translateService.instant('ZulagenEfb.TitleInformationMessage');
        this.popUpModel.isVisibleYes = false;
        this.popUpModel.isVisibleNo = false;
        let _message = this.isCopyId ? this.translateService.instant('ZulagenEfb.Message.ShiftClickMessage') + ' (' + 'ID=' + this.baPersonID + ')' : this.translateService.instant('ZulagenEfb.Message.DoubleClickMessage');
        if (message) {
          _message = message;
        }
        this.popUpModel.message = this.translateService.instant(_message);
        this.popUpModel.funcYes = () => {
          this.popUpModel.isVisible = false;
          this.resetModeEdit();
        };
        break;
      }
    }
  }

  canDeactivate() {
    if (this.isDataChange()) {
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
    return true;
  }

  blurAll() {
    const el = document.querySelector(':focus');
    if (el) {
      (el as HTMLElement).blur();
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification(event: any) {
    event.preventDefault();
    this.blurAll();
    if (JSON.stringify(this.zulageGridData[this.indexRowSelected]) !== JSON.stringify(this.dataForm) && this.isEditMode) {
      event.returnValue = '';
      return false;
    }
  }
}
