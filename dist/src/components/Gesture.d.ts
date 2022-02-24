import * as React from "react";
declare class Gesture extends React.Component<{
    event: "drag" | "dragleft" | "dragright" | "dragup" | "dragdown" | "hold" | "release" | "swipe" | "swipeleft" | "swiperight" | "swipeup" | "swipedown" | "tap" | "doubletap" | "touch" | "transform" | "pinch" | "pinchin" | "pinchout" | "rotate";
    callback(...props: any): void;
}, {}> {
    private gerstureID;
    constructor(props: any);
    componentDidMount(): void;
    render(): JSX.Element;
}
export default Gesture;
