// Regular Modules
import * as React from "react";
import { Card } from "react-bootstrap";
import { hot } from "react-hot-loader/root";
import { AnimePictureInterface } from "../d/inferface";

class AnimePicture extends React.Component<AnimePictureInterface> {
  render() {
    const { note, source } = this.props;
    return (
      <>
        <Card style={{ padding: "0px" }}>
          <Card.Header>
            <h4>{note.charAt(0).toUpperCase() + note.slice(1)}</h4>
          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
                {" "}
                <img
                  id="reload"
                  src={source}
                  alt={note.charAt(0).toUpperCase() + note.slice(1)}
                  style={{ width: "100%" }}
                  onDoubleClick={() => {
                    window.open(source, "_blank");
                  }}
                />{" "}
              </p>
            </blockquote>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default hot(AnimePicture);
