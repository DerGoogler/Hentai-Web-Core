import ons from "onsenui";
import React from "react";
import { hot } from "react-hot-loader/root";
import { Toolbar, Page, Input, Button, Icon, ToolbarButton } from "react-onsenui";
import { Provider, Translate, Translator } from "react-translated";
import tools from "./misc/tools";
import native from "./native";

class LoginActivity extends React.Component<{}, { username: string; password: string }> {
  public constructor(props: any) {
    super(props);
    this.state = { username: "", password: "" };
  }

  private renderToolbar() {
    return (
      <Toolbar>
        <div className="center drag--windows">
          <Translate text="sign-in" />
        </div>
        <div className="right">
          <ToolbarButton
            style={{
              display: tools.typeIF(
                window.navigator.userAgent === "HENTAI_WEB_WINDOWS",
                "",
                "none"
              ),
            }}
            onClick={() => {
              window.Windows.minimize();
            }}
          >
            <Icon icon="md-minus"></Icon>
          </ToolbarButton>
          <ToolbarButton
            style={{
              display: tools.typeIF(
                window.navigator.userAgent === "HENTAI_WEB_WINDOWS",
                "",
                "none"
              ),
            }}
            onClick={() => {
              ons.notification.confirm({
                message: "Do you want to close this app?",
                title: "Close app?",
                buttonLabels: ["Yes", "No"],
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
            <Icon icon="md-close"></Icon>
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  }

  private handleClick = () => {
    if (
      this.state.username === native.getBuildMANUFACTURER() &&
      this.state.password === native.getBuildMODEL()
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
          <Page renderToolbar={this.renderToolbar}>
            <section
              style={{
                textAlign: "center",
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
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

export default hot(LoginActivity);
