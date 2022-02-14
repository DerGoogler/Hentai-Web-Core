import tools from "@Misc/tools";
import native from "@Native/index";
import de from "./lang/de";
import en from "./lang/en";
import LanguageTypes from "./types";

const globals: any = {
  en: en,
  de: de,
};

const language = (): string => {
  const lang = native.getPref("language");

  if (lang === tools.undefined) {
    return "en";
  } else {
    return lang;
  }
};

const string: LanguageTypes = globals[language()];

export default string;
