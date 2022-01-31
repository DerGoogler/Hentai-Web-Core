import * as React from "react";
import { BackButton, Icon, ToolbarButton } from "react-onsenui";
import { hot } from "react-hot-loader/root";
import ons from "onsenui";
import native from "@Native/index";
import Bootloader from "@Bootloader";
import { ToolbarBuilderInterface } from "@Types/ToolbarBuilder";
import tools from "@Misc/tools";
import MDIcon from "./MDIcon";

class ToolbarBuilder extends React.Component<ToolbarBuilderInterface> {
  public state = {
    icon: "fullscreen",
  };

  public componentDidMount() {
    const { hasDarkMode } = this.props;
    if (hasDarkMode) {
      if (native.getPref("enableDarkmode") === "true") {
        var darkmode = document.createElement("link");
        darkmode.rel = "stylesheet";
        darkmode.href =
          "https://cdn.dergoogler.com/others/hentai-web/styles/dark-onsen-css-components.min.css";

        document.head.appendChild(darkmode);
      }
    }
  }

  public render() {
    const {
      title,
      hasDarkMode,
      onBackButton,
      addToolbarButton,
      addToolbarButtonPosition,
      hasWindowsButtons,
    } = this.props;
    return (
      <>
        <div className="left">
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
        </div>
        <div className="center drag--windows">{title}</div>

        <div className="right">
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
                    <ToolbarButton
                      modifier="windowsNormal paddingFIX"
                      style={{
                        display: tools.typeIF(native.userAgentEqualWindows(true), "", "none"),
                      }}
                      onClick={() => {
                        window.Windows.minimize();
                      }}
                    >
                      <MDIcon icon="remove" size="24" ignoreDarkmode={true}></MDIcon>
                    </ToolbarButton>
                    <ToolbarButton
                      modifier="windowsNormal paddingFIX"
                      disabled={tools.typeIF(
                        native.getPref("electron.enableFullscreen"),
                        true,
                        false
                      )}
                      style={{
                        display: tools.typeIF(native.userAgentEqualWindows(true), "", "none"),
                      }}
                      onClick={() => {
                        if (window.Windows.isMaximized()) {
                          window.Windows.unmaximize();
                          window.Windows.setWindowSize(
                            Number(native.getPref("electron.windowSize.width")),
                            Number(native.getPref("electron.windowSize.height"))
                          );
                          this.setState({ icon: "fullscreen" });
                        } else {
                          window.Windows.maximize();
                          this.setState({ icon: "close_fullscreen" });
                        }
                      }}
                    >
                      <MDIcon icon={this.state.icon} size="24" ignoreDarkmode={true}></MDIcon>
                    </ToolbarButton>
                    <ToolbarButton
                      modifier="windowsClose paddingFIX"
                      style={{
                        display: tools.typeIF(native.userAgentEqualWindows(true), "", "none"),
                      }}
                      onClick={() => {
                        native.close();
                      }}
                    >
                      <MDIcon icon="close" size="24" ignoreDarkmode={true}></MDIcon>
                    </ToolbarButton>
                  </>
                );
              } else {
                return;
              }
            } else {
              return;
            }
          })()}
        </div>
      </>
    );
  }
}

export default hot(ToolbarBuilder);
