import { Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { AsvConstant } from '@shared/common/asv-export.common';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { getConditionListBtn } from '@shared/utilites';
import { UtilService } from '@shared/utilites/utility.service';
import { DxPopupComponent } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import * as FileSaver from 'file-saver';
import { debounce } from 'lodash-es';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

import { AsvexportSandbox } from '../asvexport.sandbox';
import { AsvexportDetailComponent } from '../components/asvexport-detail/asvexport-detail.component';
import { AsvexportListComponent } from '../components/asvexport-list/asvexport-list.component';
import {
    ASVDetenerfassung,
    ModelFileBinary,
    ModelQueryUpdateASVSExport,
    ModelQueryUpdateTransaction,
    ModelXOrgUnit,
    ZuExportierendeEintrage,
    ZuExportierendeEintrageQuery,
} from '../models';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'kiss-asvexport',
    templateUrl: './asvexport.component.html',
    styleUrls: ['./asvexport.component.scss']
})
@SetClassRight('CtlAsvexport.fr')
export class AsvexportComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate {

    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    @ViewChild('gridZuExportierendeEintrageBottom') gridAsvexportBottom: DxDataGridComponent;
    @ViewChild('gridpopup') gridpopup: DxPopupComponent;
    @ViewChild('gridFunction') gridFunction: GridFunctionComponent;
    @ViewChild('expandGridBottom') expandGridBottom: any;
    @ViewChild('asvexportList') asvexportList: AsvexportListComponent;
    @ViewChild('asvexportDetail') asvexportDetail: AsvexportDetailComponent;
    @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;
    AdditionalButtons = [...CommonConstant.AdditionalButtons];
    listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
    dataExportAllGridTop: ASVDetenerfassung[];
    dataExportAllGridBottom: ZuExportierendeEintrage[];
    eintrageModel: ZuExportierendeEintrageQuery = new ZuExportierendeEintrageQuery();
    dataFileBinary: ModelFileBinary;
    selectedKeys = [];
    xOrgUnitData: ModelXOrgUnit[] = [];
    isSelectRowGridTop = false;
    selectionRow: any;
    txtBemerkung: string;
    txtBemerkungTmp: string;
    modelInsertASVSExport: ModelQueryUpdateTransaction = new ModelQueryUpdateTransaction();
    userID: string;
    firstName: string;
    lastName: string;
    isNavbar: boolean;
    modelUpdateASVSExport: ModelQueryUpdateASVSExport = new ModelQueryUpdateASVSExport();
    modelQueryUpdateTransaction: ModelQueryUpdateTransaction = new ModelQueryUpdateTransaction();
    orgUnitID: number;
    isUpdateTranSaction = false;
    modelExportAllGridTop: ASVDetenerfassung = new ASVDetenerfassung();
    isAddNew = false;
    eintrageModelAdd: ZuExportierendeEintrageQuery = new ZuExportierendeEintrageQuery();
    isUpdate = false;
    isCreateExport = false;
    isDisabledGridTop = false;
    currentUrl: string;
    private subscription = new Subscription();

