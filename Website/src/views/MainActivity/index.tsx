import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Provider, Translate, Translator } from "react-translated";
import pkg from "./../../../package.json";
import {
  Page,
  Toolbar,
  Tab,
  Tabbar,
  Fab,
  SpeedDial,
  SpeedDialItem,
  ToolbarButton,
  Icon,
} from "react-onsenui";
import config from "../../misc/config";
import native from "../../native";
import AnimeTab from "../../builders/AnimeTab";
import AnimeContent from "../../builders/AnimeContent";
import tools from "../../misc/tools";
import { nsfwData, sfwData } from "../../dataPacks/hmtai";
import Bootloader from "../../index";
import LoginActivity from "../../LoginActivity";
import SpeedDialBuilder from "./SpeedDialBuilder";
import ons from "onsenui";

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
        <div className="center drag--windows">{config.base.title}</div>
        <div className="right">
          <ToolbarButton
            onClick={() => {
              window.location.search = "activity=settings";
            }}
          >
            <Icon icon="md-settings"></Icon>
          </ToolbarButton>
          <ToolbarButton
            // Close button for the Windows app
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
            // Close button for the Windows app
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

  private renderTabs() {
    const sections = [
      {
        label: "SFW",
        content: <AnimeContent name="SFW" data={sfwData} />,
      },
      {
        label: "NSFW",
        content: <AnimeContent name="NSFW" data={nsfwData} />,
      },
    ];

    return sections.map((item) => {
      return {
        content: <AnimeTab key={item.label} content={item.content} />,
        // @ts-ignore
        tab: <Tab key={item.label} label={item.label} />,
      };
    });
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
      <Page renderToolbar={this.renderToolbar} renderFixed={this.renderFixed}>
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
      </Page>
    );
  }
}

export default hot(MainActivity);
