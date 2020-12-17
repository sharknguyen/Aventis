import { Component, HostListener, Injector, OnDestroy, OnInit, ViewChild, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { TabModuleFallbearbeitungSandbox } from '@app/kiss4-main/tab-module-fallbearbeitung/tab-module-fallbearbeitung.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { IPopUpModel } from '@shared/models/shared/popup-confirm.model';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { isNullOrUndefined, log } from 'util';
import { AlimentenguthabenSandbox } from '../alimentenguthaben.sandbox';
import { Alimentenguthaben, BaPerson } from '../models';
import { isUndefined } from 'lodash';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';

enum Code {
    errorMoney = 'errorMoney',
    deleteMenuItemTopGrd = 'deleteMenuItemTopGrd',
    canDeactivate = 'canDeactivate',
    cancel = 'cancel',
    neue = 'neue-alimentenguthaben',
    abbrechen = 'abbrechen',
    bearbeiten = 'bearbeiten',
    speichern = 'speichern',
    dirty = 'dirty-form',
    delete = 'Delete',
    save = 'save'
}

@Component({
    selector: 'kiss-alimentenguthaben',
    templateUrl: './alimentenguthaben.component.html',
    styleUrls: ['./alimentenguthaben.component.scss']
})

export class AlimentenguthabenComponent extends BaseComponent implements OnInit, CanComponentDeactivate, OnDestroy, OnChanges {
    @ViewChild('detailView') detailView: any;
    @ViewChild('detailEdit') detailEdit: any;
    @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;
    @ViewChild('formList') formList: any;

    visibleConcurrencyPopup = false;
    isEditMode = false;
    isDisableGrid = false;
    rowDetail: any = {};
    rowDataEdit: any = {};
    isNewMode = false;
    oldData: Alimentenguthaben;
    popUpModel: IPopUpModel = {
        funcYes: () => {
            this.popUpModel.isVisible = false;
            this.isDirtyForm = false;
            this.hideRemainingMessage();
            if (!isNullOrUndefined(this.namePopUp)) {
                switch (this.namePopUp) {
                    case Code.deleteMenuItemTopGrd:
                        this.alimentenguthabenSandbox.deleteAlimentenguthaben(this.oldData);
                        break;
                    case Code.cancel:
                        this.setEditMode(false);
                        this.checkConcurrency = false;
                        break;
                    case Code.canDeactivate:
                        this.setEditMode(false);
                        this.sozialhilfeTreeSandbox.updateNodesStatus(
                            {
                                id: this.router.url,
                                isEditMode: false,
                            }
                        );
                        this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
                        this.navigateAwaySelection$.next(true);
                        break;
                    case Code.delete:
                        this.setEditMode(false);
                        break;
                    default:
                        break;
                }
            }
        },
        funcNo: () => {
            this.popUpModel.isVisible = false;
            if (!isNullOrUndefined(this.namePopUp)) {
                switch (this.namePopUp) {
                    case Code.canDeactivate:
                        this.layoutSandbox.clearDeletingSticky();
                        this.navigateAwaySelection$.next(false);
                        break;
                    case Code.errorMoney:
                        this.setEditMode(false);
                        this.loadData();
                        break;
                    default:
                        break;
                }
            }
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

    namePopUp: any;
    showTitleDetail = true;
    isShiftKeyDown = false;
    pageTitle: any;
    bgFinanzplanID: number;
    baPersonID: number = null;
    isDirtyForm = false;
    bgBudgetID: number;
    dataNew: {};
    navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
    focusedRowKey = null;
    editMask: string;
    permis = false;
    bgBewilligungStatusCode: any;
    selectedNode: any;
    checkboxOnValueChanged = false;
    datumBis: Date;
    datumVon: Date;
    checkConcurrency = false;
    nameConcurrency: string;
    statusConcurrency: number;

    numberFormat = CommonConstant.FormatNumberN2;
    dateFormat = CommonConstant.DATE_FORMAT.dd_MM_yyyy;
    monthYearFormat = CommonConstant.DATE_FORMAT.MMMM_yyyy;
    fileName = 'Alimentenguthaben';
    columnsDataGrid = [];
    summaryDef = [
        { column: 'Betrag', summaryType: 'sum', displayFormat: '{0}', valueFormat: this.numberFormat }
    ];
    gridFunctionModel: GridSettingModel = new GridSettingModel();
    isNavigator = false;
    constructor(
        injector: Injector,
        public translateService: TranslateService,
        public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
        public layoutSandbox: LayoutSandbox,
        public router: Router,
        public tabModuleFallbearbeitungSandbox: TabModuleFallbearbeitungSandbox,
        private moduleConfigSandbox: ModuleConfigSandbox,
        private alimentenguthabenSandbox: AlimentenguthabenSandbox
    ) {
        super(injector);
        locale(UtilityHelper.getLanguageCodeFromLocalStorage());
    }

    subscriptions = new Subscription;
    gridAction$ = new BehaviorSubject<string>(null);
    alimentengu: any;
    persons: BaPerson;
    idDataNew: number;
    inkassos: any;
    ngOnInit(): void {
        this.registerEvents();
        this.initHeaderGrid();
    }
    ngOnChanges() {
        this.initHeaderGrid();
    }
    unregisterEvents() {
        this.subscriptions.unsubscribe();
    }
    ngOnDestroy() {
        this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
        this.moduleConfigSandbox.updateDirtyFormStatus(false);
        this.unregisterEvents();
    }

    canDeactivate() {
        this.isNavigator = true;
        if (this.isDirtyForm) {
            this.showPopup(Code.canDeactivate);
            return this.navigateAwaySelection$;
        }
        this.setEditMode(false);
        this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
        return true;
    }
    setDirtyForm(event) {
        this.isDirtyForm = event;
    }

    onSelectionChange(selection: any[]) {
        if (!isNullOrUndefined(this.alimentengu)) {
            const rowData = this.alimentengu.find(row => row.id === selection[0]);
            if (!isUndefined(rowData)) {
                this.rowDetail = rowData;
                this.rowDataEdit = rowData;
                this.focusedRowKey = this.rowDetail.id;
            } else {
                this.rowDetail = {};
            }
        }
    }

    setEditMode(isEditMode) {
        this.isEditMode = isEditMode;
        this.isDisableGrid = isEditMode;
        this.sozialhilfeTreeSandbox.updateNodesStatus(
            {
                id: this.router.url,
                isEditMode: isEditMode
            });
        this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    }
    onHeaderAction(action: string) {
        this.formList.toolBarOnItemClick(action);
    }

    onDetailAction(action: { actionName: string, data?: any }) {
        this.oldData = action.data;
        if (this.checkPermistion({ editMask: this.editMask, code: this.bgBewilligungStatusCode })) {
            switch (action.actionName) {
                case Code.neue:  // add new
                    this.checkConcurrency = false;
                    this.hideRemainingMessage();
                    this.isNewMode = true;
                    this.rowDataEdit = {
                        BaPersonID: null,
                        BgPositionsartID: null,
                        Betrag: 0,
                        Bemerkung: ''
                    };
                    this.setEditMode(true);
                    break;

                case Code.bearbeiten: // edit
                    this.checkConcurrency = false;
                    this.hideRemainingMessage();
                    this.rowDataEdit = Object.assign({}, this.rowDetail);
                    this.setEditMode(true);
                    break;
                case Code.speichern:  // save
                    if (isNullOrUndefined(action.data)) {
                        this.setEditMode(false);
                        return;
                    } else {
                        if (this.isNewMode) {
                            // Call API New
                            action.data.BgBudgetID = this.bgBudgetID;
                            this.alimentenguthabenSandbox.newAlimentenguthaben({
                                BgFinanzplanID: this.bgFinanzplanID,
                                Payload: action.data
                            });
                        } else {
                            // Call API Edit
                            this.alimentenguthabenSandbox.saveAlimentenguthaben({
                                BgFinanzplanID: this.bgFinanzplanID,
                                Payload: action.data
                            });
                        }
                    }
                    break;
                case Code.abbrechen: // cancel
                    if (this.checkConcurrency) {
                        this.hideRemainingMessage();
                        this.setEditMode(false);
                    } else if (this.isDirtyForm) {
                        this.showPopup(Code.delete);
                    } else {
                        this.setEditMode(false);
                    }
                    break;
                case Code.dirty: // cancel dirty form
                    if (isNullOrUndefined(action.data.BgPositionID)) {
                        this.showPopup(Code.delete);
                        return;
                    } else {
                        this.showPopup(Code.cancel);
                    }
                    break;
                case Code.deleteMenuItemTopGrd: // cancel dirty form
                    if (isNullOrUndefined(action.data.BgPositionID)) {
                        if (this.isDirtyForm) {
                            this.showPopup(Code.delete);
                        } else {
                            this.isDirtyForm = false;
                            this.setEditMode(false);
                        }
                    } else {
                        this.showPopup(Code.deleteMenuItemTopGrd);
                    }
                    break;
                case CommonConstant.EventClickTitle:
                    this.showTitleDetail = !this.showTitleDetail;
                    break;
                default:
                    break;
            }
        }
    }
    showRemainingMessage(event) {
        this.remainingMessage.showMessage(event);
    }
    hideRemainingMessage() {
        this.remainingMessage.hideMessage();
    }
    registerEvents() {
        this.subscriptions.add(this.translateService.onLangChange.subscribe(() => this.initHeaderGrid()));
        // Register subscribe for selected person
        this.subscriptions.add(
            this.tabModuleFallbearbeitungSandbox.getPersonInfoTitel$.subscribe(data => {
                if (isNullOrUndefined(data) || data.status) {
                    return;
                }
                this.pageTitle = data.titleText;
            })
        );
        // Register subscribe for selected node from sidebar
        this.subscriptions.add(
            this.sozialhilfeTreeSandbox.selectedNode$.subscribe(selectedNode => {
                if (!selectedNode) {
                    return;
                }
                this.selectedNode = selectedNode;
                this.baPersonID = selectedNode.baPersonID;
                this.bgFinanzplanID = selectedNode.bgFinanzplanID;
                this.bgBudgetID = selectedNode.bgBudgetID;
                this.editMask = selectedNode.editMask;
                this.loadData();
                this.loadPersonenUnterstuetztn({
                    bgBudgetID: this.bgBudgetID
                });
                this.loadInkassoData({
                    bgGruppeCode: 3102,
                    value: false,
                    BgBudgetID: this.bgBudgetID
                });
                this.loadGetTitle({
                    bgBudgetID: this.bgBudgetID
                });
            })
        );
        // Load sussess
        this.subscriptions.add(
            // Grid
            this.alimentenguthabenSandbox.alimentenguthabenData$.subscribe(data => {
                if (!isNullOrUndefined(data)) {
                    this.alimentengu = data ? data : [];
                    this.alimentengu = data ? this.alimentengu.map((e, index) => Object.assign(e, { id: index + 2 })) : [];
                    if (!isNullOrUndefined(this.idDataNew)) {
                        this.focusedRowKey = this.alimentengu.filter(x => x.BgPositionID === this.idDataNew)[0].id;
                        this.idDataNew = undefined;
                    } else if (this.alimentengu.length > 0 && isNullOrUndefined(this.idDataNew)) {
                        this.focusedRowKey = this.alimentengu[0].id;
                    }
                    this.isDirtyForm = false;
                    this.checkConcurrency = false;
                    this.isNewMode = false;
                    this.hideRemainingMessage();
                    if (this.isNavigator) {
                        this.setEditMode(false);
                        this.isNavigator = false;
                        this.resetGrid();
                    }
                }
            }),
        );
        this.subscriptions.add(
            // Inkassos
            this.alimentenguthabenSandbox.getInkassosData$.subscribe(data => {
                if (isNullOrUndefined(data)) {
                    return;
                }
                this.inkassos = data;
            }),
        );
        this.subscriptions.add(
            // Persons
            this.alimentenguthabenSandbox.getPersonenUnterstuetztnData$.subscribe(data => {
                if (isNullOrUndefined(data)) {
                    return;
                }
                this.persons = data;
                if (!isNullOrUndefined(this.persons)) {
                    this.persons[0].BaPersonID = -1;
                }
            }),
        );
        this.subscriptions.add(
            // Get Title
            this.alimentenguthabenSandbox.getTitle$.subscribe(data => {
                if (isNullOrUndefined(data)) {
                    return;
                }
                this.datumBis = new Date(data.datumBis);
                this.datumVon = new Date(data.datumVon);
                this.bgBewilligungStatusCode = data.bgBewilligungStatusCode;
                this.checkPermistion({ editMask: this.editMask, code: this.bgBewilligungStatusCode });
            }),
        );
        this.subscriptions.add(
            // New
            this.alimentenguthabenSandbox.newAlimentenguthaben$.subscribe(data => {
                if (isNullOrUndefined(data)) {
                    return;
                }
                this.setEditMode(false);
                this.idDataNew = data.bgPositionId;
                this.loadData();
                this.resetData();
            }),
        );
        this.subscriptions.add(
            // Save
            this.alimentenguthabenSandbox.saveAlimentenguthaben$.subscribe(data => {
                if (isNullOrUndefined(data)) {
                    return;
                }
                this.idDataNew = data.bgPositionId;
                this.setEditMode(false);
                this.loadData();
                this.resetData();
            }),
        );
        this.subscriptions.add(
            // Delete
            this.alimentenguthabenSandbox.deleteAlimentenguthaben$.subscribe(data => {
                if (isNullOrUndefined(data)) {
                    return;
                }
                this.setEditMode(false);
                this.loadData();
                this.resetData();
            })
        );
        // Load fail
        this.subscriptions.add(
            // Grid
            this.alimentenguthabenSandbox.alimentenguthabenDataFail$.subscribe(data => {
                if (isNullOrUndefined(data)) {
                    return;
                }
            }),
        );
        this.subscriptions.add(
            // Inkassos
            this.alimentenguthabenSandbox.getInkassosDataFail$.subscribe(data => {
                if (isNullOrUndefined(data)) {
                    return;
                }
            }),
        );
        this.subscriptions.add(
            // Persons
            this.alimentenguthabenSandbox.getPersonenUnterstuetztnDataFail$.subscribe(data => {
                if (isNullOrUndefined(data)) {
                    return;
                }
            }),
        );
        this.subscriptions.add(
            // Get Title
            this.alimentenguthabenSandbox.getTitleFail$.subscribe(data => {
                if (isNullOrUndefined(data)) {
                    return;
                }
            }),
        );
        this.subscriptions.add(
            // New
            this.alimentenguthabenSandbox.newAlimentenguthabenFail$.subscribe(data => {
                if (isNullOrUndefined(data)) {
                    return;
                } else if (data.status === AppEnums.StatusCode.INTERNAL_SERVER_ERROR) {
                    this.showPopup(Code.errorMoney);
                } else if (data.status === AppEnums.StatusCode.FORBIDDEN) {
                    this.remainingMessage.showMessage(this.translateService.instant('Erwerbseinkommen.Messager.notPermistion'));
                }
            }),
        );
        this.subscriptions.add(
            // Save
            this.alimentenguthabenSandbox.saveAlimentenguthabenFail$.subscribe(data => {
                if (!isNullOrUndefined(data)) {
                    if (data.status === AppEnums.StatusCode.CONCURRENCY) {
                        this.checkErrorConcurrency(this.nameConcurrency = Code.save, this.statusConcurrency = AppEnums.StatusCode.CONCURRENCY);
                    } else if (data.status === AppEnums.StatusCode.NOT_FOUND) {
                        this.checkErrorConcurrency(this.nameConcurrency = Code.save, this.statusConcurrency = AppEnums.StatusCode.NOT_FOUND);
                    } else if (data.status === AppEnums.StatusCode.INTERNAL_SERVER_ERROR) {
                        this.showPopup(Code.errorMoney);
                    } else if (data.status === AppEnums.StatusCode.FORBIDDEN) {
                        this.remainingMessage.showMessage(this.translateService.instant('Erwerbseinkommen.Messager.notPermistion'));
                    }
                }
            }),
        );
        this.subscriptions.add(
            // Delete
            this.alimentenguthabenSandbox.deleteAlimentenguthabenFail$.subscribe(data => {
                if (!isNullOrUndefined(data)) {
                    if (data.status === AppEnums.StatusCode.NOT_FOUND) {
                        this.checkErrorConcurrency(this.nameConcurrency = Code.delete, this.statusConcurrency = AppEnums.StatusCode.NOT_FOUND);
                    } else if (data.status === AppEnums.StatusCode.CONCURRENCY) {
                        this.checkErrorConcurrency(this.nameConcurrency = Code.delete, this.statusConcurrency = AppEnums.StatusCode.CONCURRENCY);
                    } else if (data.status === AppEnums.StatusCode.INTERNAL_SERVER_ERROR) {
                        this.showPopup(Code.errorMoney);
                    } else if (data.status === AppEnums.StatusCode.FORBIDDEN) {
                        this.remainingMessage.showMessage(this.translateService.instant('Erwerbseinkommen.Messager.notPermistion'));
                    }
                }
            })
        );
    }


    initHeaderGrid() {
        this.columnsDataGrid = [
            { minWidth: '80', width: 'auto', alignment: '', dataType: 'date', dataField: 'DatumVon', caption: this.translateService.instant('Aliment.Grid.Gultigab'), format: this.monthYearFormat, sortIndex: 1 },
            { minWidth: '80', width: 'auto', alignment: '', dataType: 'string', dataField: 'NameVorname', caption: this.translateService.instant('Aliment.Grid.Name'), format: '', sortIndex: 2 },
            { minWidth: '80', width: 'auto', alignment: '', dataType: 'date', dataField: 'Geburtsdatum', caption: this.translateService.instant('Aliment.Grid.Geburtsdatum'), format: this.dateFormat, sortIndex: 2 },
            { minWidth: '80', width: 'auto', alignment: '', dataType: 'string', dataField: 'Buchungstext', caption: this.translateService.instant('Aliment.Grid.Inkasso'), format: this.numberFormat, sortIndex: 2 },
            { minWidth: '80', width: 'auto', alignment: '', dataType: 'number', dataField: 'Betrag', caption: this.translateService.instant('Aliment.Grid.Einkommen'), format: this.numberFormat, sortIndex: 2 }
        ];
    }
    loadData() {
        this.loadListData({
            bgBudgetID: this.bgBudgetID,
            bgGruppeCode: 3102,
            nurAktuelle: this.checkboxOnValueChanged
        });
    }
    resetData() {
        this.alimentenguthabenSandbox.resetData();
    }
    // load data in grid
    loadListData(param) {
        this.alimentenguthabenSandbox.alimentenguthabenData(param);
    }
    // load data select box in tabelle
    loadInkassoData(param) {
        this.alimentenguthabenSandbox.getInkasso(param);
    }
    // load data select box in typ
    loadPersonenUnterstuetztn(param) {
        this.alimentenguthabenSandbox.getloadPersonenUnterstuetztn(param);
    }
    loadGetTitle(param) {
        this.alimentenguthabenSandbox.getTitle(param);
    }

    @HostListener('document:keydown', ['$event'])
    public keyEvent(event: KeyboardEvent) {
        if (this.checkPermistion({ editMask: this.editMask, code: this.bgBewilligungStatusCode })) {
            if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyI) {
                if (isNullOrUndefined(this.detailView)) {
                    return;
                }
                event.preventDefault();
                this.detailView.toolBarOnItemClick(Code.neue);
            }
            if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ) {
                if (isNullOrUndefined(this.detailEdit)) {
                    return;
                }
                event.preventDefault();
                this.querySelector();
                this.detailEdit.toolBarOnItemClick(Code.abbrechen);
            }
            if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS) {
                if (isNullOrUndefined(this.detailEdit)) {
                    return;
                }
                event.preventDefault();
                this.querySelector();
                this.detailEdit.toolBarOnItemClick(Code.speichern);
            }
            if ((event.ctrlKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyM) {
                event.preventDefault();
                if (this.isEditMode) {
                    this.detailEdit.toolBarOnItemClick(Code.deleteMenuItemTopGrd);
                    return;
                }
                this.detailView.toolBarOnItemClick(Code.deleteMenuItemTopGrd);
            }
        }
    }
    querySelector() {
        const el = document.querySelector(':focus');
        if (el) {
            (el as HTMLElement).blur();
        }
    }

    private showPopup(type) {
        this.namePopUp = type;
        this.popUpModel.isVisible = true;
        this.popUpModel.isVisibleYes = true;
        this.popUpModel.isVisibleNo = true;
        switch (type) {
            case Code.cancel: {
                this.popUpModel.title = this.translateService.instant('Aliment.Detail.Confirm');
                this.popUpModel.message = this.translateService.instant('Aliment.Detail.CancelMessage');
                this.popUpModel.textYes = this.translateService.instant('Aliment.Detail.ButtonOK');
                this.popUpModel.textNo = this.translateService.instant('Aliment.Detail.ButtonCanCel');
                break;
            }
            case Code.deleteMenuItemTopGrd: {
                this.popUpModel.title = this.translateService.instant('Aliment.Detail.Confirm');
                this.popUpModel.message = this.translateService.instant('Aliment.Detail.Delete');
                this.popUpModel.textYes = this.translateService.instant('Aliment.Detail.ButtonOK');
                this.popUpModel.textNo = this.translateService.instant('Aliment.Detail.ButtonCanCel');
                break;
            }
            case Code.canDeactivate: {
                this.popUpModel.title = this.translateService.instant('Aliment.Detail.Confirm');
                this.popUpModel.message = this.translateService.instant('Aliment.Detail.canDeactivateMessage');
                this.popUpModel.textYes = this.translateService.instant('Aliment.Detail.Discard');
                this.popUpModel.textNo = this.translateService.instant('Aliment.Detail.Abbrechen');
                break;
            }
            case Code.delete: {
                this.popUpModel.title = this.translateService.instant('Aliment.Detail.Confirm');
                this.popUpModel.message = this.translateService.instant('Aliment.Message.MessageAdd');
                this.popUpModel.textYes = this.translateService.instant('Aliment.Detail.ButtonOK');
                this.popUpModel.textNo = this.translateService.instant('Aliment.Detail.ButtonCanCel');
                break;
            }
            case Code.errorMoney: {
                this.popUpModel.title = this.translateService.instant('Aliment.Detail.Information');
                this.popUpModel.message = this.translateService.instant('Aliment.Message.Message500');
                this.popUpModel.textYes = this.translateService.instant('Aliment.Detail.ButtonOK');
                this.popUpModel.textNo = this.translateService.instant('Aliment.Detail.ButtonCanCel');
                this.popUpModel.isVisibleYes = false;
                this.popUpModel.isVisibleNo = false;
                this.resetData();
                break;
            }
            default:
                break;
        }
    }
    blurAll() {
        const el = document.querySelector(':focus');
        if (el) {
            (el as HTMLElement).blur();
        }
    }

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        if (this.isDirtyForm) {
            this.blurAll();
            return false;
        }
    }

    onConcurrencyYes() {
        this.idDataNew = this.rowDataEdit.BgPositionID;
        this.visibleConcurrencyPopup = false;
        this.hideRemainingMessage();
        this.loadData();
    }

    onConcurrencyNo() {
        this.visibleConcurrencyPopup = false;
        this.checkConcurrency = true;
    }

    checkPermistion(data) {
        if (data.editMask && data.editMask.search('R') !== -1
            && data.editMask.search('I') !== -1
            && data.editMask.search('U') !== -1
            && data.editMask.search('D') !== -1) {
            if (data.code && data.code < 5) {
                this.permis = true;
            } else {
                this.permis = false;
            }
        } else {
            this.permis = false;
        }
        return this.permis;
    }

    onValueChanged(event) {
        this.loadData();
    }
    checkErrorConcurrency(type, status) {
        switch (status) {
            case AppEnums.StatusCode.INTERNAL_SERVER_ERROR:
                this.showRemainingMessage(this.translateService.instant('Aliment.Message.Message500'));
                break;
            case AppEnums.StatusCode.CONCURRENCY:
                this.checkConcurrency = true;
                if (type === Code.save) {
                    this.visibleConcurrencyPopup = true;
                }
                if (type === Code.delete) {
                    this.showRemainingMessage(this.translateService.instant('Aliment.Message.Message409Delete'));
                }
                break;
            case AppEnums.StatusCode.NOT_FOUND:
                this.checkConcurrency = true;
                if (type === Code.save) {
                    this.showRemainingMessage(this.translateService.instant('Aliment.Message.Message404Update'));
                }
                if (type === Code.delete) {
                    this.showRemainingMessage(this.translateService.instant('Aliment.Message.Message404Delete'));
                }
                break;
            default:
                break;
        }
    }
    checkNamPopUp(namePopUp) {
        if (!isNullOrUndefined(this.namePopUp)) {
            return true;
        }
        return false;
    }

    onSelectedRow(rowData) {
        this.checkConcurrency = false;
        this.hideRemainingMessage();
        if (isNullOrUndefined(rowData)) {
            this.rowDetail = new Alimentenguthaben();
            return;
        }
        this.rowDetail = rowData;
        this.rowDataEdit = rowData;
        this.focusedRowKey = rowData.id;
    }
    resetGrid() {
        this.gridFunctionModel.isFilterBuilder = false;
        this.gridFunctionModel.isSearchPanel = false;
        this.gridFunctionModel.isFilter = false;
        this.gridFunctionModel.isSearch = true;
        this.gridFunctionModel.isGrouping = false;
        this.formList.reset();
    }
}
