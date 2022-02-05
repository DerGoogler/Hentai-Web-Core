import * as React from "react";
import { hot } from "react-hot-loader/root";
import { List, ListItem, SearchInput } from "react-onsenui";
import ContentBody from "@Builders/ContentBody";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import yaml from "js-yaml";

class NewsActivity extends React.Component {
  public state = {
    data: [],
  };

  public componentDidMount() {
    // Use no slash at the start
    axios
      .get(window.location.href.replace(/(\?(.*?)=(.*)|\?)/gm, "") + "misc/news.yaml")
      .then((res: { data: any }) => {
        this.setState({ data: yaml.load(res.data, { json: true }) });
      });
  }

  public render() {
    /**
     * To load for every object an own AnimePicture from `data.ts`
     */
    const listItems = this.state.data.map((item: any) => (
      <ListItem expandable>
        {item.title}
        <div className="expandable-content">
          <Markdown>{item.msg}</Markdown>
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
