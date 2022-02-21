import tools from "@Misc/tools";
import * as React from "react";

class Gesture extends React.Component<
  {
    id: string;
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
    callback: Function;
  },
  {}
> {
  public componentDidMount() {
    const { id, callback, event } = this.props;

    tools.gesture(id, event, () => {
      if (typeof callback === "function") {
        callback();
      }
    });
  }

  public render() {
    const { id, children } = this.props;
    return <div id={id}>{children}</div>;
  }
}

export default Gesture;
