import { Component, Injector } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BaseComponent } from '@shared/components/base.component';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';

@Component({
  selector: 'kiss-fallbearbeitung',
  templateUrl: './fallbearbeitung.component.html',
  styleUrls: ['./fallbearbeitung.component.scss']
})
export class FallbearbeitungComponent extends BaseComponent {
  isNavbar = true;
  currentUrl: any;

  constructor(
    injector: Injector,
    private router: Router,
    public layoutSandbox: LayoutSandbox,
  ) {
    super(injector);
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  scrollChanged(e) {
    this.layoutSandbox.scrollChanged.next(e);
  }
}
