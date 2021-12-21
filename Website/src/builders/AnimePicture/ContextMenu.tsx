// Regular Modules
import * as React from "react";
import { Dropdown } from "react-bootstrap";
import { hot } from "react-hot-loader/root";
import { AnimePictureInterface } from "../../d/inferface";
import { Provider, Translate, Translator } from "react-translated";

/**
 * Creates an context menu for the images
 */
class ContextMenu extends React.Component<AnimePictureInterface> {
  public render() {
    const { note, source } = this.props;
    return (
      <>
        <Dropdown.Item
          onClick={() => {
            window.open(source, "_blank");
          }}
        >
          <Translate text="view-image" />
        </Dropdown.Item>

        <Dropdown.Item disabled>
          <Translate text="copy-link" />
        </Dropdown.Item>
      </>
    );
  }
}

export default hot(ContextMenu);
