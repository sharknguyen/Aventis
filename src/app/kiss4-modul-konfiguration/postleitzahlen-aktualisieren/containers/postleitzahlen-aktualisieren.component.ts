import { AfterViewInit, Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PostleitzahlenAktualisieren } from '@app/kiss4-modul-konfiguration/postleitzahlen-aktualisieren/models';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { PopupConfirmComponent } from '@shared/components/popup-confirm/popup-confirm.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { ProgressbarComponent } from '@shared/components/progress-bar/progressbar.component';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { getConditionListBtn } from '@shared/utilites';
import { UtilService } from '@shared/utilites/utility.service';
import { DxFileUploaderComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';

import {
    PostleitzahlenAktualisierenDetailComponent,
} from '../components/postleitzahlen-aktualisieren-detail/postleitzahlen-aktualisieren-detail.component';
import {
    PostleitzahlenAktualisierenGridComponent,
} from '../components/postleitzahlen-aktualisieren-grid/postleitzahlen-aktualisieren-grid.component';
import {
    PostleitzahlenAktualisierenUploadComponent,
} from '../components/postleitzahlen-aktualisieren-upload/postleitzahlen-aktualisieren-upload.component';
import { PostleitzahlenAktualisierenSandbox } from '../postleitzahlen-aktualisieren.sandbox';

@Component({
    selector: 'kiss-postleitzahlen-aktualisieren',
    templateUrl: './postleitzahlen-aktualisieren.component.html',
    styleUrls: ['./postleitzahlen-aktualisieren.component.scss']
})
@SetClassRight('CtlPostleitzahlenAktualisieren')
export class PostleitzahlenAktualisierenComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {

    @ViewChild('printer') printer: PrinterComponent;
    @ViewChild('uploader') uploader: DxFileUploaderComponent;
    @ViewChild('popupModel') popupModel: PopupConfirmComponent;
    @ViewChild('postleitzahlenProgressBar') postleitzahlenProgressBar: ProgressbarComponent;
    @ViewChild('postleitzahlenGrid') postleitzahlenGrid: PostleitzahlenAktualisierenGridComponent;
    @ViewChild('postleitzahlenUpload') postleitzahlenUpload: PostleitzahlenAktualisierenUploadComponent;
    @ViewChild('postleitzahlenDetail') postleitzahlenDetail: PostleitzahlenAktualisierenDetailComponent;
    @ViewChild('remainingMessage') remainingMessage: RemainingMessageComponent;

    dsPostleitzahlens: PostleitzahlenAktualisieren[];
    userID: string;
    firstName: string;
    lastName: string;
    isNavbar: boolean;
    logonName: string;
    isReadOnly = true;
    listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
    customizeBtn = [
        {
            text: 'PostleitzahlenAktualisieren.PlzDatenJetztAktualisieren',
            name: CommonConstant.ButtonPlzDatenJetztAktualisieren,
            icon: 'fa fa-refresh',
            id: 'c005-postleitzahlen-aktualisieren',
            class: 'toolbar-button'
        }
    ];
    private errorCodes = [AppEnums.StatusCode.BAD_REQUEST, AppEnums.StatusCode.CONCURRENCY, AppEnums.StatusCode.LIMIT_FILE_SIZE, AppEnums.StatusCode.XML_FORMAT, AppEnums.StatusCode.DOWNLOAD_FILE];

    private subscriptions = new Subscription();

    constructor(injector: Injector, public postleitzahlenAktualisierenSandbox: PostleitzahlenAktualisierenSandbox, public utilService: UtilService,
        public translateService: TranslateService, private moduleConfigSandbox: ModuleConfigSandbox, public layoutSandbox: LayoutSandbox) {
        super(injector);
    }

    // #region component life cycle functions
    ngOnInit() {
        this.registerEvents();
        this.postleitzahlenProgressBar.showProgressBar();
        this.popupModel.initPopUpModel();
        this.postleitzahlenAktualisierenSandbox.getPostleitzahlenAktualisieren();
    }

    ngAfterViewInit() {
        this.postleitzahlenGrid.getFilterColumns();
    }

    ngOnDestroy() {
        this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
        this.moduleConfigSandbox.updateDirtyFormStatus(false);
        this.postleitzahlenAktualisierenSandbox.reset();
        this.unregisterEvents();
    }
    // #endregion

    // #region component CRUD functions
    toolBarOnItemClickTopGrd(e) {
        switch (e) {
            case CommonConstant.ButtonExportExcel: {
                this.postleitzahlenGrid.exportExcel();
                break;
            }
            case CommonConstant.ButtonPrintPdf: {
                // TODO: Print function
                break;
            }
            case CommonConstant.ButtonColumnChooser: {
                this.postleitzahlenGrid.showColumnChooser();
                break;
            }
            case CommonConstant.ButtonPlzDatenJetztAktualisieren: {
                this.popupModel.hidePopupModel();
                this.remainingMessage.hideMessage();
                this.postleitzahlenProgressBar.showProgressBar();
                this.postleitzahlenAktualisierenSandbox.syncData();
                break;
            }
            default:
                break;
        }
        this.postleitzahlenGrid.updateGridSetting(e);
    }

    onSelectData(data: PostleitzahlenAktualisieren) {
        if (data) {
            this.postleitzahlenDetail.setDataPostleitzahlenAktualisieren(data);
        }
    }

    onHiding() {
        const container = document.getElementById('fileuploader-container');
        if (!isNullOrUndefined(container)) {
            const element: HTMLElement = container.querySelector('.dx-fileuploader-button') as HTMLElement;
            element.click();
        }
    }

    onUploadSuccess(isUploadSuccess: boolean) {
        if (isUploadSuccess) {
            this.postleitzahlenAktualisierenSandbox.getPostleitzahlenAktualisieren();
        }
    }

    onShowProgressBar(isShowProgressBar: boolean) {
        if (isShowProgressBar) {
            this.postleitzahlenProgressBar.showProgressBar();
        } else {
            this.postleitzahlenProgressBar.hideProgressBar();
        }
    }
    // #endregion

    // #region common functions
    @HostListener('window:keydown', ['$event'])
    public keyEvent(event: KeyboardEvent) {
        if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyB) {
            // TODO: print PDF
        }
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
        this.subscriptions.add(this.postleitzahlenAktualisierenSandbox.PostleitzahlenAktualisierensData$.subscribe(dataExport => {
            if (!isNullOrUndefined(dataExport)) {
                if (dataExport.length > 0) {
                    this.dsPostleitzahlens = dataExport;
                    this.postleitzahlenGrid.setSelectedKeys(dataExport[0]);
                    this.postleitzahlenDetail.setDataPostleitzahlenAktualisieren(dataExport[0]);
                    setTimeout(() => this.postleitzahlenProgressBar.hideProgressBar(), CommonConstant.SetTimeOut1000);
                } else {
                    this.postleitzahlenProgressBar.hideProgressBar();
                }
            }
        }));

        this.subscriptions.add(this.postleitzahlenAktualisierenSandbox.PostleitzahlenAktualisierensSyncData$.subscribe(response => {
            if (!isNullOrUndefined(response)) {
                if (this.errorCodes.includes(response.status)) {
                    this.postleitzahlenProgressBar.hideProgressBar();
                    this.popupModel.showPopupModel(this.translateService.instant('PostleitzahlenAktualisieren.Message.Information'), JSON.parse(response._body).message, () => { this.onHiding(); });
                } else {
                    this.postleitzahlenProgressBar.showProgressBar();
                    this.postleitzahlenAktualisierenSandbox.getPostleitzahlenAktualisieren();
                }
            }
        }));

        // TODO: Subscribe import data function
    }

    unregisterEvents() {
        this.subscriptions.unsubscribe();
    }
    // #endregion

}
