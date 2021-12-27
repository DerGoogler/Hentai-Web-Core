import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Provider, Translate, Translator } from "react-translated";
import pkg from "./../package.json";
import { Page, Toolbar, Tabbar, ToolbarButton, Icon } from "react-onsenui";
import config from "./misc/config";
import native from "./native";
import AnimeContent from "./builders/AnimeContent";
import tools from "./misc/tools";
import { nsfwData, sfwData } from "./dataPacks/hmtai";
import Bootloader from "./index";
import LoginActivity from "./LoginActivity";
import ToolbarBuilder from "./builders/ToolbarBuilder";
import TabbarBuilder from "./builders/TabbarBuilder";

class MainActivity extends React.Component<{ router?: any }> {
  private element!: HTMLElement | null;

  public componentDidMount() {
    // To remvoe the button if is in app opened
    if (window.navigator.userAgent === config.options.userAgent) {
      if ((this.element = document.getElementById("download-app"))) {
        this.element.style.display = "none";
        this.element.setAttribute("title", `Download the last ${pkg.version} Hentai Web version!`);
      }
    }
    tools.settingsEfect("hideFAB", "#fab-element", (element: any) => {
      element.style.display = "none";
    });

    if (native.getPref("loggedIn") === "false") {
      new Bootloader().loadActivity(<LoginActivity />);
    }
  }

  private renderToolbar() {
    return (
      <Toolbar>
        <ToolbarBuilder
          title="Hentai Web"
          hasBackButton={false}
          hasWindowsButtons={true}
          addToolbarButton={
            <>
              <ToolbarButton
                onClick={() => {
                  window.location.search = "activity=settings";
                }}
              >
                <Icon icon="md-settings"></Icon>
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
      <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
        <Tabbar
          // @ts-ignore
          swipeable={false}
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
      </Page>
    );
  }
}

export default hot(MainActivity);
