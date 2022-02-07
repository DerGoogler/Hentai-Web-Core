import { SettingsInterface } from "@Types/SettingsBuilder";
import jss, { Styles } from "jss";
import preset from "jss-preset-default";
import native from "..";

class HWPlugin {
  private pluginErrorString: string = "Please define an Plugin settings name";
  private pluginName: string = "";

  private getPluginConfig = native.fs.readFile("plugins/" + this.pluginName + "/plugin.yaml", {
    parse: { use: true, mode: "yaml" },
  });

  public getAuthor = this.getPluginConfig?.package?.author;
  public getVersion = this.getPluginConfig?.package?.version;
  public getLanguage = this.getPluginConfig?.package?.language;
  public getDescription = this.getPluginConfig?.package?.description;

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

  public removeSettings(): void {
    native.removePref("Plugin.Settings." + this.pluginName + ".settings");
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

  public require(path: any): void {
    if (typeof path == "object") {
      path.map((item: string) => eval(native.fs.readFile("plugins/" + this.pluginName + "/" + item)));
    } else {
      eval(native.fs.readFile("plugins/" + this.pluginName + "/" + path));
    }
  }

  public func(func: { name: string; args: string; callback: string; run: string }): void {
    console.log(`function ${func.name}(${func.args}){${func.callback}}${func.name}(${func.run})`);
    eval(`function ${func.name}(${func.args}){${func.callback}}${func.name}(${func.run})`);
  }

  public loadCSS(x: Partial<Styles<keyof String, any, undefined>>): void {
    jss.setup(preset());
    const sheet = jss.createStyleSheet(x);
    sheet.attach();
  }

  public loadCSSfromFile(path: string): void {
    var style = document.createElement("style");
    style.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(style);
    style.innerHTML = native.fs.readFile("plugins/" + this.pluginName + "/" + path);
  }

  public fs = {
    pluginName: this.pluginName,

    readFile(path: string, options?: { parse: { use: boolean; mode: "json" | "yaml" } }): string | any {
      return native.fs.readFile(this.pluginName + "/" + path, options);
    },

    mkDir(path: string): void {
      native.fs.mkDir(this.pluginName + "/" + path);
    },

    writeFile(path: string, content: string): void {
      native.fs.writeFile(this.pluginName + "/" + path, content);
    },

    isFileExist(path: string): boolean {
      return native.fs.isFileExist(this.pluginName + "/" + path);
    },
  };
}

export default HWPlugin;
