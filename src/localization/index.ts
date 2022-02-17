import tools from "@Misc/tools";
import native from "@Native/index";
import { globals } from "./languageIndexes";
import formatString from "./utils/formatString";
import { LanguageTypes } from "./utils/types";

function checkLanguage(): string {
  const lang = native.getPref("language");
  if (lang === "false") {
    return "en";
  } else {
    return lang;
  }
}

const string: LanguageTypes = globals[checkLanguage()];

export { string, formatString, LanguageTypes };
