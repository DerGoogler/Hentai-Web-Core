import * as React from "react";
import { Card } from "react-onsenui";
import ContentBody from "./ContentBody";
import axios from "axios";
import yaml from "js-yaml";
import tools from "@Misc/tools";
import native from "@Native/index";
import { HighlightedMarkdown } from "./HighlightMarkdown";
import BaseComponent from "./BaseComponent";

class News extends BaseComponent<{}, any> {
  public constructor(props: any) {
    super(props)
    this.state = {
      data: []
    }
  }

  public componentDidMount() {
    // Use no slash at the start
    axios.get(window.location.href.replace(/(\?(.*?)=(.*)|\?)/gm, "") + "misc/news.yaml").then((res: { data: any }) => {
      this.setState({ data: yaml.load(res.data, { json: true }) });
    });
  }

  public renderComponent = () => {
    /**
     * To load for every object an own AnimePicture from `data.ts`
     */
    const listItems = this.state.data.map((item: any) => (<React.Fragment>
      <Card style={{ borderRadius: "8px", border: "0px" }}>
        <div className="title">
          {item.title}
        </div>
        <div className={"markdown-body-" + tools.typeIF(native.getPref("enableDarkmode"), "dark", "light") + " content"} style={{ color: "black" }}>
          <HighlightedMarkdown>{item.msg}</HighlightedMarkdown>
        </div>
      </Card>
    </React.Fragment>
    ));

    return (
      <ContentBody>
        {listItems}
      </ContentBody>
    );
  }
}

export default News;
