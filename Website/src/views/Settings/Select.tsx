import * as React from "react";
import { hot } from "react-hot-loader/root";
import { ListItem, Select, Switch } from "react-onsenui";
import { Provider, Translate, Translator } from "react-translated";

class Selectt extends React.Component<{ _key: string }> {
  private element!: HTMLElement | null;

  /**
   * Check if an key is there
   * @param key
   * @returns {String}
   */
  private getSetting(key: string): string {
    var get = localStorage.getItem(key);
    if (get === undefined || get === null || get === "") {
      return "en";
    } else {
      return get;
    }
  }

  private setSetting(key: string, data: any) {
    localStorage.setItem(key, data);
  }

  public render() {
    return (
      <ListItem>
        <div className="center">
          <Translate text={this.props.children} />
        </div>
        <div className="right">
          <Select
            id="choose-sel"
            value={this.getSetting(this.props._key)}
            onChange={(e: any) => {
              this.setSetting(this.props._key, e.target.value);
            }}
          >
            <option value="en">English</option>
            <option value="de">German</option>
          </Select>
        </div>
      </ListItem>
    );
  }
}

export default hot(Selectt);
