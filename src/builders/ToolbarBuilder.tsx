import * as React from "react";
import { BackButton, Icon, Toolbar } from "react-onsenuix";
import native from "@Native/index";
import { ToolbarBuilderInterface } from "@Types/ToolbarBuilder";
import tools from "@Misc/tools";
import MDIcon from "@Components/MDIcon";

class ToolbarBuilder extends React.Component<ToolbarBuilderInterface> {
  public state = {
    icon: "fullscreen",
  };

  public render() {
    const { title, onBackButton, addToolbarButton, addToolbarButtonPosition, hasWindowsButtons, modifier } = this.props;
    return (
      <Toolbar modifier={modifier}>
        <Toolbar.Left>
          {onBackButton ? (
            <BackButton
              // @ts-ignore
              onClick={onBackButton}
            />
          ) : null}
          {(() => {
            if (addToolbarButtonPosition === "left") {
              return addToolbarButton;
            } else {
              return;
            }
          })()}
        </Toolbar.Left>
        <div className="center drag--windows">{title}</div>

        <Toolbar.Right>
          {(() => {
            if (addToolbarButtonPosition === "right") {
              return addToolbarButton;
            } else {
              return;
            }
          })()}
          {(() => {
            if (native.getPref("electron.enableFrame") === "false") {
              if (hasWindowsButtons) {
                return (
                  <>
                    <Toolbar.Button
                      modifier="windowsNormal paddingFIX"
                      style={{
                        display: tools.typeIF(native.userAgentEqualWindows(true), "", "none"),
                      }}
                      onClick={() => {
                        window.Windows.minimize();
                      }}
                    >
                      <MDIcon icon="remove" size="24" ignoreDarkmode={true}></MDIcon>
                    </Toolbar.Button>
                    <Toolbar.Button
                      modifier="windowsNormal paddingFIX"
                      disabled={tools.typeIF(native.getPref("electron.enableFullscreen"), true, false)}
                      style={{
                        display: tools.typeIF(native.userAgentEqualWindows(true), "", "none"),
                      }}
                      onClick={() => {
                        if (window.Windows.isMaximized()) {
                          window.Windows.unmaximize();
                          window.Windows.setWindowSize(Number(native.getPref("electron.windowSize.width")), Number(native.getPref("electron.windowSize.height")));
                          this.setState({ icon: "fullscreen" });
                        } else {
                          window.Windows.maximize();
                          this.setState({ icon: "close_fullscreen" });
                        }
                      }}
                    >
                      <MDIcon icon={this.state.icon} size="24" ignoreDarkmode={true}></MDIcon>
                    </Toolbar.Button>
                    <Toolbar.Button
                      modifier="windowsClose paddingFIX"
                      style={{
                        display: tools.typeIF(native.userAgentEqualWindows(true), "", "none"),
                      }}
                      onClick={() => {
                        native.close();
                      }}
                    >
                      <MDIcon icon="close" size="24" ignoreDarkmode={true}></MDIcon>
                    </Toolbar.Button>
                  </>
                );
              } else {
                return;
              }
            } else {
              return;
            }
          })()}
        </Toolbar.Right>
      </Toolbar>
    );
  }
}

export default ToolbarBuilder;
