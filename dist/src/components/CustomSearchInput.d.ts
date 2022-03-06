import BaseComponent from "./BaseComponent";
interface Props {
    modifier?: string | undefined;
    disabled?: boolean | undefined;
    placeholder?: string | undefined;
    inputId?: string | undefined;
}
declare class CustomSearchInput extends BaseComponent<Props, any> {
    constructor(props: any);
    addEventListener(event: string, callback: Function): void;
    /**
     * Changes on every keypress
     * @param e
     */
    onChange: (e: any) => void;
    /**
     * Gets the current value
     */
    get value(): string;
    /**
     * Change the current value
     */
    set value(text: string);
    renderComponent: () => JSX.Element;
}
export default CustomSearchInput;
