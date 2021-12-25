import { CSSProperties } from "react";
import { hot } from "react-hot-loader/root";
import SettingsSelect from "./SettingsSelect";
import SettingsSwitch from "./SettingsSwitch";
// @ts-ignore
const SettingsBuilder = data.map(
  (item: { key?: string; type?: string; id?: string; disabled?: boolean; style?: CSSProperties }) =>
    (() => {
      switch (item.type) {
        case "switch":
          // @ts-ignore
          <SettingsSwitch _key={item.key} id={item.id} style={item.style} disabled={item.disabled}>
            {item.key}-string
          </SettingsSwitch>;
          break;
        case "select":
          // @ts-ignore
          <SettingsSelect _key={item.key} id={item.id} style={item.style} disabled={item.disabled}>
            {item.key}-string
          </SettingsSelect>;
          break;
      }
    })()
);

export default hot(SettingsBuilder);
