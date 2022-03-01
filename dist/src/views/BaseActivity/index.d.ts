import * as React from "react";
/**
 * This should only used on Activitys
 */
declare class BaseActivity<P = {}, S = {}, SS = any> extends React.Component<P, S, SS> {
    constructor(props: Readonly<P> | P);
    private updateStyle;
    private initialPluginState;
    setDiscordStatus: () => string;
    componentDidMount: () => void;
    componentDidUpdate: () => void;
    /**
     * Renders the Toolbar
     */
    renderToolbar: () => JSX.Element;
    /**
     * Renders the page
     */
    renderPage: () => JSX.Element;
    /**
     * Don't use that if the Activity is with `BaseActivity` extended
     * Use `renderPage` instead
     */
    render: () => JSX.Element;
}
export default BaseActivity;
