import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';

@Component({
  selector: 'kiss-selected-actions',
  templateUrl: './selected-actions.component.html',
  styleUrls: ['./selected-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedActionsComponent implements OnChanges {

  iconUrl: any = 'assets/icon/';
  limitedSelectedActions: Array<any> = [];

  @Input() selectedActions: Array<any> = [];
  @Input() currentUrl;

  constructor(
    private router: Router,
    private layoutSandbox: LayoutSandbox
  ) { }

  ngOnChanges() {
    // get limit 6 item of selectedActions list
    const length = this.selectedActions.length;
    this.limitedSelectedActions = this.selectedActions.length > 6 ? this.selectedActions.slice(length - 6, length) : this.selectedActions;
    this.checkGoBack();
  }

  onClickItem(itemData: any): void {
    if (itemData.data.type === 'flag_menu') {
      this.layoutSandbox.selectMenu(itemData.data);
    } else {
      this.layoutSandbox.selectAction(itemData.data, itemData.url);
    }
  }

  onDeleteItem(event): void {
    this.currentUrl === event.itemData.url ?
      this.layoutSandbox.setDeletingSticky(event.itemData) :
      this.layoutSandbox.deleteSelectedActionItems(event.itemData);
    this.goto(event);
  }

  private goto(event) {
    if (this.limitedSelectedActions.length === 1) {
      this.router.navigate(['/']);
    } else if (this.limitedSelectedActions.length > 1 && event.itemData.url === this.currentUrl) {
      this.router.navigate([this.limitedSelectedActions[this.limitedSelectedActions.length - 2].url]);
    }
  }

  private checkGoBack() {
    for (let index = 0; index < this.limitedSelectedActions.length; index++) {
      const element = this.limitedSelectedActions[index];
      if (element.url === this.currentUrl && (index + 1) !== this.limitedSelectedActions.length) {
        setTimeout(() => {
          this.layoutSandbox.updateSelectedAction(element);
        });
        break;
      }
    }
  }
}
