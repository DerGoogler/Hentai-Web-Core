/// <reference types="react" />
import { Props, States } from "./interface";
import { BaseActivity } from "@Views";
declare class PluginAboutActivity extends BaseActivity<Props, States> {
    private getPluginConfig;
    private author;
    private version;
    private language;
    private description;
    renderToolbar: () => JSX.Element;
    renderPage(): JSX.Element;
}
export default PluginAboutActivity;
