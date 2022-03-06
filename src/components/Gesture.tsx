import doc from "@Misc/doc";
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
  private gersture: React.RefObject<HTMLDivElement>;
  constructor(props: any) {
    super(props);
    this.gersture = React.createRef();
  }
  public componentDidMount() {
    const { callback, event } = this.props;
    doc.getByRef<HTMLDivElement>(this.gersture)?.addEventListener(event, callback)
  }

  public render() {
    const { children } = this.props;
    return <gerture-element ref={this.gersture}>{children}</gerture-element>;
  }
}

export default Gesture;
