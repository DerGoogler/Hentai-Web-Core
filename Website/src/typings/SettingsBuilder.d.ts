type Icon = `${string}-${string}`;

interface SettingsOptions {
  key?: string;
  disabled?: boolean | any;
  id?: string;
  style?: React.CSSProperties;
  expandableContent?: JSX.Element | HTMLElement | string | undefined;
  expandable?: boolean;
  type: "switch" | "select";
  text: string;
  selectValue?: JSX.Element | HTMLOptionElement;
  icon?: Icon;
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
