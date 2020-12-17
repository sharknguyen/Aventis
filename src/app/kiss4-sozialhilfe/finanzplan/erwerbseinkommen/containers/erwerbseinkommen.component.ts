import { Component, HostListener, Injector, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@shared/components/base.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { IPopUpModel } from '@shared/models/shared/popup-confirm.model';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { AppEnums } from '@shared/AppEnum';
import { TabModuleFallbearbeitungSandbox } from '@app/kiss4-main/tab-module-fallbearbeitung/tab-module-fallbearbeitung.sandbox';
import { isNullOrUndefined } from 'util';
import * as utilites from '@shared/utilites';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { BgErwerbseinkommens } from '../models/erwerbseinkommen.models';
import { ErwerbseinkommenSanbox } from '../erwerbseinkommen.sandbox';

enum Code {
    canDeactivate = 'canDeactivate'
}

@Component({
    selector: 'kiss-erwerbseinkommen',
    templateUrl: './erwerbseinkommen.component.html',
    styleUrls: ['./erwerbseinkommen.component.scss']
})

export class ErwerbseinkommenComponent extends BaseComponent implements OnInit, CanComponentDeactivate, OnDestroy {

    @ViewChild('detailView') detailView: any;
    @ViewChild('detailEdit') detailEdit: any;
    @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;
    visibleConcurrencyPopup = false;
    isShiftKeyDown = false;
    pageTitle: any;
    Vom: Date;
    Bis: Date;
    bgFinanzplanID: number;
    baPersonID: number = null;
    subscriptions = new Subscription();
    isEditMode = false;
    isDelete = false;
    rowDetail: any = {};
    rowDataEdit: any = {};
    isDisableGrid = false;
    bgBudgetID: number;
    gridAction$ = new BehaviorSubject<string>(null);
    bgErwerbseinkommens: any;
    persons: any = [];
    artDesEinkommens: any = [];
    paramsGet: any = {};
    statusCode: number;
    permis: boolean;
    editMask: any;
    selectKey = 0;
    selectKeyNew: number;
    concurrency = false;
    namePopup: any;
    isDirtyForm = false;
    isNavigator = false;
    navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();

    constructor(
        injector: Injector,
        public translateService: TranslateService,
        public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
        public layoutSandbox: LayoutSandbox,
        public erwerbseinkommenSanbox: ErwerbseinkommenSanbox,
        public router: Router,
        public tabModuleFallbearbeitungSandbox: TabModuleFallbearbeitungSandbox
    ) {
        super(injector);
        locale(UtilityHelper.getLanguageCodeFromLocalStorage());
        this.selectKey = 0;
    }

    popUpModel: IPopUpModel = {
        funcYes: () => {
            this.popUpModel.isVisible = false;
            this.remainingMessage.hideMessage();
            if (this.isDelete) {
                this.isDelete = false;
                this.deleteItemErwerbseinkommen({ BgBudgetID: this.rowDetail.BgBudgetID, BgPositionID: this.rowDetail.BgPositionID, BgPositionTS: this.rowDetail.BgPositionTS });
            } else {
                this.setEditMode(false);
            }
            if (this.namePopup === Code.canDeactivate) {
                this.sozialhilfeTreeSandbox.updateNodesStatus(
                    {
                        id: this.router.url,
                        isEditMode: false,
                    }
                );
                this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
                this.navigateAwaySelection$.next(true);
            }
        },
        funcNo: () => {
            this.remainingMessage.hideMessage();
            this.popUpModel.isVisible = false;
            this.isDelete = false;
            if (this.namePopup === 'errorMoney') {
                this.getBgErwerbseinkommen(this.paramsGet);
                this.setEditMode(false);
            }
            if (this.namePopup === Code.canDeactivate) {
                this.layoutSandbox.clearDeletingSticky();
                this.navigateAwaySelection$.next(false);
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

    ngOnInit(): void {
        this.registerEvents();
    }

    canDeactivate() {
        this.isNavigator = true;
        if (this.isDirtyForm) {
            this.showPopup(Code.canDeactivate, '');
            return this.navigateAwaySelection$;
        }
        this.setEditMode(false);
        this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
        return true;
    }
    ngOnDestroy() {
        this.rowDataEdit = {};
        this.rowDetail = {};
        this.subscriptions.unsubscribe();
    }

    registerEvents() {
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
                this.bgBudgetID = selectedNode.bgBudgetID;
                this.baPersonID = selectedNode.baPersonID;
                this.bgFinanzplanID = selectedNode.bgFinanzplanID;
                this.editMask = selectedNode.editMask;
                if (this.bgBudgetID && this.bgBudgetID > 0) {
                    this.getBgErwerbseinkommenPersonDropdowns(this.bgBudgetID);
                    this.paramsGet = {
                        bgBudgetID: this.bgBudgetID,
                        bgGruppeCode: 3101,
                        isShowOnlyCurrent: false
                    };
                    this.getBgErwerbseinkommen(this.paramsGet);
                }
            })
        );

        // get BgErwerbseinkommenPersonDropdowns
        this.subscriptions.add(
            this.erwerbseinkommenSanbox.bgErwerbseinkommenDropdown$.subscribe(data => {
                if (!data) {
                    return;
                }
                if (this.checkErrorService(data['status'], '', 'delete')) {
                    const datas = JSON.parse(data['_body']);
                    this.Vom = new Date(datas['title'].finanzplanVon);
                    this.Bis = new Date(datas['title'].finanzplanBis);
                    this.statusCode = datas.bgBewilligungStatusCode;
                    this.artDesEinkommens = datas['einkommens'];
                    this.persons = datas['persons'];
                    this.checkPermistion({ code: this.statusCode, editMask: this.editMask });
                }
            })
        );
        // get BgErwerbseinkommen
        this.subscriptions.add(
            this.erwerbseinkommenSanbox.bgErwerbseinkommen$.subscribe(data => {
                if (!data || data.length < 1) {
                    this.rowDataEdit = {};
                    this.rowDetail = {};
                    this.bgErwerbseinkommens = undefined;
                    return;
                }
                if (this.checkErrorService(data['status'], '', 'delete')) {
                    this.bgErwerbseinkommens = data ? data : [];
                    this.bgErwerbseinkommens = data ? this.bgErwerbseinkommens.map((e, index) => Object.assign(e, { id: index + 1})) : [];
                    if (!isNullOrUndefined(this.selectKeyNew)) {
                        this.selectKey = this.bgErwerbseinkommens.filter(x => x.BgPositionID === this.selectKeyNew)[0].id;
                        this.selectKeyNew = undefined;
                    }
                    const row = this.bgErwerbseinkommens.find(item => item.id === this.selectKey);
                    if (row) {
                        row['typeAction'] = this.rowDataEdit.typeAction;
                        this.rowDataEdit = row;
                        this.rowDetail = row;
                        this.selectKey = row.id;
                    } else {
                        if (this.bgErwerbseinkommens && this.bgErwerbseinkommens.length > 0) {
                            this.rowDataEdit = this.bgErwerbseinkommens[0];
                            this.rowDetail = this.bgErwerbseinkommens[0];
                            this.selectKey = this.bgErwerbseinkommens[0].id;
                        } else {
                            this.rowDataEdit = {};
                            this.rowDetail = {};
                        }
                    }
                    this.concurrency = false;
                }
            })
        );
        // add new erwerbseinkommen

        this.subscriptions.add(
            this.erwerbseinkommenSanbox.bgErwerbseinkommenAdd$.subscribe(data => {
                if (!data) {
                    return;
                }
                this.remainingMessage.hideMessage();
                if (this.checkErrorService(data['status'], '', 'delete')) {
                    const datas = JSON.parse(data['_body']);
                    this.selectKeyNew = datas.bgPositionId;
                    this.getBgErwerbseinkommen(this.paramsGet);
                    this.setEditMode(false);
                }
            })
        );

        // update erwerbseinkommens
        this.subscriptions.add(
            this.erwerbseinkommenSanbox.bgErwerbseinkommenUpdate$.subscribe((data: any) => {
                if (!data) {
                    return;
                }
                if (this.checkErrorService(data['status'], 'CtlAbklaerungen.MessageConcurency404Update', 'edit')) {
                    this.rowDetail = this.rowDataEdit;
                    this.getBgErwerbseinkommen(this.paramsGet);
                    this.setEditMode(false);
                }
            })
        );

        // delete erwerbseinkommens
        this.subscriptions.add(
            this.erwerbseinkommenSanbox.bgErwerbseinkommenDelete$.subscribe((data: any) => {
                if (!data) {
                    return;
                }
                if (this.checkErrorService(data['status'], 'CtlAbklaerungen.MessageConcurency404Delete', 'delete')) {
                    this.selectKey = 0;
                    this.resetData();
                    this.setEditMode(false);
                    this.getBgErwerbseinkommen(this.paramsGet);
                }
            })
        );
    }

    onHeaderAction(data?: any) {
        this.gridAction$.next(data.messager);
        if (data.type === 'copy-header') {
            this.remainingMessage.showMessage(data.messager);
        }
    }

    onDblClickMessage() {

    }

    checkErrorService(status, mes, type) {
        let result = true;
        this.isDirtyForm = false;
        switch (status) {
            case AppEnums.StatusCode.BAD_REQUEST:
                this.remainingMessage.showMessage(this.translateService.instant('Erwerbseinkommen.Messager.notPermistion'));
                result = false;
                break;
            case AppEnums.StatusCode.FORBIDDEN:
                this.remainingMessage.showMessage(this.translateService.instant('Erwerbseinkommen.Messager.notPermistion'));
                result = false;
                break;
            case AppEnums.StatusCode.NOT_FOUND:
                if (type === 'edit') {
                    this.remainingMessage.showMessage(this.translateService.instant(mes));
                }
                if (type === 'delete') {
                    this.remainingMessage.showMessage(this.translateService.instant(mes));
                }
                this.concurrency = true;
                result = false;
                break;
            case AppEnums.StatusCode.CONCURRENCY:
                if (type === 'edit') {
                    this.visibleConcurrencyPopup = true;
                }
                if (type === 'delete') {
                    this.remainingMessage.showMessage(this.translateService.instant(mes));
                }
                this.concurrency = true;
                result = false;
                break;
            case AppEnums.StatusCode.INTERNAL_SERVER_ERROR:
                if (this.rowDataEdit && this.rowDataEdit.typeAction) {
                    this.showPopup('errorMoney', this.translateService.instant('Erwerbseinkommen.Messager.NumberMoneyError'));
                    this.rowDataEdit = {};
                    this.rowDetail = {};
                }
                result = true;
                break;
            default:
                this.concurrency = false;
                this.remainingMessage.hideMessage();
                this.resetData();
                result = true;
                break;
        }
        return result;
    }

    onSelectionChange(selection) {
        const selectRow = selection.data;
        if (selectRow && ((this.rowDetail && selectRow.BgPositionID !== this.rowDetail.BgPositionID) || !this.rowDetail)) {
            this.rowDetail = selectRow;
            this.rowDataEdit = selectRow;
            this.concurrency = false;
            this.remainingMessage.hideMessage();
        }
    }

    onRefresh(isShowOnlyCurrent) {
        this.paramsGet.isShowOnlyCurrent = isShowOnlyCurrent;
        this.selectKey = undefined;
        this.getBgErwerbseinkommen(this.paramsGet);
    }

    setEditMode(isEditMode) {
        this.remainingMessage.hideMessage();
        this.isEditMode = isEditMode;
        this.isDisableGrid = isEditMode;
        this.sozialhilfeTreeSandbox.updateNodesStatus(
            {
                id: this.router.url,
                isEditMode: isEditMode
            });
        this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    }

    screenByWidthSize(width) {
        return utilites.getSizeQualifier(width);
    }

    /**
   * Shortcuts Key
   * */
    @HostListener('document:keyup', ['$event'])
    keyUpEvent(event: KeyboardEvent) {
        if (event.shiftKey) {
            this.isShiftKeyDown = false;
        }
    }

    @HostListener('document:keydown', ['$event'])
    public keyEvent(event: KeyboardEvent) {
        if (event.shiftKey) {
            this.isShiftKeyDown = true;
        }
        if (this.checkPermistion({ code: this.statusCode, editMask: this.editMask })) {
            if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyI) {
                // Todo: open add new form
                event.preventDefault();
                if (!this.isEditMode) {
                    this.detailView.toolBarOnItemClick('neue-erwerbseinkommen');
                }
            }

            if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ) {
                // Todo: cancel form
                event.preventDefault();
                this.detailEdit.toolBarOnItemClick('abbrechen');
            }

            if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS) {
                // Todo: save form
                event.preventDefault();
                if (!this.concurrency && !this.popUpModel.isVisible) {
                    this.detailEdit.toolBarOnItemClick('speichern');
                }
            }

            if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyM) {
                // Todo: delete form
                event.preventDefault();
                if (!this.concurrency && this.rowDetail && this.rowDetail.BgBudgetID) {
                    if (!this.isEditMode) {
                        this.isDelete = true;
                        this.showPopup('delete', this.translateService.instant('CtlAbklaerungen.Message.MessageDelete'));
                    } else {
                        this.detailEdit.toolBarOnItemClick('deleteMenuItemTopGrd');
                    }
                }
            }
        }
    }

    deleteEvent() {
        if (this.isEditMode) {
            this.messagerDeleteAndCancelDirty(this.rowDataEdit.typeAction);
        } else {
            if (this.rowDetail && this.rowDetail.BgPositionID) {
                this.isDelete = true;
                this.showPopup('delete', this.translateService.instant('CtlAbklaerungen.Message.MessageDelete'));
            }
        }
    }
    onFormError(messager?: any) {
        this.remainingMessage.showMessage(messager);
    }

    messagerDeleteAndCancelDirty(typeAction) {
        if (typeAction === 'add' || typeAction === 'cancelAdd') {
            this.showPopup('cancel', this.translateService.instant('CtlAbklaerungen.Message.MessageDeleteNew'));
        }
        if (typeAction === 'edit') {
            this.isDelete = true;
            this.showPopup('delete', this.translateService.instant('CtlAbklaerungen.Message.MessageDelete'));
        }
        if (typeAction === 'cancel-edit') {
            this.showPopup('cancel', this.translateService.instant('Erwerbseinkommen.Messager.CancelEdit'));
        }
    }
    onDetailAction(action: { actionName: string, data?: any }) {
        if (this.checkPermistion({ code: this.statusCode, editMask: this.editMask })) {
            switch (action.actionName) {
                case 'neue-erwerbseinkommen':  // add new
                    this.rowDataEdit = {};
                    this.rowDataEdit.Betrag = 0;
                    this.rowDataEdit.UKReduktion = 0;
                    this.rowDataEdit.UKBetrag = 0;
                    this.rowDataEdit.VerwaltungSD = false;
                    this.rowDataEdit.BaPersonID = null;
                    this.rowDataEdit.BgPositionsartID = null;
                    this.rowDataEdit.Bemerkung = '';
                    this.rowDataEdit.typeAction = 'add';
                    this.setEditMode(true);
                    this.concurrency = false;
                    break;
                case 'bearbeiten': // edit
                    this.rowDataEdit = Object.assign({}, this.rowDetail);
                    this.rowDataEdit.typeAction = 'edit';
                    this.setEditMode(true);
                    this.concurrency = false;
                    break;
                case 'speichern':  // save
                    if (action.data) {
                        this.rowDataEdit = this.mapPersonsEinkommens(action.data);
                        if (action.data.typeAction === 'add') {
                            this.addListErwerbseinkommen(this.rowDataEdit);
                        } else if (action.data.BgPositionID === this.rowDataEdit.BgPositionID) {
                            this.updateListErwerbseinkommen(this.rowDataEdit);
                        }
                    } else {
                        this.setEditMode(false);
                    }
                    break;
                case 'abbrechen': // cancel
                    if (action.data.valueChange) {
                        this.messagerDeleteAndCancelDirty(action.data.typeAction);
                    } else {
                        this.remainingMessage.hideMessage();
                        this.setEditMode(false);
                    }
                    this.concurrency = false;
                    break;
                case 'dirty-form': // cancel dirty form
                    if (action.data) {
                        this.messagerDeleteAndCancelDirty(action.data.typeAction);
                    }
                    break;
                case 'deleteMenuItemTopGrd':
                    if ((action.data && (action.data.valueChange || action.data.typeAction === 'edit')) || !this.isEditMode) {
                        this.deleteEvent();
                    } else {
                        this.setEditMode(false);
                    }
                    break;
                default:
                    break;
            }
        }
    }

    private showPopup(type, message) {
        this.popUpModel.isVisible = true;
        this.popUpModel.isVisibleYes = true;
        this.popUpModel.isVisibleNo = true;
        this.namePopup = type;
        switch (type) {
            case 'information': {
                this.popUpModel.title = this.translateService.instant('PersonenImHaushalt.TitleInformationMessage');
                this.popUpModel.isVisibleYes = false;
                this.popUpModel.isVisibleNo = false;
                this.popUpModel.message = this.translateService.instant(message);
                break;
            }
            case 'cancel': {
                this.popUpModel.title = this.translateService.instant('Erwerbseinkommen.Title.TitleCancelMessage');
                this.popUpModel.message = this.translateService.instant(message);
                this.popUpModel.textYes = this.translateService.instant('Erwerbseinkommen.Title.ButtonJa');
                this.popUpModel.textNo = this.translateService.instant('Erwerbseinkommen.Title.ButtonNein');
                break;
            }

            case 'delete': {
                this.isDelete = true;
                this.popUpModel.title = this.translateService.instant('Erwerbseinkommen.Title.TitleCancelMessage');
                this.popUpModel.message = this.translateService.instant(message);
                this.popUpModel.textYes = this.translateService.instant('Erwerbseinkommen.Title.ButtonJa');
                this.popUpModel.textNo = this.translateService.instant('Erwerbseinkommen.Title.ButtonNein');
                break;
            }

            case 'not-permistion': {
                this.popUpModel.title = this.translateService.instant('Erwerbseinkommen.Title.TitleCancelMessage');
                this.popUpModel.isVisibleYes = false;
                this.popUpModel.isVisibleNo = false;
                this.popUpModel.message = this.translateService.instant(message);
                break;
            }

            case 'errorMoney': {
                this.popUpModel.title = this.translateService.instant('PersonenImHaushalt.TitleInformationMessage');
                this.popUpModel.isVisibleYes = false;
                this.popUpModel.isVisibleNo = false;
                this.popUpModel.message = this.translateService.instant(message);
                break;
            }

            case Code.canDeactivate: {
                this.popUpModel.title = this.translateService.instant('Aliment.Detail.Confirm');
                this.popUpModel.message = this.translateService.instant('Aliment.Detail.canDeactivateMessage');
                this.popUpModel.textYes = this.translateService.instant('Aliment.Detail.Discard');
                this.popUpModel.textNo = this.translateService.instant('Aliment.Detail.Abbrechen');
                break;
            }

            default:
                break;
        }
    }

    setDirtyForm(event) {
        this.isDirtyForm = event;
    }

    // map persons, Art Des Einkommens
    mapPersonsEinkommens(data) {
        this.persons.forEach(item1 => {
            if (item1.BaPersonID === data.BaPersonID) {
                data.NameVorname = item1.NameVorname;
            }
        });
        this.artDesEinkommens.forEach(item2 => {
            if (item2.BgPositionsartID === data.BgPositionsartID) {
                data.Buchungstext = item2.Name;
            }
        });
        data.BgBudgetID = this.bgBudgetID;
        data.BgKategorieCode = 1;
        data.Reduktion = this.rowDataEdit.UKReduktion;
        data.BgFinanzplanID = this.bgFinanzplanID;
        data.FinanzplanVon = this.Vom;
        return data;
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
    onConcurrencyYes() {
        this.visibleConcurrencyPopup = false;
        this.getBgErwerbseinkommen(this.paramsGet);
        this.concurrency = false;
    }

    onConcurrencyNo() {
        this.visibleConcurrencyPopup = false;
    }

    resetData() {
        if (this.bgErwerbseinkommens && this.bgErwerbseinkommens.length > 0) {
            this.bgErwerbseinkommens.forEach((item, index) => {
                if (item.BgPositionID === this.rowDetail.BgPositionID) {
                    if (this.isDelete) {
                        this.isDelete = false;
                        this.bgErwerbseinkommens.splice(index, 1);
                        this.rowDataEdit = this.bgErwerbseinkommens[0];
                        this.rowDetail = this.bgErwerbseinkommens[0];
                    }
                }
            });
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
    // get list BgErwerbseinkommenPersonDropdowns

    getBgErwerbseinkommenPersonDropdowns(data) {
        this.erwerbseinkommenSanbox.loadBgErwerbseinkommenDropdown(data);
    }

    // get list BgErwerbseinkommen

    getBgErwerbseinkommen(data) {
        this.erwerbseinkommenSanbox.loadBgErwerbseinkommen(data);
    }

    /**
     * create new data
     *  */

    addListErwerbseinkommen(data) {
        this.erwerbseinkommenSanbox.addBgErwerbseinkommen(data);
    }

    /**
    * update data
   *  */

    updateListErwerbseinkommen(data) {
        this.erwerbseinkommenSanbox.updateBgErwerbseinkommen(data);
    }

    /**
     * delete data
     *  */
    deleteItemErwerbseinkommen(data) {
        this.erwerbseinkommenSanbox.deleteBgErwerbseinkommen(data);
    }

    /**
     * get BgBewilligungStatusCode
     *  */

    getBgBewilligungStatusCode(data) {
        this.erwerbseinkommenSanbox.loadBgBewilligungStatusCode(data);
    }

}
