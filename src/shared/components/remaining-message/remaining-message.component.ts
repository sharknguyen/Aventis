import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-remaining-message',
    templateUrl: './remaining-message.component.html',
    styleUrls: ['./remaining-message.component.scss']
})
export class RemainingMessageComponent implements OnInit, OnDestroy {
    isMessageClosed = false;
    message = '';
    translateMessage: string;
    lastMessage: string;
    private subscription = new Subscription();
    constructor(
        public translateService: TranslateService,
    ) {
    }
    ngOnInit() {
        this.registerEvents();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    registerEvents() {
        this.subscription.add(
            this.translateService.onLangChange.subscribe(() => {
                if (this.translateMessage) {
                    if (this.lastMessage) {
                        this.message = this.translateService.instant(this.translateMessage) + this.lastMessage;
                        return;
                    }
                    this.message = this.translateService.instant(this.translateMessage);

                }
            })
        );
    }
    hideMessage() {
        this.isMessageClosed = false;
        this.message = '';
    }

    showMessage(message, translateMessage?, lastMessage?) {
        this.translateMessage = translateMessage;
        this.lastMessage = lastMessage;
        this.isMessageClosed = true;
        this.message = message;
    }
}
