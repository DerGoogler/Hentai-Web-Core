import * as React from "react";
import { Dialog, ListItem, ListTitle, Page, Toolbar } from "react-onsenui";
import { List } from "react-onsenui";
import { Provider, Translate, Translator } from "react-translated";
import settings from "@DataPacks/settings";
import native from "@Native/index";
import ToolbarBuilder from "@Builders/ToolbarBuilder";
import ContentBody from "@Builders/ContentBody";
import SettingsBuilder from "@Builders/SettingsBuilder";
import MDIcon from "@Builders/MDIcon";
import PluginAboutBuilder from "@Builders/PluginAboutBuilder";

class SettingsActivity extends React.Component<{ popPage: any }, {}> {
  private scriptLosding = native.getPref("enableCustomScriptLoading");

  public componentDidMount() {
    native.electron.discordRPC("Viewing Settings");
  }

  private renderToolbar = () => {
    return (
      <Toolbar>
        <ToolbarBuilder
          title={<Translate text="settings" />}
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
    if (native.userAgentEqualAndroid(true) || native.userAgentEqualWindows(true)) {
      if (native.getPref("enableCustomScriptLoading") === "true") {
        pas = JSON.parse(native.fs.readFile("plugins.json"));
        customPlugins = pas.map((item: string) => (
          <>
            {(() => {
              if (this.scriptLosding === "true") {
                if (native.getPref("Plugin.Settings." + item + ".name") === item) {
                  return (
                    <>
                      <div style={{ padding: "8px" }}></div>
                      <List modifier="inset">
                        <PluginAboutBuilder pluginName={item} />
                        <SettingsBuilder
                          isPlugin={true}
                          pluginName={item}
                          data={JSON.parse(native.getPref("Plugin.Settings." + item + ".settings"))}
                        />
                      </List>
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

    return (
      <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
        <ContentBody>
          <List>
            <SettingsBuilder isPlugin={false} pluginName="" data={settings} />
          </List>
          {customPlugins}
          <div style={{ padding: "8px" }}></div>
        </ContentBody>
      </Page>
    );
  }
}

export default SettingsActivity;
