import native from "@Native/index";
import de from "./lang/de";
import en from "./lang/en";
import idiotGERMAN from "./lang/idiot.german";

const globals: any = {
  en: en,
  de: de,
  idiotGERMAN: idiotGERMAN,
};

const settingsIndex: any = [
  {
    text: "English",
    value: "en",
  },
  {
    text: "German",
    value: "de",
  },
];

// Only available on Android and Windows App
if (native.isAndroid || native.isWindows) {
  settingsIndex.push({
    text: "Idioten Deutsch",
    value: "idiotGERMAN",
  });
}

export { globals, settingsIndex };
