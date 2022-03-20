import * as React from "react";
interface Props {
    setStatusbarColor?: string;
}
interface States {
}
declare class BasicComponent<P = {}, S = {}, SS = any> extends React.Component<P & Props & React.HTMLAttributes<Element>, S & States & Element, SS> {
    constructor(props: Readonly<P & Props & React.HTMLAttributes<Element>> | P & Props & React.HTMLAttributes<Element>);
    renderComponent(): JSX.Element;
    /**
     * Don't use if the `BasicComonent` is extended
     */
    render: () => JSX.Element;
}
export default BasicComponent;
