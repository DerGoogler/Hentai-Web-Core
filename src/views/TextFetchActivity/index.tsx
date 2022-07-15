import React from "react";
import { Page } from "react-onsenuix";
import native from "@Native/index";
import axios from "axios";
import { ToolbarBuilder } from "@Builders";
import ContentBody from "@Components/ContentBody";
import { HighlightedMarkdown } from "../../components/HighlightMarkdown";
import { Props, States } from "./interface";

class TextFetchActivity extends React.Component<Props, States> {
  public constructor(props: any) {
    super(props);
    this.state = { data: "" };
    this.renderToolbar = this.renderToolbar.bind(this);
  }

  public componentDidMount = () => {
    const { textFetch } = this.props;
    axios.get(textFetch.url).then((res) => {
      const data = res.data;
      this.setState({ data: data });
    });
  };

  private renderToolbar = () => {
    const { textFetch, popPage } = this.props;
    return <ToolbarBuilder title={textFetch.title} onBackButton={popPage} hasWindowsButtons={true} />;
  };

  public render() {
    const { data } = this.state;
    return (
      <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
        <ContentBody className="markdownBody">
          <div
            style={{
              padding: "16px",
            }}
          >
            <HighlightedMarkdown>{data}</HighlightedMarkdown>
          </div>
        </ContentBody>
      </Page>
    );
  }
}

export default TextFetchActivity;
