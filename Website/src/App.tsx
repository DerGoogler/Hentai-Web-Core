import AnimeTab from "./builders/AnimeTab";
import SFW from "./views/SFW";
import NSFW from "./views/NSFW";
import * as ons from "onsenui";
import * as React from "react";
import { isIE } from "react-device-detect";
import { hot } from "react-hot-loader/root";
import config from "./misc/config";
import { Provider, Translate, Translator } from "react-translated";
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

class App extends React.Component {
  private element!: HTMLElement | null;

  private renderToolbar() {
    return (
      <Toolbar>
        <div className="center">{config.base.title}</div>
        <div className="right">
          <ToolbarButton
            onClick={() => {
              location.reload();
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
    ];
  }

  private renderFixed() {
    return (
      <Translator>
        {({ translate }: any) => (
          <SpeedDial position="bottom right">
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
          </SpeedDial>
        )}
      </Translator>
    );
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
          swipeable={config.base.swipeable}
          position="top"
          index={0}
          renderTabs={this.renderTabs}
        />
      </Page>
    );
  }
}

export default hot(App);
