import * as React from "react";
declare class AnimeContent extends React.Component<{
    data: any[];
    name: string;
}, {
    search: string;
    currentSerachText: string;
    searchButtonDisabled: boolean;
}> {
    private searchBar;
    constructor(props: any);
    private filter;
    private triggerSearch;
    render: () => JSX.Element;
}
export default AnimeContent;
