import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import { UtilService } from '@shared/utilites/utility.service';
import { Subscription } from 'rxjs';

@Injectable()
export class MedGrundversorgungSandbox extends Sandbox {

  private subscriptions: Array<Subscription> = [];

  constructor(protected appState$: Store<store.State>,
    private utilService: UtilService) {
    super(appState$);
  }

  /**
   * Unsubscribes from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
