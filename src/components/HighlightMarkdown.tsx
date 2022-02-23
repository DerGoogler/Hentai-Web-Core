import * as React from "react";
import Markdown from "markdown-to-jsx";
import tools from "@Misc/tools";
import hljs from "highlight.js";
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
        hljs.highlightBlock(block);
      });
    });
  }

  public render() {
    return (
      <div ref={this.rootRef}>
        <Markdown>{this.props.children}</Markdown>
      </div>
    );
  }
}

export { HighlightedMarkdown };
