import React from "react";
import { Props, States } from "./interface";
declare class EditorActivity extends React.Component<Props, States> {
    constructor(props: any);
    componentDidMount: () => void;
    private renderToolbar;
    private save;
    private onAndroidEditorLoad;
    private createDependencyProposals;
    private editorDidMount;
    private onChange;
    render(): JSX.Element;
}
export default EditorActivity;
