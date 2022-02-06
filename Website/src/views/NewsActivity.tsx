import * as React from "react";
import { hot } from "react-hot-loader/root";
import { List, ListItem, SearchInput } from "react-onsenui";
import ContentBody from "@Builders/ContentBody";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import yaml from "js-yaml";
import tools from "@Misc/tools";
import native from "@Native/index";
import { HighlightedMarkdown } from "./../components/HighlightMarkdown";
import Bootloader from "@Bootloader";

class NewsActivity extends React.Component {
  public state = {
    data: [],
  };

  public componentDidMount() {
    // Use no slash at the start
    axios.get(window.location.href.replace(/(\?(.*?)=(.*)|\?)/gm, "") + "misc/news.yaml").then((res: { data: any }) => {
      this.setState({ data: yaml.load(res.data, { json: true }) });
    });
  }

  public componentDidUpdate() {
    new Bootloader().styleInit();
  }

  public render() {
    /**
     * To load for every object an own AnimePicture from `data.ts`
     */
    const listItems = this.state.data.map((item: any) => (
      <ListItem expandable>
        {item.title}
        <div className="expandable-content">
          <div className={"markdown-body-" + tools.typeIF(native.getPref("enableDarkmode"), "dark", "light")}>
            <HighlightedMarkdown>{item.msg}</HighlightedMarkdown>
          </div>
        </div>
      </ListItem>
    ));

    return (
      <ContentBody>
        <List>{listItems}</List>
      </ContentBody>
    );
  }
}

export default NewsActivity;
