import tools from "@Misc/tools";
import native from "@Native/index";
import * as React from "react";

class MDIcon extends React.Component<{
  icon: string;
  size: "18" | "24" | "36" | "48";
  disabled?: boolean;
  isInList?: boolean;
  ignoreDarkmode?: boolean;
  style?: React.CSSProperties;
}> {
  public render() {
    const { icon, size, disabled, isInList, ignoreDarkmode, style } = this.props;
    return (
      <span style={style}>
        <span
          className={
            "material-icons-round " +
            tools.typeIF(isInList, "list-item__icon", "") +
            " ons-icon " +
            "material-icons md-" +
            size +
            tools.typeCheck(ignoreDarkmode, " md-" + tools.typeIF(native.getPref("enableDarkmode"), "light", "dark")) +
            " " +
            tools.typeIF(disabled, "md-inactive ", "")
          }
          style={{
            textAlign: "center",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </span>
      </span>
    );
  }
}

export default MDIcon;
