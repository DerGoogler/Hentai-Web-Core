import * as React from "react";
import {
  BackButton,
  Button,
  Icon,
  Input,
  ListItem,
  Page,
  Toolbar,
  ToolbarButton,
} from "react-onsenui";
import { hot } from "react-hot-loader/root";
import SettingsBuilder from "./SettingsBuilder";
import { List, ListHeader } from "react-onsenui";
import ContentBody from "../../builders/ContentBody";
import { Provider, Translate, Translator } from "react-translated";
import config from "../../misc/config";
import tools from "../../misc/tools";
import ons from "onsenui";
import native from "../../native";

class SettingsActivity extends React.Component {
  public state = {
    electronWindowWidth: 400,
    electronWindowHright: 750,
  };

  private renderToolbar() {
    return (
      <Toolbar>
        <div className="left">
          <BackButton
            onClick={() => {
              window.location.search = "";
            }}
          >
            Back
          </BackButton>
        </div>
        <div className="center drag--windows">
          <Translate text="settings" />
        </div>
        <div className="right">
          <ToolbarButton
            style={{
              display: tools.typeIF(
                window.navigator.userAgent === "HENTAI_WEB_WINDOWS",
                "",
                "none"
              ),
            }}
            onClick={() => {
              window.Windows.minimize();
            }}
          >
            <Icon icon="md-minus"></Icon>
          </ToolbarButton>
          <ToolbarButton
            style={{
              display: tools.typeIF(
                window.navigator.userAgent === "HENTAI_WEB_WINDOWS",
                "",
                "none"
              ),
            }}
            onClick={() => {
              ons.notification.confirm({
                message: "Do you want to close this app?",
                title: "Close app?",
                buttonLabels: ["Yes", "No"],
                animation: "default",
                primaryButtonIndex: 1,
                cancelable: true,
                callback: (index: number) => {
                  switch (index) {
                    case 0:
                      window.Windows.close();
                      break;

                    default:
                      break;
                  }
                },
              });
            }}
          >
            <Icon icon="md-close"></Icon>
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  }

  public render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <ContentBody>
          <List>
            <ListHeader>
              <Translate text="appearance" />
            </ListHeader>
            <SettingsBuilder
              type="switch"
              style={{
                display: tools.typeIF(native.userAgentEqualAndroid(true), "none", ""),
              }}
              disabled={native.userAgentEqualAndroid(true)}
              _key="useIOSdesign"
            >
              useIOSdesign-string
            </SettingsBuilder>
            <SettingsBuilder type="switch" _key="hideFAB">
              hideFAB-string
            </SettingsBuilder>
            <SettingsBuilder type="switch" _key="hideSearchbar">
              hideSearchbar-string
            </SettingsBuilder>
            <SettingsBuilder
              type="select"
              selectDefaultValue="en"
              selectValue={
                <>
                  <option value="en">English</option>
                  <option value="de">German</option>
                </>
              }
              _key="language"
            >
              language-string
            </SettingsBuilder>

            <ListHeader>
              <Translate text="card" />
            </ListHeader>
            <SettingsBuilder type="switch" _key="fitImageToCard">
              fitImageToCard-string
            </SettingsBuilder>
            <SettingsBuilder type="switch" _key="displayDownload">
              displayDownload-string
            </SettingsBuilder>
            <SettingsBuilder type="switch" _key="removeTitle">
              removeTitle-string
            </SettingsBuilder>

            <ListHeader>
              <Translate text="security" />
            </ListHeader>
            <SettingsBuilder
              type="switch"
              _key="alwaysLogin"
              expandable={true}
              expandableContent={
                <>
                  <List>
                    <ListItem>
                      <div className="left">
                        <img
                          className="list-item__thumbnail"
                          src="https://placekitten.com/g/40/40"
                        />
                      </div>
                      <div className="center">
                        <span className="list-item__title">Cutest kitty</span>
                        <span className="list-item__subtitle">
                          YOU found me, please protect me...
                        </span>
                      </div>
                    </ListItem>
                  </List>
                </>
              }
            >
              alwaysLogin-string
            </SettingsBuilder>
            <SettingsBuilder
              type="switch"
              style={{
                display: tools.typeIF(native.userAgentEqualAndroid(false), "none", ""),
              }}
              disabled={native.userAgentEqualAndroid(false)}
              _key="erudaEnabled"
            >
              erudaEnabled-string
            </SettingsBuilder>

            <ListHeader>
              <Translate text="others" />
            </ListHeader>
            <SettingsBuilder type="switch" _key="enableSwipeBetweenTabs">
              enableSwipeBetweenTabs-string
            </SettingsBuilder>
            <SettingsBuilder type="switch" _key="saveLastUsedTab">
              saveLastUsedTab-string
            </SettingsBuilder>
            <SettingsBuilder type="switch" _key="disableSplashscreen">
              disableSplashscreen-string
            </SettingsBuilder>

            <section
              className="electron"
              style={{
                display: tools.typeIF(native.userAgentEqualWindows(true), "", "none"),
              }}
            >
              <ListHeader>Electron</ListHeader>
              <SettingsBuilder
                type="select"
                selectDefaultValue="400"
                _key="electronWindowWidth"
                selectValue={
                  <>
                    <option value="400">400</option>
                    <option value="500">500</option>
                    <option value="600">600</option>
                    <option value="700">700</option>
                    <option value="800">800</option>
                    <option value="900">900</option>
                    <option value="1000">1000</option>
                    <option value="1100">1100</option>
                    <option value="1200">1200</option>
                    <option value="1300">1300</option>
                    <option value="1400">1400</option>
                    <option value="1500">1500</option>
                    <option value="1600">1600</option>
                    <option value="1700">1700</option>
                  </>
                }
              >
                Screen/Window Width
              </SettingsBuilder>
              <SettingsBuilder
                type="select"
                selectDefaultValue="700"
                _key="electronWindowHeigth"
                selectValue={
                  <>
                    <option value="400">400</option>
                    <option value="500">500</option>
                    <option value="600">600</option>
                    <option value="700">700</option>
                    <option value="800">800</option>
                    <option value="900">900</option>
                    <option value="1000">1000</option>
                  </>
                }
              >
                Screen/Window Height
              </SettingsBuilder>
            </section>
          </List>
        </ContentBody>
      </Page>
    );
  }
}

export default hot(SettingsActivity);
