import React from "react";
import { Button, Carousel, CarouselItem, Page, Toolbar } from "react-onsenui";
import native from "@Native/index";
import axios from "axios";
import ToolbarBuilder from "@Builders/ToolbarBuilder";
import ContentBody from "@Components/ContentBody";
import "@Styles/github/markdown-dark.scss";
import "@Styles/github/markdown-light.scss";
import tools from "@Misc/tools";
import { HighlightedMarkdown } from "./../components/HighlightMarkdown";
import Bootloader from "@Bootloader";
import { PushPageProps } from "@Types/init";
import LoginActivity from "./LoginActivity";

class FistStartupActivity extends React.Component<
  { pushPage(props: PushPageProps): void; popPage: any },
  { items: any; index: number }
> {
  public constructor(props: any) {
    super(props);
    this.state = {
      items: [
        `
## Android

- Option to keep the screen on
- Option to inspect the app with an console
- Option to login with an fingerprint
- Option to use custom themes (Need to make self or download)
          `,
        `
## Windows

- Option to open the app path
- Option to enable DevTools
- Option to Resize the window to different phone sizes
- Option to use custom themes (Need to make self or download)
           `,
        `
## Global (All Platforms)

- Option to change the language
  - Only german and english at the monent
- Option to enable always login
- Option to change the cards design
- Option to enable dark mode
- Option to enable iOS design (don't use it with dark mode, because it isn't supported)
- Option to hide the search bars/inputs
           `,
      ],
      index: 0,
    };
  }

  public componentDidUpdate() {
    new Bootloader().styleInit();
  }

  private renderToolbar = () => {
    return (
      <Toolbar>
        <ToolbarBuilder title={"Wellcome"} hasWindowsButtons={true} />
      </Toolbar>
    );
  };

  private handleChange(e: any) {
    this.setState({ index: e.activeIndex });
  }

  private setIndex(index: number) {
    this.setState({ index: index });
  }

  public render() {
    return (
      <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
        <Carousel
          // @ts-ignore
          onPostChange={this.handleChange}
          index={this.state.index}
          fullscreen
          swipeable
          autoScroll
          overscrollable
        >
          {this.state.items.map((item: any, index: number) => (
            <CarouselItem key={index} style={{ backgroundColor: "#fff" }}>
              <ContentBody
                className={"markdown-body-" + tools.typeIF(native.getPref("enableDarkmode"), "dark", "light")}
              >
                <div
                  style={{
                    padding: "16px",
                  }}
                >
                  <HighlightedMarkdown>{item}</HighlightedMarkdown>
                  <Button
                    modifier="large"
                    onClick={() => {
                      this.props.pushPage({
                        activity: LoginActivity,
                        key: "login",
                      });
                    }}
                  >
                    Start Login
                  </Button>
                </div>
              </ContentBody>
            </CarouselItem>
          ))}
        </Carousel>

        <div
          style={{
            textAlign: "center",
            fontSize: "20px",
            position: "absolute",
            bottom: "36px",
            left: "0px",
            right: "0px",
          }}
        >
          {this.state.items.map((item: any, index: number) => (
            <span key={index} style={{ cursor: "pointer" }} onClick={this.setIndex.bind(this, index)}>
              {this.state.index === index ? "\u25CF" : "\u25CB"}
            </span>
          ))}
        </div>
      </Page>
    );
  }
}

export default FistStartupActivity;
