import native from "@Native/index";
import { PluginAboutDialogTypes, PluginAboutDialogTypes_States } from "@Types/PluginAboutDialog";
import * as React from "react";
import { Dialog, List, ListItem, Page } from "react-onsenui";
import MDIcon from "./MDIcon";

class PluginAboutBuilder extends React.Component<
  PluginAboutDialogTypes,
  PluginAboutDialogTypes_States
> {
  public constructor(props: any) {
    super(props);
    this.state = {
      isAuthorDialogOpen: false,
    };
  }

  public componentDidUpdate() {
    if (this.state.isAuthorDialogOpen) {
      native.android.setStatusbarColor("#240a45");
    } else {
      native.android.setStatusbarColor("#4a148c");
    }
  }

  private handleClick = () => {
    this.setState({ isAuthorDialogOpen: true });
  };

  private handleCancel = () => {
    this.setState({ isAuthorDialogOpen: false });
  };

  public render() {
    const { pluginName } = this.props;
    return (
      <>
        <ListItem tappable onClick={this.handleClick}>
          <div className="left">
            <MDIcon icon="account_circle" size="24" />
          </div>
          <div className="center">Author</div>
        </ListItem>

        <Dialog
          key={pluginName}
          onCancel={this.handleCancel}
          isOpen={this.state.isAuthorDialogOpen}
        >
          <List>
            {(() => {
              if (
                native.getPref(
                  "Plugin.Settings." + pluginName + ".pluginInformation.pluginAuthor"
                ) === (null || "" || undefined)
              ) {
                return;
              } else {
                return (
                  <ListItem tappable onClick={this.handleClick}>
                    <div className="left">
                      <MDIcon icon="account_circle" size="24" />
                    </div>
                    <div className="center">
                      Author:{" "}
                      {native.getPref(
                        "Plugin.Settings." + pluginName + ".pluginInformation.pluginAuthor"
                      )}
                    </div>
                  </ListItem>
                );
              }
            })()}
            {(() => {
              if (
                native.getPref(
                  "Plugin.Settings." + pluginName + ".pluginInformation.pluginVersion"
                ) === (null || "" || undefined)
              ) {
                return;
              } else {
                return (
                  <ListItem tappable onClick={this.handleClick}>
                    <div className="left">
                      <MDIcon icon="fact_check" size="24" />
                    </div>
                    <div className="center">
                      Version:{" "}
                      {native.getPref(
                        "Plugin.Settings." + pluginName + ".pluginInformation.pluginVersion"
                      )}
                    </div>
                  </ListItem>
                );
              }
            })()}
            {(() => {
              if (
                native.getPref(
                  "Plugin.Settings." + pluginName + ".pluginInformation.pluginLanguage"
                ) === (null || "" || undefined)
              ) {
                return;
              } else {
                return (
                  <ListItem tappable onClick={this.handleClick}>
                    <div className="left">
                      <MDIcon icon="language" size="24" />
                    </div>
                    <div className="center">
                      Language:{" "}
                      {native.getPref(
                        "Plugin.Settings." + pluginName + ".pluginInformation.pluginLanguage"
                      )}
                    </div>
                  </ListItem>
                );
              }
            })()}
          </List>
        </Dialog>
      </>
    );
  }
}

export default PluginAboutBuilder;
