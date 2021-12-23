// Regular Modules
import * as React from "react";
import { Card, Dropdown, Button, ButtonGroup } from "react-bootstrap";
import { hot } from "react-hot-loader/root";
import { AnimePictureInterface } from "../../d/inferface";
import { Provider, Translate, Translator } from "react-translated";
import android from "../../misc/android";
import ContextMenu from "./ContextMenu";
import settingsEffect from "../../views/Settings/settingsEffect";
import { typeIF } from "../../misc/tools";

class AnimePicture extends React.Component<AnimePictureInterface> {
  private element!: HTMLElement | null;
  private buttonDesign: string = "lila";
  /**
   * To generate an id that refresh every page reload, to avoid duplicte ids
   */
  private getID = this.props.note.replace(/ /g, "") + this.id();

  public componentDidMount() {
    settingsEffect("displayDownload", "." + this.getID, (element: any) => {
      element.style.display = "block";
    });
  }

  private id() {
    const { note } = this.props;
    var id: any = note.length;
    return this.makeUUID(id);
  }

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
            // @ts-ignore
            <card>
              <Card key={this.getID} style={{ padding: "0px" }}>
                <Card.Header
                  style={{ display: typeIF(android.getPref("removeTitle"), "none", "block") }}
                >
                  {/*
                // @ts-ignore */}
                  <name>
                    <h4 className={"searchKey> " + this.getID + "_search"}>
                      {note.charAt(0).toUpperCase() + note.slice(1)}
                    </h4>
                    {/*
                  // @ts-ignore */}
                  </name>
                </Card.Header>
                <Card.Body
                  style={{
                    padding: typeIF(android.getPref("fitImageToCard"), "0px", ""),
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <blockquote className="blockquote mb-0">
                    <p>
                      {" "}
                      <img
                        id={this.getID}
                        src={source}
                        alt={note.charAt(0).toUpperCase() + note.slice(1)}
                        style={{
                          width: "100%",
                          borderRadius: typeIF(
                            android.getPref("fitImageToCard"),
                            typeIF(
                              android.getPref("displayDownload"),
                              "0rem 0rem 0rem 0rem",
                              "0rem 0rem 0.25rem 0.25rem"
                            ),
                            ".25rem"
                          ),
                        }}
                        onDoubleClick={() => {
                          window.open(source, "_blank");
                        }}
                      />{" "}
                      <Dropdown
                        className={this.getID}
                        style={{
                          marginTop: typeIF(android.getPref("fitImageToCard"), "0px", "16px"),
                          display: typeIF(android.getPref("displayDownload"), "flex", "none"),
                          padding: "0px",
                          justifyContent: "center",
                        }}
                        as={ButtonGroup}
                      >
                        <Button
                          id="download-button"
                          style={{
                            borderRadius: typeIF(
                              android.getPref("fitImageToCard"),
                              "0rem 0rem 0rem 0.25rem",
                              ""
                            ),
                            width: typeIF(
                              android.getPref("fitImageToCard"),
                              "calc(100% - 29px)",
                              ""
                            ),
                          }}
                          variant={this.buttonDesign}
                          onClick={this.performDownload}
                        >
                          <Translate text="download-text" />
                        </Button>

                        <Dropdown.Toggle
                          split
                          style={{
                            borderRadius: typeIF(
                              android.getPref("fitImageToCard"),
                              "0rem 0rem 0.25rem 0rem",
                              ""
                            ),
                          }}
                          variant={this.buttonDesign}
                          id="dropdown-split-basic"
                        />

                        <Dropdown.Menu>
                          <ContextMenu source={source} note={note} getId={this.getID} />
                        </Dropdown.Menu>
                      </Dropdown>
                    </p>
                  </blockquote>
                </Card.Body>
              </Card>
              {/*
                // @ts-ignore */}
            </card>
          )}
        </Translator>
      </>
    );
  }
}

export default hot(AnimePicture);
