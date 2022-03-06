/// <reference types="react" />
import { Props, States } from "./interface";
import Activity from "@Views";
declare class SettingsActivity extends Activity.Base<Props, States> {
    renderToolbar: () => JSX.Element;
    renderPage(): JSX.Element;
}
export default SettingsActivity;
