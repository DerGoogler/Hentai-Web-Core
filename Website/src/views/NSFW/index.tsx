import AnimePicture from "../../builders/AnimePicture";
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { List } from "react-onsenui";
import data from "./data";
import ContentBody from "../../builders/ContentBody";

class NSFW extends React.Component {
  public render() {
    /**
     * To load for every object an own AnimePicture from `data.ts`
     */
    const listItems = data.map((item) => (
      <AnimePicture key={item.name} source={item.source} note={item.name} />
    ));

    return (
      <ContentBody>
        <List>{listItems}</List>
      </ContentBody>
    );
  }
}

export default hot(NSFW);
