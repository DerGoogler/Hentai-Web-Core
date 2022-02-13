import * as React from "react";
import { ListHeader, ListItem, Page, Toolbar } from "react-onsenui";
import { List } from "react-onsenui";
import { Provider, Translate, Translator } from "react-translated";
import settings from "@DataPacks/settings";
import native from "@Native/index";
import ToolbarBuilder from "@Builders/ToolbarBuilder";
import ContentBody from "@Components/ContentBody";
import SettingsBuilder from "@Builders/SettingsBuilder";
import MDIcon from "@Components/MDIcon";
import PluginAboutActivity from "./PluginAboutActivity";
import Bootloader from "@Bootloader";

class PluginsActivity extends React.Component<{ pushPage: any; popPage: any }, {}> {
  private scriptLosding = native.getPref("enableCustomScriptLoading") === "true";

  public componentDidUpdate() {
    new Bootloader().styleInit();
  }

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
                        <SettingsBuilder
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
