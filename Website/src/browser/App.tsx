import * as React from "react";
import { NavBar, NavBarLink, SystemThemeFollower } from "react-windows-ui";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import SFW from "./views/SFW";
import NSFW from "./views/NSFW";
import config from "../misc/config";

class BrowserApp extends React.Component {
  public render() {
    return (
      <>
        <Router basename={window.location.pathname}>
          <SystemThemeFollower />

          <NavBar
            title={config.base.title}
            titleShort="H"
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
            <Route path="/" exact>
              <SFW />
            </Route>
            <Route path="/nsfw">
              <NSFW />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default hot(BrowserApp);
