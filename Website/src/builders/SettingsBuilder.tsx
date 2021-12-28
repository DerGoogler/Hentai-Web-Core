import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Icon, ListItem, ListTitle, Select, Switch } from "react-onsenui";
import { Provider, Translate, Translator } from "react-translated";
import tools from "../misc/tools";
import native from "../native";

interface SettingsOptions {
  key?: string;
  disabled?: boolean | any;
  id?: string;
  style?: React.CSSProperties;
  expandableContent?: JSX.Element | HTMLElement | string | undefined;
  expandable?: boolean;
  type: "switch" | "select";
  text: string;
  selectValue?: JSX.Element | HTMLOptionElement;
  icon?: string;
  selectDefaultValue?: string;
  switchDefaultValue?: boolean;
  callback?: Function;
}

export interface SettingsInterface {
  title: string;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  content: SettingsOptions[];
}

class SettingsBuilder extends React.Component<{ data: SettingsInterface[] }> {
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

  private getSettingSelect(key: string): string | String {
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
    const { data } = this.props;

    const settings = data.map((header: SettingsInterface) => (
      <Translator>
        {({ translate }: any) => (
          <>
            <section id={header.id} className={header.className} style={header.style}>
              <ListTitle>
                <Translate text={header.title} />
              </ListTitle>
              {header.content.map((setting: SettingsOptions) => (
                <>
                  <ListItem
                    expandable={tools.typeCheck(setting.expandable, false)}
                    id={setting.id}
                    style={setting.style}
                  >
                    {(() => {
                      if (
                        setting.icon === null ||
                        setting.icon === undefined ||
                        setting.icon === ""
                      ) {
                        return;
                      } else {
                        return (
                          <div className="left">
                            <Icon icon={setting.icon} className="list-item__icon"></Icon>
                          </div>
                        );
                      }
                    })()}
                    <div className="center">
                      <Translate text={setting.text} />
                    </div>
                    <div className="right">
                      {(() => {
                        switch (setting.type) {
                          case "switch":
                            return (
                              <Switch
                                checked={this.default(
                                  setting.switchDefaultValue,
                                  this.getSettingSwitch(setting.key!),
                                  false
                                )}
                                disabled={Boolean(setting.disabled)}
                                onChange={(e: any) => {
                                  this.setSetting(setting.key!, e.target.checked);
                                }}
                              ></Switch>
                            );
                          case "select":
                            return (
                              <Select
                                id="choose-sel"
                                disabled={Boolean(setting.disabled)}
                                value={tools.typeCheck(
                                  this.getSettingSelect(setting.key!),
                                  tools.typeCheck(setting.selectDefaultValue, "")
                                )}
                                onChange={(e: any) => {
                                  if (typeof setting.callback == "function") {
                                    setting.callback(e, setting.key, translate);
                                  } else {
                                    this.setSetting(setting.key!, e.target.value);
                                  }
                                }}
                              >
                                <option value="" selected disabled hidden>
                                  Choose
                                </option>
                                {setting.selectValue}
                              </Select>
                            );
                          default:
                            return;
                        }
                      })()}
                    </div>
                    {(() => {
                      if (setting.expandable) {
                        return (
                          <div className="expandable-content">{setting.expandableContent}</div>
                        );
                      } else {
                        return;
                      }
                    })()}
                  </ListItem>
                </>
              ))}
            </section>
          </>
        )}
      </Translator>
    ));

    return settings;
  }
}

export default hot(SettingsBuilder);
