import React from "react";
import { Props, States } from "./interface";
declare class BuildPluginActivity extends React.Component<Props, States> {
    state: {
        data: string;
    };
    private renderToolbar;
    render(): JSX.Element;
}
export default BuildPluginActivity;
