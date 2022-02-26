import * as React from "react";
import { PushPageProps } from "@Types/init";
import { Props, States } from "./interface";
declare class InitActivity extends React.Component<Props, States> {
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
    renderPage: (route: any) => JSX.Element;
    private renderToolbar;
    render(): JSX.Element;
}
export default InitActivity;
