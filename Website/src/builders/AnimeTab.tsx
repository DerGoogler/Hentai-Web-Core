import * as React from "react";
import { Page } from "react-onsenui";
import { hot } from "react-hot-loader/root";

class AnimeTab extends React.Component<{ content: any }> {
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
