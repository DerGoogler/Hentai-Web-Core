import * as React from "react";
import { ListItem, Page, Toolbar } from "react-onsenui";
import { List } from "react-onsenui";
import { Provider, Translate, Translator } from "react-translated";
import settings from "@DataPacks/settings";
import native from "@Native/index";
import ToolbarBuilder from "@Builders/ToolbarBuilder";
import ContentBody from "@Components/ContentBody";
import SettingsBuilder from "@Builders/SettingsBuilder";
import MDIcon from "@Components/MDIcon";
import PluginAboutActivity from "./plugin/PluginAboutActivity";
import Bootloader from "@Bootloader";

class SettingsActivity extends React.Component<{ pushPage: any; popPage: any }, {}> {
  private scriptLosding = native.getPref("enableCustomScriptLoading");

  public componentDidMount() {
    native.electron.discordRPC("Viewing Settings");
  }

  public componentDidUpdate() {
    new Bootloader().styleInit();
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
            <SettingsBuilder isPlugin={false} pluginName="" data={settings} />
          </List>
        </ContentBody>
      </Page>
    );
  }
}

export default SettingsActivity;
