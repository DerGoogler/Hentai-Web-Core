import * as React from "react";
import { Card, Button } from "react-bootstrap";
import { hot } from "react-hot-loader/root";
import { Provider, Translate, Translator } from "react-translated";
import native from "../../native";
import ContextMenu from "./ContextMenu";
import tools from "../../misc/tools";
import { ActionSheet, ActionSheetButton, Icon } from "react-onsenui";

class AnimePicture extends React.Component<{
  note?: any;
  source?: any;
  getId?: any;
}> {
  private element!: HTMLElement | null;
  private buttonDesign: string = tools.typeIF(
    native.getPref("enableDarkmode"),
    "lilaDarkMode",
    "lila"
  );

  public state = {
    isContextOpen: false,
  };

  /**
   * To generate an id that refresh every page reload, to avoid duplicte ids
   */
  private getID = this.props.note.replace(/ /g, "") + this.id();
  private getNote = this.props.note.charAt(0).toUpperCase() + this.props.note.slice(1);

  private id() {
    const { note } = this.props;
    var id: any = note.length;
    return this.makeUUID(id);
  }

  private makeUUID(length: number) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  private handleClick = () => {
    this.setState({ isContextOpen: true });
  };

  private handleCancel = () => {
    this.setState({ isContextOpen: false });
  };

  public render() {
    const { note, source } = this.props;
    return (
      <>
        <Translator>
          {({ translate }: any) => (
            // @ts-ignore
            <card>
              <Card
                key={this.getID}
                style={{
                  padding: "0px",
                  backgroundColor: tools.typeIF(native.getPref("enableDarkmode"), "#1F1F1F", ""),
                }}
              >
                <Card.Header
                  style={{ display: tools.typeIF(native.getPref("removeTitle"), "none", "block") }}
                >
                  {/*
                // @ts-ignore */}
                  <name style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                    <h4
                      style={{ width: "100%" }}
                      className={"searchKey> " + this.getID + "_search"}
                    >
                      {this.getNote}
                    </h4>
                    <Button
                      style={{
                        display: tools.typeIF(native.getPref("displayDownload"), "flex", "none"),
                      }}
                      onClick={this.handleClick}
                      variant={this.buttonDesign}
                    >
                      <Icon icon="md-more" />
                    </Button>
                    {/*
                  // @ts-ignore */}
                  </name>
                </Card.Header>
                <Card.Body
                  style={{
                    padding: tools.typeIF(native.getPref("fitImageToCard"), "0px", ""),
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
                        alt={this.getNote}
                        style={{
                          width: "100%",
                          borderRadius: tools.typeIF(
                            native.getPref("fitImageToCard"),
                            tools.typeIF(
                              native.getPref("displayDownload"),
                              tools.typeIF(
                                native.getPref("removeTitle"),
                                "0.25rem 0.25rem 0rem 0rem",
                                "0rem 0rem 0rem 0rem"
                              ),
                              tools.typeIF(
                                native.getPref("removeTitle"),
                                "0.25rem 0.25rem 0.25rem 0.25rem",
                                "0rem 0rem 0.25rem 0.25rem"
                              )
                            ),
                            ".25rem"
                          ),
                        }}
                      />{" "}
                      <ActionSheet
                        isOpen={this.state.isContextOpen}
                        animation="default"
                        modifier={native.checkPlatformForBorderStyle}
                        onCancel={this.handleCancel}
                        isCancelable={true}
                        title={this.getNote + "'s options"}
                      >
                        <ContextMenu source={source} note={note} getId={this.getID} />
                        <ActionSheetButton
                          onClick={this.handleCancel}
                          modifier={native.checkPlatformForBorderStyle}
                          icon={"md-close"}
                        >
                          Cancel
                        </ActionSheetButton>
                      </ActionSheet>
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
