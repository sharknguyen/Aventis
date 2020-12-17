import { AfterViewInit, Component, Injector, OnDestroy, OnInit, ViewChild, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import { BaseComponent } from '@shared/components/base.component';
import { Finanzplan } from '@app/kiss4-sozialhilfe/finanzplan/models';
import { isNullOrUndefined } from 'util';
import { TabModuleFallbearbeitungSandbox } from '@app/kiss4-main/tab-module-fallbearbeitung/tab-module-fallbearbeitung.sandbox';
import { IPopUpModel } from '@shared/models/shared/popup-confirm.model';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { FinanzplanSandbox } from '@app/kiss4-sozialhilfe/finanzplan/finanzplan.sandbox';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kiss-wh-finanzplan',
  templateUrl: './wh-finanzplan.component.html',
})
export class WhFinanzplanComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(injector: Injector,
    public translateService: TranslateService,
    public tabModuleFallbearbeitungSandbox: TabModuleFallbearbeitungSandbox,
    public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
    public finanzplanSandbox: FinanzplanSandbox,
    private activatedRoute: ActivatedRoute,
    public layoutSandbox: LayoutSandbox) {
    super(injector);
  }

  @ViewChild('finanzplanGrid') finanzplanGrid: any;

  personenData: any;
  datumVon: string;
  datumBis: string;
  private baPersonID: number = null;
  private bgBudgetID: number = null;
  private subscriptions: Subscription[] = [];
  isDisableBtnEdit = false;
  isShiftKeyDown = false;
  private navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();

  popUpModel: IPopUpModel = {
    funcYes: () => {
      this.popUpModel.isVisible = false;
      // this.resetModeEdit();
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
  changeParamAction$ = new BehaviorSubject<any>(null);
  finanzplanGridData: Finanzplan[];

  ngOnInit() {
    this.registerEvents();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
      this.subscriptions = [];
    });
  }

  onHeaderAction(event: string) {
    this.finanzplanGrid.toolBarOnItemClick(event);
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
          this.bgBudgetID = selectedNode.bgBudgetID;
          this.baPersonID = selectedNode.baPersonID;
          this.finanzplanSandbox.getBgSilAHVBeitrag(selectedNode.bgBudgetID);
          this.finanzplanSandbox.getFinanzplan(selectedNode.bgBudgetID);
        }
      })
    );

    this.subscriptions.push(
      this.finanzplanSandbox.bgSilAHVBeitragData$.subscribe(data => {
        if (!isNullOrUndefined(data) && !isNullOrUndefined(personen)) {
          this.personenData = { personen: personen, data: data, baPersonID: this.baPersonID };
        }
      }),
    );

    this.subscriptions.push(
      this.finanzplanSandbox.finanzplanData$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.finanzplanGridData = data;
        }
      })
    );

    this.activatedRoute.paramMap.pipe().subscribe((params) => {
      this.changeParamAction$.next(params);
    });
  }

  onDblClickMessage() {
  }

  /**
   * Shortcuts Key
   * */
  @HostListener('document:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    this.isShiftKeyDown = false;
  }

  @HostListener('document:keydown', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    if (event.shiftKey) {
      this.isShiftKeyDown = true;
    }
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
          this.popUpModel.isVisible = false;
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
        };
        break;
      }
      case 'information': {
        this.popUpModel.title = this.translateService.instant('ZulagenEfb.TitleInformationMessage');
        this.popUpModel.isVisibleYes = false;
        this.popUpModel.isVisibleNo = false;
        let _message = this.isShiftKeyDown ? this.translateService.instant('ZulagenEfb.Message.ShiftClickMessage') + ' (' + 'ID=' + this.baPersonID + ')' : this.translateService.instant('ZulagenEfb.Message.DoubleClickMessage');
        if (message) {
          _message = message;
        }
        this.popUpModel.message = this.translateService.instant(_message);
        this.popUpModel.funcYes = () => {
          this.popUpModel.isVisible = false;
        };
        break;
      }
    }
  }
}
