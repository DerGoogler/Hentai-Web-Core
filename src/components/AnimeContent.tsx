import { PictureBuilder } from "@Builders";
import * as React from "react";
import { Button, List, SearchInput } from "react-onsenui";
import ContentBody from "./ContentBody";
import native from "@Native/index";
import { string } from "@Strings";
import MDIcon from "./MDIcon";
import tools from "@Misc/tools";
import CustomSearchInput from "./CustomSearchInput";

class AnimeContent extends React.Component<
  {
    data: any[];
    name: string;
  },
  { search: string; currentSerachText: string; searchButtonDisabled: boolean }
> {
  private searchBar: React.RefObject<CustomSearchInput>;

  public constructor(props: any) {
    super(props);
    this.state = {
      search: "",
      currentSerachText: "",
      searchButtonDisabled: true,
    };
    this.searchBar = React.createRef();
  }

  private triggerSearch = () => {
    tools.ref(this.searchBar, (ref: CustomSearchInput) => {
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
            <CustomSearchInput
              placeholder={`${string.search} ${this.props.name}`}
              ref={this.searchBar}
              style={{
                borderRadius: "8px",
                width: "100%",
                marginRight: "4px",
                backgroundColor: native.getPref("enableDarkmode") === "true" ? "#1F1F1F" : "transparent",
              }}
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
