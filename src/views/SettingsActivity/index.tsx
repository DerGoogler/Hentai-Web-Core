import * as React from "react";
import { Page, Toolbar } from "react-onsenui";
import { List } from "react-onsenui";
import settings from "@DataPacks/settings";
import native from "@Native/index";
import { ToolbarBuilder, ListViewBuilder } from "@Builders";
import ContentBody from "@Components/ContentBody";
import { string } from "@Strings";
import { Props, States } from "./interface";

class SettingsActivity extends React.Component<Props, States> {
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
            <ListViewBuilder isPlugin={false} pluginName="" data={settings} />
          </List>
        </ContentBody>
      </Page>
    );
  }
}

export default SettingsActivity;
