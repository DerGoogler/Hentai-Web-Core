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
  selectValue?: JSX.Element | HTMLOptionElement;
  icon?: /*Icon*/ string;
  selectDefaultValue?: string;
  switchDefaultValue?: boolean;
  callback?: Function;
}

interface SettingsInterface {
  title: string;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  content: SettingsOptions[];
}

export { SettingsOptions, SettingsInterface };
