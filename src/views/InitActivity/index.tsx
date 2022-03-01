import native from "@Native/index";
import MainActivity from "../MainActivity";
import { Page, Toolbar, BackButton, RouterNavigator, RouterUtil } from "react-onsenui";
import { PushPageProps } from "@Types/init";
import Bootloader from "@Bootloader";
import LoginActivity from "../LoginActivity";
import { Props, States } from "./interface";
import { BaseActivity } from "@Views";

class InitActivity extends BaseActivity<Props, States> {
  public constructor(props: any) {
    super(props);

    const doLogin = () => {
      if (native.getPref("loggedIn") === "true" || native.isInstagram || native.isFacebook) {
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

    this.state = {
      routeConfig,
      currentPage: "main",
    };
  }

  public componentDidMount = () => {
    super.componentDidMount;
    window.addEventListener("load", this.windowLoadPush);
    if (native.isMobile) {
      window.addEventListener("contextmenu", this.removeContextMenuMobile);
    }
  };

  public componentDidUpdate() {
    super.componentDidUpdate;
  }

  public componentWillUnmount = () => {
    window.removeEventListener("load", this.windowLoadPush);
    if (native.isMobile) {
      window.removeEventListener("contextmenu", this.removeContextMenuMobile);
    }
  };

  private removeContextMenuMobile = (e: any) => {
    e.preventDefault();
  };

  private windowLoadPush = () => {
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

  public pushPage = (props: PushPageProps): void => {
    const route = {
      component: props.activity,
      props: {
        key: props.key,
        extras: props.extras,
        textFetch: props.textFetch,
        pluginAbout: props.pluginAbout,
        changelog: props.changelog,
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
    this.setState({ currentPage: props.key });
  };

  public popPage = (options = {}) => {
    let routeConfig = this.state.routeConfig;

    routeConfig = RouterUtil.pop({
      routeConfig,
      options: {
        ...options,
        animationOptions: {
          duration: 0.2,
          timing: "ease-in",
          animation: "fade-ios",
        },
      },
    });

    this.setState({ routeConfig });
    this.setState({ currentPage: "main" });
  };

  public onPostPush = () => {
    const routeConfig = RouterUtil.postPush(this.state.routeConfig);
    this.setState({ routeConfig });
  };

  public onPostPop = () => {
    const routeConfig = RouterUtil.postPop(this.state.routeConfig);
    this.setState({ routeConfig });
  };

  // Has confict with BaseActivity
  public renderPage_ = (route: any) => {
    const props = route.props || {};
    return <route.component {...props} />;
  };

  public renderPage() {
    return (
      <RouterNavigator
        swipeable={true}
        // @ts-ignore
        swipePop={(options: any) => this.popPage(options)}
        routeConfig={this.state.routeConfig}
        renderPage={this.renderPage_}
        onPostPush={() => this.onPostPush()}
        onPostPop={() => this.onPostPop()}
      />
    );
  }
}

export default InitActivity;
