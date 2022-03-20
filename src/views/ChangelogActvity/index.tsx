import { Button, Page, Toolbar } from "react-onsenui";
import native from "@Native/index";
import { ToolbarBuilder } from "@Builders";
import ContentBody from "@Components/ContentBody";
import { HighlightedMarkdown } from "../../components/HighlightMarkdown";
import { Props, States } from "./interface";
import  Activity from "@Views";

class ChangelogActivity extends Activity.Base<Props, States> {
  public constructor(props: any) {
    super(props)
  }

  public renderToolbar = () => {
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

  public renderPage = () => {
    return (
      <>
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
      </>
    );
  };
}

export default ChangelogActivity;
