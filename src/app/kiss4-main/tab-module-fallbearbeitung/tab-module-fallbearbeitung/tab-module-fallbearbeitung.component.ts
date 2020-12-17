import { Component, HostListener, Injector, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationCancel, Router } from '@angular/router';
import { AppEnums } from '@shared/AppEnum';
import { FallfuhrungTreeConstant } from '@shared/common/fallfuhrung-tree.common';
import { BaseComponent } from '@shared/components/base.component';
import {
    getLanguageCodeNumberFromLocalStorage,
    getUserIdFromLocalStorage,
    getUserRightSessionStorage,
} from '@shared/utilites';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';

import { ModuleIcon } from '../models/module-icon.model';
import { TabModuleFallbearbeitungSandbox } from '../tab-module-fallbearbeitung.sandbox';

@Component({
    selector: 'kiss-tab-module-fallbearbeitung',
    templateUrl: './tab-module-fallbearbeitung.component.html',
    styleUrls: ['./tab-module-fallbearbeitung.component.scss']
})
export class TabModuleFallbearbeitungComponent extends BaseComponent implements OnInit, OnDestroy {
    module_icon_folder_path: any = 'assets/icon/characters-and-numbers/png/';
    subscriptions: Subscription[] = [];
    baPersonID: any;
    faFallID: any;
    moduleIcon: ModuleIcon;
    isVisibleZeitachse = false;
    isDisabledZeitachse = true;
    selectedShortName = FallfuhrungTreeConstant.codeB;
    changeshortName = FallfuhrungTreeConstant.codeB;
    isFallfuhrungTree = true;
    FallfuhrungTreeConstant = FallfuhrungTreeConstant;

    constructor(
        injector: Injector,
        private tabModuleFallbearbeitungSandbox: TabModuleFallbearbeitungSandbox,
        private router: Router
    ) {
        super(injector);
    }

    ngOnInit() {
        this.registerEvents();
        this.initData();
    }

    ngOnDestroy() {
        this.unregisterEvents();
    }

    registerEvents() {
        this.subscriptions.push(
            this.tabModuleFallbearbeitungSandbox.getModuleIcon$.subscribe(data => {
                if (isNullOrUndefined(data) || data.status) {
                    return;
                }
                this.moduleIcon = data;
            })
        );

        this.subscriptions.push(
            this.tabModuleFallbearbeitungSandbox.getZeitachseVisible$.subscribe(data => {
                if (isNullOrUndefined(data) || data.status) {
                    return;
                }
                this.isVisibleZeitachse = data;
            })
        );

        this.subscriptions.push(
            this.router.events.subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    this.onUrlChanged(event.url);
                }
            })
        );
    }

    unregisterEvents() {
        this.subscriptions.forEach(i => i.unsubscribe());
    }

    initData() {
        const urlParameters = this.router.url.split('/');
        this.loadModuleIcon(urlParameters);
        this.loadZeitachseBtn();
        this.loadModulTree(urlParameters);
        this.loadPersonInfoTitel();
    }

    loadModuleIcon(urlParameters) {
        this.baPersonID = urlParameters[5];
        this.tabModuleFallbearbeitungSandbox.getModuleIcon(this.baPersonID ? this.baPersonID : '', this.faFallID ? this.faFallID : '');
    }

    loadZeitachseBtn() {
        this.tabModuleFallbearbeitungSandbox.getZeitachseVisible();
        const userRight = getUserRightSessionStorage();
        const rightName = userRight ? userRight.RightName : '';
        this.isDisabledZeitachse = rightName === 'FrmFaZeitachse';
    }

    loadModulTree(urlParameters) {
        this.selectedShortName = urlParameters[3];
    }

    loadPersonInfoTitel() {
        this.tabModuleFallbearbeitungSandbox.getPersonInfoTitel(this.baPersonID, +getUserIdFromLocalStorage(), +getLanguageCodeNumberFromLocalStorage());
    }

    // short cut ALT + key
    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.altKey) {
            switch (event.keyCode) {
                case AppEnums.KeyCode.KeyB:
                    event.preventDefault();
                    this.onSelectedTabChanged(FallfuhrungTreeConstant.codeB);
                    break;
                case AppEnums.KeyCode.KeyF:
                    event.preventDefault();
                    this.onSelectedTabChanged(FallfuhrungTreeConstant.codeF);
                    break;
                case AppEnums.KeyCode.KeyS:
                    event.preventDefault();
                    this.onSelectedTabChanged(FallfuhrungTreeConstant.codeS);
                    break;
                case AppEnums.KeyCode.KeyI:
                    event.preventDefault();
                    this.onSelectedTabChanged(FallfuhrungTreeConstant.codeI);
                    break;
                case AppEnums.KeyCode.KeyV:
                    event.preventDefault();
                    this.onSelectedTabChanged(FallfuhrungTreeConstant.codeM);
                    break;
                case AppEnums.KeyCode.KeyA:
                    event.preventDefault();
                    this.onSelectedTabChanged(FallfuhrungTreeConstant.codeA);
                    break;
                case AppEnums.KeyCode.KeyK:
                    event.preventDefault();
                    this.onSelectedTabChanged(FallfuhrungTreeConstant.codeK);
                    break;
                default:
                    break;
            }
        }
    }

    onSelectedTabChanged(shortName) {
        this.changeshortName = shortName;
        const moduleName = this.getModuleName(shortName);
        // TODO
        // save tree
        // check baPersonID-moduleName exist in sticky
        this.router.navigateByUrl(`${FallfuhrungTreeConstant.mainUrl}${shortName}/${moduleName}/${this.baPersonID}`);
    }

    getModuleName(shortName) {
        switch (shortName) {
            case FallfuhrungTreeConstant.codeB:
                return FallfuhrungTreeConstant.Basis;
            case FallfuhrungTreeConstant.codeF:
                return FallfuhrungTreeConstant.Fallfuhrung;
            case FallfuhrungTreeConstant.codeS:
                return FallfuhrungTreeConstant.Sozialhilfe;
            case FallfuhrungTreeConstant.codeI:
                return FallfuhrungTreeConstant.Inkasso;
            case FallfuhrungTreeConstant.codeM:
                return FallfuhrungTreeConstant.Kindes;
            case FallfuhrungTreeConstant.codeA:
                return FallfuhrungTreeConstant.Asyl;
            case FallfuhrungTreeConstant.codeK:
                return FallfuhrungTreeConstant.Arbeit;
            default:
                return FallfuhrungTreeConstant.Basis;
        }
    }

    onUrlChanged(url) {
        const urlParameters = url.split('/');
        this.selectedShortName = this.changeshortName;
        if (this.selectedShortName !== urlParameters[3] || this.baPersonID !== urlParameters[5]) {
            this.zoomOutSelectedIcon(this.selectedShortName);
            this.loadModuleIcon(urlParameters);
            this.loadModulTree(urlParameters);
            this.loadPersonInfoTitel();
        }
    }

    zoomOutSelectedIcon(shortName: string): void {
        const oldActivedIcon = document.querySelectorAll('.img-active');
        [].forEach.call(oldActivedIcon, function (el) {
            el.classList.remove('img-active');
        });
        const selectedIcon = document.querySelectorAll('#' + shortName);
        [].forEach.call(selectedIcon, function (el) {
            el.classList.add('img-active');
        });
    }
}
