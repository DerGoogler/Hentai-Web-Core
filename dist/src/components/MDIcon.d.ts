import * as React from "react";
declare class MDIcon extends React.Component<{
    icon: string;
    size: "18" | "24" | "36" | "48";
    disabled?: boolean;
    isInList?: boolean;
    ignoreDarkmode?: boolean;
    style?: React.CSSProperties;
}> {
    render(): JSX.Element;
}
export default MDIcon;
