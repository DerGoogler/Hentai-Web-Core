import AnimeTab from "./buildeers/AnimeTab";
import SFW from "./views/SFW";
import NSFW from "./views/NSFW";
import * as ons from "onsenui";
import * as React from "react";
import { isIE } from "react-device-detect";
import { hot } from "react-hot-loader/root";
import config from "./misc/config";
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
import string from "./misc/strings";

class App extends React.Component {
  renderToolbar() {
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

  renderTabs() {
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

  renderFixed() {
    return (
      <SpeedDial position="bottom right">
        <Fab>
          <Icon icon="md-more" />
        </Fab>
        <SpeedDialItem
          onClick={() => {
            ons.notification.confirm({
              message: string.dialog_message,
              title: string.dialog_title,
              buttonLabels: [string.ok],
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
            window.open(string.repo_link);
          }}
        >
          <Icon icon="md-github" />
        </SpeedDialItem>
      </SpeedDial>
    );
  }

  render() {
    if (isIE) return <div> {string.ie_text} </div>;
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
