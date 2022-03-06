import tools from "@Misc/tools";
import * as React from "react";
import DiscordWidgetInterface from "./interface";

class DiscordWidget extends React.Component<DiscordWidgetInterface> {
  public render() {
    const { token, width, height, theme } = this.props;
    return (
      <>
        <discord-widget
          className="DiscordWidget--Custom card"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0px",
          }}
          src={
            "https://discord.com/widget?id=" +
            tools.typeCheck(token, "753360232515764255") +
            " &theme=" +
            tools.typeCheck(theme, "dark")
          }
          width={tools.typeCheck(width, 350)}
          height={tools.typeCheck(height, 500)}
          allowTransparency={true}
          frameBorder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></discord-widget>
      </>
    );
  }
}

export default DiscordWidget;
