import { Component, Injector, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { getConditionListBtn } from '@shared/utilites';

@Component({
  selector: 'kiss-kontoauszug-dokumente',
  templateUrl: './kontoauszug-dokumente.component.html',
  styleUrls: ['./kontoauszug-dokumente.component.scss']
})
export class KontoauszugDokumenteComponent extends BaseComponent implements OnInit {
  // Toolbar vars
  toolbarButton = [];
  AdditionalButtons = [...CommonConstant.AdditionalButtons];
  listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn(CommonConstant.AdditionalButtons, [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];
  customizeBtn = [{
    name: 'EditBtn',
    text: 'CtlWhKontoauszug.Dokumente.EditBtn',
    icon: 'edit',
    visible: true,
    class: 'i020-res-edit-button'
  }];

  constructor(
    injector: Injector,
    public translateService: TranslateService) {
    super(injector);
  }

  ngOnInit() {
    this.resetToolbarBtnState();
  }

  resetToolbarBtnState() {
    this.listBtn[0] = this.listBtn[0].map(btn => {
      return {...btn, visible: true, disabled: false};
    });
    this.listBtn[1] = this.listBtn[1].map(btn => {
      return {...btn, visible: true, disabled: false};
    });
  }
}
