// Regular Modules
import * as React from "react";
import { Page } from "react-onsenui";
import { hot } from "react-hot-loader/root";
import All from "../inferface";

class AnimeTab extends React.Component<All> {
  render() {
    return (
      <Page>
        <section style={{ marginTop: "8px", marginBottom: "8px" }}>
          <p>{this.props.content}</p>
        </section>
      </Page>
    );
  }
}

export default hot(AnimeTab);