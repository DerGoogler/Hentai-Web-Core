import * as React from "react";
import { Page, Toolbar } from "react-onsenui";
import { hot } from "react-hot-loader/root";
import SettingsBuilder from "./builders/SettingsBuilder";
import { List } from "react-onsenui";
import ContentBody from "./builders/ContentBody";
import { Provider, Translate, Translator } from "react-translated";
import native from "./native";
import ToolbarBuilder from "./builders/ToolbarBuilder";
import settings from "./dataPacks/settings";

class SettingsActivity extends React.Component {
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

export default hot(SettingsActivity);
