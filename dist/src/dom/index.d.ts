import AppRoot from "./AppRoot";
import HwA from "./hw-a";
import HWIMG from "./hw-img";
declare namespace AppDom {
    class App extends AppRoot {
    }
    class A extends HwA {
    }
    class IMG extends HWIMG {
    }
}
export default AppDom;
