import React from "react";
import { Toolbar, Page } from "react-onsenui";
import native from "@Native/index";
import { ToolbarBuilder } from "@Builders";
import ContentBody from "@Components/ContentBody";

class ForbiddenActivity extends React.Component {
  private renderToolbar() {
    return (
      <Toolbar>
        <ToolbarBuilder title={"Forbidden"} hasWindowsButtons={false} />
      </Toolbar>
    );
  }

  public render() {
    return (
      <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
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
      </Page>
    );
  }
}

export default ForbiddenActivity;
