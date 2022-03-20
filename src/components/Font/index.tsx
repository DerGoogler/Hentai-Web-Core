import * as React from "react";
import FontInterface from "./interface";

class Font extends React.Component<FontInterface> {
  public render() {
    const { color, children, style } = this.props;
    return (
      <hw-span style={style}>
        <hw-span style={{ color: color }}>{children}</hw-span>
      </hw-span>
    );
  }
}

export default Font;
