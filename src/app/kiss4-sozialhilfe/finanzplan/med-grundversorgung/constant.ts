export class MedGrundversorgungConstant {
  public static deleteBtn = {
    locateInMenu: 'always',
    text: 'KissCommonBtn.Loschen',
    name: 'deleteMenuItemTopGrd'
  };
  public static columnsDataGrid = [
    { minWidth: 150, alignment: 'left', dataType: 'date', dataField: 'DatumVon', caption: 'GultigAb', format: 'MMMM yyyy', sortIndex: 1 },
    { minWidth: 100, alignment: 'left', dataType: 'string', dataField: 'NameVorname', caption: 'Name', format: '', sortIndex: 2 },
    { minWidth: 100, alignment: 'left', dataType: 'date', dataField: 'Geburtsdatum', caption: 'Geburtsdatum', format: 'dd.MM.yyyy', sortIndex: 2 },
    { minWidth: 150, alignment: 'left', dataType: 'number', dataField: 'KVGBetrag', caption: 'KVG', format: '#,##0.00', sortIndex: 2 },
    { minWidth: 170, alignment: 'left', dataType: 'number', dataField: 'KVGReduktion', caption: 'KVGRed', format: '#,##0.00', sortIndex: 2 },
    { minWidth: 150, alignment: 'left', dataType: 'number', dataField: 'VVGBetrag', caption: 'VVG', format: '#,##0.00', sortIndex: 2 },
    { minWidth: 170, alignment: 'left', dataType: 'number', dataField: 'VVGReduktion', caption: 'VVGRed', format: '#,##0.00', sortIndex: 2 },
  ];
}
