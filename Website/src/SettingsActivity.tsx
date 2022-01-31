import * as React from "react";
import { Page, Toolbar } from "react-onsenui";
import { List } from "react-onsenui";
import { Provider, Translate, Translator } from "react-translated";
import settings from "@DataPacks/settings";
import native from "@Native/index";
import ToolbarBuilder from "@Builders/ToolbarBuilder";
import ContentBody from "@Builders/ContentBody";
import SettingsBuilder from "@Builders/SettingsBuilder";

class SettingsActivity extends React.Component<{ popPage: any }, {}> {
  private customSettings = native.getPref("PluginSettings");
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
    const pas: any = JSON.parse(
      native.fs.readFile(native.getPref("electron.hardDevice"), "plugins.json")
    );
    const customPlugins = pas.map((item: string) => (
      <>
        {(() => {
          if (this.customSettings === (null || "" || undefined)) {
            return;
          } else {
            if (this.scriptLosding === "true") {
              if (native.getPref("Plugin.Settings." + item + ".name") === item) {
                return (
                  <List>
                    <SettingsBuilder
                      isPlugin={true}
                      pluginName={item}
                      data={JSON.parse(native.getPref("Plugin.Settings." + item + ".settings"))}
                    />
                  </List>
                );
              } else {
                return;
              }
            } else {
              return;
            }
          }
        })()}
      </>
    ));

    return (
      <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
        <ContentBody>
          <List>
            <SettingsBuilder isPlugin={false} pluginName="" data={settings} />
          </List>
        </ContentBody>
        {customPlugins}
      </Page>
    );
  }
}

export default SettingsActivity;
