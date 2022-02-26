import * as React from "react";
declare class HighlightedMarkdown extends React.Component<{
    children: string;
}> {
    rootRef: React.RefObject<HTMLDivElement>;
    constructor(props: any);
    componentDidMount(): void;
    render(): JSX.Element;
}
export { HighlightedMarkdown };
