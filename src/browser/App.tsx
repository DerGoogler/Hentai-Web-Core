import * as React from "react";
import { NavBar, NavBarLink, SystemThemeFollower } from "react-windows-ui";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import SFW from "./pages/SFW";
import NSFW from "./pages/NSFW";
import config from "../config";

class BrowserApp extends React.Component {
  render() {
    return (
      <>
        <Router basename="hentai-web">
          <SystemThemeFollower />

          <NavBar
            title={config.base.title}
            //titleShort="R" render text or icons
            //mobileHasIcons={true}
            shadowOnScroll={true}
          >
            <h1>Pages</h1>
            <div className="app-hr"></div>

            <NavBarLink
              to="/"
              exact={true}
              text="SFW"
              icon={<i className="icons10-home"></i>}
            />

            <NavBarLink
              to="/nsfw"
              text="NSFW"
              icon={<i className="icons10-grid-2"></i>}
            />
          </NavBar>

          <Switch>
            <Route path="/" component={SFW} exact />
            <Route path="/nsfw" component={NSFW} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default hot(BrowserApp);
