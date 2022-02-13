import LocalizedStrings from "./core/localization";
import de from "./lang/de";
import en from "./lang/en";

// @ts-ignore
let string: any = new LocalizedStrings({
  en: en,
  de: de,
});

export default string;
