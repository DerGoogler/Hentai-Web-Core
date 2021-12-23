import React from "react";
import { hot } from "react-hot-loader/root";
import { Page, ProgressCircular } from "react-onsenui";
import boot from "./index";
import LoginActivity from "./LoginActivity";
import MainActivity from "./MainActivity";
import android from "./misc/android";

class SplashActivity extends React.Component {
  public componentDidMount() {
    setTimeout(() => {
      if (android.getPref("loggedIn") === "false") {
        new boot().loadActivity(<LoginActivity />);
      } else {
        new boot().loadActivity(<MainActivity />);
      }
    }, 5000);
  }

  public render() {
    return (
      <Page>
        <div
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
          <img
            style={{ display: "block", marginBottom: "16px", borderRadius: ".25rem" }}
            src="https://raw.githubusercontent.com/DerGoogler/Hentai-Web/master/Android/app/src/main/ic_launcher-playstore.png"
            height="100px"
            width="100px"
          />
          <ProgressCircular indeterminate />
          <p style={{ paddingTop: "16px" }}>Loading app data</p>
        </div>
      </Page>
    );
  }
}

export default hot(SplashActivity);
