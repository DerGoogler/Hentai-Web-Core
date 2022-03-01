import { BaseActivity } from "@Views";
import { Props, States } from "./interface";
declare class MainActivity extends BaseActivity<Props, States> {
    constructor(props: any);
    componentDidMount: () => void;
    private handleClick;
    private handleCancel;
    private renderToolbar;
    private renderTabs;
    private tabIndexChecker;
    render: () => JSX.Element;
}
export default MainActivity;
