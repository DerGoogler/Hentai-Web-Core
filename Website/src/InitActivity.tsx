import native from "@Native/index";
import LoginActivity from "./LoginActivity";
import MainActivity from "./MainActivity";
import * as React from "react";
import { Page, Toolbar, BackButton, RouterNavigator, RouterUtil } from "react-onsenui";

class InitActivity extends React.Component<{}, { routeConfig: any; currentPage: string }> {
  constructor(props: any) {
    super(props);

    const doLogin = () => {
      if (native.getPref("loggedIn") === "true") {
        return MainActivity;
      } else {
        return LoginActivity;
      }
    };

    const routeConfig = RouterUtil.init([
      {
        component: doLogin(),
        props: {
          key: "main",
          pushPage: (...args: any) => this.pushPage.apply(null, args),
        },
      },
    ]);

    this.state = { routeConfig, currentPage: "main" };
  }

  componentDidMount = () => {
    window.addEventListener("load", this.windowLoadPush);
  };

  componentWillUnmount = () => {
    window.removeEventListener("load", this.windowLoadPush);
  };

  windowLoadPush = () => {
    if (typeof history.pushState === "function") {
      history.pushState("jibberish", "", null);
      window.onpopstate = () => {
        history.pushState("newjibberish", "", null);
        if (this.state.currentPage === "main") {
          native.close();
        } else {
          this.popPage();
        }
      };
    } else {
      var ignoreHashChange = true;
      window.onhashchange = () => {
        if (!ignoreHashChange) {
          ignoreHashChange = true;
          window.location.hash = Math.random().toString();
        } else {
          ignoreHashChange = false;
        }
      };
    }
  };

  pushPage = (page: any, key: any) => {
    const route = {
      component: page,
      props: {
        key: key,
        popPage: () => this.popPage(),
        pushPage: (...args: any) => this.pushPage.apply(null, args),
      },
    };

    let routeConfig = this.state.routeConfig;

    routeConfig = RouterUtil.push({
      routeConfig,
      route,
    });

    this.setState({ routeConfig });
    this.setState({ currentPage: key });
  };

  popPage = (options = {}) => {
    let routeConfig = this.state.routeConfig;

    routeConfig = RouterUtil.pop({
      routeConfig,
      options: {
        ...options,
        animationOptions: {
          duration: 0.2,
          timing: "ease-in",
          animation: "fade-md",
        },
      },
    });

    this.setState({ routeConfig });
  };

  onPostPush = () => {
    const routeConfig = RouterUtil.postPush(this.state.routeConfig);
    this.setState({ routeConfig });
  };

  onPostPop = () => {
    const routeConfig = RouterUtil.postPop(this.state.routeConfig);
    this.setState({ routeConfig });
  };

  renderPage = (route: any) => {
    const props = route.props || {};
    return <route.component {...props} />;
  };

  renderToolbar() {
    return (
      <Toolbar>
        <div className="left">
          <BackButton />
        </div>
        <div className="center">Stateless Navigator</div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page>
        <RouterNavigator
          swipeable={true}
          // @ts-ignore
          swipePop={(options: any) => this.popPage(options)}
          routeConfig={this.state.routeConfig}
          renderPage={this.renderPage}
          onPostPush={() => this.onPostPush()}
          onPostPop={() => this.onPostPop()}
        />
      </Page>
    );
  }
}

export default InitActivity;
