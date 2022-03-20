import { ListViewBuilder } from "@Builders";
import Activity from "@Views";
import BaseActivity from "../BaseActivity";
import { Props, States } from "./interface";

class MainActivity extends BaseActivity<Props, States> {
  public constructor(props: Readonly<Props> | Props) {
    super(props);
    this.state = {
      isContextOpen: false,
      sfw: this.images.sfw,
      nsfw: this.images.nsfw,
    };
  }

  public componentDidMount = () => {
    super.componentDidMount;
    if (this.native.isAndroid || this.native.isWindows) {
      this.tools.ref("download-app", (e: HTMLElement) => {
        e.style.display = "none";
        e.setAttribute("title", `Download the last ${this.pkg.version} Hentai Web version!`);
      });

      if (this.native.getPref("hideFAB") === "true") {
        this.tools.ref("fab-element", (element: HTMLElement) => {
          element.style.display = "none";
        });
      }
    }

    this.tools.ref("menu-click", (e: HTMLElement) => {
      e.addEventListener("click", this.handleClick);
    });

    // Get changelog
    this.tools.getMisc("changelog.yaml", (data: any) => {
      if (this.native.isAndroid || this.native.isWindows) {
        if (data.version.toString() === this.native.version.get) {
          console.log("Newst version installed");
        } else {
          this.pushPage({
            activity: Activity.Changelog,
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

  private renderSplitter = () => {
    return (<>
      <this.Splitter>
        <this.SplitterSide
          style={{
            boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
          }}
          side='left'
          width={200}
          collapse={true}
          swipeable={true}
          isOpen={this.state.isContextOpen}
          onClose={this.handleCancel}
          onOpen={this.handleClick}
        >
          <this.Page>
            <ListViewBuilder isPlugin={false} pluginName="" data={[
              {
                title: "Menu",
                content: [
                  {
                    text: this.string.settings,
                    type: "",
                    icon: "settings",
                    onClick: () => {
                      this.pushPage({
                        activity: Activity.Settings,
                        key: "settings",
                      });
                      this.handleCancel();
                    },
                  },
                  {
                    text: this.string.licenses,
                    type: "",
                    icon: "article",
                    onClick: () => {
                      this.pushPage({
                        activity: Activity.TextFetch,
                        key: "licenses",
                        textFetch: {
                          title: this.string.licenses,
                          url: "https://cdn.dergoogler.com/others/hentai-web/vendor.bundle.js.LICENSE.txt",
                        },
                      });
                      this.handleCancel();
                    },
                  },
                  {
                    text: "Plugins",
                    type: "",
                    icon: "extension",
                    style: {
                      display:
                        (this.native.getPref("enablePluginTestting") && this.native.getPref("enableCustomScriptLoading")) === "true"
                          ? ""
                          : "none",
                    },
                    onClick: () => {
                      this.pushPage({
                        activity: Activity.Plugins,
                        key: "plugins",
                      });
                      this.handleCancel();
                    },
                  },
                  {
                    text: "Playground",
                    type: "",
                    icon: "code",
                    style: {
                      display:
                        this.native.isAndroid || this.native.isWindows
                          ? "none"
                          : (this.native.getPref("enablePluginTestting") && this.native.getPref("enableCustomScriptLoading")) ===
                            "true"
                            ? ""
                            : "none",
                    },
                    onClick: () => {
                      const getPlayground = this.native.getPref("playground");
                      this.pushPage({
                        activity: Activity.Editor,
                        key: "plugin-play-ground",
                        extras: {
                          pluginName: "playground",
                          fileName: "index.js",
                          value:
                            getPlayground === "false"
                              ? 'initFile((plugin) => {\r\n  console.log("Hello, world!")\r\n});\r\n'
                              : getPlayground,
                        },
                      });
                      this.handleCancel();
                    },
                  },
                  {
                    text: "Make HWPlugin",
                    type: "",
                    icon: "code",
                    style: { display: this.native.isAndroid || this.native.isWindows ? "" : "none" },
                    onClick: () => {
                      this.native.open("https://docs.dergoogler.com/HWPlugin");
                      this.handleCancel();
                    },
                  },
                  {
                    text: "Open app path",
                    type: "",
                    icon: "android",
                    style: { display: this.native.isWindows ? "" : "none" },
                    onClick: () => {
                      window.Windows.openPath(window.Windows.appGetPath("userData"));
                    },
                  },
                  {
                    text: "Privacy Policy",
                    type: "",
                    icon: "policy",
                    onClick: () => {
                      this.native.open("https://hw.dergoogler.com/tos/privacy-policy");
                    },
                  },
                  {
                    text: "Terms & Conditions",
                    type: "",
                    icon: "gavel",
                    onClick: () => {
                      this.native.open("https://hw.dergoogler.com/tos/terms-conditions");
                    },
                  },
                  {
                    text: this.string.cancel,
                    type: "",
                    icon: "close",
                    modifier: this.native.checkPlatformForBorderStyle,
                    onClick: this.handleCancel,
                  },
                ],
              },
            ]} />

          </this.Page>
        </this.SplitterSide>
        <this.SplitterContent>
          <>
            <this.Tabbar
              swipeable={this.tools.stringToBoolean(this.native.getPref("enableSwipeBetweenTabs"))}
              position={this.native.getPref("enableBottomTabbar") === "true" ? "bottom" : "top"}
              index={this.tabIndexChecker()}
              // @ts-ignore
              onPreChange={(event: any) => {
                event.preventDefault(); // For newer Onsen UI version
                if (event.index != this.tabIndexChecker) {
                  this.native.setPref("tabIndex", event.index);
                }
              }}
              renderTabs={this.renderTabs}
            />
          </>
        </this.SplitterContent>
      </this.Splitter>
    </>)
  }

  public renderToolbar = () => {
    return (
      <this.Toolbar>
        <this.ToolbarBuilder
          title={this.native.isFacebook || this.native.isInstagram ? "Safe Web" : "Hentai Web"}
          hasWindowsButtons={true}
          addToolbarButton={
            <>
              <this.ToolbarButton id="menu-click" onClick={this.handleClick}>
                <this.MDIcon icon="menu" size="24" ignoreDarkmode={true}></this.MDIcon>
              </this.ToolbarButton>
            </>
          }
          addToolbarButtonPosition="left"
        />
      </this.Toolbar>
    );
  }

  private renderTabs = () => {
    if (this.native.getPref("disableNSFW") === "true" || this.native.isInstagram || this.native.isFacebook) {
      return this.TabbarBuilder([
        {
          label: "SFW",
          content: <this.AnimeContent name="SFW" data={this.state.sfw} />,
        },
        {
          label: "NEWS",
          content: <this.News />,
        },
      ]);
    } else {
      return this.TabbarBuilder([
        {
          label: "SFW",
          content: <this.AnimeContent name="SFW" data={this.state.sfw} />,
        },
        {
          label: "NSFW",
          content: <this.AnimeContent name="NSFW" data={this.state.nsfw} />,
        },
        {
          label: "NEWS",
          content: <this.News />,
        },
      ]);
    }
  };

  private tabIndexChecker(): number {
    var get = this.native.getPref("tabIndex");
    if (get === undefined || get === null || get === "") {
      return 0;
    } else {
      if (this.native.getPref("saveLastUsedTab") === "true") {
        return Number(get);
      } else {
        return 0;
      }
    }
  }

  public renderPage = () => {
    return <this.renderSplitter />;
  };
}

export default MainActivity;
