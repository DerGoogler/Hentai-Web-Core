/// <reference types="react" />
import { Props, States } from "./interface";
import { BaseActivity } from "@Views";
declare class TextFetchActivity extends BaseActivity<Props, States> {
    constructor(props: any);
    componentDidMount: () => void;
    renderToolbar: () => JSX.Element;
    renderPage(): JSX.Element;
}
export default TextFetchActivity;
