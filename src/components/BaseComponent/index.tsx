import native from "@Native/index";
import * as React from "react"

interface Props {
    setStatusbarColor?: string
}

interface States {

}

class BaseComponent<P = {}, S = {}, SS = any> extends React.Component<P & Props & React.HTMLAttributes<Element>, S & States & Element, SS> {
    public constructor(props: Readonly<P & Props & React.HTMLAttributes<Element>> | P & Props & React.HTMLAttributes<Element>) {
        super(props);
        const { setStatusbarColor } = this.props
        native.android.setStatusbarColor(setStatusbarColor ? setStatusbarColor : "#4a148c")
        this.render = this.render.bind(this)
    }

    public renderComponent(): JSX.Element {
        return <></>
    }

    /**
     * Don't use if the `BasicComonent` is extended
     */
    public render = (): JSX.Element => {
        return (
            <hw-component style={{ width: '100%' }}>
                {this.renderComponent()}
            </hw-component>)
    }
}

export default BaseComponent