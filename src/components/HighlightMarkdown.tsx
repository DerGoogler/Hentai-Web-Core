import * as React from "react";
import Markdown from "markdown-to-jsx";
import tools from "@Misc/tools";
import hljs from "highlight.js";
import Video from "./Video";
import Center from "./Center";
import DiscordWidget from "./DiscordWidget";
import Font from "./Font";
import { ViewX, ViewXRenderData } from "react-onsenuix";
// import "highlight.js/styles/atom-one-dark.css";

class HighlightedMarkdown extends ViewX {
  rootRef: React.RefObject<HTMLDivElement>;
  public constructor(props: any) {
    super(props);
    this.rootRef = React.createRef();
    this.createView = this.createView.bind(this);
  }

  public componentDidMount() {
    tools.ref(this.rootRef, (ref: HTMLDivElement) => {
      ref.querySelectorAll("pre code").forEach((block: any) => {
        hljs.highlightElement(block);
      });
    });
  }

  public createView(data: ViewXRenderData<{}, {}, HTMLElement>): JSX.Element {
    return (
      <div ref={this.rootRef}>
        <Markdown
          options={{
            overrides: {
              video: {
                component: Video,
              },
              center: {
                component: Center,
              },
              font: {
                component: Font,
              },
              discordwidget: {
                component: DiscordWidget,
              },
            },
          }}
        >
          {data.p.children as string}
        </Markdown>
      </div>
    );
  }
}

export { HighlightedMarkdown };
