import tools from "@Misc/tools";
import * as React from "react";
import { ViewX, ViewXRenderData } from "react-onsenuix";

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

class Gesture extends ViewX<Props, {}> {
  private gerstureID: React.RefObject<HTMLDivElement>;

  public constructor(props: any) {
    super(props);
    this.gerstureID = React.createRef();
    this.createView = this.createView.bind(this);
  }

  public componentDidMount() {
    const { callback, event } = this.props;

    tools.ref(this.gerstureID, (ref: HTMLDivElement) => {
      ref.addEventListener(event, callback);
    });
  }

  public createView(data: ViewXRenderData<Props, {}, HTMLElement>): JSX.Element {
    return <div ref={this.gerstureID}>{data.p.children}</div>;
  }
}

export default Gesture;
