import Bootloader from "@Bootloader";
import ons from "onsenui";
import React from "react";
import { Toolbar, Page, Input, Button } from "react-onsenui";
import { Provider, Translate, Translator } from "react-translated";
import native from "@Native";
import ToolbarBuilder from "@Builders/ToolbarBuilder";

class LoginActivity extends React.Component<{}, { username: string; password: string }> {
  public constructor(props: any) {
    super(props);
    this.state = { username: "", password: "" };
  }

  public componentDidMount() {
    native.android.setStatusbarColor("#ffffff");
    if (native.getPref("loggedIn") === "true") {
      new Bootloader().activity.load("main");
    }
  }

  private renderToolbar() {
    return (
      <Toolbar>
        <ToolbarBuilder
          title={<Translate text="sign-in" />}
          hasBackButton={false}
          hasWindowsButtons={true}
          hasDarkMode={true}
        />
      </Toolbar>
    );
  }

  private handleClick = () => {
    if (
      this.state.username === native.getBuildMANUFACTURER() &&
      this.state.password === native.getMODEL()
    ) {
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

  private placeholderIF(IFdata: any, return_: any, else_: any) {
    if (IFdata) {
      return return_;
    } else {
      return else_;
    }
  }

  public render() {
    return (
      <Translator>
        {({ translate }: any) => (
          <Page
            modifier={native.checkPlatformForBorderStyle} /*renderToolbar={this.renderToolbar}*/
          >
            <section
              style={{
                textAlign: "center",
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(61deg, rgba(74,20,140,1) 0%, rgba(0,118,255,1) 100%)",
              }}
            >
              <div
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
                    placeholder={this.placeholderIF(
                      window.navigator.userAgent === "HENTAI_WEB_AGENT",
                      translate({
                        text: "MANUFACTURER",
                      }),
                      "appCodeName"
                    )}
                  />
                </p>
                <p>
                  <Input
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    modifier="underbar"
                    float
                    placeholder={this.placeholderIF(
                      window.navigator.userAgent === "HENTAI_WEB_AGENT",
                      translate({
                        text: "MODEL",
                      }),
                      "platform"
                    )}
                  />
                </p>
                <p>
                  <Button onClick={this.handleClick}>
                    <Translate text="sign-in" />
                  </Button>
                </p>
                <p>
                  <a
                    style={{ textDecoration: "none" }}
                    href={translate({
                      text: "how-to-login-link",
                    })}
                  >
                    <Translate text="how-to-login" />
                  </a>
                </p>
              </div>
            </section>
          </Page>
        )}
      </Translator>
    );
  }
}

export default LoginActivity;
