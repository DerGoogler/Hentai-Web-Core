import * as ons from "onsenui";
import * as React from "react";
import { isIE } from "react-device-detect";
import { hot } from "react-hot-loader/root";
import { Provider, Translate, Translator } from "react-translated";
import pkg from "./../package.json";
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
import settingsEffect from "./views/Settings/settingsEffect";
import config from "./misc/config";
import android from "./misc/android";
import AnimeTab from "./builders/AnimeTab";
import NSFW from "./views/NSFW";
import Settings from "./views/Settings";
import SFW from "./views/SFW";
import { stringToBoolean } from "./misc/tools";

class MainActivity extends React.Component<{ navigator?: any }> {
  private element!: HTMLElement | null;

  public componentDidMount() {
    // To remvoe the button if is in app opened
    if (window.navigator.userAgent === config.options.userAgent) {
      if ((this.element = document.getElementById("download-app"))) {
        this.element.style.display = "none";
        this.element.setAttribute("title", `Download the last ${pkg.version} Hentai Web version!`);
      }
    }
    settingsEffect("hideFAB", "#fab-element", (element: any) => {
      element.style.display = "none";
    });
  }

  private renderToolbar() {
    return (
      <Toolbar>
        <div className="center">{config.base.title}</div>
        <div className="right">
          <ToolbarButton
            onClick={() => {
              android.reload();
            }}
          >
            <Icon icon="md-refresh"></Icon>
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  }

  private renderTabs() {
    return [
      {
        content: <AnimeTab content={<SFW />} />,
        tab: <Tab label="SFW" />,
      },
      {
        content: <AnimeTab content={<NSFW />} />,
        tab: <Tab label="NSFW" />,
      },
      {
        content: <AnimeTab content={<Settings />} />,
        tab: <Tab label="Settings" />,
      },
    ];
  }

  private renderFixed() {
    return (
      <Translator>
        {({ translate }: any) => (
          <SpeedDial id="fab-element" position="bottom right">
            <Fab>
              <Icon icon="md-more" />
            </Fab>
            <SpeedDialItem
              onClick={() => {
                ons.notification.confirm({
                  message: translate({
                    text: "dialog-message",
                  }),
                  title: translate({
                    text: "dialog-title",
                  }),
                  buttonLabels: [
                    translate({
                      text: "ok",
                    }),
                  ],
                  animation: "default",
                  primaryButtonIndex: 0,
                  cancelable: false,
                });
              }}
            >
              <Icon icon="md-info" />
            </SpeedDialItem>
            <SpeedDialItem
              onClick={() => {
                window.open(
                  translate({
                    text: "repo-link",
                  })
                );
              }}
            >
              <Icon icon="md-github" />
            </SpeedDialItem>
            <SpeedDialItem
              id="download-app"
              onClick={() => {
                window.open(
                  // If the relase code/name is not the package version, it'll not finded
                  `https://github.com/DerGoogler/Hentai-Web/releases/download/${pkg.version}/app-release.apk`
                );
              }}
            >
              <Icon icon="md-download" />
            </SpeedDialItem>
          </SpeedDial>
        )}
      </Translator>
    );
  }

  private tabIndexChecker(): number {
    var get = android.getPref("tabIndex");
    if (get === undefined || get === null || get === "") {
      return 0;
    } else {
      if (android.getPref("saveLastUsedTab") === "true") {
        return Number(get);
      } else {
        return 0;
      }
    }
  }

  public render() {
    if (isIE)
      return (
        <div>
          <Translate text="ie-text" />
        </div>
      );
    return (
      <Page renderToolbar={this.renderToolbar} renderFixed={this.renderFixed}>
        <Tabbar
          // @ts-ignore
          swipeable={stringToBoolean(android.getPref("enableSwipeBetweenTabs"))}
          position="top"
          index={this.tabIndexChecker()}
          // @ts-ignore
          onPreChange={(event: any) => {
            if (event.index != this.tabIndexChecker) {
              android.setPref("tabIndex", event.index);
            }
          }}
          renderTabs={this.renderTabs}
        />
      </Page>
    );
  }
}

export default hot(MainActivity);
