import { BaseActivity } from "@Views";
import { Props, States } from "./interface";
declare class MainActivity extends BaseActivity<Props, States> {
    constructor(props: Readonly<Props> | Props);
    componentDidMount: () => void;
    private handleClick;
    private handleCancel;
    renderToolbar: () => JSX.Element;
    private renderTabs;
    private tabIndexChecker;
    renderPage: () => JSX.Element;
}
export default MainActivity;
