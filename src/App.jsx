// Makers
import AnimeTab from './makers/AnimeTab';

// Pages
import SFW from './pages/SFW';
import NSFW from './pages/NSFW';
import Settings from './pages/Settings';

// Regular Modules
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
  Icon
} from "react-onsenui";
import { hot } from "react-hot-loader/root";


class App extends React.Component {
  renderToolbar() {
    return (
      <Toolbar>
        <div className="center">Hentai Web</div>
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
        tab: <Tab label="SFW" />
      },
      {
        content: <AnimeTab content={<NSFW />} />,
        tab: <Tab label="NSFW" />
      },
      {
        content: <AnimeTab content={<Settings />} />,
        tab: <Tab label="Settings" />
      }
    ];
  }

  renderFixed() {
    return (
      <SpeedDial position='bottom right'>
        <Fab>
          <Icon icon='md-more' />
        </Fab>
        <SpeedDialItem onClick={() => { window.open('https://github.com/DerGoogler/Hentai-Web/blob/master/src/App.jsx') }}>
          <Icon icon='md-github' />
        </SpeedDialItem>
      </SpeedDial>
    );
  }

  render() {
    return (
      <Page
        renderToolbar={this.renderToolbar}
        renderFixed={this.renderFixed}>
        <Tabbar
          swipeable={true}
          position="top"
          renderTabs={this.renderTabs}
        />
      </Page>
    );
  }
}


export default hot(App);
