import { Props, States } from "./interface";
import BaseActivity from "../BaseActivity";
declare class EditorActivity extends BaseActivity<Props, States> {
    constructor(props: any);
    componentDidMount: () => void;
    renderToolbar: () => JSX.Element;
    private save;
    private onAndroidEditorLoad;
    private createDependencyProposals;
    private editorDidMount;
    private onChange;
    renderPage: () => JSX.Element;
}
export default EditorActivity;
