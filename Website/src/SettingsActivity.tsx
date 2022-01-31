import * as React from "react";
import { Page, Toolbar } from "react-onsenui";
import { List } from "react-onsenui";
import { Provider, Translate, Translator } from "react-translated";
import settings from "@DataPacks/settings";
import native from "@Native";
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
    return (
      <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
        <ContentBody>
          <List>
            <SettingsBuilder data={settings} />
          </List>
          {(() => {
            if (this.customSettings === (null || "" || undefined)) {
              return;
            } else {
              if (this.scriptLosding === "true") {
                return (
                  <List>
                    <SettingsBuilder data={JSON.parse(this.customSettings)} />
                  </List>
                );
              } else {
                return;
              }
            }
          })()}
        </ContentBody>
      </Page>
    );
  }
}

export default SettingsActivity;
