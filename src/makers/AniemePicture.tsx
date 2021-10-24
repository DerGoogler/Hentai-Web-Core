// Regular Modules
import * as React from "react";
import { Card } from "react-onsenui";
import { hot } from "react-hot-loader/root";
import All from "../inferface";

class AnimePicture extends React.Component<All> {
  render() {
    const { note, source } = this.props;
    return (
      <Card>
        <img
          id="reload"
          src={source}
          alt={note.charAt(0).toUpperCase() + note.slice(1)}
          style={{ width: "100%" }}
        />
        <div className="title right">
          {note.charAt(0).toUpperCase() + note.slice(1)}
        </div>
      </Card>
    );
  }
}

export default hot(AnimePicture);
