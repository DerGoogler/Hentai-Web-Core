import LocalizedStrings from "./utils/LocalizedStrings";
import native from "@Native/index";
import { globals } from "./languageIndexes";
import { Language, LanguageTypes, StringAguments } from "./utils/types";

function checkLanguage(): string {
  const lang = native.getPref("language");
  if (lang === "false") {
    return "en";
  } else {
    return lang;
  }
}

//@ts-ignore
const string: Language & StringAguments = new LocalizedStrings(globals, {});

string.setLanguage(checkLanguage());

export { string, LanguageTypes };
