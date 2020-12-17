import { AfterViewInit, Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
    TabModuleFallbearbeitungSandbox,
} from '@app/kiss4-main/tab-module-fallbearbeitung/tab-module-fallbearbeitung.sandbox';
import { SozialhilfeTreeSandbox } from '@app/kiss4-sozialhilfe/sozialhilfe-tree/sozialhilfe-tree.sandbox';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { SpeziaikontoConstant } from '@shared/common/speziaikonto.common';
import { BaseComponent } from '@shared/components/base.component';
import { CanDeactivateComponent } from '@shared/components/can-deactivate/can-deactivate.component';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { getConditionListBtn, getRoleSessionStorage, outFocus } from '@shared/utilites';
import { getLanguageCodeFromLocalStorage } from '@shared/utilites/utilityHelpers';
import { DxFormComponent } from 'devextreme-angular';
import { locale } from 'devextreme/localization';
import { Subscription } from 'rxjs';
import { isNullOrUndefined, isArray } from 'util';

import { SpeziaikontoDetailComponent } from '../components/speziaikonto-detail/speziaikonto-detail.component';
import { SpeziaikontoGridComponent } from '../components/speziaikonto-grid/speziaikonto-grid.component';
import { SpezialkontoSandbox } from '../speziaikonto.sandbox';

