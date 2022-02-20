import * as React from "react";
import { ListHeader, ListItem, Page, Toolbar } from "react-onsenui";
import { List } from "react-onsenui";
import native from "@Native/index";
import { ToolbarBuilder, ListViewBuilder } from "@Builders";
import ContentBody from "@Components/ContentBody";
import MDIcon from "@Components/MDIcon";
import PluginAboutActivity from "../PluginAboutActivity";
import EditorActivity from "../../EditorActivity";
import { Props, States } from "./interface";

class PluginsActivity extends React.Component<Props, States> {
  private scriptLosding = native.getPref("enableCustomScriptLoading") === "true";

  private renderToolbar = () => {
    return (
      <Toolbar>
        <ToolbarBuilder
          title={"Plugins"}
          onBackButton={this.props.popPage}
          hasWindowsButtons={true}
          hasDarkMode={true}
        />
      </Toolbar>
    );
  };

  public render() {
    let pas,
      customPlugins = null;
    if (native.isAndroid || native.isWindows) {
      if (this.scriptLosding) {
        if (native.fs.isFileExist("plugins.yaml")) {
          pas = native.fs.readFile("/plugins.yaml", {
            parse: { use: true, mode: "yaml" },
          });
          customPlugins = pas.map((item: string) => (
            <>
              {(() => {
                if (this.scriptLosding) {
                  if (native.getPref("Plugin.Settings." + item + ".name") === item) {
                    return (
                      <>
                        <div style={{ padding: "8px" }}></div>
                        <ListHeader>{item} Plugin</ListHeader>
                        <ListItem
                          tappable
                          modifier="chevron"
                          onClick={() => {
                            this.props.pushPage({
                              activity: PluginAboutActivity,
                              key: item + "-plugin-about",
                              pluginAbout: {
                                name: item,
                              },
                            });
                          }}
                        >
                          <div className="left">
                            <MDIcon icon="account_circle" size="24" />
                          </div>
                          <div className="center">Developer</div>
                        </ListItem>
                        {(() => {
                          const getConfig: any = native.fs.readFile(`plugins/${item}/plugin.yaml`, {
                            parse: { use: true, mode: "yaml" },
                          });
                          if (getConfig.options?.allowEditor) {
                            return (
                              <ListItem
                                tappable
                                modifier="chevron"
                                onClick={() => {
                                  this.props.pushPage({
                                    activity: EditorActivity,
                                    key: item + "-plugin-about",
                                    extras: {
                                      pluginName: item,
                                      fileName: getConfig.run,
                                      value: native.fs.readFile(`plugins/${item}/${getConfig.run}`),
                                    },
                                  });
                                }}
                              >
                                <div className="left">
                                  <MDIcon icon="logo_dev" size="24" />
                                </div>
                                <div className="center">Editor</div>
                              </ListItem>
                            );
                          } else {
                            return;
                          }
                        })()}
                        <ListViewBuilder
                          isPlugin={true}
                          pluginName={item}
                          data={JSON.parse(native.getPref("Plugin.Settings." + item + ".settings"))}
                        />
                      </>
                    );
                  } else {
                    return;
                  }
                } else {
                  return;
                }
              })()}
            </>
          ));
        }
      }
    }

    return (
      <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
        <ContentBody>
          <List>{customPlugins}</List>
          <div style={{ padding: "8px" }}></div>
        </ContentBody>
      </Page>
    );
  }
}

export default PluginsActivity;
