import * as React from "react";
import pkg from "./../../../package.json";
import { Page, Toolbar, Tabbar, Fab, ToolbarButton, Icon } from "react-onsenui";
import native from "@Native/index";
import tools from "@Misc/tools";
import { ToolbarBuilder, TabbarBuilder, ListDialogBuilder } from "@Builders";
import AnimeContent from "@Components/AnimeContent";
import MDIcon from "@Components/MDIcon";
import News from "@Components/News";
import { BuildPluginActivity, ChangelogActivity, PluginsActivity, SettingsActivity, LicenseActivity } from "@Views";
import images from "@DataPacks/images";
import { string } from "@Strings";
import { Props, States } from "./interface";

class MainActivity extends React.Component<Props, States> {
  public constructor(props: any) {
    super(props);
    this.state = {
      isContextOpen: false,
      sfw: images.sfw,
      nsfw: images.nsfw,
    };
  }

  public componentDidMount = () => {
    if (native.isAndroid || native.isWindows) {
      tools.ref("download-app", (e: HTMLElement) => {
        e.style.display = "none";
        e.setAttribute("title", `Download the last ${pkg.version} Hentai Web version!`);
      });

      if (native.getPref("hideFAB") === "true") {
        tools.ref("fab-element", (element: HTMLElement) => {
          element.style.display = "none";
        });
      }

      native.electron.discordRPC("Viewing SFW Images");
    }

    tools.ref("menu-click", (e: HTMLElement) => {
      e.addEventListener("click", this.handleClick);
    });

    // Get changelog
    tools.getMisc("changelog.yaml", (data: any) => {
      if (native.isAndroid || native.isWindows) {
        if (data.version.toString() === native.version.get) {
          console.log("Newst version installed");
        } else {
          this.props.pushPage({
            activity: ChangelogActivity,
            key: "changelog",
            changelog: {
              version: data.version,
              changes: data.changes,
              package: {
                android: data.packages.android,
                windows: data.packages.windows,
              },
            },
          });
        }
      }
    });
  };

  private handleClick = () => {
    this.setState({ isContextOpen: true });
  };

  private handleCancel = () => {
    this.setState({ isContextOpen: false });
  };

  private renderToolbar() {
    return (
      <Toolbar>
        <ToolbarBuilder
          title={"Hentai Web"}
          hasWindowsButtons={true}
          addToolbarButton={
            <>
              <ToolbarButton id="menu-click" onClick={this.handleClick}>
                <MDIcon icon="menu" size="24" ignoreDarkmode={true}></MDIcon>
              </ToolbarButton>
            </>
          }
          addToolbarButtonPosition="left"
        />
      </Toolbar>
    );
  }

  private renderTabs = () => {
    if (native.getPref("disableNSFW") === "true" || native.isInstagram || native.isFacebook) {
      return TabbarBuilder([
        {
          label: "SFW",
          content: <AnimeContent name="SFW" data={this.state.sfw} />,
        },
        {
          label: "NEWS",
          content: <News />,
        },
      ]);
    } else {
      return TabbarBuilder([
        {
          label: "SFW",
          content: <AnimeContent name="SFW" data={this.state.sfw} />,
        },
        {
          label: "NSFW",
          content: <AnimeContent name="NSFW" data={this.state.nsfw} />,
        },
        {
          label: "NEWS",
          content: <News />,
        },
      ]);
    }
  };

  private tabIndexChecker(): number {
    var get = native.getPref("tabIndex");
    if (get === undefined || get === null || get === "") {
      return 0;
    } else {
      if (native.getPref("saveLastUsedTab") === "true") {
        return Number(get);
      } else {
        return 0;
      }
    }
  }

  public render = () => {
    return (
      <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
        <Tabbar
          // @ts-ignore
          swipeable={tools.stringToBoolean(native.getPref("enableSwipeBetweenTabs"))}
          position={native.getPref("enableBottomTabbar") === "true" ? "bottom" : "top"}
          index={this.tabIndexChecker()}
          // @ts-ignore
          onPreChange={(event: any) => {
            event.preventDefault(); // For newer Onsen UI version
            if (event.index != this.tabIndexChecker) {
              native.setPref("tabIndex", event.index);
            }
          }}
          renderTabs={this.renderTabs}
        />
        <ListDialogBuilder
          options={{
            onCancel: this.handleCancel,
            isOpen: this.state.isContextOpen,
            modifier: native.checkPlatformForBorderStyle,
          }}
          data={[
            {
              title: "Menu",
              content: [
                {
                  text: string.settings,
                  type: "",
                  icon: "settings",
                  onClick: () => {
                    this.props.pushPage({
                      activity: SettingsActivity,
                      key: "settings",
                    });
                    this.handleCancel();
                  },
                },
                {
                  text: string.licenses,
                  type: "",
                  icon: "article",
                  onClick: () => {
                    this.props.pushPage({
                      activity: LicenseActivity,
                      key: "licenses",
                    });
                    this.handleCancel();
                  },
                },
                {
                  text: "Plugins",
                  type: "",
                  icon: "extension",
                  style: { display: native.getPref("enableCustomScriptLoading") === "true" ? "" : "none" },
                  onClick: () => {
                    this.props.pushPage({
                      activity: PluginsActivity,
                      key: "plugins",
                    });
                    this.handleCancel();
                  },
                },
                {
                  text: "Make HWPlugin",
                  type: "",
                  icon: "code",
                  style: { display: native.isAndroid || native.isWindows ? "" : "none" },
                  onClick: () => {
                    this.props.pushPage({
                      activity: BuildPluginActivity,
                      key: "makehwplugin",
                    });
                    this.handleCancel();
                  },
                },
                {
                  text: "Open app path",
                  type: "",
                  icon: "android",
                  style: { display: native.isWindows ? "" : "none" },
                  onClick: () => {
                    window.Windows.openPath(window.Windows.appGetPath("userData"));
                  },
                },
                {
                  text: string.cancel,
                  type: "",
                  icon: "close",
                  modifier: native.checkPlatformForBorderStyle,
                  onClick: this.handleCancel,
                },
              ],
            },
          ]}
        />
      </Page>
    );
  };
}

export default MainActivity;
