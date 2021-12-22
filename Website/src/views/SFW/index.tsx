import AnimePicture from "../../builders/AnimePicture";
import hmtai from "hmtai";
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { List, SearchInput } from "react-onsenui";
import data from "./data";
import ContentBody from "../../builders/ContentBody";

class SFW extends React.Component {
  private element!: HTMLElement | null;

  public state = {
    searchValue: "",
  };

  public render() {
    /**
     * To load for every object an own AnimePicture from `data.ts`
     */
    const listItems = data.map((item) => (
      <AnimePicture key={item.name} source={item.source} note={item.name} />
    ));

    return (
      <ContentBody>
        <div
          style={{
            textAlign: "center",
            display: /*"flex"*/ "none",
            justifyContent: "center",
            padding: "8px",
            paddingBottom: "0px",
            flexDirection: "column",
          }}
        >
          <SearchInput
            // @ts-ignore
            placeholder="Search"
            modifier="custom"
          />
        </div>
        <List id="picture-list">{listItems}</List>
      </ContentBody>
    );
  }
}

export default hot(SFW);
