import { Props, States } from "./interface";
import Activity from "@Views";
declare class LoginActivity extends Activity.Base<Props, States> {
    constructor(props: any);
    componentDidMount: () => void;
    renderToolbar: () => JSX.Element;
    private handleClick;
    private handleUsernameChange;
    private handlePasswordChange;
    renderPage: () => JSX.Element;
}
export default LoginActivity;
