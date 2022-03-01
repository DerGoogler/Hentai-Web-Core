import * as React from "react";
interface Props {
    event: "drag" | "dragleft" | "dragright" | "dragup" | "dragdown" | "hold" | "release" | "swipe" | "swipeleft" | "swiperight" | "swipeup" | "swipedown" | "tap" | "doubletap" | "touch" | "transform" | "pinch" | "pinchin" | "pinchout" | "rotate";
    callback(...props: any): void;
}
declare class Gesture extends React.Component<Props, {}> {
    private gerstureID;
    constructor(props: any);
    componentDidMount(): void;
    render(): JSX.Element;
}
export default Gesture;
