import AnimePicture from "../../builders/AnimePicture";
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { List, SearchInput } from "react-onsenui";
import data from "./data";
import ContentBody from "../../builders/ContentBody";
import { android } from "../../misc/android";
import tools from "../../misc/tools";
import hmtai from "./../../misc/hmtai";

class SFW extends React.Component {
  private element!: HTMLElement | null;

  private filter(e: any) {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    filter = e.target.value.toUpperCase();
    ul = document.getElementById("picture-list-sfw");
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
    const listItems = data.map((item) => (
      <AnimePicture key={item.name} source={item.source} note={item.name} />
    ));

    return (
      <ContentBody>
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
              display: /*"flex"*/ "flex",
              justifyContent: "center",
              padding: "8px",
              paddingBottom: "0px",
              flexDirection: "column",
            }}
          >
            <SearchInput
              // @ts-ignore
              placeholder="Search SFW"
              style={{
                display: tools.typeIF(android.getPref("hideSearchbar"), "none", ""),
              }}
              modifier="custom"
              onChange={this.filter}
            />
          </div>
          <List id="picture-list-sfw">{listItems}</List>
        </div>
      </ContentBody>
    );
  }
}

export default hot(SFW);
