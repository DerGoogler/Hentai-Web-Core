import React from "react";
import { Button, Page } from "react-onsenuix";
import native from "@Native/index";
import { ToolbarBuilder } from "@Builders";
import ContentBody from "@Components/ContentBody";
import { HighlightedMarkdown } from "../../components/HighlightMarkdown";
import { Props, States } from "./interface";

class ChangelogActivity extends React.Component<Props, States> {
  public componentDidMount() {
    console.log(this.props.changelog.package.android);

    this.renderToolbar = this.renderToolbar.bind(this);
  }

  private renderToolbar = () => {
    return <ToolbarBuilder title={"Changelog " + this.props.changelog.version} onBackButton={this.props.popPage} hasWindowsButtons={true} hasDarkMode={true} />;
  };

  public render = () => {
    return (
      <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
        <ContentBody className="markdownBody">
          <div
            style={{
              padding: "16px",
            }}
          >
            <HighlightedMarkdown>{this.props.changelog.changes}</HighlightedMarkdown>
            <Button
              style={{ borderRadius: "8px" }}
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
