import * as React from "react";
import { BackButton, Icon, ToolbarButton } from "react-onsenui";
import { hot } from "react-hot-loader/root";
import ons from "onsenui";
import native from "@Native";
import Bootloader from "@Bootloader";
import { ToolbarBuilderInterface } from "@Types/ToolbarBuilder";
import tools from "@Misc/tools";
import MDIcon from "./MDIcon";

class ToolbarBuilder extends React.Component<ToolbarBuilderInterface> {
  public componentDidMount() {
    const { hasDarkMode } = this.props;
    if (hasDarkMode) {
      if (native.getPref("enableDarkmode") === "true") {
        var favicon = document.createElement("link");
        favicon.rel = "stylesheet";
        favicon.href =
          "https://cdn.dergoogler.com/others/hentai-web/styles/dark-onsen-css-components.min.css";

        document.head.appendChild(favicon);
      }
    }
  }

  public render() {
    const { title, hasBackButton, addToolbarButton, addToolbarButtonPosition, hasWindowsButtons } =
      this.props;
    return (
      <>
        {(() => {
          if (hasBackButton) {
            return (
              <div className="left">
                <BackButton
                  onClick={() => {
                    new Bootloader().activity.load("main");
                  }}
                >
                  Back
                </BackButton>
              </div>
            );
          } else {
            return;
          }
        })()}
        <div className="center drag--windows">{title}</div>

        <div className="right">
          {(() => {
            if (addToolbarButtonPosition === "left") {
              return addToolbarButton;
            } else {
              return;
            }
          })()}
          {(() => {
            if (hasWindowsButtons) {
              return (
                <>
                  <ToolbarButton
                    modifier="windowsNormal"
                    style={{
                      display: tools.typeIF(native.userAgentEqualWindows(true), "", "none"),
                    }}
                    onClick={() => {
                      window.Windows.minimize();
                    }}
                  >
                    <MDIcon icon="remove" size="24"></MDIcon>
                  </ToolbarButton>
                  <ToolbarButton
                    modifier="windowsNormal"
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
                      } else {
                        window.Windows.maximize();
                      }
                    }}
                  >
                    <MDIcon icon="fullscreen" size="24"></MDIcon>
                  </ToolbarButton>
                  <ToolbarButton
                    modifier="windowsClose"
                    style={{
                      display: tools.typeIF(native.userAgentEqualWindows(true), "", "none"),
                    }}
                    onClick={() => {
                      ons.notification.confirm({
                        message: "Do you want to close this app?",
                        title: "Close app?",
                        buttonLabels: ["Yes", "No"],
                        modifier: native.checkPlatformForBorderStyle,
                        animation: "default",
                        primaryButtonIndex: 1,
                        cancelable: true,
                        callback: (index: number) => {
                          switch (index) {
                            case 0:
                              window.Windows.close();
                              break;

                            default:
                              break;
                          }
                        },
                      });
                    }}
                  >
                    <MDIcon icon="close" size="24"></MDIcon>
                  </ToolbarButton>
                </>
              );
            } else {
              return;
            }
          })()}
          {(() => {
            if (addToolbarButtonPosition === "right") {
              return addToolbarButton;
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
