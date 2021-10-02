import React from "react";
import { hot } from "react-hot-loader/root";
import { List, ListHeader, ListItem, Switch } from "react-onsenui";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Settings extends React.Component {
  

  onDarkmodeChange(e) {
    cookies.set("darkmode", e.target.checked, { path: "/" });
  }

  render() {
    return (
      <>
        <List>
          <ListHeader>Display</ListHeader>
          <ListItem>
            <div className="center">Darkmode</div>
            <div className="right">
              <Switch
                checked={cookies.get("darkmode")}
                onChange={this.onDarkmodeChange}
              ></Switch>
            </div>
          </ListItem>
        </List>
      </>
    );
  }
}

export default hot(Settings);
