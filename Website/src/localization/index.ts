import tools from "@Misc/tools";
import native from "@Native/index";
import formatString from "./utils/formatString";
import { LanguageTypes } from "./types";
import de from "./lang/de";
import en from "./lang/en";

const globals: any = {
  en: en,
  de: de,
};

function checkLanguage(): string {
  const lang = native.getPref("language");
  if (lang === tools.undefined) {
    return "en";
  } else {
    return lang;
  }
}

const string: LanguageTypes = globals[checkLanguage()];

export { string, formatString, LanguageTypes };
