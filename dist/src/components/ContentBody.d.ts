import BaseComponent from "./BaseComponent";
/**
 * ContentBody is an optional component, to make the view better on desktop
 */
declare class ContentBody extends BaseComponent {
    private stlye;
    private checkDevice;
    renderComponent: () => JSX.Element;
}
export default ContentBody;
