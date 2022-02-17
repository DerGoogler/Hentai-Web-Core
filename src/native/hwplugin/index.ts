import tools from "@Misc/tools";
import { LanguageTypes } from "@Strings";
import { PluginAboutTypes } from "@Types/pluginAbout";
import { SettingsInterface } from "@Types/SettingsBuilder";
import axios from "axios";
import jss, { Styles } from "jss";
import preset from "jss-preset-default";
import native from "..";

const getPluginConfig = (name: string): PluginAboutTypes => {
  return native.fs.readFile("/plugins/" + name + "/plugin.yaml", {
    parse: { use: true, mode: "yaml" },
  });
};

class HWPlugin {
  private pluginErrorString: string = "Please define an plugin name";
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
      path.map((item: string) =>
        native.eval(native.fs.readFile("plugins/" + this.pluginName + "/" + path), {
          plugin: {
            name: this.pluginName,
          },
        })
      );
    } else {
      native.eval(native.fs.readFile("plugins/" + this.pluginName + "/" + path), {
        plugin: {
          name: this.pluginName,
        },
      });
    }
  }

  public library(url: string) {
    axios.get(url).then((res: any) => {
      if (res.status === 200) {
        native.eval(res.data, {
          plugin: {
            name: this.pluginName,
          },
        });
      } else {
        console.log("Can't find library");
      }
    });
  }

  public strings(globals: any): LanguageTypes {
    const string: LanguageTypes = globals[this.checkLanguage()];
    return string;
  }

  private checkLanguage(): string {
    const lang = native.getPref("language");
    if (lang === tools.undefined) {
      return "en";
    } else {
      return lang;
    }
  }

  public func(func: { name: string; args: string; callback: string; run: string }): void {
    console.log(`function ${func.name}(${func.args}){${func.callback}}${func.name}(${func.run})`);
    native.eval(`function ${func.name}(${func.args}){${func.callback}}${func.name}(${func.run})`, {
      plugin: {
        name: this.pluginName,
      },
    });
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

  public readFile(path: string, options?: { parse: { use: boolean; mode: "json" | "yaml" } }): string | any {
    return native.fs.readFile(this.pluginName + "/" + path, options);
  }

  public mkDir(path: string): void {
    native.fs.mkDir(this.pluginName + "/" + path);
  }

  public writeFile(path: string, content: string): void {
    native.fs.writeFile(this.pluginName + "/" + path, content);
  }

  public isFileExist(path: string): boolean {
    return native.fs.isFileExist(this.pluginName + "/" + path);
  }

  public get getAuthor(): string {
    return getPluginConfig(this.pluginName).package?.author;
  }

  public get getVersion(): string {
    return getPluginConfig(this.pluginName).package?.version;
  }

  public get getLanguage(): string {
    return getPluginConfig(this.pluginName).package?.language;
  }

  public get getDescription(): string {
    return getPluginConfig(this.pluginName).package?.description;
  }
}

export default HWPlugin;
