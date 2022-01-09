import * as React from "react";
import { Page, Toolbar } from "react-onsenui";
import { List } from "react-onsenui";
import { Provider, Translate, Translator } from "react-translated";
import native from "@Native";
import ToolbarBuilder from "@Builders/ToolbarBuilder";
import ContentBody from "@Builders/ContentBody";
import SettingsBuilder from "@Builders/SettingsBuilder";
import settings from "@DataPacks/settings";
import Bootloader from "@Bootloader";

class SettingsActivity extends React.Component {
  public componentDidMount() {
    new Bootloader().doLogin();
  }

  private renderToolbar() {
    return (
      <Toolbar>
        <ToolbarBuilder
          title={<Translate text="settings" />}
          hasBackButton={true}
          hasWindowsButtons={true}
          hasDarkMode={true}
        />
      </Toolbar>
    );
  }

  public render() {
    return (
      <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
        <ContentBody>
          <List>
            <SettingsBuilder data={settings} />
          </List>
        </ContentBody>
      </Page>
    );
  }
}

export default SettingsActivity;
