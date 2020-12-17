import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy, ViewChild, HostListener, AfterViewInit, ElementRef } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { DxToolbarComponent } from 'devextreme-angular';
import { CommonConstant } from '@shared/common/constant.common';
import { AppEnums } from '@shared/AppEnum';
import { isFunction } from 'lodash-es';

@Component({
    selector: 'kiss-card-title',
    templateUrl: './card-title.component.html',
    styleUrls: ['./card-title.component.scss']
})
export class CardTitleComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

    @Output() onCustomizeBtnFn = new EventEmitter<any>();
    @Input() titleHeader: string;
    @Input() isCard: Boolean;
    @Input() toolChild: boolean;
    @Input() customizeBtn: any;
    @Input() listBtn: any;
    @Input() closeBtn: any;

    @ViewChild('treeToolbar') treeToolbar: DxToolbarComponent;
    @ViewChild('toolBarContainer') toolBarContainer: ElementRef;
    @ViewChild('titleHeaderTag') titleHeaderTag: ElementRef;

    isHoldShift: Boolean = false;
    optionsHeader = {
        click: () => {
            if (this.isClicking) {
                clearTimeout(this.isClicking);
                this.isHoldShift ? this.onCustomizeBtnFn.emit(CommonConstant.EventShiftDoubleClickTitle) : this.onCustomizeBtnFn.emit(CommonConstant.EventDoubleClickTitle);
                this.isClicking = null;
                return;
            }
            this.isClicking = setTimeout(() => {
                this.onCustomizeBtnFn.emit(CommonConstant.EventClickTitle);
                this.isClicking = null;
            }, this.defineTimeDblClick);
        }
    };
    items = [];
    listContextMenu = [];
    classBtnLink = 'dx-widget dx-button-has-text kiss-btn-link cursor-pointer';
    isClicking: any;
    defineTimeDblClick = 500;

    private subscriptions: Array<Subscription> = [];

    constructor(
        public translateService: TranslateService,
        private el: ElementRef
    ) { }

    @HostListener('document:keydown', ['$event'])
    onKeyDown(event) {
        if (event.keyCode === AppEnums.KeyCode.KeyShift) {
            this.isHoldShift = true;
        }
    }

    @HostListener('document:keyup', ['$event'])
    onKeyUp(event) {
        if (event.keyCode === AppEnums.KeyCode.KeyShift) {
            this.isHoldShift = false;
        }
    }

    ngOnInit() {
        this.setToolbar();
        this.subscriptions.push(
            this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
                for (let index = 0; index < this.items.length; index++) {
                    const element = this.items[index];
                    if (element.text) {
                        element.options.text = this.translateService.instant(element.text);
                        element.options.hint = element.options.hint ? this.translateService.instant(element.options.hintKey) : '';
                    }
                }
                for (let index2 = 0; index2 < this.listContextMenu.length; index2++) {
                    const element = this.listContextMenu[index2];
                    element.items.map(e => e.text = this.translateService.instant(e.keyText));
                }
                this.treeToolbar.instance.repaint();
                setTimeout(() => {
                    this.repaintTreeToolBar();
                });
            })
        );
    }

    ngAfterViewInit() {
        this.repaintTreeToolBar();
        this.addRightClickActions();
    }

    ngOnChanges() {
        setTimeout(() => {
            this.setHeaderTitleWidth();
        });
        this.setToolbar();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    onHideWidgetsMenu(event) {
        event.preventDefault();
        const tmp = document.getElementsByTagName('body');
        const checkIsShowMenu = tmp[0].classList.contains('hide-widgets-menu');
        if (checkIsShowMenu) {
            tmp[0].classList.remove('hide-widgets-menu');
        } else {
            tmp[0].classList.add('hide-widgets-menu');
        }
        this.repaintTreeToolBar();
        this.setHeaderTitleWidth();
    }

    onItemClick(e) {
        if (typeof e.itemData.options.click === 'function') {
            e.itemData.options.click();
        }
        Array.from(document.querySelectorAll('.' + e.itemData.options.class)).forEach(element => {
            (<HTMLElement>element).blur();
        });
    }

    addBtnToItem(element) {
        if (isNullOrUndefined(element.locateInMenu)) {
            // bind event in additional function
            element.onClick = this.onClickBtn.bind(this, element);
        } else if (element.locateInMenu === 'never') {
            // bind event in never hide button
            element.onClick = this.onClickBtn.bind(this, element);
        } else {
            element.click = this.onClickBtn.bind(this, element);
        }
        element['elementAttr'] = { id: element.id, class: element.class };
        const tmpItem = {
            location: 'after',
            widget: 'dxButton',
            locateInMenu: !isNullOrUndefined(element.locateInMenu) ? element.locateInMenu : 'auto',
            options: Object.assign({}, element),
            text: element.text ? element.text : ''
        };
        if (tmpItem.text) {
            tmpItem.options.text = this.translateService.instant(tmpItem.text);
        }
        this.items.push(tmpItem);
    }

    private setToolbar() {
        this.items = [];
        this.listContextMenu = [];
        // push customize button of navigator
        if (this.customizeBtn && this.customizeBtn.length > 0) {
            for (let index = 0; index < this.customizeBtn.length; index++) {
                const element = this.customizeBtn[index];
                if (!isNullOrUndefined(element.visible) && !element.visible) {
                    continue;
                }
                element['rightClick'] = element.hasOwnProperty('rightClick') ? element['rightClick'] : undefined;
                if (element.rightClick) {
                    this.listContextMenu.push({
                        target: element.id,
                        name: element.name,
                        items: this.translateContext(element.rightClick),
                    });
                }
                this.addBtnToItem(Object.assign({ locateInMenu: 'never' }, element));
            }
        }
        if (this.listBtn && this.listBtn.length > 0) {
            for (let index = 0; index < this.listBtn.length; index++) {
                const element = this.listBtn[index];
                if (element && element.length > 0) {
                    for (let index2 = 0; index2 < element.length; index2++) {
                        const tmpBtn = element[index2];
                        tmpBtn['visible'] = tmpBtn.hasOwnProperty('visible') ? tmpBtn['visible'] : true;
                        if (tmpBtn['hintKey']) {
                            tmpBtn['hint'] = this.translateService.instant(tmpBtn['hintKey']);
                        }
                        if (!isNullOrUndefined(tmpBtn.visible) && !tmpBtn.visible) {
                            continue;
                        }
                        this.addBtnToItem(Object.assign({}, tmpBtn));
                    }
                }
            }
        }
        if (this.closeBtn) {
            this.addBtnToItem({
                name: 'closePopup',
                icon: 'close',
                hintKey: 'KissCommonBtn.Close',
                hint: this.translateService.instant('KissCommonBtn.Close'),
                id: 'kissClosePopup',
                locateInMenu: 'never',
            });
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.repaintTreeToolBar();
        this.setHeaderTitleWidth();
    }

    private setHeaderTitleWidth() {
        const toolbarEl = this.toolBarContainer.nativeElement.getElementsByClassName('dx-toolbar-after')[0];
        if (toolbarEl && toolbarEl.offsetWidth > 0) {
            this.titleHeaderTag.nativeElement.style.width = this.toolBarContainer.nativeElement.offsetWidth -
                toolbarEl.offsetWidth - 50 + 'px';
        }
    }

    repaintTreeToolBar() {
        const listLinkBtnEl = document.getElementsByClassName('kiss-btn-link');
        if (this.closeBtn) {
            setTimeout(() => {
                this.treeToolbar.instance.repaint();
                const parentToolEl = document.getElementById('kissClosePopup').parentElement.parentElement.parentElement;
                const closeEl = document.getElementById('kissClosePopup').parentElement.parentElement;
                document.getElementById('kissClosePopup').parentElement.parentElement.remove();
                parentToolEl.appendChild(closeEl);
                parentToolEl.style.display = 'block';
            });
        }
        if (listLinkBtnEl.length > 0) {
            for (let index = 0; index < listLinkBtnEl.length; index++) {
                const element = listLinkBtnEl[index];
                element.className = this.classBtnLink;
            }
        }
    }

    onItemRightClick(e, item) {
        this.onCustomizeBtnFn.emit(`${item.name}-${e.itemData.name}`);
    }

    translateContext(value) {
        if (value.length > 0) {
            value.map(e => e.text = this.translateService.instant(e.keyText));
        }
        return value;
    }

    addRightClickActions() {
        this.items.map((e) => {
            if (e.options.nameRightClick) {
                const btnLink = document.getElementById(e.options.id);
                btnLink.oncontextmenu = ($event) => {
                    $event.preventDefault();
                    this.onCustomizeBtnFn.emit(`${e.options.nameRightClick}`);
                };
            }
        });
    }

    onClickBtn(element) {
        this.onCustomizeBtnFn.emit(isFunction(element.callback) ? element : element.name);
    }
}
