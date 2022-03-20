import tools from "@Misc/tools";
import * as React from "react";
import { isDesktop } from "react-device-detect";
import VideoInterface from "./interface";

class Video extends React.Component<VideoInterface> {
  public render() {
    const { src, type, controls, noSupportText, style, poster } = this.props;
    const Style = {
      width: "100%",
      height: tools.typeIF(isDesktop, "445px", "181.500px"),
      padding: "0px",
      margin: "0px",
    };

    if (type === "video/youtube") {
      return (
        <>
          <iframe
            className="Video--Custom card"
            style={tools.typeCheck(style, Style)}
            src={`https://www.youtube.com/embed/${src.replace(
              "https://www.youtube.com/watch?v=",
              ""
            )}`}
          ></iframe>
        </>
      );
    }

    return (
      <>
        <video
          className="Video--Custom card"
          style={tools.typeCheck(style, Style)}
          controls={tools.typeCheck(controls, true)}
          poster={poster}
        >
          <source src={src} type={tools.typeCheck(type, "video/mp4")} />
          {tools.typeCheck(noSupportText, "Your browser does not support HTML video.")}
        </video>
      </>
    );
  }
}

export default Video;
