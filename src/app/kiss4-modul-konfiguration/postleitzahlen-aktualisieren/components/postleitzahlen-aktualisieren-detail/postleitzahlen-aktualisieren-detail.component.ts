import { Component } from '@angular/core';
import { PostleitzahlenAktualisieren } from '@app/kiss4-modul-konfiguration/postleitzahlen-aktualisieren/models';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';

@Component({
    selector: 'kiss-postleitzahlen-aktualisieren-detail',
    templateUrl: './postleitzahlen-aktualisieren-detail.component.html',
    styleUrls: ['./postleitzahlen-aktualisieren-detail.component.scss']
})
@SetClassRight('CtlPostleitzahlenAktualisieren')
export class PostleitzahlenAktualisierenDetailComponent {

    selectedPostleitzahlen: PostleitzahlenAktualisieren = new PostleitzahlenAktualisieren();
    formatDate = CommonConstant.FORMAT_DATE;
    isExpand = true;

    constructor() { }

    // #region component CRUD functions
    setDataPostleitzahlenAktualisieren(data: PostleitzahlenAktualisieren) {
        this.selectedPostleitzahlen = data;
    }
    // #endregion

    // #region utility functions
    screen(width) {
        return (width < CommonConstant.SCREEN_RESOLUTION_LARGE) ? AppEnums.ScreenResolution.SMALL : AppEnums.ScreenResolution.LARGE;
    }

    onCollapseDetailContainer(event) {
        event.stopPropagation();
        this.isExpand = !this.isExpand;
    }
    // #endregion

}
