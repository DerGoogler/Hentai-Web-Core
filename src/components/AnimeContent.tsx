import { PictureBuilder } from "@Builders";
import * as React from "react";
import { Button, List, SearchInput } from "react-onsenui";
import ContentBody from "./ContentBody";
import native from "@Native/index";
import { string } from "@Strings";
import MDIcon from "./MDIcon";
import tools from "@Misc/tools";
import { OnsSearchInputElement } from "onsenui";
import CustomSearchbar from "./CustomSearchbar";

class AnimeContent extends React.Component<
  {
    data: any[];
    name: string;
  },
  { search: string; currentSerachText: string; searchButtonDisabled: boolean }
> {
  private searchBar: React.RefObject<CustomSearchbar>;

  public constructor(props: any) {
    super(props);
    this.state = {
      search: "",
      currentSerachText: "",
      searchButtonDisabled: true,
    };
    this.searchBar = React.createRef();
  }

  /*
  public componentDidMount() {
    tools.ref(this.searchBar, (ref: SearchInput) => {
      ref.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.keyCode === 13) {
          console.log("Enter")
        }
      });
    })
  } */

  private filter = (e: any) => {
    this.setState({ search: e.target.value.toLowerCase() });
  };

  private triggerSearch = () => {
    tools.ref(this.searchBar, (ref: CustomSearchbar) => {
      this.setState({ search: ref.value.toLowerCase() });
    })

  };

  public render = () => {
    const { currentSerachText, searchButtonDisabled, search } = this.state;

    const listItems = this.props.data.map((item: any[]) => (
      <PictureBuilder searchState={search} key={item.toString()} source={item} note={item} />
    ));

    return (
      <ContentBody>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            padding: "0px",
            paddingBottom: "0px",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              textAlign: "center",
              display: native.getPref("hideSearchbar") === "true" ? "none" : "inline-flex",
              justifyContent: "center",
              padding: "8px",
              paddingBottom: "0px",
            }}
          >
            <CustomSearchbar
              placeholder={`${string.search} ${this.props.name}`}
              ref={this.searchBar}
              style={{
                borderRadius: "8px",
                width: "100%",
                marginRight: "4px",
                backgroundColor: native.getPref("enableDarkmode") === "true" ? "#1F1F1F" : "transparent",
              }}
            // onChange={this.filter}
            />
            <Button
              onClick={this.triggerSearch}
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                marginLeft: "4px",
                borderRadius: "8px",
              }}
            >
              <MDIcon icon="search" size="24" ignoreDarkmode={true} />
            </Button>
          </div>
          <List>{listItems}</List>
        </div>
      </ContentBody>
    );
  };
}

export default AnimeContent;
