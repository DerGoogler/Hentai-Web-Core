import * as React from "react";
import { Dialog, ListItem, ListTitle, Page, Toolbar } from "react-onsenui";
import { List } from "react-onsenui";
import { Provider, Translate, Translator } from "react-translated";
import settings from "@DataPacks/settings";
import native from "@Native/index";
import ToolbarBuilder from "@Builders/ToolbarBuilder";
import ContentBody from "@Builders/ContentBody";
import SettingsBuilder from "@Builders/SettingsBuilder";
import MDIcon from "@Builders/MDIcon";

class SettingsActivity extends React.Component<{ popPage: any }, { isAuthorDialogOpen: boolean }> {
  private customSettings = native.getPref("PluginSettings");
  private scriptLosding = native.getPref("enableCustomScriptLoading");

  public constructor(props: any) {
    super(props);
    this.state = {
      isAuthorDialogOpen: false,
    };
  }

  public componentDidMount() {
    native.electron.discordRPC("Viewing Settings");
  }

  private renderToolbar = () => {
    return (
      <Toolbar>
        <ToolbarBuilder
          title={<Translate text="settings" />}
          onBackButton={this.props.popPage}
          hasWindowsButtons={true}
          hasDarkMode={true}
        />
      </Toolbar>
    );
  };

  private handleClick = () => {
    this.setState({ isAuthorDialogOpen: true });
  };

  private handleCancel = () => {
    this.setState({ isAuthorDialogOpen: false });
  };

  public render() {
    let pas,
      customPlugins = null;

    if (native.userAgentEqualWindows(true) || native.userAgentEqualAndroid(true)) {
      pas = JSON.parse(native.fs.readFile(native.getPref("electron.hardDevice"), "plugins.json"));
      customPlugins = pas.map((item: string) => (
        <>
          {(() => {
            if (this.customSettings === (null || "" || undefined)) {
              return;
            } else {
              if (this.scriptLosding === "true") {
                if (native.getPref("Plugin.Settings." + item + ".name") === item) {
                  return (
                    <>
                      <List modifier="inset">
                        <ListItem tappable onClick={this.handleClick}>
                          <div className="left">
                            <MDIcon icon="account_circle" size="24" />
                          </div>
                          <div className="center">Author</div>
                        </ListItem>
                        <SettingsBuilder
                          isPlugin={true}
                          pluginName={item}
                          data={JSON.parse(native.getPref("Plugin.Settings." + item + ".settings"))}
                        />
                      </List>
                      <Dialog
                        key={item}
                        onCancel={this.handleCancel}
                        isOpen={this.state.isAuthorDialogOpen}
                      >
                        <List>
                          {(() => {
                            if (
                              native.getPref(
                                "Plugin.Settings." + item + ".pluginInformation.pluginAuthor"
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
                                      "Plugin.Settings." + item + ".pluginInformation.pluginAuthor"
                                    )}
                                  </div>
                                </ListItem>
                              );
                            }
                          })()}
                          {(() => {
                            if (
                              native.getPref(
                                "Plugin.Settings." + item + ".pluginInformation.pluginVersion"
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
                                      "Plugin.Settings." + item + ".pluginInformation.pluginVersion"
                                    )}
                                  </div>
                                </ListItem>
                              );
                            }
                          })()}
                          {(() => {
                            if (
                              native.getPref(
                                "Plugin.Settings." + item + ".pluginInformation.pluginLanguage"
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
                                      "Plugin.Settings." +
                                        item +
                                        ".pluginInformation.pluginLanguage"
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
                } else {
                  return;
                }
              } else {
                return;
              }
            }
          })()}
        </>
      ));
    }

    return (
      <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
        <ContentBody>
          <List>
            <SettingsBuilder isPlugin={false} pluginName="" data={settings} />
          </List>
          {customPlugins}
          <div style={{ padding: "8px" }}></div>
        </ContentBody>
      </Page>
    );
  }
}

export default SettingsActivity;
