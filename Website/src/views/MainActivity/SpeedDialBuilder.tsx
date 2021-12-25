import { CSSProperties } from "react";
import { hot } from "react-hot-loader/root";
import { Icon, SpeedDialItem } from "react-onsenui";
import SpeedDial from "../../dataPacks/SpeedDial";

const SpeedDialBuilder = SpeedDial.map(
  (item: {
    id?: string;
    className?: string;
    style?: CSSProperties;
    onClick?(e?: React.MouseEvent<HTMLElement>): void;
    icon?: string;
  }) => (
    <SpeedDialItem
      key={item.id}
      id={item.id}
      className={item.className}
      style={item.style}
      onClick={item.onClick}
    >
      <Icon icon={item.icon} />
    </SpeedDialItem>
  )
);

export default hot(SpeedDialBuilder);
