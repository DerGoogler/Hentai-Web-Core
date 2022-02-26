import * as React from "react";
import CenterInterface from "./interface";

class Center extends React.Component<CenterInterface> {
  public render() {
    const { children, style } = this.props;
    return (
      <span style={style}>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </span>
      </span>
    );
  }
}

export default Center;
