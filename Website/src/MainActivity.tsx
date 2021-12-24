import * as ons from "onsenui";
import * as React from "react";
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
import config from "./misc/config";
import { android } from "./misc/android";
import AnimeTab from "./builders/AnimeTab";
import NSFW from "./views/NSFW";
import Settings from "./views/Settings";
import SFW from "./views/SFW";
import tools from "./misc/tools";
import Bootloader from "./index";
import LoginActivity from "./LoginActivity";
import { NavItem } from "react-bootstrap";

class MainActivity extends React.Component {
  private element!: HTMLElement | null;

  public state = {
    settings_string: "",
  };

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

    if (android.getPref("loggedIn") === "false") {
      new Bootloader().loadActivity(<LoginActivity />);
    }
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
    const sections = [
      {
        label: "SFW",
        content: <SFW />,
      },
      {
        label: "NSFW",
        content: <NSFW />,
      },
      {
        label: "Settings",
        content: <Settings />,
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
    return (
      <Page renderToolbar={this.renderToolbar} renderFixed={this.renderFixed}>
        <Tabbar
          // @ts-ignore
          swipeable={tools.stringToBoolean(android.getPref("enableSwipeBetweenTabs"))}
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
