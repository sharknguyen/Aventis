import { AfterViewInit, Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Baland } from '@app/kiss4-modul-konfiguration/baland/models';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { ProgressbarComponent } from '@shared/components/progress-bar/progressbar.component';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { UtilService } from '@shared/utilites/utility.service';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

import { BalandSandbox } from '../baland.sandbox';
import { BalandDetailComponent } from '../components/baland-detail/baland-detail.component';
import { BalandGridComponent } from '../components/baland-grid/baland-grid.component';

@Component({
    selector: 'kiss-baland',
    templateUrl: './baland.component.html',
    styleUrls: ['./baland.component.scss']
})
@SetClassRight('CtlBaland')
export class BalandComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {

    @ViewChild('expand') expand: any;
    @ViewChild('printer') printer: PrinterComponent;
    @ViewChild('balandProgressBar') balandProgressBar: ProgressbarComponent;
    @ViewChild('balandGrid') balandGrid: BalandGridComponent;
    @ViewChild('balandDetail') balandDetail: BalandDetailComponent;
    @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;

    btnAsyn = 'btnAsyn';
    listBtn = [CommonConstant.ToolbarButtons, UtilityHelper.getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
    customizeBtn = [
        {
            text: this.translateService.instant('Baland.GemeindeDatenJetztAktualisieren'),
            name: this.btnAsyn,
            id: 'c004_lander-aktualisieren_lander-jetzt-aktualisieren',
            icon: 'fa fa-refresh'
        }
    ];
    pageTitle: string;
    labelError: string;
    dsBalands: Baland[];
    dataBalandDetail = new Baland();
    userID: string;
    firstName: string;
    lastName: string;
    isNavbar: boolean;
    logonName: string;
    isReadOnly = true;
    private errorCodes = [AppEnums.StatusCode.BAD_REQUEST, AppEnums.StatusCode.LIMIT_FILE_SIZE, AppEnums.StatusCode.XML_FORMAT, AppEnums.StatusCode.DOWNLOAD_FILE, AppEnums.StatusCode.INTERNAL_SERVER_ERROR, AppEnums.StatusCode.PRECONDITION_REQUIRED];

    private subscriptions = new Subscription();

    constructor(injector: Injector, public balandsSandbox: BalandSandbox, public utilService: UtilService,
        public translateService: TranslateService, private moduleConfigSandbox: ModuleConfigSandbox, public layoutSandbox: LayoutSandbox) {
        super(injector);
    }

    // #region component life cycle functions
    ngOnInit() {
        this.pageTitle = this.translateService.instant('Baland.Title');
        this.registerEvents();
        this.balandProgressBar.showProgressBar();
        this.initFunction();
        this.getLocalStorage();
    }

    ngAfterViewInit() {
        this.balandGrid.getFilterColumns();
    }

    ngOnDestroy() {
        this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
        this.moduleConfigSandbox.updateDirtyFormStatus(false);
        this.balandsSandbox.reset();
        this.unregisterEvents();
    }
    // #endregion

    // #region component CRUD functions
    toolBarOnItemClickTopGrd(event) {
        switch (event) {
            case CommonConstant.ButtonExportExcel: {
                this.balandGrid.exportExcel();
                break;
            }
            case CommonConstant.ButtonPrintPdf: {
                // TODO: Print function
                break;
            }
            case CommonConstant.ButtonColumnChooser: {
                this.balandGrid.showColumnChooser();
                break;
            }
            case this.btnAsyn: {
                this.remainingMessage.hideMessage();
                this.balandProgressBar.showProgressBar();
                this.balandsSandbox.syncData();
                break;
            }
            default:
                break;
        }
        this.balandGrid.updateGridSetting(event);
        UtilityHelper.outFocus();
    }

    onSelectData(data: Baland) {
        if (data) {
            this.balandDetail.setDataBaland(data);
        }
    }
    // #endregion

    // #region common functions
    getLocalStorage() {
        this.userID = UtilityHelper.getUserIdFromLocalStorage();
        this.firstName = UtilityHelper.getUserFirstNameFromLocalStorage();
        this.lastName = UtilityHelper.getUserLastNameFromLocalStorage();
        this.isNavbar = JSON.parse(UtilityHelper.getToogleNavbarFromLocalStorage());
        this.logonName = UtilityHelper.getUserFromLocalStorage();
    }

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        return this.isReadOnly;
    }

    canDeactivate() {
        this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
        return true;
    }
    // #endregion

    // #region utility functions
    private registerEvents(): void {
        this.subscriptions.add(this.balandsSandbox.BalandData$.subscribe(dataExport => {
            if (!isNullOrUndefined(dataExport)) {
                if (dataExport.length > 0) {
                    this.dsBalands = dataExport;
                    this.balandGrid.setSelectedKeys(dataExport[0]);
                    this.balandDetail.setDataBaland(dataExport[0]);
                    setTimeout(() => this.balandProgressBar.hideProgressBar(), CommonConstant.SetTimeOut1000);
                } else {
                    this.balandProgressBar.hideProgressBar();
                }
            }
        }));

        this.subscriptions.add(this.balandsSandbox.BalandSyncData$.subscribe(response => {
            if (!isNullOrUndefined(response)) {
                if (response.status) {
                    if (this.errorCodes.includes(response.status)) {
                        this.balandProgressBar.hideProgressBar();
                        this.remainingMessage.showMessage(JSON.parse(response._body).message);
                    }
                } else if (!response.isSuccess) {
                    this.balandProgressBar.hideProgressBar();
                    this.remainingMessage.showMessage(this.translateService.instant('Baland.BadGatewayMessage'));
                } else {
                    this.balandProgressBar.showProgressBar();
                    this.balandsSandbox.getBaland();
                }
            }
        }));
    }

    unregisterEvents() {
        this.subscriptions.unsubscribe();
    }

    private initFunction() {
        this.balandsSandbox.getBaland();
    }
    // #endregion

}
