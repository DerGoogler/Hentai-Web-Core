import BaseComponent from "../BaseComponent";
import CenterInterface from "./interface";
declare class Center extends BaseComponent<CenterInterface> {
    render: () => JSX.Element;
}
export default Center;
