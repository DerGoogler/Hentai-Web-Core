import * as React from "react";
import { hot } from "react-hot-loader/root";
import { List, ListItem, SearchInput } from "react-onsenui";
import ContentBody from "@Builders/ContentBody";
import axios from "axios";
import Markdown from "markdown-to-jsx";

class AnimeContent extends React.Component {
  public state = {
    data: [],
  };

  public componentDidMount() {
    // Use no slash at the start
    axios
      .get(window.location.href.replace(/(\?(.*?)=(.*)|\?)/gm, "") + "misc/news.json")
      .then((res: { data: any }) => {
        this.setState({ data: res.data });
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
      <ContentBody className="Anime-Content">
        <List>{listItems}</List>
      </ContentBody>
    );
  }
}

export default hot(AnimeContent);
