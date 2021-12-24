import * as React from "react";
import { Dropdown } from "react-bootstrap";
import { hot } from "react-hot-loader/root";
import { Provider, Translate, Translator } from "react-translated";
import { android } from "../../misc/android";
import tools from "../../misc/tools";

/**
 * Creates an context menu for the images
 */
class ContextMenu extends React.Component<{
  note?: any;
  source?: any;
  getId?: any;
}> {
  private element!: HTMLElement | null;

  public render() {
    // To get note and source url
    const { note, source, getId } = this.props;

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

        <Dropdown.Item
          disabled
          onClick={() => {
            tools.getByElementId(getId, (e: any) => {
              e.setAttribute("src", source);
            });
          }}
        >
          <Translate text="reload-image" />
        </Dropdown.Item>

        <Dropdown.Item
          onClick={() => {
            window.open(
              `https://github.com/DerGoogler/Hentai-Web/blob/master/Website/src/misc/hmtai/images/${note.replace(
                / /g,
                ""
              )}.json`
            );
          }}
        >
          <Translate text="view-hmtai-image-source" />
        </Dropdown.Item>
      </>
    );
  }
}

export default hot(ContextMenu);
