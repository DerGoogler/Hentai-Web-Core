import { Toolbar } from "react-onsenui";
import native from "@Native/index";
import { ToolbarBuilder } from "@Builders";
import ContentBody from "@Components/ContentBody";
import { BaseActivity } from "@Views";

class ForbiddenActivity extends BaseActivity {
  public renderToolbar() {
    return (
      <Toolbar>
        <ToolbarBuilder title={"Forbidden"} hasWindowsButtons={false} />
      </Toolbar>
    );
  }

  public renderPage() {
    return (
      <ContentBody>
        {native.isIframe
          ? "Embedding in iFrame are not allowed"
          : native.isElectron
            ? "This app does not support Electron"
            : native.isEdge
              ? "There are no support for Edge"
              : native.isIE
                ? "IE is deprecated"
                : native.isMIUI
                  ? "We don't allow MIUI devices/systems"
                  : native.isSamsungBrowser
                    ? "We don't allow the Samsung Browser"
                    : native.isSmartTV
                      ? "SmartTV are not optimized for this usage"
                      : null}
      </ContentBody>
    );
  }
}

export default ForbiddenActivity;
