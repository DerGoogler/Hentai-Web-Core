/// <reference types="react" />
import BasicComponent from "./BasicComponent";
interface Props {
    modifier?: string | undefined;
    disabled?: boolean | undefined;
    placeholder?: string | undefined;
    value?: string | undefined;
    inputId?: string | undefined;
}
declare class CustomSearchbar extends BasicComponent<Props, any> {
    constructor(props: any);
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
    renderComponent(): JSX.Element;
}
export default CustomSearchbar;
