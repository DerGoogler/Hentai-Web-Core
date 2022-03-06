/// <reference types="react" />
import { Props, States } from "./interface";
import Activity from "@Views";
declare class PluginsActivity extends Activity.Base<Props, States> {
    private scriptLosding;
    renderToolbar: () => JSX.Element;
    renderPage(): JSX.Element;
}
export default PluginsActivity;
