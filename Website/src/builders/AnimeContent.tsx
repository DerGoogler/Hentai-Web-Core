import PictureBuilder from "./PictureBuilder";
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { List, SearchInput } from "react-onsenui";
import ContentBody from "./ContentBody";
import native from "@Native/index";
import tools from "@Misc/tools";

class AnimeContent extends React.Component<{
  data: any;
  name: string;
}> {
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

  private filter(e: any) {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    filter = e.target.value.toUpperCase();
    ul = document.getElementById(`picture-list-${this.uuid}`);
    // @ts-ignore
    li = ul.getElementsByTagName("card");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("name")[0];
      // @ts-ignore
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        // @ts-ignore
        li[i].style.display = "";
      } else {
        // @ts-ignore
        li[i].style.display = "none";
      }
    }
  }

  public render() {
    /**
     * To load for every object an own AnimePicture from `data.ts`
     */
    const listItems = this.props.data.map((item: { name: string; source: any; isNew: boolean }) => (
      <PictureBuilder key={item.name} source={item.source} note={item.name} isNew={item.isNew} />
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
              placeholder={"Search " + this.props.name}
              style={{
                display: tools.typeIF(native.getPref("hideSearchbar"), "none", ""),
                borderRadius: "8px",
                backgroundColor: tools.typeIF(native.getPref("enableDarkmode"), "#1F1F1F", "transparent"),
              }}
              modifier="custom"
              onChange={this.filter}
            />
          </div>
          <List id={`picture-list-${this.uuid}`}>{listItems}</List>
        </div>
      </ContentBody>
    );
  }
}

export default hot(AnimeContent);
