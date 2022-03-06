import BaseComponent from "./BaseComponent";
declare class News extends BaseComponent<{}, any> {
    constructor(props: any);
    componentDidMount(): void;
    renderComponent: () => JSX.Element;
}
export default News;
