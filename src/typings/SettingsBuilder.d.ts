// type Icon = `${string}-${string}`;

interface SettingsOptions {
  key?: string;
  disabled?: boolean | any;
  id?: string;
  style?: React.CSSProperties;
  expandableContent?: JSX.Element | HTMLElement | string | undefined;
  expandable?: boolean;
  tappable?: boolean;
  modifier?: string;
  type: "switch" | "select" | "";
  text: string;
  onClick?: Function;
  selectValue?: SelectValue[];
  icon?: /*Icon*/ string;
  selectDefaultValue?: string;
  switchDefaultValue?: boolean;
  callback?: Function;
}

interface SelectValue {
  text: string;
  value: string;
  disabled?: boolean;
}

interface SettingsInterface {
  title: string;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  content: SettingsOptions[];
}

export { SettingsOptions, SettingsInterface, SelectValue };
