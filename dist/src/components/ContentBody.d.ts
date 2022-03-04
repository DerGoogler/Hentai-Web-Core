/// <reference types="react" />
import BasicComponent from "./BasicComponent";
/**
 * ContentBody is an optional component, to make the view better on desktop
 */
declare class ContentBody extends BasicComponent {
    private stlye;
    private checkDevice;
    renderComponent(): JSX.Element;
}
export default ContentBody;
