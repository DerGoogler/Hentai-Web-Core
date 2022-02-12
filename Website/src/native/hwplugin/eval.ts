import ons from "onsenui";
import saferEval from "safer-eval";
import tools from "@Misc/tools";
import native from "..";
import HWPlugin from ".";

export default function evil(javascriptString: string, extras: any) {
  const context = {
    native: native,
    HWPlugin: HWPlugin,
    tools: tools,
    ons: ons,
    __dirname: `${native.getPref("electron.hardDevice").toUpperCase()}:\\hentai-web\\plugins\\${extras.plugin.name}`,
    window: {
      Android: undefined,
      Windows: undefined,
      alert(message?: any): void {
        ons.notification.alert(message);
      },
    },
    document: document,
    require(path: any) {
      const pluginName = extras.plugin.name;
      if (typeof path == "object") {
        path.map((item: string) =>
          native.eval(native.fs.readFile("plugins/" + pluginName + "/" + path), {
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
      log(message?: any, ...optionalParams: any[]) {
        let pluginName = extras.plugin.name + ": ";
        console.log(pluginName + message, ...optionalParams);
      },

      info(message?: any, ...optionalParams: any[]) {
        let pluginName = extras.plugin.name + ": ";
        console.info(pluginName + message, ...optionalParams);
      },

      warn(message?: any, ...optionalParams: any[]) {
        let pluginName = extras.plugin.name + ": ";
        console.warn(pluginName + message, ...optionalParams);
      },

      error(message?: any, ...optionalParams: any[]) {
        let pluginName = extras.plugin.name + ": ";
        console.error(pluginName + message, ...optionalParams);
      },
    },
  };

  saferEval(javascriptString, context);
}
