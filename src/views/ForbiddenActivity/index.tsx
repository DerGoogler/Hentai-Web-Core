import BaseActivity from "../BaseActivity";

class ForbiddenActivity extends BaseActivity {
  public constructor(props: any) {
    super(props)
  }

  public renderToolbar() {
    return (
      <this.Toolbar>
        <this.ToolbarBuilder title={"Forbidden"} hasWindowsButtons={false} />
      </this.Toolbar>
    );
  }

  public renderFixed = () => {
    return (
      <this.Fab
        onClick={() => {
          this.native.alert("LOL")
        }}
        position='bottom right'>
        <this.MDIcon icon='face' size="24" ignoreDarkmode={true} />
      </this.Fab>
    );
  }

  public renderPage = () => {
    return (
      <this.ContentBody>
        {this.native.isIframe
          ? "Embedding in iFrame are not allowed"
          : this.native.isElectron
            ? "This app does not support Electron"
            : this.native.isEdge
              ? "There are no support for Edge"
              : this.native.isIE
                ? "IE is deprecated"
                : this.native.isMIUI
                  ? "We don't allow MIUI devices/systems"
                  : this.native.isSamsungBrowser
                    ? "We don't allow the Samsung Browser"
                    : this.native.isSmartTV
                      ? "SmartTV are not optimized for this usage"
                      : null}
      </this.ContentBody>
    );
  }
}

export default ForbiddenActivity;
