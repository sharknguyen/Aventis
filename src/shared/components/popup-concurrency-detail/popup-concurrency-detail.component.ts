import { Component, OnChanges, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-popup-concurrency-detail',
  templateUrl: './popup-concurrency-detail.component.html',
  styleUrls: ['./popup-concurrency-detail.component.scss']
})
export class PopupConcurrencyDetailComponent implements OnInit, OnChanges {
  @Input() visible = false;
  @Output() yes: EventEmitter<any> = new EventEmitter();
  @Output() no: EventEmitter<any> = new EventEmitter();
  popUpModel: PopUpModel = new PopUpModel({ isVisible: false });
  constructor(
    public translateService: TranslateService,
    public layoutSandbox: LayoutSandbox
  ) { }

  ngOnInit() {
    this.initPopUpModel();
  }

  initPopUpModel(): void {
    this.popUpModel = new PopUpModel({
      isVisible: false,
      title: this.translateService.instant('Concurrency.Title'),
      message: this.translateService.instant('Concurrency.Message'),
      textYes: this.translateService.instant('Concurrency.ButtonYes'),
      textNo: this.translateService.instant('Concurrency.ButtonNo'),
      funcHidden: () => this.no.emit(),
      funcYes: () => this.no.emit(),
      funcNo: () => this.yes.emit()
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.popUpModel.isVisible = changes['visible'].currentValue;
  }
}
