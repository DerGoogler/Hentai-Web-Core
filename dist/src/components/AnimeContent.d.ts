import * as React from "react";
declare class AnimeContent extends React.Component<{
    data: any[];
    name: string;
}, {
    search: string;
}> {
    constructor(props: any);
    private filter;
    render: () => JSX.Element;
}
export default AnimeContent;
