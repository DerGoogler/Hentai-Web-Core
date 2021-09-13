import AnimeTab from "./makers/AnimeTab";
import SFW from "./pages/SFW";
import NSFW from "./pages/NSFW";
import ons from "onsenui";
import React from "react";
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
import {
  isElectron,
  isDesktop,
  isEdgeChromium,
  isSmartTV,
  isWindows,
  isIE,
  isIOS,
  isSafari,
  isMobileSafari,
  isTablet,
} from "react-device-detect";
import { hot } from "react-hot-loader/root";
import config from "./config";

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
              message: "This web app contains +18 content",
              title: "Content",
              buttonLabels: ["Ok"],
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
            window.open("https://github.com/DerGoogler/Hentai-Web");
          }}
        >
          <Icon icon="md-github" />
        </SpeedDialItem>
      </SpeedDial>
    );
  }

  render() {
    if (isIE)
      return <div> IE is not supported. Download Chrome/Opera/Firefox </div>;
    if (isIOS || isMobileSafari || isSafari)
      return <div> iOS/iPhone/Safari are not allowed to view this </div>;
    return (
      <Page renderToolbar={this.renderToolbar} renderFixed={this.renderFixed}>
        <Tabbar
          swipeable={config.base.swipeable}
          position="top"
          renderTabs={this.renderTabs}
        />
      </Page>
    );
  }
}

export default hot(App);
