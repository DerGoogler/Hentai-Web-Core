/// <reference types="react" />
import { PushPageProps } from "@Types/init";
import { Props, States } from "./interface";
import { BaseActivity } from "@Views";
declare class InitActivity extends BaseActivity<Props, States> {
    constructor(props: any);
    componentDidMount: () => void;
    componentDidUpdate(): void;
    componentWillUnmount: () => void;
    private removeContextMenuMobile;
    private windowLoadPush;
    pushPage: (props: PushPageProps) => void;
    popPage: (options?: {}) => void;
    onPostPush: () => void;
    onPostPop: () => void;
    renderPage_: (route: any) => JSX.Element;
    renderPage(): JSX.Element;
}
export default InitActivity;
