import ons from "onsenui";
import React from "react";
import { Toolbar, Page, Input, Button, ToolbarButton, Icon } from "react-onsenui";
import native from "@Native/index";
import { ToolbarBuilder } from "@Builders";
import { string } from "@Strings";
import { Props, States } from "./interface";

class LoginActivity extends React.Component<Props, States> {
  public constructor(props: any) {
    super(props);
    this.state = { username: "", password: "" };
  }

  public componentDidMount() {
    native.electron.discordRPC("Trying to login");
    native.android.setStatusbarColor("#4a148c");
    native.userAgentEqualWindows(true)
      ? window.Windows.notification("Welcome to HW", "The app includes nsfw content.")
      : null;
  }

  private renderToolbar() {
    return (
      <Toolbar modifier="noshadow">
        <ToolbarBuilder title={string.signIn} hasWindowsButtons={true} />
      </Toolbar>
    );
  }

  private handleClick = () => {
    if (this.state.username === native.getBuildMANUFACTURER && this.state.password === native.getMODEL) {
      native.setPref("loggedIn", "true");
      native.reload();
    } else {
      ons.notification.alert("Username or password incorrect!");
    }
  };

  private handleUsernameChange = (e: any) => {
    this.setState({ username: e.target.value.toUpperCase() });
  };

  private handlePasswordChange = (e: any) => {
    this.setState({ password: e.target.value.toUpperCase() });
  };

  public render() {
    return (
      <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
        <section
          className="drag--windows"
          style={{
            textAlign: "center",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#4a148c",
          }}
        >
          <div
            className="noDrag--windows"
            style={{
              backgroundColor: "white",
              padding: "16px",
              borderRadius: "8px",
              boxShadow:
                "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),0 3px 1px -2px rgba(0, 0, 0, 0.2)",
            }}
          >
            <p
              style={{
                fontSize: "xx-large",
                fontVariant: "all-small-caps",
              }}
            >
              Login
            </p>
            <p>
              <Input
                value={this.state.username}
                onChange={this.handleUsernameChange}
                modifier="underbar"
                float
                placeholder={native.isAndroid ? string.MANUFACTURER : native.isWindows ? "type" : "appCodeName"}
              />
            </p>
            <p>
              <Input
                value={this.state.password}
                onChange={this.handlePasswordChange}
                modifier="underbar"
                float
                placeholder={native.isAndroid ? string.MODEL : "platform"}
              />
            </p>
            <p>
              <Button onClick={this.handleClick}>sign-in</Button>
            </p>
            <p>
              <a style={{ textDecoration: "none" }} href={string.howToLoginLink}>
                {string.howToLogin}
              </a>
            </p>
          </div>
        </section>
      </Page>
    );
  }
}

export default LoginActivity;
