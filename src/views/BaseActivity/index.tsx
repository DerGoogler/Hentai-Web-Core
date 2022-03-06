import * as React from "react";
import tools from "@Misc/tools";
import native from "@Native/index";
import preset from "jss-preset-default";
import jss from "jss";
import pkg from "./../../../package.json";
import darkMode from "@Styles/dark";
import lightMode from "@Styles/light"; import ons from "onsenui";
import { Props, States } from "./interface"
import { PushPageProps } from "@Types/init";
import News from "@Components/News";
import { Page, Toolbar, Tabbar, ToolbarButton, Button, Input, Icon, BackButton, RouterNavigator, RouterUtil, Fab, Splitter, SplitterSide, SplitterContent, List, ListItem } from "react-onsenui";
import { ToolbarBuilder, TabbarBuilder, ListDialogBuilder } from "@Builders";
import MDIcon from "@Components/MDIcon";
import ContentBody from "@Components/ContentBody";
import AnimeContent from "@Components/AnimeContent";
import AceEditor from "react-ace";
import { string } from "@Strings";
import images from "@DataPacks/images";
import { StringOfLength } from "@Misc/StringOfLength";

/**
 * This should only used on Activitys
 */
class BaseActivity<P = {}, S = {}> extends React.PureComponent<P & Props, S> implements React.ComponentLifecycle<P & Props, S>  {
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
  public List = List
  public ListItem = ListItem
  public Icon = Icon
  public Input = Input
  public SplitterContent = SplitterContent
  public SplitterSide = SplitterSide
  public Splitter = Splitter
  public Page = Page
  public Fab = Fab
  public RouterUtil = RouterUtil
  public RouterNavigator = RouterNavigator
  public BackButton = BackButton

  // Others
  public AceEditor = AceEditor

  // Components
  public AnimeContent = AnimeContent
  public News = News
  public MDIcon = MDIcon
  public ContentBody = ContentBody

  // Builders
  public ToolbarBuilder = ToolbarBuilder
  public TabbarBuilder = TabbarBuilder
  public ListDialogBuilder = ListDialogBuilder

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
  public setStatusbarColor(): `#${string}` | `#${StringOfLength<3, 6>}` {
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


  public renderModal(): JSX.Element {
    return <></>
  }

  public renderBottomToolbar(): JSX.Element {
    return <></>
  }

  public renderFixed(): JSX.Element {
    return <></>
  }

  public onInit(): void { }

  public onShow(): void { }

  public onHide(): void { }

  public onInfiniteScroll(): void { }

  /**
   * Don't use that if the Activity is with `BaseActivity` extended       
   * Use `renderPage` instead
   */
  public render = () => {
    return (
      <hw-activity name={this.constructor.name.replace("Activity", "")}>

        <Page
          modifier={native.checkPlatformForBorderStyle}
          renderBottomToolbar={this.renderBottomToolbar}
          renderFixed={this.renderFixed}
          renderModal={this.renderModal}
          onInfiniteScroll={this.onInfiniteScroll}
          onHide={this.onHide}
          onShow={this.onShow}
          onInit={this.onInit}
          renderToolbar={this.renderToolbar}>
          <this.renderPage />
        </Page>
      </hw-activity>
    );
  };

}

export default BaseActivity;
