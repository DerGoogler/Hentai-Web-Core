import * as React from "react";
import FontInterface from "./interface";

class Font extends React.Component<FontInterface> {
  public render() {
    const { color, children, style } = this.props;
    return (
      <span style={style}>
        <span style={{ color: color }}>{children}</span>
      </span>
    );
  }
}

export default Font;
