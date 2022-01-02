import React from "react";
import { List, ListItem, Page, Toolbar } from "react-onsenui";
import native from "@Native";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import ToolbarBuilder from "@Builders/ToolbarBuilder";
import ContentBody from "@Builders/ContentBody";
import "@Styles/github/markdown-dark.scss";
import "@Styles/github/markdown-light.scss";
import tools from "@Misc/tools";
import { GitHubIssuesComments, GitHubIssuesInterface, Label } from "@Types/GitHubIssues";
import { Badge } from "react-bootstrap";

class IssuesActivity extends React.Component<{}, { data: GitHubIssuesInterface[] }> {
  public constructor(props: any) {
    super(props);
    this.state = { data: [] };
  }

  public componentDidMount = () => {
    axios.get("https://api.github.com/repos/DerGoogler/Hentai-Web/issues").then((res) => {
      const data = res.data;
      this.setState({ data: data });
    });
  };

  private renderToolbar() {
    return (
      <Toolbar>
        <ToolbarBuilder
          title={"Issues"}
          hasBackButton={true}
          hasWindowsButtons={true}
          hasDarkMode={true}
        />
      </Toolbar>
    );
  }

  public render() {
    const { data } = this.state;

    const issues = data.map((items: GitHubIssuesInterface) => (
      <>
        <ListItem key={items.node_id} expandable>
          <div className="left">
            <img className="list-item__thumbnail" src={items.user?.avatar_url} />
          </div>
          <div className="center">
            <span className="list-item__title">{items.title}</span>
            <span className="list-item__subtitle">{items.user?.login}</span>
          </div>
          <div className="expandable-content">
            <div
              className={
                "markdown-body-" + tools.typeIF(native.getPref("enableDarkmode"), "dark", "light")
              }
            >
              {/*
 // @ts-ignore */}
              <Markdown>{items.body}</Markdown>
            </div>

            <hr style={{ border: "1px solid #757575" }} />
            {items.labels?.map((label: Label) => (
              <span
                key={label.node_id}
                id={label.id?.toString()}
                style={{
                  display: "inline-block",
                  padding: ".35em .65em",
                  fontSize: ".75em",
                  fontWeight: "700",
                  lineHeight: "1",
                  color: "#fff",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  verticalAlign: "baseline",
                  borderRadius: ".25rem",
                  backgroundColor: `#${label.color}`,
                }}
              >
                {label.name}&nbsp;
              </span>
            ))}
          </div>
        </ListItem>
      </>
    ));

    return (
      <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
        <ContentBody>
          <div
            style={{
              padding: "16px",
            }}
          >
            <List>{issues}</List>
          </div>
        </ContentBody>
      </Page>
    );
  }
}

export default IssuesActivity;