    isReadOnly = true;
    concurrency: string;
    sstASVSExportTS: any[];
    popUpModel: PopUpModel;
    isChangeData = false;
    keyCancel = 'cancel';
    keyAddNew = 'addnew';
    accessKeyItemFocused = 0;
    readonly setTimeOut: number = CommonConstant.SetTimeOut;
    messageCanDeactive: any;
    navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
    isDaten = false;
    readonly setTimeOut300: number = CommonConstant.SetTimeOut300;
    resetDataGrid = debounce(() => {
        this.asvexportList.gridAsvexportTop.instance.repaint();
        this.asvexportDetail.gridAsvexportBottom.instance.repaint();
    }, CommonConstant.SetTimeOut);
    popUpConcurrencyModel: PopUpModel;
    customizeBtn = [
        {
            text: 'Asvexport.Button.ExportXml',
            visible: true,
            disabled: undefined,
            name: 'exportxml',
            type: 'default'
        },
        {
            text: 'Asvexport.Button.Add',
            visible: true,
            disabled: undefined,
            name: 'add',
            icon: 'add',
            type: 'default'
        },
        {
            text: 'Asvexport.Button.Edit',
            visible: true,
            disabled: undefined,
            name: 'edit',
            icon: 'edit',
            type: 'default'
        },
        {
            text: 'Asvexport.Button.CreateExport',
            visible: false,
            disabled: undefined,
            name: 'export',
            type: 'default'
        },
        {
            text: 'Asvexport.Button.Save',
            visible: false,
            disabled: undefined,
            name: 'save',
            icon: 'save',
            type: 'default'
        },
        {
            text: 'Asvexport.Button.Cancel',
            visible: false,
            name: 'cancel',
            icon: 'close',
            type: 'default'
        },
    ];
    readonly messageErrorEintrageOhne = 'Export nicht möglich: Es exisieren Einträge ohne Sozialversicherungsnummern.';
    readonly messageErrorMitUngultiger = 'Export nicht möglich: Es exisieren Einträge mit ungültiger Sozialversicherungsnummer.';
    readonly messageErrorOhneGultige = 'Export nicht möglich: Es exisieren Einträge ohne gültige Adressen.';
    readonly messageErrorXMLValidation = 'XML Validation: Invalid content. Expected element(s):[en] \'{http://' + 'asvs.jgk.be.ch/schemas/evok/20090708/SozialhilfeMeldungImport}Geburtsdatum\'.'
        + ' Found: element \'{http://' + 'asvs.jgk.be.ch/schemas/evok/20090708/SozialhilfeMeldungImport}BeginnSozialhilfe\''
        + ' instead. Location:[en] /*:SozialfallMeldungen[1]/*:Sozialfall[3]/*:Mitglieder[1]/*:BeginnSozialhilfe[1].';
    constructor(injector: Injector, public AsvexportsSandbox: AsvexportSandbox, public utilService: UtilService, public translateService: TranslateService,
        public layoutSandbox: LayoutSandbox, private router: Router) {
        super(injector);
    }

    ngOnInit() {
        this.setTitle(AsvConstant.PAGETITLE);
        this.initFunction();
        this.getLocalStorage();
        this.initData();
        this.registerEvents(null);
        this.initPopUpModel();
        this.initPopUpConcurModel();
    }

    ngOnDestroy() {
        this.AsvexportsSandbox.resetAsvState();
        this.unregisterEvents();
    }
    /** 2018/09/30
     * Create function to un-register all subscribes
     */
    unregisterEvents() {
        this.subscription.unsubscribe();
    }

