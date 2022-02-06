import SpeedDial from "@DataPacks/SpeedDial";
import { CSSProperties } from "react";
import { Icon, SpeedDialItem } from "react-onsenui";

const SpeedDialBuilder = SpeedDial.map(
  (item: {
    id?: string;
    className?: string;
    style?: CSSProperties;
    onClick?(e?: React.MouseEvent<HTMLElement>): void;
    icon?: string;
  }) => (
    <SpeedDialItem key={item.id} id={item.id} className={item.className} style={item.style} onClick={item.onClick}>
      <Icon icon={item.icon} />
    </SpeedDialItem>
  )
);

export default SpeedDialBuilder;
