import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Icon, ListItem, Select, Switch } from "react-onsenui";
import { Provider, Translate, Translator } from "react-translated";
import tools from "../../misc/tools";
import native from "../../native";

/**
 * Create an precreated switch
 */
class SettingsBuilder extends React.Component<{
  _key?: string;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
  expandableContent?: JSX.Element | HTMLElement | string | undefined;
  expandable?: boolean;
  type: string;
  selectValue?: JSX.Element | HTMLOptionElement;
  icon?: string;
  selectDefaultValue?: string;
  switchDefaultValue?: boolean;
}> {
  private element!: HTMLElement | null;

  /**
   * Check if an key is there
   * @param key
   * @returns {Boolean}
   */
  private getSettingSwitch(key: string): boolean {
    var get = native.getPref(key);
    if (get === undefined || get === null || get === "" || get === "false") {
      return false;
    } else {
      return true;
    }
  }

  private getSettingSelect(key: string): string {
    var get = native.getPref(key);
    if (get === undefined || get === null || get === "") {
      return "en";
    } else {
      return get;
    }
  }

  private setSetting(key: string, data: any) {
    native.setPref(key, data);
  }

  private default(_: any, __: any, ___: any) {
    if (_ === undefined || _ === null) {
      return __;
    } else if (_ === undefined || _ === null) {
      return ___;
    }
  }

  public render() {
    const {
      _key,
      id,
      style,
      children,
      disabled,
      expandable,
      expandableContent,
      type,
      icon,
      selectValue,
      selectDefaultValue,
      switchDefaultValue,
    } = this.props;
    return (
      <ListItem expandable={tools.typeCheck(expandable, false)} id={id} style={style}>
        {(() => {
          if (icon === null || icon === undefined || icon === "") {
            return;
          } else {
            return (
              <div className="left">
                <Icon icon={icon} className="list-item__icon"></Icon>
              </div>
            );
          }
        })()}
        <div className="center">
          <Translate text={children} />
        </div>
        <div className="right">
          {(() => {
            switch (type) {
              case "switch":
                return (
                  <Switch
                    checked={this.default(switchDefaultValue, this.getSettingSwitch(_key!), false)}
                    disabled={disabled}
                    onChange={(e: any) => {
                      this.setSetting(_key!, e.target.checked);
                    }}
                  ></Switch>
                );
              case "select":
                return (
                  <Select
                    id="choose-sel"
                    value={tools.typeCheck(
                      this.getSettingSelect(_key!),
                      tools.typeCheck(switchDefaultValue, "")
                    )}
                    onChange={(e: any) => {
                      this.setSetting(_key!, e.target.value);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Choose
                    </option>
                    {selectValue}
                  </Select>
                );
              default:
                return;
            }
          })()}
        </div>
        {(() => {
          if (expandable) {
            return <div className="expandable-content">{expandableContent}</div>;
          } else {
            return;
          }
        })()}
      </ListItem>
    );
  }
}

export default hot(SettingsBuilder);
