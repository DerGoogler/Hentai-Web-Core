import React from "react";
import { Page, Toolbar } from "react-onsenui";
import native from "@Native/index";
import ToolbarBuilder from "@Builders/ToolbarBuilder";
import ContentBody from "@Components/ContentBody";
import "@Styles/github/markdown-dark.scss";
import "@Styles/github/markdown-light.scss";
import tools from "@Misc/tools";
import { HighlightedMarkdown } from "../../components/HighlightMarkdown";
import Bootloader from "@Bootloader";

class BuildPluginActivity extends React.Component<{ popPage: any }, {}> {
  public state = {
    data: `
# HWPlugin

Here will you see how to build an plugin for Hentai Web  
The plugin path is \`/hentai-web/plugins/<PLUGINNAME>/\`

## Build

In \`/hentai-web/plugins/<PLUGINNAME>/plugin.yaml\`

Function should start like this
\`\`\`js
(function () {
  console.log("Hello World!");
})();
\`\`\`

\`\`\`yaml
run: index.js
package:
  author: Der_Googler
  version: 2.3
  language: JavaScript
  description: |-
    # Fancy Event Plugin

    This plugin is for the [HW Project](https://github.com/DerGoogler/Hentai-Web)

    ### Notification

    Making some notifications with this plugin :D

    ### Open by typing <kbd>n</kbd> <kbd>o</kbd> <kbd>t</kbd> <kbd>i</kbd> on the keyboard   

    ![image](https://user-images.githubusercontent.com/54764558/151820875-c18c3478-8ed2-4fd8-8c2d-6f5b346b04b8.png)

    ### And enjoy the useless!

    ![image](https://user-images.githubusercontent.com/54764558/151821078-4ef76687-a53e-4d29-9c79-a812d81d777d.png)
options:
  allowEditor: true

\`\`\`

> Note: The \`run\` is required, without will not work

This optimal, this allow the user to change itself an option within the app, he want's the option, he'll change it

## Add to plugin list

You have to control about the plugin list

Don't remove the example plugin (The app will not work anymore)

\`\`\`yaml
- example
- plugin
\`\`\`

## Init

Before you add settings need to give an plugin name, like this

\`\`\`js
const plugin = new HWPlugin("myPlugin");
\`\`\`

### Example

\`\`\`js
const plugin = new HWPlugin("myPlugin");

plugin.addSettings([
  {
    title: "My Plugin",
    content: [
      {
        key: "enableStartupDialog",
        type: "switch",
        text: "Dialog on app start",
      },
    ],
  },
]);
\`\`\`

## Functional Settings

To make an startup dialog, if the setting is turned on

\`\`\`js
if (plugin.getPluginPref("enableStartupDialog") === "true") {
  alert("Welcome to the App");
}
\`\`\`

> Note: Useless if you give an Boolean or Number, it will always converted to an string

## Get plugin information

\`\`\`js
console.log(plugin.getPluginAuthor);
console.log(plugin.getPluginVersion);
console.log(plugin.getPluginLanguage);
\`\`\`

## Platform

You can allow the plugin on different platforms

\`\`\`js
if (native.isWindows /* native.isAndroid */) {
  dlg.addSettings([
    {
      title: "DLG",
      content: [
        {
          key: "DLG",
          type: "switch",
          text: "Dialog on app start",
        },
      ],
    },
  ]);
} else {
  dlg.removeSettings();
}
\`\`\`

## Get plugin preferences

> Note: It returns always an string

\`\`\`js
// get
plugin.getPluginPref("enableFireworks");

// set
plugin.setPluginPref("enableFireworks", "true");

// remove
plugin.removePluginPref("enableFireworks");
\`\`\`

## Override plugin state

Carefull with this, it can brack the plugin functions.

> Note: The \`export default\` works only Webpack projects

\`\`\`js
/**
 * overwrites the default HWPlugin state
 *
 * !! DO NOT OVERWIRTE THE constructor() !!
 */
class App extends HWPlugin {
  setPluginPref(key, content) {
    console.log(this.pluginName + " has set an new pref");
    native.setPref("Plugin.Settings." + this.pluginName + "." + key, content);
  }

  getPluginPref(key) {
    console.log(this.pluginName + " has requsted an pref");
    return native.getPref("Plugin.Settings." + this.pluginName + "." + key);
  }

  removePluginPref(key) {
    console.log(this.pluginName + " removed an pref");
    native.removePref("Plugin.Settings." + this.pluginName + "." + key);
  }
}

export default App;
\`\`\`

## Others

Here are other functions that can be used

\`\`\`js
// Will load from C:\hentai-web\plugins\<PLUGINNAME>\styles\index.css
plugin.loadCSSfromFile("/styles/index.css");

// Load CSS from an object. Lean more about JSS.
plugin.loadCSS({
  "@global": {
    ".card": {
      border: "1px solid rgb(74 20 140)",
    },
    ".card-header": {
      borderBottom: "1px solid rgb(74 20 140)",
      backgroundColor: "rgba(74, 20, 140,.03)",
    },
    ".search-input--custom": {
      border: "1px solid rgb(74 20 140)",
    },
  },
});

// Will load from C:\hentai-web\plugins\<PLUGINNAME>\core\lib.css
// Nore: This code will directly executed!
plugin.require("/core/lib.js");
\`\`\`

    `,
  };

  private renderToolbar = () => {
    return (
      <Toolbar>
        <ToolbarBuilder
          title={"Make HWPlugin"}
          onBackButton={this.props.popPage}
          hasWindowsButtons={true}
          hasDarkMode={true}
        />
      </Toolbar>
    );
  };

  public render() {
    return (
      <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
        <ContentBody className={"markdown-body-" + tools.typeIF(native.getPref("enableDarkmode"), "dark", "light")}>
          <div
            style={{
              padding: "16px",
            }}
          >
            <HighlightedMarkdown>{this.state.data}</HighlightedMarkdown>
          </div>
        </ContentBody>
      </Page>
    );
  }
}

export default BuildPluginActivity;
