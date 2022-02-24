import * as React from "react";
import { ToolbarBuilderInterface } from "@Types/ToolbarBuilder";
declare class ToolbarBuilder extends React.Component<ToolbarBuilderInterface> {
    state: {
        icon: string;
    };
    render(): JSX.Element;
}
export default ToolbarBuilder;
