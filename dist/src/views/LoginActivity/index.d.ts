import { Props, States } from "./interface";
import BaseActivity from "../BaseActivity";
declare class LoginActivity extends BaseActivity<Props, States> {
    constructor(props: any);
    componentDidMount: () => void;
    renderToolbar: () => JSX.Element;
    private handleClick;
    private handleUsernameChange;
    private handlePasswordChange;
    renderPage: () => JSX.Element;
}
export default LoginActivity;
