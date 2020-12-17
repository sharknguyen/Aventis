import { BaseComponent } from '@shared/components/base.component';
import { OnInit, Component, Injector, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Personalien, Wohnsitz, Aufenthaltsort } from '../../models';
import * as utilites from '@shared/utilites';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'kiss-demografie-history-detail',
    templateUrl: './demographieH-detail.component.html',
    styleUrls: ['./demographieH-detail.component.scss'],
})
export class DemografieHistoryDetailComponent extends BaseComponent implements OnInit, OnChanges {
    @Input() dataPersonalien: Personalien;
    @Input() dataWohnsitz: Wohnsitz;
    @Input() dataAufenthaltsort: Aufenthaltsort;
    inCHSeitGeburts = false;
    fiktivs = false;
    testPersons = false;
    zuzugGdeSeitGeburt = false;
    zuzugKtSeitGeburt = false;
    editor: any;
    bemerkung: string;
    constructor(
        injector: Injector
    ) { super(injector); }
    ngOnInit() {
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (this.dataPersonalien && !isNullOrUndefined(this.dataPersonalien)) {
            this.inCHSeitGeburts = this.dataPersonalien.InCHSeitGeburt;
            this.fiktivs = this.dataPersonalien.Fiktiv;
            this.testPersons = this.dataPersonalien.Testperson;
            this.zuzugGdeSeitGeburt = this.dataPersonalien.ZuzugGdeSeitGeburt;
            this.zuzugKtSeitGeburt = this.dataPersonalien.ZuzugKtSeitGeburt;
        }
    }
    screenByWidthSize(width) {
        return utilites.getSizeQualifier(width);
    }
}
