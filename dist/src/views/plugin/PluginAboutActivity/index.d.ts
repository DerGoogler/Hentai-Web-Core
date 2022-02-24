import * as React from "react";
import { Props, States } from "./interface";
declare class PluginAboutActivity extends React.Component<Props, States> {
    private getPluginConfig;
    private author;
    private version;
    private language;
    private description;
    private renderToolbar;
    render(): JSX.Element;
}
export default PluginAboutActivity;
