import * as React from "react";
import { Page } from "react-onsenui";

class AnimeTab extends React.Component<{ content: JSX.Element }> {
  public render() {
    return (
      <Page>
        <page-section>
          <span>{this.props.content}</span>
        </page-section>
      </Page>
    );
  }
}

export default AnimeTab;
