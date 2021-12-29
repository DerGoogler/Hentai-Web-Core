import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Provider, Translate, Translator } from "react-translated";
import pkg from "./../package.json";
import {
  Page,
  Toolbar,
  Tabbar,
  Fab,
  SpeedDial,
  ToolbarButton,
  Icon,
  Popover,
  Button,
} from "react-onsenui";
import config from "./misc/config";
import native from "./native";
import AnimeContent from "./builders/AnimeContent";
import tools from "./misc/tools";
import { nsfwData, sfwData } from "./dataPacks/hmtai";
import Bootloader from "./index";
import LoginActivity from "./LoginActivity";
import ToolbarBuilder from "./builders/ToolbarBuilder";
import SpeedDialBuilder from "./builders/SpeedDialBuilder";
import TabbarBuilder from "./builders/TabbarBuilder";
import ActionSheetBuilder from "./builders/ActionScheetBuilder";

class MainActivity extends React.Component<{}, { isContextOpen: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      isContextOpen: false,
    };
  }

  public componentDidMount() {
    if (native.userAgentEqualAndroid(true) || native.userAgentEqualWindows(true)) {
      tools.ref("download-app", (e: HTMLElement) => {
        e.style.display = "none";
        e.setAttribute("title", `Download the last ${pkg.version} Hentai Web version!`);
      });
    }
    tools.settingsEfect("hideFAB", "#fab-element", (element: any) => {
      element.style.display = "none";
    });

    Bootloader.doLogin();

    tools.ref("menu-click", (e: HTMLElement) => {
      e.addEventListener("click", this.handleClick);
    });
  }

  private handleClick = () => {
    this.setState({ isContextOpen: true });
  };

  private handleCancel = () => {
    this.setState({ isContextOpen: false });
  };

  private renderToolbar() {
    return (
      <Toolbar>
        <ToolbarBuilder
          title="Hentai Web"
          hasBackButton={false}
          hasWindowsButtons={true}
          addToolbarButton={
            <>
              <ToolbarButton id="menu-click" onClick={this.handleClick}>
                <Icon icon="md-menu"></Icon>
              </ToolbarButton>
            </>
          }
          addToolbarButtonPosition="left"
          hasDarkMode={true}
        />
      </Toolbar>
    );
  }

  private renderTabs() {
    return TabbarBuilder([
      {
        label: "SFW",
        content: <AnimeContent name="SFW" data={sfwData} />,
      },
      {
        label: "NSFW",
        content: <AnimeContent name="NSFW" data={nsfwData} />,
      },
    ]);
  }

  private renderFixed() {
    return (
      <Translator>
        {({ translate }: any) => (
          // @ts-ignore
          <SpeedDial id="fab-element" position="bottom right">
            <Fab>
              <Icon icon="md-more" />
            </Fab>
            {SpeedDialBuilder}
          </SpeedDial>
        )}
      </Translator>
    );
  }

  private tabIndexChecker(): number {
    var get = native.getPref("tabIndex");
    if (get === undefined || get === null || get === "") {
      return 0;
    } else {
      if (native.getPref("saveLastUsedTab") === "true") {
        return Number(get);
      } else {
        return 0;
      }
    }
  }

  public render() {
    return (
      <Page
        modifier={native.checkPlatformForBorderStyle}
        renderFixed={this.renderFixed}
        renderToolbar={this.renderToolbar}
      >
        <Tabbar
          // @ts-ignore
          swipeable={tools.stringToBoolean(native.getPref("enableSwipeBetweenTabs"))}
          position="top"
          index={this.tabIndexChecker()}
          // @ts-ignore
          onPreChange={(event: any) => {
            if (event.index != this.tabIndexChecker) {
              native.setPref("tabIndex", event.index);
            }
          }}
          renderTabs={this.renderTabs}
        />

        <ActionSheetBuilder
          options={{
            title: "Menu",
            onCancel: this.handleCancel,
            isOpen: this.state.isContextOpen,
            modifier: native.checkPlatformForBorderStyle,
          }}
          data={[
            {
              text: "settings",
              icon: "md-settings",
              onClick: () => {
                native.activity.load("settings");
              },
            },
            {
              text: "Open app path",
              icon: "md-file",
              style: { display: tools.typeIF(native.userAgentEqualWindows(true), "", "none") },
              onClick: () => {
                window.Windows.openPath(window.Windows.appGetPath("userData"));
              },
            },
            {
              text: "Cancel",
              icon: "md-close",
              modifier: native.checkPlatformForBorderStyle,
              onClick: this.handleCancel,
            },
          ]}
        />
      </Page>
    );
  }
}

export default hot(MainActivity);
