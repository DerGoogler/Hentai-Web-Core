import { ListInterface } from "@Types/ListBuilder";
import * as React from "react";
interface Options {
    isOpen: boolean;
    animation?: string;
    modifier?: string;
    onCancel: Function;
    isCancelable?: boolean;
}
declare class ListDialogBuilder extends React.Component<{
    data: ListInterface[];
    options: Options;
}, {
    isOpen: boolean;
}> {
    render(): JSX.Element;
}
export default ListDialogBuilder;
