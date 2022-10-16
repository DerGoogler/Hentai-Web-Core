import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { ToolbarButton as DeineM } from "react-onsenui";
import { Icon } from "./Icon";

export type BackButtonProps = {
  id?: string;
  onClick: React.MouseEventHandler<any>;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
};

export const ToolbarButton = (props: BackButtonProps) => {
  return (
    <DeineM id={props.id} style={{ fontFamily: "unset" }} onClick={props.onClick}>
      <Icon icon={props.icon} keepLight />
    </DeineM>
  );
};
