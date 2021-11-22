// Regular Modules
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { ImageView } from "react-windows-ui";
import { AnimePictureInterface } from "../../d/inferface";

class AnimePicture extends React.Component<AnimePictureInterface> {
  public render() {
    const { note, source } = this.props;
    return (
      <div style={{ margin: "8px" }}>
        <ImageView
          src={source}
          title={note.charAt(0).toUpperCase() + note.slice(1)}
          width="100%"
          height="100%"
          borderRadius={8}
          insetShadow={false}
        />
      </div>
    );
  }
}

export default hot(AnimePicture);
