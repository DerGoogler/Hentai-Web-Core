import { Props, States } from "./interface";
import BaseActivity from "../BaseActivity";
declare class ChangelogActivity extends BaseActivity<Props, States> {
    constructor(props: any);
    renderToolbar: () => JSX.Element;
    renderPage: () => JSX.Element;
}
export default ChangelogActivity;
