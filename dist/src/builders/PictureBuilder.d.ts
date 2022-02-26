import * as React from "react";
declare class PictureBuilder extends React.Component<{
    note?: any;
    source?: any;
    getId?: any;
    isNew?: any;
    searchState: string;
}, {
    isContextOpen: boolean;
    isImageError: boolean;
}> {
    private element;
    private buttonDesign;
    private imageStyle;
    private searchedCard;
    private cardName;
    constructor(props: any);
    /**
     * To generate an id that refresh every page reload, to avoid duplicte ids
     */
    private getID;
    private getNote;
    private images;
    componentDidUpdate(): void;
    private id;
    private makeUUID;
    private randomizer;
    private handleClick;
    private handleCancel;
    render(): JSX.Element;
}
export default PictureBuilder;
