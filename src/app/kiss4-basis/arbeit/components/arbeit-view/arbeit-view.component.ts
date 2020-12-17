import { Component, Input, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { BarPerSon } from '../../models';
import { ArbeitConstant } from '@shared/common/arbeit.common';
import { CommonConstant } from '@shared/common/constant.common';

@Component({
  selector: 'app-arbeit-view',
  templateUrl: './arbeit-view.component.html',
  styleUrls: ['./arbeit-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArbeitViewComponent {
  // Datasouce
  @Input() arbeitModel: BarPerSon;

  editor: any;
  dateFormat = CommonConstant.FORMAT_DATE;
  tb = ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript',
    '|', 'fontFamily', 'fontSize', 'color', 'inlineClass', 'inlineStyle', 'paragraphStyle', 'lineHeight',
    '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink',
    'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable',
    '|', 'print', 'getPDF', 'spellChecker', 'help', 'html',
    '|', 'emoticons', 'fontAwesome', 'specialCharacters',
    'insertHR', 'selectAll', 'clearFormatting', '|', 'undo', 'redo'
  ];
  froalaEditorConfig = {
    heightMin: 150,
    height: 300,
    toolbarButtons: this.tb,
    toolbarButtonsMD: this.tb,
    toolbarButtonsSM: this.tb,
    toolbarButtonsXS: this.tb,
    charCounterCount: false,
    events: {
      'froalaEditor.initialized': (e, editor) => {
        this.editor = editor;
        this.editor.edit.off();
      }
    }
  };
  getSizeQualifier(width) {
    if (width < ArbeitConstant.screenLargeWidth) {
      return 'xs';
    }
    return 'lg';
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    // to fix form rerender item when resize
  }
}
