/// <reference types="react" />
import { Props, States } from "./interface";
import Activity from "@Views";
declare class TextFetchActivity extends Activity.Base<Props, States> {
    constructor(props: any);
    componentDidMount: () => void;
    renderToolbar: () => JSX.Element;
    renderPage(): JSX.Element;
}
export default TextFetchActivity;
