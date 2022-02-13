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
        let pluginName = extras.plugin.name;
        console.log(
          `%c${pluginName}%c=>%c ${message}`,
          `color: #fff; background: #4a148c; padding: 4px`,
          `color: #fff; background: #bb86fc; padding: 4px`,
          "",
          ...optionalParams
        );
      },

      info(message?: any, ...optionalParams: any[]) {
        let pluginName = extras.plugin.name;
        console.info(
          `%c${pluginName}%c=>%c ${message}`,
          `color: #fff; background: #4a148c; padding: 4px`,
          `color: #fff; background: #bb86fc; padding: 4px`,
          "",
          ...optionalParams
        );
      },

      warn(message?: any, ...optionalParams: any[]) {
        let pluginName = extras.plugin.name;
        console.warn(
          `%c${pluginName}%c=>%c ${message}`,
          `color: #fff; background: #4a148c; padding: 4px`,
          `color: #fff; background: #bb86fc; padding: 4px`,
          "",
          ...optionalParams
        );
      },

      error(message?: any, ...optionalParams: any[]) {
        let pluginName = extras.plugin.name;
        console.error(
          `%c${pluginName}%c=>%c ${message}`,
          `color: #fff; background: #4a148c; padding: 4px`,
          `color: #fff; background: #bb86fc; padding: 4px`,
          "",
          ...optionalParams
        );
      },
    },
  };

  saferEval(javascriptString, context);
}
