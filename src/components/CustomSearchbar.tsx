import { SearchInput } from "react-onsenui";
import BasicComponent from "./BasicComponent";

interface Props {
    modifier?: string | undefined,
    disabled?: boolean | undefined,
    placeholder?: string | undefined,
    value?: string | undefined,
    inputId?: string | undefined,
}

class CustomSearchbar extends BasicComponent<Props, any> {
    public constructor(props: any) {
        super(props)

        this.state = {
            value: ""
        }
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

    public render() {
        const { modifier, disabled, value, inputId, placeholder, style, className, } = this.props
        return (<>
            <SearchInput
                // @ts-ignore
                placeholder={placeholder}
                className={className}
                style={style}
                onChange={this.onChange}
                modifier={modifier}
                disabled={disabled}
                value={value}
                inputId={inputId}
            />
        </>)
    }
}

export default CustomSearchbar