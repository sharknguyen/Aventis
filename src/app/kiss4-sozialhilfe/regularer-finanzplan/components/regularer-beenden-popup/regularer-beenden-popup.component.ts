import { Component, Injector, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';
import { AppEnums } from '@shared/AppEnum';

@Component({
    selector: 'kiss-regularer-beenden-popup',
    templateUrl: './regularer-beenden-popup.component.html',
    styleUrls: ['./regularer-beenden-popup.component.scss']
})

export class RegularerBeendenPopupComponent extends BaseComponent {
    @Output() visiblePopupBeendenChange: EventEmitter<any> = new EventEmitter();
    @Input() visiblePopupBeenden: boolean;
    constructor(injector: Injector) {
        super(injector);
    }

    onSaveClicked() {
        this.visiblePopupBeendenChange.emit(false);
    }

    onCancelClicked() {
        this.visiblePopupBeendenChange.emit(false);
    }
}
