import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Option } from './printer.model';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'kiss-printer',
  templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.scss']
})

export class PrinterComponent implements OnInit {
  @Input() dataPrint: any;
  @Input() colPrint: any;
  @Input() optionPrint: Option;
  @ViewChild('printerData') printerData: ElementRef;
  page: Number = 0;
  pages: Number = 0;
  now: Date = new Date();
  isPrint: Boolean = false;
  bottom = 0;
  pagNum = 0;
  totalRows: any;
  constructor(
    public translateService: TranslateService,
  ) { }

  ngOnInit() {
    if (!this.optionPrint) {
      this.optionPrint = new Option({
        header_left: this.translateService.instant('Printer.HeaderLeftDefault'),
        header_center: '',
        header_right: '',
        footer_left: this.translateService.instant('Printer.FooterLeftDefault'),
        footer_center: this.translateService.instant('Printer.FooterCenterDefault'),
        footer_right: '',
        title: 'kiss printer'
      });
    }
  }

  onPrint() {
    const popupHtml = this.printerData.nativeElement.innerHTML;
    const win = window.open('', '');
    // handle finish close window
    window.setTimeout(() => {
      if (win.closed) {
        this.isPrint = false;
      }
    }, 1);
    let content = '<html><head><style type="text/css" media="print">';
    content += 'body{counter-reset: tfoot;-webkit-print-color-adjust: exact;}@page {size: auto;margin: 0px;}thead {display: table-header-group;}'
      + 'tfoot {display: table-footer-group;};{ page-break-inside:avoid; page-break-after:auto };#content-header{background-color: #cccccc !important;}';
    content += '</style></head><body onload="window.print(); window.close();">';
    content += popupHtml;
    content += '</body>';
    content += '</html>';
    win.document.write(content);
    win.document.close();
    win.document.title = this.optionPrint.title;
    // handle finish print progress
    win.onafterprint = () => {
      this.isPrint = false;
    };
  }

  setData(value, option, column, totalRows?) {
    this.optionPrint = {
      header_left: this.translateService.instant('Printer.HeaderLeftDefault'),
      header_center: '',
      header_right: '',
      footer_left: this.translateService.instant('Printer.FooterLeftDefault'),
      footer_center: this.translateService.instant('Printer.FooterCenterDefault'),
      footer_right: '',
      title: 'kiss printer'
    };
    this.isPrint = true;
    this.dataPrint = value;
    this.colPrint = column;
    if (option) {
      this.optionPrint = Object.assign({}, this.optionPrint, option);
    }
    if (!isNullOrUndefined(totalRows)) {
      this.totalRows = totalRows;
    }
    setTimeout(() => {
      this.onPrint();
    }, 0);
  }

  getWidth() {
    const width = Array.isArray(this.colPrint) ? this.colPrint.length : 0;
    return `calc(100vw / ${width})`;
  }

  getDataType(type) {
    const types: any[] = [
      'date', 'time', 'checkbox', 'boolean', 'customDate', 'customNumber', 'number', 'img-text'
    ];
    if (types.indexOf(type) > -1) {
      return type;
    } else {
      return 'other';
    }
  }

}
