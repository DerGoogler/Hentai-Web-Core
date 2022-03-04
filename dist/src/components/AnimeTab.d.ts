/// <reference types="react" />
import BaseComponent from "./BaseComponent";
declare class AnimeTab extends BaseComponent<{
    content: JSX.Element;
}> {
    renderComponent: () => JSX.Element;
}
export default AnimeTab;
