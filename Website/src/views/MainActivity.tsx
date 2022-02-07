import * as React from "react";
import { Provider, Translate, Translator } from "react-translated";
import pkg from "./../../package.json";
import { Page, Toolbar, Tabbar, Fab, SpeedDial, ToolbarButton, Icon } from "react-onsenui";
import native from "@Native/index";
import tools from "@Misc/tools";
import ToolbarBuilder from "@Builders/ToolbarBuilder";
import TabbarBuilder from "@Builders/TabbarBuilder";
import AnimeContent from "@Components/AnimeContent";
import ActionSheetBuilder from "@Builders/ActionSheetBuilder";
import { nsfwData, sfwData } from "@DataPacks/hmtai";
import SpeedDialBuilder from "@Builders/SpeedDialBuilder";
import MDIcon from "@Components/MDIcon";
import yaml from "js-yaml";
import SettingsActivity from "./SettingsActivity";
import LicensesActivity from "./LicensesActivity";
import News from "@Components/News";
import BuildPluginActivity from "./BuildPluginActivity";
import Bootloader from "@Bootloader";
import axios from "axios";
import ChangelogActivity from "./ChangelogActivity";

class MainActivity extends React.Component<{ pushPage: any; popPage: any }, { isContextOpen: boolean }> {
  public constructor(props: any) {
    super(props);
    this.state = {
      isContextOpen: false,
    };
  }

  public componentDidMount() {
    if (native.userAgentEqualAndroid(true) || native.userAgentEqualWindows(true)) {
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

    axios
      .get(window.location.href.replace(/(\?(.*?)=(.*)|\?)/gm, "") + "misc/changelog.yaml")
      .then((res: { data: any }) => {
        const data: any = yaml.load(res.data, { json: true });
        if (native.isAndroid || native.isWindows) {
          if (data.version.toString() === native.getVersion()) {
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
  }

  public componentDidUpdate() {
    new Bootloader().styleInit();
  }

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
          title="Hentai Web"
          hasWindowsButtons={true}
          addToolbarButton={
            <>
              <ToolbarButton id="menu-click" onClick={this.handleClick}>
                <MDIcon icon="menu" size="24" ignoreDarkmode={true}></MDIcon>
              </ToolbarButton>
            </>
          }
          addToolbarButtonPosition="left"
          hasDarkMode={true}
        />
      </Toolbar>
    );
  }

  private renderTabs() {
    if (native.getPref("disableNSFW") === "true") {
      return TabbarBuilder([
        {
          label: "SFW",
          content: <AnimeContent name="SFW" data={sfwData} />,
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
          content: <AnimeContent name="SFW" data={sfwData} />,
        },
        {
          label: "NSFW",
          content: <AnimeContent name="NSFW" data={nsfwData} />,
        },
        {
          label: "NEWS",
          content: <News />,
        },
      ]);
    }
  }

  private renderFixed() {
    return (
      <Translator>
        {({ translate }: any) => (
          // @ts-ignore
          <SpeedDial
            style={{
              bottom: tools.typeIF(native.getPref("enableBottomTabbar") === "true", "calc(20px + 49px)", ""),
            }}
            id="fab-element"
            position="bottom right"
          >
            <Fab>
              <Icon icon="md-more" />
            </Fab>
            {SpeedDialBuilder}
          </SpeedDial>
        )}
      </Translator>
    );
  }

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
      <Page
        modifier={native.checkPlatformForBorderStyle}
        renderFixed={this.renderFixed}
        renderToolbar={this.renderToolbar}
      >
        <Tabbar
          // @ts-ignore
          swipeable={tools.stringToBoolean(native.getPref("enableSwipeBetweenTabs"))}
          position={tools.typeIF(native.getPref("enableBottomTabbar") === "true", "bottom", "top")}
          index={this.tabIndexChecker()}
          // @ts-ignore
          onPreChange={(event: any) => {
            if (event.index != this.tabIndexChecker) {
              native.setPref("tabIndex", event.index);
            }
            if (event.index === 0) {
              native.electron.discordRPC("Viewing SFW Images");
            } else if (event.index === 1) {
              native.electron.discordRPC("Viewing NSFW Images");
            } else if (event.index === 2) {
              native.electron.discordRPC("Viewing News");
            } else {
              return;
            }
          }}
          renderTabs={this.renderTabs}
        />

        <ActionSheetBuilder
          // @ts-ignore
          options={{
            title: "Menu",
            onCancel: this.handleCancel,
            isOpen: this.state.isContextOpen,
            modifier: native.checkPlatformForBorderStyle,
          }}
          data={[
            {
              text: "settings",
              icon: "md-settings",
              onClick: () => {
                this.props.pushPage({
                  activity: SettingsActivity,
                  key: "settings",
                });
                this.handleCancel();
              },
            },
            {
              text: "Licenses",
              icon: "md-file",
              onClick: () => {
                this.props.pushPage({
                  activity: LicensesActivity,
                  key: "licenses",
                });
                this.handleCancel();
              },
            },
            {
              text: "Make HWPlugin",
              icon: "md-code",
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
              icon: "md-android",
              style: { display: tools.typeIF(native.userAgentEqualWindows(true), "", "none") },
              onClick: () => {
                window.Windows.openPath(window.Windows.appGetPath("userData"));
              },
            },
            {
              text: "Open DevTools",
              icon: "logo_dev",
              style: {
                display:
                  tools.typeIF(native.userAgentEqualWindows(true), "", "none") ||
                  tools.typeIF(native.getPref("electron.devTools") === "true", "", "none"),
              },
              onClick: () => {
                window.Windows.openDevTools();
              },
            },
            {
              text: "Cancel",
              icon: "md-close",
              modifier: native.checkPlatformForBorderStyle,
              onClick: this.handleCancel,
            },
          ]}
        />
      </Page>
    );
  };
}

export default MainActivity;
