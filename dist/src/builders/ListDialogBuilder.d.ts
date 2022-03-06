import BaseComponent from "@Components/BaseComponent";
import { ListInterface } from "@Types/ListBuilder";
interface Options {
    isOpen: boolean;
    animation?: string;
    modifier?: string;
    onCancel: Function;
    isCancelable?: boolean;
}
declare class ListDialogBuilder extends BaseComponent<{
    data: ListInterface[];
    options: Options;
}, {
    isOpen: boolean;
}> {
    render: () => JSX.Element;
}
export default ListDialogBuilder;
