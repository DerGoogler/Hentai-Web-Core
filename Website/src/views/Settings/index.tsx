import * as React from "react";
import { hot } from "react-hot-loader/root";
import Switchh from "./Switch";
import { List, ListHeader } from "react-onsenui";
import ContentBody from "../../builders/ContentBody";
import { Provider, Translate, Translator } from "react-translated";
import Selectt from "./Select";

class Settings extends React.Component {
  public render() {
    return (
      <ContentBody>
        <List>
          <ListHeader>
            <Translate text="appearance" />
          </ListHeader>
          <Switchh _key="enableDarkmode" disabled={true}>
            enableDarkmode-string
          </Switchh>
          <Switchh _key="hideFAB">hideFAB-string</Switchh>
          <Selectt _key="language">language-string</Selectt>

          <ListHeader>
            <Translate text="card" />
          </ListHeader>
          <Switchh _key="fitImageToCard">fitImageToCard-string</Switchh>
          <Switchh _key="displayDownload">displayDownload-string</Switchh>
          <Switchh _key="removeTitle">removeTitle-string</Switchh>

          <ListHeader>
            <Translate text="security" />
          </ListHeader>
          <Switchh _key="alwaysLogin">alwaysLogin-string</Switchh>

          <ListHeader>
            <Translate text="others" />
          </ListHeader>
          <Switchh _key="enableSwipeBetweenTabs">enableSwipeBetweenTabs-string</Switchh>
          <Switchh _key="saveLastUsedTab">saveLastUsedTab-string</Switchh>
          <Switchh _key="disableSplashscreen">disableSplashscreen-string</Switchh>
        </List>
      </ContentBody>
    );
  }
}

export default hot(Settings);
