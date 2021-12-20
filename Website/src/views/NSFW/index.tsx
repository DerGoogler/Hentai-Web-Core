import AnimePicture from "../../builders/AniemePicture";
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { List } from "react-onsenui";
import data from "./data";

class NSFW extends React.Component {
  render() {
    /**
     * To load for every object an own AnimePicture from `data.ts`
     */
    const listItems = data.map((item) => (
      <AnimePicture key={item.name} source={item.source} note={item.name} />
    ));

    return <List>{listItems}</List>;
  }
}

export default hot(NSFW);
