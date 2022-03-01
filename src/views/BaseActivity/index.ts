import * as React from "react";
import tools from "@Misc/tools";
import native from "@Native/index";
import preset from "jss-preset-default";
import jss from "jss";
import darkMode from "@Styles/dark";
import lightMode from "@Styles/light";
import Logger from "@Misc/Logger";

/**
 * This should only used on Activitys
 */
class BaseActivity<P = {}, S = {}, SS = any> extends React.Component<P, S, SS> {
  public constructor(props: Readonly<P> | P) {
    super(props);
    this.updateStyle = this.updateStyle.bind(this);
    this.initialPluginState = this.initialPluginState.bind(this);
    this.setDiscordStatus = this.setDiscordStatus.bind(this);
  }

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

  public componentDidMount = (): void => {
    Logger.log(this.setDiscordStatus());
    native.electron.discordRPC(this.setDiscordStatus());
    this.updateStyle();
    this.initialPluginState();
  };

  public componentDidUpdate = (): void => {
    Logger.log(this.setDiscordStatus());
    native.electron.discordRPC(this.setDiscordStatus());
    this.updateStyle();
    this.initialPluginState();
  };
}

export default BaseActivity;
