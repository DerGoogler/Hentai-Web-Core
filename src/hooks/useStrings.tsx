import React from "react";
import LocalizedStrings from "localized-strings";
import { useLocalStorage } from "usehooks-ts";
import { DE_Locale } from "../locales/de";
import { EN_Locale } from "../locales/en";
import { useNativeStorage } from "./useNativeStorage";

const std = new LocalizedStrings(
  {
    de: DE_Locale,
    en: EN_Locale,
  },
  {
    /* options */
  }
);

const Strings = React.createContext({
  strings: std,
  language: "",
  setLanguage: (state: React.SetStateAction<string>) => {},
});

export type StringProviderProps = {
  children: React.ReactNode;
};

export const StringProvider = (props: StringProviderProps) => {
  const [language, setLanguage] = useNativeStorage("language", "de");

  std.setLanguage(language);
  return (
    <Strings.Provider
      value={{
        strings: std,
        language: language,
        setLanguage: setLanguage,
      }}
    >
      {props.children}
    </Strings.Provider>
  );
};

export const useStrings = () => {
  return React.useContext(Strings);
};
