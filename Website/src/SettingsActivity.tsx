import * as React from "react";
import {
  BackButton,
  Button,
  Icon,
  Input,
  ListItem,
  ListTitle,
  Page,
  Toolbar,
  ToolbarButton,
} from "react-onsenui";
import { hot } from "react-hot-loader/root";
import SettingsBuilder from "./builders/SettingsBuilder";
import { List, ListHeader } from "react-onsenui";
import ContentBody from "./builders/ContentBody";
import { Provider, Translate, Translator } from "react-translated";
import config from "./misc/config";
import tools from "./misc/tools";
import ons from "onsenui";
import native from "./native";
import ToolbarBuilder from "./builders/ToolbarBuilder";
import { Badge } from "react-bootstrap";

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
            <ListTitle>
              <Translate text="appearance" />
            </ListTitle>
            <SettingsBuilder type="switch" _key="enableDarkmode">
              enableDarkmode-string
            </SettingsBuilder>
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

            <ListTitle>
              <Translate text="card" />
            </ListTitle>
            <SettingsBuilder type="switch" _key="fitImageToCard">
              fitImageToCard-string
            </SettingsBuilder>
            <SettingsBuilder type="switch" _key="displayDownload">
              displayDownload-string
            </SettingsBuilder>
            <SettingsBuilder type="switch" _key="removeTitle">
              removeTitle-string
            </SettingsBuilder>

            <ListTitle>
              <Translate text="security" />
            </ListTitle>
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

            <ListTitle>
              <Translate text="others" />
            </ListTitle>
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
              <ListTitle>
                Electron <Badge bg="danger">DANGER</Badge>
              </ListTitle>
              <SettingsBuilder
                type="select"
                selectDefaultValue="<width>375</width><height>812</height>"
                _key="electron.screenSizeInUse"
                callback={(e: any, _key: string) => {
                  const key = "electron.WindowSize";
                  const regex = /<width>(.*?)<\/width><height>(.*?)<\/height>/gm;
                  const width = Number(e.target.value.replace(regex, "$1"));
                  const height = Number(e.target.value.replace(regex, "$2"));

                  ons.notification.confirm({
                    message: `You want change the screen size to ${e.target.value.replace(
                      regex,
                      "$1x$2"
                    )}?`,
                    title: "Change size?",
                    buttonLabels: ["Yes", "No"],
                    animation: "default",
                    modifier: native.checkPlatformForBorderStyle,
                    primaryButtonIndex: 1,
                    cancelable: true,
                    callback: (index: number) => {
                      switch (index) {
                        case 0:
                          window.Windows.setPref(key + ".width", width);
                          window.Windows.setPref(key + ".height", height);
                          window.Windows.setPref(_key, e.target.value);
                          window.Windows.setWindowSize(width, height);
                          break;

                        default:
                          e.target.value = window.Windows.getPref(_key);
                          break;
                      }
                    },
                  });
                }}
                selectValue={
                  <>
                    <option value="<width>375</width><height>812</height>">iPhone X</option>
                    <option value="<width>540</width><height>720</height>">Surface Duo</option>
                    <option value="<width>360</width><height>640</height>">
                      Moto G4 / Galaxy S5
                    </option>
                    <option value="<width>411</width><height>731</height>">Pixel 2</option>
                    <option value="<width>411</width><height>823</height>">Pixel 2 XL</option>
                    <option value="<width>280</width><height>653</height>">Galaxy Fold</option>
                    <option value="<width>1024</width><height>600</height>">Nest Hub</option>
                    <option value="<width>1280</width><height>800</height>">Nest Hub Max</option>
                  </>
                }
              >
                Screen/Window Size
              </SettingsBuilder>
              <SettingsBuilder
                style={{
                  display: tools.typeIF(native.userAgentEqualWindows(true), "", "none"),
                }}
                type="switch"
                _key="electron.devTools"
              >
                Enable DevTools
              </SettingsBuilder>
              <SettingsBuilder
                style={{
                  display: tools.typeIF(native.userAgentEqualWindows(true), "", "none"),
                }}
                type="switch"
                _key="electron.alwaysOnTop"
              >
                Always on top
              </SettingsBuilder>
            </section>
          </List>
        </ContentBody>
      </Page>
    );
  }
}

export default hot(SettingsActivity);
