// Regular Modules
import * as React from "react";
import { Dropdown } from "react-bootstrap";
import { hot } from "react-hot-loader/root";
import { AnimePictureInterface } from "../../d/inferface";
import { Provider, Translate, Translator } from "react-translated";
import config from "../../misc/config";
import android from "../../d/android";

/**
 * Creates an context menu for the images
 */
class ContextMenu extends React.Component<AnimePictureInterface> {
  private element!: HTMLElement | null;
  private android = new android();

  public componentDidMount() {
    // Remove elements if not app
    if (window.navigator.userAgent === config.options.userAgent) {
      if ((this.element = document.querySelector(".only-mobile"))) {
        this.element.style.display = "none";
      }
    }
  }

  public render() {
    // To get note and source url
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

        <Dropdown.Item
          onClick={() => {
            android.copyClipborad(source);
          }}
        >
          <Translate text="copy-link" />
        </Dropdown.Item>
      </>
    );
  }
}

export default hot(ContextMenu);
