import * as React from "react";
import { List, ListItem, Page, Toolbar } from "react-onsenui";
import ContentBody from "@Components/ContentBody";
import MDIcon from "@Components/MDIcon";
import native from "@Native/index";
import ToolbarBuilder from "@Builders/ToolbarBuilder";
import tools from "@Misc/tools";
import { HighlightedMarkdown } from "./../components/HighlightMarkdown";
import Bootloader from "@Bootloader";
import { PushPageProps } from "@Types/init";

class PluginAboutActivity extends React.Component<
  { pushPage(props: PushPageProps): void; popPage: any; pluginAbout: any },
  {}
> {
  private getPluginConfig = native.fs.readFile("plugins/" + this.props.pluginAbout.name + "/plugin.yaml", {
    parse: { use: true, mode: "yaml" },
  });

  private author = this.getPluginConfig?.package?.author;
  private version = this.getPluginConfig?.package?.version;
  private language = this.getPluginConfig?.package?.language;
  private description = this.getPluginConfig?.package?.description;

  public componentDidUpdate() {
    new Bootloader().styleInit();
  }

  private renderToolbar = () => {
    return (
      <Toolbar>
        <ToolbarBuilder
          title={"About " + this.props.pluginAbout.name}
          onBackButton={this.props.popPage}
          hasWindowsButtons={true}
          hasDarkMode={true}
        />
      </Toolbar>
    );
  };

  public render() {
    return (
      <Page
        modifier={native.checkPlatformForBorderStyle}
        renderToolbar={this.renderToolbar}
        key={this.props.pluginAbout.name + "-about"}
      >
        <ContentBody>
          <List>
            <ListItem tappable>
              <div className="left">
                <MDIcon icon="account_circle" size="24" />
              </div>
              <div className="center">Author: {this.author === tools.undefined ? "None" : this.author}</div>
            </ListItem>
            <ListItem tappable>
              <div className="left">
                <MDIcon icon="fact_check" size="24" />
              </div>
              <div className="center">Version: {this.version === tools.undefined ? "None" : this.version}</div>
            </ListItem>
            <ListItem tappable>
              <div className="left">
                <MDIcon icon="language" size="24" />
              </div>
              <div className="center">Language: {this.language === tools.undefined ? "None" : this.language}</div>
            </ListItem>
            <ListItem expandable tappable>
              <div className="left">
                <MDIcon icon="description" size="24" />
              </div>
              <div className="center">Description</div>
              <div className="expandable-content">
                <div className={"markdown-body-" + tools.typeIF(native.getPref("enableDarkmode"), "dark", "light")}>
                  <HighlightedMarkdown>
                    {this.description === tools.undefined ? "None" : this.description}
                  </HighlightedMarkdown>
                </div>
              </div>
            </ListItem>
          </List>
        </ContentBody>
      </Page>
    );
  }
}

export default PluginAboutActivity;
