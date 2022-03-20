import * as React from "react";
import Markdown from "markdown-to-jsx";
import tools from "@Misc/tools";
import hljs from "highlight.js";
import Video from "./Video";
import Center from "./Center";
import DiscordWidget from "./DiscordWidget";
import Font from "./Font";
// import "highlight.js/styles/atom-one-dark.css";

class HighlightedMarkdown extends React.Component<{ children: string }> {
  rootRef: React.RefObject<HTMLDivElement>;
  public constructor(props: any) {
    super(props);
    this.rootRef = React.createRef();
  }

  public componentDidMount() {
    tools.ref(this.rootRef, (ref: HTMLDivElement) => {
      ref.querySelectorAll("pre code").forEach((block: any) => {
        hljs.highlightElement(block);
      });
    });
  }

  public render() {
    return (
      <markdown-body ref={this.rootRef}>
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
              a: {
                component: "hw-a"
              }
            },
          }}
        >
          {this.props.children}
        </Markdown>
      </markdown-body>
    );
  }
}

export { HighlightedMarkdown };
