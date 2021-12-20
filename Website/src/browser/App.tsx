import * as React from "react";
import { hot } from "react-hot-loader/root";
import App from "../App";

class BrowserApp extends React.Component {
  public render() {
    return (
      <>
        <div>
          <div>
            <p>
              <App />
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default hot(BrowserApp);
