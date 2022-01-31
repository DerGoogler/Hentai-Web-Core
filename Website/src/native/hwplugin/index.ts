import { SettingsInterface } from "@Types/SettingsBuilder";
import jss, { Styles } from "jss";
import preset from "jss-preset-default";
import native from "..";

class HWPlugin {
  private pluginErrorString: string = "Please define an Plugin settings name";
  private pluginName: string;

  public constructor(pluginName: string) {
    this.pluginName = pluginName;
  }

  public addSettings(items: SettingsInterface[]): void {
    if (this.pluginName === (undefined || null)) {
      throw new Error(this.pluginErrorString);
    } else {
      native.setPref("Plugin.Settings." + this.pluginName + ".settings", JSON.stringify(items));
      native.setPref("Plugin.Settings." + this.pluginName + ".name", this.pluginName);
    }
  }

  public setPluginPref(key: string, content: string): void {
    native.setPref("Plugin.Settings." + this.pluginName + "." + key, content);
  }

  public getPluginPref(key: string): string {
    return native.getPref("Plugin.Settings." + this.pluginName + "." + key);
  }

  public removePluginPref(key: string): void {
    native.removePref("Plugin.Settings." + this.pluginName + "." + key);
  }

  public getSelectedHardDevice(): string {
    return native.getPref("electron.hardDevice");
  }

  public require(letter = "C", path: any): void {
    if (typeof path == "object") {
      path.map((item: string) => eval(native.fs.readFile(letter, this.pluginName + "/" + item)));
    } else {
      eval(native.fs.readFile(letter, this.pluginName + "/" + path));
    }
  }

  public loadCSS(x: Partial<Styles<keyof String, any, undefined>>): void {
    jss.setup(preset());
    const sheet = jss.createStyleSheet(x);
    sheet.attach();
  }

  public loadCSSfromFile(letter = "C", path: string): void {
    var style = document.createElement("style");
    style.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(style);
    style.innerHTML = native.fs.readFile(letter, this.pluginName + "/" + path);
  }

  public setPluginPackage(infos: {
    pluginAuthor: string;
    pluginVersion: string;
    pluginLanguage: string;
  }): void {
    native.setPref(
      "Plugin.Settings." + this.pluginName + ".pluginInformation.pluginAuthor",
      infos.pluginAuthor
    );
    native.setPref(
      "Plugin.Settings." + this.pluginName + ".pluginInformation.pluginVersion",
      infos.pluginVersion
    );
    native.setPref(
      "Plugin.Settings." + this.pluginName + ".pluginInformation.pluginLanguage",
      infos.pluginLanguage
    );
  }

  public getPluginPackage(type: "pluginAuthor" | "pluginVersion" | "pluginLanguage"): string {
    return native.getPref("Plugin.Settings." + this.pluginName + ".pluginInformation." + type);
  }
}

export default HWPlugin;
