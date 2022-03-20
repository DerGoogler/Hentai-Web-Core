/// <reference types="react" />
import { Props, States } from "./interface";
import BaseActivity from "../BaseActivity";
declare class SettingsActivity extends BaseActivity<Props, States> {
    renderToolbar: () => JSX.Element;
    renderPage(): JSX.Element;
}
export default SettingsActivity;
