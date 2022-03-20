/// <reference types="react" />
import BaseActivity from "../BaseActivity";
declare class ForbiddenActivity extends BaseActivity {
    constructor(props: any);
    renderToolbar(): JSX.Element;
    renderFixed: () => JSX.Element;
    renderPage: () => JSX.Element;
}
export default ForbiddenActivity;
