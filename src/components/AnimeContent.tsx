import { PictureBuilder } from "@Builders";
import * as React from "react";
import { List, SearchInput } from "react-onsenui";
import ContentBody from "./ContentBody";
import native from "@Native/index";
import { string } from "@Strings";

class AnimeContent extends React.Component<
  {
    data: any[];
    name: string;
  },
  { search: string }
> {
  public constructor(props: any) {
    super(props);
    this.state = { search: "" };
  }

  private makeUUID(length: number) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  private uuid: string = this.makeUUID(26);

  private filter = (e: any) => {
    this.setState({ search: e.target.value.toLowerCase() });
  };

  public render = () => {
    const listItems = this.props.data.map((item: any[]) => (
      <PictureBuilder searchState={this.state.search} key={item.toString()} source={item} note={item} />
    ));

    return (
      <ContentBody className="Anime-Content">
        <div
          style={{
            textAlign: "center",
            display: /*"flex"*/ "flex",
            justifyContent: "center",
            padding: "0px",
            paddingBottom: "0px",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              padding: "8px",
              paddingBottom: "0px",
              flexDirection: "column",
            }}
          >
            <SearchInput
              // @ts-ignore
              placeholder={`${string.search} ${this.props.name}`}
              style={{
                display: native.getPref("hideSearchbar") === "true" ? "none" : "",
                borderRadius: "8px",
                backgroundColor: native.getPref("enableDarkmode") === "true" ? "#1F1F1F" : "transparent",
              }}
              onChange={this.filter}
            />
          </div>
          <List id={`picture-list-${this.uuid}`}>{listItems}</List>
        </div>
      </ContentBody>
    );
  };
}

export default AnimeContent;
