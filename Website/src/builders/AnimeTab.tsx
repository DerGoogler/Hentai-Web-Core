// Regular Modules
import * as React from "react";
import { Page } from "react-onsenui";
import { hot } from "react-hot-loader/root";
import { AnimeTabInterface } from "../d/inferface";

class AnimeTab extends React.Component<AnimeTabInterface> {
  public render() {
    return (
      <Page>
        <section>
          <span>{this.props.content}</span>
        </section>
      </Page>
    );
  }
}

export default hot(AnimeTab);
