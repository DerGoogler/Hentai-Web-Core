import { Props, States } from "./interface";
import Activity from "@Views";
declare class EditorActivity extends Activity.Base<Props, States> {
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
