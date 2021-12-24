import * as React from "react";
import { hot } from "react-hot-loader/root";
import SettingsSwitch from "./SettingsSwitch";
import { List, ListHeader } from "react-onsenui";
import ContentBody from "../../builders/ContentBody";
import { Provider, Translate, Translator } from "react-translated";
import SettingsSelect from "./SettingsSelect";
import tools from "../../misc/tools";
import config from "../../misc/config";

class Settings extends React.Component {
  public render() {
    return (
      <ContentBody>
        <List>
          <ListHeader>
            <Translate text="appearance" />
          </ListHeader>
          <SettingsSwitch _key="enableDarkmode" disabled={true}>
            enableDarkmode-string
          </SettingsSwitch>
          <SettingsSwitch
            disabled={window.navigator.userAgent === config.options.userAgent}
            _key="useIOSdesign"
          >
            useIOSdesign-string
          </SettingsSwitch>
          <SettingsSwitch _key="hideFAB">hideFAB-string</SettingsSwitch>
          <SettingsSwitch _key="hideSearchbar">hideSearchbar-string</SettingsSwitch>
          <SettingsSelect _key="language">language-string</SettingsSelect>

          <ListHeader>
            <Translate text="card" />
          </ListHeader>
          <SettingsSwitch _key="fitImageToCard">fitImageToCard-string</SettingsSwitch>
          <SettingsSwitch _key="displayDownload">displayDownload-string</SettingsSwitch>
          <SettingsSwitch _key="removeTitle">removeTitle-string</SettingsSwitch>

          <ListHeader>
            <Translate text="security" />
          </ListHeader>
          <SettingsSwitch _key="alwaysLogin">alwaysLogin-string</SettingsSwitch>
          <SettingsSwitch
            disabled={window.navigator.userAgent != config.options.userAgent}
            _key="erudaEnabled"
          >
            erudaEnabled-string
          </SettingsSwitch>

          <ListHeader>
            <Translate text="others" />
          </ListHeader>
          <SettingsSwitch _key="enableSwipeBetweenTabs">
            enableSwipeBetweenTabs-string
          </SettingsSwitch>
          <SettingsSwitch _key="saveLastUsedTab">saveLastUsedTab-string</SettingsSwitch>
          <SettingsSwitch _key="disableSplashscreen">disableSplashscreen-string</SettingsSwitch>
        </List>
      </ContentBody>
    );
  }
}

export default hot(Settings);
