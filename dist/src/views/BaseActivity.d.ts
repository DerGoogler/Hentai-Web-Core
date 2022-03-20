import * as React from "react";
declare class BaseActivity<P = {}, S = {}, SS = any> extends React.Component<P, S, SS> {
    constructor(props: Readonly<P> | P);
    private updateStyle;
    private initialPluginState;
    setDiscordStatus(): string;
    componentDidMount(): void;
    componentDidUpdate(): void;
}
export default BaseActivity;
