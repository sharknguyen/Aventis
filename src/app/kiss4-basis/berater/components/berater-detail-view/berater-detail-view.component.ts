import { Component, Injector, Input } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';

@Component({
  selector: 'kiss-berater-detail-view',
  templateUrl: './berater-detail-view.component.html',
  styleUrls: ['./berater-detail-view.component.scss'],
})

export class BeraterFormDetailViewComponent extends BaseComponent {
  @Input() formData: any;
  constructor(injector: Injector) {
    super(injector);
  }

  getSizeQualifier(width) {
    if (width < 1300) {
      return 'xs';
    }
    return 'lg';
  }
}
