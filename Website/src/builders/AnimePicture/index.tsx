// Regular Modules
import * as React from "react";
import { Card, Dropdown, Button, ButtonGroup } from "react-bootstrap";
import { hot } from "react-hot-loader/root";
import { AnimePictureInterface } from "../../d/inferface";
import { Provider, Translate, Translator } from "react-translated";
import android from "../../misc/android";
import ContextMenu from "./ContextMenu";

class AnimePicture extends React.Component<AnimePictureInterface> {
  private element!: HTMLElement | null;
  private buttonDesign: string = "lila";

  private id() {
    const { note } = this.props;
    var id: any = note.length;
    return this.makeUUID(id);
  }

  // To generate an id that refresh every page reload, to avoid duplicte ids
  private getID = this.props.note.replace(/ /g, "") + this.id();

  /**
   * Performs an native android download
   * **DON'T REMOVE THE ARROW FUNCTION**
   */
  private performDownload = () => {
    const { note, source } = this.props;
    android.downloadPicture(this.getID, source, this.getID);
  };

  private makeUUID(length: number) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public render() {
    const { note, source } = this.props;
    return (
      <>
        <Translator>
          {({ translate }: any) => (
            <Card key={this.getID} className={this.getID} style={{ padding: "0px" }}>
              <Card.Header>
                <h4>{note.charAt(0).toUpperCase() + note.slice(1)}</h4>
              </Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>
                    {" "}
                    <img
                      id={this.getID}
                      src={source}
                      alt={note.charAt(0).toUpperCase() + note.slice(1)}
                      style={{ width: "100%", borderRadius: ".25rem" }}
                      onDoubleClick={() => {
                        window.open(source, "_blank");
                      }}
                    />{" "}
                    <p> </p>
                    <Dropdown as={ButtonGroup}>
                      <Button
                        id="download-button"
                        variant={this.buttonDesign}
                        onClick={this.performDownload}
                      >
                        <Translate text="download-text" />
                      </Button>

                      <Dropdown.Toggle
                        split
                        variant={this.buttonDesign}
                        id="dropdown-split-basic"
                      />

                      <Dropdown.Menu>
                        <ContextMenu source={source} note={note} />
                      </Dropdown.Menu>
                    </Dropdown>
                  </p>
                </blockquote>
              </Card.Body>
            </Card>
          )}
        </Translator>
      </>
    );
  }
}

export default hot(AnimePicture);
