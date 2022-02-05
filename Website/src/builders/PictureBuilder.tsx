import * as React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Card as Kard } from "react-onsenui";
import { Provider, Translate, Translator } from "react-translated";
import native from "@Native/index";
import { Icon } from "react-onsenui";
import tools from "@Misc/tools";
import ActionSheetBuilder from "./ActionSheetBuilder";

class PictureBuilder extends React.Component<{
  note?: any;
  source?: any;
  getId?: any;
  isNew?: any;
}> {
  private element!: HTMLElement | null;
  private buttonDesign: string = tools.typeIF(native.getPref("enableDarkmode"), "lilaDarkMode", "lila");

  public state = {
    isContextOpen: false,
    isImageError: false,
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
    const { note, source, isNew } = this.props;
    return (
      <>
        <Translator>
          {({ translate }: any) => (
            // @ts-ignore
            <card>
              <Kard style={{ padding: "0px", borderRadius: "8px", border: "0px" }}>
                <Card
                  key={this.getID}
                  style={{
                    padding: "0px",
                    margin: "0px",
                    backgroundColor: tools.typeIF(native.getPref("enableDarkmode"), "#1F1F1F", ""),
                  }}
                >
                  <Card.Header style={{ display: tools.typeIF(native.getPref("removeTitle"), "none", "block") }}>
                    {/*
                // @ts-ignore */}
                    <name style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                      <h4
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "left",
                          alignItems: "center",
                        }}
                        className={"searchKey> " + this.getID + "_search"}
                      >
                        {(() => {
                          if (isNew) {
                            return (
                              <>
                                <Badge style={{ fontSize: "10px" }} bg={this.buttonDesign}>
                                  NEW
                                </Badge>
                                &nbsp;
                              </>
                            );
                          } else {
                            return;
                          }
                        })()}
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
                          onError={() => {
                            this.setState({ isImageError: true });
                          }}
                          onDoubleClick={this.handleClick}
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
                        <ActionSheetBuilder
                          options={{
                            title: this.getNote + "'s options",
                            onCancel: this.handleCancel,
                            isOpen: this.state.isContextOpen,
                            modifier: native.checkPlatformForBorderStyle,
                          }}
                          data={[
                            {
                              text: "view-image",
                              icon: "md-eye",
                              onClick: () => {
                                native.open(source);
                                this.handleCancel();
                              },
                            },
                            {
                              text: "copy-link",
                              icon: "md-copy",
                              onClick: () => {
                                native.copyClipborad(source);
                                this.handleCancel();
                              },
                            },
                            {
                              text: "reload-image",
                              icon: "md-refresh",
                              style: { display: "none" },
                              onClick: () => {
                                tools.ref(this.getID, (e: HTMLElement) => {
                                  e.setAttribute("src", source);
                                });
                                this.handleCancel();
                              },
                            },
                            {
                              text: "view-hmtai-image-source",
                              icon: "md-link",
                              onClick: () => {
                                native.open(
                                  `https://github.com/DerGoogler/cdn/blob/master/others/hentai-web/images/${note
                                    .toLowerCase()
                                    .replace(/ /g, "")}.json`
                                );
                                this.handleCancel();
                              },
                            },
                            {
                              text: "download-text",
                              icon: "md-download",
                              onClick: () => {
                                native.downloadPicture(source, this.getID, this.getID);
                                this.handleCancel();
                              },
                            },
                            {
                              text: "Cancel",
                              icon: "md-close",
                              modifier: native.checkPlatformForBorderStyle,
                              onClick: this.handleCancel,
                            },
                          ]}
                        />
                      </p>
                    </blockquote>
                  </Card.Body>
                </Card>
              </Kard>
              {/*
                // @ts-ignore */}
            </card>
          )}
        </Translator>
      </>
    );
  }
}

export default PictureBuilder;
