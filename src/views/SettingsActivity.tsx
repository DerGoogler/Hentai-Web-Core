import * as React from "react";
import { ListItem, Page, Toolbar } from "react-onsenui";
import { List } from "react-onsenui";
import settings from "@DataPacks/settings";
import native from "@Native/index";
import ToolbarBuilder from "@Builders/ToolbarBuilder";
import ContentBody from "@Components/ContentBody";
import SettingsBuilder from "@Builders/SettingsBuilder";
import Bootloader from "@Bootloader";
import {string} from "@Strings";

class SettingsActivity extends React.Component<{ pushPage: any; popPage: any }, {}> {
  public componentDidMount() {
    native.electron.discordRPC("Viewing Settings");
  }

  private renderToolbar = () => {
    return (
      <Toolbar>
        <ToolbarBuilder
          title={string.settings}
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
