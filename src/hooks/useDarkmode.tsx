import React, { createContext, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { colors as kolors, useTheme as useMom, createTheme, ThemeProvider } from "@mui/material";
import shadeColor from "../util/shadeColor";
import { useLocalStorage } from "usehooks-ts";
import { UI } from "@Native/components/UI";

export type AccentColors = Array<{
  name: string;
  value: any;
}>;

export const DarkModeContext = createContext({
  darkmode: false,
  setDarkmode: (state: SetStateAction<boolean>) => {},
});

export const AccentSchemeContext = createContext({
  scheme: {} as any,
  setScheme: (state: SetStateAction<any>) => {},
});

export function useDarkmode(): { darkmode: boolean; setDarkmode: Dispatch<SetStateAction<boolean>> } {
  // @ts-ignore
  return useContext(DarkModeContext);
}

export function useScheme(): { scheme: any; setScheme: Dispatch<SetStateAction<any>> } {
  // @ts-ignore
  return useContext(AccentSchemeContext);
}

export type DarkModeProviderProps = {
  children: React.ReactNode;
};

export const accent_colors: AccentColors = [
  {
    name: "Purple",
    value: "purple",
  },
  {
    name: "Amber",
    value: "amber",
  },
  {
    name: "Blue",
    value: "blue",
  },
  {
    name: "Blue & Grey",
    value: "blueGrey",
  },
  {
    name: "Cyan",
    value: "cyan",
  },
  {
    name: "Deep Orange",
    value: "deepOrange",
  },

  {
    name: "Deep Purple",
    value: "deepPurple",
  },
  {
    name: "Green",
    value: "green",
  },
  {
    name: "Indigo",
    value: "indigo",
  },
  {
    name: "Light Blue",
    value: "lightBlue",
  },

  {
    name: "Light Green",
    value: "lightGreen",
  },
  {
    name: "Lime",
    value: "lime",
  },
  {
    name: "Orange",
    value: "orange",
  },
  {
    name: "Pink",
    value: "pink",
  },

  {
    name: "Red",
    value: "red",
  },
  {
    name: "Teal",
    value: "teal",
  },
  {
    name: "Yellow",
    value: "yellow",
  },
];

export const colors = {
  amber: kolors.amber,
  blue: kolors.blue,
  blueGrey: kolors.blueGrey,
  brown: kolors.brown,
  cyan: kolors.cyan,
  deepOrange: kolors.deepOrange,
  deepPurple: kolors.deepPurple,
  green: kolors.green,
  grey: kolors.grey,
  indigo: kolors.indigo,
  lightBlue: kolors.lightBlue,
  lightGreen: kolors.lightGreen,
  lime: kolors.lime,
  orange: kolors.orange,
  pink: kolors.pink,
  purple: kolors.purple,
  red: kolors.red,
  teal: kolors.teal,
  yellow: kolors.yellow,
};

export const useTheme = () => {
  const theme = useMom();
  const { scheme } = useScheme();

  return {
    scheme: colors[scheme.value],
    theme: theme,
    shadeColor,
  };
};

export const DarkModeProvider = (props: DarkModeProviderProps) => {
  const [darkmode, setDarkmode] = useLocalStorage("darkmode", false);
  const [scheme, setScheme] = useLocalStorage<AccentColors[0]>("accent_scheme", accent_colors[0]);

  const theme = createTheme({
    shape: {
      borderRadius: 8,
    },
    palette: !darkmode
      ? {
          mode: "light",
          primary: {
            light: colors[scheme.value][300],
            main: colors[scheme.value][900],
            // @ts-ignore
            dark: colors[scheme.value][800],
            // contrastText: colors.grey[900],
          },
          background: {
            default: "#fafafa",
          },
          divider: "#e5e8ec",
          secondary: {
            main: "#e5e8ec",
            light: "#eeeeee",
          },
        }
      : {
          mode: "dark",
          primary: {
            light: shadeColor(colors[scheme.value][300], -10),
            main: shadeColor(colors[scheme.value][900], -40),
            // dark: colors[scheme.value][800],
          },
          background: {
            default: shadeColor(colors[scheme.value][900], -75),
          },
          divider: shadeColor(colors[scheme.value][900], -85),
          secondary: {
            main: "#e5e8ec",
            light: shadeColor(colors[scheme.value][900], -80),
            dark: shadeColor(colors[scheme.value][800], -60),
          },
        },
  });

  return (
    <UI.Statusbar color={theme.palette.primary.main} white={false}>
      <UI.Navigationbar color={theme.palette.background.default}>
        <DarkModeContext.Provider value={{ darkmode, setDarkmode }}>
          <AccentSchemeContext.Provider value={{ scheme, setScheme }}>
            <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
          </AccentSchemeContext.Provider>
        </DarkModeContext.Provider>
      </UI.Navigationbar>
    </UI.Statusbar>
  );
};
