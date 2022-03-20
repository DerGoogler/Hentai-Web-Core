/// <reference types="react" />
import { Props, States } from "./interface";
import BaseActivity from "@/views/BaseActivity";
declare class PluginsActivity extends BaseActivity<Props, States> {
    private scriptLosding;
    renderToolbar: () => JSX.Element;
    renderPage(): JSX.Element;
}
export default PluginsActivity;