@Component({
    selector: 'app-speziaikonto',
    templateUrl: './speziaikonto.component.html',
    styleUrls: ['./speziaikonto.component.scss']
})
@SetClassRight('CtlSpeziaikonto')
export class SpezialkontoComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('rechtstitelForm') rechtstitelForm: DxFormComponent;
    @ViewChild('kissSpeziaikontoGrid') kissSpeziaikontoGrid: SpeziaikontoGridComponent;
    @ViewChild('speziaikonto') speziaikonto: SpeziaikontoDetailComponent;
    @ViewChild('remainMessage') remainMessage: RemainingMessageComponent;
    @ViewChild('canDeactivate') deactivatePopup: CanDeactivateComponent;

    // common kiss-card-title
    AdditionalButtons = [...CommonConstant.AdditionalButtons];
    popUpModelConfirm: PopUpModel = new PopUpModel({ isVisible: true });
    //#region "Declare variables"
    private subscription = new Subscription();
    seletedRowKeys: any;
    detailSelected: any = null;
    dsSpezkonto: any = [];
    isState1: boolean;
    isState2: boolean;
    isState3: boolean;
    isState4: boolean;
    queryVorhanden = false;
    ModeAbschliessenFeld: boolean;
    queryBeglichen = false;
    listBtn = [];
    formName = '';
    formNameForTitle = '';
    //#region "Declare variables"
    isEditMode = false;
    isChangeData = false;
    popUpModel: PopUpModel;
    FaLeistung: number;
    bgSpezkontoID: number;
    dataSourceDetailGrid = [];
    dataSourceBaPerson = [];
    dataSourceBgKostenart = [];
    dataSourceDatumVon = [];
    dataSourceBgPosArt = [];
    abzahlungskontoAbschlussgrund = [];
    abzahlungskontoRueckerstattung = [];
    monat = [];
    dataSourceGutschrift = [];
    dataVon = [];
    titleText: any;
    baPersonId: string;
    isAddNew = false;
    isSuccess = false;
    isErrorClosed = false;
    isLoadSuccess: boolean;
    isLoadEditBar: boolean;
    visibleConcurrencyPopup: boolean;
    urlParams: string;
    dataAddEdit: any;
    isAddEdit: boolean;
    edtAktiv: boolean;
    bgSpezkontoTypCode: number;
    namePerson: string;
    nameMonthVon: string;
    nameMonthBis: string;
    nameAbschlussgrund: string;
    nameRueckerstattung: string;
    nameBelastung: string;
    nameGutschrift: string;
    isCheckUserRole: boolean;
    isAbschliessenVisible: boolean;
    maxSanktion: number;
    checkErrorAbschliessen = false;
    customizeBtn = [
        {
            text: 'CtlSpeziaikonto.Button.AbschliessenRuckgangig',
            visible: false,
            name: SpeziaikontoConstant.ABSCHLIESSENRUCKGANGIG,
        },
        {
            text: 'CtlSpeziaikonto.Button.Abchliessen',
            visible: false,
            name: SpeziaikontoConstant.ABSCHLIESSEN,
        },
        {
            text: 'CtlSpeziaikonto.Button.KurzungAufheben',
            visible: false,
            name: SpeziaikontoConstant.AUFHEBEN,
        },
        {
            text: 'CtlSpeziaikonto.Button.KurzungFreigeben',
            visible: false,
            name: SpeziaikontoConstant.FREIGEBEN,
        },
        {
            text: 'CtlSpeziaikonto.Button.InVorbereitung',
            visible: false,
            name: SpeziaikontoConstant.VORBEREITUNG,
        },
        {
            text: 'CtlSpeziaikonto.Button.NeuesVorabzugskonto',
            visible: true,
            name: SpeziaikontoConstant.ADD,
            icon: 'add',
            class: 'toolbar-button'
        },
        {
            text: 'CtlSpeziaikonto.Bearbeiten',
            visible: true,
            name: SpeziaikontoConstant.BEARBEITEN,
            disabled: undefined,
            icon: 'edit',
            class: 'toolbar-button'
        },
        {
            text: 'CtlSpeziaikonto.Speichern',
            visible: false,
            name: SpeziaikontoConstant.SPEICHERN,
            icon: 'save',
            useSubmitBehavior: true,
            disabled: false,
            class: 'toolbar-button'
        },
        {
            text: 'CtlSpeziaikonto.Abbrechen',
            visible: false,
            name: SpeziaikontoConstant.ABBRECHEN,
            icon: 'remove',
            class: 'toolbar-button'
        },
        {
            text: 'CtlSpeziaikonto.Loschen',
            visible: true,
            useSubmitBehavior: true,
            locateInMenu: 'always',
            disabled: false,
            name: SpeziaikontoConstant.LOSCHEN,
        }
    ];
    btnDisabledNamesState2 = [SpeziaikontoConstant.ABSCHLIESSENRUCKGANGIG, SpeziaikontoConstant.ABSCHLIESSEN];
    btnDisabledNamesState4 = [SpeziaikontoConstant.AUFHEBEN, SpeziaikontoConstant.FREIGEBEN, SpeziaikontoConstant.VORBEREITUNG];
    dataFreigegeben = [];
    dataGesperrt = [];
    nameScreen: any;
    isVisiblePanasch: boolean;
    moduleIconDisable: any;
    isDisableKurzungen = false;
    isDisableSalo = false;
    isDatumBis = false;
    //#endregion

    constructor(injector: Injector,
        public speziaikontoSandbox: SpezialkontoSandbox,
        public translateService: TranslateService,
        public router: Router,
        public tabModuleFallbearbeitungSandbox: TabModuleFallbearbeitungSandbox,
        public sozialhilfeTreeSandbox: SozialhilfeTreeSandbox,
    ) {
        super(injector);
        locale(getLanguageCodeFromLocalStorage());
    }

    ngOnInit() {
        this.isState1 = false;
        this.isState2 = false;
        this.isState3 = false;
        this.isState4 = false;
        this.isAddEdit = false;
        this.baPersonId = this.router.url.split('/')[5];
        this.registerEvents();
        this.initPopUpModel();
        this.listBtn = [CommonConstant.ToolbarButtons, CommonConstant.AdditionalButtons.slice(0, 7)];
        this.checkIsReadRole();
    }

    ngAfterViewInit(): void {
    }
    //#region "registerEvents function"
    private registerEvents() {
        this.subscription.add(
            this.sozialhilfeTreeSandbox.selectedNode$.subscribe(data => {
                if (data) {
                    this.isChangeData = false;
                    this.isState1 = false;
                    this.isState2 = false;
                    this.isState3 = false;
                    this.isState4 = false;
                    this.kissSpeziaikontoGrid.resetDataGrid();
                    this.speziaikontoSandbox.reset();
                    this.hideButton();
                    this.changeDisabled(this.customizeBtn.reduce((result, { visible, name }) => [...result, ...visible ? [name] : []], []), !isNullOrUndefined(this.moduleIconDisable));
                    this.brandScreen();
                    this.FaLeistung = data.faLeistungID;
                    this.dsSpezkonto = [];
                    this.loadInitData();
                    this.baPersonId = this.router.url.split('/')[5];
                    this.initPopUpModel();
                    this.isAddNew = false;
                    this.isSuccess = false;
                    this.isEditMode = false;
                    this.onDisableViewModel(true);
                    this.hideMessageRemaining();
                }
            })
        );
        this.subscription.add(this.speziaikontoSandbox.cbxMasterData$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                this.isLoadSuccess = true;
                this.abzahlungskontoAbschlussgrund = data['abzahlungskontoAbschlussgrund'];
                this.abzahlungskontoRueckerstattung = data['abzahlungskontoRueckerstattung'];
                this.monat = data['monat'];
            }
        }));

        this.subscription.add(this.speziaikontoSandbox.loadDataGridTop$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                this.dsSpezkonto = data;
                this.dsSpezkonto.forEach(spezkonto => {
                    if (spezkonto.BewilligungStatusCode === 1) {
                        spezkonto.BewilligungStatusName = SpeziaikontoConstant.INVORBEREITUNG;
                    } else if (spezkonto.BewilligungStatusCode === 5) {
                        spezkonto.BewilligungStatusName = SpeziaikontoConstant.FREIGEGEBEN;
                    } else {
                        spezkonto.BewilligungStatusName = SpeziaikontoConstant.AUFGEHOBEN;
                    }
                });
                this.onCloseError();
                if (this.isAddEdit) {
                    if ((data.filter(item => item.BgSpezkontoID === (this.dataAddEdit.bgSpezkontoId))).length || !this.edtAktiv) {
                        this.rowSelectChange(data.filter(item => item.BgSpezkontoID === (this.dataAddEdit.bgSpezkontoId))[0]);
                    } else {
                        this.rowSelectChange(this.dsSpezkonto[0]);
                    }
                } else {
                    this.rowSelectChange(this.dsSpezkonto[0]);
                }
            }
        }));

        this.subscription.add(this.speziaikontoSandbox.loadDataGridDetail$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                this.dataSourceDetailGrid = data;
                this.dataFreigegeben = this.dataSourceDetailGrid.filter(x => (x.Freigegeben === true || x.Gesperrt === true));
                if (this.dataFreigegeben && this.dataFreigegeben.length > 0) {
                    this.isDisableKurzungen = true;
                    this.isDatumBis = true;
                    if (!isNullOrUndefined(this.detailSelected) && this.detailSelected['Saldo'] === 0) {
                        this.isDisableSalo = true;
                    } else {
                        this.isDisableSalo = false;
                    }
                    this.setEditMode();
                    this.initForm(this.isAbschliessenVisible);
                    return;
                }
                this.isDisableKurzungen = false;
                this.isDisableSalo = false;
                this.isDatumBis = false;
                this.setEditMode();
                if (!this.isEditMode) {
                    this.initForm(this.isAbschliessenVisible);
                }
            }
        }));

        this.subscription.add(this.speziaikontoSandbox.loadBaPerson$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                this.isLoadSuccess = true;
                this.dataSourceBaPerson = data;
            }
        }));

        this.subscription.add(this.speziaikontoSandbox.loadBgKostenart$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                this.isLoadSuccess = true;
                this.dataSourceBgKostenart = data;
            }
        }));

        this.subscription.add(this.speziaikontoSandbox.loadDatumVon$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                this.dataSourceDatumVon = data;
                this.speziaikonto.doAdd(data);
            }
        }));

        this.subscription.add(
            this.tabModuleFallbearbeitungSandbox.getPersonInfoTitel$.subscribe(data => {
                if (isNullOrUndefined(data) || data.status) {
                    return;
                }
                this.titleText = data.titleText;
            })
        );

        this.subscription.add(
            this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
                // TODO
            })
        );

        this.subscription.add(this.speziaikontoSandbox.createSpeziaikonto$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                if (data.status && data.status === AppEnums.StatusCode.UNPROCESSABLE_ENTITY) {
                    const message = JSON.parse(data._body).message;
                    this.showPopup(message, this.translateService.instant('CtlSpeziaikonto.Information'), null, null, false, false, null, null);
                    return;
                }
                if (data.status && data.status === AppEnums.StatusCode.BAD_REQUEST) {
                    this.kissSpeziaikontoGrid.disableList(false);
                    const message = JSON.parse(data._body).message;
                    this.showRemainMessage(message);
                    return;
                }
                if (data.status && data.status === AppEnums.StatusCode.INTERNAL_SERVER_ERROR) {
                    if (this.isState2) {
                        const message = JSON.parse(data._body).message;
                        this.showRemainMessage(message);
                        return;
                    }
                }
                this.dataAddEdit = data;
                this.isAddEdit = true;
                this.loadDataGridTop();
                this.refreshData();
            }
        }));

        this.subscription.add(this.speziaikontoSandbox.editSpeziaikonto$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                this.isAddEdit = true;
                this.dataAddEdit = data;
                this.onDisableViewModel(true);
                this.loadDataGridTop();
                this.refreshData();
            }
        }));

        this.subscription.add(this.speziaikontoSandbox.deleteSpeziaikonto$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                this.isAddEdit = false;
                this.loadDataGridTop();
                this.speziaikonto.customizeBtnViewMode();
            }
        }));
        this.subscription.add(this.speziaikontoSandbox.editSpeziaikontoFails$.subscribe(data => {
            this.checkErrorAbschliessen = false;
            this.onSaveKontakDataFail(data);
        }
        ));
        this.subscription.add(this.speziaikontoSandbox.deleteSpeziaikontoFails$.subscribe(data => {
            this.checkErrorAbschliessen = false;

            this.onDelKontaktFailData(data);
        }
        ));

        this.subscription.add(this.speziaikontoSandbox.loadPositionsarten$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                this.isLoadSuccess = true;
                this.dataSourceGutschrift = data;
            }
        }));

        this.subscription.add(this.speziaikontoSandbox.loadAbschliessenVisible$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                this.isAbschliessenVisible = data.abschliessenVisible;
            }
        }));

        this.subscription.add(this.speziaikontoSandbox.maxSanktione$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                this.maxSanktion = data.maxSanktion;
            }
        }));

        this.subscription.add(this.tabModuleFallbearbeitungSandbox.getModuleIcon$.subscribe(data => {
            if (isNullOrUndefined(data) || data.status) {
                return;
            }
            this.moduleIconDisable = data.find(moduleIcon => moduleIcon.iconID === 1302 || moduleIcon.iconID === 1303);
            this.changeDisabled(this.customizeBtn.reduce((result, { visible, name }) => [...result, ...visible ? [name] : []], []), !isNullOrUndefined(this.moduleIconDisable));
        }));

        this.subscription.add(this.speziaikontoSandbox.abschliessenUndoFails$.subscribe(data => {
            this.checkErrorAbschliessen = false;
            this.onSaveKontakDataFail(data);
        }
        ));

        this.subscription.add(this.speziaikontoSandbox.abschliessenUndo$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                this.isAddEdit = true;
                this.dataAddEdit = data;
                this.popUpModel.isVisible = false;
                this.hideMessageRemaining();
                this.loadDataGridTop();
            }
        })
        );

        this.subscription.add(this.speziaikontoSandbox.getKontoWirdNichtAusgeglichen$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                this.speziaikonto.closePopup();
                this.loadDataGridTop();
            }

        })
        );

        this.subscription.add(this.speziaikontoSandbox.getKontoWirdNichtAusgeglichenFalis$.subscribe(data => {
            this.checkErrorAbschliessen = false;
            this.onSaveKontakDataFail(data);
        })
        );

        this.subscription.add(this.speziaikontoSandbox.getabschliessenEditbar$.subscribe(data => {
            if (isNullOrUndefined(data)) {
                return;
            }
            this.isLoadEditBar = data.abschliessenMitBetragEditierbar;
        })
        );

        this.subscription.add(this.speziaikontoSandbox.getUebergabeAnInkasso$.subscribe(data => {
            if (!isNullOrUndefined(data)) {

                this.speziaikonto.closePopup();
                this.loadDataGridTop();
            }
        }));

        this.subscription.add(this.speziaikontoSandbox.getUebergabeAnInkassoFails$.subscribe(data => {
            this.checkErrorAbschliessen = false;
            this.onSaveKontakDataFail(data);
        })
        );

        this.subscription.add(this.speziaikontoSandbox.updateKuzungen$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                this.isAddEdit = true;
                this.dataAddEdit = this.detailSelected;
                this.dataAddEdit.bgSpezkontoId = this.detailSelected.BgSpezkontoID;
                if (data.hasOwnProperty('status') && data.status === AppEnums.StatusCode.CONCURRENCY) {
                    this.visibleConcurrencyPopup = true;
                    return;
                }
                if (data.status && (data.status === AppEnums.StatusCode.UNPROCESSABLE_ENTITY || data.status === AppEnums.StatusCode.INTERNAL_SERVER_ERROR)) {
                    const message = JSON.parse(data._body).message;
                    this.showPopup(message, this.translateService.instant('CtlSpeziaikonto.Information'), null, null, false, false, null, null);
                    return;
                }
                if (data.status && data.status === AppEnums.StatusCode.BAD_REQUEST) {
                    const arrData = JSON.parse(data._body);
                    if (isArray(arrData)) {
                        const message = (arrData[0]).message;
                        this.showRemainMessage(message);
                        return;
                    }
                    const mess = JSON.parse(data._body).message;
                    this.showRemainMessage(mess);
                    return;
                }
                if (data.status && data.status === AppEnums.StatusCode.NOT_FOUND) {
                    this.speziaikonto.disableButtons(true);
                    this.showRemainMessage(this.translateService.instant('CtlSpeziaikonto.MessageConcurency404Update'));
                    return;
                }
                this.isAddEdit = true;
                this.dataAddEdit = data;
                this.onDisableViewModel(true);
                this.loadDataGridTop();
                this.refreshData();
            }
        }));

        this.subscription.add(this.speziaikontoSandbox.createKuzungen$.subscribe(data => {
            if (!isNullOrUndefined(data)) {
                if (data.status) {
                    this.kissSpeziaikontoGrid.disableList(false);
                    if (data.status === AppEnums.StatusCode.UNPROCESSABLE_ENTITY) {
                        const message = JSON.parse(data._body).message;
                        this.showPopup(message, this.translateService.instant('CtlSpeziaikonto.Information'), null, null, false, false, null, null);
                        return;
                    }
                    if (data.status === AppEnums.StatusCode.BAD_REQUEST) {
                        const message = JSON.parse(data._body).message;
                        this.showRemainMessage(message);
                        return;
                    }
                } else {
                    this.isAddEdit = true;
                    this.dataAddEdit = data;
                    this.loadDataGridTop();
                    this.refreshData();
                }
            }
        }));
    }

    ngOnDestroy() {
        this.unregisterEvents();
    }

    unregisterEvents() {
        this.subscription.unsubscribe();
    }

    loadInitData() {
        this.loadDataCombobox();
        this.loadDataGridTop();
        this.loadBaPerson();
        this.loadBgKostenart();
        this.speziaikontoSandbox.loadPositionsarten();
        this.speziaikontoSandbox.loadAbschliessenVisible();
        this.speziaikontoSandbox.maxSanktion();
        this.speziaikontoSandbox.loadAbschliessenEditbar();
    }

    loadDataCombobox() {
        this.speziaikontoSandbox.getMasterDataCombobox();
    }

    // Change input data depend state
    loadDataGridTop() {
        const data = {
            faLeistungID: this.FaLeistung,
            bgSpezkontoTypCode: this.bgSpezkontoTypCode,
            edtAktiv: this.edtAktiv
        };
        this.speziaikontoSandbox.loadDataGrid(data);
    }

    private onDelKontaktFailData(data) {
        if (!isNullOrUndefined(data)) {
            if (data.status && data.status === AppEnums.StatusCode.BAD_REQUEST) {
                const message = JSON.parse(data._body).message;
                this.showRemainMessage(message);
                this.speziaikonto.disableButtons(false);
                return;
            }
            this.speziaikonto.disableButtons(true);
            this.showRemainMessage(this.translateService.instant('CtlSpeziaikonto.MessageConcurency404Delete'));
        }
    }

    private onSaveKontakDataFail(data) {
        if (!isNullOrUndefined(data)) {
            this.speziaikonto.closePopup();
            this.isAddEdit = true;
            this.dataAddEdit = this.detailSelected;
            this.dataAddEdit.bgSpezkontoId = this.detailSelected.BgSpezkontoID;
            if (data.hasOwnProperty('status') && data.status === AppEnums.StatusCode.CONCURRENCY) {
                this.visibleConcurrencyPopup = true;
                return;
            }
            if (data.status && (data.status === AppEnums.StatusCode.UNPROCESSABLE_ENTITY || data.status === AppEnums.StatusCode.INTERNAL_SERVER_ERROR)) {
                const message = JSON.parse(data._body).message;
                this.showPopup(message, this.translateService.instant('CtlSpeziaikonto.Information'), null, null, false, false, null, null);
                return;
            }
            if (data.status && data.status === AppEnums.StatusCode.BAD_REQUEST) {
                const message = JSON.parse(data._body).message;
                this.showRemainMessage(message);
                return;
            }
            if (data.status && data.status === AppEnums.StatusCode.NOT_FOUND) {
                this.speziaikonto.disableButtons(true);
                this.showRemainMessage(this.translateService.instant('CtlSpeziaikonto.MessageConcurency404Update'));
                return;
            }
        }
    }

    loadDataGridDetail(data) {
        this.speziaikontoSandbox.loadDataGridDetail(data);
    }

    loadBaPerson() {
        this.speziaikontoSandbox.loadBaPerson(this.FaLeistung);
    }

    loadBgKostenart() {
        const data = {
            faLeistungID: this.FaLeistung,
            bgSpezkontoTypCode: this.bgSpezkontoTypCode
        };
        this.speziaikontoSandbox.loadBgKostenart(data);
    }

    loadDatumVon() {
        this.speziaikontoSandbox.loadDatumVon(this.FaLeistung);
    }

    onCheckBox(event) {
        this.edtAktiv = event;
    }

    viewModeData() {
        if (this.isLoadSuccess) {
            this.nameMonthVon = (this.detailSelected.DatumVonMonat && this.monat.find(x => x.code === this.detailSelected.DatumVonMonat))
                ? this.monat.find(x => x.code === this.detailSelected.DatumVonMonat).shortText : '';
            this.nameMonthBis = (this.detailSelected.DatumBisMonat && this.monat.find(x => x.code === this.detailSelected.DatumBisMonat))
                ? this.monat.find(x => x.code === this.detailSelected.DatumBisMonat).shortText : '';
            this.nameRueckerstattung = (this.detailSelected.AbzahlungskontoRueckerstattungCode && this.abzahlungskontoRueckerstattung.find(x => x.code === this.detailSelected.AbzahlungskontoRueckerstattungCode))
                ? this.abzahlungskontoRueckerstattung.find(x => x.code === this.detailSelected.AbzahlungskontoRueckerstattungCode).text : '';
            this.namePerson = (this.detailSelected.BaPersonID && this.dataSourceBaPerson.find(x => x.BaPersonID === this.detailSelected.BaPersonID))
                ? this.dataSourceBaPerson.find(x => x.BaPersonID === this.detailSelected.BaPersonID).NameVorname : '';
            this.nameBelastung = (this.detailSelected.BgKostenartID && this.dataSourceBgKostenart.find(x => x.BgKostenartID === this.detailSelected.BgKostenartID)) ?
                this.dataSourceBgKostenart.find(x => x.BgKostenartID === this.detailSelected.BgKostenartID).Name : '';
            this.nameGutschrift = (this.detailSelected.BgPositionsartID && this.dataSourceGutschrift.find(x => x.BgPositionsartID === this.detailSelected.BgPositionsartID))
                ? this.dataSourceGutschrift.find(x => x.BgPositionsartID === this.detailSelected.BgPositionsartID).Text : '';
        }
    }

    // Remove this when intergate with tree
    brandScreen() {
        this.urlParams = this.router.url.split('/')[7];
        switch (this.urlParams) {
            case '30131':
                this.customizeBtn[5].text = 'CtlSpeziaikonto.Button.NeuesVorabzugskonto';
                this.customizeBtn = [...this.customizeBtn];
                this.isState1 = true;
                this.formName = 'CtlSpeziaikonto.TitleVorabzugskonti';
                this.formNameForTitle = 'CtlSpeziaikonto.TitleVorabzugskonti';
                this.edtAktiv = true;
                this.bgSpezkontoTypCode = 2;
                break;
            case '30132':
                this.customizeBtn[5].text = 'CtlSpeziaikonto.Button.NeuesAbzahlungskonto';
                this.customizeBtn = [...this.customizeBtn];
                this.isState2 = true;
                this.formName = 'CtlSpeziaikonto.TitleAbzahlungskonti';
                this.formNameForTitle = 'CtlSpeziaikonto.TitleAbzahlungskonti';
                this.edtAktiv = true;
                this.bgSpezkontoTypCode = 3;
                break;
            case '30133':
                this.customizeBtn[5].text = 'CtlSpeziaikonto.Button.NeuesAusgabekonto';
                this.customizeBtn = [...this.customizeBtn];
                this.isState3 = true;
                this.formName = 'CtlSpeziaikonto.TitleAusgabekonti';
                this.formNameForTitle = 'CtlSpeziaikonto.TitleAusgabekonti';
                this.edtAktiv = true;
                this.bgSpezkontoTypCode = 1;
                break;
            case '30134':
                this.customizeBtn[5].text = 'CtlSpeziaikonto.Button.NeueKurzung';
                this.customizeBtn = [...this.customizeBtn];
                this.isState4 = true;
                this.formName = 'CtlSpeziaikonto.TitleKurzungen';
                this.formNameForTitle = 'CtlSpeziaikonto.TitleKurzungen';
                this.edtAktiv = false;
                this.bgSpezkontoTypCode = 4;
                break;
            default:
                window.location.href = '/exception/404';
                break;
        }
    }

    onDisableViewModel(isEditMode: boolean) {
        this.kissSpeziaikontoGrid.disableList(isEditMode);
        this.listBtn = isEditMode ? [CommonConstant.ToolbarButtons, getConditionListBtn(CommonConstant.AdditionalButtons, [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])] : [];
        isEditMode ? this.checkPencilTree(false) : this.checkPencilTree(true);
    }

    @HostListener('document: keydown', ['$event'])
    hotkeys(event) {
        if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS) {
            event.preventDefault();
            outFocus();
            if (this.isEditMode) {
                setTimeout(() => {
                    this.speziaikonto.doSave();
                }, CommonConstant.SetTimeOut300);
                return;
            }
        }
        if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ) {
            event.preventDefault();
            outFocus();
            if (this.isEditMode) {
                setTimeout(() => {
                    this.speziaikonto.doCancel();
                }, CommonConstant.SetTimeOut300);
                return;
            }
        }
        if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyM) {
            event.preventDefault();
            if (this.isEditMode) {
                outFocus();
            }
            setTimeout(() => {
                this.speziaikonto.doDelete();
            }, CommonConstant.SetTimeOut300);
            return;
        }
        if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyI) {
            event.preventDefault();
            if (!this.isEditMode && isNullOrUndefined(this.moduleIconDisable)) {
                this.loadDatumVon();
                return;
            }
        }
        if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyB) {
            event.preventDefault();
            return;
        }
    }

    displayDetailWhenGridEmpty(isEmpty: boolean) {
        if (isEmpty) {
            this.rowSelectChange([]);
            this.changeDisabled([SpeziaikontoConstant.BEARBEITEN, SpeziaikontoConstant.LOSCHEN], isEmpty);
            this.customizeBtn.forEach(btn => {
                if (btn.name === SpeziaikontoConstant.AUFHEBEN || btn.name === SpeziaikontoConstant.FREIGEBEN || btn.name === SpeziaikontoConstant.VORBEREITUNG || btn.name === SpeziaikontoConstant.ABSCHLIESSEN) {
                    this.changeDisabled([btn.name], isEmpty);
                }
            });
        } else {
            if (!this.isEditMode && isNullOrUndefined(this.moduleIconDisable)) {
                this.changeDisabled([SpeziaikontoConstant.BEARBEITEN, SpeziaikontoConstant.LOSCHEN], isEmpty);
                this.customizeBtn.forEach(btn => {
                    if (btn.name === SpeziaikontoConstant.AUFHEBEN || btn.name === SpeziaikontoConstant.FREIGEBEN || btn.name === SpeziaikontoConstant.VORBEREITUNG || btn.name === SpeziaikontoConstant.ABSCHLIESSEN) {
                        this.changeDisabled([btn.name], isEmpty);
                    }
                });
            }
        }

    }

    toolBarOnItemClick(event: string) {
        this.kissSpeziaikontoGrid.toolBarOnItemClick(event);
        if (event === CommonConstant.EventDoubleClickTitle) {
            this.copyElement(this.titleText);
        }
        if (event === CommonConstant.EventShiftDoubleClickTitle) {
            this.copyElement(this.baPersonId);
        }
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
                funcHidden: null
            }
        );
    }

    onSelectedRow($event) {
        this.detailSelected = $event;
    }

    showPopup(mess, title?: string, textYes?: string, textNo?: string, isVisibleNo?: boolean, isVisibleYes?: boolean, funcYes?: any, funcNo?: any, funcHidden?: any) {
        this.popUpModel.title = title;
        this.popUpModel.isVisibleNo = isVisibleNo;
        this.popUpModel.isVisibleYes = isVisibleYes;
        this.popUpModel.message = mess;
        this.popUpModel.isVisible = true;
        this.popUpModel.textYes = textYes;
        this.popUpModel.textNo = textNo;
        this.popUpModel.funcYes = funcYes;
        this.popUpModel.funcNo = funcNo;
        this.popUpModel.funcHidden = funcHidden;
    }

    checkEditMode(event) {
        if (event.length > 3) {
            this.isEditMode = false;
            this.customizeBtn[5].visible = event[5].visible;
            this.customizeBtn[6].visible = event[6].visible;
            this.customizeBtn[7].visible = event[7].visible;
            this.customizeBtn[8].visible = event[8].visible;
            this.customizeBtn = [...this.customizeBtn];
        } else {
            this.isEditMode = true;
        }
    }

    onChangeData(event) {
        this.isChangeData = event;
    }

    copyElement(copyElement: string) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = copyElement;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

    rowSelectChange(rowSelected: any) {
        if (isNullOrUndefined(rowSelected) || isNullOrUndefined(rowSelected.BgSpezkontoID)) {
            this.dataSourceDetailGrid = [];
            this.detailSelected = {};
            this.nameBelastung = '';
            this.namePerson = '';
            this.nameMonthVon = '';
            this.nameMonthBis = '';
            this.nameGutschrift = '';
            return;
        }
        this.detailSelected = rowSelected;
        this.seletedRowKeys = rowSelected;
        const data = {
            bgSpezkontoID: this.seletedRowKeys.BgSpezkontoID,
            bgSpezkontoTypCode: this.bgSpezkontoTypCode
        };
        this.loadDataGridDetail(data);
    }

    ischangedetailSelected(detailSelected) {
        this.detailSelected = detailSelected;
        if (!isNullOrUndefined(this.detailSelected)) {
            this.viewModeData();
            const data = {
                bgSpezkontoID: this.detailSelected.BgSpezkontoID,
                bgSpezkontoTypCode: this.bgSpezkontoTypCode
            };
            this.loadDataGridDetail(data);
        }
    }

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        outFocus();
        if (this.isChangeData) {
            return false;
        }
    }

    canDeactivate() {
        if (!this.isChangeData) {
            this.detailSelected = undefined;
        }
        return this.deactivatePopup.canDeactivate(this.isChangeData, () => {
            this.detailSelected = undefined;
            this.checkPencilTree(false);
        });
    }

    checkPencilTree(isShow: boolean) {
        this.sozialhilfeTreeSandbox.updateNodesStatus(
            {
                id: this.router.url,
                isEditMode: isShow,
            }
        );
    }

    onAddNewForm(event) {
        this.isAddNew = event;
    }

    onMessageRemaining(event) {
        this.showRemainMessage(event);
    }

    hideMessageRemaining() {
        this.remainMessage.hideMessage();
    }
    refreshData() {
        this.speziaikonto.customizeBtnViewMode();
        this.onCloseError();
    }

    showRemainMessage(remainMsg) {
        this.remainMessage.showMessage(remainMsg);
    }

    onConcurrencyYes() {
        this.visibleConcurrencyPopup = false;
        this.onCloseError();
        this.speziaikonto.closePopup();
        this.speziaikonto.disableButtons(false);
        this.loadDataGridTop();
    }

    onConcurrencyNo() {
        this.visibleConcurrencyPopup = false;
        this.speziaikonto.closePopup();
        this.speziaikonto.disableButtons(true);
    }

    onCloseError() {
        this.remainMessage.hideMessage();
    }

    checkIsReadRole() {
        const isUserHasRight = getRoleSessionStorage('CtlWhSpezialkonto_AbschliessenRueckgaengig');
        this.isCheckUserRole = !isNullOrUndefined(isUserHasRight) && !isNullOrUndefined(isUserHasRight.IsRead);
    }

    setEditMode() {
        this.queryVorhanden = this.dataFreigegeben.length > 0;
        if (!isNullOrUndefined(this.detailSelected)) {
            this.queryBeglichen = this.queryVorhanden && this.detailSelected.Saldo === 0;
        }
        this.isVisiblePanasch = this.detailSelected.Saldo === 0 && isNullOrUndefined(this.detailSelected['AbschlussgrundCode']);
    }

    initForm(isVisible: boolean) {
        const isVisibleButton = this.detailSelected.Saldo === 0 && isNullOrUndefined(this.detailSelected['AbschlussgrundCode']);
        const inaktiv = this.detailSelected['Inaktiv'];
        const queryVorhanden = !isNullOrUndefined(this.dataSourceDetailGrid.find(function (element) {
            return (element.Freigegeben === true || element.Gesperrt === true);
        }));
        if (this.urlParams === '30132') {
            this.changeVisible(this.btnDisabledNamesState4, false);
            if (isVisible) {
                this.changeVisible(this.btnDisabledNamesState4, false);
                if (!isVisibleButton) {
                    if (isNullOrUndefined(this.detailSelected['AbschlussgrundCode'])) {
                        this.changeVisible([SpeziaikontoConstant.ABSCHLIESSEN], true);
                        this.changeVisible([SpeziaikontoConstant.ABSCHLIESSENRUCKGANGIG], false);
                        this.changeDisabled([SpeziaikontoConstant.BEARBEITEN], false);
                        if (!isNullOrUndefined(this.moduleIconDisable)) {
                            this.changeDisabled([SpeziaikontoConstant.ABSCHLIESSEN], false);
                        }
                    } else {
                        this.changeVisible([SpeziaikontoConstant.ABSCHLIESSEN], false);
                        this.changeDisabled([SpeziaikontoConstant.BEARBEITEN], true);
                        this.changeVisible([SpeziaikontoConstant.ABSCHLIESSENRUCKGANGIG], this.isCheckUserRole);
                    }
                } else {
                    this.changeVisible(this.btnDisabledNamesState2, false);
                    this.changeDisabled([SpeziaikontoConstant.BEARBEITEN], false);
                }
            } else {
                this.changeVisible(this.btnDisabledNamesState2, false);
                this.changeDisabled([SpeziaikontoConstant.BEARBEITEN], !(queryVorhanden && this.detailSelected.Saldo === 0));
            }
            return;
        }
        if (this.urlParams === '30134' && isNullOrUndefined(this.moduleIconDisable)) {
            this.changeVisible(this.btnDisabledNamesState2, false);
            this.changeDisabled([SpeziaikontoConstant.BEARBEITEN, SpeziaikontoConstant.LOSCHEN], false);
            if (inaktiv) {
                if (queryVorhanden) {
                    this.changeVisible(this.btnDisabledNamesState4, false);
                    return;
                }
                this.changeVisible([SpeziaikontoConstant.AUFHEBEN, SpeziaikontoConstant.VORBEREITUNG], false);
                this.changeVisible([SpeziaikontoConstant.FREIGEBEN], true);

            } else {
                if (queryVorhanden) {
                    this.changeVisible([SpeziaikontoConstant.VORBEREITUNG, SpeziaikontoConstant.FREIGEBEN], false);
                    this.changeVisible([SpeziaikontoConstant.AUFHEBEN], true);

                    return;
                }
                this.changeVisible([SpeziaikontoConstant.FREIGEBEN, SpeziaikontoConstant.AUFHEBEN], false);
                this.changeVisible([SpeziaikontoConstant.VORBEREITUNG], true);
            }
            return;
        }
        this.hideButton();
    }
    //#endregion
    changeVisible(btnNames, status) {
        this.customizeBtn = this.customizeBtn.map(btn => {
            if (btnNames.includes(btn.name)) {
                btn.visible = status;
            }
            return btn;
        });
    }
    changeDisabled(btnNames, status) {
        this.customizeBtn = this.customizeBtn.map(btn => {
            if (btnNames.includes(btn.name)) {
                btn.disabled = status;
            }
            return btn;
        });
    }

    displayButtonWithGrid() {
        this.kissSpeziaikontoGrid.displayButtonWithGrid();
    }

    hideButton() {
        this.changeVisible(this.btnDisabledNamesState2, false);
        this.changeVisible(this.btnDisabledNamesState4, false);
    }
    //#endregion
}