    private registerEvents(str?: any): void {
        // listen scroll event
        this.subscription.add(
            this.layoutSandbox.scrollChanged.subscribe(el => {
                this.scrollChanged(el);
            })
        );
        // Register subscribe load data for top grid
        this.subscription.add(this.AsvexportsSandbox.AsvexportesData$.subscribe(dataExport => {
            this.dataExportAllGridTop = dataExport;
            if (dataExport && dataExport.status === AppEnums.StatusCode.BAD_REQUEST) {
                const body = JSON.parse(dataExport._body);
                const message = body.message.toString();
                this.remainingMessage.showMessage(message);
                return;
            }
            if (isNullOrUndefined(dataExport) || dataExport.length <= 0) {
                return;
            }
            if (this.isUpdateTranSaction) {
                this.afterUpdatetranSaction(dataExport);
                return;
            }
            if (this.isUpdate || this.concurrency === CommonConstant.Concurrency) {
                this.afterUpdate();
                return;
            }
            this.loadDataGridTop(dataExport);
        }));

        // Register subscribe load data for bottom grid
        this.subscription.add(this.AsvexportsSandbox.AsvEintrageData$.subscribe(dataAsvEintrage => {
            this.dataExportAllGridBottom = dataAsvEintrage;
            if (dataAsvEintrage && dataAsvEintrage.status === AppEnums.StatusCode.BAD_REQUEST) {
                const body = JSON.parse(dataAsvEintrage._body);
                const message = body.message.toString();
                this.remainingMessage.showMessage(message);
                return;
            }
            if (isNullOrUndefined(this.dataExportAllGridTop) || isNullOrUndefined(this.dataExportAllGridBottom)) {
                return;
            }
            if (this.dataExportAllGridTop.length > 0 && this.dataExportAllGridBottom.length > 0) {
                this.customizeBtn[3].disabled = true;
                if (this.isAddNew) {
                    this.customizeBtn[3].disabled = false;
                    this.customizeBtn = [...this.customizeBtn];
                    return;
                }
                if (this.isSelectRowGridTop) {
                    this.isSelectRowGridTop = false;
                    if (typeof (this.dataExportAllGridTop[0].DatumExport) !== 'undefined') {
                        this.customizeBtn[0].disabled = false;
                        this.customizeBtn = [...this.customizeBtn];
                        return;
                    }
                    this.customizeBtn[0].disabled = true;
                    this.customizeBtn = [...this.customizeBtn];
                    return;
                }
                if (typeof (this.selectionRow.DatumExport) !== 'undefined') {
                    this.customizeBtn[0].disabled = false;
                    this.customizeBtn = [...this.customizeBtn];
                    return;
                }
                this.customizeBtn[0].disabled = true;
                this.customizeBtn = [...this.customizeBtn];
                return;
            }
            this.customizeBtn[3].disabled = false;
            this.customizeBtn[0].disabled = true;
            this.customizeBtn = [...this.customizeBtn];
        }));

        // Register subscribe load file binary of function Speichern unter...
        this.subscription.add(this.AsvexportsSandbox.FileBinaryData$.subscribe(dataFileBinary => {
            this.dataFileBinary = dataFileBinary;
            if (dataFileBinary && dataFileBinary.status === AppEnums.StatusCode.BAD_REQUEST) {
                const body = JSON.parse(dataFileBinary._body);
                const message = body.message.toString();
                this.remainingMessage.showMessage(message);
                return;
            }

            if (!isNullOrUndefined(this.dataFileBinary) && !isNullOrUndefined(this.dataFileBinary.FileBinary)) {
                const decode = atob(this.dataFileBinary.FileBinary.toString());
                const blob = new Blob([decode], {
                    type: 'application/xml'
                });
                FileSaver.saveAs(blob, this.dataFileBinary.DbName + '_doc' + this.selectionRow.DocumentID + '_uid' + this.userID + '.xml');
            }
        }));

        // Register subscribe load data for select box Sektion
        this.subscription.add(this.AsvexportsSandbox.XOrgUnitsData$.subscribe(xOrgUnit => {
            if (xOrgUnit && xOrgUnit.status === AppEnums.StatusCode.BAD_REQUEST) {
                const body = JSON.parse(xOrgUnit._body);
                const message = body.message.toString();
                this.remainingMessage.showMessage(message);
                return;
            }
            if (isNullOrUndefined(xOrgUnit) || xOrgUnit.length < 0) {
                return;
            }
            xOrgUnit.forEach(item => {
                this.xOrgUnitData.push(item);
            });
        }));

        // Register subscribe insert data for grid top

        this.subscription.add(this.AsvexportsSandbox.InsertSstASVSExportData$.subscribe(SstASVSExportData => {
            if (SstASVSExportData) {
                this.AsvexportsSandbox.getAsvexport();
            }
        }));

        // Register subscribe update data for grid top
        this.subscription.add(this.AsvexportsSandbox.UpdateSstASVSExportData$.subscribe(UpdateSstASVSExportData => {
            if (isNullOrUndefined(UpdateSstASVSExportData)) {
                return;
            }

            if (UpdateSstASVSExportData && UpdateSstASVSExportData.status === AppEnums.StatusCode.FORBIDDEN) {
                this.handleError();
                return;
            }

            if (UpdateSstASVSExportData.status && UpdateSstASVSExportData.status === AppEnums.StatusCode.CONCURRENCY) {
                const message = this.translateService.instant('Asvexport.MessageError.ConcurrencyMsg409');
                message.replace('\r\n', '<br>');
                this.showPopupConcurrency(message);
                return;
            }

            if (UpdateSstASVSExportData && UpdateSstASVSExportData.status === AppEnums.StatusCode.BAD_REQUEST) {
                const body = JSON.parse(UpdateSstASVSExportData._body);
                const message = body.message.toString();
                this.remainingMessage.showMessage(message);
                return;
            }

            if (UpdateSstASVSExportData) {
                this.txtBemerkungTmp = this.txtBemerkung;
                this.AsvexportsSandbox.getAsvexport();
                this.modeView();
            }

        }));

        // Register subscribe update transaction
        this.subscription.add(this.AsvexportsSandbox.UpdateSstASVSExportTransactionData$.subscribe(UpdateSstASVSTransactionData => {
            if (UpdateSstASVSTransactionData && UpdateSstASVSTransactionData.status === AppEnums.StatusCode.FORBIDDEN) {
                this.handleError();
                return;
            }
            if (!isNullOrUndefined(UpdateSstASVSTransactionData)) {
                if (!isNullOrUndefined(UpdateSstASVSTransactionData.isSuccess)) {
                    this.txtBemerkungTmp = this.txtBemerkung;
                    this.isUpdateTranSaction = true;
                    this.isCreateExport = false;
                    this.AsvexportsSandbox.getAsvexport();
                    this.modeView();
                } else {
                    const body = JSON.parse(UpdateSstASVSTransactionData._body);
                    const message = body.message.toString();
                    this.showMessage(message);
                }
            }
        }));

        this.subscription.add(this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this.currentUrl = event.url;
            }
        }));

        this.subscription.add(this.asvexportList.rowFocusing.pipe(
            distinctUntilChanged()
        ).subscribe(event => {
            if (event && !this.isAddNew) {
                this.txtBemerkung = this.dataExportAllGridTop.filter(x => x.SstASVSExportID === event)[0].Bemerkung;
                this.eintrageModel.sstASVSExportID = event;
                this.AsvexportsSandbox.getEintrage(this.eintrageModel);
            } else {
                this.dataExportAllGridBottom = [];
            }
        }));
    }

    initData() {
        this.orgUnitID = -1;
        this.eintrageModel.orgUnitID = -1;
        this.eintrageModel.isFindeDieZu = false;
        const modelGetDataCombobox = new ModelXOrgUnit();
        modelGetDataCombobox.text = '';
        this.xOrgUnitData.push(modelGetDataCombobox);
    }

    initFunction() {
        // Get data for grid top
        this.AsvexportsSandbox.getAsvexport();
        // Get data for select box Sektion
        this.AsvexportsSandbox.getXOrgUnitsData();
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

    initPopUpConcurModel() {
        this.popUpConcurrencyModel = new PopUpModel(
            {
                title: this.translateService.instant('Asvexport.PopupConfirm.Title'),
                isVisibleTitle: true,
                isVisible: false,
                message: '',
                textYes: this.translateService.instant('Asvexport.PopupConfirm.Abbrechen'),
                isVisibleYes: true,
                textNo: this.translateService.instant('Asvexport.PopupConfirm.Daten'),
                isVisibleNo: true,
                funcYes: null,
                funcNo: null,
            }
        );
    }

    getDetailGridBottom($event) {
        if ($event.rowType === 'data') {
            this.asvexportDetail.gridAsvexportBottom.focusedRowEnabled = false;
            this.selectionRow = $event.data;
            this.txtBemerkung = $event.data.Bemerkung;
            this.txtBemerkungTmp = $event.data.Bemerkung;
            this.eintrageModel.sstASVSExportID = $event.data.SstASVSExportID;
            this.sstASVSExportTS = [];
            this.AsvexportsSandbox.getEintrage(this.eintrageModel);
        }
    }

    getLocalStorage() {
        this.userID = localStorage.getItem('user:userId');
        this.firstName = localStorage.getItem('user:firstName');
        this.lastName = localStorage.getItem('user:lastName');
        this.isNavbar = JSON.parse(localStorage.getItem('settings:toogleNavbar'));
    }
    /**
     * Create funtion for click on menu item
     */
    toolBarOnItemClickTopGrd($event) {
        switch ($event) {
            case 'printPdf': {
                this.asvexportList.printPdf();
                break;
            }
            case 'exportExcel': {
                this.asvexportList.gridAsvexportTop.instance.exportToExcel(false);
                document.getElementById('excelExportId').blur();
                return;
            }
            case 'chooserColumn': {
                this.asvexportList.gridAsvexportTop.instance.showColumnChooser();
                document.getElementById('spaltenauswahlId').blur();
                return;
            }
            default:
                break;
        }
        this.asvexportList.gridFunction.model[$event] = !this.asvexportList.gridFunction.model[
            $event
        ];
        if (this.asvexportList.gridFunction.model.autoSaveSetting) {
            this.asvexportList.gridFunction.updateSetting(this.asvexportList.gridFunction.model);
        }
    }

    onClickEditBtnGrdTop() {
        this.focusTextBox();
        this.modeEdit();
    }

    onClickCancelBtnGrdTop() {
        if (this.isAddNew && (this.txtBemerkung !== this.txtBemerkungTmp || this.isChangeData || this.isCreateExport)) {
            this.handleActionPopup(this.keyAddNew, '');
            return;
        }

        if (this.concurrency === CommonConstant.Concurrency) {
            this.concurrency = '';
            this.txtBemerkung = this.txtBemerkungTmp;
            this.modeView();
            this.AsvexportsSandbox.getAsvexport();
            return;
        }

        if (this.txtBemerkung !== this.txtBemerkungTmp || this.isChangeData || this.isCreateExport) {
            this.handleActionPopup(this.keyCancel, '');
            return;
        }
        this.modeView();
    }

    modeView() {
        this.customizeBtn[1].visible = true;
        this.customizeBtn[2].visible = true;
        this.customizeBtn[4].visible = false;
        this.customizeBtn[0].visible = true;
        this.customizeBtn[3].visible = false;
        this.customizeBtn[5].visible = false;
        this.isReadOnly = true;
        this.isDisabledGridTop = false;
        this.customizeBtn[4].disabled = false;
        this.listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
        this.isChangeData = false;
        this.isCreateExport = false;
        this.orgUnitID = -1;
        this.customizeBtn = [...this.customizeBtn];
        this.remainingMessage.hideMessage();
        if (this.isAddNew) {
            this.onCancelAfterAddNew();
        }
        if (this.concurrency === CommonConstant.Concurrency) {
            this.AsvexportsSandbox.getAsvexport();
        }
    }

    modeEdit() {
        this.customizeBtn[1].visible = false;
        this.customizeBtn[2].visible = false;
        this.customizeBtn[4].visible = true;
        this.customizeBtn[0].visible = false;
        this.customizeBtn[3].visible = true;
        this.customizeBtn[5].visible = true;
        this.customizeBtn = [...this.customizeBtn];
        this.isReadOnly = false;
        if (!this.isAddNew) {
            this.isDisabledGridTop = true;
        }
        this.listBtn = [];
    }
    showDiaglogConfirm(key) {
        this.popUpModel.isVisible = true;
        switch (key) {
            case this.keyCancel:
                this.popUpModel.textYes = this.translateService.instant('Asvexport.PopupConfirm.Yes');
                this.popUpModel.textNo = this.translateService.instant('Asvexport.PopupConfirm.No');
                this.popUpModel.title = this.translateService.instant('Asvexport.PopupConfirm.Title');
                this.popUpModel.message = this.translateService.instant('Asvexport.PopupConfirm.Message');
                break;
            case 'NavigatorPopup':
                this.popUpModel.textYes = this.translateService.instant('Asvexport.NavigatorPopupConfirm.Yes');
                this.popUpModel.textNo = this.translateService.instant('Asvexport.NavigatorPopupConfirm.No');
                this.popUpModel.title = this.translateService.instant('Asvexport.NavigatorPopupConfirm.Title');
                break;
            case this.keyAddNew:
                this.popUpModel.textYes = this.translateService.instant('Asvexport.PopupConfirm.Yes');
                this.popUpModel.textNo = this.translateService.instant('Asvexport.PopupConfirm.No');
                this.popUpModel.title = this.translateService.instant('Asvexport.PopupConfirm.Title');
                this.popUpModel.message = this.translateService.instant('Asvexport.PopupConfirm.MessageAddNew');
                break;
            default:
                break;
        }

    }
    handleActionPopup(key, message) {
        this.initPopUpModel();
        switch (key) {
            case this.keyCancel:
                this.popUpModel.funcYes = () => {
                    this.txtBemerkung = this.txtBemerkungTmp;
                    this.modeView();
                    this.popUpModel.isVisible = false;
                };
                this.popUpModel.funcNo = () => {
                    this.popUpModel.isVisible = false;
                };
                this.showDiaglogConfirm(this.keyCancel);
                break;
            case 'onNavigate':
                this.popUpModel.message = message;
                this.popUpModel.funcYes = () => {
                    this.navigateAwaySelection$.next(true);
                    this.popUpModel.isVisible = false;
                };
                this.popUpModel.funcNo = () => {
                    this.navigateAwaySelection$.next(false);
                    this.popUpModel.isVisible = false;
                };
                this.showDiaglogConfirm('NavigatorPopup');
                break;
            case this.keyAddNew:
                this.popUpModel.funcYes = () => {
                    this.txtBemerkung = this.txtBemerkungTmp;
                    this.modeView();
                    this.popUpModel.isVisible = false;
                };
                this.popUpModel.funcNo = () => {
                    this.popUpModel.isVisible = false;
                };
                this.showDiaglogConfirm(this.keyAddNew);
                break;
            default:
                break;
        }
    }

    onClickAddNewBtnGrdTop() {
        this.txtBemerkung = '';
        this.txtBemerkungTmp = '';
        this.modelExportAllGridTop.Creator = this.lastName + ',' + this.firstName + ' (' + this.userID + ')';
        this.modelExportAllGridTop.SstASVSExportID = CommonConstant.idNewRow;
        if (this.dataExportAllGridTop.filter(x => x.SstASVSExportID === this.modelExportAllGridTop.SstASVSExportID).length <= 0) {
            this.dataExportAllGridTop.push(this.modelExportAllGridTop);
        }
        this.isAddNew = true;
        this.asvexportList.setFocusByKey(CommonConstant.idNewRow);
        this.modeEdit();
        this.eintrageModelAdd.sstASVSExportID = 0;
        this.eintrageModelAdd.isFindeDieZu = true;
        this.eintrageModelAdd.orgUnitID = this.orgUnitID;
        this.AsvexportsSandbox.getEintrage(this.eintrageModelAdd);
    }

    ExportFileXml() {
        this.AsvexportsSandbox.getFileBinaryData(this.selectionRow.DocumentID);
    }

    // Shortcuts key
    @HostListener('window:keydown', ['$event'])
    public keyEvent(event: KeyboardEvent) {
        if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS && !this.customizeBtn[4].disabled) {
            if (!this.isReadOnly) {
                event.preventDefault();
                this.txtBemerkung = this.asvexportDetail.bemerkungViewChild.text;
                setTimeout(() => {
                    this.saveDataGridTop();
                }, this.setTimeOut);
            }
        }
        if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ) {
            event.preventDefault();
            if (!this.isReadOnly) {
                this.txtBemerkung = this.asvexportDetail.bemerkungViewChild.text;
                this.onClickCancelBtnGrdTop();
            }
        }

        if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyI) {
            if (this.isReadOnly) {
                event.preventDefault();
                this.onClickAddNewBtnGrdTop();
            }
        }

        if (this.isAddNew) {
            if (event.keyCode === AppEnums.KeyCode.UpArrowKey) {
                this.moveFocus(false);
            } else if (event.keyCode === AppEnums.KeyCode.DownArrowKey) {
                this.moveFocus(true);
            }
        }
    }

    saveDataGridTop() {
        if (this.asvexportDetail.validationGroup.instance.validate() && !this.asvexportDetail.validationGroup.instance.validate().isValid) {
            this.remainingMessage.showMessage(this.translateService.instant('Asvexport.MessageError.Validate'), 'Asvexport.MessageError.Validate');
        } else {
            if (this.isAddNew) {
                if (this.isCreateExport) {
                    if (!isNullOrUndefined(this.dataExportAllGridBottom) && this.dataExportAllGridBottom.length > 0) {
                        this.getModelQueryInsert();
                        this.AsvexportsSandbox.updateSstASVSExportTransaction(this.modelInsertASVSExport);
                    } else {
                        this.isCreateExport = false;
                        this.remainingMessage.showMessage(this.translateService.instant('Asvexport.MessageError.ValidateSpeichern'), 'Asvexport.MessageError.ValidateSpeichern');
                    }
                } else {
                    this.remainingMessage.showMessage(this.translateService.instant('Asvexport.MessageError.ValidateSpeichern'), 'Asvexport.MessageError.ValidateSpeichern');
                }
            } else {
                if (this.selectionRow) {
                    this.getModelQueryUpdate();
                    this.isUpdate = true;
                    this.AsvexportsSandbox.updateSstASVSExport(this.modelUpdateASVSExport);
                }
            }
        }
    }

    CreateExport() {
        if (!isNullOrUndefined(this.dataExportAllGridBottom) && this.dataExportAllGridBottom.length < 1) {
            this.remainingMessage.showMessage(this.translateService.instant('Asvexport.MessageError.ValidateExport'), 'Asvexport.MessageError.ValidateExport');
        } else {
            this.remainingMessage.hideMessage();
            this.isCreateExport = true;
        }
    }

    // check value combobox when change value
    selectDropdownValue(event) {
        this.isChangeData = true;
    }

    getModelQueryInsert() {
        this.modelInsertASVSExport.bemerkung = this.txtBemerkung.toString().trim();
        this.modelInsertASVSExport.orgUnitID = this.orgUnitID === -1 ? null : this.orgUnitID;
    }

    getModelQueryUpdate() {
        this.modelUpdateASVSExport.DatumExport = this.selectionRow.DatumExport;
        this.modelUpdateASVSExport.Bemerkung = this.txtBemerkung.toString().trim();
        this.modelUpdateASVSExport.DocumentID = this.selectionRow.DocumentID;
        this.modelUpdateASVSExport.SstASVSExportID = this.selectionRow.SstASVSExportID;

        if (!isNullOrUndefined(this.sstASVSExportTS) && this.sstASVSExportTS.length > 0) {
            this.modelUpdateASVSExport.SstASVSExportTS = this.sstASVSExportTS;
        } else {
            this.modelUpdateASVSExport.SstASVSExportTS = this.selectionRow.SstASVSExportTS;
        }
    }

    // Handle close/refresh the tab
    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        this.txtBemerkung = this.asvexportDetail.bemerkungViewChild.text;
        if (!this.isReadOnly && (this.txtBemerkung !== this.txtBemerkungTmp || this.isChangeData || this.isCreateExport)) {
            return false;
        }
    }

    onChangeSelectBox(event) {
        if (!this.isAddNew) {
            return;
        }
        if (!event.value) {
            this.orgUnitID = -1;
        } else {
            this.orgUnitID = event.value;
        }
        this.eintrageModelAdd.orgUnitID = this.orgUnitID;
        this.AsvexportsSandbox.getEintrage(this.eintrageModelAdd);
    }

    scrollToElement() {
        setTimeout(() => {
            this.asvexportList.gridAsvexportTop.instance.focus(this.asvexportList.gridAsvexportTop.instance.getCellElement(this.dataExportAllGridTop.length - 1, 0));
        }, this.setTimeOut300);
    }

    onCloseError() {
        this.remainingMessage.hideMessage();
    }
    // Arrow-key
    moveFocus(isNext: boolean) {
        const tagNames = ['input', 'textarea'];
        for (const tagName of tagNames) {
            const elems = document.getElementsByTagName(tagName);
            for (const el of Array.from(elems)) {
                if (isNext) {
                    if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused + 1) {
                        (el as HTMLElement).focus();
                        return;
                    }
                } else {
                    if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused - 1) {
                        (el as HTMLElement).focus();
                        return;
                    }
                }
            }
        }
    }

    setValuesstASV(dataExport, lengthDataExport) {
        const data = this.dataExportAllGridTop.filter(x => x.SstASVSExportID === dataExport[lengthDataExport].SstASVSExportID)[0];
        this.sstASVSExportTS = data.SstASVSExportTS;
    }

    canDeactivate() {
        if (this.asvexportDetail && this.asvexportDetail.bemerkungViewChild) {
            this.txtBemerkung = this.asvexportDetail.bemerkungViewChild.text;
        }
        if (!this.isReadOnly && (this.txtBemerkung !== this.txtBemerkungTmp || this.isChangeData || this.isCreateExport)) {
            this.handleActionPopup('onNavigate', this.translateService.instant('Asvexport.NavigatorPopupConfirm.Message'));
            return this.navigateAwaySelection$;
        }
        return true;
    }

    disabledGridTop() {
        if (this.isDaten) {
            this.isDaten = false;
            this.isDisabledGridTop = true;
            return;
        }
        this.isDisabledGridTop = false;
    }

    afterUpdatetranSaction(dataExport) {
        const lengthDataExport = dataExport.length - 1;
        this.setValuesstASV(dataExport, lengthDataExport);
        this.isUpdateTranSaction = false;
        this.isAddNew = false;
        this.selectedKeys = [dataExport[lengthDataExport].SstASVSExportID];
        this.eintrageModel.sstASVSExportID = dataExport[lengthDataExport].SstASVSExportID;
        this.selectionRow = dataExport[lengthDataExport];
        this.scrollToElement();
        this.AsvexportsSandbox.getEintrage(this.eintrageModel);
        this.disabledGridTop();
    }

    afterUpdate() {
        this.concurrency = '';
        const data = this.dataExportAllGridTop.filter(x => x.SstASVSExportID === this.selectionRow.SstASVSExportID)[0];
        this.sstASVSExportTS = data.SstASVSExportTS;
        this.txtBemerkung = data.Bemerkung;
        this.txtBemerkungTmp = data.Bemerkung;
        this.isUpdate = false;
        this.selectedKeys = [this.selectionRow.SstASVSExportID];
        this.eintrageModel.sstASVSExportID = this.selectionRow.SstASVSExportID;
        const findIndex = this.dataExportAllGridTop.findIndex(x => x.SstASVSExportID === this.selectionRow.SstASVSExportID);
        setTimeout(() => {
            const scrollable = this.asvexportList.gridAsvexportTop.instance.getScrollable();
            if (scrollable != null) {
                scrollable.scrollToElement(this.asvexportList.gridAsvexportTop.instance.getRowElement(findIndex));
            }
        }, this.setTimeOut300);
        this.AsvexportsSandbox.getEintrage(this.eintrageModel);
        this.disabledGridTop();
    }

    loadDataGridTop(dataExport) {
        this.asvexportList.setFocusByKey(dataExport[0].SstASVSExportID);
        this.eintrageModel.sstASVSExportID = dataExport[0].SstASVSExportID;
        this.isSelectRowGridTop = true;
        this.selectionRow = dataExport[0];
        this.txtBemerkung = dataExport[0].Bemerkung;
        this.txtBemerkungTmp = dataExport[0].Bemerkung;
        this.AsvexportsSandbox.getEintrage(this.eintrageModel);
        this.disabledGridTop();
    }

    scrollChanged(e) {
        this.resetDataGrid();
    }

    focusTextBox() {
        setTimeout(() => {
            this.asvexportDetail.bemerkungViewChild.instance.focus();
        }, CommonConstant.SetTimeOut);
    }

    showPopupConcurrency(message) {
        this.popUpConcurrencyModel.message = message;
        this.popUpConcurrencyModel.isVisible = true;
        this.concurrency = CommonConstant.Concurrency;
        this.popUpConcurrencyModel.funcYes = () => {
            this.doAbbrechenConcurrency();
        };
        this.popUpConcurrencyModel.funcNo = () => {
            this.isDaten = true;
            this.AsvexportsSandbox.getAsvexport();
            this.concurrency = '';
            this.popUpConcurrencyModel.isVisible = false;
        };
        this.popUpConcurrencyModel.funcHiding = () => {
            this.doAbbrechenConcurrency();
        };
    }
    doAbbrechenConcurrency() {
        this.popUpConcurrencyModel.isVisible = false;
        this.customizeBtn[4].disabled = true;
        this.customizeBtn = [...this.customizeBtn];
    }
    emitExportXml() {
        this.ExportFileXml();
    }
    emitEventAddNew() {
        this.onClickAddNewBtnGrdTop();
    }
    emitEventEdit() {
        this.onClickEditBtnGrdTop();
    }
    emitEventExport() {
        this.CreateExport();
    }
    emitEventSave(data) {
        this.txtBemerkung = data;
        this.saveDataGridTop();
    }
    emitEventCancel(data) {
        this.txtBemerkung = data;
        this.onClickCancelBtnGrdTop();
    }
    emitAccessKeyItemFocused(data) {
        this.accessKeyItemFocused = data;
    }
    emitSelectDropdownValue(data) {
        this.selectDropdownValue(data);
    }
    emitChangeSelectBox(data) {
        this.onChangeSelectBox(data);
    }

    emitVisibleRows(data) {
        if (data.length < 1) {
            this.customizeBtn[0].disabled = true;
            this.customizeBtn[2].disabled = true;
        } else {
            this.customizeBtn[0].disabled = false;
            this.customizeBtn[2].disabled = false;
        }
        this.customizeBtn = [...this.customizeBtn];
    }

    emitStateSearch() {
        this.customizeBtn[0].disabled = false;
        this.customizeBtn[2].disabled = false;
        this.customizeBtn = [...this.customizeBtn];
    }

    showMessage(message) {
        if (message.split(':')[0] === 'XML Validation') {
            this.remainingMessage.showMessage(this.translateService.instant('Asvexport.MessageError.MessageErrorXMLValidation') + message.split('Location:')[1], 'Asvexport.MessageError.MessageErrorXMLValidation', message.split('Location:')[1]);
            return;
        }
        switch (message) {
            case this.messageErrorEintrageOhne:
                this.remainingMessage.showMessage(this.translateService.instant('Asvexport.MessageError.MessageErrorEintrageOhne'), 'Asvexport.MessageError.MessageErrorEintrageOhne');
                break;
            case this.messageErrorMitUngultiger:
                this.remainingMessage.showMessage(this.translateService.instant('Asvexport.MessageError.MessageErrorMitUngultiger'), 'Asvexport.MessageError.MessageErrorMitUngultiger');
                break;
            case this.messageErrorOhneGultige:
                this.remainingMessage.showMessage(this.translateService.instant('Asvexport.MessageError.MessageErrorOhneGultige'), 'Asvexport.MessageError.MessageErrorOhneGultige');
                break;
            default:
                this.remainingMessage.showMessage(message);
                break;
        }
    }

    emitStateAdd() {
        if (this.isAddNew) {
            setTimeout(() => {
                this.isDisabledGridTop = true;
                this.asvexportDetail.bemerkungViewChild.instance.focus();
            });
        }
    }

    onCancelAfterAddNew() {
        this.isAddNew = false;
        this.asvexportList.setFocusByKey(this.dataExportAllGridTop[0].SstASVSExportID);
        const index = this.dataExportAllGridTop.indexOf(this.modelExportAllGridTop);
        if (index !== -1) {
            this.dataExportAllGridTop.splice(index, 1);
        }
    }

    // Handle error
    handleError() {
        this.remainingMessage.showMessage(this.translateService.instant('HttpStatusMessage.Forbidden'), 'HttpStatusMessage.Forbidden');

    }
}
  /********************* The End Add Code for process Edit mode for Top grid *************/
