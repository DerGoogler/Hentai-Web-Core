import * as React from "react";
import { ListItem, Select, Switch } from "react-onsenui";
import { List } from "react-onsenuix";
import { SelectValue, ListInterface, ListOptions } from "@Types/ListBuilder";
import tools from "@Misc/tools";
import native from "@Native/index";
import MDIcon from "@Components/MDIcon";
import HWPlugin from "@Native/hwplugin";
import Gesture from "@Components/Gesture";
import ons from "onsenui";

class ListViewBuilder extends React.Component<{
  isPlugin: boolean;
  pluginName: string;
  data: ListInterface[];
}> {
  /**
   * Check if an key is there
   * @param key
   * @returns {Boolean}
   */
  private getSettingSwitch(key: string): boolean {
    var get = this.getPref(key);
    if (get === undefined || get === null || get === "" || get === "false") {
      return false;
    } else {
      return true;
    }
  }

  private getSettingSelect(key: string): string | String {
    var get = this.getPref(key);
    if (get === undefined || get === null || get === "") {
      return "en";
    } else {
      return get;
    }
  }

  private getPref(key: string): string {
    if (this.props.isPlugin) {
      return new HWPlugin(this.props.pluginName).getPluginPref(key);
    } else {
      return native.getPref(key);
    }
  }

  private setPref(key: string, content: string): void {
    if (this.props.isPlugin) {
      new HWPlugin(this.props.pluginName).setPluginPref(key, content);
    } else {
      native.setPref(key, content);
    }
  }

  private setSetting(key: string, data: any): void {
    this.setPref(key, data);
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

    const list = data.map((header: ListInterface) => (
      <>
        <section id={header.id} className={header.className} style={header.style}>
          <List.Title>{header.title}</List.Title>
          {header.content.map((item: ListOptions) => (
            <>
              <List.Item
                modifier={tools.typeCheck(item.modifier, "")}
                // @ts-ignore
                tappable={tools.typeCheck(item.tappable, false)}
                id={item.key + "-ListItem"}
                style={item.style}
                onClick={() => {
                  if (typeof item.onClick == "function") {
                    const key = item.key;
                    item.onClick(key);
                  }
                }}
              >
                {(() => {
                  if (item.icon === null || item.icon === undefined) {
                    return;
                  } else {
                    return (
                      <div className="left">
                        <MDIcon icon={item.icon} size="24" isInList={true}></MDIcon>
                      </div>
                    );
                  }
                })()}
                <Gesture
                  event="hold"
                  callback={() => {
                    ons.notification.alert({
                      message: item.helper?.text,
                      title: "Info",
                      buttonLabels: ["Ok"],
                      modifier: native.checkPlatformForBorderStyle,
                      animation: "default",
                      primaryButtonIndex: 1,
                      cancelable: tools.typeCheck(item.helper?.cancelable, true),
                    });
                  }}
                >
                  <div className="center">{item.text}</div>
                </Gesture>
                <div className="right">
                  {(() => {
                    switch (item.type) {
                      case "switch":
                        return (
                          <Switch
                            checked={this.default(item.switchDefaultValue, this.getSettingSwitch(item.key!), false)}
                            disabled={Boolean(item.disabled)}
                            onChange={(e: any) => {
                              /**
                               * This will keep the default funtion
                               */
                              const keepDefaultFuntion = (): void => this.setSetting(item.key!, e.target.checked);
                              if (typeof item.callback == "function") {
                                const key = item.key;
                                item.callback(e, key, keepDefaultFuntion());
                              } else {
                                keepDefaultFuntion();
                              }
                            }}
                          ></Switch>
                        );
                      case "select":
                        return (
                          <Select
                            id="choose-sel"
                            disabled={Boolean(item.disabled)}
                            value={tools.typeCheck(this.getSettingSelect(item.key!), tools.typeCheck(item.selectDefaultValue, ""))}
                            onChange={(e: any) => {
                              /**
                               * This will keep the default funtion
                               */
                              const keepDefaultFuntion = () => this.setSetting(item.key!, e.target.value);
                              if (typeof item.callback == "function") {
                                const key = item.key;
                                item.callback(e, key, keepDefaultFuntion());
                              } else {
                                keepDefaultFuntion();
                              }
                            }}
                          >
                            <option value="" selected disabled hidden>
                              Choose
                            </option>
                            {item.selectValue?.map((select: SelectValue) => (
                              <>
                                <option value={select.value} disabled={select.disabled}>
                                  {select.text}
                                </option>
                              </>
                            ))}
                          </Select>
                        );
                      default:
                        return;
                    }
                  })()}
                </div>
              </List.Item>
            </>
          ))}
        </section>
      </>
    ));

    return list;
  }
}

export default ListViewBuilder;
