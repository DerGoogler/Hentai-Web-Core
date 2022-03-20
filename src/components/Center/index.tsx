import BaseComponent from "../BaseComponent";
import CenterInterface from "./interface";

class Center extends BaseComponent<CenterInterface> {
  public render = () => {
    const { children, style } = this.props;
    return (
      <hw-span style={style}>
        <hw-center
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </hw-center>
      </hw-span>
    );
  }
}

export default Center;
