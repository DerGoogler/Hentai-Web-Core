// Regular Modules
import * as React from "react";
import { Button } from "react-onsenui";
import { hot } from "react-hot-loader/root";

class Butt extends React.Component<{
  onClick?(e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined): void;
}> {
  public render() {
    const { onClick } = this.props;
    return (
      <p style={{ textAlign: "center" }}>
        <Button onClick={onClick}>{this.props.children}</Button>
      </p>
    );
  }
}

export default hot(Butt);
