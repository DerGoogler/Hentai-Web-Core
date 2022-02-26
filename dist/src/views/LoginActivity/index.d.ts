import React from "react";
import { Props, States } from "./interface";
declare class LoginActivity extends React.Component<Props, States> {
    constructor(props: any);
    componentDidMount(): void;
    private renderToolbar;
    private handleClick;
    private handleUsernameChange;
    private handlePasswordChange;
    render(): JSX.Element;
}
export default LoginActivity;
