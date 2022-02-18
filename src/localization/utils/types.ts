interface StringAguments {
  setLanguage(arg0: string): void;
  formatString(str: string, ...valuesForPlaceholders: any): string;
}

interface LanguageTypes {
  en: Language;
  de: Language;
  idiotGERMAN: Language;
}

interface Language {
  windowsCloseDialogMessage: string;
  windowsCloseDialogTitle: string;
  ok: string;
  yes: string;
  no: string;
  general: string;
  download: string;
  viewImageSource: string;
  viewImageInBrowser: string;
  settings: string;
  copyLink: string;
  signIn: string;
  howToLoginLink: string;
  howToLogin: string;
  MODEL: string;
  MANUFACTURER: string;
  displayMoreButton: string;
  hideFAB: string;
  fitImageToCard: string;
  enableDarkmode: string;
  appearance: string;
  security: string;
  card: string;
  others: string;
  saveLastUsedTab: string;
  removeTitle: string;
  enableSwipeBetweenTabs: string;
  alwaysLogin: string;
  hideSearchbar: string;
  erudaEnabled: string;
  useFingerPrintToLogin: string;
  language: string;
  enableKeepScreenOn: string;
  electronChangeWindowSizeDialogMessage: string;
  electronChangeWindowSizeDialogTitle: string;
  hardDevice: string;
  enableAlwaysOnTop: string;
  enableDevTools: string;
  electronWindowSize: string;
  disableNSFWcontent: string;
  placeTabberOnBottom: string;
  licenses: string;
  cancel: string;
  search: string;
  hideCardWithImageError: string;
}

export { LanguageTypes, Language, StringAguments };
