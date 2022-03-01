import * as React from "react";
import tools from "@Misc/tools";
import native from "@Native/index";
import preset from "jss-preset-default";
import jss from "jss";
import pkg from "./../../../package.json";
import darkMode from "@Styles/dark";
import lightMode from "@Styles/light"; import ons from "onsenui";
import { ChangelogActivity, PluginsActivity, SettingsActivity, TextFetchActivity, EditorActivity } from "@Views";
import { Props, States } from "./interface"
import { PushPageProps } from "@Types/init";
import News from "@Components/News";
import { Page, Toolbar, Tabbar, ToolbarButton, Button, Input, Icon } from "react-onsenui";
import { ToolbarBuilder, TabbarBuilder, ListDialogBuilder } from "@Builders";
import MDIcon from "@Components/MDIcon";
import AnimeContent from "@Components/AnimeContent";
import AceEditor from "react-ace";
import { string } from "@Strings";
import images from "@DataPacks/images";

/**
 * This should only used on Activitys
 */
class BaseActivity<P = {}, S = {}, SS = any> extends React.Component<P & Props, S, SS> {
  /**
   * Gets the app packages
   */
  public readonly pkg = pkg;
  /**
   * Native calls for Windows and Android
   */
  public native = native
  public tools = tools
  public readonly ons = ons
  public readonly string = string
  public readonly images = images

  // Onsen UI Components
  public Toolbar = Toolbar
  public Tabbar = Tabbar
  public ToolbarButton = ToolbarButton
  public Button = Button
  public Icon = Icon
  public Input = Input
  public MDIcon = MDIcon

  // Others
  public AceEditor = AceEditor
  public AnimeContent = AnimeContent
  public News = News

  // Builders
  public ToolbarBuilder = ToolbarBuilder
  public TabbarBuilder = TabbarBuilder
  public ListDialogBuilder = ListDialogBuilder

  // Views
  public EditorActivity = EditorActivity
  public TextFetchActivity = TextFetchActivity
  public SettingsActivity = SettingsActivity
  public PluginsActivity = PluginsActivity
  public ChangelogActivity = ChangelogActivity



  public constructor(props: Readonly<P & Props> | P & Props) {
    super(props);
    this.updateStyle = this.updateStyle.bind(this);
    this.initialPluginState = this.initialPluginState.bind(this);
    this.setDiscordStatus = this.setDiscordStatus.bind(this);
    this.setStatusbarColor = this.setStatusbarColor.bind(this);
    this.render = this.render.bind(this);
  }

  public componentDidMount(): void {
    native.electron.discordRPC(this.setDiscordStatus());
    native.android.setStatusbarColor(this.setStatusbarColor());
    this.updateStyle();
    this.initialPluginState();
  };

  public componentDidUpdate(): void {
    native.electron.discordRPC(this.setDiscordStatus());
    native.android.setStatusbarColor(this.setStatusbarColor());
    this.updateStyle();
    this.initialPluginState();
  };

  private updateStyle(): void {
    jss.setup(preset());
    if (native.getPref("enableDarkmode") === "true") {
      native.android.setStatusbarColor("#ff1f1f1f");
      jss.createStyleSheet(darkMode).attach();
    } else {
      native.android.setStatusbarColor("#ff4a148c");
      jss.createStyleSheet(lightMode).attach();
    }
  }

  public pushPage(props: PushPageProps): void {
    if (this.props.pushPage) {
      this.props.pushPage(props)
    }
  }

  private initialPluginState(): void {
    let pas,
      customPlugins = null;
    if (native.isAndroid || native.isWindows) {
      if (native.fs.isFileExist("plugins.yaml")) {
        pas = native.fs.readFile("plugins.yaml", { parse: { use: true, mode: "yaml" } });
        customPlugins = pas.map((item: string) => tools.PluginInitial(item));
      }
    } else {
      const getPlaygroundCode = native.getPref("playground");
      native.eval(getPlaygroundCode, {
        plugin: {
          name: "playground",
        },
      });
    }
  }

  public setDiscordStatus = (): string => {
    return "Viewing images";
  };

  /**
   * @default #4a148c
   */
  public setStatusbarColor(): string {
    return "#4a148c"
  }

  /**
   * Renders the Toolbar
   */
  public renderToolbar(): JSX.Element {
    return <></>
  };

  /**
   * Renders the page
   */
  public renderPage(): JSX.Element {
    return <></>
  };

  /**
   * Don't use that if the Activity is with `BaseActivity` extended       
   * Use `renderPage` instead
   */
  public render = () => {
    return (
      <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
        {this.renderPage()}
      </Page>
    );
  };

}

export default BaseActivity;
