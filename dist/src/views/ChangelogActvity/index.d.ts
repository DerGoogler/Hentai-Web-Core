import React from "react";
import { Props, States } from "./interface";
declare class ChangelogActivity extends React.Component<Props, States> {
    constructor(props: any);
    componentDidMount: () => void;
    renderToolbar: () => JSX.Element;
    render: () => JSX.Element;
}
export default ChangelogActivity;
