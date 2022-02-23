import ons from "onsenui";
import saferEval from "safer-eval";
import tools from "@Misc/tools";
import native from "..";
import HWPlugin from ".";
import Babel from "@babel/standalone";
import { PluginContext, PluginOptions } from "@Types/pluginContext";

export default function evil(javascriptString: string, extras: any) {
  "use strict";

  const consoleColor = {
    purple: "color: #fff; background: #4a148c; padding: 4px; border-radius: 8px 0px 0px 8px;",
    lightPurple: "color: #fff; background: #bb86fc; padding: 4px; border-radius: 0px 8px 8px 0px;",
  };

  const context: PluginContext = {
    native: native,
    HWPlugin: HWPlugin,
    tools: tools,
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
        console.log(
          `%c${pluginName}%c=>%c ${message}`,
          consoleColor.purple,
          consoleColor.lightPurple,
          "",
          ...optionalParams
        );
      },

      info(message?: any, ...optionalParams: any[]): void {
        let pluginName = extras.plugin.name;
        console.info(
          `%c${pluginName}%c=>%c ${message}`,
          consoleColor.purple,
          consoleColor.lightPurple,
          "",
          ...optionalParams
        );
      },

      warn(message?: any, ...optionalParams: any[]): void {
        let pluginName = extras.plugin.name;
        console.warn(
          `%c${pluginName}%c=>%c ${message}`,
          consoleColor.purple,
          consoleColor.lightPurple,
          "",
          ...optionalParams
        );
      },

      error(message?: any, ...optionalParams: any[]): void {
        let pluginName = extras.plugin.name;
        console.error(
          `%c${pluginName}%c=>%c ${message}`,
          consoleColor.purple,
          consoleColor.lightPurple,
          "",
          ...optionalParams
        );
      },
    },
  };

  try {
    saferEval(javascriptString, context);
  } catch (e) {
    if (e instanceof SyntaxError) {
      console.log(e.message);
    }
  }
}
