import * as React from "react";
interface MenuBuild {
    id?: string;
    className?: string;
    icon?: string;
    style?: React.CSSProperties;
    onClick?: Function;
    text: string;
    modifier?: string;
}
interface Options {
    isOpen: boolean;
    animation?: string;
    modifier?: string;
    onCancel: Function;
    isCancelable?: boolean;
    title: string;
}
/**
 * Creats an menu
 */
declare class ActionSheetBuilder extends React.Component<{
    data: MenuBuild[];
    options: Options;
}> {
    render(): JSX.Element;
}
export default ActionSheetBuilder;
