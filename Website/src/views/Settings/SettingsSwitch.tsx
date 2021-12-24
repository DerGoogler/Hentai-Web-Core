import * as React from "react";
import { hot } from "react-hot-loader/root";
import { ListItem, Switch } from "react-onsenui";
import { Provider, Translate, Translator } from "react-translated";
import { android } from "../../misc/android";

/**
 * Create an precreated switch
 */
class SettingsSwitch extends React.Component<{
  _key: string;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}> {
  private element!: HTMLElement | null;

  /**
   * Check if an key is there
   * @param key
   * @returns {Boolean}
   */
  private getSetting(key: string): boolean {
    var get = android.getPref(key);
    if (get === undefined || get === null || get === "" || get === "false") {
      return false;
    } else {
      return true;
    }
  }

  private setSetting(key: string, data: any) {
    android.setPref(key, data);
  }

  public render() {
    return (
      <ListItem id={this.props.id} style={this.props.style}>
        <div className="center">
          <Translate text={this.props.children} />
        </div>
        <div className="right">
          <Switch
            // @ts-ignore
            checked={this.getSetting(this.props._key)}
            disabled={this.props.disabled}
            onChange={(e: any) => {
              this.setSetting(this.props._key, e.target.checked);
            }}
          ></Switch>
        </div>
      </ListItem>
    );
  }
}

export default hot(SettingsSwitch);
