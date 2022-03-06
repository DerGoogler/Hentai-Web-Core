import { SearchInput } from "react-onsenui";
import BaseComponent from "./BaseComponent";

interface Props {
    modifier?: string | undefined,
    disabled?: boolean | undefined,
    placeholder?: string | undefined,
    inputId?: string | undefined,
}

class CustomSearchInput extends BaseComponent<Props, any> {
    public constructor(props: any) {
        super(props)
        this.state = {
            value: ""
        }
    }

    public addEventListener(event: string, callback: Function): void {

    }

    /**
     * Changes on every keypress
     * @param e 
     */
    public onChange = (e: any): void => {
        this.setState({ value: e.target.value })
    }

    /**
     * Gets the current value
     */
    public get value(): string {
        return this.state.value
    }

    /**
     * Change the current value
     */
    public set value(text: string) {
        this.setState({ value: text })
    }

    public renderComponent = () => {
        const { modifier, disabled, inputId, placeholder, style, className, } = this.props
        return (<>
            <SearchInput
                // @ts-ignore
                placeholder={placeholder}
                className={className}
                style={style}
                onChange={this.onChange}
                modifier={modifier}
                disabled={disabled}
                inputId={inputId}
            />
        </>)
    }
}

export default CustomSearchInput