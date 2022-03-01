import tools from "@Misc/tools";
import * as React from "react";

interface Props {
  event:
  | "drag"
  | "dragleft"
  | "dragright"
  | "dragup"
  | "dragdown"
  | "hold"
  | "release"
  | "swipe"
  | "swipeleft"
  | "swiperight"
  | "swipeup"
  | "swipedown"
  | "tap"
  | "doubletap"
  | "touch"
  | "transform"
  | "pinch"
  | "pinchin"
  | "pinchout"
  | "rotate";
  callback(...props: any): void;
}

class Gesture extends React.Component<Props, {}> {
  private gerstureID: React.RefObject<HTMLDivElement>;
  constructor(props: any) {
    super(props);
    this.gerstureID = React.createRef();
  }
  public componentDidMount() {
    const { callback, event } = this.props;

    tools.ref(this.gerstureID, (ref: HTMLDivElement) => {
      ref.addEventListener(event, callback);
    });
  }

  public render() {
    const { children } = this.props;
    return <gerture-element ref={this.gerstureID}>{children}</gerture-element>;
  }
}

export default Gesture;
