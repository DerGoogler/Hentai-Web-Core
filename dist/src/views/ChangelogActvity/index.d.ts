import { Props, States } from "./interface";
import Activity from "@Views";
declare class ChangelogActivity extends Activity.Base<Props, States> {
    constructor(props: any);
    renderToolbar: () => JSX.Element;
    renderPage: () => JSX.Element;
}
export default ChangelogActivity;
