import React from "react";
import { Button, Page, Toolbar } from "react-onsenui";
import native from "@Native/index";
import ToolbarBuilder from "@Builders/ToolbarBuilder";
import ContentBody from "@Components/ContentBody";
import "@Styles/github/markdown-dark.scss";
import "@Styles/github/markdown-light.scss";
import tools from "@Misc/tools";
import { HighlightedMarkdown } from "../components/HighlightMarkdown";
import Bootloader from "@Bootloader";
import { Changelog } from "@Types/init";

class ChangelogActivity extends React.Component<{ popPage: any; changelog: Changelog }, {}> {
  public componentDidMount() {
    console.log(this.props.changelog.package.android);
  }

  private renderToolbar = () => {
    return (
      <Toolbar>
        <ToolbarBuilder
          title={"Changelog " + this.props.changelog.version}
          onBackButton={this.props.popPage}
          hasWindowsButtons={true}
          hasDarkMode={true}
        />
      </Toolbar>
    );
  };

  public render = () => {
    return (
      <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
        <ContentBody className={"markdown-body-" + tools.typeIF(native.getPref("enableDarkmode"), "dark", "light")}>
          <div
            style={{
              padding: "16px",
            }}
          >
            <HighlightedMarkdown>{this.props.changelog.changes}</HighlightedMarkdown>
            <Button
              modifier="large"
              onClick={() => {
                if (native.isAndroid) {
                  native.open(this.props.changelog.package.android);
                } else if (native.isWindows) {
                  native.open(this.props.changelog.package.windows);
                } else {
                  console.log("");
                }
              }}
            >
              Download
            </Button>
          </div>
        </ContentBody>
      </Page>
    );
  };
}

export default ChangelogActivity;
