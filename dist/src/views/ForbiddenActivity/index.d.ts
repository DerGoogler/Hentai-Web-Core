/// <reference types="react" />
import { BaseActivity } from "@Views";
declare class ForbiddenActivity extends BaseActivity {
    constructor(props: any);
    renderToolbar(): JSX.Element;
    renderFixed: () => JSX.Element;
    renderPage: () => JSX.Element;
}
export default ForbiddenActivity;
