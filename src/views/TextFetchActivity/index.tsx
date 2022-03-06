import { Toolbar } from "react-onsenui";
import axios from "axios";
import { ToolbarBuilder } from "@Builders";
import ContentBody from "@Components/ContentBody";
import { HighlightedMarkdown } from "../../components/HighlightMarkdown";
import { Props, States } from "./interface";
import Activity from "@Views";

class TextFetchActivity extends Activity.Base<Props, States> {
  public constructor(props: any) {
    super(props);
    this.state = { data: "" };

  }

  public componentDidMount = () => {
    const { textFetch } = this.props;
    axios.get(textFetch.url).then((res) => {
      const data = res.data;
      this.setState({ data: data });
    });
  };

  public renderToolbar = () => {
    const { textFetch, popPage } = this.props;
    return (
      <Toolbar>
        <ToolbarBuilder title={textFetch.title} onBackButton={popPage} hasWindowsButtons={true} />
      </Toolbar>
    );
  };

  public renderPage() {
    const { data } = this.state;
    return (
      <ContentBody className="markdownBody">
        <div
          style={{
            padding: "16px",
          }}
        >
          <HighlightedMarkdown>{data}</HighlightedMarkdown>
        </div>
      </ContentBody>
    );
  }
}

export default TextFetchActivity;
