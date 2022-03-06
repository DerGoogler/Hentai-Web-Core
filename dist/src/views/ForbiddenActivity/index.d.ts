/// <reference types="react" />
import Activity from "@Views";
declare class ForbiddenActivity extends Activity.Base {
    constructor(props: any);
    renderToolbar(): JSX.Element;
    renderFixed: () => JSX.Element;
    renderPage: () => JSX.Element;
}
export default ForbiddenActivity;
