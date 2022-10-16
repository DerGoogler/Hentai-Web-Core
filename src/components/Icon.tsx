import * as React from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconProps, SvgIconTypeMap } from "@mui/material/SvgIcon";

interface Props extends SvgIconProps {
  icon: OverridableComponent<SvgIconTypeMap>;
  /**
   * Keeps the icons in light colors even if it's dark mode on
   */
  keepLight?: boolean;
}

/**
 * An icon wrapper for Material React icons
 */
class Icon extends React.Component<Props, {}, SVGSVGElement> {
  public constructor(props: Props | Readonly<Props>) {
    super(props);
  }

  public render(): React.ReactElement {
    const { keepLight, ...rest } = this.props;
    return (
      <this.props.icon
        sx={{
          color: keepLight ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0.54)",
          verticalAlign: "baseline",
        }}
        {...rest}
      />
    );
  }
}

export { Icon };
