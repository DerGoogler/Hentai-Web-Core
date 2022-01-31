import { SettingsInterface } from "@Types/SettingsBuilder";
import native from "..";

class app {
  public static pluginErrorString: string = "Please define an Plugin settings name";

  public static addSettings(pluginName: string, items: SettingsInterface[]): void {
    if (pluginName === (undefined || null)) {
      throw new Error(app.pluginErrorString);
    } else {
      native.setPref("Plugin.Settings." + pluginName + ".settings", JSON.stringify(items));
      native.setPref("Plugin.Settings." + pluginName + ".name", pluginName);
    }
  }

  public static setPluginPref(pluginName: string, key: string, content: string): void {
    native.setPref("Plugin.Settings." + pluginName + "." + key, content);
  }

  public static getPluginPref(pluginName: string, key: string): string {
    return native.getPref("Plugin.Settings." + pluginName + "." + key);
  }

  public static removePluginPref(pluginName: string, key: string): void {
    if (pluginName === (undefined || null)) {
      throw new Error(app.pluginErrorString);
    } else {
      native.removePref("Plugin.Settings." + pluginName + "." + key);
    }
  }

  public static getDefaultHardDevice(): string {
    return native.getPref("electron.hardDevice");
  }

  public static require(letter = "C", path: string): void {
    eval(native.fs.readFile(letter, path));
  }

  public static loadCSS(letter = "C", path: string): void {
    var style = document.createElement("style");
    style.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(style);
    style.innerHTML = native.fs.readFile(letter, path);
  }
}

export default app;
