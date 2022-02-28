import vm from "vm";
import ons from "onsenui";
import tools from "@Misc/tools";
import native from "..";
import HWPlugin from ".";
import { PluginOptions } from "@Types/pluginContext";
import ipc from "@Misc/ipc";

class evil {
  private static purple = "color: #fff; background: #4a148c; padding: 4px; border-radius: 8px 0px 0px 8px;";
  private static lightPurple = "color: #fff; background: #bb86fc; padding: 4px; border-radius: 0px 8px 8px 0px;";

  public constructor(javascriptString: string, extras: any) {
    try {
      vm.runInNewContext(javascriptString, this.context(extras));
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.log(e.message);
      }
    }
  }

  private context = (extras: any) => {
    return vm.createContext(
      {
        native: native,
        HWPlugin: HWPlugin,
        tools: tools,
        ipc: ipc,
        ons: ons,
        __dirname: `${native.getPref("electron.hardDevice").toUpperCase()}:\\hentai-web\\plugins\\${extras.plugin.name}`,
        window: {
          Android: undefined,
          Windows: undefined,
        },
        initFile: (callback: (plugin: HWPlugin) => void, options?: PluginOptions) => {
          const requireVersion = options?.requireVersion;
          const plugin = new HWPlugin(extras.plugin.name);
          if (native.version.require(requireVersion)) {
            if (typeof callback == "function") {
              callback(plugin);
            }
          } else {
            console.log(`This plugin requires the latest version of ${requireVersion}`);
          }
        },
        Android: undefined,
        Windows: undefined,
        eval: undefined,
        document: document,
        require(path: any): void {
          const pluginName = extras.plugin.name;
          if (typeof path == "object") {
            path.map((item: string) =>
              native.eval(native.fs.readFile("plugins/" + pluginName + "/" + item), {
                plugin: {
                  name: pluginName,
                },
              })
            );
          } else {
            native.eval(native.fs.readFile("plugins/" + pluginName + "/" + path), {
              plugin: {
                name: pluginName,
              },
            });
          }
        },
        console: {
          log(message?: any, ...optionalParams: any[]): void {
            let pluginName = extras.plugin.name;
            console.log(`%c${pluginName}%c=>%c ${message}`, evil.purple, evil.lightPurple, "", ...optionalParams);
          },

          info(message?: any, ...optionalParams: any[]): void {
            let pluginName = extras.plugin.name;
            console.info(`%c${pluginName}%c=>%c ${message}`, evil.purple, evil.lightPurple, "", ...optionalParams);
          },

          warn(message?: any, ...optionalParams: any[]): void {
            let pluginName = extras.plugin.name;
            console.warn(`%c${pluginName}%c=>%c ${message}`, evil.purple, evil.lightPurple, "", ...optionalParams);
          },

          error(message?: any, ...optionalParams: any[]): void {
            let pluginName = extras.plugin.name;
            console.error(`%c${pluginName}%c=>%c ${message}`, evil.purple, evil.lightPurple, "", ...optionalParams);
          },
        },
      },
      {
        name: extras.plugin.name,
      }
    );
  };
}

export default evil;
