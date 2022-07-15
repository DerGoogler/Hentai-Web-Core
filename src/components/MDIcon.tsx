import tools from "@Misc/tools";
import native from "@Native/index";
import * as React from "react";
import { ViewX, ViewXRenderData } from "react-onsenuix";

interface Props {
  icon: string;
  size: "18" | "24" | "36" | "48";
  disabled?: boolean;
  isInList?: boolean;
  ignoreDarkmode?: boolean;
  style?: React.CSSProperties;
}

class MDIcon extends ViewX<Props, {}, HTMLSpanElement> {
  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.createView = this.createView.bind(this);
  }

  public createView(data: ViewXRenderData<Props, {}, HTMLSpanElement>): JSX.Element {
    return (
      <span style={data.p.style}>
        <span
          className={
            "material-icons-round " +
            tools.typeIF(data.p.isInList, "list-item__icon", "") +
            " ons-icon " +
            "material-icons md-" +
            data.p.size +
            tools.typeCheck(data.p.ignoreDarkmode, " md-" + tools.typeIF(native.getPref("enableDarkmode"), "light", "dark")) +
            " " +
            tools.typeIF(data.p.disabled, "md-inactive ", "")
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
          {data.p.icon}
        </span>
      </span>
    );
  }
}

export default MDIcon;
