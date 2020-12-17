import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'app-navigator',
    templateUrl: './navigator.component.html',
    styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent {

    // tslint:disable-next-line:no-output-on-prefix
    @Output() onCustomizeBtnFn = new EventEmitter<any>();
    @Input() titleHeader: string;
    @Input() customizeBtn: any;
    @Input() listBtn: any;
    @Input() isCard: boolean;

    constructor() { }

    toolBarOnItemClickTopGrd(event) {
        this.onCustomizeBtnFn.emit(event);
    }

}
