export class WohnkostenConstant {
  public static bemerkungMaxlength = 4000;
  public static messageValidate = 'MSG_Validate';
  public static Betrag = 'Betrag';
  public static Beitrag = 'Beitrag';
  public static MaxBeitragSD = 'MaxBeitragSD';
  public static NKBetrag = 'NKBetrag';
  public static NKMaxBeitragSD = 'NKMaxBeitragSD';
  public static Bemerkung = 'bemerkung';
  public static Berechnungsgrundlage = 'Berechnungsgrundlage';
  public static Wohnsituation = 'Wohnsituation';
  public static MessageOverflowData = 'Arithmetic overflow error converting expression to data type money';
  public static WohnkostenAnpassen = 'WohnKosten.Detail.WohnkostenAnpassen';
  public static BewilligteWohnostenAnpassen = 'WohnKosten.Detail.BewilligteWohnostenAnpassen';
  public static deleteBtn = {
    locateInMenu: 'always',
    text: 'KissCommonBtn.Loschen',
    name: 'deleteMenuItemTopGrd'
  };
  public static customizeBtnDetail = [
    {
      text: 'WohnKosten.Detail.BewilligteWohnostenAnpassen',
      visible: true,
      disabled: false,
      name: 'bewilligteAnpassen',
      icon: 'add'
    },
    {
      text: 'WohnKosten.Detail.Bearbeiten',
      visible: true,
      name: 'bearbeiten',
      icon: 'edit'
    },
    {
      text: 'WohnKosten.Detail.Abschilessen',
      visible: false,
      disabled: false,
      name: 'abschilessen',
      icon: 'save'
    },
    {
      text: 'Arbeit.Button.Save',
      visible: false,
      disabled: false,
      icon: 'save',
      name: 'save'
    },
    {
      text: 'WohnKosten.Detail.Abbrechen',
      visible: false,
      name: 'abbrechen',
      icon: 'close'
    },
  ];

  public static ButtonType = {
    BewilligteAnpassen: 'bewilligteAnpassen',
    Abschilessen: 'abschilessen',
    Save: 'save',
    Bearbeiten: 'bearbeiten',
    Abbrechen: 'abbrechen'
  };
}
